import React from "react";
import { Icon, ic } from "../icons";

export default function Checkup({
    checkupPt,
    setCheckupPt,
    checkupForm,
    setCheckupForm,
    endCheckup,
    setActiveTab,
}) {
    if (!checkupPt) return null;

    return (
        <div className="max-w-2xl">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-11 h-11 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold shrink-0">
                        {checkupPt.avatar}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 dark:text-white text-lg">
                            {checkupPt.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {checkupPt.condition} · Age {checkupPt.age}
                        </p>
                    </div>
                    <div className="ml-auto bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 border border-green-100 dark:border-green-800/30">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Active Checkup
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                        ["Blood Pressure", "bp", "120/80 mmHg"],
                        ["Pulse Rate", "pulse", "72 bpm"],
                        ["Temperature", "temp", "98.6°F"],
                        ["Weight", "weight", "70 kg"],
                    ].map(([label, key, ph]) => (
                        <div key={key}>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                {label}
                            </label>
                            <input
                                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white transition-colors"
                                placeholder={ph}
                                value={checkupForm[key] || ""}
                                onChange={(e) =>
                                    setCheckupForm((f) => ({
                                        ...f,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    ))}
                </div>
                {[
                    ["Diagnosis", "diagnosis", "Enter diagnosis…", 3],
                    [
                        "Prescription / Medication",
                        "prescription",
                        "Medications and dosage…",
                        3,
                    ],
                    ["Clinical Notes", "notes", "Additional observations…", 2],
                    ["Follow-up Date", "followUp", "e.g. 2026-03-20", 1],
                ].map(([label, key, ph, rows]) => (
                    <div key={key} className="mb-4">
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                            {label}
                        </label>
                        {rows > 1 ? (
                            <textarea
                                rows={rows}
                                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white resize-none transition-colors"
                                placeholder={ph}
                                value={checkupForm[key] || ""}
                                onChange={(e) =>
                                    setCheckupForm((f) => ({
                                        ...f,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <input
                                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white transition-colors"
                                placeholder={ph}
                                value={checkupForm[key] || ""}
                                onChange={(e) =>
                                    setCheckupForm((f) => ({
                                        ...f,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        )}
                    </div>
                ))}
                <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => {
                            setActiveTab("patients");
                            setCheckupPt(null);
                        }}
                        className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={endCheckup}
                        className="flex-1 bg-green-600 dark:bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 dark:hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Icon path={ic.check} size={15} />
                        End Checkup & Save
                    </button>
                </div>
            </div>
        </div>
    );
}
