/**
 * JSON-LD builders.
 *
 * These are what earn rich results in Google: the knowledge panel, the local
 * pack, breadcrumb trails under the blue link, FAQ accordions, and the sitelinks
 * search box. Everything here validates against schema.org and Google's
 * Rich Results Test.
 */
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  DEFAULT_DESCRIPTION,
  NAP,
  SOCIAL_PROFILES,
  FOUNDING_YEAR,
  SERVICE_AREAS,
  OPENING_HOURS,
  absoluteUrl,
} from "./siteConfig";

/** Stable @id values so separate nodes can reference one another. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: NAP.street,
  addressLocality: NAP.locality,
  addressRegion: NAP.region,
  postalCode: NAP.postalCode,
  addressCountry: NAP.country,
};

/**
 * The publisher entity. Referenced by every Article and by the LocalBusiness
 * node, which is how Google links a site's content to a single brand.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.png"),
      caption: SITE_NAME,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    description: DEFAULT_DESCRIPTION,
    foundingDate: FOUNDING_YEAR,
    email: NAP.email,
    telephone: NAP.phone,
    address: postalAddress,
    sameAs: SOCIAL_PROFILES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: NAP.phone,
        email: NAP.email,
        contactType: "sales",
        areaServed: ["NP", "US", "GB", "AU", "CA", "AE"],
        availableLanguage: ["en", "ne"],
      },
      {
        "@type": "ContactPoint",
        telephone: NAP.phone,
        contactType: "customer support",
        areaServed: "NP",
        availableLanguage: ["en", "ne"],
      },
    ],
  };
}

/**
 * Enables the sitelinks search box and tells Google the site's canonical name
 * (so it stops guessing one from the <title>).
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * The local-pack entity — this is what competes for "IT company in Damak" and
 * "web development Jhapa". Requires geo coordinates and hours to be eligible.
 */
export function localBusinessSchema() {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": LOCALBUSINESS_ID,
    name: SITE_NAME,
    image: absoluteUrl("/logo.png"),
    logo: absoluteUrl("/logo.png"),
    url: `${SITE_URL}/`,
    telephone: NAP.phone,
    email: NAP.email,
    priceRange: "$$",
    currenciesAccepted: "NPR, USD",
    paymentAccepted: "Bank Transfer, eSewa, Khalti, Wire Transfer",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: OPENING_HOURS.days,
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
    sameAs: SOCIAL_PROFILES,
    parentOrganization: { "@id": ORGANIZATION_ID },
  };
}

/** Breadcrumb trail. Google renders this in place of the raw URL in results. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** One node per service offering, so service pages can rank for service intent. */
export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service-${service.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType ?? service.name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(service.path),
      servicePhone: NAP.phone,
    },
  };
}

/** Wraps a list of services as an ItemList so the services page is parseable. */
export function itemListSchema(
  items: { name: string; description?: string; path: string }[],
  listName: string,
) {
  return {
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Blog post schema. Drives the article rich result and Discover eligibility. */
export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  keywords?: string[];
  wordCount?: number;
}) {
  const url = absoluteUrl(post.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image ?? "/logo.png"),
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      name: post.authorName,
      url: `${SITE_URL}/about`,
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
    keywords: post.keywords?.join(", "),
    wordCount: post.wordCount,
  };
}

/** FAQ rich result — one of the few remaining ways to own extra SERP height. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Portfolio entries as creative works, linked back to the org. */
export function creativeWorkSchema(work: {
  name: string;
  description: string;
  image?: string;
  path: string;
}) {
  return {
    "@type": "CreativeWork",
    name: work.name,
    description: work.description,
    image: work.image ? absoluteUrl(work.image) : undefined,
    url: absoluteUrl(work.path),
    creator: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Combines nodes into one @graph. A single graph beats several loose blocks:
 * nodes can reference each other by @id, and Google resolves the entity once.
 */
export function buildGraph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
