import FeatureCard from "./FeatureCard";
import i1 from "../assets/images/i1.png";
import i2 from "../assets/images/i2.png";
import i3 from "../assets/images/i3.png";
import i4 from "../assets/images/i4.png";
import { Stethoscope, Activity, CalendarCheck, Pill } from "lucide-react";
export default function Features() {
  const features = [
    {
      title: "Advanced Patient Records",
      description:
        "A centralized digital hub for all patient history. Eliminate paper clutter and access vital health information instantly with our secure, cloud-based records system.",
      tag: "Core Module",
      benefits: [
        "Digital Medical History",
        "Instant Search & Retrieval",
        "Secure Data Encryption",
      ],
      icon: i1,
      colorBg: "bg-teal-100",
    },
    {
      title: "Smart Appointment Scheduling",
      description:
        "Reduce no-shows and optimize doctor availability. Our intelligent booking engine handles recurring appointments, emergency slots, and automated reminders.",
      tag: "Efficiency",
      benefits: [
        "Automated SMS/Email Reminders",
        "Calendar Syncing",
        "Waitlist Management",
      ],
      icon: i2,
      colorBg: "bg-blue-100",
    },
    {
      title: "Pharmacy & Inventory Control",
      description:
        "Keep track of medication stock levels in real-time. Automated low-stock alerts and expiration tracking ensure you never run out of critical supplies.",
      tag: "Management",
      benefits: [
        "Real-time Stock Tracking",
        "Expiry Date Alerts",
        "Supplier Management",
      ],
      icon: i3,
      colorBg: "bg-indigo-100",
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Make data-driven decisions with powerful reporting tools. Visualize hospital performance, revenue streams, and patient demographics in one dashboard.",
      tag: "Analytics",
      benefits: [
        "Revenue Reports",
        "Patient Demographics",
        "Staff Performance Metrics",
      ],
      icon: i4,
      colorBg: "bg-rose-100",
    },
  ];

  return (
    <section
      className="px-6 py-24 md:py-40 lg:px-20 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
      id="how-it-works"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -translate-y-1/2 bg-slate-50/50 dark:bg-slate-900/20 pointer-events-none"></div>
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-medical-dark dark:text-white mb-6 uppercase tracking-tight">
            The <span className="text-primary">Medical Network</span>
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Streamlined, secure, and intelligent care pathways designed for
            professional clinical excellence.
          </p>
        </div>
        <div className="space-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
