const facility = [
  {
    title: "Berhampur, Ganjam",
    category: "location",
    image: "https://www.shutterstock.com/shutterstock/videos/3529214881/thumb/1.jpg?ip=x480",
    alt: "Stockholm waterfront cityscape with historic buildings",
  },
  {
    title: "Modern Hospital Exterior",
    category: "medical",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contemporary hospital building exterior",
  },
  {
    title: "Hospital Corridor",
    category: "facility",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    alt: "Clean modern hospital hallway",
  },
  {
    title: "Medical Team",
    category: "staff",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    alt: "Doctors discussing patient treatment",
  },
  {
    title: "Advanced Medical Equipment",
    category: "technology",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
    alt: "High-tech medical equipment in hospital",
  },
  {
    title: "Patient Care Room",
    category: "facility",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
    alt: "Modern patient room with medical bed",
  },
];

const Fcaility = ({ fac }) => (
  <div className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] glass-card shadow-lg">
    <div className="aspect-[4/5] overflow-hidden">
      <img
        src={fac.image}
        alt="Hospital"
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 via-transparent to-transparent"></div>
    </div>
    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-4 py-1.5 rounded-full bg-primary/20 text-white text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
          {fac.category}
        </span>
      </div>
      <h4 className="text-xl md:text-3xl font-black text-white mb-4 md:mb-6">
        {fac.title}
      </h4>
      <button className="w-full h-12 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-sm group-hover:bg-primary group-hover:border-primary transition-all flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-xl">explore</span>
        VIEW FACILITY
      </button>
    </div>
  </div>
);

export default function Hospitals() {
  return (
    <section
      className="px-6 py-24 md:py-32 lg:px-20 bg-slate-50 dark:bg-slate-900/50"
      id="hospitals"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
              HEALING <span className="text-primary italic">SPACES</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium">
              Modern clinical environments where architectural clarity meets
              advanced medical infrastructure.
            </p>
          </div>
          <button className="w-full md:w-auto px-8 md:px-10 py-4 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-primary font-black uppercase tracking-widest transition-all text-sm">
            FACILITY NETWORK
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {facility.map((fac, idx) => (
            <Fcaility key={idx} fac={fac} />
          ))}
        </div>
      </div>
    </section>
  );
}
