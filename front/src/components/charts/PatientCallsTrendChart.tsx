"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { patientCallsMonthly, type PatientCallsMonthRow } from "@/data/patient-calls";

const data = patientCallsMonthly;

function formatRu(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("ru-RU");
}

function monthCompositionTotal(row: PatientCallsMonthRow): number {
  return row.ambulanceCalls + row.unservedPolyclinicEom + row.closedUnservedAfterOutreach;
}

/** Пропсы от Recharts Tooltip — без импорта внутренних типов пакета (совместимость со сборкой). */
function PatientCallsMonthTooltip(props: {
  active?: boolean;
  payload?: readonly {
    dataKey?: unknown;
    name?: unknown;
    value?: unknown;
    color?: string;
    payload?: PatientCallsMonthRow;
  }[];
  label?: unknown;
}) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload as PatientCallsMonthRow | undefined;
  if (!row || typeof row.ambulanceCalls !== "number") return null;
  const total = monthCompositionTotal(row);

  const labelText =
    label == null ? "" : typeof label === "string" || typeof label === "number" ? String(label) : "";

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-lg min-w-[15rem]"
      style={{ boxShadow: "0 8px 24px rgb(15 23 42 / 0.12)" }}
    >
      <p className="font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-2">{labelText}</p>
      <p className="text-[10px] leading-snug text-slate-500 mb-2">
        Доля от суммы за месяц: вызовы скорой + остаток «не обслужены» + закрыто обзвоном (= 100%)
      </p>
      <ul className="space-y-2">
        {payload.map((item, idx) => {
          const raw = item.value;
          const v =
            typeof raw === "number"
              ? raw
              : Array.isArray(raw)
                ? Number(raw[0])
                : Number(raw);
          const safe = Number.isFinite(v) ? v : 0;
          const pct = total > 0 ? ((100 * safe) / total).toFixed(1).replace(".", ",") : "0,0";
          const title = typeof item.name === "string" ? item.name : String(item.name ?? "");
          return (
            <li key={`${String(item.dataKey)}-${idx}`} className="flex items-start justify-between gap-3">
              <span className="flex items-start gap-2 text-slate-600 leading-snug min-w-0">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color ?? "#94a3b8" }}
                  aria-hidden
                />
                <span>{title}</span>
              </span>
              <span className="shrink-0 tabular-nums text-right text-slate-900">
                <span className="font-semibold">{formatRu(safe)}</span>
                <span className="text-slate-500 font-normal"> ({pct}%)</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 tabular-nums">
        Всего за месяц (сумма): {formatRu(total)}
      </p>
    </div>
  );
}

const CHART_H = 300;

export function PatientCallsTrendChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full rounded-lg border border-slate-100 bg-slate-50"
        style={{ height: CHART_H }}
        aria-busy="true"
      />
    );
  }

  return (
    <div className="w-full rounded-lg border border-slate-100 bg-slate-50/80" style={{ height: CHART_H }}>
      <ResponsiveContainer width="100%" height={CHART_H}>
        <BarChart data={data} margin={{ left: 4, right: 8, top: 12, bottom: 4 }} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={44} />
          <Tooltip content={PatientCallsMonthTooltip} cursor={{ fill: "rgb(148 163 184 / 0.12)" }} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
          <Bar
            dataKey="ambulanceCalls"
            name="Вызовы скорой (в месяц)"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="unservedPolyclinicEom"
            name="Не обслужены врачом (на конец месяца)"
            fill="#ea580c"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="closedUnservedAfterOutreach"
            name="Закрыто обзвоном (в месяц)"
            fill="#059669"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
