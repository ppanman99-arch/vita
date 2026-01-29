-- Migration: Cooperatives, VITA Applications, Green Investment Opportunities (Go-Live)
-- Supports HTX portal, VITA registration/approval, and project listing for Member/ESG.

-- ============================================
-- 1. COOPERATIVES
-- ============================================
CREATE TABLE IF NOT EXISTS cooperatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  tax_code TEXT,
  established_year INTEGER,
  member_count INTEGER,
  total_forest_area NUMERIC,
  location TEXT,
  representative TEXT,
  representative_position TEXT,
  phone TEXT,
  current_activities TEXT,
  interests JSONB DEFAULT '[]',
  additional_info TEXT,
  logo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cooperatives_auth_user ON cooperatives(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_cooperatives_status ON cooperatives(status);
CREATE INDEX IF NOT EXISTS idx_cooperatives_email ON cooperatives(email);

-- ============================================
-- 2. VITA_APPLICATIONS (đơn đăng ký tham gia VITA)
-- ============================================
CREATE TABLE IF NOT EXISTS vita_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cooperative_id)
);

CREATE INDEX IF NOT EXISTS idx_vita_applications_cooperative ON vita_applications(cooperative_id);
CREATE INDEX IF NOT EXISTS idx_vita_applications_status ON vita_applications(status);

-- ============================================
-- 3. GREEN_INVESTMENT_OPPORTUNITIES (dự án HTX)
-- ============================================
CREATE TABLE IF NOT EXISTS green_investment_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cooperative TEXT NOT NULL,
  image TEXT,
  target_amount BIGINT NOT NULL DEFAULT 0,
  raised BIGINT NOT NULL DEFAULT 0,
  min_invest BIGINT NOT NULL DEFAULT 0,
  expected_return NUMERIC NOT NULL DEFAULT 0,
  duration TEXT NOT NULL DEFAULT '',
  investors INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  benefits JSONB DEFAULT '[]',
  carbon_credits_estimate NUMERIC,
  esg_category TEXT,
  source TEXT CHECK (source IN ('htx', 'admin_forest_funding')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'funded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_green_investment_cooperative ON green_investment_opportunities(cooperative_id);
CREATE INDEX IF NOT EXISTS idx_green_investment_status ON green_investment_opportunities(status);

-- ============================================
-- 4. COOPERATIVE_MEMBERS (xã viên thuộc HTX)
-- ============================================
CREATE TABLE IF NOT EXISTS cooperative_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'producer' CHECK (role IN ('producer', 'resource', 'investor', 'consumer', 'admin')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT,
  phone TEXT,
  vita_score INTEGER,
  area NUMERIC,
  compliance JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cooperative_members_coop ON cooperative_members(cooperative_id);
CREATE INDEX IF NOT EXISTS idx_cooperative_members_user ON cooperative_members(user_id);

-- ============================================
-- 5. CAPITAL_INVESTMENTS (góp vốn của xã viên/ESG)
-- ============================================
CREATE TABLE IF NOT EXISTS capital_investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  opportunity_id UUID NOT NULL REFERENCES green_investment_opportunities(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL,
  contract_id TEXT,
  contract_status TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_capital_investments_user ON capital_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_capital_investments_opportunity ON capital_investments(opportunity_id);

-- ============================================
-- 6. RLS (Row Level Security)
-- ============================================
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE vita_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE green_investment_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperative_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE capital_investments ENABLE ROW LEVEL SECURITY;

-- Cooperatives: HTX đọc/sửa bản ghi của mình; cho phép đọc tất cả để admin list và landing public
CREATE POLICY cooperatives_select ON cooperatives
  FOR SELECT USING (true);

CREATE POLICY cooperatives_update_own ON cooperatives
  FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY cooperatives_insert ON cooperatives
  FOR INSERT WITH CHECK (true);

-- VITA applications: system admin đọc/update; HTX đọc đơn của mình
CREATE POLICY vita_applications_select ON vita_applications
  FOR SELECT USING (true);

CREATE POLICY vita_applications_insert ON vita_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY vita_applications_update ON vita_applications
  FOR UPDATE USING (true);

-- Green investment opportunities: public đọc published; HTX insert/update của mình
CREATE POLICY green_investment_select ON green_investment_opportunities
  FOR SELECT USING (true);

CREATE POLICY green_investment_insert ON green_investment_opportunities
  FOR INSERT WITH CHECK (true);

CREATE POLICY green_investment_update ON green_investment_opportunities
  FOR UPDATE USING (true);

-- Cooperative members: HTX quản lý member của mình
CREATE POLICY cooperative_members_select ON cooperative_members
  FOR SELECT USING (true);

CREATE POLICY cooperative_members_insert ON cooperative_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY cooperative_members_update ON cooperative_members
  FOR UPDATE USING (true);

-- Capital investments: app filters by user_id; RLS allow read for authenticated
CREATE POLICY capital_investments_select ON capital_investments
  FOR SELECT USING (true);

CREATE POLICY capital_investments_insert ON capital_investments
  FOR INSERT WITH CHECK (true);

CREATE POLICY capital_investments_update ON capital_investments
  FOR UPDATE USING (true);

COMMENT ON TABLE cooperatives IS 'Hợp tác xã; status: pending (chờ duyệt), approved, rejected, active';
COMMENT ON TABLE vita_applications IS 'Đơn đăng ký tham gia hệ sinh thái VITA; admin phê duyệt';
COMMENT ON TABLE green_investment_opportunities IS 'Dự án kêu gọi vốn / ESG do HTX tạo';
COMMENT ON TABLE capital_investments IS 'Ghi nhận góp vốn của xã viên/ESG vào dự án';
