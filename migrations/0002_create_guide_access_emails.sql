-- Migration: Create guide_access_emails table for D1
-- Created: 2025-10-24

CREATE TABLE IF NOT EXISTS guide_access_emails (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL,
  guide_name TEXT NOT NULL DEFAULT 'rd-tax-credit',
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  access_count INTEGER DEFAULT 1,
  last_accessed_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE(email, guide_name)
);

CREATE INDEX IF NOT EXISTS idx_guide_access_emails_email ON guide_access_emails(email);
CREATE INDEX IF NOT EXISTS idx_guide_access_emails_guide_name ON guide_access_emails(guide_name);
CREATE INDEX IF NOT EXISTS idx_guide_access_emails_created_at ON guide_access_emails(created_at DESC);
