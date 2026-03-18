import React, { useState, useEffect } from "react";
import { Building2, MapPin, Star, ChevronRight, Loader2, Search } from "lucide-react";
import { api } from "../../utils/api";
import StepHeader from "./StepHeader";

export default function StepFacilitySelection({ type, onSelect }) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await api.getFacilities();
        if (res.success) {
          // Filter by type (Hospital or Clinic)
          const filtered = res.data.filter(f => 
            type === "hospital" ? f.type === "Hospital" : f.type === "Clinic"
          );
          setFacilities(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch facilities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, [type]);

  const filteredFacilities = facilities.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader 
        title={`Select ${type === "hospital" ? "Hospital" : "Clinic"}`}
        subtitle={`Choose a ${type} to book your appointment.`}
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text"
          placeholder={`Search ${type}s...`}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Loading {type}s...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredFacilities.map((f) => (
            <button
              key={f._id}
              onClick={() => onSelect(f)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                {f.images?.[0] ? (
                  <img src={f.images[0]} alt={f.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Building2 size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{f.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin size={12} />
                  <span className="truncate">{f.address}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{typeof f.rating === "object" ? (f.rating?.average?.toFixed(1) || "N/A") : (f.rating || "N/A")}</span>
                </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </button>
          ))}
          {filteredFacilities.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No {type}s found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
