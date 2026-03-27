import React from "react";
import { Shield, Clock, HeartPulse } from "lucide-react";
import { ST, inpClass, PillBtn } from "../components/UI";
import { FACILITIES_LIST, INSURANCES_LIST } from "../constants";

export default function StepFacilities({ fd, updateArr, toggleArr }) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-10">
      {}
      <section>
        <ST
          icon={HeartPulse}
          title="Insurance Plans"
          sub="Select all insurance providers accepted at your facility"
        />
        <div className="flex flex-wrap gap-2.5">
          {INSURANCES_LIST.map((ins) => (
            <button
              key={ins.name}
              onClick={() => toggleArr("insurances", ins.name)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border-2 transition-all
                ${
                  fd.insurances.includes(ins.name)
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-md shadow-emerald-500/10"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700"
                }
              `}
            >
              {ins.logo ? (
                <img
                  src={ins.logo}
                  alt=""
                  className={`w-6 h-6 object-contain ${fd.insurances.includes(ins.name) ? "" : "grayscale opacity-70"}`}
                />
              ) : (
                <HeartPulse size={16} />
              )}
              <span className="text-xs font-bold uppercase tracking-wider">
                {ins.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {}
      <section>
        <ST
          icon={Shield}
          title="Facilities & Amenities"
          sub="Toggle everything available at your facility"
        />
        <div className="flex flex-wrap gap-2.5">
          {FACILITIES_LIST.map((f) => (
            <PillBtn
              key={f}
              active={fd.facilities.includes(f)}
              label={f}
              onClick={() => toggleArr("facilities", f)}
              activeBg="bg-teal-50 dark:bg-teal-500/20"
              activeText="text-teal-700 dark:text-teal-400"
              activeBorder="border-teal-500 dark:border-teal-400"
            />
          ))}
        </div>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {}
      <section>
        <ST
          icon={Clock}
          title="Business Hours"
          sub="Set opening times — use ★ to mark peak/highlighted days"
        />
        <div className="grid gap-2 max-w-2xl">
          {fd.businessHours.map((bh, i) => (
            <div
              key={bh.day}
              className={`grid grid-cols-[140px_1fr_90px_46px] gap-3 items-center p-3 rounded-2xl border-2 transition-all
                ${
                  bh.isOpen
                    ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    : "bg-slate-50 dark:bg-slate-900/50 border-transparent opacity-70 grayscale-[0.2]"
                }
              `}
            >
              <div
                className={`font-bold text-sm pl-2 ${bh.isOpen ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
              >
                {bh.day}
              </div>

              <input
                value={bh.time}
                onChange={(e) =>
                  updateArr("businessHours", i, "time", e.target.value)
                }
                disabled={!bh.isOpen}
                placeholder="09:00 - 17:00"
                className={`${inpClass()} py-2 text-sm text-center font-bold`}
              />

              <button
                onClick={() =>
                  updateArr("businessHours", i, "isOpen", !bh.isOpen)
                }
                className={`py-2 rounded-xl border-2 text-xs font-bold transition-colors w-full
                  ${
                    bh.isOpen
                      ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }
                `}
              >
                {bh.isOpen ? "Open" : "Closed"}
              </button>

              <button
                onClick={() =>
                  updateArr("businessHours", i, "highlight", !bh.highlight)
                }
                title="Mark as Peak Day"
                className={`py-1.5 rounded-xl border-2 text-lg transition-colors w-full flex items-center justify-center
                  ${
                    bh.highlight
                      ? "bg-green-50 dark:bg-green-500/10 border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-500/20"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }
                `}
              >
                {bh.highlight ? "★" : "☆"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
