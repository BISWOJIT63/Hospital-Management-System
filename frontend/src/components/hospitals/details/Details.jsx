import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Award,
  Calendar,
  ShieldCheck,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  MessageSquare,
  Phone,
  Video,
  CheckCircle2,
  ThumbsUp,
  Reply,
  Info,
  Building2,
  Map as MapIcon,
  Check,
  X,
  Activity,
  Users,
  BedDouble,
  Microscope,
  Ambulance,
} from "lucide-react";

import Hero from "./subpages/Hero";
import Tabs from "./subpages/Tabs";
import Overview from "./subpages/Overview";
import Departments from "./subpages/Departments";
import Facilities from "./subpages/Facilities";
import Doctors from "./subpages/Doctors";
import Awards from "./subpages/Awards";
import Timings from "./subpages/Timings";
import Reviews from "./subpages/Reviews";
import Insurance from "./subpages/Insurance";

import { useParams } from "react-router-dom";
import { api } from "../../../utils/api";

const STATIC_HOSPITAL = {
  name: "CityCare Super Specialty Hospital",
  type: "Multi-Specialty Healthcare & Research Center",
  accgreenitation: "JCI & NABH Accgreenited",
  location: "Downtown Medical District, New York, USA",
  rating: 4.8,
  reviewsCount: 1245,
  established: "1995",
  beds: "500+",
  doctors: "150+",
  surgeries: "10,000+",
  priceRange: "$50 - $200",
  acceptingPatients: true,
  about:
    "CityCare Super Specialty Hospital is a premier healthcare institution dedicated to providing world-class medical care. Equipped with state-of-the-art technology and staffed by internationally trained medical professionals, we offer comprehensive healthcare services across over 30 specialties. Our patient-centric approach ensures compassionate care, safety, and the best clinical outcomes.",


  images: [
    "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1000&h=600",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500&h=400",
    "https://images.unsplash.com/photo-1538108149393-cebb47acdd92?auto=format&fit=crop&q=80&w=500&h=400",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500&h=400",
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=500&h=400",
  ],

  departments: [
    {
      name: "Cardiology Center",
      head: "Dr. Sarah Jenkins",
      specialties: "Angioplasty, Bypass Surgery, Pacemaker",
      description:
        "Advanced cardiac care with 24/7 emergency response and state-of-the-art Cath Labs.",
    },
    {
      name: "Neurology & Neurosurgery",
      head: "Dr. Michael Chen",
      specialties: "Stroke Management, Brain Tumors, Spine Surgery",
      description:
        "Comprehensive care for neurological disorders utilizing advanced imaging and minimally invasive techniques.",
    },
    {
      name: "Orthopedics & Joint Replacement",
      head: "Dr. Robert Wade",
      specialties: "Knee Replacement, Sports Injuries, Trauma",
      description:
        "Dedicated rehabilitation center and robotic-assisted joint replacement surgeries.",
    },
  ],
  insurances: [
    "https://globalrecognitionawards.org/wp-content/uploads/2025/07/ICICI-Lombard.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOZYjL_GY9YOi74Tg5gSHhnIEUuVPHn39sQ&s",
    "https://cdn.prod.website-files.com/6145f7156a1337613524d548/63f4b57a305d32f21fd6720a_logo__Star.png",
    "https://www.nivabupa.com/home-page-images/logo-bar-images/Niva-Bupa-Logo.svg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl_6hYeLTK6fccwmEpg3HD-d2y-mOro-zk4g&s",
    "https://www.uxdt.nic.in/wp-content/uploads/2020/06/PMJAY-Preview.png",
  ],
  facilities: [
    "24/7 Emergency Room",
    "Intensive Care Unit (ICU)",
    "Advanced Pathology Lab",
    "Radiology & Imaging (MRI/CT)",
    "Blood Bank",
    "24/7 Pharmacy",
    "Ambulance Services",
    "Cafeteria",
  ],
  services: [
    { name: "General Consultation", price: "$50" },
    { name: "Specialist Consultation", price: "$100" },
    { name: "Complete Blood Count (CBC)", price: "$30" },
    { name: "MRI Scan (Without Contrast)", price: "$400" },
    { name: "Echocardiogram", price: "$150" },
    { name: "X-Ray (Chest)", price: "$45" },
  ],
  keyDoctors: [
    {
      name: "Dr. Martin Asher",
      specialty: "Cardiology",
      experience: "21 Years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150",
      availability: "Mon, Wed, Fri",
    },
    {
      name: "Dr. Emily Roes",
      specialty: "Neurology",
      experience: "15 Years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
      availability: "Tue, Thu, Sat",
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "18 Years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150",
      availability: "Mon to Sat",
    },
  ],
  accgreenitationsList: [
    "Joint Commission International (JCI) Accgreenited for maintaining global healthcare standards.",
    "National Accgreenitation Board for Hospitals & Healthcare Providers (NABH) certified.",
    "College of American Pathologists (CAP) accgreenited laboratory services.",
  ],
  awards: [
    {
      title: "Best Multi-Specialty Hospital",
      year: "2023",
      desc: "Awarded by National Health Excellence Board.",
    },
    {
      title: "Excellence in Patient Care",
      year: "2022",
      desc: "Recognized for outstanding patient satisfaction scores.",
    },
    {
      title: "Green Hospital Award",
      year: "2021",
      desc: "For sustainable and eco-friendly infrastructure.",
    },
  ],
  businessHours: [
    { day: "Emergency", time: "24/7 Open", isOpen: true, highlight: true },
    { day: "OPD - Monday", time: "08:00 AM - 08:00 PM", isOpen: true },
    { day: "OPD - Tuesday", time: "08:00 AM - 08:00 PM", isOpen: true },
    { day: "OPD - Wednesday", time: "08:00 AM - 08:00 PM", isOpen: true },
    { day: "OPD - Thursday", time: "08:00 AM - 08:00 PM", isOpen: true },
    { day: "OPD - Friday", time: "08:00 AM - 08:00 PM", isOpen: true },
    { day: "OPD - Saturday", time: "08:00 AM - 05:00 PM", isOpen: true },
    { day: "OPD - Sunday", time: "Closed", isOpen: false },
  ],
  reviews: [
    {
      author: "Richard Alexander",
      date: "2 Weeks ago",
      rating: 5,
      recommended: true,
      text: "The care I received at CityCare was exceptional. The nursing staff was incgreenibly attentive, and Dr. Jenkins explained my procedure perfectly. The facility is extremely clean and modern.",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      author: "Doris Loe",
      date: "1 Month ago",
      rating: 4,
      recommended: true,
      text: "Overall a great hospital. The wait times in the emergency room were a bit long on a weekend, but once seen, the doctors were thorough and professional. The new cafeteria is also a nice touch.",
      avatar: "https://i.pravatar.cc/150?u=2",
      reply: {
        author: "Hospital Admin",
        text: "Thank you for your feedback, Doris. We are actively working on greenucing ER wait times during peak hours. We hope you are recovering well.",
      },
    },
  ],
};

export default function Details() {
  const { id } = useParams();
  const [HOSPITAL, setHospital] = useState(STATIC_HOSPITAL);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("idle");

  React.useEffect(() => {
    const fetchHopitalDetails = async () => {
      try {
        if (id) {
          const res = await api.getHospitalById(id);
          // Merge the dynamic response inside our STATIC_HOSPITAL schema ensuring mapping lines up
          if (res) {
            setHospital({
              ...STATIC_HOSPITAL,
              ...res,
              name: res.name || STATIC_HOSPITAL.name,
              type: res.type || STATIC_HOSPITAL.type,
              location: res.address || res.location || STATIC_HOSPITAL.location,
              about: res.description || STATIC_HOSPITAL.about,
              rating: res.rating || STATIC_HOSPITAL.rating,
              images: res.images?.length > 0 ? res.images : STATIC_HOSPITAL.images
            });
          }
        }
      } catch (err) {
        console.error("Failed fetching live hospital data via ID:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHopitalDetails();
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-bold">Loading Facility Details...</div>;
  }

  const scrollToSection = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(
      tabId.replace(/\\s+/g, "-").toLowerCase(),
    );
    if (element) {
      const yOffset = -140;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleBookAppointment = () => {
    setShowModal(true);
    setBookingStatus("processing");
    setTimeout(() => setBookingStatus("success"), 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setBookingStatus("idle"), 300);
  };

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-950 font-sans pb-24 text-slate-800 dark:text-slate-200">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Hero
          HOSPITAL={HOSPITAL}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          handleBookAppointment={handleBookAppointment}
        />
        <Tabs activeTab={activeTab} scrollToSection={scrollToSection} />
        <div className="space-y-8 pb-12">
          <Overview HOSPITAL={HOSPITAL} />
          <Insurance HOSPITAL={HOSPITAL} />
          <Departments HOSPITAL={HOSPITAL} />
          <Facilities HOSPITAL={HOSPITAL} />
          <Doctors HOSPITAL={HOSPITAL} />
          <Awards HOSPITAL={HOSPITAL} />
          <Timings HOSPITAL={HOSPITAL} />
          <Reviews HOSPITAL={HOSPITAL} />
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Appointment Request
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center text-center">
              {bookingStatus === "processing" ? (
                <>
                  <div className="w-16 h-16 border-4 border-slate-100 dark:border-slate-800 border-t-primary rounded-full animate-spin mb-6"></div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Processing Request...
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    Please wait while we route your request to the reception.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Request Received!
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Your appointment request at <strong>{HOSPITAL.name}</strong>{" "}
                    has been received. Our team will contact you shortly to
                    confirm the exact time slot.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
