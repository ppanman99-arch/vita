# Script để Generate Images cho các phần còn thiếu

## Cách sử dụng

Utility này sẽ tự động tìm và tạo ảnh cho các phần còn thiếu trong dự án.

### 1. Sử dụng trong code

```typescript
import { ImageGenerators, generateEcosystemTabImage } from '@/utils/imageGenerator';

// Ví dụ: Tạo ảnh cho ecosystem tabs
const tabs = [
  {
    id: 'forest-owner',
    title: 'Chủ Rừng & Chủ Đất',
    description: 'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động',
    benefits: ['Định giá tài sản đất minh bạch', 'Thu nhập từ cho thuê đất'],
    image: '' // Sẽ được generate tự động
  },
  // ... các tabs khác
];

// Generate images cho tất cả tabs
const generateAllTabImages = async () => {
  for (const tab of tabs) {
    if (!tab.image) {
      tab.image = await generateEcosystemTabImage(
        tab.title,
        tab.description,
        tab.benefits
      );
      console.log(`Generated image for ${tab.id}: ${tab.image}`);
    }
  }
};
```

### 2. Các vị trí cần generate images

Dựa trên codebase hiện tại, các vị trí cần images:

1. **Landing Page (`src/pages/landing/page.tsx`)**
   - Hero section background
   - Ecosystem tabs (đã có, nhưng có thể cải thiện)
   - Platform modules illustrations

2. **Home Page (`src/pages/home/page.tsx`)**
   - Portal cards (có thể cần thêm)

3. **HTX Landing Pages (`src/pages/htx-landing/`)**
   - Cooperative cover images
   - Product images
   - Tourism service images

4. **Admin Dashboards**
   - Dashboard backgrounds/illustrations
   - Module icons/illustrations

5. **Farmer Dashboards**
   - Service illustrations
   - Product images

### 3. Batch Generation Script

Tạo file `scripts/batch-generate-images.ts` (nếu cần chạy trong Node.js):

```typescript
// scripts/batch-generate-images.ts
// Script để generate images cho tất cả các phần còn thiếu

import { ImageGenerators, generateEcosystemTabImage } from '../src/utils/imageGenerator';

const missingImages = [
  {
    type: 'ecosystem-tab',
    id: 'forest-owner',
    title: 'Chủ Rừng & Chủ Đất',
    description: 'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động',
    benefits: ['Định giá tài sản đất minh bạch', 'Thu nhập từ cho thuê đất']
  },
  // ... thêm các images cần generate
];

async function generateAllImages() {
  const results = [];
  
  for (const item of missingImages) {
    try {
      let imageUrl = '';
      
      switch (item.type) {
        case 'ecosystem-tab':
          imageUrl = await generateEcosystemTabImage(
            item.title,
            item.description,
            item.benefits
          );
          break;
        case 'hero':
          imageUrl = await ImageGenerators.heroImage(item.title, item.description);
          break;
        // ... thêm các cases khác
      }
      
      results.push({
        id: item.id,
        url: imageUrl,
        status: 'success'
      });
      
      console.log(`✓ Generated: ${item.id} - ${imageUrl}`);
    } catch (error) {
      console.error(`✗ Failed: ${item.id}`, error);
      results.push({
        id: item.id,
        url: '',
        status: 'error',
        error: error.message
      });
    }
  }
  
  return results;
}

// Run script
generateAllImages().then(results => {
  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${results.filter(r => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'error').length}`);
  console.log('\nResults:', JSON.stringify(results, null, 2));
});
```

## Lưu ý

1. **Rate Limiting**: Gemini API có rate limits, không nên generate quá nhiều images cùng lúc
2. **Caching**: Images được cache trong sessionStorage để tránh generate lại
3. **Fallback**: Nếu API fail, sẽ fallback về context gốc
4. **Environment Variables**: Có thể override API key qua `.env` file

## Troubleshooting

- Nếu API key không hoạt động: Kiểm tra lại key trong `.env` hoặc `imageGenerator.config.ts`
- Nếu images không hiển thị: Kiểm tra CORS hoặc network issues
- Nếu generate quá chậm: Giảm số lượng images generate cùng lúc


