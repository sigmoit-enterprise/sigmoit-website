import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectCard {
  src: string;
  /** Describes the screenshot itself, not just the project name. */
  alt: string;
  title: string;
  category: string;
  description: string;
  /** Destination of the card — a real case-study page per project. */
  to: string;
}

/**
 * Each tile links to its own case-study page (see src/data/caseStudies.ts),
 * so the homepage passes link equity to pages that rank for project names
 * instead of self-linking to /works.
 */
const PROJECTS: ProjectCard[] = [
  {
    src: '/project-images/ecommerce.png',
    alt: 'E-commerce storefront with product catalogue and checkout, built by SigmoIT',
    title: 'A complete online storefront',
    category: 'E-Commerce',
    description:
      'A full-featured commerce platform with product catalogues, cart and checkout flows, secure payment integration, and an admin dashboard for managing inventory and orders.',
    to: '/works/svlc-law-firm',
  },
  {
    src: '/project-images/fooddelivary.png',
    alt: 'Food delivery app screen showing live order tracking, developed by SigmoIT',
    title: 'Order tracking from kitchen to door',
    category: 'Food Delivery',
    description:
      'A food delivery experience covering restaurant listings, live order tracking, and a streamlined checkout, built to stay fast and responsive on mobile networks.',
    to: '/works/next-stop-nepal',
  },
  {
    src: '/project-images/my-personal-tutors.png',
    alt: 'Tutoring marketplace matching students with instructors, built by SigmoIT',
    title: 'Connecting students with tutors',
    category: 'EdTech',
    description:
      'A tutoring marketplace that matches students to instructors, with profile discovery, scheduling, and session management built around a clean and approachable interface.',
    to: '/works/tutor-connect',
  },
  {
    src: '/project-images/Rising%20Diamond.jpg',
    alt: 'Rising Diamond corporate website homepage designed by SigmoIT',
    title: 'A polished brand presence',
    category: 'Corporate Website',
    description:
      'A corporate web presence designed to communicate credibility, with a considered visual identity, clear service positioning, and content structured for search visibility.',
    to: '/works/rising-diamond',
  },
  {
    src: '/project-images/terminalwebsite.png',
    alt: 'Terminal-inspired web application interface engineered by SigmoIT',
    title: 'A developer-first interface',
    category: 'Web Application',
    description:
      'A terminal-inspired web interface that turns a technical product into something tactile and memorable, pairing an unconventional aesthetic with genuine usability.',
    to: '/works/terminal-ui',
  },
];

export const WorksSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const syncArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener('resize', syncArrows);
    return () => window.removeEventListener('resize', syncArrows);
  }, [syncArrows]);

  const scrollBy = (direction: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="w-full bg-white border-t border-gray-100 py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2
          id="portfolio-heading"
          className="font-rajdhani font-bold leading-[1.05]"
        >
          <span className="block text-3xl md:text-5xl font-normal text-gray-600">
            Selected Work, Built
          </span>
          <span className="block text-4xl md:text-6xl text-sigmo-green">For Real Businesses</span>
        </h2>
        <p className="mt-6 max-w-xl text-gray-500 font-light text-sm md:text-base leading-relaxed">
          A look at some of the products and platforms we have designed, engineered, and shipped.
        </p>
      </div>

      <div
        ref={scrollRef}
        onScroll={syncArrows}
        className="flex gap-6 overflow-x-auto scroll-smooth py-10 px-6 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="shrink-0 w-0 md:w-[max(0px,calc((100vw-80rem)/2))]" aria-hidden="true" />
        {PROJECTS.map((card) => (
          <Link
            key={card.src}
            to={card.to}
            className="group relative shrink-0 w-64 md:w-80 h-80 md:h-[28rem] rounded-3xl overflow-hidden bg-gray-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sigmo-green block"
          >
            <img
              src={card.src}
              alt={card.alt}
              width={640}
              height={896}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay and text */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 md:p-8 z-10">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <p className="text-xs font-bold tracking-widest uppercase text-sigmo-green">{card.category}</p>
                <h3 className="mt-2 font-rajdhani text-xl md:text-2xl font-bold text-white leading-snug">
                  {card.title}
                </h3>
                <p className="mt-3 text-xs text-white/80 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40 hover:bg-sigmo-green hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40 hover:bg-sigmo-green hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Keeps a crawlable, descriptive path from the homepage to /works. */}
        <Link
          to="/works"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sigmo-dark hover:text-sigmo-green transition-colors duration-300"
        >
          <span>See our full portfolio</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
};

export default WorksSection;
