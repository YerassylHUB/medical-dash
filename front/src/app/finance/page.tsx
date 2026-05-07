import { RevenueChartDynamic } from "@/components/charts/charts-dynamic";
import { financeBreakdown, expenseBreakdown, revenueData } from "@/data/mock";
import { formatMoney } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function FinancePage() {
  const lastMonth = revenueData[revenueData.length - 1];
  const profit = lastMonth.income - lastMonth.expenses;
  const margin = Math.round((profit / lastMonth.income) * 100);

  return (
    <div className="space-y-5">
      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Выручка (дек)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{formatMoney(lastMonth.income)}</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600">
                <TrendingUp size={12} />
                <span className="text-xs font-semibold">+11.4% vs ноябрь</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <DollarSign className="text-blue-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="card p-5 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Расходы (дек)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{formatMoney(lastMonth.expenses)}</p>
              <div className="flex items-center gap-1 mt-2 text-red-500">
                <TrendingUp size={12} />
                <span className="text-xs font-semibold">+4.2% vs ноябрь</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="text-orange-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="card p-5 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Прибыль (дек)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{formatMoney(profit)}</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600">
                <TrendingUp size={12} />
                <span className="text-xs font-semibold">Маржа: {margin}%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-emerald-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Доходы и расходы</h2>
            <p className="text-xs text-gray-400">Финансовая динамика за 2026 год</p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">Прибыльность: {margin}%</span>
        </div>
        <RevenueChartDynamic />
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Структура доходов</h3>
          <div className="space-y-3">
            {financeBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{formatMoney(item.amount)}</span>
                    <span className="text-xs text-gray-400 ml-2">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Структура расходов</h3>
          <div className="space-y-3">
            {expenseBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.category}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{formatMoney(item.amount)}</span>
                    <span className="text-xs text-gray-400 ml-2">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-orange-400"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
