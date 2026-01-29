import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../../components/shared/PortalSwitcher';
import { AuthService } from '../../../../core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '../../../../core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { CooperativeService } from '../../application/CooperativeService';
import { useRealAuth } from '../../../../config/featureFlags';

export default function CooperativeLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const useAuth = useRealAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo mode when real auth is off
    const isUnifiedDemo = !useAuth && (email === '1@gmail.com' || email === '1') && password === '1';
    const isLegacyDemo = !useAuth && (email.includes('htx') || email.includes('coop') || email.includes('brand')) && password === 'brand123';

    if (isUnifiedDemo || isLegacyDemo) {
      const coopName = email.split('@')[0].replace(/[0-9]/g, '') || 'HTX';
      sessionStorage.setItem('brand_authenticated', 'true');
      sessionStorage.setItem('brand_email', email);
      sessionStorage.setItem('brand_coop_name', coopName);
      navigate('/cooperative/dashboard');
      return;
    }

    if (useAuth) {
      setLoading(true);
      try {
        const authService = new AuthService(new SupabaseAuthAdapter());
        const authResult = await authService.signIn({ email, password });
        if (authResult.error || !authResult.user) {
          setError(authResult.error || 'Đăng nhập thất bại.');
          setLoading(false);
          return;
        }
        const cooperativeService = new CooperativeService();
        const cooperative = await cooperativeService.getCooperativeByAuthUserId(authResult.user.id);
        if (!cooperative) {
          setError('Không tìm thấy thông tin HTX cho tài khoản này.');
          setLoading(false);
          return;
        }
        sessionStorage.setItem('cooperative_id', cooperative.id);
        sessionStorage.setItem('brand_authenticated', 'true');
        sessionStorage.setItem('brand_email', cooperative.email);
        sessionStorage.setItem('brand_coop_name', cooperative.name);
        navigate('/cooperative/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setError('Thông tin đăng nhập không đúng. Demo: Email: 1@gmail.com hoặc chứa "htx"/"coop"/"brand", Password: 1 hoặc "brand123"');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher variant="light" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              <i className="ri-dashboard-3-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Trung tâm Điều hành HTX
            </h1>
            <p className="text-gray-600">
              Cổng quản trị Hợp tác xã - Giám sát toàn bộ hoạt động
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
                Email / Tài khoản quản trị
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập vào Dashboard'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                onClick={() => {
                  // Set onboarding state to start at PortalReveal (step 5) for cooperative
                  const onboardingState = {
                    currentStep: 5,
                    entityType: 'organization' as const,
                    portal: 'cooperative',
                    asset: 'cooperative'
                  };
                  localStorage.setItem('vita_onboarding_state', JSON.stringify(onboardingState));
                  navigate('/onboarding');
                }}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
            <p className="text-xs text-gray-500">
              Demo: Email: 1@gmail.com hoặc chứa "htx"/"coop", Password: 1 hoặc "brand123"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



