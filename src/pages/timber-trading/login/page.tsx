import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function TimberLoginPage() {
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
    // Legacy demo: Nếu email chứa "timber" hoặc "go" và password = "timber123"
    const isLegacyDemo = (email.includes('timber') || email.includes('go')) && password === 'timber123';
    
    if (isUnifiedDemo || isLegacyDemo) {
      setShow2FA(true);
    } else {
      setError('Thông tin đăng nhập không đúng. Demo: Email: 1@gmail.com hoặc chứa "timber"/"go", Password: 1 hoặc "timber123"');
    }
  };

  const handle2FA = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Mã 2FA = "123456"
    if (twoFactorCode === '123456') {
      // Extract company name from email (before @)
      // Try to get from session first (if registered), otherwise extract from email
      const storedCompanyName = sessionStorage.getItem('timber_company_name');
      let companyName = storedCompanyName;
      
      if (!companyName) {
        // Extract from email: timber@company.com -> "Company"
        const emailName = email.split('@')[0];
        const domain = email.split('@')[1]?.split('.')[0] || '';
        // Use domain if it's meaningful, otherwise use email name
        companyName = domain 
          ? domain.charAt(0).toUpperCase() + domain.slice(1)
          : emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[0-9]/g, '');
      }
      
      // Lưu session và chuyển đến portal
      sessionStorage.setItem('timber_authenticated', 'true');
      sessionStorage.setItem('timber_email', email);
      sessionStorage.setItem('timber_company_name', companyName || 'Doanh nghiệp Gỗ');
      navigate('/timber-trading');
    } else {
      setError('Mã xác thực 2FA không đúng. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Portal Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>
      
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-tree-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA Timber Trading Hub</h1>
          <p className="text-gray-600">Cổng Giao dịch Gỗ Nguyên liệu</p>
        </div>

        {!show2FA ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email doanh nghiệp
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="timber@company.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                placeholder="Nhập mật khẩu"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              <i className="ri-login-box-line mr-2"></i>
              Đăng nhập
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/timber-trading/register')}
                className="text-amber-600 hover:underline font-semibold"
              >
                Đăng ký ngay
              </button>
            </p>

            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>
                <i className="ri-information-line mr-1"></i>
                <strong>Demo:</strong> Email: <strong>1@gmail.com</strong> hoặc chứa "timber"/"go" | Password: <strong>1</strong> hoặc "timber123"
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handle2FA} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-amber-600 text-3xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Xác thực 2 yếu tố</h2>
              <p className="text-sm text-gray-600">
                Vui lòng nhập mã xác thực đã được gửi đến email của bạn
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã xác thực (2FA)
              </label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="Nhập mã 6 số"
                maxLength={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-2xl tracking-widest"
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
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              <i className="ri-check-line mr-2"></i>
              Xác thực
            </button>

            <button
              type="button"
              onClick={() => {
                setShow2FA(false);
                setTwoFactorCode('');
                setError('');
              }}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Quay lại
            </button>

            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>
                <i className="ri-information-line mr-1"></i>
                Demo: Mã 2FA = "123456"
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

