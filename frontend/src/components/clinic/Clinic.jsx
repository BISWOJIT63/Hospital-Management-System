import React, { useState } from "react";
import { ChevronRight, Mail, Phone } from "lucide-react";

import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import Hero from "./subpages/Hero";
import Tabs from "./subpages/Tabs";
import Overview from "./subpages/Overview";
import Doctors from "./subpages/Doctors";
import Amenities from "./subpages/Amenities";
import Sidebar from "./subpages/Sidebar";
import ReviewSection from "../Reviews/ReviewSection";

const ClinicDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [clinicData, setClinicData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchClinicData = async () => {
      try {
        if (id) {
          const res = await api.getHospitalById(id);
          if (res) {
            // Map Facility model to expected UI format
            const mappedData = {
              id: res._id || res.id,
              name: res.name,
              category: res.type || "Medical Center",
              rating: res.rating || 4.5,
              reviewsCount: res.reviewsCount || 0,
              address: res.address || res.city,
              status: "Open Now", // Status calculation could be added based on hours
              hours: typeof res.businessHours?.[0] === "string" ? res.businessHours[0] : (res.businessHours?.[0]?.time),
              phone: res.phone,
              website: res.email ? `mailto:${res.email}` : undefined,
              description: res.description || res.about,
              specialties: res.departments?.map(d => d.name) || [],
              amenities: res.facilities?.length > 0 ? res.facilities : [],
              images: res.images?.length > 0 ? res.images : [],
              doctors: res.keyDoctors?.map((d, idx) => ({
                id: idx,
                name: d.name,
                role: d.specialty,
                experience: d.experience,
                image: d.image || d.avatar || `https://ui-avatars.com/api/?name=${d.name}`
              })) || [],
              reviews: [] // Reviews will be connected separately if needed
            };
            setClinicData(mappedData);
          }
        }
      } catch (err) {
        console.error("Failed fetching live clinic data via ID:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClinicData();
  }, [id]);

  const hasReviews = !!clinicData?.reviews?.length;
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "doctors", label: "Doctors" },
    { id: "reviews", label: "Reviews" },
    { id: "amenities", label: "Amenities" },
  ];


  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-bold">
        Loading Clinic Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen df  bg-gray-50 dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-200 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2 space-y-8">
            <Hero
              clinicData={clinicData}
              isBookmarked={isBookmarked}
              setIsBookmarked={setIsBookmarked}
            />

            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
            />

            {}
            <div className="space-y-8">
              {activeTab === "overview" && <Overview clinicData={clinicData} />}
              {activeTab === "doctors" && <Doctors clinicData={clinicData} />}
              {activeTab === "reviews" && (
                <ReviewSection 
                  entityId={id} 
                  entityType="Facility" 
                  initialRating={clinicData.rating} 
                  initialCount={clinicData.reviewsCount} 
                />
              )}
              {activeTab === "amenities" && (
                <Amenities clinicData={clinicData} />
              )}
            </div>
          </div>

          {}
          <Sidebar clinicData={clinicData} />
        </div>
      </main>

      {}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            Still have questions?
          </h2>
          <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-lg mx-auto transition-colors duration-300">
            Our patient support team is available 24/7 to help you with bookings
            and medical inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 flex gap-2 text-white dark:text-slate-800  bg-primary rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors">
              <Phone /> 874532678
            </button>
            <button className="px-8 py-3 flex gap-2 text-white dark:text-slate-800  bg-primary rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-slate-700 transition-colors">
              <Mail /> a@a.com
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <ClinicDetails />;
}
