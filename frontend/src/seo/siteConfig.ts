/**
 * Single source of truth for every SEO-relevant fact about the business.
 *
 * Search engines reward consistency: the name, address and phone here must
 * match the Google Business Profile and every directory listing character for
 * character. Change it in one place, and prerender, JSON-LD, sitemap, and the
 * runtime <head> all follow.
 */

/**
 * Canonical origin. No trailing slash. Overridable at build time so preview
 * deployments don't emit canonicals pointing at production.
 */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || "https://sigmoit.dev"
).replace(/\/+$/, "");

export const SITE_NAME = "SigmoIT";
export const LEGAL_NAME = "SigmoIT";

export const DEFAULT_TITLE =
  "SigmoIT | Top IT Company in Nepal for Software & Web Development";

export const DEFAULT_DESCRIPTION =
  "SigmoIT is a leading IT company in Nepal delivering custom software, web and mobile app development, cloud & DevOps, and UI/UX design. Based in Damak, Jhapa — serving clients across Nepal and worldwide.";

/** Used for og:image and twitter:image when a page supplies none. */
export const DEFAULT_OG_IMAGE = "/og-image.png";

export const TWITTER_HANDLE = "";

/** Name, Address, Phone — keep identical everywhere it appears online. */
export const NAP = {
  email: "thesigmoit@gmail.com",
  phone: "+9779822389427",
  phoneDisplay: "+977 982-2389427",
  whatsapp: "https://wa.me/9779822389427",
  street: "Damak-8",
  locality: "Damak",
  region: "Jhapa, Koshi Province",
  postalCode: "57217",
  country: "NP",
  countryName: "Nepal",
  /** Damak, Jhapa. Update if you move office. */
  latitude: 26.6646,
  longitude: 87.7009,
} as const;

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61581744933809",
  "https://www.instagram.com/thesigmoit/",
];

export const FOUNDING_YEAR = "2024";

/** Cities we want to rank in locally, used in LocalBusiness areaServed. */
export const SERVICE_AREAS = [
  "Damak",
  "Birtamode",
  "Jhapa",
  "Itahari",
  "Biratnagar",
  "Dharan",
  "Kathmandu",
  "Pokhara",
  "Nepal",
];

export const OPENING_HOURS = {
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:00",
  closes: "18:00",
};

/** Resolves a possibly-relative path to an absolute URL for canonicals/OG. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/$/, "")}`;
}
