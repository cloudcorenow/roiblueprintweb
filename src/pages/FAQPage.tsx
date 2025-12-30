import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

function FAQAccordion({
  faqs
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="card border border-neutral-200 hover:border-primary-400 transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left gap-4"
          >
            <h3 className="text-lg font-semibold text-neutral-800">
              {faq.question}
            </h3>
            <ChevronDown
              className={`w-6 h-6 text-primary-600 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="mt-4">
              <p className="text-neutral-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How are you different from tax credit firms?",
      answer:
        "We're R&D consultants, not tax consultants. We help healthcare practices optimize operations, test innovative approaches, and document R&D work as it happens."
    },
    {
      question: "What kind of practices benefit from R&D work?",
      answer:
        "Practices that want to innovate, build new service lines, improve protocols, or develop technology solutions benefit most from R&D engagement."
    },
    {
      question: "What about tax benefits?",
      answer:
        "Properly documented R&D work may qualify for federal and state tax benefits. Innovation comes first; potential tax benefits are a bonus."
    },
    {
      question: "How much does R&D consulting cost?",
      answer:
        "Pricing depends on project scope and complexity. Investment details are shared after assessing your practice and defining R&D initiatives."
    },
    {
      question: "What if the IRS audits us?",
      answer:
        "Our Enrolled Agent can represent you before the IRS. Documentation is built to IRS standards from day one."
    },
    {
      question: "How long until we see results?",
      answer:
        "Research begins immediately. Most practices see meaningful improvements within 30–90 days."
    },
    {
      question: "Do we need to change accountants?",
      answer:
        "No. We provide complete documentation and credit calculations for your CPA to file."
    },
    {
      question: "What makes your team different?",
      answer:
        "We combine clinical expertise with tax and technology specialists, allowing us to identify opportunities others miss."
    },
    {
      question: "Do you work nationwide?",
      answer:
        "Yes. We serve healthcare practices across the United States."
    },
    {
      question: "What size practice do you work with?",
      answer:
        "Established practices with $1M+ revenue are ideal for ROI Blueprint™. Smaller practices may start with ROI Roadmap™."
    },
    {
      question: "How is documentation handled?",
      answer:
        "Our HIPAA-compliant platform captures R&D documentation in real time and produces IRS-ready reports."
    },
    {
      question: "What happens after the first year?",
      answer:
        "R&D continues year after year as new innovation projects are identified and documented."
    }
  ];

  return (
    <div>
      {/* SEO */}
      <SEO
        title="Frequently Asked Questions | Healthcare R&D Tax Credits"
        description="Get answers to common questions about R&D tax credits for healthcare practices. Learn about eligibility, documentation, pricing, and audit defense."
        keywords="R&D tax credit FAQ, healthcare R&D questions, medical practice tax credit answers, ABA therapy R&D FAQ"
        canonicalUrl="/faq"
      />

      {/* Structured Data */}
      <StructuredData
        type="webpage"
        pageTitle="Frequently Asked Questions | Healthcare R&D Tax Credits"
        pageDescription="Answers to common questions about healthcare R&D tax credits, documentation, eligibility, and ROI Blueprint services."
        pageUrl="/faq"
      />
      <StructuredData type="faq" faqItems={faqs} />

      {/* Hero */}
      <section
        className="hero"
        style={{
          paddingTop: "6rem",
          background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h1>Your R&D Questions, Answered</h1>
            <p className="text-xl">
              Everything you need to know about healthcare R&D tax credits and
              our methodology
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="card text-center max-w-3xl mx-auto">
            <h2 className="mb-6">Still Have Questions?</h2>
            <p className="text-xl text-neutral-600 mb-10">
              Schedule a discovery call to discuss your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="btn"
                style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
              >
                Get Prequalified
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/services"
                className="btn"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  border: "2px solid #89c726"
                }}
              >
                Learn About Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
