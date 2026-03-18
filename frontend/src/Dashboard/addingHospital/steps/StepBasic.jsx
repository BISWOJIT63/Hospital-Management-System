import React from "react";
import { Hospital, Upload } from "lucide-react";
import { Field, ST, inpClass, PillBtn } from "../components/UI";

export default function StepBasic({
  fd,
  update,
  errors,
  previews,
  handleImages,
  removeImage,
  entityType,
}) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300">
      <ST
        icon={Hospital}
        title="Basic Information"
        sub="Core details displayed on your public listing"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field label="Facility Name *" error={errors.name}>
          <input
            value={fd.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={
              entityType === "hospital"
                ? "City General Hospital"
                : "Downtown Health Clinic"
            }
            className={inpClass(errors.name)}
          />
        </Field>
        <Field label="Accreditation">
          <input
            value={fd.accreditation}
            onChange={(e) => update("accreditation", e.target.value)}
            placeholder="JCI, NABH, ISO 9001…"
            className={inpClass()}
          />
        </Field>
        <Field label="City *" error={errors.city}>
          <input
            value={fd.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. New York"
            className={inpClass(errors.city)}
          />
        </Field>
        <Field label="Location / Address *" error={errors.location}>
          <input
            value={fd.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="123 Medical Avenue, PIN Code"
            className={inpClass(errors.location)}
          />
        </Field>
        <Field label="Facility Email *" error={errors.email}>
          <input
            type="email"
            value={fd.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="contact@facility.com"
            className={inpClass(errors.email)}
          />
        </Field>
        <Field label="Facility Phone *" error={errors.phone}>
          <input
            type="tel"
            value={fd.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 234 567 890"
            className={inpClass(errors.phone)}
          />
        </Field>

        <Field label="Established Year">
          <input
            value={fd.established}
            onChange={(e) => update("established", e.target.value)}
            placeholder="1998"
            className={inpClass()}
          />
        </Field>
        <Field label="Price Range">
          <select
            value={fd.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
            className={`${inpClass()} cursor-pointer`}
          >
            <option value="">Select range</option>
            <option value="$">$ — Budget Friendly</option>
            <option value="$$">$$ — Moderate</option>
            <option value="$$$">$$$ — Premium</option>
            <option value="$$$$">$$$$ — Luxury</option>
          </select>
        </Field>
        <Field label="Total Beds">
          <input
            value={fd.beds}
            onChange={(e) => update("beds", e.target.value)}
            placeholder="500"
            className={inpClass()}
          />
        </Field>
        <Field label="Total Doctors">
          <input
            value={fd.doctorsCount}
            onChange={(e) => update("doctorsCount", e.target.value)}
            placeholder="120"
            className={inpClass()}
          />
        </Field>
        <Field label="Annual Surgeries">
          <input
            value={fd.surgeries}
            onChange={(e) => update("surgeries", e.target.value)}
            placeholder="10,000+"
            className={inpClass()}
          />
        </Field>
        <Field label="Rating (1–5)">
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={fd.rating}
            onChange={(e) => update("rating", e.target.value)}
            placeholder="4.8"
            className={inpClass()}
          />
        </Field>
        <Field label="Total Reviews">
          <input
            type="number"
            value={fd.reviewsCount}
            onChange={(e) => update("reviewsCount", e.target.value)}
            placeholder="1250"
            className={inpClass()}
          />
        </Field>
      </div>

      <Field label="About Your Facility *" error={errors.about} span>
        <textarea
          value={fd.about}
          onChange={(e) => update("about", e.target.value)}
          placeholder="Describe your facility — its mission, specializations, and what makes it exceptional…"
          rows={4}
          className={`${inpClass(errors.about)} resize-y`}
        />
      </Field>

      <div className="my-5">
        <label className="block text-[11px] font-bold tracking-widest uppercase mb-2 text-slate-500 dark:text-slate-400">
          Currently Accepting Patients
        </label>
        <div className="flex flex-wrap gap-2.5">
          {[
            { v: true, l: "✓ Yes" },
            { v: false, l: "✗ No" },
            { v: "contact", l: "Contact Us" },
          ].map((o) => (
            <PillBtn
              key={String(o.v)}
              active={fd.acceptingPatients === o.v}
              label={o.l}
              onClick={() => update("acceptingPatients", o.v)}
            />
          ))}
        </div>
      </div>

      <Field label="Certifications (comma separated)" span>
        <input
          value={fd.accreditationsList}
          onChange={(e) => update("accreditationsList", e.target.value)}
          placeholder="JCI Gold Seal, NABH, ISO 9001:2015"
          className={inpClass()}
        />
      </Field>

      <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
        <ST
          icon={Hospital}
          title="Appointment Types & Pricing"
          sub="Define standard appointment types for your facility"
        />
        <div className="space-y-3 mb-4">
          {fd.appointmentTypes?.map((at, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="flex-1">
                <input
                  value={at.name}
                  onChange={(e) => {
                    const next = [...fd.appointmentTypes];
                    next[i].name = e.target.value;
                    update("appointmentTypes", next);
                  }}
                  placeholder="e.g. In-person Consultation"
                  className={inpClass()}
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={at.price}
                  onChange={(e) => {
                    const next = [...fd.appointmentTypes];
                    next[i].price = e.target.value;
                    update("appointmentTypes", next);
                  }}
                  placeholder="Price"
                  className={inpClass()}
                />
              </div>
              {fd.appointmentTypes.length > 1 && (
                <button
                  onClick={() => {
                    const next = fd.appointmentTypes.filter((_, idx) => idx !== i);
                    update("appointmentTypes", next);
                  }}
                  className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const next = [...(fd.appointmentTypes || []), { name: "", price: "" }];
            update("appointmentTypes", next);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors"
        >
          + Add Appointment Type
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
            <Upload size={14} /> Facility Images (up to 5) *
          </label>
          <span
            className={`text-xs font-bold ${previews.length >= 5 ? "text-green-500" : "text-slate-400"}`}
          >
            {previews.length} / 5 uploaded
          </span>
        </div>
        {errors.images && (
          <div className="text-rose-500 text-xs mb-3 font-medium">
            ⚠ {errors.images}
          </div>
        )}

        {previews.length < 5 && (
          <label className="block border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50 dark:bg-slate-900/50 transition-colors group mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="hidden"
            />
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Upload size={22} />
            </div>
            <div className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-1">
              {previews.length === 0
                ? "Click to upload images"
                : `Add more images (${5 - previews.length} left)`}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              PNG, JPG, WebP · High resolution recommended
            </div>
          </label>
        )}

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <div
                key={src}
                className="w-[120px] h-24 rounded-xl relative group"
              >
                <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                {i === 0 && (
                  <div className="absolute top-1.5 left-1.5 bg-green-600 text-white rounded-md px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm z-10">
                    Cover
                  </div>
                )}
                <button
                  onClick={() => removeImage(i)}
                  title="Remove image"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 border-2 border-white dark:border-slate-950 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
