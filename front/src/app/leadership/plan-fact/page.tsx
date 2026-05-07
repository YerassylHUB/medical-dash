import {
  fundingGOBMPRows,
  fundingGOBMPTotal,
  fundingOSMSRows,
  fundingOSMSTotal,
  polyclinicMeta,
} from "@/data/polyclinic";
import { cn, formatKZT } from "@/lib/utils";
import { FulfillmentBadge } from "@/components/polyclinic/FulfillmentBadge";

function FundingBlock({
  title,
  rows,
  total,
}: {
  title: string;
  rows: { csz: string; doctor: string; plan: number; fact: number; pct: number }[];
  total: { plan: number; fact: number; pct: number; remainder: number };
}) {
  return (
    <div className="card overflow-hidden mb-6">
      <div className="px-4 py-2 bg-slate-200 border-b border-slate-300">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-600">
          План / факт · {polyclinicMeta.fundingTitleMonth} · срез {polyclinicMeta.fundingSliceDate}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="text-left font-semibold px-2 py-2 border-r border-slate-200">ЦСЗ</th>
              <th className="text-left font-semibold px-2 py-2 border-r border-slate-200">Врач</th>
              <th className="text-right font-semibold px-2 py-2 border-r border-slate-200 whitespace-nowrap">План</th>
              <th className="text-right font-semibold px-2 py-2 border-r border-slate-200 whitespace-nowrap">Факт</th>
              <th className="text-center font-semibold px-2 py-2 border-r border-slate-200 w-24">%</th>
              <th className="text-right font-semibold px-2 py-2 whitespace-nowrap">Остаток</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const remainder = r.plan - r.fact;
              return (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-2 py-2 border-r border-slate-100 font-medium">{r.csz}</td>
                  <td className="px-2 py-2 border-r border-slate-100 text-slate-600">{r.doctor}</td>
                  <td className="text-right px-2 py-2 border-r border-slate-100 tabular-nums">{formatKZT(r.plan, 2)}</td>
                  <td className="text-right px-2 py-2 border-r border-slate-100 tabular-nums">{formatKZT(r.fact, 2)}</td>
                  <td className="text-center px-2 py-2 border-r border-slate-100">
                    <FulfillmentBadge pct={r.pct} />
                  </td>
                  <td className="text-right px-2 py-2 tabular-nums text-slate-700">{formatKZT(remainder, 2)}</td>
                </tr>
              );
            })}
            <tr className="bg-amber-50 font-bold border-t-2 border-amber-400">
              <td colSpan={2} className="px-2 py-2 border-r border-slate-200">
                ИТОГО
              </td>
              <td className="text-right px-2 py-2 border-r border-slate-200 tabular-nums">{formatKZT(total.plan, 2)}</td>
              <td className="text-right px-2 py-2 border-r border-slate-200 tabular-nums">{formatKZT(total.fact, 2)}</td>
              <td className="text-center px-2 py-2 border-r border-slate-200">
                <FulfillmentBadge pct={total.pct} />
              </td>
              <td className={cn("text-right px-2 py-2 tabular-nums", total.remainder < 0 && "text-red-700 font-semibold")}>
                {formatKZT(total.remainder, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadershipPlanFactPage() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        План финансирования СЗТ — структура как в Excel: источник → ЦСЗ → врач → план / факт / % / остаток.
      </p>
      <FundingBlock title="ГОБМП (гарантированный объём бесплатной мед. помощи)" rows={fundingGOBMPRows} total={fundingGOBMPTotal} />
      <FundingBlock title="ОСМС (обязательное социальное медицинское страхование)" rows={fundingOSMSRows} total={fundingOSMSTotal} />
    </div>
  );
}
