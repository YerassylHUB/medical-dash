"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { patientFlowData } from "@/data/mock";

const CHART_H = 260;

export function PatientFlowChart() {
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
      <AreaChart data={patientFlowData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDischarged" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
        <Area type="monotone" dataKey="admitted" name="Поступления" stroke="#3b82f6" strokeWidth={2} fill="url(#colorAdmitted)" dot={false} activeDot={{ r: 4 }} />
        <Area type="monotone" dataKey="discharged" name="Выписки" stroke="#10b981" strokeWidth={2} fill="url(#colorDischarged)" dot={false} activeDot={{ r: 4 }} />
        <Area type="monotone" dataKey="emergency" name="Экстренные" stroke="#ef4444" strokeWidth={2} fill="url(#colorEmergency)" dot={false} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}
