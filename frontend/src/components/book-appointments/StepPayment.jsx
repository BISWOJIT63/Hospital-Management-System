import { Baby, Bone, Brain, CreditCard, Eye, Heart, MapPin, ShieldCheck, Stethoscope, Video } from "lucide-react";
import StepHeader from "./StepHeader";
import { Activity } from "react";
const APPOINTMENT_TYPES = [
  {
    id: "in-person",
    title: "In-Clinic Visit",
    icon: MapPin,
    price: "$120",
    desc: "Face-to-face consultation with the doctor at our facility.",
  },
  {
    id: "video",
    title: "Video Consultation",
    icon: Video,
    price: "$80",
    desc: "Secure video call from the comfort of your home.",
  },
];
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
export default function StepPayment({ data, summary, onChange }) {
  const selectedType = APPOINTMENT_TYPES.find((t) => t.id === summary.type);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader title="Payment" subtitle="Complete your booking securely." />

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Payment Method Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
            <button
              onClick={() => onChange("method", "card")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${data.method === "card" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
            >
              Credit Card
            </button>
            <button
              onClick={() => onChange("method", "insurance")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${data.method === "insurance" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
            >
              Insurance
            </button>
          </div>

          {data.method === "card" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={data.cardNumber}
                    onChange={(e) => onChange("cardNumber", e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                  <CreditCard className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={data.expiry}
                    onChange={(e) => onChange("expiry", e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={data.cvc}
                    onChange={(e) => onChange("cvc", e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}

          {data.method === "insurance" && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Please bring your insurance card to the appointment.
              </p>
              <button className="text-emerald-600 dark:text-emerald-500 font-medium text-sm hover:underline">
                Upload Insurance Card Photo (Optional)
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-80  p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-fit">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Booking Summary</h3>
          <div className="space-y-3 text-sm border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Service</span>
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {SPECIALTIES.find((s) => s.id === summary.specialty)?.name ||
                  "-"}
              </span>
            </div>
            {summary.doctor && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Doctor</span>
                <span className="font-medium text-slate-900 dark:text-slate-200 text-right">
                  {summary.doctor.name}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Type</span>
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {selectedType?.title || "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Date</span>
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {summary.date?.month} {summary.date?.date}, {summary.time}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-900 dark:text-white text-lg">Total</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-500 text-xl">
              {selectedType?.price || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
