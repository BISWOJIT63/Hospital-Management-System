import { Clock } from "lucide-react";
import StepHeader from "./StepHeader";

export default function StepDateTime({
  date,
  time,
  onDateSelect,
  onTimeSelect,
}) {
  const TIME_SLOTS = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:45 AM",
    "01:00 PM",
    "02:30 PM",
    "03:15 PM",
    "04:00 PM",
  ];

  const DATES = [
    { day: "Mon", date: "24", month: "Aug" },
    { day: "Tue", date: "25", month: "Aug" },
    { day: "Wed", date: "26", month: "Aug" },
    { day: "Thu", date: "27", month: "Aug" },
    { day: "Fri", date: "28", month: "Aug" },
  ];
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader title="Date & Time" subtitle="Schedule your appointment." />

      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Select Date
        </label>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {DATES.map((d, i) => {
            const isSelected = date?.date === d.date;
            return (
              <button
                key={i}
                onClick={() => onDateSelect(d)}
                className={`
                  flex-1 min-w-[80px] flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                  ${isSelected
                    ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "border-slate-100 dark:border-slate-800  hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-600 dark:text-slate-400"
                  }
                `}
              >
                <span
                  className={`text-xs font-medium mb-1 ${isSelected ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {d.month}
                </span>
                <span className="text-2xl font-bold mb-1">{d.date}</span>
                <span
                  className={`text-xs uppercase font-bold ${isSelected ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {d.day}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Available Slots
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIME_SLOTS.map((t) => {
            const isSelected = time === t;
            return (
              <button
                key={t}
                onClick={() => onTimeSelect(t)}
                className={`
                  py-3 px-2 rounded-lg text-sm font-medium transition-all border
                  ${isSelected
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-500 ring-1 ring-emerald-500"
                    : " text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400"
                  }
                `}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> All times are in your local timezone.
        </p>
      </div>
    </div>
  );
}
