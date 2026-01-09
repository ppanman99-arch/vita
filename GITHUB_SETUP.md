# Hướng dẫn Đẩy Dự án lên GitHub

## Bước 1: Tạo Repository trên GitHub

1. Truy cập [github.com](https://github.com) và đăng nhập
2. Click vào biểu tượng **+** ở góc trên bên phải
3. Chọn **New repository**
4. Điền thông tin:
   - **Repository name**: `vita-coop` (hoặc tên bạn muốn)
   - **Description**: "VITA COOP - Nền tảng Nông nghiệp Thông minh"
   - **Visibility**: Chọn Public hoặc Private
   - **KHÔNG** tích vào "Initialize this repository with a README" (vì đã có code)
5. Click **Create repository**

## Bước 2: Kết nối Local Repository với GitHub

Sau khi tạo repository trên GitHub, bạn sẽ thấy hướng dẫn. Chạy các lệnh sau trong terminal:

```bash
cd "/Users/anhdao/Downloads/VITA COOP"

# Thêm remote (thay YOUR_USERNAME và REPO_NAME bằng thông tin của bạn)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Hoặc nếu dùng SSH:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Đổi tên branch chính thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

## Bước 3: Commit Code (Nếu chưa commit)

Nếu bạn chưa commit code, chạy:

```bash
cd "/Users/anhdao/Downloads/VITA COOP"

# Kiểm tra các file sẽ được commit
git status

# Thêm tất cả các file (trừ những file trong .gitignore)
git add .

# Commit với message
git commit -m "Initial commit: VITA COOP platform with Supabase integration"

# Push lên GitHub
git push -u origin main
```

## Lệnh Nhanh (Copy & Paste)

Thay `YOUR_USERNAME` và `REPO_NAME` bằng thông tin của bạn:

```bash
cd "/Users/anhdao/Downloads/VITA COOP"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Xác thực GitHub

Khi push lần đầu, GitHub có thể yêu cầu xác thực:

### Cách 1: Personal Access Token (Khuyến nghị)
1. Vào GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token với quyền `repo`
3. Copy token và dùng làm password khi push

### Cách 2: GitHub CLI
```bash
gh auth login
```

### Cách 3: SSH Key
1. Tạo SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Thêm SSH key vào GitHub Settings > SSH and GPG keys
3. Dùng SSH URL: `git@github.com:USERNAME/REPO.git`

## Kiểm tra

Sau khi push thành công:
1. Refresh trang GitHub repository
2. Bạn sẽ thấy tất cả các file đã được upload
3. Kiểm tra `.env.local` **KHÔNG** có trong repository (đã được ignore)

## Lưu ý quan trọng

✅ **Đã được bảo vệ** (trong `.gitignore`):
- `.env.local` - Chứa Supabase credentials
- `node_modules/` - Dependencies
- `out/` - Build output
- `.vercel/` - Vercel config

⚠️ **Cần kiểm tra**:
- Không commit file `.env.local` vào git
- Không commit các file nhạy cảm khác

## Các lệnh Git hữu ích

```bash
# Xem trạng thái
git status

# Xem các file đã thay đổi
git diff

# Xem lịch sử commit
git log --oneline

# Thêm file cụ thể
git add filename

# Commit với message
git commit -m "Your commit message"

# Push lên GitHub
git push

# Pull code mới nhất
git pull

# Xem remote repositories
git remote -v
```

## Troubleshooting

### Lỗi: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Lỗi: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Lỗi: Authentication failed
- Kiểm tra username/password hoặc token
- Sử dụng Personal Access Token thay vì password
- Hoặc cấu hình SSH key

