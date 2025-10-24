import { getD1, isD1Available } from './d1Client';
import { BlogPost, BlogPostInput } from '../types/blog';

function convertRowToBlogPost(row: any): BlogPost {
  return {
    ...row,
    published: Boolean(row.published),
    featured: Boolean(row.featured)
  };
}

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return [];
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts ORDER BY created_at DESC')
        .all();

      if (!result.success) {
        console.error('Error fetching posts:', result.error);
        return [];
      }

      return (result.results || []).map(convertRowToBlogPost);
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      return [];
    }
  },

  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return [];
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY published_at DESC')
        .all();

      if (!result.success) {
        console.error('Error fetching published posts:', result.error);
        return [];
      }

      return (result.results || []).map(convertRowToBlogPost);
    } catch (error) {
      console.error('Error in getPublishedPosts:', error);
      return [];
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return null;
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts WHERE slug = ?')
        .bind(slug)
        .first();

      if (!result) {
        return null;
      }

      return convertRowToBlogPost(result);
    } catch (error) {
      console.error('Error in getPostBySlug:', error);
      return null;
    }
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return null;
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts WHERE id = ? AND published = 1')
        .bind(id)
        .first();

      if (!result) {
        return null;
      }

      return convertRowToBlogPost(result);
    } catch (error) {
      console.error('Error in getPostById:', error);
      return null;
    }
  },

  async getFeaturedPost(): Promise<BlogPost | null> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return null;
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts WHERE published = 1 AND featured = 1 ORDER BY published_at DESC LIMIT 1')
        .first();

      if (!result) {
        return null;
      }

      return convertRowToBlogPost(result);
    } catch (error) {
      console.error('Error in getFeaturedPost:', error);
      return null;
    }
  },

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      if (!isD1Available()) {
        console.warn('D1 database not available');
        return [];
      }

      const db = getD1();
      const result = await db
        .prepare('SELECT * FROM blog_posts WHERE published = 1 AND category = ? ORDER BY published_at DESC')
        .bind(category)
        .all();

      if (!result.success) {
        console.error('Error fetching posts by category:', result.error);
        return [];
      }

      return (result.results || []).map(convertRowToBlogPost);
    } catch (error) {
      console.error('Error in getPostsByCategory:', error);
      return [];
    }
  },

  async createPost(post: BlogPostInput): Promise<BlogPost | null> {
    try {
      if (!isD1Available()) {
        throw new Error('Database connection not available');
      }

      const db = getD1();
      const id = crypto.randomUUID();

      const result = await db
        .prepare(`
          INSERT INTO blog_posts (
            id, title, slug, excerpt, content, category, author,
            author_title, image, read_time, published, featured
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .bind(
          id,
          post.title,
          post.slug,
          post.excerpt,
          post.content,
          post.category,
          post.author,
          post.author_title || '',
          post.image,
          post.read_time,
          post.published ? 1 : 0,
          post.featured ? 1 : 0
        )
        .run();

      if (!result.success) {
        console.error('Error creating post:', result.error);
        throw new Error(result.error);
      }

      return await this.getPostById(id);
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  async updatePost(id: string, post: Partial<BlogPostInput>): Promise<BlogPost | null> {
    try {
      if (!isD1Available()) {
        throw new Error('Database connection not available');
      }

      const db = getD1();
      const updates: string[] = [];
      const values: any[] = [];

      Object.entries(post).forEach(([key, value]) => {
        updates.push(`${key} = ?`);
        if (key === 'published' || key === 'featured') {
          values.push(value ? 1 : 0);
        } else {
          values.push(value);
        }
      });

      updates.push('updated_at = datetime("now")');
      values.push(id);

      const result = await db
        .prepare(`UPDATE blog_posts SET ${updates.join(', ')} WHERE id = ?`)
        .bind(...values)
        .run();

      if (!result.success) {
        console.error('Error updating post:', result.error);
        throw new Error(result.error);
      }

      return await this.getPostById(id);
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      if (!isD1Available()) {
        throw new Error('Database connection not available');
      }

      const db = getD1();
      const result = await db
        .prepare('DELETE FROM blog_posts WHERE id = ?')
        .bind(id)
        .run();

      if (!result.success) {
        console.error('Error deleting post:', result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error in deletePost:', error);
      throw error;
    }
  },

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};
