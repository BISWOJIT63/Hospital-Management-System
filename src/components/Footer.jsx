import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-slate-50 dark:bg-slate-950 px-6 py-12 md:py-32 lg:px-20 pb-40 md:pb-52">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="logo-icon max-sm:w-4 max-sm:h-6">
                <div className="logo-cross max-sm:w-3 max-sm:h-3">
                  <div className="heartbeat-line max-sm:w-2 max-sm:h-3 w-4 h-5"></div>
                </div>
              </div>
              <h1
                className={`text-xl md:text-2xl max-sm:text-sm font-black tracking-tight uppercase `}
              >
                Aether<span className="text-primary">Care</span>
              </h1>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg leading-relaxed max-w-sm">
              Crafting the next generation of healthcare experiences with
              clinical excellence and medical precision.
            </p>
          </div>
          <div>
            <h5 className="text-medical-dark dark:text-white font-black text-xs tracking-widest uppercase mb-6 md:mb-10">
              Access
            </h5>
            <div className="flex flex-col gap-4 md:gap-6 text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="#">
                Hospitals
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Doctors
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Emergency
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-medical-dark dark:text-white font-black text-xs tracking-widest uppercase mb-6 md:mb-10">
              Legal
            </h5>
            <div className="flex flex-col gap-4 md:gap-6 text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Security
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms
              </a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <p className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] text-center md:text-left">
            © 2024 AETHERCARE HMS. PROFESSIONAL EXCELLENCE.
          </p>
          <div className="flex gap-6 md:gap-8">
            <span className="text-[8px] md:text-[10px] font-black tracking-widest text-primary uppercase">
              Precision
            </span>
            <span className="text-[8px] md:text-[10px] font-black tracking-widest text-secondary uppercase">
              Innovation
            </span>
            <span className="text-[8px] md:text-[10px] font-black tracking-widest text-medical-dark dark:text-white uppercase">
              Legacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
