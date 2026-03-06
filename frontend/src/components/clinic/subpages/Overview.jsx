import React from "react";
import { Info } from "lucide-react";

const Overview = ({ clinicData }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white transition-colors duration-300">
          <Info className="w-5 h-5 text-green-500 dark:text-green-400" />
          About the Clinic
        </h2>
        <p className="text-gray-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
          {clinicData.description}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center border border-transparent dark:border-green-800/30 transition-colors duration-300">
            <div className="text-green-600 dark:text-green-400 font-bold text-lg">
              15k+
            </div>
            <div className="text-gray-500 dark:text-slate-400 text-xs mt-1">
              Patients/Year
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-center border border-transparent dark:border-purple-800/30 transition-colors duration-300">
            <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">
              45+
            </div>
            <div className="text-gray-500 dark:text-slate-400 text-xs mt-1">
              Specialists
            </div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-center border border-transparent dark:border-orange-800/30 transition-colors duration-300">
            <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">
              24/7
            </div>
            <div className="text-gray-500 dark:text-slate-400 text-xs mt-1">
              Support
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center border border-transparent dark:border-green-800/30 transition-colors duration-300">
            <div className="text-green-600 dark:text-green-400 font-bold text-lg">
              99%
            </div>
            <div className="text-gray-500 dark:text-slate-400 text-xs mt-1">
              Success Rate
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
          Core Specialties
        </h2>
        <div className="flex flex-wrap gap-2">
          {clinicData.specialties.map((spec) => (
            <span
              key={spec}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-300 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all cursor-default shadow-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Overview;
