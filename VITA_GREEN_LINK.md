# Hệ thống Liên kết VITA Score & Green Points

## Tổng quan

Hệ thống liên kết giữa **VITA Score** (Điểm tín nhiệm) và **Green Points** (Loyalty Points) tạo ra một cơ chế tương tác hai chiều, khuyến khích người dùng vừa tuân thủ quy trình (VITA) vừa tích cực tham gia (Green Points).

## Cơ chế Liên kết

### 1. VITA Score → Green Points (Bonus hàng tháng)

**Cách hoạt động:**
- VITA Score cao → Multiplier cao → Bonus Green Points hàng tháng
- Bonus được tính dựa trên số Green Points đã tích trong tháng

**Multiplier theo hạng VITA:**
- **Kim Cương** (950-1000): 1.5x → Bonus 50% số điểm tháng
- **Bạch Kim** (850-949): 1.3x → Bonus 30% số điểm tháng
- **Vàng** (700-849): 1.2x → Bonus 20% số điểm tháng
- **Bạc** (500-699): 1.1x → Bonus 10% số điểm tháng
- **Đồng** (0-499): 1.0x → Không có bonus

**Ví dụ:**
- Tháng này tích được 1000 Green Points
- VITA Score: 950 (Kim Cương)
- Bonus = 1000 × (1.5 - 1) = **+500 Green Points**

### 2. Green Points → VITA Score (Đổi điểm lấy đào tạo)

**Cách hoạt động:**
- Đổi Green Points để tham gia đào tạo/chứng nhận
- Hoàn thành đào tạo → Tăng VITA Score

**Bảng đổi điểm:**

#### Đào tạo
- **Basic Training**: 500 GP → +5 VITA Score
- **Advanced Training**: 1000 GP → +10 VITA Score
- **Expert Training**: 2000 GP → +20 VITA Score

#### Chứng nhận
- **VietGAP**: 1500 GP → +15 VITA Score
- **Organic**: 2000 GP → +20 VITA Score
- **GACP-WHO**: 3000 GP → +30 VITA Score

**Ví dụ:**
- Đổi 2000 Green Points → Tham gia Expert Training
- Hoàn thành → Tăng +20 VITA Score

## Quyền lợi Kết hợp

Khi đạt cả VITA Score và Green Points ở mức cao, người dùng mở khóa các quyền lợi đặc biệt:

| Quyền lợi | VITA Score | Green Points | Mô tả |
|-----------|------------|--------------|-------|
| Hỗ trợ ưu tiên | 700+ | 1,000+ | Được hỗ trợ ưu tiên khi có vấn đề |
| Hạn mức tín dụng cao | 850+ | 2,000+ | Tăng hạn mức tín dụng sản xuất |
| Truy cập độc quyền | 900+ | 5,000+ | Truy cập các dự án đầu tư độc quyền |
| Thành viên VIP | 950+ | 10,000+ | Quyền lợi VIP đặc biệt |

## Cấu trúc Code

### Types
- `src/lib/vitaScore/types.ts` - Định nghĩa types và interfaces
- `VITA_SCORE_THRESHOLDS` - Ngưỡng điểm và multiplier
- `GREEN_POINTS_TO_VITA` - Bảng đổi điểm

### Service
- `src/lib/vitaScore/linkService.ts` - Logic liên kết
  - `calculateVitaBonus()` - Tính bonus Green Points
  - `applyMonthlyVitaBonus()` - Áp dụng bonus hàng tháng
  - `exchangeGreenPointsForVita()` - Đổi GP → VITA
  - `increaseVitaScore()` / `decreaseVitaScore()` - Thay đổi VITA Score
  - `getVitaGreenLink()` - Lấy thông tin liên kết

### Components
- `src/components/shared/VitaGreenBadge.tsx` - Badge hiển thị VITA + Green
- `src/pages/vita-green-dashboard/page.tsx` - Trang dashboard tích hợp

## Cách sử dụng

### 1. Tính bonus VITA hàng tháng

```typescript
import { VitaGreenLinkService } from '../../lib/vitaScore/linkService';

// Áp dụng bonus hàng tháng (gọi vào đầu mỗi tháng)
await VitaGreenLinkService.applyMonthlyVitaBonus(userId);
```

### 2. Đổi Green Points để tăng VITA Score

```typescript
// Đổi 2000 GP để tham gia Expert Training
await VitaGreenLinkService.exchangeGreenPointsForVita(
  userId,
  2000,
  'expert'
);
// → Tăng +20 VITA Score
```

### 3. Tăng VITA Score từ hoạt động

```typescript
// Tăng VITA Score khi tuân thủ quy trình
await VitaGreenLinkService.increaseVitaScore(
  userId,
  5,
  'Tuân thủ 100% SOP trong tháng',
  'compliance'
);
```

### 4. Hiển thị badge

```tsx
import VitaGreenBadge from '../../components/shared/VitaGreenBadge';

<VitaGreenBadge userId={userId} />
```

## Database Schema (Supabase)

```sql
-- VITA Scores table
CREATE TABLE vita_scores (
  user_id TEXT PRIMARY KEY,
  score INTEGER DEFAULT 500 CHECK (score >= 0 AND score <= 1000),
  tier TEXT DEFAULT 'silver',
  previous_score INTEGER DEFAULT 500,
  vitality INTEGER DEFAULT 125,
  integrity INTEGER DEFAULT 125,
  trust INTEGER DEFAULT 125,
  account INTEGER DEFAULT 125,
  compliance_rate DECIMAL(5,2) DEFAULT 50.00,
  quality_score DECIMAL(5,2) DEFAULT 50.00,
  payment_on_time DECIMAL(5,2) DEFAULT 50.00,
  report_completeness DECIMAL(5,2) DEFAULT 50.00,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VITA Score History
CREATE TABLE vita_score_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  category TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_vita_history_user ON vita_score_history(user_id);
CREATE INDEX idx_vita_history_timestamp ON vita_score_history(timestamp DESC);

-- VITA-Green Links (optional, for tracking)
CREATE TABLE vita_green_links (
  user_id TEXT PRIMARY KEY,
  vita_bonus_multiplier DECIMAL(3,2) DEFAULT 1.0,
  monthly_vita_bonus INTEGER DEFAULT 0,
  green_points_used_for_training INTEGER DEFAULT 0,
  vita_score_from_training INTEGER DEFAULT 0,
  last_bonus_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Lưu trữ

- **Supabase**: Nếu có table `vita_scores` và `vita_score_history`
- **localStorage**: Fallback nếu chưa có Supabase

## Tích hợp vào các trang

### Member Hub
- Hiển thị VITA Score từ service
- Hiển thị VitaGreenBadge

### Farmer Wallet
- Có thể thêm link đến `/vita-green-dashboard`
- Hiển thị bonus VITA trong tháng

### Green Points Page
- Có thể thêm tab "Đổi VITA Score"
- Hiển thị các option đào tạo

## Roadmap

- [x] Core system (types, service, component)
- [x] Dashboard tích hợp
- [x] Tích hợp vào Member Hub
- [ ] Tự động apply bonus hàng tháng (cron job)
- [ ] Notification khi đạt quyền lợi mới
- [ ] Leaderboard VITA Score
- [ ] Analytics và báo cáo
