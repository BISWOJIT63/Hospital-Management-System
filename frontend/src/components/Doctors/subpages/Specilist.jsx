import React from "react";

const Specilist = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="speciality"
        className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Speciality</h2>
        <div className="flex flex-wrap gap-3">
          {DOCTOR.specialties.map((spec, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 rounded-full text-sm text-slate-700 dark:text-slate-300 shadow-sm hover:border-green-300 transition cursor-default"
            >
              {spec}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Specilist;
