import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Tabs from "./subpages/Tabs";
import Profile from "./subpages/Profile";
import Bio from "./subpages/Bio";
import Review from "./subpages/Review";
import Time from "./subpages/Time";
import Availbility from "./subpages/Availbility";
import Services from "./subpages/Services";
import Insurance from "./subpages/Insurance";
import Experience from "./subpages/Experience";
import Membership from "./subpages/Membership";
import Location from "./subpages/Location";
import Awards from "./subpages/Awards";
import Specilist from "./subpages/Specilist";

import { api } from "../../utils/api";

export default function DoctorProfile() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [DOCTOR, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          const fullProfile = await api.getDoctorById(id);
          const profileData = fullProfile.profile || fullProfile || {};

          setDoctor({
            ...fullProfile,
            ...profileData,
            name: fullProfile.user?.name || fullProfile.name || profileData.name,
            image:
              fullProfile.user?.avatar ||
              fullProfile.image ||
              "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
            experienceList: profileData.experienceList || [],
            insurances: profileData.insurances || [],
            specialties: profileData.specialties || [],
            services: profileData.services || [],
            availability: profileData.availability || [],
            clinics: profileData.clinics || [],
            memberships: profileData.memberships || [],
            awards: profileData.awards || [],
            businessHours: profileData.businessHours || [],
            reviews: profileData.reviews || [],
            about:
              profileData.about ||
              fullProfile.about ||
              "No biography provided for this doctor.",
            rating: profileData.ratings?.average || profileData.rating || fullProfile.rating || 0,
            reviewsCount: profileData.reviewsCount || 0,
          });
        }
      } catch (err) {
        console.error("Failed to load doctor profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading)
    return <div className="p-12 text-center">Loading Profile...</div>;
  if (!DOCTOR)
    return (
      <div className="p-12 df text-center text-lime-500">
        Doctor Profile Not Found
      </div>
    );

  return (
    <div className="min-h-screen df bg-medical-bg dark:bg-slate-950 text-gray-800 dark:text-gray-200 font-sans pb-24">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        { }
        <Profile
          DOCTOR={DOCTOR}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
        { }
        <Tabs />

        { }
        <div className="space-y-8 pb-12 ">
          { }
          <Bio DOCTOR={DOCTOR} />

          { }
          <Experience DOCTOR={DOCTOR} />

          { }
          <Insurance DOCTOR={DOCTOR} />

          { }
          <Specilist DOCTOR={DOCTOR} />

          { }
          <Services DOCTOR={DOCTOR} />

          { }
          <Availbility DOCTOR={DOCTOR} />

          { }
          <Location DOCTOR={DOCTOR} />

          { }
          <Membership DOCTOR={DOCTOR} />
          { }
          <Awards DOCTOR={DOCTOR} />
          { }
          <Time DOCTOR={DOCTOR} />

          { }
          <Review DOCTOR={DOCTOR} />
        </div>
      </main>
    </div>
  );
}
