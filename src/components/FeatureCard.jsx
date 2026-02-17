import React, { useEffect, useRef, useState } from "react";
import i1 from "../assets/images/i1.png";
import i2 from "../assets/images/i2.png";
import i3 from "../assets/images/i3.png";
import i4 from "../assets/images/i4.png";

import { ChevronRight } from "lucide-react";

/**
 * Hook to check if an element is in the viewport
 * Triggers animation when the element enters the screen.
 */
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only animate once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const FeatureCard = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  const side = isEven ? "left" : "right";
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  const baseClasses = "transition-all duration-1000 ease-out transform";
  const hiddenClasses =
    side === "left" ? "-translate-x-24 opacity-0" : "translate-x-24 opacity-0";
  const visibleClasses = "translate-x-0 opacity-100";

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24 ${baseClasses} ${isVisible ? visibleClasses : hiddenClasses} ${!isEven ? "md:flex-row-reverse" : ""}`}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-teal-200 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative  p-8 rounded-3xl shadow-xl border border-teal-50 transform group-hover:scale-105 transition-transform duration-300">
            <img className="w-[200px]" src={feature.icon} alt={feature.title} />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full opacity-20 animate-bounce delay-100"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-bounce delay-300"></div>
        </div>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-sm font-semibold tracking-wide uppercase">
          {feature.tag}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {feature.title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          {feature.description}
        </p>
        <ul className="space-y-2 pt-2">
          {feature.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-center text-gray-600 md:justify-start justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2"></div>
              {benefit}
            </li>
          ))}
        </ul>
        <button className="mt-4 px-6 py-2 text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2 group mx-auto md:mx-0 transition-all">
          Learn more
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
export default FeatureCard;
