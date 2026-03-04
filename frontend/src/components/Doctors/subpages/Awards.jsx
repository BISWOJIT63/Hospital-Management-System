import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Awards = ({ DOCTOR }) => {
  return (
    <div>
      <section
        id="awards"
        className="bg-white dark:bg-slate-950 dark:border-slate-700 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Awards
          </h2>
          <div className="flex gap-2">
            <button className="p-1 rounded bg-slate-100 text-slate-400 dark:bg-slate-800 hover:text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {DOCTOR.awards.map((award, idx) => (
            <div
              key={idx}
              className="w-64 shrink-0 border border-slate-200 rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">
                {award.title}
              </h3>
              <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mb-2">
                {award.year}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {award.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Awards;
