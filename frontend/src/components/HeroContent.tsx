import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SlideData {
  id: number;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

interface HeroContentProps {
  slides: SlideData[];
  currentIndex: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({ slides, currentIndex }) => {
  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-full min-h-[50vh] lg:h-screen bg-sigmo-light flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 select-none shrink-0">
      
      {/* Central Content (Text and CTA) */}
      <div className="max-w-xl flex flex-col justify-center flex-grow">
        <div className="space-y-6">
          {/* Main Title Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-wide text-sigmo-dark font-rajdhani select-text">
            {currentSlide.titlePrefix}{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sigmo-green to-emerald-500">
              {currentSlide.titleHighlight}
            </span>{' '}
            {currentSlide.titleSuffix}
          </h1>

          {/* Subtitle / Paragraph Description */}
          <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed select-text max-w-[480px]">
            {currentSlide.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 text-xs md:text-sm font-semibold tracking-widest text-sigmo-dark hover:text-sigmo-green transition-colors duration-300 uppercase"
          >
            <span>Discover Now</span>
            {/* Round circle icon, using brand green to replace yellow from screenshot */}
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sigmo-green text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-sigmo-green/20">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>

      {/* Subtle branding or slider dot indicators at the bottom left of this panel */}
      <div className="mt-auto pt-6 flex items-center gap-4 border-t border-gray-200 text-[10px] text-gray-400 tracking-widest uppercase font-semibold">
        <span>Nepal's Premier Tech Agency</span>
        <span className="w-1.5 h-1.5 rounded-full bg-sigmo-green"></span>
        <span>Est. 2026</span>
      </div>

    </div>
  );
};
export default HeroContent;
