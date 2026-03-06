import React, { useState } from 'react';
import { Hexagon, Activity, Check, User, Lock, Bell, Settings, Palette } from 'lucide-react';
import { T, Sub } from './Helpers';

export const SettingsSection = () => {
    const [profile, setProfile] = useState({ name: "Super Admin", email: "admin@hms.io", phone: "+91 98765 43210", role: "Super Administrator", org: "HMS Nexus Central", timezone: "IST (UTC+5:30)" });
    const [saved, setSaved] = useState(false);
    const [tab, setTab] = useState("profile");

    const save = { save: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); } }.save;
    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "notifications", label: "Alerts", icon: Bell },
        { id: "system", label: "System", icon: Settings },
        { id: "appearance", label: "Theme", icon: Palette },
    ];

    return (
        <div className="fade-in">
            <T icon={Hexagon} c="SETTINGS & PROFILE" />
            <div className="sl">
                <div className="card stabs" style={{ padding: 10, alignSelf: "start" }}>
                    {tabs.map(s => (
                        <div key={s.id} className={`nav-item ${tab === s.id ? "active" : ""}`} onClick={() => setTab(s.id)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 11px", cursor: "pointer", borderRadius: 4, fontSize: 13, fontFamily: "Rajdhani", fontWeight: 600, color: tab === s.id ? "#00f5d4" : "#5a8a84", whiteSpace: "nowrap" }}>
                            <s.icon size={16} />{s.label}
                        </div>
                    ))}
                </div>
                <div className="card" style={{ padding: 20 }}>
                    {tab === "profile" && (
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: 14, background: "rgba(0,245,212,0.04)", borderRadius: 7, border: "1px solid rgba(0,245,212,0.1)", flexWrap: "wrap" }}>
                                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#00f5d4,#7b2ff7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}><Activity size={32} /></div>
                                <div>
                                    <div className="orbitron" style={{ fontSize: 15, fontWeight: 800 }}>{profile.name}</div>
                                    <div className="mono" style={{ fontSize: 9, color: "#00f5d4", letterSpacing: 2, marginTop: 3 }}>{profile.role}</div>
                                    <div style={{ fontSize: 12, color: "#5a8a84", marginTop: 3 }}>{profile.email}</div>
                                </div>
                            </div>
                            <div className="pg" style={{ marginBottom: 16 }}>
                                {[["FULL NAME", "name"], ["EMAIL ADDRESS", "email"], ["PHONE NUMBER", "phone"], ["ORGANIZATION", "org"], ["TIMEZONE", "timezone"], ["ROLE", "role"]].map(([lbl, key]) => (
                                    <div key={key}>
                                        <label className="mono" style={{ fontSize: 9, color: "#5a8a84", display: "block", marginBottom: 5, letterSpacing: 2 }}>{lbl}</label>
                                        <input className="input-field" value={profile[key]} onChange={e => setProfile({ ...profile, [key]: e.target.value })} />
                                    </div>
                                ))}
                            </div>
                            <button className="btn-primary" onClick={save} style={{ padding: "9px 22px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, minWidth: 140 }}>{saved ? <><Check size={14} /> SAVED</> : "SAVE CHANGES"}</button>
                        </div>
                    )}
                    {tab === "security" && (
                        <div>
                            <Sub c="SECURITY SETTINGS" />
                            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 14 }}>
                                {[["CURRENT PASSWORD", "current password"], ["NEW PASSWORD", "new password"], ["CONFIRM PASSWORD", "confirm new password"]].map(([l, p]) => (
                                    <div key={l}>
                                        <label className="mono" style={{ fontSize: 9, color: "#5a8a84", display: "block", marginBottom: 5, letterSpacing: 2 }}>{l}</label>
                                        <input className="input-field" type="password" placeholder={`Enter ${p}`} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 13px", background: "rgba(0,245,212,0.04)", borderRadius: 6, border: "1px solid rgba(0,245,212,0.1)", marginBottom: 14, gap: 10 }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>Two-Factor Auth</div>
                                    <div style={{ fontSize: 12, color: "#5a8a84", marginTop: 2 }}>Extra security layer</div>
                                </div>
                                <div style={{ width: 40, height: 20, background: "#00e676", borderRadius: 12, position: "relative", cursor: "pointer", flexShrink: 0 }}>
                                    <div style={{ width: 16, height: 16, background: "#000", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} />
                                </div>
                            </div>
                            <button className="btn-primary" style={{ padding: "9px 20px" }}>UPDATE PASSWORD</button>
                        </div>
                    )}
                    {tab === "notifications" && (
                        <div>
                            <Sub c="NOTIFICATION PREFERENCES" />
                            {[
                                { label: "New Registration Alerts", desc: "Hospital/Clinic/Doctor registers", on: true },
                                { label: "Flagged Review Alerts", desc: "When a review is flagged", on: true },
                                { label: "System Health Reports", desc: "Weekly performance digest", on: false },
                                { label: "Security Alerts", desc: "Login attempts & policy changes", on: true },
                                { label: "Revenue Reports", desc: "Monthly financial summary", on: false },
                            ].map((n, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(0,245,212,0.06)", gap: 10 }}>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{n.label}</div>
                                        <div style={{ fontSize: 12, color: "#5a8a84", marginTop: 2 }}>{n.desc}</div>
                                    </div>
                                    <div style={{ width: 40, height: 20, background: n.on ? "#00f5d4" : "rgba(255,255,255,0.1)", borderRadius: 12, position: "relative", cursor: "pointer", flexShrink: 0 }}>
                                        <div style={{ width: 16, height: 16, background: n.on ? "#000" : "#555", borderRadius: "50%", position: "absolute", right: n.on ? 2 : undefined, left: n.on ? undefined : 2, top: 2, transition: "all 0.2s" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {tab === "system" && (
                        <div>
                            <Sub c="SYSTEM CONFIGURATION" />
                            <div className="g2" style={{ marginBottom: 16 }}>
                                {[["Max Upload Size", "25 MB"], ["Session Timeout", "60 min"], ["API Rate Limit", "1000/hr"], ["Data Retention", "36 months"]].map(([l, v]) => (
                                    <div key={l} className="card" style={{ padding: "11px 13px" }}>
                                        <div className="mono" style={{ fontSize: 9, color: "#5a8a84", marginBottom: 4, letterSpacing: 1 }}>{l}</div>
                                        <div className="orbitron" style={{ fontSize: 15, fontWeight: 700, color: "#00f5d4" }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-danger" style={{ padding: "8px 16px" }}>CLEAR SYSTEM CACHE</button>
                        </div>
                    )}
                    {tab === "appearance" && (
                        <div>
                            <Sub c="APPEARANCE" />
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Accent Color</div>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                    {["#00f5d4", "#7b2ff7", "#f72585", "#ffb700", "#00e676"].map(c => (
                                        <div key={c} style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer", border: c === "#00f5d4" ? "3px solid #fff" : "3px solid transparent" }} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Theme</div>
                                <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                                    {["Cyber Dark", "Deep Space", "Midnight"].map((t, i) => (
                                        <div key={t} style={{ padding: "7px 14px", border: `1px solid ${i === 0 ? "#00f5d4" : "rgba(0,245,212,0.15)"}`, borderRadius: 5, cursor: "pointer", fontSize: 12, color: i === 0 ? "#00f5d4" : "#5a8a84", background: i === 0 ? "rgba(0,245,212,0.05)" : "transparent" }}>{t}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
