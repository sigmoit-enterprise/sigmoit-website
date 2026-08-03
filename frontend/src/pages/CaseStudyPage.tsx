import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "../components/Footer";
import { getCaseStudy, relatedCaseStudies } from "../data/caseStudies";

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, [slug]);

  if (!study) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-[#f0f4f1]">
        <h1 className="font-sans text-4xl md:text-5xl font-bold text-[#0b3d1f]">
          Project not found
        </h1>
        <p className="max-w-md text-center text-sm text-sigmo-dark/70">
          This case study doesn&apos;t exist or may have moved. Browse the full
          portfolio instead.
        </p>
        <Link
          to="/works"
          className="inline-flex items-center gap-2 rounded-lg bg-sigmo-green px-6 py-3 text-sm font-bold text-white"
        >
          View portfolio <ArrowRight className="h-4 w-4" />
        </Link>
        <Footer />
      </div>
    );
  }

  const related = relatedCaseStudies(study);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f0f4f1]">
      {/* Hero */}
      <section
        className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-hidden shrink-0 px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-sigmo-green/25 blur-[100px]" />
          <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-white/5 blur-[110px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-270 mx-auto pb-16 md:pb-24 pt-32"
        >
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-light tracking-[0.2em] uppercase text-white/50 mb-6"
          >
            <Link to="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link to="/works" className="hover:text-white/80 transition-colors">
              Portfolio
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">{study.name}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#86efac]">
            {study.category} · {study.year}
          </p>
          <h1 className="mt-4 font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
            {study.name}
          </h1>
          <p className="mt-6 max-w-xl text-white/70 text-sm md:text-base font-light leading-relaxed">
            {study.description}
          </p>
        </motion.div>
      </section>

      {/* Project image */}
      <section className="w-full bg-[#f0f4f1] px-6">
        <div className="mx-auto w-full max-w-270 -mt-10 md:-mt-16 relative z-10">
          <img
            src={study.image}
            alt={`${study.name} — ${study.category} project built by SigmoIT`}
            width={1080}
            height={608}
            className="w-full rounded-[28px] object-cover aspect-video shadow-[0_24px_64px_-16px_rgba(11,61,31,0.35)]"
          />
        </div>
      </section>

      {/* Overview */}
      <section className="w-full bg-[#f0f4f1] px-6 py-20 md:py-28">
        <div className="mx-auto w-full max-w-270">
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-[#0b3d1f]">
            Project Overview
          </h2>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {study.overview.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm md:text-base leading-relaxed text-sigmo-dark/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <aside
              aria-label={`${study.name} project facts`}
              className="h-fit rounded-3xl border border-white/60 bg-white/60 p-7 backdrop-blur-xl"
            >
              <h3 className="font-sans text-lg font-bold text-[#0b3d1f]">
                At a glance
              </h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-sigmo-green">
                    Client
                  </dt>
                  <dd className="mt-1 text-sigmo-dark/75">{study.client}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-sigmo-green">
                    Services
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-sigmo-green/25 bg-sigmo-green/10 px-2.5 py-1 text-xs text-[#0b3d1f]"
                      >
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-sigmo-green">
                    Tech stack
                  </dt>
                  <dd className="mt-1 text-sigmo-dark/75">
                    {study.tech.join(", ")}
                  </dd>
                </div>
                {study.liveUrl ? (
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-sigmo-green">
                      Live link
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#0b3d1f] underline decoration-sigmo-green/40 underline-offset-4 transition-colors hover:text-sigmo-green"
                      >
                        <span>{study.liveUrlLabel ?? "Visit live site"}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-white border-y border-gray-100 px-6 py-20 md:py-28">
        <div className="mx-auto w-full max-w-270">
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-[#0b3d1f]">
            What we delivered
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-[24px] border border-gray-100 bg-[#f0f4f1] p-7 shadow-[0_8px_32px_-8px_rgba(11,61,31,0.10)]"
              >
                <CheckCircle2
                  className="h-6 w-6 text-[#24a556]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-sans text-lg font-bold text-[#0b3d1f]">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1b1f22]/70">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 rounded-[24px] bg-[#0a3f1f] px-6 py-10 md:px-10">
            {study.results.map((result) => (
              <div key={result.label} className="text-center">
                <p className="font-sans text-2xl md:text-4xl font-bold text-[#86efac]">
                  {result.value}
                </p>
                <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.15em] text-white/60">
                  {result.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#f0f4f1] px-6 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1080px] text-center">
          <h2 className="font-sans text-2xl md:text-4xl font-bold tracking-tight text-[#0b3d1f]">
            Want a result like this?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm md:text-base text-[#1b1f22]/70">
            Tell us about your project and we&apos;ll send you a clear scope,
            timeline and cost.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#24a556] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#24a556]/25 transition-all duration-300 hover:bg-emerald-600"
          >
            <span>Start your project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Related projects */}
      <section className="w-full bg-[#f0f4f1] px-6 pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1080px]">
          <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[#0b3d1f]">
            More projects
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={item.path}
                className="group relative block overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] transition-all duration-500 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.category}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#24a556]">
                    {item.category}
                  </p>
                  <h3 className="mt-1.5 font-sans text-base font-bold text-[#0b3d1f]">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;
