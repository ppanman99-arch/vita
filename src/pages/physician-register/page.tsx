import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PhysicianRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/physician-portal';
  
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
    sessionStorage.setItem('physician_authenticated', 'true');
    sessionStorage.setItem('physician_phone', phone);
    sessionStorage.setItem('physician_verified', 'true');
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
    sessionStorage.setItem('physician_authenticated', 'true');
    sessionStorage.setItem('physician_email', email);
    sessionStorage.setItem('physician_verified', 'true');
    setShowSuccessModal(true);
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'zalo') => {
    // Simulate social login
    alert(`Đang đăng nhập bằng ${provider}...`);
    // In real app, redirect to OAuth provider
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng ký tài khoản</h1>
              <p className="text-sm opacity-90">Tạo tài khoản cá nhân để truy cập VITA Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-white text-4xl"></i>
        </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Chào mừng đến với VITA
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Tạo tài khoản để bắt đầu hành trình của bạn
          </p>
        </div>

        {/* Method Toggle */}
        <div className="bg-white rounded-xl p-1 mb-6 flex gap-2 shadow-md">
          <button
            onClick={() => {
              setLoginMethod('phone');
              setShowOtp(false);
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all text-sm ${
              loginMethod === 'phone'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
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
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
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
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
              <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập số điện thoại di động
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="0912345678"
                className="w-full px-4 py-4 text-lg text-center border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                maxLength={10}
              />
            </div>

            {/* Social Login */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3 text-center">Hoặc đăng nhập bằng:</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-google-fill text-2xl text-red-500"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-apple-fill text-2xl text-gray-900"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('zalo')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-chat-3-fill text-2xl text-blue-500"></i>
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <span className="text-teal-600 font-semibold cursor-pointer">Điều khoản sử dụng</span> và{' '}
              <span className="text-teal-600 font-semibold cursor-pointer">Chính sách bảo mật</span> của VITA.
            </p>

            {/* Continue Button */}
            <button
              onClick={handlePhoneContinue}
              disabled={phone.length !== 10}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* OTP Verification */}
        {loginMethod === 'phone' && showOtp && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-message-3-line text-teal-600 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhập mã OTP</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi đã gửi mã xác thực 6 số đến <span className="font-semibold">{phone}</span>
              </p>
            </div>

                  <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mã OTP (6 số)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full px-4 py-4 text-2xl text-center tracking-widest border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowOtp(false);
                  setOtp('');
                  setError('');
                }}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Quay lại
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Xác thực
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Không nhận được mã?{' '}
              <button className="text-teal-600 font-semibold hover:underline">Gửi lại</button>
            </p>
                    </div>
        )}

        {/* Email + Password Flow */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                  <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
                    </label>
                    <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu *
                      </label>
                      <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                        required
                minLength={6}
                      />
                    </div>

                    <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu *
                      </label>
                      <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                        required
                minLength={6}
                      />
                    </div>

            {/* Social Login */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3 text-center">Hoặc đăng ký bằng:</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-google-fill text-2xl text-red-500"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-apple-fill text-2xl text-gray-900"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('zalo')}
                  className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-chat-3-fill text-2xl text-blue-500"></i>
                </button>
              </div>
              </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center">
              Bằng việc đăng ký, bạn đồng ý với{' '}
              <span className="text-teal-600 font-semibold cursor-pointer">Điều khoản sử dụng</span> và{' '}
              <span className="text-teal-600 font-semibold cursor-pointer">Chính sách bảo mật</span> của VITA.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all"
            >
              Tạo tài khoản
            </button>

            <p className="text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button
                onClick={() => navigate('/physician-portal/login')}
                className="text-teal-600 font-semibold hover:underline"
              >
                Đăng nhập
              </button>
            </p>
            </form>
        )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-teal-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.
              </p>
              <div className="space-y-3">
                  <button
                    onClick={() => navigate(redirectTo)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Vào Portal
                  </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
