import { supabase } from './supabase';
import { BlogPost, BlogPostInput } from '../types/blog';

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return [];
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    return data || [];
  },

  async getPublishedPosts(): Promise<BlogPost[]> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return [];
    }

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
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
    }

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
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
    }

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
  },

  async getFeaturedPost(): Promise<BlogPost | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
    }

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
  },

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return [];
    }

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
  },

  async createPost(post: BlogPostInput): Promise<BlogPost | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
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
  },

  async updatePost(id: string, post: Partial<BlogPostInput>): Promise<BlogPost | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return null;
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
  },

  async deletePost(id: string): Promise<void> {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return;
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
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
