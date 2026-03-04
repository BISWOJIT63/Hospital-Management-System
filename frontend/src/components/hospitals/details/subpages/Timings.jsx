import React from "react";
import { Clock, Activity } from "lucide-react";

export default function Timings({ HOSPITAL }) {
  return (
    <section
      id="timings"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36 text-slate-800 dark:text-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        Hospital Timings
      </h2>
      <div className=" border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-sm">
        {HOSPITAL.businessHours.map((bh, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-3 px-5 border-b border-slate-100 dark:border-slate-800 last:border-0 ${bh.highlight ? "bg-green-50/50 dark:bg-green-900/20" : "bg-white dark:bg-slate-900"}`}
          >
            <span
              className={`font-medium ${bh.highlight ? "text-green-700 dark:text-green-400" : "text-slate-700 dark:text-slate-300"}`}
            >
              {bh.day}
            </span>
            <div className="flex items-center gap-3">
              {bh.isOpen && bh.highlight ? (
                <span className="text-[10px] font-bold bg-lime-200 dark:bg-lime-900/50 text-lime-700 dark:text-lime-400 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Urgent Care
                </span>
              ) : bh.isOpen ? (
                <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded uppercase">
                  Open
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded uppercase">
                  Closed
                </span>
              )}
              <span
                className={`font-medium ${bh.highlight ? "text-green-700 dark:text-green-400" : "text-slate-900 dark:text-slate-100"}`}
              >
                {bh.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
