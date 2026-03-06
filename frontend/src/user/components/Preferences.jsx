import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function Preferences({ theme }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      className={`border rounded-3xl p-6 shadow-sm transition-colors ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
    >
      <h3
        className={`text-xl font-bold flex items-center gap-2 mb-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
      >
        <SlidersHorizontal className="size-5 text-emerald-600 dark:text-emerald-400" />
        Preferences
      </h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Language
            </span>
            <span
              className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              System display language
            </span>
          </div>
          <select
            className={`text-xs font-bold border-none rounded-lg py-1 px-3 outline-none transition-colors ${theme === "dark" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-900"}`}
          >
            <option>{"English (US)"}</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              Notifications
            </span>
            <span
              className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              {"Email & SMS alerts"}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
              type="checkbox"
            />
            <div
              className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#50df20] transition-colors ${theme === "dark"
                  ? "bg-slate-600 after:bg-slate-700"
                  : "bg-slate-200 after:bg-white"
                }`}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
