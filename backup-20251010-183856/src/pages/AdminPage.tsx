import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Save, X, Lock } from "lucide-react";

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

const ADMIN_PASSWORD = "admin123"; // In production, use proper authentication
const STORAGE_KEY = "roiblueprint_blog_posts";
const AUTH_KEY = "roiblueprint_admin_auth";

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const categories = ["Tax Credits", "ABA Practices", "Manufacturing", "Tax Planning", "Healthcare", "Exit Planning"];

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem(AUTH_KEY);
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Load posts from localStorage
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, "true");
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    navigate("/");
  };

  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      readTime: "5 min read",
      category: categories[0],
      tags: [],
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  const handleSavePost = (post: BlogPost) => {
    if (isCreating) {
      savePosts([...posts, post]);
    } else {
      savePosts(posts.map(p => p.id === post.id ? post : p));
    }
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      savePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50" style={{ paddingTop: "8rem" }}>
        <div className="card max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-500 text-white rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <h2>Admin Login</h2>
            <p className="text-neutral-600">Enter password to access blog management</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (editingPost) {
    return <PostEditor 
      post={editingPost} 
      categories={categories}
      onSave={handleSavePost} 
      onCancel={handleCancel}
      isCreating={isCreating}
    />;
  }

  return (
    <div style={{ paddingTop: "8rem" }}>
      <div className="container section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>Blog Administration</h1>
            <p className="text-neutral-600">Manage your blog posts and articles</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleCreatePost} className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </button>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Author</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Featured</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-100">
                    <td className="py-3 px-4">
                      <div className="font-medium">{post.title || "Untitled"}</div>
                      <div className="text-sm text-neutral-500 line-clamp-2">{post.excerpt}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="modern-badge modern-badge-secondary text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{post.author}</td>
                    <td className="py-3 px-4 text-sm">{new Date(post.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      {post.featured && (
                        <span className="modern-badge modern-badge-primary text-xs">Featured</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {posts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">No posts yet</h3>
                <p className="text-neutral-500 mb-4">Create your first blog post to get started.</p>
                <button onClick={handleCreatePost} className="btn btn-primary">
                  Create First Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PostEditorProps {
  post: BlogPost;
  categories: string[];
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  isCreating: boolean;
}

function PostEditor({ post, categories, onSave, onCancel, isCreating }: PostEditorProps) {
  const [formData, setFormData] = useState<BlogPost>(post);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    onSave(formData);
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <div className="container section">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>{isCreating ? "Create New Post" : "Edit Post"}</h1>
            <p className="text-neutral-600">Fill in the details for your blog post</p>
          </div>
          <div className="flex gap-4">
            <button onClick={onCancel} className="btn btn-outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h3 className="mb-4">Post Content</h3>
                
                <div className="mb-4">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    className="form-textarea"
                    rows={3}
                    placeholder="Brief description of the post..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="form-textarea"
                    rows={12}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Featured Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="mb-4">Post Settings</h3>
                
                <div className="mb-4">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                    className="form-input"
                    placeholder="5 min read"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="form-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange("featured", e.target.checked)}
                      className="rounded"
                    />
                    <span className="form-label mb-0">Featured Post</span>
                  </label>
                </div>
              </div>

              <div className="card">
                <h3 className="mb-4">Tags</h3>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="form-input flex-1"
                    placeholder="Add tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn btn-outline px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Save className="w-4 h-4 mr-2" />
                {isCreating ? "Create Post" : "Update Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}