import LightHero from "../assets/images/LightHero.png";
import DarkHero from "../assets/images/DarkHero.png";
import { CalendarDays } from "lucide-react";

export default function Hero({ isDark }) {
  return (
    <section className="relative h-auto w-full" id="hero">
      <div className="relative w-full">
        <img
          src={isDark ? DarkHero : LightHero}
          alt="Hero Background"
          className="w-full  object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-10  w-full px-6 ">
            <div className="inline-block  md:px-6 md:py-2 md:mt-10  max-sm:hidden  rounded-full bg-primary/10 border border-primary/20 text-primary md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-2 backdrop-blur-sm">
              Pioneering Professional Health
            </div>
            <div>
              <h2 className="left-0 text-4xl sm:text-5xl md:text-7xl max-sm:text-3xl max-sm:mt-10 lg:text-9xl font-black text-white leading-tight md:leading-[0.9] tracking-tighter mb-6 md:mb-8 text-glow-green">
                OUR <div className="text-primary italic">CARE.</div>
              </h2>
            </div>

            <div className="flex flex-col max-sm:text-sm sm:flex-row items-center justify-center gap-4 md:gap-6 max-sm:gap-3">
              <button className="group w-50% max-sm:w-[40%] max-sm:py-1 max-sm:px-0 px-6 py-4 md:px-12 md:py-6 max-sm:gap-1 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-2xl hover:scale-105 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 text-sm max-sm:font-medium md:text-lg">
                <span className="max-sm:text-xs">Book</span>
                <span className="max-sm:text-xs">Appointment</span>
                <span className="material-symbols-outlined  group-hover:translate-x-1 transition-transform">
                  <CalendarDays className="max-sm:w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
