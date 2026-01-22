import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function InvestorLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo mode: Unified credentials (1@gmail.com / 1, password: 1)
    const isUnifiedDemo = (email === '1@gmail.com' || email === '1') && password === '1';
    // Legacy demo: Nếu email chứa "investor" và password = "investor123"
    const isLegacyDemo = email.includes('investor') && password === 'investor123';
    
    if (isUnifiedDemo || isLegacyDemo) {
      setShow2FA(true);
    } else {
      setError('Thông tin đăng nhập không đúng. Demo: Email: 1@gmail.com hoặc chứa "investor", Password: 1 hoặc "investor123"');
    }
  };

  const handle2FA = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Mã 2FA = "123456"
    if (twoFactorCode === '123456') {
      // Lưu session và chuyển đến portal
      sessionStorage.setItem('investor_authenticated', 'true');
      sessionStorage.setItem('investor_email', email);
      navigate('/investor-portal');
    } else {
      setError('Mã xác thực 2FA không đúng. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Portal Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>
      
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-shield-star-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GreenLight Investor Portal
          </h1>
          <p className="text-gray-600 text-sm">
            {show2FA ? 'Xác thực 2 lớp' : 'Cổng Quan hệ Nhà đầu tư - Private Edition'}
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
            <i className="ri-lock-line mr-1"></i>
            Bảo mật cao - NDA Required
          </div>
        </div>

        {!show2FA ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email nhà đầu tư <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="investor@fund.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <i className="ri-error-warning-line mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              <i className="ri-login-box-line mr-2"></i>
              Đăng nhập
            </button>

            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>
                <i className="ri-information-line mr-1"></i>
                <strong>Demo:</strong> Email: <strong>1@gmail.com</strong> hoặc chứa "investor" | Password: <strong>1</strong> hoặc "investor123"
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Chưa có tài khoản?
              </p>
              <button
                type="button"
                onClick={() => navigate('/investor-portal/register')}
                className="w-full px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-user-add-line"></i>
                Đăng ký trở thành Nhà đầu tư
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handle2FA} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <i className="ri-shield-check-line mr-2"></i>
                Mã xác thực 2 lớp đã được gửi đến email của bạn
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã xác thực 2FA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                required
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-gray-500 mt-2">
                Demo: Nhập mã <strong>123456</strong>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <i className="ri-error-warning-line mr-2"></i>
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShow2FA(false);
                  setError('');
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                <i className="ri-check-line mr-2"></i>
                Xác thực
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

