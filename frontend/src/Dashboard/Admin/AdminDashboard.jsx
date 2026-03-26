import React, { useState, useEffect } from "react";
import { Edit2, LayoutDashboard, Menu, ExternalLink } from "lucide-react";


import Sidebar from "./components/Sidebar";
import MobileDrawer from "./components/MobileDrawer";
import EditModal from "./components/EditModal";
import { Avatar } from "./components/AdminUI";


import OverviewPanel from "./panels/OverviewPanel";
import AnalyticsPanel from "./panels/AnalyticsPanel";
import BookingsPanel from "./panels/BookingsPanel";
import PatientsPanel from "./panels/PatientsPanel";
import DoctorsPanel from "./panels/DoctorsPanel";
import BillingPanel from "./panels/BillingPanel";
import ReviewsPanel from "./panels/ReviewsPanel";
import GalleryPanel from "./panels/GalleryPanel";
import DeptsPanel from "./panels/DeptsPanel";
import ContactPanel from "./panels/ContactPanel";
import HoursPanel from "./panels/HoursPanel";
import AwardsPanel from "./panels/AwardsPanel";
import ServiceManagerPanel from "./panels/ServiceManagerPanel";

export default function AdminDashboard({ initialFac }) {
  const [fac, setFac] = useState(initialFac);
  const [active, setActive] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [themeReady, setThemeReady] = useState(false);


  useEffect(() => {
    setTimeout(() => setThemeReady(true), 50);
  }, []);

  const renderPanel = () => {
    switch (active) {
      case "overview":
        return <OverviewPanel fac={fac} />;
      case "analytics":
        return <AnalyticsPanel />;
      case "bookings":
        return <BookingsPanel />;
      case "patients":
        return <PatientsPanel />;
      case "doctors":
        return <DoctorsPanel fac={fac} />;
      case "billing":
        return <BillingPanel />;
      case "reviews":
        return <ReviewsPanel fac={fac} />;
      case "gallery":
        return <GalleryPanel fac={fac} />;
      case "departments":
        return <DeptsPanel fac={fac} />;
      case "contact":
        return <ContactPanel fac={fac} />;
      case "hours":
        return <HoursPanel fac={fac} />;
      case "awards":
        return <AwardsPanel fac={fac} />;
      case "services":
        return <ServiceManagerPanel fac={fac} />;
      default:
        return (
          <div className="p-8 text-center text-slate-500">Panel not found</div>
        );
    }
  };

  return (
    <div
      className={`flex h-screen df bg-slate-50 dark:bg-[#080d1a] text-slate-800 dark:text-slate-200 font-sans transition-opacity duration-700 ${themeReady ? "opacity-100" : "opacity-0"}`}
    >
      { }
      <Sidebar
        active={active}
        setActive={setActive}
        fac={fac}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      { }
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        active={active}
        setActive={setActive}
      />

      { }
      {editOpen && (
        <EditModal
          fac={fac}
          onSave={setFac}
          onClose={() => setEditOpen(false)}
        />
      )}

      { }
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        { }
        <header className="lg:hidden h-14 shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center px-4 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 ml-2">
            <h1 className="text-sm font-black text-slate-800 dark:text-white capitalize tracking-wide">
              {active}
            </h1>
          </div>
        </header>

        { }
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24">
          <div className="max-w-7xl mx-auto animation-fade-in">
            {renderPanel()}
          </div>
        </div>
      </main>
    </div>
  );
}
