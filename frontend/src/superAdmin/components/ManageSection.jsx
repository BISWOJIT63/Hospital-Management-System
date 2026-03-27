import React, { useState, useEffect } from "react";
import { Hexagon, Search } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { T } from "./Helpers";
import { api } from "../../utils/api";

export const ManageSection = ({ data, refresh }) => {
  const [entities, setEntities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (data && data.approvedList) {
      setEntities(data.approvedList);
    }
  }, [data]);

  const filteredEntities = entities.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || e.type === typeFilter;
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggle = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const target = entities.find(e => e.id === id);
      if (!target) return;
      const newStatus = target.status === "active" ? "on-hold" : "active";
      
      // Optimistic update
      setEntities((e) =>
        e.map((x) => (x.id === id ? { ...x, status: newStatus } : x))
      );

      await api.updateFacilityStatus(id, newStatus, token);
      if (refresh) setTimeout(refresh, 500);
    } catch (e) {
      console.error("Error toggling facility status", e);
      if (refresh) refresh();
    }
  };

  const remove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      // Optimistic update
      setEntities((e) => e.filter((x) => x.id !== id));

      await api.deleteFacility(id, token);
      if (refresh) setTimeout(refresh, 500);
    } catch (e) {
      console.error("Error removing facility", e);
      if (refresh) refresh();
    }
  };

  const filterBar = (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          flex: 1,
          minWidth: 200,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 15px",
          background: "rgba(0,245,212,0.05)",
          border: "1px solid rgba(0,245,212,0.1)",
        }}
      >
        <Search size={16} color="#5a8a84" />
        <input
          type="text"
          placeholder="Search by name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 13,
            width: "100%",
            outline: "none",
          }}
        />
      </div>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="card mono"
        style={{
          padding: "8px 12px",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          color: "#00f5d4",
          fontSize: 10,
          letterSpacing: 1,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="All">ALL TYPES</option>
        <option value="Hospital">HOSPITALS</option>
        <option value="Clinic">CLINICS</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="card mono"
        style={{
          padding: "8px 12px",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          color: "#00f5d4",
          fontSize: 10,
          letterSpacing: 1,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="All">ALL STATUS</option>
        <option value="active">ACTIVE</option>
        <option value="on-hold">ON HOLD</option>
      </select>
    </div>
  );

  if (isMobile)
    return (
      <div className="fade-in">
        <T icon={Hexagon} c="MANAGE ENTITIES" />
        {filterBar}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredEntities.length === 0 && (
            <div style={{ color: "#5a8a84", padding: "20px 0" }}>
              No entities matching your filters.
            </div>
          )}
          {filteredEntities.map((e) => (
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
                      className={`tag ${e.status === "active" ? "tag-green" : "tag-warn"}`}
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
      {filterBar}
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
            {filteredEntities.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  style={{ padding: 20, textAlign: "center", color: "#5a8a84" }}
                >
                  No entities matching your filters.
                </td>
              </tr>
            )}
            {filteredEntities.map((e) => (
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
                    className={`tag ${e.status === "active" ? "tag-green" : "tag-warn"}`}
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
                    <a
                      href={
                        e.type === "Hospital"
                          ? `/Hospital-profile/${e.id}`
                          : `/clinic-profile/${e.id}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn-warn"
                      style={{
                        textDecoration: "none",
                        background: "#00f5d4",
                        color: "#080d1a",
                      }}
                    >
                      VIEW
                    </a>
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
