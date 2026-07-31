import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Search, ArrowUpRight } from 'lucide-react';
import { searchSite } from '../data/searchIndex';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

const QUICK_LINKS = ['Services', 'Portfolio', 'Contact', 'Careers'];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchSite(query), [query]);

  // Auto-focus input when the overlay opens, reset state when it closes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
    setQuery('');
    setActiveIndex(0);
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = (href: string) => {
    onNavigate(href);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) go(target.href);
    }
  };

  // Close overlay on Escape key press
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
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
      <div className="w-full max-w-4xl relative flex items-center py-3 md:py-5 border-b border-white/10">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What are you looking for?"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
          className="w-full bg-transparent text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-wide focus:outline-none placeholder-white/40 pr-16 font-rajdhani"
        />

        {/* Large Search Submit Button */}
        <button
          onClick={() => results[activeIndex] && go(results[activeIndex].href)}
          className="absolute right-0 text-white/60 hover:text-sigmo-green transition-colors duration-300 focus:outline-none"
          aria-label="Submit search"
        >
          <Search className="w-8 h-8 md:w-10 md:h-10" />
        </button>
      </div>

      {/* Results */}
      <div className="w-full max-w-4xl mt-6 h-[45vh] overflow-y-auto">
        {!query.trim() ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">
              Try
            </span>
            {QUICK_LINKS.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:text-sigmo-green hover:border-sigmo-green transition-colors duration-300 focus:outline-none"
              >
                {term}
              </button>
            ))}
          </div>
        ) : results.length === 0 ? (
          <p className="text-white/50 font-light text-base md:text-lg">
            No results for “{query}”. Try “services”, “portfolio” or “contact”.
          </p>
        ) : (
          <ul id="search-results" role="listbox" className="flex flex-col">
            {results.map((entry, index) => (
              <li key={entry.id}>
                <button
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => go(entry.href)}
                  className={`group w-full text-left px-4 py-4 rounded-xl flex items-start gap-4 transition-colors duration-200 focus:outline-none ${
                    index === activeIndex ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-sigmo-green">
                        {entry.category}
                      </span>
                    </div>
                    <h4 className="mt-1 text-lg md:text-xl font-rajdhani font-semibold text-white truncate">
                      {entry.title}
                    </h4>
                    <p className="mt-1 text-sm text-white/50 font-light line-clamp-2">
                      {entry.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 shrink-0 mt-1 text-sigmo-green transition-opacity duration-200 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
