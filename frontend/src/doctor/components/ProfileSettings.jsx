import React from "react";
import { Icon, ic } from "../icons";
import { api } from "../../utils/api";
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
                        className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white mt-0.5 transition-colors w-full min-w-[120px]"
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
    showNotif,
    setDoctorData,
    services = [],
    setActiveTab
}) {
    const fileInputRef = React.useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditData((prev) => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.submitDoctorRegistration(editData, token);
            if (response.success) {
                setDoctorData(response.data);
                showNotif("Profile updated successfully", "success");
                setEditMode(false);
            } else {
                showNotif(response.message || "Update failed", "warning");
            }
        } catch (err) {
            console.error(err);
            showNotif(err.message || "Failed to save profile", "warning");
        }
    };

    return (
        <div className="max-w-4xl md:max-w-3xl space-y-5 mx-auto">
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
                                handleSave();
                            } else {
                                setEditMode(true);
                            }
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
                    <div className="relative group/pic">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-3xl shrink-0 shadow-sm border border-slate-100 dark:border-slate-800">
                            {(editMode ? editData?.profilePic : doctorData?.profilePic) ? (
                                <img
                                    src={editMode ? editData.profilePic : doctorData.profilePic}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            ) : (
                                doctorData?.name?.[0] || "D"
                            )}
                        </div>
                        {editMode && (
                            <>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover/pic:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-2xl gap-1"
                                >
                                    <Icon path={ic.upload} size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Upload</span>
                                </button>
                            </>
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
                            ["city", "City"],
                            ["location", "Location / Address"],
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
                {/* Unified Medical Services & Treatments Section - Source of Truth: Services Tab */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <SectionHead 
                            icon={<Icon path={ic.upload} size={18} />} 
                            label="Medical Services & Treatments" 
                        />
                        <button
                            onClick={() => setActiveTab && setActiveTab("services")}
                            className="text-xs font-bold text-green-600 dark:text-green-500 hover:text-green-700 uppercase tracking-wider flex items-center gap-1.5"
                        >
                            <Icon path={ic.edit} size={12} />
                            Manage Services
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {services.length > 0 ? (
                            services.map((s, i) => (
                                <div 
                                    key={s._id || i}
                                    className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex gap-4"
                                >
                                    <div className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden">
                                        {s.image ? (
                                            <img src={s.image} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <Bandage size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate uppercase tracking-tight">
                                                {s.name}
                                            </p>
                                            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                                                {s.price && s.price.includes("₹") ? s.price : `₹${s.price || "0"}`}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                                            {s.category}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed h-8">
                                            {s.description || "No description provided."}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {s.duration && (
                                                <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                    <Clock size={10} /> {s.duration}
                                                </span>
                                            )}
                                            {s.includes && s.includes.length > 0 && s.includes[0] && (
                                                <span className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                    <Bandage size={10} /> {s.includes.length} Highlights
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-xs text-slate-400 dark:text-slate-500 italic mb-3">
                                    No services or treatments added yet.
                                </p>
                                <button
                                    onClick={() => setActiveTab && setActiveTab("services")}
                                    className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-green-100 transition-colors"
                                >
                                    + Add your first service
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <SectionHead
                            icon={<User/>}
                            label="Specialists / Team"
                            jsonKey="specialists"
                        />
                        {editMode && (
                            <button
                                onClick={() => setEditData(d => ({
                                    ...d,
                                    specialists: [...(d.specialists || []), { name: "", specialty: "", experience: "", availability: "" }]
                                }))}
                                className="text-xs font-bold text-green-600 dark:text-green-500 hover:text-green-700 uppercase tracking-wider"
                            >
                                + Add Specialist
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {(editMode ? editData?.specialists : doctorData?.specialists || [])
                            .map((sp, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-colors group relative"
                                >
                                    {editMode && (
                                        <button
                                            onClick={() => setEditData(d => ({
                                                ...d,
                                                specialists: d.specialists.filter((_, idx) => idx !== i)
                                            }))}
                                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Icon path={ic.close} size={14} />
                                        </button>
                                    )}
                                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-lg shrink-0 shadow-sm">
                                        {sp.name?.[0] || "?"}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        {editMode ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-green-500"
                                                    value={sp.name}
                                                    placeholder="Specialist Name"
                                                    onChange={(e) => setEditData(d => {
                                                        const newS = [...d.specialists];
                                                        newS[i] = { ...newS[i], name: e.target.value };
                                                        return { ...d, specialists: newS };
                                                    })}
                                                />
                                                <input
                                                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 focus:outline-none focus:border-green-500"
                                                    value={sp.specialty}
                                                    placeholder="Specialty"
                                                    onChange={(e) => setEditData(d => {
                                                        const newS = [...d.specialists];
                                                        newS[i] = { ...newS[i], specialty: e.target.value };
                                                        return { ...d, specialists: newS };
                                                    })}
                                                />
                                                <input
                                                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 focus:outline-none focus:border-green-500"
                                                    value={sp.experience}
                                                    placeholder="Experience (e.g. 5 Years)"
                                                    onChange={(e) => setEditData(d => {
                                                        const newS = [...d.specialists];
                                                        newS[i] = { ...newS[i], experience: e.target.value };
                                                        return { ...d, specialists: newS };
                                                    })}
                                                />
                                                <input
                                                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 text-xs text-green-600 dark:text-green-500 font-medium focus:outline-none focus:border-green-500"
                                                    value={sp.availability}
                                                    placeholder="Availability (e.g. Mon-Fri)"
                                                    onChange={(e) => setEditData(d => {
                                                        const newS = [...d.specialists];
                                                        newS[i] = { ...newS[i], availability: e.target.value };
                                                        return { ...d, specialists: newS };
                                                    })}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                                    {sp.name}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                    {sp.specialty || "—"} · {sp.experience || "—"}
                                                </p>
                                                <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-1">
                                                    {sp.availability || "—"}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        {!(editMode ? editData?.specialists : doctorData?.specialists || []).length && (
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
                    <div className="flex items-center justify-between mb-4">
                        <SectionHead icon={<IndianRupee size={18}/>} label="Pricing Packages" jsonKey="pricing" />
                        {editMode && (
                            <button
                                onClick={() => setEditData(d => ({
                                    ...d,
                                    pricing: [...(d.pricing || []), { package: "", price: "", includes: [""] }]
                                }))}
                                className="text-xs font-bold text-green-600 dark:text-green-500 hover:text-green-700 uppercase tracking-wider"
                            >
                                + Add Package
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {(editMode ? editData?.pricing : doctorData?.pricing || []).map((p, i) => (
                            <div
                                key={i}
                                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 transition-colors relative overflow-hidden group"
                            >
                                {editMode && (
                                    <button
                                        onClick={() => setEditData(d => ({
                                            ...d,
                                            pricing: d.pricing.filter((_, idx) => idx !== i)
                                        }))}
                                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                    >
                                        <Icon path={ic.close} size={14} />
                                    </button>
                                )}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 transform rotate-45 translate-x-8 -translate-y-8" />
                                <div className="flex items-start justify-between mb-3 relative z-10 gap-4">
                                    {editMode ? (
                                        <>
                                            <input
                                                className="flex-1 bg-transparent border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-base focus:outline-none focus:border-green-500"
                                                value={p.package}
                                                placeholder="Package Name"
                                                onChange={(e) => setEditData(d => {
                                                    const newP = [...d.pricing];
                                                    newP[i] = { ...newP[i], package: e.target.value };
                                                    return { ...d, pricing: newP };
                                                })}
                                            />
                                            <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">
                                                <span className="text-green-600 dark:text-green-400 font-bold">₹</span>
                                                <input
                                                    className="w-16 bg-transparent text-green-600 dark:text-green-400 font-bold text-lg focus:outline-none ml-1"
                                                    value={p.price}
                                                    placeholder="0"
                                                    onChange={(e) => setEditData(d => {
                                                        const newP = [...d.pricing];
                                                        newP[i] = { ...newP[i], price: e.target.value };
                                                        return { ...d, pricing: newP };
                                                    })}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-bold text-slate-800 dark:text-white text-base">
                                                {p.package || "—"}
                                            </p>
                                            <span className="text-green-600 dark:text-green-400 font-bold text-lg bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">
                                                ₹{p.price || "0"}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <ul className="space-y-2 relative z-10">
                                    {(p.includes || []).map((inc, j) => (
                                        <li
                                            key={j}
                                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 group/item"
                                        >
                                            <Icon
                                                path={ic.check}
                                                size={14}
                                                className="text-green-500 dark:text-green-400 shrink-0 mt-0.5"
                                            />
                                            {editMode ? (
                                                <div className="flex-1 flex gap-2">
                                                    <input
                                                        className="flex-1 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:outline-none focus:border-green-500"
                                                        value={inc}
                                                        placeholder="What's included?"
                                                        onChange={(e) => setEditData(d => {
                                                            const newP = [...d.pricing];
                                                            const newInc = [...newP[i].includes];
                                                            newInc[j] = e.target.value;
                                                            newP[i] = { ...newP[i], includes: newInc };
                                                            return { ...d, pricing: newP };
                                                        })}
                                                    />
                                                    <button
                                                        onClick={() => setEditData(d => {
                                                            const newP = [...d.pricing];
                                                            const newInc = newP[i].includes.filter((_, idx) => idx !== j);
                                                            newP[i] = { ...newP[i], includes: newInc };
                                                            return { ...d, pricing: newP };
                                                        })}
                                                        className="opacity-0 group-hover/item:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                                                    >
                                                        <Icon path={ic.close} size={10} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="leading-relaxed">{inc}</span>
                                            )}
                                        </li>
                                    ))}
                                    {editMode && (
                                        <button
                                            onClick={() => setEditData(d => {
                                                const newP = [...d.pricing];
                                                newP[i] = { ...newP[i], includes: [...newP[i].includes, ""] };
                                                return { ...d, pricing: newP };
                                            })}
                                            className="text-[10px] font-bold text-green-600 dark:text-green-500 hover:text-green-700 uppercase tracking-tight pl-6"
                                        >
                                            + Add Item
                                        </button>
                                    )}
                                </ul>
                            </div>
                        ))}
                        {!(editMode ? editData?.pricing : doctorData?.pricing || []).length && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                No pricing packages added yet
                            </p>
                        )}
                    </div>
                </div>

                {}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <SectionHead icon={<Clock/>} label="Business Hours" jsonKey="businessHours" />
                        {editMode && (
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Configure daily status</p>
                        )}
                    </div>
                    <div className="mt-4 space-y-2.5">
                        {(editMode ? editData?.businessHours : doctorData?.businessHours || []).map((bh, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100/50 dark:border-slate-700/50 transition-colors"
                            >
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-28">
                                    {bh.day}
                                </span>
                                {editMode ? (
                                    <input
                                        className="text-sm flex-1 text-center font-medium bg-transparent border-b border-dashed border-slate-200 dark:border-slate-700 focus:outline-none focus:border-green-500"
                                        value={bh.time}
                                        placeholder="e.g. 09:00 AM - 05:00 PM"
                                        onChange={(e) => setEditData(d => {
                                            const newBH = [...d.businessHours];
                                            newBH[i] = { ...newBH[i], time: e.target.value };
                                            return { ...d, businessHours: newBH };
                                        })}
                                    />
                                ) : (
                                    <span
                                        className={`text-sm flex-1 text-center font-medium ${bh.isOpen
                                                ? "text-slate-600 dark:text-slate-400"
                                                : "text-slate-400 dark:text-slate-500 italic"
                                            }`}
                                    >
                                        {bh.isOpen ? bh.time : "Closed"}
                                    </span>
                                )}
                                <div className="w-24 flex justify-end">
                                    <button
                                        type="button"
                                        disabled={!editMode}
                                        onClick={() => setEditData(d => {
                                            const newBH = [...d.businessHours];
                                            newBH[i] = { ...newBH[i], isOpen: !newBH[i].isOpen };
                                            return { ...d, businessHours: newBH };
                                        })}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${bh.isOpen
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 scale-100"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-60"
                                            } ${editMode ? "hover:scale-105 cursor-pointer" : "cursor-default"}`}
                                    >
                                        {bh.isOpen ? "Open" : "Closed"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
