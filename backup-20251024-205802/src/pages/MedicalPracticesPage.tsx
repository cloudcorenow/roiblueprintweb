import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Stethoscope, Cpu, Shield } from "lucide-react";

export default function MedicalPracticesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2086&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>R&D Opportunities for Medical and Specialty Practices</h1>
            <p className="text-xl">
              Whether you're refining clinical protocols or customizing EMRs, your daily work may qualify as R&D. We help you document and maximize its value.
            </p>
            <div className="text-center mt-8">
              <Link to="/contact" className="btn shadow-strong" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                Prequalify in Minutes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common R&D Activities */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up max-w-4xl mx-auto">
            <h2 className="mb-6">Common R&D Activities</h2>
            <h3 className="text-2xl font-semibold text-primary-600 mb-6">Everyday Innovation That Qualifies as R&D</h3>
            <p className="text-xl text-neutral-700">
              Partnering with Primary Care, Multi-specialty, Family Medicine, Internal Medicine, and Specialty Practices to capture and document the innovation happening every day in patient care.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Clinical Innovation */}
            <div className="card animate-fade-in-up">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Clinical Innovation</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing clinical protocols for chronic disease management</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating preventive care program frameworks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing care coordination systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building patient risk stratification tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Integration */}
            <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Technology Integration</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Customizing EMR systems for specialty workflows</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Implementing and optimizing telehealth platforms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing patient portal enhancements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating clinical decision support integrations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Safety */}
            <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Quality & Safety</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building patient safety monitoring systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing quality improvement initiatives</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating clinical outcome measurement tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing infection control protocols</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="mb-6">Why It Matters</h2>
              <h3 className="text-2xl font-semibold text-primary-600">Why Document Medical R&D Activities:</h3>
            </div>
            <div className="card">
              <p className="text-lg text-neutral-700 mb-6">
                Documenting innovation improves compliance, strengthens efficiency, and positions your practice for possible R&D tax benefits.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Our team brings cross-disciplinary expertise including: EAs, RNs, ITs, and BCBAs, to ensure every improvement is properly qualified and documented.
              </p>
              <div className="text-center">
                <Link to="/contact" className="btn shadow-strong" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                  Get Prequalified
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">Service Options</h2>
            <h3 className="text-2xl font-semibold text-neutral-800">Which Service Fits Your Practice?</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card animate-fade-in-up">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-4 px-4 font-semibold text-neutral-900">Program</th>
                      <th className="text-left py-4 px-4 font-semibold text-neutral-900">Best For</th>
                      <th className="text-left py-4 px-4 font-semibold text-neutral-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200">
                      <td className="py-4 px-4 font-semibold text-primary-600">ROI Blueprint™</td>
                      <td className="py-4 px-4 text-neutral-700">Established practices ready for full R&D implementation</td>
                      <td className="py-4 px-4 text-neutral-700">End-to-end R&D documentation, compliance, and optimization</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold text-success-600">ROI Roadmap™</td>
                      <td className="py-4 px-4 text-neutral-700">Practices building toward implementation</td>
                      <td className="py-4 px-4 text-neutral-700">Strategic planning, readiness assessment, and tax optimization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-8">
                <Link to="/contact" className="btn shadow-strong" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                  Prequalify in Minutes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="mb-6">Your Practice Innovates Every Day—Let's Make It Count.</h2>
            <p className="text-xl text-neutral-700 mb-8">
              Prequalify in minutes to see how your clinical or operational improvements may qualify as R&D work with measurable ROI.
            </p>
            <Link to="/contact" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
              Prequalify in Minutes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-neutral-600 mt-8">
              Also see: <Link to="/industries/aba-practices" className="text-primary-600 hover:underline font-semibold">ABA Therapy Practices R&D</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
