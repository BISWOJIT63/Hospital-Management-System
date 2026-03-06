import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Check, AlertCircle, Stethoscope, ToggleLeft, ToggleRight } from "lucide-react";
import { api } from "../../../utils/api";
import { SERVICE_CATEGORIES } from "../../addingHospital/constants";

export default function ServiceManagerPanel() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const fetchServices = async () => {
        try {
            const data = await api.getServices();
            setServices(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch services:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchServices(); }, []);

    const startEdit = (svc) => {
        setEditingService(svc._id);
        setEditForm({
            name: svc.name || "",
            category: svc.category || "Other",
            description: svc.description || "",
            price: svc.price || "",
            duration: svc.duration || "",
            status: svc.status || "active",
        });
    };

    const cancelEdit = () => {
        setEditingService(null);
        setEditForm({});
    };

    const saveEdit = async (id) => {
        setSaving(true);
        try {
            await api.updateService(id, editForm);
            setServices((prev) => prev.map((s) => s._id === id ? { ...s, ...editForm } : s));
            showToast("Service updated successfully!");
            cancelEdit();
        } catch (err) {
            showToast(err.message || "Failed to update service", "error");
        } finally {
            setSaving(false);
        }
    };

    const toggleStatus = async (svc) => {
        const newStatus = svc.status === "active" ? "inactive" : "active";
        try {
            await api.updateService(svc._id, { status: newStatus });
            setServices((prev) => prev.map((s) => s._id === svc._id ? { ...s, status: newStatus } : s));
            showToast(`Service marked as ${newStatus}`);
        } catch (err) {
            showToast("Failed to toggle status", "error");
        }
    };

    const deleteService = async (id) => {
        try {
            await api.deleteService(id);
            setServices((prev) => prev.filter((s) => s._id !== id));
            showToast("Service deleted");
            setDeleteConfirm(null);
        } catch (err) {
            showToast("Failed to delete service", "error");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-bold transition-all ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
                    {toast.type === "error" ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                    {toast.msg}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">Service Manager</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all services offered by your facilities</p>
                </div>
                <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full">{services.length} Services</span>
            </div>

            {services.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Stethoscope className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-bold mb-2">No services yet</p>
                    <p className="text-slate-400 text-sm">Services added during facility registration will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {services.map((svc) => (
                        <div
                            key={svc._id}
                            className={`bg-white dark:bg-slate-900 border ${editingService === svc._id ? "border-primary/40 shadow-lg shadow-primary/10" : "border-slate-200 dark:border-slate-800"} rounded-2xl overflow-hidden transition-all`}
                        >
                            {editingService === svc._id ? (
                                /* EDIT MODE */
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-black text-slate-700 dark:text-slate-200">Editing: {svc.name}</h3>
                                        <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><X className="w-4 h-4" /></button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Service Name</label>
                                            <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Category</label>
                                            <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                                                {SERVICE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Status</label>
                                            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Price</label>
                                            <input value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Duration</label>
                                            <input value={editForm.duration} onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-1">Description</label>
                                            <textarea value={editForm.description} rows={3} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-primary outline-none resize-none" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button onClick={() => saveEdit(svc._id)} disabled={saving}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-60">
                                            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                                            Save Changes
                                        </button>
                                        <button onClick={cancelEdit} className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* VIEW MODE */
                                <div className="flex items-center gap-4 px-5 py-4">
                                    {svc.image && (
                                        <img src={svc.image} alt={svc.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                                    )}
                                    {!svc.image && (
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="w-6 h-6 text-slate-400" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-bold text-slate-800 dark:text-white truncate">{svc.name}</p>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${svc.status === "active" ? "bg-green-50 dark:bg-green-900/20 text-green-600" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                                                {svc.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">{svc.category} · {svc.price || "Price N/A"} · {svc.duration || "Duration N/A"}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => toggleStatus(svc)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition" title="Toggle active">
                                            {svc.status === "active" ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5" />}
                                        </button>
                                        <button onClick={() => startEdit(svc)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        {deleteConfirm === svc._id ? (
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => deleteService(svc._id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold">Confirm</button>
                                                <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold">Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setDeleteConfirm(svc._id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
