import {
  fluorographyMarkers,
  fluorographyGrand,
  oncoMarker2,
  oncoMarker2Grand,
} from "@/data/polyclinic";
import { MarkersComparisonBarChart } from "@/components/charts/charts-dynamic";
import { OverduePctBadge } from "@/components/polyclinic/FulfillmentBadge";
import { cn } from "@/lib/utils";

function MarkerTable({
  title,
  subtitle,
  rows,
  grand,
  highlightGrand,
}: {
  title: string;
  subtitle: string;
  rows: { csz: string; total: number; overdue: number; pct: number; warn?: boolean; critical?: boolean }[];
  grand: { total: number; overdue: number; pct: number };
  highlightGrand?: boolean;
}) {
  return (
    <div className="card overflow-hidden mb-6">
      <div className="px-4 py-2 bg-yellow-200 border-b border-amber-400">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-700">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="text-left font-semibold px-3 py-2 border-r border-slate-200">ЦСЗ</th>
              <th className="text-right font-semibold px-3 py-2 border-r border-slate-200">Итог</th>
              <th className="text-right font-semibold px-3 py-2 border-r border-slate-200">Просроч</th>
              <th className="text-right font-semibold px-3 py-2">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.csz}
                className={cn(
                  "border-b border-slate-100",
                  (r.warn || r.critical) && "bg-amber-50",
                  r.critical && r.pct >= 88 && "bg-red-50"
                )}
              >
                <td className="px-3 py-2 border-r border-slate-100 font-medium">{r.csz}</td>
                <td className="text-right px-3 py-2 border-r border-slate-100 tabular-nums">{r.total}</td>
                <td className="text-right px-3 py-2 border-r border-slate-100 tabular-nums">{r.overdue}</td>
                <td className="text-right px-3 py-2">
                  <OverduePctBadge pct={r.pct} critical={r.critical} />
                </td>
              </tr>
            ))}
            <tr className="bg-yellow-100 font-bold border-t-2 border-amber-400">
              <td className="px-3 py-2 border-r border-slate-200">Общий итог</td>
              <td className="text-right px-3 py-2 border-r border-slate-200 tabular-nums">{grand.total}</td>
              <td className="text-right px-3 py-2 border-r border-slate-200 tabular-nums">{grand.overdue}</td>
              <td className="text-right px-3 py-2">
                <OverduePctBadge pct={grand.pct} critical={highlightGrand} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadershipMarkersPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Маркеры качества: доля просроченных случаев по ЦСЗ (как в Excel с жёлтым / красным фоном).
      </p>
      <MarkerTable
        title="Маркеры флюорозаряженности"
        subtitle="Контроль своевременности · по ЦСЗ"
        rows={fluorographyMarkers}
        grand={fluorographyGrand}
        highlightGrand={false}
      />
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Флюорография: в срок vs просрочено</h3>
        <MarkersComparisonBarChart rows={fluorographyMarkers} />
      </div>

      <MarkerTable
        title="Онконастороженность маркер 2"
        subtitle="Просроченные случаи по ЦСЗ"
        rows={oncoMarker2}
        grand={oncoMarker2Grand}
        highlightGrand
      />
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Онконастороженность: в срок vs просрочено</h3>
        <MarkersComparisonBarChart rows={oncoMarker2} />
      </div>
    </div>
  );
}
