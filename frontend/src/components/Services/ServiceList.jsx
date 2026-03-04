import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Star,
  Filter,
  ChevronRight,
  Phone,
  Clock,
  ChevronLeft,
  Stethoscope,
  Activity,
  HeartPulse,
  Syringe,
  Microscope,
  Baby,
  Thermometer,
  ArrowRight,
} from "lucide-react";

const SERVICES_DATA = [
  {
    id: 1,
    name: "Full Body Checkup",
    category: "Diagnostics",
    rating: 4.9,
    reviews: 2450,
    price: "$199",
    duration: "2-3 Hours",
    description:
      "A comprehensive health screening including blood tests, cardiac screening, and organ function tests.",
    image:
      "https://images.unsplash.com/photo-1579152276506-c15614a8f933?auto=format&fit=crop&q=80&w=600&h=400",
    includes: [
      "60+ Parameters",
      "Free Consultation",
      "Digital Reports",
      "Home Sample Collection",
    ],
    icon: <Activity className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Cardiology Consultation",
    category: "Consultation",
    rating: 4.8,
    reviews: 1200,
    price: "$85",
    duration: "45 Mins",
    description:
      "Expert heart health assessment including ECG, blood pressure monitoring, and lifestyle guidance.",
    image:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600&h=400",
    includes: ["Expert Cardiologist", "ECG Included", "Heart Risk Report"],
    icon: <HeartPulse className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "MRI & Advanced Imaging",
    category: "Diagnostics",
    rating: 4.7,
    reviews: 890,
    price: "$350",
    duration: "1-2 Hours",
    description:
      "High-resolution 3T MRI scanning for precise diagnosis of neurological and orthopedic conditions.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400",
    includes: ["High-Res Imaging", "Radiologist Report", "CD Copy Provided"],
    icon: <Microscope className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "Vaccination & Immunization",
    category: "Preventive",
    rating: 5.0,
    reviews: 3100,
    price: "$40",
    duration: "15 Mins",
    description:
      "Safe and quick administration of seasonal flu shots and international travel vaccines.",
    image:
      "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=600&h=400",
    includes: [
      "WHO Approved Vaccines",
      "Certificate Provided",
      "Pediatric Options",
    ],
    icon: <Syringe className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "Pediatric Wellness Program",
    category: "Consultation",
    rating: 4.9,
    reviews: 1560,
    price: "$120",
    duration: "60 Mins",
    description:
      "Comprehensive growth and development monitoring for children from birth to adolescence.",
    image:
      "https://images.unsplash.com/photo-1581594632702-52c1af702cc0?auto=format&fit=crop&q=80&w=600&h=400",
    includes: ["Nutrition Guide", "Development Check", "Immunization Review"],
    icon: <Baby className="w-5 h-5" />,
  },
  {
    id: 6,
    name: "Home Nursing Care",
    category: "Emergency",
    rating: 4.6,
    reviews: 420,
    price: "$60/hr",
    duration: "Flexible",
    description:
      "Professional medical nursing services in the comfort of your home for post-op or chronic care.",
    image:
      "https://images.unsplash.com/photo-1576765608596-78e5190ad017?auto=format&fit=crop&q=80&w=600&h=400",
    includes: ["Wound Dressing", "Vitals Monitoring", "Medication Management"],
    icon: <Stethoscope className="w-5 h-5" />,
  },
];

const SERVICE_CATEGORIES = [
  "All",
  "Diagnostics",
  "Consultation",
  "Preventive",
  "Emergency",
];

export default function ServiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-950 text-gray-800 dark:text-gray-200 custom-font">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 tracking-tight">
              Our Medical Services
            </h2>
            <p className="text-primary font-medium">
              World-class healthcare services tailored to your needs.
            </p>
          </div>

          {/* Search & Filter Bar */}
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
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedServices.length > 0 ? (
            paginatedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group flex flex-col"
              >
                {/* Service Image Header */}
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-white/20">
                      <div className="text-primary">{service.icon}</div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-200">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition tracking-tight leading-tight">
                      {service.name}
                    </h3>
                    <div className="flex items-center text-green-500 gap-1 bg-green-50 dark:bg-green-900/10 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-medium">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800 mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                        Starts from
                      </p>
                      <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                        {service.price}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                        Duration
                      </p>
                      <p className="text-sm font-bold text-primary flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {service.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full group/btn flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold text-sm bg-primary shadow-primary-soft transition-all active:scale-95 hover:opacity-90"
                    >
                      Learn More{" "}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
              <p className="text-slate-500 font-bold text-lg">
                No services found
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="text-primary text-sm font-bold mt-4 hover:underline"
              >
                Show all services
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
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
                        ? "bg-primary text-white shadow-lg  scale-110"
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
          </div>
        )}
      </main>
    </div>
  );
}
