import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InvestorAboutPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    position: '',
    email: '',
    interest: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[350px] sm:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Modern%20technology%20data%20center%20with%20digital%20network%20visualization%20screens%20showing%20agricultural%20supply%20chain%20management%20system%20with%20green%20sustainable%20farming%20data%20analytics%20in%20professional%20corporate%20environment&width=1920&height=1080&seq=greenlight-hero-bg&orientation=landscape"
            alt="GreenLight Platform"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center py-8">
          <button 
            onClick={() => navigate('/')}
            className="mb-3 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all border border-white/40 whitespace-nowrap cursor-pointer inline-flex items-center text-sm"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Quay lại trang chủ
          </button>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            GREENLIGHT<br />
            <span className="text-emerald-300">KIẾN TRÚC SƯ HỆ SINH THÁI DƯỢC LIỆU SỐ</span>
          </h1>
          <p className="text-sm sm:text-base text-white/95 mb-4 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi không sở hữu rừng, chúng tôi sở hữu dữ liệu.<br className="hidden sm:block" />
            GreenLight là "hạ tầng mềm" kết nối nguồn lực, chuẩn hóa quy trình và khơi thông dòng chảy giá trị cho ngành dược liệu Việt Nam.
          </p>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold text-sm">
            <i className="ri-database-2-line mr-2"></i>
            Trung tâm Dữ liệu & Điều phối
          </div>
        </div>
      </section>

      {/* Vai trò Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Chúng Tôi Là Ai Trong "Lục Giác Kim Cương"?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              GreenLight đóng vai trò là <strong>Enabler (Người kiến tạo)</strong> và <strong>Facilitator (Người điều phối)</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-emerald-500">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Không Cạnh Tranh</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi không cạnh tranh với người trồng rừng hay doanh nghiệp dược. Chúng tôi là đối tác của tất cả.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-blue-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-links-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chất Keo Gắn Kết</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi là "mắt xích trung tâm" gắn kết các mảnh ghép rời rạc thành một khối thống nhất.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-purple-500">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-trophy-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ Mệnh Win-Win</h3>
              <p className="text-gray-600 leading-relaxed">
                Xây dựng sân chơi minh bạch, nơi mọi thành viên đều thắng nhờ tuân thủ luật chơi VITA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ba Chức Năng Cốt Lõi */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ba Chức Năng Cốt Lõi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              GreenLight vận hành hệ sinh thái thông qua 3 chức năng then chốt
            </p>
          </div>

          <div className="space-y-8">
            {/* Function 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-10 rounded-2xl border-2 border-emerald-200">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-database-2-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    1. Vận Hành Platform Dữ Liệu Quốc Gia (VITA Data Hub)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    GreenLight xây dựng và duy trì "Bộ não số" của dự án:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-map-pin-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Số hóa bản đồ vùng trồng:</strong>
                        <p className="text-gray-700">Quản lý hàng nghìn hecta rừng qua hệ thống GPS và bản đồ vệ tinh. Biết chính xác tọa độ nào trồng cây gì, tuổi đời bao nhiêu.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-time-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Dữ liệu thời gian thực (Real-time):</strong>
                        <p className="text-gray-700">Thu thập dữ liệu môi trường từ các trạm IoT (nhiệt độ, độ ẩm, lượng mưa) để cảnh báo rủi ro thiên tai, sâu bệnh cho nông dân.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-line-chart-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Dự báo chính xác:</strong>
                        <p className="text-gray-700">Sử dụng thuật toán để tính toán sản lượng thu hoạch dự kiến trong tương lai (Yield Prediction), giúp cân bằng cung cầu.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Function 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-10 rounded-2xl border-2 border-blue-200">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-star-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    2. Giám Sát & Chuẩn Hóa (Quality Control)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    GreenLight đóng vai trò là "Trọng tài" công tâm:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-file-list-3-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Thiết lập luật chơi:</strong>
                        <p className="text-gray-700">Ban hành và cập nhật Bộ tiêu chuẩn VITA dựa trên tham vấn của Hội đồng khoa học.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-eye-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Giám sát thực thi:</strong>
                        <p className="text-gray-700">Đội ngũ QC (Quality Control) và hệ thống giám sát chéo đảm bảo không một kg dược liệu bẩn nào lọt qua khe cửa hẹp.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-qr-code-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Minh bạch hóa:</strong>
                        <p className="text-gray-700">Cung cấp mã QR truy xuất nguồn gốc cho từng lô hàng, khiến mọi hành vi gian lận đều bị phơi bày.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Function 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 sm:p-10 rounded-2xl border-2 border-purple-200">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-store-3-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    3. Trung Tâm Thương Mại & Điều Phối (Commercial Hub)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    GreenLight là "Sàn giao dịch" tập trung:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-handshake-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Đại diện thương mại:</strong>
                        <p className="text-gray-700">Thay mặt hàng trăm HTX đàm phán các hợp đồng bao tiêu vĩ mô với các tập đoàn Dược phẩm trong và ngoài nước.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-truck-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Điều phối dòng hàng:</strong>
                        <p className="text-gray-700">Phân bổ chỉ tiêu sản xuất (Quota) về các địa phương sao cho khớp với nhu cầu thị trường, tránh tình trạng "được mùa mất giá".</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-money-dollar-circle-line text-white text-sm"></i>
                      </div>
                      <div>
                        <strong className="text-gray-900">Điều phối dòng tiền:</strong>
                        <p className="text-gray-700">Đảm bảo thanh toán nhanh chóng, minh bạch cho bà con nông dân và HTX thông qua hệ thống tài chính số.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lợi Ích Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lợi Ích Khi Đồng Hành Cùng GreenLight
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Đối tác B2B */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <i className="ri-building-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Đối với Đối tác (B2B Partners)</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="ri-check-line text-blue-600 text-xl mt-1"></i>
                  <div>
                    <strong className="text-gray-900">Giảm chi phí giao dịch:</strong>
                    <p className="text-gray-600">Không cần tốn nhân sự đi đàm phán với từng hộ dân.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-check-line text-blue-600 text-xl mt-1"></i>
                  <div>
                    <strong className="text-gray-900">An toàn thương hiệu:</strong>
                    <p className="text-gray-600">Được bảo vệ bởi hệ thống kiểm soát chất lượng VITA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhà Đầu Tư */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <i className="ri-funds-line text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Đối với Nhà Đầu Tư (Investors)</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="ri-check-line text-emerald-600 text-xl mt-1"></i>
                  <div>
                    <strong className="text-gray-900">Mô hình tăng trưởng bền vững:</strong>
                    <p className="text-gray-600">Doanh thu đến từ nhiều nguồn (Phí nền tảng, Hoa hồng thương mại, Dịch vụ tư vấn, Tín chỉ Carbon).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-check-line text-emerald-600 text-xl mt-1"></i>
                  <div>
                    <strong className="text-gray-900">Tiềm năng mở rộng (Scalability):</strong>
                    <p className="text-gray-600">Mô hình Platform dễ dàng nhân rộng ra nhiều tỉnh thành và nhiều loại cây trồng khác nhau mà không cần sở hữu tài sản nặng (Asset-light).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-check-line text-emerald-600 text-xl mt-1"></i>
                  <div>
                    <strong className="text-gray-900">Tác động xã hội (Impact Investing):</strong>
                    <p className="text-gray-600">Đầu tư vào GreenLight là đầu tư cho sinh kế của người nghèo, cho môi trường rừng và sức khỏe cộng đồng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tầm Nhìn Chiến Lược */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tầm Nhìn Chiến Lược</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lộ trình phát triển GreenLight từ Platform đến Unicorn
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border-l-4 border-emerald-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">1-2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ngắn hạn (1-2 năm)</h3>
                  <p className="text-gray-700">
                    Hoàn thiện Platform VITA 1.0, thiết lập vùng trồng mẫu 500ha tại Phú Thọ, Hòa Bình.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">3-5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trung hạn (3-5 năm)</h3>
                  <p className="text-gray-700">
                    Mở rộng quy mô lên 5.000 - 10.000ha, vận hành Sàn giao dịch dược liệu trực tuyến (Vietnam Herbal Exchange), thương mại hóa Tín chỉ Carbon rừng.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">5+</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dài hạn (5 năm+)</h3>
                  <p className="text-gray-700">
                    Đưa dược liệu Việt Nam xuất khẩu sang các thị trường khó tính (Âu, Mỹ, Nhật) và trở thành Unicorn (Kỳ lân) trong lĩnh vực Agritech/Herbal Tech.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Liên Hệ */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Liên Hệ Hợp Tác & Đầu Tư
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Chúng tôi chào đón các Quỹ đầu tư, Định chế tài chính và các Tập đoàn chiến lược cùng tham gia kiến tạo tương lai
            </p>
            <div className="mb-8">
              <a
                href="/investor-portal/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                <i className="ri-shield-star-line"></i>
                Truy cập Investor Portal (Private)
              </a>
              <p className="text-sm text-gray-500 mt-3">
                <i className="ri-lock-line mr-1"></i>
                Yêu cầu đăng nhập và NDA
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-map-pin-line text-emerald-600 text-xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Văn phòng</h4>
              <p className="text-sm text-gray-600">Hà Nội, Việt Nam</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-mail-line text-blue-600 text-xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Email</h4>
              <p className="text-sm text-gray-600">invest@greenlight-vita.vn</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-phone-line text-purple-600 text-xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Hotline</h4>
              <p className="text-sm text-gray-600">1900 xxxx</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Đăng ký nhận Bản cáo bạch & Hồ sơ năng lực (Pitch Deck)
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổ chức/Quỹ đầu tư <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    placeholder="Tên tổ chức"
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
                    placeholder="Giám đốc đầu tư"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email doanh nghiệp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung quan tâm <span className="text-red-500">*</span>
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">-- Chọn nội dung --</option>
                  <option value="equity">Đầu tư vốn cổ phần</option>
                  <option value="finance">Hợp tác tài chính</option>
                  <option value="green">Tài trợ dự án xanh</option>
                  <option value="strategic">Hợp tác chiến lược</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* Banner Cam Kết */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-l-4 border-emerald-500">
                <div className="flex items-start gap-3">
                  <i className="ri-heart-3-line text-emerald-600 text-2xl mt-1"></i>
                  <p className="text-gray-700 leading-relaxed italic">
                    <strong>Lời kết:</strong> Dược liệu Việt Nam là một "kho báu" đang ngủ quên. GreenLight chính là chiếc chìa khóa công nghệ để mở kho báu đó. Hãy cùng chúng tôi viết nên câu chuyện huyền thoại mới cho Nông nghiệp Việt Nam.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Gửi yêu cầu nhận tài liệu
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-600">
                Chúng tôi sẽ gửi Bản cáo bạch và Hồ sơ năng lực đến email của bạn trong vòng 24-48 giờ
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowModal(false);
                  navigate('/');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
              >
                Về trang chủ
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all whitespace-nowrap"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
