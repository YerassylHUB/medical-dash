"use client";

import { useEffect, useState } from "react";
import { API_V1 } from "@/lib/api";
import { cn } from "@/lib/utils";

export function BackendStatus() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_V1}/health`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { ok?: boolean }) => {
        if (!cancelled) setStatus(d.ok ? "ok" : "error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          status === "loading" && "bg-amber-400 animate-pulse",
          status === "ok" && "bg-emerald-500",
          status === "error" && "bg-red-500"
        )}
      />
      <span className="text-[10px] text-gray-500 leading-tight">
        {status === "loading" && "API…"}
        {status === "ok" && "API онлайн"}
        {status === "error" && "API недоступен"}
      </span>
    </div>
  );
}
