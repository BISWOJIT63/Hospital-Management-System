import React from 'react';
import { Hexagon } from 'lucide-react';
import { T } from './Helpers';

export const ActivitySection = ({ data }) => {
    const logs = data?.logs || [];

    return (
        <div className="fade-in">
            <T icon={Hexagon} c="ACTIVITY LOG" />
            <div className="card" style={{ padding: 16 }}>
                {logs.length === 0 && <div style={{ color: '#5a8a84', padding: '10px 0' }}>No activity logs found.</div>}
                {logs.map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < logs.length - 1 ? "1px solid rgba(0,245,212,0.06)" : "none" }}>
                        <div className="mono" style={{ fontSize: 10, color: "#5a8a84", width: 65, flexShrink: 0 }}>{a.time}</div>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color || "#00f5d4", flexShrink: 0 }} />
                        <div style={{ flex: 1, fontSize: 13, minWidth: 0 }}>
                            <span style={{ fontWeight: 700, color: "#fff" }}>{a.action}</span>
                            <span style={{ color: "#aaa" }}> — {a.entity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
