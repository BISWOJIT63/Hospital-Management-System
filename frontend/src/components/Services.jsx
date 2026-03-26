import {
  Stethoscope,
  UserRound,
  Activity,
  HeartPulse,
  Apple,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { MOCK_SERVICES } from "../utils/MockData";

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="group relative flex-[1] hover:flex-[3] md:hover:flex-[4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden rounded-2xl md:min-w-[80px] min-h-[60px] md:min-h-0 w-full md:w-auto md:h-full">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-colors duration-500" />

      <div className="absolute inset-0 flex items-center md:items-end justify-center md:pb-12 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <h3 className="whitespace-nowrap uppercase tracking-widest font-semibold text-base md:text-xl md:[writing-mode:vertical-rl] md:rotate-180 text-white/90">
          {service.title}
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
        <div className="flex items-center gap-3 md:gap-5 mb-2 md:mb-4">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-green-500/20 shrink-0">
            <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-3xl font-extrabold text-white leading-tight truncate">
              {service.title}
            </h3>
            {service.providerName && (
              <p className="text-green-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                By {service.providerName}
              </p>
            )}
          </div>
        </div>
        <p className="text-gray-300 text-sm md:text-base max-w-lg leading-relaxed line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
};

const ServiceSectionSkeleton = () => (
  <div className="w-full h-[600px] md:h-[400px] flex flex-col md:flex-row gap-3 md:gap-4 px-0 md:px-6 animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div 
        key={i} 
        className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-2xl relative overflow-hidden shimmer"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-10 left-6 right-6 space-y-3">
           <div className="h-2 w-1/3 bg-gray-200 dark:bg-slate-700/50 rounded"></div>
           <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700/50 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function Services({ useMock = false }) {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
       try {
        let data = [];
        if (useMock) {
          data = MOCK_SERVICES;
        } else {
          const res = await api.getServices();
          data = res.data || (Array.isArray(res) ? res : []);
        }

        const fallbackIcons = [Stethoscope, UserRound, Activity, HeartPulse, Apple];
        const fallbackImages = [
          "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1584432830680-aa204f6e355c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1581578731522-aa7c04e28e83?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
        ];

        let mappedServices = data.map((s, idx) => ({
          id: s._id || idx,
          title: s.title || s.name || "Service",
          description: s.description || "Professional medical service.",
          image: (s.images && s.images[0]) || s.image || fallbackImages[idx % fallbackImages.length],
          icon: fallbackIcons[idx % fallbackIcons.length],
          providerName: s.doctorId?.name ? `Dr. ${s.doctorId.name}` : s.facilityId?.name || null,
        }));

        setServicesData(mappedServices.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [useMock]);

  return (
    <section
      className="px-6 py-24 md:py-32 lg:px-20 bg-white dark:bg-[#020617]"
      id="hospitals"
    >
      <div className="mx-auto max-w-7xl relative">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
              SERVICES <span className="text-primary italic">FOR YOU</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium">
              Choose Services and book now According
              To Your Concern
            </p>
          </div>
          <NavLink to="/services"  className="w-full md:w-auto px-8 md:px-10 py-4 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white text-primary font-black uppercase tracking-widest transition-all text-sm">
            VIEW ALL
          </NavLink>
        </div>
        <div className="w-full max-w-7xl relative z-10">
          {loading ? (
             <ServiceSectionSkeleton />
          ) : (
            <div className="w-full h-[600px] md:h-[400px] flex flex-col md:flex-row gap-3 md:gap-4 px-0 md:px-6">
               {servicesData.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.1) 50%, 
            rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }

        .dark .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.05) 50%, 
            rgba(255,255,255,0) 100%);
        }
      `,
        }}
      />
    </section>
  );
}

