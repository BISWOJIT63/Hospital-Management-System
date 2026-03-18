import React, { useState, useEffect } from "react";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Youtube,
  Instagram,
  ArrowLeft,
} from "lucide-react";
import { api } from "../utils/api";
import { NavLink } from "react-router-dom";
import { MOCK_HOSPITALS, MOCK_CLINICS } from "../utils/MockData";

export default function Hospitals({ useMock = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [transition, setTransition] = useState({
    active: false,
    phase: "idle",
    dir: "next",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let facilitiesData = [];
        if (useMock) {
          facilitiesData = [...MOCK_HOSPITALS, ...MOCK_CLINICS];
        } else {
          const res = await api.getFacilities();
          facilitiesData = res.data || (Array.isArray(res) ? res : []);
        }
        
        const hospitals = facilitiesData.filter(f => f.type === 'Hospital');
        const clinics = facilitiesData.filter(f => f.type === 'Clinic');

        const mapToCard = (f) => ({
          id: f._id || f.id,
          name: f.name,
          location: f.city || "Various Locations",
          image: f.images?.[0] || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
          description: f.description || f.about || "Experience world-class medical excellence with advanced technology and compassionate care."
        });

        const newSlides = [
          {
            id: 1,
            titleLine1: "Top Rated",
            titleLine2: "Hospitals",
            description: "Discover world-class medical facilities offering comprehensive care and compassionate healing environments.",
            cards: hospitals.slice(0, 3).map(mapToCard)
          },
          {
            id: 2,
            titleLine1: "Specialized",
            titleLine2: "Care Centers",
            description: "Find expert clinics and dedicated centers focusing on personalized treatments and wellness.",
            cards: clinics.slice(0, 3).map(mapToCard)
          },
          {
            id: 3,
            titleLine1: "Advanced",
            titleLine2: "Medical Network",
            description: "A comprehensive network of healthcare facilities providing innovative treatments and innovative healthcare solutions.",
            cards: facilitiesData.slice(3, 6).map(mapToCard)
          }
        ].filter(s => s.cards.length > 0);

        // Fallback slides if no data in DB
        if (newSlides.length === 0) {
           // (Keep minimal fallback or just show empty state)
        }

        setSlides(newSlides);
      } catch (err) {
        console.error("Failed to fetch hospitals slides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-primary font-bold uppercase tracking-widest">Initialising Network...</div>;
  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const changeSlide = (direction) => {
    if (transition.active) return;

    setSelectedCard(null);
    setTransition({ active: true, phase: "entering", dir: direction });

    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length,
      );
      setTransition({ active: true, phase: "exiting", dir: direction });

      setTimeout(() => {
        setTransition({ active: false, phase: "idle", dir: direction });
      }, 800);
    }, 800);
  };

  let overlayTransform = "";
  if (transition.phase === "idle") {
    overlayTransform =
      transition.dir === "next" ? "-translate-x-full" : "translate-x-full";
  } else if (transition.phase === "entering") {
    overlayTransform = "translate-x-0";
  } else if (transition.phase === "exiting") {
    overlayTransform =
      transition.dir === "next" ? "translate-x-full" : "-translate-x-full";
  }

  const overlayDuration =
    transition.phase === "idle"
      ? "duration-0"
      : "duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)]";

  return (
    <div className="min-h-screen mt-10 bg-white dark:bg-slate-950 font-sans text-[#1a1a24] overflow-hidden flex flex-col relative selection:bg-pink-200">
      <div
        className={`absolute inset-0 z-20 flex pointer-events-none transition-transform ${overlayDuration} ${overlayTransform}`}
      >
        <div className="w-full lg:w-[35%] h-full bg-slate-950 dark:bg-white"></div>
        <div className="hidden lg:block w-[65%] h-full bg-primary"></div>
      </div>

      <main
        className={`flex-1 w-full px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between relative z-10 mt-4 md:mt-0 ${transition.active ? "pointer-events-none" : ""}`}
      >
        <div className="w-full lg:w-[35%] pr-8 relative h-full flex flex-col justify-center min-h-[300px]">
          {selectedCard ? (
            <div
              key={`detail-${selectedCard.id}`}
              className="animate-fade-in-up"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-green-500 uppercase mb-4">
                <MapPin size={16} className="fill-green-500 text-transparent" />
                {selectedCard.location}
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6 text-[#1c1936] dark:text-white">
                {selectedCard.name}
              </h1>

              <p className="text-[#4b5563] dark:text-slate-300 font-medium text-sm md:text-base max-w-sm mb-10 leading-relaxed">
                {selectedCard.description}
              </p>

              <NavLink to={`/hospital-profile/${selectedCard.id}`} className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 px-10 py-3.5 rounded-full font-semibold shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 inline-block text-center">
                View Details
              </NavLink>
            </div>
          ) : (
            <div
              key={`text-${currentIndex}`}
              className="animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#1c1936] dark:text-white">
                <span className="block">{currentSlide.titleLine1}</span>
                <span className="block">{currentSlide.titleLine2}</span>
              </h1>
              <p className="text-slate-850 dark:text-slate-200 font-medium text-sm md:text-base max-w-sm mb-10 leading-relaxed">
                {currentSlide.description}
              </p>
              <NavLink
                to="/hospitals"
                className="bg-gradient-to-r from-green-500 to-lime-500 text-white px-10 py-3.5 rounded-full font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
              >
                Explore Centers
              </NavLink>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 lg:pt-0">
          {currentSlide.cards.map((card, idx) => {
            const isSelected = selectedCard?.id === card.id;
            const opacityClass =
              selectedCard && !isSelected
                ? "opacity-60 scale-95"
                : "opacity-100";

            return (
              <div
                key={`${currentIndex}-${card.id}`}
                onClick={() => setSelectedCard(card)}
                className={`w-full aspect-[3/4] md:h-[450px] lg:h-[500px] rounded-xl relative overflow-hidden group shadow-xl shadow-black/10 animate-fade-in-right cursor-pointer transition-all duration-500 ${opacityClass}`}
                style={{ animationDelay: `${idx * 150 + 400}ms` }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}
                />
                <div
                  className={`absolute inset-0 transition-all duration-500 ${isSelected ? "bg-black/40" : "bg-gradient-to-t from-[#1c1936]/90 via-[#1c1936]/20 to-transparent opacity-80"}`}
                />

                <div
                  className={`absolute bottom-6 left-6 right-6 text-white z-10 transition-transform duration-500 ${isSelected ? "-translate-y-2" : ""}`}
                >
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2 tracking-tight leading-tight">
                    {card.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-bold tracking-widest text-green-400 uppercase">
                    <MapPin
                      size={12}
                      className="fill-green-400 text-transparent"
                    />
                    {card.location}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute inset-0 border-4 border-white/30 rounded-sm pointer-events-none transition-all duration-500"></div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="relative w-full px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between z-30">
        <div className="flex items-center gap-8">
          <div className="text-xs font-bold tracking-widest text-[#1a1a24] dark:text-slate-200">
            0{currentIndex + 1}{" "}
            <span className="text-gray-400 dark:text-slate-400 mx-1">/</span> 0
            {slides.length}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => changeSlide("prev")}
              disabled={transition.active}
              className="w-10 h-10 rounded-full border border-gray-400 text-gray-600 dark:text-slate-200 flex items-center justify-center hover:bg-[#1c1936] dark:hover:bg-slate-200 hover:text-white dark:hover:text-black hover:border-[#1c1936] transition-all disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => changeSlide("next")}
              disabled={transition.active}
              className="w-10 h-10 rounded-full border border-gray-400 text-gray-600 dark:text-slate-200 flex items-center justify-center hover:bg-[#1c1936] dark:hover:bg-slate-200 hover:text-white dark:hover:text-black hover:border-[#1c1936] transition-all disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `,
        }}
      />
    </div>
  );
}
