import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { CASE_STUDIES } from "../data/caseStudies";

const PROJECTS = CASE_STUDIES.map((study) => ({
  image: study.image,
  title: study.name,
  category: study.category,
  description: study.description,
  link: study.liveUrl ?? study.path,
}));

export const WorksPage: React.FC = () => {
  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section with Line Art */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden shrink-0 px-6 select-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-sigmo-green/25 blur-[100px]" />
          <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-white/5 blur-[110px]" />
        </div>

        {/* Line Art Centered */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/line-art/works (2).png"
            alt=""
            className="w-md h-112 md:w-160 md:h-160 object-contain brightness-0 invert"
          />
        </div>

        {/* Works Title at Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 pb-16 md:pb-20"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-light tracking-[0.2em] uppercase text-white/50 mb-3"
          >
            <Link to="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Works</span>
          </nav>

          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
            Works
          </h1>
        </motion.div>
      </section>

      {/* Craftsmanship Section */}
      <section className="w-full bg-[#f0f4f1] px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-300">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-sans text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] sm:text-4xl md:text-[2.75rem] mb-16 md:mb-20"
          >
            Craftsmanship in every project
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {PROJECTS.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_self"
                rel="noreferrer"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative block overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] transition-all duration-500 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sigmo-green">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-sans text-xl font-bold tracking-tight text-[#0b3d1f] group-hover:text-sigmo-green transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sigmo-dark/70">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sigmo-green group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorksPage;
