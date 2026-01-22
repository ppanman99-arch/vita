import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function VitaSupplyLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo mode: Unified credentials (1@gmail.com / 1, password: 1)
    const isUnifiedDemo = (email === '1@gmail.com' || email === '1') && password === '1';
    // Legacy demo authentication
    const isLegacyDemo = (email.includes('supply') || email.includes('htx') || email.includes('coop')) && password === 'supply123';
    
    if (isUnifiedDemo || isLegacyDemo) {
      const coopName = email.split('@')[0].replace(/[0-9]/g, '') || 'HTX';
      sessionStorage.setItem('supply_authenticated', 'true');
      sessionStorage.setItem('supply_email', email);
      sessionStorage.setItem('supply_coop_name', coopName);
      navigate('/vita-supply');
    } else {
      setError('Thông tin đăng nhập không đúng. Demo: Email: 1@gmail.com hoặc chứa "supply"/"htx"/"coop", Password: 1 hoặc "supply123"');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher variant="light" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
              <i className="ri-shopping-cart-2-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              VITA Supply
            </h1>
            <p className="text-gray-600">
              Sàn Cung Ứng Vật Tư & Thiết Bị Công Nghệ
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email HTX / Tài khoản
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="htx@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <i className="ri-lock-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                onClick={() => navigate('/vita-supply/register')}
                className="text-orange-600 font-semibold hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
            <p className="text-xs text-gray-500">
              Demo: Email chứa "supply" hoặc "htx", password: supply123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



