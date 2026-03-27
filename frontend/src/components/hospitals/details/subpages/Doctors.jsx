import React from "react";
import { Users, Award } from "lucide-react";

export default function Doctors({ HOSPITAL }) {
  return (
    <section
      id="doctors"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          Top Specialists
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          ...(HOSPITAL.keyDoctors || []),
          ...(HOSPITAL.doctors || []).map((d) => ({
            name: d.name,
            specialty: d.specialty,
            experience: d.experience,
            image: d.image || d.avatar || d.profilePic,
          })),
        ].map((doc, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-800/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition"
          >
            <img
              src={
                doc.image ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(doc.name) +
                  "&background=random"
              }
              alt={doc.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 shrink-0"
            />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {doc.name}
              </h3>
              <p className="text-xs font-semibold text-primary dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded inline-block mt-1">
                {doc.specialty}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                <Award className="w-3 h-3" /> {doc.experience} Experience
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
