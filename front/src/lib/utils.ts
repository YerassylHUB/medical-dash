import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} млн ₸`;
  }
  return amount.toLocaleString("ru-RU") + " ₸";
}

export function formatChange(value: number): string {
  return value > 0 ? `+${value}%` : `${value}%`;
}

/** Полные суммы в тенге для таблиц (как в Excel) */
export function formatKZT(value: number, fractionDigits = 2): string {
  return (
    value.toLocaleString("ru-RU", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }) + " ₸"
  );
}
