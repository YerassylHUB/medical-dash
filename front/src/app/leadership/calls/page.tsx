import {
  patientCallsMeta,
  patientCallsMonthly,
  patientCallsAggregates,
  patientCallsCszDetailRows,
} from "@/data/patient-calls";
import { polyclinicActivityGrand } from "@/data/polyclinic";
import { PatientCallsTrendChart } from "@/components/charts/PatientCallsTrendChart";
import { PatientCallsCszStepList } from "@/components/leadership/PatientCallsCszStepList";
import { Phone, Stethoscope, Users, UserX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadershipPatientCallsPage() {
  const agg = patientCallsAggregates();
  const cszDetails = patientCallsCszDetailRows(agg.unservedEndPeriod);

  const kpis: {
    icon: typeof Phone;
    label: string;
    value: string;
    hint: string;
    color: string;
    bg: string;
    border: string;
  }[] = [
    {
      icon: Phone,
      label: "Вызовы скорой за период",
      value: agg.ambulanceCallsTotal.toLocaleString("ru-RU"),
      hint: `в среднем ${agg.ambulanceCallsAvgMonth.toLocaleString("ru-RU")} / мес.`,
      color: "text-blue-700",
      bg: "bg-blue-50/90",
      border: "border-l-4 border-blue-600",
    },
    {
      icon: UserX,
      label: "Не обслужены врачом (на конец периода)",
      value: agg.unservedEndPeriod.toLocaleString("ru-RU"),
      hint: `${agg.shareUnservedOfActivePercent}% от общего актива поликлиники (${polyclinicActivityGrand.total})`,
      color: "text-orange-800",
      bg: "bg-orange-50/90",
      border: "border-l-4 border-orange-500",
    },
    {
      icon: Stethoscope,
      label: "Снято с учёта после обзвона",
      value: agg.closedUnservedTotal.toLocaleString("ru-RU"),
      hint: "за квартал (демо)",
      color: "text-emerald-700",
      bg: "bg-emerald-50/90",
      border: "border-l-4 border-emerald-500",
    },
    {
      icon: Users,
      label: "Месяцев в срезе",
      value: String(patientCallsMonthly.length),
      hint: patientCallsMeta.periodLabel,
      color: "text-slate-700",
      bg: "bg-slate-50/90",
      border: "border-l-4 border-slate-400",
    },
  ];

  return (
    <div className="space-y-5 pb-8">
      <div className="card p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-md">
        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide">Вызовы и поликлиника</p>
        <h2 className="text-lg font-bold mt-1">Сводка по вызовам и необслуженным</h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">{patientCallsMeta.dataNote}</p>
        <p className="text-xs text-slate-400 mt-2">
          <span className="text-slate-200 font-medium">{patientCallsMeta.networkName}</span>
          <span className="mx-1.5">·</span>
          {patientCallsMeta.periodLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className={cn("card p-4 border border-slate-100 shadow-sm", k.bg, k.border)}>
              <div className="flex items-start gap-3">
                <Icon className={cn("w-8 h-8 shrink-0 opacity-90", k.color)} aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600 leading-snug">{k.label}</p>
                  <p className={cn("text-2xl font-bold tabular-nums mt-1", k.color)}>{k.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{k.hint}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-5 shadow-sm border-slate-100">
        <h3 className="text-sm font-semibold text-gray-900">Динамика по месяцам</h3>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Синий — вызовы скорой; оранжевый — остаток «не обслужены врачом»; зелёный — закрыто обзвоном за месяц.
        </p>
        <PatientCallsTrendChart />
      </div>

      <div className="card shadow-sm border-slate-100">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-semibold text-gray-900">ЦСЗ и участки</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Нажмите ЦСЗ — участки и цифры; под участком кнопка «Пациенты по списку» — ФИО, ИИН, статус. Демо; по сети ≈{" "}
            {agg.unservedEndPeriod} необслуженных.
          </p>
        </div>
        <div className="p-4 bg-slate-50/50">
          <PatientCallsCszStepList
            details={cszDetails}
            networkUnservedHint={`Сумма «не обслужено» по сети ≈ ${agg.unservedEndPeriod}.`}
          />
        </div>
      </div>
    </div>
  );
}
