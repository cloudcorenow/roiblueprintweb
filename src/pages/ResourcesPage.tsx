import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Tag, FileText } from "lucide-react";
import { BlogPost } from '../types/blog';
import { blogService } from '../utils/blogService';
import GuideAccessModal from '../components/GuideAccessModal';
import SEO from '../components/SEO';


const categories = ["All", "Tax Planning", "Small Business", "Bookkeeping", "Financial Planning", "Business Formation", "Tax Preparation"];

export default function ResourcesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await blogService.getPublishedPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address');
      return;
    }

    setNewsletterStatus('submitting');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          source: 'resources-newsletter'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => {
          setNewsletterStatus('idle');
          setNewsletterMessage('');
        }, 3000);
        return;
      }

      setNewsletterStatus('success');
      setNewsletterMessage('Thank you for subscribing! We\'ll keep you updated.');
      setNewsletterEmail('');

      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      setNewsletterStatus('error');
      setNewsletterMessage('Something went wrong. Please try again.');
      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMessage('');
      }, 3000);
    }
  };

  const allPosts = posts;

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div>
      <SEO
        title="R&D Tax Credit Resources & Expert Healthcare Insights"
        description="Free R&D tax credit guides, healthcare practice optimization resources, and expert insights. Access comprehensive guides on qualifying for federal and state R&D tax credits."
        keywords="R&D tax credit guide, healthcare practice resources, medical practice optimization, tax credit resources, free R&D consultation"
        canonicalUrl="/resources"
      />
      {/* Hero Section */}
      <section className="hero" style={{
        minHeight: "60vh",
        paddingTop: "8rem",
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%),
          url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat
        `
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>Resources & Expert Insights</h1>
            <p>
              Comprehensive guides, expert insights, and industry knowledge to help you
              maximize your business opportunities through strategic tax planning and
              operational optimization.
            </p>
            <div className="text-center mt-8">
              <a href="#newsletter" className="btn shadow-strong" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid #89c726' }}>
                Subscribe for Updates and Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center gap-2 justify-center mb-4">
              <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
              <h2>Featured Resources</h2>
            </div>
            <p>
              Our most comprehensive guides and insights to help you understand
              and leverage tax incentives and business optimization strategies.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-primary-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FileText className="w-12 h-12" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-3 group-hover:text-primary-600 transition-colors">
                    R&D Tax Credit Complete Guide
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Everything you need to know about qualifying for and maximizing your
                    Research & Development tax credits. This comprehensive resource covers qualification criteria, documentation requirements, and optimization strategies.
                  </p>
                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="btn btn-primary shadow-strong"
                  >
                    Read Complete Guide
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section" style={{ backgroundColor: "#f8fafc", paddingTop: "3rem", paddingBottom: "2rem" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2>Expert Articles & Insights</h2>
            <p>Stay informed with the latest strategies and industry insights from our experts.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary-500 text-white"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="section" style={{ backgroundColor: "#f8fafc", paddingTop: "0", paddingBottom: "2rem" }}>
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
              <h3>Featured Articles</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/resources/${post.id}`}
                  className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="modern-badge modern-badge-primary">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.read_time}
                    </div>
                  </div>

                  <h4 className="mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-neutral-600 mb-4">{post.excerpt}</p>

                  <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="section" style={{ backgroundColor: "#f8fafc", paddingTop: "2rem" }}>
        <div className="container">
          {regularPosts.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1 h-8 bg-secondary-500 rounded-full"></div>
                <h3>Latest Articles</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/resources/${post.id}`}
                    className="card group cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="modern-badge modern-badge-secondary text-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.read_time}</span>
                    </div>

                    <h5 className="mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h5>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No articles found</h3>
              <p className="text-neutral-500 mb-4">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <p className="text-neutral-500">Loading articles...</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="section" style={{ backgroundColor: "#f8fafc", textAlign: "center" }}>
        <div className="container">
          <h2>Stay Updated with Our Latest Insights</h2>
          <p style={{ color: "var(--neutral-600)", marginBottom: "2rem" }}>
            Get expert tax strategies, business optimization tips, and industry news delivered to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              maxWidth: "600px",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={newsletterStatus === 'submitting'}
              style={{
                flex: 1,
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                border: "1px solid var(--neutral-300)",
                minWidth: "250px",
                backgroundColor: "white",
                color: "var(--neutral-700)",
                fontSize: "1rem",
              }}
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'submitting'}
              className="btn"
              style={{
                backgroundColor: "#60a5fa",
                color: "white",
                border: "none",
                opacity: newsletterStatus === 'submitting' ? 0.7 : 1,
              }}
            >
              {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
          {newsletterMessage && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: newsletterStatus === 'success' ? '#dcfce7' : '#fee2e2',
                color: newsletterStatus === 'success' ? '#166534' : '#991b1b',
                maxWidth: "600px",
                margin: "1.5rem auto 0"
              }}
            >
              {newsletterMessage}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Need Personalized Guidance?</h2>
            <p>
              While our resources provide valuable insights, every business situation is unique.
              Let's discuss your specific needs and opportunities.
            </p>
            <Link to="/contact#contact-form" className="btn shadow-strong" style={{ backgroundColor: '#ade5f8', color: '#004aad' }}>
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <GuideAccessModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        onSuccess={() => {
          setShowGuideModal(false);
          navigate('/rd-tax-credit-guide');
        }}
        guideName="rd-tax-credit"
        guideTitle="R&D Tax Credit Complete Guide"
      />
    </div>
  );
}
