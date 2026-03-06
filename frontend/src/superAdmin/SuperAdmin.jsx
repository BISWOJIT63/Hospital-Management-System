import React, { useState, useEffect } from "react";
import { Menu, Activity } from 'lucide-react';
import { useBreakpoint } from "./hooks/useBreakpoint";
import { FontLoader } from "./components/FontLoader";
import { LoginScreen } from "./components/LoginScreen";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { ApprovalsSection } from "./components/ApprovalsSection";
import { ManageSection } from "./components/ManageSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ActivitySection } from "./components/ActivitySection";
import { SettingsSection } from "./components/SettingsSection";
import { SidebarContent } from "./components/SidebarContent";
import { navSections } from "./mockData";
import { api } from "../utils/api";

const Dashboard = ({ onLogout }) => {
  const [active, setActive] = useState("analytics");
  const [time, setTime] = useState(new Date());
  const [drawer, setDrawer] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/analytics/superadmin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = () => {
    fetchDashboardData();
  };

  const renderSection = () => {
    if (loading) return <div style={{ color: "#00f5d4", padding: 20 }}>Loading Nexus Command Center Data...</div>;
    if (!dashboardData) return <div style={{ color: "#ff3b6b", padding: 20 }}>Failed to load data. Use mock data or check connection.</div>;

    switch (active) {
      case "analytics": return <AnalyticsSection data={dashboardData} />;
      case "approvals": return <ApprovalsSection data={dashboardData} refresh={refreshData} />;
      case "manage": return <ManageSection data={dashboardData} refresh={refreshData} />;
      case "reviews": return <ReviewsSection data={dashboardData} refresh={refreshData} />;
      case "activity": return <ActivitySection data={dashboardData} />;
      case "settings": return <SettingsSection />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div style={{ width: 230, background: "var(--bg2)", borderRight: "1px solid var(--border)", flexShrink: 0 }}>
          <SidebarContent active={active} setActive={setActive} time={time} onLogout={onLogout} />
        </div>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && drawer && (
        <>
          <div className="sidebar-overlay" onClick={() => setDrawer(false)} />
          <div className="sidebar-drawer">
            <SidebarContent active={active} setActive={setActive} time={time} onLogout={onLogout} onClose={() => setDrawer(false)} />
          </div>
        </>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Header */}
        <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: `0 ${isMobile ? 12 : 18}px`, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {!isDesktop && (
              <button onClick={() => setDrawer(true)} style={{ background: "none", border: "1px solid var(--border)", color: "#00f5d4", borderRadius: 4, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Menu size={18} />
              </button>
            )}
            <div>
              <div className="orbitron" style={{ fontSize: "clamp(10px,2vw,13px)", fontWeight: 700, color: "#fff", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
                {navSections.find(s => s.id === active)?.icon && React.createElement(navSections.find(s => s.id === active).icon, { size: 16 })}
                {navSections.find(s => s.id === active)?.label}
              </div>
              {!isMobile && <div className="mono" style={{ fontSize: 8, color: "#5a8a84", letterSpacing: 3 }}>HMS NEXUS COMMAND CENTER</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 7 : 14 }}>
            {!isMobile && <div style={{ display: "flex", gap: 6 }}><span className="tag tag-green" style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e676" }} /> ONLINE</span><span className="tag tag-cyan">LIVE API</span></div>}
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#00f5d4,#7b2ff7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}><Activity size={16} /></div>
              {!isMobile && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>Super Admin</div>
                  <div className="mono" style={{ fontSize: 9, color: "#5a8a84" }}>admin@hms.io</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 10 : 18, paddingBottom: isMobile ? 76 : isTablet ? 18 : 18 }}>
          {renderSection()}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <div className="mobile-nav">
          {navSections.map(s => (
            <div key={s.id} className={`mobile-nav-item ${active === s.id ? "active" : ""}`} onClick={() => setActive(s.id)}>
              <s.icon size={20} />
              <span>{s.label}</span>
              {s.badge && <span style={{ position: "absolute", top: 2, right: "calc(50% - 14px)", background: "#f72585", color: "#fff", borderRadius: 8, padding: "0 4px", fontSize: 8, lineHeight: "13px" }} className="notif-dot">{dashboardData?.pendingRegs?.length || s.badge}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <FontLoader />
      {loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <LoginScreen onLogin={() => setLoggedIn(true)} />}
    </>
  );
}