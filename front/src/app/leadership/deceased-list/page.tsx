"use client";

import { useState, useMemo } from "react";
import { Search, AlertTriangle, Users, HeartOff, TrendingDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  dispensaryRemovedRows,
  dispensaryRemovedStats,
  type DispensaryRemovedRow,
} from "@/data/dispensary-removed";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";
import Link from "next/link";

type FilterMode = "all" | "deceased" | "recovered" | "other";

const reasonColor = (reason: string) => {
  const r = reason.toLowerCase();
  if (r.includes("смерт")) return "text-red-700 bg-red-50 border-red-200";
  if (r.includes("выздоров")) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (r.includes("перевод")) return "text-blue-700 bg-blue-50 border-blue-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
};

export default function DeceasedListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("deceased");

  const rows = useMemo<DispensaryRemovedRow[]>(() => {
    let data = dispensaryRemovedRows;
    if (filter === "deceased")
      data = data.filter((r) => r.removalReason.toLowerCase().includes("смерт"));
    else if (filter === "recovered")
      data = data.filter((r) => r.removalReason.toLowerCase().includes("выздоров"));
    else if (filter === "other")
      data = data.filter(
        (r) =>
          !r.removalReason.toLowerCase().includes("смерт") &&
          !r.removalReason.toLowerCase().includes("выздоров")
      );
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.iin.includes(q) ||
          r.diagnosis.toLowerCase().includes(q) ||
          r.removalReason.toLowerCase().includes(q)
      );
    }
    return data;
  }, [filter, search]);

  const stats = dispensaryRemovedStats;

  return (
    <div className="space-y-5">
      {/* header note */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
            Диспансерный учёт
          </p>
          <h2 className="text-lg font-bold text-gray-900 mt-0.5">
            Снятые с учёта · 01.01.2026 – 03.05.2026
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Данные из выгрузки «д учет 2» (лист spis_snat).{" "}
            <Link
              href={`${LEADERSHIP_BASE}/upload`}
              className="text-blue-600 font-medium hover:underline"
            >
              Загрузить актуальный файл
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <RefreshCw size={12} />
          демо-данные
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "card p-4 text-left transition-all border-l-4",
            filter === "all" ? "border-gray-600 ring-1 ring-gray-300" : "border-gray-300"
          )}
        >
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase mb-1">
            <Users size={13} /> Всего снято
          </div>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{stats.total}</p>
        </button>

        <button
          type="button"
          onClick={() => setFilter("deceased")}
          className={cn(
            "card p-4 text-left transition-all border-l-4",
            filter === "deceased" ? "border-red-600 ring-1 ring-red-200" : "border-red-300"
          )}
        >
          <div className="flex items-center gap-2 text-red-600 text-xs font-medium uppercase mb-1">
            <HeartOff size={13} /> Умерли
          </div>
          <p className="text-2xl font-bold text-red-700 tabular-nums">{stats.deceased}</p>
        </button>

        <button
          type="button"
          onClick={() => setFilter("recovered")}
          className={cn(
            "card p-4 text-left transition-all border-l-4",
            filter === "recovered" ? "border-emerald-600 ring-1 ring-emerald-200" : "border-emerald-300"
          )}
        >
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-medium uppercase mb-1">
            <TrendingDown size={13} /> Выздоровели
          </div>
          <p className="text-2xl font-bold text-emerald-700 tabular-nums">{stats.recovered}</p>
        </button>

        <button
          type="button"
          onClick={() => setFilter("other")}
          className={cn(
            "card p-4 text-left transition-all border-l-4",
            filter === "other" ? "border-amber-500 ring-1 ring-amber-200" : "border-amber-300"
          )}
        >
          <div className="flex items-center gap-2 text-amber-600 text-xs font-medium uppercase mb-1">
            <AlertTriangle size={13} /> Прочие причины
          </div>
          <p className="text-2xl font-bold text-amber-700 tabular-nums">{stats.other + stats.transferred}</p>
        </button>
      </div>

      {/* search + filter label */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по ФИО, ИИН, диагнозу…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-xs text-gray-500">
          Показано:{" "}
          <span className="font-semibold text-gray-900">{rows.length}</span>{" "}
          {filter === "deceased" ? "· умершие" : filter === "recovered" ? "· выздоровевшие" : filter === "other" ? "· прочие" : "· все"}
        </span>
        {filter !== "all" && (
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="text-xs text-blue-600 hover:underline"
          >
            Сбросить фильтр
          </button>
        )}
      </div>

      {/* table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 text-xs font-semibold">
                <th className="text-left px-3 py-2.5 w-8 border-r border-slate-200">№</th>
                <th className="text-left px-3 py-2.5 min-w-[130px] border-r border-slate-200">ФИО</th>
                <th className="text-left px-3 py-2.5 min-w-[110px] border-r border-slate-200">ИИН</th>
                <th className="text-left px-3 py-2.5 min-w-[100px] border-r border-slate-200">Дата рождения</th>
                <th className="text-left px-3 py-2.5 min-w-[260px] border-r border-slate-200">Наименование диагноза</th>
                <th className="text-left px-3 py-2.5 min-w-[90px] border-r border-slate-200">Дата взятия</th>
                <th className="text-left px-3 py-2.5 min-w-[90px] border-r border-slate-200">Дата снятия</th>
                <th className="text-left px-3 py-2.5 min-w-[140px]">Причина снятия</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400 text-sm">
                    Нет данных по выбранному фильтру
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => {
                const isDeceased = row.removalReason.toLowerCase().includes("смерт");
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-slate-100 last:border-0 align-top",
                      isDeceased ? "bg-red-50/60" : idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    )}
                  >
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-400 tabular-nums text-xs">
                      {row.id}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 font-medium text-gray-900">
                      {row.fullName}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-600 tabular-nums font-mono text-xs">
                      {row.iin}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-600 tabular-nums text-xs whitespace-nowrap">
                      {row.birthDate}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-700 leading-snug max-w-xs">
                      {row.diagnosis}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-500 tabular-nums text-xs whitespace-nowrap">
                      {row.dateAdded}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-100 text-gray-500 tabular-nums text-xs whitespace-nowrap">
                      {row.dateRemoved}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={cn(
                          "inline-block text-xs font-medium px-2 py-0.5 rounded border leading-snug",
                          reasonColor(row.removalReason)
                        )}
                      >
                        {row.removalReason}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Источник: д учет 2 / spis_snat. Для обновления — загрузите файл через{" "}
        <Link href={`${LEADERSHIP_BASE}/upload`} className="text-blue-600 hover:underline">
          Загрузку Excel
        </Link>{" "}
        (тип «Список больных, снятых с диспансерного учёта»).
      </p>
    </div>
  );
}
