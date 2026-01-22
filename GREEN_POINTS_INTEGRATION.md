# Hệ thống Green Points - Tài liệu Tích hợp

## Tổng quan

Hệ thống Green Points là hệ thống loyalty xuyên suốt toàn bộ hệ sinh thái VITA COOP, cho phép người dùng tích điểm từ mọi hoạt động và đổi điểm lấy quyền lợi.

## Cấu trúc

### 1. Types & Interfaces (`src/lib/greenPoints/types.ts`)
- Định nghĩa tất cả types và interfaces
- Tier thresholds (Bronze → Diamond)
- Default activities cho tất cả portal

### 2. Service (`src/lib/greenPoints/service.ts`)
- `getUserGreenPoints()` - Lấy thông tin điểm
- `earnPoints()` - Tích điểm
- `redeemPoints()` - Đổi điểm
- `getTransactionHistory()` - Lịch sử
- `getAvailableRewards()` - Danh sách quà

### 3. Helpers (`src/lib/greenPoints/helpers.ts`)
- `earnPurchasePoints()` - Tích điểm mua hàng
- `earnInvestmentPoints()` - Tích điểm đầu tư
- `earnESGSponsorPoints()` - Tích điểm ESG
- `earnCarbonCreditPoints()` - Tích điểm Carbon
- `canEarnPoints()` - Kiểm tra giới hạn ngày

### 4. Component (`src/components/shared/GreenPointsBadge.tsx`)
- Badge hiển thị điểm
- Modal xem nhanh
- Responsive

### 5. Trang quản lý (`src/pages/green-points/page.tsx`)
- Dashboard tổng quan
- Lịch sử giao dịch
- Cửa hàng đổi điểm

## Portal đã tích hợp

### ✅ Consumer Portal (`farmer-consumer`)
- Badge hiển thị
- Tích điểm: Mua hàng, Quét QR, Đánh giá, Giới thiệu

### ✅ Farmer Portal
- **Dashboard** (`farmer-dashboard`): Badge hiển thị
- **Diary** (`farmer-diary`): Tích điểm ghi nhật ký, upload ảnh
- **Wallet** (`farmer-wallet`): Badge hiển thị

### ✅ Admin Portal
- **TopBar Component**: Badge hiển thị trên tất cả trang admin
- Tích điểm: Phê duyệt xã viên, Quản lý kho, Báo cáo tài chính

### ✅ Enterprise Portal
- **Procurement** (`enterprise-procurement`): Badge hiển thị, tích điểm đặt hàng

### ✅ Investor Portal
- **TopBar Component**: Badge hiển thị
- Tích điểm: Đầu tư, Đầu tư ESG, Giới thiệu

### ✅ Expert Portal
- **TopBar Component**: Badge hiển thị
- Tích điểm: Tạo SOP, Chẩn đoán, Đánh giá chất lượng

## Cách sử dụng

### Tích điểm cơ bản
```typescript
import { earnPoints } from '../../lib/greenPoints/service';

await earnPoints(
  userId,
  'Mô tả hoạt động',
  points,
  'category',
  'portal-name',
  { metadata }
);
```

### Tích điểm mua hàng
```typescript
import { earnPurchasePoints } from '../../lib/greenPoints/service';

await earnPurchasePoints(userId, 100000, false, 'farmer-consumer');
// 100k VNĐ = 10 điểm (hoặc 20 điểm nếu hữu cơ)
```

### Tích điểm đầu tư
```typescript
import { earnInvestmentPoints } from '../../lib/greenPoints/service';

await earnInvestmentPoints(userId, 10000000, false, true, 'investor-portal');
// 10 triệu VNĐ ESG = 20 điểm
```

### Hiển thị Badge
```tsx
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';

<GreenPointsBadge className="hidden sm:flex" />
```

## Hoạt động tích điểm theo Portal

### Consumer
- Mua sản phẩm: 1 điểm / 10k VNĐ
- Mua hữu cơ: 2 điểm / 10k VNĐ
- Quét QR: 5 điểm/lần (max 10/ngày)
- Đánh giá: 10 điểm
- Giới thiệu: 50 điểm

### Farmer
- Ghi nhật ký: 5 điểm/lần
- Upload ảnh: 3 điểm/ảnh (max 10/ngày)
- Hoàn thành SOP: 10 điểm/nhiệm vụ
- Tuân thủ 100%: 50 điểm/tháng
- Thu hoạch đúng chuẩn: 20 điểm/lô
- Số hóa đất: 100 điểm/ha
- Cập nhật GIS: 10 điểm/lần
- Báo cáo sâu bệnh: 15 điểm
- Đào tạo: 30 điểm/khóa

### Admin
- Phê duyệt xã viên: 20 điểm/xã viên
- Kiểm kê kho: 10 điểm/lần
- Báo cáo tài chính: 50 điểm/tháng
- Chứng nhận chất lượng: 200 điểm
- Kết nạp HTX mới: 500 điểm/HTX

### Enterprise
- Đặt hàng: 1 điểm / 100k VNĐ
- Thanh toán đúng hạn: 10 điểm
- Đánh giá chất lượng: 20 điểm
- Tài trợ ESG: 5 điểm / 100k VNĐ
- Tài trợ giống: 100 điểm / 1000 cây
- Carbon Credit: 2 điểm / 1 tấn CO2

### Investor
- Đầu tư: 1 điểm / 1 triệu VNĐ
- Đầu tư dài hạn: +50 điểm
- Giới thiệu: 200 điểm
- Đầu tư ESG: 2 điểm / 1 triệu VNĐ

### Expert
- Tạo SOP: 50 điểm
- Chẩn đoán: 10 điểm
- Đánh giá chất lượng: 15 điểm
- Xuất bản nghiên cứu: 200 điểm
- Workshop: 100 điểm
- Đào tạo nông dân: 30 điểm/người

## Cấp độ thành viên

- **Bronze**: 0 - 999 điểm
- **Silver**: 1,000 - 4,999 điểm
- **Gold**: 5,000 - 19,999 điểm
- **Platinum**: 20,000 - 99,999 điểm
- **Diamond**: 100,000+ điểm

## Đổi điểm

### Quyền lợi tài chính
- Giảm giá: 100 điểm = 10k VNĐ
- Giảm phí: 50 điểm = 1% phí
- Rút tiền: 100 điểm = 5k VNĐ

### Quyền lợi dịch vụ
- Ưu tiên hỗ trợ: 200 điểm
- Miễn phí vận chuyển: 100 điểm
- Tư vấn chuyên gia: 300 điểm
- Workshop: 500 điểm

### Đóng góp môi trường
- Trồng cây: 50 điểm = 1 cây
- Bảo vệ rừng: 100 điểm = 10m²
- Carbon offset: 200 điểm = 1 tấn CO2

## Lưu trữ

- **Supabase**: Nếu có table `green_points` và `green_point_transactions`
- **localStorage**: Fallback nếu chưa có Supabase

## Database Schema (Supabase)

```sql
-- Table: green_points
CREATE TABLE green_points (
  user_id TEXT PRIMARY KEY,
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
  top_activity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: green_point_transactions
CREATE TABLE green_point_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL, -- 'earn' | 'redeem' | 'expire' | 'adjust'
  points INTEGER NOT NULL,
  activity TEXT NOT NULL,
  category TEXT,
  portal TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'completed',
  metadata JSONB
);

CREATE INDEX idx_green_points_user ON green_point_transactions(user_id);
CREATE INDEX idx_green_points_timestamp ON green_point_transactions(timestamp DESC);
```

## Roadmap

- [x] Core system (types, service, component)
- [x] Trang quản lý Green Points
- [x] Tích hợp Consumer Portal
- [x] Tích hợp Farmer Portal
- [x] Tích hợp Admin Portal
- [x] Tích hợp Enterprise Portal
- [x] Tích hợp Investor Portal
- [x] Tích hợp Expert Portal
- [ ] Tích hợp Creator Portal
- [ ] Tích hợp Gov Portal
- [ ] Leaderboard
- [ ] Gamification features
- [ ] AI đề xuất quyền lợi
