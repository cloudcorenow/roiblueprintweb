/*
  # Create newsletter_subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (text, primary key) - UUID for the subscription
      - `email` (text, unique, required) - Subscriber's email address
      - `source` (text) - Source of the subscription (e.g., 'homepage', 'footer', 'blog')
      - `created_at` (timestamp) - When the subscription was created
      - `updated_at` (timestamp) - When the record was last updated

  2. Security
    - No RLS needed as this is accessed through Cloudflare Functions with authentication
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  created_at DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscriptions(created_at);
