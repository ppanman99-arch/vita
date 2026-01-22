import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';
import BackButton from '../../../components/shared/BackButton';

export default function TimberRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: 'factory',
    industry: '',
    timberNeeds: [] as string[],
    annualVolume: '',
    certificationRequired: [] as string[],
    contactName: '',
    position: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const companyTypes = [
    { value: 'factory', label: 'Nhà máy Chế biến Gỗ', icon: 'ri-factory-line' },
    { value: 'export', label: 'Công ty Xuất khẩu Nội thất', icon: 'ri-ship-line' },
    { value: 'construction', label: 'Công ty Xây dựng', icon: 'ri-building-2-line' },
    { value: 'trading', label: 'Công ty Thương mại Gỗ', icon: 'ri-store-line' },
    { value: 'furniture', label: 'Nhà máy Sản xuất Nội thất', icon: 'ri-sofa-line' },
  ];

  const industries = [
    'Chế biến Gỗ',
    'Xuất khẩu Nội thất',
    'Xây dựng',
    'Sản xuất Ván ép',
    'Sản xuất Giấy',
    'Nội thất',
    'Thương mại Gỗ',
    'Khác',
  ];

  const timberNeedOptions = [
    { value: 'future_booking', label: 'Đặt hàng Tương lai (Futures)', icon: 'ri-calendar-todo-line' },
    { value: 'fsc_certified', label: 'Yêu cầu FSC/PEFC', icon: 'ri-award-line' },
    { value: 'large_volume', label: 'Khối lượng lớn', icon: 'ri-stack-line' },
    { value: 'specific_species', label: 'Loại cây cụ thể', icon: 'ri-tree-line' },
    { value: 'sustainable', label: 'Gỗ Bền vững', icon: 'ri-leaf-line' },
    { value: 'traceability', label: 'Truy xuất Nguồn gốc', icon: 'ri-qr-code-line' },
  ];

  const certificationOptions = [
    { value: 'fsc', label: 'FSC (Forest Stewardship Council)', icon: 'ri-award-line' },
    { value: 'pefc', label: 'PEFC (Programme for the Endorsement of Forest Certification)', icon: 'ri-award-line' },
    { value: 'vietnam_forest', label: 'Chứng nhận Rừng Việt Nam', icon: 'ri-award-line' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreeToTerms') {
        setFormData({ ...formData, [name]: checked });
      } else if (name.startsWith('timberNeed_')) {
        const needValue = name.replace('timberNeed_', '');
        setFormData(prev => ({
          ...prev,
          timberNeeds: checked
            ? [...prev.timberNeeds, needValue]
            : prev.timberNeeds.filter(n => n !== needValue)
        }));
      } else if (name.startsWith('cert_')) {
        const certValue = name.replace('cert_', '');
        setFormData(prev => ({
          ...prev,
          certificationRequired: checked
            ? [...prev.certificationRequired, certValue]
            : prev.certificationRequired.filter(c => c !== certValue)
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo mode: Accept simple credentials
    const isDemoMode = formData.email === '1@gmail.com' && formData.phone === '1' && formData.password === '1' && formData.confirmPassword === '1';
    
    if (isDemoMode) {
      // Skip validation for demo mode
      if (formData.companyName) {
        sessionStorage.setItem('timber_company_name', formData.companyName);
      }
      sessionStorage.setItem('timber_registered_email', formData.email);
      setShowSuccessModal(true);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }

    // Lưu tên doanh nghiệp vào session storage để hiển thị khi đăng nhập
    if (formData.companyName) {
      sessionStorage.setItem('timber_company_name', formData.companyName);
    }
    sessionStorage.setItem('timber_registered_email', formData.email);

    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
            <div>
              <h1 className="text-2xl font-bold">Đăng ký Doanh nghiệp Gỗ</h1>
              <p className="text-sm text-amber-100">Tham gia VITA Timber Trading Hub</p>
            </div>
          </div>
          <div className="flex justify-end">
            <PortalSwitcher />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-building-line text-amber-600"></i>
                Thông tin Doanh nghiệp
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên doanh nghiệp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại hình doanh nghiệp <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companyTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.companyType === type.value
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="companyType"
                        value={type.value}
                        checked={formData.companyType === type.value}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-amber-600"
                      />
                      <i className={`${type.icon} text-lg ml-3 mr-2 ${formData.companyType === type.value ? 'text-amber-600' : 'text-gray-500'}`}></i>
                      <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngành nghề <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">-- Chọn ngành nghề --</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhu cầu Gỗ <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timberNeedOptions.map(need => (
                    <label
                      key={need.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.timberNeeds.includes(need.value)
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name={`timberNeed_${need.value}`}
                        checked={formData.timberNeeds.includes(need.value)}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-amber-600 rounded"
                      />
                      <i className={`${need.icon} text-lg ml-3 mr-2 ${formData.timberNeeds.includes(need.value) ? 'text-amber-600' : 'text-gray-500'}`}></i>
                      <span className="text-sm font-medium text-gray-700">{need.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khối lượng Gỗ cần/năm (m³)
                </label>
                <input
                  type="text"
                  name="annualVolume"
                  value={formData.annualVolume}
                  onChange={handleChange}
                  placeholder="VD: 10,000 m³"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chứng nhận yêu cầu
                </label>
                <div className="space-y-2">
                  {certificationOptions.map(cert => (
                    <label
                      key={cert.value}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.certificationRequired.includes(cert.value)
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name={`cert_${cert.value}`}
                        checked={formData.certificationRequired.includes(cert.value)}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-amber-600 rounded"
                      />
                      <i className={`${cert.icon} text-lg ml-3 mr-2 ${formData.certificationRequired.includes(cert.value) ? 'text-amber-600' : 'text-gray-500'}`}></i>
                      <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-user-line text-amber-600"></i>
                Thông tin Liên hệ
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chức vụ
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-lock-line text-amber-600"></i>
                Tạo Tài khoản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500"
                />
                <label className="text-sm text-gray-700">
                  Tôi đã đọc và đồng ý với{' '}
                  <a href="#" className="text-amber-600 hover:underline font-semibold">
                    Điều khoản sử dụng
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-amber-600 hover:underline font-semibold">
                    Chính sách bảo mật
                  </a>
                  <span className="text-red-500"> *</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                <i className="ri-check-line mr-2"></i>
                Đăng ký
              </button>
              <button
                type="button"
                onClick={() => navigate('/timber-trading/login')}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Đã có tài khoản? Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-amber-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-600">
                Chúng tôi sẽ xem xét và liên hệ với bạn trong vòng 24-48 giờ để kích hoạt tài khoản.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/timber-trading/login');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                Đăng nhập ngay
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


