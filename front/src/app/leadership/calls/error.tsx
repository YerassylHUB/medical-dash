"use client";

export default function LeadershipCallsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-900 space-y-3">
      <p className="font-semibold">Не удалось показать страницу «Вызовы и обслуживание»</p>
      <p className="text-red-800/90 break-words">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-red-700 px-3 py-2 text-white text-xs font-medium hover:bg-red-800"
      >
        Повторить
      </button>
    </div>
  );
}
