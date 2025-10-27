-- Migration: Create blog_posts table for D1
-- Created: 2025-10-24

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  author_title TEXT DEFAULT '',
  image TEXT NOT NULL,
  read_time TEXT NOT NULL,
  published INTEGER DEFAULT 0,
  featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
