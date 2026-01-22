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

// #region agent log
// Log environment variable check at module load (only in browser)
if (typeof window !== 'undefined') {
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:19',message:'Module loaded - checking env var',data:{hasUrl:!!GOOGLE_SHEETS_WEB_APP_URL,urlLength:GOOGLE_SHEETS_WEB_APP_URL.length,envKeys:Object.keys(import.meta.env).filter(k=>k.includes('GOOGLE')||k.includes('SHEET')).join(','),isDev:import.meta.env.DEV,isProd:import.meta.env.PROD},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{});
}
// #endregion

export async function submitFeedbackToGoogleSheets(data: FeedbackData): Promise<boolean> {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:26',message:'submitFeedbackToGoogleSheets called',data:{hasUrl:!!GOOGLE_SHEETS_WEB_APP_URL,urlPreview:GOOGLE_SHEETS_WEB_APP_URL.substring(0,50),allEnvVars:Object.keys(import.meta.env).filter(k=>k.startsWith('VITE_')).join(',')},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:30',message:'URL not configured warning',data:{envVarValue:import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL||'undefined',allViteVars:Object.keys(import.meta.env).filter(k=>k.startsWith('VITE_')).join(','),isDev:import.meta.env.DEV,isProd:import.meta.env.PROD},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
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
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:27',message:'Starting feedback submission',data:{url:GOOGLE_SHEETS_WEB_APP_URL,hasUrl:!!GOOGLE_SHEETS_WEB_APP_URL,page:data.page},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Sử dụng URL-encoded form data (Google Apps Script Web App hoạt động tốt hơn với format này)
    const params = new URLSearchParams();
    params.append('timestamp', data.timestamp);
    params.append('page', data.page);
    params.append('rating', data.rating?.toString() || '');
    params.append('feedback', data.feedback);
    params.append('userAgent', data.userAgent || '');

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:35',message:'Form data prepared',data:{paramsCount:Array.from(params.entries()).length,feedbackLength:data.feedback.length},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    // Gửi request - không dùng no-cors để có thể nhận response
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:47',message:'Fetch response received',data:{status:response.status,statusText:response.statusText,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    // Thử đọc response (có thể fail nếu CORS, nhưng request vẫn được gửi)
    try {
      const result = await response.text();
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:53',message:'Response text parsed',data:{resultLength:result.length,resultPreview:result.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.log('Feedback submitted to Google Sheets. Response:', result);
    } catch (responseError) {
      // CORS error là bình thường với Google Apps Script, nhưng request vẫn được gửi
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:58',message:'CORS error (expected)',data:{error:responseError instanceof Error ? responseError.message : String(responseError)},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      console.log('Feedback submitted (CORS error expected, but request was sent)');
    }
    
    return true;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/c51fb21a-bcb4-42b8-8955-cb726530edc7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'feedbackService.ts:65',message:'Error in fetch',data:{error:error instanceof Error ? error.message : String(error),stack:error instanceof Error ? error.stack : undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    console.error('Error submitting feedback to Google Sheets:', error);
    return false;
  }
}
