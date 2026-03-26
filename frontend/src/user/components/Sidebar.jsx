import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Pill,
  MessageSquare,
  CreditCard,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
  { icon: CalendarDays, label: "Appointments", page: "appointments" },
  { icon: ClipboardList, label: "Medical Records", page: "records" },
  { icon: Pill, label: "Prescriptions", page: "prescriptions" },
  { icon: MessageSquare, label: "Messages", page: "messages" },
  { icon: CreditCard, label: "Billing", page: "billing" },
];

export default function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
  theme,
}) {
  return (
    <>
      {}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-[57px] z-40 h-[900px] rounded-xl w-50 flex flex-col border-r
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }
        `}
      >
        {}
        <button
          onClick={onClose}
          className={`lg:hidden absolute top-4 right-4 p-1 rounded-lg cursor-pointer transition-colors ${
            theme === "dark"
              ? "hover:bg-slate-800 text-slate-400"
              : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          <X className="size-5" />
        </button>

        {}
        <nav className="flex-1 px-3 space-y-1 pt-20 lg:pt-6 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;

            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.page);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 active:scale-95 text-left cursor-pointer hover:translate-x-1 group
                  ${
                    isActive
                      ? "bg-[#50df20]/10 text-[#50df20] font-bold"
                      : "font-semibold " + (theme === "dark"
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                        : "text-slate-500 hover:bg-[#50df20]/5 hover:text-[#50df20]")
                  }
                `}
              >
                <Icon className={`size-5 transition-transform group-hover:scale-110 ${isActive ? 'text-[#50df20]' : ''}`} />
                <span className="text-[13px]">{item.label}</span>
              </button>
            );
          })}

          {}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onNavigate("settings");
                onClose();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 active:scale-95 text-left cursor-pointer hover:translate-x-1 group
                ${
                  activePage === "settings"
                    ? "bg-[#50df20]/10 text-[#50df20] font-bold"
                    : "font-semibold " + (theme === "dark"
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-500 hover:bg-[#50df20]/5 hover:text-[#50df20]")
                }
              `}
            >
              <Settings className="size-5" />
              <span className="font-medium text-sm">Profile & Settings</span>
            </button>
          </div>
        </nav>

        {}
        <div className="p-3 mt-auto">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
               <Settings className="size-24" />
            </div>
            <p className="text-[11px] text-[#50df20] font-black uppercase tracking-widest mb-1.5 relative z-10 drop-shadow-md">
              AetherCare Pro
            </p>

            <p className="text-[13px] font-medium text-slate-300 mb-5 relative z-10 leading-relaxed">
              Priority support and health analytics.
            </p>

            <button className="w-full py-2.5 bg-[#50df20] hover:bg-[#45c31c] text-slate-900 text-[13px] font-black rounded-xl cursor-pointer transition-colors active:scale-95 relative z-10 shadow-lg shadow-[#50df20]/20">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
