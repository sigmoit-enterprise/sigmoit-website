import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SidebarProps {
  onSearchClick: () => void;
  isScrolled?: boolean;
  onScrollToTop?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSearchClick, isScrolled = false, onScrollToTop }) => {
  return (
    <aside className="w-16 md:w-20 h-screen border-r border-gray-200 flex flex-col justify-between items-center py-8 bg-sigmo-light select-none shrink-0">
      {/* Top Brand Logo */}
      <div className="flex flex-col items-center">
        <Link to="/" className="group block focus:outline-none" aria-label="SigmoIT Home">
          {/* Logo container, rotating the logo vertically to match reference style */}
          <div className="transform -rotate-90 origin-center my-6 flex items-center justify-center whitespace-nowrap">
            <img 
              src="/logo.png" 
              alt="SigmoIT Logo" 
              className="h-8 md:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Middle Social Links */}
      <div className="flex flex-col items-center gap-6">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full border border-gray-200 hover:border-sigmo-green text-gray-500 hover:text-sigmo-green transition-all duration-300"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full border border-gray-200 hover:border-sigmo-green text-gray-500 hover:text-sigmo-green transition-all duration-300"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 rounded-full border border-gray-200 hover:border-sigmo-green text-gray-500 hover:text-sigmo-green transition-all duration-300"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <button 
          onClick={onSearchClick}
          className="p-2 rounded-full border border-gray-200 hover:border-sigmo-green text-gray-500 hover:text-sigmo-green transition-all duration-300 focus:outline-none mt-2"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Scroll Down / Go Top Indicator */}
      <button 
        onClick={isScrolled ? onScrollToTop : undefined}
        className={`flex flex-col items-center gap-4 focus:outline-none ${isScrolled ? 'cursor-pointer group' : 'cursor-default'}`}
        aria-label={isScrolled ? "Scroll to top" : "Scroll indicator"}
      >
        {isScrolled ? (
          <>
            <div className="w-[2px] h-12 bg-gradient-to-t from-sigmo-green to-transparent rounded-full group-hover:h-16 transition-all duration-300"></div>
            <span className="vertical-text text-[10px] tracking-[0.25em] font-bold text-sigmo-green uppercase select-none group-hover:text-emerald-600 transition-colors duration-300">
              Go Top
            </span>
          </>
        ) : (
          <>
            <span className="vertical-text text-[10px] tracking-[0.25em] font-semibold text-gray-500 uppercase select-none">
              Scroll
            </span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-sigmo-green to-transparent rounded-full"></div>
          </>
        )}
      </button>
    </aside>
  );
};
