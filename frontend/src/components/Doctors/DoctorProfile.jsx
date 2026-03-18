import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Tabs from "./subpages/Tabs";
import Profile from "./subpages/Profile";
import Bio from "./subpages/Bio";
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
import ReviewSection from "../Reviews/ReviewSection";

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
            name:
              fullProfile.user?.name || fullProfile.name || profileData.name,
            image:
              fullProfile.avatar ||
              fullProfile.profilePic ||
              fullProfile.user?.avatar ||
              fullProfile.image ||
              profileData.image,
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
              fullProfile.about ||
              profileData.about,
            rating:
              profileData.ratings?.average ||
              profileData.rating ||
              fullProfile.rating ||
              0,
            reviewsCount: profileData.reviewsCount || 0,
            appointmentsBooked: fullProfile.appointmentsBooked || profileData.appointmentsBooked || 0,
            experience: fullProfile.experience || profileData.experience || "0 Years",
            awardsCount: fullProfile.awardsCount || profileData.awardsCount || 0,
            priceRange: fullProfile.consultationFee || profileData.priceRange || profileData.consultationFee || "$0",
            specialty: fullProfile.specialty || profileData.specialty || "General Specialist",
            title: fullProfile.title || profileData.title || "Doctor",
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

  const hasReviews = !!DOCTOR?.reviews?.length;

  return (
    <div className="min-h-screen df bg-medical-bg dark:bg-slate-950 text-gray-800 dark:text-gray-200 font-sans pb-24">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {}
        <Profile
          DOCTOR={DOCTOR}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
        {}
        <Tabs hasReviews={hasReviews} />

        {}
        <div className="space-y-8 pb-12 ">
          {}
          <Bio DOCTOR={DOCTOR} />

          {}
          <Experience DOCTOR={DOCTOR} />

          {}
          <Insurance DOCTOR={DOCTOR} />

          {}
          <Specilist DOCTOR={DOCTOR} />

          {}
          <Services DOCTOR={DOCTOR} />

          {}
          <Availbility DOCTOR={DOCTOR} />

          {}
          <Location DOCTOR={DOCTOR} />

          {}
          <Membership DOCTOR={DOCTOR} />
          {}
          <Awards DOCTOR={DOCTOR} />
          {}
          <Time DOCTOR={DOCTOR} />

          <ReviewSection 
            entityId={id} 
            entityType="Doctor" 
            initialRating={DOCTOR.rating} 
            initialCount={DOCTOR.reviewsCount} 
          />
        </div>
      </main>
    </div>
  );
}
