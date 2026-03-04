import React from "react";

const Services = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="treatments"
        className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
          Services & Pricing
        </h2>
        <div className="flex flex-wrap gap-3">
          {DOCTOR.services.map((srv, idx) => (
            <div
              key={idx}
              className="flex items-center border border-slate-200 rounded-full bg-white dark:bg-slate-950 shadow-sm overflow-hidden text-sm"
            >
              <span className="px-4 py-2 dark:text-slate-200 text-slate-700">{srv.name}</span>
              <span className="bg-slate-50 dark:bg-slate-950 px-3 py-2 border-l border-slate-200 font-semibold text-slate-900 dark:text-slate-200">
                {srv.price}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
