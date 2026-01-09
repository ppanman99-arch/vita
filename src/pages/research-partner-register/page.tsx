import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResearchPartnerRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    expertise: '',
    representative: '',
    position: '',
    phone: '',
    email: '',
    mainSpecies: '',
    propagationMethod: '',
    productionCapacity: '',
    cooperationTypes: [] as string[],
    additionalInfo: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const expertiseOptions = [
    'Giống cây lâm nghiệp',
    'Dược liệu dưới tán',
    'Công nghệ Gen',
    'Công nghệ Chế biến',
    'Nuôi cấy mô',
    'Lai tạo giống'
  ];

  const propagationMethods = [
    'Hạt',
    'Giâm hom',
    'Nuôi cấy mô',
    'Ghép',
    'Khác'
  ];

  const cooperationOptions = [
    'Cung cấp cây giống thương phẩm',
    'Chuyển giao quy trình kỹ thuật canh tác',
    'Hợp tác nghiên cứu bảo tồn',
    'Xây dựng vườn bảo tồn gen',
    'Đào tạo kỹ thuật'
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
    const newTypes = formData.cooperationTypes.includes(value)
      ? formData.cooperationTypes.filter(t => t !== value)
      : [...formData.cooperationTypes, value];
    
    setFormData({
      ...formData,
      cooperationTypes: newTypes
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng Ký Đối Tác Khoa Học</h1>
              <p className="text-sm opacity-90">Trung tâm Gen & Nghiên cứu</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Modern%20biotechnology%20laboratory%20with%20scientists%20researching%20medicinal%20plant%20genetics%20and%20tissue%20culture%2C%20clean%20white%20lab%20environment%20with%20microscopes%20and%20petri%20dishes%2C%20professional%20scientific%20research%20facility%2C%20high-tech%20equipment%2C%20natural%20plant%20specimens%2C%20bright%20lighting%2C%20innovation%20and%20science%20atmosphere&width=1920&height=800&seq=research1&orientation=landscape"
            alt="Trung tâm Gen"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            TỪ PHÒNG THÍ NGHIỆM ĐẾN RỪNG XANH<br />THƯƠNG MẠI HÓA KHOA HỌC DƯỢC LIỆU
          </h2>
          <p className="text-base sm:text-xl text-white/95 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
            GreenLight tìm kiếm các đối tác là Viện nghiên cứu, Trung tâm giống cây trồng và các Nhà khoa học để cùng xây dựng "Ngân hàng Gen chuẩn" cho Quốc gia. Biến đề tài nghiên cứu thành sinh kế cho hàng vạn nông dân.
          </p>
          <p className="text-sm sm:text-lg text-white/90 italic font-semibold">
            "Chất lượng dược liệu bắt đầu từ bộ Gen. Không có giống tốt, mọi nỗ lực canh tác đều vô nghĩa."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Vai trò của khoa học */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            VAI TRÒ CỦA KHOA HỌC TRONG HỆ SINH THÁI
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <i className="ri-microscope-line text-white text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Người Khởi Tạo (The Originator)</h3>
                <p className="text-sm sm:text-base text-purple-600">Giải quyết vấn đề gốc rễ của ngành dược liệu Việt Nam</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-dna-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Chuẩn Hóa Nguồn Giống</h4>
                    <p className="text-sm text-gray-700 mb-3">Genetic Standardization</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Chấm dứt tình trạng trồng tự phát, giống lai tạp, thoái hóa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Tránh nhầm lẫn loài (Ba kích tím/trắng, Sâm Ngọc Linh/Tam Thất)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-purple-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Cung cấp giống F1 sạch bệnh, đề kháng cao, năng suất ổn định</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-book-open-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Cố Vấn Kỹ Thuật</h4>
                    <p className="text-sm text-gray-700 mb-3">Technical Advisory</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Ban hành quy trình canh tác chuẩn (SOP) cho từng loại cây</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Hướng dẫn mật độ trồng, chế độ dinh dưỡng, kỹ thuật thu hái</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-indigo-500 text-lg flex-shrink-0 mt-0.5"></i>
                        <span>Đào tạo đội ngũ kỹ sư hiện trường giám sát HTX</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lợi ích hợp tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            LỢI ÍCH KHI HỢP TÁC CÙNG RỪNG DƯỢC SINH
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Nền tảng thực tiễn để khoa học đi vào cuộc sống
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lợi ích 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-store-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thương Mại Hóa Quy Mô Lớn</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold text-purple-700">Commercialization</p>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Công trình nghiên cứu, giống cây quý sau lai tạo không còn nằm trong ngăn kéo.</p>
                <p className="font-semibold text-gray-800">GreenLight sở hữu vùng quy hoạch hàng nghìn hecta:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-purple-500 text-lg flex-shrink-0"></i>
                    <span>Nhu cầu hàng triệu bầu giống mỗi năm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-purple-500 text-lg flex-shrink-0"></i>
                    <span>Thị trường tiêu thụ trực tiếp và bền vững</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Lợi ích 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-database-2-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dữ Liệu Thực Nghiệm</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold text-indigo-700">Big Data R&D</p>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Thông qua Platform <strong>VITA Data Hub</strong>, nhà khoa học nhận dữ liệu phản hồi thực tế:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                    <span>Độ thích nghi từ hàng nghìn hecta vùng trồng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                    <span>Năng suất thực tế theo tiểu khí hậu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-indigo-500 text-lg flex-shrink-0"></i>
                    <span>Biến đổi hoạt chất theo môi trường</span>
                  </li>
                </ul>
                <p className="font-semibold text-gray-800">Kho dữ liệu quý giá để hoàn thiện nghiên cứu và lai tạo giống mới ưu việt hơn.</p>
              </div>
            </div>

            {/* Lợi ích 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-leaf-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo Tồn & Phát Triển</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold text-blue-700">Conservation</p>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Hợp tác xây dựng các vườn bảo tồn dược liệu gốc (Mother Garden) ngay tại vùng rừng sinh thái.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                    <span>Bảo vệ loài gen quý bản địa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                    <span>Ngăn chặn nguy cơ tuyệt chủng do khai thác tận diệt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-blue-500 text-lg flex-shrink-0"></i>
                    <span>Phát triển nguồn gen bền vững cho thế hệ tương lai</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tiêu chí đối tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            TIÊU CHÍ ĐỐI TÁC CHIẾN LƯỢC
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Chúng tôi tìm kiếm sự hợp tác từ:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <i className="ri-government-line text-white text-2xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Viện Nghiên Cứu Quốc Gia</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Viện Dược Liệu (NIMM)</li>
                  <li>• Viện Khoa học Lâm nghiệp</li>
                  <li>• Học viện Nông nghiệp</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <i className="ri-building-line text-white text-2xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Doanh Nghiệp Khoa Học</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Nuôi cấy mô (Tissue culture)</li>
                  <li>• Lai tạo giống</li>
                  <li>• Bảo hộ giống cây trồng</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <i className="ri-user-star-line text-white text-2xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Nhà Khoa Học Độc Lập</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Chuyên gia đầu ngành</li>
                  <li>• Tâm huyết dược liệu Việt</li>
                  <li>• Kinh nghiệm thực tiễn</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Yêu cầu năng lực:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Sở hữu nguồn giống bố mẹ đầu dòng đã được công nhận hoặc kiểm định</p>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Có năng lực sản xuất cây giống quy mô công nghiệp (hoặc sẵn sàng chuyển giao quy trình nhân giống)</p>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-purple-600 text-2xl flex-shrink-0"></i>
                  <p className="text-sm text-gray-700">Sẵn sàng tham gia Hội đồng Khoa học VITA để thẩm định chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Các hình thức hợp tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            CÁC HÌNH THỨC HỢP TÁC
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Partnership Models - Linh hoạt theo nhu cầu
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Nhà Cung Cấp Độc Quyền</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-purple-700">Exclusive Supplier</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-purple-500 flex-shrink-0 mt-0.5"></i>
                    <span>Chịu trách nhiệm sản xuất và cung cấp toàn bộ cây giống</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-purple-500 flex-shrink-0 mt-0.5"></i>
                    <span>GreenLight cam kết bao tiêu số lượng theo kế hoạch từng năm</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Chuyển Giao Công Nghệ</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-indigo-700">Technology Licensing</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-indigo-500 flex-shrink-0 mt-0.5"></i>
                    <span>Chuyển giao quy trình nhân giống và bán bản quyền (Royalty)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-indigo-500 flex-shrink-0 mt-0.5"></i>
                    <span>GreenLight sản xuất tại vườn ươm địa phương dưới giám sát</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Hợp Tác Nghiên Cứu</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-blue-700">Joint R&D</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-blue-500 flex-shrink-0 mt-0.5"></i>
                    <span>Cùng đầu tư xây dựng "Trung tâm Gen công nghệ cao"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-arrow-right-s-fill text-blue-500 flex-shrink-0 mt-0.5"></i>
                    <span>Chia sẻ lợi nhuận từ sản phẩm trí tuệ mới</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quy trình hợp tác */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            QUY TRÌNH HỢP TÁC KHOA HỌC
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Đề Xuất</h3>
              <p className="text-sm text-gray-600 text-center">
                Đối tác gửi hồ sơ năng lực và danh mục các giống cây thế mạnh
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Thẩm Định</h3>
              <p className="text-sm text-gray-600 text-center">
                Hội đồng khoa học đánh giá tính phù hợp với quy hoạch và nhu cầu thị trường
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Thử Nghiệm</h3>
              <p className="text-sm text-gray-600 text-center">
                Ký MOU, triển khai trồng khảo nghiệm tại vùng lõi (Phú Thọ/Hòa Bình)
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Hợp Đồng</h3>
              <p className="text-sm text-gray-600 text-center">
                Ký hợp đồng cung cấp giống hoặc chuyển giao công nghệ dài hạn
              </p>
            </div>
          </div>
        </section>

        {/* Form đăng ký */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">FORM ĐĂNG KÝ HỢP TÁC KHOA HỌC</h2>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              Cùng nhau kiến tạo "Ngân hàng Gen chuẩn" cho Quốc gia
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thông tin đơn vị */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin đơn vị</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Tên Viện / Trung tâm / Doanh nghiệp *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      required
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="VD: Viện Dược Liệu Trung Ương"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Lĩnh vực chuyên môn sâu *
                    </label>
                    <select
                      name="expertise"
                      required
                      value={formData.expertise}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Chọn lĩnh vực</option>
                      {expertiseOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Người đại diện liên hệ *
                      </label>
                      <input
                        type="text"
                        name="representative"
                        required
                        value={formData.representative}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: PGS.TS Nguyễn Văn A"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: Giám đốc Trung tâm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Năng lực cung ứng */}
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Năng lực cung ứng</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Các loại giống chủ lực có thể cung cấp ngay *
                    </label>
                    <textarea
                      name="mainSpecies"
                      required
                      value={formData.mainSpecies}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base resize-none"
                      placeholder="VD: Ba Kích Tím F1, Sâm Cau, Đẳng Sâm, Khôi Nhung..."
                    ></textarea>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Công nghệ nhân giống đang áp dụng *
                      </label>
                      <select
                        name="propagationMethod"
                        required
                        value={formData.propagationMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Chọn phương pháp</option>
                        {propagationMethods.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                        Năng lực sản xuất (cây/năm) *
                      </label>
                      <input
                        type="text"
                        name="productionCapacity"
                        required
                        value={formData.productionCapacity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: 500,000 cây/năm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Đề xuất hợp tác */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Đề xuất hợp tác *</h3>
                <p className="text-sm text-gray-600 mb-4">Chọn một hoặc nhiều hình thức hợp tác:</p>
                
                <div className="space-y-3">
                  {cooperationOptions.map((option) => (
                    <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.cooperationTypes.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 text-purple-600 mt-0.5"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base resize-none"
                  placeholder="Chia sẻ thêm về kinh nghiệm, dự án đã thực hiện, hoặc đề xuất hợp tác cụ thể..."
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
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="VD: email@institute.vn"
                  />
                </div>
              </div>

              {/* Cam kết */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <i className="ri-heart-line text-2xl sm:text-3xl text-purple-600 flex-shrink-0"></i>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Lời ngỏ từ GreenLight:</p>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      GreenLight trân trọng tri thức và tâm huyết của các nhà khoa học. Chúng tôi không chỉ bán rẻ tài nguyên rừng, mà bán giá trị của sự minh bạch và bền vững. Hãy đồng hành cùng chúng tôi để nâng tầm thương hiệu Dược liệu Việt, biến khoa học thành sinh kế cho hàng vạn nông dân.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:shadow-xl transition-all whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Đăng Ký Hợp Tác Khoa Học
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl sm:text-5xl text-purple-600"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Cảm ơn bạn đã đăng ký. Hội đồng Khoa học của GreenLight sẽ liên hệ với bạn trong vòng 24-48 giờ để trao đổi chi tiết về cơ hội hợp tác.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
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
