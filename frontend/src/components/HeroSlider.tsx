import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  /** Describes the image for search engines and screen readers. */
  alt: string;
}

interface HeroSliderProps {
  slides: Slide[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  currentIndex,
  onNext,
  onPrev,
}) => {
  return (
    <div className="relative w-full h-full min-h-[40vh] md:min-h-[50vh] lg:h-screen overflow-hidden group select-none">
      {/* Active Slide Image */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            width={1200}
            height={900}
            // The first slide is the LCP element, so it must load eagerly at
            // high priority. The rest are offscreen until the carousel advances.
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
          />
          {/* Black overlay to focus attention */}
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
      ))}

      {/* Bottom overlay for indicators and controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-6">
        {/* Slide Counter (e.g., "2 / 3") */}
        <div className="font-rajdhani text-sm md:text-base font-semibold tracking-widest text-sigmo-dark bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/60 shadow-sm">
          <span>{currentIndex + 1}</span>
          <span className="text-sigmo-green mx-1">/</span>
          <span className="text-gray-500">{slides.length}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-sigmo-dark border border-gray-200 hover:border-sigmo-green hover:bg-sigmo-green hover:text-white flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-sigmo-dark border border-gray-200 hover:border-sigmo-green hover:bg-sigmo-green hover:text-white flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
