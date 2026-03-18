import React, { useState, useEffect } from "react";
import { LayoutGrid, Search, Loader2, ChevronRight, Activity } from "lucide-react";
import { api } from "../../utils/api";
import StepHeader from "./StepHeader";

export default function StepServiceSelection({ facilityId, onSelect }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const params = facilityId ? { facilityId } : {};
        const res = await api.getServices(params);
        setServices(res.data || res);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [facilityId]);

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader 
        title="Select Medical Service"
        subtitle="Choose the specific service or treatment you need."
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search services (e.g. MRI, Consultation)..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Loading services...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredServices.map((s) => (
            <button
              key={s._id}
              onClick={() => onSelect(s)}
              className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Activity size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{s.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-bold">{s.category || "General"}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{s.price ? `₹${s.price}` : "Price Varies"}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            </button>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-500">
              No services found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
