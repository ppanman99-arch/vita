import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function PhysicianPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'subscription' | 'premium' | 'wiki' | 'rare-herb' | 'feedback' | 'order' | 'hospital' | 'community'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles = [
    { id: 'admin', name: 'HTX - Quản trị', icon: 'ri-dashboard-line', path: '/admin' },
    { id: 'partner', name: 'Doanh nghiệp - Thu mua', icon: 'ri-building-line', path: '/partner-dashboard' },
    { id: 'physician', name: 'Bác sĩ - Kiểm định', icon: 'ri-stethoscope-line', path: '/physician-portal' },
    { id: 'greenlight', name: 'GreenLight - Command', icon: 'ri-shield-star-line', path: '/greenlight-command' },
    { id: 'hub', name: 'Tất cả phân hệ', icon: 'ri-apps-2-line', path: '/home' },
  ];

  // Mock data - Dược liệu mới
  const newMedicines = [
    {
      id: 1,
      name: 'Đương Quy',
      batchCode: 'DQ2025-01',
      location: 'Sapa, Lào Cai',
      activeCompound: 'Ligustilide',
      concentration: '0.8%',
      standard: '0.2%',
      status: 'Cao hơn tiêu chuẩn',
      harvestDate: '15/01/2025',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Chinese%20medicine%20Angelica%20sinensis%20root%20dried%20herb%20on%20white%20background%20high%20quality%20pharmaceutical%20grade&width=400&height=300&seq=dq2025&orientation=landscape'
    },
    {
      id: 2,
      name: 'Sâm Ngọc Linh',
      batchCode: 'SNL2025-03',
      location: 'Kon Tum',
      activeCompound: 'Saponin',
      concentration: '12.5%',
      standard: '8.0%',
      status: 'Đột biến cao',
      harvestDate: '10/01/2025',
      image: 'https://readdy.ai/api/search-image?query=Premium%20Vietnamese%20Ngoc%20Linh%20ginseng%20root%20on%20white%20background%20high%20quality%20pharmaceutical%20grade%20medicinal%20herb&width=400&height=300&seq=snl2025&orientation=landscape'
    },
    {
      id: 3,
      name: 'Cà Gai Leo',
      batchCode: 'CGL2025-02',
      location: 'Tây Nguyên',
      activeCompound: 'Alkaloid',
      concentration: '0.45%',
      standard: '0.3%',
      status: 'Đạt chuẩn cao',
      harvestDate: '08/01/2025',
      image: 'https://readdy.ai/api/search-image?query=Solanum%20procumbens%20medicinal%20plant%20dried%20herb%20on%20white%20background%20pharmaceutical%20quality%20traditional%20medicine&width=400&height=300&seq=cgl2025&orientation=landscape'
    }
  ];

  // Mock data - Hồ sơ dược liệu
  const medicineDatabase = [
    {
      id: 1,
      name: 'Đương Quy',
      scientificName: 'Angelica sinensis',
      batchCode: 'DQ2025-01',
      location: 'Sapa, Lào Cai - Độ cao 1,500m',
      altitude: '1,500m',
      age: '3 năm',
      activeCompound: 'Ligustilide',
      concentration: '0.8%',
      standard: '0.2% (Dược điển VN)',
      properties: 'Bổ huyết, hoạt huyết, điều kinh, chỉ thống',
      dosage: '6-12g/ngày (sắc uống)',
      contraindications: 'Thai phụ, xuất huyết nặng',
      interactions: 'Tương tác với Warfarin (thuốc chống đông máu)',
      toxicity: 'An toàn ở liều điều trị',
      certifications: ['GACP', 'VietGAP', 'Organic'],
      labTests: {
        heavyMetals: 'Đạt (Pb &lt; 5ppm)',
        pesticides: 'Không phát hiện',
        microbiology: 'Đạt tiêu chuẩn',
        moisture: '12%'
      }
    },
    {
      id: 2,
      name: 'Sâm Ngọc Linh',
      scientificName: 'Panax vietnamensis',
      batchCode: 'SNL2025-03',
      location: 'Kon Tum - Độ cao 1,800m',
      altitude: '1,800m',
      age: '5 năm',
      activeCompound: 'Saponin',
      concentration: '12.5%',
      standard: '8.0% (Dược điển VN)',
      properties: 'Bổ khí, ích thận, an thần, tăng cường miễn dịch',
      dosage: '3-9g/ngày (sắc uống hoặc ngâm rượu)',
      contraindications: 'Cao huyết áp nặng, sốt cao',
      interactions: 'Tương tác với thuốc hạ đường huyết',
      toxicity: 'An toàn, không độc tính',
      certifications: ['GACP', 'VietGAP', 'Organic', 'EU-Organic'],
      labTests: {
        heavyMetals: 'Đạt (Pb &lt; 3ppm)',
        pesticides: 'Không phát hiện',
        microbiology: 'Đạt tiêu chuẩn',
        moisture: '10%'
      }
    },
    {
      id: 3,
      name: 'Cà Gai Leo',
      scientificName: 'Solanum procumbens',
      batchCode: 'CGL2025-02',
      location: 'Tây Nguyên - Độ cao 800m',
      altitude: '800m',
      age: '2 năm',
      activeCompound: 'Alkaloid',
      concentration: '0.45%',
      standard: '0.3% (Dược điển VN)',
      properties: 'Thanh nhiệt, giải độc, lợi gan, chống viêm',
      dosage: '15-30g/ngày (sắc uống)',
      contraindications: 'Thai phụ, người có vấn đề về gan nặng',
      interactions: 'Tương tác với thuốc bảo vệ gan',
      toxicity: 'An toàn ở liều điều trị',
      certifications: ['GACP', 'VietGAP'],
      labTests: {
        heavyMetals: 'Đạt (Pb &lt; 5ppm)',
        pesticides: 'Không phát hiện',
        microbiology: 'Đạt tiêu chuẩn',
        moisture: '13%'
      }
    }
  ];

  // Mock data - Phản hồi lâm sàng
  const clinicalReports = [
    {
      id: 1,
      patientCode: 'BN-2025-***',
      batchCode: 'SNL2025-03',
      medicineName: 'Sâm Ngọc Linh',
      dosage: '6g/ngày x 30 ngày',
      indication: 'Suy nhược cơ thể',
      effectiveness: 'Tốt',
      rating: 5,
      sideEffects: 'Không',
      notes: 'Bệnh nhân cải thiện rõ rệt sau 2 tuần. Tăng cân 2kg, ngủ ngon hơn.',
      doctorName: 'BS. Nguyễn Văn A',
      date: '20/01/2025',
      status: 'Đã gửi'
    },
    {
      id: 2,
      patientCode: 'BN-2025-***',
      batchCode: 'DQ2025-01',
      medicineName: 'Đương Quy',
      dosage: '9g/ngày x 14 ngày',
      indication: 'Rối loạn kinh nguyệt',
      effectiveness: 'Khá',
      rating: 4,
      sideEffects: 'Nhẹ (Đầy bụng)',
      notes: 'Kinh nguyệt đều hơn, đau bụng giảm. Có hiện tượng đầy bụng nhẹ.',
      doctorName: 'BS. Trần Thị B',
      date: '18/01/2025',
      status: 'Đã gửi'
    }
  ];

  // Mock data - Đơn đặt mẫu
  const sampleOrders = [
    {
      id: 1,
      medicineName: 'Sâm Ngọc Linh',
      batchCode: 'SNL2025-03',
      quantity: '500g',
      purpose: 'Kiểm tra chất lượng',
      status: 'Đang giao',
      orderDate: '15/01/2025',
      expectedDate: '25/01/2025'
    },
    {
      id: 2,
      medicineName: 'Đương Quy',
      batchCode: 'DQ2025-01',
      quantity: '300g',
      purpose: 'Thử nghiệm lâm sàng',
      status: 'Đã giao',
      orderDate: '10/01/2025',
      deliveredDate: '18/01/2025'
    }
  ];

  // Mock data - Diễn đàn
  const forumTopics = [
    {
      id: 1,
      title: 'Kinh nghiệm dùng Sâm Ngọc Linh VITA lô tháng 10 cho bệnh nhân suy nhược',
      author: 'BS. Nguyễn Văn A',
      replies: 12,
      views: 245,
      lastActivity: '2 giờ trước',
      category: 'Kinh nghiệm lâm sàng'
    },
    {
      id: 2,
      title: 'Phác đồ kết hợp Đương Quy + Xuyên Khung cho rối loạn kinh nguyệt',
      author: 'BS. Trần Thị B',
      replies: 8,
      views: 189,
      lastActivity: '5 giờ trước',
      category: 'Phác đồ điều trị'
    },
    {
      id: 3,
      title: 'Đánh giá chất lượng Cà Gai Leo VITA so với nguồn nhập khẩu',
      author: 'DS. Lê Văn C',
      replies: 15,
      views: 312,
      lastActivity: '1 ngày trước',
      category: 'Đánh giá chất lượng'
    }
  ];

  const getEffectivenessColor = (effectiveness: string) => {
    switch(effectiveness) {
      case 'Tốt': return 'text-green-600 bg-green-100';
      case 'Khá': return 'text-blue-600 bg-blue-100';
      case 'Kém': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Đang giao': return 'text-blue-600 bg-blue-100';
      case 'Đã giao': return 'text-green-600 bg-green-100';
      case 'Đã hủy': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <BackButton />
            
            <div className="flex items-center gap-3">
              <PortalSwitcher />
              {/* Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center hover:bg-teal-200 transition-colors cursor-pointer"
                  title="Chuyển phân hệ"
                >
                  <i className="ri-apps-2-line text-xl"></i>
                </button>
                
                {showRoleMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowRoleMenu(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Chuyển đổi phân hệ</p>
                      </div>
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => {
                            navigate(role.path);
                            setShowRoleMenu(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-teal-50 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <i className={`${role.icon} text-teal-600`}></i>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{role.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="px-3 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-logout-box-line"></i>
                Đăng xuất
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <i className="ri-stethoscope-line text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cổng Kiểm Định & Lâm Sàng</h1>
              <p className="text-sm text-gray-600">Thư viện Dược liệu số & Phản hồi Y khoa</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-dashboard-line mr-1"></i>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-book-line mr-1"></i>
              Tra cứu Dược liệu
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'subscription'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-calendar-check-line mr-1"></i>
              Tủ Thuốc Định Kỳ
            </button>
            <button
              onClick={() => setActiveTab('premium')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'premium'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-star-line mr-1"></i>
              Lô Tuyển Chọn
            </button>
            <button
              onClick={() => setActiveTab('wiki')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'wiki'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-edit-box-line mr-1"></i>
              VITA Wiki
            </button>
            <button
              onClick={() => setActiveTab('rare-herb')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'rare-herb'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-plant-line mr-1"></i>
              Cây Thuốc Lạ
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-feedback-line mr-1"></i>
              Phản hồi Lâm sàng
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'order'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-shopping-bag-line mr-1"></i>
              Đặt mẫu
            </button>
            <button
              onClick={() => setActiveTab('hospital')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'hospital'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-hospital-line mr-1"></i>
              Bệnh viện
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'community'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-team-line mr-1"></i>
              Cộng đồng
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Central Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-search-line text-teal-600"></i>
                Tìm kiếm Dược liệu Thông minh
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm theo tên cây, hoạt chất (VD: Curcumin), hoặc công dụng (VD: Tiêu viêm)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-sm"
                />
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs cursor-pointer hover:bg-teal-200 transition-colors whitespace-nowrap">
                  Bổ khí
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs cursor-pointer hover:bg-teal-200 transition-colors whitespace-nowrap">
                  Hoạt huyết
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs cursor-pointer hover:bg-teal-200 transition-colors whitespace-nowrap">
                  Thanh nhiệt
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs cursor-pointer hover:bg-teal-200 transition-colors whitespace-nowrap">
                  Giải độc
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                  <i className="ri-medicine-bottle-line text-2xl text-teal-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">127</div>
                <div className="text-sm text-gray-600">Dược liệu trong hệ thống</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <i className="ri-feedback-line text-2xl text-blue-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">23</div>
                <div className="text-sm text-gray-600">Phản hồi của tôi</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <i className="ri-flask-line text-2xl text-purple-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600">Mẫu thử đã đặt</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <i className="ri-shield-check-line text-2xl text-green-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">98.5%</div>
                <div className="text-sm text-gray-600">Tỷ lệ đạt chuẩn</div>
              </div>
            </div>

            {/* Dược liệu mới */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-star-line text-teal-600"></i>
                Dược liệu Mới & Đột biến Cao
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newMedicines.map((medicine) => (
                  <div key={medicine.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors cursor-pointer">
                    <img 
                      src={medicine.image} 
                      alt={medicine.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-bold text-gray-800 mb-1">{medicine.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">Mã lô: {medicine.batchCode}</p>
                    <div className="bg-teal-50 rounded-lg p-2 mb-2 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">{medicine.activeCompound}:</span>
                        <span className="font-bold text-teal-600">{medicine.concentration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tiêu chuẩn:</span>
                        <span className="text-gray-700">{medicine.standard}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                      {medicine.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-shield-check-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Tài khoản Verified Expert</h3>
                  <p className="text-sm opacity-90">BS. Nguyễn Văn A - Chứng chỉ hành nghề: 12345/BYT</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-sm">
                <p className="mb-2">✓ Xem dữ liệu phân tích hóa lý chi tiết</p>
                <p className="mb-2">✓ Đặt mẫu thử miễn phí (tối đa 500g/tháng)</p>
                <p>✓ Tham gia diễn đàn chuyên gia</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Database */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Hồ Sơ Dược Liệu (Materia Medica Database)</h3>
              <div className="space-y-4">
                {medicineDatabase.map((medicine) => (
                  <div key={medicine.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{medicine.name}</h4>
                        <p className="text-sm text-gray-600 italic">{medicine.scientificName}</p>
                        <p className="text-xs text-gray-500 mt-1">Mã lô: {medicine.batchCode}</p>
                      </div>
                      <div className="flex gap-1">
                        {medicine.certifications.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-700 text-sm mb-2">Thông tin nguồn gốc</h5>
                        <div className="text-xs space-y-1">
                          <p><span className="text-gray-600">Vùng trồng:</span> <span className="font-medium">{medicine.location}</span></p>
                          <p><span className="text-gray-600">Tuổi cây:</span> <span className="font-medium">{medicine.age}</span></p>
                        </div>
                      </div>

                      <div className="bg-teal-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-700 text-sm mb-2">Hoạt chất chính</h5>
                        <div className="text-xs space-y-1">
                          <p><span className="text-gray-600">Thành phần:</span> <span className="font-medium">{medicine.activeCompound}</span></p>
                          <p><span className="text-gray-600">Hàm lượng:</span> <span className="font-bold text-teal-600">{medicine.concentration}</span></p>
                          <p><span className="text-gray-600">Tiêu chuẩn:</span> <span className="font-medium">{medicine.standard}</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <h5 className="font-semibold text-gray-700 text-sm mb-2">Công dụng & Liều dùng</h5>
                      <div className="text-xs space-y-1">
                        <p><span className="text-gray-600">Công dụng:</span> <span className="font-medium">{medicine.properties}</span></p>
                        <p><span className="text-gray-600">Liều dùng:</span> <span className="font-medium">{medicine.dosage}</span></p>
                      </div>
                    </div>

                    {/* Góc nhìn Đông Y - VITA Wiki Section */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                          <i className="ri-book-open-line text-amber-600"></i>
                          Góc nhìn Đông Y (VITA Wiki)
                        </h5>
                        <button className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors">
                          <i className="ri-edit-line mr-1"></i>
                          Đóng góp
                        </button>
                      </div>
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="text-gray-600 font-medium">Tính vị quy kinh:</span>
                          <p className="text-gray-800 mt-1">Vị đắng, tính hàn, vào kinh Can, Tỳ</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Công năng chủ trị:</span>
                          <p className="text-gray-800 mt-1">{medicine.properties}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Kinh nghiệm lâm sàng:</span>
                          <p className="text-gray-800 mt-1 italic">
                            "Tôi đã dùng loại này của vùng {medicine.location.split(' - ')[0]} thấy hiệu quả tốt hơn vùng khác. 
                            Đặc biệt phù hợp cho bệnh nhân có thể trạng hàn."
                            <span className="text-gray-500 ml-2">- BS. Nguyễn Văn A (Đã xác thực)</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                          <i className="ri-thumb-up-line"></i>
                          <span>12 bác sĩ đồng ý</span>
                          <span className="mx-2">•</span>
                          <i className="ri-eye-line"></i>
                          <span>245 lượt xem</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <h5 className="font-semibold text-red-700 text-sm mb-2 flex items-center gap-1">
                        <i className="ri-alert-line"></i>
                        Cảnh báo An toàn
                      </h5>
                      <div className="text-xs space-y-1">
                        <p><span className="text-gray-600">Chống chỉ định:</span> <span className="font-medium text-red-700">{medicine.contraindications}</span></p>
                        <p><span className="text-gray-600">Tương tác thuốc:</span> <span className="font-medium text-red-700">{medicine.interactions}</span></p>
                        <p><span className="text-gray-600">Độc tính:</span> <span className="font-medium">{medicine.toxicity}</span></p>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3 mb-4">
                      <h5 className="font-semibold text-gray-700 text-sm mb-2">Kết quả Kiểm nghiệm</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Kim loại nặng:</span>
                          <span className="ml-1 font-medium text-green-600">{medicine.labTests.heavyMetals}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Thuốc BVTV:</span>
                          <span className="ml-1 font-medium text-green-600">{medicine.labTests.pesticides}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Vi sinh vật:</span>
                          <span className="ml-1 font-medium text-green-600">{medicine.labTests.microbiology}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Độ ẩm:</span>
                          <span className="ml-1 font-medium">{medicine.labTests.moisture}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-teal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        Xem 3D/Macro
                      </button>
                      <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-download-line mr-1"></i>
                        Tải COA
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Subscription - Tủ Thuốc Định Kỳ */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border-2 border-teal-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Gói đang dùng</span>
                  <i className="ri-vip-crown-line text-teal-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">Premium</div>
                <div className="text-xs text-gray-500 mt-1">Hết hạn: 28/02/2025</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Đơn hàng/tháng</span>
                  <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">4/5</div>
                <div className="text-xs text-gray-500 mt-1">Đã dùng hết 80%</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Lần giao tiếp theo</span>
                  <i className="ri-truck-line text-emerald-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">05/02</div>
                <div className="text-xs text-gray-500 mt-1">Còn 21 ngày</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tổng giá trị</span>
                  <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">12.5M</div>
                <div className="text-xs text-gray-500 mt-1">Đã tiết kiệm 25%</div>
              </div>
            </div>

            {/* Subscription Plans */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <i className="ri-vip-diamond-line text-teal-600"></i>
                  Gói Đăng Ký
                </h3>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Nâng cấp gói
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Basic Plan */}
                <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">Gói Cơ Bản</h4>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">1 đơn/tháng</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">2.5 triệu</div>
                    <div className="text-sm text-gray-600">VNĐ/tháng</div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>1 đơn hàng/tháng (500g)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Truy cập database cơ bản</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Hỗ trợ email</span>
                    </li>
                  </ul>
                  <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Chọn gói này
                  </button>
                </div>

                {/* Premium Plan - Active */}
                <div className="border-2 border-teal-500 rounded-xl p-5 bg-gradient-to-br from-teal-50 to-cyan-50 relative">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500 text-white rounded-full text-xs font-semibold">
                    Đang dùng
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">Gói Premium</h4>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">5 đơn/tháng</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">5 triệu</div>
                    <div className="text-sm text-gray-600">VNĐ/tháng</div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>5 đơn hàng/tháng (500g/đơn)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Database đầy đủ + Premium</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Ưu tiên giao hàng</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Hỗ trợ 24/7</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Giảm giá 10% cho đơn bổ sung</span>
                    </li>
                  </ul>
                  <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium">
                    Gói hiện tại
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">Gói Doanh Nghiệp</h4>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Không giới hạn</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">Liên hệ</div>
                    <div className="text-sm text-gray-600">Tùy chỉnh</div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Đơn hàng không giới hạn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>API tích hợp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Account Manager riêng</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-600"></i>
                      <span>Giảm giá theo volume</span>
                    </li>
                  </ul>
                  <button className="w-full px-4 py-2 border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                    Liên hệ tư vấn
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <i className="ri-calendar-schedule-line text-teal-600"></i>
                  Lịch Giao Hàng Định Kỳ
                </h3>
                <button className="px-4 py-2 border-2 border-teal-500 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Tạo lịch mới
                </button>
              </div>

              <div className="space-y-4">
                {/* Scheduled Delivery 1 */}
                <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-800">Đương Quy - Định kỳ hàng tháng</h4>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">Đang hoạt động</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Số lượng</div>
                          <div className="font-semibold text-gray-900">500g</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Tần suất</div>
                          <div className="font-semibold text-gray-900">Hàng tháng</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Lần giao tiếp theo</div>
                          <div className="font-semibold text-emerald-600">05/02/2025</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Mã lô</div>
                          <div className="font-semibold text-gray-900">DQ2025-01</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <i className="ri-edit-line mr-1"></i>
                      Chỉnh sửa
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                      <i className="ri-pause-line mr-1"></i>
                      Tạm dừng
                    </button>
                  </div>
                </div>

                {/* Scheduled Delivery 2 */}
                <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-800">Sâm Ngọc Linh - Định kỳ 2 tháng</h4>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">Đang hoạt động</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Số lượng</div>
                          <div className="font-semibold text-gray-900">300g</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Tần suất</div>
                          <div className="font-semibold text-gray-900">2 tháng/lần</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Lần giao tiếp theo</div>
                          <div className="font-semibold text-emerald-600">15/03/2025</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Mã lô</div>
                          <div className="font-semibold text-gray-900">SNL2025-03</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <i className="ri-edit-line mr-1"></i>
                      Chỉnh sửa
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium">
                      <i className="ri-pause-line mr-1"></i>
                      Tạm dừng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Medicines */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <i className="ri-medicine-bottle-line text-teal-600"></i>
                  Dược Liệu Trong Tủ Thuốc
                </h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-teal-500">
                    <option>Tất cả</option>
                    <option>Đang dùng</option>
                    <option>Đã hết</option>
                    <option>Sắp hết</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Medicine Card 1 */}
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">Đương Quy</h4>
                      <p className="text-xs text-gray-600">Mã lô: DQ2025-01</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Đang dùng</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Số lượng còn lại</span>
                      <span className="font-bold text-gray-900">350g / 500g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-gray-600">Ngày nhận</div>
                      <div className="font-semibold">05/01/2025</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Hạn sử dụng</div>
                      <div className="font-semibold">05/07/2025</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium">
                    <i className="ri-shopping-cart-line mr-1"></i>
                    Đặt bổ sung
                  </button>
                </div>

                {/* Medicine Card 2 */}
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">Sâm Ngọc Linh</h4>
                      <p className="text-xs text-gray-600">Mã lô: SNL2025-03</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Đang dùng</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Số lượng còn lại</span>
                      <span className="font-bold text-gray-900">120g / 300g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-gray-600">Ngày nhận</div>
                      <div className="font-semibold">15/11/2024</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Hạn sử dụng</div>
                      <div className="font-semibold">15/05/2025</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
                    <i className="ri-alert-line mr-1"></i>
                    Sắp hết - Đặt ngay
                  </button>
                </div>

                {/* Medicine Card 3 */}
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">Cà Gai Leo</h4>
                      <p className="text-xs text-gray-600">Mã lô: CGL2025-02</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Đã hết</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Số lượng còn lại</span>
                      <span className="font-bold text-gray-900">0g / 500g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-gray-600">Ngày nhận</div>
                      <div className="font-semibold">10/12/2024</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Đã hết ngày</div>
                      <div className="font-semibold text-red-600">20/01/2025</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium">
                    <i className="ri-add-line mr-1"></i>
                    Đặt lại ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <i className="ri-history-line text-teal-600"></i>
                Lịch Sử Giao Hàng
              </h3>
              <div className="space-y-3">
                {[
                  { id: 1, medicine: 'Đương Quy', batch: 'DQ2025-01', quantity: '500g', date: '05/01/2025', status: 'Đã giao' },
                  { id: 2, medicine: 'Sâm Ngọc Linh', batch: 'SNL2024-12', quantity: '300g', date: '15/12/2024', status: 'Đã giao' },
                  { id: 3, medicine: 'Cà Gai Leo', batch: 'CGL2024-11', quantity: '500g', date: '10/12/2024', status: 'Đã giao' },
                  { id: 4, medicine: 'Đương Quy', batch: 'DQ2024-12', quantity: '500g', date: '05/12/2024', status: 'Đã giao' },
                ].map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <i className="ri-checkbox-circle-line text-teal-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{delivery.medicine}</h4>
                        <p className="text-xs text-gray-600">Mã lô: {delivery.batch} • {delivery.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">{delivery.date}</div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {delivery.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Premium - Lô Tuyển Chọn */}
        {activeTab === 'premium' && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <i className="ri-star-fill text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Lô Tuyển Chọn Premium</h2>
                  <p className="text-gray-700">Những lô dược liệu chất lượng cao, được tuyển chọn kỹ lưỡng với hàm lượng hoạt chất vượt trội</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Tổng lô Premium</div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Đang có sẵn</div>
                  <div className="text-2xl font-bold text-emerald-600">8</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Hàm lượng TB</div>
                  <div className="text-2xl font-bold text-amber-600">+45%</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Giá Premium</div>
                  <div className="text-2xl font-bold text-orange-600">+25%</div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên dược liệu, mã lô..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Tất cả loại</option>
                    <option>Sâm Ngọc Linh</option>
                    <option>Đương Quy</option>
                    <option>Cà Gai Leo</option>
                    <option>Nghệ</option>
                    <option>Khác</option>
                  </select>
                  <select className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Sắp xếp: Nổi bật nhất</option>
                    <option>Hàm lượng cao nhất</option>
                    <option>Giá tăng dần</option>
                    <option>Giá giảm dần</option>
                    <option>Mới nhất</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Premium Batch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Premium Batch 1 */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-star-fill mr-1"></i>
                      PREMIUM
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                      Còn hàng
                    </span>
                  </div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=Premium%20Vietnamese%20Ngoc%20Linh%20ginseng%20root%20on%20white%20background%20high%20quality%20pharmaceutical%20grade%20medicinal%20herb&width=400&height=300&seq=snl2025&orientation=landscape"
                    alt="Sâm Ngọc Linh Premium"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-semibold">Hàm lượng Saponin: 12.5%</p>
                    <p className="text-white/90 text-xs">Tiêu chuẩn: 8.0% (+56% cao hơn)</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Sâm Ngọc Linh Premium</h3>
                      <p className="text-sm text-gray-600">Mã lô: SNL2025-PREMIUM-01</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                      <div className="text-xs text-gray-600 mb-1">Vùng trồng</div>
                      <div className="font-semibold text-gray-900 text-sm">Ngọc Linh - Kon Tum</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">Tuổi cây</div>
                      <div className="font-semibold text-gray-900 text-sm">7 năm</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">Độ cao</div>
                      <div className="font-semibold text-gray-900 text-sm">1,800m</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                      <div className="text-xs text-gray-600 mb-1">Sản lượng</div>
                      <div className="font-semibold text-gray-900 text-sm">50kg</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Hàm lượng Hoạt chất</span>
                      <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">+56%</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-700 mb-1">12.5% Saponin</div>
                    <div className="text-xs text-gray-600">Tiêu chuẩn: 8.0% • Vượt trội: +4.5%</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                    <div className="text-xs text-gray-600 mb-2">Chứng chỉ</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">GACP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">VietGAP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Organic</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Premium Select</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-600">Giá Premium</div>
                      <div className="text-xl font-bold text-gray-900">3,250,000 đ/kg</div>
                      <div className="text-xs text-gray-500 line-through">Giá thường: 2,600,000 đ/kg</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <i className="ri-eye-line mr-1"></i>
                      Xem chi tiết
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                      <i className="ri-shopping-cart-line mr-1"></i>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>

              {/* Premium Batch 2 */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-star-fill mr-1"></i>
                      PREMIUM
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                      Còn hàng
                    </span>
                  </div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=Traditional%20Chinese%20medicine%20Angelica%20sinensis%20root%20dried%20herb%20on%20white%20background%20high%20quality%20pharmaceutical%20grade&width=400&height=300&seq=dq2025&orientation=landscape"
                    alt="Đương Quy Premium"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-semibold">Hàm lượng Ligustilide: 1.2%</p>
                    <p className="text-white/90 text-xs">Tiêu chuẩn: 0.2% (+500% cao hơn)</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Đương Quy Premium</h3>
                      <p className="text-sm text-gray-600">Mã lô: DQ2025-PREMIUM-02</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                      <div className="text-xs text-gray-600 mb-1">Vùng trồng</div>
                      <div className="font-semibold text-gray-900 text-sm">Sapa - Lào Cai</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">Tuổi cây</div>
                      <div className="font-semibold text-gray-900 text-sm">4 năm</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">Độ cao</div>
                      <div className="font-semibold text-gray-900 text-sm">1,500m</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                      <div className="text-xs text-gray-600 mb-1">Sản lượng</div>
                      <div className="font-semibold text-gray-900 text-sm">120kg</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Hàm lượng Hoạt chất</span>
                      <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">+500%</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-700 mb-1">1.2% Ligustilide</div>
                    <div className="text-xs text-gray-600">Tiêu chuẩn: 0.2% • Vượt trội: +1.0%</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                    <div className="text-xs text-gray-600 mb-2">Chứng chỉ</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">GACP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">VietGAP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Organic</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Premium Select</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-600">Giá Premium</div>
                      <div className="text-xl font-bold text-gray-900">1,850,000 đ/kg</div>
                      <div className="text-xs text-gray-500 line-through">Giá thường: 1,480,000 đ/kg</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <i className="ri-eye-line mr-1"></i>
                      Xem chi tiết
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                      <i className="ri-shopping-cart-line mr-1"></i>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>

              {/* Premium Batch 3 */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-star-fill mr-1"></i>
                      PREMIUM
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-lg">
                      Sắp hết
                    </span>
                  </div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=Solanum%20procumbens%20medicinal%20plant%20dried%20herb%20on%20white%20background%20pharmaceutical%20quality%20traditional%20medicine&width=400&height=300&seq=cgl2025&orientation=landscape"
                    alt="Cà Gai Leo Premium"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-semibold">Hàm lượng Alkaloid: 0.65%</p>
                    <p className="text-white/90 text-xs">Tiêu chuẩn: 0.3% (+117% cao hơn)</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Cà Gai Leo Premium</h3>
                      <p className="text-sm text-gray-600">Mã lô: CGL2025-PREMIUM-03</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                      <div className="text-xs text-gray-600 mb-1">Vùng trồng</div>
                      <div className="font-semibold text-gray-900 text-sm">Tây Nguyên</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">Tuổi cây</div>
                      <div className="font-semibold text-gray-900 text-sm">3 năm</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">Độ cao</div>
                      <div className="font-semibold text-gray-900 text-sm">800m</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                      <div className="text-xs text-gray-600 mb-1">Sản lượng</div>
                      <div className="font-semibold text-gray-900 text-sm">25kg</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Hàm lượng Hoạt chất</span>
                      <span className="px-2 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">+117%</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-700 mb-1">0.65% Alkaloid</div>
                    <div className="text-xs text-gray-600">Tiêu chuẩn: 0.3% • Vượt trội: +0.35%</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                    <div className="text-xs text-gray-600 mb-2">Chứng chỉ</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">GACP</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">VietGAP</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Premium Select</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-600">Giá Premium</div>
                      <div className="text-xl font-bold text-gray-900">950,000 đ/kg</div>
                      <div className="text-xs text-gray-500 line-through">Giá thường: 760,000 đ/kg</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      <i className="ri-eye-line mr-1"></i>
                      Xem chi tiết
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                      <i className="ri-shopping-cart-line mr-1"></i>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features Info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-amber-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-vip-crown-line text-amber-600"></i>
                Tại sao chọn Lô Premium?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-medal-line text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Chất lượng Vượt trội</h4>
                  <p className="text-sm text-gray-700">Hàm lượng hoạt chất cao hơn 40-500% so với tiêu chuẩn, đảm bảo hiệu quả điều trị tối ưu</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-shield-check-line text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Tuyển chọn Kỹ lưỡng</h4>
                  <p className="text-sm text-gray-700">Mỗi lô được kiểm tra và tuyển chọn từ hàng trăm lô thường, chỉ lấy những lô xuất sắc nhất</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <i className="ri-file-certificate-line text-2xl text-white"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Chứng chỉ Đầy đủ</h4>
                  <p className="text-sm text-gray-700">Được chứng nhận GACP, VietGAP, Organic và Premium Select - tiêu chuẩn cao nhất</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: VITA Wiki */}
        {activeTab === 'wiki' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <i className="ri-book-open-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">VITA Wiki - Bách Khoa Toàn Thư Dược Liệu</h2>
                  <p className="text-gray-700">Thư viện kiến thức dược liệu được đóng góp bởi cộng đồng bác sĩ, dược sĩ và chuyên gia</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Tổng bài viết</div>
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Đóng góp viên</div>
                  <div className="text-2xl font-bold text-emerald-600">342</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Lượt xem tháng này</div>
                  <div className="text-2xl font-bold text-blue-600">15.8K</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Cập nhật gần nhất</div>
                  <div className="text-2xl font-bold text-orange-600">Hôm nay</div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết, dược liệu, hoạt chất, công dụng..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Tất cả danh mục</option>
                    <option>Dược liệu Việt Nam</option>
                    <option>Lý thuyết Đông Y</option>
                    <option>Kinh nghiệm Lâm sàng</option>
                    <option>Công thức Điều trị</option>
                    <option>Nghiên cứu Khoa học</option>
                  </select>
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                    <i className="ri-add-line mr-1"></i>
                    Viết bài mới
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục Chính</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Dược liệu Việt Nam', icon: 'ri-plant-line', count: 456, color: 'emerald' },
                  { name: 'Lý thuyết Đông Y', icon: 'ri-book-2-line', count: 234, color: 'blue' },
                  { name: 'Kinh nghiệm Lâm sàng', icon: 'ri-user-heart-line', count: 312, color: 'purple' },
                  { name: 'Công thức Điều trị', icon: 'ri-flask-line', count: 189, color: 'orange' },
                  { name: 'Nghiên cứu Khoa học', icon: 'ri-microscope-line', count: 156, color: 'teal' },
                  { name: 'An toàn & Tương tác', icon: 'ri-shield-check-line', count: 98, color: 'red' },
                  { name: 'Bào chế & Sử dụng', icon: 'ri-settings-3-line', count: 145, color: 'indigo' },
                  { name: 'Lịch sử & Văn hóa', icon: 'ri-history-line', count: 67, color: 'amber' },
                ].map((category, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
                    <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                      <i className={`${category.icon} text-2xl text-${category.color}-600`}></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{category.name}</h4>
                    <p className="text-xs text-gray-600">{category.count} bài viết</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Articles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-star-fill text-amber-500"></i>
                  Bài viết Nổi bật
                </h3>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                  Xem tất cả →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Article 1 */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Premium%20Vietnamese%20Ngoc%20Linh%20ginseng%20root%20on%20white%20background%20high%20quality%20pharmaceutical%20grade%20medicinal%20herb&width=400&height=300&seq=snl2025&orientation=landscape"
                      alt="Sâm Ngọc Linh"
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      <i className="ri-star-fill mr-1"></i>
                      Nổi bật
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Dược liệu Việt Nam</span>
                      <span className="text-xs text-gray-500">15/01/2025</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Sâm Ngọc Linh: Từ Nghiên cứu đến Ứng dụng Lâm sàng</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      Tổng hợp đầy đủ về Sâm Ngọc Linh - "Quốc bảo" của Việt Nam: Đặc điểm sinh học, hoạt chất chính, công dụng và kinh nghiệm điều trị...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          BS
                        </div>
                        <span className="text-xs text-gray-600">BS. Nguyễn Văn A</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-eye-line"></i>
                          2.4K
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-thumb-up-line"></i>
                          89
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Article 2 */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Traditional%20Chinese%20medicine%20Angelica%20sinensis%20root%20dried%20herb%20on%20white%20background%20high%20quality%20pharmaceutical%20grade&width=400&height=300&seq=dq2025&orientation=landscape"
                      alt="Đương Quy"
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                      <i className="ri-star-fill mr-1"></i>
                      Nổi bật
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Lý thuyết Đông Y</span>
                      <span className="text-xs text-gray-500">12/01/2025</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Đương Quy: Bổ Huyết, Hoạt Huyết trong Đông Y</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      Phân tích chi tiết về tính vị, quy kinh, công năng và ứng dụng lâm sàng của Đương Quy trong điều trị các bệnh về huyết...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          TS
                        </div>
                        <span className="text-xs text-gray-600">TS. Trần Thị B</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-eye-line"></i>
                          1.8K
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-thumb-up-line"></i>
                          67
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Article 3 */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Solanum%20procumbens%20medicinal%20plant%20dried%20herb%20on%20white%20background%20pharmaceutical%20quality%20traditional%20medicine&width=400&height=300&seq=cgl2025&orientation=landscape"
                      alt="Cà Gai Leo"
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                      <i className="ri-user-heart-line mr-1"></i>
                      Lâm sàng
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Kinh nghiệm Lâm sàng</span>
                      <span className="text-xs text-gray-500">10/01/2025</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Cà Gai Leo trong Điều trị Viêm Gan: Kinh nghiệm 10 năm</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      Chia sẻ kinh nghiệm thực tế điều trị viêm gan B, C bằng Cà Gai Leo kết hợp với các vị thuốc khác...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          PGS
                        </div>
                        <span className="text-xs text-gray-600">PGS.TS Lê Văn C</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-eye-line"></i>
                          3.2K
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-thumb-up-line"></i>
                          124
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-time-line text-teal-600"></i>
                  Bài viết Mới nhất
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Tất cả</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Hôm nay</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Tuần này</button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Nghệ và Curcumin: Cơ chế Tác dụng và Ứng dụng', category: 'Nghiên cứu Khoa học', author: 'TS. Phạm Thị D', date: '18/01/2025', views: 892, likes: 45, verified: true },
                  { id: 2, title: 'Bài thuốc Cổ phương: Tứ Vật Thang và Biến thể', category: 'Công thức Điều trị', author: 'BS. Hoàng Văn E', date: '17/01/2025', views: 654, likes: 38, verified: true },
                  { id: 3, title: 'Tương tác Thuốc giữa Dược liệu và Tây y: Lưu ý Quan trọng', category: 'An toàn & Tương tác', author: 'PGS.TS Nguyễn Thị F', date: '16/01/2025', views: 1200, likes: 67, verified: true },
                  { id: 4, title: 'Bào chế Thuốc Thang: Kỹ thuật và Lưu ý', category: 'Bào chế & Sử dụng', author: 'DS. Trần Văn G', date: '15/01/2025', views: 523, likes: 29, verified: false },
                  { id: 5, title: 'Lịch sử Dược liệu Việt Nam qua các Triều đại', category: 'Lịch sử & Văn hóa', author: 'TS. Lê Thị H', date: '14/01/2025', views: 987, likes: 56, verified: true },
                ].map((article) => (
                  <div key={article.id} className="flex gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-file-text-line text-3xl text-teal-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{article.category}</span>
                        <span className="text-xs text-gray-500">{article.date}</span>
                        {article.verified && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            <i className="ri-verify-badge-line mr-1"></i>
                            Đã xác thực
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">{article.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {article.author.split(' ').pop()?.[0]}
                          </div>
                          <span className="text-sm text-gray-600">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <i className="ri-eye-line"></i>
                            {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-thumb-up-line"></i>
                            {article.likes}
                          </span>
                          <button className="text-amber-600 hover:text-amber-700">
                            <i className="ri-bookmark-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution Stats */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-team-line text-teal-600"></i>
                Đóng góp của Bạn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <i className="ri-file-edit-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Bài viết đã viết</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <i className="ri-edit-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">34</div>
                      <div className="text-sm text-gray-600">Chỉnh sửa đã thực hiện</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <i className="ri-thumb-up-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1.2K</div>
                      <div className="text-sm text-gray-600">Lượt thích nhận được</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                <i className="ri-add-line mr-2"></i>
                Đóng góp bài viết mới
              </button>
            </div>
          </div>
        )}

        {/* Tab: Cây Thuốc Lạ - Rare Herbs */}
        {activeTab === 'rare-herb' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <i className="ri-plant-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Cây Thuốc Lạ & Quý Hiếm</h2>
                  <p className="text-gray-700">Khám phá những loài dược liệu quý hiếm, mới phát hiện hoặc ít được biết đến trong y học cổ truyền</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Tổng số loài</div>
                  <div className="text-2xl font-bold text-gray-900">127</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Mới phát hiện</div>
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Đang nghiên cứu</div>
                  <div className="text-2xl font-bold text-blue-600">23</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Nguy cơ tuyệt chủng</div>
                  <div className="text-2xl font-bold text-red-600">8</div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên, tên khoa học, vùng phân bố..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Tất cả trạng thái</option>
                    <option>Mới phát hiện</option>
                    <option>Đang nghiên cứu</option>
                    <option>Đã xác nhận</option>
                    <option>Nguy cơ tuyệt chủng</option>
                  </select>
                  <select className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Tất cả vùng</option>
                    <option>Tây Bắc</option>
                    <option>Việt Bắc</option>
                    <option>Tây Nguyên</option>
                    <option>Miền Trung</option>
                    <option>Nam Bộ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rare Herb Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Phân loại Cây Thuốc Lạ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Mới Phát hiện', icon: 'ri-star-line', count: 12, color: 'emerald', desc: 'Loài mới được phát hiện' },
                  { name: 'Quý Hiếm', icon: 'ri-gem-line', count: 45, color: 'purple', desc: 'Rất ít trong tự nhiên' },
                  { name: 'Đang Nghiên cứu', icon: 'ri-microscope-line', count: 23, color: 'blue', desc: 'Đang phân tích hoạt chất' },
                  { name: 'Nguy cơ Tuyệt chủng', icon: 'ri-alert-line', count: 8, color: 'red', desc: 'Cần bảo tồn gấp' },
                  { name: 'Ít Được biết', icon: 'ri-question-line', count: 34, color: 'orange', desc: 'Thông tin hạn chế' },
                  { name: 'Dân tộc Thiểu số', icon: 'ri-group-line', count: 19, color: 'teal', desc: 'Dùng trong y học dân tộc' },
                  { name: 'Cổ xưa', icon: 'ri-history-line', count: 15, color: 'amber', desc: 'Từ thời cổ đại' },
                  { name: 'Độc tính', icon: 'ri-skull-line', count: 6, color: 'red', desc: 'Cần cẩn trọng' },
                ].map((category, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                    <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                      <i className={`${category.icon} text-2xl text-${category.color}-600`}></i>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{category.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{category.desc}</p>
                    <p className="text-lg font-bold text-gray-900">{category.count} loài</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Rare Herbs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-star-fill text-purple-500"></i>
                  Cây Thuốc Lạ Nổi bật
                </h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Xem tất cả →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Rare Herb 1 */}
                <div className="border-2 border-purple-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-white to-purple-50/30">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Rare%20medicinal%20plant%20Vietnam%20herb%20endangered%20species%20traditional%20medicine%20white%20background&width=400&height=300&seq=rare1&orientation=landscape"
                      alt="Lan Kim Tuyến"
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-alert-line mr-1"></i>
                      NGUY CẤP
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-gem-line mr-1"></i>
                      QUÝ HIẾM
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Quý Hiếm</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Tây Bắc</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">Lan Kim Tuyến</h4>
                    <p className="text-sm text-gray-600 italic mb-3">Anoectochilus roxburghii</p>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      Loài lan quý hiếm được biết đến với khả năng bổ dưỡng, tăng cường sức đề kháng. Đang có nguy cơ tuyệt chủng do khai thác quá mức...
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Vùng phân bố</div>
                        <div className="font-semibold text-gray-900 text-sm">Sapa, Lai Châu</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Tình trạng</div>
                        <div className="font-semibold text-red-600 text-sm">Nguy cấp</div>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                      <div className="text-xs text-gray-600 mb-1">Công dụng chính</div>
                      <div className="text-sm font-semibold text-gray-900">Bổ khí huyết, tăng cường miễn dịch, hỗ trợ điều trị ung thư</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Chi tiết
                      </button>
                      <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                        <i className="ri-bookmark-line mr-1"></i>
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rare Herb 2 */}
                <div className="border-2 border-emerald-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-white to-emerald-50/30">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=New%20discovered%20medicinal%20plant%20Vietnam%20traditional%20herb%20research%20white%20background&width=400&height=300&seq=rare2&orientation=landscape"
                      alt="Cây Ba Kích Tím"
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-star-line mr-1"></i>
                      MỚI PHÁT HIỆN
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-microscope-line mr-1"></i>
                      ĐANG NC
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Mới phát hiện</span>
                      <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">Tây Nguyên</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">Ba Kích Tím</h4>
                    <p className="text-sm text-gray-600 italic mb-3">Morinda officinalis (Biến thể tím)</p>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      Biến thể màu tím mới được phát hiện tại Tây Nguyên, có hàm lượng anthocyanin cao, có tiềm năng trong điều trị viêm khớp...
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Vùng phân bố</div>
                        <div className="font-semibold text-gray-900 text-sm">Kon Tum, Gia Lai</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Phát hiện</div>
                        <div className="font-semibold text-emerald-600 text-sm">2024</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">Công dụng chính</div>
                      <div className="text-sm font-semibold text-gray-900">Bổ thận, tráng dương, chống viêm, giảm đau khớp</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Chi tiết
                      </button>
                      <button className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
                        <i className="ri-bookmark-line mr-1"></i>
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rare Herb 3 */}
                <div className="border-2 border-orange-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-white to-orange-50/30">
                  <div className="relative">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Ethnic%20minority%20medicinal%20plant%20Vietnam%20traditional%20medicine%20rare%20herb&width=400&height=300&seq=rare3&orientation=landscape"
                      alt="Cây Xạ Đen"
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-group-line mr-1"></i>
                      DÂN TỘC
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-teal-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-question-line mr-1"></i>
                      ÍT BIẾT
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Dân tộc thiểu số</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Việt Bắc</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">Xạ Đen (H'Mông)</h4>
                    <p className="text-sm text-gray-600 italic mb-3">Celastrus hindsii (Tên H'Mông)</p>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      Loài cây được người H'Mông sử dụng từ xa xưa, có tác dụng thanh nhiệt, giải độc, hỗ trợ điều trị các khối u...
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-orange-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Vùng phân bố</div>
                        <div className="font-semibold text-gray-900 text-sm">Hòa Bình, Sơn La</div>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Nhóm dân tộc</div>
                        <div className="font-semibold text-gray-900 text-sm">H'Mông</div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">Công dụng chính</div>
                      <div className="text-sm font-semibold text-gray-900">Thanh nhiệt giải độc, tiêu u bướu, hỗ trợ điều trị ung thư</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Chi tiết
                      </button>
                      <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                        <i className="ri-bookmark-line mr-1"></i>
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Discoveries */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-time-line text-teal-600"></i>
                  Phát hiện Gần đây
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Tháng này</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Năm nay</button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Cây Lá Khôi', scientificName: 'Ardisia silvestris', location: 'Đà Lạt, Lâm Đồng', date: '15/01/2025', status: 'Mới phát hiện', researcher: 'TS. Nguyễn Văn A', uses: 'Điều trị dạ dày, viêm loét' },
                  { id: 2, name: 'Hoàng Liên Ô Rô', scientificName: 'Mahonia bealei', location: 'Tam Đảo, Vĩnh Phúc', date: '08/01/2025', status: 'Đang nghiên cứu', researcher: 'PGS.TS Trần Thị B', uses: 'Kháng khuẩn, chống viêm' },
                  { id: 3, name: 'Bồ Công Anh Việt', scientificName: 'Taraxacum vietnamense', location: 'Mộc Châu, Sơn La', date: '02/01/2025', status: 'Mới phát hiện', researcher: 'TS. Lê Văn C', uses: 'Thanh nhiệt, lợi tiểu, hỗ trợ gan' },
                  { id: 4, name: 'Cây Mật Nhân Rừng', scientificName: 'Eurycoma longifolia (var. vietnamensis)', location: 'Bình Phước', date: '28/12/2024', status: 'Đang nghiên cứu', researcher: 'BS. Phạm Thị D', uses: 'Tăng cường sinh lý, bổ thận' },
                ].map((herb) => (
                  <div key={herb.id} className="flex gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-plant-line text-4xl text-purple-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{herb.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          herb.status === 'Mới phát hiện' ? 'bg-emerald-100 text-emerald-700' :
                          herb.status === 'Đang nghiên cứu' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {herb.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-2">{herb.scientificName}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-2">
                        <div>
                          <span className="text-gray-600">Vùng:</span>
                          <span className="ml-1 font-semibold text-gray-900">{herb.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phát hiện:</span>
                          <span className="ml-1 font-semibold text-gray-900">{herb.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Nghiên cứu:</span>
                          <span className="ml-1 font-semibold text-gray-900">{herb.researcher}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Công dụng:</span>
                          <span className="ml-1 font-semibold text-gray-900">{herb.uses}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conservation Alert */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-alert-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cảnh báo Bảo tồn</h3>
                  <p className="text-gray-700 mb-4">
                    Hiện có <strong className="text-red-600">8 loài cây thuốc quý</strong> đang có nguy cơ tuyệt chủng do khai thác quá mức và mất môi trường sống. 
                    Vui lòng không khai thác bừa bãi và báo cáo nếu phát hiện những loài này trong tự nhiên.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                      <i className="ri-file-warning-line mr-1"></i>
                      Xem danh sách nguy cấp
                    </button>
                    <button className="px-6 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                      <i className="ri-information-line mr-1"></i>
                      Hướng dẫn bảo tồn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Feedback */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            {/* Form gửi phản hồi */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Gửi Phản Hồi Lâm Sàng Mới</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Mã bệnh nhân (Ẩn danh)</label>
                    <input
                      type="text"
                      placeholder="BN-2025-***"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Mã lô dược liệu</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer">
                      <option>SNL2025-03 - Sâm Ngọc Linh</option>
                      <option>DQ2025-01 - Đương Quy</option>
                      <option>CGL2025-02 - Cà Gai Leo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Chỉ định điều trị</label>
                    <input
                      type="text"
                      placeholder="VD: Suy nhược cơ thể"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Liều dùng</label>
                    <input
                      type="text"
                      placeholder="VD: 6g/ngày x 30 ngày"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Hiệu quả điều trị</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer">
                    <option>Tốt</option>
                    <option>Khá</option>
                    <option>Kém</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Đánh giá chất lượng (1-5 sao)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <i className="ri-star-fill text-2xl text-yellow-400"></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Tác dụng phụ (nếu có)</label>
                  <input
                    type="text"
                    placeholder="VD: Đầy bụng nhẹ"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Ghi chú chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả chi tiết về kết quả điều trị, cảm nhận của bệnh nhân..."
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-send-plane-fill mr-2"></i>
                  Gửi Phản Hồi
                </button>
              </div>
            </div>

            {/* Danh sách phản hồi đã gửi */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Phản Hồi Đã Gửi</h3>
              <div className="space-y-3">
                {clinicalReports.map((report) => (
                  <div key={report.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{report.medicineName}</h4>
                        <p className="text-xs text-gray-600">Mã lô: {report.batchCode}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getEffectivenessColor(report.effectiveness)}`}>
                        {report.effectiveness}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Chỉ định</div>
                        <div className="font-semibold text-gray-800">{report.indication}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Liều dùng</div>
                        <div className="font-semibold text-gray-800">{report.dosage}</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-2 mb-3 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-star-fill text-yellow-500"></i>
                        <span className="font-semibold">{report.rating}/5 sao</span>
                      </div>
                      <div className="text-gray-600">Tác dụng phụ: {report.sideEffects}</div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{report.notes}</p>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{report.doctorName}</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Feedback Loop - Notification to HTX */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-information-line text-2xl"></i>
                <h3 className="font-bold">Dữ liệu của bạn rất quan trọng!</h3>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Phản hồi lâm sàng của bạn sẽ được gửi trực tiếp đến Trung tâm Gen & Khoa học để tối ưu hóa quy trình canh tác và nâng cao chất lượng dược liệu.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <i className="ri-notification-line"></i>
                  Dữ liệu quay ngược về HTX
                </h4>
                <p className="text-sm opacity-90">
                  Khi bạn đánh giá dược liệu 5 sao, nông dân/HTX sẽ nhận được thông báo: 
                  <strong>"Chúc mừng! Dược liệu lô vừa rồi của bạn được BS. Nguyễn Văn A (BV YHCT Hà Nội) đánh giá 5 sao về hiệu quả điều trị."</strong>
                </p>
                <p className="text-xs opacity-75 mt-2">
                  → Đây là động lực tinh thần cực lớn cho người trồng!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Order */}
        {activeTab === 'order' && (
          <div className="space-y-6">
            {/* Form đặt mẫu */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Yêu Cầu Mẫu Thử</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Chọn dược liệu</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer">
                    <option>SNL2025-03 - Sâm Ngọc Linh</option>
                    <option>DQ2025-01 - Đương Quy</option>
                    <option>CGL2025-02 - Cà Gai Leo</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Số lượng</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer">
                    <option>100g</option>
                    <option>300g</option>
                    <option>500g</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Mục đích sử dụng</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm cursor-pointer">
                    <option>Kiểm tra chất lượng</option>
                    <option>Thử nghiệm lâm sàng</option>
                    <option>Nghiên cứu khoa học</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Địa chỉ nhận hàng</label>
                  <textarea
                    rows={3}
                    placeholder="Nhập địa chỉ phòng khám/bệnh viện..."
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none text-sm resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-send-plane-fill mr-2"></i>
                  Gửi Yêu Cầu
                </button>
              </div>
            </div>

            {/* Danh sách đơn đặt mẫu */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Đơn Đặt Mẫu Của Tôi</h3>
              <div className="space-y-3">
                {sampleOrders.map((order) => (
                  <div key={order.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{order.medicineName}</h4>
                        <p className="text-xs text-gray-600">Mã lô: {order.batchCode}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Số lượng</div>
                        <div className="font-semibold text-gray-800">{order.quantity}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Mục đích</div>
                        <div className="font-semibold text-gray-800">{order.purpose}</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-calendar-line"></i>
                        <span>Đặt ngày: {order.orderDate}</span>
                      </div>
                      {order.status === 'Đang giao' && (
                        <div className="flex items-center gap-2">
                          <i className="ri-truck-line"></i>
                          <span>Dự kiến: {order.expectedDate}</span>
                        </div>
                      )}
                      {order.status === 'Đã giao' && (
                        <div className="flex items-center gap-2">
                          <i className="ri-check-line"></i>
                          <span>Đã giao: {order.deliveredDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-gift-line text-2xl"></i>
                <h3 className="font-bold">Ưu đãi Verified Expert</h3>
              </div>
              <p className="text-sm opacity-90">
                Tài khoản đã xác thực được miễn phí mẫu thử tối đa 500g/tháng. Vui lòng sử dụng mẫu thử cho mục đích nghiên cứu và phản hồi chất lượng.
              </p>
            </div>
          </div>
        )}

        {/* Tab: Bệnh viện - Hospital Management */}
        {activeTab === 'hospital' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <i className="ri-hospital-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Quản lý Hợp tác Bệnh viện</h2>
                  <p className="text-gray-700">Kết nối với bệnh viện, quản lý hợp tác, và theo dõi các dự án nghiên cứu lâm sàng</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Bệnh viện đối tác</div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Dự án nghiên cứu</div>
                  <div className="text-2xl font-bold text-emerald-600">8</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Bệnh nhân tham gia</div>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Xuất bản nghiên cứu</div>
                  <div className="text-2xl font-bold text-purple-600">5</div>
                </div>
              </div>
            </div>

            {/* Partner Hospitals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-hospital-line text-blue-600"></i>
                  Bệnh viện Đối tác
                </h3>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Thêm đối tác
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, name: 'BV Y học Cổ truyền Trung ương', location: 'Hà Nội', level: 'Tuyến Trung ương', projects: 3, patients: 456, status: 'Đang hợp tác', type: 'Đông Y' },
                  { id: 2, name: 'BV Chợ Rẫy', location: 'TP.HCM', level: 'Tuyến Trung ương', projects: 2, patients: 312, status: 'Đang hợp tác', type: 'Tây Y kết hợp' },
                  { id: 3, name: 'BV Đa khoa Yên Bái', location: 'Yên Bái', level: 'Tuyến Tỉnh', projects: 1, patients: 189, status: 'Đang hợp tác', type: 'Đông Y' },
                  { id: 4, name: 'BV Y học Cổ truyền Bình Dương', location: 'Bình Dương', level: 'Tuyến Tỉnh', projects: 2, patients: 234, status: 'Đàm phán', type: 'Đông Y' },
                  { id: 5, name: 'BV Đa khoa Kon Tum', location: 'Kon Tum', level: 'Tuyến Tỉnh', projects: 0, patients: 0, status: 'Đề xuất', type: 'Tây Y kết hợp' },
                  { id: 6, name: 'BV 108 - Quân y', location: 'Hà Nội', level: 'Tuyến Trung ương', projects: 1, patients: 56, status: 'Hợp tác đặc biệt', type: 'Quân y' },
                ].map((hospital) => (
                  <div key={hospital.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-lg">{hospital.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{hospital.location} • {hospital.level}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          hospital.status === 'Đang hợp tác' ? 'bg-green-100 text-green-700' :
                          hospital.status === 'Đàm phán' ? 'bg-yellow-100 text-yellow-700' :
                          hospital.status === 'Đề xuất' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {hospital.status}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <i className="ri-hospital-line text-2xl text-blue-600"></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Dự án</div>
                        <div className="font-bold text-gray-900 text-lg">{hospital.projects}</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Bệnh nhân</div>
                        <div className="font-bold text-gray-900 text-lg">{hospital.patients}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 mb-4">
                      <div className="text-xs text-gray-600 mb-1">Loại hình</div>
                      <div className="text-sm font-semibold text-gray-900">{hospital.type}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Chi tiết
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        <i className="ri-message-3-line mr-1"></i>
                        Liên hệ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Projects */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-flask-line text-purple-600"></i>
                  Dự án Nghiên cứu Lâm sàng
                </h3>
                <button className="px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Tạo dự án mới
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Hiệu quả Sâm Ngọc Linh trong điều trị Suy nhược sau COVID-19', hospital: 'BV Y học Cổ truyền Trung ương', phase: 'Phase II', patients: 120, startDate: '01/2024', endDate: '12/2025', status: 'Đang triển khai', progress: 65 },
                  { id: 2, title: 'Nghiên cứu Đương Quy trong điều trị Thiếu máu ở phụ nữ', hospital: 'BV Chợ Rẫy', phase: 'Phase III', patients: 200, startDate: '06/2023', endDate: '06/2025', status: 'Đang triển khai', progress: 78 },
                  { id: 3, title: 'Cà Gai Leo trong điều trị Viêm gan B mạn tính', hospital: 'BV Đa khoa Yên Bái', phase: 'Phase I', patients: 50, startDate: '03/2024', endDate: '03/2026', status: 'Đang triển khai', progress: 42 },
                  { id: 4, title: 'Đánh giá An toàn và Hiệu quả Nghệ Nano trong viêm khớp', hospital: 'BV Y học Cổ truyền Bình Dương', phase: 'Phase II', patients: 150, startDate: '09/2024', endDate: '09/2026', status: 'Kế hoạch', progress: 0 },
                ].map((project) => (
                  <div key={project.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{project.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === 'Đang triển khai' ? 'bg-green-100 text-green-700' :
                            project.status === 'Kế hoạch' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {project.status}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            {project.phase}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{project.hospital}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Bệnh nhân:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.patients}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Bắt đầu:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.startDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Kết thúc:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.endDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tiến độ:</span>
                            <span className="ml-2 font-semibold text-emerald-600">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {project.progress > 0 && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-file-list-3-line mr-1"></i>
                        Báo cáo
                      </button>
                      <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Cases */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-file-medical-line text-teal-600"></i>
                Case Lâm sàng Nổi bật
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 1, patient: 'BN-2024-001', diagnosis: 'Suy nhược sau COVID-19', medicine: 'Sâm Ngọc Linh', hospital: 'BV Y học Cổ truyền Trung ương', outcome: 'Cải thiện tốt', date: '15/01/2025', doctor: 'BS. Nguyễn Văn A' },
                  { id: 2, patient: 'BN-2024-045', diagnosis: 'Thiếu máu sau sinh', medicine: 'Đương Quy', hospital: 'BV Chợ Rẫy', outcome: 'Hồi phục hoàn toàn', date: '12/01/2025', doctor: 'BS. Trần Thị B' },
                  { id: 3, patient: 'BN-2024-078', diagnosis: 'Viêm gan B mạn tính', medicine: 'Cà Gai Leo', hospital: 'BV Đa khoa Yên Bái', outcome: 'Chuyển biến tích cực', date: '10/01/2025', doctor: 'BS. Lê Văn C' },
                  { id: 4, patient: 'BN-2024-112', diagnosis: 'Viêm khớp dạng thấp', medicine: 'Nghệ Nano', hospital: 'BV Y học Cổ truyền Bình Dương', outcome: 'Giảm đau đáng kể', date: '08/01/2025', doctor: 'BS. Phạm Thị D' },
                ].map((caseItem) => (
                  <div key={caseItem.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{caseItem.patient}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {caseItem.outcome}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{caseItem.diagnosis}</p>
                        <p className="text-sm text-gray-600 mb-2">Dùng: <span className="font-semibold">{caseItem.medicine}</span></p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-gray-600">Bệnh viện:</span>
                        <p className="font-semibold text-gray-900">{caseItem.hospital}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Bác sĩ:</span>
                        <p className="font-semibold text-gray-900">{caseItem.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{caseItem.date}</span>
                      <button className="text-teal-600 hover:text-teal-700 font-medium">
                        Xem chi tiết →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-file-paper-2-line text-indigo-600"></i>
                Công trình Nghiên cứu đã Xuất bản
              </h3>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Efficacy of Vietnamese Ginseng (Panax vietnamensis) in Post-COVID-19 Fatigue Syndrome', journal: 'Journal of Traditional and Complementary Medicine', date: '12/2024', authors: 'Nguyễn V.A., Trần T.B., et al.', impact: 'IF 3.5' },
                  { id: 2, title: 'Angelica sinensis in Treatment of Iron-Deficiency Anemia: A Randomized Controlled Trial', journal: 'Phytomedicine', date: '10/2024', authors: 'Trần T.B., Nguyễn V.A., et al.', impact: 'IF 5.2' },
                  { id: 3, title: 'Solanum procumbens Extract for Chronic Hepatitis B: Safety and Efficacy Study', journal: 'World Journal of Hepatology', date: '08/2024', authors: 'Lê V.C., Phạm T.D., et al.', impact: 'IF 4.1' },
                ].map((pub) => (
                  <div key={pub.id} className="bg-white rounded-xl p-5 border-2 border-indigo-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">{pub.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{pub.journal}</p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Tác giả:</span> {pub.authors}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Xuất bản: <span className="font-semibold text-gray-900">{pub.date}</span></span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            {pub.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-download-line mr-1"></i>
                        Tải PDF
                      </button>
                      <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium">
                        <i className="ri-external-link-line mr-1"></i>
                        Xem online
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Community */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Diễn Đàn Chuyên Môn</h3>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-1"></i>
                  Tạo chủ đề mới
                </button>
              </div>

              <div className="space-y-3">
                {forumTopics.map((topic) => (
                  <div key={topic.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 flex-1">{topic.title}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                        {topic.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line"></i>
                        {topic.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-message-3-line"></i>
                        {topic.replies} phản hồi
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line"></i>
                        {topic.views} lượt xem
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      Hoạt động gần nhất: {topic.lastActivity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Webinar & Đào Tạo</h3>
              <div className="space-y-3">
                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <i className="ri-video-line text-2xl text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Hội thảo: Ứng dụng Sâm Ngọc Linh trong điều trị suy nhược</h4>
                      <p className="text-xs text-gray-600 mb-2">Diễn giả: PGS.TS Nguyễn Văn A - Trung tâm Gen & Khoa học VITA</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          25/01/2025 - 14:00
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          90 phút
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-teal-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-calendar-check-line mr-1"></i>
                    Đăng ký tham gia
                  </button>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="ri-play-circle-line text-2xl text-white"></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Video: Giới thiệu dòng Đương Quy VITA mới</h4>
                      <p className="text-xs text-gray-600 mb-2">Hàm lượng Ligustilide cao gấp 4 lần tiêu chuẩn</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-eye-line"></i>
                          1,234 lượt xem
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          15 phút
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-play-line mr-1"></i>
                    Xem ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

