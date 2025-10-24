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

      <div className="bg-white text-neutral-900 shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0 group lg:-my-4">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/roi_blueprint_v2h_w1200.png" />
                <img
                  src="/roi_blueprint_v2h_w300.png"
                  alt="ROI Blueprint - Research Optimize Innovate"
                  className="h-10 lg:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
              </picture>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-600 font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-600 font-semibold" : ""
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/industries"
                className={({ isActive }) =>
                  `text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-600 font-semibold" : ""
                  }`
                }
              >
                Industries
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-600 font-semibold" : ""
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200 ${
                    isActive ? "text-primary-600 font-semibold" : ""
                  }`
                }
              >
                Resources
              </NavLink>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-3">
                <NavLink
                  to="/contact"
                  className="text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors duration-200"
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#ade5f8', color: '#004aad' }}
                >
                  Prequalify
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </NavLink>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
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
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-lg">
          <div className="px-6 py-6 space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block text-neutral-600 hover:text-neutral-900 font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block text-neutral-600 hover:text-neutral-900 font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/industries"
              className={({ isActive }) =>
                `block text-neutral-600 hover:text-neutral-900 font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Industries
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block text-neutral-600 hover:text-neutral-900 font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `block text-neutral-600 hover:text-neutral-900 font-medium py-2 transition-colors duration-200 ${
                  isActive ? "text-primary-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </NavLink>
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <NavLink
                to="/contact"
                className="block px-6 py-3 rounded-xl font-semibold text-center transition-all duration-200 shadow-md"
                style={{ backgroundColor: '#ade5f8', color: '#004aad' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}