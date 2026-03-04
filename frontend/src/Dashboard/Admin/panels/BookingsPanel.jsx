import React, { useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Clock3,
  Check,
  X,
} from "lucide-react";
import {
  Card,
  SectionHdr,
  SearchBar,
  StatusBadge,
  Avatar,
  Chip,
} from "../components/AdminUI";
import { initBookings } from "../adminData";

export default function BookingsPanel() {
  const [bookings, setBookings] = useState(initBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      bookings.filter((b) => {
        const q = search.toLowerCase();
        const matchQ =
          !q ||
          b.patient.toLowerCase().includes(q) ||
          b.doctor.toLowerCase().includes(q) ||
          b.dept.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q);
        const matchF = filter === "all" || b.status === filter;
        return matchQ && matchF;
      }),
    [bookings, search, filter],
  );

  const setStatus = (id, s) =>
    setBookings((bb) => bb.map((b) => (b.id === id ? { ...b, status: s } : b)));
  const counts = {
    all: bookings.length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["all", "All Bookings", counts.all, Calendar, "green"],
          ["accepted", "Accepted", counts.accepted, CheckCircle2, "teal"],
          ["pending", "Pending", counts.pending, Clock, "green"],
          ["cancelled", "Cancelled", counts.cancelled, XCircle, "rose"],
        ].map(([id, lbl, cnt, Ico, col]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${filter === id ? "border-green-500 bg-green-50 dark:bg-green-500/10 dark:border-green-500" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-green-200 dark:hover:border-green-500/30"}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${col === "teal" ? "bg-emerald-100 dark:bg-emerald-500/20" : col === "green" ? "bg-green-100 dark:bg-green-500/20" : col === "rose" ? "bg-rose-100 dark:bg-rose-500/20" : "bg-green-100 dark:bg-green-500/20"}`}
            >
              <Ico
                size={15}
                className={
                  col === "teal"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : col === "green"
                      ? "text-green-600 dark:text-green-400"
                      : col === "rose"
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-green-600 dark:text-green-400"
                }
              />
            </div>
            <p className="text-2xl font-black text-slate-800 dark:text-white">
              {cnt}
            </p>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              {lbl}
            </p>
          </button>
        ))}
      </div>

      <Card>
        <SectionHdr
          icon={Calendar}
          title="All Bookings"
          sub={`${filtered.length} records`}
        >
          <div className="flex gap-2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search patient, doctor…"
            />
          </div>
        </SectionHdr>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {[
                  "ID",
                  "Patient",
                  "Doctor",
                  "Dept",
                  "Date & Time",
                  "Type",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-3 pr-4 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr
                  key={b.id}
                  className={`border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30 dark:bg-slate-800/20"}`}
                >
                  <td className="py-3 pr-4">
                    <span className="text-xs font-black text-green-600 dark:text-green-400">
                      {b.id}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={b.patient} size="sm" grad={i} />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {b.patient}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {b.doctor}
                  </td>
                  <td className="py-3 pr-4">
                    <Chip label={b.dept} />
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <p className="text-slate-700 dark:text-slate-300 font-semibold">
                      {b.date}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {b.time}
                    </p>
                  </td>
                  <td className="py-3 pr-4 text-slate-500 dark:text-slate-500 whitespace-nowrap">
                    {b.type}
                  </td>
                  <td className="py-3 pr-4 font-black text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {b.amount}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {b.status !== "accepted" && (
                        <button
                          onClick={() => setStatus(b.id, "accepted")}
                          title="Accept"
                          className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition"
                        >
                          <Check size={12} />
                        </button>
                      )}
                      {b.status !== "cancelled" && (
                        <button
                          onClick={() => setStatus(b.id, "cancelled")}
                          title="Cancel"
                          className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition"
                        >
                          <X size={12} />
                        </button>
                      )}
                      {b.status !== "pending" && (
                        <button
                          onClick={() => setStatus(b.id, "pending")}
                          title="Set Pending"
                          className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                        >
                          <Clock3 size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 dark:text-slate-600">
              <Calendar size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold">No bookings found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
