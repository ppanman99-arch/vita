/**
 * Configuration file for Image Generator
 * Tập trung quản lý API keys và settings
 */

export const IMAGE_GENERATOR_CONFIG = {
  // Gemini API Configuration (cho text prompts)
  gemini: {
    apiKey: '', // Sẽ lấy từ env, không hardcode
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    model: 'gemini-2.0-flash'
  },

  // Gemini Imagen API Configuration (cho image generation - Nano Banana Pro)
  imagen: {
    apiKey: '', // Sẽ lấy từ env
    // Imagen API endpoint - có thể dùng chung API key với Gemini
    // Option 1: Qua Generative AI API (nếu có)
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages',
    // Option 2: Qua Vertex AI (nếu cần)
    // apiUrl: 'https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict',
    model: 'imagen-3.0-generate-001',
    useNanoBananaPro: true
  },

  // Fallback: Image Generation Service (readdy.ai)
  imageService: {
    baseUrl: 'https://readdy.ai/api/search-image',
    defaultWidth: 1200,
    defaultHeight: 800,
    defaultOrientation: 'landscape' as 'landscape' | 'portrait' | 'square'
  },

  // Service selection
  preferredService: 'imagen' as 'imagen' | 'readdy', // 'imagen' cho Gemini Imagen, 'readdy' cho fallback

  // Cache settings
  cache: {
    enabled: true,
    // Cache image URLs in sessionStorage for performance
    useSessionStorage: true
  }
};

/**
 * Helper để lấy API key từ environment variables (nếu có)
 * Fallback to config file
 */
export function getGeminiApiKey(): string {
  return import.meta.env.VITE_GEMINI_API_KEY || IMAGE_GENERATOR_CONFIG.gemini.apiKey;
}

/**
 * Helper để lấy Imagen API key
 * Có thể dùng chung với Gemini API key
 */
export function getImagenApiKey(): string {
  return import.meta.env.VITE_IMAGEN_API_KEY || 
         import.meta.env.VITE_GEMINI_API_KEY || 
         IMAGE_GENERATOR_CONFIG.imagen.apiKey;
}


