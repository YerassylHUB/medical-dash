import { servicesPlanFactGOBMP, servicesPlanFactOSMS, polyclinicMeta } from "@/data/polyclinic";
import { FulfillmentBadge } from "@/components/polyclinic/FulfillmentBadge";
import { cn, formatKZT } from "@/lib/utils";

function ServiceTable({
  title,
  rows,
}: {
  title: string;
  rows: { service: string; plan: number; fact: number; pct: number | null; boxed?: boolean }[];
}) {
  return (
    <div className="card overflow-hidden mb-6">
      <div className="px-4 py-2 bg-slate-800 text-white">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-xs text-slate-300">План / факт / % · {polyclinicMeta.sliceMonth}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="text-left font-semibold px-3 py-2 border-r border-slate-200">Услуга</th>
              <th className="text-right font-semibold px-3 py-2 border-r border-slate-200 whitespace-nowrap">План</th>
              <th className="text-right font-semibold px-3 py-2 border-r border-slate-200 whitespace-nowrap">Факт</th>
              <th className="text-center font-semibold px-3 py-2 w-28">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.service} className="border-b border-slate-100 hover:bg-slate-50/80">
                <td className="px-3 py-2 border-r border-slate-100 font-medium text-gray-800">{r.service}</td>
                <td className="text-right px-3 py-2 border-r border-slate-100 tabular-nums">{formatKZT(r.plan, 2)}</td>
                <td className="text-right px-3 py-2 border-r border-slate-100 tabular-nums">{formatKZT(r.fact, 2)}</td>
                <td className="text-center px-3 py-2">
                  <span className={cn(r.boxed && "inline-block ring-2 ring-red-500 rounded px-1 py-0.5")}>
                    <FulfillmentBadge pct={r.pct} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadershipServicesPlanPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Отчёт в формате Power BI: срез по филиалу <strong>{polyclinicMeta.reportBranch}</strong>. Красная рамка — как на вашем скрине (около 103% по лаборатории и реабилитации).
      </p>
      <ServiceTable title="ОСМС" rows={servicesPlanFactOSMS} />
      <ServiceTable title="ГОБМП" rows={servicesPlanFactGOBMP} />
    </div>
  );
}
