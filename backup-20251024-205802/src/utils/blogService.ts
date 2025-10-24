import { supabase } from './supabase';
import { BlogPost, BlogPostInput } from '../types/blog';

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      return [];
    }
  },

  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching published posts:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Error in getPublishedPosts:', error);
      return [];
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      if (!supabase) return null;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching post by slug:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error in getPostBySlug:', error);
      return null;
    }
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      if (!supabase) return null;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching post by id:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error in getPostById:', error);
      return null;
    }
  },

  async getFeaturedPost(): Promise<BlogPost | null> {
    try {
      if (!supabase) return null;

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching featured post:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error in getFeaturedPost:', error);
      return null;
    }
  },

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Error in getPostsByCategory:', error);
      return [];
    }
  },

  async createPost(post: BlogPostInput): Promise<BlogPost | null> {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  },

  async updatePost(id: string, post: Partial<BlogPostInput>): Promise<BlogPost | null> {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw error;
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        throw error;
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
