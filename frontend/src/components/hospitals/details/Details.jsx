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
import Insurance from "./subpages/Insurance";

import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import ReviewSection from "../../Reviews/ReviewSection";


export default function Details() {
  const { id } = useParams();
  const [HOSPITAL, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchHopitalDetails = async () => {
      try {
        if (id) {
          const res = await api.getHospitalById(id);
          // Merge the dynamic response inside our STATIC_HOSPITAL schema ensuring mapping lines up
          if (res) {
            setHospital(res);
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
    return (
      <div className="p-12 df text-center text-slate-500 font-bold">
        Loading Facility Details...
      </div>
    );
  }

  if (!HOSPITAL) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold">
        Hospital not found.
      </div>
    );
  }
  const hasReviews = !!HOSPITAL?.reviews?.length;

  const tabs = [
    "Overview",
    "Departments",
    "Facilities",
    "Doctors",
    "Awards",
    "Timings",
    "Reviews",
  ];
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
    navigate("/appointment", { state: { hospital: HOSPITAL } });
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
        <Tabs
          activeTab={activeTab}
          scrollToSection={scrollToSection}
          tabs={tabs}
        />
        <div className="space-y-8 pb-12">
          <Overview HOSPITAL={HOSPITAL} />
          <Insurance HOSPITAL={HOSPITAL} />
          <Departments HOSPITAL={HOSPITAL} />
          <Facilities HOSPITAL={HOSPITAL} />
          <Doctors HOSPITAL={HOSPITAL} />
          <Awards HOSPITAL={HOSPITAL} />
          <Timings HOSPITAL={HOSPITAL} />
          <div id="reviews" className="scroll-mt-36">
            <ReviewSection 
              entityId={id} 
              entityType="Facility" 
              initialRating={HOSPITAL.rating} 
              initialCount={HOSPITAL.reviewsCount} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
