import { Siren, Contact } from "lucide-react";

export default function EmergencyContact({ theme }) {
  return (
    <div className={`border rounded-2xl p-6 relative overflow-hidden transition-colors ${
      theme === 'dark'
        ? 'bg-slate-800/50 border-slate-700'
        : 'bg-slate-50 border-slate-200'
    }`}>
      <div className={`absolute top-0 right-0 p-4 opacity-5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        <Contact className="size-20" />
      </div>
      <div className="relative z-10">
        <h3 className={`text-xl font-bold flex items-center gap-2 mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <Siren className="size-5 text-emerald-600 dark:text-emerald-400" />
          Emergency Contact
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Name
            </label>
            <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Sarah Wright</p>
          </div>
          <div className="space-y-1">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Relationship
            </label>
            <p className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>Spouse</p>
          </div>
          <div className="space-y-1">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Phone
            </label>
            <p className="font-bold text-lg text-[#50df20]">
              +1 (555) 9876-5432
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
