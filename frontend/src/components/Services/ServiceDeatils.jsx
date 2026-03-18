import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star, Clock, Tag, Calendar, Phone, Heart, Share2,
  ChevronLeft, ChevronRight, Activity, ClipboardList,
  BadgeDollarSign, HeartPulse, Users, Award, CheckCircle,
  Building2, User, Loader2, AlertCircle
} from "lucide-react";
import { api } from "../../utils/api";
import ReviewSection from "../Reviews/ReviewSection";

// ─── Image Carousel ───────────────────────────────────────────────────────────
function ImageCarousel({ images, name }) {
  const [current, setCurrent] = useState(0);
  const all = images?.length > 0 ? images : [];

  if (!all.length) {
    return (
      <div className="w-full h-64 md:h-80 bg-gradient-to-br from-emerald-900 to-teal-900 flex items-center justify-center rounded-xl">
        <Activity className="w-16 h-16 text-emerald-400 opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group">
      <img
        src={all[current]}
        alt={`${name} - ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      {all.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + all.length) % all.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % all.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {all.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50"}`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
            {current + 1} / {all.length}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function ServiceHero({ service }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const rating = typeof service.rating === "object"
    ? (service.rating?.average?.toFixed(1) || null)
    : (service.rating || null);

  const provider = service.facilityId || service.doctorId;
  const providerName = provider?.name;
  const providerType = service.facilityId ? (service.facilityId.type || "Facility") : service.doctorId ? "Doctor" : null;
  const providerLink = service.facilityId
    ? (service.facilityId.type === "Clinic" ? `/clinic-profile/${service.facilityId._id}` : `/hospital-profile/${service.facilityId._id}`)
    : service.doctorId ? `/doctors-profile/${service.doctorId._id}` : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <ImageCarousel images={service.images} name={service.name} />

      <div className="p-6 md:p-8">
        {/* Top row: title + actions */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{service.name}</h1>
            <span className="inline-block text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-700 px-3 py-1 rounded-full">
              {service.category || "General"}
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
            </button>
            <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition">
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-5">
          {rating && (
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {rating}
              <span className="text-slate-400 font-normal">
                ({service.rating?.count || 0} reviews)
              </span>
            </div>
          )}
          {service.price && (
            <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <BadgeDollarSign className="w-4 h-4" />
              ₹{service.price}
            </div>
          )}
          {service.duration && (
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              {service.duration}
            </div>
          )}
          {service.status && (
            <div className="flex items-center gap-1">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${service.status === "active"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-slate-100 text-slate-500"}`}>
                {service.status === "active" ? "● Active" : "● Inactive"}
              </span>
            </div>
          )}
        </div>

        {/* Provider */}
        {providerName && (
          <button
            onClick={() => providerLink && navigate(providerLink)}
            className="flex items-center gap-2 mb-5 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            {service.doctorId ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            <span>Offered by <strong>{providerName}</strong></span>
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{providerType}</span>
          </button>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/appointment", { state: { service } })}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-5 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Request Appointment
          </button>
          <button className="shrink-0 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Call
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function ServiceOverview({ service }) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-emerald-600" /> About This Service
      </h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
        {service.description || "No description available."}
      </p>

      {/* Includes / Benefits */}
      {service.includes?.length > 0 && (
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> What's Included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Treatments ───────────────────────────────────────────────────────────────
function ServiceTreatments({ treatments }) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
        <HeartPulse className="w-5 h-5 text-emerald-600" /> Treatments & Procedures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {treatments.map((t, i) => (
          <div key={i} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{t.name}</h3>
              {(t.description || t.desc) && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.description || t.desc}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function ServicePricing({ pricing, basePrice }) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
        <BadgeDollarSign className="w-5 h-5 text-emerald-600" /> Packages & Pricing
      </h2>

      {basePrice && (
        <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-700 flex items-center gap-3">
          <Tag className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Starting from</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{basePrice}</p>
          </div>
        </div>
      )}

      {pricing.length > 0 && (
        <div className="space-y-3">
          {pricing.map((pkg, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition gap-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{pkg.package}</h3>
                {pkg.includes?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {pkg.includes.map((item, j) => (
                      <span key={j} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹{pkg.price}</p>
                <p className="text-xs text-slate-400 mt-0.5">per session</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Business Hours ───────────────────────────────────────────────────────────
function ServiceTimings({ businessHours }) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
        <Clock className="w-5 h-5 text-emerald-600" /> Service Timings
      </h2>
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-sm">
        {businessHours.map((bh, i) => (
          <div key={i} className={`flex justify-between items-center px-5 py-3.5 border-b border-slate-100 dark:border-slate-700 last:border-0 ${bh.highlight ? "bg-emerald-50/60 dark:bg-emerald-900/10" : "bg-white dark:bg-slate-800"}`}>
            <span className={`font-medium ${bh.highlight ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
              {bh.day}
            </span>
            <div className="flex items-center gap-3">
              {bh.isOpen ? (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded uppercase">Open</span>
              ) : (
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-400 px-2 py-0.5 rounded uppercase">Closed</span>
              )}
              <span className={`font-medium ${bh.highlight ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
                {bh.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Provider Info ────────────────────────────────────────────────────────────
function ServiceProvider({ service }) {
  const navigate = useNavigate();
  const facility = service.facilityId;
  const doctor = service.doctorId;
  const provider = facility || doctor;

  if (!provider) return null;

  const isDoctor = !!doctor;
  const profileLink = facility
    ? (facility.type === "Clinic" ? `/clinic-profile/${facility._id}` : `/hospital-profile/${facility._id}`)
    : `/doctors-profile/${doctor._id}`;

  return (
    <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
        {isDoctor ? <User className="w-5 h-5 text-emerald-600" /> : <Building2 className="w-5 h-5 text-emerald-600" />}
        {isDoctor ? "Specialist Doctor" : "Healthcare Provider"}
      </h2>
      <div
        className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition"
        onClick={() => navigate(profileLink)}
      >
        <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 overflow-hidden">
          {provider.images?.[0] || provider.avatar ? (
            <img src={provider.images?.[0] || provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
          ) : isDoctor ? (
            <User className="w-7 h-7 text-emerald-600" />
          ) : (
            <Building2 className="w-7 h-7 text-emerald-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 dark:text-white">{provider.name}</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
            {facility?.type || (doctor?.specialty ? `${doctor.specialty}` : "Specialist")}
          </p>
          {(provider.address || provider.location || doctor?.location) && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {provider.address || provider.location || doctor?.location}
            </p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServiceDeatils() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const data = await api.getServiceById(id);
          setService(data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-bold text-lg">Service not found.</p>
        </div>
      </div>
    );
  }

  const hasPricing = (service.pricing?.length > 0) || service.price;

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 font-sans pb-24 text-slate-800 dark:text-slate-100 transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 pt-6">
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        {(service.facilityId || service.doctorId) && <ServiceProvider service={service} />}
        {service.treatments?.length > 0 && <ServiceTreatments treatments={service.treatments} />}
        {hasPricing && <ServicePricing pricing={service.pricing || []} basePrice={service.price} />}
        {service.businessHours?.length > 0 && <ServiceTimings businessHours={service.businessHours} />}
        
        <ReviewSection 
          entityId={id} 
          entityType="Service" 
          initialRating={service.rating?.average || 0} 
          initialCount={service.rating?.count || 0} 
        />
      </main>
    </div>
  );
}
