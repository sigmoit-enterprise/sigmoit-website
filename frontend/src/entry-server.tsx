/**
 * Server entry used only at build time by scripts/prerender.mjs.
 *
 * This is what makes the site indexable: every public route is rendered to real
 * HTML with its content, head tags and JSON-LD baked in, so crawlers that don't
 * execute JavaScript (and social scrapers, which never do) see a complete page.
 * The client then hydrates the same markup.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// React Router 7 exports StaticRouter from the root package; the old
// "react-router-dom/server" subpath no longer exists.
import { StaticRouter } from "react-router";
import App from "./App";
import { getRouteMeta, ROUTES } from "./seo/routes";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./seo/siteConfig";

/** Escapes text destined for an HTML attribute value. */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Builds the full <head> content for a route. Marked data-seo to match what the
 * client-side Seo component manages, so hydration replaces rather than
 * duplicates these tags.
 */
export function renderHead(pathname: string): string {
  const meta = getRouteMeta(pathname);
  const canonical = absoluteUrl(pathname);
  const image = absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE);
  const robots = meta.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const tags = [
    `<title data-seo>${escapeAttr(meta.title)}</title>`,
    `<meta data-seo name="description" content="${escapeAttr(meta.description)}" />`,
    meta.keywords.length
      ? `<meta data-seo name="keywords" content="${escapeAttr(meta.keywords.join(", "))}" />`
      : "",
    `<meta data-seo name="robots" content="${robots}" />`,
    `<link data-seo rel="canonical" href="${escapeAttr(canonical)}" />`,

    `<meta data-seo property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta data-seo property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta data-seo property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta data-seo property="og:type" content="${meta.type ?? "website"}" />`,
    meta.type === "article"
      ? `<meta data-seo property="article:published_time" content="${escapeAttr(meta.publishedTime ?? "")}" />`
      : "",
    meta.type === "article" && meta.modifiedTime
      ? `<meta data-seo property="article:modified_time" content="${escapeAttr(meta.modifiedTime)}" />`
      : "",
    meta.type === "article" && meta.section
      ? `<meta data-seo property="article:section" content="${escapeAttr(meta.section)}" />`
      : "",
    `<meta data-seo property="og:image" content="${escapeAttr(image)}" />`,
    `<meta data-seo property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta data-seo property="og:locale" content="en_US" />`,

    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta data-seo name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta data-seo name="twitter:image" content="${escapeAttr(image)}" />`,

    `<meta name="author" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta name="geo.region" content="NP-P1" />`,
    `<meta name="geo.placename" content="Damak, Jhapa, Nepal" />`,
    `<meta name="geo.position" content="26.6646;87.7009" />`,
    `<meta name="ICBM" content="26.6646, 87.7009" />`,
  ];

  if (meta.jsonLd) {
    // Escaping < prevents any "</script>" inside content from closing the tag.
    const json = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    tags.push(
      `<script data-seo type="application/ld+json">${json}</script>`,
    );
  }

  return tags.filter(Boolean).join("\n    ");
}

export function render(url: string): { appHtml: string; head: string } {
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { appHtml, head: renderHead(url) };
}

/** Re-exported so the prerender script has a single source for the URL list. */
export { ROUTES, SITE_URL };
