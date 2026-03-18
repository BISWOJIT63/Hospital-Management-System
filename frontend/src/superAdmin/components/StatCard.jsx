import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({ label, value, sub, icon, color, trend }) => (
  <div
    className="card stat-card glow-box fade-in"
    style={{ padding: "16px 18px", "--accent": color }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          className="mono"
          style={{
            fontSize: 9,
            color: "#5a8a84",
            letterSpacing: 2,
            marginBottom: 6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        <div
          className="orbitron"
          style={{
            fontSize: "clamp(18px,3.5vw,26px)",
            fontWeight: 800,
            color,
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#5a8a84",
            marginTop: 5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {sub}
        </div>
      </div>
      <div
        style={{
          fontSize: "clamp(20px,3vw,28px)",
          opacity: 0.7,
          flexShrink: 0,
          marginLeft: 6,
        }}
      >
        {icon}
      </div>
    </div>
    {trend && (
      <div
        style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}
      >
        <span
          style={{
            color: trend > 0 ? "#00e676" : "#ff3b6b",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{" "}
          {Math.abs(trend)}%
        </span>
        <span className="mono" style={{ fontSize: 9, color: "#5a8a84" }}>
          vs last month
        </span>
      </div>
    )}
  </div>
);
