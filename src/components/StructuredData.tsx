import { useEffect } from "react";

interface StructuredDataProps {
  type?: "organization" | "service" | "faq" | "article";
}

export default function StructuredData({ type = "organization" }: StructuredDataProps) {
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
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "R&D Tax Credit Consulting",
    "provider": {
      "@type": "ProfessionalService",
      "name": "ROI Blueprint"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "description": "Comprehensive R&D tax credit services for healthcare practices including documentation, IRS compliance, and operational optimization",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Contact for pricing"
    }
  };

  const getSchema = () => {
    switch (type) {
      case "service":
        return serviceSchema;
      case "organization":
      default:
        return organizationSchema;
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

    script.textContent = JSON.stringify(getSchema());

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type]);

  return null;
}
