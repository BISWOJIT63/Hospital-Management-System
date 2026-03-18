import React, { useState, useMemo } from "react";
import { Users, UserCheck, Calendar } from "lucide-react";
import {
  Card,
  SectionHdr,
  SearchBar,
  StatCard,
  Avatar,
  StatusBadge,
} from "../components/AdminUI";
import { api } from "../../../utils/api";
export default function PatientsPanel() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await api.getMyAppointments();
        if (res.success || res.data) {
          const raw = res.data || res;
          
          // Group by unique patient
          const patientMap = new Map();
          raw.forEach(b => {
             const pName = b.patientId?.name || "Unknown Patient";
             if (!patientMap.has(pName)) {
               patientMap.set(pName, {
                 name: pName,
                 dept: b.providerType,
                 doctor: b.providerType === 'Doctor' ? 'Doctor View' : 'Facility View',
                 lastVisit: b.date,
                 status: b.status === "confirmed" ? "accepted" : b.status,
                 bookings: 1
               });
             } else {
               const existing = patientMap.get(pName);
               existing.bookings += 1;
             }
          });
          setPatients(Array.from(patientMap.values()));
        }
      } catch (e) {
        console.error("Failed to load patients for admin panel", e);
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  }, []);
  const [search, setSearch] = useState("");
  const filtered = patients.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.dept.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={patients.length}
          sub="Registered"
          color="green"
        />
        <StatCard
          icon={UserCheck}
          label="Active Patients"
          value={patients.filter((p) => p.status === "accepted").length}
          sub="With accepted booking"
          color="teal"
        />
          <StatCard
            icon={Calendar}
            label="Loading..."
            value={loading ? "-" : patients.filter(p => p.status === 'accepted').length}
            sub="Patients seen"
            color="green"
          />
      </div>
      <Card>
        <SectionHdr
          icon={Users}
          title="All Patients"
          sub={`${filtered.length} records`}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search patient or department…"
          />
        </SectionHdr>
        <div className="flex flex-col gap-2">
          {filtered.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-500/30 hover:bg-green-50/20 dark:hover:bg-green-500/10 transition-all group"
            >
              <Avatar name={p.name} grad={i} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-slate-200">
                  {p.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {p.dept} · {p.doctor}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Last visit: {p.lastVisit}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {p.bookings} booking{p.bookings > 1 ? "s" : ""}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
