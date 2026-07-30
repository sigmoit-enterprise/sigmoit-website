import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database } from "lucide-react";
import { Footer } from "../components/Footer";

const getGearPath = (
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  teeth: number,
  phaseOffset = 0,
) => {
  const points: string[] = [];
  const steps = teeth * 8;
  const toothAngle = (2 * Math.PI) / teeth;

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const toothPhase =
      ((((angle + phaseOffset) % toothAngle) + toothAngle) % toothAngle) /
      toothAngle;
    let r = rIn;
    if (toothPhase > 0.25 && toothPhase <= 0.35) {
      r = rIn + ((toothPhase - 0.25) / 0.1) * (rOut - rIn);
    } else if (toothPhase > 0.35 && toothPhase <= 0.75) {
      r = rOut;
    } else if (toothPhase > 0.75 && toothPhase <= 0.85) {
      r = rOut - ((toothPhase - 0.75) / 0.1) * (rOut - rIn);
    }

    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) {
      points.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
    } else {
      points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  }
  points.push("Z");
  return points.join(" ");
};

const BIG_GEAR_PATH = getGearPath(350, 200, 90, 110, 12, 0.15);
const SMALL_GEAR_PATH = getGearPath(505, 135, 60, 76, 8, 0.4);
const CENTER_LINE_PATH =
  "M 50 200 L 350 200 C 420 200, 435 135, 505 135 L 850 135";

interface Service {
  title: string;
  description: string;
  isSpecial?: boolean;
}

const SERVICES: Service[] = [
  {
    title: "Web Design\n& UX",
    description: "Creating lasting impressions through crafted experiences",
  },
  {
    title: "Software\nDevelopment",
    description:
      "Empowering businesses through innovative software development",
    isSpecial: true, // Special highlighted red styling by default
  },
  {
    title: "Mobile App\nDevelopment",
    description: "From native to cross-platform: integration made seamless",
  },
  {
    title: "Web App\nDevelopment",
    description: "Rich in User Experience, Rock-Solid in performance",
  },
  {
    title: "Artifical\nIntelligence",
    description:
      "We harness the power of AI to transform your business processes and decision-making",
    isSpecial: true, // Special highlighted red styling by default
  },
  {
    title: "Digital\nMarketing",
    description: "We redefine what it means to market your business online",
    isSpecial: true, // Special highlighted red styling by default
  },
  {
    title: "Search Engine\nOptimization",
    description:
      "To drive organic visitors from the web that want to buy from you",
  },
  {
    title: "Web\nHosting",
    description:
      "We provide reliable and secure web hosting solutions to keep your online presence up and running smoothly.",
  },
];

export const ServicesPage: React.FC = () => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null,
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Scroll to top when page is mounted
    window.scrollTo(0, 0);

    // Find the main scroll container from App.tsx layout
    const mainEl = document.querySelector("main");
    if (mainEl) {
      setScrollContainer(mainEl);
      mainEl.scrollTo({ top: 0 });
    }

    // Responsive check for parallax effect
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Framer Motion Scroll tracking hooked to the main container
  const { scrollY } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined,
  });

  // Parallax translation transforms for the three columns
  // y values start staggered and resolve to 0 as we scroll down to the grid section (around 600-800px scroll)
  const yCol1 = useTransform(scrollY, [0, 800], [80, 0], { clamp: true });
  const yCol2 = useTransform(scrollY, [0, 800], [200, 0], { clamp: true });
  const yCol3 = useTransform(scrollY, [0, 800], [320, 0], { clamp: true });

  const renderCard = (service: Service, index: number) => {
    return (
      <div
        key={index}
        className="relative bg-white pt-20 pb-10 px-8 border border-gray-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out flex flex-col justify-between group overflow-hidden min-h-[310px]"
      >
        {/* Top-left corner icon box */}
        <div
          className={`absolute top-0 left-0 w-16 h-16 flex items-center justify-center transition-all duration-500 ${
            service.isSpecial
              ? "bg-[#24a556] text-white shadow-md"
              : "bg-[#e1ede5] text-[#24a556] group-hover:bg-[#24a556] group-hover:text-white group-hover:shadow-md"
          }`}
        >
          <Database className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Card Body */}
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-sans font-bold text-2xl text-[#0b3d1f] tracking-tight leading-tight mb-4 whitespace-pre-line select-text">
              {service.title}
            </h3>
            <p className="text-[14px] text-gray-500 font-light leading-relaxed select-text pr-2">
              {service.description}
            </p>
          </div>

          {/* More link indicator */}
          <div className="mt-8 flex items-center gap-2 group/more">
            <span className="text-[11px] font-extrabold tracking-widest text-[#0b3d1f] transition-colors duration-300 group-hover:text-[#24a556] uppercase select-none">
              MORE
            </span>
            <div className="w-8 h-[1px] bg-[#0b3d1f] transition-all duration-300 group-hover:w-12 group-hover:bg-[#24a556]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#eaf3ed] flex flex-col">
      {/* 1. Hero Section (Deep Brand Dark Green) */}
      <section className="w-full h-screen bg-[#082813] relative flex flex-col justify-center items-center overflow-hidden shrink-0 select-none">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-radial-[circle_80%_at_50%_40%] from-[#24a556]/15 to-transparent pointer-events-none" />

        {/* Gears Illustration (Animated SVG Line Art) */}
        <div className="relative z-10 w-[90%] max-w-[700px] flex items-center justify-center p-4">
          <svg
            viewBox="0 0 900 380"
            className="w-full h-auto text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] pointer-events-none select-none"
          >
            {/* Center flowing line */}
            <motion.path
              d={CENTER_LINE_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            {/* Big Gear */}
            <motion.path
              d={BIG_GEAR_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.4 }}
            />
            {/* Small Gear */}
            <motion.path
              d={SMALL_GEAR_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.8 }}
            />
          </svg>
        </div>

        {/* Services Page Title */}
        <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-10 text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-bold text-white tracking-tight uppercase leading-none select-text">
            Services
          </h1>
        </div>
      </section>

      {/* 2. IT services grid section */}
      <section className="w-full bg-[#eaf3ed] pt-20 pb-28 px-6 md:px-12 flex-1 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-[#0b3d1f] tracking-tight select-text leading-tight">
              IT services offered by SigmoIT
            </h2>
          </div>

          {/* Cards Grid */}
          {isDesktop ? (
            // 3-Column layout with Parallax Transforms
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1: Cards 1 and 4 */}
              <motion.div style={{ y: yCol1 }} className="flex flex-col gap-8">
                {renderCard(SERVICES[0], 0)}
                {renderCard(SERVICES[3], 3)}
              </motion.div>

              {/* Column 2: Cards 2 and 5 */}
              <motion.div style={{ y: yCol2 }} className="flex flex-col gap-8">
                {renderCard(SERVICES[1], 1)}
                {renderCard(SERVICES[4], 4)}
              </motion.div>

              {/* Column 3: Cards 3 and 6 */}
              <motion.div style={{ y: yCol3 }} className="flex flex-col gap-8">
                {renderCard(SERVICES[2], 2)}
                {renderCard(SERVICES[5], 5)}
              </motion.div>
            </div>
          ) : (
            // Mobile/Tablet standard 1 or 2 Column responsive layout with scroll reveal
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  {renderCard(service, index)}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
