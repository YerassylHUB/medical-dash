import {
  PatientFlowChartDynamic,
  RevenueChartDynamic,
  OccupancyChartDynamic,
  DiagnosisChartDynamic,
} from "@/components/charts/charts-dynamic";

export default function AnalyticsPage() {
  const insights = [
    { label: "Рост пациентов г/г", value: "+18.4%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Средний койко-день", value: "6.3 дн.", color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Летальность", value: "0.8%", color: "text-red-600", bg: "bg-red-50" },
    { label: "Удовлетворённость", value: "94.2%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Повторные госп.", value: "3.1%", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Операционный маржа", value: "28.4%", color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <div className="space-y-5">
      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {insights.map((i) => (
          <div key={i.label} className="card p-4 text-center">
            <p className={`text-2xl font-bold ${i.color}`}>{i.value}</p>
            <p className="text-xs text-gray-400 mt-1 leading-tight">{i.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Поток пациентов по месяцам</h3>
          <p className="text-xs text-gray-400 mb-4">Поступления, выписки, экстренные случаи</p>
          <PatientFlowChartDynamic />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Финансовые показатели</h3>
          <p className="text-xs text-gray-400 mb-4">Доходы vs расходы, прибыль</p>
          <RevenueChartDynamic />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 card p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Загруженность отделений</h3>
          <p className="text-xs text-gray-400 mb-4">Занятость коек в разрезе отделений</p>
          <OccupancyChartDynamic />
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-1">Структура заболеваний</h3>
          <p className="text-xs text-gray-400 mb-4">Распределение диагнозов</p>
          <DiagnosisChartDynamic />
        </div>
      </div>

      {/* Trend table */}
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Квартальные показатели 2026</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-medium">Показатель</th>
                <th className="px-4 py-3 text-center font-medium">Q1 2026</th>
                <th className="px-4 py-3 text-center font-medium">Q2 2026</th>
                <th className="px-4 py-3 text-center font-medium">Q3 2026</th>
                <th className="px-4 py-3 text-center font-medium">Q4 2026</th>
                <th className="px-4 py-3 text-center font-medium">Тренд</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: "Госпитализации", q1: 625, q2: 780, q3: 885, q4: 893, trend: "▲ +43%" },
                { name: "Выписки", q1: 593, q2: 741, q3: 851, q4: 858, trend: "▲ +45%" },
                { name: "Операции", q1: 145, q2: 182, q3: 210, q4: 198, trend: "▲ +37%" },
                { name: "Доходы (млн ₸)", q1: 106, q2: 127, q3: 147, q4: 153, trend: "▲ +44%" },
                { name: "Расходы (млн ₸)", q1: 83, q2: 94, q3: 106, q4: 110, trend: "▲ +33%" },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{row.q1}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{row.q2}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{row.q3}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{row.q4}</td>
                  <td className="px-4 py-3 text-center font-semibold text-emerald-600">{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
