/*
  # Create form submissions tracking table

  1. New Tables
    - `form_submissions`
      - `id` (text, primary key) - UUID for the submission
      - `email` (text, required) - Submitter's email address
      - `form_type` (text, required) - Type of form (contact, newsletter, guide)
      - `ip_address` (text) - IP address of submitter
      - `submission_count` (integer, default 1) - Number of submissions from this email
      - `last_submission_at` (timestamp) - When the last submission occurred
      - `created_at` (timestamp) - When the first submission was created
      - `is_blocked` (boolean, default false) - Whether this email is blocked from submitting

  2. Indexes
    - Index on email for fast lookups
    - Index on form_type for filtering
    - Composite index on email + form_type for rate limiting checks
    - Index on last_submission_at for cleanup queries

  3. Purpose
    - Track form submission patterns to detect abuse
    - Implement email-based rate limiting
    - Block repeat offenders
    - Provide analytics on form usage
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  form_type TEXT NOT NULL,
  ip_address TEXT,
  submission_count INTEGER DEFAULT 1,
  last_submission_at DATETIME DEFAULT (datetime('now')),
  created_at DATETIME DEFAULT (datetime('now')),
  is_blocked BOOLEAN DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email_form_type ON form_submissions(email, form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_last_submission ON form_submissions(last_submission_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_is_blocked ON form_submissions(is_blocked);
