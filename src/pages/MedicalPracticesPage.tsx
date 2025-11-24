import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Stethoscope, LineChart, Cog } from "lucide-react";
import SEO from "../components/SEO";

export default function MedicalPracticesPage() {
  return (
    <div>
      <SEO
        title="Medical Practice R&D Tax Credits | Healthcare Providers"
        description="Medical practices, specialty clinics, and healthcare providers qualify for R&D tax credits through clinical protocol development, care pathway optimization, technology integration, and outcome measurement systems."
        keywords="medical practice R&D, healthcare provider tax credits, clinical protocol development, medical practice optimization, specialty clinic tax incentives, how medical practices qualify for R&D tax credits, healthcare innovation consulting, medical practice business growth, healthcare provider tax benefits"
        canonicalUrl="/industries/medical-practices"
      />
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=2091&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>R&D Opportunities for Medical Practices</h1>
            <p className="text-xl">
              From clinical workflow optimization to integrated care protocols, medical practices innovate constantly. We help you document that innovation for IRS compliance and potential R&D tax benefits.
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

      {/* Common R&D Activities in Medical Practices */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up max-w-4xl mx-auto">
            <h2 className="mb-6">Common R&D Activities in Medical Practices</h2>
            <h3 className="text-2xl font-semibold text-primary-600 mb-6">How Medical Practices Qualify</h3>
            <p className="text-xl text-neutral-700">
              Many Medical, Specialty, and Primary Care practices perform R&D activities every day—often without realizing they qualify.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Clinical Protocol Development */}
            <div className="card animate-fade-in-up">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Clinical Protocol Development</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing standardized care pathways</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating chronic disease management protocols</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing preventive care frameworks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building integrated specialty care models</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Integration & Optimization */}
            <div className="card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Cog className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Technology Integration & Optimization</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Customizing EHR/EMR systems for specific workflows</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building telemedicine delivery platforms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating patient portal enhancements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing automated clinical decision support tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Outcome Measurement */}
            <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <LineChart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Quality & Outcome Measurement</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing quality metrics and dashboards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building patient outcome tracking systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating value-based care reporting frameworks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing population health analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Document Medical R&D */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="mb-6">Why Document Medical R&D</h2>
              <h3 className="text-2xl font-semibold text-primary-600">From Patient Care to Measurable ROI</h3>
            </div>
            <div className="card">
              <p className="text-lg text-neutral-700 mb-6">
                We help medical practices translate their continuous improvement efforts into documented, IRS-compliant R&D work.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                You gain enhanced clinical workflows, improved patient outcomes, and potential access to valuable federal and state tax credits.
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

      {/* Specialty Areas */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-6">Medical Specialties We Serve</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Our expertise spans multiple medical specialties, each with unique R&D opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Primary Care & Family Medicine",
              "Internal Medicine",
              "Pediatrics",
              "Cardiology",
              "Orthopedics",
              "Pain Management",
              "Dermatology",
              "Mental Health & Psychiatry",
              "Physical Therapy & Rehabilitation",
              "Urgent Care",
              "Women's Health",
              "Gastroenterology"
            ].map((specialty, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center gap-3 justify-center">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="font-semibold text-neutral-800">{specialty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="mb-4">Service Options</h2>
            <h3 className="text-2xl font-semibold text-neutral-800">Which Service Is Right for Your Practice?</h3>
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
                      <td className="py-4 px-4 text-neutral-700">Established medical practices with $1M+ revenue and 15+ staff</td>
                      <td className="py-4 px-4 text-neutral-700">Full R&D implementation and documentation</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold text-success-600">ROI Roadmap™</td>
                      <td className="py-4 px-4 text-neutral-700">Growing practices preparing for R&D readiness</td>
                      <td className="py-4 px-4 text-neutral-700">R&D preparation, business strategy, and tax planning</td>
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

      {/* Cross-link */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neutral-600 mb-4">
              Also see: <Link to="/industries/aba-practices" className="text-primary-600 hover:underline font-semibold">ABA & Behavioral Health R&D</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
