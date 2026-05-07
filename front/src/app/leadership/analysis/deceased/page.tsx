import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { deceasedDispensaryStats, analysisPeriod } from "@/data/executive-analysis";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";

const analysisHub = `${LEADERSHIP_BASE}/analysis`;

export default function LeadershipDeceasedDispensaryPage() {
  const s = deceasedDispensaryStats;
  return (
    <div className="space-y-5 max-w-3xl">
      <Link href={analysisHub} className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline">
        <ChevronLeft size={16} /> К оглавлению разделов
      </Link>

      <div className="card p-6 border-l-4 border-red-600">
        <h1 className="text-xl font-bold text-gray-900">Анализ по умершим пациентам, состоявшим на диспансерном учёте</h1>
        <p className="text-sm text-gray-500 mt-2">Период: {analysisPeriod.label}</p>
      </div>

      <div className="card p-6 text-gray-800 leading-relaxed text-base">
        <p>
          За анализируемый период на диспансерном учёте состояло{" "}
          <strong className="text-gray-900 tabular-nums">{s.notRemovedTimely}</strong> умерших пациентов, которые своевременно не были сняты с
          диспансерного наблюдения. Из них лекарственными средствами в рамках гарантированного объёма бесплатной медицинской помощи были обеспечены{" "}
          <strong className="text-gray-900 tabular-nums">{s.gobmpMedicationProvided}</strong> пациентов, что составляет{" "}
          <strong className="text-gray-900 tabular-nums">{s.gobmpMedicationPct.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</strong> от общего
          числа неснятых с учёта умерших пациентов.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Не сняты вовремя</p>
          <p className="text-2xl font-bold text-amber-800 mt-1 tabular-nums">{s.notRemovedTimely}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Обеспечено по ГОБМП</p>
          <p className="text-2xl font-bold text-emerald-800 mt-1 tabular-nums">{s.gobmpMedicationProvided}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Доля обеспеченных</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            {s.gobmpMedicationPct.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Числа задаются в <code className="bg-gray-100 px-1 rounded">src/data/executive-analysis.ts</code> →{" "}
        <code className="bg-gray-100 px-1 rounded">deceasedDispensaryStats</code>.
      </p>
    </div>
  );
}
