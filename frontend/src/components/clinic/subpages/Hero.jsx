import React from "react";
import { Star, MapPin, CheckCircle2, Heart } from "lucide-react";

const Hero = ({ clinicData, isBookmarked, setIsBookmarked }) => {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {clinicData.category}
            </span>
            <span className="flex items-center text-green-600 dark:text-green-500 text-xs font-semibold">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            {clinicData.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-slate-400 transition-colors duration-300">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-green-500 fill-current mr-1" />
              <span className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {clinicData.rating}
              </span>
              <span className="ml-1">({clinicData.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-400 dark:text-slate-500 transition-colors duration-300" />
              {clinicData.address}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-3 rounded-xl border transition-all ${
            isBookmarked
              ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500"
              : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500 hover:border-gray-300 dark:hover:border-slate-600"
          }`}
        >
          <Heart className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {}
      <div className="mt-8 grid grid-cols-4 grid-rows-2 gap-3 h-[300px] md:h-[400px]">
        <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={clinicData.images[0]}
            alt="Clinic Main"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>
        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={clinicData.images[1]}
            alt="Clinic Detail"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>
        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative shadow-sm group cursor-pointer">
          <img
            src={clinicData.images[2]}
            alt="Clinic More"
            className="w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold group-hover:underline">
            +12 More
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
