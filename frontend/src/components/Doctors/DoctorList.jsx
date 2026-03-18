import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  MapPin,
  Filter,
  ChevronRight,
  User,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { useEffect } from "react";

const SPECIALIZATIONS = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Obstetrician",
  "Orthopedic Surgeon",
  "General Medicine",
  "Dentist",
  "Psychiatrist",
];

const cleanValue = (val, fallback = "Location N/A") => {
  if (!val) return fallback;
  const s = String(val).trim();
  const invalid = ["N/A", "NA", "UNDEFINED", "NULL", "LOCATION N/A"];
  if (invalid.includes(s.toUpperCase())) return fallback;
  return val;
};

export default function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 2;

  const formatAvailability = (avail) => {
    if (!avail) return "Check Availability";
    const first = Array.isArray(avail) ? avail[0] : avail;
    if (!first) return "Check Availability";
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null) {
      if (first.day && first.time) return `${first.day} ${first.time}`;
      if (first.time) return first.time;
      const values = Object.values(first).filter(Boolean).join(" ");
      return values || "Check Availability";
    }
    return String(first) || "Check Availability";
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.getDoctors();
        if (res.success && res.data) {
          setDoctors(res.data);
        } else if (Array.isArray(res)) {
          setDoctors(res);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.specialty &&
          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpec =
        selectedSpec === "All" || doc.specialty === selectedSpec;
      return matchesSearch && matchesSpec;
    });
  }, [searchTerm, selectedSpec, doctors]);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(start, start + itemsPerPage);
  }, [filteredDoctors, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen df mt-0 bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-gray-200 custom-font">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
              Book your next appointment
            </h2>
            <p className="text-primary font-medium">
              Search from thousands of certified medical professionals near you.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2  -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                className="w-full outline-none pl-10 pr-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                className="pl-10 pr-10 py-3 outline-none rounded-2xl border-none focus:ring-2 focus:ring-primary bg-medical-bg dark:bg-medical-dark text-gray-800 dark:text-gray-200 appearance-none min-w-[200px] text-sm font-bold cursor-pointer"
                value={selectedSpec}
                onChange={(e) => setSelectedSpec(e.target.value)}
              >
                {SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((doctor) => (
              <div
                key={
                  doctor._id ||
                  doctor.id ||
                  (doctor.user && doctor.user._id) ||
                  doctor.name
                }
                className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-600  overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group"
              >
                <div className="p-7 space-y-5">
                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={doctor.image || doctor.avatar || doctor.profilePic || `https://images.unsplash.com/photo-1559839734-2b71ca197ec2?w=400&q=80`}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-sm group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}`; }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-100 dark:border-slate-600"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold text-primary bg-green-50 px-2 py-1 rounded-lg uppercase tracking-widest">
                            {cleanValue(doctor.specialty, "General")}
                          </span>
                          {doctor.category && cleanValue(doctor.category, "N/A") !== "N/A" && (
                            <span className="text-[10px] font-extrabold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg uppercase tracking-widest">
                              {doctor.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-green-500 gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">
                            {doctor.rating || '5.0'}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mt-1 group-hover:text-primary transition tracking-tight">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center text-slate-400 text-sm mt-1 gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">
                          {cleanValue(doctor.location) !== "Location N/A" 
                            ? doctor.location 
                            : cleanValue(doctor.city) !== "Location N/A" 
                              ? doctor.city 
                              : cleanValue(doctor.address) !== "Location N/A" 
                                ? doctor.address 
                                : "Location N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                        Experience
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {String(doctor.experience).toLowerCase().includes('years') ? doctor.experience : `${doctor.experience || 0} Years`}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                        Available
                      </p>
                      <p className="text-sm font-bold text-primary flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />{" "}
                        {formatAvailability(doctor.availability)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        const normalizedDoctor = {
                          ...doctor,
                          role: doctor.specialty || "Doctor",
                          exp: `${doctor.experience || 0}+ Years`,
                          patients: doctor.patients || "500+", 
                        };
                        setSelectedDoctor(normalizedDoctor);
                        navigate("/appointment", {
                          state: { doctor: normalizedDoctor },
                        });
                      }}
                      className="flex-[2] text-white py-3.5 rounded-2xl font-bold text-sm bg-primary transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-slate-800 hover:shadow-green-200"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        const id = doctor.user?._id || doctor._id || doctor.id;
                        navigate(`/doctors-profile/${id}`);
                      }}
                      className="flex-1 bg-slate-50 text-slate-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-100 transition active:scale-95"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-slate-400" />
              </div>
              <p className="text-slate-500 font-bold text-lg">
                No results found
              </p>
              <p className="text-slate-400 text-sm">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpec("All");
                }}
                className="text-primary text-sm font-bold mt-4 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-3 rounded-2xl border transition-all ${
                  currentPage === 1
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
                    className={`w-10 h-10 rounded-2xl text-sm font-bold transition-all ${
                      currentPage === idx + 1
                        ? "bg-primary text-white"
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
                className={`p-3 rounded-2xl border transition-all ${
                  currentPage === totalPages
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
