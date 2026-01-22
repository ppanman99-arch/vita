# Hướng dẫn Setup Google Sheets cho Feedback

## Tổng quan

Tất cả feedback từ nút "Đóng góp ý kiến" sẽ được tự động gửi đến Google Sheet để bạn có thể xem và phân tích.

## Bước 1: Tạo Google Sheet

1. Tạo một Google Sheet mới tại [Google Sheets](https://sheets.google.com)
2. Đặt tên sheet là "Feedback" (hoặc tên bạn muốn)
3. **Lưu ý**: Bạn có thể để tên mặc định hoặc đổi tên sau

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet vừa tạo, vào **Extensions > Apps Script**
2. Xóa code mặc định và paste toàn bộ code từ file `scripts/googleAppsScript.js`
3. **Quan trọng**: 
   - Nếu bạn muốn script tự động sử dụng Sheet hiện tại, giữ nguyên `SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'`
   - Nếu bạn muốn chỉ định Sheet cụ thể, thay `YOUR_SPREADSHEET_ID_HERE` bằng ID từ URL:
     - URL có dạng: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
     - Copy phần `SPREADSHEET_ID_HERE`
4. Thay đổi `SHEET_NAME` nếu bạn đặt tên sheet khác "Feedback"
5. Click **Save** (Ctrl+S hoặc Cmd+S)

## Bước 3: Deploy Web App

1. Click **Deploy > New deployment**
2. Click icon **Select type** (bên cạnh "Web app")
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: "VITA Feedback Handler" (tùy chọn)
   - **Execute as**: **Me** (chọn tài khoản của bạn)
   - **Who has access**: **Anyone** (quan trọng!)
5. Click **Deploy**
6. **Authorize access** nếu được yêu cầu:
   - Click "Authorize access"
   - Chọn tài khoản Google của bạn
   - Click "Advanced" > "Go to [Project Name] (unsafe)" (nếu có)
   - Click "Allow"
7. **Copy Web App URL** (sẽ có dạng: `https://script.google.com/macros/s/.../exec`)
   - URL này rất quan trọng, lưu lại cẩn thận!

## Bước 4: Cấu hình Environment Variable

1. Tạo hoặc mở file `.env` trong root của project
2. Thêm dòng sau:
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Thay `YOUR_SCRIPT_ID` bằng URL bạn đã copy ở bước 3
   - **Ví dụ với URL của bạn** (đã có sẵn): 
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
   ```
4. **Restart dev server** nếu đang chạy:
   ```bash
   # Dừng server (Ctrl+C)
   npm run dev
   ```

## Bước 5: Test

### Test 1: Kiểm tra Script hoạt động
1. Mở URL Web App trong browser: 
   ```
   https://script.google.com/macros/s/AKfycbynMxXJjfXegawvnSaj-7cUlP6faGJDgBeTZIfddqtjHm7isBGEExxMLkWxGA9ihyqYKQ/exec
   ```
2. Bạn sẽ thấy message: "Google Apps Script is working! Use POST method to submit feedback."
3. Nếu thấy message này, script đã hoạt động đúng!
4. **Lưu ý**: Nếu trước đó bạn thấy lỗi "doGet not found", hãy:
   - Mở Google Apps Script Editor
   - Paste lại code từ `scripts/googleAppsScript.js` (đã có function `doGet`)
   - Save và Deploy lại (hoặc Update deployment nếu đã có)

### Test 2: Test từ ứng dụng
1. Đảm bảo đã thêm URL vào `.env`:
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. Restart dev server nếu đang chạy
3. Mở ứng dụng và click nút **Feedback** (góc dưới bên phải - icon bóng đèn)
4. Điền feedback và đánh giá (tùy chọn)
5. Click **Gửi ý kiến**
6. Kiểm tra Google Sheet - bạn sẽ thấy dữ liệu được thêm vào tự động!

### Test 3: Test trong Apps Script Editor (Optional)
1. Mở Google Apps Script Editor
2. Chọn function `testAddFeedback` từ dropdown
3. Click **Run** (▶️)
4. Authorize nếu được yêu cầu
5. Kiểm tra Google Sheet - sẽ có một dòng test data

## Cấu trúc dữ liệu trong Google Sheet

Sheet sẽ tự động tạo với các cột:
- **Timestamp**: Thời gian gửi feedback (ISO format)
- **Page**: Đường dẫn trang mà feedback được gửi từ (ví dụ: `/home`, `/login`)
- **Rating**: Đánh giá (1-5 sao, có thể để trống)
- **Feedback**: Nội dung feedback của người dùng
- **User Agent**: Thông tin trình duyệt và thiết bị

## Troubleshooting

### Feedback không được ghi vào Sheet

1. **Kiểm tra Web App URL**:
   - Mở file `.env` và kiểm tra `VITE_GOOGLE_SHEETS_WEB_APP_URL` có đúng không
   - URL phải kết thúc bằng `/exec`

2. **Kiểm tra Google Apps Script**:
   - Mở Google Apps Script Editor
   - Vào **Executions** (menu bên trái)
   - Xem có lỗi nào không

3. **Kiểm tra quyền truy cập**:
   - Đảm bảo Web App được deploy với "Who has access: Anyone"
   - Nếu đã thay đổi, cần deploy lại

4. **Kiểm tra Console**:
   - Mở Developer Tools (F12) trong browser
   - Xem tab Console có lỗi không

### Lỗi "Script function not found"

- Đảm bảo function `doPost` có trong Google Apps Script
- Save lại script và deploy lại

### Sheet không tự động tạo

- Script sẽ tự động tạo sheet "Feedback" nếu chưa có
- Nếu không tự động tạo, hãy tạo sheet thủ công với tên "Feedback"

### Không thấy dữ liệu sau khi submit

- Với `no-cors` mode, browser không thể kiểm tra response
- Nhưng dữ liệu vẫn được gửi đi
- Kiểm tra Google Sheet sau vài giây
- Kiểm tra Google Apps Script Executions để xem có log không

## Lưu ý bảo mật

- Web App URL có thể được truy cập bởi bất kỳ ai nếu họ biết URL
- Để bảo mật hơn, bạn có thể:
  1. Thêm authentication vào Google Apps Script
  2. Sử dụng Google Sheets API với OAuth
  3. Thêm rate limiting trong Google Apps Script
  4. Chỉ share URL với người cần thiết

## Cập nhật Script

Nếu bạn cần cập nhật script:
1. Sửa code trong Google Apps Script Editor
2. Click **Deploy > Manage deployments**
3. Click icon **Edit** (bút chì) bên cạnh deployment
4. Chọn version mới hoặc tạo version mới
5. Click **Deploy**

## Ví dụ dữ liệu

Sau khi setup thành công, Google Sheet sẽ có dạng:

| Timestamp | Page | Rating | Feedback | User Agent |
|-----------|------|--------|----------|------------|
| 2024-01-15T10:30:00.000Z | /home | 5 | Trang web rất đẹp và dễ sử dụng! | Mozilla/5.0... |
| 2024-01-15T11:15:00.000Z | /login | 4 | Form đăng nhập cần cải thiện | Mozilla/5.0... |
