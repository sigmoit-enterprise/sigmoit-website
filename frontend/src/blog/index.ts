/**
 * Blog registry.
 *
 * Posts are imported statically (not via import.meta.glob) so the prerender
 * script and the sitemap generator can both read the same list under plain
 * Node without a bundler in the loop.
 */
import type { BlogPost } from "./types";

import { post as itCompanyDamak } from "./posts/it-company-in-damak-jhapa";
import { post as websiteCost } from "./posts/website-cost-in-nepal";
import { post as rankOnGoogle } from "./posts/rank-website-google-nepal";
import { post as offshoreDevelopers } from "./posts/hire-offshore-developers-nepal";
import { post as ecommerce } from "./posts/ecommerce-website-development-nepal";
import { post as mobileApps } from "./posts/mobile-app-development-nepal";

/** Newest first — this is the order the listing page renders. */
export const BLOG_POSTS: BlogPost[] = [
  mobileApps,
  ecommerce,
  offshoreDevelopers,
  rankOnGoogle,
  websiteCost,
  itCompanyDamak,
].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

export function relatedPosts(post: BlogPost): BlogPost[] {
  return (post.related ?? [])
    .map(getPost)
    .filter((p): p is BlogPost => Boolean(p) && p!.slug !== post.slug);
}

export const BLOG_CATEGORIES = Array.from(
  new Set(BLOG_POSTS.map((post) => post.category)),
).sort();

export type { BlogPost } from "./types";
