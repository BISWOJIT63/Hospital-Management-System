import React from "react";
import { User, Building2, LayoutGrid, Stethoscope } from "lucide-react";
import StepHeader from "./StepHeader";

export default function StepBookingEntry({ onSelect }) {
  const options = [
    {
      id: "doctor",
      label: "Doctor / Specialist",
      icon: User,
      desc: "Book a consultation with our experts",
      color: "emerald",
    },
    {
      id: "service",
      label: "Medical Service",
      icon: Stethoscope,
      desc: "Book specific tests or treatments",
      color: "green",
    },
    {
      id: "hospital",
      label: "Hospital",
      icon: Building2,
      desc: "Find and book at top hospitals",
      color: "indigo",
    },
    {
      id: "clinic",
      label: "Clinic",
      icon: LayoutGrid,
      desc: "Schedule a visit to local clinics",
      color: "teal",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader
        title="What would you like to book?"
        subtitle="Select the type of appointment entry to begin your journey."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-900/10 transition-all group"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all`}
              >
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {opt.label}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
