import React from 'react';
import { Link } from 'react-router-dom';

export const TalentSection: React.FC = () => {
  return (
    <section className="w-full bg-white border-t border-gray-100 overflow-hidden relative select-none">
      
      {/* Desktop Blended Image (Direct child of section to span to the absolute right viewport edge) */}
      <div className="hidden lg:flex w-[48%] absolute right-0 top-0 bottom-0 z-10 items-center justify-end">
        {/* Left-to-Right Desktop Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent z-15 pointer-events-none"></div>
        
        <img 
          src="/co-workers.jpg" 
          alt="Co-workers collaborating on laptop" 
          loading="lazy"
          decoding="async"
          className="w-[110%] h-full object-cover object-right select-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,1) 50%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,1) 50%)'
          }}
        />
      </div>

      {/* Main Copy Container (Centered horizontally relative to the entire viewport) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[480px] flex flex-col justify-center items-center relative z-20">
        
        {/* Copy & Actions Container */}
        <div className="w-full max-w-3xl flex flex-col justify-center items-center text-center py-16 lg:py-24 z-20 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rajdhani font-light leading-[1.12] text-sigmo-dark select-text">
            Tell Us the Idea.<br/>
            <span className="font-bold">We'll Build the </span>
            <span className="font-bold text-sigmo-green">Product.</span>
          </h2>

          <p className="mt-6 text-gray-500 font-light text-sm sm:text-base leading-relaxed select-text max-w-[500px] mx-auto">
            It starts with a single call. We turn your goals into a clear scope, timeline and cost, then design, build and ship software we keep looking after long after launch day.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-sigmo-green hover:bg-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 shadow-lg shadow-sigmo-green/20 text-center flex items-center justify-center gap-2 group"
            >
              <span>Contact Now</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-3.5 border border-sigmo-green text-sigmo-green hover:bg-sigmo-green hover:text-white font-bold rounded-lg text-sm transition-all duration-300 text-center"
            >
              Know More About Us
            </Link>
          </div>
        </div>
        
        {/* Mobile/Tablet Blended Image (Visible only on lg and down, stacks naturally below the text area) */}
        <div className="w-full lg:hidden h-[320px] relative z-10 flex items-center justify-end mt-4">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-15 pointer-events-none"></div>
          
        <img 
          src="/co-workers.jpg" 
          alt="" 
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover select-none opacity-95"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,1) 50%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,1) 50%)'
          }}
        />
        </div>

      </div>
    </section>
  );
};

export default TalentSection;
