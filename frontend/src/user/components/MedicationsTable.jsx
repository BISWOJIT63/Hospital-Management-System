import { CalendarDays, Clock, Building2, User } from "lucide-react";

const statusConfig = {
  confirmed: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", dot: "bg-emerald-500" },
  pending: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", dot: "bg-amber-500" },
  completed: { bg: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", dot: "bg-blue-500" },
  cancelled: { bg: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400", dot: "bg-rose-500" },
};

export default function MedicationsTable({ theme, appointments = [] }) {
  if (appointments.length === 0) {
    return (
      <div className={`rounded-xl border overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Appointments</h4>
        </div>
        <div className="py-12 text-center">
          <CalendarDays className={`w-10 h-10 mx-auto mb-3 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>No appointments found. Book one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`p-6 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
        <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Appointments</h4>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
            Last {appointments.length}
          </span>
          <button 
            onClick={() => window.location.hash = '#appointments'} 
            className="text-xs font-bold text-[#50df20] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-700' : 'divide-slate-100'}`}>
            {appointments.map((apt) => {
              const cfg = statusConfig[apt.status] || statusConfig.pending;
              return (
                <tr key={apt._id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                        {apt.providerType === 'Doctor' ? (
                          <User className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Building2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{apt.providerName}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{apt.providerType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{apt.service}</p>
                    {apt.notes && <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{apt.notes}</p>}
                  </td>
                  <td className="px-6 py-5">
                    <div className={`flex items-center gap-1 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CalendarDays className="w-4 h-4" />
                      {apt.date}
                    </div>
                    <div className={`flex items-center gap-1 text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      <Clock className="w-3 h-3" />
                      {apt.time}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${cfg.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {apt.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
