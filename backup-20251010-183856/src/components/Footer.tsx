import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/roi_blueprint_white_alt_w2400.png" 
              alt="ROI Blueprint Logo" 
              className="w-64 h-64 object-contain"
            />
          </div>
          <div className="text-xl font-semibold text-primary-200 mb-4">
            Research. Optimize. Innovate. → Your Return on Investment.
          </div>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
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
                <Link to="/contact" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
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
                <a href="mailto:innovation@roiblueprint.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  innovation@roiblueprint.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-neutral-400">
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

        <div className="footer-bottom border-t border-neutral-700 pt-8">
          <p>
            &copy; 2025 ROI Blueprint™. All rights reserved. 
            <span className="block sm:inline sm:ml-2">
              Transforming healthcare strategy into measurable ROI.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}