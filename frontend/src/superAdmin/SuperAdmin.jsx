import {
  Menu,
  Activity,
  PieChart,
  ClipboardCheck,
  Building2,
  Star,
  Settings,
  RefreshCcw,
} from "lucide-react";
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

const navSections = [
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "approvals", label: "Approvals", icon: ClipboardCheck },
  { id: "manage", label: "Manage", icon: Building2 },
  { id: "reviews", label: "Reviews", icon: Star, badge: 2 },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];
import { api } from "../utils/api";
import React, { useState, useEffect } from "react";

const Dashboard = ({ onLogout }) => {
  const [active, setActive] = useState("analytics");
  const [time, setTime] = useState(new Date());
  const [drawer, setDrawer] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString(),
  );

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        onLogout();
        return;
      }
      const data = await api.getSuperAdminDashboard(token);
      setDashboardData(data);
      setLastUpdated(new Date().toLocaleTimeString());
      if (!isReady) setTimeout(() => setIsReady(true), 150);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchDashboardData();
  };

  const renderSection = () => {
    if (loading)
      return (
        <div style={{ color: "#00f5d4", padding: 20 }}>
          Loading Aether Care Data...
        </div>
      );
    if (!dashboardData)
      return (
        <div style={{ color: "#ff3b6b", padding: 20 }}>
          Failed to load data. Use mock data or check connection.
        </div>
      );
    if (!isReady)
      return (
        <div
          className="fade-in"
          style={{
            color: "rgba(0, 245, 212, 0.5)",
            padding: 20,
            animation: "pulse 1.5s infinite",
          }}
        >
          Establishing Secure Link...
        </div>
      );

    switch (active) {
      case "analytics":
        return <AnalyticsSection data={dashboardData} />;
      case "approvals":
        return <ApprovalsSection data={dashboardData} refresh={refreshData} />;
      case "manage":
        return <ManageSection data={dashboardData} refresh={refreshData} />;
      case "reviews":
        return <ReviewsSection data={dashboardData} refresh={refreshData} />;
      case "activity":
        return <ActivitySection data={dashboardData} />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          style={{
            width: 230,
            background: "var(--bg2)",
            borderRight: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <SidebarContent
            active={active}
            setActive={setActive}
            time={time}
            onLogout={onLogout}
            pendingCount={dashboardData?.pendingRegs?.length ?? 0}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && drawer && (
        <>
          <div className="sidebar-overlay" onClick={() => setDrawer(false)} />
          <div className="sidebar-drawer">
            <SidebarContent
              active={active}
              setActive={setActive}
              time={time}
              onLogout={onLogout}
              onClose={() => setDrawer(false)}
              pendingCount={dashboardData?.pendingRegs?.length ?? 0}
            />
          </div>
        </>
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            background: "var(--bg2)",
            borderBottom: "1px solid var(--border)",
            padding: `0 ${isMobile ? 12 : 18}px`,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {!isDesktop && (
              <button
                onClick={() => setDrawer(true)}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "#00f5d4",
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Menu size={18} />
              </button>
            )}
            <div>
              <div
                className="orbitron"
                style={{
                  fontSize: "clamp(10px,2vw,13px)",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {navSections.find((s) => s.id === active)?.icon &&
                  React.createElement(
                    navSections.find((s) => s.id === active).icon,
                    { size: 16 },
                  )}
                {navSections.find((s) => s.id === active)?.label}
              </div>
              {!isMobile && (
                <div
                  className="mono"
                  style={{ fontSize: 8, color: "#5a8a84", letterSpacing: 3 }}
                >
                  Aether Care Command Center
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 7 : 14,
            }}
          >
            {!isMobile && (
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  className="tag tag-green"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#00e676",
                    }}
                  />{" "}
                  ONLINE
                </span>
                <span className="tag tag-cyan">LIVE API</span>
                <button
                  onClick={refreshData}
                  className="tag"
                  style={{
                    cursor: "pointer",
                    background: "rgba(0,245,212,0.1)",
                    color: "#00f5d4",
                    border: "1px solid rgba(0,245,212,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <RefreshCcw
                    size={10}
                    className={loading ? "animate-spin" : ""}
                  />{" "}
                  REFRESH
                </button>
                <span
                  className="mono"
                  style={{
                    fontSize: 9,
                    color: "#5a8a84",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  UPDATED: {lastUpdated}
                </span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#00f5d4,#7b2ff7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <Activity size={16} />
              </div>
              {!isMobile && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
                    {dashboardData?.adminName || "Super Admin"}
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 9, color: "#5a8a84" }}
                  >
                    {dashboardData?.adminEmail || "admin@hms.io"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? 10 : 18,
            paddingBottom: isMobile ? 76 : isTablet ? 18 : 18,
          }}
        >
          {renderSection()}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <div className="mobile-nav">
          {navSections.map((s) => (
            <div
              key={s.id}
              className={`mobile-nav-item ${active === s.id ? "active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <s.icon size={20} />
              <span>{s.label}</span>
              {s.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: "calc(50% - 14px)",
                    background: "#f72585",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "0 4px",
                    fontSize: 8,
                    lineHeight: "13px",
                  }}
                  className="notif-dot"
                >
                  {dashboardData?.pendingRegs?.length || s.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <>
      <FontLoader />
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      )}
    </>
  );
}
