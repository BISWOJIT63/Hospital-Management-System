"use client";

import { useEffect, useRef } from "react";
import {
  Pin,
  PinOff,
  Copy,
  Reply,
  Forward,
  Star,
  Trash2,
  Info,
} from "lucide-react";

export default function MessageContextMenu({ x, y, isPinned, onClose, onPin, onCopy, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const items = [
    { icon: Reply, label: "Reply", action: onClose },
    { icon: isPinned ? PinOff : Pin, label: isPinned ? "Unpin" : "Pin", action: onPin },
    { icon: Copy, label: "Copy", action: onCopy },
    { icon: Star, label: "Star", action: onClose },
    { icon: Forward, label: "Forward", action: onClose },
    { icon: Info, label: "Info", action: onClose },
    { divider: true },
    { icon: Trash2, label: "Delete", action: onDelete, danger: true },
  ];

  
  const style = {
    position: "fixed",
    top: y,
    left: x,
    zIndex: 9999,
  };

  return (
    <div ref={ref} style={style} className="w-48 bg-white rounded-xl shadow-2xl shadow-slate-300/60 border border-slate-100 py-1.5 animate-in fade-in zoom-in-95 duration-150">
      {items.map((item, i) => {
        if (item.divider) {
          return <div key={`d-${i}`} className="my-1 border-t border-slate-100" />;
        }
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => {
              item.action();
            }}
            className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-left ${
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
