
export default function Hospitals() {
    return (
        <section className="px-6 py-24 md:py-32 lg:px-20 bg-slate-50 dark:bg-slate-900/50" id="hospitals">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
                            HEALING <span className="text-primary italic">SPACES</span>
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium">
                            Modern clinical environments where architectural clarity meets advanced medical infrastructure.
                        </p>
                    </div>
                    <button className="w-full md:w-auto px-8 md:px-10 py-4 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-primary font-black uppercase tracking-widest transition-all text-sm">
                        FACILITY NETWORK
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    <div className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] glass-card shadow-lg">
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                alt="Hospital"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkUHFKsBTZa9yWq7knAFVlLnTfTH-a7xMEI0wro8tWVUGckym-oLJsgympCCLV2akil_jeNgKojHXr62epHnXjTgtxzx_LXz2qt8dseWutC66M00RuGOfZRjQaI5uGsfGZloZxCOR_lS_JIJQY7ha0LV5XOXq5rEPYFdOTDgmCZjsqSXWzgkw_uZ4_B5H_z5bC91uwows_ssrChwQoYGKl8do6PYYCtsYu4WRIbviEX8Gy3STqTJV4LhNAvDUuSwmy7FMK_PggwoE"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-primary/20 text-white text-[10px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">STOCKHOLM</span>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black text-white mb-6">NORDIC MEDICAL</h4>
                            <button className="w-full h-12 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-sm group-hover:bg-primary group-hover:border-primary transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-xl">explore</span>
                                VIEW FACILITY
                            </button>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] glass-card shadow-lg">
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                alt="Hospital"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAunGoURefs5hABn41vjKve_MvE_VsoeHCYJvw4KPCGvu02Dn3UCceNQEGUF22icZRhyQB3BfTy-tzgxBZQJfp2Ckp0twlQ2wQRJPuSNfC8fMvfJxoFyIxMseBjizC9fhSyy5t5isLuAThkwzrPbRMgTjWxBaqRIJVs8hk1X632EneHXEOB93nh1VIZQESVpUUZaNMt1onYVFL_eN0at6GQeCVQBP1aWGZFwa7d49fmni4CYh49tgls-BHvcwOa8tIG4WhJ4eLQ6OM"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-secondary/20 text-white text-[10px] font-black tracking-widest uppercase border border-secondary/20 backdrop-blur-md">COPENHAGEN</span>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black text-white mb-6">THE ATRIUM</h4>
                            <button className="w-full h-12 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-sm group-hover:bg-primary group-hover:border-primary transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-xl">explore</span>
                                VIEW FACILITY
                            </button>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] glass-card shadow-lg">
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                alt="Hospital"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr16QE5szLpNYVpmxin2usuijeqmepO5CqOOTfPZJtjO-TeKBEmtONCZFtW7679fmn-nEMMsa5jM7-MLQfeXOtODdo5VPklwmgY_4v2dwGKe5L5GlbZxVN41I5Qpnr9MOlhVJUpt0oZu2zgtc5CQi6PuCyKcTUhU36xBMfr3GxUb3KnNrvGXgNU5cYzQL89Cxkmjt4WsswhobckqVt8vtm7RNC03EpaHh48_x4ySzsdPOyrBzlE6avAyJm5E7-x54wBpVXKqkXqIQ"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full bg-primary/20 text-white text-[10px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">OSLO</span>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black text-white mb-6">LUMIERE CENTER</h4>
                            <button className="w-full h-12 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-sm group-hover:bg-primary group-hover:border-primary transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-xl">explore</span>
                                VIEW FACILITY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
