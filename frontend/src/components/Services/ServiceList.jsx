import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Star, Filter, ChevronRight, Clock, ChevronLeft, Stethoscope, Activity, ArrowRight, Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export default function ServiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        const servicesList = Array.isArray(data) ? data : [];
        setServices(servicesList);
        
        // Derive categories from live data
        const derived = ["All", ...new Set(servicesList.map(s => s.category).filter(Boolean))];
        setCategories(derived);
      } catch (err) {
        console.error("Failed to load services:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(start, start + itemsPerPage);
  }, [filteredServices, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-gray-200 custom-font">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header + Search */}
        <div className="mb-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 tracking-tight">Our Medical Services</h2>
            <p className="text-primary font-medium">World-class healthcare services tailored to your needs.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a medical service..."
                className="w-full outline-none pl-10 pr-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                className="pl-10 pr-10 py-3 outline-none rounded-2xl border-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 appearance-none min-w-[200px] text-sm font-bold cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-bold">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedServices.length > 0 ? (
              paginatedServices.map((service) => (
                <div
                  key={service._id || service.id}
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group flex flex-col"
                >
                  <div className="h-44 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {service.images && service.images.length > 0 ? (
                      <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Stethoscope className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-white/20">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-200">{service.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition tracking-tight leading-tight">{service.name}</h3>
                      {service.rating?.average > 0 && (
                        <div className="flex items-center text-green-500 gap-1 bg-green-50 dark:bg-green-900/10 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">{service.rating.average.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-medium">
                      {service.description || "Expert healthcare service tailored to your needs."}
                    </p>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                      {service.doctorId ? (
                        <>
                          <img 
                            src={service.doctorId.profilePic || service.doctorId.avatar || "https://via.placeholder.com/150"} 
                            alt={service.doctorId.name} 
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Provided by</p>
                            <p 
                              onClick={(e) => { e.stopPropagation(); navigate(`/doctors-profile/${service.doctorId._id}`); }}
                              className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate hover:text-primary cursor-pointer transition-colors"
                            >
                              Dr. {service.doctorId.name}
                            </p>
                          </div>
                        </>
                      ) : service.facilityId ? (
                        <>
                          <img 
                            src={(service.facilityId.images && service.facilityId.images[0]) || "https://via.placeholder.com/150"} 
                            alt={service.facilityId.name} 
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Provided by</p>
                            <p 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                const id = service.facilityId._id;
                                if (service.facilityId.type === "Clinic") {
                                  navigate(`/clinic-profile/${id}`);
                                } else {
                                  navigate(`/hospital-profile/${id}`);
                                }
                              }}
                              className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate hover:text-primary cursor-pointer transition-colors"
                            >
                              {service.facilityId.name}
                            </p>
                          </div>
                        </>
                      ) : (
                         <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Provider</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">General Service</p>
                            </div>
                         </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800 mb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Starts from</p>
                        <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100">{service.price || "—"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Duration</p>
                        <p className="text-sm font-bold text-primary flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {service.duration || "Varies"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <button
                        onClick={() => navigate(`/service-profile/${service._id || service.id}`)}
                        className="w-full group/btn flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold text-sm bg-primary shadow-primary-soft transition-all active:scale-95 hover:opacity-90"
                      >
                        Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="text-slate-400 w-8 h-8" />
                </div>
                <p className="text-slate-500 font-bold text-lg">No services found</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="text-primary text-sm font-bold mt-4 hover:underline"
                >
                  Show all services
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-2xl border transition-all ${currentPage === 1 ? "text-slate-300 border-slate-100 cursor-not-allowed" : "text-slate-600 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-90"}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button key={idx + 1} onClick={() => handlePageChange(idx + 1)}
                    className={`w-10 h-10 rounded-2xl text-sm font-bold transition-all ${currentPage === idx + 1 ? "bg-primary text-white shadow-lg scale-110" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-2xl border transition-all ${currentPage === totalPages ? "text-slate-300 border-slate-100 cursor-not-allowed" : "text-slate-600 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-90"}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
