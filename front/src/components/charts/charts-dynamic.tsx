import dynamic from "next/dynamic";

/** Recharts + ResponsiveContainer ломают SSR → белый экран; грузим только на клиенте. */

function skeleton(height: number) {
  return function ChartSkeleton() {
    return (
      <div
        className="w-full rounded-xl bg-slate-100 animate-pulse"
        style={{ height }}
        aria-hidden
      />
    );
  };
}

export const MarkersComparisonBarChart = dynamic(
  () => import("./MarkersStackedBar").then((m) => m.MarkersComparisonBar),
  { ssr: false, loading: skeleton(280) }
);

export const PatientFlowChartDynamic = dynamic(
  () => import("./PatientFlowChart").then((m) => m.PatientFlowChart),
  { ssr: false, loading: skeleton(280) }
);

export const OccupancyChartDynamic = dynamic(
  () => import("./OccupancyChart").then((m) => m.OccupancyChart),
  { ssr: false, loading: skeleton(280) }
);

export const DiagnosisChartDynamic = dynamic(
  () => import("./DiagnosisChart").then((m) => m.DiagnosisChart),
  { ssr: false, loading: skeleton(220) }
);

export const RevenueChartDynamic = dynamic(
  () => import("./RevenueChart").then((m) => m.RevenueChart),
  { ssr: false, loading: skeleton(280) }
);

export const PatientCallsTrendChartDynamic = dynamic(
  () => import("./PatientCallsTrendChart").then((m) => m.PatientCallsTrendChart),
  { ssr: false, loading: skeleton(320) }
);
