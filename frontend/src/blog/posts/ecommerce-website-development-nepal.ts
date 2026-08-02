import type { BlogPost } from "../types";

/** Service intent: "ecommerce website development Nepal" + payment gateway queries. */
export const post: BlogPost = {
  slug: "ecommerce-website-development-nepal",
  title: "E-commerce Website Development in Nepal",
  description:
    "A practical guide to launching an online store in Nepal — choosing between eSewa, Khalti and Fonepay, platform decisions, delivery partners, and what it really costs.",
  datePublished: "2026-05-19",
  dateModified: "2026-08-02",
  author: "Samir Nepal",
  category: "E-commerce",
  keywords: [
    "ecommerce website development Nepal",
    "online store Nepal",
    "eSewa integration",
    "Khalti payment gateway integration",
    "Fonepay integration Nepal",
    "ecommerce cost Nepal",
  ],
  image: "/blogs/e-commerce.jpg",
  imageAlt: "An e-commerce storefront developed by SigmoIT",
  excerpt:
    "Building an online store in Nepal is less about the storefront and more about payments, delivery and cash on delivery. Get those three right and the rest is straightforward.",
  body: [
    {
      type: "p",
      text: "E-commerce in Nepal has matured fast. Digital wallets are mainstream, delivery networks reach well beyond the Kathmandu valley, and customers who once insisted on seeing goods in person now buy phones and furniture online. But the operational realities here differ enough from Western e-commerce that copying a foreign playbook produces a store that doesn't convert.",
    },
    {
      type: "h2",
      text: "Payment gateways: what to integrate and why",
      id: "payment-gateways",
    },
    {
      type: "p",
      text: "You do not need all of them. Two well-implemented options plus cash on delivery covers the overwhelming majority of Nepali customers.",
    },
    {
      type: "table",
      caption: "Nepali payment gateways compared",
      head: ["Gateway", "Best for", "Notes"],
      rows: [
        ["eSewa", "Broadest wallet reach", "Highest general adoption; the default first integration"],
        ["Khalti", "Younger, urban customers", "Good developer docs; quick onboarding"],
        ["Fonepay", "Direct bank transfers", "Connects to most Nepali banks; strong for larger tickets"],
        ["ConnectIPS", "High-value transfers", "Bank-backed; lower fees on large amounts"],
        ["IMEPay", "Remittance-linked users", "Useful if your customers receive remittances"],
        ["Stripe / PayPal", "International customers", "Nepali entities face restrictions — verify current eligibility before promising it"],
      ],
    },
    {
      type: "callout",
      title: "Cash on delivery is still the default",
      text: "Depending on category, 50–75% of Nepali online orders are still COD. Design for it as a first-class flow, not a fallback: order confirmation by phone, clear delivery windows, and a return process that assumes cash changes hands at the door.",
    },
    {
      type: "p",
      text: "Each gateway integration costs roughly Rs. 20,000 to Rs. 60,000 including sandbox testing and going live. Budget time for merchant onboarding too — paperwork and approval typically takes one to three weeks, and it's the most common cause of a delayed launch.",
    },
    {
      type: "h2",
      text: "Platform choice",
      id: "platform-choice",
    },
    {
      type: "table",
      head: ["Option", "Good when", "Watch out for"],
      rows: [
        ["WooCommerce (WordPress)", "Small to mid catalogues, tight budget", "Plugin bloat kills speed; needs real maintenance"],
        ["Shopify", "Fast launch, simple operations", "Local gateways need workarounds; monthly USD fees"],
        ["Custom build", "Unusual logic, marketplaces, scale", "Higher upfront cost; needs a real dev partner"],
        ["Daraz / social selling only", "Testing demand before investing", "You never own the customer relationship"],
      ],
    },
    {
      type: "p",
      text: "An honest recommendation: if you're unproven, start by selling through Daraz, Facebook and Instagram to validate demand. Build your own store once you know what sells. Plenty of beautiful Nepali e-commerce sites launch to no traffic because the demand was never tested.",
    },
    {
      type: "h2",
      text: "Delivery and logistics",
      id: "delivery-logistics",
    },
    {
      type: "ul",
      items: [
        "Inside Kathmandu valley, same-day and next-day delivery is achievable through local courier partners.",
        "Outside the valley, plan two to five days and integrate with a national logistics partner rather than improvising.",
        "Publish delivery charges clearly per zone. Surprise shipping cost at checkout is the single largest cause of cart abandonment here.",
        "Build COD reconciliation into your admin from day one — tracking which courier has collected which cash is an operational nightmare when retrofitted.",
        "Set a written returns policy. Nepali consumer expectation is increasingly a seven-day return window.",
      ],
    },
    {
      type: "h2",
      text: "SEO for online stores",
      id: "ecommerce-seo",
    },
    {
      type: "p",
      text: "E-commerce SEO differs from brochure-site SEO because you have hundreds of pages competing for attention, many nearly identical.",
    },
    {
      type: "ul",
      items: [
        "Write unique descriptions for every product. Manufacturer copy is duplicated across every store selling the same item, and Google picks one winner — usually not you.",
        "Add Product structured data with price, availability and reviews to become eligible for rich results.",
        "Category pages are your highest-value SEO asset. Give each one real introductory content, not just a grid.",
        "Handle out-of-stock products properly: keep the page live with availability marked, rather than deleting it and creating a 404.",
        "Canonicalise filter and sort URLs so colour and size variations don't fragment your ranking signals.",
        "Compress product images aggressively. Image weight is what makes most Nepali stores slow on mobile.",
      ],
    },
    {
      type: "p",
      text: "Our technical SEO guide covers the site-wide foundations that apply here too.",
    },
    {
      type: "h2",
      text: "What it costs",
      id: "what-it-costs",
    },
    {
      type: "table",
      caption: "E-commerce build costs in Nepal, 2026 (NPR)",
      head: ["Scope", "Range", "Timeline"],
      rows: [
        ["Small store, up to 50 products, 1 gateway", "Rs. 1,50,000 – 2,50,000", "6–9 weeks"],
        ["Mid store, up to 200 products, 2 gateways", "Rs. 2,50,000 – 5,00,000", "8–14 weeks"],
        ["Large store or marketplace", "Rs. 5,00,000 – 20,00,000+", "4–8 months"],
        ["Each additional payment gateway", "Rs. 20,000 – 60,000", "1–2 weeks"],
        ["Annual hosting, SSL, maintenance", "Rs. 30,000 – 1,20,000 / year", "Ongoing"],
      ],
    },
    {
      type: "quote",
      text: "The storefront is maybe 30% of an e-commerce project. Payments, delivery, COD reconciliation and inventory are the other 70%, and they're what determines whether the business works.",
    },
    {
      type: "h2",
      text: "A launch checklist",
      id: "launch-checklist",
    },
    {
      type: "ol",
      items: [
        "Merchant accounts approved and tested in production with a real low-value transaction.",
        "COD flow tested end to end, including a return.",
        "Delivery zones and charges published and correct at checkout.",
        "Product structured data validated in Google's Rich Results Test.",
        "Mobile page speed under 2.5s LCP on 4G.",
        "SSL live, and payment pages verified secure.",
        "Google Analytics e-commerce tracking and Search Console configured.",
        "Order confirmation via SMS and email working.",
        "Admin trained on order management and refunds.",
        "Backups running and restore tested at least once.",
      ],
    },
    {
      type: "p",
      text: "We build custom e-commerce platforms with Nepali payment gateways, COD reconciliation and inventory management, plus the SEO foundation baked in. Tell us your catalogue size and which gateways you need, and we'll scope it.",
    },
  ],
  faqs: [
    {
      question: "How much does an e-commerce website cost in Nepal?",
      answer:
        "A small store with up to 50 products and one payment gateway costs Rs. 1,50,000 to Rs. 2,50,000. A mid-sized store with up to 200 products and two gateways runs Rs. 2,50,000 to Rs. 5,00,000. Marketplaces start around Rs. 5,00,000. Each extra gateway adds Rs. 20,000 to Rs. 60,000.",
    },
    {
      question: "Which payment gateway is best for an online store in Nepal?",
      answer:
        "Start with eSewa for the broadest wallet reach, add Khalti for younger urban customers, and include Fonepay or ConnectIPS if you sell higher-value items via bank transfer. Always support cash on delivery, which still accounts for 50–75% of Nepali online orders.",
    },
    {
      question: "Can I accept international card payments from Nepal?",
      answer:
        "It is restricted. Stripe and PayPal have limitations for Nepal-registered entities, so verify current eligibility with the provider before promising international card checkout. Many stores handle international sales through bank transfer or a foreign entity instead.",
    },
    {
      question: "Should I build my own store or sell on Daraz?",
      answer:
        "If demand is unproven, start on Daraz and social channels to validate that people buy your product. Build your own store once you know what sells — that way you own the customer relationship and the data, without risking a large upfront build on an untested market.",
    },
  ],
  related: [
    "website-cost-in-nepal",
    "rank-website-google-nepal",
    "mobile-app-development-nepal",
  ],
};
