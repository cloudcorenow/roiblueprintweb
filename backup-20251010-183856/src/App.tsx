import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Chatbot from "./components/Chatbot";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RDTaxCreditGuidePage = lazy(() => import("./pages/RDTaxCreditGuidePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-neutral-600">Loading...</p>
    </div>
  </div>
);

const NotFound = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-neutral-50"
    style={{ paddingTop: "5rem" }}
  >
    <div className="text-center p-8">
      <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-6">Page not found</p>
      <p className="text-neutral-500 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="btn btn-primary">
        Return Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <Navigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:id" element={<ArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/rd-tax-credit-guide"
                element={<RDTaxCreditGuidePage />}
              />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
        <Chatbot />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
