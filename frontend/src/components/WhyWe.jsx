import React from "react";
import { Home, Shield, Smile, CalendarDays } from "lucide-react";
import video from "../assets/video/Health_Checkup_Video_Ready.mp4";

const ServiceItem = ({ title, description, align = "left" }) => (
  <div
    className={`mb-12 group ${align === "right" ? "text-right" : "text-left"}`}
  >
    <div
      className={`flex items-start gap-4 mb-3 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="w-1.5 h-10 bg-gradient-to-b from-green-500 to-lime-600 rounded-full shrink-0 mt-1" />
      <h3 className="text-2xl font-bold dark:text-white text-slate-950 leading-tight group-hover:text-green-400 transition-colors">
        {title}
      </h3>
    </div>
    <p
      className={`dark:text-gray-400 text-slate-600 text-base leading-relaxed max-w-sm ${align === "right" ? "ml-auto" : ""}`}
    >
      {description}
    </p>
  </div>
);

const ScallopedIcon = ({ icon: Icon }) => (
  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
    {}
    <img
      src="https://doccure.dreamstechnologies.com/html/template/assets/img/bg/choose-step-bg.png"
      alt=""
      className="absolute inset-0 w-full h-full fill-white drop-shadow-xl"
    />
    <div className="relative z-10">
      <Icon className="w-10 h-10 text-green-600" strokeWidth={1.5} />
    </div>
  </div>
);

const ProcessCard = ({ step, icon, title, description }) => (
  <div className="relative border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center md:items-start gap-6 hover:bg-white/5 transition-all duration-300">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0">
      <div className="bg-gradient-to-r from-green-600 to-lime-600 text-white text-xs font-bold px-5 py-1.5 rounded-xl shadow-lg">
        Step {step}
      </div>
    </div>

    <ScallopedIcon icon={icon} />

    <div className="flex flex-col text-center md:text-left">
      <h4 className="text-xl font-bold text-slate-950 dark:text-white mb-2">
        {title}
      </h4>
      <p className="dark:text-gray-400 text-slate-600  text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default function WhyWe() {
  return (
    <div className="min-h-screen  text-salte-950 dark:text-slate-white font-sans selection:bg-green-500/30 overflow-x-hidden pb-20">
      {}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-green-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-green-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-30">
        {}
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a1a1e] border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
              Why Choose Us
            </span>
          </div>
        </div>

        {}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-700 underline decoration-lime-500/30 underline-offset-8">
              Trusted
            </span>{" "}
            Homecare Partner
          </h1>
        </header>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {}
          <div className="lg:col-span-3 space-y-4">
            <ServiceItem
              title="Medical & Non-Medical Services"
              description="From nursing and therapy to companionship and daily assistance"
            />
            <ServiceItem
              title="Modern Monitoring & Health Tracking"
              description="Technology-enabled tracking, digital reports, medication reminders"
            />
          </div>

          {}
          <div className="lg:col-span-6">
            <div className="relative p-1.5 rounded-[2.5rem] bg-gradient-to-br from-green-500 to-lime-600 shadow-2xl shadow-green-900/40">
              <div className="relative rounded-[2.2rem] overflow-hidden bg-black aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-3 space-y-4">
            <ServiceItem
              align="right"
              title="Family-Centered Care Approach"
              description="We focus on comfort, dignity, independence, and building trust"
            />
            <ServiceItem
              align="right"
              title="24/7 Support & Emergency"
              description="Round-the-clock care, monitoring, and helpline for safety at all times."
            />
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <ProcessCard
            step="1"
            icon={Shield}
            title="Select Your Service"
            description="Choose from nursing care, elder care, therapy, or medical assistance your specific needs."
          />
          <ProcessCard
            step="2"
            icon={Smile}
            title="Choose Date & Time"
            description="Pick your preferred date and time, and we'll certified caregiver and share booking details."
          />
          <ProcessCard
            step="3"
            icon={CalendarDays}
            title="Care Begins at Home"
            description="Our professional caregiver arrives at your location and starts personalized care with full support."
          />
        </div>
      </div>
    </div>
  );
}
