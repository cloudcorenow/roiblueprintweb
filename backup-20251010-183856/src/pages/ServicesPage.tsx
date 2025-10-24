import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Shield, TrendingUp, FileText, Users, Calculator, Award, Target, Zap } from "lucide-react";

export default function ServicesPage() {
  const phases = [
    {
      number: "1",
      title: "RESEARCH",
      timeframe: "MONTHS 1-2",
      description: "We research your operations, develop initial solutions, and begin testing approaches.",
      activities: [
        "Operational research and analysis",
        "Innovation opportunity identification",
        "R&D project scoping",
        "Initial testing begins",
        "Development roadmap creation"
      ]
    },
    {
      number: "2",
      title: "OPTIMIZE",
      timeframe: "MONTHS 2-10",
      description: "We continuously optimize and test approaches through iterative experimentation. This is where the real work happens.",
      activities: [
        "Continuous testing and refinement",
        "Process experimentation and optimization",
        "System customization and integration",
        "Staff training on new approaches",
        "Ongoing R&D documentation"
      ]
    },
    {
      number: "3",
      title: "INNOVATE",
      timeframe: "MONTHS 10-12",
      description: "We deploy proven innovations and plan next-year initiatives while optimization continues.",
      activities: [
        "Full deployment of new systems",
        "Ongoing innovation projects",
        "Continuous improvement cycles",
        "New service line development",
        "Quarterly R&D planning"
      ]
    }
  ];

  const practiceSize = [
    {
      size: "Small Practices",
      employees: "15-25 Employees",
      improvements: "Streamlined workflows and efficiency gains",
      capabilities: "Enhanced protocols and services",
      benefits: "May qualify for federal and state credits"
    },
    {
      size: "Medium Practices",
      employees: "25-50 Employees",
      improvements: "Significant process optimization",
      capabilities: "New service lines and systems",
      benefits: "May qualify for substantial credits"
    },
    {
      size: "Large Practices",
      employees: "50+ Employees",
      improvements: "Enterprise-level optimization",
      capabilities: "Multiple new service lines",
      benefits: "May qualify for significant credits"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        minHeight: "60vh",
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
              <Award className="w-4 h-4" />
              OUR SERVICES
            </div>
            <h1>You're Doing R&D-Type Work. Let's Make It Count.</h1>
            <p>
              We help healthcare practices document R&D activities for IRS compliance and potential tax benefits.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="glass rounded-xl p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Operational Excellence</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Strategic Innovation</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Comprehensive Tax Planning</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Defendable Documentation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Healthcare R&D */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-primary mb-8">
              <FileText className="w-4 h-4" />
              UNDERSTANDING HEALTHCARE R&D
            </div>
            <h2>You're Already Doing R&D Activities</h2>
            <p className="text-xl max-w-4xl mx-auto">
              Most healthcare practices don't realize they're performing qualifying R&D activities every day. If you're developing, improving, or innovating anything in your practice—you're doing R&D.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card animate-fade-in-up">
              <h3 className="mb-6">What Qualifies as Healthcare R&D?</h3>
              <p className="text-lg text-neutral-600 mb-6">
                Under IRS Section 41, R&D activities include developing new or improved business components through experimentation. In healthcare, this means any systematic effort to improve clinical processes, implement technology, develop protocols, or enhance operations.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                <h4 className="font-semibold text-primary-800 mb-4">Common qualifying activities:</h4>
                <p className="text-primary-700">
                  Developing clinical protocols, customizing technology systems, creating training programs, building quality improvement initiatives, designing outcome measurement systems, and optimizing operational workflows.
                </p>
              </div>
              <div className="text-center mt-6">
                <Link to="/industries" className="btn btn-outline">
                  View Industries We Serve
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The ROI Blueprint Methodology */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Award className="w-4 h-4" />
              OUR PROPRIETARY APPROACH
            </div>
            <h2>The ROI Blueprint™ Methodology</h2>
            <p className="text-2xl font-semibold text-primary-600 mb-4">Research. Optimize. Innovate.</p>
            <p className="text-xl max-w-4xl mx-auto">
              Our systematic, technology-enabled approach transforms healthcare practices through documented R&D activities while improving operations and capturing potential tax benefits.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className={`card group animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-black">{phase.number}</span>
                  </div>
                  <div className="flex-1">
                    <div className="modern-badge modern-badge-primary mb-3">
                      {phase.timeframe}
                    </div>
                    <h3 className="mb-3">Phase {phase.number}: {phase.title}</h3>
                    <p className="text-lg text-neutral-600 mb-6">{phase.description}</p>
                    <div>
                      <h4 className="font-semibold mb-3">Key Activities</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-neutral-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-fade-in-up">
              <h3 className="mb-4 text-primary-800">ROI Blueprint™ Technology Platform</h3>
              <p className="text-lg text-primary-700">
                Our HIPAA-compliant platform integrates with your practice management systems to provide real-time R&D activity tracking, automated documentation generation, compliance monitoring, and detailed reporting. Unlike manual competitor processes, our technology ensures accuracy, saves time, and maintains audit-ready records continuously.
              </p>
              <div className="text-center mt-6">
                <Link to="/contact" className="btn btn-primary">
                  Prequalify Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-accent mb-8">
              <TrendingUp className="w-4 h-4" />
              EXPECTED OUTCOMES
            </div>
            <h2>What You Can Expect</h2>
            <p className="text-xl max-w-4xl mx-auto">
              R&D consulting delivers operational improvements and may qualify for tax benefits based on your research activities.
            </p>
          </div>

          <div className="space-y-8">
            {practiceSize.map((practice, index) => (
              <div key={index} className={`card group animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-center mb-6">
                  <div className="modern-badge modern-badge-primary mb-4">
                    {practice.size.toUpperCase()}
                  </div>
                  <h3 className="text-3xl font-bold text-primary-600">{practice.employees}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">Operational Improvements</h4>
                    <p className="text-lg font-semibold text-success-600">{practice.improvements}</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">New Capabilities</h4>
                    <p className="text-lg font-semibold text-primary-600">{practice.capabilities}</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">Potential Tax Benefits</h4>
                    <p className="text-lg font-semibold text-accent-600">{practice.benefits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-warning-50 border-l-4 border-warning-500 p-6 rounded-lg animate-fade-in-up">
              <h4 className="font-semibold text-warning-800 mb-2">Important:</h4>
              <p className="text-warning-700">
                Tax benefits vary based on qualifying R&D activities, state programs, and individual circumstances. We document R&D work according to IRS standards. Actual benefits depend on IRS approval. Innovation and operational improvements are the primary goals—potential tax benefits are a bonus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment / Pricing */}
      <section className="section dark-section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge mb-8" style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)"
            }}>
              <Calculator className="w-4 h-4" />
              INVESTMENT
            </div>
            <h2>Transparent Pricing & Service Delivery</h2>
            <p className="text-primary-100 text-xl max-w-3xl mx-auto">
              Now that you understand our systematic approach and the potential outcomes, here's how the investment works.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* ROI Blueprint */}
            <div className="glass rounded-3xl p-8 animate-slide-in-left">
              <h3 className="text-white mb-2">ROI Blueprint</h3>
              <div className="text-2xl font-bold text-primary-300 mb-6">Performance-Based</div>
              <p className="text-primary-100 mb-6">
                Full R&D implementation with investment aligned to your practice revenue and success. Details provided during discovery call.
              </p>

              <h4 className="font-semibold text-white mb-3">Investment Structure</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Performance-based model tied to collected revenue</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Monthly billing with quarterly reconciliation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">You only pay based on actual results, not projections</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Self-funding QRE structure may offset investment cost</span>
                </div>
              </div>

              <h4 className="font-semibold text-white mb-3">What's Included</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Complete ROI Blueprint™ methodology (all 3 phases)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Dedicated EA/RN/IT/BCBA research team access</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">HIPAA-compliant technology platform</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Real-time R&D activity tracking and documentation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">IRS-compliant documentation packages</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Quarterly strategic business reviews</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">EA audit defense and representation authority</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Federal and state credit optimization</span>
                </div>
              </div>
            </div>

            {/* ROI Roadmap */}
            <div className="glass rounded-3xl p-8 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-white mb-2">ROI Roadmap</h3>
              <div className="text-2xl font-bold text-success-300 mb-6">Strategic Bundle</div>
              <p className="text-primary-100 mb-6">
                Comprehensive business strategy consultation combining R&D preparation and tax planning. Investment details during discovery call.
              </p>

              <h4 className="font-semibold text-white mb-3">Complete Business Optimization</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Strategic R&D readiness assessment and preparation roadmap</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Comprehensive multi-year tax planning and strategy</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Business structure optimization and entity planning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Integration strategy for R&D credits and other tax incentives</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Succession planning coordination</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Growth roadmap for maximum ROI achievement</span>
                </div>
              </div>

              <h4 className="font-semibold text-white mb-3">Ideal For</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Practice owners wanting comprehensive business strategy</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Practices building toward R&D implementation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Organizations planning structural or strategic changes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Business owners seeking to maximize total ROI across all areas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-300 mt-1 flex-shrink-0" />
                  <span className="text-sm text-primary-100">Practices wanting EA-level strategic guidance</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-warning-900/50 border-l-4 border-warning-500 p-6 rounded-lg backdrop-blur-sm animate-fade-in-up">
              <h4 className="font-semibold text-warning-300 mb-3">Self-Funding Investment Model</h4>
              <p className="text-warning-100">
                Our research services are structured as Qualified Research Expenditures (QRE) under IRS guidelines. For many clients, 65% of our fees may support additional tax benefits—potentially offsetting your investment cost. This means your investment in operational improvements may generate its own tax benefits, separate from the R&D activities we identify in your practice. During your discovery call, we'll provide specific calculations based on your practice size and show how the self-funding structure applies to your situation.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="btn btn-secondary shadow-strong">
              Prequalify Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
              Turn daily operations into documented R&D work that delivers operational improvements and may qualify for tax benefits. Let's discuss which service is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn btn-primary shadow-strong transform hover:scale-110">
                Get Your ROI Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/industries" className="btn btn-secondary shadow-strong transform hover:scale-110">
                View Industries We Serve
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
