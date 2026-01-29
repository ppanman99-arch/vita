import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isLiveRoute } from '../../config/goLiveRoutes';
import FeatureBadge from '../../components/shared/FeatureBadge';

export default function HomePage() {
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Xử lý ẩn/hiện header khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Nếu scroll xuống và đã scroll hơn 100px thì ẩn header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } 
      // Nếu scroll lên thì hiện header
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const portals = [
    // NHÓM 1: XÃ VIÊN NỘI BỘ (Internal Members)
    {
      id: 'producer',
      title: 'NÔNG DÂN & CỘNG SỰ',
      subtitle: 'Producer Members',
      description: 'Nhật ký canh tác điện tử • Báo cáo sâu bệnh • Quy trình kỹ thuật & Vật tư',
      icon: 'ri-seedling-line',
      color: 'from-green-600 to-emerald-700',
      path: '/login?role=farmer',
      buttonText: 'Truy cập Nông trại số',
      badgePath: '/farmer/producer'
    },
    {
      id: 'resource',
      title: 'CHỦ RỪNG & CHỦ ĐẤT',
      subtitle: 'Resource Members',
      description: 'Quản lý tài sản đất rừng • Giám sát hộ nhận khoán • Ví Carbon & Dịch vụ môi trường',
      icon: 'ri-landscape-line',
      color: 'from-amber-700 to-orange-800',
      path: '/login?role=farmer&redirect=forestry',
      buttonText: 'Truy cập Quản trị Tài sản',
      badgePath: '/farmer/resource'
    },
    {
      id: 'investor',
      title: 'NHÀ ĐẦU TƯ & GÓP VỐN',
      subtitle: 'Investor Members',
      description: 'Theo dõi danh mục đầu tư • Báo cáo tài chính HTX • Nhận cổ tức & Lợi nhuận',
      icon: 'ri-hand-coin-line',
      color: 'from-yellow-600 to-amber-700',
      path: '/login?role=farmer&redirect=investor',
      buttonText: 'Truy cập Danh mục Đầu tư',
      badgePath: '/member-hub/capital'
    },
    {
      id: 'consumer',
      title: 'XÃ VIÊN MUA SẮM',
      subtitle: 'Consumer Members',
      description: 'Siêu thị giá xã viên • Gói định kỳ giảm 15% • Mua chung giá sốc • Đơn hàng & Theo dõi',
      icon: 'ri-shopping-cart-line',
      color: 'from-blue-500 to-cyan-600',
      path: '/login?role=farmer&redirect=consumer',
      buttonText: 'Truy cập Siêu thị',
      badgePath: '/member-hub/consumer'
    },
    {
      id: 'esg-individual',
      title: 'ESG CÁ NHÂN',
      subtitle: 'Công dân Xanh',
      description: 'Dashboard đóng góp xanh • Dấu chân Carbon • Danh mục ESG • Thử thách & Cộng đồng',
      icon: 'ri-leaf-line',
      color: 'from-teal-500 to-emerald-600',
      path: '/esg-individual',
      buttonText: 'Mở ESG Cá nhân',
      badgePath: '/esg-individual'
    },

    // NHÓM 2: QUẢN TRỊ (Management)
    {
      id: 'cooperative',
      title: 'HỢP TÁC XÃ',
      subtitle: 'Cooperatives',
      description: 'Quản lý danh sách xã viên • Phân bổ chỉ tiêu sản xuất • Quản lý kho vận & Sơ chế đầu nguồn',
      icon: 'ri-team-line',
      color: 'from-blue-600 to-cyan-700',
      path: '/login?role=cooperative',
      buttonText: 'Truy cập Hub Quản lý',
      badgePath: '/cooperative/dashboard'
    },
    
    // NHÓM 3: ĐỐI TÁC BÊN NGOÀI (External Partners)
    {
      id: 'research',
      title: 'TRUNG TÂM GEN & KHOA HỌC',
      subtitle: 'R&D Center',
      description: 'Cấp mã định danh nguồn giống • Cập nhật quy trình canh tác (SOP) • Theo dõi dữ liệu thực nghiệm sinh trưởng',
      icon: 'ri-flask-line',
      color: 'from-purple-600 to-indigo-700',
      path: '/login?role=research',
      buttonText: 'Truy cập Lab Khoa học',
      badgePath: '/research-lab'
    },
    {
      id: 'expert-hub',
      title: 'VITA EXPERT HUB',
      subtitle: 'Expert Workspace',
      description: 'Cổng làm việc chuyên gia • Tư vấn kỹ thuật từ xa • Kê đơn số • Bán quy trình SOP',
      icon: 'ri-user-star-line',
      color: 'from-pink-600 to-rose-700',
      path: '/expert-portal/login',
      buttonText: 'Truy cập Expert Hub',
      badgePath: '/expert-portal'
    },
    {
      id: 'gov-portal',
      title: 'VITA GOV PORTAL',
      subtitle: 'Xã Nông Thôn Mới Số',
      description: 'Cổng quản trị số chính quyền Xã • Giám sát kinh tế-xã hội • Quản lý quy hoạch đất đai • Tiêu chí Nông thôn mới',
      icon: 'ri-government-line',
      color: 'from-blue-600 to-indigo-700',
      path: '/gov-portal/login',
      buttonText: 'Truy cập GOV Portal',
      badgePath: '/gov-portal'
    },
    {
      id: 'creator-hub',
      title: 'VITA CREATOR HUB',
      subtitle: 'Content & Marketing',
      description: 'Cổng KOL/KOC • Kho tài nguyên số • Chiến dịch Marketing • Affiliate & Livestream • Booking vườn',
      icon: 'ri-video-add-line',
      color: 'from-purple-600 to-pink-700',
      path: '/creator-hub/login',
      buttonText: 'Truy cập Creator Hub',
      badgePath: '/creator-hub'
    },
    
    // NHÓM 4: GREENLIGHT & ĐẦU TƯ VÀO CÔNG TY (GreenLight & Corporate Investment)
    {
      id: 'greenlight',
      title: 'GREENLIGHT & HỆ THỐNG',
      subtitle: 'System Admin',
      description: 'Dashboard tổng quan hệ sinh thái • Giám sát tuân thủ & Cảnh báo rủi ro • Báo cáo tài chính & ROI',
      icon: 'ri-line-chart-line',
      color: 'from-orange-600 to-amber-700',
      path: '/login?role=admin',
      buttonText: 'Truy cập Trung tâm Điều hành',
      badgePath: '/greenlight-command'
    },
    {
      id: 'investor-portal',
      title: 'CỔNG QUAN HỆ NHÀ ĐẦU TƯ',
      subtitle: 'Investor Relations Portal',
      description: 'Virtual Data Room • Valuation Simulator • Lộ trình IPO • Cap Table • Báo cáo IR',
      icon: 'ri-shield-star-line',
      color: 'from-emerald-600 to-teal-700',
      path: '/investor-portal/login',
      buttonText: 'Truy cập Investor Portal',
      badge: 'Private',
      badgePath: '/investor-portal'
    },
    
    // NHÓM 5: ĐẦU RA HỆ SINH THÁI (Output & Ecosystem)
    {
      id: 'enterprise',
      title: 'ĐỐI TÁC THU MUA (B2B)',
      subtitle: 'Business Partners',
      description: 'Đặt hàng bao tiêu (Booking) • Truy xuất nguồn gốc (Traceability) • Theo dõi đơn hàng & Thanh toán',
      icon: 'ri-building-line',
      color: 'from-indigo-700 to-blue-800',
      path: '/login?role=enterprise',
      buttonText: 'Truy cập Cổng Thu mua',
      badgePath: '/partner'
    },
    {
      id: 'esg-portal',
      title: 'CỔNG ĐẦU TƯ ESG',
      subtitle: 'Impact Investment Hub',
      description: 'Dự án trồng rừng • Tín chỉ Carbon • Giám sát thời gian thực • Báo cáo bền vững',
      icon: 'ri-leaf-line',
      color: 'from-green-600 to-emerald-700',
      path: '/esg-portal/login',
      buttonText: 'Truy cập ESG Portal',
      badgePath: '/esg-portal'
    },
    {
      id: 'timber-trading',
      title: 'CỔNG GIAO DỊCH GỖ',
      subtitle: 'Timber Trading Hub',
      description: 'Đặt hàng rừng trồng • Chứng chỉ FSC/PEFC • Tính toán hiệu suất • Kế hoạch khai thác',
      icon: 'ri-tree-line',
      color: 'from-amber-600 to-orange-700',
      path: '/timber-trading/login',
      buttonText: 'Truy cập Timber Hub',
      badgePath: '/timber-trading'
    },
    {
      id: 'physician',
      title: 'THẦY THUỐC & BỆNH VIỆN',
      subtitle: 'Medical Experts',
      description: 'Tra cứu hồ sơ dược liệu • Gửi phản hồi lâm sàng (Clinical Feedback) • Đặt hàng thuốc mẫu',
      icon: 'ri-stethoscope-line',
      color: 'from-teal-600 to-cyan-700',
      path: '/login?role=physician',
      buttonText: 'Truy cập Cổng Kiểm định',
      badgePath: '/physician-portal'
    },
    
    // NHÓM 6: MARKETPLACE & HUB (Marketplace & Hub)
    {
      id: 'seed-marketplace',
      title: 'SÀN THƯƠNG MẠI GIỐNG',
      subtitle: 'Seed Marketplace',
      description: 'Mua bán giống cây trồng • Truy xuất nguồn gốc giống • Hợp đồng 3 bên • Bảo hành chất lượng',
      icon: 'ri-seedling-line',
      color: 'from-green-500 to-emerald-600',
      path: '/login?role=research',
      buttonText: 'Truy cập Sàn Giống',
      badgePath: '/seed-marketplace'
    },
    {
      id: 'gene-nursery-hub',
      title: 'TRUNG TÂM GEN & VƯỜN ƯƠM',
      subtitle: 'Gene & Nursery Hub',
      description: 'Quản lý mã gen giống • Vườn ươm số • Theo dõi chất lượng giống • Phân phối giống chuẩn',
      icon: 'ri-plant-line',
      color: 'from-purple-500 to-pink-600',
      path: '/login?role=research',
      buttonText: 'Truy cập Gene Hub',
      badgePath: '/gene-nursery-hub'
    },
    {
      id: 'member-hub',
      title: 'TRUNG TÂM XÃ VIÊN',
      subtitle: 'Member Hub',
      description: 'Kết nối xã viên HTX • Thông tin hoạt động • Đăng ký tham gia • Quản lý thành viên',
      icon: 'ri-home-4-line',
      color: 'from-blue-500 to-cyan-600',
      path: '/login?role=farmer',
      buttonText: 'Truy cập Trung tâm Xã viên',
      badgePath: '/member-hub'
    },
    {
      id: 'coop-marketplace',
      title: 'SÀN KẾT NỐI HTX',
      subtitle: 'Cooperative Marketplace',
      description: 'Kết nối các HTX • Tìm kiếm đối tác • Chia sẻ nguồn lực • Hợp tác sản xuất',
      icon: 'ri-store-3-line',
      color: 'from-emerald-500 to-teal-600',
      path: '/login?role=cooperative',
      buttonText: 'Truy cập Sàn HTX',
      badgePath: '/coop-marketplace'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Tối ưu Mobile với hiệu ứng ẩn/hiện */}
      <div 
        className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Top Bar - Logo & Back Button */}
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            {/* Back Button */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-emerald-600 transition-colors active:scale-95"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <i className="ri-arrow-left-line text-base sm:text-lg"></i>
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Về trang chủ</span>
            </button>

            {/* Login & Register Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => navigate('/onboarding-gateway')}
                className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white text-emerald-600 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-50 transition-all active:scale-95 shadow-sm border border-emerald-600"
              >
                <i className="ri-user-add-line text-sm sm:text-base"></i>
                <span className="hidden sm:inline">Đăng ký</span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
              >
                <i className="ri-login-circle-line text-sm sm:text-base"></i>
                <span className="text-xs sm:text-sm">Đăng nhập</span>
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-1 sm:space-y-2">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-md">
                <i className="ri-leaf-line text-white text-base sm:text-lg"></i>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                VITA PLATFORM
              </h1>
            </div>

            {/* Main Title */}
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight px-2">
              Hệ Sinh Thái Rừng Dược Sinh Quốc Gia
            </h2>

            {/* Description */}
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed max-w-md mx-auto px-2">
              Nền tảng kết nối chuỗi giá trị Dược liệu theo tiêu chuẩn VITA.
            </p>

            {/* Instruction */}
            <p className="text-[10px] sm:text-xs text-emerald-700 font-medium pt-1 sm:pt-2 px-2">
              Vui lòng chọn vai trò của bạn để truy cập hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Spacer để tránh content bị che bởi fixed header - Responsive height */}
      <div className="h-[140px] sm:h-[160px] lg:h-[180px]"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-8 xl:py-12">
        {/* Cổng truy cập Nguyễn Mạnh Thuận */}
        <section className="mb-6 sm:mb-8 lg:mb-10" aria-label="Cổng truy cập Nguyễn Mạnh Thuận">
          <div
            onClick={() => navigate('/nguyen-manh-thuan')}
            className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-emerald-200 flex flex-col cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <i className="ri-door-open-line text-3xl sm:text-4xl md:text-5xl text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">Cổng truy cập Nguyễn Mạnh Thuận</h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-2 sm:mb-3">
                  Trang chủ, tin tức, giới thiệu và dịch vụ Portal Nguyễn Mạnh Thuận
                </p>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs sm:text-sm">
                  Truy cập portal
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="hidden sm:flex items-center">
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-lg">
                  Vào cổng
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Labels */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-600 to-emerald-700 rounded-full"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Xã viên Hợp tác xã</h2>
            <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">(Góp sức • Góp đất • Góp vốn)</span>
          </div>
        </div>

        {/* Portal Cards - Grid with sections */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Nhóm 1: Xã viên - 5 thẻ (gồm ESG Cá nhân) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {portals.slice(0, 5).map((portal) => (
              <div
                key={portal.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent flex flex-col"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <FeatureBadge variant={isLiveRoute(portal.badgePath) ? 'live' : 'demo'} size="sm" />
                  </div>
                  {/* Icon */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${portal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`${portal.icon} text-2xl sm:text-3xl lg:text-4xl text-white`}></i>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center leading-tight px-1">{portal.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 mb-2 sm:mb-3 lg:mb-5 text-center uppercase tracking-wide">{portal.subtitle}</p>

                  {/* Description - Flex grow để đẩy button xuống */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-center flex-1 px-1">{portal.description}</p>

                  {/* Button - Luôn ở bottom */}
                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 bg-gradient-to-r ${portal.color} text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 mt-auto`}
                  >
                    <span className="truncate flex-1">{portal.buttonText}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                  </button>
                </div>

                {/* Border Glow Effect */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${portal.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Divider + Label Nhóm 2 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-600 to-cyan-700 rounded-full"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Quản trị Hợp tác xã</h2>
          </div>

          {/* Nhóm 2: Quản trị - 1 thẻ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {portals.slice(5, 6).map((portal) => (
              <div
                key={portal.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <FeatureBadge variant={isLiveRoute(portal.badgePath) ? 'live' : 'demo'} size="sm" />
                  </div>
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${portal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`${portal.icon} text-2xl sm:text-3xl lg:text-4xl text-white`}></i>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center leading-tight px-1">{portal.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 mb-2 sm:mb-3 lg:mb-5 text-center uppercase tracking-wide">{portal.subtitle}</p>

                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-center flex-1 px-1">{portal.description}</p>

                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 bg-gradient-to-r ${portal.color} text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 mt-auto`}
                  >
                    <span className="truncate flex-1">{portal.buttonText}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                  </button>
                </div>

                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${portal.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Divider + Label Nhóm 3 */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Đối tác Hệ sinh thái</h2>
            <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">(Khoa học • Chuyên gia • Chính quyền • Marketing)</span>
          </div>

          {/* Nhóm 3: Đối tác - 4 thẻ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {portals.slice(6, 10).map((portal) => (
              <div
                key={portal.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <FeatureBadge variant={isLiveRoute(portal.badgePath) ? 'live' : 'demo'} size="sm" />
                  </div>
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${portal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`${portal.icon} text-2xl sm:text-3xl lg:text-4xl text-white`}></i>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center leading-tight px-1">{portal.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 mb-2 sm:mb-3 lg:mb-5 text-center uppercase tracking-wide">{portal.subtitle}</p>

                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-center flex-1 px-1">{portal.description}</p>

                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 bg-gradient-to-r ${portal.color} text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 mt-auto`}
                  >
                    <span className="truncate flex-1">{portal.buttonText}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                  </button>
                </div>

                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${portal.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Divider + Label Nhóm 4 - GreenLight & Đầu tư vào Công ty */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 lg:mt-12">
            <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-orange-600 to-amber-700 rounded-full"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">GreenLight & Đầu tư vào Công ty</h2>
            <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">(System Admin • Investor Relations)</span>
          </div>

          {/* Nhóm 4: GreenLight & Đầu tư - 2 thẻ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {portals.slice(10, 12).map((portal) => (
              <div
                key={portal.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 flex-wrap justify-end">
                    <FeatureBadge variant={isLiveRoute(portal.badgePath) ? 'live' : 'demo'} size="sm" />
                    {portal.badge && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-[9px] sm:text-xs font-semibold">
                        <i className="ri-lock-line mr-0.5 sm:mr-1"></i>
                        {portal.badge}
                      </span>
                    )}
                  </div>

                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${portal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`${portal.icon} text-2xl sm:text-3xl lg:text-4xl text-white`}></i>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center leading-tight px-1">{portal.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 mb-2 sm:mb-3 lg:mb-5 text-center uppercase tracking-wide">{portal.subtitle}</p>

                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-center flex-1 px-1">{portal.description}</p>

                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 bg-gradient-to-r ${portal.color} text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 mt-auto`}
                  >
                    <span className="truncate flex-1">{portal.buttonText}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                  </button>
                </div>

                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${portal.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Divider + Label Nhóm 5 - Đầu Ra Hệ Sinh thái */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 lg:mt-12">
            <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-indigo-600 to-blue-700 rounded-full"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Đầu Ra Hệ Sinh thái</h2>
            <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">(B2B Thu mua • Đầu tư ESG • Giao dịch Gỗ • Y tế)</span>
          </div>

          {/* Nhóm 5: Đầu Ra Hệ Sinh thái - 4 thẻ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {portals.slice(12, 16).map((portal) => (
              <div
                key={portal.id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <FeatureBadge variant={isLiveRoute(portal.badgePath) ? 'live' : 'demo'} size="sm" />
                  </div>
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${portal.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <i className={`${portal.icon} text-2xl sm:text-3xl lg:text-4xl text-white`}></i>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center leading-tight px-1">{portal.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-500 mb-2 sm:mb-3 lg:mb-5 text-center uppercase tracking-wide">{portal.subtitle}</p>

                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-center flex-1 px-1">{portal.description}</p>

                  <button
                    onClick={() => navigate(portal.path)}
                    className={`w-full py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 bg-gradient-to-r ${portal.color} text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 mt-auto`}
                  >
                    <span className="truncate flex-1">{portal.buttonText}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
                  </button>
                </div>

                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${portal.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section - VITA Values */}
        <div className="mt-8 sm:mt-12 lg:mt-16 xl:mt-20 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
            <h3 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 xl:mb-10">Giá trị cốt lõi VITA</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <i className="ri-leaf-line text-xl sm:text-2xl lg:text-3xl text-white"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Vitality</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Dược tính tự nhiên</p>
              </div>
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <i className="ri-lightbulb-flash-line text-xl sm:text-2xl lg:text-3xl text-white"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Innovation</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Công nghệ tiên phong</p>
              </div>
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <i className="ri-shield-check-line text-xl sm:text-2xl lg:text-3xl text-white"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Trust</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Minh bạch tuyệt đối</p>
              </div>
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg">
                  <i className="ri-checkbox-circle-line text-xl sm:text-2xl lg:text-3xl text-white"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base lg:text-lg">Accountability</h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Trách nhiệm rõ ràng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-8 sm:mt-12 lg:mt-16 xl:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          <p className="text-center text-[10px] sm:text-xs md:text-sm text-gray-500">
            © 2024 VITA PLATFORM. Phát triển bởi GreenLight Ventures
          </p>
        </div>
      </div>
    </div>
  );
}
