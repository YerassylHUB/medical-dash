import { LeadershipTabBar } from "@/components/leadership/LeadershipTabBar";

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LeadershipTabBar />
      {/* Без flex-1 у контента: высота = вкладки + страница; скролл остаётся у <main>, иначе flex-1+min-h-0 даёт «ноль» в части окружений */}
      <div className="pt-5 pb-10">{children}</div>
    </div>
  );
}
