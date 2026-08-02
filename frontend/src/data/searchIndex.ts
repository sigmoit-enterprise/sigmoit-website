import { BLOG_POSTS, postPath } from "../blog";
import { CASE_STUDIES } from "./caseStudies";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  /** Route, or "/#section-id" to scroll to a section on the home page. */
  href: string;
  keywords?: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Pages
  {
    id: "page-home",
    title: "Home",
    description: "Top IT company in Nepal for your business growth.",
    category: "Page",
    href: "/",
    keywords: ["landing", "start", "sigmoit", "main"],
  },
  {
    id: "page-services",
    title: "Services",
    description:
      "Everything we build: web, mobile, cloud, AI, marketing and SEO.",
    category: "Page",
    href: "/services",
    keywords: ["what we do", "offerings", "solutions"],
  },
  {
    id: "page-about",
    title: "About Us",
    description: "Who we are, how we work, and the team behind SigmoIT.",
    category: "Page",
    href: "/about",
    keywords: ["company", "team", "story", "process"],
  },
  {
    id: "page-works",
    title: "Portfolio",
    description: "Selected projects we have designed, built and shipped.",
    category: "Page",
    href: "/works",
    keywords: ["works", "projects", "case studies", "clients"],
  },
  {
    id: "page-contact",
    title: "Contact",
    description:
      "Start a project, get a quote, or reach us on WhatsApp, phone or email.",
    category: "Page",
    href: "/contact",
    keywords: ["hire", "quote", "enquiry", "get in touch", "reach"],
  },

  // Home page sections
  {
    id: "section-stats",
    title: "Our Impact & Partners",
    description:
      "Project numbers, client counts and the organizations we work with.",
    category: "Section",
    href: "/#about",
    keywords: ["stats", "numbers", "clients", "organizations", "partners"],
  },
  {
    id: "section-tech",
    title: "Tools & Technologies",
    description:
      "Android, Apple, HTML5, CSS3, JavaScript, React, MySQL, PostgreSQL and APIs.",
    category: "Section",
    href: "/#about",
    keywords: [
      "stack",
      "tech",
      "android",
      "ios",
      "apple",
      "html",
      "css",
      "javascript",
      "react",
      "mysql",
      "postgresql",
      "api",
    ],
  },
  {
    id: "section-services",
    title: "What We Do",
    description: "An overview of our core service lines.",
    category: "Section",
    href: "/#services",
    keywords: ["services overview", "capabilities"],
  },
  {
    id: "section-portfolio",
    title: "Selected Works",
    description: "A carousel of recent client projects.",
    category: "Section",
    href: "/#portfolio",
    keywords: ["projects", "showcase", "works"],
  },

  // Services
  {
    id: "service-saas",
    title: "SaaS Products & Cloud Solutions",
    description:
      "Cloud-based software architectures, subscription portals and resilient multi-tenant SaaS platforms.",
    category: "Service",
    href: "/services",
    keywords: ["cloud", "devops", "aws", "hosting", "subscription", "saas"],
  },
  {
    id: "service-web",
    title: "Tailored Web Architectures",
    description:
      "Ultra-fast custom websites built for conversion, search optimization and intuitive experiences.",
    category: "Service",
    href: "/services",
    keywords: ["website", "web development", "frontend", "seo", "landing page"],
  },
  {
    id: "service-mobile",
    title: "Mobile & Desktop Systems",
    description:
      "Native and cross-platform mobile apps and desktop solutions from concept to deployment.",
    category: "Service",
    href: "/services",
    keywords: ["app", "android", "ios", "flutter", "react native", "desktop"],
  },
  {
    id: "service-mentorship",
    title: "Advanced IT Mentorship",
    description:
      "Expert-led training programs, real-world coding challenges and career bootcamps.",
    category: "Service",
    href: "/services",
    keywords: ["training", "internship", "bootcamp", "course", "learn", "career"],
  },
  {
    id: "service-uiux",
    title: "Web Design & UX",
    description: "Creating lasting impressions through crafted experiences.",
    category: "Service",
    href: "/services",
    keywords: ["ui", "ux", "design", "figma", "wireframe", "prototype"],
  },
  {
    id: "service-software",
    title: "Software Development",
    description:
      "Empowering businesses through innovative custom software development.",
    category: "Service",
    href: "/services",
    keywords: ["custom software", "engineering", "backend", "api"],
  },
  {
    id: "service-webapp",
    title: "Web App Development",
    description: "Rich in user experience, rock-solid in performance.",
    category: "Service",
    href: "/services",
    keywords: ["dashboard", "portal", "spa", "web application"],
  },
  {
    id: "service-ai",
    title: "Artificial Intelligence",
    description:
      "Harnessing AI to transform your business processes and decision-making.",
    category: "Service",
    href: "/services",
    keywords: ["ai", "machine learning", "ml", "automation", "chatbot", "llm"],
  },
  {
    id: "service-marketing",
    title: "Digital Marketing",
    description: "We redefine what it means to market your business online.",
    category: "Service",
    href: "/services",
    keywords: ["ads", "social media", "campaign", "branding", "growth"],
  },
  {
    id: "service-seo",
    title: "Search Engine Optimization",
    description:
      "Driving organic visitors from the web who actually want to buy from you.",
    category: "Service",
    href: "/services",
    keywords: ["seo", "ranking", "google", "organic traffic"],
  },
  {
    id: "service-hosting",
    title: "Web Hosting",
    description:
      "Reliable and secure web hosting to keep your online presence running smoothly.",
    category: "Service",
    href: "/services",
    keywords: ["server", "domain", "uptime", "ssl", "hosting"],
  },

  // Case studies — generated from the registry so search matches the real pages
  ...CASE_STUDIES.map<SearchEntry>((study) => ({
    id: `case-study-${study.slug}`,
    title: study.name,
    description: study.description,
    category: "Case Study",
    href: study.path,
    keywords: [
      ...study.services.map((s) => s.toLowerCase()),
      ...study.tech.map((t) => t.toLowerCase()),
      study.category.toLowerCase(),
      "case study",
      "portfolio",
      "projects",
      "clients",
    ],
  })),

  // Team
  {
    id: "team-samir",
    title: "Samir Nepal",
    description: "Founder, CEO at SigmoIT.",
    category: "Team",
    href: "/about",
    keywords: ["founder", "ceo", "leadership"],
  },
  {
    id: "team-prasun",
    title: "Prasun Bhattarai",
    description: "Co-founder, CTO at SigmoIT.",
    category: "Team",
    href: "/about",
    keywords: ["co-founder", "cto", "leadership", "technology"],
  },

  // Process
  {
    id: "process",
    title: "How We Work",
    description:
      "Virtual meeting, proposal drafting, design, develop, deploy and maintenance.",
    category: "About",
    href: "/about",
    keywords: [
      "process",
      "workflow",
      "steps",
      "methodology",
      "proposal",
      "timeline",
      "maintenance",
      "support",
    ],
  },
  {
    id: "careers",
    title: "Careers & Internships",
    description: "Apply to join the SigmoIT team.",
    category: "About",
    href: "/about",
    keywords: ["jobs", "hiring", "apply", "internship", "vacancy", "work with us"],
  },

  // Contact details
  {
    id: "contact-whatsapp",
    title: "WhatsApp Us",
    description: "+977 982-2389427 â€” fastest way to reach the team.",
    category: "Contact",
    href: "/contact",
    keywords: ["whatsapp", "chat", "message", "phone"],
  },
  {
    id: "contact-phone",
    title: "Call Us",
    description: "+977 982-2389427",
    category: "Contact",
    href: "/contact",
    keywords: ["phone", "call", "number", "telephone"],
  },
  {
    id: "contact-email",
    title: "Email Us",
    description: "thesigmoit@gmail.com",
    category: "Contact",
    href: "/contact",
    keywords: ["email", "mail", "gmail"],
  },
  {
    id: "contact-office",
    title: "Our Office",
    description: "Damak-8, Jhapa, Nepal.",
    category: "Contact",
    href: "/contact",
    keywords: ["address", "location", "map", "damak", "jhapa", "nepal", "visit"],
  },
  {
    id: "contact-form",
    title: "Send Us a Requirement",
    description:
      "Tell us about your project and get a scope, timeline and cost estimate.",
    category: "Contact",
    href: "/contact",
    keywords: ["quote", "estimate", "enquiry", "form", "brief", "request"],
  },

  // Blog â€” generated from the post registry so search never drifts from content
  {
    id: "page-blog",
    title: "Blog",
    description:
      "Guides on web development, SEO, e-commerce and software costs in Nepal.",
    category: "Page",
    href: "/blog",
    keywords: ["articles", "guides", "insights", "news", "resources"],
  },
  ...BLOG_POSTS.map<SearchEntry>((post) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    description: post.description,
    category: "Blog",
    href: postPath(post.slug),
    keywords: [...post.keywords, post.category].map((k) => k.toLowerCase()),
  })),
];

const normalize = (value: string) => value.toLowerCase().trim();

const scoreEntry = (entry: SearchEntry, tokens: string[]): number => {
  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const category = normalize(entry.category);
  const keywords = (entry.keywords ?? []).map(normalize);

  let score = 0;

  for (const token of tokens) {
    let tokenScore = 0;

    if (title === token) tokenScore = 100;
    else if (title.startsWith(token)) tokenScore = 70;
    else if (title.includes(token)) tokenScore = 50;

    if (!tokenScore) {
      const keywordHit = keywords.find((k) => k.includes(token));
      if (keywordHit) tokenScore = keywordHit === token ? 45 : 30;
    }

    if (!tokenScore && category.includes(token)) tokenScore = 20;
    if (!tokenScore && description.includes(token)) tokenScore = 15;

    // Every token must land somewhere, so "cloud pricing" doesn't match "cloud".
    if (!tokenScore) return 0;
    score += tokenScore;
  }

  return score;
};

export const searchSite = (query: string, limit = 8): SearchEntry[] => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  return SEARCH_INDEX.map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
};
