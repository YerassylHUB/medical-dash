import type { Express, Request, Response } from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import {
  EXCEL_TYPES,
  isValidExcelType,
  labelForExcelType,
  useSmartHeaderRow,
} from "../excel-types.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const name = file.originalname.toLowerCase();
    const ok = name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv");
    cb(null, ok);
  },
});

const MONTH_RE = /^\d{4}-\d{2}$/;

type Row = (string | number | boolean | null)[];

function rowTextLower(row: Row | undefined): string {
  if (!Array.isArray(row)) return "";
  return row.map((c) => String(c ?? "").trim().toLowerCase()).join(" | ");
}

/**
 * Строка с подписями колонок: актив поликлиники/скорой, реестр умерших (свидетельства о смерти) и т.п.
 */
function findRegistryHeaderRowIndex(rows: Row[]): number {
  for (let i = 0; i < Math.min(rows.length, 100); i++) {
    const t = rowTextLower(rows[i]);
    if (!t) continue;

    // Реестр свидетельств о смерти (умершие.xlsx): «Номер свидетельства», «ФИО умершего», «Дата смерти», ИИН…
    const deceased =
      (t.includes("свидетельств") && (t.includes("смерт") || t.includes("номер"))) ||
      (t.includes("фио") && t.includes("умерш")) ||
      (t.includes("реестр") && t.includes("смерт")) ||
      (t.includes("дата смерт") && (t.includes("ииин") || t.includes("иин")));
    if (deceased) return i;

    const hasFio = t.includes("фио");
    const hasPatient = t.includes("пациент");
    const hasBirth = t.includes("рожден");
    const hasPhone = t.includes("телефон");
    const hasAddr = t.includes("адрес");
    const hasAsset = t.includes("актива") || t.includes("актив");
    if (hasFio && (hasPatient || hasBirth || hasPhone)) return i;
    if (hasFio && hasAddr) return i;
    if (hasFio && hasAsset) return i;
  }
  return -1;
}

/** Строка с номерами колонок 1, 2, 3… под шапкой. */
function isNumericSubheaderRow(row: Row | undefined): boolean {
  if (!Array.isArray(row)) return false;
  const parts = row
    .filter((c) => c !== null && c !== undefined && String(c).trim() !== "")
    .slice(0, 14)
    .map((c) => String(c).trim());
  if (parts.length < 4) return false;
  return parts.every((p) => /^\d{1,4}$/.test(p));
}

function parseSheet(
  buffer: Buffer,
  excelType: string
): {
  sheetName: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  previewRows: (string | number | boolean | null)[][];
  headerRowIndex: number | null;
} {
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) {
    throw new Error("empty_workbook");
  }
  const sheet = wb.Sheets[sheetName];
  if (!sheet) {
    throw new Error("missing_sheet");
  }
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: null,
    raw: false,
  }) as Row[];

  const nonEmpty = rows.filter((r) => Array.isArray(r) && r.some((c) => c !== null && c !== ""));
  if (nonEmpty.length === 0) {
    return { sheetName, rowCount: 0, columnCount: 0, headers: [], previewRows: [], headerRowIndex: null };
  }

  let headerRow: Row;
  let dataRows: Row[];
  let headerRowIndex: number | null = null;

  if (useSmartHeaderRow(excelType)) {
    const hi = findRegistryHeaderRowIndex(rows);
    if (hi >= 0) {
      headerRowIndex = hi;
      let dataStart = hi + 1;
      if (dataStart < rows.length && isNumericSubheaderRow(rows[dataStart])) {
        dataStart += 1;
      }
      headerRow = rows[hi] ?? [];
      dataRows = rows
        .slice(dataStart)
        .filter((r) => Array.isArray(r) && r.some((c) => c !== null && c !== ""));
    } else {
      headerRow = nonEmpty[0] ?? [];
      dataRows = nonEmpty.slice(1);
    }
  } else {
    headerRow = nonEmpty[0] ?? [];
    dataRows = nonEmpty.slice(1);
  }

  const headers = headerRow.map((c, i) => {
    if (c === null || c === undefined || c === "") return `Колонка ${i + 1}`;
    return String(c);
  });
  const columnCount = Math.max(headers.length, ...dataRows.map((r) => r.length), 0);

  const previewRows = dataRows.slice(0, 8).map((r) => {
    const out: (string | number | boolean | null)[] = [];
    for (let i = 0; i < columnCount; i++) {
      const v = r[i];
      out.push(v === undefined ? null : v);
    }
    return out;
  });

  return {
    sheetName,
    rowCount: dataRows.length,
    columnCount,
    headers: headers.slice(0, columnCount),
    previewRows,
    headerRowIndex,
  };
}

export function registerUploadRoutes(app: Express): void {
  app.get("/v1/excel-types", (_req: Request, res: Response) => {
    res.json({ types: [...EXCEL_TYPES] });
  });

  app.post(
    "/v1/uploads",
    upload.single("file"),
    (req: Request, res: Response) => {
      const month = typeof req.body?.month === "string" ? req.body.month.trim() : "";
      const excelType = typeof req.body?.excelType === "string" ? req.body.excelType.trim() : "";

      if (!MONTH_RE.test(month)) {
        res.status(400).json({ error: "invalid_month", message: "Укажите месяц в формате YYYY-MM" });
        return;
      }
      if (!isValidExcelType(excelType)) {
        res.status(400).json({ error: "invalid_excel_type", message: "Неизвестный тип файла" });
        return;
      }
      if (!req.file?.buffer?.length) {
        res.status(400).json({ error: "missing_file", message: "Прикрепите файл .xlsx, .xls или .csv" });
        return;
      }

      try {
        const parsed = parseSheet(req.file.buffer, excelType);
        res.json({
          ok: true,
          month,
          excelType,
          excelTypeLabel: labelForExcelType(excelType),
          fileName: req.file.originalname,
          fileSize: req.file.size,
          ...parsed,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : "parse_error";
        res.status(400).json({ error: "parse_failed", message });
      }
    }
  );
}
