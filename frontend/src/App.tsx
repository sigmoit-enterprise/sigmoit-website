import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { HeroSlider } from "./components/HeroSlider";
import { HeroContent } from "./components/HeroContent";
import { SearchOverlay } from "./components/SearchOverlay";
import { StatsAndOrganizations } from "./components/StatsAndOrganizations";
import { ToolsAndTechnologies } from "./components/ToolsAndTechnologies";
import { ServicesSection } from "./components/ServicesSection";
import { TalentSection } from "./components/TalentSection";
import { ContactActions } from "./components/ContactActions";
import { RequirementSection } from "./components/RequirementSection";
import { WorksSection } from "./components/WorksSection";
import { TextHoverEffect } from "./components/TextHoverEffect";
import { Footer } from "./components/Footer";
import { WorksPage } from "./pages/WorksPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface SlideData {
  id: number;
  image: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/slide1.png",
    titlePrefix: "Top",
    titleHighlight: "IT Company",
    titleSuffix: "in Nepal for digital marketing",
    description:
      "We partner with you to tell your story online, crafting digital marketing that feels human, builds trust and creates meaningful connections that last.",
  },
  {
    id: 2,
    image: "/slide2.png",
    titlePrefix: "Custom",
    titleHighlight: "Software Dev",
    titleSuffix: "tailored for scale and success",
    description:
      "We engineer secure web systems, enterprise architectures, and robust mobile applications that streamline operations and deliver excellent experiences.",
  },
  {
    id: 3,
    image: "/slide3.png",
    titlePrefix: "Reliable",
    titleHighlight: "Cloud & DevOps",
    titleSuffix: "keeping systems fast and online",
    description:
      "Empower your infrastructure with automated deployment pipelines, 24/7 server monitoring, and advanced security configurations designed for uptime.",
  },
];

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/works" },
  { label: "Contact", href: "/contact" },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length,
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 200);
  };

  const handleScrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith("/#") || href === "/") {
      const hash = href.split("#")[1];
      if (location.pathname !== "/") {
        navigate("/");
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 150);
        } else {
          mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
      mainRef.current?.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white text-sigmo-dark overflow-hidden font-sans relative">
      {/* Brand Sidebar (Left) */}
      <Sidebar
        onSearchClick={() => setSearchOpen((prev) => !prev)}
        isScrolled={isScrolled}
        onScrollToTop={handleScrollToTop}
      />

      {/* Viewport-Fixed Hamburger Menu Button (Top Right) */}
      <div className="fixed top-8 right-8 z-45">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full bg-sigmo-dark text-white hover:bg-sigmo-green hover:text-white flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Hamburger Navigation Overlay Drawer */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-42 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {MENU_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => handleNavLinkClick(e, link.href)}
              className="group flex items-center gap-2 text-2xl md:text-4xl font-rajdhani font-semibold tracking-wider text-gray-600 hover:text-sigmo-dark transition-colors duration-300"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-6 h-6 text-sigmo-green opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
            </a>
          ))}
        </nav>
        <div className="absolute bottom-12 text-center text-xs text-gray-400 font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} SigmoIT. All Rights Reserved.
        </div>
      </div>

      {/* Search Drawer Overlay (Slides out from left to right behind sidebar) */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Scroll Container */}
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 h-screen overflow-y-auto scroll-smooth relative"
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section Grid */}
                <div className="w-full flex flex-col lg:flex-row h-auto lg:h-screen border-b border-gray-200 shrink-0">
                  {/* Left Side: Dynamic Carousel (Images, Controls, Count) */}
                  <section className="w-full lg:w-1/2 h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
                    <HeroSlider
                      slides={SLIDES.map((s) => ({ id: s.id, image: s.image }))}
                      currentIndex={currentIndex}
                      onNext={handleNext}
                      onPrev={handlePrev}
                    />
                  </section>

                  {/* Right Side: Core Brand Copy, Navigation, Call to Actions */}
                  <section className="w-full lg:w-1/2 h-auto lg:h-full">
                    <HeroContent slides={SLIDES} currentIndex={currentIndex} />
                  </section>
                </div>

                {/* Statistics and Clients Section */}
                <StatsAndOrganizations />

                {/* Tools and Technologies Marquee Section */}
                <ToolsAndTechnologies />

                {/* Services Showcase Section */}
                <ServicesSection />

                {/* Interactive Brand Wordmark Section */}
                <section className="relative w-full bg-white border-t border-gray-100 h-[24rem] md:h-[32rem] flex items-center justify-center overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                      background:
                        "radial-gradient(ellipse 75% 100% at 50% 100%, rgba(36,165,86,0.28) 0%, rgba(36,165,86,0.08) 45%, transparent 75%)",
                    }}
                  />
                  <div className="relative z-10 w-full h-full">
                    <TextHoverEffect text="SIGMOIT" />
                  </div>
                </section>

                {/* Selected Works Carousel Section */}
                <WorksSection />

                {/* Requirement CTA Section */}
                <RequirementSection />

                {/* Product Build CTA Section */}
                <TalentSection />

                {/* WhatsApp / Call Action Section */}
                <ContactActions />

                {/* Corporate Footer Section */}
                <Footer />
              </>
            }
          />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
