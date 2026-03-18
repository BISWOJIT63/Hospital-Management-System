import React, { useState, useEffect } from "react";
import {
  Pencil, Trash2, Plus, X, Check, AlertCircle, Stethoscope,
  ToggleLeft, ToggleRight, Clock, ImagePlus, ChevronDown, ChevronUp
} from "lucide-react";
import { api } from "../../../utils/api";
import { SERVICE_CATEGORIES } from "../../addingHospital/constants";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EMPTY_SERVICE = {
  name: "",
  category: "Other",
  description: "",
  price: "",
  duration: "",
  status: "active",
  images: [],
  includes: [],
  treatments: [],
  pricing: [{ package: "Standard", price: "", includes: [] }],
  businessHours: DAYS.map(day => ({ day, time: "09:00 AM - 05:00 PM", isOpen: true, highlight: false })),
};

// ── Shared field input helpers ────────────────────────────────────────────────
const inputCls = "w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary outline-none transition";
const labelCls = "text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1";

// ── Image Upload Strip ────────────────────────────────────────────────────────
function ImageUploadRow({ images, setImages, inputId }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => prev.length < 5 ? [...prev, ev.target.result] : prev);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <label className={labelCls}>Service Images (3–5 photos)</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {images.map((img, i) => (
          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-700">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
              className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-3 h-3 text-rose-500" />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <button type="button" onClick={() => document.getElementById(inputId).click()}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition">
            <ImagePlus size={18} />
            <span className="text-[10px] font-bold mt-1">Add</span>
          </button>
        )}
      </div>
      <input id={inputId} type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />
      <p className="text-xs text-slate-400 mt-1">{images.length} / 5 images uploaded</p>
    </div>
  );
}

// ── Full Service Form (used for both Add and Edit) ────────────────────────────
function ServiceForm({ form, setForm, onSave, onCancel, saving, title, imageInputId }) {
  const [showHours, setShowHours] = useState(false);

  const updateField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/30 rounded-2xl shadow-xl shadow-primary/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-primary/5">
        <h3 className="font-black text-slate-800 dark:text-white text-lg">{title}</h3>
        <button onClick={onCancel} className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* ── Images ── */}
        <ImageUploadRow
          images={form.images}
          setImages={(updater) => setForm(prev => ({ ...prev, images: typeof updater === "function" ? updater(prev.images) : updater }))}
          inputId={imageInputId}
        />

        {/* ── Name + Category + Status ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Service Name *</label>
            <input value={form.name} onChange={e => updateField("name", e.target.value)}
              placeholder="e.g. General Consultation" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <select value={form.category} onChange={e => updateField("category", e.target.value)} className={inputCls}>
              {(SERVICE_CATEGORIES || ["Diagnostics", "Consultation", "Preventive", "Emergency", "Surgery", "Therapy", "Other"]).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select value={form.status} onChange={e => updateField("status", e.target.value)} className={inputCls}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Base Price (₹)</label>
            <input value={form.price} onChange={e => updateField("price", e.target.value)}
              placeholder="e.g. 1500" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Duration</label>
            <input value={form.duration} onChange={e => updateField("duration", e.target.value)}
              placeholder="e.g. 30 minutes" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea value={form.description} rows={3} onChange={e => updateField("description", e.target.value)}
              placeholder="Describe what this service involves..." className={inputCls + " resize-none"} />
          </div>
        </div>

        {/* ── Includes / Benefits ── */}
        <div>
          <label className={labelCls}>What's Included / Key Benefits</label>
          <div className="space-y-2 mt-1">
            {form.includes.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="mt-2 text-emerald-500">✓</span>
                <input value={item} onChange={e => {
                  const next = [...form.includes]; next[i] = e.target.value; updateField("includes", next);
                }} placeholder="e.g. Free follow-up consultation" className={inputCls} />
                <button type="button" onClick={() => updateField("includes", form.includes.filter((_, idx) => idx !== i))}
                  className="p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => updateField("includes", [...form.includes, ""])}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add benefit
            </button>
          </div>
        </div>

        {/* ── Treatments / Procedures ── */}
        <div>
          <label className={labelCls}>Treatments & Procedures</label>
          <div className="space-y-3 mt-1">
            {form.treatments.map((t, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2">
                <div className="flex gap-2 items-center">
                  <input value={t.name} onChange={e => {
                    const next = [...form.treatments]; next[i] = { ...next[i], name: e.target.value }; updateField("treatments", next);
                  }} placeholder="Procedure name" className={inputCls} />
                  <button type="button" onClick={() => updateField("treatments", form.treatments.filter((_, idx) => idx !== i))}
                    className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input value={t.description || ""} onChange={e => {
                  const next = [...form.treatments]; next[i] = { ...next[i], description: e.target.value }; updateField("treatments", next);
                }} placeholder="Brief description of the procedure" className={inputCls} />
              </div>
            ))}
            <button type="button" onClick={() => updateField("treatments", [...form.treatments, { name: "", description: "" }])}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add treatment
            </button>
          </div>
        </div>

        {/* ── Pricing Packages ── */}
        <div>
          <label className={labelCls}>Pricing Packages</label>
          <div className="space-y-3 mt-1">
            {form.pricing.map((pkg, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Package Name</label>
                    <input value={pkg.package} onChange={e => {
                      const next = [...form.pricing]; next[i] = { ...next[i], package: e.target.value }; updateField("pricing", next);
                    }} placeholder="e.g. Basic, Premium" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Price (₹)</label>
                    <input value={pkg.price} onChange={e => {
                      const next = [...form.pricing]; next[i] = { ...next[i], price: e.target.value }; updateField("pricing", next);
                    }} placeholder="e.g. 2000" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Package Includes</label>
                  <div className="space-y-2">
                    {(pkg.includes || []).map((inc, j) => (
                      <div key={j} className="flex gap-2">
                        <input value={inc} onChange={e => {
                          const next = [...form.pricing];
                          const incs = [...(next[i].includes || [])];
                          incs[j] = e.target.value;
                          next[i] = { ...next[i], includes: incs };
                          updateField("pricing", next);
                        }} placeholder="e.g. Lab tests included" className={inputCls} />
                        <button type="button" onClick={() => {
                          const next = [...form.pricing];
                          next[i] = { ...next[i], includes: next[i].includes.filter((_, idx) => idx !== j) };
                          updateField("pricing", next);
                        }} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg shrink-0"><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const next = [...form.pricing];
                      next[i] = { ...next[i], includes: [...(next[i].includes || []), ""] };
                      updateField("pricing", next);
                    }} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add item
                    </button>
                  </div>
                </div>
                {form.pricing.length > 1 && (
                  <button type="button" onClick={() => updateField("pricing", form.pricing.filter((_, idx) => idx !== i))}
                    className="text-xs text-rose-500 hover:underline flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove package
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => updateField("pricing", [...form.pricing, { package: "", price: "", includes: [] }])}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add pricing package
            </button>
          </div>
        </div>

        {/* ── Business Hours (collapsible) ── */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <button type="button" onClick={() => setShowHours(h => !h)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Business Hours</span>
            {showHours ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showHours && (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {form.businessHours.map((bh, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3">
                  <div className="flex items-center gap-3 w-36 shrink-0">
                    <input type="checkbox" checked={bh.isOpen} onChange={e => {
                      const next = [...form.businessHours]; next[i] = { ...next[i], isOpen: e.target.checked }; updateField("businessHours", next);
                    }} className="w-4 h-4 accent-emerald-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{bh.day}</span>
                  </div>
                  <input value={bh.time} onChange={e => {
                    const next = [...form.businessHours]; next[i] = { ...next[i], time: e.target.value }; updateField("businessHours", next);
                  }} disabled={!bh.isOpen} placeholder="09:00 AM – 05:00 PM"
                    className={inputCls + " !py-1.5 " + (!bh.isOpen ? "opacity-40 cursor-not-allowed" : "")} />
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0 cursor-pointer">
                    <input type="checkbox" checked={bh.highlight} onChange={e => {
                      const next = [...form.businessHours]; next[i] = { ...next[i], highlight: e.target.checked }; updateField("businessHours", next);
                    }} className="w-3 h-3 accent-emerald-500" />
                    Priority
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <button onClick={onSave} disabled={saving || !form.name.trim()}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
          Save Service
        </button>
        <button onClick={onCancel} className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}


// ── Main Panel ────────────────────────────────────────────────────────────────
export default function ServiceManagerPanel({ fac }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY_SERVICE });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchServices = async () => {
    try {
      const data = await api.getServices({ facilityId: fac?._id, all: true });
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []); // eslint-disable-line

  // ── ADD ──
  const handleAdd = async () => {
    if (!addForm.name.trim()) return;
    setSaving(true);
    try {
      const payload = { ...addForm };
      if (fac?._id) payload.facilityId = fac._id;
      const created = await api.createService(payload);
      setServices(prev => [created, ...prev]);
      setShowAddForm(false);
      setAddForm({ ...EMPTY_SERVICE });
      showToast("Service added successfully!");
    } catch (err) {
      showToast(err.message || "Failed to add service", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── EDIT ──
  const startEdit = (svc) => {
    setEditingId(svc._id);
    setEditForm({
      name: svc.name || "",
      category: svc.category || "Other",
      description: svc.description || "",
      price: svc.price || "",
      duration: svc.duration || "",
      status: svc.status || "active",
      images: svc.images || [],
      includes: svc.includes || [],
      treatments: svc.treatments || [],
      pricing: svc.pricing?.length ? svc.pricing : [{ package: "Standard", price: svc.price || "", includes: [] }],
      businessHours: svc.businessHours?.length ? svc.businessHours : EMPTY_SERVICE.businessHours,
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      await api.updateService(editingId, editForm);
      setServices(prev => prev.map(s => s._id === editingId ? { ...s, ...editForm } : s));
      showToast("Service updated!");
      setEditingId(null);
    } catch (err) {
      showToast(err.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (svc) => {
    const newStatus = svc.status === "active" ? "inactive" : "active";
    try {
      await api.updateService(svc._id, { status: newStatus });
      setServices(prev => prev.map(s => s._id === svc._id ? { ...s, status: newStatus } : s));
      showToast(`Service marked as ${newStatus}`);
    } catch {
      showToast("Failed to toggle status", "error");
    }
  };

  const deleteService = async (id) => {
    try {
      await api.deleteService(id);
      setServices(prev => prev.filter(s => s._id !== id));
      showToast("Service deleted");
      setDeleteConfirm(null);
    } catch {
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
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-bold ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
          {toast.type === "error" ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          {toast.msg}
        </div>
      )}

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Service Manager</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all services offered by your facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full">{services.length} Services</span>
          <button
            onClick={() => { setShowAddForm(true); setEditingId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <ServiceForm
          form={addForm}
          setForm={setAddForm}
          onSave={handleAdd}
          onCancel={() => { setShowAddForm(false); setAddForm({ ...EMPTY_SERVICE }); }}
          saving={saving}
          title="Add New Service"
          imageInputId="add-svc-img"
        />
      )}

      {/* Service List */}
      {services.length === 0 && !showAddForm ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-bold mb-2">No services yet</p>
          <p className="text-slate-400 text-sm mb-4">Click "Add Service" above to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc._id} className={`bg-white dark:bg-slate-900 border ${editingId === svc._id ? "border-primary/40 shadow-lg shadow-primary/10" : "border-slate-200 dark:border-slate-800"} rounded-2xl overflow-hidden transition-all`}>
              {editingId === svc._id ? (
                <ServiceForm
                  form={editForm}
                  setForm={setEditForm}
                  onSave={saveEdit}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                  title={`Editing: ${svc.name}`}
                  imageInputId={`edit-svc-img-${svc._id}`}
                />
              ) : (
                /* VIEW MODE */
                <div className="flex items-center gap-4 px-5 py-4">
                  {svc.images?.length > 0 ? (
                    <div className="flex -space-x-3 overflow-hidden shrink-0">
                      {svc.images.slice(0, 3).map((img, i) => (
                        <img key={i} src={img} alt="" className="w-14 h-14 rounded-xl object-cover ring-4 ring-white dark:ring-slate-900 bg-slate-100 shadow-sm" />
                      ))}
                      {svc.images.length > 3 && (
                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 ring-4 ring-white dark:ring-slate-900 shadow-sm shrink-0">
                          +{svc.images.length - 3}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
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
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {svc.category} · {svc.price ? `₹${svc.price}` : "Price N/A"} · {svc.duration || "Duration N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleStatus(svc)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition" title="Toggle status">
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
