import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title = "ROI Blueprint - Healthcare R&D Tax Credit Consultants",
  description = "Transform your healthcare practice through documented R&D activities. ROI Blueprint helps medical and ABA practices optimize operations and qualify for federal and state tax credits.",
  keywords = "R&D tax credits, healthcare tax credits, medical practice optimization, ABA therapy, research and development, IRS Section 41, healthcare consulting, practice management",
  ogImage = "/roi_blueprint_v2h_w1200.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl
}: SEOProps) {
  const baseUrl = "https://roiblueprint.com";
  const fullTitle = title.includes("ROI Blueprint") ? title : `${title} | ROI Blueprint`;
  const url = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", `${baseUrl}${ogImage}`, true);
    updateMetaTag("og:site_name", "ROI Blueprint", true);

    updateMetaTag("twitter:card", twitterCard, true);
    updateMetaTag("twitter:title", fullTitle, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", `${baseUrl}${ogImage}`, true);

    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute("href", url);
  }, [fullTitle, description, keywords, ogImage, ogType, twitterCard, url, baseUrl]);

  return null;
}
