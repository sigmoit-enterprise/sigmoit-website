import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Footer } from "../components/Footer";
import { BLOG_POSTS, BLOG_CATEGORIES, postPath } from "../blog";
import { readingTime } from "../blog/types";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const BlogPage: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, []);

  const posts = useMemo(
    () =>
      category
        ? BLOG_POSTS.filter((post) => post.category === category)
        : BLOG_POSTS,
    [category],
  );

  const [featured, ...rest] = posts;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero */}
      <section
        className="relative w-full min-h-screen flex flex-col overflow-hidden shrink-0 px-6 select-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #157a3c 0%, #0f5c2d 28%, #0a3f1f 55%, #06280f 78%, #021106 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#24a556]/25 blur-[100px]" />
          <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-white/5 blur-[110px]" />
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/line-art/blogs.png"
            alt=""
            aria-hidden="true"
            className="w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] object-contain brightness-0 invert"
          />
        </div>

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
            <span className="text-white/30" aria-hidden="true">
              /
            </span>
            <span className="text-white/80">Blog</span>
          </nav>

          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
            Blog
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/70">
            Practical guides on web development, SEO, e-commerce and software
            costs in Nepal — written for business owners, not for other
            developers.
          </p>
        </motion.div>
      </section>

      {/* Listing */}
      <section className="w-full bg-[#f0f4f1] px-6 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Category filter */}
          <div className="mb-12 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category === null}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                category === null
                  ? "border-[#24a556] bg-[#24a556] text-white"
                  : "border-[#0b3d1f]/15 text-[#0b3d1f]/70 hover:border-[#24a556] hover:text-[#24a556]"
              }`}
            >
              All
            </button>
            {BLOG_CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={category === name}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  category === name
                    ? "border-[#24a556] bg-[#24a556] text-white"
                    : "border-[#0b3d1f]/15 text-[#0b3d1f]/70 hover:border-[#24a556] hover:text-[#24a556]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-14 overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)]"
            >
              <Link
                to={postPath(featured.slug)}
                className="group grid grid-cols-1 md:grid-cols-2"
              >
                <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-[#e1ede5]">
                  <img
                    src={featured.image ?? "/logo.png"}
                    alt={featured.imageAlt ?? featured.title}
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#24a556]">
                    <span>{featured.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#24a556]/50" />
                    <time dateTime={featured.datePublished}>
                      {formatDate(featured.datePublished)}
                    </time>
                  </div>
                  <h2 className="mt-3 font-sans text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[#0b3d1f] transition-colors duration-300 group-hover:text-[#24a556]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-[#1b1f22]/70">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-xs font-medium text-[#1b1f22]/50">
                    <span>{featured.author}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {readingTime(featured)} min read
                    </span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#24a556] transition-all duration-300 group-hover:gap-3">
                    Read article{" "}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Remaining posts */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {rest.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] transition-all duration-500 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
              >
                <Link to={postPath(post.slug)} className="block h-full">
                  <div className="aspect-[4/3] overflow-hidden bg-[#e1ede5]">
                    <img
                      src={post.image ?? "/logo.png"}
                      alt={post.imageAlt ?? post.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#24a556]">
                      <span>{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#24a556]/50" />
                      <time dateTime={post.datePublished}>
                        {formatDate(post.datePublished)}
                      </time>
                    </div>
                    <h2 className="mt-2 font-sans text-xl font-bold leading-snug tracking-tight text-[#0b3d1f] transition-colors duration-300 group-hover:text-[#24a556]">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#1b1f22]/70">
                      {post.description}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs font-medium text-[#1b1f22]/50">
                      <span>{post.author}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {readingTime(post)} min
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-[24px] bg-[#082813] px-8 py-14 text-center md:px-16">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base leading-relaxed text-white/70">
              Tell us what you're trying to build and we'll scope it — a fixed
              price, a realistic timeline, and an honest note on anything we
              think you shouldn't pay for yet.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#24a556] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:gap-3 hover:bg-[#1f9049]"
            >
              Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
