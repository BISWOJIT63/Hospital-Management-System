import { Hexagon, Building2, PlusSquare, UserRound, Check, X } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { T } from "./Helpers";
import { api } from "../../utils/api";
import { useEffect,useState } from "react";

export const ApprovalsSection = ({ data, refresh }) => {
  const [regs, setRegs] = useState([]);
  const [filter, setFilter] = useState("All");
  const { isMobile } = useBreakpoint();

  
  useEffect(() => {
    if (data && data.pendingRegs) {
      setRegs(data.pendingRegs);
    }
  }, [data]);

  const handle = async (id, act) => {
    try {
      const token = localStorage.getItem('token');
      // Optimistic update: instantly remove the row for snappy UX
      setRegs((r) => r.filter((x) => String(x.id) !== String(id)));

      await api.updateFacilityStatus(id, act, token);
      
      // Refresh from DB immediately so the list reflects the true DB state
      if (refresh) setTimeout(refresh, 300);
    } catch (e) {
       console.error("Error updating approval status", e);
       if (refresh) refresh();
    }
  };


  const filtered = filter === "All" ? regs : regs.filter((r) => r.type === filter);

  return (
    <div className="fade-in">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <T icon={Hexagon} c="REGISTRATION APPROVALS" />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["All", "Hospital", "Clinic", "Doctor"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background:
                  filter === f ? "rgba(0,245,212,0.1)" : "transparent",
                border: `1px solid ${filter === f ? "#00f5d4" : "rgba(0,245,212,0.15)"}`,
                color: filter === f ? "#00f5d4" : "#5a8a84",
                padding: "4px 11px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "Rajdhani",
                fontSize: 12,
              }}
            >
              {f === "Hospital" || f === "Clinic" ? f.toUpperCase() : f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 && <div style={{ color: '#5a8a84', padding: '20px 0' }}>No pending registrations found in the database.</div>}
        {filtered.map((r) => (
          <div
            key={r.id}
            className="card scan-in"
            style={{
              padding: "13px 15px",
              opacity: r.status !== "pending" ? 0.5 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                gap: 12,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 7,
                    background:
                      r.type === "Hospital"
                        ? "rgba(0,245,212,0.1)"
                        : r.type === "Clinic"
                          ? "rgba(123,47,247,0.1)"
                          : "rgba(247,37,133,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      r.type === "Hospital"
                        ? "#00f5d4"
                        : r.type === "Clinic"
                          ? "#7b2ff7"
                          : "#f72585",
                    flexShrink: 0,
                  }}
                >
                  {r.type === "Hospital" ? (
                    <Building2 size={20} />
                  ) : r.type === "Clinic" ? (
                    <PlusSquare size={20} />
                  ) : (
                    <UserRound size={20} />
                  )}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      flexWrap: "wrap",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 14 }}>
                      {r.name}
                    </span>
                    <span
                      className={`tag ${r.type === "Hospital" ? "tag-cyan" : r.type === "Clinic" ? "tag-green" : "tag-red"}`}
                    >
                      {r.type}
                    </span>
                    {r.specialty && (
                      <span className="tag tag-green">{r.specialty}</span>
                    )}
                    {r.category && r.category !== 'N/A' && (
                      <span className="tag tag-cyan">{r.category}</span>
                    )}
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 9, color: "#5a8a84", display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span>{r.id.substring(0, 8)}... · {r.city} · {r.date} · {r.docs} docs</span>
                    <a
                      href={r.type === "Hospital" ? `/Hospital-profile/${r.id}` : r.type === "Clinic" ? `/clinic-profile/${r.id}` : `/doctors-profile/${r.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#00f5d4', textDecoration: 'underline' }}
                    >
                      (PREVIEW)
                    </a>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 7,
                  flexShrink: 0,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                {r.status === "pending" ? (
                  <>
                    <button
                      className="btn-success"
                      style={{
                        ...(isMobile ? { flex: 1 } : {}),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                      onClick={() => handle(r.id, "approved")}
                    >
                      <Check size={14} /> APPROVE
                    </button>
                    <button
                      className="btn-danger"
                      style={{
                        ...(isMobile ? { flex: 1 } : {}),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                      onClick={() => handle(r.id, "rejected")}
                    >
                      <X size={14} /> REJECT
                    </button>
                  </>
                ) : (
                  <span
                    className={`tag ${r.status === "approved" ? "tag-green" : "tag-red"}`}
                  >
                    {r.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
