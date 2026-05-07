import { polyclinicActivity, polyclinicActivityGrand, polyclinicMeta } from "./polyclinic";
import { analysisPeriod } from "./executive-analysis";

/** Демо: вызовы скорой (поток по месяцам) и актив «не обслужены врачом» поликлиники — под замену из API / Excel. */

export const patientCallsMeta = {
  networkName: polyclinicMeta.networkName,
  periodLabel: analysisPeriod.label,
  dataNote:
    "Показатели условные. После интеграции — из выгрузок «актив скорой помощи» и «не обслуженные врачом».",
};

export type PatientCallsMonthRow = {
  key: string;
  label: string;
  /** Вызовы бригад СМП (обращения за период месяца). */
  ambulanceCalls: number;
  /** Пациенты в активе поликлиники без приёма врача (срез на конец месяца, демо). */
  unservedPolyclinicEom: number;
  /** Снято с учёта «необслуженных» после обзвона / визита (демо). */
  closedUnservedAfterOutreach: number;
};

export const patientCallsMonthly: PatientCallsMonthRow[] = [
  {
    key: "2026-01",
    label: "Янв.",
    ambulanceCalls: 1824,
    unservedPolyclinicEom: 412,
    closedUnservedAfterOutreach: 268,
  },
  {
    key: "2026-02",
    label: "Фев.",
    ambulanceCalls: 1756,
    unservedPolyclinicEom: 389,
    closedUnservedAfterOutreach: 241,
  },
  {
    key: "2026-03",
    label: "Мар.",
    ambulanceCalls: 1910,
    unservedPolyclinicEom: 128,
    closedUnservedAfterOutreach: 256,
  },
];

/** Доля необслуженных по ЦСЗ (демо, сумма 100% → перевод в человек на срез `unservedEndPeriod`). */
const unservedPercentByCsz: Record<string, number> = {
  Амстердам: 11,
  Бараева: 2,
  "Бектурова 1": 5,
  "Бектурова 2": 8,
  Кобыланды: 2,
  "Моб бригада": 51,
  Ондирис: 3,
  Республика: 7,
  "Сезим Кала": 11,
};

/** Демо-строка пациента на участке; в проде — из выгрузки «не обслуженные» / EMR. */
export type PlotPatientDemo = {
  id: string;
  displayName: string;
  /** ИИН (12 цифр), демо — не настоящий документ; в проде из выгрузки / МИС. */
  iin: string;
  /** Есть актуальный приём врача по участку (не в списке необслуженных на срез). */
  served: boolean;
};

export type PatientCallsPlotRow = {
  plotId: string;
  /** Участок (врачебный участок) внутри ЦСЗ */
  plotLabel: string;
  active: number;
  unserved: number;
  /** Список пациентов в активе участка: первые `unserved` — без приёма, остальные — обслужены (демо). */
  patients: PlotPatientDemo[];
};

export type PatientCallsCszDetailRow = {
  csz: string;
  totalActive: number;
  unserved: number;
  highlight?: "critical";
  plots: PatientCallsPlotRow[];
};

function splitInt(total: number, parts: number): number[] {
  if (parts <= 0) return [];
  if (total <= 0) return Array.from({ length: parts }, () => 0);
  const base = Math.floor(total / parts);
  const rem = total % parts;
  return Array.from({ length: parts }, (_, i) => base + (i < rem ? 1 : 0));
}

function plotCount(totalActive: number, csz: string): number {
  if (totalActive <= 0) return 1;
  if (totalActive <= 4) return 1;
  if (totalActive <= 18) return 2;
  if (csz === "Моб бригада") return 5;
  if (totalActive <= 45) return 3;
  return 4;
}

function plotLabelsForCsz(csz: string, n: number): string[] {
  if (csz === "Моб бригада") {
    const all = [
      "Участок №1 (север)",
      "Участок №2 (центр)",
      "Участок №3 (ВОП)",
      "Участок №4 (юг)",
      "Участок №5 (пригород)",
    ];
    return all.slice(0, n);
  }
  if (n <= 1) return [`Участок №1`];
  return Array.from({ length: n }, (_, i) => `Участок №${i + 1}`);
}

function slugCsz(csz: string): string {
  return csz.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zа-яёәіңғүұқөһ0-9-]/gi, "");
}

function seedFromPlotId(plotId: string): number {
  let s = 0;
  for (let i = 0; i < plotId.length; i++) s = (s * 31 + plotId.charCodeAt(i)) >>> 0;
  return s;
}

/** Условные ФИО для демо (циклически); не медицинские записи. */
const DEMO_SUR = [
  "Қасымов",
  "Омарова",
  "Әбілханова",
  "Сәрсенов",
  "Мұқанова",
  "Ержанов",
  "Нұрланова",
  "Бекмурзаев",
  "Дәулетова",
  "Жұмабаев",
  "Қалиақпар",
  "Сүлейменова",
  "Төлеубай",
  "Ахметова",
  "Рахымжан",
];

const DEMO_GIVEN = [
  "Айгүл",
  "Сәбит",
  "Динара",
  "Ерлан",
  "Зәмзәгүл",
  "Нұрлан",
  "Гүлнар",
  "Бақыт",
  "Сандуғаш",
  "Алмас",
  "Қанат",
  "Мәдина",
  "Талғат",
  "Айжан",
  "Дәулет",
];

function demoPatientName(index: number, seed: number): string {
  const s = (DEMO_SUR[(index + seed) % DEMO_SUR.length] ?? "Қасымов").trim();
  const g = (DEMO_GIVEN[(index * 5 + seed * 3) % DEMO_GIVEN.length] ?? "Айгүл").trim();
  const gi = g.charAt(0);
  const second = DEMO_GIVEN[(index + seed + 7) % DEMO_GIVEN.length]?.charAt(0) ?? "Б";
  return `${s} ${gi}.${second}.`;
}

/** Демо-ИИН: 12 цифр, детерминированно от индекса (не проходит контрольную сумму ИИН). */
function demoIin(index: number, seed: number): string {
  let n = ((seed >>> 0) + index * 7919 + 1_000_000_000) >>> 0;
  let digits = "";
  for (let k = 0; k < 12; k++) {
    n = Math.imul(n, 1103515245) + 12345;
    digits += String((n >>> 0) % 10);
  }
  return digits;
}

/** Демо: ровно `active` записей, из них `unserved` с served=false (как в сводке участка). */
function buildMockPatientsForPlot(plotId: string, active: number, unserved: number): PlotPatientDemo[] {
  if (active <= 0) return [];
  const u = Math.max(0, Math.min(unserved, active));
  const seed = seedFromPlotId(plotId);
  const out: PlotPatientDemo[] = [];
  for (let i = 0; i < active; i++) {
    const served = i >= u;
    out.push({
      id: `${plotId}-p${i + 1}`,
      displayName: demoPatientName(i, seed),
      iin: demoIin(i, seed),
      served,
    });
  }
  return out;
}

/** Распределить «не обслужено» по участкам пропорционально активу, не превышая актив на участке. */
function distributeUnservedAcrossPlots(unserved: number, actives: number[]): number[] {
  const total = actives.reduce((s, a) => s + a, 0);
  if (total === 0 || actives.length === 0) return actives.map(() => 0);
  const capped = Math.min(unserved, total);
  const floats = actives.map((a) => (capped * a) / total);
  const floors = floats.map((f) => Math.floor(f));
  let rem = capped - floors.reduce((s, x) => s + x, 0);
  const order = floats
    .map((f, i) => ({ i, frac: f - Math.floor(f) }))
    .sort((a, b) => b.frac - a.frac);
  const out = [...floors];
  let guard = 0;
  while (rem > 0 && guard < 512) {
    const { i } = order[guard % order.length];
    if (out[i] < actives[i]) {
      out[i]++;
      rem--;
    }
    guard++;
  }
  return out;
}

function buildPlotsForCsz(csz: string, totalActive: number, unserved: number): PatientCallsPlotRow[] {
  const n = Math.min(plotCount(totalActive, csz), Math.max(1, totalActive));
  const actives = splitInt(totalActive, n);
  const unserveds = distributeUnservedAcrossPlots(unserved, actives);
  const labels = plotLabelsForCsz(csz, n);
  return actives.map((active, i) => {
    const plotId = `${slugCsz(csz)}-u${i + 1}`;
    const u = unserveds[i] ?? 0;
    return {
      plotId,
      plotLabel: labels[i] ?? `Участок №${i + 1}`,
      active,
      unserved: u,
      patients: buildMockPatientsForPlot(plotId, active, u),
    };
  });
}

/** Разрез по ЦСЗ + участки: актив и «не обслужено» внутри каждого участка (суммы по участкам = итого ЦСЗ). */
export function patientCallsCszDetailRows(endUnservedTotal: number): PatientCallsCszDetailRow[] {
  return polyclinicActivity.map((row) => {
    const pct = unservedPercentByCsz[row.csz] ?? 0;
    const rawUnserved = Math.round((endUnservedTotal * pct) / 100);
    const unserved = Math.min(row.total, rawUnserved);
    const plots = buildPlotsForCsz(row.csz, row.total, unserved);
    return {
      csz: row.csz,
      totalActive: row.total,
      unserved,
      highlight: row.highlight,
      plots,
    };
  });
}

/** Плоский итог по ЦСЗ (без участков) — для совместимости / простых сводок. */
export function patientCallsUnservedByCszRows(endUnservedTotal: number) {
  return patientCallsCszDetailRows(endUnservedTotal).map(({ plots: _p, ...rest }) => rest);
}

export function patientCallsAggregates() {
  const ambTotal = patientCallsMonthly.reduce((s, m) => s + m.ambulanceCalls, 0);
  const closedTotal = patientCallsMonthly.reduce((s, m) => s + m.closedUnservedAfterOutreach, 0);
  const last = patientCallsMonthly[patientCallsMonthly.length - 1];
  const avgAmb = Math.round(ambTotal / patientCallsMonthly.length);
  const shareUnservedOfActive =
    polyclinicActivityGrand.total > 0
      ? ((last.unservedPolyclinicEom / polyclinicActivityGrand.total) * 100).toFixed(1)
      : "0";
  return {
    ambulanceCallsTotal: ambTotal,
    ambulanceCallsAvgMonth: avgAmb,
    unservedEndPeriod: last.unservedPolyclinicEom,
    closedUnservedTotal: closedTotal,
    shareUnservedOfActivePercent: shareUnservedOfActive,
  };
}
