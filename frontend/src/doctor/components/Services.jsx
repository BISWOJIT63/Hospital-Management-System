import React, { useState, useEffect } from "react";
import { Icon, ic } from "../icons";
import { api } from "../../utils/api";
import { Bandage, Plus, Search, Trash2, Edit3, Image as ImageIcon, Check, X } from "lucide-react";

export default function Services({ doctorId, showNotif, onUpdate }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [viewingService, setViewingService] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "Consultation",
        description: "",
        price: "",
        image: ""
    });

    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await api.getServices({ doctorId });
            if (res.success) {
                setServices(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch services", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctorId) fetchServices();
    }, [doctorId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            let res;
            if (editingId) {
                // Assuming updateService exists in api.js
                res = await api.updateService(editingId, formData, token);
            } else {
                // Assuming createService exists in api.js
                res = await api.createService({ ...formData, doctorId, creatorRole: 'Doctor' }, token);
            }

            if (res.success) {
                showNotif(editingId ? "Service updated" : "Service created");
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: "", category: "Consultation", description: "", price: "", image: "" });
                fetchServices();
                if (onUpdate) onUpdate();
            }
        } catch (err) {
            showNotif(err.message || "Failed to save service", "warning");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await api.deleteService(id, token);
            if (res.success) {
                showNotif("Service deleted");
                fetchServices();
                if (onUpdate) onUpdate();
            }
        } catch (err) {
            showNotif(err.message || "Failed to delete", "warning");
        }
    };

    const filteredServices = services.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Management Services</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Create and manage your medical services and treatments</p>
                </div>
                <button
                    onClick={() => {
                        setIsAdding(true);
                        setEditingId(null);
                        setFormData({ name: "", category: "Consultation", description: "", price: "", image: "", duration: "", includes: [""] });
                    }}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md shrink-0"
                >
                    <Plus size={18} />
                    Add New Service
                </button>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500/50">
                <Search size={20} className="text-slate-400 shrink-0" />
                <input
                    className="bg-transparent border-none outline-none text-sm text-slate-800 dark:text-white w-full"
                    placeholder="Search services by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isAdding || editingId ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {editingId ? <Edit3 size={20} /> : <Plus size={20} />}
                            {editingId ? "Edit Service" : "Add New Service"}
                        </h3>
                        <button 
                            onClick={() => { setIsAdding(false); setEditingId(null); }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 lg:col-span-3">
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Service Image</label>
                            <div className="aspect-[4/3] rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 overflow-hidden group relative transition-all hover:border-green-500/50">
                                {formData.image ? (
                                    <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                        <ImageIcon size={32} strokeWidth={1.5} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                                    </div>
                                )}
                                <label className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer gap-2 backdrop-blur-[2px]">
                                    <Icon path={ic.upload} size={24} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Change Photo</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 leading-relaxed text-center px-2">Recommended: 800x600px. Max size 5MB.</p>
                        </div>

                        <div className="md:col-span-8 lg:col-span-9 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Service Name</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        placeholder="e.g., General Consultation"
                                        value={formData.name}
                                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Category</label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                                    >
                                        <option value="Consultation">Consultation</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Diagnostics">Diagnostics</option>
                                        <option value="Therapy">Therapy</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Preventive">Preventive</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Price (₹)</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        placeholder="e.g., 500 or Contact for pricing"
                                        value={formData.price}
                                        onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Duration</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        placeholder="e.g., 30-45 mins"
                                        value={formData.duration}
                                        onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                    Highlights / Benefits
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, includes: [...(p.includes || []), ""] }))}
                                        className="text-[10px] text-green-600 hover:text-green-700"
                                    >
                                        + Add Highlight
                                    </button>
                                </label>
                                <div className="space-y-2">
                                    {(formData.includes || []).map((inc, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input
                                                className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                placeholder="e.g., Free follow-up consultation"
                                                value={inc}
                                                onChange={(e) => setFormData(p => {
                                                    const newInc = [...p.includes];
                                                    newInc[i] = e.target.value;
                                                    return { ...p, includes: newInc };
                                                })}
                                            />
                                            {formData.includes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(p => ({ ...p, includes: p.includes.filter((_, idx) => idx !== i) }))}
                                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all min-h-[120px] resize-none"
                                    placeholder="Describe the service in detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setIsAdding(false); setEditingId(null); }}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg"
                                >
                                    <Check size={18} />
                                    {editingId ? "Update Service" : "Create Service"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-slate-100 dark:bg-slate-900 animate-pulse rounded-3xl" />
                    ))
                ) : filteredServices.length > 0 ? (
                    filteredServices.map((s) => (
                        <div 
                            key={s._id} 
                            onClick={() => setViewingService(s)}
                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                {s.image ? (
                                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={s.name} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                                        <Bandage size={48} strokeWidth={1} />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingId(s._id);
                                            setFormData({
                                                name: s.name || "",
                                                category: s.category || "Consultation",
                                                description: s.description || "",
                                                price: s.price || "",
                                                image: s.image || "",
                                                duration: s.duration || "",
                                                includes: s.includes && s.includes.length > 0 ? s.includes : [""]
                                            });
                                        }}
                                        className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-xl text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-500 shadow-sm backdrop-blur-sm transition-all"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(s._id);
                                        }}
                                        className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-xl text-slate-600 dark:text-slate-300 hover:text-red-500 shadow-sm backdrop-blur-sm transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                                    {s.category}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors truncate pr-2">
                                        {s.name}
                                    </h4>
                                    <span className="text-green-600 dark:text-green-400 font-bold text-sm whitespace-nowrap">
                                        {s.price && s.price.includes("₹") ? s.price : `₹${s.price || "0"}`}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                    {s.description || "No description provided."}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {s.duration && (
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <Clock size={10} /> {s.duration}
                                        </span>
                                    )}
                                    {s.includes && s.includes.length > 0 && s.includes[0] && (
                                        <span className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <Check size={10} /> {s.includes.length} Highlights
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <Bandage size={48} strokeWidth={1} />
                        <p className="text-sm font-medium">No services found match your search.</p>
                    </div>
                )}
            </div>

            {/* Service Details Modal */}
            {viewingService && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setViewingService(null)}
                >
                    <div 
                        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative h-64 sm:h-80 bg-slate-100 dark:bg-slate-800">
                            {viewingService.image ? (
                                <img src={viewingService.image} className="w-full h-full object-cover" alt={viewingService.name} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Bandage size={80} strokeWidth={1} />
                                </div>
                            )}
                            <button 
                                onClick={() => setViewingService(null)}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                                    {viewingService.name}
                                </h3>
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap gap-3">
                                        <span className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {viewingService.category}
                                        </span>
                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                                            <Icon path={ic.money} size={12} />
                                            {viewingService.price && viewingService.price.includes("₹") ? viewingService.price : `₹${viewingService.price || "0"}`}
                                        </span>
                                        {viewingService.duration && (
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                                                <Clock size={12} />
                                                {viewingService.duration}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Description</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {viewingService.description || "No description available."}
                                        </p>
                                    </div>

                                    {viewingService.includes && viewingService.includes.length > 0 && viewingService.includes.some(i => i) && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Service Highlights</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {viewingService.includes.filter(i => i).map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                                        <Check size={14} className="text-green-500 shrink-0" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button 
                                    onClick={() => setViewingService(null)}
                                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
