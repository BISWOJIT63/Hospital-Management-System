import { CalendarClock } from "lucide-react";

export default function RefillTracker({ theme, upcoming = [] }) {
  if (upcoming.length === 0) {
    return (
      <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h4 className={`font-bold flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <CalendarClock className="w-5 h-5 text-[#50df20]" />
          Upcoming Appointments
        </h4>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>No upcoming appointments.</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <h4 className={`font-bold flex items-center gap-2 mb-5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        <CalendarClock className="w-5 h-5 text-[#50df20]" />
        Upcoming Appointments
      </h4>
      <div className="space-y-3">
        {upcoming.slice(0, 4).map((apt, i) => (
          <div key={apt._id || i} className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
            <div>
              <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{apt.service}</p>
              <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{apt.providerName}</p>
            </div>
            <div className="text-right">
              <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{apt.date}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{apt.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
