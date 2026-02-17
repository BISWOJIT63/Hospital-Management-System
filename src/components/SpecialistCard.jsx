import React from "react";

const SpecialistCard = ({ doctor, className }) => {
  return (
    <div className={`w-72 md:w-80 shrink-0 ${className}`}>
      <div className="carousel-item glass-card p-4 rounded-[2.5rem] group shadow-md border-primary/5 h-full flex flex-col">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800">
          <img
            alt="Doctor"
            className="h-full w-full object-cover group-hover:scale-110 transition-all duration-700"
            src={doctor.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h4 className="text-xl md:text-2xl font-black text-medical-dark dark:text-white text-center">
              {doctor.name}
            </h4>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-3 text-center">
              {doctor.specialist}
            </p>
          </div>
          <div className="mt-4">
            <button className="w-full h-12 md:h-14 rounded-2xl bg-primary/5 text-primary border border-primary/20 text-[10px] md:text-xs font-black tracking-widest hover:bg-primary hover:text-white transition-all">
              VIEW PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
