import React, { useState } from "react";
import { ChevronRight, Mail, Phone } from "lucide-react";

import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { clinicData as STATIC_CLINIC_DATA } from "./data";
import Hero from "./subpages/Hero";
import Tabs from "./subpages/Tabs";
import Overview from "./subpages/Overview";
import Doctors from "./subpages/Doctors";
import Reviews from "./subpages/Reviews";
import Amenities from "./subpages/Amenities";
import Sidebar from "./subpages/Sidebar";

const ClinicDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [clinicData, setClinicData] = useState(STATIC_CLINIC_DATA);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchClinicData = async () => {
      try {
        if (id) {
          const res = await api.getHospitalById(id);
          if (res) {
            setClinicData({
              ...STATIC_CLINIC_DATA,
              ...res,
              name: res.name || STATIC_CLINIC_DATA.name,
              address: res.address || res.location || STATIC_CLINIC_DATA.address,
              about: res.description || STATIC_CLINIC_DATA.about,
              rating: res.rating || STATIC_CLINIC_DATA.rating,
              images: res.images?.length > 0 ? res.images : STATIC_CLINIC_DATA.images
            });
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

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-bold">Loading Clinic Details...</div>;
  }

  return (
    <div className="min-h-screen df  bg-gray-50 dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-200 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          { }
          <div className="lg:col-span-2 space-y-8">
            <Hero
              clinicData={clinicData}
              isBookmarked={isBookmarked}
              setIsBookmarked={setIsBookmarked}
            />

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            { }
            <div className="space-y-8">
              {activeTab === "overview" && <Overview clinicData={clinicData} />}
              {activeTab === "doctors" && <Doctors clinicData={clinicData} />}
              {activeTab === "reviews" && <Reviews clinicData={clinicData} />}
              {activeTab === "amenities" && (
                <Amenities clinicData={clinicData} />
              )}
            </div>
          </div>

          { }
          <Sidebar clinicData={clinicData} />
        </div>
      </main>

      { }
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
