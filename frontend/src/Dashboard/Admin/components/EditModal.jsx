import React, { useState } from "react";
import {
  Edit,
  X,
  Info,
  Star,
  Phone,
  Clock,
  Layers,
  Stethoscope,
  DollarSign,
  CreditCard,
  Award,
  Camera,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  ChevronDown,
  Wrench,
  Activity,
} from "lucide-react";


const ALL_INSURANCES = [
  "Aetna",
  "BlueCross BlueShield",
  "Cigna",
  "Humana",
  "Medicare",
  "Medicaid",
  "UnitedHealthcare",
  "Kaiser Permanente",
  "Tricare",
  "Anthem",
];
const ALL_FACILITIES = [
  "ICU",
  "Emergency Room",
  "Operating Theatres",
  "MRI",
  "CT Scan",
  "X-Ray",
  "Blood Bank",
  "Pharmacy",
  "NICU",
  "Dialysis",
  "Cafeteria",
  "Parking",
  "Helipad",
  "Chapel",
  "Ambulance",
];
const ALL_ACCREDS = [
  "JCI",
  "NABH",
  "ISO 9001",
  "ACHC",
  "The Joint Commission",
  "DNV GL",
  "CARF",
  "AAAHC",
];
const TYPES_H = [
  "Multi-Specialty",
  "Teaching Hospital",
  "Trauma Center",
  "Cardiac Care",
  "Children's Hospital",
  "Oncology",
  "Rehabilitation",
  "Psychiatric",
];
const TYPES_C = [
  "General Practice",
  "Dental",
  "Dermatology",
  "Orthopedic",
  "Ophthalmology",
  "Pediatrics",
  "Obstetrics",
  "Physiotherapy",
];
const PRICE_RANGES = [
  "$ — Budget",
  "$$ — Moderate",
  "$$$ — Premium",
  "$$$$ — Luxury",
];

function EInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) {
  return (
    <div>
      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 block mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 focus:border-transparent transition px-4 py-2.5"
      />
    </div>
  );
}
function ETextarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 block mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 focus:border-transparent transition px-4 py-2.5 resize-y"
      />
    </div>
  );
}
function ESelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 px-4 py-2.5 appearance-none pr-8"
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
        />
      </div>
    </div>
  );
}
function EMultiPill({ label, options, selected, onChange }) {
  const safeSelected = Array.isArray(selected)
    ? selected
    : typeof selected === "string" && selected.trim() !== ""
      ? selected.split(",").map((s) => s.trim())
      : [];

  return (
    <div>
      <label className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500 block mb-1.5">
        {label}
      </label>
      {safeSelected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {safeSelected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 rounded-full px-3 py-0.5 text-xs font-semibold"
            >
              {s}
              <button
                onClick={() => onChange(safeSelected.filter((x) => x !== s))}
                className="hover:text-rose-500 dark:hover:text-rose-400"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
        {options
          .filter((o) => !safeSelected.includes(o))
          .map((o) => (
            <button
              key={o}
              onClick={() => onChange([...safeSelected, o])}
              className="text-xs border border-dashed border-slate-300 dark:border-slate-600 rounded-full px-3 py-1 text-slate-500 dark:text-slate-400 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 transition"
            >
              + {o}
            </button>
          ))}
        {options.every((o) => safeSelected.includes(o)) && (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">
            All selected ✓
          </p>
        )}
      </div>
    </div>
  );
}

export default function EditModal({ fac, onSave, onClose }) {
  const [tab, setTab] = useState("basic");
  const [d, setD] = useState(JSON.parse(JSON.stringify(fac)));
  const setF = (k, v) => setD((x) => ({ ...x, [k]: v }));
  const fileRef = { current: null };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "hours", label: "Hours", icon: Clock },
    { id: "dept", label: "Departments", icon: Layers },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "services", label: "Services", icon: DollarSign },
    { id: "insurance", label: "Insurance", icon: CreditCard },
    { id: "facilities", label: "Facilities", icon: Wrench },
    { id: "awards", label: "Awards", icon: Award },
    { id: "apptTypes", label: "Appt Types", icon: Activity },
    { id: "photos", label: "Photos", icon: Camera },
  ];

  const readFiles = (files) => {
    Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .forEach((file) => {
        const r = new FileReader();
        r.onload = (e) =>
          setD((x) => ({ ...x, images: [...x.images, e.target.result] }));
        r.readAsDataURL(file);
      });
  };

  const addListItem = (field, blank) =>
    setD((x) => ({ ...x, [field]: [...x[field], { ...blank }] }));
  const delListItem = (field, i) =>
    setD((x) => ({ ...x, [field]: x[field].filter((_, j) => j !== i) }));
  const setListItem = (field, i, patch) =>
    setD((x) => ({
      ...x,
      [field]: x[field].map((it, j) => (j === i ? { ...it, ...patch } : it)),
    }));

  return (
    <div
      className="fixed inset-0 df bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl my-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <div className="bg-gradient-to-r from-green-600 to-primary px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Edit size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-lg">
                Edit Facility Details
              </h2>
              <p className="text-green-200 text-xs">
                Changes apply immediately after saving
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-[520px] flex-col md:flex-row border-b border-slate-100 dark:border-slate-800">
          {}
          <nav className="md:w-44 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-100 dark:border-slate-800 p-3 shrink-0 flex flex-row overflow-x-auto md:flex-col gap-1 md:gap-0.5">
            {tabs.map(({ id, label, icon: Ico }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-shrink-0 md:w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${tab === id ? "bg-green-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200"}`}
              >
                <Ico size={13} />
                {label}
              </button>
            ))}
          </nav>

          {}
          <div className="flex-1 p-6 overflow-y-auto h-[520px]">
            {}
            {tab === "basic" && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <EInput
                    label="Facility Name"
                    value={d.name}
                    onChange={(v) => setF("name", v)}
                    placeholder="Hospital / Clinic name"
                    required
                  />
                  <ESelect
                    label="Type / Specialty"
                    value={d.type}
                    onChange={(v) => setF("type", v)}
                    options={d.facilityType === "hospital" ? TYPES_H : TYPES_C}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <EInput
                    label="Location / Address"
                    value={d.location}
                    onChange={(v) => setF("location", v)}
                    placeholder="Full address"
                  />
                  <EInput
                    label="Year Established"
                    value={d.established}
                    onChange={(v) => setF("established", v)}
                    placeholder="e.g. 1987"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <EInput
                    label="Total Beds"
                    value={d.beds}
                    onChange={(v) => setF("beds", v)}
                    placeholder="620"
                  />
                  <EInput
                    label="No. of Doctors"
                    value={d.doctors}
                    onChange={(v) => setF("doctors", v)}
                    placeholder="185"
                  />
                  <EInput
                    label="Annual Surgeries"
                    value={d.surgeries}
                    onChange={(v) => setF("surgeries", v)}
                    placeholder="8,400+"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ESelect
                    label="Price Range"
                    value={d.priceRange}
                    onChange={(v) => setF("priceRange", v)}
                    options={PRICE_RANGES}
                  />
                  <EInput
                    label="Primary Accreditation"
                    value={d.accreditation}
                    onChange={(v) => setF("accreditation", v)}
                    placeholder="JCI, NABH…"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Currently Accepting Patients
                  </span>
                  <button
                    onClick={() =>
                      setF("acceptingPatients", !d.acceptingPatients)
                    }
                    className="transition-transform hover:scale-105"
                  >
                    {d.acceptingPatients ? (
                      <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-full px-3 py-1 text-xs font-bold">
                        <Check size={11} />
                        Yes — Accepting
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-full px-3 py-1 text-xs font-bold">
                        <X size={11} />
                        No — Not Accepting
                      </div>
                    )}
                  </button>
                </div>
                <EMultiPill
                  label="Accreditations"
                  options={ALL_ACCREDS}
                  selected={d.accreditationsList}
                  onChange={(v) => setF("accreditationsList", v)}
                />
              </div>
            )}

            {}
            {tab === "about" && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  About & Description
                </h3>
                <ETextarea
                  label="About the Facility"
                  value={d.about}
                  onChange={(v) => setF("about", v)}
                  placeholder="Describe your facility's mission, history, specialties…"
                  rows={8}
                />
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {d.about.length} characters · Aim for 200–400 words
                </p>
              </div>
            )}

            {}
            {tab === "contact" && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  Contact Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <EInput
                    label="Main Phone"
                    value={d.phone}
                    onChange={(v) => setF("phone", v)}
                    placeholder="+1 (212) 555-0192"
                    type="tel"
                  />
                  <EInput
                    label="Emergency Line"
                    value={d.emergency}
                    onChange={(v) => setF("emergency", v)}
                    placeholder="+1 (212) 555-9911"
                    type="tel"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <EInput
                    label="Email Address"
                    value={d.email}
                    onChange={(v) => setF("email", v)}
                    placeholder="info@hospital.com"
                    type="email"
                  />
                  <EInput
                    label="Website"
                    value={d.website}
                    onChange={(v) => setF("website", v)}
                    placeholder="www.hospital.com"
                  />
                </div>
              </div>
            )}

            {}
            {tab === "hours" && (
              <div className="flex flex-col gap-3">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  Business Hours
                </h3>
                {d.businessHours.map((h, i) => (
                  <div
                    key={h.day}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${h.isOpen ? "bg-green-50/40 dark:bg-green-500/10 border-green-100 dark:border-green-500/20" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60"}`}
                  >
                    <p className="w-24 text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">
                      {h.day}
                    </p>
                    <button
                      onClick={() =>
                        setListItem("businessHours", i, { isOpen: !h.isOpen })
                      }
                      className={`shrink-0 w-12 h-6 rounded-full transition-all ${h.isOpen ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"} relative`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${h.isOpen ? "left-7" : "left-1"}`}
                      />
                    </button>
                    {h.isOpen ? (
                      <input
                        value={h.time}
                        onChange={(e) =>
                          setListItem("businessHours", i, {
                            time: e.target.value,
                          })
                        }
                        className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        placeholder="08:00–18:00"
                      />
                    ) : (
                      <span className="flex-1 text-sm text-slate-400 dark:text-slate-500 italic">
                        Closed
                      </span>
                    )}
                    <label className="flex items-center gap-1.5 shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!h.highlight}
                        onChange={(e) =>
                          setListItem("businessHours", i, {
                            highlight: e.target.checked,
                          })
                        }
                        className="w-3.5 h-3.5 accent-green-500"
                      />
                      <span className="text-xs text-green-600 dark:text-green-500 font-semibold">
                        Peak
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {}
            {tab === "dept" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Departments ({d.departments.length})
                  </h3>
                  <button
                    onClick={() =>
                      addListItem("departments", {
                        name: "",
                        head: "",
                        specialties: "",
                        description: "",
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    <Plus size={12} />
                    Add Dept
                  </button>
                </div>
                {d.departments.map((dep, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Dept #{i + 1}
                      </span>
                      <button
                        onClick={() => delListItem("departments", i)}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg p-1 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <EInput
                        label="Department Name"
                        value={dep.name}
                        onChange={(v) =>
                          setListItem("departments", i, { name: v })
                        }
                        placeholder="Cardiology"
                      />
                      <EInput
                        label="Head of Dept"
                        value={dep.head}
                        onChange={(v) =>
                          setListItem("departments", i, { head: v })
                        }
                        placeholder="Dr. Name"
                      />
                    </div>
                    <EInput
                      label="Specialties (comma-separated)"
                      value={dep.specialties}
                      onChange={(v) =>
                        setListItem("departments", i, { specialties: v })
                      }
                      placeholder="Specialty 1, Specialty 2…"
                    />
                    <div className="mt-3">
                      <ETextarea
                        label="Description"
                        value={dep.description}
                        onChange={(v) =>
                          setListItem("departments", i, { description: v })
                        }
                        placeholder="Brief overview…"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {}
            {tab === "doctors" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Key Doctors ({d.keyDoctors.length})
                  </h3>
                  <button
                    onClick={() =>
                      addListItem("keyDoctors", {
                        name: "",
                        specialty: "",
                        experience: "",
                        availability: "",
                        patients: 0,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    <Plus size={12} />
                    Add Doctor
                  </button>
                </div>
                {d.keyDoctors.map((doc, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Doctor #{i + 1}
                      </span>
                      <button
                        onClick={() => delListItem("keyDoctors", i)}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg p-1 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <EInput
                        label="Full Name"
                        value={doc.name}
                        onChange={(v) =>
                          setListItem("keyDoctors", i, { name: v })
                        }
                        placeholder="Dr. First Last"
                      />
                      <EInput
                        label="Specialty"
                        value={doc.specialty}
                        onChange={(v) =>
                          setListItem("keyDoctors", i, { specialty: v })
                        }
                        placeholder="Cardiologist"
                      />
                      <EInput
                        label="Experience"
                        value={doc.experience}
                        onChange={(v) =>
                          setListItem("keyDoctors", i, { experience: v })
                        }
                        placeholder="15 yrs"
                      />
                      <EInput
                        label="Availability"
                        value={doc.availability}
                        onChange={(v) =>
                          setListItem("keyDoctors", i, { availability: v })
                        }
                        placeholder="Mon–Fri 9–5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {}
            {tab === "services" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Services & Pricing ({d.services.length})
                  </h3>
                  <button
                    onClick={() =>
                      addListItem("services", { name: "", price: "" })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    <Plus size={12} />
                    Add Service
                  </button>
                </div>
                {d.services.map((sv, i) => (
                  <div key={i} className="flex items-end gap-3">
                    <div className="flex-1">
                      <EInput
                        label={`Service ${i + 1}`}
                        value={sv.name}
                        onChange={(v) =>
                          setListItem("services", i, { name: v })
                        }
                        placeholder="Service name"
                      />
                    </div>
                    <div className="w-36">
                      <EInput
                        label="Price"
                        value={sv.price}
                        onChange={(v) =>
                          setListItem("services", i, { price: v })
                        }
                        placeholder="$100–$500"
                      />
                    </div>
                    <button
                      onClick={() => delListItem("services", i)}
                      className="mb-0.5 w-9 h-10 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/30 transition shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {}
            {tab === "insurance" && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  Accepted Insurance Plans
                </h3>
                <EMultiPill
                  label="Select insurance plans"
                  options={ALL_INSURANCES}
                  selected={d.insurances}
                  onChange={(v) => setF("insurances", v)}
                />
              </div>
            )}

            {}
            {tab === "facilities" && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  Facilities & Amenities
                </h3>
                <EMultiPill
                  label="Available facilities"
                  options={ALL_FACILITIES}
                  selected={d.facilities}
                  onChange={(v) => setF("facilities", v)}
                />
              </div>
            )}

            {}
            {tab === "awards" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Awards & Recognition ({d.awards.length})
                  </h3>
                  <button
                    onClick={() =>
                      addListItem("awards", { title: "", year: "", desc: "" })
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    <Plus size={12} />
                    Add Award
                  </button>
                </div>
                {d.awards.map((a, i) => (
                  <div
                    key={i}
                    className="bg-green-50 dark:bg-green-500/10 rounded-2xl border border-green-100 dark:border-green-500/20 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-green-500 uppercase tracking-widest">
                        Award #{i + 1}
                      </span>
                      <button
                        onClick={() => delListItem("awards", i)}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg p-1 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="col-span-2">
                        <EInput
                          label="Award Title"
                          value={a.title}
                          onChange={(v) =>
                            setListItem("awards", i, { title: v })
                          }
                          placeholder="Best Hospital Award"
                        />
                      </div>
                      <EInput
                        label="Year"
                        value={a.year}
                        onChange={(v) => setListItem("awards", i, { year: v })}
                        placeholder="2024"
                      />
                    </div>
                    <ETextarea
                      label="Description"
                      value={a.desc}
                      onChange={(v) => setListItem("awards", i, { desc: v })}
                      placeholder="Award description…"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}
            {tab === "apptTypes" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Appointment Types & Pricing
                  </h3>
                  <button
                    onClick={() =>
                      setD((x) => ({
                        ...x,
                        appointmentTypes: [
                          ...(x.appointmentTypes || []),
                          { name: "", price: "" },
                        ],
                      }))
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    <Plus size={12} />
                    Add Type
                  </button>
                </div>
                <div className="space-y-3">
                  {(d.appointmentTypes || []).map((at, i) => (
                    <div key={i} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <EInput
                          label="Type Name"
                          value={at.name}
                          onChange={(v) =>
                            setListItem("appointmentTypes", i, { name: v })
                          }
                          placeholder="e.g. In-person Consultation"
                        />
                      </div>
                      <div className="w-32">
                        <EInput
                          label="Price"
                          type="number"
                          value={at.price}
                          onChange={(v) =>
                            setListItem("appointmentTypes", i, { price: v })
                          }
                          placeholder="Price"
                        />
                      </div>
                      <button
                        onClick={() => delListItem("appointmentTypes", i)}
                        className="mb-0.5 w-9 h-10 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/30 transition shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {(!d.appointmentTypes || d.appointmentTypes.length === 0) && (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        No appointment types defined. Add one to get started.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {tab === "photos" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-white text-sm">
                    Facility Photos ({d.images.length})
                  </h3>
                  <div className="flex gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        readFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                    >
                      <Plus size={12} />
                      Add Photos
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {d.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative group aspect-square rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2">
                        {i !== 0 && (
                          <button
                            onClick={() => {
                              const imgs = [...d.images];
                              const [it] = imgs.splice(i, 1);
                              imgs.unshift(it);
                              setD((x) => ({ ...x, images: imgs }));
                            }}
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white transition hover:bg-green-400"
                            title="Set as cover"
                          >
                            <Star size={13} fill="white" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const imgs = d.images.filter((_, j) => j !== i);
                            setD((x) => ({ ...x, images: imgs }));
                          }}
                          className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white transition hover:bg-rose-400"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      {i === 0 && (
                        <div className="absolute bottom-0 inset-x-0 bg-green-600/80 text-white text-[9px] font-black text-center py-1">
                          COVER
                        </div>
                      )}
                      <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50/40 dark:hover:bg-green-500/10 transition-all group/add"
                  >
                    <Plus
                      size={20}
                      className="text-slate-300 dark:text-slate-600 group-hover/add:text-green-400 dark:group-hover/add:text-green-500 transition-colors mb-1"
                    />
                    <span className="text-[10px] text-slate-300 dark:text-slate-600 group-hover/add:text-green-400 dark:group-hover/add:text-green-500 font-bold transition-colors">
                      Add
                    </span>
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle size={13} className="text-green-500 shrink-0" />
                  Hover over a photo to remove it or set it as cover. The first
                  photo is always used as your profile cover image.
                </p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            All changes are saved locally and reflected immediately.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(d);
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-primary text-white text-sm font-black hover:from-green-500 hover:to-primary transition shadow-lg shadow-green-600/20"
            >
              <Check size={15} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}