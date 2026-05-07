import { cn, formatChange } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  accent?: string;
}

export function StatCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
  accent = "border-blue-500",
}: StatCardProps) {
  const isPositive = change !== undefined ? change >= 0 : null;

  return (
    <div className={cn("card p-5 border-l-4 hover:shadow-md transition-all duration-200", accent)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1.5">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2", isPositive ? "text-emerald-600" : "text-red-500")}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="text-xs font-semibold">{formatChange(change)}</span>
              <span className="text-xs text-gray-400">vs прошлый мес.</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
