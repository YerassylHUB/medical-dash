"use client";

import { CheckCircle2, XCircle, Clock, Activity, Users, TrendingUp } from "lucide-react";

const TOTAL = 1247;
const ATTACHED = 892;
const REJECTED = 183;
const PENDING = 172;
const D_REGISTRY = 47;

const pct = (val: number, base: number) => ((val / base) * 100).toFixed(1);

const statusRows = [
  { label: "Принято на рассмотрение", date: "01.05.2026", applicant: "Ахметов С.Т.", iin: "890312***", d: true },
  { label: "Прикреплено", date: "30.04.2026", applicant: "Смирнова А.В.", iin: "950601***", d: false },
  { label: "На рассмотрении", date: "02.05.2026", applicant: "Джаксыбеков Е.О.", iin: "780915***", d: true },
  { label: "Отклонено", date: "29.04.2026", applicant: "Кузнецова О.П.", iin: "001120***", d: false },
  { label: "Прикреплено", date: "28.04.2026", applicant: "Нурмухамедов А.", iin: "850723***", d: false },
  { label: "На рассмотрении", date: "03.05.2026", applicant: "Иванов Д.С.", iin: "920418***", d: true },
  { label: "Прикреплено", date: "27.04.2026", applicant: "Байжанова Г.М.", iin: "760304***", d: false },
  { label: "Отклонено", date: "02.05.2026", applicant: "Петров Н.А.", iin: "010807***", d: false },
];

function statusBadge(label: string) {
  if (label === "Прикреплено")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
        <CheckCircle2 size={11} /> Прикреплено
      </span>
    );
  if (label === "Отклонено")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
        <XCircle size={11} /> Отклонено
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
      <Clock size={11} /> {label}
    </span>
  );
}

export default function AttachmentPage() {
  const pendingPct = Number(pct(PENDING, TOTAL));
  const attachedPct = Number(pct(ATTACHED, TOTAL));
  const rejectedPct = Number(pct(REJECTED, TOTAL));
  const dPct = Number(pct(D_REGISTRY, PENDING));

  return (
    <div className="space-y-5">
      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Всего */}
        <div className="card p-5 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Users size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{TOTAL.toLocaleString("ru-RU")}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-tight">Всего заявок</p>
          </div>
        </div>

        {/* Прикреплено */}
        <div className="card p-5 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{ATTACHED.toLocaleString("ru-RU")}</p>
              <span className="text-sm font-semibold text-emerald-600">{pct(ATTACHED, TOTAL)}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Прикреплено</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${attachedPct}%` }} />
            </div>
          </div>
        </div>

        {/* Отклонено */}
        <div className="card p-5 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{REJECTED.toLocaleString("ru-RU")}</p>
              <span className="text-sm font-semibold text-red-500">{pct(REJECTED, TOTAL)}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Отклонено</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-400 rounded-full" style={{ width: `${rejectedPct}%` }} />
            </div>
          </div>
        </div>

        {/* На рассмотрении */}
        <div className="card p-5 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{PENDING.toLocaleString("ru-RU")}</p>
              <span className="text-sm font-semibold text-amber-500">{pct(PENDING, TOTAL)}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">На рассмотрении</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pendingPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Second row: pending breakdown + visual share */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* На Д-учёте breakdown */}
        <div className="card p-5 xl:col-span-1 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Структура «На рассмотрении»</h3>
            <p className="text-xs text-gray-400 mt-0.5">Из {PENDING} заявок в обработке</p>
          </div>

          {/* D-registry highlight */}
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <Activity size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-violet-700">{D_REGISTRY}</p>
                <span className="text-sm font-semibold text-violet-500">{pct(D_REGISTRY, PENDING)}%</span>
              </div>
              <p className="text-xs text-violet-600 font-medium leading-tight">Состоят на Д-учёте</p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
              <Clock size={22} className="text-gray-500" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-700">{PENDING - D_REGISTRY}</p>
                <span className="text-sm font-semibold text-gray-500">{pct(PENDING - D_REGISTRY, PENDING)}%</span>
              </div>
              <p className="text-xs text-gray-500 leading-tight">Без Д-учёта</p>
            </div>
          </div>

          {/* mini bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Д-учёт</span>
              <span>Без учёта</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-violet-500 rounded-l-full transition-all"
                style={{ width: `${dPct}%` }}
              />
              <div className="h-full bg-gray-300 flex-1 rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Visual share donut-like bars */}
        <div className="card p-5 xl:col-span-2 flex flex-col gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Распределение заявок</h3>
            <p className="text-xs text-gray-400 mt-0.5">Доля каждого статуса от общего числа</p>
          </div>

          <div className="space-y-4 flex-1 justify-center flex flex-col">
            {[
              { label: "Прикреплено", value: ATTACHED, total: TOTAL, color: "bg-emerald-500", text: "text-emerald-700", light: "bg-emerald-50" },
              { label: "На рассмотрении", value: PENDING, total: TOTAL, color: "bg-amber-400", text: "text-amber-700", light: "bg-amber-50" },
              { label: "Отклонено", value: REJECTED, total: TOTAL, color: "bg-red-400", text: "text-red-700", light: "bg-red-50" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${item.light} ${item.text}`}>
                      {pct(item.value, item.total)}%
                    </span>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                      {item.value.toLocaleString("ru-RU")}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${pct(item.value, item.total)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* summary row */}
          <div className="mt-2 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
            <div className="text-center">
              <TrendingUp size={16} className="text-emerald-500 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Одобрение</p>
              <p className="text-sm font-bold text-emerald-600">{pct(ATTACHED, TOTAL)}%</p>
            </div>
            <div className="text-center">
              <Clock size={16} className="text-amber-500 mx-auto mb-1" />
              <p className="text-xs text-gray-400">В обработке</p>
              <p className="text-sm font-bold text-amber-600">{pct(PENDING, TOTAL)}%</p>
            </div>
            <div className="text-center">
              <XCircle size={16} className="text-red-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Отказ</p>
              <p className="text-sm font-bold text-red-500">{pct(REJECTED, TOTAL)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent applications table */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Последние заявки</h3>
        <p className="text-xs text-gray-400 mb-4">Актуальные записи по заявкам на прикрепление</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Дата</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Заявитель</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">ИИН</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Статус</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Д-учёт</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {statusRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 pr-4 text-gray-500 text-xs">{row.date}</td>
                  <td className="py-2.5 pr-4 font-medium text-gray-900">{row.applicant}</td>
                  <td className="py-2.5 pr-4 text-gray-400 text-xs font-mono">{row.iin}</td>
                  <td className="py-2.5 pr-4">{statusBadge(row.label)}</td>
                  <td className="py-2.5">
                    {row.d ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                        <Activity size={10} /> Д-учёт
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
