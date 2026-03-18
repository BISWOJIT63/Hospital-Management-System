import React from "react";
import { Icon, ic } from "../icons";
import { AlertTriangle, RefreshCcw, Mail, Phone, HelpCircle } from "lucide-react";

export default function RejectedScreen({ doctorData, onRetry }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors selection:bg-red-500/30">
            <div className="max-w-2xl w-full">

                {/* Status badge */}
                <div className="flex justify-center mb-8">
                    <div className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg shadow-red-500/10">
                        <AlertTriangle size={14} className="shrink-0" />
                        <span className="text-sm font-black uppercase tracking-widest">
                            Application Rejected
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">

                    {/* Header */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-10 pb-12 border-b border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
                            style={{
                                backgroundImage:
                                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            }}
                        />
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-500/20 dark:to-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <Icon path={ic.cross} size={40} className="text-red-600 dark:text-red-400" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-3">
                                Verification Failed
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                                Unfortunately, the profile submitted by{" "}
                                <strong className="text-slate-700 dark:text-slate-200">
                                    {doctorData?.name || doctorData?.profile?.name || "you"}
                                </strong>{" "}
                                was rejected by the administration team.
                            </p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 pb-10">
                        <div className="max-w-md mx-auto space-y-6">

                            {/* What happened */}
                            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-5">
                                <h3 className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider mb-2">
                                    What this means
                                </h3>
                                <ul className="space-y-1.5 text-sm text-red-600/80 dark:text-red-300/80">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5 shrink-0">•</span>
                                        Your credentials or submitted details did not pass our review.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5 shrink-0">•</span>
                                        You can correct the details and resubmit your application.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5 shrink-0">•</span>
                                        Your previous information has been saved for reference.
                                    </li>
                                </ul>
                            </div>

                            {/* Resubmit CTA */}
                            <button
                                onClick={onRetry}
                                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/30 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
                            >
                                <RefreshCcw size={16} />
                                Resubmit Application
                            </button>
                        </div>

                        {/* Support */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                            <div className="relative group inline-block">
                                <button className="px-6 py-2.5 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm">
                                    <HelpCircle size={16} className="mt-px" /> Contact Support
                                </button>
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-2 bg-slate-800 dark:bg-slate-700 text-white text-sm rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Mail size={13} /> aether@care.com
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={13} /> +91 1234567890
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800 dark:border-t-slate-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
