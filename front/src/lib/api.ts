/** Прокси Next → бэкенд (см. next.config.js rewrites на `/api/v1/*`). */

export const API_V1 = "/api/v1";

export async function fetchApiHealth(): Promise<{ ok: boolean; service?: string } | null> {
  try {
    const r = await fetch(`${API_V1}/health`, { cache: "no-store" });
    if (!r.ok) return null;
    return r.json();
  } catch {
    return null;
  }
}

export async function fetchLeadershipSummaryFromApi(): Promise<unknown | null> {
  try {
    const r = await fetch(`${API_V1}/leadership/summary`, { cache: "no-store" });
    if (!r.ok) return null;
    return r.json();
  } catch {
    return null;
  }
}

/** Тип выгрузки Excel (id + подпись). Список на странице upload пока мок: `config/excel-upload-types.ts`. */
export type ExcelTypeOption = { id: string; label: string };

export type UploadPreviewResponse = {
  ok: true;
  month: string;
  excelType: string;
  excelTypeLabel: string;
  fileName: string;
  fileSize: number;
  sheetName: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  previewRows: (string | number | boolean | null)[][];
  /** 0-based индекс строки с заголовками (если искали «умной» логикой) */
  headerRowIndex?: number | null;
};

export async function postLeadershipUpload(form: FormData): Promise<
  | { ok: true; data: UploadPreviewResponse }
  | { ok: false; error: string; message?: string }
> {
  try {
    const r = await fetch(`${API_V1}/uploads`, { method: "POST", body: form });
    const j = (await r.json()) as Record<string, unknown>;
    if (!r.ok) {
      const message = typeof j.message === "string" ? j.message : r.statusText;
      return { ok: false, error: String(j.error ?? "request_failed"), message };
    }
    return { ok: true, data: j as UploadPreviewResponse };
  } catch {
    return { ok: false, error: "network" };
  }
}
