import { Activity, X, Power, PieChart, ClipboardCheck, Building2, Star, Settings } from 'lucide-react';

const navSections = [
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "approvals", label: "Approvals", icon: ClipboardCheck },
    { id: "manage", label: "Manage", icon: Building2 },
    { id: "reviews", label: "Reviews", icon: Star, badge: 0 }, // Badge will be handled dynamically or from data
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
];

export const SidebarContent = ({ active, setActive, time, onLogout, onClose, pendingCount }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ padding: "18px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                    <div className="orbitron" style={{ fontSize: 11, fontWeight: 800, color: "#00f5d4", letterSpacing: 1 }}>Aether Care</div>
                    <div className="mono" style={{ fontSize: 8, color: "#5a8a84", letterSpacing: 3 }}>SUPER ADMIN</div>
                </div>
            </div>
            {onClose && <button onClick={onClose} style={{ background: "none", border: "none", color: "#5a8a84", cursor: "pointer", display: "flex", alignItems: "center" }}><X size={20} /></button>}
        </div>
        <nav style={{ flex: 1, padding: "12px 7px", overflowY: "auto" }}>
            <div className="mono" style={{ fontSize: 8, color: "#2a4a44", letterSpacing: 3, padding: "0 9px", marginBottom: 8 }}>NAVIGATION</div>
            {navSections.map(s => {
                const badge = s.id === "approvals"
                    ? (pendingCount > 0 ? pendingCount : null)
                    : s.badge;
                return (
                    <div key={s.id} className={`nav-item ${active === s.id ? "active" : ""}`} onClick={() => { setActive(s.id); onClose && onClose(); }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 11px", cursor: "pointer", borderRadius: 4, marginBottom: 2, color: active === s.id ? "#00f5d4" : "#5a8a84", fontSize: 13, fontFamily: "Rajdhani", fontWeight: 600 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <s.icon size={16} /><span>{s.label}</span>
                        </div>
                        {badge && <span style={{ background: "#f72585", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 9, fontFamily: "Share Tech Mono" }} className="notif-dot">{badge}</span>}
                    </div>
                );
            })}
        </nav>
        <div style={{ padding: "13px 16px", borderTop: "1px solid var(--border)" }}>
            <div className="mono" style={{ fontSize: 10, color: "#5a8a84", marginBottom: 7 }}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
            <button onClick={onLogout} style={{ background: "transparent", border: "1px solid rgba(255,59,107,0.3)", color: "#ff3b6b", borderRadius: 4, padding: "8px 14px", cursor: "pointer", fontFamily: "Rajdhani", fontSize: 12, fontWeight: 600, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Power size={14} /> TERMINATE SESSION</button>
        </div>
    </div>
);
