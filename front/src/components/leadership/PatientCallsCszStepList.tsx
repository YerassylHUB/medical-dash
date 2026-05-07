"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Building2, UserCheck, UserX } from "lucide-react";
import type { PatientCallsCszDetailRow } from "@/data/patient-calls";
import { cn } from "@/lib/utils";

type Props = {
  details: PatientCallsCszDetailRow[];
  networkUnservedHint: string;
};

export function PatientCallsCszStepList({ details, networkUnservedHint }: Props) {
  const [selectedCsz, setSelectedCsz] = useState<string | null>(null);
  /** Раскрытый список пациентов по `plotId` (кнопка вместо native details — стабильнее во встроенном браузере). */
  const [openPatientsPlotId, setOpenPatientsPlotId] = useState<string | null>(null);

  const block = useMemo(
    () => (selectedCsz ? details.find((d) => d.csz === selectedCsz) ?? null : null),
    [details, selectedCsz]
  );

  const openCsz = useCallback((csz: string) => {
    setOpenPatientsPlotId(null);
    setSelectedCsz(csz);
  }, []);
  const closeCsz = useCallback(() => {
    setOpenPatientsPlotId(null);
    setSelectedCsz(null);
  }, []);

  const togglePatients = useCallback((plotId: string) => {
    setOpenPatientsPlotId((prev) => (prev === plotId ? null : plotId));
  }, []);

  if (block) {
    return (
      <div className="flex flex-col min-h-[12rem]">
        <button
          type="button"
          onClick={closeCsz}
          className="mb-3 inline-flex items-center gap-1.5 self-start rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
          Все ЦСЗ
        </button>

        <div className="flex items-start gap-2 mb-3">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
            <Building2 className="w-5 h-5" aria-hidden />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">{block.csz}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Итого по ЦСЗ: актив <strong className="text-slate-800">{block.totalActive}</strong>, не обслужено{" "}
              <strong className="text-orange-800">{block.unserved}</strong>
              {block.totalActive > 0 ? (
                <span className="text-slate-400">
                  {" "}
                  ({((100 * block.unserved) / block.totalActive).toFixed(1)}%)
                </span>
              ) : null}
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Участки
          {block.plots.length > 0 ? (
            <span className="font-normal text-slate-400 normal-case"> ({block.plots.length})</span>
          ) : null}
        </p>
        {block.plots.length === 0 ? (
          <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Нет разбивки по участкам для этого центра.
          </p>
        ) : (
        <ul className="rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white">
          {block.plots.map((p, idx) => {
            const servedCount = Math.max(0, p.active - p.unserved);
            const patientsOpen = openPatientsPlotId === p.plotId;
            return (
              <li key={p.plotId} className="bg-white overflow-visible">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3.5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex-1 min-w-[10rem]">
                    <p className="font-semibold text-slate-900">Участок {idx + 1}</p>
                    {p.plotLabel !== `Участок №${idx + 1}` ? (
                      <p className="text-xs text-slate-500 mt-0.5">{p.plotLabel}</p>
                    ) : null}
                  </div>
                  <div className="flex gap-6 tabular-nums text-sm">
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-slate-400 font-medium">Актив</p>
                      <p className="font-semibold text-slate-800">{p.active}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-slate-400 font-medium">Не обслужено</p>
                      <p className="font-semibold text-orange-800">{p.unserved}</p>
                    </div>
                    <div className="text-right w-14">
                      <p className="text-[10px] uppercase text-slate-400 font-medium">%</p>
                      <p className="font-medium text-slate-600">
                        {p.active > 0 ? `${((100 * p.unserved) / p.active).toFixed(1)}%` : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/40">
                  <button
                    type="button"
                    onClick={() => togglePatients(p.plotId)}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-blue-800 hover:bg-slate-100/90 flex flex-wrap items-center gap-x-2 gap-y-1"
                    aria-expanded={patientsOpen}
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 shrink-0 text-blue-600 transition-transform",
                        patientsOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                    <span className="underline-offset-2">Пациенты по списку (демо)</span>
                    <span className="text-slate-500 font-normal">
                      обслужено <strong className="text-emerald-800">{servedCount}</strong>, без приёма{" "}
                      <strong className="text-orange-800">{p.unserved}</strong>
                    </span>
                  </button>
                  {patientsOpen ? (
                    <div className="px-3 pb-3">
                      <p className="text-[10px] text-slate-500 px-1 pb-2">
                        Условные ФИО и ИИН. После загрузки Excel — реальные поля из выгрузки (в т.ч. ИИН) и учёта
                        приёмов.
                      </p>
                      <div className="max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white">
                        <table className="w-full text-xs border-collapse">
                          <thead className="sticky top-0 bg-slate-100 border-b border-slate-200 z-[1]">
                            <tr>
                              <th className="text-left font-semibold text-slate-600 px-2 py-1.5">Пациент</th>
                              <th className="text-left font-semibold text-slate-600 px-2 py-1.5 w-[8.5rem] whitespace-nowrap">
                                ИИН
                              </th>
                              <th className="text-left font-semibold text-slate-600 px-2 py-1.5 w-36">Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(p.patients ?? []).map((pt) => (
                              <tr key={pt.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80">
                                <td className="px-2 py-1.5 text-slate-800">{pt.displayName}</td>
                                <td className="px-2 py-1.5 text-slate-600 tabular-nums tracking-tight">{pt.iin ?? "—"}</td>
                                <td className="px-2 py-1.5">
                                  {pt.served ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-800">
                                      <UserCheck className="w-3.5 h-3.5 shrink-0" aria-hidden />
                                      Обслужен
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-orange-800">
                                      <UserX className="w-3.5 h-3.5 shrink-0" aria-hidden />
                                      Не обслужен
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[12rem]">
      <p className="text-xs text-slate-500 mb-3">
        Нажмите на строку ЦСЗ — откроются участки; под каждым участком кнопка «Пациенты по списку» откроет таблицу с
        ФИО и ИИН. {networkUnservedHint}
      </p>
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/90">
          <span className="flex-1 min-w-0">ЦСЗ</span>
          <span className="tabular-nums w-14 text-right shrink-0">Актив</span>
          <span className="tabular-nums w-16 text-right shrink-0 text-orange-700/90">Не обслуж.</span>
          <span className="w-4 shrink-0" aria-hidden />
        </div>
        <ul className="divide-y divide-slate-100">
          {details.map((d) => (
            <li key={d.csz}>
              <button
                type="button"
                onClick={() => openCsz(d.csz)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50",
                  d.highlight === "critical" && "bg-red-50/60 hover:bg-red-50"
                )}
              >
                <span className="flex-1 min-w-0 font-semibold text-slate-900">{d.csz}</span>
                <span className="tabular-nums text-sm text-slate-700 shrink-0 w-14 text-right">{d.totalActive}</span>
                <span className="tabular-nums text-sm text-orange-800 font-medium shrink-0 w-16 text-right">
                  {d.unserved}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-[11px] text-slate-400 mt-2 px-1 sm:hidden">
        В каждой строке: актив и не обслужено врачом (остаток на срез)
      </p>
    </div>
  );
}
