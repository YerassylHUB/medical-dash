/** Демо-ответ API (позже заменить на БД / выгрузки МИС) */

export const leadershipSummary = {
  meta: {
    networkName: "СЗТ · Астана",
    reportBranch: "Жаңа-2026",
    sliceMonth: "2026-04",
    fundingSliceDate: "18.03.2026",
    fundingTitleMonth: "март 2026",
  },
  activityGrand: { total: 354, pct: 100 },
  fundingGOBMPTotal: { plan: 956_226, fact: 311_200.21, pct: 32.5, remainder: 645_025.79 },
  fundingOSMSTotal: { plan: 12_009_215, fact: 12_148_020, pct: 101.2, remainder: -138_805 },
  fluorographyGrand: { total: 116, overdue: 46, pct: 40 },
  oncoMarker2Grand: { total: 45, overdue: 38, pct: 84 },
};
