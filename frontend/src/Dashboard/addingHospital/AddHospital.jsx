import React, { useState, useCallback } from "react";
import { Toast } from "./components/UI";
import { baseTemplate } from "./constants";
import { api } from "../../utils/api";

// Screens
import SelectTypeScreen from "./screens/SelectTypeScreen";
import FormScreen from "./screens/FormScreen";

// ════════════════════════════════════════════════════════════════════════════
// FACILITY ONBOARDING COORDINATOR
// ════════════════════════════════════════════════════════════════════════════
export default function AddHospital({ user, onSuccess }) {
  const [screen, setScreen] = useState("select");
  const [entityType, setEntity] = useState(null);
  const [formData, setFormData] = useState(baseTemplate());
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // SELECT TYPE
  const handleSelect = (type) => {
    setEntity(type);
    setFormData({ ...baseTemplate(), type });
    setPreviews([]);
    setStep(0);
    setErrors({});
    setScreen("form");
  };

  // FORM ABSTRACTIONS
  const update = useCallback((field, value) => {
    setFormData(p => ({ ...p, [field]: value }));
    setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  }, []);

  const updateArr = useCallback((field, idx, sub, value) => {
    setFormData(p => {
      const a = [...p[field]];
      a[idx] = { ...a[idx], [sub]: value };
      return { ...p, [field]: a };
    });
  }, []);

  const addItem = (field, emptyFn) => setFormData(p => ({ ...p, [field]: [...p[field], emptyFn()] }));
  const removeItem = (field, idx) => setFormData(p => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));
  const toggleArr = (field, val) => setFormData(p => ({
    ...p, [field]: p[field].includes(val) ? p[field].filter(x => x !== val) : [...p[field], val]
  }));

  const handleImages = (e) => {
    const newFiles = Array.from(e.target.files);
    setPreviews(prev => {
      const remaining = 5 - prev.length;
      if (remaining <= 0) return prev;
      const newUrls = newFiles.slice(0, remaining).map(f => URL.createObjectURL(f));
      const merged = [...prev, ...newUrls];
      update("images", merged);
      return merged;
    });
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setPreviews(prev => {
      const next = prev.filter((_, i) => i !== idx);
      update("images", next);
      return next;
    });
  };

  // VALIDATION
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!formData.name.trim()) e.name = "Facility name is required";
      if (!formData.location.trim()) e.location = "Location is required";
      if (!formData.about.trim()) e.about = "Please describe your facility";
      if (formData.images.length < 1) e.images = "Upload at least 1 image";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await api.createFacility(formData, token);

      showToast("Facility submitted successfully!");

      // Tell parent (Admin.jsx) to refresh its facility state
      if (onSuccess) {
        setTimeout(onSuccess, 1000);
      }
    } catch (err) {
      showToast(err.message || "Failed to submit facility", "error");
      setSubmitting(false);
    }
  };

  // ROUTING
  return (
    <>
      {screen === "select" && <SelectTypeScreen user={user} onSelect={handleSelect} />}

      {screen === "form" && (
        <FormScreen
          user={user} entityType={entityType} step={step} setStep={setStep}
          formData={formData} update={update} updateArr={updateArr}
          addItem={addItem} removeItem={removeItem} toggleArr={toggleArr}
          previews={previews} handleImages={handleImages} removeImage={removeImage}
          errors={errors} validateStep={validateStep} toast={toast}
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />
      )}
    </>
  );
}