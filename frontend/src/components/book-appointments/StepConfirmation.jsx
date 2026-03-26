import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Building2,
  MapPin,
  ArrowRight,
  Stethoscope,
  Heart,
  Activity,
  Bone,
  Brain,
  Baby,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SPECIALTIES = [
  { id: "gp", name: "General Practice", icon: Stethoscope },
  { id: "cardio", name: "Cardiology", icon: Heart },
  { id: "derma", name: "Dermatology", icon: Activity },
  { id: "ortho", name: "Orthopedics", icon: Bone },
  { id: "neuro", name: "Neurology", icon: Brain },
  { id: "peds", name: "Pediatrics", icon: Baby },
  { id: "opth", name: "Ophthalmology", icon: Eye },
  { id: "dental", name: "Dentistry", icon: ShieldCheck },
];

export default function StepConfirmation({ data, providerState }) {
  const navigate = useNavigate();
  const specialtyName = SPECIALTIES.find((s) => s.id === data.specialty)?.name;

  // Resolve the actual provider from state
  const provider =
    providerState?.hospital ||
    providerState?.clinic ||
    providerState?.doctor ||
    data.doctor;
  const isDoctor = !!(
    providerState?.doctor ||
    (!providerState?.hospital && !providerState?.clinic && data.doctor)
  );
  const isClinic = !!providerState?.clinic;
  const isHospital = !!providerState?.hospital;

  const providerName = provider?.name || "—";
  const providerSub = isDoctor
    ? provider?.specialty || provider?.role || specialtyName || "Specialist"
    : provider?.type || (isClinic ? "Clinic" : "Hospital");
  const providerLocation = isDoctor
    ? provider?.priceRange
      ? `Consultation: ${provider.priceRange}`
      : null
    : provider?.location || provider?.address;

  const providerImage = provider?.images?.[0] || provider?.image;

  // Stable booking reference
  const ref = `#HG-${String(Date.now()).slice(-6)}`;

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
          {providerName}
        </span>
        {specialtyName && ` (${specialtyName})`} has been successfully
        scheduled.
        {data.patientInfo?.email && (
          <>
            {" "}
            We've sent a confirmation to{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {data.patientInfo.email}
            </span>
            .
          </>
        )}
      </p>

      {/* Booking details card */}
      <div className="bg-slate-50 dark:bg-black rounded-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-700 mb-8 text-left">
        {/* Reference */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400 text-sm">
            Booking Reference
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {ref}
          </span>
        </div>

        <div className="space-y-4">
          {/* Provider */}
          <div className="flex items-start gap-3">
            {providerImage ? (
              <img
                src={providerImage}
                alt={providerName}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                {isDoctor ? (
                  <User className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Building2 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
            )}
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {providerName}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {providerSub}
              </p>
              {providerLocation && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {providerLocation}
                </p>
              )}
            </div>
          </div>

          {/* Service */}
          {(specialtyName || data.type) && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {specialtyName || "Service"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {data.type || "Consultation"}
                </p>
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {data.date?.month} {data.date?.date}, 2026
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {data.time}
              </p>
            </div>
          </div>

          {/* Patient */}
          {(data.patientInfo?.firstName || data.patientInfo?.lastName) && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {data.patientInfo.firstName} {data.patientInfo.lastName}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {data.patientInfo.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Download Receipt
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          Back to Home <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
