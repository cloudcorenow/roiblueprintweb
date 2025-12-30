import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Brain,
  BarChart3,
  Users as UsersIcon
} from "lucide-react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

export default function ABAPracticesPage() {
  return (
    <div>
      <SEO
        title="ABA Therapy Practice R&D Tax Credits | Applied Behavior Analysis"
        description="ABA therapy, behavioral health, and autism service providers qualify for R&D tax credits through protocol development, data systems, training methodologies, and outcome measurement initiatives."
        keywords="ABA therapy R&D, applied behavior analysis tax credits, behavioral health R&D, autism services tax credits, BCBA protocol development, ABA practice optimization, how ABA providers qualify for R&D tax credits, behavioral health innovation consulting, ABA therapy business growth, autism service provider tax benefits"
        canonicalUrl="/industries/aba-practices"
      />

      {/* Structured Data (page-specific only) */}
      <StructuredData
        type="webpage"
        pageTitle="ABA Therapy Practice R&D Tax Credits | Applied Behavior Analysis"
        pageDescription="ABA therapy, behavioral health, and autism service providers qualify for R&D tax credits through protocol development, data systems, training methodologies, and outcome measurement initiatives."
        pageUrl="/industries/aba-practices"
      />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          paddingTop: "6rem",
          background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80') center/cover no-repeat
        `
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1>R&D Opportunities for ABA Therapy Practices</h1>
            <p className="text-xl">
              From protocol development to data analytics, ABA practices innovate
              daily. We help you document that work for IRS compliance and
              potential R&D tax benefits.
            </p>
            <div className="text-center mt-8">
              <Link
                to="/contact"
                className="btn shadow-strong"
                style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
              >
                Prequalify in Minutes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common R&D Activities in ABA */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up max-w-4xl mx-auto">
            <h2 className="mb-6">Common R&D Activities in ABA</h2>
            <h3 className="text-2xl font-semibold text-primary-600 mb-6">
              How ABA Practices Qualify
            </h3>
            <p className="text-xl text-neutral-700">
              Many Applied Behavior Analysis, Behavioral Health, and Autism
              Service providers perform R&D activities every day—often without
              realizing they qualify.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Protocol Development */}
            <div className="card animate-fade-in-up">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Protocol Development</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Developing individualized behavior intervention protocols
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Creating systematic assessment methodologies
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Designing functional behavior analysis frameworks
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Building treatment plan optimization systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Systems & Analytics */}
            <div className="card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Data Systems & Analytics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating custom data collection systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building automated progress tracking tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing outcome measurement frameworks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing data analysis and reporting systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Training & Implementation */}
            <div className="card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-600 mb-4">Training & Implementation</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Building staff training methodologies</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Creating competency assessment frameworks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Developing systematic onboarding programs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Designing quality assurance protocols</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Document ABA R&D */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="mb-6">Why Document ABA R&D</h2>
              <h3 className="text-2xl font-semibold text-primary-600">
                From Clinical Progress to Measurable ROI
              </h3>
            </div>
            <div className="card">
              <p className="text-lg text-neutral-700 mb-6">
                We help ABA providers translate their daily efforts into documented,
                IRS-compliant R&D work.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                You gain stronger systems, streamlined operations, and potential access
                to valuable federal and state tax credits.
              </p>
              <div className="text-center">
                <Link
                  to="/contact"
                  className="btn shadow-strong"
                  style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
                >
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
            <h3 className="text-2xl font-semibold text-neutral-800">
              Which Service Is Right for Your Practice?
            </h3>
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
                      <td className="py-4 px-4 text-neutral-700">Established ABA practices with $1M+ revenue and 15+ staff</td>
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
                <Link
                  to="/contact"
                  className="btn shadow-strong"
                  style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
                >
                  Prequalify in Minutes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-neutral-600 mb-4">
              Also see:{" "}
              <Link
                to="/industries/medical-practices"
                className="text-primary-600 hover:underline font-semibold"
              >
                Medical & Specialty Practices R&D
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
