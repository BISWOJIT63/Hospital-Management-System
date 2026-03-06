import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Amenities = ({ clinicData }) => {
    return (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
            {clinicData.amenities.map(item => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300 transition-colors duration-300">{item}</span>
                </div>
            ))}
        </div>
    );
};

export default Amenities;
