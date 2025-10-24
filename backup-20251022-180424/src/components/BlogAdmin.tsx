import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { BlogPost, BlogPostInput } from '../types/blog';
import { blogService } from '../utils/blogService';

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BlogPostInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Tax Planning',
    author: '',
    author_title: '',
    image: '',
    read_time: '5 min read',
    published: false,
    featured: false,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      alert('Failed to load posts');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      if (name === 'title' && !currentPost) {
        setFormData(prev => ({ ...prev, slug: blogService.generateSlug(value) }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentPost) {
        await blogService.updatePost(currentPost.id, formData);
      } else {
        await blogService.createPost(formData);
      }

      await loadPosts();
      resetForm();
      alert(currentPost ? 'Post updated successfully!' : 'Post created successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      author_title: post.author_title || '',
      image: post.image,
      read_time: post.read_time,
      published: post.published,
      featured: post.featured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogService.deletePost(id);
      await loadPosts();
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const resetForm = () => {
    setCurrentPost(null);
    setIsEditing(false);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Tax Planning',
      author: '',
      author_title: '',
      image: '',
      read_time: '5 min read',
      published: false,
      featured: false,
    });
  };

  const categories = [
    'Tax Planning',
    'Small Business',
    'Bookkeeping',
    'Financial Planning',
    'Business Formation',
    'Tax Preparation',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your blog articles</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            style={{ backgroundColor: '#2563eb' }}
          >
            <Plus size={20} />
            <span>New Post</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">
              {currentPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={resetForm}
              className="text-brand-navy/60 hover:text-brand-navy"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Read Time *
                </label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleInputChange}
                  required
                  placeholder="5 min read"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Author Title
                </label>
                <input
                  type="text"
                  name="author_title"
                  value={formData.author_title}
                  onChange={handleInputChange}
                  placeholder="CPA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brand-navy mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-brand-navy rounded focus:ring-2 focus:ring-brand-navy"
                  />
                  <span className="text-sm font-medium text-brand-navy">Published</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-brand-navy rounded focus:ring-2 focus:ring-brand-navy"
                  />
                  <span className="text-sm font-medium text-brand-navy">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-gold text-white px-8 py-3 rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (currentPost ? 'Update Post' : 'Create Post')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-brand-navy px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No blog posts yet. Create your first post!
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-brand-navy">
                            {post.title}
                          </div>
                          {post.featured && (
                            <Star size={16} className="text-brand-gold fill-brand-gold" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.author}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.published ? (
                            <>
                              <Eye size={12} />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} />
                              <span>Draft</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-brand-navy hover:text-brand-gold transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
