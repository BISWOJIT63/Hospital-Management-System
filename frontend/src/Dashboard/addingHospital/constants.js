

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
  "Add Services",
  "Review & Submit",
];

export const SERVICE_CATEGORIES = [
  "Diagnostics",
  "Consultation",
  "Preventive",
  "Emergency",
  "Surgery",
  "Therapy",
  "Other",
];

export const emptyServiceEntry = () => ({
  name: "",
  category: "Other",
  description: "",
  price: "",
  duration: "",
  includes: [""],
  treatments: [{ name: "", description: "" }],
  pricing: [{ package: "", price: "", includes: [""] }],
  businessHours: [
    { day: "Mon - Fri", time: "09:00 AM – 05:00 PM", isOpen: true },
    { day: "Saturday", time: "09:00 AM – 01:00 PM", isOpen: true },
    { day: "Sunday", time: "Closed", isOpen: false },
  ],
  image: "",
});


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


export const baseTemplate = () => ({
  name: "",
  type: "",
  accreditation: "",
  city: "",
  location: "", // Used as address
  rating: 0,
  reviewsCount: 0,
  established: "",
  beds: "",
  doctorsCount: "", // Renamed from doctors to avoid confusion with the ObjectId array
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
  doctors: [], // The actual ObjectId array
});
