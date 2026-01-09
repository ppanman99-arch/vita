import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnterpriseRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'manufacturer',
    companyName: '',
    medicinalType: '',
    annualVolume: '',
    specialRequirements: '',
    contactName: '',
    position: '',
    phone: '',
    email: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const medicinalProducts = [
    {
      category: 'Nhóm Sâm & Bồi bổ',
      items: ['Ba Kích Tím', 'Ba Kích Trắng', 'Sâm Cau', 'Đẳng Sâm'],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20medicinal%20ginseng%20roots%20and%20tonic%20herbs%20collection%20on%20simple%20white%20background%2C%20high%20quality%20natural%20products%2C%20clean%20professional%20product%20photography%2C%20traditional%20medicine%20ingredients&width=400&height=300&seq=ginseng1&orientation=landscape'
    },
    {
      category: 'Nhóm Thảo dược dưới tán',
      items: ['Khôi Nhung', 'Sa Nhân Tím', 'Thảo Quả', 'Hoàng Tinh'],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20forest%20medicinal%20herbs%20growing%20under%20tree%20canopy%2C%20natural%20herbal%20plants%2C%20clean%20simple%20background%2C%20professional%20botanical%20photography%2C%20traditional%20medicine%20plants&width=400&height=300&seq=herbs1&orientation=landscape'
    },
    {
      category: 'Nhóm Tinh dầu & Khác',
      items: ['Quế', 'Hồi', 'Hòe', 'Gừng rừng'],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20essential%20oil%20plants%20cinnamon%20star%20anise%20on%20simple%20white%20background%2C%20aromatic%20herbs%20and%20spices%2C%20clean%20professional%20product%20photography%2C%20natural%20ingredients&width=400&height=300&seq=essential1&orientation=landscape'
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng Ký Thu Mua / Bao Tiêu</h1>
              <p className="text-sm opacity-90">Dành cho Doanh nghiệp & Đối tác</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Modern%20pharmaceutical%20factory%20processing%20medicinal%20herbs%20with%20quality%20control%20laboratory%2C%20clean%20professional%20industrial%20facility%2C%20high-tech%20production%20line%2C%20simple%20clean%20background%2C%20business%20partnership%20concept%2C%20professional%20corporate%20photography&width=1920&height=800&seq=enterprise1&orientation=landscape"
            alt="Doanh nghiệp Dược"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            CHẤM DỨT KHỦNG HOẢNG NGUYÊN LIỆU<br />SỞ HỮU CHUỖI CUNG ỨNG "SẠCH" VÀ ỔN ĐỊNH
          </h2>
          <p className="text-base sm:text-xl text-white/95 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            Kết nối trực tiếp với vùng trồng quy mô lớn được chuẩn hóa theo tiêu chuẩn VITA. Minh bạch nguồn gốc, đảm bảo hoạt chất, đầy đủ pháp lý.
          </p>
          <p className="text-sm sm:text-lg text-white/90 italic mb-6 sm:mb-8">
            GreenLight cung cấp giải pháp thu mua "Một cửa" (One-stop shop), thay thế việc thu gom manh mún đầy rủi ro.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Nỗi đau của doanh nghiệp */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            THẤU HIỂU "NỖI ĐAU" CỦA DOANH NGHIỆP DƯỢC
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base max-w-3xl mx-auto">
            Chúng tôi hiểu rằng, dù thị trường dược liệu Việt Nam trị giá hàng tỷ USD, các Nhà máy Dược và Công ty TPCN vẫn đang đối mặt với những thách thức sống còn:
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-alert-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chất lượng thả nổi</h3>
              <p className="text-sm text-gray-600 mb-3">
                <strong className="text-red-600">Quality Crisis:</strong> 80% nguyên liệu phải nhập khẩu hoặc thu mua trôi nổi.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Dược liệu rác (đã chiết hết hoạt chất)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-red-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Dư lượng thuốc BVTV vượt ngưỡng</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-links-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nguồn cung đứt gãy</h3>
              <p className="text-sm text-gray-600 mb-3">
                Sản lượng trong nước manh mún, không đồng đều.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-amber-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Doanh nghiệp luôn trong trạng thái bị động</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-amber-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Khó lên kế hoạch sản xuất dài hạn</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-file-warning-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rủi ro pháp lý & Chi phí ẩn</h3>
              <p className="text-sm text-gray-600 mb-3">
                Mua của nông dân lẻ tẻ thường không có hóa đơn chứng từ.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-purple-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Tốn kém chi phí kiểm định (test mẫu)</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-close-circle-fill text-purple-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Phải tiêu hủy hàng kém chất lượng</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Giải pháp */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            GIẢI PHÁP TỪ HỆ SINH THÁI RỪNG DƯỢC SINH
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base max-w-3xl mx-auto">
            GreenLight không chỉ bán nông sản, chúng tôi cung cấp <strong>"Sự an tâm tuyệt đối"</strong> thông qua mô hình quản trị chuỗi cung ứng hiện đại:
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Giải pháp 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-building-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Một Đầu Mối Duy Nhất</h3>
              <p className="text-sm font-semibold text-blue-700 mb-3">Centralized B2B Hub</p>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Thay vì quản lý hàng trăm nhà cung cấp nhỏ lẻ, chỉ cần ký hợp đồng với <strong>GreenLight</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Chịu trách nhiệm pháp lý, xuất hóa đơn VAT đầy đủ</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Cung cấp hồ sơ nguồn gốc (CO) và phiếu kiểm nghiệm (CQ/COA)</span>
                </div>
              </div>
            </div>

            {/* Giải pháp 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tiêu Chuẩn VITA</h3>
              <p className="text-sm font-semibold text-emerald-700 mb-3">Bảo Chứng Chất Lượng</p>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span><strong>V (Vitality):</strong> Hàm lượng hoạt chất đạt chuẩn Dược điển Việt Nam V</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Trồng dưới tán rừng, nói không với hóa chất</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span><strong>T (Trust):</strong> Truy xuất nguồn gốc bằng QR Code</span>
                </div>
              </div>
            </div>

            {/* Giải pháp 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-calendar-check-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chủ Động Kế Hoạch</h3>
              <p className="text-sm font-semibold text-teal-700 mb-3">Just-in-Time Production</p>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Xem dữ liệu dự báo sản lượng trước cả năm</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Đặt hàng trước (Pre-order) đảm bảo nguyên liệu đúng lúc</span>
                </div>
                <div className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Tối ưu chi phí lưu kho</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quyền lợi đối tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            QUYỀN LỢI CỦA ĐỐI TÁC CHIẾN LƯỢC
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 sm:p-8">
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Khi trở thành đối tác bao tiêu của Hệ sinh thái Rừng Dược Sinh:
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-award-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Lợi thế cạnh tranh độc quyền</h3>
                  <p className="text-sm text-gray-600">
                    Được quyền sử dụng nhãn hiệu chứng nhận <strong className="text-blue-600">"VITA Standard"</strong> trên bao bì sản phẩm cuối. Đây là lợi thế cực lớn khi marketing sản phẩm "Thuận tự nhiên" hoặc đấu thầu vào hệ thống bệnh viện/Bảo hiểm Y tế.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Thiết kế vùng trồng riêng</h3>
                  <p className="text-sm text-gray-600">
                    <strong className="text-emerald-600">Customized Zone:</strong> Với các đơn hàng lớn và dài hạn, GreenLight sẵn sàng quy hoạch vùng trồng riêng theo tiêu chuẩn kỹ thuật đặc thù mà Doanh nghiệp yêu cầu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-line-chart-line text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Ổn định giá</h3>
                  <p className="text-sm text-gray-600">
                    <strong className="text-teal-600">Futures Contract:</strong> Ký kết hợp đồng tương lai giúp chốt giá nguyên liệu đầu vào, tránh biến động giá thị trường.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cơ chế hợp tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            CƠ CHẾ HỢP TÁC & VẬN HÀNH
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Hệ thống hoạt động dựa trên cơ chế <strong>Matching (Kết nối tự động)</strong> minh bạch:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Gửi Yêu Cầu</h3>
              <p className="text-sm text-gray-600 text-center">
                Doanh nghiệp đăng ký nhu cầu lên Cổng thông tin (Loại dược liệu, chỉ tiêu hoạt chất, quy cách, số lượng, thời gian).
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Khớp Lệnh & Đề Xuất</h3>
              <p className="text-sm text-gray-600 text-center">
                Hệ thống phân tích và đề xuất các Hợp tác xã (HTX) phù hợp nhất về vị trí và năng lực.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Ký Kết Hợp Đồng</h3>
              <p className="text-sm text-gray-600 text-center">
                GreenLight đại diện ký Hợp đồng với Doanh nghiệp, sau đó phân bổ chỉ tiêu sản xuất về HTX.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Giám Sát & Giao Hàng</h3>
              <p className="text-sm text-gray-600 text-center">
                Theo dõi tiến độ qua App. Hàng hóa được kiểm định, sơ chế và vận chuyển đến kho.
              </p>
            </div>
          </div>
        </section>

        {/* Danh mục sản phẩm */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            DANH MỤC SẢN PHẨM TRỌNG ĐIỂM
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Các sản phẩm đều có hồ sơ truy xuất nguồn gốc và kiểm định mẫu
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {medicinalProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="h-48">
                  <img 
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{product.category}</h3>
                  <div className="space-y-2">
                    {product.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-leaf-line text-emerald-500"></i>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-shield-check-line text-emerald-500"></i>
                      <span>Đạt chuẩn VITA</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <i className="ri-qr-code-line text-blue-500"></i>
                      <span>Truy xuất nguồn gốc</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form đăng ký */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              FORM ĐĂNG KÝ THU MUA / HỢP TÁC
            </h2>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              Chúng tôi không bán rẻ tài nguyên rừng. Chúng tôi bán giá trị của sự minh bạch và bền vững.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Loại hình */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">Bạn là ai? *</label>
                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.type === 'manufacturer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="manufacturer"
                      checked={formData.type === 'manufacturer'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Nhà máy sản xuất Dược phẩm / TPCN</p>
                      <p className="text-xs sm:text-sm text-gray-600">Cần nguồn nguyên liệu ổn định cho sản xuất</p>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.type === 'hospital' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="hospital"
                      checked={formData.type === 'hospital'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Chuỗi Bệnh viện / Phòng khám Y học cổ truyền</p>
                      <p className="text-xs sm:text-sm text-gray-600">Cần dược liệu sạch cho điều trị bệnh nhân</p>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.type === 'exporter' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="exporter"
                      checked={formData.type === 'exporter'}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Đơn vị Xuất khẩu Nông sản/Dược liệu</p>
                      <p className="text-xs sm:text-sm text-gray-600">Cần nguồn hàng đạt chuẩn quốc tế</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tên doanh nghiệp */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Tên Doanh nghiệp *</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="VD: Công ty TNHH Dược phẩm ABC"
                />
              </div>

              {/* Loại dược liệu */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Loại dược liệu quan tâm *</label>
                <input
                  type="text"
                  name="medicinalType"
                  required
                  value={formData.medicinalType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="VD: Ba Kích Tím, Sâm Cau, Đẳng Sâm..."
                />
              </div>

              {/* Sản lượng */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Sản lượng dự kiến (Tấn/Năm) *</label>
                <input
                  type="number"
                  name="annualVolume"
                  required
                  min="1"
                  step="0.1"
                  value={formData.annualVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="VD: 50"
                />
              </div>

              {/* Yêu cầu đặc biệt */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Yêu cầu đặc biệt (Tiêu chuẩn/Sơ chế)</label>
                <textarea
                  name="specialRequirements"
                  rows={4}
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="VD: Cần hàm lượng saponin &gt; 5%, sấy khô ở 40°C, đóng gói chân không..."
                ></textarea>
              </div>

              {/* Thông tin liên hệ */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Người liên hệ *</label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Chức vụ *</label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: Giám đốc Thu mua"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: email@company.com"
                  />
                </div>
              </div>

              {/* Cam kết */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <i className="ri-hand-heart-line text-2xl sm:text-3xl text-blue-600 flex-shrink-0"></i>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Cam kết từ GreenLight</p>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Chúng tôi không bán rẻ tài nguyên rừng. Chúng tôi bán giá trị của sự minh bạch và bền vững. Hãy đồng hành cùng chúng tôi để nâng tầm thương hiệu Dược liệu Việt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:shadow-xl transition-all whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Gửi Đăng Ký Thu Mua
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-blue-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Cảm ơn bạn đã đăng ký. Đội ngũ GreenLight sẽ liên hệ với bạn trong vòng 24-48 giờ để tư vấn chi tiết về giải pháp cung ứng dược liệu.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
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
