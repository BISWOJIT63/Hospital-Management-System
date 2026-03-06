import React from "react";
import {
  Clock,
  Phone,
  Globe,
  Shield,
  Calendar,
  MessageSquare,
  MapPin,
} from "lucide-react";

const Sidebar = ({ clinicData }) => {
  return (
    <div className="space-y-6">
      {}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 sticky top-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-gray-500 dark:text-slate-400 text-sm transition-colors duration-300">
              Consultation from
            </span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              $45.00
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-100 dark:border-green-800/60 transition-colors duration-300">
            Available Today
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button className="w-full py-4 bg-green-600 dark:bg-green-500 text-white rounded-2xl font-bold hover:bg-green-700 dark:hover:bg-green-600 shadow-lg shadow-green-200 dark:shadow-green-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Book Appointment
          </button>
          <button className="w-full py-4 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-2xl font-bold hover:border-green-100 hover:bg-green-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat with Clinic
          </button>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-4 transition-colors duration-300">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-gray-400 dark:text-slate-500" />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Working Hours
              </div>
              <div className="text-gray-500 dark:text-slate-400 transition-colors duration-300">
                Mon - Sat: {clinicData.hours}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400 dark:text-slate-500" />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Phone Number
              </div>
              <div className="text-gray-500 dark:text-slate-400 transition-colors duration-300">
                {clinicData.phone}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-gray-400 dark:text-slate-500" />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Website
              </div>
              <a
                href="#"
                className="text-green-600 dark:text-green-400 hover:underline transition-colors duration-300"
              >
                Visit Official Site
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-start gap-3 border border-transparent dark:border-slate-800 transition-colors duration-300">
          <Shield className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-normal transition-colors duration-300">
            Our clinic follows strict health protocols. Your data and privacy
            are protected under international healthcare standards.
          </p>
        </div>
      </div>

      {}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm h-64 relative group transition-colors duration-300">
        <div className="absolute inset-0 bg-gray-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 transition-colors duration-300">
          <MapPin className="w-10 h-10 text-gray-400 dark:text-slate-500" />
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-widest transition-colors duration-300">
            Interactive Map
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 rounded-xl shadow-lg flex items-center justify-between border border-transparent dark:border-slate-800 transition-colors duration-300">
          <div className="text-xs">
            <div className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
              San Francisco, CA
            </div>
            <div className="text-gray-500 dark:text-slate-400 transition-colors duration-300">
              1.2 miles away
            </div>
          </div>
          <button className="bg-green-600 dark:bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
