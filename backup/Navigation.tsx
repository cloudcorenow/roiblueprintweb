import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById("primary-navigation");
      const toggle = document.querySelector(".nav-toggle");
      if (nav && toggle && !nav.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className="nav">
      <div className="flex items-center justify-between h-28 sm:h-32 md:h-36 lg:h-40 px-3 sm:px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-36 sm:h-40 md:h-44 lg:h-48 px-3 sm:px-4 md:px-6 lg:px-12 max-w-7xl mx-auto">
        <NavLink to="/" className="nav-logo group mr-8 lg:mr-16">
          <div className="flex items-center gap-3">
            <img 
              src="/ROI BLUEPRINT V3.png" 
              alt="ROI Blueprint Logo" 
              className="w-36 sm:w-40 md:w-44 lg:w-48 h-36 sm:h-40 md:h-44 lg:h-48 object-contain group-hover:scale-110 transition-all duration-500"
            />
          </div>
        </NavLink>

        <ul
          id="primary-navigation"
          className={`nav-menu ${isMenuOpen ? "active" : ""}`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/industries"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Industries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </NavLink>
          </li>
          <li className="lg:hidden">
            <NavLink
              to="/contact"
              className="btn btn-primary mt-6 sm:mt-8 w-full justify-center group transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              Prequalify Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </NavLink>
          </li>
        </ul>

        <div className="nav-cta">
          <NavLink
            to="/contact"
            className="btn btn-primary shadow-xl text-xs lg:text-sm px-3 lg:px-6 py-2 lg:py-3 group transform hover:scale-110"
          >
            <span className="hidden xl:inline">Prequalify Now</span>
            <span className="xl:hidden">Prequalify</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </NavLink>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="w-6 h-6 transform transition-transform duration-300" />
          )}
        </button>
      </div>
      </div>
    </nav>
  );
}