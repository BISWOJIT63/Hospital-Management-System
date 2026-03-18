import SpecialistCard from "./SpecialistCard";
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { NavLink } from "react-router-dom";
import { MOCK_DOCTORS } from "../utils/MockData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function Specialists({ useMock = false }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let data = [];
        if (useMock) {
          data = MOCK_DOCTORS;
        } else {
          const res = await api.getDoctors();
          data = res.data || res;
        }

        if (data && Array.isArray(data) && data.length > 0) {
          const formattedDoctors = data.map(d => ({
            id: d._id || d.id,
            name: d.name,
            specialty: d.specialty || 'Specialist',
            description: d.about || 'Dedicated to providing compassionate and comprehensive healthcare with advanced clinical mastery.',
            fee: d.consultationFee ? `₹${d.consultationFee}` : '$150',
            rating: d.rating || '5.0',
            image: d.image || d.avatar || d.profilePic || `https://images.unsplash.com/photo-1559839734-2b71ca197ec2?w=400&q=80`
          }));
          setDoctors(formattedDoctors);
        }
      } catch (error) {
        console.error("Failed to fetch specialists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <div className="py-20 text-center font-bold text-slate-500 uppercase tracking-widest">Loading Specialists...</div>;
  if (doctors.length === 0) return null;

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
        <SpecialistCard DOCTORS={doctors} />
      </div>
    </section>
  );
}
