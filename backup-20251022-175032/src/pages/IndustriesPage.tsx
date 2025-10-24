import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, TrendingUp, Users, Stethoscope, Brain, Cpu, Heart, Smile, Shield } from "lucide-react";

export default function IndustriesPage() {
  const practiceTypes = [
    {
      name: "ABA Therapy Practices",
      subtitle: "Applied Behavior Analysis, Autism Services, Behavioral Health",
      icon: Brain,
      categories: [
        {
          title: "Protocol Development",
          activities: [
            "Developing individualized behavior intervention protocols",
            "Creating systematic assessment methodologies",
            "Designing functional behavior analysis frameworks",
            "Building treatment plan optimization systems"
          ]
        },
        {
          title: "Data Systems & Analytics",
          activities: [
            "Creating custom data collection systems",
            "Building automated progress tracking tools",
            "Designing outcome measurement frameworks",
            "Developing data analysis and reporting systems"
          ]
        },
        {
          title: "Training & Implementation",
          activities: [
            "Building staff training methodologies",
            "Creating competency assessment frameworks",
            "Developing systematic onboarding programs",
            "Designing quality assurance protocols"
          ]
        }
      ],
      color: "from-[#93f2e0] to-[#7dd9c7]"
    },
    {
      name: "Medical & Specialty Practices",
      subtitle: "Primary Care, Multi-specialty Clinics, Family Medicine, Internal Medicine, Specialty Practices",
      icon: Stethoscope,
      categories: [
        {
          title: "Clinical Innovation",
          activities: [
            "Developing clinical protocols for chronic disease management",
            "Creating preventive care program frameworks",
            "Designing care coordination systems",
            "Building patient risk stratification tools"
          ]
        },
        {
          title: "Technology Integration",
          activities: [
            "Customizing EMR systems for specialty workflows",
            "Implementing and optimizing telehealth platforms",
            "Developing patient portal enhancements",
            "Creating clinical decision support integrations"
          ]
        },
        {
          title: "Quality & Safety",
          activities: [
            "Building patient safety monitoring systems",
            "Designing quality improvement initiatives",
            "Creating clinical outcome measurement tools",
            "Developing infection control protocols"
          ]
        }
      ],
      color: "from-[#93f2e0] to-[#7dd9c7]"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: "6rem" }}>
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <Stethoscope className="w-4 h-4" />
              Healthcare R&D Specialists
            </div>
            <h1>ABA & Medical Practices: Your Daily Work Can Count as R&D</h1>
            <p>
              We serve ABA and medical practices. Your daily operations may qualify as R&D work worth documenting.
            </p>
          </div>
        </div>
      </section>

      {/* Find Your Practice Type */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Common R&D Activities
            </div>
            <h2>How Your Specialty Qualifies</h2>
            <p className="text-xl max-w-4xl mx-auto">
              These are real R&D activities that ABA and medical practices perform every day—often without realizing they qualify for documentation and potential tax benefits.
            </p>
          </div>

          <div className="space-y-8">
            {practiceTypes.map((practice, index) => (
              <div key={index} className={`card group animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${practice.color} text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <practice.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{practice.name}</h3>
                    <p className="text-lg text-neutral-600 mb-6">{practice.subtitle}</p>

                    <div className="space-y-6">
                      {practice.categories.map((category, catIndex) => (
                        <div key={catIndex}>
                          <h4 className="font-semibold text-primary-600 mb-3">{category.title}</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {category.activities.map((activity, activityIndex) => (
                              <div key={activityIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                                <span className="text-sm text-neutral-700">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognize Your Practice's R&D Activities */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-8">
              <Shield className="w-4 h-4" />
              RECOGNIZE YOUR R&D ACTIVITIES
            </div>
            <h2>Recognize Your Practice's R&D Activities?</h2>
            <p className="text-xl max-w-4xl mx-auto">
              Performing these activities? You're doing R&D work. We help you document it for potential tax benefits.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card animate-fade-in-up">
              <h3 className="mb-6 text-center">Which Service Is Right For You?</h3>

              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-6 py-4">
                  <h4 className="font-semibold text-xl mb-2">ROI Blueprint</h4>
                  <p className="text-neutral-600">
                    For practices with $1M+ revenue and 15+ team members ready for full R&D implementation and systematic documentation.
                  </p>
                </div>

                <div className="border-l-4 border-success-500 pl-6 py-4">
                  <h4 className="font-semibold text-xl mb-2">ROI Roadmap</h4>
                  <p className="text-neutral-600">
                    For practices building toward full implementation—includes R&D preparation and comprehensive tax planning strategy.
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link to="/contact" className="btn btn-primary">
                  Prequalify Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              <p className="text-sm text-neutral-500 text-center mt-6">
                Practice outside ABA or traditional medicine? Contact us to discuss how your specialty's innovation activities may qualify for R&D documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Document These Activities */}
      <section className="section dark-section">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge mb-8" style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)"
            }}>
              <TrendingUp className="w-4 h-4" />
              WHY DOCUMENT
            </div>
            <h2>Why Document These Activities?</h2>
            <p className="text-primary-100 text-xl max-w-3xl mx-auto">
              We help you document R&D work for IRS compliance. You get potential tax benefits plus operational improvements from work you're already doing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 text-center animate-scale-in">
              <p className="text-lg text-white leading-relaxed mb-6">
                Our EA/RN/IT/BCBA research team brings over 20 years of combined healthcare experience to systematically identify, optimize, and document these activities for IRS compliance and operational excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
                <Link to="/contact" className="btn btn-secondary shadow-strong">
                  See If You Qualify
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/services" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                  How We Help
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #93f2e0 0%, #7dd9c7 100%)', color: 'white' }}>
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6">Ready to Optimize Your Practice?</h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
              Turn daily operations into documented R&D work that may qualify for tax benefits. Serving ABA and medical practices nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn btn-primary shadow-strong transform hover:scale-110">
                Prequalify Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="btn btn-secondary shadow-strong transform hover:scale-110">
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