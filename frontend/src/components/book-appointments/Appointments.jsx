import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../../utils/api";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Building2,
  User,
  Star,
  MapPin,
  Clock,
  CreditCard,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import StepSpecialty from "./StepSpecialty";
import StepType from "./StepType";
import StepDateTime from "./StepDateTime";
import StepInfo from "./StepInfo";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";
import StepBookingEntry from "./StepBookingEntry";
import StepFacilitySelection from "./StepFacilitySelection";
import StepServiceSelection from "./StepServiceSelection";

// Renders a summary banner for the selected provider (hospital/clinic/doctor)
function ProviderBanner({ state }) {
  if (!state) return null;

  const { hospital, clinic, doctor } = state;
  const provider = hospital || clinic || doctor;
  if (!provider) return null;

  const isHospital = !!hospital;
  const isClinic = !!clinic;
  const isDoctor = !!doctor;

  const image = provider.images?.[0] || provider.image || null;
  const name = provider.name;
  const subtitle = isDoctor
    ? provider.specialty || provider.role || "Specialist"
    : provider.type || (isClinic ? "Clinic" : "Hospital");
  const detail1 = isDoctor
    ? provider.priceRange || provider.consultationFee
    : provider.location || provider.address;
  const detail2 = isDoctor
    ? provider.experience
    : (typeof provider.rating === "object" ? (provider.rating?.average ? `${provider.rating.average.toFixed(1)} ★` : null) : (provider.rating ? `${provider.rating} ★` : null));

  return (
    <div className="mb-6 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl overflow-hidden shadow-lg">
      <div className="flex items-center gap-5 p-5">
        {/* Avatar / Image */}
        <div className="shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
              {isDoctor ? (
                <User className="w-8 h-8 text-emerald-300" />
              ) : (
                <Building2 className="w-8 h-8 text-emerald-300" />
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider">
              {isDoctor ? "Doctor" : isClinic ? "Clinic" : "Hospital"}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg truncate">{name}</h3>
          <p className="text-emerald-200 text-sm">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-emerald-100/70">
            {detail1 && (
              <span className="flex items-center gap-1">
                {isDoctor ? <CreditCard className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                {detail1}
              </span>
            )}
            {detail2 && (
              <span className="flex items-center gap-1">
                {isDoctor ? <Clock className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                {detail2}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black/20 px-5 py-2 text-xs text-emerald-200/80">
        You're booking an appointment with this provider. Fill in the steps below to confirm.
      </div>
    </div>
  );
}


export default function Appointments() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const [formData, setFormData] = useState({
    bookingType: location.state?.doctor ? "doctor" : location.state?.service ? "service" : location.state?.hospital ? "hospital" : location.state?.clinic ? "clinic" : null,
    specialty: location.state?.doctor?.specialty || location.state?.service?.category || null,
    doctor: location.state?.doctor || location.state?.hospital || location.state?.clinic || null,
    type: location.state?.service?.name || null,
    date: null,
    time: null,
    patientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      notes: "",
    },
    payment: {
      method: "card",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    
    if (location.state?.service) {
      setStep(4);
    } else if (location.state?.doctor || location.state?.hospital || location.state?.clinic) {
      setStep(3);
    } else {
      setStep(1);
    }
    
    hasInitialized.current = true;
  }, [location.state]);

  const nextStep = () => {
    setDirection("forward");
    setStep((prev) => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateData = (section, key, value) => {
    if (section === "root") {
      setFormData((prev) => {
        if (key === "specialty" && prev.specialty !== value) {
          return { ...prev, [key]: value, doctor: null };
        }
        return { ...prev, [key]: value };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.bookingType;
      case 2:
        if (formData.bookingType === "doctor") return !!formData.specialty && !!formData.doctor;
        return !!formData.doctor; // For Hospital/Clinic selection
      case 3:
        return !!formData.type;
      case 4:
        return !!formData.date && !!formData.time;
      case 5:
        return (
          formData.patientInfo.firstName &&
          formData.patientInfo.lastName &&
          formData.patientInfo.phone &&
          formData.patientInfo.email
        );
      case 6:
        return true;
      default:
        return true;
    }
  };

  const handleConfirm = async () => {
    if (!isAuthenticated || user?.role !== 'Patient') {
      setErrorMsg("You must be logged in as a Patient to book. Please login or check your account role.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    try {
      // Determine provider type
      let pType = 'Doctor';
      if (location.state?.hospital || location.state?.clinic) {
        pType = 'Facility';
      }

      // Resolve providerId from all possible sources
      const stateProvider = location.state?.hospital || location.state?.clinic || location.state?.doctor;
      const providerId =
        stateProvider?._id ||
        stateProvider?.id ||
        formData.doctor?._id ||
        formData.doctor?.id ||
        location.state?.service?.providerId ||
        null;

      // Provider name as fallback when no DB id available
      const providerName = stateProvider?.name || formData.doctor?.name || null;

      // Build service name
      const svcName = formData.specialty
        ? `${formData.specialty}${formData.type ? ` - ${formData.type}` : ''}`
        : (formData.type || providerName || 'Consultation');

      // Format date string
      const dateStr = formData.date
        ? `${formData.date.month} ${formData.date.date}, 2026`
        : '';

      const appointmentPayload = {
        providerId,
        providerName,
        providerType: pType,
        service: svcName,
        date: dateStr,
        time: formData.time,
        notes: formData.patientInfo?.notes || ''
      };

      // Validate — only block if truly no provider context at all
      const missing = [];
      if (!stateProvider && !formData.doctor) missing.push('No provider selected — please go back and choose a doctor, hospital or clinic');
      if (!dateStr) missing.push('Appointment date not selected');
      if (!formData.time) missing.push('Appointment time not selected');

      if (missing.length > 0) {
        setErrorMsg('Please fix the following: ' + missing.join(' • '));
        setLoading(false);
        return;
      }

      const res = await api.createAppointment(appointmentPayload);
      if (res.success || res.status === 201) {
        setDirection("forward");
        setStep(7);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMsg(res.message || "Failed to confirm booking.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-gray-300">
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Provider context banner */}
        {step > 1 && step < 7 && <ProviderBanner state={location.state || { [formData.bookingType]: formData.doctor }} />}

        {/* Step progress bar */}
        <div className="mb-8 mt-0">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            ></div>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const isActive = step >= num;
              const isCurrent = step === num;
              return (
                <div
                  key={num}
                  className="flex flex-col items-center gap-2 px-2 transition-colors duration-300"
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2
                      ${isActive
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                      }
                      ${isCurrent ? "ring-4 ring-emerald-100 dark:ring-emerald-900/30" : ""}
                    `}
                  >
                    {isActive && num < step ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      num
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-slate-400 dark:text-slate-600"}`}
                  >
                    {
                      ["Entry", "Provider", "Service", "Time", "Info", "Payment", "Done"][
                      num - 1
                      ]
                    }
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-2xl shadow-xl shadow-emerald-900/5 border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[500px] flex flex-col transition-colors duration-300">
          <div className="p-6 md:p-8 flex-1">
            {step === 1 && (
              <StepBookingEntry 
                onSelect={(type) => {
                  updateData("root", "bookingType", type);
                  nextStep();
                }}
              />
            )}
            {step === 2 && (
              formData.bookingType === "doctor" ? (
                <StepSpecialty
                  specialty={formData.specialty}
                  doctor={formData.doctor}
                  onSelectSpecialty={(id) => updateData("root", "specialty", id)}
                  onSelectDoctor={(doc) => updateData("root", "doctor", doc)}
                />
              ) : formData.bookingType === "service" ? (
                <StepServiceSelection 
                  onSelect={(svc) => {
                    updateData("root", "type", svc.name);
                    // Fetch provider info if needed, or select provider next
                    nextStep();
                  }}
                />
              ) : (
                <StepFacilitySelection 
                  type={formData.bookingType} 
                  onSelect={(fac) => {
                    updateData("root", "doctor", fac);
                    nextStep();
                  }}
                />
              )
            )}
            {step === 3 && (
              <StepType
                selected={formData.type}
                onSelect={(id) => updateData("root", "type", id)}
              />
            )}
            {step === 4 && (
              <StepDateTime
                date={formData.date}
                time={formData.time}
                onDateSelect={(d) => updateData("root", "date", d)}
                onTimeSelect={(t) => updateData("root", "time", t)}
              />
            )}
            {step === 5 && (
              <StepInfo
                data={formData.patientInfo}
                onChange={(key, val) => updateData("patientInfo", key, val)}
              />
            )}
            {step === 6 && (
              <StepPayment
                data={formData.payment}
                summary={formData}
                providerState={location.state || { [formData.bookingType]: formData.doctor }}
                onChange={(key, val) => updateData("payment", key, val)}
              />
            )}
            {step === 7 && <StepConfirmation data={formData} providerState={location.state || { [formData.bookingType]: formData.doctor }} />}
          </div>

          {step < 7 && (
            <div className="border-t border-slate-100 dark:border-slate-500 dark:bg-black">
              {/* Inline error shown above the action buttons */}
              {errorMsg && (
                <div className="flex items-start gap-2 px-6 pt-4 text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-bottom-2 duration-300">
                  <X className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}
              <div className="p-6 bg-slate-50 dark:bg-black flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-colors
                    ${step === 1
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }
                  `}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={step === 6 ? handleConfirm : nextStep}
                  disabled={!isStepValid() || loading}
                  className={`
                    flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all
                    ${(!isStepValid() || loading)
                      ? "bg-slate-200 dark:bg-slate-600 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/30 transform hover:-translate-y-0.5"
                    }
                  `}
                >
                  {step === 6 ? (
                    loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing</> : "Confirm Booking"
                  ) : (
                    <>Continue <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
