import { Helmet } from "react-helmet-async";

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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="ROI Blueprint" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
}
