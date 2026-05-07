"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, RefreshCw } from "lucide-react";
import { executiveSections } from "@/data/executive-analysis";
import { leadershipTabs, isLeadershipTabActive, LEADERSHIP_BASE } from "@/config/leadership-tabs";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/hospital": { title: "Стационар (демо)", description: "Общий обзор ГКБ" },
  "/patients": { title: "Пациенты", description: "Список пациентов" },
  "/departments": { title: "Отделения", description: "Загруженность" },
  "/staff": { title: "Персонал", description: "Сотрудники" },
  "/finance": { title: "Финансы", description: "Доходы и расходы" },
  "/analytics": { title: "Графики (демо)", description: "Тренды и диаграммы" },
  "/attachment": { title: "Заявка на прикрепление", description: "Статус заявок на прикрепление пациентов" },
};

function resolveLeadershipPage(pathname: string): { title: string; description: string } | null {
  if (!pathname.startsWith(LEADERSHIP_BASE)) return null;

  if (pathname === `${LEADERSHIP_BASE}/upload` || pathname === `${LEADERSHIP_BASE}/upload/`) {
    return {
      title: "Загрузка Excel",
      description: "Месяц данных, тип выгрузки и файл — превью и сопоставление колонок перед сохранением",
    };
  }

  if (pathname === `${LEADERSHIP_BASE}/calls` || pathname === `${LEADERSHIP_BASE}/calls/`) {
    return {
      title: "Вызовы и обслуживание",
      description: "Скорая: объём вызовов; поликлиника: пациенты без приёма врача и снятие с учёта после обзвона",
    };
  }

  if (pathname === `${LEADERSHIP_BASE}/deceased-list` || pathname === `${LEADERSHIP_BASE}/deceased-list/`) {
    return {
      title: "Умершие",
      description: "Список больных, снятых с диспансерного учёта по причине смерти",
    };
  }

  if (pathname === `${LEADERSHIP_BASE}/analysis/deceased` || pathname === `${LEADERSHIP_BASE}/analysis/deceased/`) {
    return {
      title: "Умершие на диспансерном учёте",
      description: "Снятие с учёта и обеспечение по ГОБМП",
    };
  }

  if (pathname === `${LEADERSHIP_BASE}/analysis` || pathname === `${LEADERSHIP_BASE}/analysis/`) {
    return { title: "Аналитика", description: "Основные разделы анализа (1–9)" };
  }

  if (pathname.startsWith(`${LEADERSHIP_BASE}/analysis/`)) {
    const slug = pathname.replace(`${LEADERSHIP_BASE}/analysis/`, "").replace(/\/$/, "");
    const s = executiveSections.find((x) => x.slug === slug);
    if (s) return { title: `${s.order}. ${s.title}`, description: s.subtitle };
  }

  const tabsSorted = [...leadershipTabs].sort((a, b) => b.href.length - a.href.length);
  const tab = tabsSorted.find((t) => isLeadershipTabActive(pathname, t));
  if (tab) {
    return {
      title: tab.label,
      description: "Раздел руководственного отчёта",
    };
  }

  return { title: "Руководство", description: "Сводка и отчёты" };
}

function resolvePage(pathname: string | null): { title: string; description: string } {
  const p = pathname ?? "";
  const lead = resolveLeadershipPage(p);
  if (lead) return lead;
  return pageTitles[p] ?? { title: "Страница", description: "" };
}

export function Header() {
  const pathname = usePathname();
  const page = resolvePage(pathname);
  const [dateStr, setDateStr] = useState<string>("");
  useEffect(() => {
    const now = new Date();
    setDateStr(
      now.toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const path = pathname ?? "";
  const showGobmpBadge = !path.startsWith(LEADERSHIP_BASE);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{page.title}</h1>
        <p className="text-sm text-gray-400 capitalize">{page.description}</p>
        <p className="text-xs text-gray-300 mt-0.5 capitalize" suppressHydrationWarning>
          {dateStr || "…"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск..."
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button type="button" className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all">
          <RefreshCw size={16} />
        </button>

        <button type="button" className="relative p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {showGobmpBadge && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl">
            <span className="text-xs font-semibold text-amber-800">ГОБМП: отставание</span>
          </div>
        )}
      </div>
    </header>
  );
}
