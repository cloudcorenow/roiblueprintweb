import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Zap,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  Award,
  Users,
  TrendingUp,
  Shield,
  Target,
} from "lucide-react";

import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

import { prequalificationQuestions } from "../constants/prequalificationQuestions";
import PrequalificationWizard from "../components/contact/PrequalificationWizard";
import EmailCapture from "../components/contact/EmailCapture";
import ContactForm from "../components/contact/ContactForm";
import StandaloneContactForm from "../components/contact/StandaloneContactForm";
import CalComEmbed from "../components/contact/CalComEmbed";

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState<
    "initial" | "email" | "prequalification" | "qualified" | "disqualified" | "contact"
  >("initial");
  const [disqualificationMessage, setDisqualificationMessage] = useState("");
  const calendarRef = useRef<HTMLElement>(null);

  const startPrequalification = () => setCurrentStep("email");
  const resetFlow = () => setCurrentStep("initial");

  // Scroll to calendar when user becomes qualified
  useEffect(() => {
    if (currentStep === "qualified" && calendarRef.current) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [currentStep]);

  // SEO fields (keep in one place so both SEO + schema stay consistent)
  const seoTitle = "Contact Us - Prequalify for R&D Tax Credits in 3 Minutes";
  const seoDescription =
    "Get prequalified for healthcare R&D tax credits in under 3 minutes. Free consultation with ROI Blueprint experts. Serving medical and ABA practices nationwide. Call (855) 764-2583.";
  const seoKeywords =
    "R&D tax credit prequalification, healthcare practice consultation, free R&D assessment, medical practice tax credits, ABA practice tax credits, IRS Section 41, R&D documentation, healthcare R&D consulting, contact ROI Blueprint";
  const canonicalPath = "/contact";

  return (
    <div>
      {/* Meta SEO */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalPath}
        ogType="website"
        // Optional: set a dedicated OG image for this page if you have one.
        // ogImage="/og/contact.png"
      />

      {/* Page-level JSON-LD schema (WebPage only) */}
      <StructuredData
        type="webpage"
        pageTitle={seoTitle}
        pageDescription={seoDescription}
        pageUrl={canonicalPath}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        style={{
          paddingTop: "8rem",
          background: `
            linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
            url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Blueprint-Wallpaper-for-Desktop.jpg') center/cover no-repeat
          `,
        }}
      >
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm mb-8">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold">HEALTHCARE ROI SPECIALISTS</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="text-white">Transform Your Practice Into a </span>
                <span className="text-primary-400">Revenue Powerhouse</span>
              </h1>

              <p className="text-xl lg:text-2xl text-neutral-300 mb-6 leading-relaxed">
                Join 120+ healthcare practices already saving $30K-50K annually through our proven ROI Blueprint™
                methodology. Your transformation starts with one conversation.
              </p>

              <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
                Have questions or want to see if your practice qualifies for R&D documentation and potential credits?
                Complete a quick prequalification survey to get started.
              </p>

              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-black text-primary-400 mb-2">$5M+</div>
                  <div className="text-sm text-neutral-400">R&D Credits Identified</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-400 mb-2">120+</div>
                  <div className="text-sm text-neutral-400">Practices Served</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary-400 mb-2">3-5x</div>
                  <div className="text-sm text-neutral-400">Average ROI</div>
                </div>
              </div>
            </div>

            {/* Right Side - Quick Prequalification Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-neutral-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Quick Prequalification</h3>
                  <p className="text-neutral-600 mb-6">Get instant results in under 3 minutes</p>

                  <div className="bg-primary-50 rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary-600">8</div>
                        <div className="text-xs text-primary-700">Questions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary-600">3</div>
                        <div className="text-xs text-primary-700">Minutes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary-600">100%</div>
                        <div className="text-xs text-primary-700">Free</div>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStep === "initial" && (
                  <div className="space-y-4">
                    <button
                      onClick={startPrequalification}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Start Assessment
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </button>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-success-600 font-semibold">
                        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                        RECOMMENDED PATH
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === "email" && (
                  <EmailCapture onSuccess={() => setCurrentStep("prequalification")} onBack={resetFlow} />
                )}

                {currentStep === "prequalification" && (
                  <PrequalificationWizard
                    questions={prequalificationQuestions}
                    onQualified={() => setCurrentStep("qualified")}
                    onDisqualified={(msg) => {
                      setDisqualificationMessage(msg);
                      setCurrentStep("disqualified");
                    }}
                    onExit={resetFlow}
                  />
                )}

                {currentStep === "qualified" && (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Star className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-success-700 mb-4">🎉 You're Qualified!</h3>
                    <div className="bg-success-50 rounded-2xl p-6 mb-6">
                      <p className="text-success-800 font-semibold mb-4">
                        Congratulations! Your practice qualifies for our ROI Blueprint™ program.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-success-600">$30K-50K</div>
                          <div className="text-xs text-success-700">Annual Savings</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-success-600">3-5x</div>
                          <div className="text-xs text-success-700">ROI</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-600 mb-6">Use the calendar below to schedule your consultation ↓</p>
                    <button onClick={resetFlow} className="text-success-600 hover:text-success-700 underline font-semibold">
                      Start Over
                    </button>
                  </div>
                )}

                {currentStep === "disqualified" && (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-warning-800 mb-4">Thank You for Your Interest</h3>
                    <div className="bg-warning-50 rounded-2xl p-6 mb-6">
                      <p className="text-warning-800">{disqualificationMessage}</p>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={() => setCurrentStep("contact")}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        Get Paid Analysis ($1250)
                      </button>
                      <button
                        onClick={resetFlow}
                        className="w-full border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Section */}
      {currentStep === "contact" && (
        <section className="py-16 bg-neutral-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-40 h-40 bg-primary-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Direct Contact</h3>
                  <p className="text-neutral-600 mb-6">Speak with our experts directly</p>
                </div>

                <ContactForm onBack={resetFlow} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Calendar Section */}
      {(currentStep === "initial" ||
        currentStep === "prequalification" ||
        currentStep === "qualified" ||
        currentStep === "disqualified") && (
        <section ref={calendarRef} className="py-16 bg-neutral-50">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    {currentStep === "qualified" ? "Schedule Your ROI Consultation" : "Ready to Schedule?"}
                  </h3>
                  <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    {currentStep === "qualified"
                      ? "Book your personalized consultation to discuss your $30K-50K savings opportunity"
                      : "Complete the quick assessment above to unlock calendar scheduling"}
                  </p>
                </div>

                {currentStep === "qualified" ? (
                  <CalComEmbed />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Calendar className="w-16 h-16 text-neutral-400" />
                    </div>
                    <div className="bg-primary-50 rounded-2xl p-8 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Clock className="w-6 h-6 text-primary-600" />
                        <span className="font-bold text-primary-800 text-lg">Quick Assessment Required</span>
                      </div>
                      <p className="text-primary-700 mb-6">
                        Complete the 3-minute assessment above to unlock calendar scheduling and see your potential savings.
                      </p>
                      <button
                        onClick={startPrequalification}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        Start Assessment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form & Social Proof */}
      {currentStep !== "contact" && (
        <section id="contact-form" className="py-20 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white rounded-3xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Send Us a Message</h3>
                    <p className="text-neutral-600">We'll respond within 24 hours</p>
                  </div>

                  <StandaloneContactForm />
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-3xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Why Choose ROI BLUEPRINT™</h3>
                    <p className="text-neutral-600">Proven results for healthcare practices</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 mb-1">Healthcare-Only Focus</div>
                        <p className="text-neutral-600 text-sm">
                          Exclusively serving healthcare practices with specialized expertise
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 mb-1">Proven ROI Methodology</div>
                        <p className="text-neutral-600 text-sm">
                          $5M+ in R&D credits identified with 20-35% efficiency improvements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 mb-1">Complete Compliance</div>
                        <p className="text-neutral-600 text-sm">
                          IRS-compliant documentation with full audit protection
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 mb-1">Expert Team</div>
                        <p className="text-neutral-600 text-sm">
                          Licensed CPAs, EAs, and healthcare professionals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Why Choose Us */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
