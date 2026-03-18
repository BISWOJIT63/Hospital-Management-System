import React from "react";
import { Icon, ic } from "../icons";

export default function Billing({
    billing,
    billFilter,
    setBillFilter,
    billStatusOpen,
    setBillStatusOpen,
    setBilling,
    showNotif,
}) {
    const filteredBilling =
        billFilter === "all"
            ? billing
            : billing.filter((b) => b.status === billFilter);

    const StatusBadge = ({ status }) => (
        <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${status === "paid"
                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                : status === "pending"
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                }`}
        >
            {status}
        </span>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
                {["all", "paid", "pending", "overdue"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setBillFilter(f)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all ${billFilter === f
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)} (
                        {f === "all"
                            ? billing.length
                            : billing.filter((b) => b.status === f).length}
                        )
                    </button>
                ))}
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Invoice
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Patient
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Service / Pkg
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Date
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Amount
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-right">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBilling.map((b) => (
                                <tr
                                    key={b.id}
                                    className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                                >
                                    <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {b.id}
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                                        {b.patient}
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-slate-800 dark:text-slate-200">
                                            {b.service}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">
                                            {b.pkg}
                                        </p>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                                        {b.date}
                                    </td>
                                    <td className="p-4 text-sm font-bold text-slate-800 dark:text-white">
                                        ₹{b.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="relative inline-block text-left">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setBillStatusOpen(b.id === billStatusOpen ? null : b.id);
                                                }}
                                                className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                                            >
                                                <StatusBadge status={b.status} />
                                                <Icon
                                                    path="M6 9l6 6 6-6"
                                                    size={12}
                                                    className="text-slate-400 dark:text-slate-500"
                                                />
                                            </button>
                                            {billStatusOpen === b.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1">
                                                    {["paid", "pending", "overdue"].map((s) => (
                                                        <button
                                                            key={s}
                                                            onClick={() => {
                                                                updatePaymentStatus(b.id, s);
                                                                setBillStatusOpen(null);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 capitalize transition-colors"
                                                        >
                                                            Mark {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBilling.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm"
                                    >
                                        No invoices found matching the selected filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
