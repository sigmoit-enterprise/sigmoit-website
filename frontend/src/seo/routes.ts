/**
 * Per-route SEO metadata + the canonical list of URLs to prerender and put in
 * the sitemap. Adding a public route means adding it here — nothing else infers
 * routes, so there is exactly one place to forget.
 */
import { BLOG_POSTS, postPath } from "../blog";
import type { BlogPost } from "../blog/types";
import { CASE_STUDIES } from "../data/caseStudies";
import { DEFAULT_OG_IMAGE, DEFAULT_DESCRIPTION, SITE_NAME } from "./siteConfig";
import {
  buildGraph,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
  creativeWorkSchema,
} from "./structuredData";
import { wordCount } from "../blog/types";

export interface RouteMeta {
  path: string;
  /** Full <title>. Written per page — never templated from the h1. */
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  /** og:type — "website" for pages, "article" for posts. */
  type?: "website" | "article";
  /** For article pages: the dates used in article:published_time / modified_time. */
  publishedTime?: string;
  modifiedTime?: string;
  /** For article pages: og:article:section (the post category). */
  section?: string;
  /** Sitemap hints. */
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
  lastmod?: string;
  /** Fully-built JSON-LD @graph for this page. */
  jsonLd?: unknown;
  /** Excluded from sitemap and marked noindex. */
  noindex?: boolean;
}

const HOME_FAQS = [
  {
    question: "What services does SigmoIT provide?",
    answer:
      "SigmoIT provides custom software development, web development, mobile app development for Android and iOS, e-commerce platforms, UI/UX design, cloud infrastructure and DevOps, and digital marketing. We serve clients across Nepal and internationally.",
  },
  {
    question: "Where is SigmoIT located?",
    answer:
      "SigmoIT is based in Damak-8, Jhapa, in Koshi Province, Nepal. We work with clients across Jhapa, Birtamode, Itahari, Biratnagar, Dharan, Kathmandu and Pokhara, as well as internationally.",
  },
  {
    question: "How much does a website cost with SigmoIT?",
    answer:
      "A small business website typically costs Rs. 45,000 to Rs. 1,20,000, a corporate site with a CMS Rs. 1,20,000 to Rs. 3,50,000, and e-commerce from Rs. 1,50,000. Every project includes custom design, SEO setup, analytics, and full source code and credential handover.",
  },
  {
    question: "Does SigmoIT work with international clients?",
    answer:
      "Yes. We work with clients in the United States, United Kingdom, Australia and the Gulf on web applications, mobile apps and cloud infrastructure, offering both dedicated-team and fixed-scope project engagements.",
  },
];

/** Mirrors the cards on the services page so schema and copy stay in step. */
export const SERVICE_ITEMS = [
  {
    name: "Web Design & UX",
    description:
      "Custom, conversion-focused website design and user experience work built mobile-first and optimised for search from day one.",
    path: "/services",
  },
  {
    name: "Web Development",
    description:
      "Fast, secure, server-rendered websites and web applications built with React, Node.js and PostgreSQL.",
    path: "/services",
  },
  {
    name: "Mobile App Development",
    description:
      "Cross-platform Android and iOS applications built with Flutter and React Native, backed by robust APIs.",
    path: "/services",
  },
  {
    name: "E-commerce Development",
    description:
      "Online stores with eSewa, Khalti and Fonepay integration, cash-on-delivery handling and inventory management.",
    path: "/services",
  },
  {
    name: "Cloud & DevOps",
    description:
      "Automated deployment pipelines, server monitoring, backups and security hardening for reliable uptime.",
    path: "/services",
  },
  {
    name: "Digital Marketing & SEO",
    description:
      "Technical SEO, local search optimisation and content strategy that gets Nepali businesses found on Google.",
    path: "/services",
  },
];

const PORTFOLIO_ITEMS = CASE_STUDIES.map((study) => ({
  name: study.name,
  description: study.description,
  image: study.image,
  path: study.path,
}));

const crumb = (name: string, path: string) => ({ name, path });
const HOME_CRUMB = crumb("Home", "/");

/** Most recent content change on the site, used as lastmod for hub pages. */
const LATEST_POST_DATE = BLOG_POSTS.reduce(
  (latest, post) =>
    (post.dateModified ?? post.datePublished) > latest
      ? post.dateModified ?? post.datePublished
      : latest,
  "2026-01-01",
);

function blogRoute(post: BlogPost): RouteMeta {
  const path = postPath(post.slug);
  return {
    path,
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    keywords: post.keywords,
    image: post.image ?? DEFAULT_OG_IMAGE,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
    section: post.category,
    changefreq: "monthly",
    priority: 0.7,
    lastmod: post.dateModified ?? post.datePublished,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      articleSchema({
        title: post.title,
        description: post.description,
        path,
        image: post.image,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        authorName: post.author,
        keywords: post.keywords,
        wordCount: wordCount(post),
      }),
      breadcrumbSchema([
        HOME_CRUMB,
        crumb("Blog", "/blog"),
        crumb(post.title, path),
      ]),
      post.faqs?.length ? faqSchema(post.faqs) : null,
    ]),
  };
}

function caseStudyRoute(study: (typeof CASE_STUDIES)[number]): RouteMeta {
  return {
    path: study.path,
    title: `${study.name} | ${study.category} | SigmoIT`,
    description: study.description,
    keywords: [
      `${study.name} case study`,
      `${study.name} SigmoIT`,
      `${study.category.toLowerCase()} project Nepal`,
      "software portfolio Nepal",
    ],
    image: study.image,
    changefreq: "monthly",
    priority: 0.7,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      creativeWorkSchema({
        name: study.name,
        description: study.description,
        image: study.image,
        path: study.path,
      }),
      itemListSchema(PORTFOLIO_ITEMS, "SigmoIT portfolio"),
      breadcrumbSchema([
        HOME_CRUMB,
        crumb("Portfolio", "/works"),
        crumb(study.name, study.path),
      ]),
    ]),
  };
}

const STATIC_ROUTES: RouteMeta[] = [
  {
    path: "/",
    title:
      "SigmoIT | Top IT Company in Nepal for Web & Software Development",
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "IT company in Nepal",
      "software development company Nepal",
      "web development Nepal",
      "mobile app development Nepal",
      "IT company Damak Jhapa",
      "custom software Nepal",
    ],
    changefreq: "weekly",
    priority: 1.0,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      localBusinessSchema(),
      faqSchema(HOME_FAQS),
      itemListSchema(SERVICE_ITEMS, "IT services offered by SigmoIT"),
    ]),
  },
  {
    path: "/services",
    title:
      "IT Services in Nepal | Web, Mobile, Cloud & SEO | SigmoIT",
    description:
      "Custom software, web and mobile app development, e-commerce, cloud & DevOps, UI/UX design and SEO services for businesses across Nepal and worldwide.",
    keywords: [
      "IT services Nepal",
      "software development services Nepal",
      "web development services Nepal",
      "cloud and DevOps Nepal",
      "UI UX design Nepal",
      "SEO services Nepal",
    ],
    changefreq: "monthly",
    priority: 0.9,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      localBusinessSchema(),
      itemListSchema(SERVICE_ITEMS, "IT services offered by SigmoIT"),
      ...SERVICE_ITEMS.map((service) => serviceSchema(service)),
      breadcrumbSchema([HOME_CRUMB, crumb("Services", "/services")]),
    ]),
  },
  {
    path: "/works",
    title: "Our Portfolio | Web & App Projects in Nepal | SigmoIT",
    description:
      "Selected work from SigmoIT — e-commerce platforms, travel and EdTech web applications, corporate websites and custom software built for clients in Nepal and abroad.",
    keywords: [
      "SigmoIT portfolio",
      "web development portfolio Nepal",
      "software projects Nepal",
      "case studies Nepal IT company",
    ],
    changefreq: "monthly",
    priority: 0.8,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      itemListSchema(PORTFOLIO_ITEMS, "SigmoIT portfolio"),
      ...PORTFOLIO_ITEMS.map((work) => creativeWorkSchema(work)),
      breadcrumbSchema([HOME_CRUMB, crumb("Portfolio", "/works")]),
    ]),
  },
  {
    path: "/about",
    title: "About SigmoIT | IT Company in Damak, Jhapa, Nepal",
    description:
      "Meet the team behind SigmoIT — a software company based in Damak-8, Jhapa, building web, mobile and cloud products for clients across Nepal and internationally.",
    keywords: [
      "about SigmoIT",
      "IT company Damak",
      "software company Jhapa",
      "SigmoIT team",
      "IT company eastern Nepal",
    ],
    changefreq: "monthly",
    priority: 0.7,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      localBusinessSchema(),
      breadcrumbSchema([HOME_CRUMB, crumb("About Us", "/about")]),
    ]),
  },
  {
    path: "/contact",
    title: "Contact SigmoIT | IT Company in Damak, Jhapa, Nepal",
    description:
      "Talk to SigmoIT about your project. Call +977 982-2389427, message us on WhatsApp, or send an enquiry. Office in Damak-8, Jhapa — serving all of Nepal and clients worldwide.",
    keywords: [
      "contact SigmoIT",
      "IT company contact Nepal",
      "hire developers Nepal",
      "software company Damak contact",
    ],
    changefreq: "yearly",
    priority: 0.8,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      localBusinessSchema(),
      breadcrumbSchema([HOME_CRUMB, crumb("Contact", "/contact")]),
    ]),
  },
  {
    path: "/blog",
    title: "Blog | IT, Web & SEO Insights for Nepal | SigmoIT",
    description:
      "Practical guides on web development, SEO, e-commerce and software costs in Nepal — written by the SigmoIT team for business owners and founders.",
    keywords: [
      "IT blog Nepal",
      "web development blog Nepal",
      "SEO tips Nepal",
      "software development guides Nepal",
    ],
    changefreq: "weekly",
    priority: 0.9,
    lastmod: LATEST_POST_DATE,
    jsonLd: buildGraph([
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "Blog",
        "@id": "#blog",
        name: `${SITE_NAME} Blog`,
        description:
          "Practical guides on web development, SEO, e-commerce and software costs in Nepal.",
        blogPost: BLOG_POSTS.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.datePublished,
          url: postPath(post.slug),
          author: { "@type": "Person", name: post.author },
        })),
      },
      breadcrumbSchema([HOME_CRUMB, crumb("Blog", "/blog")]),
    ]),
  },
];

/** Every public, indexable route. Drives prerender + sitemap. */
export const ROUTES: RouteMeta[] = [
  ...STATIC_ROUTES,
  ...BLOG_POSTS.map(blogRoute),
  ...CASE_STUDIES.map(caseStudyRoute),
];

const ROUTE_BY_PATH = new Map(ROUTES.map((route) => [route.path, route]));

/** Fallback for any path not in the registry (404s, admin). */
export const FALLBACK_META: RouteMeta = {
  path: "*",
  title: `Page Not Found | ${SITE_NAME}`,
  description: DEFAULT_DESCRIPTION,
  keywords: [],
  noindex: true,
};

export function getRouteMeta(pathname: string): RouteMeta {
  const normalised =
    pathname !== "/" ? pathname.replace(/\/+$/, "") || "/" : "/";
  return ROUTE_BY_PATH.get(normalised) ?? FALLBACK_META;
}

/** Paths the prerenderer should emit and the sitemap should list. */
export const PRERENDER_PATHS = ROUTES.filter((r) => !r.noindex).map(
  (r) => r.path,
);
