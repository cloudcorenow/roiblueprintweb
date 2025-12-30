import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Beaker,
  GraduationCap,
  Cpu,
  Cog,
  BarChart3,
  Rocket,
  Shield,
  ChevronDown
} from "lucide-react";
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

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === "ended" || event.data?.ended === true) {
        setIsVideoModalOpen(false);
        setTimeout(() => navigate("/contact"), 300);
      }
    };

    if (isVideoModalOpen) {
      window.addEventListener("message", handleMessage);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isVideoModalOpen, navigate]);

  const faqs = [
    {
      question: "How are you different from tax credit firms?",
      answer:
        "We're R&D consultants, not tax consultants. We help healthcare practices research, test, and optimize new approaches while documenting work that may qualify for R&D tax credits."
    },
    {
      question: "What kind of practices benefit from R&D work?",
      answer:
        "Practices seeking to innovate—new protocols, technology, service lines, or operational models—benefit most from structured R&D engagement."
    },
    {
      question: "What about tax benefits?",
      answer:
        "Properly documented R&D work may qualify for federal and state tax benefits. Innovation comes first; tax benefits are a potential outcome."
    }
  ];

  return (
    <div>
      {/* SEO */}
      <SEO
        title="Healthcare R&D Tax Credit Consultants | Research, Optimize, Innovate"
        description="Transform your healthcare practice through documented R&D. ROI Blueprint helps medical and ABA practices optimize operations while qualifying for $50K-$250K in federal and state R&D tax credits."
        keywords="R&D tax credits healthcare, medical practice R&D, ABA therapy tax credits, healthcare innovation, IRS Section 41, healthcare practice optimization"
        canonicalUrl="/"
      />

      {/* Structured Data */}
      <StructuredData
        type="webpage"
        pageTitle="ROI Blueprint - Healthcare R&D Tax Credit Consultants | Research, Optimize, Innovate"
        pageDescription="Transform your healthcare practice through documented R&D. ROI Blueprint helps medical and ABA practices optimize operations while qualifying for $50K-$250K in federal and state R&D tax credits."
        pageUrl="/"
      />
      <StructuredData type="faq" faqItems={faqs} />

      {/* HERO */}
      <section className="hero pt-24 bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Beaker className="w-4 h-4" />
            <span>Healthcare R&D Consultants</span>
          </div>
          <h1 className="mb-6">
            Research. Optimize. Innovate Your Practice.
          </h1>
          <p className="max-w-3xl mx-auto mb-8">
            We help healthcare practices document innovation, optimize
            operations, and potentially qualify for R&D tax incentives.
          </p>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="btn bg-white/10 border border-white/30"
          >
            How It Works <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
          <div className="text-center mt-8">
            <Link to="/faq" className="btn btn-outline">
              See All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="w-full max-w-6xl h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://customer-mp06svfe1n138f7h.cloudflarestream.com/e37eb2914737729afaba61bed57eb277/iframe?autoplay=true"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-xl"
              title="How It Works"
            />
          </div>
        </div>
      )}
    </div>
  );
}
