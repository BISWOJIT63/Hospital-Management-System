export default function FloatingSearch({ isSearchOpen, setIsSearchOpen }) {
  return (
    <div className={`fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-3xl z-[110] transition-all duration-300 ${isSearchOpen ? "translate-y-0 opacity-100 visible" : "translate-y-20 opacity-0 invisible lg:translate-y-0 lg:opacity-100 lg:visible"}`}>
      {/* Mobile Close Button */}
      <button
        onClick={() => setIsSearchOpen(false)}
        className="lg:hidden absolute -top-14 right-0 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
      <div className="glass-panel rounded-3xl md:rounded-[2rem] p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
            <div className="flex items-center gap-3 px-4 py-3 md:px-4 md:py-3 md:border-r border-primary/10 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-primary text-lg md:text-xl">
                location_searching
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  REGION
                </label>
                <input
                  className="bg-transparent focus:outline-none border-none p-0 text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Location"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 md:px-4 md:py-3 md:border-r border-primary/10 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-secondary text-lg md:text-xl">
                psychiatry
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  SPECIALTY
                </label>
                <input
                  className="bg-transparent focus:outline-none border-none p-0 focus:ring-0 text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Specialty"
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 md:px-4 md:py-3 bg-primary/5 md:bg-transparent rounded-xl md:rounded-none">
              <span className="material-symbols-outlined text-primary text-lg md:text-xl">
                apartment
              </span>
              <div className="w-full">
                <label className="block text-[7px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">
                  HOSPITAL
                </label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-medical-dark dark:text-white placeholder-slate-400 w-full text-xs md:text-sm font-bold"
                  placeholder="Hospital"
                  type="text"
                />
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto px-6 md:px-8 h-12 md:h-14 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl md:rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 tracking-widest text-xs md:text-sm">
            <span className="material-symbols-outlined text-lg md:text-xl">search</span>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
