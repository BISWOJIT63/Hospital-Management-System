import React from "react";
import { Icon, ic } from "../icons";

export default function Patients({
    patients,
    ptFilter,
    setPtFilter,
    approvePatient,
    rejectPatient,
    startCheckup,
    setActivePtId,
    setCommMode,
    setActiveTab,
}) {
    const filteredPatients =
        ptFilter === "all"
            ? patients
            : patients.filter((p) => p.status === ptFilter);

    const StatusBadge = ({ status }) => (
        <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${status === "approved"
                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                : status === "pending"
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    : status === "rejected"
                        ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
        >
            {status}
        </span>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
                {["all", "pending", "approved", "rejected"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setPtFilter(f)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${ptFilter === f
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)} (
                        {f === "all"
                            ? patients.length
                            : patients.filter((p) => p.status === f).length}
                        )
                    </button>
                ))}
            </div>
            <div className="space-y-3">
                {filteredPatients.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 transition-colors shadow-sm"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold shrink-0">
                                    {p.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-slate-800 dark:text-white">
                                            {p.name}
                                        </p>
                                        <StatusBadge status={p.status} />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {p.condition} · Age {p.age} · {p.date}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {p.email} · {p.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end shrink-0">
                                {p.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => approvePatient(p.id)}
                                            className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-green-700 transition-all shadow-sm"
                                        >
                                            <Icon path={ic.check} size={12} />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectPatient(p.id)}
                                            className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 border border-transparent dark:border-red-800/30 transition-all"
                                        >
                                            <Icon path={ic.x} size={12} />
                                            Reject
                                        </button>
                                    </>
                                )}
                                {p.status === "approved" && (
                                    <>
                                        <button
                                            onClick={() => startCheckup(p)}
                                            className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 border border-transparent dark:border-green-800/30 transition-all"
                                        >
                                            <Icon path={ic.activity} size={12} />
                                            Checkup
                                        </button>
                                        <button
                                            onClick={() => {
                                                setActivePtId(p.id);
                                                setCommMode("chat");
                                                setActiveTab("comms");
                                            }}
                                            className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 transition-all"
                                        >
                                            <Icon path={ic.chat} size={12} />
                                            Message
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredPatients.length === 0 && (
                    <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
                        No patients found matching the selected filter.
                    </div>
                )}
            </div>
        </div>
    );
}
