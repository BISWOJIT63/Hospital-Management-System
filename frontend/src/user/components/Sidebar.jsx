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
          fixed top-0 left-0 z-40 h-full w-56 flex flex-col border-r
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer
                  ${
                    isActive
                      ? "bg-[#50df20]/10 text-[#50df20]"
                      : theme === "dark"
                        ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                        : "text-slate-600 hover:bg-[#50df20]/5 hover:text-[#50df20]"
                  }
                `}
              >
                <Icon className="size-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}

          {}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                onNavigate("settings");
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer ${
                activePage === "settings"
                  ? "bg-[#50df20]/10 text-[#50df20]"
                  : "text-slate-600 hover:bg-[#50df20]/5 hover:text-[#50df20]"
              }`}
            >
              <Settings className="size-5" />
              <span className="font-medium text-sm">Profile & Settings</span>
            </button>
          </div>
        </nav>

        {}
        <div className="p-3 mt-auto">
          <div className="p-4 bg-slate-900 rounded-2xl text-white">
            <p className="text-sm text-[#50df20] font-bold uppercase tracking-widest mb-1">
              AetherCare Pro
            </p>

            <p className="text-sm text-slate-400 mb-4">
              Priority support and health analytics.
            </p>

            <button className="w-full py-2 bg-[#50df20] text-slate-900 text-sm font-bold rounded-lg cursor-pointer">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
