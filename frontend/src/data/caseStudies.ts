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
  liveUrl?: string;
  liveUrlLabel?: string;
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
    slug: "rising-diamond-consultancy",
    name: "Rising Diamond Consultancy",
    category: "Education & Career Guidance",
    image: "/project-images/Rising%20Diamond.jpg",
    liveUrl: "https://www.risingdiamond.info/",
    liveUrlLabel: "Visit live site",
    description:
      "An international education and career guidance website designed to build trust, explain services clearly, and convert enquiries.",
    overview: [
      "Rising Diamond Consultancy needed a polished online presence that could speak to students and families looking for guidance on international study and career pathways. We shaped the site around clarity, credibility, and a simple path to enquiry.",
      "The final experience balances aspirational branding with practical information. Service sections, trust signals, and contact prompts are all structured so visitors can quickly understand what the consultancy offers and how to start a conversation.",
    ],
    highlights: [
      {
        title: "Trust-led presentation",
        text: "A calm, professional layout that positions the consultancy as credible from the first screen.",
      },
      {
        title: "Clear service structure",
        text: "Education and career guidance offerings are grouped so visitors can scan and compare quickly.",
      },
      {
        title: "Conversion-ready contact flow",
        text: "Calls to action stay visible throughout the page so enquiries never feel buried.",
      },
    ],
    services: ["Web Design", "Web Development", "Brand Presentation", "Lead Generation"],
    tech: ["React", "TypeScript", "Vite", "Vercel"],
    results: [
      { value: "1", label: "live consultancy website" },
      { value: "100%", label: "mobile-friendly layout" },
      { value: "3", label: "primary conversion paths" },
    ],
    year: "2025",
    client: "Rising Diamond Consultancy",
    path: "/works/rising-diamond-consultancy",
  },
  {
    slug: "travel-master-thailand",
    name: "Travel Master Thailand",
    category: "Travel & Tour Packages",
    image: "/project-images/fooddelivary.png",
    liveUrl: "https://www.travelmasterthailand.com/",
    liveUrlLabel: "Visit live site",
    description:
      "An expert Thailand travel website built to showcase curated tour packages, destinations, and booking enquiries.",
    overview: [
      "Travel Master Thailand needed a site that could sell the idea of a trip before a visitor ever reached the contact form. We focused on destination-led storytelling, package clarity, and a visual rhythm that feels energetic without becoming crowded.",
      "The structure makes it easy for travellers to scan tour options, understand what is included, and move towards an enquiry. It is designed to support both inspiration and conversion in the same flow.",
    ],
    highlights: [
      {
        title: "Package-focused layout",
        text: "Tour options are presented as clear blocks so visitors can compare trips without friction.",
      },
      {
        title: "Strong destination imagery",
        text: "Large visual moments create the right sense of travel and momentum through the page.",
      },
      {
        title: "Enquiry-first conversion",
        text: "Prominent contact prompts keep the path from browsing to booking simple.",
      },
    ],
    services: ["Web Design", "Web Development", "Content Structure", "Lead Generation"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    results: [
      { value: "1", label: "tour website launched" },
      { value: "3", label: "key inquiry sections" },
      { value: "100%", label: "responsive across devices" },
    ],
    year: "2025",
    client: "Travel Master Thailand",
    path: "/works/travel-master-thailand",
  },
  {
    slug: "nestora-home-decor",
    name: "Nestora Home Decor",
    category: "Home Decor Store",
    image: "/project-images/ecommerce.png",
    liveUrl: "https://nestorahomedecor.com.au/",
    liveUrlLabel: "Visit live site",
    description:
      "A modern home decor storefront created to showcase products beautifully and support direct online discovery.",
    overview: [
      "Nestora Home Decor needed a storefront that felt aspirational while still being easy to browse on a phone. The design gives product photography room to breathe while keeping the shopping path obvious.",
      "We structured the experience so customers can move from discovery to product interest without losing context. The result feels premium, organised, and ready for e-commerce growth.",
    ],
    highlights: [
      {
        title: "Product-led browsing",
        text: "The layout keeps home decor collections front and centre with minimal distraction.",
      },
      {
        title: "Elegant storefront styling",
        text: "Warm spacing and clean typography make the brand feel premium and calm.",
      },
      {
        title: "Easy purchase journey",
        text: "Clear calls to action support product exploration and buying intent.",
      },
    ],
    services: ["E-commerce Design", "Web Development", "Product Presentation", "Conversion UX"],
    tech: ["React", "TypeScript", "Shop-ready UI", "Vercel"],
    results: [
      { value: "1", label: "live home decor store" },
      { value: "100%", label: "responsive storefront" },
      { value: "3", label: "paths into product discovery" },
    ],
    year: "2025",
    client: "Nestora Home Decor",
    path: "/works/nestora-home-decor",
  },
  {
    slug: "lash-glow-up-beauty",
    name: "Lash & Glow Up Beauty",
    category: "Beauty Studio Website",
    image: "/project-images/terminalwebsite.png",
    liveUrl: "https://www.lashglowbeauty.com/",
    liveUrlLabel: "Visit live site",
    description:
      "A professional beauty website for lash extensions, brows, and skincare services in Victoria.",
    overview: [
      "Lash & Glow Up Beauty needed a website that felt polished, feminine, and easy to trust at a glance. We leaned into clean composition and service-first messaging so the brand comes across as professional rather than over-styled.",
      "The site highlights lash, brow, and skincare offerings in a way that makes booking feel straightforward. It balances beauty-brand atmosphere with enough practical detail to support real appointment enquiries.",
    ],
    highlights: [
      {
        title: "Service clarity",
        text: "Each beauty treatment is easy to understand, which reduces hesitation before booking.",
      },
      {
        title: "Soft but confident art direction",
        text: "A refined visual tone that feels elevated without losing warmth.",
      },
      {
        title: "Appointment-led journey",
        text: "Contact and booking prompts stay visible so the next step is always obvious.",
      },
    ],
    services: ["Web Design", "Web Development", "Brand Presentation", "Booking UX"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    results: [
      { value: "1", label: "live beauty booking site" },
      { value: "100%", label: "mobile-ready design" },
      { value: "3", label: "service categories showcased" },
    ],
    year: "2025",
    client: "Lash & Glow Up Beauty",
    path: "/works/lash-glow-up-beauty",
  },
  {
    slug: "annapurna-english-school",
    name: "Annapurna English School",
    category: "School Website",
    image: "/project-images/my-personal-tutors.png",
    liveUrl: "https://annapurna-english-school.vercel.app/",
    liveUrlLabel: "Visit live site",
    description:
      "A school website for Ratuwamai, Morang, built to present academic information, trust signals, and admissions clearly.",
    overview: [
      "Annapurna English School needed a site that could serve parents, students, and administrators without feeling cluttered. We focused on a straightforward structure that makes school information easy to access.",
      "Admissions details, school identity, and key sections are organised so the website feels dependable and easy to maintain. The result supports a school audience that values clarity over complexity.",
    ],
    highlights: [
      {
        title: "Admissions clarity",
        text: "The site makes it easy for families to find the most important school information quickly.",
      },
      {
        title: "Trust-building layout",
        text: "A simple structure helps the school present itself as organised and reliable.",
      },
      {
        title: "Easy maintenance",
        text: "The content model is intentionally simple so school updates stay manageable.",
      },
    ],
    services: ["Web Design", "Web Development", "Information Architecture", "Admissions UX"],
    tech: ["React", "TypeScript", "Vite", "Vercel"],
    results: [
      { value: "1", label: "live school website" },
      { value: "100%", label: "mobile-friendly pages" },
      { value: "3", label: "core audience groups served" },
    ],
    year: "2025",
    client: "Annapurna English School",
    path: "/works/annapurna-english-school",
  },
  {
    slug: "bhandari-pariwar-app",
    name: "Bhandari Pariwar App",
    category: "Mobile App",
    image: "/project-images/terminalwebsite.png",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.bhandaripariwar.bhandari_pariwar&pcampaignid=web_share",
    liveUrlLabel: "Open Play Store",
    description:
      "A mobile app for the Bhandari Pariwar community, built for easy access on Android devices.",
    overview: [
      "The Bhandari Pariwar app was created to give the community a simple mobile experience that can be shared and accessed easily from Android devices. The emphasis was on accessibility, directness, and a clean presentation layer.",
      "The app experience is designed to feel lightweight and approachable, with the Play Store entry acting as the public distribution point for users who want to install it quickly.",
    ],
    highlights: [
      {
        title: "Mobile-first delivery",
        text: "The project is packaged for Android users with a direct path to install from the Play Store.",
      },
      {
        title: "Community-focused use",
        text: "The experience is structured around a specific audience rather than a generic product audience.",
      },
      {
        title: "Simple access",
        text: "A straightforward app presence makes it easier for users to discover and open the product.",
      },
    ],
    services: ["Mobile App", "Product Design", "Android Distribution", "UI/UX Design"],
    tech: ["Android", "Play Store", "TypeScript", "React Native"],
    results: [
      { value: "1", label: "Android app listing" },
      { value: "100%", label: "shareable install path" },
      { value: "3", label: "simple entry points" },
    ],
    year: "2025",
    client: "Bhandari Pariwar",
    path: "/works/bhandari-pariwar-app",
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
