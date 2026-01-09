import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CooperativeRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cooperativeName: '',
    establishedYear: '',
    memberCount: '',
    totalForestArea: '',
    location: '',
    representative: '',
    position: '',
    phone: '',
    email: '',
    currentActivities: '',
    interests: [] as string[],
    additionalInfo: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const interestOptions = [
    'Tham gia chuỗi cung ứng VITA',
    'Nhận hỗ trợ kỹ thuật và đào tạo',
    'Mở rộng quy mô sản xuất',
    'Kết nối thị trường tiêu thụ',
    'Nâng cao năng lực quản lý HTX'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (value: string) => {
    const newInterests = formData.interests.includes(value)
      ? formData.interests.filter(i => i !== value)
      : [...formData.interests, value];
    
    setFormData({
      ...formData,
      interests: newInterests
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng Ký Hợp Tác Xã</h1>
              <p className="text-sm opacity-90">Tham gia Hệ sinh thái Rừng Dược Sinh</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Vietnamese%20cooperative%20farmers%20working%20together%20in%20medicinal%20plant%20forest%2C%20community%20collaboration%20harvesting%20herbs%20under%20tree%20canopy%2C%20teamwork%20in%20sustainable%20agriculture%2C%20traditional%20Vietnamese%20farming%20community%2C%20natural%20forest%20environment%20with%20organized%20cultivation%20areas%2C%20cooperative%20spirit&width=1920&height=800&seq=coop1&orientation=landscape"
            alt="Hợp Tác Xã"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            CÙNG NHAU PHÁT TRIỂN<br />CÙNG NHAU THỊNH VƯỢNG
          </h2>
          <p className="text-base sm:text-xl text-white/95 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Tham gia mạng lưới Hợp tác xã Rừng Dược Sinh - Nâng cao năng lực quản lý, mở rộng thị trường, tạo thu nhập bền vững cho thành viên.
          </p>
          <p className="text-sm sm:text-lg text-white/90 italic font-semibold">
            "Đoàn kết - Hợp tác - Phát triển"
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Lợi ích */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            LỢI ÍCH KHI THAM GIA
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shopping-bag-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Thị trường đầu ra</h3>
              <p className="text-sm text-gray-600">
                Kết nối trực tiếp với doanh nghiệp, bao tiêu sản phẩm với giá ổn định
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-graduation-cap-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Đào tạo chuyên sâu</h3>
              <p className="text-sm text-gray-600">
                Nâng cao năng lực quản lý HTX và kỹ thuật canh tác dược liệu
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-seedling-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cây giống chất lượng</h3>
              <p className="text-sm text-gray-600">
                Cung cấp cây giống F1 đã kiểm định, đảm bảo năng suất cao
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chứng nhận VITA</h3>
              <p className="text-sm text-gray-600">
                Sản phẩm được chứng nhận theo tiêu chuẩn VITA, nâng cao giá trị
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-line-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hỗ trợ tài chính</h3>
              <p className="text-sm text-gray-600">
                Kết nối nguồn vốn ưu đãi, hỗ trợ mở rộng sản xuất
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-global-line text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mạng lưới rộng</h3>
              <p className="text-sm text-gray-600">
                Tham gia mạng lưới HTX toàn quốc, chia sẻ kinh nghiệm
              </p>
            </div>
          </div>
        </section>

        {/* Form đăng ký */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              FORM ĐĂNG KÝ THAM GIA
            </h2>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              Điền thông tin để chúng tôi liên hệ tư vấn chi tiết
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thông tin HTX */}
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin Hợp tác xã</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Tên Hợp tác xã *
                    </label>
                    <input
                      type="text"
                      name="cooperativeName"
                      required
                      value={formData.cooperativeName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="VD: HTX Lâm nghiệp ABC"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Năm thành lập *
                      </label>
                      <input
                        type="number"
                        name="establishedYear"
                        required
                        min="1990"
                        max={new Date().getFullYear()}
                        value={formData.establishedYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: 2015"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Số thành viên *
                      </label>
                      <input
                        type="number"
                        name="memberCount"
                        required
                        min="1"
                        value={formData.memberCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: 50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Tổng diện tích (ha) *
                      </label>
                      <input
                        type="number"
                        name="totalForestArea"
                        required
                        min="1"
                        step="0.1"
                        value={formData.totalForestArea}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: 100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Địa chỉ trụ sở *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="VD: Xã ABC, Huyện XYZ, Tỉnh..."
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin người đại diện */}
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin người đại diện</h3>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="representative"
                        required
                        value={formData.representative}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Chức vụ *
                      </label>
                      <input
                        type="text"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: Chủ tịch HTX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: 0912345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: email@htx.vn"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hoạt động hiện tại */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                  Hoạt động sản xuất hiện tại *
                </label>
                <textarea
                  name="currentActivities"
                  required
                  value={formData.currentActivities}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="VD: Trồng cây lâm nghiệp, khai thác gỗ, trồng cây ăn quả..."
                ></textarea>
              </div>

              {/* Quan tâm */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  HTX quan tâm đến *
                </label>
                <div className="space-y-3">
                  {interestOptions.map((option) => (
                    <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-amber-300 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 text-amber-600 mt-0.5"
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Thông tin bổ sung */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                  Thông tin bổ sung
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Chia sẻ thêm về thế mạnh, khó khăn hiện tại, mong muốn hợp tác..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">Tối đa 500 ký tự</p>
              </div>

              {/* Cam kết */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <i className="ri-hand-heart-line text-2xl sm:text-3xl text-amber-600 flex-shrink-0"></i>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Cam kết từ GreenLight</p>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Chúng tôi cam kết đồng hành cùng HTX trong việc nâng cao năng lực quản lý, mở rộng thị trường và tạo thu nhập bền vững cho thành viên. Cùng nhau xây dựng chuỗi giá trị dược liệu minh bạch và bền vững.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:shadow-xl transition-all whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Đăng Ký Ngay
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-amber-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Cảm ơn HTX đã đăng ký. Đội ngũ GreenLight sẽ liên hệ với bạn trong vòng 24-48 giờ để tư vấn chi tiết về cơ hội hợp tác.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
                >
                  Về trang chủ
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all whitespace-nowrap"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
