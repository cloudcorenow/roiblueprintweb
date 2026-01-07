import { useEffect, useMemo } from "react";

interface BlogItem {
  name: string;
  url: string; // can be absolute or path
  image?: string; // absolute or path
  description?: string;
  datePublished?: string; // ISO date recommended
  authorName?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: "service" | "faq" | "webpage" | "collection" | "article";

  pageTitle?: string;
  pageDescription?: string;

  /**
   * Prefer a path like "/" or "/resources".
   * If a full URL is passed, it will be normalized to the canonical host.
   */
  pageUrl?: string;

  faqItems?: Array<{ question: string; answer: string }>;
  blogItems?: BlogItem[];
  breadcrumbs?: BreadcrumbItem[];

  // For article type
  articleTitle?: string;
  articleDescription?: string;
  articleImage?: string;
  articleDatePublished?: string;
  articleDateModified?: string;
  articleAuthor?: string;

  /**
   * Production defaults:
   * - Use a single canonical host everywhere (www)
   * - Choose one trailing slash policy and stick to it (match your sitemap)
   */
  trailingSlash?: "always" | "never" | "ignore"; // default "always"

  /**
   * Optional: allow a stable instance key if multiple StructuredData components
   * with the same `type` could appear on the same page (rare, but safe).
   */
  instanceKey?: string;
}

// ✅ Must match SEO.tsx canonical host
const BASE_URL = "https://www.roiblueprint.com";

function normalizePath(pathname: string, trailingSlash: "always" | "never" | "ignore") {
  let p = pathname || "/";
  if (!p.startsWith("/")) p = `/${p}`;

  // Strip hash fragments
  p = p.split("#")[0];

  if (trailingSlash === "always") {
    if (p !== "/" && !p.endsWith("/")) p = `${p}/`;
  } else if (trailingSlash === "never") {
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  }

  return p;
}

function absUrl(pathOrUrl: string | undefined, trailingSlash: "always" | "never" | "ignore") {
  if (!pathOrUrl) return undefined;

  // If someone passes a full URL, normalize it back to canonical host
  if (/^https?:\/\//i.test(pathOrUrl)) {
    try {
      const u = new URL(pathOrUrl);
      const normalizedPath = normalizePath(u.pathname || "/", trailingSlash);
      return `${BASE_URL}${normalizedPath}`;
    } catch {
      return undefined;
    }
  }

  // If someone passes a path that might include query params, drop them for schema URLs
  const [rawPath] = pathOrUrl.split("?");
  const normalizedPath = normalizePath(rawPath || "/", trailingSlash);
  return `${BASE_URL}${normalizedPath}`;
}

function absAssetUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${BASE_URL}${p}`;
}

export default function StructuredData({
  type,
  pageTitle,
  pageDescription,
  pageUrl,
  faqItems,
  blogItems,
  breadcrumbs,
  articleTitle,
  articleDescription,
  articleImage,
  articleDatePublished,
  articleDateModified,
  articleAuthor,
  trailingSlash = "always",
  instanceKey
}: StructuredDataProps) {
  const pageAbsUrl = useMemo(() => absUrl(pageUrl, trailingSlash), [pageUrl, trailingSlash]);

  // ✅ Stable IDs help Google connect entities across pages
  const orgId = `${BASE_URL}/#organization`;
  const websiteId = `${BASE_URL}/#website`;
  const pageId = pageAbsUrl ? `${pageAbsUrl}#webpage` : `${BASE_URL}/#webpage`;
  const logoUrl = `${BASE_URL}/roi_blueprint_v2h_w1200.png`;

  /**
   * Site-wide Organization schema (good to include broadly, not only on “about”)
   */
  const organizationSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: "ROI Blueprint",
      url: `${BASE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: logoUrl
      }
      // Optional additions if you have them:
      // sameAs: ["https://www.linkedin.com/company/..."],
      // telephone: "+1-...",
      // email: "info@..."
    }),
    [orgId, logoUrl]
  );

  /**
   * WebSite schema (pairs nicely with Organization)
   */
  const websiteSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: "ROI Blueprint",
      url: `${BASE_URL}/`,
      publisher: { "@id": orgId }
      // Optional SearchAction only if you have on-site search:
      // potentialAction: {
      //   "@type": "SearchAction",
      //   target: `${BASE_URL}/resources?query={search_term_string}`,
      //   "query-input": "required name=search_term_string"
      // }
    }),
    [websiteId, orgId]
  );

  /**
   * WebPage schema (use on indexable pages)
   */
  const webpageSchema = useMemo(() => {
    if (!pageAbsUrl) return null;

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": pageId,
      url: pageAbsUrl,
      name: pageTitle || "ROI Blueprint",
      description:
        pageDescription ||
        "Healthcare R&D tax credit consultants helping practices document innovation and improve operations",
      isPartOf: { "@id": websiteId },
      publisher: { "@id": orgId }
    };
  }, [pageAbsUrl, pageId, pageTitle, pageDescription, websiteId, orgId]);

  /**
   * Service schema (use on service/industry pages)
   */
  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/#service-rd-tax-credit-consulting`,
      serviceType: "R&D Tax Credit Consulting",
      provider: { "@id": orgId },
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      description:
        "Comprehensive R&D tax credit consulting services for healthcare and ABA practices, including documentation, compliance, and operational optimization."
    }),
    [orgId]
  );

  /**
   * FAQPage schema (only when Q&A is visible on the page)
   */
  const faqSchema = useMemo(() => {
    if (!faqItems?.length || !pageAbsUrl) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageAbsUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }, [faqItems, pageAbsUrl]);

  /**
   * BreadcrumbList schema (for navigation hierarchy)
   */
  const breadcrumbSchema = useMemo(() => {
    if (!breadcrumbs?.length) return null;

    const itemListElement = breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: absUrl(crumb.url, trailingSlash)
    }));

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement
    };
  }, [breadcrumbs, trailingSlash]);

  /**
   * Article schema (for blog posts and articles)
   */
  const articleSchema = useMemo(() => {
    if (!articleTitle || !pageAbsUrl) return null;

    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageAbsUrl}#article`,
      headline: articleTitle,
      description: articleDescription || pageDescription,
      url: pageAbsUrl,
      isPartOf: { "@id": websiteId },
      publisher: { "@id": orgId }
    };

    if (articleImage) schema.image = absAssetUrl(articleImage);
    if (articleDatePublished) schema.datePublished = articleDatePublished;
    if (articleDateModified) schema.dateModified = articleDateModified;
    if (articleAuthor) {
      schema.author = {
        "@type": "Person",
        name: articleAuthor
      };
    }

    return schema;
  }, [articleTitle, articleDescription, articleImage, articleDatePublished, articleDateModified, articleAuthor, pageAbsUrl, pageDescription, websiteId, orgId]);

  /**
   * CollectionPage + ItemList (for /resources)
   */
  const collectionSchema = useMemo(() => {
    if (!pageAbsUrl) return null;

    const items = (blogItems || [])
      .filter((i) => i?.name && i?.url)
      .map((item, idx) => {
        const itemUrl = absUrl(item.url, trailingSlash);
        const imageUrl = absAssetUrl(item.image);

        const listItem: Record<string, any> = {
          "@type": "ListItem",
          position: idx + 1,
          url: itemUrl,
          item: {
            "@type": "Article",
            headline: item.name,
            url: itemUrl
          }
        };

        if (item.description) listItem.item.description = item.description;
        if (imageUrl) listItem.item.image = imageUrl;
        if (item.datePublished) listItem.item.datePublished = item.datePublished;
        if (item.authorName) listItem.item.author = { "@type": "Person", name: item.authorName };

        return listItem;
      });

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageAbsUrl}#collection`,
      url: pageAbsUrl,
      name: pageTitle || "Resources & Expert Insights",
      description:
        pageDescription || "Free R&D tax credit guides, healthcare practice optimization resources, and expert insights.",
      isPartOf: { "@id": websiteId },
      publisher: { "@id": orgId },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: items.length,
        itemListElement: items
      }
    };
  }, [pageAbsUrl, pageTitle, pageDescription, blogItems, websiteId, orgId, trailingSlash]);

  /**
   * Choose schema by type.
   * Production improvement: always include Organization + WebSite + (WebPage when available)
   * by using @graph. This builds a consistent entity graph across pages.
   */
  const { scriptId, schema } = useMemo(() => {
    if (!type) return { scriptId: "", schema: null };

    const suffix = instanceKey ? `-${instanceKey}` : "";

    // Base graph elements (safe to include on most pages)
    const graph: any[] = [organizationSchema, websiteSchema];
    if (webpageSchema) graph.push(webpageSchema);
    if (breadcrumbSchema) graph.push(breadcrumbSchema);

    switch (type) {
      case "service":
        graph.push(serviceSchema);
        return {
          scriptId: `structured-data-service${suffix}`,
          schema: { "@context": "https://schema.org", "@graph": graph }
        };

      case "faq":
        if (faqSchema) graph.push(faqSchema);
        return {
          scriptId: `structured-data-faq${suffix}`,
          schema: { "@context": "https://schema.org", "@graph": graph }
        };

      case "webpage":
        return {
          scriptId: `structured-data-webpage${suffix}`,
          schema: { "@context": "https://schema.org", "@graph": graph }
        };

      case "collection":
        if (collectionSchema) graph.push(collectionSchema);
        return {
          scriptId: `structured-data-collection${suffix}`,
          schema: { "@context": "https://schema.org", "@graph": graph }
        };

      case "article":
        if (articleSchema) graph.push(articleSchema);
        return {
          scriptId: `structured-data-article${suffix}`,
          schema: { "@context": "https://schema.org", "@graph": graph }
        };

      default:
        return { scriptId: "", schema: null };
    }
  }, [
    type,
    instanceKey,
    organizationSchema,
    websiteSchema,
    webpageSchema,
    serviceSchema,
    faqSchema,
    collectionSchema,
    articleSchema,
    breadcrumbSchema
  ]);

  useEffect(() => {
    if (!schema || !scriptId) return;

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [schema, scriptId]);

  return null;
}
