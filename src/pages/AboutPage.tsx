import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Target,
  Eye,
  Award,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  Shield,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

export default function AboutPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleMember = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  const teamMembers = [
    {
      name: "Rebecca Escobar",
      title: "President & Chief Executive Officer",
      description:
        "As President & Chief Executive Officer, Rebecca leads ROI Blueprint's strategic direction, focusing on operational optimization while ensuring R&D documentation meets IRS compliance and audit defense standards. An Enrolled Agent and Founder of Asset Allies Tax LLC, she has helped hundreds of business clients save on taxes, scale operations, and maintain compliance over 20+ years. Rebecca holds a BA in Accounting from the University of La Verne.",
      linkedIn: "#",
      image: "/Rebecca.jpeg"
    },
    {
      name: "Leandro Amado",
      title: "Vice President & Chief Technology Officer",
      description:
        "As Vice President & Chief Technology Officer, Leandro oversees the HIPAA-compliant ROI Blueprint™ platform, ensuring secure technology that automates R&D documentation and integrates with practice management systems. Over 15 years of technology expertise spanning software development, cloud solutions, and network administration. Certified in multiple programming languages and frameworks. BA in Technology from ITT Technical Institute and AA from Cal State Fullerton.",
      linkedIn: "#",
      image: "/Leandro.jpg"
    },
    {
      name: "Yvette Oseguera",
      title: "Chief Client Officer",
      description:
        "As Chief Client Officer, Yvette leads all client relationships, ensuring practices receive guidance that respects real clinical workflows while identifying opportunities for R&D documentation. She is a registered nurse with 17+ years of experience, including emergency room nursing, serving as an RN House Supervisor, and working as a Clinic Nurse Manager at USC, where she focused on healthcare operations and workflow optimization. Yvette holds an Associate Degree in Nursing and a Bachelor's Degree in Communications from Cal State Fullerton.",
      linkedIn: "#",
      image: "/Yvette.jpeg"
    },
    {
      name: "Sali Burton",
      title: "Chief Innovation Officer",
      description:
        "As Chief Innovation Officer, Sali leads innovation strategy, helping behavioral health practices identify and optimize their clinical protocol development, data systems, and training methodologies as qualifying R&D activities. Board Certified Behavior Analyst with 10+ years in Applied Behavior Analysis and current founder of Burton Behavioral Interventions Corp. (BBIC). Master's in Education with Autism specialization from National University and Bachelor's in Business Management from Pepperdine University.",
      linkedIn: "#",
      image: "/Sali.jpg"
    },
    {
      name: "Monica Harris",
      title: "Chief Operating Officer",
      description:
        "As Chief Operating Officer, Monica oversees day-to-day operations and client relationship management, ensuring healthcare practices receive seamless coordination throughout their ROI Blueprint™ engagement. Entrepreneur with 30+ years of business experience spanning operations management, business development, and client relations, with expertise in building efficient operational systems and service delivery.",
      linkedIn: "#",
      image: "/Monica.jpg"
    }
  ];

  return (
    <div>
      <SEO
        title="About Our Healthcare R&D Tax Credit Team"
        description="Meet the ROI Blueprint team: Enrolled Agents, Registered Nurses, BCBAs, and technology experts helping healthcare practices optimize operations and qualify for R&D tax credits. Florida-based, serving practices nationwide."
        keywords="healthcare R&D consultants, Enrolled Agent, BCBA, registered nurse, healthcare tax experts, ROI Blueprint team, medical practice consultants, best R&D consulting firm, healthcare R&D experts, IRS-certified tax professionals healthcare, healthcare innovation consultants, medical practice business advisors"
        canonicalUrl="/about"
      />

      {/* Structured Data (page-specific only) */}
      <StructuredData
        type="webpage"
        pageTitle="About Our Healthcare R&D Tax Credit Team"
        pageDescription="Meet the ROI Blueprint team: Enrolled Agents, Registered Nurses, BCBAs, and technology experts helping healthcare practices optimize operations and qualify for R&D tax credits."
        pageUrl="/about"
      />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          paddingTop: "6rem",
          backgroundImage: "url('/4dcca43d-2969-40a8-9a4d-a215adb0b3c5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90"></div>
        <div className="container relative z-10">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <Users className="w-4 h-4" />
              Healthcare ROI Specialists
            </div>
            <h1>The Only R&amp;D Team With Deep Healthcare &amp; Tax Expertise</h1>
            <p>Clinical knowledge meets IRS compliance and audit defense.</p>
            <div className="hero-buttons">
              <Link
                to="/contact"
                className="btn group"
                style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
              >
                Get Your ROI Assessment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="btn"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #89c726"
                }}
              >
                View ROI Blueprint™
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Target className="w-4 h-4" />
              MISSION &amp; VISION
            </div>
            <h2>What Drives Us</h2>
            <p className="text-xl max-w-3xl mx-auto">
              We're committed to helping healthcare practices strengthen their
              operations, elevate their services, and drive innovation that leads
              to lasting growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card group hover:shadow-2xl transition-all duration-500 animate-slide-in-left">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8" />
                </div>
                <h3>Our Mission</h3>
              </div>
              <p className="text-neutral-600 text-center leading-relaxed">
                Our mission is to empower healthcare and ABA practices to operate
                efficiently, innovate with purpose, and access meaningful tax
                incentives through structured R&amp;D efforts. From our
                headquarters in Florida, we proudly serve clients nationwide who
                are ready to align their financial and operational goals for
                long-term success.
              </p>
            </div>

            <div
              className="card group hover:shadow-2xl transition-all duration-500 animate-slide-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8" />
                </div>
                <h3>Our Vision</h3>
              </div>
              <p className="text-neutral-600 text-center leading-relaxed">
                Our vision is to unlock billions in untapped tax benefits for
                healthcare providers while transforming how they innovate,
                operate, and deliver patient care. We aspire to create a
                nationwide movement where healthcare organizations use financial
                insight as a catalyst for growth—reinvesting in their people,
                expanding access to quality services, and shaping a stronger,
                more sustainable future for the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Healthcare Excellence */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Award className="w-4 h-4" />
              OUR STORY
            </div>
            <h2>Why ROI BLUEPRINT Exists</h2>
            <p className="text-neutral-700 text-xl max-w-4xl mx-auto mb-6">
              Most healthcare practices are already innovating—but few can
              navigate the complex intersection of IRS regulations, clinical
              protocols, and technology on their own. Tax expertise alone isn't
              enough. True innovation requires clinical insight and systems that
              capture every advancement with precision. That's why we built the
              ROI BLUEPRINT™.
            </p>
            <p className="text-neutral-700 text-xl max-w-4xl mx-auto">
              Our methodology transforms everyday innovation into measurable
              results through three phases:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card rounded-3xl p-8 md:p-12 mb-8 animate-scale-in">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-neutral-800 font-semibold mb-2">Research</h4>
                  <p className="text-neutral-600 text-sm">
                    Uncovering opportunities across operations and service delivery
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-neutral-800 font-semibold mb-2">Optimize</h4>
                  <p className="text-neutral-600 text-sm">
                    Redesigning workflows and implementing automation for efficiency
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-neutral-800 font-semibold mb-2">Innovate</h4>
                  <p className="text-neutral-600 text-sm">
                    Deploying strategic technology that maximizes eligible tax credits
                  </p>
                </div>
              </div>

              <p className="text-lg text-neutral-700 leading-relaxed">
                We don't just identify opportunities—we implement and sustain them.
                With continuous support, we ensure your innovation is documented,
                compliant, and leveraged for lasting operational, financial, and
                clinical impact.
              </p>
            </div>

            {/* Key Differentiators */}
            <div
              className="grid md:grid-cols-3 gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                  <h4 className="text-neutral-800 font-semibold">Healthcare-Only Focus</h4>
                </div>
                <p className="text-neutral-600 text-sm">
                  We work exclusively with healthcare practices, combining deep
                  understanding of operational realities with the drive to help you
                  scale through innovation.
                </p>
              </div>

              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                  <h4 className="text-neutral-800 font-semibold">Clinical &amp; Tax Expertise</h4>
                </div>
                <p className="text-neutral-600 text-sm">
                  Our team integrates licensed clinical professionals (RN, BCBA) and
                  an Enrolled Agent with IRS representation authority to ensure every
                  initiative meets both regulatory and practical standards.
                </p>
              </div>

              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                  <h4 className="text-neutral-800 font-semibold">Technology-Enabled Process</h4>
                </div>
                <p className="text-neutral-600 text-sm">
                  Our HIPAA-compliant platform automates and organizes documentation
                  through our proprietary Research, Optimize, and Innovate framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="leadership-team" className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Users className="w-4 h-4" />
              LEADERSHIP TEAM
            </div>
            <h2>Leadership Team</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Healthcare industry experts with deep clinical, technical, and business
              expertise helping practices research, optimize, and innovate their
              operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-[1600px] mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card group animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
                <h3 className="mb-2 text-lg">{member.name}</h3>
                <div className="modern-badge modern-badge-primary mb-4 inline-flex text-xs">
                  {member.title}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedMember === index
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-neutral-600 leading-relaxed mb-4 text-left text-sm">
                    {member.description}
                  </p>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-sm px-4 py-2 w-full mb-4 group-hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </div>
                <button
                  onClick={() => toggleMember(index)}
                  className="btn btn-outline text-sm px-4 py-2 w-full group-hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  {expandedMember === index ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Learn More
                    </>
                  )}
                </button>
              </div>
            ))}
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
            <h2 className="mb-6">Ready to Transform Your Healthcare Practice?</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
              Join the growing number of healthcare practices that have unlocked their hidden
              financial potential through our ROI Blueprint™ methodology. Let's discuss how
              we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="btn shadow-strong transform hover:scale-110"
                style={{ backgroundColor: "#ade5f8", color: "#004aad" }}
              >
                Get Your ROI Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/services"
                className="btn shadow-strong transform hover:scale-110"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  border: "2px solid #89c726"
                }}
              >
                View ROI Blueprint™
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
