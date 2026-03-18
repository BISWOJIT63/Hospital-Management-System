import React from "react";
import { Layers, Stethoscope } from "lucide-react";
import { Card, SectionHdr, StatCard } from "../components/AdminUI";

export default function DeptsPanel({ fac }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Layers}
          label="Total Departments"
          value={fac.departments.length}
          sub="Active departments"
          color="green"
        />
        <StatCard
          icon={Stethoscope}
          label="Specialties"
          value={fac.departments.reduce(
            (a, b) => a + (b.specialties || "").split(",").filter(Boolean).length,
            0,
          )}
          sub="Across all depts"
          color="teal"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fac.departments.map((d, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-base font-black text-slate-800 dark:text-slate-200">
                  {d.name}
                </h4>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-2">
                  Head: {d.head}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 border border-green-100 dark:border-green-500/20">
                <Layers
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              {d.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              {(d.specialties || "").split(",").filter(Boolean).map((s) => (
                <span
                  key={s}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md"
                >
                  {s.trim()}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
