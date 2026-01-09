import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1: Profile Info
  creatorType: 'kol-expert' | 'kol-lifestyle' | 'koc-local' | 'other';
  fullName: string;
  stageName: string; // Tên hiển thị/nghệ danh
  email: string;
  phone: string;
  bio: string;
  
  // Step 2: Social Media & Content
  platforms: {
    tiktok: string;
    facebook: string;
    instagram: string;
    youtube: string;
    zalo: string;
  };
  followerCount: string;
  avgViews: string;
  contentCategories: string[]; // Dược liệu, Nông nghiệp, Sống xanh, etc.
  sampleContentLinks: string[]; // Links bài viết/video mẫu
  
  // Step 3: Verification
  idNumber: string;
  idPhoto: File | null;
  profilePhoto: File | null;
  agreeToTerms: boolean;
  agreeToContentGuidelines: boolean;
}

const creatorTypes = [
  { value: 'kol-expert', label: 'KOL Chuyên gia (Bác sĩ, Dược sĩ, Chuyên gia dinh dưỡng)', icon: 'ri-stethoscope-line' },
  { value: 'kol-lifestyle', label: 'KOL Lifestyle (Sống xanh, ESG Influencers)', icon: 'ri-leaf-line' },
  { value: 'koc-local', label: 'KOC Địa phương (Nông dân, Xã viên trẻ)', icon: 'ri-user-3-line' },
  { value: 'other', label: 'Khác (Creator tự do)', icon: 'ri-user-star-line' },
];

const contentCategories = [
  'Dược liệu & Sức khỏe',
  'Nông nghiệp bền vững',
  'Sống xanh & ESG',
  'Review sản phẩm',
  'Vlog trải nghiệm',
  'Giáo dục & Kiến thức',
  'Kinh doanh & Đầu tư',
];

export default function CreatorRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    creatorType: 'kol-expert',
    fullName: '',
    stageName: '',
    email: '',
    phone: '',
    bio: '',
    platforms: {
      tiktok: '',
      facebook: '',
      instagram: '',
      youtube: '',
      zalo: '',
    },
    followerCount: '',
    avgViews: '',
    contentCategories: [],
    sampleContentLinks: [],
    idNumber: '',
    idPhoto: null,
    profilePhoto: null,
    agreeToTerms: false,
    agreeToContentGuidelines: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith('platforms.')) {
        const platform = name.split('.')[1];
        setFormData({
          ...formData,
          platforms: { ...formData.platforms, [platform]: checked ? value : '' },
        });
      } else if (name === 'contentCategories') {
        const category = value;
        setFormData({
          ...formData,
          contentCategories: checked
            ? [...formData.contentCategories, category]
            : formData.contentCategories.filter(c => c !== category),
        });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      if (name.startsWith('platforms.')) {
        const platform = name.split('.')[1];
        setFormData({
          ...formData,
          platforms: { ...formData.platforms, [platform]: value },
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'idPhoto' | 'profilePhoto') => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleAddSampleLink = () => {
    const link = prompt('Nhập link bài viết/video mẫu:');
    if (link) {
      setFormData({
        ...formData,
        sampleContentLinks: [...formData.sampleContentLinks, link],
      });
    }
  };

  const handleRemoveSampleLink = (index: number) => {
    setFormData({
      ...formData,
      sampleContentLinks: formData.sampleContentLinks.filter((_, i) => i !== index),
    });
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

    if (!formData.agreeToTerms || !formData.agreeToContentGuidelines) {
      alert('Vui lòng đồng ý với điều khoản và quy định nội dung!');
      return;
    }

    // Save registration data
    sessionStorage.setItem('creator_registered_email', formData.email);
    sessionStorage.setItem('creator_pending_verification', 'true');

    navigate('/creator-hub/login?registered=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4">
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-video-add-line text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA CREATOR HUB</h1>
          <p className="text-gray-600">Cổng Đối tác Sáng tạo Nội dung & Tiếp thị Liên kết</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <i className="ri-check-line"></i> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>Thông tin cá nhân</span>
          <span>Social Media</span>
          <span>Xác minh</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Profile Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-800">
                  <i className="ri-information-line mr-2"></i>
                  Vui lòng chọn loại Creator phù hợp với bạn nhất.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Loại Creator <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {creatorTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                        formData.creatorType === type.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="creatorType"
                        value={type.value}
                        checked={formData.creatorType === type.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex items-start gap-3">
                        <i className={`${type.icon} text-2xl text-purple-600 mt-1`}></i>
                        <span className="text-sm font-medium text-gray-700">{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên hiển thị/Nghệ danh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="stageName"
                    value={formData.stageName}
                    onChange={handleChange}
                    required
                    placeholder="Dr. Healthy"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
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
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới thiệu bản thân (Bio)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Mô tả ngắn gọn về bạn, chuyên môn, và phong cách nội dung..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 2: Social Media & Content */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tài khoản Social Media
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'tiktok', label: 'TikTok', icon: 'ri-tiktok-line' },
                    { key: 'facebook', label: 'Facebook', icon: 'ri-facebook-line' },
                    { key: 'instagram', label: 'Instagram', icon: 'ri-instagram-line' },
                    { key: 'youtube', label: 'YouTube', icon: 'ri-youtube-line' },
                    { key: 'zalo', label: 'Zalo', icon: 'ri-messenger-line' },
                  ].map((platform) => (
                    <div key={platform.key}>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <i className={platform.icon}></i>
                        {platform.label}
                      </label>
                      <input
                        type="text"
                        name={`platforms.${platform.key}`}
                        value={formData.platforms[platform.key as keyof typeof formData.platforms]}
                        onChange={handleChange}
                        placeholder={`@username hoặc link ${platform.label}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng số Followers (ước tính)
                  </label>
                  <input
                    type="text"
                    name="followerCount"
                    value={formData.followerCount}
                    onChange={handleChange}
                    placeholder="Ví dụ: 100K, 500K"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lượt xem trung bình/Video
                  </label>
                  <input
                    type="text"
                    name="avgViews"
                    value={formData.avgViews}
                    onChange={handleChange}
                    placeholder="Ví dụ: 10K, 50K"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chủ đề nội dung bạn thường làm
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {contentCategories.map((category) => (
                    <label
                      key={category}
                      className={`cursor-pointer border-2 rounded-lg p-3 text-sm transition-all ${
                        formData.contentCategories.includes(category)
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="contentCategories"
                        value={category}
                        checked={formData.contentCategories.includes(category)}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link bài viết/Video mẫu (tối đa 5)
                </label>
                <div className="space-y-2 mb-2">
                  {formData.sampleContentLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="flex-1 text-sm text-gray-600 truncate">{link}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSampleLink(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
                {formData.sampleContentLinks.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddSampleLink}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all text-sm"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Thêm link mẫu
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quy trình xác minh</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-purple-600 mt-0.5"></i>
                    <span>Hồ sơ của bạn sẽ được Ban Quản lý VITA Creator Hub xem xét trong vòng 3-5 ngày làm việc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-purple-600 mt-0.5"></i>
                    <span>Sau khi được phê duyệt, bạn sẽ có quyền truy cập vào các công cụ sáng tạo nội dung và tham gia các chiến dịch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-purple-600 mt-0.5"></i>
                    <span>Bạn sẽ nhận được link Affiliate và quyền truy cập vào Kho Tài nguyên Số sau khi được duyệt.</span>
                  </li>
                </ul>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh CMND/CCCD (nếu có)
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'idPhoto')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.idPhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="ri-check-line mr-1"></i>
                      Đã tải: {formData.idPhoto.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh đại diện
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'profilePhoto')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {formData.profilePhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="ri-check-line mr-1"></i>
                      Đã tải: {formData.profilePhoto.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với <a href="#" className="text-purple-600 hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-purple-600 hover:underline">Chính sách bảo mật</a> của VITA Creator Hub
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToContentGuidelines"
                    checked={formData.agreeToContentGuidelines}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi cam kết tuân thủ <a href="#" className="text-purple-600 hover:underline">Quy định nội dung</a> và chỉ sử dụng dữ liệu đã được VITA cấp phép
                  </span>
                </label>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-800">
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
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                Tiếp tục
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
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
              onClick={() => navigate('/creator-hub/login')}
              className="text-purple-600 hover:underline font-medium"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}




