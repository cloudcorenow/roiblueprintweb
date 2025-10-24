import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("primary-navigation");
      const toggle = document.querySelector(".nav-toggle");
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleResize = () => window.innerWidth >= 1024 && setIsMenuOpen(false);

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 z-50">
      {/* Thin Utility Bar - Dark Background */}
      <div className="bg-white text-neutral-700 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-neutral-600">Serving healthcare practices nationwide</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="tel:+18557642583" className="hover:text-primary-600 transition-colors">
                (855) 764-2583
              </a>
              <a href="mailto:info@roiblueprint.com" className="hover:text-primary-600 transition-colors">
                info@roiblueprint.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation - White Background */}
      <div className="bg-neutral-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 group">
              <img
              src="/roi_blueprint_white_alt_w2400.png"
                alt="ROI Blueprint"
               className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-neutral-300 hover:text-white font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  `text-neutral-300 hover:text-white font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-400" : ""
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink 
                to="/industries" 
                className={({ isActive }) => 
                  `text-neutral-300 hover:text-white font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-400" : ""
                  }`
                }
              >
                Industries
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `text-neutral-300 hover:text-white font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-400" : ""
                  }`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `text-neutral-300 hover:text-white font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-400" : ""
                  }`
                }
              >
                Resources
              </NavLink>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <NavLink
                  to="/contact"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Prequalify Now
                </NavLink>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="primary-navigation"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-800 border-b border-neutral-700 shadow-lg">
          <div className="px-6 py-6 space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block text-neutral-300 hover:text-white font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-400" : ""
                }`
              } 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `block text-neutral-300 hover:text-white font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-400" : ""
                }`
              } 
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              to="/industries" 
              className={({ isActive }) => 
                `block text-neutral-300 hover:text-white font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-400" : ""
                }`
              } 
              onClick={() => setIsMenuOpen(false)}
            >
              Industries
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `block text-neutral-300 hover:text-white font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-400" : ""
                }`
              } 
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                `block text-neutral-300 hover:text-white font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-400" : ""
                }`
              } 
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </NavLink>
            <div className="pt-4 border-t border-neutral-700">
              <NavLink
                to="/contact"
                className="block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Prequalify Now
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}