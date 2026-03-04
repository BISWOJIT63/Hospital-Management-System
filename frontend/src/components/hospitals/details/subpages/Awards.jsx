import React from "react";
import { Award } from "lucide-react";

export default function Awards({ HOSPITAL }) {
  return (
    <section
      id="awards"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36 text-slate-800 dark:text-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        Awards & Recognitions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOSPITAL.awards.map((award, idx) => (
          <div
            key={idx}
            className="border border-slate-100 dark:border-slate-800 rounded-xl p-5 bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4 hover:bg-white dark:hover:bg-slate-800 hover:border-green-200 dark:hover:border-green-800 transition shadow-sm"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {award.title}
              </h3>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 mt-1 mb-1">
                {award.year}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {award.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
