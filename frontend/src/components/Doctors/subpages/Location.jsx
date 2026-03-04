import React from "react";
import { MapPin, MapPinIcon } from "lucide-react";
const Location = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="clinics"
        className="bg-white dark:bg-black  p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold dark:text-slate-100 text-slate-900 mb-6">
          Clinics & Locations
        </h2>
        <div className="space-y-6">
          {DOCTOR.clinics.map((clinic, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row gap-6 p-4 border border-slate-100 rounded-xl bg-slate-50/30 dark:bg-slate-800"
            >
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-black rounded border border-slate-200 dark:border-slate-600 p-1 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop"
                      className="w-full h-full object-cover rounded-sm"
                      alt="clinic"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-600 text-base">
                      {clinic.name}
                    </h3>
                    <p className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded inline-block mt-1">
                      {clinic.fee} / Appointment
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 dark:text-slate-200 " />
                      {clinic.address}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {clinic.timings.map((t, tidx) => (
                    <div
                      key={tidx}
                      className="border border-slate-200 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-black text-center"
                    >
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-300">
                        {t.day}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="lg:w-1/3 h-48 lg:h-auto bg-slate-200 rounded-lg relative overflow-hidden border border-slate-300">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPinIcon className="w-8 h-8 text-slate-400 mb-2" />
                  <button className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-4 py-2 rounded shadow-sm border border-slate-200">
                    View Map
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Location;
