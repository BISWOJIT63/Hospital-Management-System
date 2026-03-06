"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ImageIcon,
  FileText,
  Link2,
  Download,
  ExternalLink,
  Calendar,
} from "lucide-react";

const galleryMedia = [
  {
    id: 1,
    color: "from-teal-400 to-emerald-500",
    label: "ECG Report",
    date: "Oct 22, 2023",
  },
  {
    id: 2,
    color: "from-sky-400 to-green-500",
    label: "X-Ray Scan",
    date: "Oct 20, 2023",
  },
  {
    id: 3,
    color: "from-amber-400 to-orange-500",
    label: "Lab Results",
    date: "Oct 18, 2023",
  },
  {
    id: 4,
    color: "from-rose-400 to-pink-500",
    label: "Prescription",
    date: "Oct 15, 2023",
  },
  {
    id: 5,
    color: "from-teal-400 to-green-600",
    label: "MRI Scan",
    date: "Oct 10, 2023",
  },
  {
    id: 6,
    color: "from-emerald-400 to-green-600",
    label: "Blood Test",
    date: "Oct 8, 2023",
  },
  {
    id: 7,
    color: "from-violet-400 to-purple-600",
    label: "CT Scan",
    date: "Oct 5, 2023",
  },
  {
    id: 8,
    color: "from-cyan-400 to-teal-500",
    label: "Ultrasound",
    date: "Oct 2, 2023",
  },
  {
    id: 9,
    color: "from-pink-400 to-rose-500",
    label: "Dental X-Ray",
    date: "Sep 28, 2023",
  },
];

const galleryDocs = [
  {
    id: 1,
    name: "Medical_Report_Oct.pdf",
    size: "2.4 MB",
    date: "Oct 22, 2023",
  },
  { id: 2, name: "Prescription_v2.pdf", size: "156 KB", date: "Oct 18, 2023" },
  { id: 3, name: "Lab_Results_Full.pdf", size: "1.8 MB", date: "Oct 15, 2023" },
  { id: 4, name: "Insurance_Claim.pdf", size: "890 KB", date: "Oct 10, 2023" },
  { id: 5, name: "Referral_Letter.pdf", size: "220 KB", date: "Sep 28, 2023" },
];

const galleryLinks = [
  {
    id: 1,
    url: "health-portal.aether.care/results",
    title: "Health Portal - Results",
    date: "Oct 22, 2023",
  },
  {
    id: 2,
    url: "appointments.aether.care/book",
    title: "Book Appointment",
    date: "Oct 15, 2023",
  },
  {
    id: 3,
    url: "pharmacy.aether.care/order",
    title: "Pharmacy Order",
    date: "Oct 8, 2023",
  },
];

export default function Gallery({ onClose }) {
  const [activeTab, setActiveTab] = useState("media");

  const tabs = [
    {
      id: "media",
      label: "Media",
      icon: ImageIcon,
      count: galleryMedia.length,
    },
    { id: "docs", label: "Docs", icon: FileText, count: galleryDocs.length },
    { id: "links", label: "Links", icon: Link2, count: galleryLinks.length },
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white rounded-2xl overflow-hidden animate-in slide-in-from-right duration-300">
      {}
      <div className="flex items-center gap-3 p-4 border-b border-[#50df20]/10 bg-white/80 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">
          Media, Docs & Links
        </h2>
      </div>

      {}
      <div className="flex px-4 pt-3 gap-1 bg-white">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 flex-1 py-2.5 px-3 rounded-t-lg text-xs font-semibold transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#50df20] text-[#50df20] bg-[#50df20]/5"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-[#50df20]/10" : "bg-slate-100"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {activeTab === "media" && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                October 2023
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {galleryMedia.map((item) => (
                <div key={item.id} className="group relative">
                  <div
                    className={`aspect-square rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-sm`}
                  >
                    <ImageIcon className="w-6 h-6 text-white/70" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/20 transition-all flex items-end opacity-0 group-hover:opacity-100">
                    <div className="p-2 w-full">
                      <p className="text-[9px] text-white font-semibold truncate drop-shadow-lg">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="space-y-2">
            {galleryDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#50df20]/20 transition-colors group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-lg bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {doc.size} - {doc.date}
                  </p>
                </div>
                <button className="p-2 rounded-lg text-slate-300 hover:text-[#50df20] hover:bg-[#50df20]/10 opacity-0 group-hover:opacity-100 transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "links" && (
          <div className="space-y-2">
            {galleryLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#50df20]/20 transition-colors group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center text-green-500 shrink-0">
                  <Link2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-green-600 truncate">
                    {link.title}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {link.url}
                  </p>
                  <p className="text-[10px] text-slate-400">{link.date}</p>
                </div>
                <button className="p-2 rounded-lg text-slate-300 hover:text-green-500 hover:bg-green-50 opacity-0 group-hover:opacity-100 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
