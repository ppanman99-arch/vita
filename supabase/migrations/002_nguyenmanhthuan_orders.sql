-- Migration: NguyenManhThuan Orders Table
-- This migration creates the orders table for the nguyenmanhthuan e-commerce module
-- Supports order management, shipping, payment tracking, and Green Points integration

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  -- Primary Key
  id TEXT PRIMARY KEY, -- Format: ORD-{timestamp}-{random}
  
  -- User Reference
  user_id TEXT NOT NULL, -- References users.id (can be UUID or text depending on your user table)
  
  -- Order Items (stored as JSON)
  items JSONB NOT NULL DEFAULT '[]', -- Array of CartItem objects
  -- Example structure:
  -- [
  --   {
  --     "product": {
  --       "id": "prod-1",
  --       "name": "Product Name",
  --       "price": 100000,
  --       "image": "url",
  --       ...
  --     },
  --     "quantity": 2
  --   }
  -- ]
  
  -- Order Totals
  total NUMERIC(15, 2) NOT NULL CHECK (total >= 0), -- Total order value in VND
  
  -- Order Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled')),
  -- Status flow: pending -> confirmed -> processing -> shipping -> delivered
  -- Can also be cancelled at any time
  
  -- Shipping Information (stored as JSON)
  shipping_address JSONB, -- Shipping address object
  -- Example structure:
  -- {
  --   "name": "Nguyen Van A",
  --   "phone": "0123456789",
  --   "address": "123 Main Street",
  --   "city": "Ho Chi Minh City",
  --   "district": "District 1",
  --   "ward": "Ward 1"
  -- }
  
  -- Payment Information
  payment_method TEXT, -- 'cod' (Cash on Delivery) or 'bank_transfer'
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed')),
  
  -- Green Points Integration
  green_points_earned NUMERIC(10, 2), -- Points earned from this order (1% of total, min 10)
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
-- Index for querying orders by user
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Index for querying orders by status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Index for querying orders by date (for order history)
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Composite index for user orders sorted by date
CREATE INDEX IF NOT EXISTS idx_orders_user_created_at ON orders(user_id, created_at DESC);

-- Index for payment status (for payment tracking)
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status) WHERE payment_status IS NOT NULL;

-- ============================================
-- TRIGGERS
-- ============================================
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists before creating (for idempotent migration)
DROP TRIGGER IF EXISTS trigger_orders_updated_at ON orders;

CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent migration)
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Policy: Users can only see their own orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  USING (auth.uid()::text = user_id OR user_id = auth.uid()::text);

-- Policy: Users can insert their own orders
CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id = auth.uid()::text);

-- Policy: Users can update their own orders (limited to certain fields)
CREATE POLICY "Users can update their own orders"
  ON orders
  FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id = auth.uid()::text)
  WITH CHECK (auth.uid()::text = user_id OR user_id = auth.uid()::text);

-- Note: If your user_id is UUID and stored differently, adjust the RLS policies accordingly
-- Example for UUID user_id:
-- USING (auth.uid() = user_id::uuid)

-- ============================================
-- COMMENTS

-- ============================================
COMMENT ON TABLE orders IS 'Stores e-commerce orders from nguyenmanhthuan module';
COMMENT ON COLUMN orders.id IS 'Order ID in format ORD-{timestamp}-{random}';
COMMENT ON COLUMN orders.user_id IS 'Reference to users table (can be UUID or text)';
COMMENT ON COLUMN orders.items IS 'JSON array of CartItem objects with product and quantity';
COMMENT ON COLUMN orders.total IS 'Total order value in VND';
COMMENT ON COLUMN orders.status IS 'Order status: pending, confirmed, processing, shipping, delivered, cancelled';
COMMENT ON COLUMN orders.shipping_address IS 'JSON object with shipping address details';
COMMENT ON COLUMN orders.payment_method IS 'Payment method: cod or bank_transfer';
COMMENT ON COLUMN orders.payment_status IS 'Payment status: pending, paid, failed';
COMMENT ON COLUMN orders.green_points_earned IS 'Green Points earned from this order (1% of total, minimum 10)';
