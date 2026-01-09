# Hướng dẫn Setup Gemini Imagen (Nano Banana Pro)

## ✅ Đã cập nhật code

Code đã được cập nhật để hỗ trợ Gemini Imagen trực tiếp. Hệ thống sẽ:
1. **Ưu tiên**: Sử dụng Gemini Imagen API (Nano Banana Pro)
2. **Fallback**: Tự động chuyển sang readdy.ai nếu Imagen API fail

## 🔑 Cấu hình API Key

### 1. Tạo file `.env` (đã tạo sẵn)

File `.env` đã được tạo với API key của bạn:
```env
VITE_GEMINI_API_KEY=AIzaSyBrexkvgD6VM85hp11LaTxlutO2DqKbePM
```

### 2. Kiểm tra API Key hoạt động

API key này sẽ được dùng cho cả:
- **Gemini API**: Tạo prompts (text)
- **Imagen API**: Generate images (nếu endpoint đúng)

## 🚀 Cách sử dụng

### Sử dụng trong code

```typescript
import { ImageGenerators, generateEcosystemTabImage } from '@/utils/imageGenerator';

// Tạo ảnh hero
const heroImage = await ImageGenerators.heroImage(
  'VITA Platform',
  'Hệ sinh thái kinh tế rừng dược sinh'
);

// Tạo ảnh cho ecosystem tab
const tabImage = await generateEcosystemTabImage(
  'An sinh về Sinh kế',
  'Mô hình đa tầng tán...',
  ['Bao tiêu đảm bảo', 'Thu nhập đều đặn']
);
```

### Force sử dụng Imagen

```typescript
const imageUrl = await generateImageUrl(
  'Vietnamese forest with medicinal plants',
  {
    width: 1024,
    height: 768,
    useImagen: true // Force dùng Imagen
  }
);
```

## ⚠️ Lưu ý về Imagen API

### Endpoint có thể cần điều chỉnh

Google Imagen API có thể có endpoint khác tùy vào:
- **Region**: us-central1, asia-southeast1, etc.
- **API version**: v1beta, v1, etc.
- **Authentication**: API key hoặc OAuth2

### Nếu Imagen API không hoạt động

1. **Kiểm tra endpoint**: Có thể cần dùng Vertex AI endpoint thay vì Generative AI endpoint
2. **Kiểm tra API enabled**: Đảm bảo "Generative Language API" đã được enable
3. **Kiểm tra permissions**: API key cần có quyền gọi Imagen API
4. **Fallback tự động**: Code sẽ tự động fallback về readdy.ai nếu Imagen fail

### Cập nhật endpoint nếu cần

Nếu cần dùng Vertex AI endpoint, cập nhật trong `imageGenerator.config.ts`:

```typescript
imagen: {
  apiUrl: 'https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict',
  // ...
}
```

## 🧪 Test API

### Test Gemini API (text prompts)

```typescript
import { generateImagePrompt } from '@/utils/imageGenerator';

const prompt = await generateImagePrompt(
  'Vietnamese forest with medicinal plants',
  'illustration'
);
console.log('Generated prompt:', prompt);
```

### Test Imagen API

```typescript
import { generateImageWithImagen } from '@/utils/imageGenerator';

try {
  const imageUrl = await generateImageWithImagen(
    'Vietnamese forest with medicinal plants, sustainable agriculture',
    {
      width: 1024,
      height: 768,
      aspectRatio: '16:9'
    }
  );
  console.log('Image generated:', imageUrl);
} catch (error) {
  console.error('Imagen API error:', error);
  // Sẽ fallback về readdy.ai
}
```

## 📝 Response Format

Imagen API có thể trả về:
- **Base64 image**: `data:image/png;base64,...`
- **Image URL**: URL trỏ đến image đã generate
- **Error**: Sẽ tự động fallback về readdy.ai

## 🔄 Fallback Mechanism

Code tự động fallback:
1. **Imagen API** (nếu có API key và endpoint đúng)
2. **readdy.ai** (nếu Imagen fail hoặc không có API key)

Đảm bảo app luôn có images, dù Imagen API có hoạt động hay không.

## 🎯 Next Steps

1. ✅ API key đã được cấu hình
2. ✅ Code đã được cập nhật
3. ⏳ Test Imagen API (có thể cần điều chỉnh endpoint)
4. ⏳ Generate tất cả images cần thiết

## 📚 Tài liệu tham khảo

- [Google Imagen API Docs](https://cloud.google.com/vertex-ai/docs/generative-ai/image/generate-images)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Vertex AI Imagen](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)



