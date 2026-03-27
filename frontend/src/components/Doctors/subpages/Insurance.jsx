import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INSURANCES_LIST } from "../../../utils/constants";

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
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {DOCTOR.insurances.map((insName, idx) => {
            const insData = INSURANCES_LIST.find((i) => i.name === insName);
            return (
              <div
                key={idx}
                className="w-40 h-20 p-2 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-sm transition-transform hover:scale-105"
              >
                {insData?.logo ? (
                  <img
                    src={insData.logo}
                    alt={insName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 text-center px-1">
                    {insName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Insurance;
