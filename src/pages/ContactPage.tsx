import React, { useState } from "react";
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
import Turnstile from "../components/Turnstile";

interface Question {
  question: string;
  qualifyingResponse: boolean;
  nonQualifyingMessage: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
}

const prequalificationQuestions: Question[] = [
  {
    question: "Is your practice a US-based taxable entity (not foreign or non-profit)?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your interest. Our ROI Blueprint™ program is designed specifically for US-based taxable entities. We'd be happy to direct you to our ROI Roadmap with resources that may be more applicable to your situation.",
  },
  {
    question: "Are you the decision-maker for strategic investments and operational improvements?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your time. Since strategic decisions require input from your partners/board, we'd like to direct you to our ROI Roadmap where you can gather information to present to your decision-makers.",
  },
  {
    question: "Does your practice have $1M+ annual revenue with at least $500K in combined staff wages and operational expenses?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for exploring this opportunity. While your current revenue and expense levels are below our typical threshold, we'd like to direct you to our ROI Roadmap which includes strategies for building optimization foundations as you grow.",
  },
  {
    question: "Does your practice regularly develop clinical protocols, implement technology systems, create training programs, or improve operational processes?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your interest. Many practices don't realize that common activities like staff training development, process improvements, or technology implementations can qualify for substantial benefits. Please check out our ROI Roadmap to learn more about potential opportunities in your practice.",
  },
  {
    question: "Are you interested in systematically optimizing your practice operations in ways that could generate measurable financial benefits?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for your time. Our ROI Roadmap includes information about systematic optimization approaches that might align better with your current business philosophy.",
  },
  {
    question: "Are you looking to implement operational improvements within the next 90 days?",
    qualifyingResponse: true,
    nonQualifyingMessage:
      "Thank you for considering our program. Our assessment process is designed for practices ready to implement improvements within 90 days. Please check out our ROI Roadmap for information you can review when you're ready to move forward.",
  },
];

const validateForm = (data: FormData): Partial<Record<keyof FormData, string>> => {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
  if (!data.company.trim()) errors.company = "Practice name is required";
  if (!data.industry.trim()) errors.industry = "Practice type is required";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
};

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState<
    "initial" | "email" | "prequalification" | "qualified" | "disqualified" | "contact"
  >("initial");
  const [disqualificationMessage, setDisqualificationMessage] = useState("");

  const startPrequalification = () => setCurrentStep("email");
  const resetFlow = () => setCurrentStep("initial");

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" style={{
        paddingTop: "8rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Blueprint-Wallpaper-for-Desktop.jpg') center/cover no-repeat
        `
      }}>
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
                Join 120+ healthcare practices already saving $30K-50K annually through our
                proven ROI Blueprint™ methodology. Your transformation starts with one conversation.
              </p>

              <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
                Have questions or want to see if your practice qualifies for R&D documentation and potential
                credits? Complete a quick prequalification survey to get started.
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
                  <EmailCapture
                    onSuccess={() => setCurrentStep("prequalification")}
                    onBack={resetFlow}
                  />
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
                    <p className="text-neutral-600 mb-6">
                      Use the calendar below to schedule your consultation ↓
                    </p>
                    <button
                      onClick={resetFlow}
                      className="text-success-600 hover:text-success-700 underline font-semibold"
                    >
                      Start Over
                    </button>
                  </div>
                )}

                {currentStep === "disqualified" && (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-warning-800 mb-4">
                      Thank You for Your Interest
                    </h3>
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
      {(currentStep === "initial" || currentStep === "prequalification" || currentStep === "qualified" || currentStep === "disqualified") && (
        <section className="py-16 bg-neutral-50">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              {/* Calendar Section */}
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
                    : "Complete the quick assessment above to unlock calendar scheduling"
                  }
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
                      <p className="text-neutral-600 text-sm">Exclusively serving healthcare practices with specialized expertise</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 mb-1">Proven ROI Methodology</div>
                      <p className="text-neutral-600 text-sm">$5M+ in R&D credits identified with 20-35% efficiency improvements</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 mb-1">Complete Compliance</div>
                      <p className="text-neutral-600 text-sm">IRS-compliant documentation with full audit protection</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center mt-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 mb-1">Expert Team</div>
                      <p className="text-neutral-600 text-sm">Licensed CPAs, EAs, and healthcare professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      )}
    </div>
  );
}

/* =========================
 * Cal.com Embed Component
 * =======================*/
const CalComEmbed: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-lg" style={{ height: "600px" }}>
        <iframe
          src="https://cal.com/cloudcore/30min"
          width="100%"
          height="100%"
          frameBorder={0}
          loading="lazy"
          style={{ border: "none" }}
          title="Schedule a 30-minute consultation"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600 mb-3">
          Having trouble with the calendar?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://cal.com/cloudcore/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm underline font-medium"
          >
            Open in New Window
          </a>
          <span className="text-neutral-400 text-sm hidden sm:inline">or</span>
          <a
            href="mailto:info@roiblueprint.com?subject=Consultation Request"
            className="text-primary-600 hover:text-primary-700 text-sm underline font-medium"
          >
            Email Us Instead
          </a>
        </div>
      </div>
    </div>
  );
};

/* =========================
 * Prequalification Wizard Component
 * =======================*/
const PrequalificationWizard: React.FC<{
  questions: Question[];
  onQualified: () => void;
  onDisqualified: (message: string) => void;
  onExit: () => void;
}> = ({ questions, onQualified, onDisqualified, onExit }) => {
  const [idx, setIdx] = React.useState(0);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const total = questions.length;
  const current = questions[idx];
  const progress = ((idx + 1) / total) * 100;

  React.useEffect(() => {
    headingRef.current?.focus();
  }, [idx]);

  const handleAnswer = (answer: boolean) => {
    if (answer !== current.qualifyingResponse) {
      onDisqualified(current.nonQualifyingMessage);
      return;
    }
    if (idx < total - 1) {
      setIdx((n) => n + 1);
    } else {
      onQualified();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-primary-600 mb-1">
            Question {idx + 1} of {total}
          </div>
          <div className="text-xs text-neutral-500">
            {total - idx - 1} questions remaining
          </div>
        </div>
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-300 flex items-center justify-center"
          aria-label="Go back to options"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-neutral-600">Progress</span>
          <span className="text-xs font-bold text-neutral-800">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-400 via-primary-500 to-success-500 h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-neutral-50 rounded-2xl p-6">
        <h4
          ref={headingRef}
          tabIndex={-1}
          className="text-lg font-bold text-neutral-800 mb-6 leading-relaxed"
        >
          {current.question}
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="group p-4 border-2 border-success-200 rounded-xl hover:border-success-400 hover:bg-success-50 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-success-700">Yes</span>
          </button>

          <button
            onClick={() => handleAnswer(false)}
            className="group p-4 border-2 border-neutral-200 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-neutral-500 to-neutral-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <X className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-neutral-700">No</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      {idx > 0 && (
        <div className="flex justify-start">
          <button 
            onClick={() => setIdx((n) => n - 1)} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================
 * Contact Form Component
 * =======================*/
const ContactForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [botField, setBotField] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return;

    const hasTurnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (hasTurnstileKey && !turnstileToken) {
      setErrors({ message: "Please complete the security verification" as any });
      return;
    }

    const v = validateForm(formData);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSubmitting(true);
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
          turnstileToken,
          honeypot: botField
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSuccess(true);
      setFormData({ name: "", email: "", company: "", industry: "", message: "" });
      setTurnstileToken("");
    } catch (err) {
      console.error('Form submission error:', err);
      setErrors({ message: (err instanceof Error ? err.message : "There was an error submitting your form. Please try again.") as any });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-neutral-800">Send us a message</h4>
          <p className="text-sm text-neutral-600">We'll respond within 24 hours</p>
        </div>
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-300 flex items-center justify-center"
          aria-label="Go back to options"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {success && (
        <div className="rounded-xl border border-success-200 bg-success-50 p-4 text-success-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <div>
              <p className="font-medium text-sm">Message sent successfully!</p>
              <p className="text-xs text-success-700">We'll contact you within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <div className="hidden">
          <input
            name="company_website"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-2">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">Select Industry</option>
              <option value="medical">Medical/Healthcare</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="aba">ABA Therapy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
            How can we help you?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your needs..."
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
          />
        </div>

        <Turnstile
          onVerify={setTurnstileToken}
          onError={() => setErrors({ message: "Verification failed. Please try again." as any })}
          onExpire={() => setTurnstileToken("")}
        />

        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          disabled={submitting || (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken)}
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

/* =========================
 * Email Capture Component
 * =======================*/
const EmailCapture: React.FC<{ onSuccess: () => void; onBack: () => void }> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await Promise.all([
        fetch('/api/guide-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            guide_name: 'prequalification-assessment',
          }),
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: email.split('@')[0],
            message: 'Prequalification assessment request',
            formType: 'guide'
          }),
        })
      ]);

      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Error saving email:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-neutral-800">Enter Your Email</h4>
          <p className="text-sm text-neutral-600">Get instant access to your assessment</p>
        </div>
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-300 flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-primary-50 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
          <div className="text-sm text-primary-800">
            <p className="font-semibold mb-1">Why we need your email:</p>
            <ul className="list-disc list-inside space-y-1 text-primary-700">
              <li>Receive your personalized assessment results</li>
              <li>Get follow-up resources tailored to your needs</li>
              <li>Stay updated on optimization opportunities</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assessment-email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="assessment-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
              Processing...
            </>
          ) : (
            <>
              Continue to Assessment
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </>
          )}
        </button>

        <p className="text-xs text-neutral-500 text-center">
          We respect your privacy. Your email will only be used to send you assessment results and valuable insights.
        </p>
      </form>
    </div>
  );
};

const StandaloneContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [botField, setBotField] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return;

    const hasTurnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (hasTurnstileKey && !turnstileToken) {
      setErrors({ message: "Please complete the security verification" as any });
      return;
    }

    const v = validateForm(formData);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSubmitting(true);
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
          turnstileToken,
          honeypot: botField
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send email' }));
        throw new Error(errorData.error || 'Failed to send email');
      }

      setSuccess(true);
      setFormData({ name: "", email: "", company: "", industry: "", message: "" });
      setTurnstileToken("");
    } catch (err) {
      console.error('Form submission error:', err);
      setErrors({ message: (err instanceof Error ? err.message : "There was an error submitting your form. Please try again.") as any });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {success && (
        <div className="rounded-xl border border-success-200 bg-success-50 p-4 text-success-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <div>
              <p className="font-medium text-sm">Message sent successfully!</p>
              <p className="text-xs text-success-700">We'll contact you within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="hidden">
          <input
            name="company_website"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="standalone-name" className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="standalone-name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.name && <p className="text-xs text-error-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="standalone-email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="standalone-email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.email && <p className="text-xs text-error-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="standalone-company" className="block text-sm font-medium text-neutral-700 mb-2">
            Practice Name *
          </label>
          <input
            type="text"
            id="standalone-company"
            name="company"
            required
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          {errors.company && <p className="text-xs text-error-600 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="standalone-industry" className="block text-sm font-medium text-neutral-700 mb-2">
            Practice Type *
          </label>
          <select
            id="standalone-industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="">Select your practice type</option>
            <option value="aba">ABA Practice</option>
            <option value="medical">Medical Practice</option>
            <option value="dental">Dental Practice</option>
            <option value="other">Other Healthcare</option>
          </select>
          {errors.industry && <p className="text-xs text-error-600 mt-1">{errors.industry}</p>}
        </div>

        <div>
          <label htmlFor="standalone-message" className="block text-sm font-medium text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            id="standalone-message"
            name="message"
            required
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
          />
          {errors.message && <p className="text-xs text-error-600 mt-1">{errors.message}</p>}
        </div>

        <Turnstile
          onVerify={setTurnstileToken}
          onError={() => setErrors({ message: "Verification failed. Please try again." as any })}
          onExpire={() => setTurnstileToken("")}
        />

        <button
          type="submit"
          disabled={submitting || (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken)}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <span className="animate-spin inline-block mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};