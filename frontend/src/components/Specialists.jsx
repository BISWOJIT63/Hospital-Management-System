import SpecialistCard from "./SpecialistCard";
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { NavLink } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Neurologist",
    description:
      "Expert in treating complex neurological disorders with over 15 years of clinical experience.",
    fee: "$250",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    description:
      "Our leading cardiologist offering unparalleled expertise in heart health and preventive care.",
    fee: "$199",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrician",
    description:
      "Dedicated to providing compassionate and comprehensive healthcare for infants and children.",
    fee: "$150",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1594824436998-058b231b145a?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 4,
    name: "Dr. Michael Chang",
    specialty: "Orthopedic",
    description:
      "Specializing in sports medicine and advanced joint replacement surgeries.",
    fee: "$220",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 5,
    name: "Dr. Olivia Martinez",
    specialty: "Dermatologist",
    description:
      "Committed to helping you achieve healthy, glowing skin through personalized treatments.",
    fee: "$180",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300&h=300",
  },
];
export default function Specialists() {
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  return (
    <section
      className=" pt-24 md:pt-40 pb-10 md:pb-16 relative bg-white dark:bg-slate-950"
      id="doctors"
    >
      <div className="mx-auto relative z-10 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
              TOP <span className="text-primary">SPECIALISTS</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              Meet the pioneers redefining healthcare through emerald-standard
              innovation and clinical mastery.
            </p>
          </div>
          <NavLink
            to="/doctors"
            className="w-full md:w-auto px-8 md:px-10 py-4 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white text-primary font-black uppercase tracking-widest transition-all text-sm"
          >
            VIEW ALL
          </NavLink>
        </div>
      </div>
      <div className="relative py-5 md:py-10 ">
        <SpecialistCard DOCTORS={DOCTORS} />
      </div>
    </section>
  );
}
