/** Типы выгрузок — для сопоставления колонок при импорте */

export const EXCEL_TYPES = [
  {
    id: "ambulance_active",
    label:
      "Актив скорой помощи — вызов пациента (фиксация в истории, обзвон лечащим врачом)",
  },
  {
    id: "polyclinic_unserved",
    label: "Актив поликлиники — не обслуженные врачом (список для обзвона)",
  },
  {
    id: "deceased_registry",
    label: "Список умерших — реестр свидетельств о смерти (умершие.xlsx)",
  },
  {
    id: "dispensary_removed",
    label:
      "Список больных, снятых с диспансерного учёта (д учет 2 / spis_snat)",
  },
] as const;

export type ExcelTypeId = (typeof EXCEL_TYPES)[number]["id"];

const allowed = new Set<string>(EXCEL_TYPES.map((t) => t.id));

export function isValidExcelType(id: string): id is ExcelTypeId {
  return allowed.has(id);
}

export function labelForExcelType(id: string): string {
  return EXCEL_TYPES.find((t) => t.id === id)?.label ?? id;
}

/** «Шапка» в нескольких верхних строках — как в выгрузках ГП №2. */
export function useSmartHeaderRow(excelType: string): boolean {
  return (
    excelType === "ambulance_active" ||
    excelType === "polyclinic_unserved" ||
    excelType === "deceased_registry" ||
    excelType === "dispensary_removed"
  );
}
