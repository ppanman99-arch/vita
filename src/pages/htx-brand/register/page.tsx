import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function HtxBrandRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coopName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo mode: Accept simple credentials
    const isDemoMode = formData.email === '1@gmail.com' && formData.phone === '1' && formData.password === '1' && formData.confirmPassword === '1';
    
    if (isDemoMode) {
      // Skip validation for demo mode
      if (formData.coopName) {
        sessionStorage.setItem('brand_coop_name', formData.coopName);
      }
      sessionStorage.setItem('brand_email', formData.email);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/htx-brand/login');
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

    // Save registration and redirect to login
    if (formData.coopName) {
      sessionStorage.setItem('brand_coop_name', formData.coopName);
    }
    sessionStorage.setItem('brand_email', formData.email);
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/htx-brand/login');
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

          {/* Demo Info Banner */}
          <div className="mb-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Chế độ Demo - Xem nhanh</p>
                <p className="text-xs text-blue-700">
                  Để xem demo nhanh, nhập: <strong>Email: 1@gmail.com</strong>, <strong>Số điện thoại: 1</strong>, <strong>Mật khẩu: 1</strong>, <strong>Xác nhận mật khẩu: 1</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên Hợp tác xã
              </label>
              <input
                type="text"
                value={formData.coopName}
                onChange={(e) => handleInputChange('coopName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="HTX Sâm Ngọc Linh (tùy chọn)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="1@gmail.com (demo) hoặc email của bạn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="1 (demo) hoặc số điện thoại của bạn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="1 (demo) hoặc mật khẩu của bạn"
                required
                minLength={formData.password === '1' ? 1 : 6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="1 (demo) hoặc xác nhận mật khẩu"
                required
                minLength={formData.confirmPassword === '1' ? 1 : 6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Hoàn tất đăng ký
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/htx-brand/login')}
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



