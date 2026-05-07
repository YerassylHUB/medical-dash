"use client";

import { useCallback, useMemo, useState } from "react";
import { FileSpreadsheet, Loader2, Upload } from "lucide-react";
import { postLeadershipUpload, type UploadPreviewResponse } from "@/lib/api";
import { MOCK_EXCEL_UPLOAD_TYPES } from "@/config/excel-upload-types";

function defaultMonth(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default function LeadershipUploadPage() {
  const [month, setMonth] = useState(defaultMonth);
  const [excelType, setExcelType] = useState(MOCK_EXCEL_UPLOAD_TYPES[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<UploadPreviewResponse | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(month && excelType && file && !submitting);
  }, [month, excelType, file, submitting]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setPreview(null);
      if (!file || !excelType) return;
      setSubmitting(true);
      const fd = new FormData();
      fd.set("month", month);
      fd.set("excelType", excelType);
      fd.set("file", file);
      const res = await postLeadershipUpload(fd);
      setSubmitting(false);
      if (!res.ok) {
        setError(res.message ?? res.error);
        return;
      }
      setPreview(res.data);
    },
    [file, excelType, month]
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Импорт данных</p>
        <h2 className="text-lg font-bold text-gray-900 mt-0.5">Загрузка Excel</h2>
        <p className="text-sm text-gray-500 mt-1">
          Укажите месяц и тип выгрузки. Для «умершие» и выгрузок поликлиники/скорой шапка часто ниже нескольких строк
          отчёта — при разборе ищется строка с колонками («ФИО», «свидетельств», «смерти» и т.д.). Превью — первый
          лист.
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="upload-month" className="block text-sm font-medium text-gray-700 mb-1">
              Месяц данных
            </label>
            <input
              id="upload-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-400 mt-1">К какому отчётному периоду относятся строки в файле</p>
          </div>
          <div>
            <label htmlFor="upload-type" className="block text-sm font-medium text-gray-700 mb-1">
              Тип Excel
            </label>
            <select
              id="upload-type"
              value={excelType}
              onChange={(e) => setExcelType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              {MOCK_EXCEL_UPLOAD_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Список типов пока задан на фронте; позже можно подтянуть с API{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px]">/v1/excel-types</code>.
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="upload-file" className="block text-sm font-medium text-gray-700 mb-1">
            Файл
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              <FileSpreadsheet size={18} className="text-blue-600 shrink-0" />
              <span>{file ? file.name : "Выбрать .xlsx, .xls или .csv"}</span>
              <input
                id="upload-file"
                type="file"
                accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  setPreview(null);
                  setError(null);
                }}
              />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-1">Максимум ~25 МБ. Берётся первый лист книги</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-800">{error}</div>
        )}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {submitting ? "Разбор файла…" : "Загрузить и показать превью"}
          </button>
        </div>
      </form>

      {preview && (
        <div className="card p-6 space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold text-gray-900">Превью</h3>
            <p className="text-xs text-gray-500">
              {preview.excelTypeLabel} · {preview.month} · {preview.fileName} · лист «{preview.sheetName}» · строк
              данных: {preview.rowCount}
              {preview.headerRowIndex != null && preview.headerRowIndex >= 0 ? (
                <> · строка заголовков в файле: {preview.headerRowIndex + 1}</>
              ) : null}
            </p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  {preview.headers.map((h, i) => (
                    <th key={i} className="px-2 py-2 border-b border-gray-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.previewRows.map((row, ri) => (
                  <tr key={ri} className="odd:bg-white even:bg-gray-50/80">
                    {preview.headers.map((_, ci) => (
                      <td key={ci} className="px-2 py-1.5 border-b border-gray-100 max-w-[14rem] truncate">
                        {row[ci] === null || row[ci] === undefined || row[ci] === "" ? "—" : String(row[ci])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            Сохранение в БД и полное сопоставление колонок можно подключить отдельно; сейчас эндпоинт только принимает
            параметры и возвращает превью для проверки.
          </p>
        </div>
      )}
    </div>
  );
}
