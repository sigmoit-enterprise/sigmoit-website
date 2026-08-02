import type { BlogPost } from "../types";

/** Technical SEO pillar. Also demonstrates competence to prospective clients. */
export const post: BlogPost = {
  slug: "rank-website-google-nepal",
  title: "How to Rank a Nepali Website on Google",
  description:
    "A step-by-step SEO guide for businesses in Nepal — fixing the technical basics, winning local search, and the mistakes that keep good sites invisible on Google.",
  datePublished: "2026-03-11",
  dateModified: "2026-08-02",
  author: "Samir Nepal",
  category: "SEO",
  keywords: [
    "SEO Nepal",
    "rank website on Google Nepal",
    "local SEO Nepal",
    "SEO services Nepal",
    "Google Business Profile Nepal",
    "technical SEO guide",
  ],
  image: "/blogs/SEO.jpg",
  imageAlt: "Illustration representing search engine optimisation",
  excerpt:
    "Most Nepali business websites don't rank because of one fixable technical reason, not because of competition. This is the order to fix things in, from highest impact to lowest.",
  body: [
    {
      type: "p",
      text: "There's a common belief that ranking on Google requires an ongoing monthly retainer and a lot of mystery. For most Nepali businesses that isn't true. The sites that don't rank usually fail at something concrete and fixable — Google literally cannot read the page, or the business has never told Google it exists.",
    },
    {
      type: "p",
      text: "Work through this in order. The first three sections account for the large majority of the result.",
    },
    {
      type: "h2",
      text: "Step 1: Make sure Google can actually read your site",
      id: "make-your-site-readable",
    },
    {
      type: "p",
      text: "This is the one that silently kills modern sites. If your website is built as a single-page application — React, Vue or Angular with client-side rendering — the HTML the server sends is often an empty div. The content appears only after JavaScript runs. Google can execute JavaScript, but it does so on a delayed second pass, inconsistently, and other crawlers largely don't bother at all.",
    },
    {
      type: "p",
      text: "Test it in ten seconds: open your site, view page source (Ctrl+U), and search for a sentence you can see on screen. If it isn't in the source, that's your problem, and nothing else on this list will compensate for it.",
    },
    {
      type: "ul",
      items: [
        "Server-side rendering (SSR) — the server builds the HTML per request. Best for content that changes constantly.",
        "Static site generation or prerendering — HTML is built once at deploy time. Ideal for marketing sites and blogs, and it's what this site uses.",
        "Traditional server-rendered stacks — WordPress, Laravel, Django. These never had the problem to begin with.",
      ],
    },
    {
      type: "callout",
      title: "The fastest possible check",
      text: "Run: curl -s https://yoursite.com | grep -i \"your headline\". If it returns nothing, crawlers are getting a blank page.",
    },
    {
      type: "h2",
      text: "Step 2: Claim your Google Business Profile",
      id: "google-business-profile",
    },
    {
      type: "p",
      text: "For any business serving a physical area in Nepal, this free listing outperforms the website itself for local searches. It's what populates the map pack — the three results with photos and stars that sit above the normal links.",
    },
    {
      type: "ol",
      items: [
        "Create the profile at business.google.com and complete verification (usually a postcard or phone call).",
        "Pick the most specific primary category available, not a generic one. 'Software company' beats 'Business service'.",
        "Fill in every field: hours, service area, description, services, website, phone.",
        "Upload at least ten real photos — office exterior, interior, team, work. Real photos outperform stock decisively.",
        "Post updates monthly. Active profiles rank above dormant ones.",
        "Ask every satisfied customer for a review, and reply to all of them.",
      ],
    },
    {
      type: "p",
      text: "Reviews are the highest-leverage ongoing local ranking factor, and almost nobody in Nepal asks for them systematically. A simple SMS or WhatsApp message with a direct review link, sent after every completed job, will beat competitors who spend money on ads.",
    },
    {
      type: "h2",
      text: "Step 3: Set up Search Console and Analytics",
      id: "search-console",
    },
    {
      type: "p",
      text: "You cannot improve what you can't measure, and Google Search Console is free. It tells you exactly which queries you appear for, where you rank, which pages are indexed, and which are blocked or broken.",
    },
    {
      type: "ul",
      items: [
        "Verify your domain, then submit your sitemap.xml.",
        "Check the Pages report for anything marked 'Discovered — currently not indexed' or 'Crawled — currently not indexed'. That's Google telling you it found the page and decided it wasn't worth indexing, usually a content-quality signal.",
        "Watch the Queries report for terms where you rank between positions 5 and 15 — improving those is far cheaper than chasing new keywords.",
        "Fix everything in the Core Web Vitals and Mobile Usability reports.",
      ],
    },
    {
      type: "h2",
      text: "Step 4: Get the on-page basics right",
      id: "on-page-basics",
    },
    {
      type: "p",
      text: "Unglamorous, quick, and still frequently wrong on Nepali business sites.",
    },
    {
      type: "table",
      caption: "On-page checklist per page",
      head: ["Element", "Rule"],
      rows: [
        ["Title tag", "Unique per page, 50–60 characters, primary keyword near the front"],
        ["Meta description", "Unique, 140–160 characters, written to earn a click"],
        ["H1", "Exactly one per page, describing what the page is about"],
        ["Heading order", "H2 and H3 nested logically — never skipped for styling"],
        ["Image alt text", "Describes the image; empty alt for purely decorative images"],
        ["URLs", "Short, lowercase, hyphenated, keyword-bearing, never changed after launch"],
        ["Canonical tag", "Absolute URL, self-referencing on every page"],
        ["Internal links", "Every important page reachable within three clicks of the homepage"],
      ],
    },
    {
      type: "h2",
      text: "Step 5: Add structured data",
      id: "structured-data",
    },
    {
      type: "p",
      text: "Structured data is JSON-LD markup that states plainly what your page is about. It doesn't directly boost rankings, but it makes you eligible for rich results — star ratings, FAQ accordions, breadcrumb trails — which materially raise click-through rate from the same position.",
    },
    {
      type: "ul",
      items: [
        "Organization and LocalBusiness on the homepage, with exact address, phone and geo coordinates.",
        "BreadcrumbList on every page below the homepage.",
        "Service markup on service pages.",
        "BlogPosting on articles, with author and dates.",
        "FAQPage wherever you genuinely answer questions.",
      ],
    },
    {
      type: "p",
      text: "Validate everything with Google's Rich Results Test before you ship it. Invalid markup is ignored at best and can trigger a manual action at worst.",
    },
    {
      type: "h2",
      text: "Step 6: Fix page speed, especially on mobile",
      id: "page-speed",
    },
    {
      type: "p",
      text: "A large share of Nepali traffic arrives on mid-range Android phones over 4G. A site tuned on office fibre can be unusable in the field. Test with PageSpeed Insights on mobile and target the Core Web Vitals thresholds:",
    },
    {
      type: "table",
      head: ["Metric", "Target", "What it measures"],
      rows: [
        ["LCP", "under 2.5s", "When the main content becomes visible"],
        ["INP", "under 200ms", "How fast the page responds to taps"],
        ["CLS", "under 0.1", "How much the layout jumps while loading"],
      ],
    },
    {
      type: "ul",
      items: [
        "Serve images as WebP or AVIF and size them to their display dimensions. Unoptimised images are the number one cause of slow Nepali sites.",
        "Always set width and height on images — this alone fixes most layout shift.",
        "Lazy-load anything below the fold; preload the single main hero image.",
        "Cut unused JavaScript. Every page-builder plugin has a cost.",
        "Use a CDN so assets aren't served from a single distant origin.",
      ],
    },
    {
      type: "h2",
      text: "Step 7: Publish content people actually search for",
      id: "content",
    },
    {
      type: "p",
      text: "Once the technical foundation is sound, content is the compounding asset. The mistake is writing what the business wants to say instead of what customers type into Google.",
    },
    {
      type: "ul",
      items: [
        "Answer real questions you get asked on the phone. Those are search queries, verbatim.",
        "Write for specific intent: 'cost of X in Nepal', 'best X in Kathmandu', 'how to do X' — these convert far better than broad terms.",
        "One page per topic. Five thin pages about the same thing compete with each other and all lose.",
        "Depth beats frequency. One genuinely useful 1,500-word guide outranks ten 300-word posts.",
        "Update older posts rather than always publishing new ones. Freshness is a ranking signal and updating is cheaper than writing.",
      ],
    },
    {
      type: "h2",
      text: "What to ignore",
      id: "what-to-ignore",
    },
    {
      type: "ul",
      items: [
        "Anyone selling bulk backlinks. Paid link schemes violate Google's spam policies and risk a penalty that is slow and painful to reverse.",
        "Keyword stuffing and hidden text. These stopped working over a decade ago.",
        "Meta keywords tag. Google has ignored it since 2009.",
        "Guaranteed '#1 in 30 days' offers. Nobody can guarantee rankings; anyone who does is either lying or planning something that will get you penalised.",
        "Obsessing over a single vanity keyword while ignoring the fifty long-tail terms that actually bring qualified traffic.",
      ],
    },
    {
      type: "quote",
      text: "SEO in Nepal is unusually winnable, because most competitors haven't done the basics. Fix rendering, claim your profile, publish honest content, and you're already ahead of the majority.",
    },
    {
      type: "h2",
      text: "A realistic timeline",
      id: "timeline",
    },
    {
      type: "table",
      head: ["Timeframe", "What to expect"],
      rows: [
        ["Week 1–2", "Technical fixes live; Search Console verified and sitemap submitted"],
        ["Week 3–6", "Pages indexed; Google Business Profile starts appearing for branded searches"],
        ["Month 2–3", "Long-tail queries begin ranking; first organic enquiries"],
        ["Month 4–6", "Competitive local terms move into the first page range"],
        ["Month 6–12", "Compounding growth as content accumulates and links arrive naturally"],
      ],
    },
    {
      type: "p",
      text: "If someone promises faster than this without a specific reason — say, you already have strong authority and just fixed a blocking technical issue — treat it as a warning sign.",
    },
    {
      type: "p",
      text: "We build every site with this checklist already applied. If you'd like us to audit your existing site against it, get in touch and we'll tell you what's actually wrong, whether or not you hire us to fix it.",
    },
  ],
  faqs: [
    {
      question: "Why is my website not showing up on Google in Nepal?",
      answer:
        "The most common cause is that the site is a client-rendered JavaScript app, so crawlers receive an empty page. Check by viewing page source and searching for your headline text. Other frequent causes are the site not being submitted to Google Search Console, a missing or blocked sitemap, and no Google Business Profile.",
    },
    {
      question: "How long does SEO take to work in Nepal?",
      answer:
        "Expect indexing within two to six weeks, first long-tail rankings and enquiries by month two or three, and competitive local terms reaching the first page around months four to six. Meaningful compounding growth takes six to twelve months.",
    },
    {
      question: "Is Google Business Profile important for SEO in Nepal?",
      answer:
        "For any business serving a physical area, it is the single highest-impact free asset. It powers the local map pack that appears above regular results. Complete every field, upload at least ten real photos, post monthly, and consistently ask customers for reviews.",
    },
    {
      question: "Should I buy backlinks to rank faster in Nepal?",
      answer:
        "No. Paid link schemes violate Google's spam policies and risk a penalty that is slow and difficult to reverse. Earn links by publishing genuinely useful content and getting listed in legitimate local directories and chamber of commerce listings.",
    },
  ],
  related: [
    "it-company-in-damak-jhapa",
    "website-cost-in-nepal",
    "hire-offshore-developers-nepal",
  ],
};
