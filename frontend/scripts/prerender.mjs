/**
 * Build-time prerenderer.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For every public route it renders real HTML, injects the route's head tags
 * and JSON-LD, and writes dist/<route>/index.html. It also emits sitemap.xml
 * and robots.txt from the same route registry, so the three can never drift.
 *
 * Why this exists: without it the site ships an empty <div id="root">, and
 * crawlers that don't run JavaScript — including every social scraper — index
 * a blank page.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const distDir = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const rawTemplate = readFileSync(join(distDir, "index.html"), "utf-8");

/**
 * Remove the fallback <title> and <meta name="description"> from the template.
 *
 * These must go before the per-route tags are injected: both appear earlier in
 * <head> than the injected ones, and crawlers honour the *first* occurrence —
 * so leaving them in would silently give all 12 pages the same title.
 */
const template = rawTemplate
  .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
  .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/i, "");

if (/<title>/i.test(template)) {
  throw new Error("Fallback <title> was not stripped from the template");
}

const { render, ROUTES, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

/** "/" -> dist/index.html; "/blog/x" -> dist/blog/x/index.html */
function outputPath(routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  return join(distDir, routePath.replace(/^\//, ""), "index.html");
}

let rendered = 0;
const failures = [];

for (const route of ROUTES) {
  try {
    const { appHtml, head } = render(route.path);

    const html = template
      // Inject per-route head tags just before </head>.
      .replace("</head>", `  ${head}\n  </head>`)
      // Replace the empty root with the rendered markup, and flag it so the
      // client hydrates instead of re-rendering from scratch.
      .replace(
        /<div id="root"([^>]*)><\/div>/,
        `<div id="root"$1 data-prerendered="">${appHtml}</div>`,
      );

    if (!html.includes("data-prerendered")) {
      throw new Error(
        'Could not find <div id="root"></div> in index.html template',
      );
    }

    const file = outputPath(route.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, "utf-8");
    rendered += 1;
    console.log(`  prerendered  ${route.path}`);
  } catch (error) {
    failures.push({ path: route.path, error });
    console.error(`  FAILED       ${route.path}: ${error.message}`);
  }
}

/* -------------------------------------------------- 404 + admin app shell */

// A real 404 page. Vercel serves this with a 404 status for unknown paths, so
// Google sees a hard 404 instead of a soft one (homepage content at a dead URL,
// which Google penalises as a duplicate).
{
  const { appHtml, head } = render("/__not-found__");
  const html = template
    .replace("</head>", `  ${head}\n  </head>`)
    .replace(
      /<div id="root"([^>]*)><\/div>/,
      `<div id="root"$1 data-prerendered="">${appHtml}</div>`,
    );
  writeFileSync(join(distDir, "404.html"), html, "utf-8");
  console.log("  404.html     written");
}

// The admin panel is a private SPA. It must NOT get the prerendered homepage
// markup — hydration would mismatch — so it gets the bare template plus an
// explicit noindex.
{
  const html = template.replace(
    "</head>",
    '  <title>Admin | SigmoIT</title>\n    <meta name="robots" content="noindex, nofollow" />\n  </head>',
  );
  writeFileSync(join(distDir, "admin.html"), html, "utf-8");
  console.log("  admin.html   written");
}

/* ---------------------------------------------------------------- sitemap */

const indexable = ROUTES.filter((route) => !route.noindex);

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((route) => {
    const loc = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : "",
      route.changefreq ? `    <changefreq>${route.changefreq}</changefreq>` : "",
      route.priority !== undefined
        ? `    <priority>${route.priority.toFixed(1)}</priority>`
        : "",
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  }),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
console.log(`  sitemap.xml  ${indexable.length} urls`);

/* ------------------------------------------------------------- robots.txt */

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Admin panel holds no public content and must never be indexed.",
  "Disallow: /admin",
  "Disallow: /admin/",
  "",
  "# Block API responses from being treated as pages.",
  "Disallow: /api/",
  "",
  "# AI crawlers that drive referral traffic are welcome.",
  "User-agent: GPTBot",
  "Allow: /",
  "",
  "User-agent: PerplexityBot",
  "Allow: /",
  "",
  "User-agent: ClaudeBot",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

writeFileSync(join(distDir, "robots.txt"), robots, "utf-8");
console.log("  robots.txt   written");

/* ------------------------------------------------------------------ tidy */

if (existsSync(ssrDir)) rmSync(ssrDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`\nPrerender failed for ${failures.length} route(s).`);
  process.exit(1);
}

console.log(`\nPrerendered ${rendered} routes.`);
