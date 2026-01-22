/**
 * Google Apps Script để nhận feedback và ghi vào Google Sheet
 * 
 * Hướng dẫn setup:
 * 1. Mở Google Sheet mới
 * 2. Vào Extensions > Apps Script
 * 3. Dán code này vào
 * 4. Thay đổi SPREADSHEET_ID và SHEET_NAME nếu cần
 * 5. Save và Deploy > New deployment > Web app
 * 6. Set Execute as: Me, Who has access: Anyone
 * 7. Copy Web App URL và thêm vào .env: VITE_GOOGLE_SHEETS_WEB_APP_URL
 */

// Cấu hình Google Sheet
// Option 1: Sử dụng Spreadsheet ID cụ thể (khuyến nghị)
// Lấy ID từ URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Thay bằng ID của bạn

// Option 2: Để trống để sử dụng Spreadsheet hiện tại (nếu script được tạo từ trong Sheet)
// const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

const SHEET_NAME = 'Feedback'; // Tên sheet để lưu feedback

function doPost(e) {
  try {
    // Log để debug - kiểm tra nếu e không tồn tại
    if (typeof e === 'undefined' || e === null) {
      Logger.log('CRITICAL: doPost called but event object (e) is undefined or null');
      Logger.log('This should not happen with proper Web App deployment');
      Logger.log('Checking if function is being called directly...');
      
      // Nếu e không tồn tại, tạo một object rỗng để tránh crash
      // Nhưng điều này không nên xảy ra với Web App deployment đúng cách
      e = e || {};
    }
    
    Logger.log('doPost called. e type: ' + typeof e);
    Logger.log('e keys: ' + (e ? Object.keys(e).join(', ') : 'none'));
    Logger.log('e.parameter exists: ' + !!(e && e.parameter));
    Logger.log('e.postData exists: ' + !!(e && e.postData));
    
    // Kiểm tra event object có tồn tại không
    if (!e || typeof e !== 'object') {
      Logger.log('Error: Event object (e) is undefined, null, or not an object');
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Event object is missing or invalid',
        received: typeof e,
        note: 'Please ensure Web App is deployed correctly and called via HTTP POST'
      }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Lấy Spreadsheet - nếu SPREADSHEET_ID là 'YOUR_SPREADSHEET_ID_HERE', sử dụng active spreadsheet
    let ss;
    try {
      if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      } else {
        ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      }
    } catch (ssError) {
      Logger.log('Error accessing spreadsheet: ' + ssError.toString());
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error accessing spreadsheet: ' + ssError.toString()
      }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Nếu sheet chưa tồn tại, tạo mới
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Thêm headers
      sheet.appendRow(['Timestamp', 'Page', 'Rating', 'Feedback', 'User Agent']);
    }
    
    // Parse request data từ FormData hoặc JSON
    let data;
    
    // Kiểm tra URL-encoded form data (từ URLSearchParams) - e.parameter chứa form data
    // Google Apps Script Web App nhận URL-encoded data trong e.parameter
    // Lưu ý: e.parameter có thể là object hoặc null/undefined
    if (e.parameter && typeof e.parameter === 'object' && Object.keys(e.parameter).length > 0) {
      Logger.log('Using URL-encoded form data format. e.parameter keys: ' + Object.keys(e.parameter).join(', '));
      // URL-encoded form data format (application/x-www-form-urlencoded)
      data = {
        timestamp: e.parameter.timestamp || new Date().toISOString(),
        page: e.parameter.page || '',
        rating: e.parameter.rating || '',
        feedback: e.parameter.feedback || '',
        userAgent: e.parameter.userAgent || ''
      };
      Logger.log('Parsed data: timestamp=' + data.timestamp + ', page=' + data.page + ', feedback length=' + data.feedback.length);
    }
    // Thử parse từ e.parameter trực tiếp (nếu là string hoặc có structure khác)
    else if (e.parameter) {
      Logger.log('e.parameter exists but format is different. Type: ' + typeof e.parameter + ', Value: ' + JSON.stringify(e.parameter));
      // Thử extract data từ e.parameter
      data = {
        timestamp: (e.parameter.timestamp || e.parameter['timestamp']) || new Date().toISOString(),
        page: (e.parameter.page || e.parameter['page']) || '',
        rating: (e.parameter.rating || e.parameter['rating']) || '',
        feedback: (e.parameter.feedback || e.parameter['feedback']) || '',
        userAgent: (e.parameter.userAgent || e.parameter['userAgent']) || ''
      };
    } 
    // Kiểm tra JSON (từ JSON.stringify) - e.postData.contents chứa JSON
    else if (e.postData && e.postData.contents) {
      Logger.log('Using JSON format. postData.contents length: ' + e.postData.contents.length);
      try {
        const requestData = JSON.parse(e.postData.contents);
        if (requestData.action === 'addFeedback' && requestData.data) {
          data = requestData.data;
        } else {
          data = requestData;
        }
      } catch (parseError) {
        Logger.log('JSON parse error: ' + parseError.toString());
        // Fallback: sử dụng raw data
        data = {
          timestamp: new Date().toISOString(),
          page: '',
          rating: '',
          feedback: e.postData.contents || '',
          userAgent: ''
        };
      }
    } 
    // Fallback: không có data
    else {
      Logger.log('No data received. e type: ' + typeof e);
      Logger.log('e.parameter: ' + (e.parameter ? JSON.stringify(e.parameter) : 'null/undefined'));
      Logger.log('e.postData: ' + (e.postData ? JSON.stringify(e.postData) : 'null/undefined'));
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'No data received. Please check request format.',
        debug: {
          hasEvent: !!e,
          eventType: typeof e,
          hasParameter: !!(e && e.parameter),
          parameterType: e && e.parameter ? typeof e.parameter : 'null',
          hasPostData: !!(e && e.postData),
          postDataType: e && e.postData ? typeof e.postData : 'null'
        }
      }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Thêm headers nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Page', 'Rating', 'Feedback', 'User Agent']);
    }
    
    // Thêm dữ liệu feedback
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.page || '',
      data.rating || '',
      data.feedback || '',
      data.userAgent || ''
    ]);
    
    Logger.log('Feedback added: ' + JSON.stringify(data));
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'Feedback added successfully' 
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function để test với GET request (khi truy cập URL trực tiếp)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    success: true, 
    message: 'Google Apps Script is working! Use POST method to submit feedback.',
    instructions: 'This script accepts POST requests with feedback data. Use the FeedbackButton in the app to submit feedback.'
  }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function để test trong Apps Script Editor (optional)
function testAddFeedback() {
  const testData = {
    action: 'addFeedback',
    data: {
      timestamp: new Date().toISOString(),
      page: '/test',
      rating: 5,
      feedback: 'Test feedback from Apps Script',
      userAgent: 'Google Apps Script Test'
    }
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
