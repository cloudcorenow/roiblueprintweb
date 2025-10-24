import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react";
import { BlogPost } from '../types/blog';
import { blogService } from '../utils/blogService';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const post = await blogService.getPostById(id);
        if (!post) {
          setNotFound(true);
          return;
        }

        setArticle(post);

        const allPosts = await blogService.getPublishedPosts();
        const related = allPosts
          .filter(p => p.id !== post.id && p.category === post.category)
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (error) {
        console.error('Error loading article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ paddingTop: "8rem", minHeight: "60vh" }}>
        <div className="container text-center">
          <p className="text-neutral-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/resources" replace />;
  }

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
      <section style={{ paddingTop: "5rem", paddingBottom: "2rem", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>

            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                <Tag className="w-3.5 h-3.5" />
                {article.category}
              </span>
            </div>

            <h1 style={{
              fontSize: "2.5rem",
              lineHeight: "1.2",
              fontWeight: "700",
              color: "#212529",
              marginBottom: "1.5rem",
              fontFamily: "'Josefin Sans', sans-serif"
            }}>
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.author}</span>
                {article.author_title && (
                  <span className="text-neutral-500">• {article.author_title}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.read_time}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "0", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl mb-8 shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <article className="article-content">
              <style dangerouslySetInnerHTML={{ __html: `
                .article-content {
                  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1.0625rem;
                  line-height: 1.75;
                  color: #495057;
                }

                .article-content h2 {
                  font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1.75rem;
                  font-weight: 700;
                  color: #212529;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                  line-height: 1.3;
                  letter-spacing: -0.01em;
                }

                .article-content h3 {
                  font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1.375rem;
                  font-weight: 600;
                  color: #212529;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                  line-height: 1.4;
                  letter-spacing: -0.01em;
                }

                .article-content h4 {
                  font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1.125rem;
                  font-weight: 600;
                  color: #2c3c4d;
                  margin-top: 1.5rem;
                  margin-bottom: 0.5rem;
                  line-height: 1.5;
                }

                .article-content p {
                  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1.0625rem;
                  font-weight: 400;
                  line-height: 1.75;
                  color: #495057;
                  margin-bottom: 1.25rem;
                }

                .article-content ul, .article-content ol {
                  margin: 1.25rem 0;
                  padding-left: 1.75rem;
                }

                .article-content li {
                  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 1rem;
                  font-weight: 400;
                  line-height: 1.7;
                  color: #495057;
                  margin-bottom: 0.5rem;
                  padding-left: 0.25rem;
                }

                .article-content ul li::marker {
                  color: #0073e6;
                }

                .article-content ol li::marker {
                  color: #0073e6;
                  font-weight: 600;
                }

                .article-content strong {
                  font-weight: 600;
                  color: #212529;
                }

                .article-content em {
                  font-style: italic;
                  color: #343a40;
                }

                .article-content a {
                  color: #004aad;
                  text-decoration: underline;
                  text-decoration-color: #99c2ff;
                  text-underline-offset: 2px;
                  transition: all 0.2s ease;
                }

                .article-content a:hover {
                  color: #0073e6;
                  text-decoration-color: #004aad;
                }

                .article-content blockquote {
                  border-left: 3px solid #0073e6;
                  padding: 1rem 1.25rem;
                  margin: 1.5rem 0;
                  font-style: italic;
                  color: #495057;
                  background: #f8fafc;
                  border-radius: 0.5rem;
                }

                .article-content blockquote p {
                  margin-bottom: 0;
                }

                .article-content > *:first-child {
                  margin-top: 0;
                }

                @media (max-width: 768px) {
                  .article-content {
                    font-size: 1rem;
                    line-height: 1.7;
                  }

                  .article-content h2 {
                    font-size: 1.5rem;
                    margin-top: 2rem;
                    margin-bottom: 0.875rem;
                  }

                  .article-content h3 {
                    font-size: 1.25rem;
                    margin-top: 1.75rem;
                    margin-bottom: 0.75rem;
                  }

                  .article-content h4 {
                    font-size: 1.0625rem;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }

                  .article-content p {
                    font-size: 1rem;
                    margin-bottom: 1rem;
                  }

                  .article-content li {
                    font-size: 0.9375rem;
                    margin-bottom: 0.375rem;
                  }

                  .article-content ul, .article-content ol {
                    padding-left: 1.5rem;
                    margin: 1rem 0;
                  }
                }
              `}} />
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-base">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-base text-neutral-900">{article.author}</div>
                    {article.author_title && (
                      <div className="text-sm text-neutral-600">{article.author_title}</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="btn btn-outline text-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section style={{ backgroundColor: "#f8fafc", paddingTop: "3rem", paddingBottom: "3rem" }}>
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 style={{ fontSize: "1.875rem", fontWeight: "700", marginBottom: "0.5rem" }}>Continue Reading</h2>
                <p className="text-neutral-600">Explore more insights from our experts</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/resources/${related.id}`}
                    className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 bg-white/95 backdrop-blur-sm text-primary-700 rounded-full text-xs font-semibold shadow-sm">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                      <span>{related.author}</span>
                      <span>•</span>
                      <span>{related.read_time}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-neutral-600 text-sm line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section dark-section" style={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem" }}>Ready to Transform Your Practice?</h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
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
