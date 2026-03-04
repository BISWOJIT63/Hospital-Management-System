import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Insurance = ({ DOCTOR }) => {
  return (
    <div>
      <section
        id="insurances"
        className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Insurance Accepted ({DOCTOR.insurances.length})
          </h2>
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
          {DOCTOR.insurances.map((ins, idx) => (
            <div
              key={idx}
              className="w-32 h-16 overflow-hidden shrink-0 border border-slate-200 rounded-lg flex items-center justify-center bg-white shadow-sm"
            >
              <img src={ins} alt="" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insurance;
