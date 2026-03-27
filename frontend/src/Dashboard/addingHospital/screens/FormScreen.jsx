import React from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Toast } from "../components/UI";
import { STEPS } from "../constants";


import StepBasic from "../steps/StepBasic";
import StepDepts from "../steps/StepDepts";
import StepSvcDocs from "../steps/StepSvcDocs";
import StepFacilities from "../steps/StepFacilities";
import StepAwards from "../steps/StepAwards";
import StepServices from "../steps/StepServices";
import StepReview from "../steps/StepReview";

export default function FormScreen({
  user,
  entityType,
  step,
  setStep,
  formData,
  update,
  updateArr,
  addItem,
  removeItem,
  toggleArr,
  previews,
  handleImages,
  removeImage,
  errors,
  validateStep,
  toast,
  onSubmit,
  servicesList,
  setServicesList,
  isSubmitting,
}) {
  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-[#080d1a] font-sans pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-16">
        <div className="mb-10 text-center sm:text-left animate-in slide-in-from-top-4 fade-in duration-500">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
            Register Your {entityType === "hospital" ? "Hospital" : "Clinic"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Fill in all sections to submit your listing for approval.
          </p>
        </div>

        { }
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start overflow-x-auto hide-scrollbar">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center ${i < STEPS.length - 1 ? "flex-1 min-w-[120px] " : "flex-none"}`}
            >
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${i < step
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : i === step
                        ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-slate-200 dark:border-slate-700"
                    }`}
                >
                  {i < step ? <Check size={18} strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap hidden sm:block
                  ${i === step ? "text-green-600 dark:text-green-400" : i < step ? "text-emerald-500 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2  sm:-mt-4 rounded-full transition-colors
                  ${i < step ? "bg-emerald-400 dark:bg-emerald-500" : "bg-slate-100 dark:bg-slate-800"}`}
                />
              )}
            </div>
          ))}
        </div>

        { }
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-10 mb-8 overflow-hidden">
          <div className="min-h-[400px]">
            {step === 0 && (
              <StepBasic
                fd={formData}
                update={update}
                errors={errors}
                previews={previews}
                handleImages={handleImages}
                removeImage={removeImage}
                entityType={entityType}
              />
            )}
            {step === 1 && (
              <StepDepts
                fd={formData}
                updateArr={updateArr}
                addItem={addItem}
                removeItem={removeItem}
                toggleArr={toggleArr}
              />
            )}
            {step === 2 && (
              <StepSvcDocs
                fd={formData}
                updateArr={updateArr}
                addItem={addItem}
                removeItem={removeItem}
              />
            )}
            {step === 3 && (
              <StepFacilities
                fd={formData}
                updateArr={updateArr}
                toggleArr={toggleArr}
              />
            )}
            {step === 4 && (
              <StepAwards
                fd={formData}
                updateArr={updateArr}
                addItem={addItem}
                removeItem={removeItem}
              />
            )}
            {step === 5 && (
              <StepServices
                servicesList={servicesList}
                setServicesList={setServicesList}
              />
            )}
            {step === 6 && (
              <StepReview
                fd={formData}
                entityType={entityType}
                previews={previews}
              />
            )}
          </div>
        </div>


          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`px-6 py-3 rounded-xl border-2 text-sm font-bold flex items-center gap-2 transition-all
                ${step === 0
                  ? "border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              <ChevronLeft size={18} />{" "}
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400">
              Step {step + 1} of {STEPS.length}
            </div>

            {step < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-500/30 flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Continue</span>{" "}
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={onSubmit}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <Check size={18} /> Submit
              </button>
            )}
          </div>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
