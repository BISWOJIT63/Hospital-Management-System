"use client";

import { X, Pin, ArrowLeft } from "lucide-react";

export default function PinnedMessages({ pinnedMessages, doctorName, onClose, onUnpin }) {
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
        <div>
          <h2 className="text-sm font-bold text-slate-900">Pinned Messages</h2>
          <p className="text-[10px] text-slate-400">{pinnedMessages.length} pinned message{pinnedMessages.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {pinnedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Pin className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-400 text-center">No pinned messages yet</p>
            <p className="text-xs text-slate-400 text-center max-w-50">
              Long press on any message and tap pin to keep it here.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {pinnedMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#50df20]/20 transition-colors"
              >
                <Pin className="w-4 h-4 text-[#50df20] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-500 mb-1">
                    {msg.sender === "me" ? "You" : doctorName}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{msg.text}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5">{msg.time}</p>
                </div>
                <button
                  onClick={() => onUnpin(msg.id)}
                  className="p-1.5 rounded-md text-slate-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                  aria-label="Unpin message"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
