"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";

export default function LeadershipError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-6 space-y-3">
      <h2 className="text-base font-semibold text-gray-900">Ошибка в разделе «Руководство»</h2>
      <p className="text-sm text-gray-600">
        {error.message || "Не удалось отобразить страницу. Попробуйте обновить или откройте другую вкладку отчёта."}
      </p>
      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          Повторить
        </button>
        <Link href={LEADERSHIP_BASE} className="text-sm text-blue-600 font-medium hover:underline self-center">
          На сводку
        </Link>
      </div>
    </div>
  );
}
