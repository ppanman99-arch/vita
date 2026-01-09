import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerInvestor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'monitor' | 'market'>('portfolio');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const myProjects = [
    {
      id: 1,
      name: 'Dự án Sâm Ngọc Linh - Lô B2',
      cooperative: 'HTX Dược Liệu Kon Tum',
      image: 'https://readdy.ai/api/search-image?query=ginseng%20farm%20plantation%20mountain%20vietnam%20natural%20organic%20farming%20simple%20clean%20background%20high%20quality&width=400&height=300&seq=project-sam-001&orientation=landscape',
      invested: 50000000,
      currentValue: 56000000,
      profit: 12,
      progress: 65,
      status: 'active',
      nextDividend: '15/02/2025'
    },
    {
      id: 2,
      name: 'Vườn ươm công nghệ cao',
      cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
      image: 'https://readdy.ai/api/search-image?query=modern%20greenhouse%20nursery%20high%20tech%20agriculture%20vietnam%20clean%20organized%20simple%20background%20professional&width=400&height=300&seq=project-nursery-002&orientation=landscape',
      invested: 30000000,
      currentValue: 33600000,
      profit: 12,
      progress: 45,
      status: 'active',
      nextDividend: '20/02/2025'
    }
  ];

  const newProjects = [
    {
      id: 3,
      name: 'Dự án Đương Quy hữu cơ',
      cooperative: 'HTX Dược Liệu Lâm Đồng',
      image: 'https://readdy.ai/api/search-image?query=angelica%20herb%20farm%20organic%20farming%20vietnam%20natural%20green%20field%20simple%20background%20high%20quality&width=400&height=300&seq=project-duong-quy-003&orientation=landscape',
      targetAmount: 200000000,
      raised: 120000000,
      minInvest: 10000000,
      expectedReturn: 15,
      duration: '24 tháng',
      investors: 12,
      description: 'Dự án trồng Đương Quy hữu cơ quy mô 5 hecta tại vùng cao Lâm Đồng. Áp dụng công nghệ canh tác tiên tiến, đảm bảo chất lượng theo tiêu chuẩn GACP-WHO.',
      benefits: [
        'Chia cổ tức hàng quý từ doanh thu bán sản phẩm',
        'Được mua sản phẩm với giá ưu đãi xã viên',
        'Tham gia các hoạt động đào tạo và hội thảo',
        'Quyền biểu quyết trong đại hội xã viên'
      ]
    },
    {
      id: 4,
      name: 'Trại nghiên cứu Dược liệu',
      cooperative: 'HTX Khoa Học Dược Liệu Tây Nguyên',
      image: 'https://readdy.ai/api/search-image?query=medicinal%20herb%20research%20farm%20laboratory%20vietnam%20scientific%20modern%20clean%20simple%20background%20professional&width=400&height=300&seq=project-research-004&orientation=landscape',
      targetAmount: 150000000,
      raised: 45000000,
      minInvest: 5000000,
      expectedReturn: 18,
      duration: '36 tháng',
      investors: 5,
      description: 'Trại nghiên cứu và nhân giống các loại dược liệu quý hiếm. Hợp tác với Viện Dược liệu để phát triển giống mới có năng suất và chất lượng cao.',
      benefits: [
        'Lợi nhuận cao từ bán giống và chuyển giao công nghệ',
        'Ưu tiên mua giống với giá gốc',
        'Được đào tạo kỹ thuật canh tác miễn phí',
        'Hỗ trợ tiêu thụ sản phẩm sau thu hoạch'
      ]
    }
  ];

  const handleJoinCooperative = (projectId: number, cooperativeName: string) => {
    // Chuyển đến trang đăng ký xã viên của HTX
    alert(`Chuyển đến trang đăng ký xã viên của ${cooperativeName}.\n\nBạn cần trở thành xã viên của HTX này để có thể góp vốn vào dự án.`);
    // navigate('/cooperative-register', { state: { projectId, cooperativeName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white px-4 py-4 sm:py-6 rounded-b-2xl sm:rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/member-hub')}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-lg sm:text-xl"></i>
          </button>
          <h1 className="text-base sm:text-lg md:text-xl font-bold truncate flex-1 text-center px-2">Quản trị Góp Vốn</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>

        {/* Investment Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20">
          <p className="text-xs sm:text-sm text-amber-100 mb-1.5 sm:mb-2">Tổng giá trị vốn góp</p>
          <p className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 truncate">89.600.000 VNĐ</p>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div>
              <p className="text-[10px] sm:text-xs text-amber-100 mb-0.5 sm:mb-1">Đã góp vốn</p>
              <p className="text-base sm:text-lg font-bold truncate">80M</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-amber-100 mb-0.5 sm:mb-1">Lợi nhuận</p>
              <p className="text-base sm:text-lg font-bold text-green-300 truncate">+9.6M</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-amber-100 mb-0.5 sm:mb-1">ROI</p>
              <p className="text-base sm:text-lg font-bold text-green-300">+12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-1 shadow-md flex gap-1">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-briefcase-line mr-1"></i>
            Danh mục
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'monitor'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-eye-line mr-1"></i>
            Giám sát
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'market'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-store-2-line mr-1"></i>
            Chợ dự án
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-folder-chart-line text-amber-600"></i>
              Dự án đang góp vốn ({myProjects.length})
            </h2>

            {myProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                <div className="h-40 w-full overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2">{project.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-building-line text-amber-600 text-sm"></i>
                    <span className="text-sm text-gray-600">{project.cooperative}</span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Đã góp vốn</span>
                      <span className="font-bold text-gray-800">{project.invested.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Giá trị hiện tại</span>
                      <span className="font-bold text-green-600">{project.currentValue.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Lợi nhuận</span>
                      <span className="font-bold text-green-600">+{project.profit}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Tiến độ giải ngân</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full transition-all"
                        style={{width: `${project.progress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-3 mb-3 border border-amber-100">
                    <p className="text-xs text-gray-600 mb-1">Cổ tức kỳ tới</p>
                    <p className="text-sm font-bold text-amber-700">{project.nextDividend}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
                    Xem chi tiết dự án
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Monitor Tab */}
        {activeTab === 'monitor' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-eye-line text-amber-600"></i>
              Mắt thần - Giám sát thời gian thực
            </h2>

            {myProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">{project.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <i className="ri-building-line text-amber-600 text-sm"></i>
                  <span className="text-sm text-gray-600">{project.cooperative}</span>
                </div>

                {/* Live Camera */}
                <div className="bg-gray-900 rounded-xl overflow-hidden mb-4 relative h-48 w-full">
                  <img 
                    src={project.image}
                    alt="Live camera"
                    className="w-full h-full object-cover object-top opacity-80"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                  <button className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-fullscreen-line mr-1"></i>
                    Toàn màn hình
                  </button>
                </div>

                {/* Recent Activities */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Nhật ký gần đây</h4>
                  
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-green-600 mt-0.5"></i>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">Bón phân hữu cơ hoàn thành</p>
                        <p className="text-xs text-gray-600">Nông dân Nguyễn Văn B • 2 giờ trước</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <i className="ri-camera-line text-blue-600 mt-0.5"></i>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">Cập nhật ảnh sinh trưởng</p>
                        <p className="text-xs text-gray-600">Chuyên gia HTX • 5 giờ trước</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <div className="flex items-start gap-2">
                      <i className="ri-alert-line text-orange-600 mt-0.5"></i>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">Cảnh báo sâu bệnh</p>
                        <p className="text-xs text-gray-600">Hệ thống AI • 1 ngày trước</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-amber-100 hover:bg-amber-200 text-amber-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Xem toàn bộ nhật ký
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-5 text-white shadow-lg">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <i className="ri-store-2-line"></i>
                Chợ dự án mới
              </h2>
              <p className="text-sm text-amber-100">Khám phá các cơ hội góp vốn mới từ các HTX</p>
            </div>

            {newProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                {selectedProject === project.id ? (
                  // Chi tiết dự án
                  <div className="p-5">
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-4 cursor-pointer"
                    >
                      <i className="ri-arrow-left-line"></i>
                      <span className="text-sm">Quay lại</span>
                    </button>

                    <h3 className="font-bold text-gray-800 text-xl mb-2">{project.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <i className="ri-building-line text-amber-600"></i>
                      <span className="text-sm font-semibold text-amber-700">{project.cooperative}</span>
                    </div>

                    <div className="h-48 w-full overflow-hidden rounded-xl mb-4">
                      <img 
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-100">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <i className="ri-information-line text-amber-600"></i>
                        Giới thiệu dự án
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <i className="ri-gift-line text-green-600"></i>
                        Quyền lợi xã viên góp vốn
                      </h4>
                      <ul className="space-y-2">
                        {project.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <i className="ri-checkbox-circle-fill text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Đã huy động</span>
                        <span>{((project.raised / project.targetAmount) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                          style={{width: `${(project.raised / project.targetAmount) * 100}%`}}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{project.raised.toLocaleString('vi-VN')} VNĐ</span>
                        <span className="font-bold text-gray-800">{project.targetAmount.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Vốn góp tối thiểu</p>
                        <p className="text-sm font-bold text-gray-800">{(project.minInvest / 1000000).toFixed(0)}M VNĐ</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Lợi nhuận dự kiến</p>
                        <p className="text-sm font-bold text-green-600">+{project.expectedReturn}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                        <p className="text-sm font-bold text-gray-800">{project.duration}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Xã viên tham gia</p>
                        <p className="text-sm font-bold text-gray-800">{project.investors} người</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">Lưu ý quan trọng</p>
                          <p className="text-sm text-blue-800">
                            Bạn cần trở thành <strong>xã viên chính thức</strong> của <strong>{project.cooperative}</strong> để có thể góp vốn vào dự án này.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleJoinCooperative(project.id, project.cooperative)}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer whitespace-nowrap text-base"
                    >
                      <i className="ri-user-add-line mr-2"></i>
                      Đăng ký xã viên & Góp vốn
                    </button>
                  </div>
                ) : (
                  // Danh sách dự án
                  <>
                    <div className="h-40 w-full overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2">{project.name}</h3>
                          <div className="flex items-center gap-2">
                            <i className="ri-building-line text-amber-600 text-sm"></i>
                            <span className="text-sm text-gray-600">{project.cooperative}</span>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                          Đang kêu gọi
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>Đã huy động</span>
                          <span>{((project.raised / project.targetAmount) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                            style={{width: `${(project.raised / project.targetAmount) * 100}%`}}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{project.raised.toLocaleString('vi-VN')} VNĐ</span>
                          <span className="font-bold text-gray-800">{project.targetAmount.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Tối thiểu</p>
                          <p className="text-sm font-bold text-gray-800">{(project.minInvest / 1000000).toFixed(0)}M VNĐ</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Lợi nhuận dự kiến</p>
                          <p className="text-sm font-bold text-green-600">+{project.expectedReturn}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                          <p className="text-sm font-bold text-gray-800">{project.duration}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Xã viên tham gia</p>
                          <p className="text-sm font-bold text-gray-800">{project.investors} người</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedProject(project.id)}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Xem chi tiết dự án
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/member-hub')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Hub</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-amber-600 cursor-pointer">
            <i className="ri-hand-coin-line text-2xl"></i>
            <span className="text-xs font-semibold">Góp vốn</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-team-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
