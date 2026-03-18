import React, { useState, useEffect } from "react";
import {
  Check,
  MapPin,
  Phone,
  Star,
  Calendar,
  Users,
  BedDouble,
  CalendarDays,
  UserCheck,
  Scissors,
  DollarSign,
  Shield,
  Activity,
  Loader2,
} from "lucide-react";
import { Card, StatCard } from "../components/AdminUI";
import { api } from "../../../utils/api";

const BadgeCheck = Check;

export default function OverviewPanel({ fac }) {
  const [summary, setSummary] = useState({ totalBookings: 0, totalPatients: 0, avgRating: 0, totalReviews: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await api.getAdminAnalytics(token);
        if (data?.summary) setSummary(data.summary);
      } catch (err) {
        console.error("Failed to load overview stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [fac]);

  return (
    <div className="flex flex-col gap-5">
      {/* Facility Header Card */}
      <div className="relative bg-green-700 to-lime-900 rounded-3xl overflow-hidden p-7 text-white">
        <div className="absolute inset-0 opacity-30" />
        <div className="relative flex flex-col sm:flex-row gap-5">
          <div className="relative shrink-0">
            {fac.images?.[0] ? (
              <img
                src={fac.images[0]}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center">
                <Activity size={32} className="text-white/60" />
              </div>
            )}
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
                {fac.city || fac.address || "Location not set"}
              </span>
              {fac.phone && (
                <>
                  <span className="text-green-400">·</span>
                  <span className="flex items-center gap-1">
                    <Phone size={13} />
                    {fac.phone}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <Star size={12} className="text-green-400 fill-green-400" />
                <span className="text-sm font-black">
                  {summary.avgRating > 0 ? summary.avgRating.toFixed(1) : "New"}
                </span>
                <span className="text-xs text-green-300">
                  ({summary.totalReviews} reviews)
                </span>
              </div>
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  fac.acceptingPatients
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    fac.acceptingPatients ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                  }`}
                />
                {fac.acceptingPatients ? "Accepting Patients" : "Not Accepting"}
              </span>
              {fac.priceRange && (
                <span className="bg-white/10 rounded-full px-3 py-1 text-xs font-bold">
                  {fac.priceRange}
                </span>
              )}
              <span className="bg-white/10 rounded-full px-3 py-1 text-xs font-bold uppercase">
                {fac.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats from DB */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loadingStats ? (
          <div className="col-span-4 flex justify-center py-8">
            <Loader2 size={24} className="animate-spin text-green-500" />
          </div>
        ) : (
          <>
            <StatCard
              icon={Calendar}
              label="Total Bookings"
              value={summary.totalBookings.toLocaleString()}
              sub="All time"
              color="green"
            />
            <StatCard
              icon={Users}
              label="Unique Patients"
              value={summary.totalPatients.toLocaleString()}
              sub="Total served"
              color="teal"
            />
            <StatCard
              icon={Star}
              label="Avg Rating"
              value={summary.avgRating > 0 ? summary.avgRating.toFixed(1) : "N/A"}
              sub={`${summary.totalReviews} reviews`}
              color="green"
            />
            <StatCard
              icon={BedDouble}
              label="Beds"
              value={fac.beds || "N/A"}
              sub={fac.doctorsCount ? `${fac.doctorsCount} doctors` : "From profile"}
              color="teal"
            />
          </>
        )}
      </div>

      {/* Info Grid from DB facility record */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          [MapPin, "Address", fac.address || fac.city || "—"],
          [CalendarDays, "Established", fac.established || "—"],
          [BedDouble, "Total Beds", fac.beds || "—"],
          [UserCheck, "Doctors", fac.doctorsCount || "—"],
          [Scissors, "Surgeries/yr", fac.surgeries || "—"],
          [DollarSign, "Price Range", fac.priceRange || "—"],
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
              : typeof fac.accreditationsList === "string" && fac.accreditationsList
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
