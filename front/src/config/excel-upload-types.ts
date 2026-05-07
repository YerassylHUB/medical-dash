/**
 * Список типов Excel для страницы загрузки — пока только мок на фронте.
 * Когда подключите бэкенд, можно снова вызывать GET /api/v1/excel-types и подставлять ответ.
 */
import type { ExcelTypeOption } from "@/lib/api";

export const MOCK_EXCEL_UPLOAD_TYPES: readonly ExcelTypeOption[] = [
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
