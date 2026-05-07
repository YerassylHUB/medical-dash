"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type MarkerRow = { csz: string; total: number; overdue: number };

const CHART_H = 280;

export function MarkersComparisonBar({ rows }: { rows: MarkerRow[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const data = rows.map((r) => ({
    csz: r.csz.length > 12 ? r.csz.slice(0, 11) + "…" : r.csz,
    "В срок": Math.max(0, r.total - r.overdue),
    Просроч: r.overdue,
  }));

  if (!mounted) {
    return (
      <div
        className="w-full rounded-lg bg-slate-100 animate-pulse"
        style={{ height: CHART_H }}
        aria-busy="true"
      />
    );
  }

  return (
    <div className="w-full" style={{ height: CHART_H }}>
      <ResponsiveContainer width="100%" height={CHART_H}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 8 }} barSize={12}>
        <XAxis dataKey="csz" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={70} />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="В срок" fill="#94a3b8" name="В срок" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Просроч" fill="#dc2626" name="Просрочено" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
