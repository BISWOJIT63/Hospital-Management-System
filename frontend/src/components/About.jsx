import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import video from "../assets/video/office.mp4"
import image from "../assets/images/aboute1.jpg"
const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen dark:bg-[#141414] bg-white space-normal text-white dark:text-[#141414] font-sans overflow-hidden relative selection:bg-green-500/30 selection:text-green-200">
      
      <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-[400px] h-[800px] bg-black rounded-r-full blur-[100px] opacity-60 z-0 pointer-events-none"></div>

      <main className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 items-center">
          
          <div className="relative w-full max-w-[600px] mx-auto lg:mx-0 h-[500px] lg:h-[650px] flex gap-4 md:gap-6 items-end">
            
            <div className="w-[55%] h-full relative z-10">
              <img 
                src={image}
                alt="Nurse caring for elderly patient" 
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl brightness-90"
              />
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-12 -left-6 md:bottom-20 md:-left-12 z-20 w-32 h-32 md:w-40 md:h-40 bg-[#16a34a] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(22,163,74,0.4)] hover:scale-105 transition-transform duration-300 group"
                aria-label="Play promotional video"
              >
                <svg className="absolute w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                  <path id="textPath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="none" />
                  <text className="text-[10px] font-bold uppercase tracking-[0.25em]" fill="rgba(255,255,255,0.9)">
                    <textPath href="#textPath" startOffset="0%">Play Video • Play Video • Play Video •</textPath>
                  </text>
                </svg>
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#111] rounded-full flex items-center justify-center relative z-10 border-2 border-[#16a34a]/30 group-hover:bg-black transition-colors">
                  <Play className="text-white ml-1" fill="white" size={24} />
                </div>
              </button>
            </div>

            <div className="w-[45%] h-full relative overflow-hidden rounded-[2rem] rounded-bl-[8rem] shadow-2xl brightness-90">
              <img 
                src={image} 
                alt="Happy elderly patient" 
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>

          <div className="flex flex-col justify-center">
            
            <div className="flex items-center gap-2 bg-[#222] border border-white/5 w-max px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold tracking-wider text-gray-300 uppercase">About Us</span>
            </div>

            <h1 className="text-4xl text-[#141414] dark:text-white md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight mb-6">
              We provide hospital grade care in the <br className="hidden md:block" />
              <span className="text-green-500 italic relative inline-block">
                comfort of your home
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-green-500 rounded-full"></span>
              </span>
            </h1>

            <p className="dark:text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light">
              Our mission is to make healthcare more accessible by offering reliable medical support, post-operative recovery, chronic condition management, and daily assistance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard 
                title="Verified Caregiver & Nurses"
                description="All staff are professionally trained, background-verified."
              />
              <FeatureCard 
                title="Personalized Care Plans"
                description="Every care plan is tailored to medical conditions, recovery needs."
              />
              <FeatureCard 
                title="Patient First Approach"
                description="We combine professional healthcare with emotional support, treating every patient."
              />
              <FeatureCard 
                title="Comfort & Dignity"
                description="Our services focus on enabling patients to live comfortably at home."
              />
            </div>

          </div>
        </div>
      </main>

      {isVideoOpen && (
        <div 
          className="fixed df inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }}
          >
            <X size={28} />
          </button>

          <div 
            className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(22,163,74,0.15)] border border-white/10 relative scale-in-center"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              className="w-full h-full"
              src={video}
              title="Healthcare Presentation Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="relative dark:bg-[#1a1a1a] bg-slate-100 border border-[#2a2a2a] rounded-2xl p-6 overflow-hidden group hover:border-green-500/40 transition-colors duration-300">
      
      <div 
        className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-300"
        
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <h3 className="dark:text-white text-[#141414] text-[1.1rem] font-bold tracking-wide mb-2 leading-tight">
          {title}
        </h3>
        <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed pr-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default About;