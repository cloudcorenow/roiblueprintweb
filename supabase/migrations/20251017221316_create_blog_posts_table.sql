/*
  # Create Blog Posts Table

  ## Overview
  Creates a comprehensive blog posts table for managing articles on the resources page.

  ## New Tables
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text, required) - Post title
  - `slug` (text, unique, required) - URL-friendly version of title
  - `excerpt` (text, required) - Short summary/preview of the post
  - `content` (text, required) - Full post content (supports markdown)
  - `category` (text, required) - Post category (Tax Planning, Small Business, etc.)
  - `author` (text, required) - Author name
  - `author_title` (text) - Author's professional title (e.g., "CPA")
  - `image` (text, required) - Featured image URL
  - `read_time` (text, required) - Estimated reading time (e.g., "5 min read")
  - `published` (boolean, default false) - Whether the post is published
  - `featured` (boolean, default false) - Whether to feature on homepage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `published_at` (timestamptz) - When the post was published

  ## Security
  
  ### Row Level Security (RLS)
  1. Enable RLS on `blog_posts` table
  2. **Public Read Access**: Anyone can view published posts
  3. **Admin Write Access**: Only authenticated users can create/update/delete posts
     - In production, you'd add role-based checks here
     - For now, any authenticated user has admin access

  ## Important Notes
  1. The `slug` field is unique and used for SEO-friendly URLs
  2. Only published posts are visible to the public
  3. Featured posts can be highlighted on the homepage
  4. All timestamps use UTC timezone
  5. Content field supports markdown formatting
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  author_title text DEFAULT '',
  image text NOT NULL,
  read_time text NOT NULL,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can view all posts (for admin)
CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert posts
CREATE POLICY "Authenticated users can create posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update posts
CREATE POLICY "Authenticated users can update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  
  -- Set published_at when post is first published
  IF NEW.published = true AND OLD.published = false THEN
    NEW.published_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();