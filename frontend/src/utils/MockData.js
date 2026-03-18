export const MOCK_HOSPITALS = [
  {
    _id: "mock-hosp-1",
    name: "Mayo Clinic",
    city: "Rochester, MN",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "Consistently ranked as the #1 hospital in the nation, providing expert, whole-person care to everyone who needs healing.",
    type: "Hospital",
  },
  {
    _id: "mock-hosp-2",
    name: "Cleveland Clinic",
    city: "Cleveland, OH",
    images: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "A non-profit multispecialty academic medical center that integrates clinical and hospital care with research and education.",
    type: "Hospital",
  },
  {
    _id: "mock-hosp-3",
    name: "Johns Hopkins Hospital",
    city: "Baltimore, MD",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "A world-renowned leader in patient care, medical research, and teaching for more than 125 years.",
    type: "Hospital",
  },
];

export const MOCK_CLINICS = [
  {
    _id: "mock-clinic-1",
    name: "City Wellness Center",
    city: "New York, NY",
    images: [
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "Personalized primary care and wellness services in the heart of the city.",
    type: "Clinic",
  },
  {
    _id: "mock-clinic-2",
    name: "Elite Pediatrics",
    city: "San Francisco, CA",
    images: [
      "https://media.istockphoto.com/id/1388254153/photo/shot-of-a-baby-sitting-on-her-mothers-lap-while-being-examined-by-a-doctor.jpg?s=612x612&w=0&k=20&c=PBzQWrBVp8pIyYBH_ds8Bu8y4Y4j2jdL3Z2n8L1W0v4=",
    ],
    description:
      "Dedicated to providing high-quality, compassionate pediatric care for children of all ages.",
    type: "Clinic",
  },
  {
    _id: "mock-clinic-3",
    name: "Radiant Skin Clinic",
    city: "Miami, FL",
    images: [
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800",
    ],
    description:
      "Advanced dermatological treatments and aesthetic procedures for glowing skin.",
    type: "Clinic",
  },
];

export const MOCK_DOCTORS = [
  {
    _id: "mock-doc-1",
    name: "Dr. James Wilson",
    specialty: "Cardiology",
    about:
      "Senior cardiologist with over 20 years of experience in interventional cardiology and heart failure management.",
    consultationFee: 200,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  },
  {
    _id: "mock-doc-2",
    name: "Dr. Elizabeth Blackwell",
    specialty: "Pediatrics",
    about:
      "Passionate pediatrician committed to providing holistic care for infants, children, and adolescents.",
    consultationFee: 150,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  },
  {
    _id: "mock-doc-3",
    name: "Dr. Gregory House",
    specialty: "Diagnostic Medicine",
    about:
      "Renowned diagnostician specializing in rare and complex cases that others cannot solve.",
    consultationFee: 500,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
  },
  {
    _id: "mock-doc-4",
    name: "Dr. Meredith Grey",
    specialty: "General Surgery",
    about:
      "Expert general surgeon with a focus on minimally invasive procedures and trauma surgery.",
    consultationFee: 250,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ca197ec2?w=400&q=80",
  },
];

export const MOCK_SERVICES = [
  {
    _id: "mock-serv-1",
    title: "Cardiology Checkup",
    description:
      "Comprehensive heart evaluation including ECG, stress test, and consultation with expert cardiologists.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    providerName: "Mayo Clinic",
  },
  {
    _id: "mock-serv-2",
    title: "Pediatric Consultation",
    description:
      "Routine wellness exams, vaccinations, and expert care for your child's growth and development.",
    image:
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
    providerName: "Elite Pediatrics",
  },
  {
    _id: "mock-serv-3",
    title: "Neurology Screening",
    description:
      "Advanced neurological assessments and brain health screenings using state-of-the-art diagnostic tools.",
    image:
      "https://img.freepik.com/free-photo/doctor-tracking-patient-evolution-neurology-headset-test-neorological-center_482257-31620.jpg",
    providerName: "Johns Hopkins Hospital",
  },
  {
    _id: "mock-serv-4",
    title: "Emergency Care",
    description:
      "24/7 urgent medical support with rapid response teams for critical life-saving interventions.",
    image:
      "https://www.draeger.com/Media/Content/Content/supporting-care-with-technology-emergency-team-on-duty-4-3-d-18913-2010_.jpg",
    providerName: "City Wellness Center",
  },
  {
    _id: "mock-serv-5",
    title: "Diagnostic Imaging",
    description:
      "High-resolution MRI, CT scans, and X-rays for accurate detection and diagnosis of health conditions.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    providerName: "Cleveland Clinic",
  },
];

// Helpers: build FormData payloads for creating Hospital/Clinic/Doctor (multipart/form-data)
export function buildHospitalFormData(payload, images = [], documents = []) {
  const fd = new FormData();
  fd.append("type", "Hospital");
  Object.keys(payload).forEach((k) => {
    const val = payload[k];
    if (Array.isArray(val) || typeof val === "object") {
      fd.append(k, JSON.stringify(val));
    } else {
      fd.append(k, val == null ? "" : String(val));
    }
  });
  images.forEach((f) => fd.append("images", f));
  documents.forEach((f) => fd.append("documents", f));
  return fd;
}

export function buildClinicFormData(payload, images = [], documents = []) {
  const fd = buildHospitalFormData(payload, images, documents);
  fd.set("type", "Clinic");
  return fd;
}

export function buildDoctorFormData(
  payload,
  profileFile = null,
  documents = [],
) {
  const fd = new FormData();
  Object.keys(payload).forEach((k) => {
    const val = payload[k];
    if (Array.isArray(val) || typeof val === "object") {
      fd.append(k, JSON.stringify(val));
    } else {
      fd.append(k, val == null ? "" : String(val));
    }
  });
  if (profileFile) fd.append("profilePic", profileFile);
  documents.forEach((f) => fd.append("documents", f));
  return fd;
}

// Example payload shape for hospital
export const EXAMPLE_HOSPITAL_PAYLOAD = {
  name: "Green Valley Medical Center",
  city: "Springfield",
  address: "123 Healing Way",
  phone: "+1-555-123-4567",
  email: "admin@greenvalleymed.com",
  description: "Full-service tertiary care hospital",
  about: "Patient-centered services across specialties.",
  accreditation: "JCI",
  accreditationsList: ["JCI", "NABH"],
  established: "1998",
  beds: "350",
  doctorsCount: "120",
  priceRange: "$$$",
  acceptingPatients: true,
  departments: [{ name: "Cardiology", description: "Heart care" }],
  appointmentTypes: [{ name: "Consultation", price: 50 }],
};

// Example payload shape for doctor
export const EXAMPLE_DOCTOR_PAYLOAD = {
  name: "Dr. Alice Morgan",
  email: "alice@example.com",
  password: "StrongPassword123!",
  phone: "+1-555-987-6543",
  gender: "Female",
  dob: "1980-02-15",
  address: "45 Clinic Road",
  specialty: "Cardiology",
  location: "Green Valley Medical Center",
  city: "Springfield",
  experience: "15 years",
  about: "Cardiologist focusing on patient-first care.",
  licenseNumber: "LIC-12345",
  consultationFee: 100,
};
