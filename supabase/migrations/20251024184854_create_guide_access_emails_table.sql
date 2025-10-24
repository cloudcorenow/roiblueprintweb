/*
  # Create guide access emails table

  1. New Tables
    - `guide_access_emails`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique, not null) - User email address
      - `guide_name` (text, not null) - Name of the guide accessed (default: 'rd-tax-credit')
      - `created_at` (timestamptz) - Timestamp when email was collected
      - `access_count` (integer) - Number of times guide was accessed (default: 1)
      - `last_accessed_at` (timestamptz) - Last time the guide was accessed
      
  2. Security
    - Enable RLS on `guide_access_emails` table
    - Add policy for service role to insert and read data (this is admin-only data)
    
  3. Indexes
    - Index on email for fast lookups
    - Index on guide_name for filtering
    
  4. Notes
    - Table tracks email addresses of users who request access to guides
    - Allows tracking which guides are most popular
    - Prevents duplicate email submissions with UPSERT logic
*/

CREATE TABLE IF NOT EXISTS guide_access_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  guide_name text NOT NULL DEFAULT 'rd-tax-credit',
  created_at timestamptz DEFAULT now(),
  access_count integer DEFAULT 1,
  last_accessed_at timestamptz DEFAULT now(),
  UNIQUE(email, guide_name)
);

ALTER TABLE guide_access_emails ENABLE ROW LEVEL SECURITY;

-- Only service role can access this data (admin only)
CREATE POLICY "Service role can manage guide access emails"
  ON guide_access_emails
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_guide_access_emails_email ON guide_access_emails(email);
CREATE INDEX IF NOT EXISTS idx_guide_access_emails_guide_name ON guide_access_emails(guide_name);
CREATE INDEX IF NOT EXISTS idx_guide_access_emails_created_at ON guide_access_emails(created_at DESC);