import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function CreatorLoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisteredNotice, setShowRegisteredNotice] = useState(registered === 'true');

  useEffect(() => {
    if (registered === 'true') {
      setShowRegisteredNotice(true);
    }
  }, [registered]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo: Simple authentication check
    if (email && password === '1') {
      // Check if creator is verified
      const isVerified = sessionStorage.getItem('creator_verified') === 'true';
      const pendingVerification = sessionStorage.getItem('creator_pending_verification') === 'true';
      
      if (pendingVerification && !isVerified) {
        setError('Tài khoản của bạn đang chờ phê duyệt. Vui lòng kiểm tra email để theo dõi tiến trình.');
        return;
      }

      // Save session
      sessionStorage.setItem('creator_authenticated', 'true');
      sessionStorage.setItem('creator_email', email);
      sessionStorage.setItem('creator_name', 'Creator Demo'); // Mock data
      
      // Navigate to dashboard
      navigate('/creator-hub');
    } else {
      setError('Email hoặc mật khẩu không đúng. Demo: Mật khẩu = 1');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Portal Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-video-add-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA CREATOR HUB</h1>
          <p className="text-gray-600 text-sm">Cổng Đối tác Sáng tạo Nội dung</p>
        </div>

        {/* Registered Notice */}
        {showRegisteredNotice && (
          <div className="mb-5 bg-purple-50 border border-purple-200 text-purple-700 px-4 py-3 rounded-lg text-sm">
            <div className="flex items-start gap-2">
              <i className="ri-information-line text-purple-600 text-lg mt-0.5"></i>
              <div>
                <p className="font-semibold mb-1">Đăng ký thành công!</p>
                <p>Hồ sơ của bạn đang được Ban Quản lý VITA Creator Hub xem xét. Bạn sẽ nhận được email khi có kết quả phê duyệt (thường trong 3-5 ngày làm việc).</p>
                <button
                  onClick={() => setShowRegisteredNotice(false)}
                  className="mt-2 text-purple-800 underline text-xs"
                >
                  Đóng thông báo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <i className="ri-error-warning-line mr-2"></i>
            {error}
          </div>
        )}

        {/* Demo Info */}
        <div className="mb-5 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-xs text-purple-800">
            <strong>Demo:</strong> Nhập email bất kỳ và mật khẩu: <strong>1</strong>
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mb-4"
          >
            <i className="ri-login-box-line text-xl"></i>
            <span>Đăng nhập</span>
          </button>

          {/* Forgot Password */}
          <button 
            type="button"
            className="w-full text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer mb-6"
          >
            Quên mật khẩu?
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Chưa có tài khoản?
          </p>
          <button
            onClick={() => navigate('/creator-hub/register')}
            className="w-full px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-user-add-line"></i>
            Đăng ký tài khoản Creator
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t mt-6">
          <p>
            <i className="ri-information-line mr-1"></i>
            Cần hỗ trợ? Liên hệ: <span className="text-purple-600 font-medium">creator@vita.vn</span>
          </p>
        </div>
      </div>
    </div>
  );
}




