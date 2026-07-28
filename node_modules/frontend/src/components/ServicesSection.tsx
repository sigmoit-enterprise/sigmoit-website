import React from 'react';
import { Cloud, Globe, Cpu, GraduationCap, ChevronRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ICON_CLASS = 'w-12 h-12 shrink-0 stroke-[1.4]';

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    icon: <Cloud className={ICON_CLASS} stroke="url(#sigmoIconGradient)" />,
    title: 'SaaS Products & Cloud Solutions',
    description: 'Scale your operations with custom cloud-based software architectures, automated subscription portals, and highly resilient multi-tenant SaaS platforms.',
  },
  {
    id: '02',
    icon: <Globe className={ICON_CLASS} stroke="url(#sigmoIconGradient)" />,
    title: 'Tailored Web Architectures',
    description: 'Establish your brand with customized, ultra-fast websites designed for high conversion, robust search optimization (SEO), and fluid, intuitive user experiences.',
  },
  {
    id: '03',
    icon: <Cpu className={ICON_CLASS} stroke="url(#sigmoIconGradient)" />,
    title: 'Mobile & Desktop Systems',
    description: 'From concept to deployment, we build native and cross-platform mobile apps and desktop solutions that drive engagement and optimize workflows.',
  },
  {
    id: '04',
    icon: <GraduationCap className={ICON_CLASS} stroke="url(#sigmoIconGradient)" />,
    title: 'Advanced IT Mentorship',
    description: 'Bridge the gap between academics and industry with practical, expert-led training programs, real-world coding challenges, and career bootcamps.',
  },
];

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div>
    <div className="flex items-center gap-5">
      {item.icon}
      <div className="min-w-0">
        <span className="block text-sm font-bold tracking-wider text-sigmo-green leading-none mb-1">
          {item.id}
        </span>
        <h3 className="text-xl md:text-2xl font-sans font-bold text-sigmo-dark tracking-tight leading-snug">
          {item.title}
        </h3>
      </div>
    </div>
    <p className="mt-6 text-sm md:text-base text-gray-500 font-light leading-relaxed">
      {item.description}
    </p>
  </div>
);

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full bg-white border-t border-gray-100 py-20 lg:py-28 relative overflow-hidden select-none">

      {/* Shared gradient definition used by the service icons */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sigmoIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#24a556" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>

      {/* Oversized brand mark bleeding off the right edge */}
      <div className="absolute top-32 md:top-48 -right-24 md:-right-32 z-0 pointer-events-none opacity-90">
        <svg
          viewBox="0 0 40 40"
          aria-hidden="true"
          focusable="false"
          className="w-[240px] md:w-[340px] lg:w-[420px] h-auto -rotate-12"
        >
          <path
            fill="#24a556"
            transform="translate(-16.1887,-48.3327)"
            d="m 18.659915,48.332675 c -1.368955,0 -2.471214,1.133437 -2.471214,2.541812 v 27.744429 c 4.793018,0.006 9.25306,0.686794 12.440378,-1.389375 2.376433,-1.547972 3.815549,-4.083839 5.162832,-7.166819 1.347286,-3.083014 2.531219,-6.634024 4.745727,-9.715434 3.218471,-4.478379 8.374272,-5.897491 13.33244,-5.948061 1.312332,-0.01325 2.610355,0.07005 3.855316,0.217107 v -3.741847 c 0,-1.408375 -1.102256,-2.541812 -2.471216,-2.541812 z m 33.099412,10.366754 c -3.948492,0.113292 -7.690964,1.279811 -9.845741,4.278097 -1.729556,2.406625 -2.875375,5.666471 -4.317051,8.965478 -1.441674,3.298975 -3.249663,6.714068 -6.649415,8.928634 -4.832937,3.148066 -10.42938,2.041866 -14.758419,2.028185 v 2.783296 c 0,1.408386 1.102259,2.54237 2.471214,2.54237 h 34.594263 c 1.36896,0 2.471216,-1.133984 2.471216,-2.54237 V 58.908604 C 54.414632,58.741183 53.075492,58.66167 51.759327,58.699429 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <h2 className="font-rajdhani font-bold leading-[1.05] select-text">
            <span className="block text-3xl md:text-5xl lg:text-[3.4rem] font-normal text-gray-600">
              Comprehensive IT Solutions, Crafted
            </span>
            <span className="block text-4xl md:text-6xl lg:text-[4rem] text-sigmo-green">
              For Your Growth
            </span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-gray-500 font-light text-sm md:text-base leading-relaxed">
            Explore our range of professional technology services designed to empower your business, train your team, and accelerate your digital transformation.
          </p>
        </div>

        {/* Staggered 2x2 Services Grid with Dashed Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">

          {/* Column A — cards 01 & 03 */}
          <div className="flex flex-col md:border-r border-dashed border-gray-300 md:pr-12">
            <div className="pb-12 border-b border-dashed border-gray-300">
              <ServiceCard item={SERVICES[0]} />
            </div>
            <div className="pt-12 md:pt-16">
              <ServiceCard item={SERVICES[2]} />
            </div>
          </div>

          {/* Column B — cards 02 & 04, offset downward */}
          <div className="flex flex-col md:pl-12 border-t border-dashed border-gray-300 md:border-t-0 pt-12 md:pt-20">
            <div className="pb-12 border-b border-dashed border-gray-300">
              <ServiceCard item={SERVICES[1]} />
            </div>
            <div className="pt-12 md:pt-16">
              <ServiceCard item={SERVICES[3]} />
            </div>
          </div>

        </div>

        {/* View More Services CTA */}
        <div className="w-full flex justify-center mt-16 md:mt-24">
          <a
            href="/services"
            className="group inline-flex items-center gap-4 text-xs font-bold tracking-widest text-sigmo-dark hover:text-sigmo-green transition-colors duration-300 uppercase"
          >
            <span>View More Services</span>
            <span className="w-8 h-8 rounded-full bg-sigmo-green text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110 shadow-md">
              <ChevronRight className="w-4 h-4" />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
