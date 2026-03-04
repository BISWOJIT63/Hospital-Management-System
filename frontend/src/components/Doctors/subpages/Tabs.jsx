import React, { useState } from "react";

const Tabs = () => {
  const TABS = [
    "Doctor Bio",
    "Experience",
    "Insurances",
    "Treatments",
    "Speciality",
    "Availability",
    "Clinics",
    "Memberships",
    "Awards",
    "Business Hours",
    "Reviews",
  ];
  const [activeTab, setActiveTab] = useState("Doctor Bio");
  const scrollToSection = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(
      tabId.replace(/\s+/g, "-").toLowerCase(),
    );
    if (element) {
      const yOffset = -140; 
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-950 dark:border-slate-600 pt-4 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {" "}
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`snap-start shrink-0 px-2 py-1 rounded-full text-sm font-medium border transition-colors ${
              activeTab === tab
                ? "bg-green-600 text-white dark:text-black border-green-600"
                : "bg-white dark:bg-black dark:text-slate-300 text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
