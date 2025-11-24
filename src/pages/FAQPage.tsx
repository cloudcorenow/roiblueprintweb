import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import SEO from "../components/SEO";

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string; }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="card border border-neutral-200 hover:border-primary-400 transition-all duration-300">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left gap-4"
          >
            <h3 className="text-lg font-semibold text-neutral-800">{faq.question}</h3>
            <ChevronDown
              className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How are you different from tax credit firms?",
      answer: "We're R&D consultants, not tax consultants. Tax credit firms look backward and try to claim credits for past work. We help you optimize operations, test innovative approaches, and build better systems right now. We document the R&D work as we do it—which may qualify for tax benefits—but the innovation is the goal. Our Enrolled Agent can support tax filings, but we're here to help you research and optimize, not chase credits."
    },
    {
      question: "What kind of practices benefit from R&D work?",
      answer: "Practices that want to innovate and optimize operations. If you're interested in building new service lines, optimizing protocols, creating unique technology solutions, or testing new operational approaches—we can help. If you just want to run your current practice more efficiently using standard methods, we're probably not the right fit. We're researchers and optimizers who help practices that want to push boundaries."
    },
    {
      question: "What about tax benefits?",
      answer: "Because we document R&D work properly from the start, the projects we work on may qualify for federal and state tax benefits. Our Enrolled Agent calculates potential credit amounts and prepares complete documentation. You receive everything needed to share with your CPA for filing. Actual benefits depend on IRS approval. The innovation comes first; potential tax benefits are a bonus."
    },
    {
      question: "How much does R&D consulting cost?",
      answer: "Our pricing depends on the scope of R&D projects and the complexity of development work. We share specific investment details after we've assessed your practice and designed the project scope. Many practices find the new capabilities and operational improvements justify the investment—with potential tax benefits as an additional ROI factor."
    },
    {
      question: "What if the IRS audits us?",
      answer: "Our Enrolled Agent can represent you if the IRS has questions. We build documentation that meets IRS standards from day one. Unlike tax credit firms that disappear after filing, we work with you long-term and defend the work we document."
    },
    {
      question: "How long until we see results?",
      answer: "Research and discovery begin immediately. Initial optimization projects launch within 30-60 days. Most practices see new capabilities deployed within 90 days. The innovation work is continuous—we're always optimizing, testing, and deploying new approaches. Documentation builds throughout the engagement for potential tax benefit support."
    },
    {
      question: "Do we need to change accountants?",
      answer: "No. We provide complete R&D documentation and credit calculations. Your CPA receives everything needed to file with your tax return. If your CPA has technical questions, our Enrolled Agent can coordinate with them directly—we charge $350/hr for CPA coordination time. Most CPAs don't need much support since the documentation is IRS-compliant and ready to file."
    },
    {
      question: "What makes your team different?",
      answer: "We combine clinical expertise (Registered Nurse, Board Certified Behavior Analyst) with tax and technology specialists. This means we understand both the healthcare realities and IRS requirements. We identify R&D opportunities that generalist firms miss because we know healthcare workflows, clinical protocols, and regulatory requirements firsthand."
    },
    {
      question: "Do you work with practices nationwide?",
      answer: "Yes. While we're based in Florida, we serve healthcare practices across the United States. Our technology platform and remote collaboration tools allow us to work effectively with practices anywhere in the country."
    },
    {
      question: "What size practice do you work with?",
      answer: "Our ROI Blueprint™ program is designed for established practices with $1M+ annual revenue and at least $500K in qualified staff costs. For smaller or growing practices, we offer the ROI Roadmap™—a strategic consultation that prepares you for future R&D implementation."
    },
    {
      question: "How is documentation handled?",
      answer: "Our HIPAA-compliant technology platform automates R&D documentation in real-time. As we implement improvements, the system captures project details, time allocation, and technical uncertainty—all formatted to IRS standards. You receive quarterly reports and an annual documentation package ready for your CPA."
    },
    {
      question: "What happens after the first year?",
      answer: "R&D work is ongoing. Most clients continue year after year because we keep identifying new optimization projects, building new capabilities, and documenting qualifying activities. The continuous improvement approach means you're always innovating and potentially qualifying for credits."
    }
  ];

  return (
    <div>
      <SEO
        title="Frequently Asked Questions | Healthcare R&D Tax Credits"
        description="Get answers to common questions about R&D tax credits for healthcare practices. Learn about eligibility, documentation, pricing, audit defense, and how ROI Blueprint works with your existing CPA."
        keywords="R&D tax credit FAQ, healthcare R&D questions, medical practice tax credit answers, ABA therapy R&D FAQ, how R&D tax credits work healthcare, R&D consulting questions"
        canonicalUrl="/faq"
      />
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h1>Your R&D Questions, Answered</h1>
            <p className="text-xl">
              Everything you need to know about healthcare R&D tax credits, our methodology, and how we help practices innovate
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-6">Common Questions About Our Services</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              We've compiled answers to the most common questions we receive from healthcare practices exploring R&D opportunities.
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="card text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6">Still Have Questions?</h2>
            <p className="text-xl text-neutral-600 mb-10">
              We're here to help. Schedule a discovery call to discuss your specific situation and learn how ROI Blueprint™ can help your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                Get Prequalified
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: 'white', color: '#000', border: '2px solid #89c726' }}>
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
