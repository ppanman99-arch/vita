import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  totalCapital: number;
  raised: number;
  minInvestment: number;
  expectedReturn: string;
  duration: string;
  investors: number;
  description: string;
}

interface CoopDetail {
  id: string;
  name: string;
  region: string;
  mainProduct: string;
  coverImage: string;
  videoUrl: string;
  rating: number;
  annualReturn: number;
  area: number;
  members: number;
  greenlightScore: 5 | 4 | 3;
  
  // Giới thiệu
  introduction: string;
  established: string;
  
  // Ban quản trị
  management: {
    name: string;
    position: string;
    experience: string;
  }[];
  
  // Năng lực sản xuất
  annualProduction: string;
  certificates: string[];
  technology: string[];
  
  // Đầu ra & Đối tác
  contracts: {
    partner: string;
    product: string;
    duration: string;
  }[];
  exportMarkets: string[];
  
  // Tài sản sinh học
  biologicalAssets: {
    description: string;
    value: string;
  };
  
  // Tiềm năng Carbon
  carbonPotential: string;
  
  // Các dự án đang mở
  projects: {
    capital: Project[];
    production: {
      requirements: string[];
      commitment: string[];
    };
    land: {
      requirements: string[];
      commitment: string[];
      benefits: string[];
    };
    consumer: {
      benefits: string[];
    };
  };
}

const coopDetails: Record<string, CoopDetail> = {
  'htx-sin-ho': {
    id: 'htx-sin-ho',
    name: 'HTX Dược Liệu Hữu Cơ Sìn Hồ',
    region: 'Tây Bắc',
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=aerial%20view%20of%20vast%20ginseng%20plantation%20in%20misty%20mountains%20terraced%20fields%20organic%20farming%20northern%20vietnam%20highlands%20lush%20green%20landscape%20sustainable%20agriculture%20morning%20fog%20rolling%20hills%20traditional%20medicinal%20herb%20cultivation&width=1200&height=600&seq=htxdetail1&orientation=landscape',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 5,
    annualReturn: 18,
    area: 500,
    members: 1200,
    greenlightScore: 5,
    introduction: 'HTX Dược Liệu Hữu Cơ Sìn Hồ được thành lập với sứ mệnh phát triển bền vững ngành dược liệu Việt Nam, đặc biệt là Sâm Ngọc Linh - loại dược liệu quý hiếm của Tây Bắc. Chúng tôi áp dụng công nghệ canh tác hiện đại kết hợp với kinh nghiệm truyền thống của đồng bào dân tộc thiểu số, tạo ra sản phẩm chất lượng cao đạt tiêu chuẩn quốc tế.',
    established: '2015',
    management: [
      {
        name: 'Nguyễn Văn Minh',
        position: 'Chủ nhiệm HTX',
        experience: '15 năm kinh nghiệm trong lĩnh vực dược liệu, Thạc sĩ Nông nghiệp'
      },
      {
        name: 'Trần Thị Hoa',
        position: 'Kế toán trưởng',
        experience: '10 năm kinh nghiệm tài chính, CPA'
      },
      {
        name: 'Lý Văn Tùng',
        position: 'Trưởng ban kiểm soát',
        experience: '12 năm kinh nghiệm quản lý chất lượng, Chứng chỉ GACP-WHO'
      }
    ],
    annualProduction: '50 tấn Sâm tươi, 8 tấn Sâm khô',
    certificates: ['GACP-WHO', 'Organic USDA', 'VietGAP', 'ISO 9001:2015'],
    technology: [
      'Hệ thống tưới nhỏ giọt tự động IOT',
      'Nhà sấy năng lượng mặt trời',
      'Hệ thống giám sát vi khí hậu 24/7',
      'Blockchain truy xuất nguồn gốc'
    ],
    contracts: [
      {
        partner: 'Công ty Dược phẩm Traphaco',
        product: 'Sâm Ngọc Linh khô',
        duration: 'Hợp đồng bao tiêu 5 năm (2023-2028)'
      },
      {
        partner: 'Tập đoàn Vingroup',
        product: 'Sâm tươi hữu cơ',
        duration: 'Hợp đồng 3 năm (2024-2027)'
      }
    ],
    exportMarkets: ['Nhật Bản', 'Hàn Quốc', 'Đài Loan', 'Singapore'],
    biologicalAssets: {
      description: '2 triệu cây Sâm Ngọc Linh 3-5 năm tuổi',
      value: '200 tỷ VNĐ'
    },
    carbonPotential: '10.000 tấn CO₂/năm (Tiềm năng bán tín chỉ carbon 2-3 tỷ VNĐ/năm)',
    projects: {
      capital: [
        {
          id: 'project-1',
          name: 'Mở rộng vùng trồng Sâm khu vực II - 50ha',
          totalCapital: 10000000000,
          raised: 6000000000,
          minInvestment: 20000000,
          expectedReturn: '15-20%/năm',
          duration: '5 năm',
          investors: 180,
          description: 'Dự án mở rộng vùng trồng Sâm Ngọc Linh tại khu vực II với diện tích 50ha, áp dụng công nghệ canh tác tiên tiến, dự kiến thu hoạch sau 3-5 năm với sản lượng 15 tấn/năm.'
        },
        {
          id: 'project-2',
          name: 'Nhà máy sơ chế & đóng gói hiện đại',
          totalCapital: 5000000000,
          raised: 2000000000,
          minInvestment: 10000000,
          expectedReturn: '18-22%/năm',
          duration: '3 năm',
          investors: 95,
          description: 'Xây dựng nhà máy sơ chế và đóng gói đạt tiêu chuẩn GMP, công suất 100 tấn/năm, phục vụ xuất khẩu và thị trường nội địa cao cấp.'
        }
      ],
      production: {
        requirements: [
          'Có đất rừng tại huyện Sìn Hồ, độ cao >1500m',
          'Diện tích tối thiểu 0.5ha',
          'Cam kết canh tác theo quy trình GACP-WHO',
          'Tham gia đào tạo kỹ thuật của HTX'
        ],
        commitment: [
          'Cung cấp giống Sâm Ngọc Linh chất lượng cao',
          'Hỗ trợ phân bón, thuốc BVTV (trả chậm không lãi suất)',
          'Đào tạo kỹ thuật miễn phí',
          'Bao tiêu 100% sản phẩm đạt tiêu chuẩn',
          'Giá thu mua cố định theo hợp đồng'
        ]
      },
      land: {
        requirements: [
          'Có giấy tờ pháp lý đất rừng hợp lệ (Sổ đỏ/Sổ xanh/Giấy giao đất)',
          'Diện tích tối thiểu 1ha, tối đa 50ha',
          'Độ cao >1200m, độ dốc <25°',
          'Đất chưa bị ô nhiễm hóa chất, không trong vùng quy hoạch di dời'
        ],
        commitment: [
          'HTX đầu tư 100% chi phí canh tác (giống, phân bón, nhân công)',
          'Chia sẻ lợi nhuận: 40% cho chủ đất, 60% cho HTX',
          'Hợp đồng dài hạn 10-20 năm, có thể gia hạn',
          'Thanh toán tiền thuê đất hàng năm (5-10 triệu/ha/năm)',
          'Chủ đất được hưởng thêm thu nhập từ Carbon Credit (PFES)',
          'Hỗ trợ pháp lý hoàn thiện giấy tờ đất (nếu cần)'
        ],
        benefits: [
          'Thu nhập ổn định từ tiền thuê đất hàng năm',
          'Chia sẻ 40% lợi nhuận từ sản xuất Sâm Ngọc Linh',
          'Nhận thêm thu nhập từ dịch vụ môi trường (PFES) 2-5 triệu/ha/năm',
          'Tiềm năng bán tín chỉ Carbon trong tương lai',
          'Đất được cải tạo, tăng giá trị sau khi kết thúc hợp đồng',
          'Không phải đầu tư vốn, không chịu rủi ro sản xuất'
        ]
      },
      consumer: {
        benefits: [
          'Mua sản phẩm giá gốc tại kho (giảm 30-50% so với thị trường)',
          'Ưu tiên hàng loại 1, hàng mới thu hoạch',
          'Miễn phí vận chuyển cho đơn hàng >500.000đ',
          'Tích điểm đổi quà, giảm giá thêm',
          'Tham gia các chương trình mua chung đặc biệt'
        ]
      }
    }
  },
  'htx-kon-tum': {
    id: 'htx-kon-tum',
    name: 'HTX Dược Liệu Kon Tum',
    region: 'Tây Nguyên',
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=panoramic%20drone%20shot%20of%20highland%20medicinal%20herb%20farm%20central%20highlands%20vietnam%20organized%20cultivation%20rows%20modern%20greenhouse%20structures%20mountain%20backdrop%20blue%20sky%20professional%20organic%20farming%20cooperative&width=1200&height=600&seq=htxdetail2&orientation=landscape',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 5,
    annualReturn: 15,
    area: 350,
    members: 850,
    greenlightScore: 5,
    introduction: 'HTX Dược Liệu Kon Tum chuyên canh tác Sâm Ngọc Linh theo tiêu chuẩn hữu cơ tại vùng núi cao Kon Tum. Với kinh nghiệm 10 năm và đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến sản phẩm chất lượng cao nhất cho thị trường trong và ngoài nước.',
    established: '2013',
    management: [
      {
        name: 'Phạm Văn Hùng',
        position: 'Chủ nhiệm HTX',
        experience: '12 năm kinh nghiệm dược liệu, Kỹ sư Nông nghiệp'
      },
      {
        name: 'Nguyễn Thị Lan',
        position: 'Phó chủ nhiệm',
        experience: '8 năm kinh nghiệm quản lý sản xuất'
      }
    ],
    annualProduction: '35 tấn Sâm tươi',
    certificates: ['GACP-WHO', 'VietGAP', 'Organic EU'],
    technology: [
      'Hệ thống tưới tự động',
      'Giám sát camera 24/7',
      'Phân tích đất định kỳ'
    ],
    contracts: [
      {
        partner: 'Công ty Dược Hậu Giang',
        product: 'Sâm Ngọc Linh',
        duration: '3 năm (2024-2027)'
      }
    ],
    exportMarkets: ['Nhật Bản', 'Hàn Quốc'],
    biologicalAssets: {
      description: '1.5 triệu cây Sâm 3-4 năm tuổi',
      value: '150 tỷ VNĐ'
    },
    carbonPotential: '8.000 tấn CO₂/năm',
    projects: {
      capital: [
        {
          id: 'project-kt-1',
          name: 'Dự án mở rộng vùng trồng 30ha',
          totalCapital: 6000000000,
          raised: 3500000000,
          minInvestment: 15000000,
          expectedReturn: '14-18%/năm',
          duration: '4 năm',
          investors: 120,
          description: 'Mở rộng diện tích canh tác Sâm Ngọc Linh với công nghệ hiện đại.'
        }
      ],
      production: {
        requirements: [
          'Có đất rừng tại Kon Tum, độ cao >1200m',
          'Diện tích tối thiểu 0.3ha'
        ],
        commitment: [
          'Cung cấp giống miễn phí',
          'Bao tiêu 100% sản phẩm'
        ]
      },
      land: {
        requirements: [
          'Có giấy tờ pháp lý đất rừng hợp lệ',
          'Diện tích tối thiểu 0.5ha',
          'Độ cao >1000m'
        ],
        commitment: [
          'HTX đầu tư 100% chi phí canh tác',
          'Chia sẻ lợi nhuận: 35% cho chủ đất, 65% cho HTX',
          'Hợp đồng 10 năm',
          'Thanh toán tiền thuê đất 3-7 triệu/ha/năm'
        ],
        benefits: [
          'Thu nhập ổn định từ tiền thuê đất',
          'Chia sẻ 35% lợi nhuận sản xuất',
          'Nhận thu nhập từ PFES',
          'Không phải đầu tư vốn'
        ]
      },
      consumer: {
        benefits: [
          'Giảm giá 25-40%',
          'Ưu tiên hàng mới'
        ]
      }
    }
  }
};

const CoopDetailPage = () => {
  const { coopId } = useParams<{ coopId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'intro' | 'capacity' | 'projects'>('intro');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const coop = coopId ? coopDetails[coopId] : null;

  if (!coop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-lg text-gray-500 mb-4">Không tìm thấy thông tin hợp tác xã</p>
          <button
            onClick={() => navigate('/coop-marketplace')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const getRatingBadge = (score: number) => {
    if (score === 5) return { text: 'Kim Cương', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    if (score === 4) return { text: 'Vàng', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' };
    return { text: 'Bạc', color: 'bg-gradient-to-r from-gray-400 to-gray-600' };
  };

  const ratingBadge = getRatingBadge(coop.greenlightScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative h-64 sm:h-96 w-full overflow-hidden">
        <img
          src={coop.coverImage}
          alt={coop.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Top Bar - Fixed with hide/show */}
        <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate('/coop-marketplace')}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all"
            >
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </button>
            <div className="flex-1 text-center px-4">
              <h2 className="text-sm font-semibold text-gray-800 truncate">{coop.name}</h2>
            </div>
            <div className={`${ratingBadge.color} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap`}>
              <i className="ri-shield-star-line"></i>
              <span className="hidden sm:inline">{ratingBadge.text}</span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">{coop.name}</h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/90 text-xs sm:text-base">
            <span className="flex items-center gap-1.5">
              <i className="ri-map-pin-line"></i>
              {coop.region}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-plant-line"></i>
              {coop.mainProduct}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line"></i>
              Thành lập {coop.established}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Bar - Mobile Grid 2x3 */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-[57px] z-40">
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-emerald-600">{coop.annualReturn}%</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Lợi tức</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-blue-600">{coop.area}ha</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Diện tích</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-purple-600">{coop.members > 1000 ? `${(coop.members/1000).toFixed(1)}K` : coop.members}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Xã viên</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-orange-600">{coop.rating}/5</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-teal-600">{coop.certificates.length}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Chứng chỉ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Horizontal Scroll on Mobile */}
      <div className="bg-white border-b border-gray-200 sticky top-[137px] z-40 shadow-sm">
        <div className="px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:gap-8 min-w-max sm:min-w-0">
            <button
              onClick={() => setActiveTab('intro')}
              className={`py-3 px-3 sm:px-2 font-medium border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'intro'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <i className="ri-information-line mr-1.5"></i>
              Giới thiệu
            </button>
            <button
              onClick={() => setActiveTab('capacity')}
              className={`py-3 px-3 sm:px-2 font-medium border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'capacity'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <i className="ri-bar-chart-box-line mr-1.5"></i>
              Năng lực
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-3 px-3 sm:px-2 font-medium border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'projects'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <i className="ri-rocket-line mr-1.5"></i>
              Dự án
            </button>
          </div>
        </div>
      </div>

      {/* Content - Mobile Optimized */}
      <div className="px-4 py-6 sm:px-8 sm:py-12 max-w-7xl mx-auto">
        {/* Tab: Giới thiệu */}
        {activeTab === 'intro' && (
          <div className="space-y-4 sm:space-y-8">
            {/* Video giới thiệu */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-video-line text-emerald-600"></i>
                Video giới thiệu
              </h2>
              <div className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  src={coop.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Giới thiệu */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-building-line text-emerald-600"></i>
                Về chúng tôi
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">{coop.introduction}</p>
            </div>

            {/* Ban quản trị - Mobile Stack */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-team-line text-emerald-600"></i>
                Ban quản trị
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {coop.management.map((member, index) => (
                  <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 mx-auto">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center mb-1 sm:mb-2">{member.name}</h3>
                    <p className="text-emerald-600 font-medium text-center mb-3 sm:mb-4 text-sm sm:text-base">{member.position}</p>
                    <p className="text-gray-600 text-xs sm:text-sm text-center">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bản đồ vệ tinh */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-map-2-line text-emerald-600"></i>
                Bản đồ vùng trồng
              </h2>
              <div className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969374589895!2d105.84117731533315!3d21.02880939313684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Năng lực */}
        {activeTab === 'capacity' && (
          <div className="space-y-4 sm:space-y-8">
            {/* Năng lực sản xuất */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-plant-line text-emerald-600"></i>
                Năng lực sản xuất
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Sản lượng hàng năm</h3>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-600">{coop.annualProduction}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Chứng chỉ đã đạt</h3>
                  <div className="flex flex-wrap gap-2">
                    {coop.certificates.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium text-xs sm:text-sm"
                      >
                        <i className="ri-award-line mr-1"></i>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Công nghệ đang sử dụng</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {coop.technology.map((tech, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <i className="ri-checkbox-circle-fill text-emerald-600 text-lg sm:text-xl mt-0.5 sm:mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700 text-sm sm:text-base">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Đầu ra & Đối tác */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-handshake-line text-emerald-600"></i>
                Đầu ra & Đối tác
              </h2>
              <div className="mb-6 sm:mb-8">
                <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Hợp đồng bao tiêu</h3>
                <div className="space-y-3 sm:space-y-4">
                  {coop.contracts.map((contract, index) => (
                    <div key={index} className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-l-4 border-emerald-600">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-base sm:text-xl font-bold text-gray-800 mb-2">{contract.partner}</h4>
                          <p className="text-gray-600 mb-1 text-xs sm:text-base">
                            <i className="ri-product-hunt-line mr-2"></i>
                            Sản phẩm: {contract.product}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-base">
                            <i className="ri-calendar-line mr-2"></i>
                            {contract.duration}
                          </p>
                        </div>
                        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap self-start">
                          <i className="ri-shield-check-line mr-1"></i>
                          Đã ký
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Thị trường xuất khẩu</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {coop.exportMarkets.map((market, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm sm:text-lg"
                    >
                      <i className="ri-global-line mr-1 sm:mr-2"></i>
                      {market}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tài sản sinh học */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-seedling-line text-emerald-600"></i>
                Tài sản sinh học
              </h2>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                <p className="text-xl text-gray-700 mb-4 sm:mb-4">{coop.biologicalAssets.description}</p>
                <p className="text-4xl sm:text-6xl font-bold text-emerald-600">
                  Định giá: {coop.biologicalAssets.value}
                </p>
              </div>
            </div>

            {/* Tiềm năng Carbon */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-leaf-line text-emerald-600"></i>
                Tiềm năng Carbon
              </h2>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                <p className="text-xl text-gray-700 sm:text-xl">{coop.carbonPotential}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Dự án */}
        {activeTab === 'projects' && (
          <div className="space-y-4 sm:space-y-8">
            {/* Dự án Góp vốn */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-hand-coin-line text-yellow-600"></i>
                Dành cho Xã viên Góp vốn
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {coop.projects.capital.map((project) => (
                  <div key={project.id} className="p-4 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">{project.name}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{project.description}</p>
                      </div>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold whitespace-nowrap self-start text-xs sm:text-sm">
                        Đang kêu gọi
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Tổng vốn</div>
                        <div className="text-base sm:text-xl font-bold text-gray-800">
                          {(project.totalCapital / 1000000000).toFixed(1)}tỷ
                        </div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Tối thiểu</div>
                        <div className="text-base sm:text-xl font-bold text-gray-800">
                          {(project.minInvestment / 1000000).toFixed(0)}tr
                        </div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Lợi tức</div>
                        <div className="text-base sm:text-xl font-bold text-emerald-600">{project.expectedReturn}</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Thời gian</div>
                        <div className="text-base sm:text-xl font-bold text-gray-800">{project.duration}</div>
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                        <span>Tiến độ huy động</span>
                        <span className="font-bold">
                          {((project.raised / project.totalCapital) * 100).toFixed(0)}% ({project.investors} xã viên)
                        </span>
                      </div>
                      <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: `${(project.raised / project.totalCapital) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-3 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-bold hover:shadow-lg transition-all whitespace-nowrap text-sm sm:text-base active:scale-98"
                    >
                      <i className="ri-information-line mr-2"></i>
                      Xem chi tiết dự án
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dự án Góp đất */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-landscape-line text-amber-700"></i>
                Dành cho Xã viên Góp đất
              </h2>
              
              <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-600">
                <h3 className="text-base sm:text-xl font-bold text-amber-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <i className="ri-information-line"></i>
                  Mô hình hợp tác
                </h3>
                <p className="text-amber-800 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-base">
                  HTX tìm kiếm các chủ đất/chủ rừng có diện tích phù hợp để hợp tác canh tác Sâm Ngọc Linh. 
                  <strong> HTX đầu tư 100% chi phí</strong>, chủ đất góp tài sản và <strong>chia sẻ lợi nhuận</strong> cùng 
                  hưởng thu nhập từ <strong>dịch vụ môi trường (PFES)</strong> và <strong>Carbon Credit</strong>.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-amber-900 font-bold text-xs sm:text-base">
                  <div className="flex items-center gap-2">
                    <i className="ri-money-dollar-circle-line text-xl sm:text-2xl"></i>
                    <span>Không cần vốn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-xl sm:text-2xl"></i>
                    <span>Không rủi ro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-line-chart-line text-xl sm:text-2xl"></i>
                    <span>Thu nhập ổn định</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <i className="ri-file-list-3-line text-amber-600"></i>
                    Yêu cầu đất đai
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {coop.projects.land.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                        <i className="ri-checkbox-circle-line text-amber-600 text-lg sm:text-xl mt-0.5 flex-shrink-0"></i>
                        <span className="text-gray-700 text-xs sm:text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <i className="ri-shield-check-line text-emerald-600"></i>
                    Cam kết của HTX
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {coop.projects.land.commitment.map((com, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-emerald-50 rounded-lg">
                        <i className="ri-shield-star-line text-emerald-600 text-lg sm:text-xl mt-0.5 flex-shrink-0"></i>
                        <span className="text-gray-700 text-xs sm:text-sm">{com}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <i className="ri-gift-line text-amber-600"></i>
                  Quyền lợi chủ đất
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {coop.projects.land.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <i className="ri-money-dollar-circle-line text-amber-600 text-lg sm:text-xl mt-0.5 flex-shrink-0"></i>
                      <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-600 mb-4 sm:mb-6">
                <h4 className="font-bold text-green-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <i className="ri-calculator-line text-lg sm:text-xl"></i>
                  Ví dụ tính toán thu nhập (Diện tích 5ha)
                </h4>
                <div className="space-y-1.5 sm:space-y-2 text-green-800 text-xs sm:text-base">
                  <div className="flex justify-between items-center">
                    <span>• Tiền thuê đất hàng năm:</span>
                    <strong className="text-base sm:text-lg">25-50tr/năm</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• Thu nhập từ PFES:</span>
                    <strong className="text-base sm:text-lg">10-25tr/năm</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>• Chia lợi nhuận (40% sau 5 năm):</span>
                    <strong className="text-base sm:text-lg">200-400tr</strong>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 mt-2 flex justify-between items-center">
                    <span className="font-bold">Tổng thu nhập (5 năm):</span>
                    <strong className="text-xl sm:text-2xl text-green-700">400-800tr</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  // Lưu thông tin project trước khi đóng modal
                  const projectInfo = {
                    id: selectedProject?.id,
                    name: selectedProject?.name
                  };
                  
                  setSelectedProject(null);
                  
                  navigate('/forest-owner-register', { 
                    state: { 
                      coopId: coop.id, 
                      coopName: coop.name, 
                      projectId: projectInfo.id,
                      projectName: projectInfo.name,
                      role: 'investor'
                    } 
                  });
                }}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg transition-all whitespace-nowrap active:scale-98"
              >
                <i className="ri-user-add-line mr-2"></i>
                Đăng ký xã viên & Góp vốn
              </button>
            </div>

            {/* Dự án Sản xuất */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-seedling-line text-green-600"></i>
                Dành cho Xã viên Sản xuất
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Yêu cầu</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {coop.projects.production.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <i className="ri-checkbox-circle-line text-emerald-600 text-lg sm:text-xl mt-0.5"></i>
                        <span className="text-gray-700 text-xs sm:text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Cam kết của HTX</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {coop.projects.production.commitment.map((com, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <i className="ri-shield-check-line text-emerald-600 text-lg sm:text-xl mt-0.5"></i>
                        <span className="text-gray-700 text-xs sm:text-sm">{com}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/forest-owner-register', { state: { coopId: coop.id, coopName: coop.name } })}
                className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg transition-all whitespace-nowrap active:scale-98"
              >
                <i className="ri-user-add-line mr-2"></i>
                Đăng ký xã viên & Tham gia sản xuất
              </button>
            </div>

            {/* Dự án Tiêu dùng */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <i className="ri-shopping-cart-line text-blue-600"></i>
                Dành cho Xã viên Tiêu dùng
              </h2>
              <div className="mb-4 sm:mb-6">
                <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Quyền lợi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {coop.projects.consumer.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <i className="ri-gift-line text-blue-600 text-lg sm:text-xl mt-0.5"></i>
                      <span className="text-gray-700 text-xs sm:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate('/cooperative/onboarding', { state: { coopId: coop.id, coopName: coop.name, role: 'consumer' } })}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg transition-all whitespace-nowrap active:scale-98"
              >
                <i className="ri-user-add-line mr-2"></i>
                Đăng ký xã viên Tiêu dùng
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal - Mobile Optimized */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Chi tiết dự án</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              >
                <i className="ri-close-line text-xl sm:text-2xl text-gray-600"></i>
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{selectedProject.name}</h3>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <h4 className="font-bold text-blue-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <i className="ri-information-line text-lg sm:text-xl"></i>
                  Thông báo quan trọng
                </h4>
                <p className="text-blue-800 leading-relaxed text-xs sm:text-base">
                  Bạn cần trở thành <strong>xã viên chính thức</strong> của <strong>{coop.name}</strong> để có thể góp vốn vào dự án này. 
                  Việc trở thành xã viên sẽ giúp bạn được hưởng đầy đủ quyền lợi và bảo vệ lợi ích đầu tư của mình.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Tổng vốn cần</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    {(selectedProject.totalCapital / 1000000000).toFixed(1)}tỷ
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Đã huy động</div>
                  <div className="text-lg sm:text-2xl font-bold text-emerald-600">
                    {(selectedProject.raised / 1000000000).toFixed(1)}tỷ
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Suất góp TT</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">
                    {(selectedProject.minInvestment / 1000000).toFixed(0)}tr
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Lợi tức KV</div>
                  <div className="text-lg sm:text-2xl font-bold text-emerald-600">{selectedProject.expectedReturn}</div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Thời gian</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">{selectedProject.duration}</div>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Xã viên</div>
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">{selectedProject.investors}</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Quyền lợi xã viên góp vốn</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5 sm:mt-1 text-sm sm:text-base"></i>
                    <span className="text-gray-700 text-xs sm:text-sm">Chia cổ tức hàng quý theo tỷ lệ vốn góp</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5 sm:mt-1 text-sm sm:text-base"></i>
                    <span className="text-gray-700 text-xs sm:text-sm">Mua sản phẩm với giá ưu đãi (giảm 30-50%)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5 sm:mt-1 text-sm sm:text-base"></i>
                    <span className="text-gray-700 text-xs sm:text-sm">Tham gia đào tạo và hội thảo chuyên môn</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5 sm:mt-1 text-sm sm:text-base"></i>
                    <span className="text-gray-700 text-xs sm:text-sm">Quyền biểu quyết trong đại hội xã viên</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  navigate('/forest-owner-register', { 
                    state: { 
                      coopId: coop.id, 
                      coopName: coop.name, 
                      projectId: selectedProject.id,
                      projectName: selectedProject.name,
                      role: 'investor'
                    } 
                  });
                }}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg transition-all whitespace-nowrap active:scale-98"
              >
                <i className="ri-user-add-line mr-2"></i>
                Đăng ký xã viên & Góp vốn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoopDetailPage;
