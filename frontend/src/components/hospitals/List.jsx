import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Star,
  MapPin,
  Filter,
  ChevronRight,
  Phone,
  ShieldCheck,
  Clock,
  ChevronLeft,
  Building2,
  Bed,
  Stethoscope,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
const HOSPITAL_TYPES = [
  "All",
  "Multi-specialty",
  "Pediatric Care",
  "Specialty Hospital",
  "Rehabilitation",
  "Clinic Hub",
  "General Hospital",
];

export default function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("Hospital");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await api.getHospitals();
        if (data && data.length > 0) {
          setHospitals(data);
        } else {

          setHospitals([
            {
              id: "h1",
              name: "CityCare Super Specialty Hospital",
              type: "Multi-specialty",
              rating: 4.8,
              address: "Downtown Medical District, New York, USA",
              beds: 500,
              distance: "2.5 km",
              availability: "24/7 Open",
              images: ["https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1000&h=600"]
            },
            {
              id: "c1",
              name: "Evergreen Medical Center",
              type: "Clinic Hub",
              rating: 4.8,
              address: "123 Healthcare Blvd, Medical District, San Francisco",
              beds: 15,
              distance: "1.2 miles",
              availability: "08:00 AM - 08:00 PM",
              images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"]
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hosp) => {
      const locationMatch = hosp.address || hosp.location || "";
      const matchesSearch =
        hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationMatch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "All" || hosp.type === selectedType;

      const isClinic = hosp.type?.toLowerCase().includes("clinic") || hosp.name?.toLowerCase().includes("clinic");
      const matchesCategory = activeCategory === "Clinic" ? isClinic : !isClinic;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, selectedType, hospitals, activeCategory]);

  const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);

  const paginatedHospitals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredHospitals.slice(start, start + itemsPerPage);
  }, [filteredHospitals, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return (
    <div className="min-h-screen df mt-0 bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-gray-200 custom-font">
      <main className="max-w-7xl mx-auto px-4 py-8">
        { }
        <div className="mb-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
              Find <span className="text-primary">{activeCategory}</span> near you
            </h2>
            <p className="text-primary font-medium">
              Discover top-rated medical facilities and specialized care
              centers.
            </p>
          </div>

          { }
          <div className="flex justify-center max-w-md mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
            {["Hospital", "Clinic"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                  }`}
              >
                {cat}s
              </button>
            ))}
          </div>

          { }
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospital name or location..."
                className="w-full outline-none pl-10 pr-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                className="pl-10 pr-10 py-3 outline-none rounded-2xl border-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 appearance-none min-w-[200px] text-sm font-bold cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {HOSPITAL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        { }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedHospitals.length > 0 ? (
            paginatedHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group"
              >
                { }
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={hospital.images && hospital.images.length > 0 ? hospital.images[0] : hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-extrabold text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                      {hospital.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center text-white gap-1 bg-green-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-green-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>
                </div>

                { }
                <div className="p-7 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition tracking-tight leading-tight">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center text-slate-400 text-sm mt-1 gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{hospital.address || hospital.location}</span>
                    </div>
                  </div>

                  { }
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
                        <Bed className="w-3 h-3" /> Beds
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {hospital.beds}+ Units
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
                        <Navigation className="w-3 h-3" /> Distance
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {hospital.distance || "2.5 km"} away
                      </p>
                    </div>
                  </div>

                  { }
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{hospital.availability}</span>
                  </div>

                  { }
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedHospital(hospital);
                        const id = hospital._id || hospital.id;
                        if (activeCategory === "Clinic" || hospital.type?.toLowerCase().includes("clinic") || hospital.name?.toLowerCase().includes("clinic")) {
                          navigate(`/clinic-profile/${id}`);
                        } else {
                          navigate(`/Hospital-profile/${id}`);
                        }
                      }}
                      className="flex-[2] text-white py-3.5 rounded-2xl font-bold text-sm bg-primary transition-all active:scale-95 shadow-lg shadow-green-100 dark:shadow-none hover:opacity-90"
                    >
                      View Details
                    </button>
                    <a
                      href={`tel:+123456789`}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95 flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-slate-400" />
              </div>
              <p className="text-slate-500 font-bold text-lg">
                No hospitals found
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("All");
                }}
                className="text-primary text-sm font-bold mt-4 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        { }
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-2xl border transition-all ${currentPage === 1
                  ? "text-slate-300 border-slate-100 cursor-not-allowed"
                  : "text-slate-600 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-90"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-10 h-10 rounded-2xl text-sm font-bold transition-all ${currentPage === idx + 1
                      ? "bg-primary text-white shadow-lg shadow-green-200 scale-110"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-2xl border transition-all ${currentPage === totalPages
                  ? "text-slate-300 border-slate-100 cursor-not-allowed"
                  : "text-slate-600 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-90"
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
