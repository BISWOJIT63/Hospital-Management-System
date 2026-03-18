import React, { useState } from "react";
import { Hexagon, Activity, AlertTriangle } from "lucide-react";

export const LoginScreen = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const go = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: id, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "ACCESS DENIED — Invalid credentials");
        setLoading(false);
        return;
      }
      if (data.role !== "SuperAdmin") {
        setErr("ACCESS DENIED — Not a SuperAdmin account");
        setLoading(false);
        return;
      }
      // Store token so all subsequent API calls are authorized
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (e) {
      setErr("ACCESS DENIED — Could not connect to server");
      setLoading(false);
    }
  };

  return (
    <div
      className="scanline"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center,#0a1a3e 0%,#020818 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle,rgba(0,245,212,0.06) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "min(420px,calc(100vw - 32px))",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: 14,
            }}
          >
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              className="spin-slow"
            >
              <circle
                cx="34"
                cy="34"
                r="30"
                fill="none"
                stroke="rgba(0,245,212,0.2)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="34"
                cy="34"
                r="24"
                fill="none"
                stroke="rgba(123,47,247,0.4)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg,#00f5d4,#7b2ff7)",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <Activity size={20} />
              </div>
            </div>
          </div>
          <div
            className="orbitron glow-text"
            style={{
              fontSize: "clamp(16px,5vw,22px)",
              fontWeight: 800,
              letterSpacing: 3,
              color: "#00f5d4",
            }}
          >
            HMS NEXUS
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: "#5a8a84",
              letterSpacing: 4,
              marginTop: 4,
            }}
          >
            SUPER ADMIN TERMINAL
          </div>
        </div>
        <div className="card glow-box" style={{ padding: "26px 24px" }}>
          <div
            className="orbitron"
            style={{
              fontSize: 11,
              color: "#00f5d4",
              letterSpacing: 2,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Hexagon size={14} /> IDENTITY VERIFICATION <Hexagon size={14} />
          </div>
          <div style={{ marginBottom: 13 }}>
            <label
              className="mono"
              style={{
                fontSize: 9,
                color: "#5a8a84",
                display: "block",
                marginBottom: 5,
                letterSpacing: 2,
              }}
            >
              EMAIL
            </label>
            <input
              className="input-field mono"
              type="email"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              placeholder="Enter SuperAdmin Email"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              className="mono"
              style={{
                fontSize: 9,
                color: "#5a8a84",
                display: "block",
                marginBottom: 5,
                letterSpacing: 2,
              }}
            >
              PASSKEY
            </label>
            <input
              className="input-field mono"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter Passkey"
              onKeyDown={(e) => e.key === "Enter" && go()}
            />
          </div>
          {err && (
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "#ff3b6b",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px",
                background: "rgba(255,59,107,0.08)",
                border: "1px solid rgba(255,59,107,0.2)",
                borderRadius: 4,
              }}
            >
              <AlertTriangle size={14} /> {err}
            </div>
          )}
          <button
            className="btn-primary"
            style={{
              width: "100%",
              padding: "11px",
              fontSize: 12,
              letterSpacing: 3,
            }}
            onClick={go}
            disabled={loading}
          >
            {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION"}
          </button>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: "#2a4a44",
              marginTop: 14,
              textAlign: "center",
            }}
          >
            Login with your SuperAdmin account email and password
          </div>
        </div>
      </div>
    </div>
  );
};
