import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ExecutiveSectionDef } from "@/data/executive-analysis";
import { analysisPeriod } from "@/data/executive-analysis";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";

export function ExecutiveSectionView({ section }: { section: ExecutiveSectionDef }) {
  return (
    <div className="space-y-5">
      <Link
        href={`${LEADERSHIP_BASE}/analysis`}
        className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
      >
        <ChevronLeft size={16} /> К оглавлению разделов
      </Link>

      <div className="card p-5 border-l-4 border-blue-600">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          Раздел {section.order} · {analysisPeriod.label}
        </p>
        <h2 className="text-xl font-bold text-gray-900 mt-1">{section.title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{section.subtitle}</p>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Показатели в этом блоке</h3>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside marker:text-blue-500">
          {section.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {section.kpis.map((k) => (
          <div key={k.label} className="card p-4 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 leading-snug min-h-[2.5rem]">{k.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2 tabular-nums">{k.value}</p>
            {k.hint && <p className="text-xs text-gray-400 mt-1">{k.hint}</p>}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Значения демонстрационные. Подключите выгрузку из МИС / 1С / BI для автоматического обновления.
      </p>
    </div>
  );
}
