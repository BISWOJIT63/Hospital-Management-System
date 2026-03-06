import React from "react";
import { Icon, ic } from "../icons";

export default function Reviews({
    reviews,
    avgRating,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    sentReplies,
    setSentReplies,
    showNotif,
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-center transition-colors shadow-sm">
                    <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon
                            path={ic.star}
                            size={28}
                            className="text-amber-500 dark:text-amber-400"
                        />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-1">
                        {avgRating} <span className="text-xl text-slate-400 dark:text-slate-500">/ 5</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Based on {reviews.length} reviews
                    </p>
                    <div className="flex justify-center gap-1 text-amber-500 dark:text-amber-400 text-xl">
                        ★★★★★
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">
                        Rating Distribution
                    </h3>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((s) => {
                            const count = reviews.filter((r) => r.rating === s).length;
                            const pct = (count / reviews.length) * 100 || 0;
                            return (
                                <div key={s} className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-12 shrink-0">
                                        {s} Star
                                    </span>
                                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 dark:bg-amber-400 rounded-full"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 w-6 text-right shrink-0">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="col-span-1 lg:col-span-2 space-y-4">
                {reviews.map((r) => (
                    <div
                        key={r.id}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm shrink-0">
                                    {r.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white leading-tight">
                                        {r.patient}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {r.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex text-amber-500 dark:text-amber-400 text-sm tracking-widest shrink-0">
                                {"★".repeat(r.rating)}
                                <span className="text-slate-200 dark:text-slate-700">
                                    {"★".repeat(5 - r.rating)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            "{r.text}"
                        </p>
                        {sentReplies[r.id] ? (
                            <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex gap-2 transition-colors">
                                <Icon
                                    path={ic.reply}
                                    size={14}
                                    className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Your Reply
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        {sentReplies[r.id]}
                                    </p>
                                </div>
                            </div>
                        ) : replyingTo === r.id ? (
                            <div className="mt-4">
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white resize-none transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                                    rows={2}
                                    placeholder="Write a public reply…"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    autoFocus
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setReplyingTo(null);
                                            setReplyText("");
                                        }}
                                        className="px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!replyText.trim()) return;
                                            setSentReplies((s) => ({ ...s, [r.id]: replyText }));
                                            setReplyingTo(null);
                                            setReplyText("");
                                            showNotif("Reply posted");
                                        }}
                                        className="px-4 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 shadow-sm"
                                    >
                                        Post Reply
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setReplyingTo(r.id)}
                                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                                <Icon path={ic.reply} size={13} />
                                Reply Publicly
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
