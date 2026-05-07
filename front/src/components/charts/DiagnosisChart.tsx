"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { diagnosisDistribution } from "@/data/mock";

const CHART_H = 200;

export function DiagnosisChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <div
          className="w-full rounded-lg bg-slate-100 animate-pulse"
          style={{ height: CHART_H }}
          aria-busy="true"
        />
        <div className="space-y-2 mt-2">
          {diagnosisDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-slate-200" />
                <span className="text-xs text-gray-400">{item.name}</span>
              </div>
              <span className="text-xs text-gray-300">—</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full" style={{ height: CHART_H }}>
        <ResponsiveContainer width="100%" height={CHART_H}>
        <PieChart>
          <Pie
            data={diagnosisDistribution}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {diagnosisDistribution.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px" }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-2">
        {diagnosisDistribution.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-xs text-gray-600">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-gray-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
