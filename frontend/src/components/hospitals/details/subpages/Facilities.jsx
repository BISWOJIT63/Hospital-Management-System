import React from "react";
import { Microscope, Ambulance, CheckCircle2 } from "lucide-react";

export default function Facilities({ HOSPITAL }) {
  return (
    <section
      id="facilities"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        Hospital Facilities
      </h2>
      <div className="flex flex-wrap gap-3">
        {HOSPITAL.facilities.map((facility, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 shadow-sm"
          >
            {facility.includes("Emergency") ||
            facility.includes("Ambulance") ? (
              <Ambulance className="w-4 h-4 text-green-500 dark:text-green-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
            )}
            <span className="font-medium">{facility}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
