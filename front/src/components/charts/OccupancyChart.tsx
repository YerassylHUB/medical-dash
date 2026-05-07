"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { departmentOccupancy } from "@/data/mock";

const data = departmentOccupancy.map((d) => ({
  name: d.name.replace("ология", ""),
  occupied: d.occupied,
  free: d.beds - d.occupied,
  pct: Math.round((d.occupied / d.beds) * 100),
}));

const CHART_H = 260;

export function OccupancyChart() {
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
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={22}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const pct = data.find((d) => d.name === label)?.pct;
              return (
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs">
                  <p className="font-semibold text-gray-900 mb-1">{label}</p>
                  <p className="text-blue-600">Занято: {payload[0]?.value} коек</p>
                  <p className="text-gray-400">Свободно: {payload[1]?.value} коек</p>
                  <p className="text-gray-600 font-medium mt-1">Загруженность: {pct}%</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="occupied" name="Занято" stackId="a" radius={[0, 0, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.pct >= 90 ? "#ef4444" : entry.pct >= 75 ? "#f97316" : "#3b82f6"}
            />
          ))}
        </Bar>
        <Bar dataKey="free" name="Свободно" stackId="a" fill="#f1f5f9" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
