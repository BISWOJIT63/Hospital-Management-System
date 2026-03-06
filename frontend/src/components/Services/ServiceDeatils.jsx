import React, { useState, useEffect } from "react";
import { HeartPulse, Activity } from "lucide-react";
import { useParams } from "react-router-dom";
import { ServiceHero } from "./subpages/ServiceHero";
import {
  ServiceOverview,
  ServiceTreatments,
  ServicePricing,
} from "./subpages/ServiceInfo";
import {
  ServiceSpecialists,
  ServiceTimings,
} from "./subpages/ServiceTimingsAndSpecialists";
import { api } from "../../utils/api";


const SERVICE = {
  name: "Advanced Cardiology & Heart Care",
  category: "Specialized Department",
  status: "Available 24/7",
  rating: 4.9,
  reviewsCount: 856,
  patientsTreated: "15,000+",
  successRate: "98.5%",
  basePrice: "From $150",
  about:
    "Our Advanced Cardiology department offers comprehensive diagnostic, medical, and surgical care for all types of heart conditions. Equipped with state-of-the-art Cath Labs and non-invasive diagnostic tools, our team of internationally trained cardiologists provides personalized treatment plans tailored to each patient's unique cardiac needs.",


  image:
    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1000&h=600",

  treatments: [
    {
      name: "Coronary Angiography",
      desc: "Diagnostic procedure to check for blocked or narrowed blood vessels in your heart.",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      name: "Angioplasty & Stenting",
      desc: "Minimally invasive procedure to open clogged heart arteries.",
      icon: <HeartPulse className="w-5 h-5" />,
    },
    {
      name: "Echocardiogram",
      desc: "Ultrasound of the heart to monitor its structure and function.",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      name: "Pacemaker Implantation",
      desc: "Surgical placement of a device to regulate abnormal heart rhythms.",
      icon: <Activity className="w-5 h-5" />,
    },
  ],

  pricing: [
    {
      package: "Basic Heart Checkup",
      price: "$150",
      includes: [
        "ECG",
        "Cardiologist Consultation",
        "Blood Pressure Monitoring",
      ],
    },
    {
      package: "Comprehensive Cardiac Profile",
      price: "$350",
      includes: [
        "Echocardiogram",
        "TMT (Stress Test)",
        "Lipid Profile",
        "Consultation",
      ],
    },
    {
      package: "Angiography Procedure",
      price: "$1,200",
      includes: [
        "Pre-op Diagnostics",
        "Cath Lab Charges",
        "Surgeon Fee",
        "1 Day Recovery",
      ],
    },
  ],

  specialists: [
    {
      name: "Dr. Martin Asher",
      specialty: "Interventional Cardiologist",
      experience: "21 Years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150",
      availability: "Mon, Wed, Fri",
    },
    {
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiothoracic Surgeon",
      experience: "15 Years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
      availability: "Tue, Thu, Sat",
    },
  ],

  businessHours: [
    {
      day: "Emergency Cardiac Care",
      time: "24/7 Open",
      isOpen: true,
      highlight: true,
    },
    {
      day: "OPD Consultations (Mon - Fri)",
      time: "09:00 AM - 06:00 PM",
      isOpen: true,
    },
    {
      day: "OPD Consultations (Saturday)",
      time: "09:00 AM - 02:00 PM",
      isOpen: true,
    },
    { day: "Sunday", time: "Closed (Emergencies Only)", isOpen: false },
  ],
};


export default function ServiceDeatils() {
  const { id } = useParams();
  const [SERVICE, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const data = await api.getServiceById(id);
          setService(data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-bold">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!SERVICE) {
    return (
      <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-500 font-bold text-lg">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-900 font-sans pb-24 text-slate-800 dark:text-slate-100 transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <ServiceHero service={SERVICE} />
        <div className="space-y-6 pb-12">
          <ServiceOverview about={SERVICE.description || SERVICE.about} />
          {SERVICE.treatments?.length > 0 && <ServiceTreatments treatments={SERVICE.treatments} />}
          {SERVICE.pricing?.length > 0 && <ServicePricing pricing={SERVICE.pricing} />}
          {SERVICE.specialists?.length > 0 && <ServiceSpecialists specialists={SERVICE.specialists} />}
          {SERVICE.businessHours?.length > 0 && <ServiceTimings businessHours={SERVICE.businessHours} />}
        </div>
      </main>
    </div>
  );
}
