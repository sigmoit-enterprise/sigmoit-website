import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export const CrystalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [containerReady, setContainerReady] = useState(false);

  useEffect(() => {
    // Look up the custom scrolling container <main> defined in App.tsx
    const mainElement = document.querySelector("main");
    if (mainElement) {
      containerRef.current = mainElement;
      setContainerReady(true);
    }
  }, []);

  // Set up standard scroll tracking relative to the scroll container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerReady ? containerRef : undefined,
    offset: ["start end", "end start"],
  });

  // True Parallax translation:
  // When scrolling down, the text translates up at a different rate than the crystal.
  // At 0.5 (section centered in viewport), translations are 0px (default position).
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const crystalY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-white border-t border-b border-gray-100 py-3 md:py-4 overflow-hidden relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: SaaS Promotion Text & Action (Parallax animated) */}
        <motion.div 
          style={{ y: textY }}
          className="flex flex-col justify-center text-left order-2 lg:order-1 relative z-20"
        >
          {/* Brand-aligned heading structure matching TalentSection */}
          <h2 className="font-rajdhani font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-sigmo-dark select-text">
            Grow Your Business<br/>
            <span className="font-bold">with Our </span>
            <span className="font-bold text-sigmo-green">SaaS Products.</span>
          </h2>
          
          <p className="mt-5 text-gray-500 font-sans text-sm sm:text-base font-light leading-relaxed max-w-[500px] select-text">
            Supercharge your operations and scale effortlessly with our suite of custom SaaS solutions. We build secure, cloud-native platforms designed to streamline workflows, enhance productivity, and drive sustainable growth for your enterprise.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Explore SaaS Button - Solid Brand Green */}
            <Link
              to="/services"
              className="px-8 py-3.5 bg-sigmo-green hover:bg-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 shadow-lg shadow-sigmo-green/20 text-center flex items-center justify-center gap-3 group w-full sm:w-auto"
            >
              <span>Explore SaaS</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Crystal 3D Image (Parallax animated) */}
        <motion.div 
          style={{ y: crystalY }}
          className="relative flex justify-center lg:justify-end items-center order-1 lg:order-2 w-full z-10"
        >
          <div className="relative w-full max-w-[640px] aspect-square flex items-center justify-center bg-transparent z-10 transition-transform duration-700 hover:scale-[1.03]">
            <img
              src="/crystal/crystal.png"
              alt="SigmoIT SaaS Crystal Showcase"
              className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(36,165,86,0.12)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CrystalSection;

