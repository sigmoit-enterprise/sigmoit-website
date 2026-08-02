/**
 * Blog content model.
 *
 * Posts are structured data rather than raw HTML strings so that every block
 * renders through real semantic elements (h2/h3/ul/blockquote/table). That
 * matters for SEO: heading hierarchy and list markup are parsed for featured
 * snippets, and it keeps the content XSS-safe without a sanitiser.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };

export interface Faq {
  question: string;
  answer: string;
}

export interface BlogPost {
  /** URL segment. Lowercase, hyphenated, keyword-bearing, never changed once live. */
  slug: string;
  /** <h1> and <title> base. Keep under ~60 chars where possible. */
  title: string;
  /** Meta description. 140–160 chars, written to earn the click. */
  description: string;
  /** ISO 8601. Drives article schema and sitemap lastmod. */
  datePublished: string;
  dateModified?: string;
  author: string;
  category: string;
  /** Targeted search terms. Also emitted in article schema. */
  keywords: string[];
  /** Social/preview image, absolute path from /public. */
  image?: string;
  imageAlt?: string;
  /** One-paragraph intro rendered above the body and reused in listings. */
  excerpt: string;
  body: Block[];
  faqs?: Faq[];
  /** Slugs of related posts, for internal linking. */
  related?: string[];
}

/** Rough reading time; shown to users and a weak quality signal. */
export function readingTime(post: BlogPost): number {
  const words = post.body.reduce((total, block) => {
    switch (block.type) {
      case "p":
      case "h2":
      case "h3":
        return total + block.text.split(/\s+/).length;
      case "quote":
        return total + block.text.split(/\s+/).length;
      case "callout":
        return total + block.text.split(/\s+/).length;
      case "ul":
      case "ol":
        return total + block.items.join(" ").split(/\s+/).length;
      case "table":
        return total + block.rows.flat().join(" ").split(/\s+/).length;
      default:
        return total;
    }
  }, 0);
  return Math.max(1, Math.round(words / 220));
}

export function wordCount(post: BlogPost): number {
  return readingTime(post) * 220;
}

/** Deterministic anchor ids so headings can be deep-linked from a TOC. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
