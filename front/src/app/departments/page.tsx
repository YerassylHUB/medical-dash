import { departmentOccupancy } from "@/data/mock";
import { cn } from "@/lib/utils";
import { BedDouble, Users, Clock, Activity } from "lucide-react";

function OccupancyBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? "bg-red-500" : pct >= 75 ? "bg-orange-400" : "bg-blue-500";
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mt-1.5">
      <div
        className={cn("h-2 rounded-full transition-all", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function DepartmentsPage() {
  const totalBeds = departmentOccupancy.reduce((s, d) => s + d.beds, 0);
  const totalOccupied = departmentOccupancy.reduce((s, d) => s + d.occupied, 0);

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Отделений", value: departmentOccupancy.length, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Всего коек", value: totalBeds, icon: BedDouble, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Занято коек", value: totalOccupied, icon: BedDouble, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Загруженность", value: `${Math.round((totalOccupied / totalBeds) * 100)}%`, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Department cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departmentOccupancy.map((dept) => {
          const pct = Math.round((dept.occupied / dept.beds) * 100);
          const statusColor = pct >= 90 ? "border-red-200 bg-red-50" : pct >= 75 ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50";
          const statusText = pct >= 90 ? "Переполнено" : pct >= 75 ? "Высокая нагрузка" : "В норме";
          const statusTextColor = pct >= 90 ? "text-red-600" : pct >= 75 ? "text-orange-600" : "text-blue-600";

          return (
            <div key={dept.name} className="card p-5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block", statusColor, statusTextColor)}>
                    {statusText}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{pct}%</p>
                  <p className="text-xs text-gray-400">загруженность</p>
                </div>
              </div>

              <OccupancyBar pct={pct} />

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                  <BedDouble size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">{dept.occupied}/{dept.beds}</p>
                  <p className="text-xs text-gray-400">Койки</p>
                </div>
                <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                  <Users size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">{dept.doctors}</p>
                  <p className="text-xs text-gray-400">Врачей</p>
                </div>
                <div className="text-center p-2.5 bg-gray-50 rounded-xl">
                  <Clock size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">{dept.waitDays === 0 ? "—" : `${dept.waitDays} дн.`}</p>
                  <p className="text-xs text-gray-400">Ожидание</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
