/*
  # Allow authenticated users to submit emails

  1. Changes
    - Add policy to allow authenticated users to insert their email
    - This complements the existing anon policy
    
  2. Security
    - Both anonymous and authenticated users can INSERT (submit their email)
    - Service role can SELECT and manage all data
*/

-- Drop if exists and recreate
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Authenticated users can submit email for guide access" ON guide_access_emails;
END $$;

-- Allow authenticated users to insert their email
CREATE POLICY "Authenticated users can submit email for guide access"
  ON guide_access_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);