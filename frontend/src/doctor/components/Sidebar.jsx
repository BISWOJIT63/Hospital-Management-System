import React from "react";
import { Icon, ic } from "../icons";

export default function Sidebar({
  doctorData,
  activeTab,
  setActiveTab,
  pendingCount,
  navItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  return (
    <>
      {}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 h-full z-50 transform transition-transform duration-300 w-64 lg:w-60 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-4 border-b df border-slate-100 dark:border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {doctorData?.profilePic ? (
                <img
                  src={doctorData.profilePic}
                  className="w-9 h-9 rounded-xl object-cover"
                  alt=""
                />
              ) : (
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-sm">
                  {doctorData?.name?.[0] || "D"}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                  {doctorData?.name || "Dr. Smith"}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {doctorData?.specialty || "Specialist"}
                </p>
              </div>
            </div>
            {}
            <button
              className="lg:hidden p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon path={ic.x} size={18} />
            </button>
          </div>
          {pendingCount > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs rounded-lg px-2 py-1.5 font-medium border border-amber-100 dark:border-amber-800/30">
              {pendingCount} pending approval{pendingCount > 1 ? "s" : ""}
            </div>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ key, icon, label, badge }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === key
                ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              <Icon path={icon} size={16} />
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <span
                  className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${activeTab === key
                    ? "bg-white text-green-700"
                    : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
