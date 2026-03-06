import React from 'react';

export const T = ({ icon: Icon, c }) => (
    <div className="orbitron" style={{ fontSize: "clamp(11px,2vw,14px)", color: "#00f5d4", letterSpacing: 2, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && <Icon size={16} />}
        <span>{c}</span>
    </div>
);
export const Sub = ({ c }) => <div className="orbitron" style={{ fontSize: 11, color: "#5a8a84", letterSpacing: 1, marginBottom: 16 }}>{c}</div>;
export const ttip = { contentStyle: { background: "#06122e", border: "1px solid rgba(0,245,212,0.2)", borderRadius: 6, fontFamily: "Rajdhani", fontSize: 13 } };
