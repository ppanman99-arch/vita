
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function LoginSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    window.location.href = '/dashboard';
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-emerald-600 rounded-full mx-auto mb-6">
            <i className="ri-login-circle-line text-4xl text-white"></i>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sẵn sàng tham gia hệ sinh thái VITA?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Đăng nhập để truy cập vào nền tảng và khám phá các cơ hội đầu tư bền vững
          </p>

          <div className="flex flex-wrap gap-6 justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                <i className="ri-shield-check-line text-2xl text-emerald-600"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Bảo mật cao</div>
                <div className="text-sm text-gray-600">Xác thực OTP</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                <i className="ri-time-line text-2xl text-emerald-600"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Chỉ 2 phút</div>
                <div className="text-sm text-gray-600">Kích hoạt nhanh chóng</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                <i className="ri-user-received-2-line text-2xl text-emerald-600"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Hỗ trợ User cũ</div>
                <div className="text-sm text-gray-600">Khôi phục tài khoản</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            Đăng nhập / Nhận Cổ phần
          </button>
        </div>
      </section>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
