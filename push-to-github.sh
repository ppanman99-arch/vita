#!/bin/bash

# Script để push dự án VITA COOP lên GitHub
# Sử dụng: ./push-to-github.sh YOUR_USERNAME REPO_NAME

set -e

# Màu sắc cho output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Chuẩn bị push dự án VITA COOP lên GitHub...${NC}\n"

# Kiểm tra tham số
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${RED}❌ Thiếu tham số!${NC}"
    echo -e "${YELLOW}Cách sử dụng:${NC}"
    echo "  ./push-to-github.sh YOUR_USERNAME REPO_NAME"
    echo ""
    echo "Ví dụ:"
    echo "  ./push-to-github.sh anhdao vita-coop"
    echo ""
    echo "Hoặc chạy từng lệnh thủ công:"
    echo "  1. git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
    echo "  2. git branch -M main"
    echo "  3. git push -u origin main"
    exit 1
fi

USERNAME=$1
REPO_NAME=$2
GITHUB_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo -e "${YELLOW}📋 Thông tin:${NC}"
echo "  Username: ${USERNAME}"
echo "  Repository: ${REPO_NAME}"
echo "  URL: ${GITHUB_URL}"
echo ""

# Kiểm tra xem đã có remote chưa
if git remote get-url origin &>/dev/null; then
    CURRENT_REMOTE=$(git remote get-url origin)
    echo -e "${YELLOW}⚠️  Đã có remote 'origin': ${CURRENT_REMOTE}${NC}"
    read -p "Bạn có muốn thay thế? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo -e "${GREEN}✅ Đã xóa remote cũ${NC}"
    else
        echo -e "${RED}❌ Hủy bỏ${NC}"
        exit 1
    fi
fi

# Thêm remote
echo -e "${GREEN}➕ Thêm remote GitHub...${NC}"
git remote add origin "${GITHUB_URL}"

# Đổi tên branch thành main
echo -e "${GREEN}🔄 Đổi tên branch thành main...${NC}"
git branch -M main

# Kiểm tra xem có commit chưa
if ! git rev-parse --verify HEAD &>/dev/null; then
    echo -e "${YELLOW}⚠️  Chưa có commit nào. Đang tạo commit đầu tiên...${NC}"
    git add .
    git commit -m "Initial commit: VITA COOP platform"
fi

# Push lên GitHub
echo -e "${GREEN}📤 Đang push lên GitHub...${NC}"
echo -e "${YELLOW}💡 Nếu được hỏi xác thực, sử dụng Personal Access Token thay vì password${NC}"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ Thành công! Dự án đã được push lên GitHub${NC}"
    echo -e "${GREEN}🔗 Xem tại: https://github.com/${USERNAME}/${REPO_NAME}${NC}"
else
    echo ""
    echo -e "${RED}❌ Lỗi khi push. Kiểm tra lại:${NC}"
    echo "  1. Repository đã được tạo trên GitHub chưa?"
    echo "  2. Bạn có quyền truy cập repository không?"
    echo "  3. Đã xác thực GitHub chưa? (Personal Access Token hoặc SSH)"
    exit 1
fi

