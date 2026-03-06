import { ShieldCheck, CheckCircle, Lock } from "lucide-react";

export default function SecurityCard({ theme }) {
  return (
    <div className={`rounded-2xl p-6 shadow-lg relative overflow-hidden border transition-colors ${
      theme === 'dark'
        ? 'bg-slate-800/50 border-slate-700'
        : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
    }`}>
      <div className="absolute -bottom-8 -left-8 size-32 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 space-y-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
          {"Security & Privacy"}
        </h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-xl border transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-slate-600'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>2FA Authentication</span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                Active
              </span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Account secured with biometric login and SMS codes.
            </p>
          </div>
          <div className={`p-4 rounded-xl border transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700/30 border-slate-600'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Data Permissions</span>
              <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Sharing medical records with authorized physicians only.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className={`size-6 rounded flex items-center justify-center transition-colors ${
              theme === 'dark'
                ? 'bg-emerald-500/20'
                : 'bg-emerald-100'
            }`}>
              <Lock className="size-3 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              HIPAA Compliant System
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
