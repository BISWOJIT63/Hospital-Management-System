"use client";

import { useState, useEffect } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  X,
  Maximize2,
  SwitchCamera,
} from "lucide-react";

export default function VideoCallScreen({ doctor, onClose }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callStatus, setCallStatus] = useState("connecting");

  useEffect(() => {
    const connectTimer = setTimeout(() => setCallStatus("ringing"), 1500);
    const ringTimer = setTimeout(() => setCallStatus("connected"), 3500);
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
    <div className="flex-1 flex flex-col glass-effect rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 relative">
      {}
      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        {}
        <div className="absolute inset-0 flex items-center justify-center">
          {callStatus === "connected" ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-90 blur-sm scale-110"
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                crossOrigin="anonymous"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#50df20]/30"
              />
              <p className="text-white text-lg font-bold">{doctor.name}</p>
              <p className="text-white/60 text-sm animate-pulse">
                {callStatus === "connecting" ? "Connecting video..." : "Ringing..."}
              </p>
            </div>
          )}
        </div>

        {}
        {callStatus === "connected" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.85)" }}
            />
          </div>
        )}

        {}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-linear-to-b from-black/50 to-transparent z-10">
          <div>
            <h3 className="text-white font-bold text-sm">{doctor.name}</h3>
            <p className="text-white/70 text-xs">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-2">
            {callStatus === "connected" && (
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#50df20] animate-pulse" />
                <span className="text-white text-xs font-bold">{formatDuration(callDuration)}</span>
              </div>
            )}
            <button className="p-1.5 text-white/80 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {}
        <div className="absolute bottom-20 right-4 w-32 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl z-10">
          {isVideoOn ? (
            <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20]">
                <span className="text-lg font-bold">JW</span>
              </div>
              <button className="absolute top-2 right-2 p-1 bg-black/30 rounded-full text-white/70 hover:text-white">
                <SwitchCamera className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <VideoOff className="w-6 h-6 text-slate-500" />
            </div>
          )}
        </div>
      </div>

      {}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-center gap-5">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMuted
              ? "bg-red-500/20 text-red-400"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            !isVideoOn
              ? "bg-red-500/20 text-red-400"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={onClose}
          className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      {}
      <div className="bg-slate-900 pb-2 flex items-center justify-center gap-1">
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
          End-to-end encrypted video call
        </span>
      </div>
    </div>
  );
}
