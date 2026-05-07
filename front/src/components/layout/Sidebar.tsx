"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hospital,
  Users,
  Building2,
  UserCheck,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Settings,
  Heart,
  Bell,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";
import { BackendStatus } from "@/components/layout/BackendStatus";

const mainNav = [
  { href: LEADERSHIP_BASE, label: "Руководство", icon: LayoutDashboard, prefixMatch: true as const },
];

const hospitalNav = [
  { href: "/hospital", label: "Стационар (демо)", icon: Hospital },
  { href: "/patients", label: "Пациенты", icon: Users },
  { href: "/departments", label: "Отделения", icon: Building2 },
  { href: "/staff", label: "Персонал", icon: UserCheck },
  { href: "/finance", label: "Финансы", icon: TrendingUp },
  { href: "/analytics", label: "Графики (демо)", icon: BarChart3 },
  { href: "/attachment", label: "Заявка на прикрепление", icon: ClipboardList },
  { href: `${LEADERSHIP_BASE}/upload`, label: "Загрузка Excel", icon: FileSpreadsheet },
];

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  prefixMatch?: boolean;
};

function NavGroup({ title, items, pathname }: { title: string; items: NavItem[]; pathname: string }) {
  return (
    <div className="mb-4">
      <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
      <div className="space-y-1">
        {items.map(({ href, label, icon: Icon, prefixMatch }) => {
          const active = prefixMatch ? pathname === href || pathname.startsWith(`${href}/`) : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("flex-shrink-0", active ? "text-white" : "text-gray-400 group-hover:text-blue-600")} size={18} />
              <span className="flex-1 leading-snug">{label}</span>
              {active && <ChevronRight size={14} className="text-blue-200 flex-shrink-0" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <Heart className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">MedDash</p>
          <p className="text-xs text-gray-400">СЗТ · аналитика</p>
        </div>
      </div>

      <div className="px-4 py-3 mx-3 mt-3 bg-blue-50 rounded-xl">
        <p className="text-xs font-semibold text-blue-700 truncate">Отчёты и показатели</p>
        <p className="text-xs text-gray-500 mt-0.5">Вкладки внутри «Руководство»</p>
        <BackendStatus />
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <NavGroup title="Меню" items={mainNav} pathname={pathname} />
        <NavGroup title="Дополнительно" items={hospitalNav} pathname={pathname} />
      </nav>

      <div className="p-3 border-t border-gray-100 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all group"
        >
          <Settings size={18} className="text-gray-400 group-hover:text-blue-600" />
          <span>Настройки</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
            АД
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">А. Дюсенов</p>
            <p className="text-xs text-gray-400">Руководство</p>
          </div>
          <Bell size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
