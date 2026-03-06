import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../../utils/api";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import StepSpecialty from "./StepSpecialty";
import StepType from "./StepType";
import StepDateTime from "./StepDateTime";
import StepInfo from "./StepInfo";
import StepPayment from "./StepPayment";
import StepConfirmation from "./StepConfirmation";

export default function Appointments() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("forward");
  const [formData, setFormData] = useState({
    specialty: null,
    doctor: null,
    type: null,
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

  const nextStep = () => {
    setDirection("forward");
    setStep((prev) => Math.min(prev + 1, 6));
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
        return !!formData.specialty && !!formData.doctor;
      case 2:
        return !!formData.type;
      case 3:
        return !!formData.date && !!formData.time;
      case 4:
        return (
          formData.patientInfo.firstName &&
          formData.patientInfo.lastName &&
          formData.patientInfo.phone &&
          formData.patientInfo.email
        );
      case 5:
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
      // Map mapping state matching backend Appointment schema 
      const appointmentPayload = {
        providerId: formData.doctor.id || formData.doctor._id,
        providerType: 'Doctor', // Currently the UI defaults to selecting Doctors
        service: formData.specialty + " Consultation - " + formData.type,
        date: `${formData.date?.month} ${formData.date?.date}, 2026`,
        time: formData.time,
        notes: formData.patientInfo.notes
      };

      const res = await api.createAppointment(appointmentPayload);
      if (res.success || res.status === 201) {
        setDirection("forward");
        setStep(6);
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
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
            <p className="font-bold">Booking Error</p>
            <p>{errorMsg}</p>
          </div>
        )}
        <div className="mb-8 mt-0">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 5) * 100}%` }}
            ></div>

            {[1, 2, 3, 4, 5, 6].map((num) => {
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
                      ["Specialty", "Type", "Time", "Info", "Payment", "Done"][
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
              <StepSpecialty
                specialty={formData.specialty}
                doctor={formData.doctor}
                onSelectSpecialty={(id) => updateData("root", "specialty", id)}
                onSelectDoctor={(doc) => updateData("root", "doctor", doc)}
              />
            )}
            {step === 2 && (
              <StepType
                selected={formData.type}
                onSelect={(id) => updateData("root", "type", id)}
              />
            )}
            {step === 3 && (
              <StepDateTime
                date={formData.date}
                time={formData.time}
                onDateSelect={(d) => updateData("root", "date", d)}
                onTimeSelect={(t) => updateData("root", "time", t)}
              />
            )}
            {step === 4 && (
              <StepInfo
                data={formData.patientInfo}
                onChange={(key, val) => updateData("patientInfo", key, val)}
              />
            )}
            {step === 5 && (
              <StepPayment
                data={formData.payment}
                summary={formData}
                onChange={(key, val) => updateData("payment", key, val)}
              />
            )}
            {step === 6 && <StepConfirmation data={formData} />}
          </div>

          { }
          {step < 6 && (
            <div className="p-6 bg-slate-50 border-t border-slate-100 dark:border-slate-500 dark:bg-black flex justify-between items-center">
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
                onClick={step === 5 ? handleConfirm : nextStep}
                disabled={!isStepValid() || loading}
                className={`
                  flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all
                  ${(!isStepValid() || loading)
                    ? "bg-slate-200 dark:bg-slate-600 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/30 transform hover:-translate-y-0.5"
                  }
                `}
              >
                {step === 5 ? (
                  loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing</> : "Confirm Booking"
                ) : (
                  <>Continue <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
