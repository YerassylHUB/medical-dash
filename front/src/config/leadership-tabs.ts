/** Вкладки раздела «Руководство» (как листы Excel / срезы Power BI) */
export const LEADERSHIP_BASE = "/leadership";

export type LeadershipTab = {
  href: string;
  label: string;
  exact?: true;
};

export const leadershipTabs: readonly LeadershipTab[] = [
  { href: `${LEADERSHIP_BASE}`, label: "Сводка", exact: true },
  { href: `${LEADERSHIP_BASE}/activity`, label: "Актив поликлиники" },
  { href: `${LEADERSHIP_BASE}/calls`, label: "Вызовы и обслуживание" },
  { href: `${LEADERSHIP_BASE}/deceased-list`, label: "Умершие" },
  { href: `${LEADERSHIP_BASE}/plan-fact`, label: "План финансирования" },
  { href: `${LEADERSHIP_BASE}/services-plan`, label: "План / факт услуг" },
  { href: `${LEADERSHIP_BASE}/markers`, label: "Маркеры" },
  { href: `${LEADERSHIP_BASE}/doctors-load`, label: "Нагрузка врачей" },
  { href: `${LEADERSHIP_BASE}/analysis`, label: "Аналитика" },
];

export function isLeadershipTabActive(pathname: string, tab: LeadershipTab): boolean {
  if (tab.exact) return pathname === tab.href || pathname === `${tab.href}/`;
  return pathname === tab.href || pathname.startsWith(`${tab.href}/`);
}
