import React from "react";
import { Check, X } from "lucide-react";


export function Field({ label, error, children, span }) {
  return (
    <div className={span ? "col-span-full" : ""}>
      {label && (
        <label
          className={`block text-[11px] font-bold tracking-widest uppercase mb-1.5 ${error ? "text-rose-500 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <div className="text-rose-500 dark:text-rose-400 text-xs mt-1 font-medium flex items-center gap-1">
          <X size={12} /> {error}
        </div>
      )}
    </div>
  );
}

export function ST({ icon: Icon, title, sub }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20">
          <Icon size={20} />
        </div>
        <h3 className="m-0 text-xl font-black text-slate-800 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      {sub && (
        <p className="m-0 ml-[52px] text-sm text-slate-500 dark:text-slate-400 font-medium">
          {sub}
        </p>
      )}
    </div>
  );
}

export function DashCard({
  title,
  icon: Icon,
  accentClass = "text-green-600 dark:text-green-400",
  bgAccentClass = "bg-green-500/10",
  children,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div
        className={`px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5 ${bgAccentClass}`}
      >
        <div className={accentClass}>
          <Icon size={18} />
        </div>
        <span className="font-bold text-sm text-slate-800 dark:text-white">
          {title}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function EmptyState({ icon: Icon, msg }) {
  return (
    <div className="text-center py-16 px-6 text-slate-500 dark:text-slate-400">
      <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
        <Icon size={24} />
      </div>
      <p className="text-sm font-medium m-0">{msg}</p>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;

  const bgColors = {
    error: "bg-rose-600 dark:bg-rose-500",
    warn: "bg-green-500 dark:bg-green-400 text-green-900",
    success: "bg-emerald-600 dark:bg-emerald-500",
  };

  const colorClass = bgColors[toast.type] || bgColors.success;
  const textColor = toast.type === "warn" ? "text-green-900" : "text-white";

  return (
    <div
      className={`fixed bottom-6 right-6 ${colorClass} ${textColor} px-5 py-3.5 rounded-xl text-sm font-bold shadow-2xl shadow-black/20 z-[9999] flex items-center gap-3 max-w-[360px] animate-in slide-in-from-bottom-5 fade-in duration-300`}
    >
      {toast.type === "error" ? (
        <X size={16} strokeWidth={3} />
      ) : (
        <Check size={16} strokeWidth={3} />
      )}
      {toast.msg}
    </div>
  );
}

export function PillBtn({
  active,
  label,
  onClick,
  activeBg = "bg-green-50 dark:bg-green-500/20",
  activeText = "text-green-600 dark:text-green-400",
  activeBorder = "border-green-600 dark:border-green-400",
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full border-2 text-sm transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/50
        ${
          active
            ? `${activeBg} ${activeBorder} ${activeText} font-bold`
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:border-slate-300 dark:hover:border-slate-600"
        }`}
    >
      {active && <Check size={14} strokeWidth={3} />} {label}
    </button>
  );
}

export const inpClass = (err) => `
  w-full rounded-xl px-4 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-4
  ${
    err
      ? "bg-rose-50 dark:bg-rose-500/10 border-2 border-rose-300 dark:border-rose-500/50 text-rose-900 dark:text-rose-100 focus:ring-rose-500/20"
      : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500/20 hover:border-slate-300 dark:hover:border-slate-600"
  }
`;

export const addBtnClass =
  "inline-flex items-center gap-1.5 px-4 py-2.5 bg-green-50 dark:bg-green-500/10 border-2 border-dashed border-green-500 dark:border-green-400 rounded-xl text-green-600 dark:text-green-400 text-sm font-bold hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500/20";
