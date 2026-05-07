"use client";

/**
 * Срабатывает при ошибке в корневом layout (когда обычный error.tsx недоступен).
 * Должен сам объявить html/body — без общих стилей приложения.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          background: "#f9fafb",
          color: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Критическая ошибка
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "1.25rem" }}>
            {error.message || "Приложение не смогло загрузиться."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Повторить
          </button>
        </div>
      </body>
    </html>
  );
}
