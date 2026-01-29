/**
 * Service để gửi feedback đến Google Sheets
 * 
 * Setup Instructions:
 * 1. Tạo Google Sheet mới
 * 2. Tạo Google Apps Script với code trong file googleAppsScript.js
 * 3. Deploy as Web App và lấy URL
 * 4. Thêm URL vào .env: VITE_GOOGLE_SHEETS_WEB_APP_URL
 */

interface FeedbackData {
  page: string;
  feedback: string;
  rating?: number;
  timestamp: string;
  userAgent?: string;
}

const GOOGLE_SHEETS_WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL || '';

export async function submitFeedbackToGoogleSheets(data: FeedbackData): Promise<boolean> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    // Only show warning in development to avoid console noise in production
    if (import.meta.env.DEV) {
      console.warn(
        'Google Sheets Web App URL chưa được cấu hình. Vui lòng thêm VITE_GOOGLE_SHEETS_WEB_APP_URL vào .env (local) hoặc Vercel Environment Variables (production).'
      );
    } else {
      // In production, log a more helpful message
      console.error(
        '⚠️ Google Sheets feedback không hoạt động: VITE_GOOGLE_SHEETS_WEB_APP_URL chưa được cấu hình trên Vercel. Vui lòng thêm biến môi trường trong Vercel Dashboard > Settings > Environment Variables và redeploy.'
      );
    }
    return false;
  }

  try {
    // Sử dụng URL-encoded form data (Google Apps Script Web App hoạt động tốt hơn với format này)
    const params = new URLSearchParams();
    params.append('timestamp', data.timestamp);
    params.append('page', data.page);
    params.append('rating', data.rating?.toString() || '');
    params.append('feedback', data.feedback);
    params.append('userAgent', data.userAgent || '');

    // Gửi request - không dùng no-cors để có thể nhận response
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    // Thử đọc response (có thể fail nếu CORS, nhưng request vẫn được gửi)
    try {
      const result = await response.text();
      console.log('Feedback submitted to Google Sheets. Response:', result);
    } catch (responseError) {
      // CORS error là bình thường với Google Apps Script, nhưng request vẫn được gửi
      console.log('Feedback submitted (CORS error expected, but request was sent)');
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting feedback to Google Sheets:', error);
    return false;
  }
}
