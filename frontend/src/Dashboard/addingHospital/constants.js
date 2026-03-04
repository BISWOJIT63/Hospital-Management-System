// ── CONSTANTS & TEMPLATES ──────────────────────────────────────────────────

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const INSURANCES_LIST = [
  "Aetna",
  "green Cross",
  "Cigna",
  "United Health",
  "Humana",
  "Medicare",
  "Medicaid",
  "Tricare",
  "Kaiser",
  "Molina",
];

export const FACILITIES_LIST = [
  "ICU",
  "Emergency Room",
  "MRI",
  "CT Scan",
  "X-Ray",
  "Laboratory",
  "Pharmacy",
  "Cafeteria",
  "Parking",
  "WiFi",
  "Chapel",
  "NICU",
  "Surgery Center",
  "Physical Therapy",
  "Radiology",
];

export const DEPT_SUGGESTIONS = [
  "Cardiology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Emergency",
  "Radiology",
  "Surgery",
  "Internal Medicine",
  "Obstetrics",
  "Urology",
  "Dermatology",
];

export const STEPS = [
  "Basic Info",
  "Departments",
  "Services & Doctors",
  "Facilities & Hours",
  "Review & Submit",
];

// Helper functions to generate empty objects
export const emptyDept = () => ({
  name: "",
  head: "",
  specialties: "",
  description: "",
});
export const emptyService = () => ({ name: "", price: "" });
export const emptyDoctor = () => ({
  name: "",
  specialty: "",
  experience: "",
  availability: "",
});
export const emptyAward = () => ({ title: "", year: "", desc: "" });
export const emptyHours = () =>
  DAYS.map((d) => ({
    day: d,
    time: "09:00 - 17:00",
    isOpen: d !== "Sunday",
    highlight: false,
  }));

// Main base template for form data
export const baseTemplate = () => ({
  name: "",
  type: "",
  accreditation: "",
  location: "",
  rating: "",
  reviewsCount: "",
  established: "",
  beds: "",
  doctors: "",
  surgeries: "",
  priceRange: "",
  acceptingPatients: null,
  about: "",
  images: [],
  departments: [emptyDept()],
  insurances: [],
  facilities: [],
  services: [emptyService()],
  keyDoctors: [emptyDoctor()],
  accreditationsList: "",
  awards: [emptyAward()],
  businessHours: emptyHours(),
});
