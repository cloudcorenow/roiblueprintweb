// src/pages/RDTaxCreditGuidePage.tsx
import React from "react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import RDTaxCreditGuide from "../components/RDTaxCreditGuide";

export default function RDTaxCreditGuidePage() {
  return (
    <div>
      <SEO
        title="Healthcare R&D Tax Credit Guide | ROI Blueprint"
        description="Free guide explaining how healthcare and ABA practices may qualify for federal and state R&D tax credits under IRS Section 41. Learn eligible activities, documentation requirements, and next steps."
        keywords="healthcare R&D tax credit guide, IRS Section 41 healthcare, medical practice R&D credits, ABA therapy R&D credits, R&D documentation guide, healthcare innovation tax incentives"
        canonicalUrl="/guides/rd-tax-credit"
      />

      <StructuredData
        type="webpage"
        pageTitle="Healthcare R&D Tax Credit Guide"
        pageDescription="Free educational guide for healthcare and ABA practices explaining R&D tax credit eligibility, qualified activities, and IRS-compliant documentation."
        pageUrl="/guides/rd-tax-credit"
      />

      <RDTaxCreditGuide />
    </div>
  );
}
