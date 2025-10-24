import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Tag, BookOpen, FileText, TrendingUp } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "maximizing-rd-tax-credits-2025",
    title: "Maximizing R&D Tax Credits in 2025: What Every Business Owner Should Know",
    excerpt: "Discover the latest changes to R&D tax credit regulations and how to optimize your claims for maximum savings in the current tax year.",
    content: "Full blog post content would go here...",
    author: "Sarah Johnson",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Tax Credits",
    tags: ["R&D Credits", "Tax Planning", "Business Growth"],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "aba-practice-financial-optimization",
    title: "ABA Practice Financial Optimization: A Complete Guide",
    excerpt: "Learn how ABA therapy practices can streamline their financial operations and maximize profitability through strategic planning.",
    content: "Full blog post content would go here...",
    author: "Michael Chen",
    date: "2025-01-10",
    readTime: "12 min read",
    category: "ABA Practices",
    tags: ["ABA", "Financial Planning", "Healthcare"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "manufacturing-tax-incentives-guide",
    title: "Manufacturing Tax Incentives: Beyond R&D Credits",
    excerpt: "Explore additional tax incentives available to manufacturing companies, including equipment deductions and energy credits.",
    content: "Full blog post content would go here...",
    author: "David Rodriguez",
    date: "2025-01-05",
    readTime: "10 min read",
    category: "Manufacturing",
    tags: ["Manufacturing", "Tax Incentives", "Equipment"],
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "small-business-tax-planning-strategies",
    title: "Small Business Tax Planning Strategies for Growth",
    excerpt: "Essential tax planning strategies that small businesses can implement to reduce liability and fund expansion.",
    content: "Full blog post content would go here...",
    author: "Lisa Thompson",
    date: "2024-12-28",
    readTime: "6 min read",
    category: "Tax Planning",
    tags: ["Small Business", "Tax Planning", "Growth"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "what-rd-really-means-healthcare",
    title: "What R&D Really Means in Healthcare (And What It Doesn't)",
    excerpt: "Strip away the buzzwords and discover the crucial difference between genuine R&D and operational excellence in healthcare. Understanding this distinction transforms how you allocate resources and set realistic goals.",
    content: `Healthcare companies love talking about their "R&D efforts." But strip away the buzzwords, and most discover they're not doing research and development at all—they're running operations. Understanding this distinction isn't about tax semantics; it's about honest resource allocation and realistic goal-setting.

True R&D: Confronting Real Uncertainty

Research and Development means creating something genuinely novel while facing legitimate uncertainty about outcomes. You're experimenting with unproven approaches, testing hypotheses, and potentially failing before you succeed. The key word is uncertainty—if you already know it'll work because others have done it, you're implementing, not researching.

In healthcare, real R&D might involve developing proprietary algorithms that predict patient deterioration, creating original behavioral intervention protocols that haven't been tested, designing novel care coordination models with measurable outcome studies, or building machine learning systems that automate clinical quality assessments in new ways.

Notice these all share common elements: hypothesis-driven work, systematic experimentation, iteration based on results, and outcomes that could become publishable findings or intellectual property.

The Operations Illusion

Here's what isn't R&D, even though healthcare startups frequently label it as such: implementing electronic health records, integrating existing software platforms, optimizing billing workflows, adopting telehealth technology, training staff on proven protocols, or improving patient scheduling systems.

These activities are valuable—often more valuable than actual R&D for a growing organization. They represent operational excellence, process improvement, and smart technology adoption. But they're applying known solutions to known problems. There's no uncertainty about whether video conferencing works for therapy sessions; you're just implementing it well.

This matters because mislabeling operations as R&D distorts budgets, creates unrealistic timelines, and sets wrong expectations. Operations should move quickly using proven methods. R&D requires patience, accepts failure, and builds incrementally toward breakthroughs.

Healthcare R&D Without the Lab Coat

Non-biotech healthcare R&D focuses on service delivery innovation, technology development, and care model experimentation. A behavioral health startup might research whether a specific caregiver training methodology improves treatment outcomes compared to standard approaches—complete with control groups and statistical analysis. That's R&D.

A primary care practice might develop proprietary software that identifies social determinants of health from clinical documentation and tests whether intervening on those factors reduces hospital readmissions. Also R&D.

A home health agency simply implementing an existing patient monitoring platform and optimizing workflows? Operations, even if they're doing it brilliantly.

The Honest Assessment

Most healthcare organizations should spend 5-10% of resources on true R&D, maximum. The rest belongs in operations, patient care, and business development. That's not a weakness—it's reality. You can't research and develop your way through daily patient care, staff management, and revenue cycle challenges.

If you're pursuing genuine R&D, commit properly: define clear hypotheses, establish experimentation protocols, document your process contemporaneously, measure results rigorously, and accept that some projects will fail. That's research.

For everything else—the continuous improvement, the technology implementation, the workflow optimization—embrace operational excellence without the R&D label. There's profound value in executing known best practices exceptionally well.

The truth: Healthcare needs both innovation and execution. Just know which one you're actually doing, resource it appropriately, and don't confuse building a better practice with inventing something fundamentally new. Both matter, but they're not the same thing.`,
    author: "Dr. Rebecca Martinez",
    date: "2025-01-18",
    readTime: "7 min read",
    category: "Healthcare",
    tags: ["Healthcare", "R&D", "Operations", "Innovation"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "exit-strategy-financial-preparation",
    title: "Exit Strategy: Preparing Your Business Finances for Sale",
    excerpt: "Key financial preparations and optimizations needed to maximize your business value when planning an exit.",
    content: "Full blog post content would go here...",
    author: "Robert Kim",
    date: "2024-12-15",
    readTime: "11 min read",
    category: "Exit Planning",
    tags: ["Exit Strategy", "Business Sale", "Valuation"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

const STORAGE_KEY = "roiblueprint_blog_posts";

const categories = ["All", "Tax Credits", "ABA Practices", "Manufacturing", "Tax Planning", "Healthcare", "Exit Planning"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicPosts, setDynamicPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      setDynamicPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Combine static and dynamic posts
  const allPosts = [...dynamicPosts, ...blogPosts];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div>
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 text-white rounded-xl flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-center mb-3 group-hover:text-primary-600 transition-colors">
                R&D Tax Credit Complete Guide
              </h3>
              <p className="text-center text-neutral-600 mb-4">
                Everything you need to know about qualifying for and maximizing your 
                Research & Development tax credits.
              </p>
              <div className="text-center">
                <Link to="/rd-tax-credit-guide" className="btn btn-primary">
                  Read Complete Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-success-500 text-white rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-center mb-3 group-hover:text-primary-600 transition-colors">
                ABA Financial Strategies
              </h3>
              <p className="text-center text-neutral-600 mb-4">
                Best practices for optimizing ABA practice finances and
                preparing for growth or exit opportunities.
              </p>
              <div className="text-center">
                <Link to="/contact" className="btn btn-primary">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent-500 text-white rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-center mb-3 group-hover:text-primary-600 transition-colors">
                Manufacturing Tax Incentives
              </h3>
              <p className="text-center text-neutral-600 mb-4">
                How manufacturers can leverage R&D credits and other tax
                incentives for maximum savings and growth.
              </p>
              <div className="text-center">
                <Link to="/contact" className="btn btn-primary">
                  Get Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <h4 className="mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-neutral-600 mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h5 className="mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h5>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {filteredPosts.length === 0 && (
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
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section dark-section" style={{ textAlign: "center" }}>
        <div className="container">
          <h2>Stay Updated with Our Latest Insights</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "2rem" }}>
            Get expert tax strategies, business optimization tips, and industry news delivered to your inbox.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              maxWidth: "500px",
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                minWidth: "250px",
                color: "var(--neutral-700)",
              }}
            />
            <button className="btn btn-secondary">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
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
            <Link to="/contact" className="btn btn-primary">
              Schedule a Free Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}