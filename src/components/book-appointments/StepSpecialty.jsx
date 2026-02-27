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
  const AVAILABLE_DOCTORS = [
    // General Practice
    {
      id: "gp1",
      specialty: "gp",
      name: "Dr. Sarah Wilson",
      role: "Chief Medical Officer",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.9",
      exp: "15+ Years",
      patients: "2.5k+",
    },
    {
      id: "gp2",
      specialty: "gp",
      name: "Dr. Mark Johnson",
      role: "Senior GP",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.7",
      exp: "8+ Years",
      patients: "1.2k+",
    },

    // Cardiology
    {
      id: "cardio1",
      specialty: "cardio",
      name: "Dr. James Chen",
      role: "Head of Cardiology",
      image:
        "https://images.unsplash.com/photo-1537368910025-bc005ca68d5d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "5.0",
      exp: "20+ Years",
      patients: "3k+",
    },
    {
      id: "cardio2",
      specialty: "cardio",
      name: "Dr. Anita Patel",
      role: "Cardiologist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.8",
      exp: "12+ Years",
      patients: "1.8k+",
    },

    // Dermatology
    {
      id: "derma1",
      specialty: "derma",
      name: "Dr. Emily Parker",
      role: "Senior Dermatologist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.9",
      exp: "12+ Years",
      patients: "2.1k+",
    },
    {
      id: "derma2",
      specialty: "derma",
      name: "Dr. John Davis",
      role: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.6",
      exp: "6+ Years",
      patients: "900+",
    },

    // Orthopedics
    {
      id: "ortho1",
      specialty: "ortho",
      name: "Dr. Michael Chang",
      role: "Orthopedic Surgeon",
      image:
        "https://images.unsplash.com/photo-1637059824899-a441006a96be?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.9",
      exp: "18+ Years",
      patients: "4k+",
    },

    // Neurology
    {
      id: "neuro1",
      specialty: "neuro",
      name: "Dr. Robert Solis",
      role: "Lead Neurologist",
      image:
        "https://images.unsplash.com/photo-1588776814546-1b44f94055f1?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.9",
      exp: "16+ Years",
      patients: "2.2k+",
    },

    // Pediatrics
    {
      id: "peds1",
      specialty: "peds",
      name: "Dr. Lisa Hayes",
      role: "Head of Pediatrics",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "5.0",
      exp: "14+ Years",
      patients: "3.5k+",
    },

    // Ophthalmology
    {
      id: "opth1",
      specialty: "opth",
      name: "Dr. David Kim",
      role: "Ophthalmology Lead",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.8",
      exp: "10+ Years",
      patients: "1.5k+",
    },

    // Dentistry
    {
      id: "dental1",
      specialty: "dental",
      name: "Dr. Amanda Lee",
      role: "Senior Dentist",
      image:
        "https://images.unsplash.com/photo-1537368910025-bc005ca68d5d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: "4.9",
      exp: "11+ Years",
      patients: "2k+",
    },
  ];
  // Filter doctors based on selected specialty
  const availableDoctors = specialty
    ? AVAILABLE_DOCTORS.filter((d) => d.specialty === specialty)
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
          // 2. Specialty Selected - Show Available Doctors List
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
          // 3. Nothing Selected Placeholder
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

      {/* Specialties Grid (Always Visible) */}
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
