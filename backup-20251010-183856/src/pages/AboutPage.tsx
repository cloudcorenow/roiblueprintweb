import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Eye, Award, ExternalLink, CheckCircle, TrendingUp, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rebecca Escobar",
      title: "Founder & Chief Executive Officer",
      description: "As Founder and CEO, Rebecca leads ROI Blueprint's strategy, focusing on operational optimization while ensuring R&D documentation meets IRS compliance and audit defense standards. Enrolled Agent and current Founder of Asset Allies Tax LLC, helping hundreds of business clients save on taxes, scale operations, and maintain compliance over 20+ years. BA in Accounting from University of La Verne.",
      linkedIn: "#",
      image: "/Rebecca.jpeg"
    },
    {
      name: "Leandro Amado",
      title: "Chief Technology Officer",
      description: "As Chief Technology Officer, Leandro oversees the HIPAA-compliant ROI Blueprint™ platform, ensuring secure technology that automates R&D documentation and integrates with practice management systems. Over 15 years of technology expertise spanning software development, cloud solutions, and network administration. Certified in multiple programming languages and frameworks. BA in Technology from ITT Technical Institute and AA from Cal State Fullerton.",
      linkedIn: "#",
      image: "/Leandro.jpg"
    },
    {
      name: "Yvette Oseguera",
      title: "Chief Client Officer",
      description: "As Chief Client Officer, Yvette leads all client relationships, ensuring practices receive guidance that respects clinical realities while identifying R&D documentation opportunities. Emergency room nurse with 20+ years of clinical experience, including management roles at USC focused on healthcare operations and clinical workflow optimization. AA in Nursing and BA in Communications from Cal State Fullerton.",
      linkedIn: "#",
      image: "/Yvette.jpeg"
    },
    {
      name: "Monica Harris",
      title: "Chief Operating Officer",
      description: "As Chief Operating Officer, Monica oversees day-to-day operations and client relationship management, ensuring healthcare practices receive seamless coordination throughout their ROI Blueprint™ engagement. Entrepreneur with 30+ years of business experience spanning operations management, business development, and client relations, with expertise in building efficient operational systems and service delivery.",
      linkedIn: "#",
      image: "/Monica.jpg"
    },
    {
      name: "Sali Burton",
      title: "Chief Innovation Officer",
      description: "As Chief Innovation Officer, Sali leads innovation strategy, helping ABA and behavioral health practices identify and optimize their clinical protocol development, data systems, and training methodologies as qualifying R&D activities. Board Certified Behavior Analyst with 10+ years in Applied Behavior Analysis and current founder of Burton Behavioral Interventions Corp. (BBIC). Master's in Education with Autism specialization from National University and Bachelor's in Business Management from Pepperdine University.",
      linkedIn: "#",
      image: "/Sali.jpg"
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
          url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
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
              <Users className="w-4 h-4" />
              HEALTHCARE ROI SPECIALISTS
            </div>
            <h1>The Only R&D Team With Deep Healthcare & Tax Expertise</h1>
            <p>
              Clinical knowledge meets IRS compliance and audit defense.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary group">
                Get Your ROI Assessment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                View ROI Blueprint™
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Target className="w-4 h-4" />
              MISSION & VISION
            </div>
            <h2>What Drives Us</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our commitment to helping healthcare practices optimize operations, innovate services, and build competitive advantages.
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
                To help healthcare practices optimize operations, innovate services, and build competitive advantages through systematic R&D work that may qualify for tax benefits. Serving ABA and medical practices nationwide. Headquartered in Florida.
              </p>
            </div>

            <div className="card group hover:shadow-2xl transition-all duration-500 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-success-500 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8" />
                </div>
                <h3>Our Vision</h3>
              </div>
              <p className="text-neutral-600 text-center leading-relaxed">
                To unlock billions in untapped tax benefits for healthcare practices while revolutionizing how they innovate, operate, and deliver patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Healthcare Excellence */}
      <section className="section dark-section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge mb-8" style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.2)", 
              color: "white", 
              border: "1px solid rgba(255, 255, 255, 0.3)", 
              backdropFilter: "blur(20px)" 
            }}>
              <Award className="w-4 h-4" />
              OUR STORY
            </div>
            <h2>Why ROI Blueprint Exists</h2>
            <p className="text-primary-100 text-xl max-w-4xl mx-auto">
              Practices do R&D work but can't navigate strict IRS rules alone. Tax knowledge isn't enough. Developing protocols requires clinical expertise. Building training programs needs technology. Documenting everything demands all three working together. That's what we built.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 mb-8 animate-scale-in">
              <p className="text-lg text-white leading-relaxed mb-8">
                Our ROI Blueprint™ methodology systematically captures this innovation through three phases: 
                <strong className="text-primary-300"> Research</strong> (comprehensive analysis of practice opportunities), 
                <strong className="text-primary-300"> Optimize</strong> (workflow redesign and automation), and 
                <strong className="text-primary-300"> Innovate</strong> (strategic technology deployment maximizing tax credits).
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Research</h4>
                  <p className="text-primary-100 text-sm">Comprehensive analysis of practice opportunities</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Optimize</h4>
                  <p className="text-primary-100 text-sm">Workflow redesign and automation</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Innovate</h4>
                  <p className="text-primary-100 text-sm">Strategic technology deployment maximizing tax credits</p>
                </div>
              </div>
              
              <p className="text-lg text-white leading-relaxed">
                We don't just identify opportunities—we implement them with ongoing support, ensuring your 
                innovations are properly leveraged for maximum operational efficiency, financial return, and 
                strategic advantage while maintaining the highest standards of patient care.
              </p>
            </div>

            {/* Key Differentiators */}
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-300" />
                  <h4 className="text-white font-semibold">Healthcare-Only Focus</h4>
                </div>
                <p className="text-primary-100 text-sm">
                  We exclusively serve healthcare practices, understanding your unique operational challenges and innovation opportunities.
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-300" />
                  <h4 className="text-white font-semibold">Clinical & Tax Expertise</h4>
                </div>
                <p className="text-primary-100 text-sm">
                  Licensed clinical professionals (RN, BCBA) and Enrolled Agent with IRS representation authority work together.
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-300" />
                  <h4 className="text-white font-semibold">Technology-Enabled Methodology</h4>
                </div>
                <p className="text-primary-100 text-sm">
                  HIPAA-compliant platform automates documentation through our proprietary Research, Optimize, and Innovate process.
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-300" />
                  <h4 className="text-white font-semibold">Ongoing Support</h4>
                </div>
                <p className="text-primary-100 text-sm">
                  We provide continuous support and optimization, not just 
                  one-time assessments or implementations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-primary mb-8">
              <Users className="w-4 h-4" />
              LEADERSHIP TEAM
            </div>
            <h2>Leadership Team</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Healthcare industry experts with deep clinical, technical, and business expertise helping practices research, optimize, and innovate their operations.
            </p>
          </div>

          <div className="space-y-12">
            {teamMembers.map((member, index) => (
              <div key={index} className={`card group animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="grid lg:grid-cols-4 gap-8 items-start">
                  <div className="lg:col-span-1">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="mb-2">{member.name}</h3>
                        <div className="modern-badge modern-badge-primary mb-4">
                          {member.title}
                        </div>
                      </div>
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline text-sm px-4 py-2 group-hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn Profile
                      </a>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
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
              <Link to="/contact" className="btn btn-primary shadow-strong transform hover:scale-110">
                Get Your ROI Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn btn-secondary shadow-strong transform hover:scale-110">
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