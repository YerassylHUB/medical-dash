import Link from "next/link";
import {
  polyclinicMeta,
  polyclinicActivityGrand,
  fundingGOBMPTotal,
  fundingOSMSTotal,
  fluorographyGrand,
  oncoMarker2Grand,
} from "@/data/polyclinic";
import { PolyclinicActivityBar } from "@/components/charts/PolyclinicActivityBar";
import { LEADERSHIP_BASE } from "@/config/leadership-tabs";
import { Activity, Wallet, Microscope, AlertTriangle, ChevronRight } from "lucide-react";

export default function LeadershipSummaryPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{polyclinicMeta.networkName}</p>
          <h2 className="text-lg font-bold text-gray-900">Сводка для руководства · {polyclinicMeta.reportBranch}</h2>
          <p className="text-sm text-gray-500">Период отчёта (услуги): {polyclinicMeta.sliceMonth}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4 border-l-4 border-blue-600">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase">
            <Activity size={14} /> Актив
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{polyclinicActivityGrand.total}</p>
          <p className="text-xs text-gray-400">все ЦСЗ + моб. бригада</p>
        </div>
        <div className="card p-4 border-l-4 border-amber-500">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase">
            <Wallet size={14} /> ГОБМП
          </div>
          <p className="text-2xl font-bold text-amber-900 mt-1">{fundingGOBMPTotal.pct}%</p>
          <p className="text-xs text-gray-400">исполнение плана (март)</p>
        </div>
        <div className="card p-4 border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase">
            <Wallet size={14} /> ОСМС
          </div>
          <p className="text-2xl font-bold text-emerald-800 mt-1">{fundingOSMSTotal.pct}%</p>
          <p className="text-xs text-gray-400">исполнение плана (март)</p>
        </div>
        <div className="card p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase">
            <AlertTriangle size={14} /> Онко маркер 2
          </div>
          <p className="text-2xl font-bold text-red-700 mt-1">{oncoMarker2Grand.pct}%</p>
          <p className="text-xs text-gray-400">доля просрочки · всего {oncoMarker2Grand.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Актив поликлиники по ЦСЗ</h3>
            <Link
              href={`${LEADERSHIP_BASE}/activity`}
              className="text-xs text-blue-600 font-medium flex items-center gap-0.5 hover:underline"
            >
              Таблица <ChevronRight size={14} />
            </Link>
          </div>
          <PolyclinicActivityBar />
        </div>
        <div className="card p-5 flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase mb-2">
            <Microscope size={14} /> Флюорозаряженность
          </div>
          <p className="text-3xl font-bold text-gray-900">{fluorographyGrand.pct}%</p>
          <p className="text-sm text-gray-500 mt-1">
            просрочено {fluorographyGrand.overdue} из {fluorographyGrand.total}
          </p>
          <Link
            href={`${LEADERSHIP_BASE}/markers`}
            className="mt-auto text-sm text-blue-600 font-medium pt-4 hover:underline inline-flex items-center gap-0.5"
          >
            Маркеры <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
