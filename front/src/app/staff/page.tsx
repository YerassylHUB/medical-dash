import { staff } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Star, Search, Plus, Filter } from "lucide-react";

const statusVariant = (status: string): "success" | "warning" | "info" => {
  if (status === "На смене") return "success";
  if (status === "Операция") return "warning";
  return "info";
};

export default function StaffPage() {
  const onShift = staff.filter((s) => s.status === "На смене" || s.status === "Операция").length;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Всего персонала", value: "312" },
          { label: "На смене сейчас", value: String(onShift) },
          { label: "Врачей", value: "124" },
          { label: "Медсестёр", value: "188" },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Staff table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-semibold text-gray-900">Сотрудники</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-100">
              <Filter size={13} /> Фильтр
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 rounded-lg text-xs text-white hover:bg-blue-700">
              <Plus size={13} /> Добавить
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {staff.map((s) => (
            <div key={s.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {s.name.split(" ").filter((_, i) => i > 0).map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.role} · {s.department}</p>
                  </div>
                  <Badge variant={statusVariant(s.status)}>{s.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{s.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">Опыт: {s.experience} лет</span>
                  {s.patients > 0 && (
                    <span className="text-xs text-gray-400">Пациентов: {s.patients}</span>
                  )}
                  <span className="text-xs text-gray-400">{s.shifts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
