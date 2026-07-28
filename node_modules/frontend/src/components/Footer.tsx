import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#f4faf6] border-t border-gray-200/40 rounded-t-[3rem] md:rounded-t-[5rem] relative overflow-hidden select-none">
      
      {/* Giant Watermarked Logo in the background (Faded, straight, left aligned) */}
      <div className="absolute left-0 bottom-0 top-0 w-full md:w-1/2 opacity-[0.08] pointer-events-none z-0 flex items-center justify-start pl-8 overflow-hidden">
        <img 
          src="/logo2.png" 
          alt="" 
          className="w-[450px] md:w-[650px] h-auto object-contain transform translate-x-[-15%] translate-y-[10%]"
        />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Grid: Links & Corporate Branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-gray-200/60">
          
          {/* Logo & Tagline Column (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <div className="flex items-center gap-6">
              <img 
                src="/logo.png" 
                alt="SigmoIT Logo" 
                className="h-12 md:h-14 w-auto object-contain"
              />
              <div className="w-[1px] h-10 bg-gray-300"></div>
              <div className="text-left font-sans text-xs md:text-sm text-gray-500 font-semibold tracking-wide leading-tight">
                <span className="block">Innovation.</span>
                <span className="block">Technology.</span>
                <span className="block">People.</span>
              </div>
            </div>
          </div>

          {/* Company Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-rajdhani text-lg font-bold text-sigmo-green">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <li>
                <a href="/#how-it-works" className="hover:text-sigmo-green transition-colors duration-300">
                  How it works
                </a>
              </li>
              <li>
                <a href="/#talent-engine" className="hover:text-sigmo-green transition-colors duration-300">
                  The talent engine
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-sigmo-green transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-sigmo-green transition-colors duration-300">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-rajdhani text-lg font-bold text-sigmo-green">
              Ecosystem
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <li>
                <a href="/#ing-arc" className="hover:text-sigmo-green transition-colors duration-300">
                  ING Arc
                </a>
              </li>
              <li>
                <a href="/#innovate-tech" className="hover:text-sigmo-green transition-colors duration-300">
                  Innovate Tech
                </a>
              </li>
              <li>
                <a href="/#ing-skill" className="hover:text-sigmo-green transition-colors duration-300">
                  ING Skill
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started Contact Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-rajdhani text-lg font-bold text-sigmo-green">
              Get started
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <li>
                <a href="/#book-a-call" className="hover:text-sigmo-green transition-colors duration-300">
                  Book a call
                </a>
              </li>
              <li>
                <a href="mailto:sales@sigmoit.com" className="hover:text-sigmo-green transition-colors duration-300 select-text">
                  sales@sigmoit.com
                </a>
              </li>
              <li>
                <span className="select-text">
                  +9779801022185
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer: Copyrights & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4 text-xs font-semibold text-gray-400 tracking-wider">
          <div className="select-text">
            © {new Date().getFullYear()} SigmoIT. All rights reserved.
          </div>
          <div className="select-text uppercase tracking-widest text-[10px]">
            Your trusted software development partner.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
