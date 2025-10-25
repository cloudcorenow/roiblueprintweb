import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-white py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#2c3c4d' }}>
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/ROI BlueprintV2a.png"
              alt="ROI Blueprint - Optimize"
              className="h-72 w-auto object-contain"
            />
          </div>
          <div className="text-xl font-semibold text-white mb-4">
            Research. Optimize. Innovate. → Your Return on Investment.
          </div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Empowering healthcare practices with systematic transformation services
            that deliver measurable ROI through operational optimization and strategic
            innovation implementation.
          </p>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/services" rel="noopener">R&D Tax Credit Services</Link>
              </li>
              <li>
                <Link to="/services" rel="noopener">Healthcare Practice Transformation</Link>
              </li>
              <li>
                <Link to="/services" rel="noopener">Federal & State Tax Credit Optimization</Link>
              </li>
              <li>
                <Link to="/services" rel="noopener">Comprehensive ROI Analysis</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about" rel="noopener">About Us</Link>
              </li>
              <li>
                <Link to="/industries" rel="noopener">Healthcare Focus</Link>
              </li>
              <li>
                <Link to="/services" rel="noopener">ROI Methodology</Link>
              </li>
              <li>
                <Link to="/contact" rel="noopener">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-secondary-300 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Schedule ROI Blueprint Consultation
                </Link>
              </li>
              <li>
                <a href="tel:+18557642583" className="flex items-center gap-2 hover:text-secondary-300 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  (855) 764-2583
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-white/70">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                  Serving healthcare practices nationwide
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-neutral-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              &copy; 2025 ROI Blueprint™. All rights reserved.
              <span className="block sm:inline sm:ml-2">
                Transforming healthcare strategy into measurable ROI.
              </span>
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <span className="text-white/50">|</span>
              <Link to="/faq" className="text-white/70 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}