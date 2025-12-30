import { useEffect, useMemo } from "react";

interface StructuredDataProps {
  type?: "service" | "faq" | "webpage";
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  breadcrumbItems?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
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
  faqItems
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

  const { scriptId, schema } = useMemo(() => {
    switch (type) {
      case "service":
        return { scriptId: "structured-data-service", schema: serviceSchema };
      case "faq":
        return { scriptId: "structured-data-faq", schema: faqSchema };
      case "webpage":
        return { scriptId: "structured-data-webpage", schema: webpageSchema };
      default:
        return { scriptId: "", schema: null };
    }
  }, [type, serviceSchema, faqSchema, webpageSchema]);

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
  }, [schema, scriptId]);

  return null;
}
