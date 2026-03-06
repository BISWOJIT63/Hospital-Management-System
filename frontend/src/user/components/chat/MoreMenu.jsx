"use client";

import { useEffect, useRef } from "react";
import {
  UserCircle,
  Search,
  BellOff,
  Wallpaper,
  Trash2,
  Flag,
  Ban,
  Pin,
  ImageIcon,
} from "lucide-react";

const menuItems = [
  { icon: UserCircle, label: "Contact info", id: "contact" },
  { icon: Search, label: "Search", id: "search" },
  { icon: Pin, label: "Pinned messages", id: "pinned" },
  { icon: ImageIcon, label: "Media & gallery", id: "gallery" },
  { icon: BellOff, label: "Mute notifications", id: "mute" },
  { icon: Wallpaper, label: "Wallpaper", id: "wallpaper" },
  { divider: true },
  { icon: Flag, label: "Report", id: "report", danger: false },
  { icon: Ban, label: "Block", id: "block", danger: true },
  { icon: Trash2, label: "Clear chat", id: "clear", danger: true },
];

export default function MoreMenu({ open, onClose, onAction }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-4 top-14 z-50 w-56 bg-white rounded-xl shadow-2xl shadow-slate-200/80 border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {menuItems.map((item, i) => {
        if (item.divider) {
          return <div key={`div-${i}`} className="my-1 border-t border-slate-100" />;
        }
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              onAction(item.id);
              onClose();
            }}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors text-left ${
              item.danger
                ? "text-red-500 hover:bg-red-50"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
