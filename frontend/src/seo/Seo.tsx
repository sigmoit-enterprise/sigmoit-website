/**
 * Keeps <head> correct during client-side navigation.
 *
 * The prerenderer writes the *initial* head for each route, which is what
 * crawlers read. This component handles what happens after: when a user clicks
 * through the SPA, no new document is fetched, so title/canonical/OG would
 * otherwise stay frozen on the entry page. Social crawlers never execute this —
 * they rely entirely on the prerendered HTML — so both layers are required.
 *
 * Tags written here are marked data-seo so they can be replaced cleanly without
 * disturbing anything the prerenderer or a third-party script added.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "./routes";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "./siteConfig";

const MANAGED = "data-seo";

function setMeta(
  attr: "name" | "property",
  key: string,
  content: string | undefined,
) {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    if (existing?.hasAttribute(MANAGED)) existing.remove();
    return;
  }
  const tag = existing ?? document.createElement("meta");
  tag.setAttribute(attr, key);
  tag.setAttribute("content", content);
  tag.setAttribute(MANAGED, "");
  if (!existing) document.head.appendChild(tag);
}

function setLink(rel: string, href: string) {
  const existing = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );
  const tag = existing ?? document.createElement("link");
  tag.setAttribute("rel", rel);
  tag.setAttribute("href", href);
  tag.setAttribute(MANAGED, "");
  if (!existing) document.head.appendChild(tag);
}

function setJsonLd(data: unknown) {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
    .forEach((node) => node.remove());
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute(MANAGED, "");
  // Escaping < prevents a nested </script> in any content from closing the tag.
  script.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
  document.head.appendChild(script);
}

export const Seo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const canonical = absoluteUrl(pathname);
    const image = absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE);

    document.title = meta.title;
    document.documentElement.lang = "en";

    setMeta("name", "description", meta.description);
    setMeta(
      "name",
      "keywords",
      meta.keywords.length ? meta.keywords.join(", ") : undefined,
    );
    setMeta(
      "name",
      "robots",
      meta.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    setLink("canonical", canonical);

    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", meta.type ?? "website");
    setMeta(
      "property",
      "article:published_time",
      meta.type === "article" ? meta.publishedTime : undefined,
    );
    setMeta(
      "property",
      "article:modified_time",
      meta.type === "article" ? meta.modifiedTime : undefined,
    );
    setMeta(
      "property",
      "article:section",
      meta.type === "article" ? meta.section : undefined,
    );
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);

    setJsonLd(meta.jsonLd);
  }, [pathname]);

  return null;
};

export default Seo;
