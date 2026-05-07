import Link from "next/link";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Страница не найдена</h1>
      <p className="text-gray-500 text-sm max-w-md">Проверьте адрес или вернитесь к разделу «Руководство».</p>
      <Link href={LEADERSHIP_BASE} className="text-blue-600 font-medium hover:underline">
        На сводку
      </Link>
    </div>
  );
}
