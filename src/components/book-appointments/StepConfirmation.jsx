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

export default function StepConfirmation({ data }) {
  const specialtyName = SPECIALTIES.find((s) => s.id === data.specialty)?.name;

  return (
    <div className="flex flex-col items-center text-center justify-center h-full py-8 animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
        <CheckCircle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
        Booking Confirmed!
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
        Your appointment with{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {data.doctor?.name}
        </span>{" "}
        ({specialtyName}) has been successfully scheduled. We've sent a
        confirmation email to{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {data.patientInfo.email}
        </span>
        .
      </p>

      <div className="bg-slate-50 dark:bg-black  rounded-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-700 mb-8">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400 text-sm">Booking Reference</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            #HG-{Math.floor(100000 + Math.random() * 900000)}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-left">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {data.doctor?.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{data.doctor?.role}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-left">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {data.date?.month} {data.date?.date}, 2026
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {data.date?.day} at {data.time}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-left">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">HealthGreen Clinic</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                123 Medical Plaza, Suite 400
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Download Receipt
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          Book Another Appointment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
