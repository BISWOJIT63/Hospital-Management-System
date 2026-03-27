import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";
import { ST, inpClass } from "../components/UI";
import { emptyAward } from "../constants";

export default function StepAwards({ fd, updateArr, addItem, removeItem }) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-8">
      <ST
        icon={Award}
        title="Awards & Recognitions"
        sub="Share your facility's achievements and certifications"
      />

      <div className="space-y-6">
        {fd.awards.map((award, i) => (
          <div
            key={i}
            className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 relative group transition-all hover:border-green-500/30"
          >
            {fd.awards.length > 1 && (
              <button
                onClick={() => removeItem("awards", i)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <Trash2 size={14} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                  Award Title
                </label>
                <input
                  value={award.title}
                  onChange={(e) => updateArr("awards", i, "title", e.target.value)}
                  placeholder="e.g. Best Specialized Hospital 2024"
                  className={inpClass()}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                  Year
                </label>
                <input
                  value={award.year}
                  onChange={(e) => updateArr("awards", i, "year", e.target.value)}
                  placeholder="2024"
                  className={inpClass()}
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">
                  Description
                </label>
                <textarea
                  value={award.desc}
                  onChange={(e) => updateArr("awards", i, "desc", e.target.value)}
                  placeholder="Briefly describe what this award was for..."
                  rows="2"
                  className={inpClass()}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => addItem("awards", emptyAward)}
          className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 font-bold flex items-center justify-center gap-2 hover:border-green-500/50 hover:text-green-600 transition-all active:scale-[0.99]"
        >
          <Plus size={18} /> Add Another Award
        </button>
      </div>
    </div>
  );
}
