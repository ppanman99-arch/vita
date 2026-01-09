import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1: Organization Info
  communeName: string;
  province: string;
  district: string;
  communeCode: string; // Mã hành chính
  population: string;
  totalArea: string; // ha
  forestArea: string; // ha
  
  // Step 2: Representative Info
  representativeName: string;
  position: string; // Chủ tịch/Phó Chủ tịch
  email: string;
  phone: string;
  idNumber: string;
  password: string;
  confirmPassword: string;
  
  // Step 3: Authorization
  authorizationLetter: File | null;
  agreeToTerms: boolean;
  agreeToDataSharing: boolean;
}

const provinces = [
  'Lai Châu', 'Điện Biên', 'Sơn La', 'Yên Bái', 'Hoà Bình',
  'Lào Cai', 'Hà Giang', 'Cao Bằng', 'Bắc Kạn', 'Tuyên Quang',
  'Lạng Sơn', 'Quảng Ninh', 'Bắc Giang', 'Phú Thọ', 'Vĩnh Phúc',
  'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng'
];

const positions = [
  'Chủ tịch UBND Xã',
  'Phó Chủ tịch UBND Xã',
  'Cán bộ Địa chính',
  'Cán bộ Nông nghiệp/Khuyến nông',
  'Cán bộ Kế toán',
  'Khác'
];

export default function GovRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    communeName: '',
    province: '',
    district: '',
    communeCode: '',
    population: '',
    totalArea: '',
    forestArea: '',
    representativeName: '',
    position: '',
    email: '',
    phone: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    authorizationLetter: null,
    agreeToTerms: false,
    agreeToDataSharing: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, authorizationLetter: e.target.files[0] });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToDataSharing) {
      alert('Vui lòng đồng ý với điều khoản và cam kết chia sẻ dữ liệu!');
      return;
    }

    // Save registration data
    sessionStorage.setItem('gov_registered_email', formData.email);
    sessionStorage.setItem('gov_pending_verification', 'true');
    
    navigate('/gov-portal/login?registered=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Portal Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>

      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-government-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA GOV PORTAL</h1>
          <p className="text-gray-600">Xã Nông Thôn Mới Số - Đăng ký tài khoản</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <i className="ri-check-line"></i> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>Thông tin Xã</span>
          <span>Người đại diện</span>
          <span>Xác nhận</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Organization Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Vui lòng điền thông tin chính xác về đơn vị hành chính của bạn.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Xã/Phường/Thị trấn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="communeName"
                  value={formData.communeName}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Xã Tu Mơ Rông"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn Tỉnh/TP</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Huyện/Quận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    placeholder="Ví dụ: Huyện Tu Mơ Rông"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã hành chính <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="communeCode"
                    value={formData.communeCode}
                    onChange={handleChange}
                    required
                    placeholder="Ví dụ: 030612"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dân số (người)
                  </label>
                  <input
                    type="number"
                    name="population"
                    value={formData.population}
                    onChange={handleChange}
                    placeholder="Ví dụ: 5000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng diện tích (ha)
                  </label>
                  <input
                    type="number"
                    name="totalArea"
                    value={formData.totalArea}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="Ví dụ: 2500.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diện tích rừng (ha)
                  </label>
                  <input
                    type="number"
                    name="forestArea"
                    value={formData.forestArea}
                    onChange={handleChange}
                    step="0.1"
                    placeholder="Ví dụ: 1500.2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Representative Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chức vụ <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn chức vụ</option>
                  {positions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên người đại diện <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email công vụ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@ubnd-xa.gov.vn"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    placeholder="0901234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số CMND/CCCD
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Ví dụ: 001234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Authorization */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quy trình xác thực</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-blue-600 mt-0.5"></i>
                    <span>Hồ sơ của bạn sẽ được xem xét bởi Ban Quản lý VITA Platform trong vòng 3-5 ngày làm việc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-blue-600 mt-0.5"></i>
                    <span>Sau khi được phê duyệt, bạn sẽ có quyền truy cập vào Dashboard quản trị số của Xã.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-blue-600 mt-0.5"></i>
                    <span>Dữ liệu sẽ được chia sẻ theo nguyên tắc minh bạch và bảo mật thông tin cá nhân.</span>
                  </li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giấy ủy quyền/Công văn xác nhận (nếu có)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.authorizationLetter && (
                  <p className="text-sm text-green-600 mt-2">
                    <i className="ri-check-line mr-1"></i>
                    Đã tải: {formData.authorizationLetter.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a> của VITA Platform
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToDataSharing"
                    checked={formData.agreeToDataSharing}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý chia sẻ dữ liệu tổng hợp (không có thông tin cá nhân) của Xã trên VITA Platform để phục vụ mục đích minh bạch hóa và phát triển nông thôn mới
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi đăng ký, bạn sẽ nhận được email xác nhận. Vui lòng kiểm tra email để theo dõi tiến trình phê duyệt.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Quay lại
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Tiếp tục
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                <i className="ri-check-line mr-2"></i>
                Hoàn tất đăng ký
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <button
              onClick={() => navigate('/gov-portal/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}




