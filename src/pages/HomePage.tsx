import React, { useEffect, useState } from "react";
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

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="card border border-neutral-200 hover:border-primary-400 transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left gap-4"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-neutral-800">{faq.question}</h3>
            <ChevronDown
              className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "mt-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
          </div>
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
      // Close when Cloudflare Stream sends "ended"
      if (event.data && typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data?.event === "ended" || data?.ended === true) {
            setIsVideoModalOpen(false);
            setTimeout(() => navigate("/contact"), 300);
          }
        } catch {
          // ignore non-JSON
        }
      } else if (event.data && typeof event.data === "object") {
        // Some players send objects directly
        const data = event.data as Record<string, unknown>;
        if (data["event"] === "ended" || data["ended"] === true) {
          setIsVideoModalOpen(false);
          setTimeout(() => navigate("/contact"), 300);
        }
      }
    };

    if (isVideoModalOpen) window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isVideoModalOpen, navigate]);

  const focusAreas = [
    {
      icon: Beaker,
      title: "Protocol Research",
      description: "Researching and developing new clinical approaches through testing and iteration"
    },
    {
      icon: GraduationCap,
      title: "Training Innovation",
      description: "Developing and testing new training methodologies for clinical staff"
    },
    {
      icon: Cpu,
      title: "Technology Development",
      description: "Building custom integrations and developing novel technology solutions"
    },
    {
      icon: Cog,
      title: "Process Innovation",
      description: "Researching and testing new operational approaches through experimentation"
    },
    {
      icon: BarChart3,
      title: "Measurement Systems",
      description: "Developing new tools and systems for tracking outcomes and performance"
    },
    {
      icon: Rocket,
      title: "Service Development",
      description: "Researching and launching new service lines through pilot programs"
    }
  ];

  const teamCredentials = [
    {
      image:
        "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/9e2843a0-dfd6-458a-f852-ea9a167d8f00/public",
      title: "Healthcare Expertise",
      description:
        "Our Registered Nurse and Board Certified Behavior Analyst uncover R&D opportunities often overlooked—drawing on firsthand experience inside practices like yours."
    },
    {
      image:
        "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/7c3e0b31-53f3-4802-b087-e517222fae00/public",
      title: "HIPAA-Compliant Technology",
      description:
        "Secure, real-time tracking through software that integrates with your systems—reducing manual work and improving accuracy."
    },
    {
      image:
        "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/835586eb-7296-4bf7-24e2-bd7b7df99a00/public",
      title: "IRS Representation",
      description:
        "Our Enrolled Agent builds audit-ready documentation and can support you if the IRS has questions about your R&D work."
    }
  ];

  const faqs = [
    {
      question: "How are you different from tax credit firms?",
      answer:
        "We’re R&D consultants, not tax consultants. Tax credit firms often look backward and try to claim credits for past work. We help you optimize operations, test innovative approaches, and build better systems now—while documenting qualifying R&D as it happens."
    },
    {
      question: "What kind of practices benefit from R&D work?",
      answer:
        "Practices that want to innovate and optimize operations—building new service lines, improving protocols, developing custom technology, or testing new operational approaches through experimentation."
    },
    {
      question: "What about tax benefits?",
      answer:
        "Because we document R&D properly from the start, many projects may qualify for federal and state R&D tax benefits. We provide complete documentation and credit calculations for your CPA to file. Actual benefits depend on your facts and IRS acceptance."
    },
    {
      question: "What if the IRS audits us?",
      answer:
        "We build documentation that meets IRS standards from day one. Our Enrolled Agent can represent you if questions arise, and we support the work we document."
    },
    {
      question: "Do we need to change accountants?",
      answer:
        "No. We deliver complete R&D documentation and calculations. Your CPA can file with your return, and we can coordinate with them if needed."
    }
  ];

  return (
    <div>
      <SEO
        title="Healthcare R&D Tax Credit Consultants | Research, Optimize, Innovate"
        description="Transform your healthcare practice through documented R&D. ROI Blueprint helps medical and ABA practices optimize operations while qualifying for $50K-$250K in federal and state R&D tax credits."
        keywords="R&D tax credits healthcare, medical practice R&D, ABA therapy tax credits, healthcare innovation, research and development tax incentives, IRS Section 41, healthcare practice optimization"
        canonicalUrl="/"
      />

      {/* ✅ Structured Data (Schema) */}
      <StructuredData
        type="webpage"
        pageTitle="Healthcare R&D Tax Credit Consultants | Research, Optimize, Innovate"
        pageDescription="Transform your healthcare practice through documented R&D. ROI Blueprint helps medical and ABA practices optimize operations while qualifying for $50K-$250K in federal and state R&D tax credits."
        pageUrl="/"
      />
      <StructuredData type="faq" faqItems={faqs.slice(0, 3)} />

      {/* Hero */}
      <section
        className="hero"
        style={{
          paddingTop: "6rem",
          background: `
            linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
            url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Blueprint-Wallpaper-for-Desktop.jpg') center/cover no-repeat
          `
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <Beaker className="w-4 h-4" />
              <span>Healthcare R&D Consultants</span>
            </div>

            <h1>Research. Optimize. Innovate Your Practice.</h1>
            <p>
              We help healthcare practices improve operations through documented R&D initiatives—building better systems
              while capturing work that may qualify for federal and state tax benefits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30"
              >
                How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <Link to="/contact" className="btn" style={{ backgroundColor: "#ade5f8", color: "#004aad" }}>
                Get Prequalified
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: "2px solid #89c726" }}>
                <div className="text-3xl font-bold text-white mb-1">120+</div>
                <div className="text-sm text-white/80">Healthcare orgs served</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: "2px solid #89c726" }}>
                <div className="text-3xl font-bold text-white mb-1">$5M+</div>
                <div className="text-sm text-white/80">Eligible activity identified</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: "2px solid #89c726" }}>
                <div className="text-3xl font-bold text-white mb-1">&lt;3 Min</div>
                <div className="text-sm text-white/80">Eligibility check</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: "2px solid #89c726" }}>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-white/80">Years combined expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Research & Development Focus Areas</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto">
              We help you run structured experiments, improve workflows, and build systems that support better care and
              scalable operations.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="card group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                    <area.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg text-neutral-900 mb-2 font-normal">{area.title}</h4>
                  <p className="text-sm text-neutral-600 font-normal">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-base text-neutral-600 mb-6 font-normal">
              Strengthening practices through innovation that may qualify for R&D tax incentives.
            </p>
            <Link to="/contact" className="btn" style={{ backgroundColor: "#ade5f8", color: "#004aad" }}>
              Start Your Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Expertise That Sets Us Apart</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto">
              Our team combines clinical experience, technical delivery, and IRS-quality documentation—so your innovation
              is both practical and defensible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {teamCredentials.map((credential, index) => (
              <div key={index} className="card group hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <img
                    src={credential.image}
                    alt={credential.title}
                    className="w-40 h-40 rounded-2xl object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="mb-4 text-center text-xl">{credential.title}</h3>
                <p className="text-neutral-600 text-center">{credential.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about" className="btn btn-outline" style={{ borderColor: "#89c726" }}>
              Meet Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">The ROI BLUEPRINT™ Difference</h2>
            <p className="text-lg text-neutral-700 max-w-4xl mx-auto">
              Many practices identify <strong className="text-primary-600">$50K–$250K</strong> in eligible R&D activity
              across process innovation, technology development, and service improvements—supported by documentation built
              from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">$50K-$250K</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Typical Range</div>
              <p className="text-sm text-neutral-600">Annual eligible activity identified for many practices</p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Audit-Ready</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Documentation</div>
              <p className="text-sm text-neutral-600">Built continuously, aligned to IRS expectations</p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15-25%</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Often Qualifies</div>
              <p className="text-sm text-neutral-600">Portion of operating costs tied to innovation work</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Frequently Asked Questions</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Here are the most common questions we get from healthcare and ABA practices considering R&D work.
            </p>
          </div>

          <FAQAccordion faqs={faqs.slice(0, 3)} />

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="btn"
              style={{ backgroundColor: "white", color: "black", border: "2px solid #89c726" }}
            >
              See More
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
        <div className="container relative z-10">
          <div className="text-center">
            <h2 className="mb-6">Find Out If Your Practice Qualifies</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto mb-8">
              Answer a few quick questions and we’ll recommend the best next step—whether that’s a full engagement or a
              targeted consultation.
            </p>

            <div className="max-w-3xl mx-auto">
              <div className="bg-neutral-50 rounded-2xl p-8 border-2 border-primary-200">
                <h3 className="text-3xl font-bold mb-4">Complete in ~3 Minutes</h3>
                <p className="text-neutral-600 text-lg mb-6">
                  Quick assessment. Clear next steps. Built for busy practice owners.
                </p>
                <Link
                  to="/contact"
                  className="btn font-semibold text-lg px-8 py-4 inline-flex items-center"
                  style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
                >
                  Start the Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setIsVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1">
              <iframe
                src="https://customer-mp06svfe1n138f7h.cloudflarestream.com/e37eb2914737729afaba61bed57eb277/iframe?autoplay=true"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
                title="How It Works Video"
              />
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate("/contact");
                }}
                className="btn text-lg px-8 py-4 font-semibold inline-flex items-center"
                style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
