# Hướng dẫn Setup Tính năng Đóng góp ý kiến

## Tổng quan

Tính năng đóng góp ý kiến cho phép người dùng gửi phản hồi về từng trang trong ứng dụng. Component `FeedbackButton` sẽ tự động hiển thị trên mọi trang và lưu feedback theo từng trang cụ thể.

## Cách hoạt động

1. **Floating Button**: Một nút nổi ở góc dưới bên phải màn hình
2. **Modal Form**: Khi click, mở form để nhập:
   - Đánh giá (1-5 sao) - tùy chọn
   - Ý kiến/Phản hồi - bắt buộc
3. **Lưu trữ**: Feedback được lưu vào:
   - **Supabase** (nếu có table `feedback`)
   - **localStorage** (nếu Supabase chưa được cấu hình)

## Setup Supabase (Tùy chọn)

Nếu muốn lưu feedback vào Supabase, tạo table với SQL sau:

```sql
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  feedback TEXT NOT NULL,
  rating INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để query theo trang
CREATE INDEX idx_feedback_page ON feedback(page);
CREATE INDEX idx_feedback_timestamp ON feedback(timestamp DESC);

-- Cho phép public insert (hoặc setup RLS phù hợp)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON feedback
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## Xem Feedback

### Từ localStorage (Development)

Mở Console trong trình duyệt và chạy:

```javascript
// Xem tất cả feedback
const feedback = JSON.parse(localStorage.getItem('vita_feedback') || '[]');
console.table(feedback);

// Xem feedback theo trang
const pageFeedback = feedback.filter(f => f.page === '/farmer/dashboard');
console.table(pageFeedback);

// Export feedback
const dataStr = JSON.stringify(feedback, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'feedback.json';
link.click();
```

### Từ Supabase

Truy cập Supabase Dashboard > Table Editor > `feedback` để xem tất cả feedback.

Hoặc query bằng SQL:

```sql
-- Xem tất cả feedback
SELECT * FROM feedback ORDER BY timestamp DESC;

-- Xem feedback theo trang
SELECT * FROM feedback WHERE page = '/farmer/dashboard' ORDER BY timestamp DESC;

-- Thống kê feedback theo trang
SELECT 
  page,
  COUNT(*) as total_feedback,
  AVG(rating) as avg_rating,
  COUNT(CASE WHEN rating >= 4 THEN 1 END) as positive_count
FROM feedback
GROUP BY page
ORDER BY total_feedback DESC;
```

## Cấu trúc dữ liệu

```typescript
interface FeedbackData {
  page: string;           // Đường dẫn trang (ví dụ: '/farmer/dashboard')
  feedback: string;       // Nội dung phản hồi
  rating?: number;        // Đánh giá 1-5 sao (tùy chọn)
  timestamp: string;      // ISO timestamp
  userAgent?: string;     // User agent của trình duyệt
}
```

## Tùy chỉnh

### Ẩn trên một số trang

Nếu muốn ẩn feedback button trên một số trang cụ thể, có thể thêm prop `excludedPaths`:

```tsx
// Trong FeedbackButton.tsx
const excludedPaths = ['/admin', '/login'];
if (excludedPaths.some(path => location.pathname.startsWith(path))) {
  return null;
}
```

### Thay đổi vị trí button

Sửa class CSS trong `FeedbackButton.tsx`:

```tsx
// Góc dưới bên phải (mặc định)
className="fixed bottom-6 right-6 ..."

// Góc dưới bên trái
className="fixed bottom-6 left-6 ..."

// Góc trên bên phải
className="fixed top-6 right-6 ..."
```

## Lưu ý

- Feedback được tự động reset khi chuyển trang
- Nếu Supabase chưa có table `feedback`, feedback sẽ được lưu vào localStorage
- Feedback trong localStorage có thể bị xóa khi user clear browser data
- Nên export feedback từ localStorage định kỳ để backup
