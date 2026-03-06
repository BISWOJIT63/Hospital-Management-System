import { Camera, RefreshCw } from "lucide-react";

export default function ProfileHero({ theme }) {
  return (
    <section className={`border rounded-2xl p-6 lg:p-8 transition-colors ${
      theme === 'dark' 
        ? 'bg-slate-800/50 border-slate-700' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative flex-shrink-0">
          <div className={`size-32 rounded-full border-2 p-1 transition-colors ${
            theme === 'dark'
              ? 'border-slate-600 bg-slate-700'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <img
              className="w-full h-full object-cover rounded-full"
              alt="Portrait of patient Alexander Wright"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs--eVjYRH1mqaSiaqgrb5q9VmydVWcw0yWm-9fjNdqTGvTZiUA-WSZwoufgKt3eR-dBTMPaRp1rkH9C4FNuKDbp2b7D0gmBQhqXKaTgdcx6lZ_AFIvlUtOQvNBtT9JNzRlxKrJ-M_QgDl-W3GRowhmY0viYOt1kYFsd5Dfl9WneDK3GTFNs__Ma1rjDH5teeug5P8uS9cnkhP57AA3xIilUUuYv2wSTpn-QKousokZgax9vmUIoUwt29tJGZ9zpuoZSZONaBZM3s"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white transition-colors cursor-pointer">
            <Camera className="size-4" />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
            <h2 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Alexander Wright
            </h2>
            <span className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              Active
            </span>
          </div>
          <div className={`flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <span className="flex items-center gap-1 font-medium">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{"ID:"}</span> AC-99203
            </span>
            <span className={`size-1 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <span className="flex items-center gap-1">
              <RefreshCw className="size-3.5" />
              {"Last updated: Oct 24, 2023"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className={`px-6 py-2.5 font-bold text-sm rounded-lg transition-colors cursor-pointer ${
            theme === 'dark'
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
          }`}>
            Download Records
          </button>
          <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-emerald-600/25 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
