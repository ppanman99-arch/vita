-- Migration: Unified Users and Green Points for VITA + nguyenmanhthuan
-- This migration sets up the database schema to support users and green points
-- from both platforms (VITA and nguyenmanhthuan) in a single Supabase project

-- ============================================
-- 1. USERS TABLE (Unified)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  platform_source TEXT NOT NULL CHECK (platform_source IN ('vita', 'nguyenmanhthuan')),
  external_id TEXT, -- ID từ nền tảng gốc (nếu có)
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_platform_source ON users(platform_source);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_external_id ON users(external_id) WHERE external_id IS NOT NULL;

-- ============================================
-- 2. USER MAPPINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vita_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nguyenmanhthuan_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  unified_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vita_user_id),
  UNIQUE(nguyenmanhthuan_user_id)
);

-- Indexes for user_mappings
CREATE INDEX IF NOT EXISTS idx_user_mappings_vita ON user_mappings(vita_user_id);
CREATE INDEX IF NOT EXISTS idx_user_mappings_nguyenmanhthuan ON user_mappings(nguyenmanhthuan_user_id);
CREATE INDEX IF NOT EXISTS idx_user_mappings_unified ON user_mappings(unified_user_id);

-- ============================================
-- 3. GREEN POINTS TABLE (Create if not exists, then update)
-- ============================================
-- Create green_points table if it doesn't exist
CREATE TABLE IF NOT EXISTS green_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  user_type TEXT NOT NULL,
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  locked_points INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'bronze',
  earned_this_month INTEGER DEFAULT 0,
  earned_this_year INTEGER DEFAULT 0,
  redeemed_this_month INTEGER DEFAULT 0,
  redeemed_this_year INTEGER DEFAULT 0,
  top_activity TEXT DEFAULT '',
  platform_source TEXT DEFAULT 'vita',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add platform_source column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'green_points' AND column_name = 'platform_source'
  ) THEN
    ALTER TABLE green_points ADD COLUMN platform_source TEXT DEFAULT 'vita';
  END IF;
END $$;

-- Update constraint if needed
ALTER TABLE green_points 
  DROP CONSTRAINT IF EXISTS green_points_platform_source_check;
ALTER TABLE green_points 
  ADD CONSTRAINT green_points_platform_source_check 
  CHECK (platform_source IN ('vita', 'nguyenmanhthuan'));

-- Indexes for green_points
CREATE INDEX IF NOT EXISTS idx_green_points_user_id ON green_points(user_id);
CREATE INDEX IF NOT EXISTS idx_green_points_platform_source ON green_points(platform_source);

-- ============================================
-- 4. GREEN POINT TRANSACTIONS TABLE (Create if not exists, then update)
-- ============================================
-- Create green_point_transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS green_point_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earn', 'redeem', 'expire', 'adjust')),
  points INTEGER NOT NULL,
  activity TEXT NOT NULL,
  category TEXT NOT NULL,
  portal TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  platform_source TEXT DEFAULT 'vita',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add platform_source column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'green_point_transactions' AND column_name = 'platform_source'
  ) THEN
    ALTER TABLE green_point_transactions ADD COLUMN platform_source TEXT DEFAULT 'vita';
  END IF;
END $$;

-- Update constraint if needed
ALTER TABLE green_point_transactions 
  DROP CONSTRAINT IF EXISTS green_point_transactions_platform_source_check;
ALTER TABLE green_point_transactions 
  ADD CONSTRAINT green_point_transactions_platform_source_check 
  CHECK (platform_source IN ('vita', 'nguyenmanhthuan'));

-- Indexes for green_point_transactions
CREATE INDEX IF NOT EXISTS idx_green_point_transactions_user_id ON green_point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_green_point_transactions_timestamp ON green_point_transactions(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_green_point_transactions_platform_source 
  ON green_point_transactions(platform_source);

-- ============================================
-- 5. ENABLE REALTIME (if not already enabled)
-- ============================================
-- Enable Realtime for tables (run in Supabase Dashboard or via API)
-- ALTER PUBLICATION supabase_realtime ADD TABLE users;
-- ALTER PUBLICATION supabase_realtime ADD TABLE user_mappings;
-- ALTER PUBLICATION supabase_realtime ADD TABLE green_points;
-- ALTER PUBLICATION supabase_realtime ADD TABLE green_point_transactions;

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE green_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE green_point_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can read own green points" ON green_points;
DROP POLICY IF EXISTS "Users can read own transactions" ON green_point_transactions;
DROP POLICY IF EXISTS "Users can insert own green points" ON green_points;
DROP POLICY IF EXISTS "Users can update own green points" ON green_points;
DROP POLICY IF EXISTS "Users can insert own transactions" ON green_point_transactions;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (true); -- Allow all reads for now, adjust based on your auth setup

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (true); -- Allow all updates for now, adjust based on your auth setup

-- Users can read their own green points
CREATE POLICY "Users can read own green points" ON green_points
  FOR SELECT USING (true); -- Allow all reads for now, adjust based on your auth setup

-- Users can insert/update their own green points
CREATE POLICY "Users can insert own green points" ON green_points
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own green points" ON green_points
  FOR UPDATE USING (true);

-- Users can read their own transactions
CREATE POLICY "Users can read own transactions" ON green_point_transactions
  FOR SELECT USING (true); -- Allow all reads for now, adjust based on your auth setup

-- Users can insert their own transactions
CREATE POLICY "Users can insert own transactions" ON green_point_transactions
  FOR INSERT WITH CHECK (true);

-- Note: Adjust RLS policies based on your authentication setup
-- If using custom auth, you may need to adjust these policies
-- For production, you should use proper user_id matching instead of 'true'

-- ============================================
-- 7. FUNCTIONS
-- ============================================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. COMMENTS
-- ============================================
COMMENT ON TABLE users IS 'Unified users table for both VITA and nguyenmanhthuan platforms';
COMMENT ON COLUMN users.platform_source IS 'Source platform: vita or nguyenmanhthuan';
COMMENT ON COLUMN users.external_id IS 'Original user ID from the source platform';

COMMENT ON TABLE user_mappings IS 'Maps users between VITA and nguyenmanhthuan platforms';
COMMENT ON COLUMN user_mappings.unified_user_id IS 'The unified user ID used for green points';

COMMENT ON COLUMN green_points.platform_source IS 'Platform where the green points were earned';
COMMENT ON COLUMN green_point_transactions.platform_source IS 'Platform where the transaction occurred';
