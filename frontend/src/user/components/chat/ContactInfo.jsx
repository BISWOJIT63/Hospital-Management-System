"use client";

import { useState } from "react";
import {
  X,
  Bell,
  BellOff,
  Star,
  Lock,
  ImageIcon,
  FileText,
  Link2,
  ChevronRight,
  Heart,
  ShieldCheck,
  Ban,
  Flag,
  Trash2,
  ThumbsDown,
  Pin,
} from "lucide-react";

const mediaItems = [
  {
    id: 1,
    type: "image",
    color: "from-teal-400 to-emerald-500",
    label: "ECG Report",
  },
  {
    id: 2,
    type: "image",
    color: "from-sky-400 to-green-500",
    label: "X-Ray Scan",
  },
  {
    id: 3,
    type: "image",
    color: "from-amber-400 to-orange-500",
    label: "Lab Results",
  },
  {
    id: 4,
    type: "image",
    color: "from-rose-400 to-pink-500",
    label: "Prescription",
  },
  {
    id: 5,
    type: "image",
    color: "from-teal-400 to-green-600",
    label: "MRI Scan",
  },
  {
    id: 6,
    type: "image",
    color: "from-emerald-400 to-green-600",
    label: "Blood Test",
  },
];

export default function ContactInfo({
  doctor,
  onClose,
  pinnedCount = 0,
  onOpenPinned,
  onOpenGallery,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState("media");

  const mediaTabs = [
    { id: "media", label: "Media", count: 6 },
    { id: "docs", label: "Docs", count: 3 },
    { id: "links", label: "Links", count: 2 },
  ];

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white rounded-2xl overflow-hidden animate-in slide-in-from-right duration-300">
      {}
      <div className="flex items-center gap-3 p-4 border-b border-[#50df20]/10 bg-white/80 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Close contact info"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">Contact Info</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {}
        <div className="flex flex-col items-center py-8 px-6">
          <div className="relative mb-4">
            {doctor.avatar ? (
              <img
                src={doctor.avatar}
                alt={doctor.name}
                crossOrigin="anonymous"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#50df20]/20 shadow-xl shadow-[#50df20]/10"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20] text-3xl font-bold">
                {doctor.name.charAt(0)}
              </div>
            )}
            {doctor.online && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#50df20] border-3 border-white rounded-full" />
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
          <p className="text-sm text-[#50df20] font-semibold mt-1">
            {doctor.specialty}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {doctor.online ? "Online" : "Last seen today at 3:45 PM"}
          </p>
        </div>

        {}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-center gap-6">
            <button
              className="flex flex-col items-center gap-1.5 group"
              aria-label="Audio call"
            >
              <div className="w-11 h-11 rounded-full bg-[#50df20]/10 flex items-center justify-center text-[#50df20] group-hover:bg-[#50df20]/20 transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Favourite
              </span>
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex flex-col items-center gap-1.5 group"
              aria-label="Mute"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                  isMuted
                    ? "bg-red-50 text-red-500"
                    : "bg-[#50df20]/10 text-[#50df20] group-hover:bg-[#50df20]/20"
                }`}
              >
                {isMuted ? (
                  <BellOff className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </button>
            <button
              className="flex flex-col items-center gap-1.5 group"
              aria-label="Search"
            >
              <div className="w-11 h-11 rounded-full bg-[#50df20]/10 flex items-center justify-center text-[#50df20] group-hover:bg-[#50df20]/20 transition-colors">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Starred
              </span>
            </button>
          </div>
        </div>

        <div className="h-2 bg-slate-50" />

        {}
        <div className="px-6 py-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            About
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Board-certified {doctor.specialty} specialist. Available for
            consultations Mon-Fri, 9AM-5PM.
          </p>
        </div>

        <div className="h-2 bg-slate-50" />

        {}
        <button
          onClick={onOpenPinned}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Pin className="w-4 h-4 text-[#50df20]" />
            <span className="text-sm font-medium text-slate-700">
              Pinned Messages
            </span>
          </div>
          <div className="flex items-center gap-2">
            {pinnedCount > 0 && (
              <span className="text-xs font-bold text-[#50df20] bg-[#50df20]/10 px-2 py-0.5 rounded-full">
                {pinnedCount}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </button>

        <div className="h-2 bg-slate-50" />

        {}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Media, Docs & Links
            </p>
            <button
              onClick={onOpenGallery}
              className="text-xs font-bold text-[#50df20] hover:underline"
            >
              See All
            </button>
          </div>

          {}
          <div className="flex gap-1 mb-4 bg-slate-100 p-1 rounded-lg">
            {mediaTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMediaTab(tab.id)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                  activeMediaTab === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {}
          {activeMediaTab === "media" && (
            <div className="grid grid-cols-3 gap-2 pb-4">
              {mediaItems.map((item) => (
                <button
                  key={item.id}
                  className={`aspect-square rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm`}
                >
                  <ImageIcon className="w-5 h-5 text-white/80" />
                </button>
              ))}
            </div>
          )}

          {activeMediaTab === "docs" && (
            <div className="space-y-2 pb-4">
              {[
                "Medical_Report_Oct.pdf",
                "Prescription_v2.pdf",
                "Lab_Results.pdf",
              ].map((doc, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">
                      {doc}
                    </p>
                    <p className="text-[10px] text-slate-400">PDF Document</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeMediaTab === "links" && (
            <div className="space-y-2 pb-4">
              {[
                "health-portal.aether.care/results",
                "appointments.aether.care/book",
              ].map((link, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-500">
                    <Link2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-600 truncate">
                      {link}
                    </p>
                    <p className="text-[10px] text-slate-400">Shared link</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-2 bg-slate-50" />

        {}
        <div className="px-6 py-4 flex items-center gap-3">
          <Lock className="w-4 h-4 text-[#50df20] shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-700">Encryption</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Messages and calls are end-to-end encrypted. Only you and this
              contact can read or listen to them.
            </p>
          </div>
        </div>

        <div className="h-2 bg-slate-50" />

        {}
        <div className="px-4 py-2">
          <button className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Ban className="w-4 h-4" />
            <span className="text-sm font-medium">
              Block {doctor.name.split(" ").pop()}
            </span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm font-medium">
              Report {doctor.name.split(" ").pop()}
            </span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete chat</span>
          </button>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
