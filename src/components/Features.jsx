
export default function Features() {
    return (
        <section className="px-6 py-24 md:py-40 lg:px-20 relative overflow-hidden bg-white dark:bg-slate-950" id="how-it-works">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2"></div>
            <div className="mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-black text-medical-dark dark:text-white mb-6 uppercase tracking-tight">
                        The <span className="text-primary">Medical Network</span>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Streamlined, secure, and intelligent care pathways designed for professional clinical excellence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] group">
                        <div className="mb-8 md:mb-10 flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl md:rounded-[2rem] bg-primary/10 border border-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl md:text-5xl">biotech</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-medical-dark dark:text-white">Find Care</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Integrated search across our ecosystem of emerald-certified smart clinics and hospitals.
                        </p>
                    </div>
                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] group">
                        <div className="mb-8 md:mb-10 flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl md:rounded-[2rem] bg-primary/10 border border-primary/10 text-secondary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl md:text-5xl">neurology</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-medical-dark dark:text-white">Match Specialists</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Connect with leading practitioners in neurology, cardiology, and therapeutic surgical arts.
                        </p>
                    </div>
                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] group">
                        <div className="mb-8 md:mb-10 flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl md:rounded-[2rem] bg-primary/10 border border-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl md:text-5xl">shield_locked</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-medical-dark dark:text-white">Secure Records</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Encrypted health data portals and instant appointment scheduling with secure verification.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
