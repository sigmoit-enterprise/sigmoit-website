import React from 'react';
import { Clock, Smile, Rocket, Users, ChevronRight } from 'lucide-react';
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

          {/* Right Logo Grid (3x3) */}
          <div className="flex-1 w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Logo Card 1: Nepal Tourism Board */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <svg className="h-14 w-auto text-gray-500 group-hover:text-[#2458a5] transition-colors duration-300 filter grayscale group-hover:grayscale-0" viewBox="0 0 160 50" fill="currentColor">
                  {/* Mock Nepal Tourism Board SVG path */}
                  <path d="M15 35 L25 15 L35 35 Z M25 22 L20 31 L30 31 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M30 35 L40 25 L50 35 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="58" y="25" fontSize="10" fontWeight="bold" fontFamily="sans-serif">NEPAL TOURISM</text>
                  <text x="58" y="37" fontSize="12" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">BOARD</text>
                </svg>
              </div>

              {/* Logo Card 2: SNV */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="text-center font-rajdhani text-4xl font-bold tracking-widest text-gray-400 group-hover:text-blue-600 transition-colors duration-300 relative select-none">
                  SNV
                  <div className="h-[3px] w-12 bg-gray-300 group-hover:bg-blue-600 mx-auto mt-1 transition-colors duration-300"></div>
                </div>
              </div>

              {/* Logo Card 3: BBC */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="flex gap-1.5 select-none">
                  {['B', 'B', 'C'].map((char, idx) => (
                    <span 
                      key={idx} 
                      className="w-8 h-8 bg-gray-200 group-hover:bg-red-600 text-gray-700 group-hover:text-white font-bold flex items-center justify-center border border-gray-300 group-hover:border-red-600 transition-all duration-300"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Logo Card 4: Ad Media */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="font-sans text-center select-none">
                  <span className="text-2xl font-light text-gray-400 group-hover:text-purple-600 transition-colors duration-300">ad</span>
                  <span className="text-2xl font-bold text-gray-500 group-hover:text-purple-800 transition-colors duration-300 ml-1">media</span>
                  <div className="text-[7px] tracking-[0.25em] text-gray-400 uppercase font-semibold">Private Limited</div>
                </div>
              </div>

              {/* Logo Card 5: Kalika Group */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="flex items-center gap-2 select-none">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2ZM12 17C10.3 17 9 15.7 9 14C9 13.2 9.3 12.5 9.8 12C9.4 12.8 9.5 13.8 10.2 14.5C10.9 15.2 11.9 15.3 12.7 14.9C12.2 15.4 11.5 15.7 10.7 15.7" />
                  </svg>
                  <div className="text-left font-rajdhani leading-none">
                    <span className="block text-sm font-bold text-gray-500 group-hover:text-gray-800 transition-colors duration-300">KALIKA</span>
                    <span className="block text-sm font-semibold text-gray-400 group-hover:text-sigmo-green transition-colors duration-300">GROUP</span>
                  </div>
                </div>
              </div>

              {/* Logo Card 6: Simrik Air */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="flex items-center gap-2 select-none">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
                  </svg>
                  <div className="text-left font-sans leading-none">
                    <span className="block text-xs font-bold text-gray-500 group-hover:text-gray-800 transition-colors duration-300">Simrik Air</span>
                    <span className="block text-[6px] tracking-wide text-gray-400">Always standby at your service</span>
                  </div>
                </div>
              </div>

              {/* Logo Card 7: Kantipur Publications */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="flex items-center gap-2 select-none">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-emerald-700 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 9h20L12 2zM4 9v11h16V9" />
                    <path d="M8 9v11M16 9v11M12 9v11" />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-emerald-800 transition-colors duration-300 leading-tight text-left">KANTIPUR<br/>PUBLICATIONS</span>
                </div>
              </div>

              {/* Logo Card 8: Himal Southasian */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-gray-400 group-hover:text-[#c2410c] transition-colors duration-300 select-none">
                  HIMAL
                </span>
              </div>

              {/* Logo Card 9: Ujyaalo */}
              <div className="bg-white p-6 h-56 rounded border border-gray-100/50 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group">
                <div className="text-center font-semibold text-lg text-gray-400 group-hover:text-[#da251c] transition-all duration-300 select-none">
                  उज्यालो
                  <div className="text-[7px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">Radio Network</div>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        {/* View More Link */}
        <div className="w-full flex justify-center mt-12">
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-4 text-xs font-bold tracking-widest text-sigmo-dark hover:text-sigmo-green transition-colors duration-300 uppercase"
          >
            <span>View More</span>
            <span className="w-8 h-8 rounded-full bg-sigmo-green text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110 shadow-md">
              <ChevronRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};
export default StatsAndOrganizations;
