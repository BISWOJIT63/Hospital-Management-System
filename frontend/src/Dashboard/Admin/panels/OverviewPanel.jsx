import React from "react";
import {
  Check,
  MapPin,
  Phone,
  Star,
  Eye,
  Calendar,
  Users,
  BedDouble,
  CalendarDays,
  UserCheck,
  Scissors,
  DollarSign,
  Shield,
} from "lucide-react";
import { Card, StatCard } from "../components/AdminUI";

const BadgeCheck = Check;

export default function OverviewPanel({ fac }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Hero */}
      <div className="relative bg-green-700 to-lime-900 rounded-3xl overflow-hidden p-7 text-white">
        <div className="absolute inset-0 opacity-30" />
        <div className="relative flex flex-col sm:flex-row gap-5">
          <div className="relative shrink-0">
            <img
              src={fac.images[0]}
              alt=""
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <Check size={11} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black truncate">{fac.name}</h2>
              <BadgeCheck size={20} className="text-green-300 shrink-0" />
            </div>
            <div className="flex flex-wrap gap-2 text-green-200 text-sm mb-3">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {(fac.location || "").split(",").slice(-2).join(",").trim()}
              </span>
              <span className="text-green-400">·</span>
              <span className="flex items-center gap-1">
                <Phone size={13} />
                {fac.phone}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Star size={12} className="text-green-400 fill-green-400" />
                <span className="text-sm font-black">{fac.rating}</span>
                <span className="text-xs text-green-300">
                  ({fac.reviewsCount.toLocaleString()})
                </span>
              </div>
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${fac.acceptingPatients ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${fac.acceptingPatients ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`}
                />
                {fac.acceptingPatients ? "Accepting Patients" : "Not Accepting"}
              </span>
              <span className="bg-white/10 rounded-full px-3 py-1 text-xs font-bold">
                {fac.priceRange}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          label="Profile Views"
          value="4,821"
          sub="All time"
          color="green"
          trend="+12%"
        />
        <StatCard
          icon={Calendar}
          label="Bookings"
          value="244"
          sub="This month"
          color="teal"
          trend="+8%"
        />
        <StatCard
          icon={Users}
          label="Patients"
          value="1,840"
          sub="Total registered"
          color="green"
        />
        <StatCard
          icon={BedDouble}
          label="Beds"
          value={fac.beds}
          sub={`${fac.doctors} doctors`}
          color="teal"
        />
      </div>

      {/* Quick info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          [MapPin, "Address", fac.location],
          [CalendarDays, "Established", fac.established],
          [BedDouble, "Total Beds", fac.beds],
          [UserCheck, "Doctors", fac.doctors],
          [Scissors, "Surgeries", fac.surgeries],
          [DollarSign, "Price Range", fac.priceRange],
        ].map(([I, l, v]) => (
          <div
            key={l}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
          >
            <div className="w-8 h-8 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-xl flex items-center justify-center shrink-0">
              <I size={14} className="text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {l}
              </p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
                {v}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accreditations */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={15} className="text-green-500 dark:text-green-400" />
          <h4 className="text-sm font-black text-slate-800 dark:text-white">
            Accreditations
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const list = Array.isArray(fac.accreditationsList)
              ? fac.accreditationsList
              : typeof fac.accreditationsList === "string" &&
                  fac.accreditationsList
                ? fac.accreditationsList
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];

            if (list.length === 0)
              return (
                <span className="text-slate-400 dark:text-slate-500 text-sm italic">
                  Not specified
                </span>
              );

            return list.map((a) => (
              <span
                key={a}
                className="flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-full px-3 py-1.5 text-xs font-bold"
              >
                <Shield size={11} />
                {a}
              </span>
            ));
          })()}
        </div>
      </Card>
    </div>
  );
}
