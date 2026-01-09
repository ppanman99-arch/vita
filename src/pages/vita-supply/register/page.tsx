import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

export default function VitaSupplyRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    coopName: '',
    email: '',
    phone: '',
    address: '',
    taxCode: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.coopName || !formData.email || !formData.phone) {
        setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.address || !formData.taxCode) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    // Save registration and redirect to login
    sessionStorage.setItem('supply_coop_name', formData.coopName);
    sessionStorage.setItem('supply_email', formData.email);
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/vita-supply/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher variant="light" />
      </div>

      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
              <i className="ri-shopping-cart-2-line text-4xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đăng ký VITA Supply
            </h1>
            <p className="text-gray-600">
              Tạo tài khoản để mua vật tư với giá ưu đãi
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <i className="ri-check-line"></i> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > s ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Thông tin Hợp tác xã
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Hợp tác xã *
                  </label>
                  <input
                    type="text"
                    value={formData.coopName}
                    onChange={(e) => handleInputChange('coopName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="htx@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0901234567"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Thông tin địa chỉ & Thuế
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Xã, Huyện, Tỉnh"
                    rows={3}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0123456789"
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Tạo mật khẩu
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Quay lại
                </button>
              )}
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {step === 3 ? 'Hoàn tất đăng ký' : 'Tiếp tục'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/vita-supply/login')}
              className="text-sm text-orange-600 hover:underline"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



