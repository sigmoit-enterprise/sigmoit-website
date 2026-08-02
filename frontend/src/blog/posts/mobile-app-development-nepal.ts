import type { BlogPost } from "../types";

/** Service intent: "mobile app development Nepal" / "app cost Nepal". */
export const post: BlogPost = {
  slug: "mobile-app-development-nepal",
  title: "Mobile App Development in Nepal: Cost & Timeline",
  description:
    "What it costs to build a mobile app in Nepal, how to choose between native and cross-platform, realistic timelines, and the app store steps Nepali businesses trip over.",
  datePublished: "2026-06-24",
  dateModified: "2026-08-02",
  author: "Prasun Rai",
  category: "Mobile",
  keywords: [
    "mobile app development Nepal",
    "app development cost Nepal",
    "Flutter development Nepal",
    "React Native developers Nepal",
    "Android app development Nepal",
    "iOS app development Nepal",
  ],
  image: "/tools-technology/android-character-symbol.png",
  imageAlt: "Mobile application development at SigmoIT",
  excerpt:
    "Most businesses in Nepal that want an app don't need one — they need a fast mobile website. For the ones that genuinely do, here's what it costs and how long it takes.",
  body: [
    {
      type: "p",
      text: "Let's start with the advice that costs us money: most businesses asking for a mobile app would be better served by a fast, well-built mobile website. Apps require installation, which is a significant barrier, and they need continuous maintenance as iOS and Android release breaking changes each year.",
    },
    {
      type: "p",
      text: "An app makes sense when you need at least one of these:",
    },
    {
      type: "ul",
      items: [
        "Push notifications as a core part of the product, not an afterthought.",
        "Offline functionality — genuinely important in parts of Nepal with unreliable connectivity.",
        "Device hardware: camera-driven workflows, GPS tracking, Bluetooth, biometrics.",
        "Repeat daily usage, where the home-screen icon is worth the install friction.",
        "Field staff tooling, where you control the devices and can mandate installation.",
      ],
    },
    {
      type: "p",
      text: "If none of those apply, spend the budget on a fast website and marketing instead. You'll reach more people for less.",
    },
    {
      type: "h2",
      text: "Native versus cross-platform",
      id: "native-vs-cross-platform",
    },
    {
      type: "table",
      head: ["Approach", "Best for", "Cost impact"],
      rows: [
        ["Flutter", "Most business apps; consistent UI on both platforms", "Baseline — one codebase"],
        ["React Native", "Teams already using React; heavy web code sharing", "Baseline — one codebase"],
        ["Native (Kotlin + Swift)", "Heavy hardware use, demanding performance, platform-specific UX", "1.6–2x — two codebases"],
        ["PWA", "Reach without install; simple use cases", "0.4–0.6x — it's a website"],
      ],
    },
    {
      type: "p",
      text: "For the overwhelming majority of Nepali business apps, Flutter or React Native is the right answer. You write once and ship to both platforms, which roughly halves both build cost and ongoing maintenance. Native is worth the premium only when you're doing something the cross-platform layer genuinely can't.",
    },
    {
      type: "callout",
      title: "Android first is usually correct in Nepal",
      text: "Android holds roughly 90% of the Nepali mobile market. If budget forces a choice, ship Android first and add iOS once the product is proven — unless your customers are specifically the affluent urban segment where iPhone share is much higher.",
    },
    {
      type: "h2",
      text: "What apps cost in Nepal",
      id: "app-costs",
    },
    {
      type: "table",
      caption: "Mobile app development costs in Nepal, 2026 (NPR)",
      head: ["App type", "Range", "Timeline"],
      rows: [
        ["Simple app (content, forms, no backend)", "Rs. 2,50,000 – 5,00,000", "6–10 weeks"],
        ["Standard app (accounts, backend, payments)", "Rs. 5,00,000 – 12,00,000", "3–5 months"],
        ["Complex app (real-time, maps, multi-role)", "Rs. 12,00,000 – 30,00,000+", "5–9 months"],
        ["Delivery / ride-hailing style platform", "Rs. 20,00,000 – 50,00,000+", "6–12 months"],
        ["Annual maintenance", "15–20% of build cost / year", "Ongoing"],
      ],
    },
    {
      type: "p",
      text: "That maintenance line is not optional and it's the one businesses forget. Apple and Google each ship breaking platform changes annually; an unmaintained app stops working within about eighteen months and eventually gets delisted.",
    },
    {
      type: "h2",
      text: "What drives the cost",
      id: "cost-drivers",
    },
    {
      type: "ol",
      items: [
        "User accounts and roles. Authentication, password reset, permissions and admin tooling are a substantial chunk of any app.",
        "Backend and API. The app is the visible part; the server, database and admin panel behind it are often the larger build.",
        "Payments. Same gateway integration work as web, plus platform rules — Apple takes a cut of digital goods sold in-app.",
        "Real-time features. Live tracking, chat and notifications need infrastructure that idle apps don't.",
        "Offline sync. Genuinely hard to do correctly, and the cost surprises people. Budget properly if you need it.",
        "Design. A custom-designed app costs more than a stock-component one, and in a crowded category it's usually worth it.",
      ],
    },
    {
      type: "h2",
      text: "App store realities",
      id: "app-store",
    },
    {
      type: "ul",
      items: [
        "Google Play: $25 one-time developer registration. Review typically takes a few days.",
        "Apple App Store: $99 per year. Review is stricter, and rejections on first submission are common — budget an extra one to two weeks.",
        "Apple requires a real privacy policy URL and accurate data-collection disclosures. Prepare these early rather than at submission.",
        "Nepali businesses often need to sort out a company developer account rather than a personal one. Start that paperwork at the beginning of the project, not the end.",
        "App Store Optimisation matters: title, keywords, screenshots and description drive install rate the same way SEO drives clicks.",
      ],
    },
    {
      type: "h2",
      text: "Don't forget the website",
      id: "dont-forget-web",
    },
    {
      type: "p",
      text: "Apps are invisible to Google. Nobody discovers your app by searching the web unless you have web pages that rank and point to it. Every app needs a landing page with proper SEO, a privacy policy, support contact and store links — otherwise your only discovery channel is paid ads.",
    },
    {
      type: "quote",
      text: "Building the app is half the project. Getting it installed is the other half, and it's the half most budgets forget to fund.",
    },
    {
      type: "h2",
      text: "How we work",
      id: "how-we-work",
    },
    {
      type: "p",
      text: "SigmoIT builds cross-platform mobile apps with Flutter and React Native, backed by Node and PostgreSQL APIs, with the admin panel and web presence built alongside. We'll tell you honestly if we think a mobile website would serve you better — we'd rather build the right thing than the bigger thing.",
    },
  ],
  faqs: [
    {
      question: "How much does mobile app development cost in Nepal?",
      answer:
        "A simple app costs Rs. 2,50,000 to Rs. 5,00,000, a standard app with accounts, a backend and payments runs Rs. 5,00,000 to Rs. 12,00,000, and complex apps with real-time features start around Rs. 12,00,000. Annual maintenance is typically 15–20% of the build cost.",
    },
    {
      question: "Should I build with Flutter or React Native in Nepal?",
      answer:
        "Either works well and both roughly halve cost versus native by sharing one codebase. Choose Flutter for consistent UI across platforms, or React Native if your team already works in React and you want to share code with a web app. Native Kotlin and Swift is worth the 1.6–2x premium only for heavy hardware or performance demands.",
    },
    {
      question: "Should I launch on Android or iOS first in Nepal?",
      answer:
        "Android first in almost all cases, since it holds roughly 90% of the Nepali mobile market. The exception is if you specifically target affluent urban users, where iPhone share is considerably higher.",
    },
    {
      question: "How long does it take to build an app in Nepal?",
      answer:
        "Six to ten weeks for a simple app, three to five months for a standard app with a backend and payments, and five to nine months for complex apps. Add one to two weeks for Apple App Store review, where first-submission rejections are common.",
    },
    {
      question: "Do I need a website if I have a mobile app?",
      answer:
        "Yes. Apps are invisible to Google, so a landing page that ranks is often the main organic discovery channel for installs. Apple and Google also require a reachable privacy policy URL and support contact, which normally live on your website.",
    },
  ],
  related: [
    "website-cost-in-nepal",
    "hire-offshore-developers-nepal",
    "ecommerce-website-development-nepal",
  ],
};
