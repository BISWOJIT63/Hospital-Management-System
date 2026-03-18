import React, { useState, useCallback } from "react";
import { Toast } from "./components/UI";
import { baseTemplate } from "./constants";
import { api } from "../../utils/api";


import SelectTypeScreen from "./screens/SelectTypeScreen";
import FormScreen from "./screens/FormScreen";




export default function AddHospital({ user, onSuccess, initialData = null }) {
  const [screen, setScreen] = useState(initialData ? "form" : "select");
  const [entityType, setEntity] = useState(initialData ? initialData.type?.toLowerCase() : null);
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...baseTemplate(),
        ...initialData,
        location: initialData.address || initialData.location || "",
        about: initialData.description || initialData.about || "",
      };
    }
    return baseTemplate();
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [servicesList, setServicesList] = useState([]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };


  const handleSelect = (type) => {
    setEntity(type);
    setFormData({ ...baseTemplate(), type });
    setPreviews([]);
    setStep(0);
    setErrors({});
    setScreen("form");
  };


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


    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64Url = ev.target.result;
        setPreviews(prev => {
          const remaining = 5 - prev.length;
          if (remaining <= 0) return prev;

          const merged = [...prev, base64Url];
          update("images", merged);
          return merged;
        });
      };
      reader.readAsDataURL(file);
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


  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!formData.name.trim()) e.name = "Facility name is required";
      if (!formData.city?.trim()) e.city = "City is required";
      if (!formData.location.trim()) e.location = "Location is required";
      if (!formData.email?.trim()) e.email = "Email is required";
      if (!formData.phone?.trim()) e.phone = "Phone is required";
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

      // Prepare data for backend
      const submissionData = {
        ...formData,
        type: entityType === "hospital" ? "Hospital" : "Clinic",
        address: formData.location, // Map location to address
        description: formData.about, // Map about to description
        doctors: Array.isArray(formData.doctors) ? formData.doctors : [],
        keyDoctors: Array.isArray(formData.keyDoctors) ? formData.keyDoctors : [],
        departments: Array.isArray(formData.departments) ? formData.departments : [],
        awards: Array.isArray(formData.awards) ? formData.awards : [],
      };

      const facility = await api.createFacility(submissionData, token);
      const facilityId = facility?._id || facility?.data?._id || facility?.facility?._id;

      if (servicesList.length > 0 && facilityId) {
        await Promise.all(
          servicesList
            .filter((s) => s.name.trim())
            .map((s) => api.createService({ ...s, facilityId }))
        );
      }

      showToast("Facility submitted successfully!");
      if (onSuccess) setTimeout(onSuccess, 1000);
    } catch (err) {
      showToast(err.message || "Failed to submit facility", "error");
      setSubmitting(false);
    }
  };


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
          servicesList={servicesList}
          setServicesList={setServicesList}
        />
      )}
    </>
  );
}