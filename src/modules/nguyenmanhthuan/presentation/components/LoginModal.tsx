
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type FlowStep = 'login' | 'verify-account' | 'enter-otp' | 'set-password' | 'success';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tài khoản demo để test
    if (username === '1' && password === '1') {
      // Lưu user ID demo vào sessionStorage để dashboard có thể fetch Green Points
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user_id', 'demo-user-1');
        sessionStorage.setItem('demo_account', 'true');
      }
      onLoginSuccess();
      return;
    }
    
    // TODO: Thêm logic đăng nhập thực tế với Supabase ở đây
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: username,
    //   password: password
    // });
    
    // Tạm thời cho phép login với bất kỳ thông tin nào (để test)
    onLoginSuccess();
  };

  const handleVerifyAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowStep('enter-otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowStep('set-password');
  };

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    setFlowStep('success');
    setTimeout(() => {
      onLoginSuccess();
    }, 2000);
  };

  const resetFlow = () => {
    setFlowStep('login');
    setUsername('');
    setPassword('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setContactInfo('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => {
            onClose();
            resetFlow();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {flowStep === 'login' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập / Nhận Cổ phần</h2>
              <p className="text-gray-600">Truy cập vào hệ sinh thái VITA</p>
            </div>

            {/* Demo Account Notice */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <i className="ri-information-line text-xl text-blue-600"></i>
                </div>
                <div className="text-sm text-blue-800">
                  <p className="font-bold mb-1">🔐 Tài khoản Demo để Test:</p>
                  <p className="mb-1">• <strong>Tên đăng nhập:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">1</code></p>
                  <p>• <strong>Mật khẩu:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">1</code></p>
                  <p className="mt-2 text-xs text-blue-700">Sử dụng tài khoản này để kiểm tra tính năng Dashboard và Green Points</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên đăng nhập / Email / Số điện thoại
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Nhập tên đăng nhập, email hoặc số điện thoại"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đăng nhập
              </button>
            </form>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setFlowStep('verify-account')}
                className="w-full text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer whitespace-nowrap text-center py-2 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Kích hoạt tài khoản cũ / Quên mật khẩu?
              </button>
            </div>
          </>
        )}

        {flowStep === 'verify-account' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-shield-user-line text-3xl text-emerald-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Xác thực tài khoản</h2>
              <p className="text-gray-600">Nhập Email hoặc Số điện thoại đã đăng ký trước đây</p>
            </div>

            <form onSubmit={handleVerifyAccount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email hoặc Số điện thoại
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="your@email.com hoặc 0912345678"
                  required
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-information-line text-xl text-amber-600"></i>
                  </div>
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                    <p>Vì đây là hệ thống mới, bạn cần kích hoạt lại tài khoản cũ. Mã OTP sẽ được gửi đến Email/SĐT của bạn để xác thực.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Gửi mã OTP
              </button>

              <button
                type="button"
                onClick={() => setFlowStep('login')}
                className="w-full text-gray-600 hover:text-gray-900 font-medium cursor-pointer whitespace-nowrap"
              >
                Quay lại đăng nhập
              </button>
            </form>
          </>
        )}

        {flowStep === 'enter-otp' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-mail-check-line text-3xl text-emerald-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nhập mã OTP</h2>
              <p className="text-gray-600">Mã xác thực đã được gửi đến {contactInfo}</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã OTP (6 số)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-center text-2xl tracking-widest font-semibold"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  Gửi lại mã OTP
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Xác nhận
              </button>

              <button
                type="button"
                onClick={() => setFlowStep('verify-account')}
                className="w-full text-gray-600 hover:text-gray-900 font-medium cursor-pointer whitespace-nowrap"
              >
                Quay lại
              </button>
            </form>
          </>
        )}

        {flowStep === 'set-password' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-lock-password-line text-3xl text-emerald-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thiết lập mật khẩu mới</h2>
              <p className="text-gray-600">Tạo mật khẩu mới để bảo mật tài khoản của bạn</p>
            </div>

            <form onSubmit={handleSetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Hoàn tất
              </button>
            </form>
          </>
        )}

        {flowStep === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-5xl text-emerald-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thành công!</h2>
            <p className="text-gray-600 mb-6">Tài khoản của bạn đã được kích hoạt thành công</p>
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
