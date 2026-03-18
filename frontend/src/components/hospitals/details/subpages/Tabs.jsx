import React from "react";

const TABS = [
  "Overview",
  "Departments",
  "Facilities",
  "Doctors",
  "Awards",
  "Timings",
  "Reviews",
];

export default function Tabs({ activeTab, scrollToSection, tabs = TABS }) {
  return (
    <div className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-950 pt-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 snap-x">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`snap-start shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeTab === tab
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
