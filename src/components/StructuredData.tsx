import { useEffect, useMemo } from "react";

interface BlogItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
  datePublished?: string;
  authorName?: string;
}

interface StructuredDataProps {
  type?: "service" | "faq" | "webpage" | "collection";
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  blogItems?: BlogItem[];
}

const BASE_URL = "https://www.roiblueprint.com";

function absUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, BASE_URL).toString();
  } catch {
    return undefined;
  }
}

export default function StructuredData({
  type,
  pageTitle,
  pageDescription,
  pageUrl,
  faqItems,
  blogItems
}: StructuredDataProps) {
  // Optional: SERVICE schema (only on service pages)
  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "R&D Tax Credit Consulting",
      provider: {
        "@type": "Organization",
        name: "ROI Blueprint",
        url: "https://www.roiblueprint.com/"
      },
      areaServed: "US",
      description:
        "Comprehensive R&D tax credit consulting services for healthcare and ABA practices, including documentation, compliance, and operational optimization."
    }),
    []
  );

  // Optional: FAQ schema (only when faqItems exist and the page contains visible Q&A)
  const faqSchema = useMemo(() => {
    if (!faqItems?.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }, [faqItems]);

  // Optional: WebPage schema
  const webpageSchema = useMemo(() => {
    const url = absUrl(pageUrl);
    if (!url) return null;

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle || "ROI Blueprint",
      description:
        pageDescription ||
        "Healthcare R&D tax credit consultants helping practices document innovation and improve operations",
      url,
      publisher: {
        "@type": "Organization",
        name: "ROI Blueprint",
        logo: {
          "@type": "ImageObject",
          url: "https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png"
        }
      }
    };
  }, [pageUrl, pageTitle, pageDescription]);

  // ✅ CollectionPage + ItemList (for /resources)
  const collectionSchema = useMemo(() => {
    const url = absUrl(pageUrl);
    if (!url) return null;

    const items = (blogItems || [])
      .filter((i) => i?.name && i?.url)
      .map((item, idx) => {
        const itemUrl = absUrl(item.url);
        const imageUrl = absUrl(item.image);

        const listItem: any = {
          "@type": "ListItem",
          position: idx + 1,
          url: itemUrl || undefined,
          item: {
            "@type": "Article",
            headline: item.name,
            url: itemUrl || undefined
          }
        };

        if (item.description) listItem.item.description = item.description;
        if (imageUrl) listItem.item.image = imageUrl;
        if (item.datePublished) listItem.item.datePublished = item.datePublished;
        if (item.authorName) {
          listItem.item.author = { "@type": "Person", name: item.authorName };
        }

        return listItem;
      });

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageTitle || "Resources & Expert Insights",
      description:
        pageDescription ||
        "Free R&D tax credit guides, healthcare practice optimization resources, and expert insights.",
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "ROI Blueprint",
        url: "https://www.roiblueprint.com/"
      },
      publisher: {
        "@type": "Organization",
        name: "ROI Blueprint",
        logo: {
          "@type": "ImageObject",
          url: "https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png"
        }
      },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: items.length,
        itemListElement: items
      }
    };
  }, [pageUrl, pageTitle, pageDescription, blogItems]);

  const { scriptId, schema } = useMemo(() => {
    switch (type) {
      case "service":
        return { scriptId: "structured-data-service", schema: serviceSchema };
      case "faq":
        return { scriptId: "structured-data-faq", schema: faqSchema };
      case "webpage":
        return { scriptId: "structured-data-webpage", schema: webpageSchema };
      case "collection":
        return { scriptId: "structured-data-collection", schema: collectionSchema };
      default:
        return { scriptId: "", schema: null };
    }
  }, [type, serviceSchema, faqSchema, webpageSchema, collectionSchema]);

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
