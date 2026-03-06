import {
  Lightbulb,
  Brain,
  MessageSquare,
  MapPin,
  FileText,
  AlertTriangle,
  Video,
  ChevronRight,
  AlarmClock,
} from "lucide-react";

function AIInsights() {
  return (
    <div className="bg-[#50df20]/5 p-6 rounded-xl border border-[#50df20]/20 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 opacity-10">
        <Brain className="w-24 h-24 text-[#50df20]" />
      </div>
      <h4 className="font-bold flex items-center gap-2 text-[#50df20]">
        <Lightbulb className="w-5 h-5" />
        AI Adherence Insight
      </h4>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        {"Your adherence is at "}
        <span className="font-bold text-[#50df20]">{"94%"}</span>
        {". We noticed you often miss the morning dose on weekends. Adjusting your notification to 9:00 AM on Saturdays might help improve consistency."}
      </p>
      <button className="mt-6 w-full py-2 bg-[#50df20]/10 text-[#50df20] font-bold rounded-lg text-sm hover:bg-[#50df20] hover:text-white transition-all cursor-pointer">
        Adjust Schedule
      </button>
    </div>
  );
}

function ProviderInfo() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Prescribing Provider
        </h4>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
            <img
              alt="Doctor Aris Thorne"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHLOuoFeeR17L8823rl0-69EgwnMX94-Vajj6b6-HkCT_QQyciSH8lPjXQ5RI1WepRGZOBmZCVn5MNtmB4k0MUcfPGiy5A9hiFW4vT6T_IF6z3iEgGFeoQc3BvGDE0O54bzz4f8hzwF4MbR7kkLzMhu29RDnIKFZQxTcNFtxKuY3aJ5h-mTbYYcyfKTV4T_xrGbdzKA89qprIk1zSGvRFR1WelsiC1j7prwEcycfPRbsyQxafvFk2wmR-bk14mun2ZvJumZC2cTWY"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-slate-900">Dr. Aris Thorne</p>
            <p className="text-xs text-slate-500">Cardiology Specialist</p>
          </div>
          <button className="ml-auto p-2 bg-slate-50 rounded-lg text-[#50df20] cursor-pointer">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
      <hr className="border-slate-100" />
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Assigned Pharmacy
        </h4>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#50df20]/10 flex items-center justify-center text-[#50df20] shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v4H3z" />
              <path d="M5 7v14h14V7" />
              <path d="M12 11v6" />
              <path d="M9 14h6" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">AetherHealth Central</p>
            <p className="text-xs text-slate-500 mt-1">{"124 Medical Dr, Austin, TX"}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-black bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase">
                Open
              </span>
              <span className="text-xs text-slate-400">{"Until 10:00 PM"}</span>
            </div>
          </div>
          <button className="p-2 text-slate-400 cursor-pointer">
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const educationLinks = [
  { icon: FileText, label: "Antibiotics Guide" },
  { icon: AlertTriangle, label: "Common Side Effects" },
  { icon: Video, label: "How to use inhalers" },
];

function PatientEducation() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h4 className="font-bold mb-4 text-slate-900">Patient Education</h4>
      <div className="space-y-3">
        {educationLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-[#50df20]/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#50df20] transition-colors" />
                <span className="text-sm font-medium text-slate-900">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function NextDoseAlert() {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-xl text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#50df20] animate-pulse" />
        <h4 className="font-bold text-sm">Next Dose Alert</h4>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-black">{"12:30 PM"}</p>
          <p className="text-xs text-zinc-400 mt-1">{"Metformin \u2022 After Lunch"}</p>
        </div>
        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer">
          <AlarmClock className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      <AIInsights />
      <ProviderInfo />
      <PatientEducation />
      <NextDoseAlert />
    </div>
  );
}
