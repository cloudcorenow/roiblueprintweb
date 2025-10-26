import React from "react";
import { Link } from "react-router-dom";
import { Brain, Stethoscope, Heart, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";

export default function IndustriesOverviewPage() {
  return (
    <div>
      <SEO
        title="Healthcare Industries We Serve | ABA & Medical Practices"
        description="ROI Blueprint serves ABA therapy practices, medical practices, specialty practices, and healthcare providers nationwide. Learn how your practice type qualifies for R&D tax credits."
        keywords="healthcare R&D industries, ABA therapy tax credits, medical practice R&D, specialty practice optimization, healthcare innovation"
        canonicalUrl="/industries"
      />
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>Everyday Innovation. Documented. Rewarded.</h1>
            <p className="text-xl">
              Whether you lead an ABA clinic or a medical practice, your daily workflows may qualify as R&D activities—worth documenting for compliance, operational excellence, and potential tax benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <Link to="/industries/aba-practices" className="btn btn-primary shadow-strong">
                Explore ABA Practices
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/industries/medical-practices" className="btn shadow-strong" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid #89c726' }}>
                Explore Medical Practices
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Healthcare R&D Works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up max-w-4xl mx-auto">
            <h2 className="mb-6">How Healthcare R&D Works</h2>
            <h3 className="text-2xl font-semibold text-primary-600 mb-6">You're Already Doing R&D—Here's How It Qualifies</h3>
            <p className="text-xl text-neutral-700 mb-4">
              Healthcare providers innovate constantly—refining processes, implementing new technologies, and improving patient outcomes. Under IRS Section 41, many of these improvements meet the criteria for qualified R&D activities.
            </p>
            <p className="text-lg text-neutral-600">
              We help you identify, document, and substantiate that work for compliance and potential tax advantages.
            </p>
          </div>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-4">Who We Serve</h2>
            <h3 className="text-2xl font-semibold text-neutral-800">Industries We Support</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ABA Therapy Practices */}
            <div className="card text-center group hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">ABA Therapy Practices</h3>
              <p className="text-neutral-600 mb-6">
                Protocol design, data systems, and training innovation
              </p>
              <Link to="/industries/aba-practices" className="btn w-full" style={{ backgroundColor: 'transparent', color: 'black', border: '2px solid #89c726' }}>
                View ABA R&D
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Medical & Specialty Practices */}
            <div className="card text-center group hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Medical & Specialty Practices</h3>
              <p className="text-neutral-600 mb-6">
                Clinical process improvement, technology integration, and quality initiatives
              </p>
              <Link to="/industries/medical-practices" className="btn w-full" style={{ backgroundColor: 'transparent', color: 'black', border: '2px solid #89c726' }}>
                View Medical R&D
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Other Healthcare Services */}
            <div className="card text-center group hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Other Healthcare Services</h3>
              <p className="text-neutral-600 mb-6">
                Dental, therapy, diagnostic, and emerging healthcare innovators
              </p>
              <Link to="/contact" className="btn w-full" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="mb-6">Learn How Your Practice Qualifies for R&D Credits</h2>
            <p className="text-xl text-neutral-700 mb-6">
              Prequalify in minutes and learn how to turn daily operations into documented R&D work that may qualify for tax benefits and translate into measurable ROI.
            </p>
            <p className="text-lg text-success-600 font-semibold mb-8 italic">
              Serving ABA and medical practices nationwide.
            </p>
            <Link to="/contact" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
              Prequalify in Minutes
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
