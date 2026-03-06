import React from "react";
import { Clock } from "lucide-react";
import { Card, SectionHdr, Chip } from "../components/AdminUI";


export default function HoursPanel({ fac }) {
  return (
    <Card className="max-w-xl">
      <SectionHdr
        icon={Clock}
        title="Business Hours"
        sub="Operating schedule"
      />
      <div className="flex flex-col gap-2">
        {fac.businessHours.map((h) => (
          <div
            key={h.day}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${h.isOpen ? (h.highlight ? "bg-green-50/50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800") : "bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-700 border-dashed opacity-60"}`}
          >
            <p
              className={`w-28 text-sm font-bold flex items-center gap-2 ${h.isOpen ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
            >
              {h.day}
              {h.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              )}
            </p>
            {h.isOpen ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {h.time}
                </span>
                {h.highlight && <Chip label="Peak" color="green" />}
              </div>
            ) : (
              <span className="text-sm font-bold text-rose-500 dark:text-rose-400 mr-2">
                CLOSED
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
