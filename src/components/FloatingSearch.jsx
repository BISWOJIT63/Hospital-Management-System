export default function FloatingSearch() {
  return (
    <div className="floating-search">
      <div className="glass-panel rounded-[2rem] p-3 md:p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
            <div className="flex items-center gap-4 px-6 py-3 md:py-4 md:border-r border-primary/10 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-primary text-xl">
                location_searching
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  REGION
                </label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Location"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 md:py-4 md:border-r border-primary/10 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-secondary text-xl">
                psychiatry
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  SPECIALTY
                </label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Specialty"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 md:py-4 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-primary text-xl">
                apartment
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  HOSPITAL
                </label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Hospital"
                  type="text"
                />
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto px-10 md:px-12 h-14 md:h-16 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl md:rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 tracking-widest text-xs md:text-sm">
            <span className="material-symbols-outlined text-xl">search</span>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
