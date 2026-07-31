import React from 'react';
import { Clock, Smile, Rocket, Users } from 'lucide-react';
import { Counter } from './Counter';

export const StatsAndOrganizations: React.FC = () => {
  const stats = [
    {
      id: 1,
      icon: <Clock className="w-12 h-12 stroke-[1.2] text-gray-300 group-hover:text-white transition-colors duration-300 mb-5" />,
      target: 5,
      prefix: '',
      suffix: '+',
      label: 'Years of online creativity',
    },
    {
      id: 2,
      icon: <Smile className="w-12 h-12 stroke-[1.2] text-gray-300 group-hover:text-white transition-colors duration-300 mb-5" />,
      target: 10,
      prefix: '',
      suffix: '+',
      label: 'Happy clients',
    },
    {
      id: 3,
      icon: <Rocket className="w-12 h-12 stroke-[1.2] text-gray-300 group-hover:text-white transition-colors duration-300 mb-5" />,
      target: 15,
      prefix: '',
      suffix: '+',
      label: 'Projects delivered',
    },
    {
      id: 4,
      icon: <Users className="w-12 h-12 stroke-[1.2] text-gray-300 group-hover:text-white transition-colors duration-300 mb-5" />,
      target: 10,
      prefix: '',
      suffix: '+',
      label: 'Professionals engaged',
    },
  ];

  return (
    <div id="about" className="w-full flex flex-col items-center bg-white pt-16 pb-8 md:pt-24 md:pb-12">
      {/* 1. Statistics Strip Section */}
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-transparent select-none">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group flex flex-col items-center justify-center text-center py-14 px-8 bg-white border border-gray-200 -ml-[1px] -mt-[1px] hover:bg-sigmo-green text-sigmo-dark hover:text-white hover:-translate-y-3 hover:shadow-2xl hover:z-20 transition-all duration-300 ease-in-out transform cursor-default rounded-none relative z-10"
            >
              {/* Stat Icon */}
              {stat.icon}
              
              {/* Stat Number (Counter) */}
              <span className="text-4xl md:text-5xl font-rajdhani font-bold text-[#063f27] group-hover:text-white transition-colors duration-300 mb-2 leading-none">
                <Counter target={stat.target} suffix={stat.suffix} />
              </span>
              
              {/* Stat Label */}
              <span className="text-xs md:text-sm text-gray-400 group-hover:text-white/80 transition-colors duration-300 font-medium leading-relaxed max-w-[180px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Trusted by Leading Organizations Section */}
      <section className="w-full bg-[#f4faf6] border-t border-gray-100 py-16 md:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Vertical Left Title (Rotates on desktop, displays normally on mobile) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-start justify-center lg:justify-start shrink-0 select-none">
            {/* Left/Top Accent Line */}
            <div className="w-12 lg:w-[1.5px] h-[2px] lg:h-16 bg-gray-300/80 mb-4 lg:mb-6"></div>
            <h2 className="lg:vertical-text text-center lg:text-left text-2xl md:text-3xl font-rajdhani font-bold tracking-wider leading-none text-sigmo-dark select-text uppercase lg:h-[350px] lg:mt-4">
              Trusted by Leading <span className="text-sigmo-green">Organizations</span>
            </h2>
          </div>

          {/* Right Logo Grid */}
          <div className="flex-1 w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Annapurna School Logo.webp",
                "image-Photoroom (1).png",
                "image-Photoroom.png",
                "Raising Diamond.png",
                "rishi_dashboard.png",
                "travelmasterlogo.png",
              ].map((src) => (
                <div
                  key={src}
                  className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group"
                >
                  <img
                    src={`/partners/${src}`}
                    alt={src.replace(/\.[^.]+$/, "")}
                    loading="lazy"
                    className="max-w-[85%] max-h-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};
export default StatsAndOrganizations;
