import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarPlus, Star, CircleEllipsis } from "lucide-react";

export default function SpecialistCard({ DOCTORS }) {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(DOCTORS.length / 2),
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % DOCTORS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + DOCTORS.length) % DOCTORS.length);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  
  const getSpacing = () => {
    if (windowWidth < 640) return 140; 
    if (windowWidth < 1024) return 200; 
    return 260; 
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center font-sans">
      {}
      <div className="relative w-full max-w-7xl h-[450px] flex items-center justify-center z-10 perspective-[1000px]">
        {DOCTORS.map((doctor, index) => {
          
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          
          const isVisible = absOffset <= 2;

          
          const spacing = getSpacing();
          const translateX = offset * spacing;
          const scale = isCenter ? 1 : 1 - absOffset * 0.15; 
          const zIndex = 50 - absOffset;
          const opacity = isVisible ? (isCenter ? 1 : 0.8) : 0;

          return (
            <div
              key={doctor.id}
              onClick={() => handleCardClick(index)}
              className="absolute top-1/2 left-1/2 w-[280px] md:w-[320px] h-[380px] md:h-[400px] cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {}
              <div
                className={`w-full h-full rounded-2xl relative shadow-2xl transition-colors duration-500 border border-white/10
                  ${isCenter ? "bg-green-500" : "bg-green-600"}`}
              >
                {}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 rounded-2xl" />
                )}

                {}
                <div className="px-6 pb-6 pt-24 h-full flex flex-col justify-between text-white relative z-20">
                  {}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 z-30
                    ${isCenter ? "-top-20 w-40 h-40" : "-top-16 w-32 h-32"}
                  `}
                  >
                    <div className="w-full h-full rounded-full border-4 border-[#56ff07] bg-white shadow-xl overflow-hidden p-1">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}`; }}
                      />
                    </div>
                    {}
                    {isCenter && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-green-500 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> {doctor.rating}
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-2">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 line-clamp-1">
                      {doctor.name}
                    </h3>
                    <p className="text-white/80 font-medium text-sm mb-4">
                      {doctor.specialty}
                    </p>

                    {}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${isCenter ? "opacity-100 max-h-24" : "opacity-0 max-h-0"}`}
                    >
                      <p className="text-white/90 text-sm leading-relaxed mb-6">
                        {doctor.description}
                      </p>
                    </div>
                  </div>

                  {}
                  <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-auto">
                    <div>
                      <p className="text-white/70 text-xs">Consultation</p>
                      <p className="text-xl font-bold">{doctor.fee}</p>
                    </div>

                    <button
                      className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center
                        ${
                          isCenter
                            ? "bg-white text-primary hover:bg-gray-100 shadow-lg translate-y-0"
                            : "bg-white/20 text-white translate-y-2 opacity-50"
                        }`}
                      disabled={!isCenter}
                    >
                      <CircleEllipsis /> 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {}
      <div className="relative z-30 mt-12 flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-slate-800 dark:bg-white hover:bg-green-500 flex items-center justify-center text-white dark:text-black backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {}
        <div className="flex gap-2">
          {DOCTORS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                ${idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-slate-700 dark:bg-white hover:bg-white/50"}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-slate-800 dark:bg-white hover:bg-green-500 flex items-center justify-center text-white dark:text-black backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={activeIndex === DOCTORS.length - 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
