import React from "react";
import { Building2 } from "lucide-react";
const Experience = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="experience"
        className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 dark:bg-slate-950 dark:border-slate-700 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Practice Experience
        </h2>
        <div className="space-y-4">
          {DOCTOR.experienceList.map((exp, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 border border-slate-100 dark:border-slate-900 rounded-xl bg-slate-50/50 dark:bg-slate-800 hover:border-green-100 transition"
            >
              <div className="w-12 h-12 bg-green-50  rounded-lg border border-green-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">{exp.clinic}</h3>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                  {exp.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{exp.period}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;
