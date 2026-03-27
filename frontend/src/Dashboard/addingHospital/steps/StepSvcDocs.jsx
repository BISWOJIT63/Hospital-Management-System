import React, { useRef } from "react";
import { List, Plus, Trash2, User, Award, Camera, X } from "lucide-react";
import { Field, ST, inpClass, addBtnClass } from "../components/UI";
import { emptyService, emptyDoctor, emptyAward } from "../constants";
import { SPECIALTIES } from "../../../utils/constants";

export default function StepSvcDocs({ fd, updateArr, addItem, removeItem }) {
  const fileRefs = useRef({});

  const handleDocImage = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      updateArr("keyDoctors", idx, "image", ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-10">
      {}
      <section>
        <ST
          icon={List}
          title="Services & Pricing"
          sub="List key medical services with pricing"
        />
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-4">
          <div className="grid grid-cols-[1fr_120px_40px] gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 m-0">
              Service Name
            </span>
            <span className="block text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 m-0">
              Price
            </span>
            <span />
          </div>
          <div className="space-y-3">
            {fd.services.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_120px_40px] gap-3 items-center"
              >
                <input
                  value={s.name}
                  onChange={(e) =>
                    updateArr("services", i, "name", e.target.value)
                  }
                  placeholder="e.g. MRI Brain Scan"
                  className={inpClass()}
                />
                <input
                  value={s.price}
                  onChange={(e) =>
                    updateArr("services", i, "price", e.target.value)
                  }
                  placeholder="$500"
                  className={inpClass()}
                />
                {fd.services.length > 1 ? (
                  <button
                    onClick={() => removeItem("services", i)}
                    className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => addItem("services", emptyService)}
          className={addBtnClass}
        >
          <Plus size={16} /> Add Service
        </button>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {}
      <section>
        <ST
          icon={User}
          title="Key Doctors & Specialists"
          sub="Highlight your top medical professionals"
        />
        <div className="space-y-4 mb-4">
          {fd.keyDoctors.map((doc, i) => (
            <div
              key={i}
              className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-slate-50 dark:bg-slate-900/50 relative"
            >
              {fd.keyDoctors.length > 1 && (
                <button
                  onClick={() => removeItem("keyDoctors", i)}
                  className="absolute top-4 right-4 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6">
                {/* Aether Carecolumn */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2 text-center">
                    Doctor Photo
                  </label>
                  <div
                    onClick={() => fileRefs.current[i]?.click()}
                    className="w-full aspect-[4/5] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50/50 dark:hover:bg-green-500/5 transition-all overflow-hidden relative group bg-white dark:bg-slate-900"
                  >
                    {doc.image ? (
                      <>
                        <img
                          src={doc.image}
                          alt="doc"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white w-8 h-8" />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateArr("keyDoctors", i, "image", "");
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-800/90 rounded-full text-rose-500 shadow-sm z-10"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <Camera className="text-slate-300 dark:text-slate-700 w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Upload
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    ref={(el) => (fileRefs.current[i] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleDocImage(i, e)}
                  />
                  {!doc.image && (
                    <p className="text-rose-500 text-[9px] font-black uppercase text-center mt-2 animate-pulse">
                      PHOTO REQUIRED
                    </p>
                  )}
                </div>

                {/* Form column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Doctor Name" span>
                    <input
                      value={doc.name}
                      onChange={(e) =>
                        updateArr("keyDoctors", i, "name", e.target.value)
                      }
                      placeholder="Dr. Jane Smith"
                      className={inpClass()}
                    />
                  </Field>
                  <Field label="Specialty">
                    <select
                      value={doc.specialty}
                      onChange={(e) =>
                        updateArr("keyDoctors", i, "specialty", e.target.value)
                      }
                      className={inpClass()}
                    >
                      <option value="">Select Specialty</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Experience">
                    <select
                      value={doc.experience}
                      onChange={(e) =>
                        updateArr("keyDoctors", i, "experience", e.target.value)
                      }
                      className={inpClass()}
                    >
                      <option value="">Select Experience</option>
                      {[...Array(16)].map((_, idx) => (
                        <option key={idx} value={`${idx} years`}>
                          {idx} years
                        </option>
                      ))}
                      <option value="15+ years">15+ years</option>
                    </select>
                  </Field>
                  <Field label="Availability" span>
                    <div className="grid grid-cols-2 gap-3 group">
                      <select
                        value={doc.availability?.split(",")[0] || ""}
                        onChange={(e) => {
                          const timePart = doc.availability?.split(",")[1] || " 9AM–5PM";
                          updateArr("keyDoctors", i, "availability", `${e.target.value},${timePart}`);
                        }}
                        className={inpClass()}
                      >
                        <option value="">Select Days</option>
                        <option value="Mon–Fri">Mon–Fri</option>
                        <option value="Mon–Sat">Mon–Sat</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Appointment Basis">Appointment Basis</option>
                      </select>
                      <select
                        value={doc.availability?.split(",")[1]?.trim() || ""}
                        onChange={(e) => {
                          const dayPart = doc.availability?.split(",")[0] || "Mon–Fri";
                          updateArr("keyDoctors", i, "availability", `${dayPart}, ${e.target.value}`);
                        }}
                        className={inpClass()}
                      >
                        <option value="">Select Time</option>
                        <option value="9AM–5PM">9AM–5PM</option>
                        <option value="10AM–6PM">10AM–6PM</option>
                        <option value="9AM–7PM">9AM–7PM</option>
                        <option value="24/7">24/7</option>
                        <option value="Morning">Morning (8AM–1PM)</option>
                        <option value="Evening">Evening (4PM–9PM)</option>
                      </select>
                    </div>
                  </Field>

                  <div className="col-span-full mt-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">
                      Doctor Appointment Types & Pricing
                    </label>
                    <div className="space-y-2">
                      {doc.appointmentTypes?.map((at, atIdx) => (
                        <div key={atIdx} className="flex gap-2 items-center">
                          <select
                            value={at.name}
                            onChange={(e) => {
                              const nextAt = [...doc.appointmentTypes];
                              nextAt[atIdx].name = e.target.value;
                              updateArr(
                                "keyDoctors",
                                i,
                                "appointmentTypes",
                                nextAt,
                              );
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none focus:ring-1 focus:ring-green-500"
                          >
                            <option value="">Type (e.g. Online)</option>
                            <option value="Online">Online</option>
                            <option value="In-Clinic">In-Clinic</option>
                            <option value="Home Visit">Home Visit</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Emergency">Emergency</option>
                          </select>
                          <input
                            type="number"
                            value={at.price}
                            onChange={(e) => {
                              const nextAt = [...doc.appointmentTypes];
                              nextAt[atIdx].price = e.target.value;
                              updateArr(
                                "keyDoctors",
                                i,
                                "appointmentTypes",
                                nextAt,
                              );
                            }}
                            placeholder="Price"
                            className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-none"
                          />
                          {doc.appointmentTypes.length > 1 && (
                            <button
                              onClick={() => {
                                const nextAt = doc.appointmentTypes.filter(
                                  (_, idx) => idx !== atIdx,
                                );
                                updateArr(
                                  "keyDoctors",
                                  i,
                                  "appointmentTypes",
                                  nextAt,
                                );
                              }}
                              className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const nextAt = [
                            ...(doc.appointmentTypes || []),
                            { name: "", price: "" },
                          ];
                          updateArr(
                            "keyDoctors",
                            i,
                            "appointmentTypes",
                            nextAt,
                          );
                        }}
                        className="text-[10px] font-bold text-green-600 hover:underline"
                      >
                        + Add type
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => addItem("keyDoctors", emptyDoctor)}
          className={addBtnClass}
        >
          <Plus size={16} /> Add Doctor
        </button>
      </section>

      <hr className="border-slate-100 dark:border-slate-800" />

      {}
      <section>
        <ST
          icon={Award}
          title="Awards & Recognition"
          sub="Accolades received by your facility"
        />
        <div className="space-y-3 mb-4">
          {fd.awards.map((aw, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_100px_3fr_40px] gap-3 items-end bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <Field label={i === 0 ? "Award Title" : ""}>
                <input
                  value={aw.title}
                  onChange={(e) =>
                    updateArr("awards", i, "title", e.target.value)
                  }
                  placeholder="Best Hospital"
                  className={inpClass()}
                />
              </Field>
              <Field label={i === 0 ? "Year" : ""}>
                <input
                  value={aw.year}
                  onChange={(e) =>
                    updateArr("awards", i, "year", e.target.value)
                  }
                  placeholder="2024"
                  className={inpClass()}
                />
              </Field>
              <Field label={i === 0 ? "Description" : ""}>
                <input
                  value={aw.desc}
                  onChange={(e) =>
                    updateArr("awards", i, "desc", e.target.value)
                  }
                  placeholder="Awarded by..."
                  className={inpClass()}
                />
              </Field>
              {fd.awards.length > 1 ? (
                <button
                  onClick={() => removeItem("awards", i)}
                  className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-200 dark:hover:bg-rose-500/40 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => addItem("awards", emptyAward)}
          className={addBtnClass}
        >
          <Plus size={16} /> Add Award
        </button>
      </section>
    </div>
  );
}
