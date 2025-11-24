import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Beaker, GraduationCap, Cpu, Cog, BarChart3, Rocket, Stethoscope, Shield, Users, ChevronDown } from "lucide-react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

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

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'ended' || data.ended === true) {
            setIsVideoModalOpen(false);
            setTimeout(() => navigate('/contact'), 300);
          }
        } catch (e) {
          // Not JSON, ignore
        }
      } else if (event.data && typeof event.data === 'object') {
        if (event.data.event === 'ended' || event.data.ended === true) {
          setIsVideoModalOpen(false);
          setTimeout(() => navigate('/contact'), 300);
        }
      }
    };

    if (isVideoModalOpen) {
      window.addEventListener('message', handleMessage);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
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
      image: "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/d689e99a-1984-4a94-ef0a-b14b4caaf500/public",
      name: "Healthcare Specialist, RN",
      title: "Healthcare Expertise",
      description: "Our Registered Nurse and Board Certified Behavior Analyst uncover R&D opportunities often overlooked by others—drawing on firsthand experience working within practices like yours."
    },
    {
      image: "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/835586eb-7296-4bf7-24e2-bd7b7df99a00/public",
      name: "Tax Specialist, EA",
      title: "IRS Representation",
      description: "Our Enrolled Agent provides authoritative representation before the IRS, maintaining audit-ready documentation and offering expert defense when needed."
    },
    {
      image: "https://imagedelivery.net/s0JEtwqnLquT1GUYjPcg5Q/7c3e0b31-53f3-4802-b087-e517222fae00/public",
      name: "Technology Director, CTO",
      title: "HIPAA-Compliant Technology",
      description: "Secure, real-time tracking through software that seamlessly integrates with your existing systems—eliminating the need for manual processes."
    }
  ];

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
      <StructuredData type="organization" />
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Blueprint-Wallpaper-for-Desktop.jpg') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <Beaker className="w-4 h-4" />
              <span>Healthcare R&D Consultants</span>
            </div>
            <h1>Research. Optimize. Innovate Your Practice.</h1>
            <p>
              We help healthcare practices optimize operations and innovate through documented Research and Development (R&D) initiatives that may qualify your health practice for tax benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30"
              >
                How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Trust Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: '2px solid #89c726' }}>
                <div className="text-3xl font-bold text-white mb-1">120+</div>
                <div className="text-sm text-white/80">Trusted by healthcare organizations</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: '2px solid #89c726' }}>
                <div className="text-3xl font-bold text-white mb-1">$5M+</div>
                <div className="text-sm text-white/80">In identified eligible R&D credits</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: '2px solid #89c726' }}>
                <div className="text-3xl font-bold text-white mb-1">&lt;3 Min</div>
                <div className="text-sm text-white/80">Eligibility results in under 3 minutes</div>
              </div>
              <div className="rounded-xl p-4 text-center bg-transparent" style={{ border: '2px solid #89c726' }}>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-white/80">Years of combined clinical and tax expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Focus Areas */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Research and Development Focus Areas</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto">
              Our R&D efforts are dedicated to transforming the way healthcare practices operate:
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <div key={index} className="card group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
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
              Strengthening healthcare practices through advanced solutions eligible for R&D tax incentives
            </p>
            <Link to="/contact" className="btn" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
              Get Prequalified Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Expertise That Sets Us Apart</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto">
              From Enrolled Agents and Registered Nurses to Board Certified Behavior Analysts and IT specialists, our team combines deep clinical knowledge with expertise in IRS documentation and compliance.
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
                  />
                </div>
                <h3 className="mb-4 text-center text-xl">{credential.title}</h3>
                <p className="text-neutral-600 text-center">{credential.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about" className="btn btn-outline" style={{ borderColor: '#89c726' }}>
              Meet Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Data & Impact Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">The ROI BLUEPRINT™ Difference</h2>
            <p className="text-lg text-neutral-700 max-w-4xl mx-auto">
              On average, healthcare practices identify <strong className="text-primary-600">$50K–$250K</strong> in eligible R&D activities across process innovation, technology development, and service delivery improvements. Our <strong className="text-primary-600">100% audit defense success rate</strong> ensures every claim is fully supported.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">$50K-$250K</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Average Benefit Range</div>
              <p className="text-sm text-neutral-600">Typical eligible R&D activities identified per healthcare practice annually</p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Audit Defense Success</div>
              <p className="text-sm text-neutral-600">Every claim fully documented and successfully defended before the IRS</p>
            </div>

            <div className="card text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15-25%</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider mb-2 font-semibold">Operating Costs Qualify</div>
              <p className="text-sm text-neutral-600">Average percentage of qualified operating expenses across innovation projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pathways */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Find the Right R&D Solution for Your Healthcare Practice</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto">
              Designed to meet your practice where it is today, helping you identify opportunities and maximize eligible benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Full ROI Blueprint Services */}
            <div className="card border-2 border-primary-300">
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Full ROI Blueprint Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-primary-600 mb-6">Full ROI Blueprint Services</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Practices with $1M+ annual revenue</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">At least $500K in qualified staff costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">US-based businesses paying US taxes</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Ready to optimize new protocols and services</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Want full R&D consulting engagement</span>
                </div>
              </div>
            </div>

            {/* ROI Roadmap Consultation */}
            <div className="card border-2 border-secondary-300">
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="ROI Roadmap Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-secondary-600 mb-6">ROI Roadmap Consultation</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Smaller practices exploring options</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Not ready for full R&D engagement</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Want to understand potential first</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Need assessment and planning</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary-600 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm sm:text-base">Exploring innovation opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="btn" style={{ backgroundColor: '#ffffff', color: '#000000', border: '2px solid #89c726' }}>
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-6">Most Frequently Asked Questions About Our R&D Services</h2>
          </div>

          <FAQAccordion faqs={faqs.slice(0, 3)} />

          <div className="text-center mt-8">
            <Link to="/faq" className="btn" style={{ backgroundColor: 'white', color: 'black', border: '2px solid #89c726' }}>
              See More
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden" style={{
        backgroundColor: '#f8fafc'
      }}>
        <div className="container relative z-10">
          <div className="text-center">
            <h2 className="mb-6">Find Out If Your Healthcare Practice Qualifies for R&D Implementation and Potential Tax Credits</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto mb-8">
              From clinical innovation to financial advantage, we help healthcare practices capture eligible R&D tax benefits through precise documentation and strategic support.
            </p>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border-2 border-primary-200">
                <h3 className="text-3xl font-bold mb-4">Complete in Just 3 Minutes</h3>
                <p className="text-neutral-600 text-lg mb-6">
                  Answer 7 quick questions, and we'll recommend the optimal approach for your practice—whether a full R&D engagement or a targeted strategic consultation.
                </p>
                <Link to="/contact" className="btn font-semibold text-lg px-8 py-4 inline-flex items-center" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                  Find Out Instantly
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
        >
          <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button
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
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate('/contact');
                }}
                className="btn text-lg px-8 py-4 font-semibold inline-flex items-center"
                style={{ backgroundColor: '#ade5f8', color: '#004aad' }}
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
