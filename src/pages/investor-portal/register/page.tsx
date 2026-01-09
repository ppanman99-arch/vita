import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';
import BackButton from '../../../components/shared/BackButton';

export default function InvestorRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Thông tin cá nhân
    fullName: '',
    email: '',
    phone: '',
    position: '',
    organization: '',
    
    // Step 2: Thông tin tổ chức đầu tư
    investorType: 'individual', // individual, fund, family_office, corporate
    fundName: '',
    fundSize: '',
    investmentFocus: [] as string[],
    typicalInvestmentSize: '',
    preferredStage: [] as string[],
    
    // Step 3: Mối quan tâm đầu tư
    interestedIn: [] as string[],
    investmentHorizon: '',
    riskTolerance: '',
    previousInvestments: '',
    
    // Step 4: Thông tin đăng nhập
    password: '',
    confirmPassword: '',
    agreeToNDA: false,
    agreeToTerms: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const investorTypes = [
    { value: 'individual', label: 'Nhà đầu tư Cá nhân (Angel Investor)', icon: 'ri-user-line' },
    { value: 'fund', label: 'Quỹ Đầu tư (VC/PE Fund)', icon: 'ri-funds-line' },
    { value: 'family_office', label: 'Family Office', icon: 'ri-home-heart-line' },
    { value: 'corporate', label: 'Doanh nghiệp Đầu tư Chiến lược', icon: 'ri-building-line' },
  ];

  const investmentFocusOptions = [
    { value: 'agritech', label: 'Agritech / Nông nghiệp Công nghệ cao', icon: 'ri-seedling-line' },
    { value: 'sustainability', label: 'Bền vững / ESG', icon: 'ri-leaf-line' },
    { value: 'fintech', label: 'Fintech / Tài chính', icon: 'ri-money-dollar-circle-line' },
    { value: 'healthcare', label: 'Y tế / Dược phẩm', icon: 'ri-medicine-bottle-line' },
    { value: 'carbon', label: 'Carbon Credits / Môi trường', icon: 'ri-cloud-line' },
    { value: 'real_estate', label: 'Bất động sản Nông nghiệp', icon: 'ri-landscape-line' },
  ];

  const stageOptions = [
    { value: 'seed', label: 'Seed / Giai đoạn Hạt giống', icon: 'ri-seedling-line' },
    { value: 'series_a', label: 'Series A', icon: 'ri-plant-line' },
    { value: 'series_b', label: 'Series B / Pre-IPO', icon: 'ri-tree-line' },
    { value: 'ipo', label: 'IPO / Công khai', icon: 'ri-stock-line' },
  ];

  const interestOptions = [
    { value: 'vitality', label: 'Theo dõi Sức sống (Traction)', icon: 'ri-pulse-line' },
    { value: 'valuation', label: 'Giả lập Định giá', icon: 'ri-calculator-line' },
    { value: 'roadmap', label: 'Lộ trình IPO', icon: 'ri-roadmap-line' },
    { value: 'revenue', label: 'Cơ cấu Doanh thu', icon: 'ri-pie-chart-line' },
    { value: 'captable', label: 'Cơ cấu Cổ đông', icon: 'ri-group-line' },
    { value: 'legal', label: 'Hồ sơ Pháp lý', icon: 'ri-file-text-line' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreeToNDA' || name === 'agreeToTerms') {
        setFormData({ ...formData, [name]: checked });
      } else {
        // Handle arrays (investmentFocus, preferredStage, interestedIn)
        const arrayName = name as 'investmentFocus' | 'preferredStage' | 'interestedIn';
        setFormData(prev => ({
          ...prev,
          [arrayName]: checked
            ? [...prev[arrayName], value]
            : prev[arrayName].filter(item => item !== value)
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!formData.agreeToNDA || !formData.agreeToTerms) {
      alert('Vui lòng đồng ý với NDA và điều khoản sử dụng!');
      return;
    }

    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/investor-portal/login');
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

      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-user-add-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đăng ký Nhà đầu tư GreenLight
          </h1>
          <p className="text-gray-600 text-sm">
            Trở thành Nhà đầu tư được ủy quyền và truy cập Private Portal
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <i className="ri-check-line"></i> : step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Thông tin</span>
            <span>Tổ chức</span>
            <span>Mối quan tâm</span>
            <span>Đăng nhập</span>
          </div>
        </div>

        <form onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {/* Step 1: Thông tin cá nhân */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Cá nhân</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  placeholder="VD: Managing Partner, Investment Director..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tổ chức / Công ty
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Thông tin tổ chức đầu tư */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Tổ chức Đầu tư</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Loại Nhà đầu tư <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {investorTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.investorType === type.value
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorType"
                        value={type.value}
                        checked={formData.investorType === type.value}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600"
                      />
                      <i className={`${type.icon} text-2xl ${formData.investorType === type.value ? 'text-emerald-600' : 'text-gray-400'}`}></i>
                      <span className="font-medium text-sm">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.investorType === 'fund' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên Quỹ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fundName"
                      value={formData.fundName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quy mô Quỹ (USD)
                    </label>
                    <select
                      name="fundSize"
                      value={formData.fundSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Chọn quy mô</option>
                      <option value="<10M">Dưới 10 triệu USD</option>
                      <option value="10-50M">10 - 50 triệu USD</option>
                      <option value="50-100M">50 - 100 triệu USD</option>
                      <option value="100-500M">100 - 500 triệu USD</option>
                      <option value=">500M">Trên 500 triệu USD</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lĩnh vực Đầu tư Quan tâm (có thể chọn nhiều)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {investmentFocusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.investmentFocus.includes(option.value)
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="investmentFocus"
                        value={option.value}
                        checked={formData.investmentFocus.includes(option.value)}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600"
                      />
                      <i className={`${option.icon} text-xl ${formData.investmentFocus.includes(option.value) ? 'text-emerald-600' : 'text-gray-400'}`}></i>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quy mô Đầu tư Điển hình (USD)
                </label>
                <select
                  name="typicalInvestmentSize"
                  value={formData.typicalInvestmentSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn quy mô</option>
                  <option value="<100K">Dưới 100,000 USD</option>
                  <option value="100K-500K">100,000 - 500,000 USD</option>
                  <option value="500K-1M">500,000 - 1 triệu USD</option>
                  <option value="1M-5M">1 - 5 triệu USD</option>
                  <option value=">5M">Trên 5 triệu USD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Giai đoạn Đầu tư Ưa thích (có thể chọn nhiều)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stageOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.preferredStage.includes(option.value)
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="preferredStage"
                        value={option.value}
                        checked={formData.preferredStage.includes(option.value)}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600"
                      />
                      <i className={`${option.icon} text-xl ${formData.preferredStage.includes(option.value) ? 'text-emerald-600' : 'text-gray-400'}`}></i>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mối quan tâm đầu tư */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mối quan tâm Đầu tư</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bạn quan tâm đến (có thể chọn nhiều)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.interestedIn.includes(option.value)
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="interestedIn"
                        value={option.value}
                        checked={formData.interestedIn.includes(option.value)}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600"
                      />
                      <i className={`${option.icon} text-xl ${formData.interestedIn.includes(option.value) ? 'text-emerald-600' : 'text-gray-400'}`}></i>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian Đầu tư (Investment Horizon)
                </label>
                <select
                  name="investmentHorizon"
                  value={formData.investmentHorizon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn thời gian</option>
                  <option value="1-3years">1 - 3 năm</option>
                  <option value="3-5years">3 - 5 năm</option>
                  <option value="5-7years">5 - 7 năm</option>
                  <option value="7-10years">7 - 10 năm</option>
                  <option value=">10years">Trên 10 năm</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ Chấp nhận Rủi ro
                </label>
                <select
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Chọn mức độ</option>
                  <option value="conservative">Bảo thủ</option>
                  <option value="moderate">Trung bình</option>
                  <option value="aggressive">Mạo hiểm</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kinh nghiệm Đầu tư Trước đây
                </label>
                <textarea
                  name="previousInvestments"
                  value={formData.previousInvestments}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Mô tả ngắn gọn về các khoản đầu tư trước đây của bạn..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 4: Thông tin đăng nhập */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Đăng nhập & Đồng ý</h2>
              
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Tối thiểu 8 ký tự</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToNDA"
                    checked={formData.agreeToNDA}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-emerald-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      <i className="ri-file-shield-line text-amber-600 mr-2"></i>
                      Đồng ý với Thỏa thuận Bảo mật (NDA) <span className="text-red-500">*</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Tôi cam kết giữ bí mật tất cả thông tin được chia sẻ trong Investor Portal và không tiết lộ cho bên thứ ba.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-emerald-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      <i className="ri-file-text-line text-emerald-600 mr-2"></i>
                      Đồng ý với Điều khoản Sử dụng <span className="text-red-500">*</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Tôi đã đọc và đồng ý với các điều khoản sử dụng của GreenLight Investor Portal.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Quay lại
              </button>
            )}
            <button
              type="submit"
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all ${
                currentStep === 1 ? 'w-full' : ''
              }`}
            >
              {currentStep === 4 ? (
                <>
                  <i className="ri-check-line mr-2"></i>
                  Hoàn tất Đăng ký
                </>
              ) : (
                <>
                  Tiếp theo
                  <i className="ri-arrow-right-line ml-2"></i>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-white text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký Thành công!</h3>
              <p className="text-gray-600 mb-6">
                Yêu cầu đăng ký của bạn đã được gửi. Chúng tôi sẽ xem xét và liên hệ với bạn trong vòng 24-48 giờ để hoàn tất quy trình xác thực và cấp quyền truy cập Investor Portal.
              </p>
              <button
                onClick={handleSuccessClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


