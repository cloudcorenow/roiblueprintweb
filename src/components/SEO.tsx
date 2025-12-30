import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;

  ogImage?: string;      // can be "/path.png" OR "https://..."
  ogType?: string;

  twitterCard?: string;
  canonicalUrl?: string;

  // Optional: for admin/login pages, etc.
  noIndex?: boolean;
  noFollow?: boolean;
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
  noFollow = false
}: SEOProps) {
  // Use ONE canonical host everywhere to avoid duplicates
  const baseUrl = "https://www.roiblueprint.com";

  const fullTitle = title.includes("ROI Blueprint") ? title : `${title} | ROI Blueprint`;
  const url = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  const resolveImageUrl = (img: string) => {
    if (!img) return undefined;
    if (/^https?:\/\//i.test(img)) return img;
    return `${baseUrl}${img.startsWith("/") ? img : `/${img}`}`;
  };

  useEffect(() => {
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
    upsertMeta("name", "keywords", keywords);

    // Robots
    const robots = [noIndex ? "noindex" : "index", noFollow ? "nofollow" : "follow"].join(", ");
    upsertMeta("name", "robots", robots);

    // Open Graph
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", url);

    const ogImg = resolveImageUrl(ogImage);
    if (ogImg) upsertMeta("property", "og:image", ogImg);

    upsertMeta("property", "og:site_name", "ROI Blueprint");

    // Twitter (IMPORTANT: Twitter uses name="", not property="")
    upsertMeta("name", "twitter:card", twitterCard);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    const twImg = resolveImageUrl(ogImage);
    if (twImg) upsertMeta("name", "twitter:image", twImg);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", url);
  }, [fullTitle, description, keywords, ogImage, ogType, twitterCard, url, noIndex, noFollow]);

  return null;
}
