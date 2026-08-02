import React from 'react';

interface TechItem {
  name: string;
  src: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Android', src: '/tools-technology/android-character-symbol.png' },
  { name: 'Apple', src: '/tools-technology/apple-logo.png' },
  { name: 'CSS3', src: '/tools-technology/css-3.png' },
  { name: 'HTML5', src: '/tools-technology/html.png' },
  { name: 'JavaScript', src: '/tools-technology/js-file.png' },
  { name: 'MySQL', src: '/tools-technology/mysql.png' },
  { name: 'PostgreSQL', src: '/tools-technology/postgre.png' },
  { name: 'React', src: '/tools-technology/programing.png' },
  { name: 'API / Social', src: '/tools-technology/social.png' },
];

export const ToolsAndTechnologies: React.FC = () => {
  return (
    <section className="w-full bg-white border-t border-gray-200/60 py-20 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-base md:text-lg font-rajdhani font-bold tracking-widest text-gray-500 uppercase mb-12">
          Tools & Technologies
        </h2>
        
        {/* Marquee Wrapper with Fade overlays */}
        <div className="relative w-full overflow-hidden">
          {/* Fade Overlays */}
          <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling track */}
          <div className="flex gap-20 md:gap-28 w-max animate-marquee hover:[animation-play-state:paused] py-6">
            {/* Double copy for seamless infinite loop */}
            {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => (
              <div 
                key={idx}
                aria-hidden={idx >= TECH_ITEMS.length}
                className="flex flex-col items-center justify-center cursor-default px-2"
                title={item.name}
              >
                <img 
                  src={item.src} 
                  alt={idx >= TECH_ITEMS.length ? "" : item.name}
                  className="h-16 w-auto object-contain filter-grayscale-dark hover:filter-green hover:scale-115 transition-all duration-300 select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsAndTechnologies;
