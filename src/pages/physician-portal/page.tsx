import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function PhysicianPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'overview' | 'database' | 'subscription' | 'premium' | 'wiki' | 'rare-herb' | 'feedback' | 'order' | 'community' | 'formula-builder' | 'ingredient-sourcing' | 'verification' | 'lab-production' | 'commercial-link' | 'tele-clinic' | 'legacy-training'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('vita_physician_registration_data');
    return saved ? JSON.parse(saved) : {
      userType: 'physician',
      organizationName: '',
      specialty: '',
      representative: '',
      position: '',
      phone: '',
      email: '',
    };
  });

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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfilePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setProfileData({
      ...profileData,
      phone: value
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vita_physician_registration_data', JSON.stringify(profileData));
    alert('Thông tin đã được cập nhật!');
  };

  const roles = [
    { id: 'admin', name: 'HTX - Quản trị', icon: 'ri-dashboard-line', path: '/cooperative/dashboard' },
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

          {/* Menu Bar */}
          <div className="flex items-center justify-between gap-4 pb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-stethoscope-line text-xl sm:text-2xl text-white"></i>
            </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Cổng Chuyên gia Y học & Dược liệu</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">VITA Healer Portal - Từ Y lý đến Sản phẩm</p>
            </div>
          </div>

            {/* Main Menu Dropdown */}
            <div className="relative">
            <button
                onClick={() => setShowMainMenu(!showMainMenu)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm flex items-center gap-2 ${
                  showMainMenu
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
                <i className="ri-menu-line"></i>
                <span className="hidden sm:inline">Menu</span>
                <i className={`ri-arrow-down-s-line transition-transform ${showMainMenu ? 'rotate-180' : ''}`}></i>
            </button>

              {showMainMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMainMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-80 max-h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100 sticky top-0 bg-white">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Danh mục chức năng</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                          <i className="ri-stethoscope-line text-white text-lg"></i>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Cổng Chuyên gia</p>
                          <p className="text-xs text-gray-600">Y học & Dược liệu</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {/* Quick Access - Current Tab */}
                      <div className="px-4 py-2 bg-teal-50 border-l-4 border-teal-500 mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Đang xem</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-teal-700">
                          <i className="ri-eye-line"></i>
                          <span>{activeTab === 'profile' ? 'Hồ sơ' : activeTab === 'overview' ? 'Tổng quan' : activeTab === 'database' ? 'Tra cứu Dược liệu' : activeTab === 'subscription' ? 'Tủ Thuốc Định Kỳ' : activeTab === 'premium' ? 'Lô Tuyển Chọn' : activeTab === 'wiki' ? 'VITA Wiki' : activeTab === 'rare-herb' ? 'Cây Thuốc Lạ' : activeTab === 'feedback' ? 'Phản hồi Lâm sàng' : activeTab === 'order' ? 'Đặt mẫu' : activeTab === 'community' ? 'Cộng đồng' : activeTab === 'formula-builder' ? 'Công thức & Bài thuốc' : activeTab === 'ingredient-sourcing' ? 'Nguồn nguyên liệu' : activeTab === 'verification' ? 'Kiểm định R&D' : activeTab === 'lab-production' ? 'Sản xuất Demo' : activeTab === 'commercial-link' ? 'Kết nối Creator' : activeTab === 'tele-clinic' ? 'Phòng khám Từ xa' : 'Đào tạo & Di sản'}</span>
                        </div>
                      </div>

                      {/* Navigation Tabs */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Thông tin & Tra cứu</p>
                        {[
                          { id: 'profile', label: 'Hồ sơ', icon: 'ri-user-settings-line' },
                          { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
                          { id: 'database', label: 'Tra cứu Dược liệu', icon: 'ri-book-line' },
                          { id: 'subscription', label: 'Tủ Thuốc Định Kỳ', icon: 'ri-calendar-check-line' },
                          { id: 'premium', label: 'Lô Tuyển Chọn', icon: 'ri-star-line' },
                          { id: 'wiki', label: 'VITA Wiki', icon: 'ri-edit-box-line' },
                          { id: 'rare-herb', label: 'Cây Thuốc Lạ', icon: 'ri-plant-line' },
                          { id: 'feedback', label: 'Phản hồi Lâm sàng', icon: 'ri-feedback-line' },
                          { id: 'order', label: 'Đặt mẫu', icon: 'ri-shopping-bag-line' },
                          { id: 'community', label: 'Cộng đồng', icon: 'ri-team-line' },
                        ].map((tab) => (
            <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as any);
                              setShowMainMenu(false);
                            }}
                            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left text-sm flex items-center gap-2 mb-1 ${
                              activeTab === tab.id
                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
                            <i className={tab.icon}></i>
                            {tab.label}
            </button>
                        ))}
                      </div>

                      {/* Module Tabs */}
                      <div className="px-4 py-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Công cụ & Dịch vụ</p>
                        {[
                          { id: 'formula-builder', label: 'Công thức & Bài thuốc', icon: 'ri-flask-line' },
                          { id: 'ingredient-sourcing', label: 'Nguồn nguyên liệu', icon: 'ri-map-pin-line' },
                          { id: 'verification', label: 'Kiểm định R&D', icon: 'ri-shield-check-line' },
                          { id: 'lab-production', label: 'Sản xuất Demo', icon: 'ri-settings-3-line' },
                          { id: 'commercial-link', label: 'Kết nối Creator', icon: 'ri-handshake-line' },
                          { id: 'tele-clinic', label: 'Phòng khám Từ xa', icon: 'ri-video-chat-line' },
                          { id: 'legacy-training', label: 'Đào tạo & Di sản', icon: 'ri-book-open-line' },
                        ].map((tab) => (
            <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as any);
                              setShowMainMenu(false);
                            }}
                            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left text-sm flex items-center gap-2 mb-1 ${
                              activeTab === tab.id
                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
                            <i className={tab.icon}></i>
                            {tab.label}
            </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Thông tin chuyên môn</h3>
                <p className="text-gray-600">Cập nhật thông tin về cơ sở hành nghề của bạn</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="mb-4">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Bạn là: *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-teal-300 rounded-xl cursor-pointer bg-teal-50">
                        <input
                          type="radio"
                          name="userType"
                          value="physician"
                          checked={true}
                          readOnly
                          className="w-5 h-5 text-teal-600 mt-0.5"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">Bác sĩ / Lương y (Phòng khám tư nhân)</p>
                          <p className="text-sm text-gray-600">Hành nghề độc lập hoặc phòng khám tư</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="mb-4">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Tên Phòng khám / Cơ sở hành nghề *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      required
                      value={profileData.organizationName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="VD: Phòng khám Y học Cổ truyền Hòa Bình"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Chuyên khoa sâu *
                    </label>
                    <select
                      name="specialty"
                      required
                      value={profileData.specialty}
                      onChange={handleProfileChange}
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
                        value={profileData.representative}
                        onChange={handleProfileChange}
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
                        value={profileData.position}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="VD: Giám đốc / Trưởng khoa"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
            <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Lưu thông tin chuyên môn
            </button>
                </div>
              </form>
            </div>

            {/* Thông tin liên hệ */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Thông tin liên hệ</h3>
                <p className="text-gray-600">Cập nhật thông tin liên hệ của bạn</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={profileData.phone}
                      onChange={handleProfilePhoneChange}
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
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="VD: email@clinic.vn"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
            <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Lưu thông tin liên hệ
            </button>
          </div>
              </form>
        </div>
      </div>
        )}

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

        {/* Tab: Formula Builder - Quản lý Công thức & Bài thuốc */}
        {activeTab === 'formula-builder' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý Công thức & Bài thuốc</h2>
              <p className="text-gray-600 mt-1">Digital Apothecary - Phòng Lab ảo số hóa bí kíp gia truyền</p>
            </div>

            {/* Formula Builder */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-flask-line text-teal-600"></i>
                Công cụ Lập phương (Formula Builder)
                </h3>
              <p className="text-sm text-gray-600 mb-4">Thiết kế bài thuốc theo nguyên lý "Quân - Thần - Tá - Sứ"</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Quân */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-crown-line text-red-600"></i>
                    Quân (Vị chính)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="font-semibold text-gray-900 text-sm">Sâm Ngọc Linh</div>
                      <div className="text-xs text-gray-600">6g</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer">
                  <i className="ri-add-line mr-1"></i>
                    Thêm vị
                </button>
              </div>

                {/* Thần */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-star-line text-blue-600"></i>
                    Thần (Hỗ trợ)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="font-semibold text-gray-900 text-sm">Đương Quy</div>
                      <div className="text-xs text-gray-600">9g</div>
                      </div>
                      </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    <i className="ri-add-line mr-1"></i>
                    Thêm vị
                  </button>
                    </div>

                {/* Tá */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-tools-line text-purple-600"></i>
                    Tá (Phụ trợ)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="font-semibold text-gray-900 text-sm">Cam Thảo</div>
                      <div className="text-xs text-gray-600">3g</div>
                      </div>
                      </div>
                  <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                    <i className="ri-add-line mr-1"></i>
                    Thêm vị
                  </button>
                    </div>

                {/* Sứ */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-send-plane-line text-green-600"></i>
                    Sứ (Dẫn thuốc)
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="font-semibold text-gray-900 text-sm">Sinh Khương</div>
                      <div className="text-xs text-gray-600">3g</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                    <i className="ri-add-line mr-1"></i>
                    Thêm vị
                      </button>
                    </div>
              </div>

              {/* Thư viện Nguyên liệu */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">Thư viện Nguyên liệu</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Sâm Ngọc Linh', compound: 'Saponin 12%', region: 'Kon Tum', price: '2.5 triệu/kg' },
                    { name: 'Đương Quy', compound: 'Ligustilide 0.8%', region: 'Lào Cai', price: '800k/kg' },
                    { name: 'Ba Kích', compound: 'Iridoid 1.2%', region: 'Hà Giang', price: '1.2 triệu/kg' },
                  ].map((herb, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-teal-400 cursor-pointer transition-all">
                      <div className="font-semibold text-gray-900 text-sm mb-1">{herb.name}</div>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        <div>Hoạt chất: {herb.compound}</div>
                        <div>Vùng: {herb.region}</div>
                        <div className="font-medium text-teal-600">Giá: {herb.price}</div>
                      </div>
                      <button className="w-full mt-2 bg-teal-600 text-white py-1 rounded text-xs font-medium hover:bg-teal-700 transition-colors cursor-pointer">
                        Kéo thả vào công thức
                      </button>
                  </div>
                ))}
              </div>
            </div>

              {/* Ghi chú Chế biến (SOP) */}
              <div className="bg-white rounded-xl p-4 border-2 border-amber-200 mb-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-amber-600"></i>
                  Ghi chú Chế biến (SOP) - Bí quyết công nghệ
                </h4>
                <div className="space-y-3">
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="font-semibold text-gray-900 text-sm mb-1">Sâm Ngọc Linh</div>
                    <div className="text-sm text-gray-700">Sao vàng hạ thổ, tẩm rượu 3 lần, cửu chưng cửu sái</div>
                  </div>
                  <button className="w-full bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors cursor-pointer">
                  <i className="ri-add-line mr-1"></i>
                    Thêm ghi chú chế biến
                </button>
              </div>
              </div>

              {/* IP Vault */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <i className="ri-lock-line text-3xl"></i>
                  <div>
                    <h4 className="font-bold text-lg">Mã hóa & Bảo mật Công thức (IP Vault)</h4>
                    <p className="text-sm opacity-90">Công thức được mã hóa trên Blockchain</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3">
                  <div className="text-sm mb-2">Chế độ bảo mật:</div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="security" value="blackbox" className="text-indigo-600" />
                      <span className="text-sm">Hộp đen (Blackbox) - Nhà máy không biết tỷ lệ phối trộn</span>
                    </label>
                  </div>
                </div>
                <button className="w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                  <i className="ri-save-line mr-2"></i>
                  Lưu công thức vào IP Vault
                </button>
              </div>
            </div>

            {/* My Formulas */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bài thuốc của tôi</h3>
              <div className="space-y-4">
                {[
                  {
                    name: 'Hồi Xuân Phục Cốt',
                    status: 'protected',
                    ingredients: 8,
                    patients: 45,
                    effectiveness: '92%'
                  },
                ].map((formula, idx) => (
                  <div key={idx} className="border-2 border-teal-200 rounded-xl p-5 bg-teal-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{formula.name}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            <i className="ri-lock-line mr-1"></i>
                            Đã bảo vệ
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <div className="text-gray-600">Số vị thuốc</div>
                            <div className="font-bold text-gray-900">{formula.ingredients} vị</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Bệnh nhân đã dùng</div>
                            <div className="font-bold text-gray-900">{formula.patients} người</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Hiệu quả</div>
                            <div className="font-bold text-green-600">{formula.effectiveness}</div>
                          </div>
                          </div>
                        </div>
                      </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer">
                        <i className="ri-edit-line mr-1"></i>
                        Chỉnh sửa
                      </button>
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Ingredient Sourcing - Quản lý Nguồn nguyên liệu */}
        {activeTab === 'ingredient-sourcing' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý Nguồn nguyên liệu</h2>
              <p className="text-gray-600 mt-1">Kiểm soát chất lượng đầu vào "tận gốc"</p>
            </div>

            {/* Source Map */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-map-2-line text-teal-600"></i>
                Bản đồ Vùng nguyên liệu (Source Map)
              </h3>
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl overflow-hidden mb-4">
                <img
                  src="https://readdy.ai/api/search-image?query=Vietnam%20medicinal%20plant%20farm%20map%20with%20cooperative%20locations%2C%20agricultural%20regions%20marked%2C%20topographic%20view%2C%20clear%20simple%20background&width=1200&height=400&seq=physician-source-map-001&orientation=landscape"
                  alt="Source Map"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="text-xs font-semibold text-gray-700 mb-1">Bộ lọc chuyên sâu</div>
                  <div className="text-sm text-gray-900">Sâm Ngọc Linh trên 5 năm tuổi</div>
                  <div className="text-sm text-gray-900">Ba kích tím trồng hướng Đông</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                  <div className="text-xs text-gray-600 mb-1">HTX khớp lệnh</div>
                  <div className="font-bold text-teal-600">5 HTX</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1">Tổng sản lượng</div>
                  <div className="font-bold text-blue-600">2.5 tấn</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-xs text-gray-600 mb-1">Đã đặt gạch</div>
                  <div className="font-bold text-green-600">1.2 tấn</div>
                </div>
              </div>
            </div>

            {/* Material Booking */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-bookmark-line text-purple-600"></i>
                Khóa Nguồn hàng (Material Booking)
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">BOOK-001</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đã khóa</span>
                        </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Lô Sâm số 5 - HTX Tu Mơ Rông</h4>
                      <p className="text-sm text-gray-700 mb-3">Dùng riêng cho bài thuốc "Hồi Xuân Phục Cốt" trong năm 2026</p>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Sản lượng</div>
                          <div className="font-bold text-purple-600">500 kg</div>
                      </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Tuổi cây</div>
                          <div className="font-bold text-purple-600">5-6 năm</div>
                    </div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Lợi ích</div>
                        <p className="text-sm text-gray-800">Tránh việc khi thuốc bán chạy thì hết nguyên liệu xịn, phải trộn nguyên liệu rởm.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-bookmark-line mr-2"></i>
                  Đặt gạch nguồn hàng mới
                      </button>
                    </div>
            </div>

            {/* Cultivation Diary Check */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-green-600"></i>
                Kiểm tra Nhật ký Canh tác
              </h3>
              <div className="space-y-3">
                <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                  <div className="font-bold text-gray-900 mb-2">HTX Tu Mơ Rông - Lô Sâm số 5</div>
                  <div className="text-sm text-gray-700 space-y-1 mb-3">
                    <div>• Không sử dụng phân bón hóa học</div>
                    <div>• Chỉ dùng phân hữu cơ từ rừng</div>
                    <div>• Không phun thuốc trừ sâu</div>
                    <div>• Đạt chuẩn Organic</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span className="font-semibold">Đạt tiêu chuẩn "Dược liệu sạch"</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                  <i className="ri-search-line mr-2"></i>
                  Xem nhật ký canh tác chi tiết
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Verification Link - Kết nối R&D & Kiểm định */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kết nối R&D & Kiểm định</h2>
              <p className="text-gray-600 mt-1">Chuẩn hóa bài thuốc từ "kinh nghiệm dân gian" thành "khoa học chứng thực"</p>
            </div>

            {/* Express Test */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-flashlight-line text-orange-600"></i>
                Gửi mẫu Kiểm định Nhanh (Express Test)
              </h3>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200 mb-4">
                <p className="text-sm text-gray-700 mb-4">Bào chế thủ công 1 thang thuốc mẫu → Bấm nút "Gửi kiểm định" → Shipper đến lấy mẫu → Kết quả trả về App</p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-bold text-gray-900 mb-2">Mẫu đang chờ kiểm định</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Bài thuốc: Hồi Xuân Phục Cốt</div>
                      <div>Gửi: 15/11/2024 • Dự kiến có kết quả: 20/11/2024</div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer">
                  <i className="ri-send-plane-line mr-2"></i>
                  Gửi mẫu kiểm định mới
                </button>
              </div>

              {/* Test Results */}
              <div className="bg-white rounded-xl p-5 border-2 border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-file-paper-line text-green-600"></i>
                  Kết quả kiểm định
                </h4>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="font-bold text-gray-900 mb-2">Bài thuốc: Hồi Xuân Phục Cốt</div>
                    <div className="text-sm text-gray-700 space-y-1 mb-3">
                      <div>• Thành phần: Đã xác định 8 hoạt chất chính</div>
                      <div>• Chỉ số an toàn: Đạt chuẩn</div>
                      <div>• Dược tính: Cao, phù hợp điều trị suy nhược</div>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                      <i className="ri-download-line mr-1"></i>
                      Tải phiếu phân tích
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Data */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-database-2-line text-blue-600"></i>
                Số hóa Y án & Dữ liệu Lâm sàng
              </h3>
              <p className="text-sm text-gray-600 mb-4">Ghi nhận kết quả điều trị thực tế trên bệnh nhân (ẩn danh) để làm cơ sở xin cấp phép sản xuất đại trà</p>
              <div className="space-y-3">
                {[
                  {
                    patientCode: 'BN-2025-***',
                    formula: 'Hồi Xuân Phục Cốt',
                    condition: 'Suy nhược cơ thể',
                    result: 'Khỏi hoàn toàn',
                    duration: '30 ngày',
                    date: '15/11/2024'
                  },
                ].map((case_, idx) => (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                    <div className="font-bold text-gray-900 mb-2">{case_.formula}</div>
                    <div className="text-sm text-gray-700 space-y-1 mb-3">
                      <div>Bệnh nhân: {case_.patientCode} • {case_.condition}</div>
                      <div>Kết quả: {case_.result} • Thời gian: {case_.duration}</div>
                      <div>Ngày ghi nhận: {case_.date}</div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-file-add-line mr-1"></i>
                      Thêm Y án
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Lab-scale Production - Sản xuất Demo */}
        {activeTab === 'lab-production' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sản xuất Demo & Kết nối Nhà máy</h2>
              <p className="text-gray-600 mt-1">Đặt hàng lô nhỏ để thăm dò thị trường</p>
            </div>

            {/* Small Batch Order */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-settings-3-line text-indigo-600"></i>
                Đặt hàng Lô nhỏ (Small Batch Order)
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold">ORDER-001</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Đang sản xuất</span>
                        </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Bài thuốc: Hồi Xuân Phục Cốt</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Số lượng</div>
                          <div className="font-bold text-indigo-600">100 hộp cao</div>
                      </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Nhà máy</div>
                          <div className="font-bold text-indigo-600">VinaPharma</div>
                    </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Dự kiến hoàn thành</div>
                          <div className="font-bold text-indigo-600">25/11/2024</div>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Giá ước tính</div>
                          <div className="font-bold text-indigo-600">15 triệu VNĐ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                  <i className="ri-add-line mr-2"></i>
                  Tạo đơn hàng mới
                      </button>
                    </div>
            </div>

            {/* Convert Dosage Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-refresh-line text-purple-600"></i>
                Chuyển đổi Dạng bào chế
              </h3>
              <p className="text-sm text-gray-600 mb-4">Chuyển bài thuốc sắc thành dạng Viên nang mềm hoặc Siro cho trẻ em</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { from: 'Sắc uống', to: 'Viên nang mềm', factory: 'VinaPharma', cost: '20.000 VNĐ/viên', minOrder: 500 },
                  { from: 'Sắc uống', to: 'Siro cho trẻ em', factory: 'Nam Dược', cost: '150.000 VNĐ/chai', minOrder: 200 },
                ].map((option, idx) => (
                  <div key={idx} className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
                    <div className="font-bold text-gray-900 mb-2">{option.from} → {option.to}</div>
                    <div className="text-sm text-gray-700 space-y-1 mb-3">
                      <div>Nhà máy: {option.factory}</div>
                      <div>Giá: {option.cost}</div>
                      <div>MOQ: {option.minOrder} sản phẩm</div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                      <i className="ri-calculator-line mr-1"></i>
                      Tính giá trọn gói
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Commercial Link - Kết nối Creator & Thương mại */}
        {activeTab === 'commercial-link' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kết nối Creator & Thương mại</h2>
              <p className="text-gray-600 mt-1">Tìm kiếm "người bán hàng" cho các sản phẩm trí tuệ của bạn</p>
            </div>

            {/* Co-founder Market */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-handshake-line text-pink-600"></i>
                Sàn Giao dịch Đồng sáng lập (Co-founder Market)
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-pink-200 rounded-xl p-5 bg-pink-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pink-600 text-white rounded-full text-xs font-bold">LISTING-001</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đã có đối tác</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Bài thuốc cai thuốc lá hiệu quả 90%</h4>
                      <p className="text-sm text-gray-700 mb-3">Đã được R&D kiểm định. Cần tìm KOL đồng hành lan tỏa.</p>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <div className="text-xs text-gray-600 mb-1">Đối tác đã ký hợp đồng</div>
                        <div className="font-bold text-pink-600">Creator @NguyenMinh</div>
                        <div className="text-xs text-gray-600 mt-1">Chia sẻ lợi nhuận: 50-50 • Smart Contract đã kích hoạt</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors cursor-pointer">
                  <i className="ri-add-line mr-2"></i>
                  Đăng tải bài thuốc mới
                </button>
              </div>
              </div>

            {/* Endorsement Service */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-verified-badge-line text-blue-600"></i>
                Dịch vụ Bảo chứng Chuyên môn (Endorsement Service)
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Tham gia Livestream của Creator</h4>
                      <p className="text-sm text-gray-700 mb-3">Tư vấn sức khỏe hoặc xác thực công dụng sản phẩm trong buổi Livestream</p>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Yêu cầu gần đây</div>
                          <div className="font-bold text-blue-600">3 yêu cầu</div>
                    </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Thu nhập tháng này</div>
                          <div className="font-bold text-blue-600">5 triệu VNĐ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Huy hiệu "Bác sĩ Khuyên dùng"</h4>
                      <p className="text-sm text-gray-700 mb-3">Cấp quyền sử dụng hình ảnh/uy tín để Creator in lên bao bì sản phẩm</p>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <div className="text-xs text-gray-600 mb-1">Đang được sử dụng bởi</div>
                        <div className="font-bold text-green-600">Creator @NguyenMinh - Sản phẩm "KOL Beauty"</div>
                        <div className="text-xs text-gray-600 mt-1">Thời hạn: 1 năm • Phí bản quyền: 10 triệu VNĐ/năm</div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                    <i className="ri-settings-3-line mr-1"></i>
                    Quản lý huy hiệu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Tele-clinic CRM - Phòng khám Từ xa */}
        {activeTab === 'tele-clinic' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Phòng khám Từ xa & Quản lý Bệnh nhân</h2>
              <p className="text-gray-600 mt-1">Công cụ quản lý phòng mạch số, chăm sóc bệnh nhân trọn đời</p>
                    </div>

            {/* Prescription & Dropshipping */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-prescription-line text-teal-600"></i>
                Kê đơn & Dropshipping (Không cần kho thuốc)
              </h3>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-teal-200 mb-4">
                <p className="text-sm text-gray-700 mb-4">Sau khi khám online (Video Call), thầy thuốc kê đơn trên App. Đơn thuốc được chuyển thẳng đến Kho dược VITA. Hệ thống tự động bốc thuốc, sắc sẵn (nếu cần), đóng gói và ship đến tận giường bệnh nhân.</p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-bold text-gray-900 mb-2">Đơn thuốc #RX-2024-001</div>
                    <div className="text-sm text-gray-700 space-y-1 mb-3">
                      <div>Bệnh nhân: BN-2025-*** • Suy nhược cơ thể</div>
                      <div>Bài thuốc: Hồi Xuân Phục Cốt • 10 thang</div>
                      <div>Trạng thái: Đang sắc • Dự kiến giao: 20/11/2024</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <i className="ri-checkbox-circle-fill"></i>
                      <span>Đã chuyển đến Kho dược VITA</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer">
                  <i className="ri-file-add-line mr-2"></i>
                  Kê đơn mới
                </button>
              </div>
            </div>

            {/* Health Tracking Dashboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-blue-600"></i>
                Theo dõi Tiến triển (Health Tracking Dashboard)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    patientCode: 'BN-2025-001',
                    name: 'Bệnh nhân ***',
                    condition: 'Suy nhược cơ thể',
                    lastUpdate: 'Hôm nay',
                    metrics: { bloodPressure: '120/80', bloodSugar: '5.5', weight: '+2kg', sleep: 'Cải thiện' }
                  },
                ].map((patient, idx) => (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{patient.name}</h4>
                        <div className="text-sm text-gray-600 mb-3">{patient.condition} • Cập nhật: {patient.lastUpdate}</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Huyết áp</div>
                            <div className="font-bold text-blue-600">{patient.metrics.bloodPressure}</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Đường huyết</div>
                            <div className="font-bold text-blue-600">{patient.metrics.bloodSugar}</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Cân nặng</div>
                            <div className="font-bold text-green-600">{patient.metrics.weight}</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Giấc ngủ</div>
                            <div className="font-bold text-green-600">{patient.metrics.sleep}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                        <i className="ri-message-3-line mr-1"></i>
                        Nhắn tin nhắc nhở
                      </button>
                      <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer">
                        <i className="ri-edit-line mr-1"></i>
                        Điều chỉnh liều
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Legacy & Training - Đào tạo & Di sản */}
        {activeTab === 'legacy-training' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Đào tạo & Di sản</h2>
              <p className="text-gray-600 mt-1">Thư viện Y án Số & Tuyển sinh Đệ tử Online</p>
                    </div>

            {/* Digital Case Library */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-book-open-line text-purple-600"></i>
                Thư viện Y án Số
              </h3>
              <p className="text-sm text-gray-600 mb-4">Lưu trữ hồ sơ các ca bệnh khó đã chữa khỏi làm tài liệu tham khảo</p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Ca bệnh: Suy nhược cơ thể nặng sau phẫu thuật',
                    formula: 'Hồi Xuân Phục Cốt',
                    result: 'Khỏi hoàn toàn sau 60 ngày',
                    difficulty: 'Khó',
                    shared: true,
                    views: 156
                  },
                ].map((case_, idx) => (
                  <div key={idx} className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                    <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{case_.title}</h4>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{case_.difficulty}</span>
                      </div>
                        <div className="text-sm text-gray-700 space-y-1 mb-3">
                          <div>Bài thuốc: {case_.formula}</div>
                          <div>Kết quả: {case_.result}</div>
                          <div>Lượt xem: {case_.views} • {case_.shared ? 'Đã chia sẻ' : 'Riêng tư'}</div>
                    </div>
                  </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                      <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                        <i className="ri-share-line mr-1"></i>
                        Chia sẻ (có phí)
                  </button>
                </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Online Apprenticeship */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-graduation-cap-line text-indigo-600"></i>
                Tuyển sinh Đệ tử Online
              </h3>
              <p className="text-sm text-gray-600 mb-4">Mở các lớp đào tạo nghề y dược cổ truyền, cấp chứng chỉ hoàn thành khóa học</p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Khóa học: Bào chế Thuốc Y học Cổ truyền',
                    duration: '40 giờ',
                    students: 25,
                    price: '5 triệu VNĐ',
                    status: 'Đang tuyển sinh'
                  },
                ].map((course, idx) => (
                  <div key={idx} className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50">
                    <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{course.title}</h4>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Thời lượng</div>
                            <div className="font-bold text-indigo-600">{course.duration}</div>
                      </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Học viên</div>
                            <div className="font-bold text-indigo-600">{course.students} người</div>
                    </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-xs text-gray-600">Học phí</div>
                            <div className="font-bold text-indigo-600">{course.price}</div>
                  </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{course.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                        <i className="ri-settings-3-line mr-1"></i>
                        Quản lý khóa học
                      </button>
                      <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                        <i className="ri-add-line mr-1"></i>
                        Tạo khóa học mới
                  </button>
                </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

