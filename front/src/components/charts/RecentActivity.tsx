import { cn } from "@/lib/utils";
import { AlertTriangle, Scissors, LogOut, LogIn, FlaskConical, Users } from "lucide-react";

type Activity = {
  time: string;
  event: string;
  detail: string;
  type: string;
};

const typeConfig: Record<string, { icon: React.ElementType; color: string; dot: string }> = {
  emergency: { icon: AlertTriangle, color: "text-red-600", dot: "bg-red-500" },
  surgery: { icon: Scissors, color: "text-orange-600", dot: "bg-orange-500" },
  discharge: { icon: LogOut, color: "text-emerald-600", dot: "bg-emerald-500" },
  admission: { icon: LogIn, color: "text-blue-600", dot: "bg-blue-500" },
  lab: { icon: FlaskConical, color: "text-purple-600", dot: "bg-purple-500" },
  shift: { icon: Users, color: "text-gray-600", dot: "bg-gray-400" },
};

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="space-y-1">
      {activities.map((a, i) => {
        const cfg = typeConfig[a.type] ?? typeConfig.shift;
        const Icon = cfg.icon;
        return (
          <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", `bg-opacity-10`, cfg.dot.replace("bg-", "bg-").replace("-500", "-100").replace("-400", "-100"))}>
              <Icon size={14} className={cfg.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800">{a.event}</p>
              <p className="text-xs text-gray-400 truncate">{a.detail}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{a.time}</span>
          </div>
        );
      })}
    </div>
  );
}
