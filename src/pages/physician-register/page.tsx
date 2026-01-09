import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PhysicianRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'physician',
    organizationName: '',
    specialty: '',
    representative: '',
    position: '',
    phone: '',
    email: '',
    currentNeeds: [] as string[],
    additionalInfo: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const specialtyOptions = [
    'Cơ xương khớp',
    'Tiêu hóa',
    'Thần kinh',
    'Tim mạch',
    'Hô hấp',
    'Da liễu',
    'Nội tiết',
    'Khác'
  ];

  const needsOptions = [
    'Tìm nguồn thuốc sạch, dược tính cao',
    'Cần hồ sơ đấu thầu cho BHYT',
    'Muốn nhận mẫu thử miễn phí',
    'Tư vấn bài thuốc phù hợp với dược liệu VITA',
    'Hợp tác nghiên cứu lâm sàng'
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
    const newNeeds = formData.currentNeeds.includes(value)
      ? formData.currentNeeds.filter(n => n !== value)
      : [...formData.currentNeeds, value];
    
    setFormData({
      ...formData,
      currentNeeds: newNeeds
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData({
      ...formData,
      phone: value
    });
  };

  const validateForm = () => {
    if (!formData.organizationName || !formData.specialty || !formData.representative || 
        !formData.position || !formData.phone || !formData.email) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc');
      return false;
    }
    if (formData.currentNeeds.length === 0) {
      alert('Vui lòng chọn ít nhất một nhu cầu hiện tại');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (formData.phone.length < 10) {
      alert('Số điện thoại phải có ít nhất 10 số');
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng Ký Mạng Lưới Thầy Thuốc VITA</h1>
              <p className="text-sm opacity-90">Bác sĩ & Bệnh viện Y học Cổ truyền</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Traditional%20Vietnamese%20medicine%20doctor%20examining%20patient%20with%20herbal%20medicine%20consultation%20in%20modern%20clean%20clinic%20environment%2C%20professional%20healthcare%20setting%20with%20medicinal%20herbs%20display%2C%20warm%20lighting%2C%20trust%20and%20care%20atmosphere%2C%20cultural%20heritage%20meets%20modern%20medicine&width=1920&height=800&seq=physician1&orientation=landscape"
            alt="Thầy thuốc Đông y"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            KHÔI PHỤC VỊ THẾ "NAM DƯỢC TRỊ NAM NHÂN"<br />
            KHI Y ĐỨC GẶP ĐƯỢC THUỐC HAY
          </h2>
          <p className="text-base sm:text-xl text-white/95 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Chấm dứt nỗi lo "Dược liệu rác". Hệ sinh thái Rừng Dược Sinh mang đến nguồn dược liệu chuẩn hóa VITA: Sạch, Dược tính cao, Minh bạch nguồn gốc để người thầy thuốc yên tâm cứu người.
          </p>
          <p className="text-sm sm:text-lg text-white/90 italic font-semibold">
            "Người thầy thuốc giỏi không thể thiếu vị thuốc hay. Đừng để dược liệu kém chất lượng làm lu mờ tài năng và tâm huyết của bạn."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Thực trạng */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            NỖI ĐAU CỦA NGƯỜI CẦM CÂN NẢY MỰC
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Là những chuyên gia nơi tuyến đầu điều trị, chúng tôi hiểu Quý vị đang đối mặt với những nghịch lý:
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-red-500">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-error-warning-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bắt Mạch Đúng, Kê Đơn Chuẩn Nhưng...</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bệnh không thuyên giảm. Nguyên nhân không nằm ở y thuật, mà nằm ở <strong className="text-red-600">"dược liệu rác"</strong> – loại dược liệu đã bị chiết xuất hết hoạt chất, chỉ còn lại xác xơ, hoặc tẩm ướp hóa chất bảo quản.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-orange-500">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-user-unfollow-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mất Uy Tín Oan Uổng</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bệnh nhân không khỏi bệnh quay sang nghi ngờ tay nghề của thầy thuốc. Uy tín được xây dựng cả đời có thể sụp đổ chỉ vì nguồn thuốc kém chất lượng.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 border-amber-500">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-file-forbid-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rào Cản Thanh Toán BHYT</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Muốn đưa thuốc tốt vào điều trị cho bệnh nhân có Bảo hiểm Y tế nhưng nguồn mua trôi nổi không có hóa đơn đỏ, không chứng minh được nguồn gốc xuất xứ để quyết toán.
              </p>
            </div>
          </div>
        </section>

        {/* Vai trò */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            VAI TRÒ CỦA THẦY THUỐC TRONG HỆ SINH THÁI
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <i className="ri-user-star-line text-white text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Người Thẩm Định Cuối Cùng</h3>
                <p className="text-sm sm:text-base text-teal-600">The Ultimate Validator</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-stethoscope-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Kiểm Định Qua Lâm Sàng</h4>
                    <p className="text-sm text-gray-700 mb-3">Clinical Verification</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Kết quả điều trị trên bệnh nhân là thước đo chính xác nhất cho chất lượng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Phản hồi về hiệu quả (tác dụng nhanh/chậm, mùi vị, màu sắc) là dữ liệu quý giá</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Giúp tối ưu hóa quy trình trồng trọt và thu hái</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Bảo Chứng Niềm Tin</h4>
                    <p className="text-sm text-gray-700 mb-3">Trust Builder</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Sự tin dùng của Bác sĩ, Lương y uy tín là "tem bảo hành" giá trị nhất</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Xây dựng thương hiệu dược liệu Việt trên nền tảng uy tín y đức</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Tạo cầu nối tin cậy giữa nông dân và bệnh nhân</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quyền lợi */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            QUYỀN LỢI ĐẶC BIỆT DÀNH CHO THÀNH VIÊN
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            3 giá trị cốt lõi khi tham gia hệ sinh thái
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quyền lợi 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-leaf-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nguồn Thuốc "Sạch" & An Toàn</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Chuẩn VITA:</p>
                    <p>Trồng dưới tán rừng, nói không với kích thích tăng trưởng</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">An toàn tuyệt đối:</p>
                    <p>Không tồn dư thuốc BVTV, an toàn cho người già, trẻ em, bệnh mãn tính</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nâng Cao Hiệu Quả & Uy Tín</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Dược tính cao (High Potency):</p>
                    <p>Thu hái đúng "thời điểm vàng", giữ hàm lượng hoạt chất cao nhất</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Hiệu quả thực tế:</p>
                    <p>Bệnh nhân phục hồi nhanh → Tiếng lành đồn xa → Tăng doanh thu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-file-shield-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Minh Bạch Pháp Lý - BHYT</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-green-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Hóa đơn đầy đủ:</p>
                    <p>Hóa đơn GTGT, hồ sơ công bố chất lượng, chứng nhận kiểm nghiệm</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-green-500 text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-semibold text-gray-800">Thanh toán BHYT:</p>
                    <p>Cơ sở pháp lý vững chắc để đấu thầu và chi trả Bảo hiểm Y tế</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mạng lưới */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            MẠNG LƯỚI THẦY THUỐC VITA
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            VITA Physician Network - Cộng đồng tinh hoa
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <i className="ri-hospital-line text-white text-2xl"></i>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Bệnh viện YHCT</h4>
                <p className="text-xs text-gray-600">Tuyến Trung ương & Tỉnh</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <i className="ri-building-2-line text-white text-2xl"></i>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Khoa YHCT</h4>
                <p className="text-xs text-gray-600">Tại bệnh viện đa khoa</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <i className="ri-home-heart-line text-white text-2xl"></i>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Phòng khám tư</h4>
                <p className="text-xs text-gray-600">YHCT uy tín</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <i className="ri-user-heart-line text-white text-2xl"></i>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Lương y, Bác sĩ</h4>
                <p className="text-xs text-gray-600">Tâm huyết với nghề</p>
              </div>
            </div>

            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-vip-crown-line text-teal-600 text-2xl"></i>
                Đặc quyền thành viên:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Được ưu tiên cung cấp các loại dược liệu quý hiếm hoặc mùa vụ</p>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Được truy cập dữ liệu truy xuất nguồn gốc (QR Code) để cho bệnh nhân xem trực tiếp</p>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Nhận mẫu thử miễn phí để đánh giá chất lượng trước khi đặt hàng số lượng lớn</p>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-star-fill text-teal-600 text-xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Tham gia Hội đồng Tư vấn Y khoa để đóng góp ý kiến cải tiến chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form đăng ký */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">FORM ĐĂNG KÝ THAM GIA MẠNG LƯỚI</h2>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              Cùng nhau bảo vệ uy tín của người thầy thuốc
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Loại hình */}
              <div className="bg-teal-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bạn là: *</h3>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all">
                    <input
                      type="radio"
                      name="userType"
                      value="physician"
                      checked={formData.userType === 'physician'}
                      onChange={handleChange}
                      className="w-5 h-5 text-teal-600 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Bác sĩ / Lương y (Phòng khám tư nhân)</p>
                      <p className="text-sm text-gray-600">Hành nghề độc lập hoặc phòng khám tư</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all">
                    <input
                      type="radio"
                      name="userType"
                      value="hospital"
                      checked={formData.userType === 'hospital'}
                      onChange={handleChange}
                      className="w-5 h-5 text-teal-600 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Đại diện Bệnh viện / Khoa YHCT</p>
                      <p className="text-sm text-gray-600">Bệnh viện công/tư, Khoa Y học Cổ truyền</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Thông tin chuyên môn */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin chuyên môn</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      {formData.userType === 'physician' ? 'Tên Phòng khám / Cơ sở hành nghề *' : 'Tên Bệnh viện / Khoa *'}
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      required
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder={formData.userType === 'physician' ? 'VD: Phòng khám Y học Cổ truyền Hòa Bình' : 'VD: Bệnh viện Y học Cổ truyền Trung ương'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Chuyên khoa sâu *
                    </label>
                    <select
                      name="specialty"
                      required
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Chọn chuyên khoa</option>
                      {specialtyOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Người liên hệ *
                      </label>
                      <input
                        type="text"
                        name="representative"
                        required
                        value={formData.representative}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: BS. Nguyễn Văn A"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: Giám đốc / Trưởng khoa"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Nhu cầu hiện tại */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Nhu cầu hiện tại *</h3>
                <p className="text-sm text-gray-600 mb-4">Chọn một hoặc nhiều nhu cầu:</p>
                
                <div className="space-y-3">
                  {needsOptions.map((option) => (
                    <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.currentNeeds.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 text-teal-600 mt-0.5"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Chia sẻ thêm về kinh nghiệm điều trị, loại dược liệu thường dùng, hoặc yêu cầu đặc biệt..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">Tối đa 500 ký tự</p>
              </div>

              {/* Liên hệ */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: 0912345678"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: email@clinic.vn"
                  />
                </div>
              </div>

              {/* Cam kết */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <i className="ri-heart-line text-2xl sm:text-3xl text-teal-600 flex-shrink-0"></i>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Cam kết từ GreenLight:</p>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      GreenLight hiểu rằng uy tín của người thầy thuốc được xây dựng cả đời. Chúng tôi cam kết bảo vệ uy tín đó bằng những sản phẩm tử tế nhất từ rừng già. Không bán rẻ tài nguyên rừng, chúng tôi bán giá trị của sự minh bạch và bền vững.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:shadow-xl transition-all whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Đăng Ký Tham Gia Mạng Lưới
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-teal-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Cảm ơn Quý vị đã tin tưởng. Đội ngũ GreenLight sẽ liên hệ với Quý vị trong vòng 24-48 giờ để trao đổi chi tiết và gửi mẫu thử miễn phí.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
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
