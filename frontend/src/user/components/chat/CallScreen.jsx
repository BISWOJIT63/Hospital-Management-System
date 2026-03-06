"use client";

import { useState, useEffect } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

export default function CallScreen({ doctor, onClose }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState("connecting");

  useEffect(() => {
    const connectTimer = setTimeout(() => setCallStatus("ringing"), 1500);
    const ringTimer = setTimeout(() => setCallStatus("connected"), 4000);
    return () => {
      clearTimeout(connectTimer);
      clearTimeout(ringTimer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (callStatus === "connected") {
      interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col glass-effect rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
      {}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/80 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-linear-to-b from-[#f6f8f6] to-[#e8f5e4] relative">
        {}
        {callStatus === "ringing" && (
          <>
            <div className="absolute w-40 h-40 rounded-full border-2 border-[#50df20]/30 pulse-ring" />
            <div className="absolute w-40 h-40 rounded-full border-2 border-[#50df20]/20 pulse-ring" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {callStatus === "connected" && (
          <div className="absolute w-40 h-40 rounded-full border-2 border-[#50df20]/20 animate-ping opacity-20" />
        )}

        {}
        <div className="relative mb-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            crossOrigin="anonymous"
            className={`w-32 h-32 rounded-full object-cover border-4 ${
              callStatus === "connected" ? "border-[#50df20]" : "border-[#50df20]/30"
            } shadow-xl shadow-[#50df20]/20`}
          />
          {callStatus === "connected" && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#50df20] rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>

        {}
        <h2 className="text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h2>
        <p className="text-sm text-[#50df20] font-semibold uppercase tracking-wide mb-4">
          {doctor.specialty}
        </p>

        {}
        <div className="flex items-center gap-2 mb-8">
          {callStatus === "connecting" && (
            <p className="text-slate-500 text-sm animate-pulse">Connecting...</p>
          )}
          {callStatus === "ringing" && (
            <p className="text-slate-500 text-sm animate-pulse">Ringing...</p>
          )}
          {callStatus === "connected" && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#50df20] animate-pulse" />
              <p className="text-[#50df20] text-sm font-bold tracking-wide">
                {formatDuration(callDuration)}
              </p>
            </div>
          )}
        </div>

        {}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? "bg-red-100 text-red-500"
                : "bg-white text-slate-600 shadow-lg shadow-slate-200/50 hover:bg-slate-50"
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-200/50 hover:bg-red-600 transition-all active:scale-95"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isSpeakerOn
                ? "bg-[#50df20]/10 text-[#50df20]"
                : "bg-white text-slate-600 shadow-lg shadow-slate-200/50 hover:bg-slate-50"
            }`}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {}
      <div className="p-3 bg-white/50 border-t border-[#50df20]/10 flex items-center justify-center gap-1">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          End-to-end encrypted call
        </span>
      </div>
    </div>
  );
}
