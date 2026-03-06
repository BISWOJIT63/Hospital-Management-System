import React from 'react';
import { Building2, PlusSquare, Users, Activity, Hexagon } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useBreakpoint } from '../hooks/useBreakpoint';
import { T, ttip } from './Helpers';
import { StatCard } from './StatCard';

export const AnalyticsSection = ({ data }) => {
    const { isMobile } = useBreakpoint();
    const { monthlyData = [], pieData = [], serviceData = [] } = data || {};

    const totalHospitals = pieData.find(p => p.name === 'Hospitals')?.value || 0;
    const totalClinics = pieData.find(p => p.name === 'Clinics')?.value || 0;
    const totalPatients = monthlyData.reduce((acc, curr) => acc + (curr.patients || 0), 0);
    const totalServices = serviceData.reduce((acc, curr) => acc + (curr.count || 0), 0);

    return (
        <div className="fade-in">
            <T icon={Hexagon} c="SYSTEM ANALYTICS" />
            <div className="g4" style={{ marginBottom: 14 }}>
                <StatCard label="TOTAL HOSPITALS" value={totalHospitals.toString()} sub="Across platform" icon={<Building2 size={24} />} color="#00f5d4" trend={12} />
                <StatCard label="TOTAL CLINICS" value={totalClinics.toString()} sub="Active network" icon={<PlusSquare size={24} />} color="#7b2ff7" trend={8} />
                <StatCard label="TOTAL PATIENTS" value={totalPatients.toString()} sub="Registered" icon={<Users size={24} />} color="#f72585" trend={15} />
                <StatCard label="TOTAL SERVICES" value={totalServices.toString()} sub="Procedures tracked" icon={<Activity size={24} />} color="#ffb700" trend={21} />
            </div>
            <div className="g2-1" style={{ marginBottom: 14 }}>
                <div className="card" style={{ padding: 16 }}>
                    <div className="orbitron" style={{ fontSize: 10, color: "#5a8a84", letterSpacing: 1, marginBottom: 12 }}>GROWTH TRAJECTORY</div>
                    <ResponsiveContainer width="100%" height={190}>
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00f5d4" stopOpacity={.3} /><stop offset="95%" stopColor="#00f5d4" stopOpacity={0} /></linearGradient>
                                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7b2ff7" stopOpacity={.3} /><stop offset="95%" stopColor="#7b2ff7" stopOpacity={0} /></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,245,212,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: "#5a8a84", fontSize: 10, fontFamily: "Share Tech Mono" }} />
                            <YAxis tick={{ fill: "#5a8a84", fontSize: 10, fontFamily: "Share Tech Mono" }} width={28} />
                            <Tooltip {...ttip} />
                            <Area type="monotone" dataKey="hospitals" stroke="#00f5d4" fill="url(#gH)" strokeWidth={2} />
                            <Area type="monotone" dataKey="clinics" stroke="#7b2ff7" fill="url(#gC)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div className="orbitron" style={{ fontSize: 10, color: "#5a8a84", letterSpacing: 1, marginBottom: 12 }}>ENTITY DISTRIBUTION</div>
                    <ResponsiveContainer width="100%" height={190}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={isMobile ? 35 : 50} outerRadius={isMobile ? 58 : 78} dataKey="value" paddingAngle={3}>
                                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip {...ttip} />
                            <Legend iconType="circle" wrapperStyle={{ fontFamily: "Rajdhani", fontSize: 12, color: "#5a8a84" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="g2">
                <div className="card" style={{ padding: 16 }}>
                    <div className="orbitron" style={{ fontSize: 10, color: "#5a8a84", letterSpacing: 1, marginBottom: 12 }}>PATIENT FLOW</div>
                    <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,245,212,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: "#5a8a84", fontSize: 10, fontFamily: "Share Tech Mono" }} />
                            <YAxis tick={{ fill: "#5a8a84", fontSize: 10, fontFamily: "Share Tech Mono" }} width={30} />
                            <Tooltip {...ttip} />
                            <Bar dataKey="patients" fill="#f72585" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div className="orbitron" style={{ fontSize: 10, color: "#5a8a84", letterSpacing: 1, marginBottom: 12 }}>TOP SERVICES</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4 }}>
                        {serviceData.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 74, fontSize: 12, color: "#aaa", fontFamily: "Rajdhani", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 5 }}>
                                    <div style={{ width: `${(s.count / 480) * 100}%`, height: "100%", background: s.color, borderRadius: 2 }} />
                                </div>
                                <span className="mono" style={{ fontSize: 9, color: "#5a8a84", width: 26, textAlign: "right" }}>{s.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
