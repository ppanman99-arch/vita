import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hero background image - dùng ảnh local từ public/images/
const HERO_BACKGROUND_IMAGE = "/images/hero-background.png";
// Fallback URL nếu cần: "https://readdy.ai/api/search-image?query=..."

// Ecosystem illustration image - can be replaced with actual uploaded image
const ECOSYSTEM_ILLUSTRATION = "https://readdy.ai/api/search-image?query=comprehensive%20digital%20ecosystem%20illustration%20interconnected%20panels%20management%20processes%20cloud%20services%20data%20storage%20creator%20expert%20hub%20e-commerce%20live%20streaming%20agriculture%20tourism%20monitoring%20QR%20code%20gate%20glowing%20lines%20data%20flow%20integration%20modern%20clean%20design%20blue%20green%20orange%20purple%20colors%20VITA%20platform%20ecosystem&width=1200&height=800&seq=vita-ecosystem-illustration&orientation=landscape";

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleCtaClick = () => {
    // Map activeTab index to registration/login routes
    const routes = [
      '/forest-owner-register',      // 0: Chủ Rừng
      '/coop-marketplace',           // 1: Nông Dân (tìm HTX)
      '/cooperative-register',       // 2: Hợp Tác Xã
      '/coop-marketplace',           // 3: Nhà Góp Vốn (tìm dự án)
      '/enterprise-register',        // 4: Doanh Nghiệp
      '/research-partner-register',  // 5: Trung Tâm Gen
      '/physician-register',         // 6: Thầy Thuốc
      '/investor-portal/register',   // 7: Nhà Đầu Tư (private portal)
      '/esg-portal/login',           // 8: ESG Impact
      '/timber-trading/login',       // 9: Doanh Nghiệp Gỗ
      '/admin-forestry',             // 10: Lâm Sinh (công cụ)
      '/expert-portal/register',     // 11: Chuyên Gia
      '/gov-portal/register',        // 12: Chính Quyền Xã
      '/creator-hub/register',       // 13: KOL/KOC Creator
    ];
    
    if (activeTab >= 0 && activeTab < routes.length) {
      navigate(routes[activeTab]);
    } else {
      setShowModal(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const tabs = [
    {
      id: 'forest-owner',
      icon: 'ri-landscape-line',
      label: 'Chủ Rừng',
      title: 'Chủ Rừng & Chủ Đất',
      description: 'Xã viên Góp đất - Biến tài sản đất rừng thành nguồn thu nhập thụ động bền vững. Quản lý tài sản số, nhận tiền môi trường và chia sẻ lợi nhuận.',
      benefits: [
        'Định giá tài sản đất minh bạch',
        'Thu nhập từ cho thuê đất',
        'Chia sẻ doanh thu sản phẩm',
        'Tiền môi trường (PFES + Carbon)'
      ],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20forest%20landowner%20standing%20proudly%20on%20their%20forested%20land%20holding%20land%20certificate%20document%20with%20lush%20green%20forest%20background%20sustainable%20land%20management%20natural%20resources%20conservation%20highland%20terrain%20professional%20portrait&width=800&height=600&seq=forest-owner-new-001&orientation=landscape'
    },
    {
      id: 'farmer',
      icon: 'ri-seedling-line',
      label: 'Nông Dân',
      title: 'Nông Dân & Cộng Sự',
      description: 'Xã viên Sản xuất - Lực lượng lao động trực tiếp canh tác dược liệu. Nhận khoán đất, hỗ trợ kỹ thuật và thu nhập ổn định từ sản xuất.',
      benefits: [
        'Nhận khoán đất từ HTX',
        'Hỗ trợ giống và kỹ thuật',
        'Hợp đồng bao tiêu đầu ra',
        'Thu nhập 30-50 triệu/ha/năm'
      ],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20working%20in%20medicinal%20herb%20field%20under%20forest%20canopy%20planting%20and%20caring%20for%20ginseng%20plants%20hands%20in%20soil%20traditional%20farming%20sustainable%20agriculture%20peaceful%20rural%20scene%20morning%20light%20organic%20cultivation&width=800&height=600&seq=farmer-worker-new-001&orientation=landscape'
    },
    {
      id: 'cooperative',
      icon: 'ri-team-line',
      label: 'Hợp Tác Xã',
      title: 'Hợp Tác Xã',
      description: 'Tổ chức sản xuất quy mô lớn, nâng cao năng lực quản lý và đàm phán với thị trường.',
      benefits: [
        'Tăng sức mạnh thương lượng',
        'Chia sẻ chi phí đầu vào',
        'Đào tạo quản lý chuyên nghiệp',
        'Truy cập thị trường xuất khẩu'
      ],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20cooperative%20farmers%20meeting%20group%20discussion%20community%20collaboration%20rural%20development%20agricultural%20planning%20teamwork%20modern%20farming%20cooperative%20organized%20production%20professional%20management%20sustainable%20agriculture%20natural%20light%20clean%20simple%20background%20hopeful%20atmosphere%20unity%20and%20progress&width=800&height=600&seq=cooperative-hero-001&orientation=landscape'
    },
    {
      id: 'investor',
      icon: 'ri-hand-coin-line',
      label: 'Nhà Góp Vốn',
      title: 'Nhà Góp Vốn & Đầu Tư',
      description: 'Xã viên Góp vốn - Đầu tư vào các dự án dược liệu sinh lời cao, minh bạch và bền vững. Nhận cổ tức định kỳ và quyền lợi xã viên.',
      benefits: [
        'Lợi nhuận bền vững',
        'Chia cổ tức hàng quý',
        'Mua sản phẩm giá ưu đãi',
        'Quyền biểu quyết trong HTX'
      ],
      image: 'https://readdy.ai/api/search-image?query=Professional%20investor%20reviewing%20agricultural%20investment%20portfolio%20on%20tablet%20device%20with%20charts%20and%20graphs%20modern%20office%20setting%20business%20analysis%20financial%20planning%20sustainable%20agriculture%20investment%20green%20economy%20professional%20attire%20confident%20expression&width=800&height=600&seq=investor-new-001&orientation=landscape'
    },
    {
      id: 'enterprise',
      icon: 'ri-building-line',
      label: 'Doanh Nghiệp',
      title: 'Doanh Nghiệp Dược Phẩm',
      description: 'Nguồn nguyên liệu sạch, ổn định và có thể truy xuất nguồn gốc cho sản xuất dược phẩm chất lượng cao.',
      benefits: [
        'Nguyên liệu chuẩn VITA',
        'Cung ứng ổn định quanh năm',
        'Truy xuất nguồn gốc minh bạch',
        'Giá cả cạnh tranh'
      ],
      image: 'https://readdy.ai/api/search-image?query=Modern%20pharmaceutical%20manufacturing%20facility%20herbal%20medicine%20production%20quality%20control%20laboratory%20clean%20sterile%20environment%20professional%20equipment%20Vietnamese%20pharmaceutical%20company%20high-tech%20processing%20standardized%20production%20quality%20assurance%20natural%20ingredients%20bright%20lighting%20modern%20industrial%20design%20clean%20simple%20background&width=800&height=600&seq=enterprise-hero-001&orientation=landscape'
    },
    {
      id: 'research',
      icon: 'ri-flask-line',
      label: 'Trung Tâm Gen',
      title: 'Trung Tâm Nghiên Cứu Gen',
      description: 'Nghiên cứu và phát triển giống dược liệu ưu việt, nâng cao chất lượng và năng suất.',
      benefits: [
        'Giống cây chất lượng cao',
        'Nghiên cứu khoa học ứng dụng',
        'Chuyển giao công nghệ',
        'Hợp tác quốc tế'
      ],
      image: 'https://readdy.ai/api/search-image?query=Modern%20biotechnology%20research%20laboratory%20plant%20genetics%20study%20scientists%20working%20with%20medicinal%20plants%20DNA%20research%20microscope%20analysis%20clean%20lab%20environment%20Vietnamese%20research%20center%20advanced%20equipment%20scientific%20innovation%20green%20technology%20bright%20professional%20lighting%20modern%20facility%20clean%20simple%20background&width=800&height=600&seq=research-hero-001&orientation=landscape'
    },
    {
      id: 'physician',
      icon: 'ri-stethoscope-line',
      label: 'Thầy Thuốc',
      title: 'Thầy Thuốc & Bệnh Viện Đông Y',
      description: 'Nguồn dược liệu sạch, dược tính cao và minh bạch nguồn gốc cho điều trị hiệu quả.',
      benefits: [
        'Dược liệu chuẩn VITA',
        'Dược tính cao, hiệu quả tốt',
        'Minh bạch nguồn gốc',
        'Hỗ trợ thanh toán BHYT'
      ],
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Vietnamese%20medicine%20doctor%20examining%20patient%20herbal%20medicine%20consultation%20professional%20medical%20setting%20traditional%20healing%20practice%20medicinal%20herbs%20display%20calm%20atmosphere%20trusted%20healthcare%20cultural%20medicine%20natural%20remedies%20doctor-patient%20interaction%20warm%20lighting%20clean%20clinic%20environment%20simple%20background&width=800&height=600&seq=physician-hero-001&orientation=landscape'
    },
    // NHÓM MỚI: ĐẦU TƯ & TÁC ĐỘNG MÔI TRƯỜNG
    {
      id: 'investor-portal',
      icon: 'ri-shield-star-line',
      label: 'Nhà Đầu Tư',
      title: 'Cổng Quan hệ Nhà đầu tư',
      description: 'Virtual Data Room • Valuation Simulator • Lộ trình IPO • Cap Table • Báo cáo IR cho các Quỹ đầu tư, Shark, Angel, VC.',
      benefits: [
        'Virtual Data Room bảo mật',
        'Công cụ giả lập định giá',
        'Lộ trình IPO rõ ràng',
        'Báo cáo IR tự động'
      ],
      image: 'https://readdy.ai/api/search-image?query=professional%20investor%20relations%20meeting%20handshake%20business%20partnership%20financial%20charts%20dashboard%20on%20screens%20modern%20conference%20room%20venture%20capital%20angel%20investor%20startup%20funding%20IPO%20valuation%20cap%20table%20presentation%20professional%20attire%20confident%20expression%20successful%20negotiation&width=800&height=600&seq=investor-portal-001&orientation=landscape'
    },
    {
      id: 'esg-portal',
      icon: 'ri-leaf-line',
      label: 'ESG Impact',
      title: 'Cổng Đầu tư ESG',
      description: 'Sàn đầu tư Tác động - Kết nối dòng vốn ESG với các dự án trồng rừng bền vững, Tín chỉ Carbon, giám sát thời gian thực.',
      benefits: [
        'Dự án trồng rừng minh bạch',
        'Tín chỉ Carbon được chứng nhận',
        'Giám sát tác động thời gian thực',
        'Báo cáo bền vững chuẩn quốc tế'
      ],
      image: 'https://readdy.ai/api/search-image?query=ESG%20environmental%20social%20governance%20green%20leaf%20sustainable%20forestry%20project%20carbon%20credits%20impact%20investment%20dashboard%20environmental%20monitoring%20green%20finance%20corporate%20sustainability%20renewable%20energy%20climate%20action%20professional%20presentation%20modern%20office%20clean%20background&width=800&height=600&seq=esg-portal-001&orientation=landscape'
    },
    {
      id: 'timber-trading',
      icon: 'ri-tree-line',
      label: 'Doanh Nghiệp Gỗ',
      title: 'Cổng Giao dịch Gỗ Nguyên liệu',
      description: 'Đặt hàng rừng trồng tương lai • Chứng chỉ FSC/PEFC • Tính toán hiệu suất • Kế hoạch khai thác bền vững.',
      benefits: [
        'Nguồn gỗ hợp pháp ổn định',
        'Chứng chỉ FSC/PEFC tự động',
        'Dự báo sản lượng chính xác',
        'Khai thác không ảnh hưởng dược liệu'
      ],
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20building%20wood%20trading%20company%20timber%20commodity%20futures%20forestry%20management%20sustainable%20logging%20FSC%20certified%20wood%20supply%20chain%20professional%20business%20environment%20charts%20graphs%20growth%20trends%20financial%20dashboard&width=800&height=600&seq=timber-trading-001&orientation=landscape'
    },
    {
      id: 'forestry',
      icon: 'ri-plant-line',
      label: 'Lâm Sinh',
      title: 'Bộ Tiêu chuẩn & Công cụ Lâm sinh',
      description: 'Quản lý Hệ sinh thái Đa tầng tán - Rừng gỗ lớn che bóng cho dược liệu. Kiến Trúc Sư Rừng, AI đo độ che phủ.',
      benefits: [
        'Thiết kế rừng đa tầng tối ưu',
        'Công cụ tính toán mật độ trồng',
        'AI đo độ che phủ tự động',
        'Nhật ký lâm sinh số hóa'
      ],
      image: 'https://readdy.ai/api/search-image?query=agroforestry%20system%20multi-layer%20canopy%20forest%20Vietnamese%20highlands%20medicinal%20plants%20growing%20underneath%20tall%20trees%20sustainable%20forestry%20management%20shade-grown%20agriculture%20biodiversity%20conservation%20lush%20green%20forest%20landscape%20professional%20forestry%20management&width=800&height=600&seq=forestry-001&orientation=landscape'
    },
    {
      id: 'expert-portal',
      icon: 'ri-user-star-line',
      label: 'Chuyên Gia',
      title: 'VITA EXPERT HUB - Cổng làm việc cho Chuyên gia',
      description: 'Cổng làm việc chuyên nghiệp dành cho các Chuyên gia nông nghiệp. Tư vấn kỹ thuật từ xa, kê đơn số, bán quy trình SOP, và nhận thù lao minh bạch.',
      benefits: [
        'Phòng khám từ xa với công cụ AR',
        'Kê đơn số và liên kết e-commerce',
        'Bán quy trình SOP kiếm tiền thụ động',
        'Hợp đồng dài hạn và giám sát diện rộng'
      ],
      image: 'https://readdy.ai/api/search-image?query=professional%20agricultural%20expert%20scientist%20consulting%20with%20tablet%20device%20remote%20video%20call%20farmers%20using%20augmented%20reality%20tools%20digital%20prescription%20system%20knowledge%20sharing%20platform%20modern%20technology%20agricultural%20advice%20clean%20professional%20setting%20white%20coat&width=800&height=600&seq=expert-hub-001&orientation=landscape'
    },
    {
      id: 'gov-portal',
      icon: 'ri-government-line',
      label: 'Chính Quyền Xã',
      title: 'VITA GOV PORTAL - Xã Nông Thôn Mới Số',
      description: 'Cổng quản trị số dành cho chính quyền cơ sở (Xã). Giám sát kinh tế - xã hội, quản lý quy hoạch đất đai, theo dõi tiêu chí Nông thôn mới, và kênh tuyên truyền số đến người dân.',
      benefits: [
        'Dashboard tổng quan kinh tế - xã hội real-time',
        'Tự động mapping vào tiêu chí Nông thôn mới',
        'Quản lý quy hoạch & xác nhận nguồn gốc đất',
        'Kênh tuyên truyền số gửi thông báo đến App'
      ],
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20commune%20government%20office%20administrative%20building%20justice%20scales%20symbol%20digital%20dashboard%20sustainable%20rural%20development%20monitoring%20economic%20growth%20social%20welfare%20agricultural%20management%20professional%20government%20setting%20modern%20technology%20clean%20background&width=800&height=600&seq=gov-portal-001&orientation=landscape'
    },
    {
      id: 'creator-hub',
      icon: 'ri-video-add-line',
      label: 'KOL/KOC Creator',
      title: 'VITA CREATOR HUB - Cổng Đối tác Sáng tạo Nội dung',
      description: 'Cổng làm việc dành cho KOL/KOC (Key Opinion Leaders/Consumers). Truy cập Kho Tài nguyên Số, tham gia Chiến dịch Marketing, tạo Link Affiliate, và đặt lịch thăm vườn để quay video.',
      benefits: [
        'Chợ Chiến dịch: Ứng tuyển brief từ HTX/Doanh nghiệp',
        'Kho Tài nguyên Số: Camera, Timelapse, Nhật ký, Chứng thư',
        'Affiliate & Livestream: Link chia sẻ, công cụ bán hàng',
        'Booking Vườn: Đặt lịch thăm vườn với QR code ra vào'
      ],
      image: 'https://readdy.ai/api/search-image?query=social%20media%20content%20creator%20influencer%20KOL%20KOC%20working%20with%20laptop%20video%20editing%20microphone%20camera%20social%20media%20icons%20agricultural%20products%20medicinal%20herbs%20content%20creation%20marketing%20affiliate%20modern%20creative%20workspace%20youtube%20instagram&width=800&height=600&seq=creator-hub-001&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <i className="ri-leaf-line text-white text-xl sm:text-2xl"></i>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">GreenLight VITA</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Rừng Dược Sinh</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-emerald-600 transition-colors">Giới thiệu</button>
              <button onClick={() => scrollToSection('vita-standard')} className="text-gray-700 hover:text-emerald-600 transition-colors">Tiêu chuẩn VITA</button>
              <button onClick={() => scrollToSection('ecosystem')} className="text-gray-700 hover:text-emerald-600 transition-colors">Hệ sinh thái</button>
              <button onClick={() => scrollToSection('platform')} className="text-gray-700 hover:text-emerald-600 transition-colors">Nền tảng</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-emerald-600 transition-colors">Liên hệ</button>
              <button onClick={() => navigate('/home')} className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                Truy cập VITA PLATFORM
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
            >
              <i className={`${showMobileMenu ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Giới thiệu</button>
              <button onClick={() => scrollToSection('vita-standard')} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Tiêu chuẩn VITA</button>
              <button onClick={() => scrollToSection('ecosystem')} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Hệ sinh thái</button>
              <button onClick={() => scrollToSection('platform')} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Nền tảng</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Liên hệ</button>
              <button onClick={() => navigate('/home')} className="w-full px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                Truy cập VITA PLATFORM
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image Layer - z-0 (ở dưới cùng) */}
        <div className="absolute inset-0 z-0">
          {/* Ảnh nền - có thể thay đổi URL hoặc dùng ảnh local */}
          <img 
            src={HERO_BACKGROUND_IMAGE}
            alt="Rừng dược sinh - Hệ sinh thái nông nghiệp bền vững"
            className="w-full h-full object-cover object-top"
            loading="eager"
            onError={(e) => {
              // Fallback nếu ảnh không load được
              console.warn('Hero background image failed to load, using fallback');
              e.currentTarget.src = '/images/hero-background-fallback.jpg';
            }}
          />
          {/* Gradient Overlay - tạo độ tối để text dễ đọc */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
          {/* Animated overlay pattern - tạo texture nhẹ */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <i className="ri-sparkling-line text-emerald-300"></i>
            <span>Hạ tầng An sinh Xã hội Số (Digital Social Welfare Infrastructure)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            VITA PLATFORM<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
              HỆ SINH THÁI KINH TẾ RỪNG DƯỢC SINH QUỐC GIA
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Kiến tạo <span className="text-emerald-300">6 Trụ cột An sinh Toàn diện</span> cho Cộng đồng
          </p>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Không chỉ là một giải pháp công nghệ, VITA là hệ sinh thái kinh tế rừng dược sinh<br className="hidden sm:block" />
            <span className="text-emerald-200">Tạo ra hạ tầng An sinh Xã hội Số • Đồng hành cùng con người qua mọi giai đoạn cuộc đời</span>
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
            {[
              { icon: 'ri-lightbulb-flash-line', label: 'CO-CREATE', color: 'from-purple-500 to-pink-500' },
              { icon: 'ri-leaf-line', label: 'ESG Impact', color: 'from-emerald-500 to-teal-500' },
              { icon: 'ri-shopping-cart-2-line', label: 'VITA Supply', color: 'from-orange-500 to-amber-500' },
              { icon: 'ri-store-3-line', label: 'Brand Hub', color: 'from-indigo-500 to-purple-500' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                  <i className={`${feature.icon} text-white text-lg sm:text-xl`}></i>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold">{feature.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('ecosystem')}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Khám phá hệ sinh thái</span>
              <i className="ri-arrow-down-line group-hover:translate-y-1 transition-transform"></i>
            </button>
            <button 
              onClick={() => navigate('/coop-marketplace')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all whitespace-nowrap"
            >
              <i className="ri-store-3-line mr-2"></i>
              Vào Sàn Kết Nối HTX
            </button>
            <button 
              onClick={() => navigate('/creator-hub/register')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all whitespace-nowrap"
            >
              <i className="ri-video-add-line mr-2"></i>
              Trở thành Creator
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { value: '6', label: 'Hợp tác xã', icon: 'ri-team-line' },
              { value: '5,620+', label: 'Xã viên', icon: 'ri-user-line' },
              { value: '16%', label: 'Lợi tức TB', icon: 'ri-line-chart-line' },
              { value: '100%', label: 'Truy xuất nguồn gốc', icon: 'ri-qr-code-line' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
              >
                <i className={`${stat.icon} text-2xl text-emerald-300 mb-2`}></i>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <i className="ri-arrow-down-line text-white text-2xl opacity-60"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">6 Chức năng An sinh Toàn diện</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hệ thống VITA không sinh ra để "thu phí", mà sinh ra để cung cấp 6 lớp bảo vệ (Safety Nets) cho người tham gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-emerald-500">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-money-dollar-circle-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. An sinh về Sinh kế</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Làm gì để ăn?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mô hình đa tầng tán: Dược liệu ngắn ngày nuôi cây gỗ dài ngày. Bao tiêu đảm bảo, thu nhập đều đặn hàng tháng.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-wallet-3-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. An sinh về Tài chính</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Lấy vốn đâu? Có bị quỵt tiền không?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tín dụng sản xuất dựa trên dữ liệu, BNPL cho vật tư, Split Payment tự động - không ai bị chiếm dụng vốn.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-book-open-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. An sinh về Tri thức</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Làm thế nào cho đúng?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                SOP từ chuyên gia trong App, đào tạo KOL về ESG, xóa mù công nghệ cho bà con vùng cao.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. An sinh về Sức khỏe</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Ăn gì cho sạch? Sống ở đâu cho khỏe?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dược liệu dược tính cao, truy xuất minh bạch. Quy trình hữu cơ/vi sinh bảo vệ sức khỏe nông dân.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-amber-500">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. An sinh về Tương lai & Hưu trí</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Về già sống bằng gì?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sổ tiết kiệm Xanh đa kỳ hạn: Cây gỗ quý (của để dành), cây tinh dầu (lương hưu thụ động), Hưu trí Carbon.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-pink-500">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-community-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. An sinh về Tinh thần & Kết nối</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Đời sống tinh thần có phong phú không?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Du lịch Hoa Dược Liệu, bảo tồn văn hóa bản địa, kết nối cộng đồng, niềm tự hào về sản phẩm tử tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VITA Standard Section */}
      <section id="vita-standard" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tiêu Chuẩn VITA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              4 trụ cột đảm bảo chất lượng và tính bền vững của hệ sinh thái Rừng Dược Sinh
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">V</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Vitality</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Sức Sống</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Hàm lượng hoạt chất đạt chuẩn Dược điển Việt Nam, đảm bảo hiệu quả điều trị
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Integrity</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Toàn Vẹn</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Không hóa chất độc hại, canh tác sinh học, an toàn cho sức khỏe và môi trường
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Trust</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Tin Cậy</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Truy xuất nguồn gốc 100% bằng QR Code, minh bạch từ vùng trồng đến người tiêu dùng
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Accountability</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Trách Nhiệm</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Mỗi bên trong chuỗi giá trị đều có trách nhiệm rõ ràng, đảm bảo chất lượng tổng thể
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Gateway CTA Banner - NEW */}
          <div className="mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            
            <div className="relative px-8 py-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                <i className="ri-star-line"></i>
                <span>Cổng Vào Hệ Sinh Thái VITA</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Trở Thành Đối Tác / Xã Viên VITA
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Khám phá các Hợp tác xã đang hoạt động, lựa chọn vai trò phù hợp và tham gia ngay hôm nay.<br />
                <span className="font-semibold">Minh bạch • Uy tín • Sinh lời bền vững</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/coop-marketplace')}
                  className="group px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 whitespace-nowrap"
                >
                  <i className="ri-store-3-line text-2xl"></i>
                  <span>Vào Sàn Kết Nối HTX</span>
                  <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <button
                  onClick={() => scrollToSection('ecosystem')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all whitespace-nowrap"
                >
                  Tìm hiểu các vai trò
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">6</div>
                  <div className="text-sm text-white/80">Hợp tác xã</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5,620</div>
                  <div className="text-sm text-white/80">Xã viên</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">16%</div>
                  <div className="text-sm text-white/80">Lợi tức TB</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mô Hình Hệ Sinh Thái VITA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tabs.length} vai trò khác nhau cùng hợp tác, tạo nên hệ sinh thái dược liệu bền vững và minh bạch
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto min-h-[300px] md:min-h-[400px]">
                <img 
                  src={ECOSYSTEM_ILLUSTRATION}
                  alt={tabs[activeTab].title}
                  className="w-full h-full object-cover object-center md:object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent md:bg-gradient-to-t md:from-black/30 md:to-transparent"></div>
                {/* Mobile: Overlay text on image */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{tabs[activeTab].title}</h3>
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                {/* Desktop: Title in content area */}
                <h3 className="hidden md:block text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">{tabs[activeTab].title}</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">{tabs[activeTab].description}</p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {tabs[activeTab].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-emerald-600 text-xl sm:text-2xl mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>

                {activeTab === 0 && (
                  <button 
                    onClick={() => navigate('/forest-owner-register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Tìm HTX để Góp đất
                  </button>
                )}
                {activeTab === 1 && (
                  <button 
                    onClick={() => navigate('/coop-marketplace')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Tìm HTX để Nhận khoán
                  </button>
                )}
                {activeTab === 2 && (
                  <button 
                    onClick={() => navigate('/cooperative-register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Đăng ký Hợp tác xã vệ tinh
                  </button>
                )}
                {activeTab === 3 && (
                  <button 
                    onClick={() => navigate('/coop-marketplace')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Tìm dự án để Góp vốn
                  </button>
                )}
                {activeTab === 4 && (
                  <button 
                    onClick={() => navigate('/enterprise-register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Đăng ký Thu mua/Bao tiêu
                  </button>
                )}
                {activeTab === 5 && (
                  <button 
                    onClick={() => navigate('/research-partner-register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Hợp tác Chuyển giao công nghệ
                  </button>
                )}
                {activeTab === 6 && (
                  <button 
                    onClick={() => navigate('/physician-register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Tham gia Mạng lưới Thầy thuốc
                  </button>
                )}
                {activeTab === 7 && (
                  <button 
                    onClick={() => navigate('/investor-portal/register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-lock-line mr-2"></i>
                    Đăng ký / Đăng nhập Investor Portal (Private)
                  </button>
                )}
                {activeTab === 8 && (
                  <button 
                    onClick={() => navigate('/esg-portal/login')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-login-box-line mr-2"></i>
                    Đăng nhập / Đăng ký ESG Portal
                  </button>
                )}
                {activeTab === 9 && (
                  <button 
                    onClick={() => navigate('/timber-trading/login')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-login-box-line mr-2"></i>
                    Đăng nhập / Đăng ký Timber Hub
                  </button>
                )}
                {activeTab === 10 && (
                  <button 
                    onClick={() => navigate('/admin-forest-funding?tab=forestry')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Truy cập Công cụ Lâm sinh
                  </button>
                )}
                {activeTab === 11 && (
                  <button 
                    onClick={() => navigate('/expert-portal/register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-user-star-line mr-2"></i>
                    Đăng ký tài khoản Chuyên gia
                  </button>
                )}
                {activeTab === 12 && (
                  <button 
                    onClick={() => navigate('/gov-portal/register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-government-line mr-2"></i>
                    Đăng ký tài khoản Chính quyền Xã
                  </button>
                )}
                {activeTab === 13 && (
                  <button 
                    onClick={() => navigate('/creator-hub/register')}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    <i className="ri-video-add-line mr-2"></i>
                    Đăng ký tài khoản Creator
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Chính Sách Quốc Gia Hỗ Trợ</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hệ sinh thái Rừng Dược Sinh được hỗ trợ bởi các chính sách ưu đãi của Nhà nước
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border border-emerald-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nghị định 91/2021/NĐ-CP</h3>
                  <p className="text-gray-700 mb-3">Chính sách phát triển lâm nghiệp bền vững</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-emerald-600 mt-0.5"></i>
                      <span>Hỗ trợ 30-50 triệu/ha cho trồng rừng dược liệu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-emerald-600 mt-0.5"></i>
                      <span>Ưu đãi thuế thu nhập doanh nghiệp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nghị định 131/2018/NĐ-CP</h3>
                  <p className="text-gray-700 mb-3">Chính sách phát triển dược liệu</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-blue-600 mt-0.5"></i>
                      <span>Hỗ trợ vốn vay ưu đãi 0-3%/năm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-blue-600 mt-0.5"></i>
                      <span>Miễn giảm thuế sử dụng đất nông nghiệp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Luật Hợp tác xã 2012</h3>
                  <p className="text-gray-700 mb-3">Khuyến khích phát triển HTX</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-purple-600 mt-0.5"></i>
                      <span>Miễn thuế thu nhập doanh nghiệp 4 năm đầu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-purple-600 mt-0.5"></i>
                      <span>Giảm 50% thuế 5 năm tiếp theo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-2xl border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nghị định 98/2018/NĐ-CP</h3>
                  <p className="text-gray-700 mb-3">Khuyến khích phát triển HTX</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-amber-600 mt-0.5"></i>
                      <span>Hỗ trợ đào tạo, tư vấn miễn phí</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-amber-600 mt-0.5"></i>
                      <span>Hỗ trợ xây dựng thương hiệu, truy xuất nguồn gốc</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl border border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nghị định 52/2018/NĐ-CP</h3>
                  <p className="text-gray-700 mb-3">Nông nghiệp ứng dụng công nghệ cao</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-green-600 mt-0.5"></i>
                      <span>Hỗ trợ 50-70% chi phí đầu tư IoT, cảm biến</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-green-600 mt-0.5"></i>
                      <span>Ưu đãi vay vốn cho chuyển đổi số</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 sm:p-8 rounded-2xl border border-pink-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quyết định 899/QĐ-TTg</h3>
                  <p className="text-gray-700 mb-3">Tái cơ cấu ngành nông nghiệp</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-pink-600 mt-0.5"></i>
                      <span>Hỗ trợ liên kết chuỗi giá trị</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-pink-600 mt-0.5"></i>
                      <span>Ưu tiên vốn cho dự án dược liệu</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border border-teal-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Chương trình Nông thôn mới</h3>
                  <p className="text-gray-700 mb-3">Xây dựng nông thôn mới</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-teal-600 mt-0.5"></i>
                      <span>Hỗ trợ hạ tầng, đường giao thông</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-teal-600 mt-0.5"></i>
                      <span>Ưu tiên dự án tạo việc làm tại chỗ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 sm:p-8 rounded-2xl border border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nghị định 80/2021/NĐ-CP</h3>
                  <p className="text-gray-700 mb-3">Hỗ trợ doanh nghiệp nhỏ và vừa</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-yellow-600 mt-0.5"></i>
                      <span>Vay vốn ưu đãi lãi suất thấp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-yellow-600 mt-0.5"></i>
                      <span>Hỗ trợ đào tạo, chuyển giao công nghệ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Hệ Thống Nền Tảng VITA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              Hệ thống nền tảng công nghệ kết nối toàn bộ chuỗi giá trị dược liệu, từ nông trại đến người tiêu dùng, từ đầu tư đến tác động môi trường
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Tích hợp các API bên thứ 3 (ezCloud, Haravan, Stringee, FPT.AI, Goship) để tối ưu hóa hiệu quả và giảm chi phí
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* VITA FARMER */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-smartphone-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA FARMER</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Ứng dụng di động cho nông dân: Ghi nhật ký canh tác, quản lý nông trại, theo dõi thu nhập, quét QR sản phẩm
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Dashboard & Thời tiết</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Nhật ký canh tác</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Quản lý nông trại & Ví</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Cộng đồng & Quét QR</span>
                </div>
              </div>
            </div>

            {/* VITA ADMIN */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-dashboard-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA ADMIN</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Bảng điều khiển cho HTX: Quản lý xã viên, giám sát vùng trồng GIS, kho bãi, tài chính, sản xuất
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Dashboard tổng quan</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Bản đồ GIS & Thành viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Kho bãi & Tài chính</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Sản xuất & Chuyên gia</span>
                </div>
              </div>
            </div>

            {/* VITA RESEARCH */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-flask-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA RESEARCH</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Trung tâm Gen & Khoa học: Nghiên cứu giống, phân tích DNA, thử nghiệm lâm sàng, chuyển giao công nghệ
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Ngân hàng Gen</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Phân tích DNA & Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Thử nghiệm lâm sàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Chuyển giao công nghệ</span>
                </div>
              </div>
            </div>

            {/* VITA PARTNER */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-amber-100">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-store-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA PARTNER</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng thông tin B2B cho doanh nghiệp: Đặt hàng, theo dõi đơn hàng, truy xuất nguồn gốc minh bạch
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Dashboard doanh nghiệp</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Quản lý đơn hàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Truy xuất nguồn gốc</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Báo cáo chất lượng</span>
                </div>
              </div>
            </div>

            {/* VITA PHYSICIAN */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-stethoscope-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA PHYSICIAN</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng thông tin cho Thầy thuốc & Bệnh viện: Kiểm định dược liệu, kê đơn, theo dõi hiệu quả điều trị
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600"></i>
                  <span>Portal Thầy thuốc</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600"></i>
                  <span>Kiểm định chất lượng</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600"></i>
                  <span>Kê đơn điện tử</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-teal-600"></i>
                  <span>Theo dõi điều trị</span>
                </div>
              </div>
            </div>

            {/* GREENLIGHT COMMAND */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-400">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shield-star-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">GREENLIGHT COMMAND</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Trung tâm Điều hành & Giám sát: Quản trị toàn hệ thống, giám sát tuân thủ, tài chính, tín chỉ Carbon, ESG
              </p>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-white"></i>
                  <span>Tổng quan toàn hệ thống</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-white"></i>
                  <span>Giám sát & Tuân thủ VITA</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-white"></i>
                  <span>Tài chính & Đầu tư</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-white"></i>
                  <span>Tín chỉ Carbon & ESG</span>
                </div>
              </div>
            </div>

            {/* INVESTOR PORTAL */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shield-star-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">INVESTOR PORTAL</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng Quan hệ Nhà đầu tư (Private): Virtual Data Room, Valuation Simulator, Lộ trình IPO, Cap Table Management
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Virtual Data Room bảo mật</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Valuation Simulator</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Lộ trình IPO & Cap Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Báo cáo IR tự động</span>
                </div>
              </div>
            </div>

            {/* ESG PORTAL */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-leaf-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ESG IMPACT HUB</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sàn đầu tư Tác động: Dự án trồng rừng, Tín chỉ Carbon, Giám sát thời gian thực, Báo cáo bền vững
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                  <span>Dự án trồng rừng minh bạch</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                  <span>Tín chỉ Carbon chứng nhận</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                  <span>Giám sát tác động real-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                  <span>Báo cáo ESG chuẩn quốc tế</span>
                </div>
              </div>
            </div>

            {/* TIMBER TRADING */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-amber-100">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-tree-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">TIMBER TRADING HUB</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng Giao dịch Gỗ Nguyên liệu: Đặt hàng rừng trồng tương lai, Chứng chỉ FSC/PEFC, Tính toán hiệu suất
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Timber Futures Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>FSC/PEFC Certificate Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Yield Calculator & Harvesting Plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-600"></i>
                  <span>Timber Stock Map</span>
                </div>
              </div>
            </div>

            {/* FORESTRY MODULE */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-plant-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA FORESTRY</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Bộ Tiêu chuẩn & Công cụ Lâm sinh: Quản lý Hệ sinh thái Đa tầng tán, Kiến Trúc Sư Rừng, AI đo độ che phủ
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Tiêu chuẩn VITA Lâm Sinh</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Forest Architect - Thiết kế rừng</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>AI đo độ che phủ</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                  <span>Nhật ký Lâm sinh số hóa</span>
                </div>
              </div>
            </div>

            {/* VITA SUPPLY */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shopping-cart-2-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA SUPPLY</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sàn Cung Ứng Vật Tư & Thiết Bị: Mua chung giá sỉ, trả chậm vụ sau, gói vật tư theo vụ, thiết bị IoT
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-orange-600"></i>
                  <span>Vật tư canh tác giá sỉ</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-orange-600"></i>
                  <span>Mua trả chậm (BNPL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-orange-600"></i>
                  <span>Gói vật tư theo vụ</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-orange-600"></i>
                  <span>Thiết bị IoT VITA Tech</span>
                </div>
              </div>
            </div>

            {/* HTX BRAND HUB */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-store-3-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">HTX BRAND HUB</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng Thương hiệu & Dịch vụ: Shopee Connect, Landing Page Builder, Tourism Booking (PMS), VITA POS
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-indigo-600"></i>
                  <span>Đồng bộ Shopee (Haravan API)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-indigo-600"></i>
                  <span>Landing Page Builder</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-indigo-600"></i>
                  <span>Tourism PMS (ezCloud)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-indigo-600"></i>
                  <span>VITA POS & Revenue Recon</span>
                </div>
              </div>
            </div>

            {/* VITA EXPERT HUB */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-pink-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-user-star-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA EXPERT HUB</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng làm việc Chuyên gia: Tư vấn kỹ thuật từ xa (Stringee), Kê đơn số, Bán quy trình SOP
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-pink-600"></i>
                  <span>Video Call tư vấn (Stringee)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-pink-600"></i>
                  <span>Kê đơn điện tử</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-pink-600"></i>
                  <span>Bán quy trình SOP</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-pink-600"></i>
                  <span>Thư viện kiến thức</span>
                </div>
              </div>
            </div>

            {/* VITA CREATOR HUB */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-video-add-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA CREATOR HUB</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Cổng Đối tác Sáng tạo: KOL/KOC, Kho tài nguyên số, Chiến dịch Marketing, Affiliate & Livestream
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Quản lý KOL/KOC</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Kho tài nguyên số</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Chiến dịch Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-purple-600"></i>
                  <span>Affiliate & Livestream</span>
                </div>
              </div>
            </div>

            {/* VITA GOV PORTAL */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-government-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VITA GOV PORTAL</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Xã Nông Thôn Mới Số: Quản trị số chính quyền Xã, Giám sát kinh tế-xã hội, Quản lý quy hoạch đất đai
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Dashboard chính quyền</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Giám sát kinh tế-xã hội</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Quy hoạch đất đai</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-blue-600"></i>
                  <span>Tiêu chí Nông thôn mới</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/home')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-lg hover:shadow-2xl transition-all whitespace-nowrap"
            >
              Truy cập VITA Platform ngay
            </button>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Lộ Trình Phát Triển</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
              Từ thí điểm đến mở rộng toàn quốc, xây dựng hệ sinh thái dược liệu hàng đầu Việt Nam
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Áp dụng chiến lược "Tech-Smart" - Tích hợp API bên thứ 3 để tối ưu chi phí và đẩy nhanh tốc độ triển khai
            </p>
          </div>

          <div className="space-y-6">
            {/* Giai đoạn 1 - Đang triển khai */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border-l-4 border-emerald-500 shadow-md relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                Đang triển khai
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 1 (2024-2025): Thí điểm & Xây dựng Nền tảng</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Triển khai tại Kon Tum, Phú Thọ, Hòa Bình với <strong>500ha</strong>, <strong>5 HTX</strong>, <strong>200 hộ nông dân</strong>. 
                    Xây dựng hệ thống nền tảng VITA với đầy đủ các module cốt lõi.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">Platform Core</span>
                      </div>
                      <p className="text-sm text-gray-600">VITA Farmer, Admin, Research, Partner, Expert Hub</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">Module Mới</span>
                      </div>
                      <p className="text-sm text-gray-600">VITA Supply, HTX Brand Hub, Subscription Engine, Skill Bank</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">API Integration</span>
                      </div>
                      <p className="text-sm text-gray-600">ezCloud, Haravan, Stringee, FPT.AI, Goship, Mapbox</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-line text-gray-400"></i>
                        <span className="font-semibold text-gray-700">Hợp đồng B2B</span>
                      </div>
                      <p className="text-sm text-gray-600">Ký hợp đồng với 3-5 doanh nghiệp dược phẩm</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ Platform Core</span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ API Integration Hub</span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ Landing Pages</span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-200">🔄 Chuẩn hóa SOP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giai đoạn 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-l-4 border-blue-500 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 2 (2026-2027): Mở rộng Vùng Miền</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Nhân rộng ra <strong>10 tỉnh miền núi phía Bắc</strong>, đạt <strong>5,000ha</strong>, <strong>50 HTX</strong>, 
                    <strong> 2,000 hộ nông dân</strong>. Xây dựng chuỗi giá trị hoàn chỉnh từ sản xuất đến tiêu thụ.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-building-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Hạ tầng</span>
                      </div>
                      <p className="text-sm text-gray-600">2 Trung tâm Sơ chế, 5 Kho trung chuyển</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-handshake-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Đối tác</span>
                      </div>
                      <p className="text-sm text-gray-600">Hợp tác 20+ Doanh nghiệp B2B</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-global-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Xuất khẩu</span>
                      </div>
                      <p className="text-sm text-gray-600">Xuất khẩu thử nghiệm sang Thái Lan, Singapore</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-leaf-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">ESG & Carbon</span>
                      </div>
                      <p className="text-sm text-gray-600">Chứng nhận Carbon Credit đầu tiên</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Trung tâm Sơ chế</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Hợp tác B2B</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Xuất khẩu</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Carbon Credit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giai đoạn 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border-l-4 border-purple-500 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 3 (2028+): Toàn quốc & Quốc tế</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Phủ sóng <strong>toàn quốc 50,000ha</strong>, <strong>500 HTX</strong>, <strong>20,000 hộ nông dân</strong>. 
                    Trở thành <strong>nền tảng dược liệu hàng đầu Đông Nam Á</strong> với chuỗi giá trị hoàn chỉnh.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-flask-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Trung tâm Gen</span>
                      </div>
                      <p className="text-sm text-gray-600">Trung tâm Gen công nghệ cao, nghiên cứu & phát triển giống mới</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-ship-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Xuất khẩu</span>
                      </div>
                      <p className="text-sm text-gray-600">Xuất khẩu quy mô lớn sang Trung Quốc, Nhật Bản, Hàn Quốc</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-line-chart-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">IPO</span>
                      </div>
                      <p className="text-sm text-gray-600">IPO trên thị trường chứng khoán Việt Nam</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-earth-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Mở rộng khu vực</span>
                      </div>
                      <p className="text-sm text-gray-600">Mở rộng sang Lào, Campuchia, Myanmar</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Trung tâm Gen</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Xuất khẩu quy mô lớn</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">IPO</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Mở rộng khu vực</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Đối tác Chiến lược Dự kiến</h2>
            <p className="text-lg text-gray-600 mb-2">Cùng xây dựng hệ sinh thái dược liệu bền vững</p>
            <p className="text-sm text-gray-500">Các đối tác tiềm năng trong chuỗi giá trị dược liệu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                name: 'Viện Dược Liệu',
                nameEn: 'National Institute of Medicinal Materials',
                logo: 'https://readdy.ai/api/search-image?query=National%20Institute%20of%20Medicinal%20Materials%20Vietnam%20official%20logo%20medical%20research%20institution%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-immm-001&orientation=landscape',
                description: 'Nghiên cứu & Phát triển dược liệu'
              },
              {
                name: 'Traphaco',
                nameEn: 'Traphaco Joint Stock Company',
                logo: 'https://readdy.ai/api/search-image?query=Traphaco%20pharmaceutical%20company%20Vietnam%20official%20logo%20traditional%20medicine%20brand%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-traphaco-001&orientation=landscape',
                description: 'Sản xuất & Phân phối dược phẩm'
              },
              {
                name: 'Nam Dược',
                nameEn: 'Nam Duoc Pharmaceutical Company',
                logo: 'https://readdy.ai/api/search-image?query=Nam%20Duoc%20pharmaceutical%20company%20Vietnam%20official%20logo%20herbal%20medicine%20brand%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-namduoc-001&orientation=landscape',
                description: 'Sản xuất dược liệu & Thực phẩm chức năng'
              },
              {
                name: 'Học viện Nông nghiệp',
                nameEn: 'Vietnam National University of Agriculture',
                logo: 'https://readdy.ai/api/search-image?query=Vietnam%20National%20University%20of%20Agriculture%20VNUA%20official%20logo%20agricultural%20education%20institution%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-vnua-001&orientation=landscape',
                description: 'Đào tạo & Nghiên cứu nông nghiệp'
              }
            ].map((partner, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="aspect-video bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain p-3"
                    onError={(e) => {
                      // Fallback nếu logo không load được
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement;
                      if (fallback) {
                        fallback.innerHTML = `<div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"><i class="ri-building-line text-white text-2xl"></i></div></div>`;
                      }
                    }}
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-500 text-center mb-2">{partner.nameEn}</p>
                <p className="text-xs text-gray-600 text-center">{partner.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Partners Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
              <i className="ri-information-line"></i>
              <span>Danh sách đối tác đang được mở rộng và cập nhật thường xuyên</span>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tin Tức & Sự Kiện</h2>
            <p className="text-lg text-gray-600 mb-2">Cập nhật mới nhất về hệ sinh thái Rừng Dược Sinh</p>
            <p className="text-sm text-gray-500">Theo dõi hành trình phát triển của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                title: 'Khởi động dự án thí điểm tại Kon Tum', 
                date: '15/01/2024',
                category: 'Dự án',
                image: 'https://readdy.ai/api/search-image?query=Vietnamese+highland+farmers+planting+ginseng+seedlings+under+forest+canopy+in+Kon+Tum+province+showing+community+cooperation+sustainable+agroforestry+mountain+landscape+natural+green+environment&width=600&height=400&seq=news-kontum-001&orientation=landscape',
                description: 'Triển khai dự án thí điểm tại HTX Măng Ri với diện tích 245ha, 187 thành viên'
              },
              { 
                title: 'Ký kết hợp tác chiến lược với Viện Dược Liệu', 
                date: '20/01/2024',
                category: 'Hợp tác',
                image: 'https://readdy.ai/api/search-image?query=Official+signing+ceremony+partnership+agreement+between+Vietnamese+agricultural+cooperative+and+National+Institute+of+Medicinal+Materials+with+documents+handshake+professional+conference+room+modern+business+setting&width=600&height=400&seq=news-partnership-001&orientation=landscape',
                description: 'Hợp tác nghiên cứu và phát triển giống dược liệu chất lượng cao'
              },
              { 
                title: 'Đào tạo kỹ thuật canh tác cho 200 nông dân', 
                date: '25/01/2024',
                category: 'Đào tạo',
                image: 'https://readdy.ai/api/search-image?query=Training+workshop+Vietnamese+farmers+learning+medicinal+plant+cultivation+techniques+in+traditional+community+hall+with+expert+instructor+teaching+group+participants+hands-on+practical+agricultural+education&width=600&height=400&seq=news-training-001&orientation=landscape',
                description: 'Khóa đào tạo về quy trình canh tác hữu cơ và ứng dụng công nghệ IoT'
              },
              { 
                title: 'Ra mắt VITA Supply - Sàn cung ứng vật tư', 
                date: '05/02/2024',
                category: 'Sản phẩm',
                image: 'https://readdy.ai/api/search-image?query=Agricultural+supply+chain+warehouse+Vietnamese+cooperative+storage+facility+with+organic+fertilizers+packages+equipment+modern+logistics+distribution+center+professional+business+setting&width=600&height=400&seq=news-supply-001&orientation=landscape',
                description: 'Sàn cung ứng vật tư giá sỉ với chính sách trả chậm vụ sau'
              },
              { 
                title: 'Tích hợp API ezCloud cho Tourism PMS', 
                date: '12/02/2024',
                category: 'Công nghệ',
                image: 'https://readdy.ai/api/search-image?query=Modern+technology+integration+API+connection+cloud+computing+system+Vietnamese+eco-tourism+platform+digital+transformation+smart+agriculture+tech+innovation+professional+setting&width=600&height=400&seq=news-api-001&orientation=landscape',
                description: 'Kết nối với ezCloud để quản lý booking du lịch qua các kênh OTA'
              },
              { 
                title: 'Vườn Sâm Ngọc Linh đạt chứng nhận Organic', 
                date: '18/02/2024',
                category: 'Chứng nhận',
                image: 'https://readdy.ai/api/search-image?query=Vietnamese+ginseng+Ngoc+Linh+farm+organic+certification+ceremony+green+healthy+plants+forest+environment+sustainable+agriculture+high-quality+medicinal+herbs+natural+cultivation&width=600&height=400&seq=news-cert-001&orientation=landscape',
                description: 'HTX Măng Ri nhận chứng nhận hữu cơ cho 100ha vườn Sâm Ngọc Linh'
              }
            ].map((news, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={news.image}
                    alt={news.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://readdy.ai/api/search-image?query=Vietnamese+agricultural+news+event+modern+professional+photography&width=600&height=400&seq=news-fallback-${index}&orientation=landscape`;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                      {news.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-calendar-line text-emerald-600"></i>
                    <p className="text-sm text-emerald-600 font-medium">{news.date}</p>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {news.description}
                  </p>
                  <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm group/btn">
                    <span>Đọc thêm</span>
                    <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2">
              <span>Xem tất cả tin tức</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn tham gia vào hệ sinh thái Rừng Dược Sinh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Hotline</h3>
              <p className="text-white/90">1900 xxxx</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-white/90">info@greenlight-vita.vn</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Địa chỉ</h3>
              <p className="text-white/90">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <i className="ri-leaf-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">GreenLight VITA</h3>
              </div>
              <p className="text-gray-400 text-sm">Hệ sinh thái dược liệu bền vững</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Về chúng tôi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Giới thiệu</button></li>
                <li><button onClick={() => scrollToSection('vita-standard')} className="hover:text-white transition-colors">Tiêu chuẩn VITA</button></li>
                <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors">Hệ sinh thái</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigate('/forest-owner-register')} className="hover:text-white transition-colors">Đăng ký Chủ rừng</button></li>
                <li><button onClick={() => navigate('/cooperative-register')} className="hover:text-white transition-colors">Đăng ký HTX</button></li>
                <li><button onClick={() => navigate('/enterprise-register')} className="hover:text-white transition-colors">Đăng ký Doanh nghiệp</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Hotline: 1900 xxxx</li>
                <li>Email: info@greenlight-vita.vn</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024 GreenLight VITA. All rights reserved.</p>
            <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
              <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn trong vòng 24-48 giờ</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowModal(false);
                  navigate('/');
                }}
                className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                Về trang chủ
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 sm:py-4 bg-gray-100 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-200 transition-all whitespace-nowrap"
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
