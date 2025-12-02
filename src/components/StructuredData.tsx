import { useEffect } from "react";

interface StructuredDataProps {
  type?: "organization" | "service" | "faq" | "article" | "webpage" | "breadcrumb";
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ROI Blueprint",
    "alternateName": "ROI Blueprint - Research Optimize Innovate",
    "description": "Healthcare R&D tax credit consultants helping medical and ABA practices optimize operations and qualify for federal and state R&D tax credits",
    "url": "https://roiblueprint.com",
    "logo": "https://roiblueprint.com/roi_blueprint_v2h_w1200.png",
    "image": "https://roiblueprint.com/roi_blueprint_v2h_w1200.png",
    "telephone": "+1-855-764-2583",
    "email": "marketing@roiblueprint.com",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "FL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.9506",
      "longitude": "-82.4572"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "R&D Tax Credit Consulting",
      "Healthcare Practice Optimization",
      "Research and Development Documentation",
      "IRS Section 41 Compliance",
      "Federal and State Tax Credit Services"
    ],
    "knowsAbout": [
      "R&D Tax Credits",
      "Healthcare Practice Management",
      "IRS Section 41",
      "Medical Practice Optimization",
      "ABA Therapy Services",
      "Clinical Protocol Development",
      "Healthcare Technology Integration"
    ],
    "sameAs": [
      "https://www.facebook.com/roiblueprint",
      "https://www.linkedin.com/company/roiblueprint"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "120"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "R&D Tax Credit Consulting",
    "provider": {
      "@type": "ProfessionalService",
      "name": "ROI Blueprint",
      "url": "https://roiblueprint.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Comprehensive R&D tax credit services for healthcare practices including documentation, IRS compliance, and operational optimization",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Contact for pricing",
      "url": "https://roiblueprint.com/services"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "R&D Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full ROI Blueprint Services",
            "description": "Complete R&D consulting engagement for established healthcare practices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ROI Roadmap Consultation",
            "description": "Strategic consultation for smaller practices exploring R&D opportunities"
          }
        }
      ]
    }
  };

  const faqSchema = faqItems ? {
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
  } : null;

  const webpageSchema = pageUrl ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle || "ROI Blueprint",
    "description": pageDescription || "Healthcare R&D tax credit consultants",
    "url": `https://roiblueprint.com${pageUrl}`,
    "publisher": {
      "@type": "Organization",
      "name": "ROI Blueprint",
      "logo": {
        "@type": "ImageObject",
        "url": "https://roiblueprint.com/roi_blueprint_v2h_w1200.png"
      }
    },
    "breadcrumb": breadcrumbItems ? {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://roiblueprint.com${item.url}`
      }))
    } : undefined
  } : null;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ROI Blueprint",
    "image": "https://roiblueprint.com/roi_blueprint_v2h_w1200.png",
    "telephone": "+1-855-764-2583",
    "email": "marketing@roiblueprint.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "FL"
    },
    "url": "https://roiblueprint.com",
    "priceRange": "$$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ]
  };

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
        return [organizationSchema, localBusinessSchema];
    }
  };

  useEffect(() => {
    const scriptId = "structured-data-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schemaData = getSchema();
    script.textContent = JSON.stringify(schemaData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, pageTitle, pageDescription, pageUrl, breadcrumbItems, faqItems]);

  return null;
}
