import { ChevronDown } from "lucide-react";
import React from "react";

const Bio = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="doctor-bio"
        className="bg-white dark:bg-slate-950 dark:border-slate-700 p-6 md:p-8 rounded-xl border border-slate-200  shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Doctor Bio</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{DOCTOR.about}</p>
        <button className="text-green-600 flex text-sm font-medium mt-2 hover:underline">
          See More  <ChevronDown />
        </button>
      </section>
    </div>
  );
};

export default Bio;
