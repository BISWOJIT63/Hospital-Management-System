import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Cross,
  Activity as HeartPulse,
} from "lucide-react";

export default function Header({ onToggleSidebar, theme }) {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 py-3 transition-colors ${
        theme === "dark"
          ? "bg-slate-900/80 border-slate-700"
          : "bg-white/80 border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input
              className={`pl-10 pr-4 py-2 border-none rounded-lg w-64 focus:ring-2 focus:ring-emerald-600/30 text-sm outline-none transition-colors ${
                theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100"
              }`}
              placeholder="Search patient records..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={`p-2 rounded-lg relative transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-white"
                : "hover:bg-slate-100 text-slate-900"
            }`}
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span
              className={`absolute top-2 right-2 size-2 bg-emerald-600 rounded-full border-2 ${
                theme === "dark" ? "border-slate-900" : "border-white"
              }`}
            />
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-white"
                : "hover:bg-slate-100 text-slate-900"
            }`}
            aria-label="Help"
          >
            <HelpCircle className="size-5" />
          </button>
          <div
            className={`h-8 w-px mx-2 ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
          />

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={onToggleSidebar}
          >
            <button
              className={`rounded lg:hidden p-1 transition-colors ${
                theme === "dark"
                  ? "hover:bg-slate-800 text-slate-400"
                  : "hover:bg-slate-100 text-slate-900"
              }`}
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
