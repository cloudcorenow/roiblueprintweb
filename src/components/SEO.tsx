import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;

  ogImage?: string; // can be "/path.png" OR "https://..."
  ogType?: string;

  twitterCard?: string;

  /**
   * Preferred: pass a path like "/" or "/contact" (optionally with trailing slash).
   * If a full URL is accidentally passed, we will normalize it back to the canonical host.
   */
  canonicalUrl?: string;

  // Optional: for admin/login pages, etc.
  noIndex?: boolean;
  noFollow?: boolean;

  /**
   * Production defaults:
   * - Canonicals should NOT include query params (utm, gclid, etc.)
   * - Pick one trailing-slash policy and enforce it consistently.
   */
  includeQueryInCanonical?: boolean; // default false
  trailingSlash?: "always" | "never" | "ignore"; // default "never"
}

export default function SEO({
  title = "ROI Blueprint - Healthcare R&D Tax Credit Consultants",
  description = "Transform your healthcare practice through documented R&D activities. ROI Blueprint helps medical and ABA practices optimize operations and qualify for federal and state tax credits.",
  keywords = "R&D tax credits, healthcare tax credits, medical practice optimization, ABA therapy, research and development, IRS Section 41, healthcare consulting, practice management",
  ogImage = "/roi_blueprint_v2h_w1200.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noIndex = false,
  noFollow = false,
  includeQueryInCanonical = false,
  trailingSlash = "never"
}: SEOProps) {
  // ✅ Single canonical host everywhere to avoid www/non-www duplication.
  const baseUrl = "https://www.roiblueprint.com";

  const fullTitle = title.includes("ROI Blueprint") ? title : `${title} | ROI Blueprint`;

  const normalizePath = (pathname: string) => {
    if (!pathname) return "/";
    // Ensure leading slash
    let p = pathname.startsWith("/") ? pathname : `/${pathname}`;

    // Strip hash fragments if they exist (shouldn't be in canonicals)
    p = p.split("#")[0];

    // Optionally enforce trailing slash policy
    if (trailingSlash === "always") {
      if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
    } else if (trailingSlash === "never") {
      if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    }

    return p;
  };

  const buildCanonical = (input?: string) => {
    if (!input) return baseUrl;

    // If a full URL was provided, normalize it back to canonical host
    if (/^https?:\/\//i.test(input)) {
      try {
        const u = new URL(input);
        const path = normalizePath(u.pathname || "/");
        const q = includeQueryInCanonical ? u.search : "";
        return `${baseUrl}${path}${q}`;
      } catch {
        return baseUrl;
      }
    }

    // Input is a path (maybe missing leading slash, maybe includes query)
    const [rawPath, rawQuery] = input.split("?");
    const path = normalizePath(rawPath || "/");
    const q = includeQueryInCanonical && rawQuery ? `?${rawQuery}` : "";
    return `${baseUrl}${path}${q}`;
  };

  const url = buildCanonical(canonicalUrl);

  const resolveImageUrl = (img: string) => {
    if (!img) return undefined;
    if (/^https?:\/\//i.test(img)) return img;
    const p = img.startsWith("/") ? img : `/${img}`;
    return `${baseUrl}${p}`;
  };

  useEffect(() => {
    console.log('[SEO Component] Running useEffect');
    console.log('[SEO Component] Canonical URL input:', canonicalUrl);
    console.log('[SEO Component] Final URL:', url);

    document.title = fullTitle;

    const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Basic
    upsertMeta("name", "description", description);
    // NOTE: Google ignores meta keywords; harmless but not relied upon.
    upsertMeta("name", "keywords", keywords);

    // Robots
    const robots = [noIndex ? "noindex" : "index", noFollow ? "nofollow" : "follow"].join(", ");
    upsertMeta("name", "robots", robots);

    // Open Graph
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", "ROI Blueprint");

    const ogImg = resolveImageUrl(ogImage);
    if (ogImg) {
      upsertMeta("property", "og:image", ogImg);
      upsertMeta("property", "og:image:alt", "ROI Blueprint");
    }

    // Twitter (Twitter uses name="", not property="")
    upsertMeta("name", "twitter:card", twitterCard);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    const twImg = resolveImageUrl(ogImage);
    if (twImg) {
      upsertMeta("name", "twitter:image", twImg);
      upsertMeta("name", "twitter:image:alt", "ROI Blueprint");
    }

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    console.log('[SEO Component] Existing canonical element:', canonicalEl);
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
      console.log('[SEO Component] Created new canonical element');
    }
    canonicalEl.setAttribute("href", url);
    console.log('[SEO Component] Set canonical href to:', url);
    console.log('[SEO Component] Canonical element now in DOM:', document.querySelector('link[rel="canonical"]'));
  }, [
    fullTitle,
    description,
    keywords,
    ogImage,
    ogType,
    twitterCard,
    url,
    noIndex,
    noFollow
  ]);

  return null;
}
