import { CheckCircle, MapPin, Video } from "lucide-react";
import StepHeader from "./StepHeader";

export default function StepType({ selected, onSelect }) {
  const APPOINTMENT_TYPES = [
    {
      id: "in-person",
      title: "In-Clinic Visit",
      icon: MapPin,
      price: "₹2699",
      desc: "Face-to-face consultation with the doctor at our facility.",
    },
    {
      id: "video",
      title: "Video Consultation",
      icon: Video,
      price: "₹1699",
      desc: "Secure video call from the comfort of your home.",
    },
  ];
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader
        title="Appointment Type"
        subtitle="Choose how you want to connect with the doctor."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {APPOINTMENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                relative flex items-start text-left p-6 rounded-2xl border-2 transition-all duration-200
                ${isSelected
                  ? "border-emerald-500  shadow-md ring-1 ring-emerald-500"
                  : "border-slate-100 dark:border-slate-800  hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg"
                }
              `}
            >
              <div
                className={`
                p-4 rounded-xl mr-5 shrink-0 transition-colors
                ${isSelected ? "bg-emerald-500 text-white" : " border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}
              `}
              >
                <Icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {type.title}
                  </h3>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">
                    {type.price}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {type.desc}
                </p>
                
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
