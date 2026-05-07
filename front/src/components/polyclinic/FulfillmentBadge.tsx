import { cn } from "@/lib/utils";

/** Подсветка % как в Excel: ниже 100 — янтарь, от 100 — зелёный; маркеры — красный при высокой доле просрочки */
export function FulfillmentBadge({ pct }: { pct: number | null }) {
  if (pct === null || Number.isNaN(pct)) {
    return <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-violet-100 text-violet-800">∞</span>;
  }
  const over = pct >= 100;
  const low = pct < 50;
  return (
    <span
      className={cn(
        "inline-flex min-w-[3.25rem] justify-center px-2 py-0.5 rounded text-xs font-bold tabular-nums",
        over && "bg-emerald-100 text-emerald-800 border border-emerald-200",
        !over && !low && "bg-amber-100 text-amber-900 border border-amber-200",
        low && "bg-amber-50 text-amber-800 border border-amber-200"
      )}
    >
      {pct.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%
    </span>
  );
}

export function OverduePctBadge({ pct, critical }: { pct: number; critical?: boolean }) {
  const bad = pct >= 70 || critical;
  const mid = pct >= 30 && pct < 70;
  return (
    <span
      className={cn(
        "inline-flex min-w-[3rem] justify-center px-2 py-0.5 rounded text-xs font-bold tabular-nums",
        bad && "bg-red-100 text-red-800 border border-red-200",
        mid && !bad && "bg-amber-100 text-amber-900 border border-amber-200",
        !bad && !mid && "bg-slate-100 text-slate-700 border border-slate-200"
      )}
    >
      {pct}%
    </span>
  );
}
