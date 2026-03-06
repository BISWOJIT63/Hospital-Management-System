import {
  CheckCircle,
  TrendingUp,
  Clock,
  RefreshCw,
  Archive,
  Brain,
} from "lucide-react";

const metrics = [
  {
    label: "Active Meds",
    value: "12",
    icon: CheckCircle,
    iconColor: "text-green-500",
    trend: "+4% this week",
    trendIcon: TrendingUp,
    trendColor: "text-green-500",
    trendBold: true,
  },
  {
    label: "Refills Pending",
    value: "3",
    icon: Clock,
    iconColor: "text-amber-500",
    trend: "Awaiting pharmacy",
    trendIcon: RefreshCw,
    trendColor: "text-amber-500",
    trendBold: true,
  },
  {
    label: "Completed",
    value: "45",
    icon: Archive,
    iconColor: "text-slate-400",
    trend: "Last 30 days",
    trendIcon: null,
    trendColor: "text-slate-500",
    trendBold: false,
  },
  {
    label: "AI Adherence",
    value: "94%",
    icon: Brain,
    iconColor: "text-emerald-600",
    trend: "Above benchmark",
    trendIcon: null,
    trendColor: "text-emerald-600",
    trendBold: true,
  },
];

export default function MetricsGrid({ theme }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trendIcon;
        return (
          <div
            key={metric.label}
            className="glass-card p-6 rounded-xl shadow-sm border"
          >
            <div className="flex justify-between items-start">
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{metric.label}</p>
              <Icon className={`w-5 h-5 ${metric.iconColor}`} />
            </div>
            <h4 className={`text-3xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{metric.value}</h4>
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${metric.trendColor} ${
                metric.trendBold ? "font-bold" : "font-medium"
              }`}
            >
              {TrendIcon && <TrendIcon className="w-4 h-4" />}
              <span>{metric.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
