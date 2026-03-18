import React, { useState } from "react";
import {
    Heart,
    Share2,
    MapPin,
    Calendar,
    Phone,
    ShieldCheck,
    Star,
    Building2,
    BedDouble,
    Users,
    Activity,
} from "lucide-react";

export default function Hero({
    HOSPITAL,
    isFavorite,
    setIsFavorite,
    handleBookAppointment,
}) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-200">
            <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/5 shrink-0 flex flex-col gap-2">
                        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden group cursor-pointer border border-slate-100 dark:border-slate-800 shadow-sm">
                            <img
                                src={HOSPITAL.images[activeImageIndex]}
                                alt="Hospital Main"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                Open 24/7
                            </div>
                        </div>
                        {}
                        <div className="grid grid-cols-5 gap-2">
                            {HOSPITAL.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative h-14 sm:h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImageIndex === idx ? "border-primary opacity-100 ring-2 ring-primary/20" : "border-transparent opacity-60 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100"}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                                        {HOSPITAL.name}
                                        <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                                    </h1>
                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium mb-2">
                                        {HOSPITAL.type}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="text-xs text-green-700 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded border border-green-100 dark:border-green-800">
                                            {HOSPITAL.accgreenitation || HOSPITAL.accreditation}
                                        </span>
                                        <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            <Star className="w-4 h-4 text-green-500 fill-green-500" />
                                            {HOSPITAL.rating}{" "}
                                            <span className="text-slate-500 dark:text-slate-400 font-normal">
                                                ({HOSPITAL.reviewsCount})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${isFavorite ? "fill-green-500 text-green-500" : "text-slate-500 dark:text-slate-400"}`}
                                        />
                                    </button>
                                    <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm">
                                        <Share2 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-medium">{HOSPITAL.address ? `${HOSPITAL.address}, ` : ''}{HOSPITAL.city}</span>
                                <a
                                    href="#"
                                    className="text-primary hover:underline ml-auto text-xs font-semibold whitespace-nowrap"
                                >
                                    View Map
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleBookAppointment}
                                className="flex-1 sm:flex-none bg-primary hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition shadow-sm flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-4 h-4" /> Book Appointment
                            </button>
                            <button className="flex-1 sm:flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-6 rounded-lg text-sm transition flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Contact Hospital
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {}
            <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 p-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-200 dark:divide-slate-700">
                <div className="flex flex-col items-center justify-center text-center px-2">
                    <div className="flex items-center gap-2 text-primary dark:text-green-400 mb-1">
                        <Building2 className="w-5 h-5" />
                        <span className="font-bold text-lg">{HOSPITAL.established}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Established
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                    <div className="flex items-center gap-2 text-primary dark:text-green-400 mb-1">
                        <BedDouble className="w-5 h-5" />
                        <span className="font-bold text-lg">{HOSPITAL.beds}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Hospital Beds
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                    <div className="flex items-center gap-2 text-primary dark:text-green-400 mb-1">
                        <Users className="w-5 h-5" />
                        <span className="font-bold text-lg">{HOSPITAL.doctors}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Expert Doctors
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                    <div className="flex items-center gap-2 text-primary dark:text-green-400 mb-1">
                        <Activity className="w-5 h-5" />
                        <span className="font-bold text-lg">{HOSPITAL.surgeries}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Successful Surgeries
                    </span>
                </div>
            </div>
        </div>
    );
}
