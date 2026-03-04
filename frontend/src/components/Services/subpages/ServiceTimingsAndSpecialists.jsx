import React from "react";
import { Users, Award, Clock, Activity } from "lucide-react";

export const ServiceSpecialists = ({ specialists }) => {
  return (
    <section
      id="specialists"
      className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm scroll-mt-28"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Users className="w-5 h-5 text-green-600 dark:text-green-500" />{" "}
        Dedicated Specialists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specialists.map((doc, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 border border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-green-200 dark:hover:border-green-700 transition cursor-pointer"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shrink-0"
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {doc.name}
              </h3>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded inline-block mt-1">
                {doc.specialty}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                <Award className="w-3 h-3 text-slate-400" /> {doc.experience}{" "}
                Exp
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ServiceTimings = ({ businessHours }) => {
  return (
    <section
      id="timings"
      className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm scroll-mt-28"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-green-600 dark:text-green-500" />{" "}
        Department Timings
      </h2>
      <div className="border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden text-sm">
        {businessHours.map((bh, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-3.5 px-5 border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${
              bh.highlight
                ? "bg-lime-50/50 dark:bg-lime-500/10"
                : "bg-white dark:bg-slate-800"
            }`}
          >
            <span
              className={`font-medium ${
                bh.highlight
                  ? "text-lime-700 dark:text-lime-400"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {bh.day}
            </span>
            <div className="flex items-center gap-3">
              {bh.isOpen && bh.highlight ? (
                <span className="text-[10px] font-bold bg-lime-100 dark:bg-lime-500/20 text-lime-700 dark:text-lime-400 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Priority
                </span>
              ) : bh.isOpen ? (
                <span className="text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded uppercase">
                  Open
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded uppercase">
                  Closed
                </span>
              )}
              <span
                className={`font-medium text-right ${
                  bh.highlight
                    ? "text-lime-700 dark:text-lime-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {bh.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
