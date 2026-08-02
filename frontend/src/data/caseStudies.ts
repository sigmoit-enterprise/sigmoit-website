/**
 * Case studies for the portfolio. Each entry becomes a real, crawlable
 * /works/<slug> page with its own title, description, JSON-LD and sitemap
 * entry — so the portfolio cards stop self-linking to /works and instead
 * pass link equity to pages that rank for the project names.
 */

export interface CaseStudyHighlight {
  title: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  overview: string[];
  highlights: CaseStudyHighlight[];
  services: string[];
  tech: string[];
  results: { value: string; label: string }[];
  year: string;
  client: string;
  path: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "svlc-law-firm",
    name: "SVLC Law Firm",
    category: "Brand Identity",
    image: "/project-images/ecommerce.png",
    description:
      "A complete digital presence for a law firm — identity, website, and search-ready content structure.",
    overview: [
      "SVLC approached us needing more than a website: they needed a digital presence that could carry the weight of a legal practice — credibility first, everything else second. We started with the identity system, then designed and built a website that makes it easy for potential clients to understand the practice areas, the team, and how to get in touch.",
      "The project covered brand identity, website design and development, and the on-page SEO groundwork. Every page was structured around the questions a client actually asks before picking up the phone, which is also what made the site straightforward to rank for local legal searches.",
    ],
    highlights: [
      {
        title: "Identity first",
        text: "A refined logo and colour system that feels established, not generic — the visual baseline every other asset now builds on.",
      },
      {
        title: "Practice-area pages",
        text: "Each service area got its own page with clear copy and a direct contact path, so visitors never have to hunt for a way to reach the firm.",
      },
      {
        title: "SEO-ready structure",
        text: "Semantic markup, descriptive titles, and content organised around client intent from day one — no retrofitting later.",
      },
    ],
    services: ["Brand Identity", "Web Design", "Web Development", "On-page SEO"],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    results: [
      { value: "100%", label: "new site from scratch" },
      { value: "6", label: "practice-area pages" },
      { value: "4.2x", label: "faster than the old site" },
    ],
    year: "2025",
    client: "Law firm, Nepal",
    path: "/works/svlc-law-firm",
  },
  {
    slug: "next-stop-nepal",
    name: "Next Stop Nepal",
    category: "Web Application",
    image: "/project-images/fooddelivary.png",
    description:
      "A travel platform connecting visitors with curated local experiences across Nepal.",
    overview: [
      "Next Stop Nepal wanted to move travellers past the same three temples and turn local experiences — homestays, guided treks, cultural workshops — into bookable products. We built a web application that treats discovery and booking as one seamless flow.",
      "The product pairs a searchable catalogue of experiences with structured listing pages, making the content easy to index. On the operational side, an admin dashboard lets the team manage listings, pricing and availability without touching code.",
    ],
    highlights: [
      {
        title: "Curated discovery",
        text: "Location- and category-based browsing that surfaces the right experiences without overwhelming the traveller.",
      },
      {
        title: "Booking flow",
        text: "A short, clear path from listing to confirmation — designed to work well on the patchy mobile networks common in travel.",
      },
      {
        title: "Admin control",
        text: "The team manages every listing, price and slot from a dashboard, so content stays fresh and indexable.",
      },
    ],
    services: ["Product Strategy", "Web Application", "UI/UX Design", "Admin Dashboard"],
    tech: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    results: [
      { value: "40+", label: "experiences listed at launch" },
      { value: "3-step", label: "booking flow" },
      { value: "0", label: "plugins — built to spec" },
    ],
    year: "2025",
    client: "Travel platform, Nepal",
    path: "/works/next-stop-nepal",
  },
  {
    slug: "tutor-connect",
    name: "Tutor Connect",
    category: "EdTech",
    image: "/project-images/my-personal-tutors.png",
    description:
      "A marketplace bridging students and educators — profiles, scheduling and session management in one place.",
    overview: [
      "Finding a good tutor in Nepal usually meant asking around. Tutor Connect set out to fix that with a marketplace where students can browse verified tutor profiles, compare qualifications, and book sessions directly.",
      "We designed the platform around trust: tutor profiles carry credentials and subjects, reviews anchor each booking, and the scheduling system removes the back-and-forth that kills most tutoring relationships.",
    ],
    highlights: [
      {
        title: "Profile discovery",
        text: "Filterable tutor profiles with subject, level and location data — the content core that also drives search visibility.",
      },
      {
        title: "Scheduling built in",
        text: "Students pick slots from live availability; both sides get confirmation and reminders without extra tools.",
      },
      {
        title: "Session management",
        text: "A shared view of past and upcoming sessions keeps students, parents and tutors on the same page.",
      },
    ],
    services: ["Marketplace Design", "Web Application", "UI/UX Design", "Database Modelling"],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    results: [
      { value: "2x", label: "quicker booking than chat-based" },
      { value: "100%", label: "profiles with verified subjects" },
      { value: "1", label: "dashboard for students and tutors" },
    ],
    year: "2025",
    client: "EdTech startup, Nepal",
    path: "/works/tutor-connect",
  },
  {
    slug: "rising-diamond",
    name: "Rising Diamond",
    category: "Corporate Website",
    image: "/project-images/Rising%20Diamond.jpg",
    description:
      "An elegant digital presence for a luxury brand — visual identity, web design and launch-ready content.",
    overview: [
      "Rising Diamond needed a corporate website that communicated luxury without saying a word too many. The brief was about restraint: strong typography, generous space, and a brand system that could carry print and digital alike.",
      "We delivered a complete identity and a single-page-scale site with dedicated service and gallery sections. The design works equally well on a phone in a showroom as on a desktop in a boardroom.",
    ],
    highlights: [
      {
        title: "Refined identity",
        text: "A considered logo, palette and type pairing chosen to signal permanence and quality.",
      },
      {
        title: "Editorial layout",
        text: "Full-bleed imagery and quiet typography that let the product photography do the selling.",
      },
      {
        title: "Fast by design",
        text: "Optimised imagery and minimal dependencies keep the experience instant even on slower connections.",
      },
    ],
    services: ["Brand Identity", "Web Design", "Web Development", "Photography Direction"],
    tech: ["React", "Tailwind CSS", "Vercel"],
    results: [
      { value: "0.9s", label: "median load time" },
      { value: "100", label: "Lighthouse performance" },
      { value: "5", label: "site sections, one brand voice" },
    ],
    year: "2024",
    client: "Luxury brand, Nepal",
    path: "/works/rising-diamond",
  },
  {
    slug: "terminal-ui",
    name: "Terminal UI",
    category: "Web Application",
    image: "/project-images/terminalwebsite.png",
    description:
      "A developer-centric interface with a tactile, terminal-inspired feel engineered by SigmoIT.",
    overview: [
      "Terminal UI was a chance to prove that developer tools don't have to look like every other admin panel. The product — a command-driven operations console — was designed around a terminal metaphor that rewards users who know their shortcuts.",
      "Beyond the aesthetic, we focused on real usability: keyboard-first navigation, instant search across logs and resources, and a command palette that puts every action one keystroke away.",
    ],
    highlights: [
      {
        title: "Keyboard-first",
        text: "Every action is reachable from the keyboard, with a command palette as the primary entry point.",
      },
      {
        title: "Instant search",
        text: "Logs and resources are searchable in real time, with results that narrow as you type.",
      },
      {
        title: "Tactile aesthetic",
        text: "A terminal-inspired visual language that is memorable without sacrificing legibility or hierarchy.",
      },
    ],
    services: ["Product Design", "Web Application", "UI/UX Design", "Frontend Engineering"],
    tech: ["React", "TypeScript", "WebSockets", "Node.js"],
    results: [
      { value: "70%", label: "of actions keyboard-only" },
      { value: "<50ms", label: "search response time" },
      { value: "3x", label: "faster than the old panel" },
    ],
    year: "2024",
    client: "Developer tools, international",
    path: "/works/terminal-ui",
  },
];

/** Quick lookup for the dynamic /works/:slug route. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** All case studies except one — for the "related projects" block. */
export function relatedCaseStudies(current: CaseStudy): CaseStudy[] {
  return CASE_STUDIES.filter((study) => study.slug !== current.slug).slice(0, 3);
}
