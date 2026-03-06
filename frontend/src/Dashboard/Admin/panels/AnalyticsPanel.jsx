import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Users,
  Star,
  Layers,
  CheckSquare,
  Loader2,
} from "lucide-react";
import { Card, SectionHdr, StatCard } from "../components/AdminUI";
import { api } from "../../../utils/api";

export default function AnalyticsPanel() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await api.getAdminAnalytics(token);
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const CustomTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl text-xs">
        <p className="font-black text-slate-700 dark:text-slate-200 mb-1">
          {label}
        </p>
        {payload.map((p) => (
          <p
            key={p.name}
            style={{ color: p.color }}
            className="font-semibold capitalize"
          >
            {p.name}:{" "}
            {p.name === "revenue"
              ? `$${(p.value / 1000).toFixed(0)}k`
              : p.value}
          </p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={32} className="animate-spin text-green-500" />
      </div>
    );
  }

  if (!analytics)
    return (
      <div className="p-8 text-center text-slate-500">
        No analytics data available.
      </div>
    );

  const { revenueData, patientData, bedData, deptPatients } = analytics;

  
  
  
  
  

  
  const totalRev = revenueData.reduce(
    (sum, item) => sum + (item.revenue || 0),
    0,
  );
  const totalVisits = patientData.reduce(
    (sum, item) => sum + (item.opd || 0) + (item.ipd || 0),
    0,
  );
  const totalBookings = Math.round(totalVisits * 0.35); 

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`$${(totalRev / 1000000).toFixed(2)}M`}
          sub="This year"
          color="green"
          trend="+18%"
        />
        <StatCard
          icon={Calendar}
          label="Total Bookings"
          value={totalBookings.toLocaleString()}
          sub="This year"
          color="teal"
          trend="+14%"
        />
        <StatCard
          icon={Users}
          label="Patient Visits"
          value={totalVisits.toLocaleString()}
          sub="This year"
          color="green"
          trend="+9%"
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value="4.8"
          sub="1,240 reviews"
          color="rose"
          trend="+0.2"
        />
      </div>

      {}
      <Card>
        <SectionHdr
          icon={TrendingUp}
          title="Revenue & Visits"
          sub="Monthly trend for 2026"
        />
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={revenueData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="vis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              strokeOpacity={0.2}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={45}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#rev)"
              name="revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#vis)"
              name="expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {}
        <Card>
          <SectionHdr
            icon={Layers}
            title="Patients by Department"
            sub="Distribution across departments"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={deptPatients}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="dept"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={35}
              />
              <Tooltip
                cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl text-xs">
                      <p className="font-black text-slate-700 dark:text-slate-200">
                        {label}
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-semibold">
                        {payload[0].value} patients
                      </p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {}
        <Card>
          <SectionHdr
            icon={CheckSquare}
            title="Booking Status"
            sub="Current distribution"
          />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={bedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bedData.map((e, i) => (
                    <Cell key={i} fill={e.color || "#6366f1"} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 flex-1">
              {bedData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: s.color || "#6366f1" }}
                    />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {s.name}
                    </span>
                  </div>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                    {s.value}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Total
                </span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                  {bedData.reduce((a, b) => a + (b.value || 0), 0)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {}
      <Card>
        <SectionHdr
          icon={Calendar}
          title="Monthly Bookings"
          sub="Booking count trend"
        />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={patientData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              strokeOpacity={0.2}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl text-xs">
                    <p className="font-black text-slate-700 dark:text-slate-200">
                      {label}
                    </p>
                    <p className="text-green-600 dark:text-green-500 font-semibold">
                      {payload[0].value} bookings
                    </p>
                  </div>
                ) : null
              }
            />
            <Line
              type="monotone"
              dataKey="opd"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="ipd"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
