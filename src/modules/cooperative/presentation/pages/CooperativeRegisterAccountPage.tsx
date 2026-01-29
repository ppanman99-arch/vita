import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../../components/shared/PortalSwitcher';
import { AuthService } from '../../../../core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '../../../../core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { CooperativeService } from '../../application/CooperativeService';
import { useRealAuth } from '../../../../config/featureFlags';

export default function CooperativeRegisterAccountPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coopName: '',
    email: '',
    phone: '',
    taxCode: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const useAuth = useRealAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo mode: Accept simple credentials (when real auth is off)
    const isDemoMode = !useAuth && formData.email === '1@gmail.com' && formData.phone === '1' && formData.password === '1' && formData.confirmPassword === '1';

    if (isDemoMode) {
      if (formData.coopName) sessionStorage.setItem('brand_coop_name', formData.coopName);
      sessionStorage.setItem('brand_email', formData.email);
      sessionStorage.setItem('brand_authenticated', 'true');
      navigate('/cooperative/dashboard');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (useAuth) {
      setLoading(true);
      try {
        const authService = new AuthService(new SupabaseAuthAdapter());
        const authResult = await authService.signUp({
          email: formData.email,
          password: formData.password,
          metadata: { coop_name: formData.coopName },
        });
        if (authResult.error || !authResult.user) {
          setError(authResult.error || 'Đăng ký thất bại.');
          setLoading(false);
          return;
        }
        const cooperativeService = new CooperativeService();
        const cooperative = await cooperativeService.registerCooperative({
          authUserId: authResult.user.id,
          name: formData.coopName,
          email: formData.email,
          phone: formData.phone,
          taxCode: formData.taxCode || undefined,
          location: formData.address || undefined,
          status: 'pending',
        });
        sessionStorage.setItem('cooperative_id', cooperative.id);
        sessionStorage.setItem('brand_coop_name', formData.coopName);
        sessionStorage.setItem('brand_email', formData.email);
        sessionStorage.setItem('brand_authenticated', 'true');
        navigate('/cooperative/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Fallback: session-only (no Supabase)
    if (formData.coopName) sessionStorage.setItem('brand_coop_name', formData.coopName);
    sessionStorage.setItem('brand_email', formData.email);
    sessionStorage.setItem('brand_authenticated', 'true');
    navigate('/cooperative/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher variant="light" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <i className="ri-store-3-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đăng ký HTX Brand Hub
            </h1>
            <p className="text-gray-600">
              Tạo cổng thương hiệu và dịch vụ cho HTX của bạn
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Hợp tác xã *
                </label>
                <input
                  type="text"
                  value={formData.coopName}
                  onChange={(e) => handleInputChange('coopName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="HTX Sâm Ngọc Linh"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="htx@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0901234567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã số thuế *
                </label>
                <input
                  type="text"
                  value={formData.taxCode}
                  onChange={(e) => handleInputChange('taxCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0123456789"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Xã, Huyện, Tỉnh"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/cooperative/login')}
              className="text-sm text-purple-600 hover:underline"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



