import Link from "next/link";
import { executiveSections, analysisPeriod } from "@/data/executive-analysis";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";
import {
  BarChart3,
  Activity,
  DoorOpen,
  ShieldCheck,
  Coins,
  TrendingUp,
  ClipboardList,
  Microscope,
  AlertTriangle,
  Lightbulb,
  FileWarning,
  ChevronRight,
} from "lucide-react";

const icons = [Activity, DoorOpen, ShieldCheck, Coins, TrendingUp, ClipboardList, Microscope, AlertTriangle, Lightbulb];
const analysisBase = `${LEADERSHIP_BASE}/analysis`;

export default function LeadershipAnalysisHubPage() {
  return (
    <div className="space-y-6">
      <div className="card p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
        <div className="flex items-start gap-3">
          <BarChart3 className="w-10 h-10 text-blue-300 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold">Основные разделы анализа</h2>
            <p className="text-sm text-slate-300 mt-1">
              Структура отчёта для руководства · период: <strong className="text-white">{analysisPeriod.label}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {executiveSections.map((s, i) => {
          const Icon = icons[i] ?? BarChart3;
          return (
            <Link
              key={s.slug}
              href={`${analysisBase}/${s.slug}`}
              className="card p-4 flex items-start gap-3 hover:border-blue-200 hover:shadow-md transition-all group border border-gray-100"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-blue-600">{s.order}. раздел</p>
                <p className="font-semibold text-gray-900 mt-0.5 leading-snug">{s.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-1" />
            </Link>
          );
        })}
      </div>

      <Link
        href={`${analysisBase}/deceased`}
        className="card p-4 flex items-center gap-4 border-red-100 bg-red-50/40 hover:bg-red-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <FileWarning className="w-5 h-5 text-red-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-red-900">Анализ по умершим пациентам на диспансерном учёте</p>
          <p className="text-xs text-red-800/80 mt-0.5">Текстовый отчёт с показателями ГОБМП и снятия с учёта</p>
        </div>
        <ChevronRight className="w-5 h-5 text-red-300" />
      </Link>
    </div>
  );
}
