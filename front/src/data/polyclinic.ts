/** Данные по скринам Excel / Power BI (демо для руководства СЗТ / поликлиники) */

export const polyclinicMeta = {
  networkName: "СЗТ · Астана",
  reportBranch: "Жаңа-2026",
  sliceMonth: "2026-04",
  fundingSliceDate: "18.03.2026",
  fundingTitleMonth: "март 2026",
};

/** Актив поликлиники */
export const polyclinicActivity = [
  { csz: "Амстердам", total: 34, pct: 10 },
  { csz: "Бараева", total: 7, pct: 2 },
  { csz: "Бектурова 1", total: 15, pct: 4 },
  { csz: "Бектурова 2", total: 30, pct: 8 },
  { csz: "Кобыланды", total: 1, pct: 0 },
  { csz: "Моб бригада", total: 202, pct: 57, highlight: "critical" as const },
  { csz: "Ондирис", total: 9, pct: 3 },
  { csz: "Республика", total: 22, pct: 6 },
  { csz: "Сезим Кала", total: 34, pct: 10 },
];

export const polyclinicActivityGrand = { total: 354, pct: 100 };

/** План финансирования: ГОБМП (март, срез на 18.03) */
export const fundingGOBMPRows = [
  { csz: "Бараева", doctor: "ҚАЛЫҚОВА САНДУҒАШ ЕРЖАНҚЫЗЫ", plan: 185_000, fact: 50_200, pct: 27.1 },
  { csz: "Ондирис", doctor: "МЕКЕШ АЙГҮЛЬ", plan: 198_000, fact: 89_400, pct: 45.2 },
  { csz: "Кобыланды", doctor: "ЕРЖАНОВА ЗАМЗАГУЛ ГАЛИМЖАНОВНА", plan: 112_000, fact: 42_100, pct: 37.6 },
  { csz: "Бектурова", doctor: "ЗАГУРСКАЯ АЛИНА ДАУЛЕТОВНА", plan: 256_226, fact: 129_500, pct: 50.5 },
  { csz: "Амстердам", doctor: "ҚАЛЫҚОВА САНДУҒАШ ЕРЖАНҚЫЗЫ", plan: 205_000, fact: 110_000, pct: 53.7 },
];

export const fundingGOBMPTotal = {
  plan: 956_226,
  fact: 311_200.21,
  pct: 32.5,
  remainder: 645_025.79,
};

/** План финансирования: ОСМС */
export const fundingOSMSRows = [
  { csz: "Бараева", doctor: "МЕКЕШ АЙГҮЛЬ", plan: 2_100_000, fact: 1_890_000, pct: 90.0 },
  { csz: "Ондирис", doctor: "ЕРЖАНОВА ЗАМЗАГУЛ ГАЛИМЖАНОВНА", plan: 2_450_000, fact: 2_653_350, pct: 108.3 },
  { csz: "Кобыланды", doctor: "ЗАГУРСКАЯ АЛИНА ДАУЛЕТОВНА", plan: 1_980_000, fact: 2_071_080, pct: 104.6 },
  { csz: "Бектурова", doctor: "ҚАЛЫҚОВА САНДУҒАШ ЕРЖАНҚЫЗЫ", plan: 2_890_215, fact: 2_820_000, pct: 97.6 },
  { csz: "Амстердам", doctor: "МЕКЕШ АЙГҮЛЬ", plan: 2_589_000, fact: 2_666_670, pct: 103.0 },
];

export const fundingOSMSTotal = {
  plan: 12_009_215,
  fact: 12_148_020,
  pct: 101.2,
  remainder: -138_805,
};

/** План / факт по услугам (как в Power BI, апрель 2026) */
export const servicesPlanFactOSMS = [
  { service: "КДУ", plan: 65_200_000, fact: 52_000_000, pct: 79.77 },
  { service: "Антенатальное наблюдение", plan: 14_700_000, fact: 17_100_000, pct: 116.27 },
  { service: "Лаборатория", plan: 11_300_000, fact: 11_618_000, pct: 102.82, boxed: true },
  { service: "Проф.осмотры — дети", plan: 7_600_000, fact: 13_595_000, pct: 178.88 },
  { service: "Мед.реабилитация в АПП — взрослые", plan: 5_500_000, fact: 5_725_000, pct: 104.1, boxed: true },
  { service: "Мед.реабилитация в АПП — дети", plan: 4_500_000, fact: 4_646_000, pct: 103.24, boxed: true },
  { service: "Стоматологическая помощь", plan: 4_000_000, fact: 3_746_000, pct: 93.65 },
  { service: "Проф.осмотры — взрослые", plan: 234_000, fact: 1_327_000, pct: 567.21 },
  { service: "КДП при прегравидарной подготовке", plan: 0, fact: 85_000, pct: null as number | null },
];

export const servicesPlanFactGOBMP = [
  { service: "КДУ", plan: 5_800_000, fact: 12_852_000, pct: 221.58 },
  { service: "Проф.осмотры — взрослые", plan: 1_400_000, fact: 7_542_000, pct: 538.7 },
  { service: "Лаборатория", plan: 598_000, fact: 1_294_000, pct: 216.39 },
];

/** Маркеры флюорозаряженности */
export const fluorographyMarkers = [
  { csz: "Амстердам", total: 20, overdue: 5, pct: 25 },
  { csz: "Бараева", total: 15, overdue: 6, pct: 40 },
  { csz: "Бектурова 1", total: 11, overdue: 0, pct: 0 },
  { csz: "Бектурова 2", total: 8, overdue: 1, pct: 12 },
  { csz: "Кобыланды", total: 4, overdue: 0, pct: 0 },
  { csz: "Ондирис", total: 31, overdue: 21, pct: 68, warn: true },
  { csz: "Республика", total: 9, overdue: 3, pct: 33, warn: true },
  { csz: "Сезим Кала", total: 18, overdue: 10, pct: 56, warn: true },
];

export const fluorographyGrand = { total: 116, overdue: 46, pct: 40 };

/** Онконастороженность маркер 2 */
export const oncoMarker2 = [
  { csz: "Амстердам", total: 3, overdue: 1, pct: 33 },
  { csz: "Бараева", total: 15, overdue: 14, pct: 93, critical: true },
  { csz: "Бектурова 1", total: 2, overdue: 1, pct: 50 },
  { csz: "Бектурова 2", total: 2, overdue: 2, pct: 100, critical: true },
  { csz: "Кобыланды", total: 1, overdue: 1, pct: 100, critical: true },
  { csz: "Ондирис", total: 12, overdue: 10, pct: 83, critical: true },
  { csz: "Республика", total: 2, overdue: 2, pct: 100, critical: true },
  { csz: "Сезим Кала", total: 8, overdue: 7, pct: 88, critical: true },
];

export const oncoMarker2Grand = { total: 45, overdue: 38, pct: 84 };

/** Нагрузка врачей (март, услуги и норматив по ставке). Красный шрифт нагрузки — с №18 как в Excel. */
export const doctorWorkloadMarch = [
  { rank: 1, name: "АЙТЖАНОВА БОТАКӨЗ ОСПАНҚЫЗЫ", services: 688, load1: 4.1, load075: 5.46, load05: 8.19 },
  { rank: 2, name: "САПАРБАЕВА АЙЖАН МУРАТҚЫЗЫ", services: 612, load1: 3.64, load075: 4.86, load05: 7.29 },
  { rank: 3, name: "НУРЛАНОВ ЕРБОЛ СЕРІКҰЛЫ", services: 589, load1: 3.51, load075: 4.68, load05: 7.02 },
  { rank: 4, name: "ҚАЛЫҚОВА САНДУҒАШ ЕРЖАНҚЫЗЫ", services: 556, load1: 3.31, load075: 4.41, load05: 6.62 },
  { rank: 5, name: "МЕКЕШ АЙГҮЛЬ", services: 534, load1: 3.18, load075: 4.24, load05: 6.36 },
  { rank: 6, name: "ЕРЖАНОВА ЗАМЗАГУЛ ГАЛИМЖАНОВНА", services: 498, load1: 2.96, load075: 3.95, load05: 5.93 },
  { rank: 7, name: "ЗАГУРСКАЯ АЛИНА ДАУЛЕТОВНА", services: 472, load1: 2.81, load075: 3.75, load05: 5.62 },
  { rank: 8, name: "ОСПАНОВА ГУЛЬНАР ТАЛҒАТҚЫЗЫ", services: 445, load1: 2.65, load075: 3.53, load05: 5.3 },
  { rank: 9, name: "БЕКМУХАМБЕТОВА ДИНАРА", services: 421, load1: 2.51, load075: 3.34, load05: 5.01 },
  { rank: 10, name: "ТАНАТАРОВА САУЛЕ", services: 398, load1: 2.37, load075: 3.16, load05: 4.74 },
  { rank: 11, name: "ИСМАИЛОВА АЛИЯ", services: 382, load1: 2.27, load075: 3.03, load05: 4.55 },
  { rank: 12, name: "КАСЫМОВ ДАУРЕН", services: 365, load1: 2.17, load075: 2.9, load05: 4.35 },
  { rank: 13, name: "РАХМЕТУЛЛИНА АЙГУЛЬ", services: 348, load1: 2.07, load075: 2.76, load05: 4.14 },
  { rank: 14, name: "СЕЙТҚАЗИНА АЛТЫНАЙ", services: 335, load1: 1.99, load075: 2.66, load05: 3.99 },
  { rank: 15, name: "ТЕМИРОВА ЖАНАР", services: 328, load1: 1.95, load075: 2.6, load05: 3.9 },
  { rank: 16, name: "УРАЗБАЕВА ГУЛЬМИРА", services: 312, load1: 1.86, load075: 2.48, load05: 3.71 },
  { rank: 17, name: "АБУОВА НАЗЕРКЕ ТЕМИРОВНА", services: 298, load1: 1.77, load075: 2.36, load05: 3.54 },
  { rank: 18, name: "ЖУМАБАЕВА САРА", services: 285, load1: 1.7, load075: 2.26, load05: 3.39 },
  { rank: 19, name: "КАЛИЕВА АЙНАГУЛЬ", services: 268, load1: 1.6, load075: 2.13, load05: 3.19 },
  { rank: 20, name: "МУХАМЕДЖАНОВА АЙЖАН", services: 255, load1: 1.52, load075: 2.02, load05: 3.04 },
  { rank: 21, name: "НУРГАЛИЕВА РАУШАН", services: 242, load1: 1.44, load075: 1.92, load05: 2.88 },
  { rank: 22, name: "ОМАРОВА БОТАГОЗ", services: 228, load1: 1.36, load075: 1.81, load05: 2.71 },
  { rank: 23, name: "САГЫНДЫКОВА АЙГУЛЬ", services: 215, load1: 1.28, load075: 1.71, load05: 2.56 },
  { rank: 24, name: "ТОЛЕУБАЕВА АЛМА", services: 198, load1: 1.18, load075: 1.57, load05: 2.36 },
  { rank: 25, name: "УМАРОВ ЕРЛАН", services: 182, load1: 1.08, load075: 1.45, load05: 2.17 },
  { rank: 26, name: "ХАСЕНОВА ГУЛЬНАР", services: 168, load1: 1.0, load075: 1.33, load05: 2.0 },
  { rank: 27, name: "ДЖУРАЕВА ЖАКСЫГУЛ ЕСЕНБАЙҚЫЗЫ", services: 340, load1: 2.02, load075: 2.7, load05: 4.05 },
];
