import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === id
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
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
            <TabButton id="overview" label="Overview" />
            <TabButton id="doctors" label="Doctors" />
            <TabButton id="reviews" label="Reviews" />
            <TabButton id="amenities" label="Amenities" />
        </div>
    );
};

export default Tabs;
