import React from "react";
import { Shield, Lock, Eye, FileText, Users, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: "6rem" }}>
        <div className="container">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
              <Shield className="w-4 h-4" />
              Privacy & Data Protection
            </div>
            <h1>Privacy Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your privacy matters. Learn how we collect, use, and protect your information.
            </p>
            <div className="mt-6 text-sm text-primary-200">
              <p>Effective Date: October 22, 2025</p>
              <p>Last Updated: October 22, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="bg-primary-50 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Your Privacy Matters</h2>
              <p className="text-primary-800 leading-relaxed">
                This Privacy Policy explains how ROI Blueprint ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you visit our website, use our services, or interact with our research and development activities. Please review it carefully.
              </p>
            </div>

            {/* Our Commitment */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Commitment to Data Protection</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Secure Protection</h3>
                    <p className="text-neutral-600 text-sm">Protecting your personal data with appropriate technical and organizational security measures</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Full Transparency</h3>
                    <p className="text-neutral-600 text-sm">Being transparent about how we collect, use, and share your information</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">User Control</h3>
                    <p className="text-neutral-600 text-sm">Providing you with control over your personal data</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">Legal Compliance</h3>
                    <p className="text-neutral-600 text-sm">Complying with applicable data protection laws and regulations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Information We Collect</h2>

              <h3 className="text-xl font-bold text-neutral-900 mb-4">Personal Information</h3>
              <p className="text-neutral-600 mb-4">We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-6">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Company name, job title, and professional information</li>
                <li>Account credentials (username and password)</li>
                <li>Payment and billing information</li>
                <li>Communications and correspondence with us</li>
                <li>Survey responses and feedback</li>
              </ul>

              <h3 className="text-xl font-bold text-neutral-900 mb-4">Technical and Usage Information</h3>
              <p className="text-neutral-600 mb-4">We automatically collect certain information when you access our website:</p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-6">
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system and device information</li>
                <li>Pages visited, time spent, and clickstream data</li>
                <li>Cookies and similar tracking technologies data</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">How We Use Your Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Providing and Improving Services</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Delivering, maintaining, and improving our products and services</li>
                    <li>Processing transactions and fulfilling orders</li>
                    <li>Providing customer support and responding to inquiries</li>
                    <li>Conducting research and development activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Communication</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Sending administrative information and service announcements</li>
                    <li>Responding to your requests and feedback</li>
                    <li>Sending marketing communications (with your consent)</li>
                    <li>Conducting surveys and gathering feedback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Legal and Security</h3>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Complying with legal obligations and enforcing our terms</li>
                    <li>Protecting against fraud and security threats</li>
                    <li>Investigating and preventing policy violations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">How We Share Your Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Service Providers</h3>
                  <p className="text-neutral-600 mb-2">We share information with third-party service providers who perform services on our behalf:</p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>Cloud hosting and data storage providers</li>
                    <li>Payment processors and financial institutions</li>
                    <li>Analytics and marketing service providers</li>
                    <li>Customer support platforms</li>
                  </ul>
                  <p className="text-neutral-600 mt-3 text-sm italic">These providers are contractually obligated to protect your information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Legal Disclosures</h3>
                  <p className="text-neutral-600">We may disclose your information when required by law, to comply with legal processes, or to protect our rights and safety.</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Your Privacy Rights and Choices</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">Access & Portability</h3>
                  <p className="text-neutral-600 text-sm">Request access to your personal information and receive a copy in a portable format</p>
                </div>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">Correction & Update</h3>
                  <p className="text-neutral-600 text-sm">Request correction of inaccurate or incomplete information</p>
                </div>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">Deletion</h3>
                  <p className="text-neutral-600 text-sm">Request deletion of your personal information, subject to legal exceptions</p>
                </div>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">Opt-Out</h3>
                  <p className="text-neutral-600 text-sm">Opt out of marketing communications at any time</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Data Security</h2>
              <p className="text-neutral-600 mb-4">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security assessments and testing</li>
                <li>Employee training on data protection</li>
                <li>Secure data storage and backup systems</li>
              </ul>
              <div className="bg-warning-50 border border-warning-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                  <p className="text-warning-800 text-sm">While we strive to protect your information, no method of transmission over the internet is completely secure. You transmit information at your own risk.</p>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Cookies and Tracking Technologies</h2>
              <p className="text-neutral-600 mb-4">We use cookies and similar technologies to enhance your experience:</p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-neutral-900 mb-1">Essential Cookies</h4>
                  <p className="text-neutral-600 text-sm">Necessary for website functionality and security</p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-neutral-900 mb-1">Performance Cookies</h4>
                  <p className="text-neutral-600 text-sm">Collect information about website usage and traffic</p>
                </div>
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-bold text-neutral-900 mb-1">Functionality Cookies</h4>
                  <p className="text-neutral-600 text-sm">Remember preferences and personalize experience</p>
                </div>
              </div>
              <p className="text-neutral-600 mt-4 text-sm">You can control cookies through your browser settings.</p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Children's Privacy</h2>
              <p className="text-neutral-600">Our services are not directed to children under 13. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.</p>
            </div>

            {/* Policy Changes */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Changes to This Privacy Policy</h2>
              <p className="text-neutral-600 mb-4">We may update this Privacy Policy periodically. We will notify you of material changes by:</p>
              <ul className="list-disc list-inside text-neutral-600 space-y-2">
                <li>Posting the updated policy with a new "Last Updated" date</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying a prominent notice on our website</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-primary-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Contact Us</h2>
              <p className="text-primary-800 mb-6">If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:</p>
              <div className="space-y-3 text-primary-800">
                <p><strong>ROI Blueprint</strong></p>
                <p>Attn: Privacy Team</p>
                <p>Email: <a href="mailto:info@roiblueprint.com" className="text-primary-600 hover:text-primary-700 font-medium">info@roiblueprint.com</a></p>
                <p>Phone: <a href="tel:+18557642583" className="text-primary-600 hover:text-primary-700 font-medium">(855) 764-2583</a></p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
              <p className="text-sm text-neutral-500">
                © 2025 ROI Blueprint. All rights reserved. | Committed to protecting your privacy and data security
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
