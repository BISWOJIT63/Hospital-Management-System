import React from "react";
import { List, Plus, Trash2, User, Award } from "lucide-react";
import { Field, ST, inpClass, addBtnClass } from "../components/UI";
import { emptyService, emptyDoctor, emptyAward } from "../constants";

export default function StepSvcDocs({ fd, updateArr, addItem, removeItem }) {
    return (
        <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-10">

            {}
            <section>
                <ST icon={List} title="Services & Pricing" sub="List key medical services with pricing" />
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-4">
                    <div className="grid grid-cols-[1fr_120px_40px] gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="block text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 m-0">Service Name</span>
                        <span className="block text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 m-0">Price</span>
                        <span />
                    </div>
                    <div className="space-y-3">
                        {fd.services.map((s, i) => (
                            <div key={i} className="grid grid-cols-[1fr_120px_40px] gap-3 items-center">
                                <input value={s.name} onChange={e => updateArr("services", i, "name", e.target.value)} placeholder="e.g. MRI Brain Scan" className={inpClass()} />
                                <input value={s.price} onChange={e => updateArr("services", i, "price", e.target.value)} placeholder="$500" className={inpClass()} />
                                {fd.services.length > 1 ? (
                                    <button onClick={() => removeItem("services", i)} className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                ) : <div />}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => addItem("services", emptyService)} className={addBtnClass}><Plus size={16} /> Add Service</button>
            </section>

            <hr className="border-slate-100 dark:border-slate-800" />

            {}
            <section>
                <ST icon={User} title="Key Doctors & Specialists" sub="Highlight your top medical professionals" />
                <div className="space-y-4 mb-4">
                    {fd.keyDoctors.map((doc, i) => (
                        <div key={i} className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/50 relative">
                            {fd.keyDoctors.length > 1 && (
                                <button onClick={() => removeItem("keyDoctors", i)} className="absolute top-4 right-4 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Doctor Name"><input value={doc.name} onChange={e => updateArr("keyDoctors", i, "name", e.target.value)} placeholder="Dr. Jane Smith" className={inpClass()} /></Field>
                                <Field label="Specialty"><input value={doc.specialty} onChange={e => updateArr("keyDoctors", i, "specialty", e.target.value)} placeholder="Cardiologist" className={inpClass()} /></Field>
                                <Field label="Experience"><input value={doc.experience} onChange={e => updateArr("keyDoctors", i, "experience", e.target.value)} placeholder="15+ years" className={inpClass()} /></Field>
                                <Field label="Availability"><input value={doc.availability} onChange={e => updateArr("keyDoctors", i, "availability", e.target.value)} placeholder="Mon–Fri, 9AM–5PM" className={inpClass()} /></Field>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => addItem("keyDoctors", emptyDoctor)} className={addBtnClass}><Plus size={16} /> Add Doctor</button>
            </section>

            <hr className="border-slate-100 dark:border-slate-800" />

            {}
            <section>
                <ST icon={Award} title="Awards & Recognition" sub="Accolades received by your facility" />
                <div className="space-y-3 mb-4">
                    {fd.awards.map((aw, i) => (
                        <div key={i} className="grid grid-cols-[2fr_100px_3fr_40px] gap-3 items-end bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <Field label={i === 0 ? "Award Title" : ""}><input value={aw.title} onChange={e => updateArr("awards", i, "title", e.target.value)} placeholder="Best Hospital" className={inpClass()} /></Field>
                            <Field label={i === 0 ? "Year" : ""}><input value={aw.year} onChange={e => updateArr("awards", i, "year", e.target.value)} placeholder="2024" className={inpClass()} /></Field>
                            <Field label={i === 0 ? "Description" : ""}><input value={aw.desc} onChange={e => updateArr("awards", i, "desc", e.target.value)} placeholder="Awarded by..." className={inpClass()} /></Field>
                            {fd.awards.length > 1 ? (
                                <button onClick={() => removeItem("awards", i)} className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            ) : <div />}
                        </div>
                    ))}
                </div>
                <button onClick={() => addItem("awards", emptyAward)} className={addBtnClass}><Plus size={16} /> Add Award</button>
            </section>

        </div>
    );
}
