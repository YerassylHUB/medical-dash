"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { leadershipTabs, isLeadershipTabActive } from "@/config/leadership-tabs";
import { cn } from "@/lib/utils";

export function LeadershipTabBar() {
  const pathname = usePathname() ?? "";

  return (
    <div className="flex-shrink-0 border-b border-slate-300 bg-slate-200/90">
      <div className="flex items-end gap-0.5 overflow-x-auto px-1 pt-1 scrollbar-thin">
        {leadershipTabs.map((tab) => {
          const active = isLeadershipTabActive(pathname, tab);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex-shrink-0 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-t-md border border-b-0 transition-colors min-h-[2.5rem] flex items-center max-w-[11rem] sm:max-w-none text-center sm:text-left",
                active
                  ? "bg-white text-blue-800 border-slate-300 z-10 mb-[-1px] shadow-sm"
                  : "bg-slate-100/80 text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900 mb-0"
              )}
            >
              <span className="line-clamp-2 sm:line-clamp-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
