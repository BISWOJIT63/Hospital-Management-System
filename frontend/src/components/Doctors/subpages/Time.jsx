import React from "react";

const Time = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="business-hours"
        className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
          Business Hours
        </h2>
        <div className="max-w-full border border-slate-200 rounded-xl overflow-hidden text-sm">
          {DOCTOR.businessHours.map((bh, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-3 px-5 border-b border-slate-100 last:border-0 ${bh.day === "Today" ? "bg-slate-200 dark:bg-slate-800" : ""}`}
            >
              <span
                className={`font-medium ${bh.day === "Today" ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-100"}`}
              >
                {bh.day}
              </span>
              <div className="flex items-center gap-3">
                {bh.isOpen && (
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">
                    Open Now
                  </span>
                )}
                <span className="text-slate-700 dark:text-slate-200 font-medium">{bh.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Time;
