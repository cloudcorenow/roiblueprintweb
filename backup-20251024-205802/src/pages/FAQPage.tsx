import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "About ROI Blueprint",
      questions: [
        {
          question: "What is ROI Blueprint?",
          answer: "ROI Blueprint is a specialized consulting firm that helps healthcare practices improve operations through documented R&D activities while potentially qualifying for valuable tax benefits. Our systematic approach transforms practices through innovation and process optimization."
        },
        {
          question: "Who do you work with?",
          answer: "We primarily work with healthcare practices including medical practices, ABA therapy centers, dental practices, and other healthcare service providers. We specialize in practices with 15-100+ employees looking to optimize operations and innovate their service delivery."
        },
        {
          question: "What makes ROI Blueprint different from other consultants?",
          answer: "Unlike traditional consultants, our services are structured as Qualified Research Expenditures (QRE) under IRS guidelines. This means your investment in operational improvements may generate its own tax benefits. Additionally, we don't just provide recommendations—we implement, document, and optimize alongside your team throughout the year."
        }
      ]
    },
    {
      category: "R&D Tax Credits",
      questions: [
        {
          question: "What are R&D tax credits?",
          answer: "R&D tax credits are federal and state tax incentives designed to reward companies for investing in innovation and process improvement. These credits can significantly reduce your tax liability and, in some cases, provide cash refunds."
        },
        {
          question: "Does my practice qualify for R&D tax credits?",
          answer: "Many healthcare practices qualify without realizing it. Activities like developing new treatment protocols, optimizing operational workflows, implementing new technologies, and improving patient care processes may all qualify as R&D. We help identify and document these activities according to IRS standards."
        },
        {
          question: "How much can I save with R&D tax credits?",
          answer: "The amount varies based on qualifying activities, practice size, and state programs. Small practices (15-25 employees) might see $30,000-$50,000 in annual benefits, while larger practices (75-100 employees) could see $150,000-$250,000 or more. These figures include both operational improvements and potential tax benefits."
        },
        {
          question: "Are R&D tax credits guaranteed?",
          answer: "Tax benefits vary based on qualifying R&D activities, state programs, and individual circumstances. We document R&D work according to IRS standards, but actual benefits depend on IRS approval. Innovation and operational improvements are the primary goals—potential tax benefits are a bonus."
        }
      ]
    },
    {
      category: "Our Services & Process",
      questions: [
        {
          question: "What is the ROI Blueprint Methodology?",
          answer: "Our proprietary approach follows three phases: Research (Months 1-2) where we analyze operations and identify opportunities; Optimize (Months 2-10) where we implement and refine improvements; and Innovate (Months 10-12) where we deploy proven solutions and plan future initiatives. Throughout all phases, we document activities for potential R&D tax credit qualification."
        },
        {
          question: "How long is the engagement?",
          answer: "Our standard engagement is 12 months, which allows us to implement meaningful changes, measure results, and document activities properly. We believe sustainable transformation requires ongoing partnership, not just a one-time assessment."
        },
        {
          question: "What does implementation involve?",
          answer: "We work alongside your team to implement improvements, provide training, customize systems, and ensure smooth integration. We don't just hand you a report—we're there with you through testing, refinement, and deployment."
        },
        {
          question: "Will this disrupt my practice operations?",
          answer: "Our approach is designed to enhance, not disrupt, your operations. We work within your existing workflows and make changes incrementally. Most implementations happen during strategic planning sessions and off-peak hours to minimize disruption."
        }
      ]
    },
    {
      category: "Investment & ROI",
      questions: [
        {
          question: "How much does ROI Blueprint cost?",
          answer: "Investment varies based on practice size and complexity. Small practices (15-25 employees) typically invest $75,000-$100,000 annually, while larger practices (75-100 employees) invest $200,000-$300,000. This investment often generates returns through operational improvements and potential tax benefits."
        },
        {
          question: "Can the service pay for itself?",
          answer: "Many clients see their investment offset through a combination of operational improvements and potential tax benefits. For example, up to 65% of our fees may qualify as QRE, potentially generating additional tax benefits. Combined with efficiency gains and revenue improvements, the service often becomes self-funding."
        },
        {
          question: "What kind of ROI can I expect?",
          answer: "Beyond potential tax benefits, clients typically see improved operational efficiency, reduced administrative burden, enhanced patient/client satisfaction, better staff productivity, and increased revenue capacity. Many practices report 2-3x ROI when considering all benefits combined."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we structure engagements with flexible payment terms that align with your cash flow. Contact us to discuss options that work for your practice."
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I know if ROI Blueprint is right for my practice?",
          answer: "If you're looking to improve operations, facing administrative challenges, considering new technology implementations, or seeking to optimize workflows, we can likely help. Schedule a consultation to discuss your specific needs and goals."
        },
        {
          question: "What happens during the initial consultation?",
          answer: "We'll discuss your practice operations, challenges, and goals. We'll explain how our methodology applies to your situation and outline potential opportunities for improvement and R&D documentation. There's no obligation, and the consultation is complimentary."
        },
        {
          question: "How quickly can we get started?",
          answer: "Once we've completed our initial assessment and you've decided to move forward, we can typically begin within 2-4 weeks. We'll work with your schedule to ensure a smooth onboarding process."
        },
        {
          question: "What information do you need from us?",
          answer: "During our initial phase, we'll need access to operational documentation, financial systems, workflow processes, and key team members. We'll provide a detailed checklist during onboarding to make the process straightforward."
        }
      ]
    },
    {
      category: "Working Together",
      questions: [
        {
          question: "How much time will this require from my team?",
          answer: "We design our engagements to be efficient with your time. Expect monthly strategic planning sessions (2-4 hours), weekly check-ins (30-60 minutes), and periodic staff training sessions. We handle the heavy lifting of documentation and implementation."
        },
        {
          question: "Will you train my staff?",
          answer: "Yes, comprehensive training is included in all engagements. We provide hands-on training for new systems, workflows, and processes to ensure your team can sustain improvements long-term."
        },
        {
          question: "What if we're not satisfied?",
          answer: "We're committed to your success. If at any point you're not seeing value, we'll work together to adjust our approach or part ways professionally. Most clients extend their engagements beyond the initial 12 months because they see consistent results."
        },
        {
          question: "Do you work with practices in all states?",
          answer: "Yes, we work with practices nationwide. Our approach adapts to various state regulations and programs, and we're experienced in maximizing both federal and state-specific benefits."
        }
      ]
    }
  ];

  const toggleAccordion = (categoryIndex: number, questionIndex: number) => {
    const flatIndex = faqs
      .slice(0, categoryIndex)
      .reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
    setOpenIndex(openIndex === flatIndex ? null : flatIndex);
  };

  const getFlatIndex = (categoryIndex: number, questionIndex: number) => {
    return faqs
      .slice(0, categoryIndex)
      .reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero" style={{
        paddingTop: "6rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <HelpCircle className="w-4 h-4" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h1 className="mb-6">Your Questions, Answered</h1>
            <p className="text-xl opacity-95">
              Everything you need to know about ROI Blueprint, our services, R&D tax credits, and how we can help transform your healthcare practice.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section">
        <div className="container max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-primary-700 mb-6 pb-3 border-b-2 border-primary-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const flatIndex = getFlatIndex(categoryIndex, questionIndex);
                  const isOpen = openIndex === flatIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-lg text-neutral-900 pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-neutral-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-neutral-900 mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 text-neutral-700">
              We're here to help. Schedule a complimentary consultation to discuss your specific situation and learn how ROI Blueprint can help your practice thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
                Schedule a Consultation
              </a>
              <a href="/services" className="btn" style={{ backgroundColor: 'white', color: 'black', border: '2px solid #89c726' }}>
                Learn About Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
