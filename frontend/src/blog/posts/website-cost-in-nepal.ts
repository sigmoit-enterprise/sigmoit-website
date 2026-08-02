import type { BlogPost } from "../types";

/** High-volume commercial query: "website cost in Nepal" / "website price Nepal". */
export const post: BlogPost = {
  slug: "website-cost-in-nepal",
  title: "Website Development Cost in Nepal",
  description:
    "What a website actually costs in Nepal in 2026 — honest NPR price ranges by project type, what drives the number up, and how to tell a fair quote from a bad one.",
  datePublished: "2026-02-03",
  dateModified: "2026-08-02",
  author: "Prasun Rai",
  category: "Pricing",
  keywords: [
    "website cost in Nepal",
    "website development price Nepal",
    "web design cost Nepal",
    "ecommerce website cost Nepal",
    "mobile app development cost Nepal",
    "website maintenance cost Nepal",
  ],
  image: "/project-images/ecommerce.png",
  imageAlt: "A custom e-commerce website built by SigmoIT",
  excerpt:
    "Ask five companies in Nepal what a website costs and you'll get answers from Rs. 8,000 to Rs. 8,00,000. Both ends are real. Here's exactly what separates them, with the numbers written down.",
  body: [
    {
      type: "p",
      text: "\"How much for a website?\" is the hardest question in this business to answer honestly, because it's like asking how much a building costs. A shed and a hospital are both buildings. So this post does the thing most agency pricing pages avoid: it puts real numbers next to real scopes.",
    },
    {
      type: "p",
      text: "All figures are Nepalese Rupees, current as of 2026, and reflect what competent Nepali teams actually charge — not international rates, and not the race-to-the-bottom freelance floor.",
    },
    {
      type: "h2",
      text: "Quick price table",
      id: "quick-price-table",
    },
    {
      type: "table",
      caption: "Website and software development costs in Nepal, 2026 (NPR)",
      head: ["What you're building", "Realistic range", "Timeline"],
      rows: [
        ["Single-page / landing page", "Rs. 15,000 – 40,000", "1–2 weeks"],
        ["Small business website (5–8 pages)", "Rs. 45,000 – 1,20,000", "3–5 weeks"],
        ["Corporate website (10–20 pages, CMS)", "Rs. 1,20,000 – 3,50,000", "5–9 weeks"],
        ["School / college site with student portal", "Rs. 1,50,000 – 4,00,000", "6–12 weeks"],
        ["E-commerce (up to ~200 products)", "Rs. 1,50,000 – 5,00,000", "8–14 weeks"],
        ["Large e-commerce / marketplace", "Rs. 5,00,000 – 20,00,000+", "4–8 months"],
        ["Custom web application (CRM, ERP, booking)", "Rs. 3,00,000 – 15,00,000+", "3–6 months"],
        ["Mobile app, single platform", "Rs. 2,50,000 – 8,00,000", "2–5 months"],
        ["Mobile app, Android + iOS", "Rs. 4,00,000 – 20,00,000+", "3–8 months"],
        ["Annual hosting + maintenance", "Rs. 12,000 – 60,000 / year", "Ongoing"],
      ],
    },
    {
      type: "callout",
      title: "Read the ranges as scope, not as quality tiers",
      text: "A Rs. 50,000 site isn't a worse version of a Rs. 3,00,000 site. It's a smaller one. Paying more buys more pages, more custom functionality and more testing — it does not automatically buy better craftsmanship.",
    },
    {
      type: "h2",
      text: "The seven things that actually move the price",
      id: "what-moves-the-price",
    },
    {
      type: "h3",
      text: "1. Custom design versus a template",
      id: "custom-vs-template",
    },
    {
      type: "p",
      text: "A purchased theme with your logo and colours costs a fraction of a designed-from-scratch interface. The gap is typically Rs. 30,000 to Rs. 1,50,000. Templates are a perfectly reasonable choice for a first site with a tight budget; the honest version of that conversation is a company telling you it's a template.",
    },
    {
      type: "h3",
      text: "2. Number of unique page layouts",
      id: "page-layouts",
    },
    {
      type: "p",
      text: "Twenty pages using four layouts is cheap. Six pages each needing its own layout is not. Price tracks unique designs, not page count — which is why 'how many pages?' is the wrong question to lead with.",
    },
    {
      type: "h3",
      text: "3. Custom functionality",
      id: "custom-functionality",
    },
    {
      type: "p",
      text: "This is the biggest multiplier by a wide margin. A brochure site is content in, content out. The moment you need user accounts, role-based permissions, bookings, inventory sync, invoicing or a dashboard, you're building software, and software is priced by complexity.",
    },
    {
      type: "h3",
      text: "4. Payment gateway integration",
      id: "payment-gateways",
    },
    {
      type: "p",
      text: "eSewa, Khalti, IMEPay, ConnectIPS and Fonepay each have their own integration and settlement process. Budget Rs. 20,000 to Rs. 60,000 per gateway including testing. International cards via Stripe or PayPal add compliance and currency handling on top.",
    },
    {
      type: "h3",
      text: "5. Content and photography",
      id: "content-and-photography",
    },
    {
      type: "p",
      text: "The single most common cause of a delayed launch in Nepal is the client not having content ready. If you need copywriting and photography done for you, add Rs. 20,000 to Rs. 1,00,000 and three to four weeks. If you write it yourself, budget your own time honestly.",
    },
    {
      type: "h3",
      text: "6. SEO and analytics setup",
      id: "seo-setup",
    },
    {
      type: "p",
      text: "Technical SEO done properly at build time — server-rendered or prerendered HTML, structured data, sitemap, Search Console, Analytics, page speed work — adds roughly Rs. 25,000 to Rs. 80,000. Retrofitting it later costs several times that, which is the whole argument for doing it upfront.",
    },
    {
      type: "h3",
      text: "7. Ongoing maintenance",
      id: "ongoing-maintenance",
    },
    {
      type: "p",
      text: "Domain renewal, hosting, SSL, security patches, backups and small content changes. Rs. 12,000 to Rs. 60,000 a year for a typical business site. Skipping this is how sites end up hacked or expired — treat it as part of the cost of owning a website, not an optional add-on.",
    },
    {
      type: "h2",
      text: "Why the Rs. 8,000 website exists",
      id: "cheap-websites",
    },
    {
      type: "p",
      text: "It's real, and for some situations it's genuinely the right call. Understand what you're buying:",
    },
    {
      type: "ul",
      items: [
        "A free or pirated theme, installed rather than designed.",
        "Shared hosting on the builder's reseller account, often with no backups.",
        "The domain frequently registered under the developer's name.",
        "No SEO configuration, no analytics, no Search Console.",
        "No support after handover, and typically no handover document.",
      ],
    },
    {
      type: "p",
      text: "If you need a placeholder online this week and you'll rebuild within a year, that's a defensible trade. If this site is meant to bring in customers for the next five years, you'll pay the difference eventually — usually twice, because rebuilding costs more than building.",
    },
    {
      type: "h2",
      text: "How to compare two quotes fairly",
      id: "comparing-quotes",
    },
    {
      type: "p",
      text: "Quotes are rarely comparable as written, because they describe different things. Normalise them by insisting each one answers the same checklist:",
    },
    {
      type: "ol",
      items: [
        "Is the design custom or template-based? Name the theme if it's a theme.",
        "How many unique page layouts are included?",
        "Who registers the domain, and in whose name?",
        "Where is hosting, at what annual cost, with what backup schedule?",
        "Is source code handed over in a Git repository I own?",
        "Are Search Console, Analytics and a sitemap included?",
        "What is the mobile page-speed target?",
        "How many rounds of revision are included before it becomes chargeable?",
        "What does support cover, for how long, and what's the renewal price?",
        "What is the payment schedule tied to — dates, or delivered milestones?",
      ],
    },
    {
      type: "quote",
      text: "A quote that's 60% cheaper is almost never the same work done more efficiently. It's less work. Find out which parts are missing before you decide that's a problem — sometimes it isn't.",
    },
    {
      type: "h2",
      text: "What we charge",
      id: "what-we-charge",
    },
    {
      type: "p",
      text: "SigmoIT sits in the middle-to-upper part of the ranges above. Every project includes custom design, mobile-first responsive build, prerendered or server-rendered HTML so Google can actually read the site, structured data, Search Console and Analytics setup, the domain in your name, and full source-code handover.",
    },
    {
      type: "p",
      text: "We scope for free. Describe what you're trying to build and we'll come back with a fixed number and a timeline, plus an honest note on anything we think you shouldn't pay for yet.",
    },
  ],
  faqs: [
    {
      question: "How much does a website cost in Nepal in 2026?",
      answer:
        "A small business website of 5–8 pages costs Rs. 45,000 to Rs. 1,20,000. A corporate site with a CMS runs Rs. 1,20,000 to Rs. 3,50,000, e-commerce Rs. 1,50,000 to Rs. 5,00,000, and custom web applications Rs. 3,00,000 upward. Annual hosting and maintenance is typically Rs. 12,000 to Rs. 60,000.",
    },
    {
      question: "Why do some companies in Nepal offer websites for Rs. 8,000?",
      answer:
        "Those builds use free or pirated themes on shared hosting, usually with the domain in the developer's name, no SEO or analytics setup, and no support after handover. It can be a reasonable short-term placeholder, but it is not a site designed to bring in customers over several years.",
    },
    {
      question: "How much does e-commerce website development cost in Nepal?",
      answer:
        "Rs. 1,50,000 to Rs. 5,00,000 for a store with up to around 200 products, including one or two local payment gateways. Marketplaces and large catalogues start around Rs. 5,00,000 and can exceed Rs. 20,00,000. Each payment gateway integration adds roughly Rs. 20,000 to Rs. 60,000.",
    },
    {
      question: "What is the annual maintenance cost for a website in Nepal?",
      answer:
        "Rs. 12,000 to Rs. 60,000 per year for a typical business website. That covers domain renewal, hosting, SSL, security updates, backups and minor content changes.",
    },
    {
      question: "How long does it take to build a website in Nepal?",
      answer:
        "Three to five weeks for a small business website, five to nine weeks for a corporate site, eight to fourteen weeks for e-commerce, and three to six months for custom web applications. The most common cause of delay is content not being ready.",
    },
  ],
  related: [
    "it-company-in-damak-jhapa",
    "ecommerce-website-development-nepal",
    "rank-website-google-nepal",
  ],
};
