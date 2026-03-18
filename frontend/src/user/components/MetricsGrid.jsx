import {
  CheckCircle,
  TrendingUp,
  Clock,
  CalendarCheck,
  XCircle,
  Activity,
} from "lucide-react";

export default function MetricsGrid({ theme, patientData }) {
  const metrics = [
    {
      label: "Total Appointments",
      value: patientData?.total ?? "—",
      icon: Activity,
      iconColor: "text-blue-500",
      trend: "All time bookings",
      trendColor: "text-blue-500",
      trendBold: false,
    },
    {
      label: "Upcoming",
      value: patientData?.upcoming ?? "—",
      icon: Clock,
      iconColor: "text-amber-500",
      trend: "Scheduled ahead",
      trendColor: "text-amber-500",
      trendBold: true,
    },
    {
      label: "Completed",
      value: patientData?.completed ?? "—",
      icon: CheckCircle,
      iconColor: "text-green-500",
      trend: patientData?.completed > 0 ? "Successfully done" : "No completed yet",
      trendColor: "text-green-500",
      trendBold: true,
    },
    {
      label: "Cancelled",
      value: patientData?.cancelled ?? "—",
      icon: XCircle,
      iconColor: "text-rose-500",
      trend: patientData?.cancelled > 0 ? "Cancelled bookings" : "None cancelled",
      trendColor: "text-rose-500",
      trendBold: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className={`p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{metric.label}</p>
              <Icon className={`w-5 h-5 ${metric.iconColor}`} />
            </div>
            <h4 className={`text-3xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {patientData === null ? (
                <span className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse inline-block" />
              ) : metric.value}
            </h4>
            <div className={`flex items-center gap-1 mt-2 text-sm ${metric.trendColor} ${metric.trendBold ? "font-bold" : "font-medium"}`}>
              <span>{metric.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
