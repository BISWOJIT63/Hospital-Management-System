import React from "react";
import { Stethoscope } from "lucide-react";

export default function Departments({ HOSPITAL }) {
  return (
    <section
      id="departments"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36 text-slate-800 dark:text-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        Centers of Excellence
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOSPITAL.departments.map((dept, idx) => (
          <div
            key={idx}
            className="p-5 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:border-green-200 dark:hover:border-green-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
          >
            <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-primary transition-colors">
              {dept.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-2 mb-1">
              Head: {dept.head}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-3 leading-relaxed">
              {dept.description}
            </p>
            <div className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded inline-block font-medium">
              {dept.specialties}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
