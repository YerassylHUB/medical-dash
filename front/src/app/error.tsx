"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";

export default function AppError({
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
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8 text-center max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-gray-900">Что-то пошло не так</h1>
      <p className="text-sm text-gray-600">
        {error.message || "Не удалось отобразить страницу. Попробуйте обновить или вернитесь назад."}
      </p>
      {error.digest ? (
        <p className="text-xs text-gray-400 font-mono" suppressHydrationWarning>
          Код: {error.digest}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          Повторить
        </button>
        <Link href={LEADERSHIP_BASE} className="text-sm text-blue-600 font-medium hover:underline">
          На сводку
        </Link>
      </div>
    </div>
  );
}
