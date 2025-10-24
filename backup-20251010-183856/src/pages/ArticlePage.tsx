import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react";

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
    content: `Research and Development tax credits remain one of the most valuable yet underutilized tax incentives available to businesses. In 2025, several key changes have made these credits even more accessible and valuable for companies of all sizes.

Understanding the R&D Tax Credit

The R&D tax credit is a dollar-for-dollar reduction in your tax liability, designed to reward companies that invest in innovation. Unlike deductions, which reduce taxable income, credits directly reduce the amount of tax you owe.

What Qualifies as R&D?

Many business owners mistakenly believe R&D credits only apply to laboratory research or high-tech industries. In reality, qualifying activities span across multiple sectors including healthcare, manufacturing, software development, and professional services.

Qualifying activities include:
- Developing new products, processes, or software
- Improving existing products or processes
- Creating prototypes and testing
- Eliminating uncertainty in design or capability
- Experimenting with new technologies or techniques

Key Changes in 2025

Recent legislation has expanded eligibility and increased the value of R&D credits. Small businesses can now offset payroll taxes, making the credit valuable even for pre-revenue companies. The documentation requirements have also been streamlined, reducing administrative burden.

Maximizing Your Credit

To maximize your R&D credit claim:

1. Document everything contemporaneously - Don't wait until tax time to gather records
2. Track time spent on qualifying activities by all employees
3. Include contractor and supply costs related to R&D projects
4. Consider both federal and state credits
5. Work with specialists who understand your industry

Common Mistakes to Avoid

Many companies leave money on the table by:
- Failing to identify all qualifying activities
- Not including all eligible expenses
- Poor documentation practices
- Overlooking state credits
- Not claiming credits for fear of audit

The audit rate for R&D credit claims is actually quite low, especially when documentation is proper and claims are reasonable.

State Credits

Don't forget about state R&D credits! Many states offer their own R&D incentives that can be claimed in addition to federal credits. Some states even offer refundable credits or credits that can be sold or transferred.

Moving Forward

If you're investing in innovation, you're likely eligible for R&D credits. The key is proper documentation and understanding what qualifies. Work with experienced advisors who can help identify opportunities and ensure compliance.

Start tracking your R&D activities now - even if you're not ready to claim credits this year, establishing good documentation practices will maximize your future claims.`,
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
    content: `Applied Behavior Analysis (ABA) practices face unique financial challenges. From managing insurance reimbursements to tracking billable hours across multiple therapists and clients, financial optimization requires specialized knowledge and strategic planning.

The ABA Financial Landscape

ABA practices operate in a complex environment with multiple revenue streams, varying reimbursement rates, and significant overhead costs. Understanding your financial metrics is crucial for sustainability and growth.

Key Financial Metrics

Successful ABA practices track:
- Authorization utilization rates
- Reimbursement cycle times
- Therapist productivity and billable hours
- Client retention rates
- Revenue per client
- Gross and net profit margins

Revenue Optimization

Maximize revenue through:

1. Insurance Verification - Verify benefits before starting services to avoid billing issues
2. Authorization Management - Track and renew authorizations proactively
3. Billing Efficiency - Submit claims quickly and follow up on denials
4. Service Mix - Balance individual therapy with group services
5. Scheduling Optimization - Minimize gaps between appointments

Cost Management

Control costs by:
- Optimizing therapist schedules to maximize billable hours
- Negotiating better rates with suppliers
- Leveraging technology to reduce administrative burden
- Managing facility costs through efficient space utilization
- Implementing staff retention programs to reduce turnover costs

Technology Investment

Modern practice management software can dramatically improve financial performance through:
- Automated billing and claims submission
- Real-time authorization tracking
- Staff scheduling optimization
- Client progress documentation
- Financial reporting and analytics

Growth Strategies

Strategic growth requires:

1. Service Expansion - Add complementary services or age groups
2. Geographic Growth - Open new locations strategically
3. Payor Mix Optimization - Balance private pay and insurance clients
4. Staff Development - Invest in training and retention
5. Marketing Investment - Build referral networks and online presence

Exit Planning

Whether planning to sell or transition ownership, financial optimization becomes critical. Buyers evaluate:
- Revenue stability and growth trends
- Profit margins and cash flow
- Client retention and payor mix
- Staff stability and credentials
- Systems and processes
- Market position and growth potential

Tax Optimization

ABA practices may qualify for:
- R&D tax credits for developing new protocols or technologies
- Employee retention credits
- Depreciation on equipment and leasehold improvements
- Retirement plan contributions

Working with Specialists

Partner with advisors who understand ABA practice economics. Generic financial advice often misses industry-specific opportunities and challenges.

The Path Forward

Financial optimization isn't a one-time project - it's an ongoing process of measurement, analysis, and improvement. Start by understanding your current metrics, then systematically address areas for improvement.

Remember: financial health enables clinical excellence. When your practice is financially stable, you can focus on delivering the best possible outcomes for clients.`,
    author: "Michael Chen",
    date: "2025-01-10",
    readTime: "12 min read",
    category: "ABA Practices",
    tags: ["ABA", "Financial Planning", "Healthcare"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
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
  }
];

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  const article = blogPosts.find(post => post.id === id);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const relatedArticles = blogPosts
    .filter(post => post.id !== article.id && (
      post.category === article.category ||
      post.tags.some(tag => article.tags.includes(tag))
    ))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <section className="section" style={{ paddingTop: "8rem", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>

            <div className="mb-6">
              <span className="modern-badge modern-badge-primary mb-4">
                <Tag className="w-4 h-4" />
                {article.category}
              </span>
            </div>

            <h1 className="mb-6">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors ml-auto"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="card mb-12">
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;

                  if (paragraph.match(/^#{1,6} /)) {
                    const level = paragraph.match(/^#+/)?.[0].length || 2;
                    const text = paragraph.replace(/^#+\s+/, '');
                    const headingLevel = Math.min(level + 1, 6);

                    if (headingLevel === 2) {
                      return <h2 key={index} className="text-neutral-900 font-bold mt-8 mb-4">{text}</h2>;
                    } else if (headingLevel === 3) {
                      return <h3 key={index} className="text-neutral-900 font-bold mt-8 mb-4">{text}</h3>;
                    } else if (headingLevel === 4) {
                      return <h4 key={index} className="text-neutral-900 font-bold mt-6 mb-3">{text}</h4>;
                    } else if (headingLevel === 5) {
                      return <h5 key={index} className="text-neutral-900 font-bold mt-6 mb-3">{text}</h5>;
                    } else {
                      return <h6 key={index} className="text-neutral-900 font-bold mt-6 mb-3">{text}</h6>;
                    }
                  }

                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-neutral-700 leading-relaxed">
                            {item.replace(/^- /, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (/^\d+\./.test(paragraph)) {
                    const items = paragraph.split('\n').filter(line => line.trim());
                    return (
                      <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-neutral-700 leading-relaxed">
                            {item.replace(/^\d+\.\s+/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <p key={index} className="text-neutral-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div>
                <h3 className="mb-8">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/resources/${related.id}`}
                      className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h5 className="mb-2 group-hover:text-primary-600 transition-colors">
                        {related.title}
                      </h5>
                      <p className="text-neutral-600 text-sm line-clamp-3">
                        {related.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section dark-section" style={{ textAlign: "center" }}>
        <div className="container">
          <h2>Ready to Transform Your Practice?</h2>
          <p className="text-primary-100 text-xl max-w-3xl mx-auto mb-8">
            Let's discuss how our expertise can help you optimize operations and unlock hidden value.
          </p>
          <Link to="/contact" className="btn btn-secondary shadow-strong">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
