/**
 * Демо-данные: «Список больных, снятых с диспансерного учёта»
 * Источник: д учет 2 / лист spis_snat (01.01.2026–03.05.2026)
 * Колонки из Excel: ФИО, ЖСН/ИИН, Дата рождения, Диагноз, Дата взятия, Дата снятия, Причина снятия
 *
 * В проде — данные подтягиваются через загрузку Excel (/leadership/upload, тип dispensary_removed).
 */

export type DispensaryRemovedRow = {
  id: number;
  /** Т.А.Ә./Ф.И.О. */
  fullName: string;
  /** ЖСН/ИИН (замаскирован, как в оригинале) */
  iin: string;
  /** Дата рождения */
  birthDate: string;
  /** Диагноздың атауы / Наименование диагноза */
  diagnosis: string;
  /** Есепке алынған күні / Дата взятия на учёт */
  dateAdded: string;
  /** Есептен шығарылған күні / Дата снятия с учёта */
  dateRemoved: string;
  /** Есептен шығарылу себебі / Причина снятия */
  removalReason: string;
};

export const dispensaryRemovedRows: DispensaryRemovedRow[] = [
  {
    id: 1,
    fullName: "А.Е.Ә.",
    iin: "*****551393",
    birthDate: "15.04.2007",
    diagnosis: "Контакт с больным и возможность заражения туберкулёзом",
    dateAdded: "02.03.2026",
    dateRemoved: "02.03.2026",
    removalReason: "Диагноз не подтвердился",
  },
  {
    id: 2,
    fullName: "А.Г.Б.",
    iin: "*****050035",
    birthDate: "24.12.2019",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "21.02.2025",
    dateRemoved: "23.01.2026",
    removalReason: "выздоровление",
  },
  {
    id: 3,
    fullName: "А.А.А.",
    iin: "*****300104",
    birthDate: "20.04.1969",
    diagnosis: "Астма с преобладанием аллергического компонента",
    dateAdded: "23.02.2022",
    dateRemoved: "28.04.2026",
    removalReason: "перевод в другую организацию",
  },
  {
    id: 4,
    fullName: "А.Ф.Б.",
    iin: "*****302431",
    birthDate: "14.04.1986",
    diagnosis: "Другие хронические тубулоинтерстициальные нефриты",
    dateAdded: "06.04.2022",
    dateRemoved: "28.04.2026",
    removalReason: "Прочее",
  },
  {
    id: 5,
    fullName: "А.А.Ы.",
    iin: "*****504079",
    birthDate: "12.04.2017",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "05.01.2025",
    dateRemoved: "16.01.2026",
    removalReason: "выздоровление",
  },
  {
    id: 6,
    fullName: "А.Я.З.",
    iin: "*****602274",
    birthDate: "27.10.2010",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "14.03.2025",
    dateRemoved: "26.03.2026",
    removalReason: "выздоровление",
  },
  {
    id: 7,
    fullName: "А.Т.Қ.",
    iin: "*****503549",
    birthDate: "06.11.2019",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "09.09.2025",
    dateRemoved: "28.04.2026",
    removalReason: "выздоровление",
  },
  {
    id: 8,
    fullName: "А.Н.Е.",
    iin: "*****650745",
    birthDate: "14.08.2010",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "28.03.2025",
    dateRemoved: "05.03.2026",
    removalReason: "выздоровление",
  },
  {
    id: 9,
    fullName: "А.К.Б.",
    iin: "*****351308",
    birthDate: "10.03.1982",
    diagnosis:
      "Локализованная фокальная (парциальная) симптоматическая эпилепсия и эпилептические синдромы с комплексными парциальными судорожными припадками. Последствия инфаркта мозга",
    dateAdded: "19.09.2022",
    dateRemoved: "26.02.2026",
    removalReason: "смерть",
  },
  {
    id: 10,
    fullName: "А.С.К.",
    iin: "*****450510",
    birthDate: "21.07.1983",
    diagnosis: "Инфаркт мозга, вызванный тромбозом мозговых артерий",
    dateAdded: "27.02.2023",
    dateRemoved: "26.02.2026",
    removalReason: "смерть",
  },
  {
    id: 11,
    fullName: "А.С.Б.",
    iin: "*****350247",
    birthDate: "21.03.1957",
    diagnosis:
      "Гипертензивная (гипертоническая) болезнь с преимущественным поражением сердца без (застойной) сердечной недостаточности",
    dateAdded: "22.04.2025",
    dateRemoved: "30.04.2026",
    removalReason: "отрыв от диспансеризации",
  },
  {
    id: 12,
    fullName: "Б.А.М.",
    iin: "*****720188",
    birthDate: "05.09.1965",
    diagnosis: "Хроническая обструктивная болезнь лёгких с острой инфекцией нижних дыхательных путей",
    dateAdded: "10.11.2021",
    dateRemoved: "14.03.2026",
    removalReason: "смерть",
  },
  {
    id: 13,
    fullName: "Д.Р.Қ.",
    iin: "*****880341",
    birthDate: "18.06.1955",
    diagnosis: "Сахарный диабет 2 типа без осложнений",
    dateAdded: "03.06.2020",
    dateRemoved: "22.01.2026",
    removalReason: "смерть",
  },
  {
    id: 14,
    fullName: "Е.Н.С.",
    iin: "*****671092",
    birthDate: "12.02.1970",
    diagnosis: "Хроническая ишемическая болезнь сердца, неуточнённая",
    dateAdded: "17.08.2022",
    dateRemoved: "11.04.2026",
    removalReason: "выздоровление",
  },
  {
    id: 15,
    fullName: "И.Ж.Б.",
    iin: "*****440870",
    birthDate: "29.11.1960",
    diagnosis: "Бронхиальная астма, неуточнённая",
    dateAdded: "05.03.2023",
    dateRemoved: "18.02.2026",
    removalReason: "смерть",
  },
  {
    id: 16,
    fullName: "К.О.А.",
    iin: "*****910622",
    birthDate: "30.07.1952",
    diagnosis: "Злокачественное новообразование бронхов и лёгкого",
    dateAdded: "14.07.2024",
    dateRemoved: "07.03.2026",
    removalReason: "смерть",
  },
  {
    id: 17,
    fullName: "М.Б.Т.",
    iin: "*****560481",
    birthDate: "22.04.1975",
    diagnosis: "Ревматоидный артрит, серопозитивный",
    dateAdded: "09.01.2022",
    dateRemoved: "30.04.2026",
    removalReason: "перевод в другую организацию",
  },
  {
    id: 18,
    fullName: "Н.Г.У.",
    iin: "*****790255",
    birthDate: "07.08.1968",
    diagnosis: "Нестабильная стенокардия",
    dateAdded: "20.11.2023",
    dateRemoved: "05.04.2026",
    removalReason: "смерть",
  },
  {
    id: 19,
    fullName: "О.С.А.",
    iin: "*****830619",
    birthDate: "03.12.1958",
    diagnosis: "Хроническая сердечная недостаточность",
    dateAdded: "15.05.2022",
    dateRemoved: "19.03.2026",
    removalReason: "смерть",
  },
  {
    id: 20,
    fullName: "С.Н.Қ.",
    iin: "*****410733",
    birthDate: "16.01.1974",
    diagnosis: "Аномальная реакция на туберкулиновую пробу",
    dateAdded: "28.06.2025",
    dateRemoved: "12.03.2026",
    removalReason: "выздоровление",
  },
];

/** Только умершие (причина снятия содержит «смерть»). */
export const deceasedFromDispensary = dispensaryRemovedRows.filter((r) =>
  r.removalReason.toLowerCase().includes("смерт")
);

export const dispensaryRemovedStats = {
  total: dispensaryRemovedRows.length,
  deceased: deceasedFromDispensary.length,
  recovered: dispensaryRemovedRows.filter((r) =>
    r.removalReason.toLowerCase().includes("выздоров")
  ).length,
  transferred: dispensaryRemovedRows.filter((r) =>
    r.removalReason.toLowerCase().includes("перевод")
  ).length,
  other: dispensaryRemovedRows.filter(
    (r) =>
      !r.removalReason.toLowerCase().includes("смерт") &&
      !r.removalReason.toLowerCase().includes("выздоров") &&
      !r.removalReason.toLowerCase().includes("перевод")
  ).length,
};
