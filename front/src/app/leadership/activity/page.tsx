import { polyclinicActivity, polyclinicActivityGrand, polyclinicMeta } from "@/data/polyclinic";
import { PolyclinicActivityBar } from "@/components/charts/PolyclinicActivityBar";
import { cn } from "@/lib/utils";

export default function LeadershipActivityPage() {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-900">
        <strong>Актив поликлиники</strong> — распределение по ЦСЗ (данные как в вашей таблице Excel).{" "}
        <span className="font-semibold">Моб. бригада</span> — {polyclinicActivity.find((r) => r.csz === "Моб бригада")?.pct}% от общего актива.
      </div>

      <div className="card overflow-hidden">
        <div className="px-4 py-2 bg-yellow-100 border-b border-amber-300">
          <h1 className="text-sm font-bold text-gray-900">Актив поликлиники</h1>
          <p className="text-xs text-gray-600">{polyclinicMeta.networkName}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="text-left font-semibold text-slate-700 px-3 py-2 border-r border-slate-200">ЦСЗ</th>
                <th className="text-right font-semibold text-slate-700 px-3 py-2 border-r border-slate-200 w-28">Итог</th>
                <th className="text-right font-semibold text-slate-700 px-3 py-2 w-24">%</th>
              </tr>
            </thead>
            <tbody>
              {polyclinicActivity.map((row) => (
                <tr
                  key={row.csz}
                  className={cn(
                    "border-b border-slate-200",
                    row.highlight === "critical" && "bg-red-100 font-semibold"
                  )}
                >
                  <td className="px-3 py-2 border-r border-slate-100">{row.csz}</td>
                  <td className="text-right px-3 py-2 border-r border-slate-100 tabular-nums">{row.total}</td>
                  <td className="text-right px-3 py-2 tabular-nums">{row.pct}%</td>
                </tr>
              ))}
              <tr className="bg-yellow-100 font-bold border-t-2 border-amber-400">
                <td className="px-3 py-2 border-r border-slate-200">Общий итог</td>
                <td className="text-right px-3 py-2 border-r border-slate-200 tabular-nums">{polyclinicActivityGrand.total}</td>
                <td className="text-right px-3 py-2 tabular-nums">{polyclinicActivityGrand.pct}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Диаграмма</h3>
        <PolyclinicActivityBar />
      </div>
    </div>
  );
}
