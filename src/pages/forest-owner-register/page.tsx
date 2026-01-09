import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Step = 1 | 2 | 3 | 4 | 5;
type Role = 'producer' | 'resource' | 'investor' | '';

interface FormData {
  phone: string;
  otp: string;
  role: Role;
  fullName: string;
  birthDate: string;
  idNumber: string;
  province: string;
  district: string;
  ward: string;
  experience?: string;
  landArea?: string;
  landStatus?: string;
  taxCode?: string;
  investmentBudget?: string;
  investmentType?: string;
  bankAccount?: string;
  bankName?: string;
  signature: string;
  agreedToTerms: boolean;
}

export default function ForestOwnerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    otp: '',
    role: '',
    fullName: '',
    birthDate: '',
    idNumber: '',
    province: '',
    district: '',
    ward: '',
    signature: '',
    agreedToTerms: false,
  });

  const handleBack = () => {
    if (step === 1) {
      navigate('/landing');
    } else {
      setStep((prev) => (prev - 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setStep((prev) => (prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleName = () => {
    switch (formData.role) {
      case 'producer': return 'Xã viên Sản xuất';
      case 'resource': return 'Xã viên Tài nguyên';
      case 'investor': return 'Xã viên Tài chính';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header - Compact Mobile */}
      <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 sticky top-0 z-10 shadow-lg">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="text-center flex-1 px-3">
              <h1 className="text-base font-bold leading-tight">Cổng Gia Nhập HTX VITA</h1>
              <p className="text-xs text-emerald-100 mt-0.5">Bắt đầu hành trình xanh</p>
            </div>
            <div className="w-10"></div>
          </div>
          
          {/* Progress Bar - Simplified */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-emerald-100 mt-1.5">Bước {step}/4</p>
        </div>
      </header>

      {/* Main Content - Optimized Spacing */}
      <main className="max-w-lg mx-auto px-4 py-4">
        {/* Step 1: Phone Verification */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Icon Hero - Compact */}
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="ri-seedling-line text-3xl text-white"></i>
              </div>
            </div>

            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Xác Thực Danh Tính</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Chào mừng bạn đến với Hệ sinh thái Rừng Dược Sinh. Hãy bắt đầu bằng số điện thoại của bạn.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                  />
                  <button className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all active:scale-95 whitespace-nowrap text-sm">
                    Gửi mã
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã xác thực OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  placeholder="Nhập 6 số"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base text-center tracking-widest font-semibold"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all active:scale-98 text-base"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* Step 2: Choose Role */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Chọn Hình Thức Gia Nhập</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bạn muốn tham gia Hợp tác xã với vai trò nào?
              </p>
            </div>

            {/* Role Cards - Stacked */}
            <div className="space-y-3">
              {/* Producer */}
              <button
                onClick={() => setFormData({ ...formData, role: 'producer' })}
                className={`w-full bg-white rounded-2xl p-4 transition-all active:scale-98 ${
                  formData.role === 'producer'
                    ? 'ring-2 ring-emerald-500 shadow-lg'
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-seedling-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900">TÔI CÓ SỨC & KỸ NĂNG</h3>
                      {formData.role === 'producer' && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-emerald-600 mb-1.5">Xã viên Sản xuất</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Dành cho Nông dân, Kỹ sư nông nghiệp muốn trực tiếp canh tác và nhận lương/khoán
                    </p>
                  </div>
                </div>
              </button>

              {/* Resource */}
              <button
                onClick={() => setFormData({ ...formData, role: 'resource' })}
                className={`w-full bg-white rounded-2xl p-4 transition-all active:scale-98 ${
                  formData.role === 'resource'
                    ? 'ring-2 ring-amber-500 shadow-lg'
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-landscape-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900">TÔI CÓ ĐẤT & RỪNG</h3>
                      {formData.role === 'resource' && (
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-amber-600 mb-1.5">Xã viên Tài nguyên</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Dành cho Chủ rừng, Chủ đất muốn góp tư liệu sản xuất và hưởng lợi từ Carbon/PFES
                    </p>
                  </div>
                </div>
              </button>

              {/* Investor */}
              <button
                onClick={() => setFormData({ ...formData, role: 'investor' })}
                className={`w-full bg-white rounded-2xl p-4 transition-all active:scale-98 ${
                  formData.role === 'investor'
                    ? 'ring-2 ring-yellow-500 shadow-lg'
                    : 'shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <i className="ri-hand-coin-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900">TÔI CÓ VỐN NHÀN RỖI</h3>
                      {formData.role === 'investor' && (
                        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-yellow-600 mb-1.5">Xã viên Tài chính</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Dành cho Cá nhân muốn góp vốn đầu tư vào các dự án trồng dược liệu và nhận cổ tức
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Action Button */}
            <button
              onClick={handleNext}
              disabled={!formData.role}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-base"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* Step 3: Information Form */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Khai Báo Thông Tin</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vai trò: <span className="font-semibold text-emerald-600">{getRoleName()}</span>
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              {/* Common Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số CCCD/CMND <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="001234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                />
              </div>

              {/* Address Fields - Stacked */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base bg-white"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  <option value="kontum">Kon Tum</option>
                  <option value="quangnam">Quảng Nam</option>
                  <option value="daklak">Đắk Lắk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base bg-white"
                >
                  <option value="">Chọn quận/huyện</option>
                  <option value="ngochinh">Ngọc Hồi</option>
                  <option value="dakglei">Đắk Glei</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base bg-white"
                >
                  <option value="">Chọn phường/xã</option>
                  <option value="pleicanh">Plei Cảnh</option>
                  <option value="dakmo">Đắk Mô</option>
                </select>
              </div>

              {/* Role-specific Fields */}
              {formData.role === 'producer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kinh nghiệm canh tác <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'none', label: 'Chưa có kinh nghiệm (Cần đào tạo)' },
                      { value: 'basic', label: 'Đã từng trồng lúa/màu' },
                      { value: 'expert', label: 'Chuyên gia dược liệu (>3 năm)' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                          formData.experience === option.value
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-300 hover:border-emerald-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option.value}
                          checked={formData.experience === option.value}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="mt-0.5 w-5 h-5 text-emerald-600 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {formData.role === 'resource' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tổng diện tích đất (ha) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.landArea}
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                      placeholder="Ví dụ: 5.5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hiện trạng đất <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'empty', label: 'Đất trống đồi trọc' },
                        { value: 'natural', label: 'Rừng tự nhiên' },
                        { value: 'planted', label: 'Rừng trồng keo/bạch đàn' }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                            formData.landStatus === option.value
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-300 hover:border-amber-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="landStatus"
                            value={option.value}
                            checked={formData.landStatus === option.value}
                            onChange={(e) => setFormData({ ...formData, landStatus: e.target.value })}
                            className="mt-0.5 w-5 h-5 text-amber-600 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <div className="flex gap-2">
                      <i className="ri-information-line text-blue-600 text-lg flex-shrink-0 mt-0.5"></i>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        Bạn có thể tải lên Sổ đỏ/Sổ xanh sau khi được duyệt
                      </p>
                    </div>
                  </div>
                </>
              )}

              {formData.role === 'investor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã số thuế cá nhân
                    </label>
                    <input
                      type="text"
                      value={formData.taxCode}
                      onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
                      placeholder="0123456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngân sách dự kiến đầu tư <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'small', label: '< 50 triệu VNĐ' },
                        { value: 'medium', label: '50 - 200 triệu VNĐ' },
                        { value: 'large', label: '> 500 triệu VNĐ' }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                            formData.investmentBudget === option.value
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-300 hover:border-yellow-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="investmentBudget"
                            value={option.value}
                            checked={formData.investmentBudget === option.value}
                            onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                            className="mt-0.5 w-5 h-5 text-yellow-600 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mong muốn đầu tư vào <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'longterm', label: 'Sâm Ngọc Linh (Lợi nhuận cao, dài hạn)' },
                        { value: 'shortterm', label: 'Cây ngắn ngày (Thu hồi vốn nhanh)' }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                            formData.investmentType === option.value
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-300 hover:border-yellow-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="investmentType"
                            value={option.value}
                            checked={formData.investmentType === option.value}
                            onChange={(e) => setFormData({ ...formData, investmentType: e.target.value })}
                            className="mt-0.5 w-5 h-5 text-yellow-600 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tài khoản ngân hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      placeholder="0123456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngân hàng <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base bg-white"
                    >
                      <option value="">Chọn ngân hàng</option>
                      <option value="vietcombank">Vietcombank</option>
                      <option value="techcombank">Techcombank</option>
                      <option value="vcb">VCB</option>
                      <option value="bidv">BIDV</option>
                      <option value="agribank">Agribank</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all active:scale-98 text-base"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {/* Step 4: E-Signature */}
        {step === 4 && (
          <div className="space-y-4">
            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Ký Hợp Đồng Điện Tử</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vui lòng đọc và đồng ý với Điều lệ Hợp tác xã
              </p>
            </div>

            {/* Terms Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Điều lệ Hợp tác xã VITA</h3>
                <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed space-y-3 border border-gray-200">
                  <p><strong>Điều 1: Quyền lợi của xã viên</strong></p>
                  <p>- Được hưởng lợi nhuận theo tỷ lệ góp vốn/đất/sức lao động</p>
                  <p>- Được tham gia biểu quyết các quyết định quan trọng</p>
                  <p>- Được đào tạo kỹ thuật miễn phí</p>
                  
                  <p><strong>Điều 2: Nghĩa vụ của xã viên</strong></p>
                  <p>- Tuân thủ quy trình kỹ thuật do HTX quy định</p>
                  <p>- Tham gia đầy đủ các hoạt động tập thể</p>
                  <p>- Bảo vệ tài sản chung của HTX</p>
                  
                  <p><strong>Điều 3: Cơ chế chia sẻ lợi nhuận</strong></p>
                  <p>- Xã viên góp vốn: 12-20%/năm</p>
                  <p>- Xã viên góp đất: 30% doanh thu + PFES + Carbon</p>
                  <p>- Xã viên sản xuất: Lương + Thưởng theo năng suất</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-1 w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-2 focus:ring-emerald-500 flex-shrink-0"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  Tôi đã đọc và đồng ý tuân thủ Điều lệ Hợp tác xã VITA và các quy định liên quan
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chữ ký điện tử <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                    placeholder="Nhập họ tên của bạn"
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xl text-center"
                    style={{ fontFamily: 'cursive' }}
                  />
                  <i className="ri-quill-pen-line absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400"></i>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Chữ ký của bạn sẽ có giá trị pháp lý</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSubmit}
              disabled={!formData.agreedToTerms || !formData.signature}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-base"
            >
              Hoàn Tất Đăng Ký
            </button>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="space-y-4">
            {/* Success Icon */}
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <i className="ri-check-line text-4xl text-white"></i>
              </div>
            </div>

            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 text-center space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Đã Gửi Hồ Sơ Thành Công!</h2>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Cảm ơn bạn <strong>{formData.fullName}</strong> đã nộp đơn gia nhập VITA Coop.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  Hồ sơ <strong className="text-emerald-600">{getRoleName()}</strong> của bạn đã được chuyển đến Ban Quản Trị. 
                  Chúng tôi sẽ liên hệ xác minh thực địa trong vòng <strong>48 giờ</strong> tới.
                </p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trong lúc chờ đợi, hãy khám phá các dự án tiềm năng của chúng tôi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/coop-marketplace')}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all active:scale-98 text-base"
              >
                Khám Phá Dự Án
              </button>
              <button
                onClick={() => navigate('/landing')}
                className="w-full py-4 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all active:scale-98 text-base"
              >
                Về Trang Chủ
              </button>
            </div>

            {/* Support Info */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 text-center">Cần hỗ trợ?</h3>
              <div className="space-y-2">
                <a
                  href="tel:0123456789"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors active:scale-98"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-white text-lg"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-600">Hotline</p>
                    <p className="text-sm font-semibold text-gray-900">0123 456 789</p>
                  </div>
                </a>
                <a
                  href="mailto:support@vita.vn"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors active:scale-98"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-white text-lg"></i>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-semibold text-gray-900">support@vita.vn</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Safe Area */}
      <div className="h-6"></div>
    </div>
  );
}
