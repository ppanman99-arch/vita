# Quick Setup - Google Sheets Feedback (Đã có URL)

Bạn đã có Web App URL, chỉ cần hoàn tất các bước sau:

## URL của bạn:
```
https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
```

## Bước 1: Cập nhật Google Apps Script

1. Mở [Google Apps Script](https://script.google.com)
2. Tìm project của bạn (hoặc mở từ Google Sheet: Extensions > Apps Script)
3. **Paste lại toàn bộ code** từ file `scripts/googleAppsScript.js`
   - Code đã có function `doGet` để fix lỗi "doGet not found"
4. Click **Save** (Ctrl+S)

## Bước 2: Update Deployment

1. Click **Deploy > Manage deployments**
2. Click icon **Edit** (bút chì) bên cạnh deployment hiện tại
3. Chọn **New version** hoặc giữ nguyên version hiện tại
4. Click **Deploy**
5. **Không cần** copy URL mới - URL vẫn giữ nguyên

## Bước 3: Test Script

1. Mở URL trong browser:
   ```
   https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
   ```
2. Bạn sẽ thấy:
   ```json
   {
     "success": true,
     "message": "Google Apps Script is working! Use POST method to submit feedback."
   }
   ```
3. Nếu thấy message này = Script đã hoạt động đúng! ✅

## Bước 4: Cấu hình .env

1. Tạo hoặc mở file `.env` trong root project
2. Thêm dòng:
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
   ```
3. **Restart dev server**:
   ```bash
   # Dừng server (Ctrl+C)
   npm run dev
   ```

## Bước 5: Test từ App

1. Mở app và click nút **Feedback** (góc dưới bên phải)
2. Điền feedback và submit
3. Kiểm tra Google Sheet - dữ liệu sẽ xuất hiện!

## Troubleshooting

### Vẫn thấy lỗi "doGet not found"
- Đảm bảo đã paste lại **toàn bộ code** từ `scripts/googleAppsScript.js`
- Code phải có cả function `doGet` và `doPost`
- Save và Update deployment lại

### Feedback không được ghi vào Sheet
- Kiểm tra Google Apps Script > Executions để xem log
- Đảm bảo `.env` có đúng URL
- Restart dev server sau khi thêm `.env`

### Không thấy sheet "Feedback"
- Script sẽ tự động tạo sheet "Feedback" khi nhận feedback đầu tiên
- Hoặc tạo sheet thủ công với tên "Feedback"
