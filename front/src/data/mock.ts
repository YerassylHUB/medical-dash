export const kpiData = {
  totalPatients: 1284,
  patientsChange: +8.2,
  totalBeds: 450,
  occupiedBeds: 378,
  occupancyRate: 84,
  occupancyChange: +3.1,
  totalStaff: 312,
  staffChange: +2,
  avgWaitTime: 24,
  waitTimeChange: -12,
  surgeriesToday: 18,
  surgeriesChange: +3,
  revenue: 48_200_000,
  revenueChange: +11.4,
};

export const patientFlowData = [
  { month: "Янв", admitted: 210, discharged: 195, emergency: 42 },
  { month: "Фев", admitted: 185, discharged: 180, emergency: 38 },
  { month: "Мар", admitted: 230, discharged: 218, emergency: 55 },
  { month: "Апр", admitted: 265, discharged: 251, emergency: 60 },
  { month: "Май", admitted: 240, discharged: 230, emergency: 52 },
  { month: "Июн", admitted: 275, discharged: 260, emergency: 65 },
  { month: "Июл", admitted: 290, discharged: 278, emergency: 70 },
  { month: "Авг", admitted: 310, discharged: 298, emergency: 68 },
  { month: "Сен", admitted: 285, discharged: 275, emergency: 62 },
  { month: "Окт", admitted: 320, discharged: 308, emergency: 74 },
  { month: "Ноя", admitted: 298, discharged: 285, emergency: 66 },
  { month: "Дек", admitted: 275, discharged: 265, emergency: 58 },
];

export const departmentOccupancy = [
  { name: "Кардиология", beds: 60, occupied: 54, doctors: 12, waitDays: 2 },
  { name: "Хирургия", beds: 80, occupied: 72, doctors: 18, waitDays: 1 },
  { name: "Неврология", beds: 50, occupied: 43, doctors: 10, waitDays: 3 },
  { name: "Педиатрия", beds: 70, occupied: 58, doctors: 15, waitDays: 1 },
  { name: "Онкология", beds: 55, occupied: 51, doctors: 14, waitDays: 5 },
  { name: "Реанимация", beds: 30, occupied: 28, doctors: 20, waitDays: 0 },
  { name: "Травматология", beds: 45, occupied: 37, doctors: 9, waitDays: 2 },
  { name: "Терапия", beds: 60, occupied: 35, doctors: 11, waitDays: 1 },
];

export const diagnosisDistribution = [
  { name: "Сердечно-сосудистые", value: 28, color: "#ef4444" },
  { name: "Онкология", value: 18, color: "#f97316" },
  { name: "Травмы", value: 15, color: "#eab308" },
  { name: "Инфекционные", value: 12, color: "#22c55e" },
  { name: "Неврологические", value: 11, color: "#3b82f6" },
  { name: "Другие", value: 16, color: "#8b5cf6" },
];

export const revenueData = [
  { month: "Янв", income: 36_000_000, expenses: 28_000_000 },
  { month: "Фев", income: 32_000_000, expenses: 26_000_000 },
  { month: "Мар", income: 38_000_000, expenses: 29_000_000 },
  { month: "Апр", income: 42_000_000, expenses: 31_000_000 },
  { month: "Май", income: 40_000_000, expenses: 30_000_000 },
  { month: "Июн", income: 45_000_000, expenses: 33_000_000 },
  { month: "Июл", income: 48_000_000, expenses: 35_000_000 },
  { month: "Авг", income: 52_000_000, expenses: 37_000_000 },
  { month: "Сен", income: 47_000_000, expenses: 34_000_000 },
  { month: "Окт", income: 55_000_000, expenses: 39_000_000 },
  { month: "Ноя", income: 50_000_000, expenses: 36_000_000 },
  { month: "Дек", income: 48_200_000, expenses: 34_500_000 },
];

export const patients = [
  { id: "P-001", name: "Алибек Жаксыбеков", age: 58, gender: "М", department: "Кардиология", doctor: "Д-р Нурланов", status: "Стационар", admitDate: "2026-04-28", diagnosis: "ИБС", room: "201А", priority: "high" },
  { id: "P-002", name: "Гүлназ Сейтқали", age: 34, gender: "Ж", department: "Хирургия", doctor: "Д-р Сатпаева", status: "После операции", admitDate: "2026-04-30", diagnosis: "Аппендицит", room: "312Б", priority: "medium" },
  { id: "P-003", name: "Марат Оспанов", age: 45, gender: "М", department: "Неврология", doctor: "Д-р Байжанов", status: "Стационар", admitDate: "2026-04-25", diagnosis: "Инсульт", room: "115В", priority: "high" },
  { id: "P-004", name: "Айгерим Нурова", age: 7, gender: "Ж", department: "Педиатрия", doctor: "Д-р Ахметова", status: "Стационар", admitDate: "2026-05-01", diagnosis: "Пневмония", room: "Пед-08", priority: "medium" },
  { id: "P-005", name: "Серік Досымов", age: 62, gender: "М", department: "Онкология", doctor: "Д-р Касымов", status: "Химиотерапия", admitDate: "2026-04-20", diagnosis: "Рак лёгкого II ст.", room: "Онк-14", priority: "high" },
  { id: "P-006", name: "Надежда Волкова", age: 29, gender: "Ж", department: "Травматология", doctor: "Д-р Темиров", status: "Стационар", admitDate: "2026-05-02", diagnosis: "Перелом голени", room: "Тр-05", priority: "low" },
  { id: "P-007", name: "Батыр Ержанов", age: 52, gender: "М", department: "Терапия", doctor: "Д-р Смагулова", status: "Стационар", admitDate: "2026-04-29", diagnosis: "Сахарный диабет 2 тип", room: "408Г", priority: "low" },
  { id: "P-008", name: "Зарина Кенжебаева", age: 41, gender: "Ж", department: "Кардиология", doctor: "Д-р Нурланов", status: "Диагностика", admitDate: "2026-05-02", diagnosis: "Аритмия", room: "204А", priority: "medium" },
];

export const staff = [
  { id: "S-001", name: "Д-р Асан Нурланов", role: "Кардиолог", department: "Кардиология", experience: 15, patients: 24, shifts: "Пн-Пт", status: "На смене", rating: 4.9 },
  { id: "S-002", name: "Д-р Жанна Сатпаева", role: "Хирург", department: "Хирургия", experience: 12, patients: 18, shifts: "Пн-Ср-Пт", status: "Операция", rating: 4.8 },
  { id: "S-003", name: "Д-р Руслан Байжанов", role: "Невролог", department: "Неврология", experience: 9, patients: 20, shifts: "Вт-Чт-Сб", status: "На смене", rating: 4.7 },
  { id: "S-004", name: "Д-р Айна Ахметова", role: "Педиатр", department: "Педиатрия", experience: 7, patients: 32, shifts: "Пн-Пт", status: "На смене", rating: 4.9 },
  { id: "S-005", name: "Д-р Дамир Касымов", role: "Онколог", department: "Онкология", experience: 18, patients: 15, shifts: "Пн-Ср-Пт", status: "На смене", rating: 4.8 },
  { id: "S-006", name: "Д-р Тимур Темиров", role: "Травматолог", department: "Травматология", experience: 11, patients: 22, shifts: "Вт-Чт-Сб", status: "Выходной", rating: 4.6 },
  { id: "S-007", name: "Д-р Гульмира Смагулова", role: "Терапевт", department: "Терапия", experience: 14, patients: 28, shifts: "Пн-Пт", status: "На смене", rating: 4.7 },
  { id: "S-008", name: "Медсестра Айсулу Бекова", role: "Старшая медсестра", department: "Реанимация", experience: 8, patients: 0, shifts: "Сутки через трое", status: "На смене", rating: 4.8 },
];

export const financeBreakdown = [
  { category: "Стационарное лечение", amount: 22_000_000, percent: 45.6 },
  { category: "Хирургические операции", amount: 12_500_000, percent: 25.9 },
  { category: "Диагностика и лаборатория", amount: 7_800_000, percent: 16.2 },
  { category: "Амбулатория", amount: 3_900_000, percent: 8.1 },
  { category: "Прочее", amount: 2_000_000, percent: 4.2 },
];

export const expenseBreakdown = [
  { category: "Зарплаты персонала", amount: 18_500_000, percent: 53.6 },
  { category: "Медикаменты и расходники", amount: 8_200_000, percent: 23.8 },
  { category: "Оборудование и обслуживание", amount: 4_500_000, percent: 13.0 },
  { category: "Коммунальные услуги", amount: 2_100_000, percent: 6.1 },
  { category: "Административные расходы", amount: 1_200_000, percent: 3.5 },
];

export const recentActivities = [
  { time: "09:45", event: "Экстренная госпитализация", detail: "Пациент Марат Д., инфаркт", type: "emergency" },
  { time: "09:30", event: "Операция завершена", detail: "Хирург Сатпаева — аппендэктомия", type: "surgery" },
  { time: "09:10", event: "Выписка пациента", detail: "П-087 Алия Н., кардиология", type: "discharge" },
  { time: "08:55", event: "Новое поступление", detail: "П-088 Серик Б., травматология", type: "admission" },
  { time: "08:30", event: "Лабораторные результаты", detail: "Срочные анализы — 14 пациентов", type: "lab" },
  { time: "08:00", event: "Пересменка", detail: "Смена принята — 48 медработников", type: "shift" },
];
