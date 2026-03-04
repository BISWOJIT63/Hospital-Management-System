import React from "react";
import { Building2 } from "lucide-react";

export default function Overview({ HOSPITAL }) {
  return (
    <section
      id="overview"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36 text-slate-800 dark:text-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        Overview
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base mb-6">
        {HOSPITAL.about}
      </p>
    </section>
  );
}
