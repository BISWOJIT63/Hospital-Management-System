import React from "react";
import { Award } from "lucide-react";
import { Card, SectionHdr } from "../components/AdminUI";

export default function AwardsPanel({ fac }) {
  return (
    <Card>
      <SectionHdr
        icon={Award}
        title="Awards & Recognition"
        sub={`${fac.awards.length} achievements`}
      />
      <div className="flex flex-col gap-3">
        {fac.awards.map((a, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-2xl hover:border-green-300 dark:hover:border-green-500/40 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-lime-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-500/20">
              <Award size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-black text-green-900 dark:text-green-100">
                  {a.title}
                </h4>
                <span className="bg-green-200/50 dark:bg-green-500/30 text-green-700 dark:text-green-400 border border-green-300/50 dark:border-green-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {a.year}
                </span>
              </div>
              <p className="text-sm text-green-700/80 dark:text-green-200/60 leading-relaxed">
                {a.desc}
              </p>
            </div>
          </div>
        ))}
        {fac.awards.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
            No awards listed.
          </p>
        )}
      </div>
    </Card>
  );
}
