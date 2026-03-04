import React from "react";
import { Shield, Trash2, Plus, Check } from "lucide-react";
import { Field, ST, inpClass, PillBtn, addBtnClass } from "../components/UI";
import { DEPT_SUGGESTIONS, INSURANCES_LIST, emptyDept } from "../constants";

export default function StepDepts({
  fd,
  updateArr,
  addItem,
  removeItem,
  toggleArr,
}) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
      <ST
        icon={Shield}
        title="Departments"
        sub="Add all departments available at your facility"
      />

      <div className="mb-6">
        <label className="block text-[11px] font-bold tracking-widest uppercase mb-2 text-slate-500 dark:text-slate-400">
          Quick-add department
        </label>
        <div className="flex flex-wrap gap-2">
          {DEPT_SUGGESTIONS.map((d) => (
            <button
              key={d}
              onClick={() =>
                addItem("departments", () => ({
                  name: d,
                  head: "",
                  specialties: "",
                  description: "",
                }))
              }
              className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold hover:border-green-500 hover:text-green-600 dark:hover:border-green-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors"
            >
              + {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {fd.departments.map((dept, i) => (
          <div
            key={i}
            className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/50 relative group"
          >
            <div className="absolute top-4 right-4 flex gap-2 items-center">
              <span className="bg-green-100/50 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-md px-2 py-0.5 text-[10px] font-black tracking-widest uppercase shadow-sm">
                Dept {i + 1}
              </span>
              {fd.departments.length > 1 && (
                <button
                  onClick={() => removeItem("departments", i)}
                  className="bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Department Name">
                <input
                  value={dept.name}
                  onChange={(e) =>
                    updateArr("departments", i, "name", e.target.value)
                  }
                  placeholder="e.g. Cardiology"
                  className={inpClass()}
                />
              </Field>
              <Field label="Department Head">
                <input
                  value={dept.head}
                  onChange={(e) =>
                    updateArr("departments", i, "head", e.target.value)
                  }
                  placeholder="Dr. Full Name"
                  className={inpClass()}
                />
              </Field>
              <Field label="Specialties (comma separated)" span>
                <input
                  value={dept.specialties}
                  onChange={(e) =>
                    updateArr("departments", i, "specialties", e.target.value)
                  }
                  placeholder="Interventional Cardiology, Echocardiography"
                  className={inpClass()}
                />
              </Field>
              <Field label="Description" span>
                <textarea
                  value={dept.description}
                  onChange={(e) =>
                    updateArr("departments", i, "description", e.target.value)
                  }
                  rows={2}
                  placeholder="Brief overview of services in this department…"
                  className={`${inpClass()} resize-y`}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => addItem("departments", emptyDept)}
        className={addBtnClass}
      >
        <Plus size={16} /> Add Department
      </button>

      <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
        <ST
          icon={Shield}
          title="Accepted Insurance Plans"
          sub="Select all plans your facility accepts"
        />
        <div className="flex flex-wrap gap-2.5">
          {INSURANCES_LIST.map((ins) => (
            <PillBtn
              key={ins}
              active={fd.insurances.includes(ins)}
              label={ins}
              onClick={() => toggleArr("insurances", ins)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
