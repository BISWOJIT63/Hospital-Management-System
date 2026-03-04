import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Availbility = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="availability"
        className="bg-white dark:bg-slate-950 dark:border-slate-700 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Availability</h2>
          <div className="flex gap-2">
            <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {DOCTOR.availability.map((avail, idx) => (
            <div
              key={idx}
              className="w-40 shrink-0 border border-slate-200 rounded-xl p-4 text-center bg-white dark:bg-slate-950 shadow-sm hover:border-green-300 transition cursor-pointer"
            >
              <p className="font-semibold text-slate-900 dark:text-slate-200 text-sm">
                {avail.date}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-200 mt-2 bg-slate-50 dark:bg-slate-800 py-1.5 rounded">
                {avail.time}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Availbility;
