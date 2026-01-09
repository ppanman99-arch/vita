/**
 * Example usage of Image Generator Utility
 * 
 * Đây là file ví dụ để tham khảo cách sử dụng Image Generator
 * Copy các hàm này vào component/page của bạn khi cần
 */

import { useState } from 'react';
import { ImageGenerators, generateEcosystemTabImage } from './imageGenerator';

/**
 * Ví dụ 1: Generate image cho Ecosystem Tab
 */
export async function exampleGenerateEcosystemTab() {
  const imageUrl = await generateEcosystemTabImage(
    'Chủ Rừng & Chủ Đất',
    'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động bền vững',
    [
      'Định giá tài sản đất minh bạch',
      'Thu nhập từ cho thuê đất',
      'Chia sẻ doanh thu sản phẩm',
      'Tiền môi trường (PFES + Carbon)'
    ]
  );
  
  console.log('Generated image URL:', imageUrl);
  return imageUrl;
}

/**
 * Ví dụ 2: Generate hero image cho Landing Page
 */
export async function exampleGenerateHeroImage() {
  const imageUrl = await ImageGenerators.heroImage(
    'Rừng Dược Sinh',
    'Hệ sinh thái dược liệu bền vững - Kết nối Chủ rừng, Hợp tác xã, Doanh nghiệp và Trung tâm Gen'
  );
  
  return imageUrl;
}

/**
 * Ví dụ 3: Generate image cho Portal/Dashboard
 */
export async function exampleGeneratePortalImage() {
  const imageUrl = await ImageGenerators.portalImage(
    'VITA Supply',
    [
      'Mua vật tư giá sỉ',
      'Trả chậm vụ sau',
      'Gói vật tư theo vụ',
      'Thiết bị IoT VITA Tech'
    ]
  );
  
  return imageUrl;
}

/**
 * Ví dụ 4: Generate image cho Service/Feature
 */
export async function exampleGenerateServiceImage() {
  const imageUrl = await ImageGenerators.serviceImage(
    'HTX Brand Hub',
    'Shopee Connect, Landing Page Builder, Tourism Booking, VITA POS'
  );
  
  return imageUrl;
}

/**
 * Ví dụ 5: Generate product image
 */
export async function exampleGenerateProductImage() {
  const imageUrl = await ImageGenerators.productImage(
    'Sâm Ngọc Linh',
    'Dược liệu quý hiếm'
  );
  
  return imageUrl;
}

/**
 * Ví dụ 6: Batch generate images cho nhiều tabs
 */
export async function exampleBatchGenerateTabs() {
  const tabs = [
    {
      id: 'forest-owner',
      title: 'Chủ Rừng & Chủ Đất',
      description: 'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động',
      benefits: ['Định giá tài sản đất minh bạch', 'Thu nhập từ cho thuê đất']
    },
    {
      id: 'farmer',
      title: 'Nông Dân & Cộng Sự',
      description: 'Xã viên Sản xuất - Lực lượng lao động trực tiếp canh tác dược liệu',
      benefits: ['Nhận khoán đất từ HTX', 'Hỗ trợ giống và kỹ thuật']
    },
    // ... thêm các tabs khác
  ];
  
  const results = [];
  
  for (const tab of tabs) {
    try {
      const imageUrl = await generateEcosystemTabImage(
        tab.title,
        tab.description,
        tab.benefits
      );
      
      results.push({
        id: tab.id,
        title: tab.title,
        imageUrl
      });
      
      // Delay để tránh rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate image for ${tab.id}:`, error);
    }
  }
  
  return results;
}

/**
 * Ví dụ 7: Sử dụng trong React Component với useState
 */
export function useImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  
  const generateImage = async (
    title: string,
    description: string,
    benefits?: string[]
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = benefits
        ? await generateEcosystemTabImage(title, description, benefits)
        : await ImageGenerators.serviceImage(title, description);
      
      setImageUrl(url);
      return url;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate image');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return { generateImage, imageUrl, loading, error };
}

/**
 * Ví dụ 8: Cache và reuse image URLs
 */
export class ImageCache {
  private static cache = new Map<string, string>();
  
  static async getOrGenerate(
    key: string,
    generator: () => Promise<string>
  ): Promise<string> {
    // Check cache first
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    
    // Check sessionStorage
    try {
      const cached = sessionStorage.getItem(`img_${key}`);
      if (cached) {
        this.cache.set(key, cached);
        return cached;
      }
    } catch (e) {
      // SessionStorage may be unavailable
    }
    
    // Generate new image
    const imageUrl = await generator();
    
    // Cache it
    this.cache.set(key, imageUrl);
    try {
      sessionStorage.setItem(`img_${key}`, imageUrl);
    } catch (e) {
      // SessionStorage may be full
    }
    
    return imageUrl;
  }
  
  static clear() {
    this.cache.clear();
    try {
      Object.keys(sessionStorage)
        .filter(key => key.startsWith('img_'))
        .forEach(key => sessionStorage.removeItem(key));
    } catch (e) {
      // SessionStorage may be unavailable
    }
  }
}

