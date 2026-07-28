import React, { useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when the overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Wait for the transition to finish or start
    }
  }, [isOpen]);

  // Close overlay on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-y-0 left-16 md:left-20 right-0 z-50 bg-[#071f11]/95 backdrop-blur-md flex flex-col justify-center items-center px-8 md:px-16 transition-all duration-500 ease-in-out transform overflow-hidden ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* Top Right Close Button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={onClose}
          className="text-white/80 hover:text-sigmo-green transition-colors duration-300 focus:outline-none"
          aria-label="Close search"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Centered Search Bar */}
      <div className="w-full max-w-4xl relative flex items-center py-3 md:py-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="What are you looking for?"
          className="w-full bg-transparent text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-wide focus:outline-none placeholder-white/40 pr-16 font-rajdhani"
        />
        
        {/* Large Search Submit Button */}
        <button
          className="absolute right-0 text-white/60 hover:text-sigmo-green transition-colors duration-300 focus:outline-none"
          aria-label="Submit search"
        >
          <Search className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>
    </div>
  );
};
