import React from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import { ST } from "../components/UI";

export default function StepReview({ fd, entityType, previews }) {
  const acl = fd.accreditationsList
    ? fd.accreditationsList
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  const rows = [
    ["Facility Name", fd.name],
    ["Type", entityType],
    ["Location", fd.location],
    ["Established", fd.established],
    ["Beds", fd.beds],
    ["Doctors", fd.doctors],
    ["Surgeries/yr", fd.surgeries],
    ["Price Range", fd.priceRange],
    ["Rating", fd.rating ? `${fd.rating} ★` : ""],
    ["Reviews", fd.reviewsCount],
    [
      "Accepting Patients",
      fd.acceptingPatients === true
        ? "Yes"
        : fd.acceptingPatients === false
          ? "No"
          : "Contact Us",
    ],
    [
      "Departments",
      fd.departments
        .filter((d) => d.name)
        .map((d) => d.name)
        .join(", ") || "—",
    ],
    ["Services", fd.services.filter((s) => s.name).length + " listed"],
    ["Key Doctors", fd.keyDoctors.filter((d) => d.name).length + " listed"],
    ["Insurance Plans", fd.insurances.join(", ") || "—"],
    ["Facilities", fd.facilities.join(", ") || "—"],
    ["Certifications", acl.join(", ") || "—"],
    ["Images", previews.length + " uploaded"],
  ].filter((r) => (r[1] && r[1] !== "—") || r[1] === "—");

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
      <ST
        icon={Eye}
        title="Review Your Listing"
        sub="Everything looks good? Hit submit to send for approval."
      />

      {/* Visual Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {previews.map((src, i) => (
            <div
              key={i}
              className="w-[140px] h-24 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-sm"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {i === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-green-600/90 backdrop-blur-sm text-white rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* About Box */}
      {fd.about && (
        <div className="bg-green-50 dark:bg-green-500/10 border-l-4 border-green-500 rounded-r-xl p-4 mb-6 text-green-900 dark:text-green-200 text-sm leading-relaxed">
          {fd.about}
        </div>
      )}

      {/* Data Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 shadow-sm">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`grid grid-cols-[150px_1fr] md:grid-cols-[180px_1fr] ${i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-900/50"}`}
          >
            <div className="p-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {k}
            </div>
            <div className="p-3.5 text-sm font-medium text-slate-800 dark:text-slate-200">
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Ready Banner */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/30">
          <CheckCircle2 size={20} />
        </div>
        <div className="text-sm text-emerald-800 dark:text-emerald-300">
          <strong className="block mb-0.5 text-base">Ready for Review!</strong>
          Our team typically reviews submissions within 24 hours. You'll be
          notified by email once approved.
        </div>
      </div>
    </div>
  );
}
