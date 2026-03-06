import React from "react";
import { Icon, ic } from "../icons";

export default function Topbar({
  activeTab,
  navItems,
  gSearch,
  setGSearch,
  searchOpen,
  setSearchOpen,
  searchResults,
  setActiveTab,
  pendingCount,
  doctorData,
  setIsMobileMenuOpen,
}) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 transition-colors">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-1.5 -ml-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Icon path={ic.menu} size={22} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">
            {navItems.find((n) => n.key === activeTab)?.label || "Dashboard"}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {}
        <div className="relative">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 w-48 sm:w-72 transition-colors">
            <Icon
              path={ic.search}
              size={14}
              className="text-slate-400 dark:text-slate-500 shrink-0"
            />
            <input
              className="bg-transparent text-sm flex-1 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              placeholder="Search patients, invoices, reviews…"
              value={gSearch}
              onChange={(e) => setGSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            />
            {gSearch && (
              <button
                onClick={() => setGSearch("")}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Icon path={ic.x} size={13} />
              </button>
            )}
          </div>
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden">
              {searchResults.slice(0, 8).map((r, i) => (
                <button
                  key={i}
                  onMouseDown={() => {
                    setActiveTab(r.tab);
                    setGSearch("");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-left border-b border-slate-50 dark:border-slate-700/50 last:border-0 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${r.type === "patient" || r.type === "invoice"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}
                  >
                    {r.type === "patient"
                      ? "P"
                      : r.type === "invoice"
                        ? "₹"
                        : "★"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {r.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                      {r.sub}
                    </p>
                  </div>
                  <span className="text-xs text-slate-300 dark:text-slate-600 capitalize shrink-0">
                    {r.type}
                  </span>
                </button>
              ))}
            </div>
          )}
          {searchOpen && gSearch.length >= 2 && searchResults.length === 0 && (
            <div className="absolute top-full mt-2 right-0 w-48 sm:w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 p-4 text-center text-sm text-slate-400 dark:text-slate-500">
              No results for "{gSearch}"
            </div>
          )}
        </div>
        <button className="relative w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Icon path={ic.bell} size={15} />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              {pendingCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
