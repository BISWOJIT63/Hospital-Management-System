import React from "react";
import { Icon, ic } from "../icons";

export default function PendingScreen({ doctorData, onApproved }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-10 text-center">
                    <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon path={ic.clock} size={36} className="text-amber-500 dark:text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                        Profile Under Review
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                        Your profile has been submitted. Our admin team will review your
                        credentials within 24–48 hours.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6 text-left space-y-2">
                        {[
                            ["Profile submitted", "green"],
                            ["Admin verification pending", "amber"],
                            ["Dashboard access granted", "slate"],
                        ].map(([label, c], i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${c === "green"
                                            ? "bg-green-100 dark:bg-green-900/30"
                                            : c === "amber"
                                                ? "bg-amber-100 dark:bg-amber-900/30"
                                                : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                >
                                    <Icon
                                        path={c === "amber" ? ic.clock : ic.check}
                                        size={12}
                                        className={
                                            c === "green"
                                                ? "text-green-600 dark:text-green-400"
                                                : c === "amber"
                                                    ? "text-amber-500 dark:text-amber-400"
                                                    : "text-slate-400 dark:text-slate-500"
                                        }
                                    />
                                </div>
                                <span
                                    className={`text-sm ${c === "slate"
                                            ? "text-slate-400 dark:text-slate-500"
                                            : "text-slate-600 dark:text-slate-300"
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                        Confirmation sent to <strong className="dark:text-slate-300">{doctorData?.email || "your email"}</strong>
                    </p>
                    <button
                        onClick={onApproved}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all text-sm"
                    >
                        Simulate Admin Approval → Enter Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
