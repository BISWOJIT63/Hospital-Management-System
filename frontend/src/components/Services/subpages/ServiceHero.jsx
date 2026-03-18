import React, { useState } from "react";
import {
  ChevronRight,
  Heart,
  Share2,
  Star,
  Activity,
  Calendar,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServiceHero = ({ service }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              {service.status}
            </div>
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {service.name}
                  </h1>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded border border-green-100 dark:border-green-500/20 inline-block mb-3">
                    {service.category}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? "fill-lime-500 text-lime-500" : "text-slate-500 dark:text-slate-400"}`}
                    />
                  </button>
                  <button className="p-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm">
                    <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 mb-6">
                <Star className="w-4 h-4 text-green-500 fill-green-500" />
                {typeof service.rating === "object" ? (service.rating?.average?.toFixed(1) || "N/A") : (service.rating || "N/A")}{" "}
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  ({service.reviewsCount} Patient Reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                    Patients Treated
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {service.patientsTreated}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                    Success Rate
                  </p>
                  <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Activity className="w-4 h-4" /> {service.successRate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/appointment', { state: { service: service } })}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Request Appointment
              </button>
              <button className="flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-lg text-sm transition flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
