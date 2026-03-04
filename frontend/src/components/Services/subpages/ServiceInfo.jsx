import React from "react";
import { ClipboardList, HeartPulse, BadgeDollarSign } from "lucide-react";

export const ServiceOverview = ({ about }) => {
    return (
        <section
            id="overview"
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm scroll-mt-28"
        >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-green-600 dark:text-green-500" /> Service Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                {about}
            </p>
        </section>
    );
};

export const ServiceTreatments = ({ treatments }) => {
    return (
        <section
            id="treatments"
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm scroll-mt-28"
        >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-green-600 dark:text-green-500" /> Key Procedures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treatments.map((treatment, idx) => (
                    <div
                        key={idx}
                        className="p-4 border border-slate-100 dark:border-slate-700/50 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex gap-4 items-start"
                    >
                        <div className="p-2 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg shrink-0">
                            {treatment.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                                {treatment.name}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {treatment.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const ServicePricing = ({ pricing }) => {
    return (
        <section
            id="pricing"
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm scroll-mt-28"
        >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BadgeDollarSign className="w-5 h-5 text-green-600 dark:text-green-500" /> Packages & Pricing
            </h2>
            <div className="space-y-4">
                {pricing.map((pkg, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 bg-white dark:bg-slate-800 shadow-sm hover:border-green-300 dark:hover:border-green-700 transition gap-4"
                    >
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{pkg.package}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {pkg.includes.map((item, i) => (
                                    <span
                                        key={i}
                                        className="text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
                                    >
                                        ✓ {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="sm:text-right shrink-0">
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                {pkg.price}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Base Price</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
