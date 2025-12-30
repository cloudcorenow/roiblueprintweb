import { useEffect } from "react";

interface StructuredDataProps {
  type?: "organization" | "service" | "faq" | "webpage";
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  breadcrumbItems?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
}

export default function StructuredData({
  type = "organization",
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbItems,
  faqItems
}: StructuredDataProps) {

  /* ✅ ORGANIZATION SCHEMA (GLOBAL, SITE-WIDE) */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ROI Blueprint",
    "url": "https://www.roiblueprint.com/",
    "logo": "https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png",
    "description":
      "ROI Blueprint helps healthcare practices optimize operations and document innovation to qualify for federal Research & Development (R&D) tax credits, improve efficiency, and realize financial benefits. Their team of Enrolled Agents, healthcare specialists, and technology experts works with medical, specialty, and ABA practices to implement compliant R&D documentation processes that can unlock significant tax incentives while supporting practice growth and operational excellence.",
    "sameAs": [
      "https://www.facebook.com/roiblueprint",
      "https://www.linkedin.com/company/roiblueprint"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": "+1-855-764-2583",
        "areaServed": "US"
      }
    ]
  };

  /* OPTIONAL: SERVICE SCHEMA (ONLY ON SERVICE PAGES) */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "R&D Tax Credit Consulting",
    "provider": {
      "@type": "Organization",
      "name": "ROI Blueprint",
      "url": "https://www.roiblueprint.com/"
    },
    "areaServed": "US",
    "description":
      "Comprehensive R&D tax credit consulting services for healthcare and ABA practices, including documentation, compliance, and operational optimization."
  };

  /* OPTIONAL: FAQ SCHEMA */
  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    : null;

  /* OPTIONAL: WEBPAGE SCHEMA */
  const webpageSchema = pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": pageTitle || "ROI Blueprint",
        "description":
          pageDescription ||
          "Healthcare R&D tax credit consultants helping practices document innovation and improve operations",
        "url": `https://www.roiblueprint.com${pageUrl}`,
        "publisher": {
          "@type": "Organization",
          "name": "ROI Blueprint",
          "logo": {
            "@type": "ImageObject",
            "url":
              "https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png"
          }
        }
      }
    : null;

  const getSchema = () => {
    switch (type) {
      case "service":
        return serviceSchema;
      case "faq":
        return faqSchema;
      case "webpage":
        return webpageSchema;
      case "organization":
      default:
        return organizationSchema;
    }
  };

  useEffect(() => {
    const scriptId = "structured-data-organization";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(getSchema());

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [type, pageTitle, pageDescription, pageUrl, breadcrumbItems, faqItems]);

  return null;
}
