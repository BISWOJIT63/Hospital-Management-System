import React, { useState, useEffect } from "react";
import {
  Stethoscope,
  Video,
  MapPin,
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Activity,
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  ArrowRight,
  Star,
  Award,
  Users,
  X,
} from "lucide-react";
import StepHeader from "./StepHeader";
import { api } from "../../utils/api";

export default function StepSpecialty({
  specialty,
  doctor,
  onSelectSpecialty,
  onSelectDoctor,
}) {
  const SPECIALTIES = [
    {
      id: "gp",
      name: "General Practice",
      icon: Stethoscope,
      desc: "Primary care & checkups",
    },
    {
      id: "cardio",
      name: "Cardiology",
      icon: Heart,
      desc: "Heart & vascular health",
    },
    {
      id: "derma",
      name: "Dermatology",
      icon: Activity,
      desc: "Skin, hair & nails",
    },
    { id: "ortho", name: "Orthopedics", icon: Bone, desc: "Bones & joints" },
    { id: "neuro", name: "Neurology", icon: Brain, desc: "Brain & nerves" },
    { id: "peds", name: "Pediatrics", icon: Baby, desc: "Child healthcare" },
    { id: "opth", name: "Ophthalmology", icon: Eye, desc: "Eye care" },
    {
      id: "dental",
      name: "Dentistry",
      icon: ShieldCheck,
      desc: "Teeth & oral health",
    },
  ];
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.getDoctors();
        if (res.success) {
          // Normalize formatting to map with existing UI keys
          const normalizedDocs = res.data.map(doc => ({
            id: doc.user?._id || doc._id,
            _id: doc.user?._id || doc._id,
            name: doc.user?.name || doc.name,
            specialty: (doc.specialty || 'gp').toLowerCase().includes('cardio') ? 'cardio' :
              (doc.specialty || 'gp').toLowerCase().includes('derma') ? 'derma' :
                (doc.specialty || 'gp').toLowerCase().includes('ortho') ? 'ortho' :
                  (doc.specialty || 'gp').toLowerCase().includes('neuro') ? 'neuro' :
                    (doc.specialty || 'gp').toLowerCase().includes('peds') ? 'peds' :
                      (doc.specialty || 'gp').toLowerCase().includes('opth') ? 'opth' :
                        (doc.specialty || 'gp').toLowerCase().includes('dent') ? 'dental' : 'gp',
            role: doc.specialty || "Specialist",
            image: doc.user?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
            rating: doc.ratings?.average ? doc.ratings.average.toFixed(1) : "5.0",
            exp: `${doc.experience || 5}+ Years`,
            patients: "1k+",
            facility: doc.facilityId
          }));
          setAllDoctors(normalizedDocs);
        }
      } catch (error) {
        console.error("Failed fetching docs for booking flow:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const availableDoctors = specialty
    ? allDoctors.filter((d) => d.specialty === specialty)
    : [];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader
        title="Select Specialist"
        subtitle="First choose a department, then select your preferred doctor."
      />

      <div className="mb-8 min-h-[180px]">
        {doctor ? (
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 border-emerald-700 rounded-2xl shadow-xl overflow-hidden animate-in zoom-in duration-300 relative group">
            <button
              onClick={() => onSelectDoctor(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-black rounded-full text-white transition-colors"
              title="Change Doctor"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-lg">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white text-emerald-800 text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  {doctor.rating}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left text-white">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="bg-emerald-500/30 text-emerald-100 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Selected
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
                <p className="text-emerald-100 mb-4 font-medium">
                  {doctor.role}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-emerald-50/80">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                    <Award className="w-4 h-4" />
                    <span>{doctor.exp}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4" />
                    <span>{doctor.patients} Patients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : specialty ? (

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 animate-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                Available Doctors
              </h3>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                {availableDoctors.length} Specialists Found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDoctor(doc)}
                  className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left group"
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full object-cover bg-slate-100 dark:bg-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {doc.role}
                    </p>
                  </div>
                  <div className="shrink-0 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  </div>
                </button>
              ))}
              {availableDoctors.length === 0 && (
                <div className="col-span-2 text-center py-8 text-slate-400 dark:text-slate-500">
                  No doctors currently available for this specialty.
                </div>
              )}
            </div>
          </div>
        ) : (

          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <User className="w-6 h-6 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Select a department below to view doctors
            </p>
          </div>
        )}
      </div>

      { }
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Departments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECIALTIES.map((spec) => {
            const Icon = spec.icon;
            const isSelected = specialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => onSelectSpecialty(spec.id)}
                className={`
                     flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all duration-200 group
                     ${isSelected
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm ring-1 ring-emerald-500"
                    : "border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-lg hover:shadow-emerald-900/5"
                  }
                  `}
              >
                <div
                  className={`
                     p-3 rounded-full mb-4 transition-colors
                     ${isSelected ? "bg-emerald-500 text-white" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50"}
                  `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`font-semibold mb-1 ${isSelected ? "text-emerald-900 dark:text-emerald-400" : "text-slate-900 dark:text-slate-200"}`}
                >
                  {spec.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{spec.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
