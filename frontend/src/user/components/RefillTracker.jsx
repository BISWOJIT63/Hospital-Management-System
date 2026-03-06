import { RefreshCw } from "lucide-react";

const steps = [
  { number: 1, label: "Requested", completed: true },
  { number: 2, label: "Doctor Approved", completed: true },
  { number: 3, label: "Pharmacy Proc.", completed: false, current: true },
  { number: 4, label: "Ready", completed: false, current: false },
];

export default function RefillTracker() {
  return (
    <div className="glass-card p-6 rounded-xl border border-[#50df20]/20">
      <h4 className="font-bold flex items-center gap-2 mb-6 text-slate-900">
        <RefreshCw className="w-5 h-5 text-[#50df20]" />
        {"Refill Progress: Lisinopril"}
      </h4>
      <div className="relative flex items-center justify-between">
        <div className="absolute top-4 left-0 w-full h-1 bg-slate-200 z-0" />
        <div className="absolute top-4 left-0 w-2/3 h-1 bg-[#50df20] z-0" />
        {steps.map((step) => (
          <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={
                step.completed
                  ? "w-8 h-8 rounded-full bg-[#50df20] flex items-center justify-center text-white text-xs font-bold"
                  : step.current
                  ? "w-8 h-8 rounded-full bg-[#50df20]/20 border-2 border-[#50df20] flex items-center justify-center text-[#50df20] text-xs font-bold"
                  : "w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold"
              }
            >
              {step.number}
            </div>
            <span
              className={
                step.current
                  ? "text-xs font-bold text-[#50df20]"
                  : step.completed
                  ? "text-xs font-bold text-slate-900"
                  : "text-xs font-medium text-slate-500"
              }
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
