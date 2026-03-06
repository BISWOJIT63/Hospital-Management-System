import React from "react";
import { Award, ChevronRight } from "lucide-react";

const Doctors = ({ clinicData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
      {clinicData.doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
              {doctor.role}
            </p>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
              <Award className="w-3 h-3 mr-1" /> {doctor.experience}
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Doctors;
