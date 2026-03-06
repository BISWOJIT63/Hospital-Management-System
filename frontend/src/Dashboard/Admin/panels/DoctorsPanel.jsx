import React, { useState } from "react";
import {
  UserCheck,
  Stethoscope,
  Star,
  ChevronDown,
  Users,
  Calendar,
  Activity,
} from "lucide-react";
import {
  Card,
  SectionHdr,
  SearchBar,
  StatCard,
  Avatar,
  Chip,
} from "../components/AdminUI";


export default function DoctorsPanel({ fac }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const doctorsList = fac?.keyDoctors || [];
  const filtered = doctorsList.filter(
    (d) =>
      d && (
        !search ||
        (d.name && d.name.toLowerCase().includes(search.toLowerCase())) ||
        (d.specialty && d.specialty.toLowerCase().includes(search.toLowerCase()))
      )
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={UserCheck}
          label="Total Doctors"
          value={fac?.doctorsCount || fac?.doctors?.length || 0}
          sub="On staff"
          color="green"
        />
        <StatCard
          icon={Stethoscope}
          label="Specialties"
          value={fac?.departments?.length || 0}
          sub="Departments"
          color="teal"
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value={fac?.rating || "0.0"}
          sub="Doctor rating"
          color="green"
        />
      </div>
      <Card>
        <SectionHdr
          icon={Stethoscope}
          title="Medical Staff"
          sub={`${filtered.length} doctors`}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name or specialty…"
          />
        </SectionHdr>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((doc, i) => (
            <div
              key={doc.name}
              onClick={() => setOpen(open === i ? null : i)}
              className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-500/30 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={doc.name} size="md" grad={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    {doc.specialty}
                  </p>
                </div>
                <ChevronDown
                  size={15}
                  className={`text-slate-400 dark:text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Chip label={doc.experience} color="slate" />
                <Chip label={doc.availability} color="green" />
              </div>
              {open === i && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
                  {[
                    [Users, "Patients", doc.patients],
                    [Calendar, "Bookings", "View"],
                    [Star, "Rating", "4.9"],
                    [Activity, "Status", "Active"],
                  ].map(([Ico, l, v]) => (
                    <div
                      key={l}
                      className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-100 dark:border-slate-800"
                    >
                      <Ico
                        size={12}
                        className="text-green-400 dark:text-green-500"
                      />
                      <div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide">
                          {l}
                        </p>
                        <p className="text-xs font-black text-slate-700 dark:text-slate-300">
                          {v}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
