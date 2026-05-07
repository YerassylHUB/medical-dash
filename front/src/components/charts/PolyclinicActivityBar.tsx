"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { polyclinicActivity } from "@/data/polyclinic";

const data = [...polyclinicActivity].sort((a, b) => b.total - a.total);

const CHART_H = 320;

export function PolyclinicActivityBar() {
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
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }} barSize={18}>
        <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="csz" width={100} tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(v: number) => [v, "Итог"]}
          labelFormatter={(l) => String(l)}
          contentStyle={{ borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="total" name="Итог" radius={[0, 4, 4, 0]}>
          {data.map((e, i) => (
            <Cell key={i} fill={e.highlight === "critical" ? "#b91c1c" : "#2563eb"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
