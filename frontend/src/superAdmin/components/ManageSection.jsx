import React, { useState, useEffect } from "react";
import { Hexagon } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { T } from "./Helpers";

export const ManageSection = ({ data, refresh }) => {
  const [entities, setEntities] = useState([]);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (data && data.approvedList) {
      setEntities(data.approvedList);
    }
  }, [data]);

  const toggle = (id) => {
    setEntities((e) =>
      e.map((x) =>
        x.id === id
          ? { ...x, status: x.status === "active" ? "on-hold" : "active" }
          : x,
      ),
    );
    if (refresh) setTimeout(refresh, 1000);
  };

  const remove = (id) => {
    setEntities((e) => e.filter((x) => x.id !== id));
    if (refresh) setTimeout(refresh, 1000);
  };

  if (isMobile)
    return (
      <div className="fade-in">
        <T icon={Hexagon} c="MANAGE ENTITIES" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {entities.length === 0 && <div style={{ color: '#5a8a84', padding: '20px 0' }}>No active entities found in the database.</div>}
          {entities.map((e) => (
            <div key={e.id} className="card" style={{ padding: "13px 15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div>
                  <div
                    style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}
                  >
                    {e.name}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span
                      className={`tag ${e.type === "Hospital" ? "tag-cyan" : e.type === "Clinic" ? "tag-green" : "tag-red"}`}
                    >
                      {e.type}
                    </span>
                    <span
                      className={`tag ${e.status === "active" ? "tag-green" : "tag-green"}`}
                    >
                      {e.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 12, color: "#00f5d4" }}
                >
                  {e.patients || 0} pts
                </div>
              </div>
              <div
                className="mono"
                style={{ fontSize: 9, color: "#5a8a84", marginBottom: 10 }}
              >
                {e.id.substring(0, 8)}... · {e.city} · {e.approvedDate}
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                <button
                  className="btn-warn"
                  style={{ flex: 1 }}
                  onClick={() => toggle(e.id)}
                >
                  {e.status === "active" ? "HOLD" : "REACTIVATE"}
                </button>
                <button
                  className="btn-danger"
                  style={{ flex: 1 }}
                  onClick={() => remove(e.id)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="fade-in">
      <T icon={Hexagon} c="MANAGE ENTITIES" />
      <div className="card table-scroll">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,245,212,0.1)" }}>
              {[
                "ID",
                "NAME",
                "TYPE",
                "CITY",
                "STATUS",
                "PATIENTS",
                "APPROVED",
                "ACTIONS",
              ].map((h) => (
                <th
                  key={h}
                  className="mono"
                  style={{
                    padding: "11px 13px",
                    textAlign: "left",
                    fontSize: 9,
                    color: "#5a8a84",
                    letterSpacing: 2,
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entities.length === 0 && (
              <tr>
                <td colSpan="8" style={{ padding: 20, textAlign: 'center', color: '#5a8a84' }}>No active entities found in the database.</td>
              </tr>
            )}
            {entities.map((e) => (
              <tr
                key={e.id}
                className="table-row"
                style={{ borderBottom: "1px solid rgba(0,245,212,0.05)" }}
              >
                <td
                  className="mono"
                  style={{
                    padding: "11px 13px",
                    fontSize: 10,
                    color: "#5a8a84",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.id.substring(0, 8)}...
                </td>
                <td
                  style={{
                    padding: "11px 13px",
                    fontWeight: 600,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.name}
                </td>
                <td style={{ padding: "11px 13px" }}>
                  <span
                    className={`tag ${e.type === "Hospital" ? "tag-cyan" : e.type === "Clinic" ? "tag-green" : "tag-red"}`}
                  >
                    {e.type}
                  </span>
                </td>
                <td
                  style={{
                    padding: "11px 13px",
                    fontSize: 13,
                    color: "#aaa",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.city}
                </td>
                <td style={{ padding: "11px 13px" }}>
                  <span
                    className={`tag ${e.status === "active" ? "tag-green" : "tag-green"}`}
                  >
                    {e.status.toUpperCase()}
                  </span>
                </td>
                <td
                  className="mono"
                  style={{
                    padding: "11px 13px",
                    fontSize: 12,
                    color: "#00f5d4",
                  }}
                >
                  {e.patients || 0}
                </td>
                <td
                  className="mono"
                  style={{
                    padding: "11px 13px",
                    fontSize: 10,
                    color: "#5a8a84",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.approvedDate}
                </td>
                <td style={{ padding: "11px 13px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-warn" onClick={() => toggle(e.id)}>
                      {e.status === "active" ? "HOLD" : "REACTIVATE"}
                    </button>
                    <button className="btn-danger" onClick={() => remove(e.id)}>
                      REMOVE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
