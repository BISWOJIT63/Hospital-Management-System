import React from "react";
import { Hospital, Stethoscope, ChevronRight } from "lucide-react";

export default function SelectTypeScreen({ user, onSelect }) {
  return (
    <div className="min-h-screen mt-10 bg-slate-50 dark:bg-[#080d1a] flex flex-col font-sans">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full animate-in slide-in-from-bottom-6 fade-in duration-500">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 border border-green-100 dark:border-green-500/20 uppercase">
              Welcome
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4 tracking-tight leading-tight">
              Register Your Facility
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              You can register one facility. Choose the type that best describes
              your operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
            {}
            <button
              onClick={() => onSelect("hospital")}
              className="group text-left bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-5 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 mb-6">
                <Hospital size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
                Hospital
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                Full-service inpatient facility with multiple departments,
                emergency care, ICU & surgical suites.
              </p>
              <div className="text-green-600 dark:text-green-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Register as Hospital <ChevronRight size={16} />
              </div>
            </button>

            {}
            <button
              onClick={() => onSelect("clinic")}
              className="group text-left bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/10 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 opacity-5 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 mb-6">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
                Clinic
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                Outpatient or speciality care center offering consultations,
                diagnostics & follow-up services.
              </p>
              <div className="text-teal-600 dark:text-teal-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Register as Clinic <ChevronRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
