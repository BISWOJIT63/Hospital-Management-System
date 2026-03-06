import React from "react";
import {
  Search,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { statusBg, initials, GRADS } from "../adminData";

export function Chip({ label, color = "green" }) {
  const c =
    {
      green:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20",
      teal: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20",
      emerald:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      rose: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
      slate:
        "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    }[color] ||
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";

  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold overflow-hidden whitespace-nowrap ${c}`}
    >
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const cls =
    statusBg[status] ||
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  const icons = {
    accepted: <CheckCircle2 size={10} />,
    pending: <Clock size={10} />,
    cancelled: <XCircle size={10} />,
    paid: <CheckCircle2 size={10} />,
    unpaid: <AlertCircle size={10} />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}
    >
      {icons[status]}
      <span className="capitalize">{status}</span>
    </span>
  );
}

export function Avatar({ name, size = "md", grad = 0 }) {
  const s =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
        ? "w-14 h-14 text-base"
        : "w-10 h-10 text-sm";
  return (
    <div
      className={`${s} bg-gradient-to-br ${GRADS[grad % GRADS.length]} rounded-xl flex items-center justify-center text-white font-black shrink-0`}
    >
      {initials(name)}
    </div>
  );
}

export function SectionHdr({ icon: Ico, title, sub, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-green-50 border border-green-100 dark:bg-green-500/10 dark:border-green-500/20 rounded-xl flex items-center justify-center shrink-0">
          <Ico size={16} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-base font-black text-slate-800 dark:text-white">
            {title}
          </h3>
          {sub && (
            <p className="text-xs text-slate-400 dark:text-slate-400 mt-0.5">
              {sub}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 w-full placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-200"
      />
    </div>
  );
}

export function StatCard({
  icon: Ico,
  label,
  value,
  sub,
  color = "green",
  trend,
}) {
  const bg = {
    green: "from-green-600 to-primary",
    teal: "from-teal-500 to-emerald-600",
    rose: "from-rose-500 to-pink-500",
  }[color];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 flex items-start gap-4">
      <div
        className={`w-11 h-11 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}
      >
        <Ico size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-800 dark:text-white leading-none">
          {value}
        </p>
        {sub && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {sub}
          </p>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full px-2 py-0.5 text-xs font-bold shrink-0">
          <ArrowUpRight size={11} />
          {trend}
        </div>
      )}
    </div>
  );
}
