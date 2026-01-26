# HƯỚNG DẪN TẠO DATABASE SCHEMA CHO BẢNG ORDERS

**Mục đích:** Tạo bảng `orders` trong Supabase để hỗ trợ tính năng e-commerce của module nguyenmanhthuan.

**Yêu cầu:**
- Đã có tài khoản Supabase
- Đã có project Supabase được setup
- Đã có bảng `users` (từ migration 001 hoặc từ Supabase Auth)

---

## 📋 PHƯƠNG PHÁP 1: SỬ DỤNG SUPABASE MIGRATION (KHUYẾN NGHỊ)

### Bước 1: Tạo Migration File

File migration đã được tạo tại: `supabase/migrations/002_nguyenmanhthuan_orders.sql`

### Bước 2: Chạy Migration

#### Option A: Sử dụng Supabase CLI (Khuyến nghị)

```bash
# 1. Đảm bảo đã cài đặt Supabase CLI
npm install -g supabase

# 2. Login vào Supabase
supabase login

# 3. Link project (nếu chưa link)
supabase link --project-ref YOUR_PROJECT_REF

# 4. Chạy migration
supabase db push
```

#### Option B: Chạy trực tiếp trong Supabase Dashboard

1. Mở Supabase Dashboard: https://app.supabase.com
2. Chọn project của bạn
3. Vào **SQL Editor**
4. Copy toàn bộ nội dung file `supabase/migrations/002_nguyenmanhthuan_orders.sql`
5. Paste vào SQL Editor
6. Click **Run** để execute

---

## 📋 PHƯƠNG PHÁP 2: TẠO BẢNG THỦ CÔNG TRONG SUPABASE DASHBOARD

### Bước 1: Mở Table Editor

1. Vào Supabase Dashboard
2. Chọn project
3. Vào **Table Editor** (sidebar bên trái)
4. Click **New Table**

### Bước 2: Tạo Bảng

**Table Name:** `orders`

**Columns:**

| Column Name | Type | Default | Nullable | Primary Key | Description |
|------------|------|---------|----------|-------------|-------------|
| `id` | `text` | - | ❌ | ✅ | Order ID (Format: ORD-{timestamp}-{random}) |
| `user_id` | `text` | - | ❌ | ❌ | User ID (references users table) |
| `items` | `jsonb` | `'[]'` | ❌ | ❌ | Order items (JSON array) |
| `total` | `numeric(15,2)` | - | ❌ | ❌ | Total order value |
| `status` | `text` | `'pending'` | ❌ | ❌ | Order status |
| `shipping_address` | `jsonb` | - | ✅ | ❌ | Shipping address (JSON object) |
| `payment_method` | `text` | - | ✅ | ❌ | Payment method |
| `payment_status` | `text` | - | ✅ | ❌ | Payment status |
| `green_points_earned` | `numeric(10,2)` | - | ✅ | ❌ | Green Points earned |
| `created_at` | `timestamptz` | `now()` | ❌ | ❌ | Created timestamp |
| `updated_at` | `timestamptz` | `now()` | ❌ | ❌ | Updated timestamp |

### Bước 3: Thêm Constraints

Sau khi tạo bảng, vào **SQL Editor** và chạy các lệnh sau:

```sql
-- Add check constraint for status
ALTER TABLE orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'));

-- Add check constraint for payment_status
ALTER TABLE orders 
ADD CONSTRAINT orders_payment_status_check 
CHECK (payment_status IN ('pending', 'paid', 'failed') OR payment_status IS NULL);

-- Add check constraint for total (must be >= 0)
ALTER TABLE orders 
ADD CONSTRAINT orders_total_check 
CHECK (total >= 0);
```

### Bước 4: Tạo Indexes

```sql
-- Index for querying orders by user
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Index for querying orders by status
CREATE INDEX idx_orders_status ON orders(status);

-- Index for querying orders by date
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Composite index for user orders sorted by date
CREATE INDEX idx_orders_user_created_at ON orders(user_id, created_at DESC);

-- Index for payment status
CREATE INDEX idx_orders_payment_status ON orders(payment_status) WHERE payment_status IS NOT NULL;
```

### Bước 5: Tạo Trigger cho Auto-update updated_at

```sql
-- Create function
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();
```

### Bước 6: Setup Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  USING (auth.uid()::text = user_id OR user_id = auth.uid()::text);

-- Policy: Users can create their own orders
CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id OR user_id = auth.uid()::text);

-- Policy: Users can update their own orders
CREATE POLICY "Users can update their own orders"
  ON orders
  FOR UPDATE
  USING (auth.uid()::text = user_id OR user_id = auth.uid()::text)
  WITH CHECK (auth.uid()::text = user_id OR user_id = auth.uid()::text);
```

**Lưu ý:** Nếu `user_id` của bạn là UUID (không phải text), cần điều chỉnh RLS policies:

```sql
-- For UUID user_id
USING (auth.uid() = user_id::uuid)
```

---

## ✅ VERIFICATION (KIỂM TRA)

Sau khi tạo bảng, kiểm tra bằng cách:

### 1. Kiểm tra bảng đã được tạo

```sql
-- Check table exists
SELECT * FROM information_schema.tables 
WHERE table_name = 'orders';

-- Check columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

### 2. Kiểm tra indexes

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders';
```

### 3. Kiểm tra RLS policies

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'orders';
```

### 4. Test insert (Optional)

```sql
-- Test insert (thay user_id bằng user_id thực tế)
INSERT INTO orders (
  id,
  user_id,
  items,
  total,
  status,
  payment_status
) VALUES (
  'ORD-TEST-001',
  'YOUR_USER_ID_HERE',
  '[]'::jsonb,
  0,
  'pending',
  'pending'
);

-- Check inserted data
SELECT * FROM orders WHERE id = 'ORD-TEST-001';

-- Cleanup test data
DELETE FROM orders WHERE id = 'ORD-TEST-001';
```

---

## 🔧 TROUBLESHOOTING

### Lỗi: "relation 'orders' already exists"

**Giải pháp:** Bảng đã tồn tại. Có thể:
- Xóa bảng cũ và tạo lại: `DROP TABLE orders CASCADE;`
- Hoặc sử dụng `CREATE TABLE IF NOT EXISTS` trong migration

### Lỗi: "permission denied for table orders"

**Giải pháp:** 
- Kiểm tra RLS policies đã được tạo đúng chưa
- Đảm bảo user đã đăng nhập (auth.uid() không null)
- Kiểm tra user_id trong order khớp với auth.uid()

### Lỗi: "check constraint violated"

**Giải pháp:**
- Kiểm tra `status` phải là một trong: 'pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'
- Kiểm tra `payment_status` phải là một trong: 'pending', 'paid', 'failed' hoặc NULL
- Kiểm tra `total` >= 0

### Lỗi: "invalid input syntax for type jsonb"

**Giải pháp:**
- Đảm bảo `items` và `shipping_address` là JSON hợp lệ
- Sử dụng `'[]'::jsonb` cho empty array
- Sử dụng `'{}'::jsonb` cho empty object

---

## 📝 NOTES

1. **User ID Format:** 
   - Nếu bạn dùng Supabase Auth, `user_id` có thể là UUID
   - Nếu bạn dùng custom users table, `user_id` có thể là text
   - Cần điều chỉnh RLS policies cho phù hợp

2. **Order ID Format:**
   - Format: `ORD-{timestamp}-{random}`
   - Được generate trong `OrderService.createOrder()`
   - Đảm bảo unique (đã set PRIMARY KEY)

3. **JSON Structure:**
   - `items`: Array of CartItem objects
   - `shipping_address`: Object with name, phone, address, city, district, ward

4. **Green Points:**
   - Tính theo công thức: 1% giá trị đơn hàng, tối thiểu 10 điểm
   - Được tính và lưu sau khi order được confirmed

---

## 🔗 RELATED FILES

- Migration file: `supabase/migrations/002_nguyenmanhthuan_orders.sql`
- OrderService: `src/modules/nguyenmanhthuan/application/OrderService.ts`
- Order domain: `src/modules/nguyenmanhthuan/domain/Order.ts`
- Verification report: `.architecture/migration-phases/phase-03/VERIFICATION_REPORT.md`

---

## ✅ CHECKLIST

Sau khi hoàn thành, đảm bảo:

- [ ] Bảng `orders` đã được tạo
- [ ] Tất cả columns đã được tạo đúng
- [ ] Constraints đã được thêm
- [ ] Indexes đã được tạo
- [ ] Trigger `updated_at` hoạt động
- [ ] RLS policies đã được setup
- [ ] Test insert/select thành công
- [ ] Verification queries chạy thành công

---

**Ngày tạo:** 26/01/2026  
**Phiên bản:** 1.0  
**Tác giả:** Auto (AI Assistant)
