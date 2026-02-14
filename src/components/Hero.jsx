
export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden" id="hero">
            <div className="hero-slide">
                <div className="slide-bg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRKKiuZw3Ef-vszgPWodoY1rxBbeQpk-sszvtHpl3cHJKvaXJPPlejNZPcfOQvCBkJee3oQJd-su9j1nLfNA0MJecZPUNy1etcmGGPUO-qAOW0-h-CIvIruGOaXCX3COVxLGeyFPvPeb7O-kOziK_C2b5yHFSTTqgCinOVXB9h398ESSpwl0rO7eAG5ZbRQSvWlI5PyN-vNm_K3k3zBRV1cnQexsr_hZIiVNv6yNwHV5r7e_AWXvpJW-nvR5dzN0DuC0VF6qmTgDQ')" }}></div>
                <div className="hero-gradient-overlay"></div>
                <div className="mesh-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60"></div>
                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 backdrop-blur-sm">
                        Pioneering Professional Health
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-medical-dark dark:text-white leading-tight md:leading-[0.9] tracking-tighter mb-6 md:mb-8 text-glow-green">
                        PRECISION <span className="text-primary italic">CARE.</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-base md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-8 md:mb-12 px-4">
                        AetherCare integrates emerald-standard diagnostics and surgical excellence for elite patient outcomes in a modern clinical environment.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="group w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-2xl hover:scale-105 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-4 text-base md:text-lg">
                            VIEW DETAILS
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
