import React from "react";
import { Icon, ic } from "../icons";
import { Bandage, Clock, CloudCheck, IndianRupee, MessageCircle, Star, User, UsersRound } from "lucide-react";

function SectionHead({ icon, label, jsonKey }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h4 className="font-bold text-slate-800 dark:text-white">{label}</h4>
            {jsonKey && (
                <code className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-lg font-mono">
                    {jsonKey}
                </code>
            )}
        </div>
    );
}

function FieldRow({ label, value, editMode, onChange, big, inline }) {
    if (inline)
        return (
            <div className="inline-flex flex-col">
                <code className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                    {label}
                </code>
                {editMode ? (
                    <input
                        className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white mt-0.5 transition-colors"
                        value={value || ""}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                ) : (
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {value || "—"}
                    </span>
                )}
            </div>
        );
    return (
        <div>
            <code className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                {label}
            </code>
            {editMode ? (
                <input
                    className={`w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white mt-0.5 transition-colors ${big ? "text-lg font-bold" : "text-sm"
                        }`}
                    value={value || ""}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : (
                <p
                    className={`${big ? "text-lg font-bold" : "text-sm font-semibold"
                        } text-slate-800 dark:text-white`}
                >
                    {value || "—"}
                </p>
            )}
        </div>
    );
}

export default function ProfileSettings({
    doctorData,
    editMode,
    setEditMode,
    editData,
    setEditData,
    setDoctorData,
    showNotif,
}) {
    return (
        <div className="max-w-4xl md:max-w-3xl space-y-5 mx-auto">
            {}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                            Service Profile
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                            SERVICE object fields
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            if (editMode) {
                                setDoctorData(editData);
                                showNotif("Profile updated", "success");
                            }
                            setEditMode(!editMode);
                        }}
                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm ${editMode
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }`}
                    >
                        <Icon path={editMode ? ic.check : ic.edit} size={14} />
                        {editMode ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-3xl shrink-0 shadow-sm">
                        {doctorData?.profilePic ? (
                            <img
                                src={doctorData.profilePic}
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        ) : (
                            doctorData?.name?.[0] || "D"
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <FieldRow
                            label="name"
                            value={editData?.name}
                            editMode={editMode}
                            onChange={(v) => setEditData((d) => ({ ...d, name: v }))}
                            big
                        />
                        <div className="flex flex-wrap gap-5 mt-3">
                            <FieldRow
                                label="category"
                                value={editData?.category}
                                editMode={editMode}
                                onChange={(v) => setEditData((d) => ({ ...d, category: v }))}
                                inline
                            />
                            <FieldRow
                                label="specialty"
                                value={editData?.specialty}
                                editMode={editMode}
                                onChange={(v) => setEditData((d) => ({ ...d, specialty: v }))}
                                inline
                            />
                            <FieldRow
                                label="status"
                                value={editData?.status || "active"}
                                editMode={false}
                                inline
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-auto">
                        {[
                            ["rating",<Star size={16}/> ],
                            ["reviewsCount",<MessageCircle  size={16} />],
                            ["patientsTreated", <UsersRound size={16} />],
                            ["successRate", <CloudCheck size={16} />],
                        ].map(([k, emoji]) => (
                            <div
                                key={k}
                                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-center border border-slate-100 dark:border-slate-800 transition-colors"
                            >
                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                    {doctorData?.[k] || "—"}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider flex items-center justify-center gap-1">
                                    <span >{emoji}</span>{" "}
                                    <code className="font-mono bg-transparent">
                                        {k.slice(0, 4)}
                                    </code>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                        Personal Details
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            ["licenseNo", "License Number"],
                            ["experience", "Experience (yrs)"],
                            ["phone", "Phone"],
                            ["email", "Email"],
                            ["emergencyEmail", "Emergency Email"],
                            ["basePrice", "Base Price (₹)"],
                        ].map(([k, label]) => (
                            <div key={k}>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide flex items-center justify-between">
                                    {label}
                                    <code className="text-slate-300 dark:text-slate-600 normal-case font-mono text-[10px]">
                                        [{k}]
                                    </code>
                                </label>
                                {editMode ? (
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white transition-colors"
                                        value={editData?.[k] || ""}
                                        onChange={(e) =>
                                            setEditData((d) => ({
                                                ...d,
                                                [k]: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <p className="text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-800/50 rounded-xl px-3.5 py-2.5 transition-colors">
                                        {doctorData?.[k] || "—"}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide flex items-center justify-between">
                            About / Bio
                            <code className="text-slate-300 dark:text-slate-600 normal-case font-mono text-[10px]">
                                [about]
                            </code>
                        </label>
                        {editMode ? (
                            <textarea
                                rows={4}
                                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white resize-none transition-colors"
                                value={editData?.about || ""}
                                onChange={(e) =>
                                    setEditData((d) => ({ ...d, about: e.target.value }))
                                }
                            />
                        ) : (
                            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-800/50 rounded-xl px-3.5 py-3 leading-relaxed transition-colors">
                                {doctorData?.about || "—"}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <SectionHead icon={<Bandage />} label="Treatments" jsonKey="treatments" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {(doctorData?.treatments || [])
                            .filter((t) => t.name)
                            .map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-colors"
                                >
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                        {t.desc || "—"}
                                    </p>
                                </div>
                            ))}
                        {!(doctorData?.treatments || []).some((t) => t.name) && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic col-span-2">
                                No treatments added yet
                            </p>
                        )}
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <SectionHead
                        icon={<User/>}
                        label="Specialists / Team"
                        jsonKey="specialists"
                    />
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {(doctorData?.specialists || [])
                            .filter((s) => s.name)
                            .map((sp, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-lg shrink-0 shadow-sm">
                                        {sp.name?.[0] || "?"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                            {sp.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                            {sp.specialty || "—"} · {sp.experience || "—"}
                                        </p>
                                        <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                                            {sp.availability || "—"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {!(doctorData?.specialists || []).some((s) => s.name) && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                No specialists added yet
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <SectionHead icon={<IndianRupee size={18}/>} label="Pricing Packages" jsonKey="pricing" />
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {(doctorData?.pricing || []).map((p, i) => (
                            <div
                                key={i}
                                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 transform rotate-45 translate-x-8 -translate-y-8" />
                                <div className="flex items-start justify-between mb-3 relative z-10">
                                    <p className="font-bold text-slate-800 dark:text-white text-base">
                                        {p.package || "—"}
                                    </p>
                                    <span className="text-green-600 dark:text-green-400 font-bold text-lg bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">
                                        ₹{p.price || "0"}
                                    </span>
                                </div>
                                <ul className="space-y-2 relative z-10">
                                    {(p.includes || []).filter(Boolean).map((inc, j) => (
                                        <li
                                            key={j}
                                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                                        >
                                            <Icon
                                                path={ic.check}
                                                size={14}
                                                className="text-green-500 dark:text-green-400 shrink-0 mt-0.5"
                                            />
                                            <span className="leading-relaxed">{inc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {!(doctorData?.pricing || []).length && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                No pricing packages added yet
                            </p>
                        )}
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <SectionHead icon={<Clock/>} label="Business Hours" jsonKey="businessHours" />
                    <div className="mt-4 space-y-2.5">
                        {(doctorData?.businessHours || []).map((bh, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100/50 dark:border-slate-700/50 transition-colors"
                            >
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-28">
                                    {bh.day}
                                </span>
                                <span
                                    className={`text-sm flex-1 text-center font-medium ${bh.isOpen
                                            ? "text-slate-600 dark:text-slate-400"
                                            : "text-slate-400 dark:text-slate-500 italic"
                                        }`}
                                >
                                    {bh.isOpen ? bh.time : "Closed"}
                                </span>
                                <div className="w-20 flex justify-end">
                                    <div
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${bh.isOpen
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                            }`}
                                    >
                                        {bh.isOpen ? "Open" : "Closed"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
