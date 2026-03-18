import React from "react";

const Tabs = ({
  activeTab,
  setActiveTab,
  tabs = ["overview", "doctors", "reviews", "amenities"],
}) => {
  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
        activeTab === id
          ? "text-green-600 dark:text-green-400"
          : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
      }`}
    >
      {label}
      {activeTab === id && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="border-b border-gray-200 dark:border-slate-800 flex gap-8 transition-colors duration-300">
      {tabs.map((tab) => (
        <TabButton key={tab.id} id={tab.id} label={tab.label} />
      ))}
    </div>
  );
};

export default Tabs;
