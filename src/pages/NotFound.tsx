import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md w-full">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <i className="ri-error-warning-line text-white text-6xl"></i>
          </div>
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Trang không tìm thấy</h2>
          <p className="text-gray-600 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Các trang phổ biến:</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-left flex items-center justify-between"
            >
              <span>Trang chủ</span>
              <i className="ri-home-line"></i>
            </button>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-left flex items-center justify-between"
            >
              <span>Trang chọn vai trò</span>
              <i className="ri-apps-line"></i>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-left flex items-center justify-between"
            >
              <span>Đăng nhập</span>
              <i className="ri-login-box-line"></i>
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all font-semibold flex items-center justify-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>
          Quay lại trang trước
        </button>
      </div>
    </div>
  );
}