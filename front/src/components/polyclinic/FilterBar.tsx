"use client";

/**
 * Слайсеры в духе Power BI: год, месяц, диагнозы, дата выполнения.
 * Значения статичны (демо); при подключении API заменить на состояние + запросы.
 */
export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-100 border border-slate-200 rounded-lg">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1">Фильтры</span>
      {[
        { label: "Год", value: "Все" },
        { label: "Месяц", value: "2026-04" },
        { label: "Диагнозы", value: "Все" },
        { label: "Дата выполнения", value: "Все" },
      ].map((f) => (
        <div
          key={f.label}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded shadow-sm text-xs"
        >
          <span className="text-slate-400">{f.label}:</span>
          <span className="font-medium text-slate-800">{f.value}</span>
          <span className="text-slate-300">▾</span>
        </div>
      ))}
    </div>
  );
}
