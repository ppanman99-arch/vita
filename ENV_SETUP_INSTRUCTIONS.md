# Hướng dẫn cấu hình .env cho Google Sheets Feedback

## Vấn đề hiện tại

Frontend đang báo: `Google Sheets Web App URL chưa được cấu hình`

## Giải pháp

### Bước 1: Tạo hoặc mở file `.env`

File `.env` nằm ở **root của project** (cùng cấp với `package.json`).

Nếu file chưa tồn tại, tạo file mới với tên `.env`

### Bước 2: Thêm URL vào `.env`

Thêm dòng sau vào file `.env`:

```
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
```

**Lưu ý quan trọng:**
- Không có khoảng trắng trước/sau dấu `=`
- Không có dấu ngoặc kép `"` hoặc `'` quanh URL
- URL phải đầy đủ, bắt đầu với `https://`

### Bước 3: Kiểm tra file `.env`

File `.env` của bạn nên trông như thế này:

```
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
```

Nếu bạn có các biến môi trường khác (như Supabase), thêm vào các dòng riêng:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
```

### Bước 4: Restart dev server

**QUAN TRỌNG:** Sau khi thêm/sửa `.env`, bạn **PHẢI** restart dev server:

1. Dừng server hiện tại: `Ctrl+C` (hoặc `Cmd+C` trên Mac)
2. Chạy lại: `npm run dev`

### Bước 5: Kiểm tra

1. Mở browser console (F12)
2. Bạn **KHÔNG** nên thấy message: `Google Sheets Web App URL chưa được cấu hình`
3. Thử gửi feedback từ app
4. Kiểm tra Google Sheet xem có dữ liệu mới không

## Troubleshooting

### Vẫn thấy "URL chưa được cấu hình"
- ✅ Đảm bảo đã restart dev server sau khi thêm `.env`
- ✅ Kiểm tra file `.env` có đúng tên không (phải là `.env`, không phải `.env.txt`)
- ✅ Kiểm tra URL có đúng format không (bắt đầu với `https://`)
- ✅ Kiểm tra không có khoảng trắng thừa trong file

### File `.env` không được commit vào Git
- Đây là **bình thường** - file `.env` thường được gitignore để bảo mật
- Mỗi developer cần tạo file `.env` riêng của mình
- Có thể tham khảo `.env.example` (nếu có) để biết các biến cần thiết
