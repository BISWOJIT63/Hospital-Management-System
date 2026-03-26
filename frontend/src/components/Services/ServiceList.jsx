import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Star, Filter, ChevronRight, Clock, ChevronLeft, Stethoscope, Activity, ArrowRight, Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const ServiceSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
        <div className="h-32 bg-gray-200 dark:bg-slate-800 shimmer"></div>
        <div className="p-5 space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
          <div className="h-4 w-full bg-gray-100 dark:bg-slate-800 rounded shimmer"></div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800 shimmer shrink-0"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-1/2 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800 rounded shimmer"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 dark:border-slate-800">
            <div className="h-8 bg-gray-100 dark:bg-slate-800/50 rounded shimmer"></div>
            <div className="h-8 bg-gray-100 dark:bg-slate-800/50 rounded shimmer"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-slate-800 rounded-2xl shimmer"></div>
        </div>
      </div>
    ))}
  </div>
);



export default function ServiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async (page = 1) => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      
      const res = await api.getServices(page, itemsPerPage, params);
      
      if (res.success && res.data) {
        setServices(res.data);
        if (res.pagination) {
          setTotalPages(res.pagination.totalPages);
        }
        
        // Update categories only on first load if needed
        if (categories.length === 1) {
            // Ideally categories should come from a separate endpoint, but keeping the logic
            const derived = ["All", ...new Set(res.data.map(s => s.category).filter(Boolean))];
            if (derived.length > categories.length) setCategories(derived);
        }
      }
    } catch (err) {
      console.error("Failed to load services:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage, selectedCategory, searchTerm]); // Add searchTerm to dependencies

  const paginatedServices = services;


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
        <div className="">
          {loading ? (
            <div className="col-span-full">
               <ServiceSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
                  <div
                    key={service._id || service.id}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group flex flex-col"
                  >
                    <div className="h-32 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {service.images && service.images.length > 0 ? (
                        <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-sm border border-white/20">
                          <Activity className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-200">{service.category}</span>
                        </div>
                      </div>
                    </div>
  
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1.5">
                        <h3 className="text-lg font-bold group-hover:text-primary transition tracking-tight leading-tight truncate">{service.name}</h3>
                        {service.rating?.average > 0 && (
                          <div className="flex items-center text-green-500 gap-1 bg-green-50 dark:bg-green-900/10 px-1.5 py-0.5 rounded-full">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span className="text-[10px] font-bold">{service.rating.average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1 mb-4 font-medium">
                        {service.description || "Expert healthcare service tailored to your needs."}
                      </p>
                      <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                        {service.doctorId ? (
                          <>
                            <img 
                              src={service.doctorId.profilePic || service.doctorId.avatar || "https://via.placeholder.com/150"} 
                              alt={service.doctorId.name} 
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Provided by</p>
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
                              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Provided by</p>
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
                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Provider</p>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">General Service</p>
                              </div>
                           </div>
                        )}
                      </div>
  
                      <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 dark:border-slate-800 mb-4">
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Starts from</p>
                          <p className="text-base font-extrabold text-slate-800 dark:text-slate-100">{service.price || "—"}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Duration</p>
                          <p className="text-xs font-bold text-primary flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {service.duration || "Varies"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto pt-1">
                        <button
                          onClick={() => navigate(`/service-profile/${service._id || service.id}`)}
                          className="w-full group/btn flex items-center justify-center gap-2 text-white py-2.5 rounded-xl font-bold text-xs bg-primary transition-all active:scale-95 shadow-lg shadow-green-100 dark:shadow-none hover:opacity-90"
                        >
                          Learn More <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
        </div>

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.2) 50%, 
            rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }

        .dark .shimmer {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.05) 50%, 
            rgba(255,255,255,0) 100%);
        }
      `,
        }}
      />
    </div>
  );
}
