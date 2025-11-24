import React from "react";
import { Shield } from "lucide-react";
import SEO from "../components/SEO";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <SEO
        title="Privacy Policy | ROI Blueprint"
        description="ROI Blueprint Privacy Policy. Learn how we collect, use, and protect your personal information when you use our healthcare R&D consulting services."
        canonicalUrl="/privacy-policy"
      />
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
              <Shield className="w-4 h-4" />
              Privacy & Security
            </div>
            <h1>Privacy Policy</h1>
            <p className="text-xl">
              Your privacy is important to us. Learn how we protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="card animate-fade-in-up">
            <p className="text-neutral-600 mb-6">
              <strong>Effective Date:</strong> January 1, 2025
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="mb-4">1. Introduction</h2>
                <p className="text-neutral-600 leading-relaxed">
                  ROI Blueprint ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              <div>
                <h2 className="mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
                  <li>Fill out contact forms or prequalification assessments</li>
                  <li>Subscribe to our newsletter or resources</li>
                  <li>Request information about our services</li>
                  <li>Engage with our services as a client</li>
                </ul>
                <p className="text-neutral-600 leading-relaxed mt-4">
                  This information may include: name, email address, phone number, business name, practice information, and other details relevant to providing our services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                <p className="text-neutral-600 leading-relaxed">
                  When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
                </p>
              </div>

              <div>
                <h2 className="mb-4">3. How We Use Your Information</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Improve, personalize, and expand our services</li>
                  <li>Communicate with you about services, updates, and marketing</li>
                  <li>Process your requests and transactions</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Analyze usage trends and preferences</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4">4. Disclosure of Your Information</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>With Your Consent:</strong> When you have given explicit permission</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4">5. Data Security</h2>
                <p className="text-neutral-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="mb-4">6. HIPAA Compliance</h2>
                <p className="text-neutral-600 leading-relaxed">
                  For clients engaging our services, we maintain HIPAA-compliant systems and processes to protect protected health information (PHI). Our technology platform and documentation procedures adhere to HIPAA privacy and security requirements.
                </p>
              </div>

              <div>
                <h2 className="mb-4">7. Your Privacy Rights</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to opt-out of marketing communications</li>
                  <li>The right to data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-neutral-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>

              <div>
                <h2 className="mb-4">9. Third-Party Links</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div>
                <h2 className="mb-4">10. Children's Privacy</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-neutral-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
                </p>
              </div>

              <div>
                <h2 className="mb-4">12. Contact Us</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-neutral-50 p-6 rounded-xl">
                  <p className="text-neutral-700"><strong>ROI Blueprint</strong></p>
                  <p className="text-neutral-700">Email: privacy@roiblueprint.com</p>
                  <p className="text-neutral-700">Phone: (888) 555-0123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
