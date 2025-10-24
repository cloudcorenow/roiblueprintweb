/*
  # Update RLS policies for guide_access_emails table

  1. Changes
    - Drop existing service role policy
    - Add policy to allow anonymous users to insert their email
    - Add policy to allow service role to read all data (for admin dashboard)
    
  2. Security
    - Anonymous users can only INSERT (submit their email)
    - Service role can SELECT (view all submissions)
    - No one can UPDATE or DELETE except service role
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Service role can manage guide access emails" ON guide_access_emails;

-- Allow anonymous users to insert their email
CREATE POLICY "Anyone can submit email for guide access"
  ON guide_access_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all submissions
CREATE POLICY "Service role can view all guide access emails"
  ON guide_access_emails
  FOR SELECT
  TO service_role
  USING (true);

-- Allow service role to manage all data
CREATE POLICY "Service role can manage guide access emails"
  ON guide_access_emails
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);