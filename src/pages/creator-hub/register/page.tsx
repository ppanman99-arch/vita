import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function CreatorRegisterPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneContinue = () => {
    if (!phone.match(/^[0-9]{10}$/)) {
      setError('Vui lòng nhập đúng số điện thoại 10 số!');
      return;
    }
    setError('');
    // Simulate OTP sending
    setShowOtp(true);
    alert(`Mã OTP 6 số đã được gửi đến ${phone}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Mã OTP phải có 6 số!');
      return;
    }
    // Save registration data
    localStorage.setItem('creator_phone', phone);
    sessionStorage.setItem('creator_registered_phone', phone);
    setShowSuccessModal(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Vui lòng nhập email hợp lệ!');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Save registration data
    localStorage.setItem('creator_email', email);
    localStorage.setItem('creator_password', password);
    sessionStorage.setItem('creator_registered_email', email);
    sessionStorage.setItem('creator_verified', 'true');
    setShowSuccessModal(true);
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'zalo') => {
    // Simulate social login
    alert(`Đang đăng nhập bằng ${provider}...`);
    // In real app, redirect to OAuth provider
    // After successful OAuth, save data and navigate
    sessionStorage.setItem('creator_verified', 'true');
    sessionStorage.setItem('creator_social_login', provider);
    setShowSuccessModal(true);
  };

  const handleContinueToLogin = () => {
    setShowSuccessModal(false);
    navigate('/creator-hub/login?registered=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Portal Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-video-add-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA CREATOR HUB</h1>
          <p className="text-gray-600">Cổng Đối tác Sáng tạo Nội dung & Tiếp thị Liên kết</p>
        </div>

        {/* Method Toggle */}
        <div className="bg-gray-100 rounded-xl p-1 mb-6 flex gap-2">
          <button
            onClick={() => {
              setLoginMethod('phone');
              setShowOtp(false);
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
              loginMethod === 'phone'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="ri-phone-line mr-2"></i>
            Số điện thoại
          </button>
          <button
            onClick={() => {
              setLoginMethod('email');
              setShowOtp(false);
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
              loginMethod === 'email'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="ri-mail-line mr-2"></i>
            Email
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Phone OTP Flow */}
        {loginMethod === 'phone' && !showOtp && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập số điện thoại di động
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0901234567"
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handlePhoneContinue}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* OTP Verification */}
        {loginMethod === 'phone' && showOtp && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập mã OTP 6 số
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-2xl tracking-widest"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Xác minh OTP
            </button>
            <button
              onClick={() => {
                setShowOtp(false);
                setOtp('');
              }}
              className="w-full py-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
            >
              Quay lại
            </button>
          </div>
        )}

        {/* Email Form */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Đăng ký
            </button>
          </form>
        )}

        {/* Social Login Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">hoặc</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-google-fill text-xl"></i>
            Đăng ký bằng Google
          </button>
          <button
            onClick={() => handleSocialLogin('zalo')}
            className="w-full py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-chat-3-fill text-xl text-blue-500"></i>
            Đăng ký bằng Zalo
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <button
              onClick={() => navigate('/creator-hub/login')}
              className="text-purple-600 hover:underline font-medium"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h2>
            <p className="text-gray-600 mb-6">
              Tài khoản của bạn đã được tạo. Vui lòng đăng nhập để bắt đầu sử dụng VITA Creator Hub.
            </p>
            <button
              onClick={handleContinueToLogin}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Đi đến trang đăng nhập
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
