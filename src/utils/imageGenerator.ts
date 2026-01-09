/**
 * Image Generation Utility
 * Tích hợp với Gemini API (prompts) và Gemini Imagen/Nano Banana Pro (image generation)
 */

import { getGeminiApiKey, getImagenApiKey, IMAGE_GENERATOR_CONFIG } from './imageGenerator.config';

const GEMINI_API_KEY = getGeminiApiKey();
const GEMINI_API_URL = IMAGE_GENERATOR_CONFIG.gemini.apiUrl;
const IMAGEN_API_KEY = getImagenApiKey();
const IMAGEN_API_URL = IMAGE_GENERATOR_CONFIG.imagen.apiUrl;

/**
 * Sử dụng Gemini để tạo prompt mô tả ảnh chi tiết
 */
export async function generateImagePrompt(context: string, imageType: 'hero' | 'product' | 'icon' | 'illustration' = 'illustration'): Promise<string> {
  try {
    const systemPrompt = `You are an expert at creating detailed image prompts for Vietnamese agricultural and technology platforms. 
Create a detailed, vivid description for a ${imageType} image based on the following context: ${context}

Requirements:
- Describe in English
- Include visual elements, colors, composition, lighting
- Suitable for Vietnamese agricultural/technology context
- Professional and modern aesthetic
- 50-100 words`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const prompt = data.candidates?.[0]?.content?.parts?.[0]?.text || context;
    
    return prompt.trim();
  } catch (error) {
    console.error('Error generating image prompt with Gemini:', error);
    // Fallback to context if API fails
    return context;
  }
}

/**
 * Tạo ảnh sử dụng Gemini Imagen (Nano Banana Pro)
 */
export async function generateImageWithImagen(
  prompt: string,
  options: {
    width?: number;
    height?: number;
    numberOfImages?: number;
    aspectRatio?: '1:1' | '9:16' | '16:9' | '4:3' | '3:4';
  } = {}
): Promise<string> {
  const {
    width = 1024,
    height = 1024,
    numberOfImages = 1,
    aspectRatio = '16:9'
  } = options;

  try {
    // Sử dụng Gemini Imagen API
    // Lưu ý: Endpoint có thể khác tùy vào cách Google triển khai
    const response = await fetch(IMAGEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': IMAGEN_API_KEY,
      },
      body: JSON.stringify({
        prompt: prompt,
        number_of_images: numberOfImages,
        aspect_ratio: aspectRatio,
        // Safety settings
        safety_filter_level: 'block_some',
        person_generation: 'allow_all',
        // Quality settings
        seed: Math.floor(Math.random() * 1000000),
        // Vietnamese text support
        language: 'vi'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Imagen API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // Imagen API có thể trả về base64 image hoặc URL
    if (data.generatedImages && data.generatedImages.length > 0) {
      const imageData = data.generatedImages[0];
      
      // Nếu là base64, convert thành data URL
      if (imageData.imageBase64) {
        return `data:image/png;base64,${imageData.imageBase64}`;
      }
      
      // Nếu là URL
      if (imageData.imageUrl) {
        return imageData.imageUrl;
      }

      // Nếu trả về trực tiếp base64 string
      if (typeof imageData === 'string' && imageData.startsWith('data:')) {
        return imageData;
      }
    }

    // Fallback: Nếu response format khác
    if (data.imageBase64) {
      return `data:image/png;base64,${data.imageBase64}`;
    }

    throw new Error('No image data in response');
  } catch (error) {
    console.error('Error generating image with Imagen:', error);
    throw error;
  }
}

/**
 * Tạo URL ảnh - Hỗ trợ cả Imagen và readdy.ai
 */
export async function generateImageUrl(
  context: string, 
  options: {
    width?: number;
    height?: number;
    seq?: string;
    orientation?: 'landscape' | 'portrait' | 'square';
    imageType?: 'hero' | 'product' | 'icon' | 'illustration';
    useImagen?: boolean; // Force sử dụng Imagen
  } = {}
): Promise<string> {
  const {
    width = IMAGE_GENERATOR_CONFIG.imageService.defaultWidth,
    height = IMAGE_GENERATOR_CONFIG.imageService.defaultHeight,
    seq = 'default',
    orientation = IMAGE_GENERATOR_CONFIG.imageService.defaultOrientation,
    imageType = 'illustration',
    useImagen = IMAGE_GENERATOR_CONFIG.preferredService === 'imagen'
  } = options;

  try {
    // Sử dụng Gemini để tạo prompt chi tiết
    const detailedPrompt = await generateImagePrompt(context, imageType);
    
    // Chọn service dựa trên config
    if (useImagen && IMAGEN_API_KEY) {
      try {
        // Sử dụng Gemini Imagen (Nano Banana Pro)
        const aspectRatio = orientation === 'landscape' ? '16:9' : 
                           orientation === 'portrait' ? '9:16' : '1:1';
        
        const imageUrl = await generateImageWithImagen(detailedPrompt, {
          width,
          height,
          aspectRatio: aspectRatio as any,
          numberOfImages: 1
        });

        // Cache image URL
        if (IMAGE_GENERATOR_CONFIG.cache.enabled && IMAGE_GENERATOR_CONFIG.cache.useSessionStorage) {
          const cacheKey = `img_${seq}_${context.substring(0, 50).replace(/\s+/g, '_')}`;
          try {
            sessionStorage.setItem(cacheKey, imageUrl);
          } catch (e) {
            console.warn('Failed to cache image URL:', e);
          }
        }

        return imageUrl;
      } catch (imagenError) {
        console.warn('Imagen API failed, falling back to readdy.ai:', imagenError);
        // Fall through to readdy.ai fallback
      }
    }
    
    // Fallback: Sử dụng readdy.ai
    const encodedPrompt = encodeURIComponent(detailedPrompt);
    const imageUrl = `${IMAGE_GENERATOR_CONFIG.imageService.baseUrl}?query=${encodedPrompt}&width=${width}&height=${height}&seq=${seq}&orientation=${orientation}`;
    
    // Cache
    if (IMAGE_GENERATOR_CONFIG.cache.enabled && IMAGE_GENERATOR_CONFIG.cache.useSessionStorage) {
      const cacheKey = `img_${seq}_${context.substring(0, 50).replace(/\s+/g, '_')}`;
      try {
        sessionStorage.setItem(cacheKey, imageUrl);
      } catch (e) {
        console.warn('Failed to cache image URL:', e);
      }
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Error generating image URL:', error);
    
    // Final fallback to readdy.ai
    const fallbackPrompt = encodeURIComponent(context);
    return `${IMAGE_GENERATOR_CONFIG.imageService.baseUrl}?query=${fallbackPrompt}&width=${width}&height=${height}&seq=${seq}&orientation=${orientation}`;
  }
}

/**
 * Tạo ảnh cho các use case phổ biến
 */
export const ImageGenerators = {
  /**
   * Tạo ảnh hero cho landing page
   */
  async heroImage(title: string, description: string): Promise<string> {
    const context = `${title}. ${description}. Vietnamese agricultural landscape, lush green forest, medicinal plants, sustainable farming, modern technology integration, professional photography, natural lighting, vibrant colors`;
    return generateImageUrl(context, {
      width: 1920,
      height: 1080,
      orientation: 'landscape',
      imageType: 'hero'
    });
  },

  /**
   * Tạo ảnh sản phẩm
   */
  async productImage(productName: string, category: string): Promise<string> {
    const context = `${productName} - ${category}. Vietnamese medicinal herb, high quality product photography, clean white background, professional lighting, natural product, traditional medicine`;
    return generateImageUrl(context, {
      width: 800,
      height: 800,
      orientation: 'square',
      imageType: 'product'
    });
  },

  /**
   * Tạo illustration cho ecosystem
   */
  async ecosystemIllustration(description: string): Promise<string> {
    const context = `${description}. Digital ecosystem illustration, interconnected panels, modern design, blue green orange purple colors, professional infographic style, clean and vibrant`;
    return generateImageUrl(context, {
      width: 1200,
      height: 800,
      orientation: 'landscape',
      imageType: 'illustration'
    });
  },

  /**
   * Tạo ảnh cho dashboard/portal
   */
  async portalImage(portalName: string, features: string[]): Promise<string> {
    const context = `${portalName} dashboard interface. Features: ${features.join(', ')}. Modern web interface, Vietnamese agricultural technology platform, professional UI/UX design, clean layout, data visualization`;
    return generateImageUrl(context, {
      width: 1200,
      height: 800,
      orientation: 'landscape',
      imageType: 'illustration'
    });
  },

  /**
   * Tạo ảnh cho service/feature
   */
  async serviceImage(serviceName: string, useCase: string): Promise<string> {
    const context = `${serviceName}. ${useCase}. Vietnamese agricultural service, modern technology, professional service delivery, user-friendly interface, sustainable agriculture context`;
    return generateImageUrl(context, {
      width: 800,
      height: 600,
      orientation: 'landscape',
      imageType: 'illustration'
    });
  }
};

/**
 * Helper function để tạo ảnh nhanh cho các tabs trong Ecosystem
 */
export async function generateEcosystemTabImage(
  title: string,
  description: string,
  benefits: string[]
): Promise<string> {
  const context = `${title}. ${description}. Key benefits: ${benefits.join(', ')}. Vietnamese agricultural platform, sustainable farming, modern technology integration, professional illustration, clean design`;
  
  return generateImageUrl(context, {
    width: 1200,
    height: 800,
    seq: title.toLowerCase().replace(/\s+/g, '-'),
    orientation: 'landscape',
    imageType: 'illustration'
  });
}

