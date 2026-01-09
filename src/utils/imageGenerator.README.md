# Image Generator Utility

Utility để tự động tạo ảnh cho dự án VITA COOP sử dụng Gemini API và các image generation services.

## Lưu ý quan trọng

⚠️ **Gemini API không tạo ảnh trực tiếp** - Nó chỉ tạo text (prompts mô tả ảnh). 
Utility này sử dụng Gemini để tạo prompts chi tiết, sau đó dùng các image generation services khác (như readdy.ai) để tạo ảnh.

## Cách sử dụng

### 1. Cấu hình API Key (Tùy chọn)

Tạo file `.env` ở root directory:

```env
VITE_GEMINI_API_KEY=AIzaSyBrexkvgD6VM85hp11LaTxlutO2DqKbePM
```

Hoặc API key đã được cấu hình sẵn trong `imageGenerator.config.ts`.

### 2. Import và sử dụng

```typescript
import { ImageGenerators, generateEcosystemTabImage } from '@/utils/imageGenerator';

// Tạo ảnh hero cho landing page
const heroImageUrl = await ImageGenerators.heroImage(
  'Rừng Dược Sinh',
  'Hệ sinh thái dược liệu bền vững'
);

// Tạo ảnh cho ecosystem tab
const tabImageUrl = await generateEcosystemTabImage(
  'Chủ Rừng & Chủ Đất',
  'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động',
  ['Định giá tài sản đất minh bạch', 'Thu nhập từ cho thuê đất']
);

// Tạo ảnh cho service/feature
const serviceImageUrl = await ImageGenerators.serviceImage(
  'VITA Supply',
  'Mua vật tư giá sỉ, trả chậm vụ sau'
);
```

### 3. Các hàm có sẵn

- `ImageGenerators.heroImage(title, description)` - Tạo ảnh hero
- `ImageGenerators.productImage(productName, category)` - Tạo ảnh sản phẩm
- `ImageGenerators.ecosystemIllustration(description)` - Tạo illustration ecosystem
- `ImageGenerators.portalImage(portalName, features)` - Tạo ảnh portal/dashboard
- `ImageGenerators.serviceImage(serviceName, useCase)` - Tạo ảnh service/feature
- `generateEcosystemTabImage(title, description, benefits)` - Tạo ảnh cho ecosystem tab

## Workflow

1. **Gemini API** tạo prompt mô tả chi tiết dựa trên context
2. **Image Generation Service** (readdy.ai) sử dụng prompt để tạo ảnh
3. URL ảnh được trả về và có thể cache trong sessionStorage

## Mở rộng

Để thêm image generation service khác (ví dụ: Google Imagen, DALL-E), cập nhật hàm `generateImageUrl` trong `imageGenerator.ts`.

## Troubleshooting

- Nếu Gemini API fail, sẽ fallback về context gốc
- Images được cache trong sessionStorage để tăng performance
- Có thể disable cache trong config nếu cần


