import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1: Basic Info
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  title: string; // TS./PGS./ThS./KS.
  specialization: string[];
  organization: string;
  yearsOfExperience: string;
  bio: string;
  
  // Step 2: Credentials
  degree: string;
  degreeFile: File | null;
  license: string;
  licenseFile: File | null;
  awards: string;
  awardsFiles: File[];
  publications: string[]; // Links to research papers
  
  // Step 3: Pricing & Availability
  consultationRate: string; // VNĐ/hour
  sopPricingEnabled: boolean;
  minSopPrice: string;
  availability: 'full-time' | 'part-time' | 'on-demand';
  preferredRegions: string[];
  
  // Step 4: Terms
  agreeToTerms: boolean;
  agreeToVetting: boolean;
}

const specializationOptions = [
  'Bệnh học cây sâm',
  'Dinh dưỡng đất',
  'Kỹ thuật lâm sinh',
  'Giống cây trồng',
  'Bảo vệ thực vật',
  'Hóa sinh dược liệu',
  'Quy trình canh tác (SOP)',
  'Phân tích chất lượng',
  'Quản lý rừng',
  'Khác'
];

const regionOptions = [
  'Tây Bắc',
  'Đông Bắc',
  'Đồng bằng sông Hồng',
  'Bắc Trung Bộ',
  'Tây Nguyên',
  'Nam Trung Bộ',
  'Đông Nam Bộ',
  'Đồng bằng sông Cửu Long'
];

export default function ExpertRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    title: '',
    specialization: [],
    organization: '',
    yearsOfExperience: '',
    bio: '',
    degree: '',
    degreeFile: null,
    license: '',
    licenseFile: null,
    awards: '',
    awardsFiles: [],
    publications: [],
    consultationRate: '',
    sopPricingEnabled: false,
    minSopPrice: '',
    availability: 'on-demand',
    preferredRegions: [],
    agreeToTerms: false,
    agreeToVetting: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreeToTerms' || name === 'agreeToVetting' || name === 'sopPricingEnabled') {
        setFormData({ ...formData, [name]: checked });
      } else if (name.startsWith('specialization_')) {
        const specValue = name.replace('specialization_', '');
        setFormData(prev => ({
          ...prev,
          specialization: checked
            ? [...prev.specialization, specValue]
            : prev.specialization.filter(s => s !== specValue)
        }));
      } else if (name.startsWith('region_')) {
        const regionValue = name.replace('region_', '');
        setFormData(prev => ({
          ...prev,
          preferredRegions: checked
            ? [...prev.preferredRegions, regionValue]
            : prev.preferredRegions.filter(r => r !== regionValue)
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'degreeFile' | 'licenseFile' | 'awardsFiles') => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === 'awardsFiles') {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
          ...prev,
          awardsFiles: [...prev.awardsFiles, ...files]
        }));
      } else {
        setFormData({ ...formData, [field]: e.target.files[0] });
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      awardsFiles: prev.awardsFiles.filter((_, i) => i !== index)
    }));
  };

  const handleAddPublication = () => {
    const link = prompt('Nhập link công trình nghiên cứu:');
    if (link) {
      setFormData(prev => ({
        ...prev,
        publications: [...prev.publications, link]
      }));
    }
  };

  const handleRemovePublication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      publications: prev.publications.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
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

    if (!formData.agreeToTerms || !formData.agreeToVetting) {
      alert('Vui lòng đồng ý với điều khoản và quy trình thẩm định!');
      return;
    }

    // Save registration data - Auto-verify immediately (skip approval)
    sessionStorage.setItem('expert_registered_email', formData.email);
    sessionStorage.setItem('expert_verified', 'true');
    sessionStorage.removeItem('expert_pending_verification');
    
    // Navigate to success page or login
    navigate('/expert-portal/login?registered=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900 flex items-center justify-center p-4">
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
          <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-user-star-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA EXPERT HUB</h1>
          <p className="text-gray-600">Đăng ký tài khoản Chuyên gia</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <i className="ri-check-line"></i> : step}
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>Thông tin cơ bản</span>
          <span>Chứng chỉ</span>
          <span>Định giá</span>
          <span>Xác nhận</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh xưng <span className="text-red-500">*</span>
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Chọn danh xưng</option>
                  <option value="TS.">Tiến sĩ (TS.)</option>
                  <option value="PGS.TS.">Phó Giáo sư - Tiến sĩ (PGS.TS.)</option>
                  <option value="ThS.">Thạc sĩ (ThS.)</option>
                  <option value="KS.">Kỹ sư (KS.)</option>
                  <option value="TSKH.">Tiến sĩ Khoa học (TSKH.)</option>
                </select>
              </div>

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
                  placeholder="Ví dụ: Nguyễn Văn Khoa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="example@research.vn"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đơn vị công tác <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Trung tâm Khoa học Dược liệu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số năm kinh nghiệm <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Ví dụ: 15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lĩnh vực chuyên môn <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-300 rounded-lg p-3">
                  {specializationOptions.map((spec) => (
                    <label key={spec} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`specialization_${spec}`}
                        checked={formData.specialization.includes(spec)}
                        onChange={handleChange}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiểu sử ngắn
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Giới thiệu về bản thân, thành tựu nổi bật..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 2: Credentials */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Vui lòng tải lên bản scan các chứng chỉ để Ban Cố vấn Khoa học của GreenLight thẩm định hồ sơ.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bằng cấp cao nhất <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Tiến sĩ Nông nghiệp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-2"
                />
                <label className="block text-sm text-gray-600 mb-2">Tải lên bản scan bằng cấp (PDF/JPG, max 5MB)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'degreeFile')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                {formData.degreeFile && (
                  <p className="text-sm text-green-600 mt-2">
                    <i className="ri-check-line mr-1"></i>
                    Đã tải: {formData.degreeFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chứng chỉ hành nghề (nếu có)
                </label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  placeholder="Ví dụ: Chứng chỉ hành nghề tư vấn nông nghiệp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-2"
                />
                <label className="block text-sm text-gray-600 mb-2">Tải lên bản scan (PDF/JPG, max 5MB)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'licenseFile')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                {formData.licenseFile && (
                  <p className="text-sm text-green-600 mt-2">
                    <i className="ri-check-line mr-1"></i>
                    Đã tải: {formData.licenseFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giải thưởng khoa học (nếu có)
                </label>
                <input
                  type="text"
                  name="awards"
                  value={formData.awards}
                  onChange={handleChange}
                  placeholder="Mô tả các giải thưởng"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-2"
                />
                <label className="block text-sm text-gray-600 mb-2">Tải lên giấy chứng nhận (PDF/JPG, tối đa 5 files)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => handleFileUpload(e, 'awardsFiles')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                {formData.awardsFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.awardsFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Công trình nghiên cứu đã công bố (Links)
                </label>
                <div className="space-y-2">
                  {formData.publications.map((pub, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <a href={pub} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-blue-600 hover:underline truncate">
                        {pub}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemovePublication(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPublication}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Thêm link công trình nghiên cứu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Availability */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức phí tư vấn 1-1 (VNĐ/giờ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="consultationRate"
                  value={formData.consultationRate}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Ví dụ: 500000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Bạn có thể thay đổi mức phí sau khi được xác thực</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sopPricingEnabled"
                    checked={formData.sopPricingEnabled}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Bán quy trình SOP (Kiến thức thụ động)</span>
                </label>
                {formData.sopPricingEnabled && (
                  <div className="mt-3">
                    <label className="block text-sm text-gray-600 mb-2">Giá tối thiểu cho 1 quy trình SOP (VNĐ)</label>
                    <input
                      type="number"
                      name="minSopPrice"
                      value={formData.minSopPrice}
                      onChange={handleChange}
                      min="0"
                      placeholder="Ví dụ: 5000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ sẵn sàng <span className="text-red-500">*</span>
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="on-demand">Theo yêu cầu (On-demand)</option>
                  <option value="part-time">Part-time (Một vài giờ/tuần)</option>
                  <option value="full-time">Full-time (Nhiều giờ/tuần)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vùng địa lý ưu tiên (có thể chọn nhiều)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-gray-300 rounded-lg p-3">
                  {regionOptions.map((region) => (
                    <label key={region} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`region_${region}`}
                        checked={formData.preferredRegions.includes(region)}
                        onChange={handleChange}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Terms & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quy trình thẩm định (Vetting Process)</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-pink-600 mt-0.5"></i>
                    <span>Ban Cố vấn Khoa học của GreenLight sẽ xem xét hồ sơ của bạn trong vòng 3-5 ngày làm việc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-pink-600 mt-0.5"></i>
                    <span>Nếu đạt yêu cầu, bạn sẽ nhận được tích xanh <strong>"Verified Expert"</strong> và có thể bắt đầu nhận booking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-pink-600 mt-0.5"></i>
                    <span>Trước khi được xác thực, bạn vẫn có thể truy cập hệ thống nhưng chưa thể nhận yêu cầu tư vấn.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với <a href="#" className="text-pink-600 hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-pink-600 hover:underline">Chính sách bảo mật</a> của VITA Platform
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToVetting"
                    checked={formData.agreeToVetting}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với quy trình thẩm định và hiểu rằng tài khoản của tôi sẽ được xem xét trước khi được phép nhận booking
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi đăng ký, bạn sẽ nhận được email xác nhận. Vui lòng kiểm tra email (kể cả thư mục spam) để theo dõi tiến trình thẩm định.
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

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg"
              >
                Tiếp tục
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg"
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
              onClick={() => navigate('/expert-portal/login')}
              className="text-pink-600 hover:underline font-medium"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}




