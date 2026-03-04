import React from "react";
import {
  Building2,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Settings,
  LogOut,
} from "lucide-react";
import { NAV } from "../adminData";

export default function Sidebar({
  active,
  setActive,
  fac,
  collapsed,
  setCollapsed,
}) {
  const g =
    fac.facilityType === "hospital"
      ? "from-green-600 to-violet-600"
      : "from-teal-500 to-emerald-600";
  const TI = fac.facilityType === "hospital" ? Building2 : Stethoscope;
  const w = collapsed ? "w-[68px]" : "w-60";

  return (
    <aside
      className={`hidden lg:flex flex-col ${w} bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 h-screen sticky top-0 shrink-0 overflow-hidden transition-all duration-300`}
    >
      <div
        className={`border-b border-slate-100 dark:border-slate-800 shrink-0 ${collapsed ? "p-3 flex flex-col items-center gap-3" : "p-4"}`}
      >
        {collapsed ? (
          <>
            <div
              className={`w-9 h-9 bg-gradient-to-br ${g} rounded-xl flex items-center justify-center shadow-md`}
            >
              <TI size={17} className="text-white" />
            </div>
            {/* expand button */}
            <button
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-300 dark:hover:border-green-500/30 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-all group"
            >
              <ChevronRight
                size={15}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
            {/* live dot */}
            <div
              className="w-9 h-9 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center justify-center"
              title="Live & Approved"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 bg-gradient-to-br ${g} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <TI size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 dark:text-white font-black text-sm leading-none truncate max-w-[110px]">
                    {fac.name.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-[11px] capitalize">
                    {fac.facilityType} Dashboard
                  </p>
                </div>
              </div>
              {/* collapse button */}
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse sidebar"
                className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-300 dark:hover:border-green-500/30 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-all shrink-0 group"
              >
                <ChevronLeft
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                  Live & Approved
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-500">
                  {fac.approvedDate}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── nav ── */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? "p-2" : "p-3"}`}>
        {NAV.map(({ id, label, icon: Ico }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center rounded-xl transition-all mb-0.5
              ${collapsed ? "justify-center p-0 w-11 h-11 mx-auto" : "gap-2.5 px-3 py-2.5 text-sm font-semibold"}
              ${
                active === id
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20 dark:shadow-green-500/10"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <Ico size={15} className="shrink-0" />
            {!collapsed && (
              <>
                {label}
                {active === id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* ── footer actions ── */}
      <div
        className={`border-t border-slate-100 dark:border-slate-800 shrink-0 ${collapsed ? "p-2 flex flex-col items-center gap-1" : "p-3"}`}
      >
        {[
          { icon: Settings, label: "Settings", red: false },
          { icon: LogOut, label: "Log Out", red: true },
        ].map(({ icon: Ico, label, red }) => (
          <button
            key={label}
            title={collapsed ? label : undefined}
            className={`transition-all rounded-xl
              ${collapsed ? "w-11 h-11 flex items-center justify-center" : "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold"}
              ${
                red
                  ? "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            <Ico size={15} />
            {!collapsed && label}
          </button>
        ))}
      </div>
    </aside>
  );
}
