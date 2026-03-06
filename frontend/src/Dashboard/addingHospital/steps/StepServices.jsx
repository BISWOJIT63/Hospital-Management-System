import React, { useState, useRef } from "react";
import {
    Plus, Trash2, Upload, X, ChevronDown, ChevronUp, SkipForward, Stethoscope
} from "lucide-react";
import { SERVICE_CATEGORIES, emptyServiceEntry } from "../constants";

export default function StepServices({ servicesList, setServicesList }) {
    const [expanded, setExpanded] = useState(0);
    const fileRefs = useRef([]);

    const addService = () => {
        setServicesList((prev) => [...prev, emptyServiceEntry()]);
        setExpanded(servicesList.length);
    };

    const removeService = (idx) => {
        setServicesList((prev) => prev.filter((_, i) => i !== idx));
        setExpanded(Math.max(0, expanded - 1));
    };

    const update = (idx, field, value) => {
        setServicesList((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: value };
            return next;
        });
    };

    const handleImage = (idx, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => update(idx, "image", ev.target.result);
        reader.readAsDataURL(file);
    };

    const updateIncludes = (sIdx, iIdx, value) => {
        setServicesList((prev) => {
            const next = [...prev];
            const inc = [...next[sIdx].includes];
            inc[iIdx] = value;
            next[sIdx] = { ...next[sIdx], includes: inc };
            return next;
        });
    };

    const addInclude = (sIdx) => {
        setServicesList((prev) => {
            const next = [...prev];
            next[sIdx] = { ...next[sIdx], includes: [...next[sIdx].includes, ""] };
            return next;
        });
    };

    const removeInclude = (sIdx, iIdx) => {
        setServicesList((prev) => {
            const next = [...prev];
            next[sIdx] = { ...next[sIdx], includes: next[sIdx].includes.filter((_, i) => i !== iIdx) };
            return next;
        });
    };

    const updateTreatment = (sIdx, tIdx, field, value) => {
        setServicesList((prev) => {
            const next = [...prev];
            const treatments = [...next[sIdx].treatments];
            treatments[tIdx] = { ...treatments[tIdx], [field]: value };
            next[sIdx] = { ...next[sIdx], treatments };
            return next;
        });
    };

    const addTreatment = (sIdx) => {
        setServicesList((prev) => {
            const next = [...prev];
            next[sIdx] = { ...next[sIdx], treatments: [...next[sIdx].treatments, { name: "", description: "" }] };
            return next;
        });
    };

    const removeTreatment = (sIdx, tIdx) => {
        setServicesList((prev) => {
            const next = [...prev];
            next[sIdx] = { ...next[sIdx], treatments: next[sIdx].treatments.filter((_, i) => i !== tIdx) };
            return next;
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 mb-4">
                    <Stethoscope className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Add Your Services</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                    Optionally add the medical services your facility offers. You can skip this step and add services later from your dashboard.
                </p>
                {servicesList.length === 0 && (
                    <div className="mt-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm font-medium">
                        No services added yet. Click below to add your first service.
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {servicesList.map((svc, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setExpanded(expanded === idx ? -1 : idx)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-slate-700 dark:text-slate-200"
                        >
                            <span>{svc.name || `Service #${idx + 1}`}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeService(idx); }}
                                    className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {expanded === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                        </button>

                        {expanded === idx && (
                            <div className="px-5 pb-6 space-y-5 border-t border-slate-200 dark:border-slate-700 pt-5">
                                {/* Image upload */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Service Image</label>
                                    <div
                                        className="relative h-36 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden cursor-pointer hover:border-green-400 transition-colors flex items-center justify-center bg-white dark:bg-slate-900"
                                        onClick={() => fileRefs.current[idx]?.click()}
                                    >
                                        {svc.image ? (
                                            <>
                                                <img src={svc.image} alt="service" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); update(idx, "image", ""); }}
                                                    className="absolute top-2 right-2 bg-white/80 dark:bg-slate-800/80 rounded-full p-1"
                                                >
                                                    <X className="w-4 h-4 text-slate-600" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center text-slate-400">
                                                <Upload className="w-6 h-6 mx-auto mb-1" />
                                                <p className="text-xs font-medium">Upload Service Image</p>
                                            </div>
                                        )}
                                        <input
                                            ref={(el) => (fileRefs.current[idx] = el)}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImage(idx, e)}
                                        />
                                    </div>
                                </div>

                                {/* Core fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Service Name *</label>
                                        <input
                                            value={svc.name}
                                            onChange={(e) => update(idx, "name", e.target.value)}
                                            placeholder="e.g. Full Body Checkup"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Category</label>
                                        <select
                                            value={svc.category}
                                            onChange={(e) => update(idx, "category", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none"
                                        >
                                            {SERVICE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Price</label>
                                        <input
                                            value={svc.price}
                                            onChange={(e) => update(idx, "price", e.target.value)}
                                            placeholder="e.g. $199 or From $150"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Duration</label>
                                        <input
                                            value={svc.duration}
                                            onChange={(e) => update(idx, "duration", e.target.value)}
                                            placeholder="e.g. 2-3 Hours"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Description</label>
                                        <textarea
                                            value={svc.description}
                                            onChange={(e) => update(idx, "description", e.target.value)}
                                            rows={3}
                                            placeholder="Describe this service in detail..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Includes bullets */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">What's Included</label>
                                    <div className="space-y-2">
                                        {svc.includes.map((inc, iIdx) => (
                                            <div key={iIdx} className="flex gap-2">
                                                <input
                                                    value={inc}
                                                    onChange={(e) => updateIncludes(idx, iIdx, e.target.value)}
                                                    placeholder={`Benefit ${iIdx + 1}`}
                                                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                />
                                                <button type="button" onClick={() => removeInclude(idx, iIdx)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addInclude(idx)} className="flex items-center gap-1 text-green-600 text-sm font-bold hover:underline">
                                            <Plus className="w-4 h-4" /> Add benefit
                                        </button>
                                    </div>
                                </div>

                                {/* Treatments */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Treatments / Procedures</label>
                                    <div className="space-y-3">
                                        {svc.treatments.map((t, tIdx) => (
                                            <div key={tIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 space-y-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        value={t.name}
                                                        onChange={(e) => updateTreatment(idx, tIdx, "name", e.target.value)}
                                                        placeholder="Treatment name"
                                                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                    />
                                                    <button type="button" onClick={() => removeTreatment(idx, tIdx)} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <input
                                                    value={t.description}
                                                    onChange={(e) => updateTreatment(idx, tIdx, "description", e.target.value)}
                                                    placeholder="Short description"
                                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addTreatment(idx)} className="flex items-center gap-1 text-green-600 text-sm font-bold hover:underline">
                                            <Plus className="w-4 h-4" /> Add treatment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={addService}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
            >
                <Plus className="w-5 h-5" /> Add Another Service
            </button>

            <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <SkipForward className="w-3.5 h-3.5" /> You can skip this step — services can be added later from your Admin Dashboard.
            </p>
        </div>
    );
}
