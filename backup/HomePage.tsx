import React from "react";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div style={{ paddingTop: "4rem" }}>
      {/* Hero Section */}
      <section className="hero" style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Blueprint-Wallpaper-for-Desktop.jpg') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="modern-badge modern-badge-primary mb-4 sm:mb-6 md:mb-8 animate-fade-in-up">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 3.98L7 15.87 2 11l6.91-1.74L12 2z"/>
              </svg>
              TRUSTED BY HEALTHCARE PRACTICES NATIONWIDE
            </div>
            <h1>
              Turn healthcare innovation into measurable ROI
            </h1>
            <p>
              by optimizing your practice and capturing federal & state tax credits—joining forward-thinking teams already seeing significant     returns.
            </p>
            <div className="hero-buttons">
              <a href="/contact" className="btn btn-primary group">
                Get ROI Blueprint
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/rd-tax-credit-guide" className="btn btn-secondary">
                Learn About our Methodology
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Background with animated gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-800"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-500/10 to-accent-600/20"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-16 md:left-16 w-16 sm:w-20 md:w-40 h-16 sm:h-20 md:h-40 bg-tertiary-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-16 md:right-16 w-20 sm:w-32 md:w-60 h-20 sm:h-32 md:h-60 bg-secondary-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-12 sm:w-16 md:w-32 h-12 sm:h-16 md:h-32 bg-accent-400/20 rounded-full blur-xl animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>
        
        <div className="container">
          <div className="relative z-10">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
              <div className="modern-badge mb-6 sm:mb-8" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)", backdropFilter: "blur(20px)" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 3.98L7 15.87 2 11l6.91-1.74L12 2z"/>
                </svg>
                PROVEN RESULTS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6" style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}>
                Delivering Exceptional Value
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto font-light" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}>
                 <span style={{ color: "white" }}>Our track record speaks for itself - helping healthcare
                 practices nationwide unlock substantial savings through systematic transformation</span>
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="group animate-slide-in-left">
                <div className="relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-110 hover:-translate-y-2">
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-2 sm:mb-3 md:mb-5 group-hover:text-primary-200 transition-colors duration-500" style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                      $2M+
                    </div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-100 mb-1 sm:mb-2 md:mb-3">
                      Combined Savings Secured
                    </div>
                    <p className="text-primary-200 text-xs sm:text-sm md:text-base font-medium">
                      Operational improvements, tax credits delivered
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-110 hover:-translate-y-2">
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-2 sm:mb-3 md:mb-5 group-hover:text-primary-200 transition-colors duration-500" style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                      15+
                    </div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-100 mb-1 sm:mb-2 md:mb-3">
                      Years Healthcare Experience
                    </div>
                    <p className="text-primary-200 text-xs sm:text-sm md:text-base font-medium">
                      Combined clinical and financial expertise
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group animate-slide-in-right sm:col-span-2 md:col-span-1" style={{ animationDelay: '0.4s' }}>
                <div className="relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-110 hover:-translate-y-2">
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18"/>
                      <path d="M8 17l4-4 4 4 6-6"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-2 sm:mb-3 md:mb-5 group-hover:text-primary-200 transition-colors duration-500" style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}>
                      20-35%
                    </div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-100 mb-1 sm:mb-2 md:mb-3">
                      Efficiency Improvements
                    </div>
                    <p className="text-primary-200 text-xs sm:text-sm md:text-base font-medium">
                      Average operational optimization results
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional trust indicators */}
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-primary-100 text-sm sm:text-base md:text-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  </svg>
                  <span className="font-semibold">IRS Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className="font-semibold">Audit Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 3.98L7 15.87 2 11l6.91-1.74L12 2z"/>
                  </svg>
                  <span className="font-semibold">HIPAA Compliant Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-sm">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="modern-badge modern-badge-secondary mb-4 sm:mb-6 md:mb-8">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              OUR EXPERTISE
            </div>
            <h2>Our Core Methodology</h2>
            <p>
              Specialized expertise in healthcare transformation and
              systematic ROI delivery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="service-card card group animate-slide-in-left">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11H1l6-6 6 6"/>
                  <path d="M9 17l3 3 3-3"/>
                  <path d="M22 18h-7l-3-3-3 3H2"/>
                </svg>
              </div>
              <h3>RESEARCH Phase</h3>
              <h4 className="text-base sm:text-lg font-semibold text-primary-600 mb-3">Comprehensive analysis, quantified mapping of ROI opportunities.</h4>
              <p>
                Deep discovery across operations, technology, and finance reveals optimization opportunities, with quantified ROI mapping for every practice touchpoint.
              </p>
              <div className="mt-auto">
                <a href="/services" className="btn btn-primary group-hover:shadow-2xl">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="service-card card group sm:col-span-2 lg:col-span-1 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9l-5 4.87 1.18 6.88L12 17.77l-6.18 3.98L7 15.87 2 11l6.91-1.74L12 2z"/>
                  <path d="M8 12l2 2 4-4"/>
                </svg>
              </div>
              <h3>OPTIMIZE Phase</h3>
              <h4 className="text-base sm:text-lg font-semibold text-primary-600 mb-3">Workflow redesign, automation, measurable operational efficiency gains.</h4>
              <p>
                Clinical workflows are redesigned, EMRs optimized, and processes automated, producing efficiency gains documented for compliance and tax optimization.
              </p>
              <div className="mt-auto">
                <a href="/services" className="btn btn-primary group-hover:shadow-2xl">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="service-card card group animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  <path d="M9 9h6"/>
                  <path d="M9 15h6"/>
                </svg>
              </div>
              <h3>INNOVATE Phase</h3>
              <h4 className="text-base sm:text-lg font-semibold text-primary-600 mb-3">Strategic technology, maximizing federal and state credits.</h4>
              <p>
                Healthcare innovations are deployed strategically, creating advantage and qualifying federal and state tax credits, with documentation maximizing benefits.
              </p>
              <div className="mt-auto">
                <a href="/services" className="btn btn-primary group-hover:shadow-2xl">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16" style={{ alignItems: "center" }}>
            <div className="animate-slide-in-left">
              <div className="modern-badge modern-badge-primary mb-6 sm:mb-8 md:mb-10">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                </svg>
                WHY CHOOSE US
              </div>
              <h2>Why Choose ROI Blueprint™?</h2>
              <p className="mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                We specialize in helping healthcare practices unlock hidden value through strategic transformation and systematic ROI optimization. Our proven Research. Optimize. Innovate. methodology has delivered millions in combined operational savings and tax credits while improving clinical outcomes.
              </p>
              <div className="mb-6 sm:mb-8 md:mb-10 space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <div className="icon-container mr-4 sm:mr-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-semibold">Proven track record with $2M+ in combined savings secured</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-container mr-4 sm:mr-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-semibold">Specialized expertise in healthcare practice transformation</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-container mr-4 sm:mr-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-semibold">Comprehensive support from analysis through ongoing optimization</span>
                </div>
              </div>
              <a href="/contact" className="btn btn-primary shadow-strong transform hover:scale-110">
                Schedule Consultation
                <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="order-first lg:order-last animate-slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business team analyzing financial data and R&D investment opportunities"
                className="w-full h-64 sm:h-72 md:h-96 lg:h-[28rem] xl:h-[32rem] object-cover rounded-2xl sm:rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section dark-section" style={{ textAlign: "center" }}>
        <div className="container">
          <div className="modern-badge mb-6 sm:mb-8 md:mb-10 animate-fade-in-up" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)", backdropFilter: "blur(20px)" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            GET STARTED TODAY
          </div>
          <h2 className="animate-scale-in" style={{ animationDelay: '0.2s' }}>Ready to Transform Your Healthcare Practice?</h2>
          <p className="text-primary-100 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-14 max-w-3xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.4s', textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}>
            Let's discuss how our ROI Blueprint™ methodology can help you optimize operations, improve patient care, and secure substantial financial returns.
          </p>
          <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <a href="/contact" className="btn btn-secondary shadow-strong transform hover:scale-110">
            Schedule Your ROI Blueprint Consultation
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          </div>
        </div>
      </section>
    </div>
  );
}