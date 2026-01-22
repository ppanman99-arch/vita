#!/bin/bash

# Script to copy unified platform files from VITA to nguyenmanhthuan project
# Usage: ./scripts/copy-to-nguyenmanhthuan.sh <path-to-nguyenmanhthuan-project>

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if target path is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide the path to nguyenmanhthuan project${NC}"
    echo "Usage: ./scripts/copy-to-nguyenmanhthuan.sh <path-to-nguyenmanhthuan-project>"
    exit 1
fi

TARGET_DIR="$1"
VITA_DIR="$(pwd)"

# Check if target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}Error: Target directory does not exist: $TARGET_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}Starting file copy from VITA to nguyenmanhthuan...${NC}"
echo "Source: $VITA_DIR"
echo "Target: $TARGET_DIR"
echo ""

# Create directories if they don't exist
mkdir -p "$TARGET_DIR/src/lib/users"
mkdir -p "$TARGET_DIR/src/lib/greenPoints"
mkdir -p "$TARGET_DIR/src/components/shared"

# Copy files
echo -e "${YELLOW}Copying files...${NC}"

# Unified User Service
if [ -f "$VITA_DIR/src/lib/users/unifiedUserService.ts" ]; then
    cp "$VITA_DIR/src/lib/users/unifiedUserService.ts" "$TARGET_DIR/src/lib/users/"
    echo "✓ Copied unifiedUserService.ts"
else
    echo -e "${RED}✗ unifiedUserService.ts not found${NC}"
fi

# Green Points files
if [ -f "$VITA_DIR/src/lib/greenPoints/types.ts" ]; then
    cp "$VITA_DIR/src/lib/greenPoints/types.ts" "$TARGET_DIR/src/lib/greenPoints/"
    echo "✓ Copied greenPoints/types.ts"
fi

if [ -f "$VITA_DIR/src/lib/greenPoints/service.ts" ]; then
    cp "$VITA_DIR/src/lib/greenPoints/service.ts" "$TARGET_DIR/src/lib/greenPoints/"
    echo "✓ Copied greenPoints/service.ts"
fi

if [ -f "$VITA_DIR/src/lib/greenPoints/helpers.ts" ]; then
    cp "$VITA_DIR/src/lib/greenPoints/helpers.ts" "$TARGET_DIR/src/lib/greenPoints/"
    echo "✓ Copied greenPoints/helpers.ts"
fi

if [ -f "$VITA_DIR/src/lib/greenPoints/realtimeService.ts" ]; then
    cp "$VITA_DIR/src/lib/greenPoints/realtimeService.ts" "$TARGET_DIR/src/lib/greenPoints/"
    echo "✓ Copied greenPoints/realtimeService.ts"
fi

if [ -f "$VITA_DIR/src/lib/greenPoints/index.ts" ]; then
    cp "$VITA_DIR/src/lib/greenPoints/index.ts" "$TARGET_DIR/src/lib/greenPoints/"
    echo "✓ Copied greenPoints/index.ts"
fi

# Supabase client (update version)
if [ -f "$VITA_DIR/src/lib/supabase.ts" ]; then
    cp "$VITA_DIR/src/lib/supabase.ts" "$TARGET_DIR/src/lib/"
    echo "✓ Copied supabase.ts (with channel method)"
fi

# GreenPointsBadge component (if exists)
if [ -f "$VITA_DIR/src/components/shared/GreenPointsBadge.tsx" ]; then
    cp "$VITA_DIR/src/components/shared/GreenPointsBadge.tsx" "$TARGET_DIR/src/components/shared/"
    echo "✓ Copied GreenPointsBadge.tsx"
fi

# Copy documentation
mkdir -p "$TARGET_DIR/docs"
if [ -f "$VITA_DIR/docs/CODE_MIGRATION_GUIDE.md" ]; then
    cp "$VITA_DIR/docs/CODE_MIGRATION_GUIDE.md" "$TARGET_DIR/docs/"
    echo "✓ Copied CODE_MIGRATION_GUIDE.md"
fi

if [ -f "$VITA_DIR/docs/UNIFIED_PLATFORM_MIGRATION.md" ]; then
    cp "$VITA_DIR/docs/UNIFIED_PLATFORM_MIGRATION.md" "$TARGET_DIR/docs/"
    echo "✓ Copied UNIFIED_PLATFORM_MIGRATION.md"
fi

echo ""
echo -e "${GREEN}✓ File copy completed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open nguyenmanhthuan project folder"
echo "2. Update environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)"
echo "3. Update code calls (earnPoints, redeemPoints) - see docs/CODE_MIGRATION_GUIDE.md"
echo "4. Test the application"
echo ""
echo -e "${GREEN}See NGUYENMANHTHUAN_SETUP.md for detailed instructions${NC}"
