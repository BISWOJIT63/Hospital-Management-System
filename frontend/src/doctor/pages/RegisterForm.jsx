import React, { useState, useRef } from "react";
import { Icon, ic } from "../icons";
import { Ambulance, Bandage } from "lucide-react";
import { DEPARTMENTS, SPECIALTIES } from "../../utils/constants";

export default function RegisterForm({ onSubmit, initialData }) {
    const [step, setStep] = useState(1);
    const [profilePic, setProfilePic] = useState(null);
    const [form, setForm] = useState({
        name: initialData?.name || "",
        specialty: initialData?.specialty || "",
        licenseNo: initialData?.licenseNo || "",
        experience: initialData?.experience || "",
        phone: initialData?.phone || "",
        email: initialData?.email || "",
        emergencyEmail: initialData?.emergencyEmail || "",
        category: initialData?.category || "",
        basePrice: initialData?.basePrice || "",
        about: initialData?.about || "",
        availability: initialData?.availability || "",
        treatments: initialData?.treatments?.length ? initialData.treatments : [{ name: "", desc: "", icon: <Bandage /> }],
        pricing: initialData?.pricing?.length ? initialData.pricing : [{ package: "Basic", price: "", includes: [""] }],
        specialists: initialData?.specialists?.length ? initialData.specialists : [
            { name: "", specialty: "", experience: "", availability: "" },
        ],
        businessHours: initialData?.businessHours?.length ? initialData.businessHours : [
            { day: "Monday", time: "9:00 AM - 5:00 PM", isOpen: true },
            { day: "Tuesday", time: "9:00 AM - 5:00 PM", isOpen: true },
            { day: "Wednesday", time: "9:00 AM - 5:00 PM", isOpen: true },
            { day: "Thursday", time: "9:00 AM - 5:00 PM", isOpen: true },
            { day: "Friday", time: "9:00 AM - 5:00 PM", isOpen: true },
            { day: "Saturday", time: "10:00 AM - 2:00 PM", isOpen: true },
            { day: "Sunday", time: "Closed", isOpen: false },
        ],
    });
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const fileRef = useRef();
    const steps = [
        "Personal Info",
        "Service Details",
        "Treatments & Pricing",
        "Schedule",
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Icon path={ic.award} size={16} /> MediConnect Doctor Portal
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                        Complete Your Profile
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Fill in your details to get started.
                    </p>
                </div>

                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className="relative z-10 flex flex-col items-center gap-1"
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i + 1 < step
                                    ? "bg-green-600 text-white"
                                    : i + 1 === step
                                        ? "bg-green-600 text-white ring-4 ring-green-100 dark:ring-green-900/30"
                                        : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                                    }`}
                            >
                                {i + 1 < step ? <Icon path={ic.check} size={14} /> : i + 1}
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:block ${i + 1 === step
                                    ? "text-green-600 dark:text-green-500"
                                    : "text-slate-400 dark:text-slate-500"
                                    }`}
                            >
                                {s}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Icon path={ic.user} className="text-green-600" /> Personal Information
                            </h2>
                            <div className="flex items-center gap-6">
                                <div
                                    className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer"
                                    onClick={() => fileRef.current.click()}
                                >
                                    {profilePic ? (
                                        <img
                                            src={profilePic}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Icon
                                                path={ic.upload}
                                                size={22}
                                                className="text-slate-400 dark:text-slate-500 mx-auto"
                                            />
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Photo</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const f = e.target.files[0];
                                        if (f) {
                                            const r = new FileReader();
                                            r.onload = (ev) => setProfilePic(ev.target.result);
                                            r.readAsDataURL(f);
                                        }
                                    }}
                                />
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">Profile Photo</p>
                                    <p className="text-sm text-slate-400 dark:text-slate-500">
                                        Upload a professional photo.
                                    </p>
                                    <button
                                        onClick={() => fileRef.current.click()}
                                        className="mt-1 text-sm text-green-600 dark:text-green-500 font-medium hover:underline"
                                    >
                                        Choose file
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div key="name">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="Dr. John Smith"
                                        value={form.name}
                                        onChange={(e) => set("name", e.target.value)}
                                    />
                                </div>
                                <div key="specialty">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Specialization
                                    </label>
                                    <select
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        value={form.specialty}
                                        onChange={(e) => set("specialty", e.target.value)}
                                    >
                                        <option value="">Select Specialty</option>
                                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div key="licenseNo">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        License Number
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="MH-123456"
                                        value={form.licenseNo}
                                        onChange={(e) => set("licenseNo", e.target.value)}
                                    />
                                </div>
                                <div key="experience">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Experience (years)
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="10"
                                        value={form.experience}
                                        onChange={(e) => set("experience", e.target.value)}
                                    />
                                </div>
                                <div key="phone">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Phone
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="+91-9876543210"
                                        value={form.phone}
                                        onChange={(e) => set("phone", e.target.value)}
                                    />
                                </div>
                                <div key="email">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Email
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="doctor@email.com"
                                        value={form.email}
                                        onChange={(e) => set("email", e.target.value)}
                                    />
                                </div>
                                <div key="city">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        City
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="Mumbai"
                                        value={form.city}
                                        onChange={(e) => set("city", e.target.value)}
                                    />
                                </div>
                                <div key="location">
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                        Location / Clinic address
                                    </label>
                                    <input
                                        className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                        placeholder="Andheri West, Mumbai"
                                        value={form.location}
                                        onChange={(e) => set("location", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="gap-3 flex text-xs font-semibold mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                    Emergency Contact Email
                                </label>
                                <input
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                    placeholder="emergency@hospital.com"
                                    value={form.emergencyEmail}
                                    onChange={(e) => set("emergencyEmail", e.target.value)}
                                />
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                    Used for critical alerts and emergency notifications.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Icon path={ic.briefcase} className="text-green-600" /> Service Details
                            </h2>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                    Category / Department
                                </label>
                                <select
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                    value={form.category}
                                    onChange={(e) => set("category", e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                    Base Price (₹)
                                </label>
                                <input
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                    placeholder="500"
                                    value={form.basePrice}
                                    onChange={(e) => set("basePrice", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                    Availability
                                </label>
                                <input
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white"
                                    placeholder="Mon-Sat, 9AM-6PM"
                                    value={form.availability}
                                    onChange={(e) => set("availability", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                                    About / Bio
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 dark:bg-slate-800 dark:text-white resize-none"
                                    placeholder="Tell patients about your expertise..."
                                    value={form.about}
                                    onChange={(e) => set("about", e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        Specialists / Team{" "}
                                        <span className="text-slate-300 dark:text-slate-600 font-normal">
                                            [specialists]
                                        </span>
                                    </label>
                                    <button
                                        onClick={() =>
                                            set("specialists", [
                                                ...form.specialists,
                                                {
                                                    name: "",
                                                    specialty: "",
                                                    experience: "",
                                                    availability: "",
                                                },
                                            ])
                                        }
                                        className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium hover:bg-green-100 dark:hover:bg-green-900/50"
                                    >
                                        + Add
                                    </button>
                                </div>
                                {form.specialists.map((sp, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-2 gap-2 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800"
                                    >
                                        <input
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                            placeholder="Name"
                                            value={sp.name}
                                            onChange={(e) => {
                                                const arr = [...form.specialists];
                                                arr[i].name = e.target.value;
                                                set("specialists", arr);
                                            }}
                                        />
                                        <select
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                            value={sp.specialty}
                                            onChange={(e) => {
                                                const arr = [...form.specialists];
                                                arr[i].specialty = e.target.value;
                                                set("specialists", arr);
                                            }}
                                        >
                                            <option value="">Specialty</option>
                                            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <input
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                            placeholder="Experience"
                                            value={sp.experience}
                                            onChange={(e) => {
                                                const arr = [...form.specialists];
                                                arr[i].experience = e.target.value;
                                                set("specialists", arr);
                                            }}
                                        />
                                        <input
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                            placeholder="Availability"
                                            value={sp.availability}
                                            onChange={(e) => {
                                                const arr = [...form.specialists];
                                                arr[i].availability = e.target.value;
                                                set("specialists", arr);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Icon path={ic.activity} className="text-green-600" />{" "}
                                Treatments & Pricing
                            </h2>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        Treatments{" "}
                                        <span className="text-slate-300 dark:text-slate-600 font-normal">
                                            [treatments]
                                        </span>
                                    </p>
                                    <button
                                        onClick={() =>
                                            set("treatments", [
                                                ...form.treatments,
                                                { name: "", desc: "", icon: "💉" },
                                            ])
                                        }
                                        className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium hover:bg-green-100 dark:hover:bg-green-900/50"
                                    >
                                        + Add
                                    </button>
                                </div>
                                {form.treatments.map((t, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-3 gap-2 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800"
                                    >
                                        {[
                                            ["name", "Treatment name"],
                                            ["desc", "Description"],
                                        ].map(([fld, ph]) => (
                                            <input
                                                key={fld}
                                                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                                placeholder={ph}
                                                value={t[fld]}
                                                onChange={(e) => {
                                                    const arr = [...form.treatments];
                                                    arr[i][fld] = e.target.value;
                                                    set("treatments", arr);
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                        Pricing Packages{" "}
                                        <span className="text-slate-300 dark:text-slate-600 font-normal">
                                            [pricing]
                                        </span>
                                    </p>
                                    <button
                                        onClick={() =>
                                            set("pricing", [
                                                ...form.pricing,
                                                { package: "Premium", price: "", includes: [""] },
                                            ])
                                        }
                                        className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium hover:bg-green-100 dark:hover:bg-green-900/50"
                                    >
                                        + Add
                                    </button>
                                </div>
                                {form.pricing.map((p, i) => (
                                    <div
                                        key={i}
                                        className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 mb-2 border border-slate-100 dark:border-slate-800 space-y-2"
                                    >
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                                placeholder="Package name"
                                                value={p.package}
                                                onChange={(e) => {
                                                    const arr = [...form.pricing];
                                                    arr[i].package = e.target.value;
                                                    set("pricing", arr);
                                                }}
                                            />
                                            <input
                                                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                                placeholder="Price (₹)"
                                                value={p.price}
                                                onChange={(e) => {
                                                    const arr = [...form.pricing];
                                                    arr[i].price = e.target.value;
                                                    set("pricing", arr);
                                                }}
                                            />
                                        </div>
                                        <input
                                            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-green-400"
                                            placeholder="Includes (comma separated)"
                                            value={p.includes.join(", ")}
                                            onChange={(e) => {
                                                const arr = [...form.pricing];
                                                arr[i].includes = e.target.value
                                                    .split(",")
                                                    .map((x) => x.trim());
                                                set("pricing", arr);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Icon path={ic.calendar} className="text-green-600" /> Business Hours{" "}
                                <span className="text-sm text-slate-400 dark:text-slate-500 font-normal">
                                    [businessHours]
                                </span>
                            </h2>
                            {form.businessHours.map((bh, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="w-24 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        {bh.day}
                                    </div>
                                    <div
                                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${bh.isOpen ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                                            }`}
                                        onClick={() => {
                                            const arr = [...form.businessHours];
                                            arr[i].isOpen = !arr[i].isOpen;
                                            set("businessHours", arr);
                                        }}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${bh.isOpen ? "left-5" : "left-0.5"
                                                }`}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 w-12">
                                        {bh.isOpen ? "Open" : "Closed"}
                                    </span>
                                    {bh.isOpen ? (
                                        <input
                                            className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={bh.time}
                                            onChange={(e) => {
                                                const arr = [...form.businessHours];
                                                arr[i].time = e.target.value;
                                                set("businessHours", arr);
                                            }}
                                        />
                                    ) : (
                                        <span className="flex-1 text-sm text-slate-400 dark:text-slate-500 italic">
                                            Closed
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={() => setStep((s) => s - 1)}
                            disabled={step === 1}
                            className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all"
                        >
                            ← Back
                        </button>
                        {step < 4 ? (
                            <button
                                onClick={() => setStep((s) => s + 1)}
                                className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-all"
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    const cleanTreatments = form.treatments.map(t => ({ name: t.name, desc: t.desc }));
                                    onSubmit({
                                        ...form,
                                        treatments: cleanTreatments,
                                        profilePic,
                                        rating: 0,
                                        reviewsCount: 0,
                                        patientsTreated: "0",
                                        successRate: "N/A",
                                        status: "pending",
                                    });
                                }}
                                className="px-8 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-all"
                            >
                                Submit for Review
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
