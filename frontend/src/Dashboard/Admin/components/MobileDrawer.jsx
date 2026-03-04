import React from "react";
import { X } from "lucide-react";
import { NAV } from "../adminData";

export default function MobileDrawer({ open, onClose, active, setActive }) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 z-50 lg:hidden shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <p className="font-black text-slate-800 dark:text-white">
            Navigation
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <X size={16} />
          </button>
        </div>
        <nav className="p-3">
          {NAV.map(({ id, label, icon: Ico }) => (
            <button
              key={id}
              onClick={() => {
                setActive(id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-0.5 
                ${
                  active === id
                    ? "bg-green-600 text-white"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              <Ico size={15} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
