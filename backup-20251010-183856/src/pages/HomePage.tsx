import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Beaker, GraduationCap, Cpu, Cog, BarChart3, Rocket, Stethoscope, Shield, Users } from "lucide-react";

export default function HomePage() {
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
      icon: Stethoscope,
      title: "Healthcare Expertise",
      description: "Our RN and BCBA identify R&D opportunities other consultants miss because they've actually worked inside practices like yours."
    },
    {
      icon: Shield,
      title: "IRS Representation",
      description: "Our Enrolled Agent can represent you before the IRS, ensuring audit-ready documentation and defense if needed."
    },
    {
      icon: Cpu,
      title: "HIPAA-Compliant Technology",
      description: "Real-time tracking through secure software that integrates with your existing systems. No manual tracking required."
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
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "8rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="modern-badge mb-8" style={{
              backgroundColor: "rgba(0, 74, 173, 0.15)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              fontWeight: "700"
            }}>
              <Beaker className="w-4 h-4" />
              HEALTHCARE R&D CONSULTANTS
            </div>
            <h1>Research. Optimize. Innovate Your Practice.</h1>
            <p>
              We help healthcare practices optimize operations and innovate through documented R&D work that may qualify for tax benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <Link to="/contact" className="btn btn-secondary shadow-strong">
                See If You Qualify
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Focus Areas */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-primary mb-8">
              <Rocket className="w-4 h-4" />
              R&D FOCUS AREAS
            </div>
            <h2>Where We Help You Innovate</h2>
            <p className="text-xl max-w-4xl mx-auto">
              Here's where we focus our R&D work with healthcare practices:
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-fade-in-up">
              <h3 className="text-primary-800 mb-6 text-center">Innovation & Optimization Projects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {focusAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <div className="w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <area.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-800 mb-2">{area.title}</h4>
                      <p className="text-sm text-neutral-600">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-neutral-600 italic mb-6">
              Research. Optimization. Innovation. That's what we do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Users className="w-4 h-4" />
              OUR TEAM
            </div>
            <h2>We Have Credentials Others Don't</h2>
            <p className="text-xl max-w-4xl mx-auto">
              Our team: Enrolled Agent, Registered Nurse, Board Certified Behavior Analyst, and IT specialists. We understand both clinical work and IRS documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamCredentials.map((credential, index) => (
              <div key={index} className={`card group hover:shadow-2xl transition-all duration-500 animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <credential.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-4 text-center">{credential.title}</h3>
                <p className="text-neutral-600 text-center">{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Pathways */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-accent mb-8">
              <ArrowRight className="w-4 h-4" />
              TWO PATHWAYS
            </div>
            <h2>Which Path Is Right For You?</h2>
            <p className="text-xl max-w-4xl mx-auto">
              We offer two ways to work with us depending on where your practice is today:
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* R&D Best Fit */}
            <div className="card border-2 border-primary-300 animate-slide-in-left">
              <h3 className="text-primary-600 mb-6">R&D Best Fit For</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Practices with $1M+ annual revenue</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>At least $500K in qualified staff costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>US-based businesses paying US taxes</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Ready to optimize new protocols and services</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Want full R&D consulting engagement</span>
                </div>
              </div>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-primary-800">Full ROI Blueprint™ Service</span>
                </div>
              </div>
            </div>

            {/* Not There Yet */}
            <div className="card border-2 border-success-300 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-success-600 mb-6">Not There Yet?</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span>Smaller practices exploring options</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span>Not ready for full R&D engagement</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span>Want to understand potential first</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span>Need assessment and planning</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span>Exploring innovation opportunities</span>
                </div>
              </div>
              <div className="bg-success-50 border border-success-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-success-600" />
                  <span className="font-semibold text-success-800">ROI Roadmap™ Consultation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg text-neutral-600 mb-6">
              <strong>Takes 3 minutes.</strong> Answer 7 questions and we'll recommend the best path for your practice—either full R&D engagement or strategic consultation.
            </p>
            <Link to="/contact" className="btn btn-primary shadow-strong">
              Start Prequalification
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our R&D Process */}
      <section className="section dark-section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge mb-8" style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)"
            }}>
              <Cog className="w-4 h-4" />
              OUR R&D PROCESS
            </div>
            <h2>How We Optimize Innovation Projects</h2>
            <p className="text-primary-100 text-xl max-w-4xl mx-auto">
              We follow a research and optimization methodology that brings new capabilities to your practice while documenting everything properly.
            </p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Phase 1 */}
            <div className="glass rounded-3xl p-8 animate-slide-in-left">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl backdrop-blur-sm">
                  <span className="text-3xl font-black">1</span>
                </div>
                <div className="flex-1">
                  <div className="modern-badge mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                    MONTHS 1-2
                  </div>
                  <h3 className="text-white mb-3">Phase 1: Research</h3>
                  <p className="text-primary-100 mb-4">
                    We research your operations, develop initial solutions, and begin testing approaches.
                  </p>
                  <p className="text-sm text-primary-200 italic mb-4">
                    Our clinical and technical team identifies real innovation opportunities others miss.
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Operational research and analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Innovation opportunity identification</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">R&D project scoping</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Initial testing begins</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Development roadmap creation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="glass rounded-3xl p-8 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl backdrop-blur-sm">
                  <span className="text-3xl font-black">2</span>
                </div>
                <div className="flex-1">
                  <div className="modern-badge mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                    MONTHS 2-10
                  </div>
                  <h3 className="text-white mb-3">Phase 2: Optimize</h3>
                  <p className="text-primary-100 mb-4">
                    We continuously optimize and test approaches through iterative experimentation. This is where the real work happens.
                  </p>
                  <p className="text-sm text-primary-200 italic mb-4">
                    We test multiple approaches and document what works through proper research methods.
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Continuous testing and refinement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Process experimentation and optimization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">System customization and integration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Staff training on new approaches</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Ongoing R&D documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="glass rounded-3xl p-8 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl backdrop-blur-sm">
                  <span className="text-3xl font-black">3</span>
                </div>
                <div className="flex-1">
                  <div className="modern-badge mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                    MONTHS 10-12
                  </div>
                  <h3 className="text-white mb-3">Phase 3: Innovate</h3>
                  <p className="text-primary-100 mb-4">
                    We deploy proven innovations and plan next-year initiatives while optimization continues.
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Full deployment of new systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Ongoing innovation projects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Continuous improvement cycles</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">New service line development</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                      <span className="text-sm text-primary-100">Quarterly R&D planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-primary-100 text-lg italic">
              Continuous R&D keeps your practice innovating and building competitive advantages.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-primary mb-8">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              COMMON QUESTIONS
            </div>
            <h2>Questions We Get Asked</h2>
            <p className="text-xl max-w-4xl mx-auto">
              Here are answers to the most common questions about our service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className={`card animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-semibold text-primary-600 mb-4">{faq.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section dark-section">
        <div className="container">
          <div className="text-center animate-fade-in-up">
            <h2 className="mb-6">Ready to Innovate?</h2>
            <p className="text-primary-100 text-xl max-w-3xl mx-auto mb-8">
              Let's document your R&D work and unlock potential tax benefits.
            </p>
            <p className="text-primary-200 mb-8">
              Takes 3 minutes to see if your practice qualifies.
            </p>
            <Link to="/contact" className="btn btn-secondary shadow-strong">
              See If You Qualify
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-primary-300 text-sm mt-8 italic">
              Research. Optimize. Innovate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
