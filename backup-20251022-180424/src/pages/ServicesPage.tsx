import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Shield, TrendingUp, FileText, Users, Calculator, Award, Target, Zap } from "lucide-react";

export default function ServicesPage() {
  const phases = [
    {
      number: "1",
      title: "RESEARCH",
      timeframe: "Months 1-2",
      description: "We analyze your operations, identify innovation opportunities, and begin testing new solutions.",
      activities: [
        "Operational research & analysis",
        "Innovation opportunity mapping",
        "R&D project scoping & testing",
        "Development roadmap creation"
      ]
    },
    {
      number: "2",
      title: "OPTIMIZE",
      timeframe: "Months 2-10",
      description: "Through iterative experimentation, we refine, integrate, and document every improvement.",
      activities: [
        "Continuous testing & refinement",
        "Workflow optimization & integration",
        "System customization and integration",
        "Staff training & support",
        "Real-time R&D documentation"
      ]
    },
    {
      number: "3",
      title: "INNOVATE",
      timeframe: "Months 10-12",
      description: "We deploy proven innovations, plan next-year initiatives, and sustain your growth momentum.",
      activities: [
        "Full deployment of new systems",
        "Ongoing innovation projects",
        "New service line development",
        "Continuous improvement cycles",
        "Quarterly R&D planning sessions"
      ]
    }
  ];

  const practiceSize = [
    {
      size: "Small",
      employees: "15-25 Employees",
      impact: "Streamlined workflows and efficiency gains",
      capabilities: "Enhanced protocols and services",
      benefits: "May qualify for federal and state credits"
    },
    {
      size: "Medium",
      employees: "25-50 Employees",
      impact: "Significant process optimization",
      capabilities: "New service lines and systems",
      benefits: "May qualify for substantial credits"
    },
    {
      size: "Large",
      employees: "50+ Employees",
      impact: "Enterprise-level optimization",
      capabilities: "Multiple new service lines",
      benefits: "May qualify for significant credits"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>Turn Innovation Into Measurable ROI</h1>
            <p className="text-2xl mb-4">
              Your practice is already doing R&D.<br />
              We make sure it <em>counts</em>.
            </p>
            <p>
              ROI Blueprint™ helps healthcare organizations document their innovation work for IRS compliance, operational efficiency, and potential tax benefits, through our systematic, technology-enabled methodology.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/20">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Operational Excellence</div>
              </div>
              <div className="bg-blue-800/40 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/20">
                <Zap className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Strategic Innovation</div>
              </div>
              <div className="bg-blue-700/40 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/20">
                <Calculator className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Tax Planning</div>
              </div>
              <div className="bg-blue-600/40 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/20">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Documentation</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/contact" className="btn btn-secondary shadow-strong">
                Take Your Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
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
            <p className="text-xl max-w-4xl mx-auto italic">
              Most healthcare practices perform qualifying R&D every day without realizing it.
            </p>
            <p className="text-lg max-w-4xl mx-auto mt-4">
              If you're improving a process, implementing technology, or enhancing outcomes — you're innovating and conducting R&D.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card animate-fade-in-up">
              <h3 className="mb-6">What Qualifies as Healthcare R&D?</h3>
              <p className="text-lg text-neutral-600 mb-6">
                Under IRS Section 41, R&D includes developing or improving business components through experimentation. In healthcare, that means systematic efforts to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Develop new or improved <strong>clinical protocols</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Customize <strong>technology systems</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Create or enhance <strong>training programs</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Build <strong>quality improvement initiatives</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Design <strong>outcome measurement systems</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <span>Optimize <strong>operational workflows</strong></span>
                </li>
              </ul>
              <p className="text-lg text-neutral-600 italic">
                Innovation isn't abstract — it's the work you already do to serve clients better. We help you capture it, document it, and make it pay off.
              </p>
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

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <div key={index} className="card group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center mb-4">
                  <div className="text-primary-600 font-bold text-lg mb-2">{phase.timeframe}</div>
                </div>
                <h3 className="mb-3 text-center">Phase {phase.number}: {phase.title}</h3>
                <p className="text-neutral-600 mb-6 text-center">{phase.description}</p>
                <div>
                  <h4 className="font-semibold mb-3">Key Activities</h4>
                  <div className="space-y-2">
                    {phase.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                        <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 animate-fade-in-up">
              <h3 className="mb-4 text-primary-800">ROI Blueprint™ Technology Platform</h3>
              <p className="text-lg text-primary-700 mb-4">
                Our HIPAA-compliant platform integrates with your practice-management systems, automating:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 hover:scale-105 transition-transform duration-200">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-700"><strong>Real-time R&D tracking</strong></span>
                </li>
                <li className="flex items-start gap-2 hover:scale-105 transition-transform duration-200">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-700"><strong>Compliance monitoring</strong></span>
                </li>
                <li className="flex items-start gap-2 hover:scale-105 transition-transform duration-200">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-700"><strong>IRS-compliant documentation packages</strong></span>
                </li>
                <li className="flex items-start gap-2 hover:scale-105 transition-transform duration-200">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-700"><strong>Audit-ready reporting</strong></span>
                </li>
              </ul>
              <p className="text-primary-700 mb-6">
                Unlike manual competitors, our technology ensures accuracy, saves time, and keeps your records audit-ready 24/7.
              </p>
              <div className="text-center">
                <Link to="/contact" className="btn btn-primary">
                  Prequalify in Minutes
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
            <h2>Results You Can Measure</h2>
            <p className="text-xl max-w-4xl mx-auto">
              R&D consulting delivers measurable operational gains — and may qualify your practice for valuable tax credits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {practiceSize.map((practice, index) => (
              <div key={index} className="card group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center mb-6">
                  <div className="modern-badge modern-badge-primary mb-4">
                    {practice.size.toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-600">{practice.employees}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">Operational Impact</h4>
                    <p className="text-base font-semibold text-success-600">{practice.impact}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">New Capabilities</h4>
                    <p className="text-base font-semibold text-primary-600">{practice.capabilities}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-500 mb-2">Potential Tax Benefits</h4>
                    <p className="text-base font-semibold text-accent-600">{practice.benefits}</p>
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
      <section className="section" style={{ backgroundColor: "#dbeafe" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-primary mb-8">
              <Calculator className="w-4 h-4" />
              INVESTMENT
            </div>
            <h2 className="text-neutral-900">Transparent Pricing & Service Delivery</h2>
            <p className="text-neutral-700 text-xl max-w-3xl mx-auto">
              With our methodology and outcomes defined, your investment is structured to align with measurable performance and sustained results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* ROI Blueprint */}
            <div className="card bg-white border-2 border-primary-300 shadow-lg animate-slide-in-left">
              <h3 className="text-neutral-900 mb-2">ROI Blueprint™ – Performance-Based</h3>
              <p className="text-neutral-600 mb-6">
                Full R&D implementation aligned to your practice revenue and success.
              </p>

              <h4 className="font-semibold text-neutral-900 mb-3">Investment Structure</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Performance-based model tied to collected revenue</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Monthly billing with quarterly reconciliation</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Payment based on actual results, not projections</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Self-funding QRE structure may offset costs</span>
                </div>
              </div>

              <h4 className="font-semibold text-neutral-900 mb-3">What's Included</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Complete ROI Blueprint™ methodology (all 3 phases)</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Dedicated EA / RN / IT / BCBA research team</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">HIPAA-compliant platform access</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Real-time R&D tracking & documentation</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">IRS-compliant documentation packages</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Quarterly strategic business reviews</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">EA audit defense & representation</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Federal & state credit optimization</span>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link to="/contact" className="btn btn-primary w-full">
                  Prequalify for Blueprint
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* ROI Roadmap */}
            <div className="card bg-white border-2 border-success-300 shadow-lg animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-neutral-900 mb-2">ROI Roadmap – Strategic Bundle</h3>
              <p className="text-neutral-600 mb-6">
                A comprehensive business-strategy engagement that combines R&D preparation and tax planning.
              </p>

              <h4 className="font-semibold text-neutral-900 mb-3">Included Services</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Strategic R&D readiness assessment and preparation roadmap</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Comprehensive multi-year tax planning and strategy</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Business structure optimization and entity planning</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Growth roadmap for maximum ROI achievement</span>
                </div>
              </div>

              <h4 className="font-semibold text-neutral-900 mb-3">Ideal For</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Practice owners wanting comprehensive business strategy</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Practices building toward R&D implementation</span>
                </div>
                <div className="flex items-start gap-2 hover:scale-105 transition-transform duration-200 cursor-default">
                  <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">Organizations planning structural or strategic changes</span>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link to="/contact" className="btn btn-success w-full">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Self-Funding Model */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Innovation That Pays Off"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-neutral-900 mb-6">Innovation That Pays Off—Literally</h2>
              <p className="text-lg text-neutral-700 mb-4">
                Our services are structured as Qualified Research Expenditures (QRE) under IRS guidelines. For many clients, up to <strong>65% of fees</strong> may support additional tax benefits — potentially offsetting your investment.
              </p>
              <p className="text-lg text-neutral-700 mb-4">
                <em>This means your investment in operational improvements may generate its own tax benefits, separate from the R&D activities we identify in your practice.</em>
              </p>
              <p className="text-neutral-700 mb-6">
                During your discovery call, we'll provide specific calculations based on your practice size and show how the self-funding structure applies to your situation.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Prequalify in Minutes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
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
            <h2 className="mb-6">Start Turning Operations Into ROI</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
              Together, we'll identify where your everyday work qualifies for R&D value and translate those efforts into measurable financial gains. Start your R&D prequalification and learn where your ROI begins.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="btn btn-primary shadow-strong transform hover:scale-110">
                Take your ROI Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
