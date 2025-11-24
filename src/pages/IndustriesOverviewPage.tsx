import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Stethoscope } from "lucide-react";
import SEO from "../components/SEO";

export default function IndustriesOverviewPage() {
  const industries = [
    {
      icon: Stethoscope,
      title: "Medical & Specialty Practices",
      description: "Primary care, specialty clinics, and healthcare providers optimizing clinical protocols, integrating technology, and measuring outcomes.",
      link: "/industries/medical-practices",
      bgColor: "from-primary-500 to-primary-600"
    },
    {
      icon: Brain,
      title: "ABA & Behavioral Health",
      description: "Applied Behavior Analysis, autism services, and behavioral health providers developing protocols, data systems, and training methodologies.",
      link: "/industries/aba-practices",
      bgColor: "from-success-500 to-success-600"
    }
  ];

  return (
    <div>
      <SEO
        title="Healthcare Industries We Serve | Medical & ABA Practices"
        description="ROI Blueprint serves medical practices, specialty clinics, ABA therapy providers, and behavioral health organizations. Learn how your healthcare specialty qualifies for R&D tax credits."
        keywords="healthcare R&D by specialty, medical practice R&D, ABA practice R&D, behavioral health tax credits, specialty clinic tax incentives, primary care R&D, autism services tax benefits"
        canonicalUrl="/industries"
      />
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>Healthcare Industries We Serve</h1>
            <p className="text-xl">
              Specialized R&D consulting for medical practices and behavioral health providers nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-6">Healthcare Expertise You Can Trust</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              We work exclusively with healthcare organizations, bringing deep clinical knowledge combined with IRS compliance expertise to help you research, optimize, and innovate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {industries.map((industry, index) => (
              <Link
                key={index}
                to={industry.link}
                className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${industry.bgColor} rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="mb-4 group-hover:text-primary-600 transition-colors">{industry.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">{industry.description}</p>
                <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Healthcare Only */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="mb-6">Why We Focus Exclusively on Healthcare</h2>
            </div>
            <div className="card">
              <p className="text-lg text-neutral-700 mb-6">
                Healthcare R&D is fundamentally different from other industries. Clinical workflows, patient outcomes, regulatory compliance, and HIPAA requirements demand specialized knowledge that generalist consulting firms simply don't have.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Our team includes <strong>Registered Nurses</strong>, <strong>Board Certified Behavior Analysts</strong>, <strong>Enrolled Agents</strong>, and <strong>healthcare technology specialists</strong>—professionals who understand both the clinical realities and the IRS requirements.
              </p>
              <p className="text-lg text-neutral-700">
                This healthcare-only focus means we identify R&D opportunities others miss, document work that withstands IRS scrutiny, and help you build systems that genuinely improve patient care while qualifying for tax benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="mb-6">Ready to Discover Your Practice's R&D Potential?</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
              Whether you're a medical practice or behavioral health provider, we'll help you identify, document, and maximize your R&D opportunities. Start with a quick prequalification assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                Get Prequalified
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn shadow-strong transform hover:scale-110" style={{ backgroundColor: 'white', color: '#000', border: '2px solid #89c726' }}>
                View Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
