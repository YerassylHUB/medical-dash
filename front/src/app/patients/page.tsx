import { patients } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Search, Plus, Filter, Download } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "purple"> = {
  "Стационар": "info",
  "После операции": "warning",
  "Химиотерапия": "purple",
  "Диагностика": "default" as any,
  "Выписан": "success",
};

const priorityVariant: Record<string, "danger" | "warning" | "success"> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

const priorityLabel: Record<string, string> = {
  high: "Срочно",
  medium: "Средний",
  low: "Плановый",
};

export default function PatientsPage() {
  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Всего пациентов", value: "1 284", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Госпитализированы", value: "378", color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Выписаны сегодня", value: "24", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Экстренных", value: "8", color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <span className={`text-lg font-bold ${s.color}`}>{s.value.split(" ")[0][0]}</span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-semibold text-gray-900">Список пациентов</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск пациента..."
                className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-44 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-100">
              <Filter size={13} /> Фильтр
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-100">
              <Download size={13} /> Экспорт
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 rounded-lg text-xs text-white hover:bg-blue-700">
              <Plus size={13} /> Добавить
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 text-left font-medium">ID / Пациент</th>
                <th className="px-4 py-3 text-left font-medium">Отделение</th>
                <th className="px-4 py-3 text-left font-medium">Лечащий врач</th>
                <th className="px-4 py-3 text-left font-medium">Диагноз</th>
                <th className="px-4 py-3 text-left font-medium">Статус</th>
                <th className="px-4 py-3 text-left font-medium">Приоритет</th>
                <th className="px-4 py-3 text-left font-medium">Поступление</th>
                <th className="px-4 py-3 text-left font-medium">Палата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.id} · {p.age} лет · {p.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{p.department}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{p.doctor}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{p.diagnosis}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={statusVariant[p.status] ?? "info"}>{p.status}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={priorityVariant[p.priority]}>{priorityLabel[p.priority]}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{p.admitDate}</td>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-700">{p.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Показано 8 из 1 284 пациентов</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 128].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded-lg text-xs ${p === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
