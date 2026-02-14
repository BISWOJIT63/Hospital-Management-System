import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "Marcus Thorne",
      star: 5,
      fb: "Exceeded all expectations. The build quality is solid and the interface is incredibly intuitive.",
      date: "2026-02-10",
    },
    {
      name: "Elena Rodriguez",
      star: 4,
      fb: "Great value for the price. Shipping took a day longer than expected, but the product itself is flawless.",
      date: "2026-01-28",
    },
    {
      name: "Sam 'Techie' Miller",
      star: 2,
      fb: "Disappointed. It worked well for the first week, but I've started noticing some lag in the response time.",
      date: "2026-02-05",
    },
    {
      name: "Sarah Jenkins",
      star: 5,
      fb: "Customer support was amazing! They helped me set everything up in under 5 minutes.",
      date: "2026-02-12",
    },
    {
      name: "David Wu",
      star: 3,
      fb: "It's okay. Does what it says on the box, but lacks the premium feel I was hoping for.",
      date: "2026-01-15",
    },
  ];
  return (
    <section>
      <div className="mx-auto max-w-7xl relative z-10 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl mt-20">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-medical-dark dark:text-white mb-6 md:mb-8 tracking-tighter uppercase">
              TOP <span className="text-primary">VOICES</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              Your Health Our Responsibility And Our Job Your feedback.
            </p>
          </div>
        </div>
      </div>
      <div className="flex rev-container mb-20">
        <div className="review-marquee-group mt-5 mb-20">
          {reviews.map((rev, i) => (
            <ReviewCard key={i} rev={rev} className="rev-card" />
          ))}
        </div>
        <div aria-hidden="true" className="review-marquee-group mt-5 mb-20">
          {reviews.map((rev, i) => (
            <ReviewCard key={i} rev={rev} className="rev-card" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
