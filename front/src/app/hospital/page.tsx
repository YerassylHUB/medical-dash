import {
  Users,
  BedDouble,
  UserCheck,
  Clock,
  Scissors,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import {
  PatientFlowChartDynamic,
  OccupancyChartDynamic,
  DiagnosisChartDynamic,
} from "@/components/charts/charts-dynamic";
import { RecentActivity } from "@/components/charts/RecentActivity";
import { kpiData, recentActivities } from "@/data/mock";
import { formatMoney } from "@/lib/utils";

export default function HospitalOverviewPage() {
  const occupancyPct = Math.round((kpiData.occupiedBeds / kpiData.totalBeds) * 100);

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Демо-модуль «Стационар». Основной отчёт для руководства — разделы поликлиники в меню слева.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Пациентов"
          value={kpiData.totalPatients.toLocaleString()}
          change={kpiData.patientsChange}
          subtitle="Всего сейчас"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          accent="border-blue-500"
        />
        <StatCard
          title="Занято коек"
          value={`${kpiData.occupiedBeds}/${kpiData.totalBeds}`}
          change={kpiData.occupancyChange}
          subtitle={`${occupancyPct}% загруженность`}
          icon={BedDouble}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
          accent="border-violet-500"
        />
        <StatCard
          title="Персонал"
          value={kpiData.totalStaff}
          change={kpiData.staffChange}
          subtitle="Сотрудников"
          icon={UserCheck}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          accent="border-emerald-500"
        />
        <StatCard
          title="Ожидание"
          value={`${kpiData.avgWaitTime} мин`}
          change={kpiData.waitTimeChange}
          subtitle="Среднее время"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          accent="border-amber-500"
        />
        <StatCard
          title="Операции"
          value={kpiData.surgeriesToday}
          change={kpiData.surgeriesChange}
          subtitle="Сегодня"
          icon={Scissors}
          iconColor="text-red-600"
          iconBg="bg-red-50"
          accent="border-red-500"
        />
        <StatCard
          title="Выручка"
          value={formatMoney(kpiData.revenue)}
          change={kpiData.revenueChange}
          subtitle="За декабрь"
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          accent="border-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Поток пациентов</h2>
              <p className="text-xs text-gray-400">Поступления и выписки по месяцам</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">2026 год</span>
          </div>
          <PatientFlowChartDynamic />
        </div>
        <div className="card p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">Диагнозы</h2>
            <p className="text-xs text-gray-400">Распределение по категориям</p>
          </div>
          <DiagnosisChartDynamic />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Загруженность отделений</h2>
              <p className="text-xs text-gray-400">Занятость коек по отделениям</p>
            </div>
          </div>
          <OccupancyChartDynamic />
        </div>
        <div className="card p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">Последние события</h2>
            <p className="text-xs text-gray-400">Активность за сегодня</p>
          </div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
