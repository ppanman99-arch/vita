
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function HeroBanner() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    window.location.href = '/dashboard';
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.95) 0%, rgba(16, 185, 129, 0.85) 50%, rgba(16, 185, 129, 0.3) 100%), url('https://readdy.ai/api/search-image?query=A%20happy%20Vietnamese%20family%20standing%20together%20in%20front%20of%20a%20vast%20medicinal%20herb%20forest%20plantation%2C%20parents%20and%20children%20smiling%20warmly%2C%20lush%20green%20VITA%20forest%20stretching%20behind%20them%20with%20organized%20cultivation%20rows%2C%20bright%20sunny%20day%2C%20professional%20photography%2C%20natural%20lighting%2C%20warm%20family%20atmosphere%2C%20prosperity%20and%20health%20theme%2C%20realistic%20style%2C%20vibrant%20green%20landscape%2C%20shallow%20depth%20of%20field%2C%20high%20quality%20detailed%20image&width=1920&height=1080&seq=hero002family&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
        <div className="max-w-2xl">
          <div className="mb-6 sm:mb-8">
            <img 
              src="https://public.readdy.ai/ai/img_res/175944c8-efd8-45b7-8a21-36cb100b66fb.png" 
              alt="GreenLight Logo" 
              className="h-12 sm:h-16 md:h-20 w-auto mb-4 sm:mb-6"
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Từ Hạt mầm GreenLight đến Hệ sinh thái rừng dược sinh VITA
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 sm:mb-8 leading-relaxed">
            Chào mừng những Cộng sự tiên phong. Đã đến lúc khoản tài trợ của bạn đơm hoa kết trái thành Tài sản thực.
          </p>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-md">
                <i className="ri-shield-check-line text-xl sm:text-2xl text-white"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Bảo mật cao</div>
                <div className="text-sm text-white/80">Xác thực OTP</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-md">
                <i className="ri-time-line text-xl sm:text-2xl text-white"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Chỉ 2 phút</div>
                <div className="text-sm text-white/80">Kích hoạt nhanh chóng</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full shadow-md">
                <i className="ri-user-received-2-line text-xl sm:text-2xl text-white"></i>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Hỗ trợ User cũ</div>
                <div className="text-sm text-white/80">Khôi phục tài khoản</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowLoginModal(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Đăng nhập / Nhận Cổ phần
          </button>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </section>
  );
}
