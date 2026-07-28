import React, { useEffect } from 'react';
import { ContainerScroll } from '../components/ui/ContainerScroll';
import { Footer } from '../components/Footer';

interface Project {
  src: string;
  title: string;
  category: string;
  description: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    src: '/project-images/ecommerce.png',
    title: 'A complete online storefront',
    category: 'E-Commerce',
    description:
      'A full-featured commerce platform with product catalogues, cart and checkout flows, secure payment integration, and an admin dashboard for managing inventory and orders.',
    link: 'https://example.com/ecommerce',
  },
  {
    src: '/project-images/fooddelivary.png',
    title: 'Order tracking from kitchen to door',
    category: 'Food Delivery',
    description:
      'A food delivery experience covering restaurant listings, live order tracking, and a streamlined checkout, built to stay fast and responsive on mobile networks.',
    link: 'https://example.com/food-delivery',
  },
  {
    src: '/project-images/my-personal-tutors.png',
    title: 'Connecting students with tutors',
    category: 'EdTech',
    description:
      'A tutoring marketplace that matches students to instructors, with profile discovery, scheduling, and session management built around a clean and approachable interface.',
    link: 'https://example.com/tutors',
  },
  {
    src: '/project-images/Rising%20Diamond.jpg',
    title: 'A polished brand presence',
    category: 'Corporate Website',
    description:
      'A corporate web presence designed to communicate credibility, with a considered visual identity, clear service positioning, and content structured for search visibility.',
    link: 'https://example.com/rising-diamond',
  },
  {
    src: '/project-images/terminalwebsite.png',
    title: 'A developer-first interface',
    category: 'Web Application',
    description:
      'A terminal-inspired web interface that turns a technical product into something tactile and memorable, pairing an unconventional aesthetic with genuine usability.',
    link: 'https://example.com/terminal',
  },
];

export const WorksPage: React.FC = () => {
  // Reset scroll position to top when entering page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Works Page Header */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 border-b border-gray-100 bg-sigmo-light/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <h1 className="font-rajdhani font-bold leading-[1.05]">
            <span className="block text-4xl sm:text-5xl md:text-7xl font-normal text-gray-400">
              Our Crafted
            </span>
            <span className="block text-5xl sm:text-6xl md:text-8xl text-sigmo-green">
              Solutions & Works
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-500 font-light text-sm sm:text-base md:text-lg leading-relaxed text-center">
            Explore our curated projects showing how we help businesses grow through custom designs,
            scalable software engineering, and high-performance user interfaces.
          </p>
        </div>
      </section>

      {/* iPad 3D Showcase List (Overlapping Cascade Layout) */}
      <div className="w-full relative pb-32">
        {PROJECTS.map((project, idx) => (
          <ContainerScroll
            key={idx}
            imgSrc={project.src}
            imgAlt={project.title}
            link={project.link}
            index={idx} // Pass index to calculate overlapping margin and ascending zIndex
            titleComponent={
              <h2 className="font-rajdhani text-2xl sm:text-3xl md:text-4xl font-bold text-sigmo-dark tracking-wide leading-tight">
                {project.title}
              </h2>
            }
          />
        ))}
      </div>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default WorksPage;
