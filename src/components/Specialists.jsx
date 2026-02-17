import SpecialistCard from "./SpecialistCard";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Specialists() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      specialist: "Cardiologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.9,
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Dr. Marcus Chen",
      specialist: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.7,
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "Dr. Elena Rodriguez",
      specialist: "Pediatrician",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 5.0,
      location: "Miami, FL",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialist: "Neurologist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.8,
      location: "Chicago, IL",
    },
    {
      id: 5,
      name: "Dr. Amara Okafor",
      specialist: "Orthopedic Surgeon",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.6,
      location: "Houston, TX",
    },
    {
      id: 6,
      name: "Dr. Leo Maxwell",
      specialist: "Psychiatrist",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.9,
      location: "Seattle, WA",
    },
    {
      id: 7,
      name: "Dr. Sophia Kwok",
      specialist: "Ophthalmologist",
      image:
        "https://images.unsplash.com/photo-1527613477287-4160001656c1?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.7,
      location: "Boston, MA",
    },
    {
      id: 8,
      name: "Dr. Robert Halloway",
      specialist: "General Practitioner",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.5,
      location: "Denver, CO",
    },
    {
      id: 9,
      name: "Dr. Nina Gupta",
      specialist: "Endocrinologist",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.8,
      location: "Atlanta, GA",
    },
    {
      id: 10,
      name: "Dr. Oliver Vance",
      specialist: "Urologist",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.6,
      location: "Phoenix, AZ",
    },
  ];
  return (
    <section
      className=" pt-24 md:pt-40 pb-10 md:pb-16 relative bg-white dark:bg-slate-950"
      id="doctors"
    >
      <div className="mx-auto max-w-7xl relative z-10 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
              TOP <span className="text-primary">SPECIALISTS</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              Meet the pioneers redefining healthcare through emerald-standard
              innovation and clinical mastery.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full relative py-16 md:py-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={-30}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-10 mb-12 doctor-swiper"
        >
          {doctors.map((doc) => (
            <SwiperSlide key={doc.id} className="h-auto">
              <SpecialistCard doctor={doc} className="mx-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
