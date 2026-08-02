import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";

/**
 * Soft 404. The route registry marks unknown paths noindex, so this page won't
 * be indexed — but it still offers crawlable links back into the site so link
 * equity from any stale inbound URL isn't stranded.
 */
const SUGGESTIONS = [
  { label: "Services", to: "/services", hint: "What we build" },
  { label: "Portfolio", to: "/works", hint: "Selected projects" },
  { label: "Blog", to: "/blog", hint: "Guides and pricing" },
  { label: "Contact", to: "/contact", hint: "Start a project" },
];

export const NotFoundPage: React.FC = () => (
  <div className="flex w-full min-h-screen flex-col">
    <section className="flex flex-1 flex-col items-center justify-center bg-[#f0f4f1] px-6 py-32 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-[#24a556]">
        Error 404
      </p>
      <h1 className="mt-4 font-sans text-4xl md:text-6xl font-bold tracking-tight text-[#0b3d1f]">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-[#1b1f22]/70">
        The page you're looking for doesn't exist or has moved. Here's where
        most people are heading:
      </p>

      <nav
        aria-label="Suggested pages"
        className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {SUGGESTIONS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-2xl bg-white px-6 py-5 text-left shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] transition-all duration-300 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
          >
            <span className="flex items-center justify-between font-sans text-lg font-bold tracking-tight text-[#0b3d1f] transition-colors duration-300 group-hover:text-[#24a556]">
              {item.label}
              <ArrowRight
                className="h-4 w-4 text-[#24a556] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            <span className="mt-1 block text-sm text-[#1b1f22]/60">
              {item.hint}
            </span>
          </Link>
        ))}
      </nav>

      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#24a556] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:gap-3 hover:bg-[#1f9049]"
      >
        Back to homepage <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>

    <Footer />
  </div>
);

export default NotFoundPage;
