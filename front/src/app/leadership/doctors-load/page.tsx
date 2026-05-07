import { doctorWorkloadMarch, polyclinicMeta } from "@/data/polyclinic";
import { cn } from "@/lib/utils";

export default function LeadershipDoctorsLoadPage() {
  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
          <h1 className="text-sm font-bold text-gray-900">Нагрузка врачей за март · ставки 0,5 / 0,75 / 1,0</h1>
          <p className="text-xs text-gray-600 mt-0.5">{polyclinicMeta.networkName}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-200 border-b border-slate-300">
                <th className="text-left font-semibold px-2 py-2 border-r border-slate-300 w-10">№</th>
                <th className="text-left font-semibold px-2 py-2 border-r border-slate-300">ФИО</th>
                <th className="text-right font-semibold px-2 py-2 border-r border-slate-300 whitespace-nowrap">
                  Услуг за март
                </th>
                <th className="text-right font-semibold px-2 py-2 border-r border-slate-300 whitespace-nowrap">
                  Нагрузка на 1,0 (168 ч)
                </th>
                <th className="text-right font-semibold px-2 py-2 border-r border-slate-300 whitespace-nowrap">
                  На 0,75 (126 ч)
                </th>
                <th className="text-right font-semibold px-2 py-2 whitespace-nowrap">На 0,5 (84 ч)</th>
              </tr>
            </thead>
            <tbody>
              {doctorWorkloadMarch.map((d) => {
                const warnRow = d.rank >= 18;
                const topRow = d.rank <= 7;
                return (
                  <tr key={d.rank} className={cn("border-b border-slate-100", topRow && "bg-emerald-50/50")}>
                    <td className="px-2 py-1.5 border-r border-slate-100 text-slate-500">{d.rank}</td>
                    <td className="px-2 py-1.5 border-r border-slate-100 font-medium text-gray-800">{d.name}</td>
                    <td className="text-right px-2 py-1.5 border-r border-slate-100 tabular-nums font-semibold">{d.services}</td>
                    <td
                      className={cn(
                        "text-right px-2 py-1.5 border-r border-slate-100 tabular-nums",
                        warnRow && "text-red-600 font-semibold"
                      )}
                    >
                      {d.load1.toFixed(2)}
                    </td>
                    <td
                      className={cn(
                        "text-right px-2 py-1.5 border-r border-slate-100 tabular-nums",
                        topRow && "bg-emerald-100/80 font-medium"
                      )}
                    >
                      {d.load075.toFixed(2)}
                    </td>
                    <td className={cn("text-right px-2 py-1.5 tabular-nums", topRow && "bg-emerald-100/80 font-medium")}>
                      {d.load05.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Зелёный фон — верхние строки (как условное форматирование в Excel). Красный шрифт в колонке «1,0 ставка» — с 18-й строки, как на вашем скрине.
      </p>
    </div>
  );
}
