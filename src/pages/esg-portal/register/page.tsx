import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ESGRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: 'corporate',
    industry: '',
    esgGoals: [] as string[],
    carbonNeutralTarget: '',
    annualRevenue: '',
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
    { value: 'corporate', label: 'Tập đoàn / Doanh nghiệp lớn', icon: 'ri-building-line' },
    { value: 'bank', label: 'Ngân hàng / Tài chính', icon: 'ri-bank-line' },
    { value: 'airline', label: 'Hãng hàng không', icon: 'ri-plane-line' },
    { value: 'manufacturing', label: 'Sản xuất / Công nghiệp', icon: 'ri-factory-line' },
    { value: 'retail', label: 'Bán lẻ / Thương mại', icon: 'ri-store-line' },
  ];

  const industries = [
    'Ngân hàng & Tài chính',
    'Hàng không',
    'Sản xuất',
    'Năng lượng',
    'Bất động sản',
    'Bán lẻ',
    'Công nghệ',
    'Dược phẩm',
    'Thực phẩm & Đồ uống',
    'Khác',
  ];

  const esgGoalOptions = [
    { value: 'carbon_neutral', label: 'Đạt Carbon Neutral (Net Zero)', icon: 'ri-cloud-line' },
    { value: 'carbon_credits', label: 'Mua Tín chỉ Carbon', icon: 'ri-leaf-line' },
    { value: 'csr', label: 'CSR / Trách nhiệm Xã hội', icon: 'ri-heart-line' },
    { value: 'branding', label: 'Xây dựng Thương hiệu Xanh', icon: 'ri-star-line' },
    { value: 'compliance', label: 'Tuân thủ Quy định ESG', icon: 'ri-shield-check-line' },
    { value: 'reporting', label: 'Báo cáo Bền vững', icon: 'ri-file-text-line' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreeToTerms') {
        setFormData({ ...formData, [name]: checked });
      } else {
        // Handle ESG goals
        const goalValue = value;
        setFormData(prev => ({
          ...prev,
          esgGoals: checked
            ? [...prev.esgGoals, goalValue]
            : prev.esgGoals.filter(g => g !== goalValue)
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
        sessionStorage.setItem('esg_company_name', formData.companyName);
      }
      sessionStorage.setItem('esg_registered_email', formData.email);
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
      sessionStorage.setItem('esg_company_name', formData.companyName);
    }
    sessionStorage.setItem('esg_registered_email', formData.email);

    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng Ký Doanh Nghiệp ESG</h1>
              <p className="text-sm opacity-90">Tham gia Đầu tư Tác động Môi trường</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=ESG%20sustainable%20investment%20corporate%20sustainability%20green%20finance%20carbon%20credits%20environmental%20impact%20professional%20business%20meeting%20modern%20office%20clean%20background&width=1920&height=800&seq=esg1&orientation=landscape"
            alt="ESG Investment"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            ĐẦU TƯ TÁC ĐỘNG MÔI TRƯỜNG<br />TẠO RA GIÁ TRỊ BỀN VỮNG
          </h2>
          <p className="text-base sm:text-xl text-white/95 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Kết nối với các dự án trồng rừng bền vững, nhận Tín chỉ Carbon được chứng nhận, và xây dựng thương hiệu xanh cho doanh nghiệp.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Benefits */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            LỢI ÍCH KHI THAM GIA VITA ESG HUB
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'ri-leaf-line', title: 'Tín chỉ Carbon', desc: 'Nhận Carbon Credits được chứng nhận quốc tế' },
              { icon: 'ri-star-line', title: 'Thương hiệu Xanh', desc: 'Xây dựng hình ảnh doanh nghiệp bền vững' },
              { icon: 'ri-file-chart-line', title: 'Báo cáo ESG', desc: 'Báo cáo tác động môi trường cho cổ đông' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin Đăng ký</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Info */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-building-line text-green-600"></i>
                Thông tin Doanh nghiệp
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại doanh nghiệp <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {companyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn ngành nghề --</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doanh thu hàng năm (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                    placeholder="VD: 100 tỷ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* ESG Goals */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-target-line text-green-600"></i>
                Mục tiêu ESG
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {esgGoalOptions.map(goal => (
                  <label key={goal.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="esgGoal"
                      value={goal.value}
                      checked={formData.esgGoals.includes(goal.value)}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <i className={`${goal.icon} text-green-600`}></i>
                    <span className="text-sm text-gray-700">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-user-line text-green-600"></i>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chức vụ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    placeholder="VD: Giám đốc Bền vững"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Demo Info Banner */}
                <div className="col-span-2 bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-2">
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
                    placeholder="1 (demo)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    placeholder="1@gmail.com (demo)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-lock-line text-green-600"></i>
                Tài khoản Đăng nhập
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 text-green-600 focus:ring-green-500"
              />
              <label className="text-sm text-gray-700">
                Tôi đồng ý với{' '}
                <a href="#" className="text-green-600 hover:underline">Điều khoản sử dụng</a>
                {' '}và{' '}
                <a href="#" className="text-green-600 hover:underline">Chính sách bảo mật</a>
                {' '}của VITA Platform
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              <i className="ri-check-line mr-2"></i>
              Đăng ký tài khoản
            </button>
          </form>
        </section>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Đã có tài khoản?{' '}
            <button
              onClick={() => navigate('/esg-portal/login')}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-green-600 text-3xl"></i>
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
                  navigate('/esg-portal/login');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
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

