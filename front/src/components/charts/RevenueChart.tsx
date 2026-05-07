"use client";

import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/data/mock";

const formatted = revenueData.map((d) => ({
  ...d,
  income: d.income / 1_000_000,
  expenses: d.expenses / 1_000_000,
  profit: (d.income - d.expenses) / 1_000_000,
}));

const CHART_H = 280;

export function RevenueChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <ComposedChart data={formatted} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit=" млн" />
        <Tooltip
          contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px" }}
          formatter={(v: number) => [`${v.toFixed(1)} млн ₸`, ""]}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="income" name="Доходы" fill="#3b82f6" opacity={0.85} radius={[4, 4, 0, 0]} barSize={14} />
        <Bar dataKey="expenses" name="Расходы" fill="#f97316" opacity={0.85} radius={[4, 4, 0, 0]} barSize={14} />
        <Line type="monotone" dataKey="profit" name="Прибыль" stroke="#10b981" strokeWidth={2.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
    </div>
  );
}
