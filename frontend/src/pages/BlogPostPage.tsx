import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Footer } from "../components/Footer";
import { getPost, relatedPosts, postPath } from "../blog";
import { readingTime, headingId } from "../blog/types";
import type { Block } from "../blog/types";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * Renders a content block as real semantic HTML. Heading levels are fixed by
 * the block type rather than chosen for looks, which keeps the h1→h2→h3
 * hierarchy intact for crawlers and screen readers alike.
 */
const BlockRenderer: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-base md:text-[17px] leading-[1.8] text-[#1b1f22]/80">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          id={block.id ?? headingId(block.text)}
          className="mt-14 scroll-mt-24 font-sans text-2xl md:text-[2rem] font-bold leading-tight tracking-tight text-[#0b3d1f]"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          id={block.id ?? headingId(block.text)}
          className="mt-10 scroll-mt-24 font-sans text-lg md:text-xl font-bold tracking-tight text-[#0b3d1f]"
        >
          {block.text}
        </h3>
      );

    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 text-base leading-[1.75] text-[#1b1f22]/80"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-[#24a556]"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-9 text-base leading-[1.75] text-[#1b1f22]/80"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.15em] flex h-6 w-6 items-center justify-center rounded-full bg-[#e1ede5] text-[11px] font-bold text-[#24a556]"
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="mt-10 border-l-[3px] border-[#24a556] bg-[#f4faf6] py-6 pl-6 pr-6 rounded-r-2xl">
          <p className="font-sans text-lg md:text-xl font-medium italic leading-relaxed text-[#0b3d1f]">
            {block.text}
          </p>
          {block.cite && (
            <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-widest text-[#1b1f22]/50">
              {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="mt-10 rounded-2xl border border-[#24a556]/25 bg-[#f4faf6] p-6 md:p-7">
          <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#24a556]">
            {block.title}
          </p>
          <p className="mt-3 text-base leading-[1.75] text-[#1b1f22]/80">
            {block.text}
          </p>
        </aside>
      );

    case "table":
      return (
        <figure className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            {block.caption && (
              <caption className="mb-3 text-left text-xs font-semibold uppercase tracking-widest text-[#1b1f22]/50">
                {block.caption}
              </caption>
            )}
            <thead>
              <tr className="border-b-2 border-[#24a556]/30">
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-wider text-[#0b3d1f]"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#0b3d1f]/8 last:border-0 even:bg-[#f4faf6]/60"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 leading-relaxed text-[#1b1f22]/80 ${
                        j === 0 ? "font-semibold text-[#0b3d1f]" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );

    default:
      return null;
  }
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return (
      <div className="flex w-full min-h-screen flex-col">
        <section className="flex flex-1 flex-col items-center justify-center bg-[#f0f4f1] px-6 py-32 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#24a556]">
            404
          </p>
          <h1 className="mt-4 font-sans text-3xl md:text-5xl font-bold tracking-tight text-[#0b3d1f]">
            Article not found
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#1b1f22]/70">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#24a556] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:gap-3 hover:bg-[#1f9049]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to blog
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const related = relatedPosts(post);
  const tableOfContents = post.body.filter(
    (block): block is Extract<Block, { type: "h2" }> => block.type === "h2",
  );

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Article header */}
      <header
        className="relative w-full min-h-screen overflow-hidden px-6 py-28 md:py-36"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 50% 30%, #157a3c 0%, #0f5c2d 30%, #0a3f1f 58%, #06280f 80%, #021106 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#24a556]/25 blur-[100px]" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-[110px]" />
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-14rem)] items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full px-6 md:px-12 lg:px-16"
          >
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-xs font-light uppercase tracking-[0.2em] text-white/50"
            >
              <Link to="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
              <span className="text-white/30" aria-hidden="true">
                /
              </span>
              <Link
                to="/blog"
                className="hover:text-white/80 transition-colors"
              >
                Blog
              </Link>
              <span className="text-white/30" aria-hidden="true">
                /
              </span>
              <span className="text-white/80">{post.category}</span>
            </nav>

            <h1 className="max-w-5xl font-sans text-3xl sm:text-4xl md:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white">
              {post.title}
            </h1>

            <p className="mt-6 max-w-4xl text-base md:text-lg font-light leading-relaxed text-white/70">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-white/50">
              <span className="text-white/80">{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={post.datePublished}>
                  {formatDate(post.datePublished)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {readingTime(post)} min read
              </span>
              {post.dateModified &&
                post.dateModified !== post.datePublished && (
                  <span>Updated {formatDate(post.dateModified)}</span>
                )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article body */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <article className="mx-auto w-full max-w-6xl">
          {/* Table of contents */}
          {tableOfContents.length > 2 && (
            <nav
              aria-label="Table of contents"
              className="mb-12 rounded-2xl border border-[#0b3d1f]/10 bg-[#f4faf6] p-6 md:p-7"
            >
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#24a556]">
                In this article
              </p>
              <ol className="mt-4 space-y-2.5">
                {tableOfContents.map((heading, i) => {
                  const id = heading.id ?? headingId(heading.text);
                  return (
                    <li key={id} className="flex gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className="font-bold text-[#24a556]/60"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${id}`}
                        className="text-[#1b1f22]/75 transition-colors duration-200 hover:text-[#24a556]"
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {post.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}

          {/* FAQs — mirrors the FAQPage schema emitted for this route */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-16 border-t border-[#0b3d1f]/10 pt-12">
              <h2
                id="frequently-asked-questions"
                className="scroll-mt-24 font-sans text-2xl md:text-[2rem] font-bold leading-tight tracking-tight text-[#0b3d1f]"
              >
                Frequently asked questions
              </h2>
              <div className="mt-8 space-y-4">
                {post.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-[#0b3d1f]/10 bg-[#f4faf6] p-6 transition-colors duration-300 open:border-[#24a556]/30"
                  >
                    <summary className="cursor-pointer list-none font-sans text-base font-bold text-[#0b3d1f] marker:hidden">
                      <span className="flex items-start justify-between gap-4">
                        {faq.question}
                        <span
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#24a556] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-4 text-[15px] leading-[1.75] text-[#1b1f22]/80">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="w-full bg-[#f0f4f1] px-6 py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-[#0b3d1f]">
              Keep reading
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="group overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_-8px_rgba(11,61,31,0.14)] transition-all duration-500 hover:shadow-[0_16px_40px_-10px_rgba(11,61,31,0.22)]"
                >
                  <Link to={postPath(item.slug)} className="block h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-[#e1ede5]">
                      <img
                        src={item.image ?? "/logo.png"}
                        alt={item.imageAlt ?? item.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#24a556]">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-sans text-lg font-bold leading-snug tracking-tight text-[#0b3d1f] transition-colors duration-300 group-hover:text-[#24a556]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1b1f22]/70">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <Link
              to="/blog"
              className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#24a556] transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All
              articles
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
