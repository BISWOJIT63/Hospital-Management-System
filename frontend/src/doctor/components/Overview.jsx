import React from "react";
import { Icon, ic } from "../icons";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    RadialBarChart,
    RadialBar,
    LineChart,
    Line,
} from "recharts";
import {
    PATIENT_TREND,
    CONDITION_DATA,
    WEEKLY_APT,
    RADIAL_DATA,
    REVENUE_DATA,
    RATING_TREND,
} from "../mockData";

export default function Overview({
    patients,
    pendingCount,
    avgRating,
    totalRevenue,
    reviews,
    setActiveTab,
}) {
    const StatusBadge = ({ status }) => (
        <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${status === "approved"
                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                : status === "pending"
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    : status === "rejected"
                        ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
        >
            {status}
        </span>
    );

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Patients",
                        value: patients.length,
                        icon: ic.patients,
                        color: "green",
                        trend: "+8%",
                        sub: "+3 this week",
                    },
                    {
                        label: "Pending Approvals",
                        value: pendingCount,
                        icon: ic.clock,
                        color: "amber",
                        trend: null,
                        sub: "Need attention",
                    },
                    {
                        label: "Avg Rating",
                        value: avgRating,
                        icon: ic.star,
                        color: "green",
                        trend: "+0.2",
                        sub: `${reviews.length} reviews`,
                    },
                    {
                        label: "Revenue (Mar)",
                        value: `₹${totalRevenue.toLocaleString()}`,
                        icon: ic.billing,
                        color: "green",
                        trend: "+12%",
                        sub: "Paid invoices",
                    },
                ].map((s, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 transition-colors shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color === "amber"
                                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500"
                                    : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500"
                                    }`}
                            >
                                <Icon path={s.icon} size={15} />
                            </div>
                            {s.trend && (
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 px-2 py-0.5 rounded-full">
                                    {s.trend}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">
                            {s.value}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            {s.label}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {s.sub}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">
                                Patient Activity
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                Monthly patients vs checkups
                            </p>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-1 bg-green-600 dark:bg-green-500 rounded-full" />
                                Patients
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-1 bg-green-300 dark:bg-green-800 rounded-full" />
                                Checkups
                            </span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={190}>
                        <AreaChart
                            data={PATIENT_TREND}
                            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#86efac" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#86efac" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--chart-grid)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="patients"
                                stroke="#16a34a"
                                strokeWidth={2.5}
                                fill="url(#gP)"
                                dot={{ fill: "#16a34a", r: 3, strokeWidth: 0 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="checkups"
                                stroke="#86efac"
                                strokeWidth={2}
                                fill="url(#gC)"
                                dot={{ fill: "#86efac", r: 3, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                        Conditions
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                        Distribution by type
                    </p>
                    <ResponsiveContainer width="100%" height={130}>
                        <PieChart>
                            <Pie
                                data={CONDITION_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={38}
                                outerRadius={62}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {CONDITION_DATA.map((e, i) => (
                                    <Cell key={i} fill={e.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                                formatter={(v) => [`${v}%`, ""]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1 mt-2">
                        {CONDITION_DATA.map((c, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-sm inline-block"
                                        style={{ background: c.color }}
                                    />
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        {c.name}
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                    {c.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm lg:col-span-1">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                        This Week
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                        Scheduled vs completed
                    </p>
                    <ResponsiveContainer width="100%" height={170}>
                        <BarChart
                            data={WEEKLY_APT}
                            barGap={4}
                            margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--chart-grid)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                            />
                            <Bar
                                dataKey="apt"
                                fill="var(--chart-slate)"
                                radius={[4, 4, 0, 0]}
                                name="Scheduled"
                            />
                            <Bar
                                dataKey="done"
                                fill="#16a34a"
                                radius={[4, 4, 0, 0]}
                                name="Completed"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                        Performance
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                        Key metrics
                    </p>
                    <ResponsiveContainer width="100%" height={150}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius={28}
                            outerRadius={70}
                            data={RADIAL_DATA}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar
                                minAngle={5}
                                dataKey="value"
                                cornerRadius={6}
                                background={{ fill: "var(--chart-grid)" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                                formatter={(v) => [`${v}%`]}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="space-y-1 mt-1">
                        {RADIAL_DATA.map((d, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full inline-block"
                                        style={{ background: d.fill }}
                                    />
                                    <span className="text-xs text-slate-600 dark:text-slate-400">
                                        {d.name}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                    {d.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-800 dark:text-white">
                            Recent Requests
                        </h3>
                        <button
                            onClick={() => setActiveTab("patients")}
                            className="text-xs text-green-600 dark:text-green-500 font-medium hover:underline"
                        >
                            View all →
                        </button>
                    </div>
                    <div className="space-y-2">
                        {patients.slice(0, 5).map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-500 font-bold text-xs shrink-0">
                                        {p.avatar}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                            {p.name}
                                        </p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[100px]">
                                            {p.condition}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={p.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">
                                Revenue Trend
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                Monthly collected (₹)
                            </p>
                        </div>
                        <span className="text-lg font-bold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-xl">
                            ₹{totalRevenue.toLocaleString()}
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={110}>
                        <BarChart
                            data={REVENUE_DATA}
                            margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--chart-grid)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                                formatter={(v) => [`₹${v.toLocaleString()}`, ""]}
                            />
                            <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">
                                Rating Trend
                            </h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                7-month average
                            </p>
                        </div>
                        <span className="text-lg font-bold text-green-600 dark:text-green-500 flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-xl">
                            {avgRating} <span className="text-sm">★</span>
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height={110}>
                        <LineChart
                            data={RATING_TREND}
                            margin={{ top: 5, right: 10, left: -28, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--chart-grid)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[4, 5]}
                                tick={{ fontSize: 11, fill: "var(--chart-text)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid var(--chart-border)",
                                    background: "var(--chart-bg)",
                                    color: "var(--chart-tooltip-text)",
                                    fontSize: 12,
                                }}
                                formatter={(v) => [v.toFixed(1), "Rating"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="rating"
                                stroke="#16a34a"
                                strokeWidth={3}
                                dot={{ fill: "#16a34a", r: 4, strokeWidth: 0, stroke: "#fff" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
