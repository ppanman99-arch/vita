import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

type TabType = 'campaigns' | 'assets' | 'affiliate' | 'farm-tours' | 'earnings' | 'co-create' | 'esg-profile' | 'production-finance' | 'profile' | 'live-support' | 'academy';

interface Campaign {
  id: string;
  title: string;
  client: string;
  type: 'brief' | 'ongoing' | 'completed';
  description: string;
  requirements: string[];
  budget: number;
  deadline: string;
  applicants: number;
  status: 'open' | 'closed' | 'selected';
}

interface Asset {
  id: string;
  name: string;
  type: 'camera' | 'diary' | 'certificate' | 'timelapse';
  source: string;
  location: string;
  accessible: boolean;
  thumbnail?: string;
}

interface AffiliateLink {
  id: string;
  product: string;
  link: string;
  clicks: number;
  conversions: number;
  commission: number;
  totalEarnings: number;
}

interface FarmTour {
  id: string;
  htxName: string;
  location: string;
  requestedDate: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  qrCode?: string;
}

export default function CreatorHubPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  const [creatorName, setCreatorName] = useState('');
  const [stageName, setStageName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: '',
    stageName: '',
    email: '',
    phone: '',
    bio: '',
    platforms: {
      tiktok: '',
      facebook: '',
      instagram: '',
      youtube: '',
      zalo: '',
    },
    followerCount: '',
    avgViews: '',
    contentCategories: [] as string[],
    sampleContentLinks: [] as string[],
    // Verification fields
    idNumber: '',
    idPhoto: null as File | null,
    profilePhoto: null as File | null,
    agreeToTerms: false,
    agreeToContentGuidelines: false,
  });

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('creator_authenticated');
    const email = sessionStorage.getItem('creator_email');
    const name = sessionStorage.getItem('creator_name');
    
    if (!isAuthenticated || !email) {
      navigate('/creator-hub/login');
      return;
    }

    if (name) setCreatorName(name);
    setStageName(email.split('@')[0] || 'Creator');
    setIsVerified(sessionStorage.getItem('creator_verified') === 'true');
    
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('creator_profile_data');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData({
        fullName: parsed.fullName || '',
        stageName: parsed.stageName || name || '',
        email: parsed.email || email || '',
        phone: parsed.phone || '',
        bio: parsed.bio || '',
        platforms: parsed.platforms || {
          tiktok: '',
          facebook: '',
          instagram: '',
          youtube: '',
          zalo: '',
        },
        followerCount: parsed.followerCount || '',
        avgViews: parsed.avgViews || '',
        contentCategories: parsed.contentCategories || [],
        sampleContentLinks: parsed.sampleContentLinks || [],
        idNumber: parsed.idNumber || '',
        idPhoto: parsed.idPhoto || null,
        profilePhoto: parsed.profilePhoto || null,
        agreeToTerms: parsed.agreeToTerms || false,
        agreeToContentGuidelines: parsed.agreeToContentGuidelines || false,
      });
      if (parsed.stageName) setStageName(parsed.stageName);
      if (parsed.fullName) setCreatorName(parsed.fullName);
    } else {
      // Initialize with sessionStorage data
      setProfileData({
        fullName: name || '',
        stageName: email.split('@')[0] || 'Creator',
        email: email || '',
        phone: '',
        bio: '',
        platforms: {
          tiktok: '',
          facebook: '',
          instagram: '',
          youtube: '',
          zalo: '',
        },
        followerCount: '',
        avgViews: '',
        contentCategories: [],
        sampleContentLinks: [],
        idNumber: '',
        idPhoto: null,
        profilePhoto: null,
        agreeToTerms: false,
        agreeToContentGuidelines: false,
      });
    }
  }, [navigate]);

  // Mock Data
  const campaigns: Campaign[] = [
    {
      id: 'camp-001',
      title: 'Cần 5 TikToker review vườn Sâm đang ra hoa',
      client: 'HTX Tu Mơ Rông',
      type: 'brief',
      description: 'HTX cần các Creator lên vườn quay video review về vườn sâm đang vào mùa ra hoa. Yêu cầu lên vườn quay trực tiếp, không sử dụng stock footage.',
      requirements: ['Có trên 50K followers', 'Chuyên về nông sản/dược liệu', 'Có thể đi Kon Tum'],
      budget: 5000000,
      deadline: '2024-11-30',
      applicants: 12,
      status: 'open',
    },
    {
      id: 'camp-002',
      title: '10 Bác sĩ viết bài phân tích hoạt chất MR2',
      client: 'VinaPharma',
      type: 'brief',
      description: 'Cần các Bác sĩ/Dược sĩ có chuyên môn viết bài phân tích về hoạt chất MR2 trong lô sâm mới thu hoạch. Bài viết sẽ được đăng trên website và social media.',
      requirements: ['Bác sĩ/Dược sĩ có giấy phép hành nghề', 'Có kinh nghiệm viết nội dung khoa học'],
      budget: 3000000,
      deadline: '2024-12-15',
      applicants: 8,
      status: 'open',
    },
    {
      id: 'camp-003',
      title: 'Chiến dịch Đại sứ Rừng Xanh - Kêu gọi góp vốn',
      client: 'GreenLight',
      type: 'brief',
      description: 'Chiến dịch kêu gọi cộng đồng tham gia góp vốn trồng cây Mega 3P. Cần các KOL Lifestyle/ESG tạo content về lợi ích môi trường và tín chỉ Carbon.',
      requirements: ['Chuyên về ESG/Sống xanh', 'Có ảnh hưởng trong cộng đồng'],
      budget: 8000000,
      deadline: '2024-12-20',
      applicants: 15,
      status: 'open',
    },
  ];

  const assets: Asset[] = [
    {
      id: 'asset-001',
      name: 'Camera HTX Tu Mơ Rông - Vườn Sâm',
      type: 'camera',
      source: 'HTX Tu Mơ Rông',
      location: 'Kon Tum',
      accessible: true,
    },
    {
      id: 'asset-002',
      name: 'Timelapse: Cây Sâm lớn lên (30 ngày)',
      type: 'timelapse',
      source: 'HTX Tu Mơ Rông',
      location: 'Kon Tum',
      accessible: true,
    },
    {
      id: 'asset-003',
      name: 'Nhật ký Canh tác - Lô Sâm 2024',
      type: 'diary',
      source: 'HTX Tu Mơ Rông',
      location: 'Kon Tum',
      accessible: true,
    },
    {
      id: 'asset-004',
      name: 'Chứng thư COA - Lô Sâm 2024',
      type: 'certificate',
      source: 'VinaPharma',
      location: 'Hà Nội',
      accessible: true,
    },
  ];

  const affiliateLinks: AffiliateLink[] = [
    {
      id: 'aff-001',
      product: 'Sâm Ngọc Linh loại 1 - HTX Tu Mơ Rông',
      link: 'https://vita.vn/product/sam-ngoc-linh-001',
      clicks: 1250,
      conversions: 45,
      commission: 5, // %
      totalEarnings: 2250000,
    },
    {
      id: 'aff-002',
      product: 'Dự án Trồng Rừng Mega 3P',
      link: 'https://vita.vn/project/mega-3p',
      clicks: 890,
      conversions: 12,
      commission: 3, // %
      totalEarnings: 1800000,
    },
  ];

  const farmTours: FarmTour[] = [
    {
      id: 'tour-001',
      htxName: 'HTX Tu Mơ Rông',
      location: 'Kon Tum',
      requestedDate: '2024-11-25',
      purpose: 'Quay video review vườn Sâm ra hoa',
      status: 'pending',
    },
  ];

  const totalEarnings = 15000000; // VNĐ
  const pendingEarnings = 5000000;

  const handleLogout = () => {
    sessionStorage.removeItem('creator_authenticated');
    sessionStorage.removeItem('creator_email');
    sessionStorage.removeItem('creator_name');
    sessionStorage.removeItem('creator_stage_name');
    sessionStorage.removeItem('creator_verified');
    navigate('/creator-hub/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Merged Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Mobile Layout */}
          <div className="flex items-center justify-between sm:hidden">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-video-add-line text-xl"></i>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base font-bold truncate flex items-center gap-1.5">
                  <span className="truncate">CREATOR HUB</span>
                  {isVerified && (
                    <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded-full flex items-center flex-shrink-0">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                  )}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <PortalSwitcher />
              <button
                onClick={() => setShowMainMenu(!showMainMenu)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
              >
                <i className={`ri-${showMainMenu ? 'close-line' : 'menu-line'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-video-add-line text-2xl"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                  <span className="truncate">VITA CREATOR HUB</span>
                  {isVerified && (
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full flex items-center gap-1 flex-shrink-0">
                      <i className="ri-check-line"></i>
                      Verified
                    </span>
                  )}
                </h1>
                <p className="text-xs lg:text-sm text-white/80 hidden md:block">Cổng Đối tác Sáng tạo Nội dung</p>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <div className="hidden lg:block">
                <PortalSwitcher />
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium truncate max-w-[150px]">{stageName || creatorName}</p>
                <p className="text-xs text-white/80">Creator</p>
              </div>
              
              {/* Main Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMainMenu(!showMainMenu)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm flex items-center gap-2 ${
                    showMainMenu
                      ? 'bg-white/30 text-white shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
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
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <i className="ri-video-add-line text-white text-lg"></i>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">VITA CREATOR HUB</p>
                          <p className="text-xs text-gray-600">Sáng tạo Nội dung</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {/* Quick Access - Current Tab */}
                      <div className="px-4 py-2 bg-purple-50 border-l-4 border-purple-500 mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Đang xem</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                          <i className="ri-eye-line"></i>
                          <span>{activeTab === 'campaigns' ? 'Chiến dịch' : activeTab === 'assets' ? 'Kho Tài nguyên' : activeTab === 'affiliate' ? 'Affiliate' : activeTab === 'farm-tours' ? 'Đặt lịch Vườn' : activeTab === 'earnings' ? 'Thu nhập' : activeTab === 'co-create' ? 'Xây dựng Thương hiệu' : activeTab === 'esg-profile' ? 'Hồ sơ ESG' : activeTab === 'production-finance' ? 'Tín dụng SX' : activeTab === 'live-support' ? 'SOS Chuyên gia' : activeTab === 'academy' ? 'Creator Academy' : 'Hồ sơ'}</span>
                        </div>
                      </div>

                      {/* All Tabs */}
                      <div className="px-4 py-2">
                        {[
                          { id: 'campaigns', label: 'Chiến dịch', icon: 'ri-briefcase-line' },
                          { id: 'assets', label: 'Kho Tài nguyên', icon: 'ri-image-line' },
                          { id: 'affiliate', label: 'Affiliate', icon: 'ri-links-line' },
                          { id: 'farm-tours', label: 'Đặt lịch Vườn', icon: 'ri-map-pin-line' },
                          { id: 'earnings', label: 'Thu nhập', icon: 'ri-money-dollar-circle-line' },
                          { id: 'co-create', label: 'Xây dựng Thương hiệu', icon: 'ri-lightbulb-flash-line', badge: 'Mới', badgeColor: 'bg-orange-500' },
                          { id: 'esg-profile', label: 'Hồ sơ ESG', icon: 'ri-leaf-line', badge: 'Mới', badgeColor: 'bg-green-500' },
                          { id: 'production-finance', label: 'Tín dụng SX', icon: 'ri-bank-line', badge: 'Mới', badgeColor: 'bg-blue-500' },
                          { id: 'live-support', label: 'SOS Chuyên gia', icon: 'ri-customer-service-line', badge: 'Mới', badgeColor: 'bg-red-500' },
                          { id: 'academy', label: 'Creator Academy', icon: 'ri-graduation-cap-line', badge: 'Mới', badgeColor: 'bg-blue-500' },
                          { id: 'profile', label: 'Hồ sơ', icon: 'ri-user-line' },
                        ].map((tab) => (
            <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as TabType);
                              setShowMainMenu(false);
                            }}
                            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left text-sm flex items-center gap-2 mb-1 ${
                              activeTab === tab.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <i className={tab.icon}></i>
                            <span className="flex-1">{tab.label}</span>
                            {tab.badge && (
                              <span className={`px-1.5 py-0.5 ${tab.badgeColor} text-white text-[10px] rounded-full`}>
                                {tab.badge}
                              </span>
                            )}
            </button>
                        ))}
                      </div>
                      
                      {/* Logout Button */}
                      <div className="px-4 py-2 border-t border-gray-100 mt-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowMainMenu(false);
                          }}
                          className="w-full px-3 py-2 rounded-lg font-medium transition-all text-left text-sm flex items-center gap-2 text-red-600 hover:bg-red-50"
                        >
                          <i className="ri-logout-box-line"></i>
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Chợ Chiến dịch</h2>
              <p className="text-gray-600 mt-1">Tìm kiếm và ứng tuyển các chiến dịch từ HTX/Doanh nghiệp</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Tổng chiến dịch</p>
                <p className="text-2xl font-bold text-purple-600">{campaigns.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Đã ứng tuyển</p>
                <p className="text-2xl font-bold text-pink-600">0</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Đã được chọn</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{campaign.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === 'open' ? 'bg-green-100 text-green-700' :
                          campaign.status === 'closed' ? 'bg-gray-100 text-gray-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {campaign.status === 'open' ? 'Đang mở' : campaign.status === 'closed' ? 'Đã đóng' : 'Đã chọn'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        <i className="ri-building-line mr-2"></i>
                        {campaign.client}
                      </p>
                      <p className="text-gray-700 mb-4">{campaign.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Yêu cầu:</p>
                      <ul className="space-y-1">
                        {campaign.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-purple-600 mt-0.5"></i>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Thù lao:</span>
                          <span className="text-lg font-bold text-purple-600">
                            {campaign.budget.toLocaleString('vi-VN')} VNĐ
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Hạn nộp:</span>
                          <span className="text-sm font-medium text-gray-900">{campaign.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Số người ứng tuyển:</span>
                          <span className="text-sm font-medium text-gray-900">{campaign.applicants}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                    <i className="ri-file-add-line mr-2"></i>
                    Ứng tuyển chiến dịch này
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digital Asset Library Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kho Tài nguyên Số & Dữ liệu Thực</h2>
              <p className="text-gray-600 mt-1">Trạm tiếp nhiên liệu - Bằng chứng xác thực để xây dựng niềm tin</p>
            </div>

            {/* Live Cam & Satellite */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-eye-line text-purple-600"></i>
                "Mắt Thần" - Live Cam & Satellite (View-only)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-camera-line text-2xl text-purple-600"></i>
                    <div>
                      <div className="font-bold text-gray-900">Camera HTX Tu Mơ Rông</div>
                      <div className="text-sm text-gray-600">Vườn Sâm - Kon Tum</div>
                  </div>
                    </div>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                      <i className="ri-play-circle-line text-4xl text-gray-400"></i>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                    <i className="ri-eye-line mr-2"></i>
                    Xem trực tiếp
                  </button>
                </div>
                <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-satellite-line text-2xl text-blue-600"></i>
                    <div>
                      <div className="font-bold text-gray-900">Dữ liệu Vệ tinh</div>
                      <div className="text-sm text-gray-600">Theo dõi vùng trồng</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                      <i className="ri-map-2-line text-4xl text-gray-400"></i>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                          <i className="ri-download-line mr-2"></i>
                    Tải bản đồ
                  </button>
                </div>
              </div>
            </div>

            {/* Time-lapse Videos */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-time-line text-pink-600"></i>
                Time-lapse - Quá trình sinh trưởng thực tế
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Sâm lớn lên trong 1 năm (30 giây)', source: 'HTX Tu Mơ Rông', duration: '30s' },
                  { name: 'Thu hoạch Cà Gai Leo (15 giây)', source: 'HTX Lạng Sơn', duration: '15s' },
                ].map((video, idx) => (
                  <div key={idx} className="border-2 border-pink-200 rounded-xl p-4 bg-pink-50">
                    <div className="font-bold text-gray-900 mb-1">{video.name}</div>
                    <div className="text-sm text-gray-600 mb-3">{video.source} • {video.duration}</div>
                    <button className="w-full bg-pink-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors cursor-pointer">
                      <i className="ri-download-line mr-2"></i>
                      Tải về
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof of Quality */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-verified-badge-line text-green-600"></i>
                Thư viện Bằng chứng (Proof of Quality)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Chứng chỉ Organic', type: 'certificate', verified: true },
                  { name: 'Chứng chỉ GACP', type: 'certificate', verified: true },
                  { name: 'Phiếu kiểm nghiệm COA', type: 'coa', verified: true },
                ].map((item, idx) => (
                  <div key={idx} className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-file-paper-line text-2xl text-green-600"></i>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                        {item.verified && (
                          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <i className="ri-checkbox-circle-fill"></i>
                            <span>Đã xác thực bởi R&D</span>
                          </div>
                      )}
                      </div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                      <i className="ri-download-line mr-2"></i>
                      Tải Scan chất lượng cao
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Data Widgets */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-bar-chart-box-line text-blue-600"></i>
                Widget Dữ liệu (Live Data Widgets) - Nhúng vào Livestream
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Độ ẩm đất hiện tại', value: '75%', source: 'HTX Tu Mơ Rông' },
                  { label: 'Hàm lượng Saponin trung bình', value: '12%', source: 'Kiểm định bởi Viện Dược Liệu' },
                ].map((widget, idx) => (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                    <div className="text-sm text-gray-600 mb-1">{widget.label}</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{widget.value}</div>
                    <div className="text-xs text-gray-500 mb-3">{widget.source}</div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-code-s-slash-line mr-2"></i>
                      Lấy mã nhúng
                    </button>
                </div>
              ))}
              </div>
            </div>

            {/* Content Verification */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-verified-badge-fill text-purple-600"></i>
                Xác thực Nội dung (Content Verification)
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                <p className="text-sm text-gray-700 mb-4">Gửi kịch bản hoặc video nháp lên hệ thống. Đội ngũ R&D hoặc Thầy thuốc sẽ duyệt và đóng dấu "Thông tin chuẩn khoa học".</p>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                    <i className="ri-upload-cloud-line mr-2"></i>
                    Gửi kịch bản để duyệt
                  </button>
                  <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer">
                    <i className="ri-video-upload-line mr-2"></i>
                    Gửi video nháp để duyệt
                  </button>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                    <i className="ri-checkbox-circle-fill"></i>
                    <span className="font-semibold">Video đã được xác thực: "Sâm Ngọc Linh hỗ trợ tăng sức đề kháng"</span>
                  </div>
                  <div className="text-xs text-gray-600">Đã duyệt bởi: PGS. TS. Nguyễn Văn Khoa • Ngày: 15/11/2024</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate & Sales Tab */}
        {activeTab === 'affiliate' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Affiliate & Bán hàng</h2>
              <p className="text-gray-600 mt-1">Tạo link chia sẻ và theo dõi doanh số</p>
            </div>

            {/* Create New Link */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tạo Link Affiliate Mới</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chọn sản phẩm/Dự án</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Sâm Ngọc Linh loại 1 - HTX Tu Mơ Rông</option>
                    <option>Dự án Trồng Rừng Mega 3P</option>
                    <option>Tam Thất Hà Giang</option>
                  </select>
                </div>
                <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                  <i className="ri-link mr-2"></i>
                  Tạo Link
                </button>
              </div>
            </div>

            {/* Affiliate Links List */}
            <div className="space-y-4">
              {affiliateLinks.map((link) => (
                <div key={link.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{link.product}</h3>
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={link.link}
                            readOnly
                            className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                          />
                          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
                            <i className="ri-file-copy-line mr-1"></i>
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Clicks</p>
                      <p className="text-xl font-bold text-gray-900">{link.clicks.toLocaleString('vi-VN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Chuyển đổi</p>
                      <p className="text-xl font-bold text-green-600">{link.conversions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Hoa hồng</p>
                      <p className="text-xl font-bold text-purple-600">{link.commission}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tổng thu nhập</p>
                      <p className="text-xl font-bold text-pink-600">
                        {link.totalEarnings.toLocaleString('vi-VN')} VNĐ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Affiliate */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tiếp thị Liên kết Thông minh (Smart Affiliate)</h3>
              <div className="space-y-4">
                <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-900">Link định danh đa tầng</div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Hoạt động</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Theo dõi đơn hàng và hoa hồng tự động qua nhiều kênh</p>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-600 mb-1">Link của bạn</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value="https://vita.vn/ref/creator123"
                        readOnly
                        className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                      />
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
                        <i className="ri-file-copy-line mr-1"></i>
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-900">Flash Voucher</div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">FOMO</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Xin hệ thống tung mã giảm giá độc quyền theo thời gian thực để chốt đơn</p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer">
                    <i className="ri-flashlight-line mr-2"></i>
                    Tạo Flash Voucher ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Livestream Tool */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Công cụ Livestream</h3>
              <p className="text-white/90 mb-4">
                Khi bạn livestream, hệ thống VITA sẽ đẩy thông báo real-time về tồn kho và khuyến mãi lên màn hình của bạn.
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                <i className="ri-live-line mr-2"></i>
                Bắt đầu Livestream
              </button>
            </div>
          </div>
        )}

        {/* Live Support - SOS Chuyên gia Tab */}
        {activeTab === 'live-support' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hỗ trợ Bán hàng Thời gian Thực</h2>
              <p className="text-gray-600 mt-1">SOS Chuyên gia - Trả lời câu hỏi khó trong Livestream</p>
            </div>

            {/* SOS Expert On-call */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <div className="flex items-center gap-3 mb-4">
                <i className="ri-customer-service-2-line text-4xl"></i>
                <div>
                  <h3 className="text-2xl font-bold">SOS Chuyên gia (Expert On-call)</h3>
                  <p className="text-white/90">Kết nối ngay với AI Chatbot hoặc Thầy thuốc trực tuyến</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <p className="text-sm mb-3">Trong phiên Livestream, nếu gặp câu hỏi khó, gõ câu hỏi vào App. Hệ thống kết nối ngay lập tức để đưa ra câu trả lời chính xác trong vài giây.</p>
                <div className="bg-white rounded-lg p-4 text-gray-900">
                  <div className="text-sm font-semibold mb-2">Ví dụ câu hỏi:</div>
                  <div className="text-sm space-y-1">
                    <div>• "Người bị tiểu đường tuýp 2 có dùng được không?"</div>
                    <div>• "Sản phẩm này có tương tác với thuốc huyết áp không?"</div>
                    <div>• "Hàm lượng hoạt chất là bao nhiêu?"</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all cursor-pointer">
                  <i className="ri-robot-line mr-2"></i>
                  Hỏi AI Chatbot
                </button>
                <button className="flex-1 bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-all cursor-pointer">
                  <i className="ri-user-star-line mr-2"></i>
                  Kết nối Thầy thuốc
                </button>
              </div>
            </div>

            {/* Recent Questions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Câu hỏi gần đây</h3>
              <div className="space-y-3">
                {[
                  {
                    question: 'Người bị tiểu đường tuýp 2 có dùng được Sâm Ngọc Linh không?',
                    answer: 'Theo bác sĩ chuyên khoa của VITA vừa xác nhận, sản phẩm này dùng được cho người tiểu đường tuýp 2, nhưng nên tham khảo ý kiến bác sĩ điều trị trước khi sử dụng.',
                    source: 'AI Chatbot (R&D)',
                    time: '2 phút trước'
                  },
                  {
                    question: 'Hàm lượng Saponin trong sản phẩm này là bao nhiêu?',
                    answer: 'Hàm lượng Saponin trung bình: 12% (Kiểm định bởi Viện Dược Liệu). Phiếu kiểm nghiệm COA đã được xác thực.',
                    source: 'AI Chatbot (R&D)',
                    time: '15 phút trước'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <i className="ri-question-line text-blue-600 text-xl"></i>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{item.question}</div>
                        <div className="text-sm text-gray-600 mb-2">{item.time}</div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-checkbox-circle-fill text-green-600"></i>
                        <span className="text-xs font-semibold text-green-700">{item.source}</span>
                      </div>
                      <p className="text-sm text-gray-800">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Farm Tour Booking Tab */}
        {activeTab === 'farm-tours' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Đặt lịch Thăm Vườn</h2>
              <p className="text-gray-600 mt-1">Yêu cầu quyền truy cập vào vườn trồng để quay video</p>
            </div>

            {/* New Booking Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đặt lịch mới</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chọn HTX</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>HTX Tu Mơ Rông - Kon Tum</option>
                    <option>HTX Dược Liệu Hà Giang</option>
                    <option>HTX Sìn Hồ - Lai Châu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày dự kiến</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mục đích</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả mục đích thăm vườn (quay video, livestream, chụp ảnh...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                  <i className="ri-calendar-check-line mr-2"></i>
                  Gửi yêu cầu
                </button>
              </div>
            </div>

            {/* Booking List */}
            <div className="space-y-4">
              {farmTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tour.htxName}</h3>
                      <div className="space-y-1 mb-3">
                        <p className="text-sm text-gray-600">
                          <i className="ri-map-pin-line mr-2"></i>
                          {tour.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <i className="ri-calendar-line mr-2"></i>
                          {tour.requestedDate}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">{tour.purpose}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tour.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      tour.status === 'approved' ? 'bg-green-100 text-green-700' :
                      tour.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {tour.status === 'pending' ? 'Chờ duyệt' :
                       tour.status === 'approved' ? 'Đã duyệt' :
                       tour.status === 'rejected' ? 'Từ chối' :
                       'Hoàn thành'}
                    </span>
                  </div>
                  {tour.status === 'approved' && tour.qrCode && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Mã QR vào cổng:</p>
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="ri-qr-code-line text-4xl text-gray-400"></i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Thu nhập</h2>
              <p className="text-gray-600 mt-1">Theo dõi thu nhập từ Affiliate và Chiến dịch</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                <p className="text-sm text-white/80 mb-2">Tổng thu nhập</p>
                <p className="text-3xl font-bold">{totalEarnings.toLocaleString('vi-VN')} VNĐ</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <p className="text-sm text-gray-600 mb-2">Đang chờ</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingEarnings.toLocaleString('vi-VN')} VNĐ</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <p className="text-sm text-gray-600 mb-2">Đã rút</p>
                <p className="text-3xl font-bold text-green-600">
                  {(totalEarnings - pendingEarnings).toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
              <div className="space-y-3">
                {[
                  { date: '15/11/2024', description: 'Hoa hồng Affiliate - Sâm Ngọc Linh', amount: 2250000, status: 'completed' },
                  { date: '10/11/2024', description: 'Hoa hồng Affiliate - Dự án Mega 3P', amount: 1800000, status: 'completed' },
                  { date: '05/11/2024', description: 'Thù lao Chiến dịch Review vườn', amount: 5000000, status: 'pending' },
                ].map((transaction, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        +{transaction.amount.toLocaleString('vi-VN')} VNĐ
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.status === 'completed' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Co-Create & Brand Building Tab */}
        {activeTab === 'co-create' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">VITA CO-CREATE & OEM</h2>
              <p className="text-gray-600 mt-1">Đặt hàng OEM & Đồng sáng tạo - Công xưởng ảo cho Creator</p>
            </div>

            {/* White Label Supermarket - Luồng 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-store-3-line text-blue-600"></i>
                Luồng 1: Siêu thị Nhãn trắng (White Label Supermarket)
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Dành cho người mới</span>
              </h3>
              <p className="text-gray-600 mb-4">Sản phẩm có sẵn từ các Nhà máy, chỉ cần upload Logo và Tên thương hiệu</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { name: 'Trà túi lọc Giảo cổ lam', factory: 'VinaPharma', moq: 100, price: '8.000 VNĐ/gói', delivery: '5-7 ngày' },
                  { name: 'Cao sâm', factory: 'Nam Dược', moq: 200, price: '250.000 VNĐ/chai', delivery: '5-7 ngày' },
                ].map((product, idx) => (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                    <div className="font-bold text-gray-900 mb-2">{product.name}</div>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div>Nhà máy: {product.factory}</div>
                      <div>MOQ: {product.moq} sản phẩm</div>
                      <div>Giá: {product.price}</div>
                      <div>Giao hàng: {product.delivery}</div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-upload-cloud-line mr-2"></i>
                      Upload Logo & Đặt hàng
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                <div className="text-sm font-semibold text-gray-900 mb-2">Bản xem trước 3D (Mockup)</div>
                <p className="text-sm text-gray-600">Hệ thống hiển thị bản xem trước trên bao bì ngay lập tức sau khi upload Logo</p>
              </div>
            </div>

            {/* Custom R&D - Luồng 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-flask-line text-purple-600"></i>
                Luồng 2: Thiết kế Độc bản (Custom R&D)
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Dành cho KOL lớn</span>
              </h3>
              
              {/* AI Formulator */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 mb-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-robot-line text-purple-600"></i>
                  AI Formulator (Trợ lý Công thức)
                </h4>
                <p className="text-sm text-gray-700 mb-4">Chọn các thành phần mong muốn. AI sẽ cảnh báo tương tác thuốc và gợi ý tỷ lệ vàng.</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Thành phần 1</div>
                    <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                      <option>Chọn...</option>
                      <option>Sâm Ngọc Linh</option>
                      <option>Ba Kích</option>
                      <option>Tam Thất</option>
                    </select>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Thành phần 2</div>
                    <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                      <option>Chọn...</option>
                      <option>Collagen</option>
                      <option>Mật ong</option>
                      <option>Tinh dầu Quế</option>
                    </select>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 mb-3">
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <i className="ri-alert-line"></i>
                    <span>AI cảnh báo: Sâm + Collagen không có tương tác. Tỷ lệ đề xuất: 70% Sâm + 30% Collagen</span>
                  </div>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                  <i className="ri-magic-line mr-2"></i>
                  Tạo công thức với AI
                </button>
              </div>

              {/* Matching Chuyên gia */}
              <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-user-star-line text-indigo-600"></i>
                  Matching Chuyên gia
                </h4>
                <p className="text-sm text-gray-700 mb-4">Hệ thống kết nối Creator với Thầy thuốc hoặc Chuyên gia R&D để hoàn thiện công thức độc quyền và xin cấp phép mới.</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                  <i className="ri-search-line mr-2"></i>
                  Tìm chuyên gia phù hợp
                </button>
              </div>
            </div>

            {/* Creator Finance */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-bank-line text-green-600"></i>
                Tài chính Sản xuất (Creator Finance)
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Hạn mức tín dụng</div>
                    <div className="text-2xl font-bold text-green-600">1 tỷ VNĐ</div>
                    <div className="text-xs text-gray-500 mt-1">Dựa trên GMV và điểm uy tín</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Đã sử dụng</div>
                    <div className="text-2xl font-bold text-blue-600">500 triệu VNĐ</div>
                    <div className="text-xs text-gray-500 mt-1">50% hạn mức</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Còn lại</div>
                    <div className="text-2xl font-bold text-purple-600">500 triệu VNĐ</div>
                    <div className="text-xs text-gray-500 mt-1">Có thể vay thêm</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Mô hình "Bán trước - Trả sau"</div>
                  <p className="text-sm text-gray-700">Creator có thể dùng hạn mức này để thanh toán tiền cọc sản xuất mà không cần vốn tự có. Doanh thu bán hàng sẽ được trừ dần vào khoản nợ.</p>
                </div>
              </div>
            </div>

            {/* Mix & Match Product Builder */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-magic-line text-purple-600"></i>
                Mix & Match - Thiết kế Sản phẩm
              </h3>
              <p className="text-gray-600 mb-6">Kéo thả các thành phần để tạo sản phẩm của riêng bạn</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Nguyên liệu chính */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-seedling-line text-emerald-600"></i>
                    Nguyên liệu chính
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Sâm Ngọc Linh', source: 'HTX Tu Mơ Rông', price: '2.500.000 VNĐ/kg', available: true },
                      { name: 'Ba Kích Tím', source: 'HTX Hà Giang', price: '800.000 VNĐ/kg', available: true },
                      { name: 'Tam Thất', source: 'HTX Lào Cai', price: '1.200.000 VNĐ/kg', available: true },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 border border-emerald-200 hover:border-emerald-400 cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.source}</p>
                          </div>
                          {item.available && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Có sẵn</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-emerald-600">{item.price}</p>
                        <button className="w-full mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium">
                          <i className="ri-add-line mr-2"></i>
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nguyên liệu phụ */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-flask-line text-amber-600"></i>
                    Nguyên liệu phụ
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Mật ong Bạc hà', source: 'HTX Hà Giang', price: '300.000 VNĐ/lít', available: true },
                      { name: 'Tinh dầu Quế', source: 'HTX Yên Bái', price: '500.000 VNĐ/lít', available: true },
                      { name: 'Nước cất thảo dược', source: 'VinaPharma', price: '150.000 VNĐ/lít', available: true },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 border border-amber-200 hover:border-amber-400 cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.source}</p>
                          </div>
                          {item.available && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Có sẵn</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-amber-600">{item.price}</p>
                        <button className="w-full mt-3 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all text-sm font-medium">
                          <i className="ri-add-line mr-2"></i>
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loại sản phẩm */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-box-3-line text-purple-600"></i>
                    Loại sản phẩm
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Nước uống đóng lon', factory: 'VinaPharma (GMP)', cost: '15.000 VNĐ/chai', minOrder: 1000 },
                      { name: 'Trà túi lọc', factory: 'Nam Dược (GMP)', cost: '8.000 VNĐ/gói', minOrder: 5000 },
                      { name: 'Mỹ phẩm serum', factory: 'Traphaco (GMP)', cost: '250.000 VNĐ/chai', minOrder: 500 },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 border border-purple-200 hover:border-purple-400 cursor-pointer transition-all"
                      >
                        <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                        <p className="text-xs text-gray-600 mb-2">{item.factory}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-purple-600 font-medium">{item.cost}</p>
                          <p className="text-gray-600">Đơn tối thiểu: {item.minOrder.toLocaleString('vi-VN')} sản phẩm</p>
                        </div>
                        <button className="w-full mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium">
                          <i className="ri-check-line mr-2"></i>
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Preview & Order */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Sản phẩm của bạn</h4>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Nước Sâm Mật Ong - Thương hiệu "KOL Beauty"</h5>
                      <p className="text-sm text-gray-600 mt-1">Sâm Ngọc Linh + Mật ong Bạc hà | Nước uống đóng lon</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Dự thảo</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Số lượng đề xuất</p>
                      <p className="text-xl font-bold text-gray-900">10.000 chai</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Chi phí ước tính</p>
                      <p className="text-xl font-bold text-purple-600">500.000.000 VNĐ</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Nhà máy sản xuất</p>
                      <p className="text-sm font-medium text-gray-900">VinaPharma (Đạt chuẩn GMP)</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                      <i className="ri-file-add-line mr-2"></i>
                      Tạo Lệnh Sản Xuất 3 Bên
                    </button>
                    <button className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                      <i className="ri-save-line mr-2"></i>
                      Lưu dự thảo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* My Products/Brands */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thương hiệu của tôi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'KOL Beauty - Nước Sâm Mật Ong',
                    status: 'production',
                    orders: 10000,
                    revenue: 2500000000,
                    impact: '50 hộ dân tộc thiểu số'
                  },
                ].map((brand, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{brand.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Đang sản xuất
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <i className="ri-box-line mr-2"></i>
                        Đơn hàng: {brand.orders.toLocaleString('vi-VN')} sản phẩm
                      </p>
                      <p className="text-gray-600">
                        <i className="ri-money-dollar-circle-line mr-2"></i>
                        Doanh thu: {brand.revenue.toLocaleString('vi-VN')} VNĐ
                      </p>
                      <p className="text-emerald-600 font-medium">
                        <i className="ri-heart-line mr-2"></i>
                        Tác động: {brand.impact}
                      </p>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium">
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ESG Profile Tab */}
        {activeTab === 'esg-profile' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hồ sơ ESG Cá nhân</h2>
              <p className="text-gray-600 mt-1">Bảng thành tích Tác động Xã hội - Công khai</p>
            </div>

            {/* Impact Scorecard */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-bar-chart-box-line text-emerald-600"></i>
                Bảng Thành tích Tác động (Impact Scorecard)
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <i className="ri-community-line text-3xl text-emerald-600"></i>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Tháng này bạn đã giúp tiêu thụ 2 tấn dược liệu</div>
                      <div className="text-sm text-emerald-700">→ Tạo thu nhập cho 15 hộ dân tộc Xơ Đăng</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <i className="ri-tree-line text-3xl text-green-600"></i>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Nguồn hàng bạn chọn giúp bảo vệ 5ha rừng đầu nguồn</div>
                      <div className="text-sm text-green-700">→ Tại Kon Tum</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <i className="ri-recycle-line text-3xl text-blue-600"></i>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Bạn đã cắt giảm 500kg rác thải nhựa</div>
                      <div className="text-sm text-blue-700">→ Nhờ chọn bao bì giấy Kraft</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Badges */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-award-line text-purple-600"></i>
                Huy hiệu & Chứng nhận (Digital Badges)
              </h3>
              <p className="text-sm text-gray-600 mb-4">Treo các huy hiệu này trên Bio mạng xã hội (TikTok/Facebook) để tăng uy tín</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Đại sứ Rừng Xanh', icon: 'ri-tree-line', color: 'from-green-500 to-emerald-600', earned: true },
                  { name: 'Người Bảo trợ Sinh kế', icon: 'ri-community-line', color: 'from-blue-500 to-cyan-600', earned: true },
                  { name: 'Champion ESG', icon: 'ri-leaf-line', color: 'from-emerald-500 to-teal-600', earned: true },
                  { name: 'Creator Xanh', icon: 'ri-recycle-line', color: 'from-teal-500 to-cyan-600', earned: false },
                ].map((badge, idx) => (
                  <div key={idx} className={`border-2 rounded-xl p-4 ${
                    badge.earned ? 'border-purple-300 bg-gradient-to-br ' + badge.color + ' text-white' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex flex-col items-center text-center">
                      <i className={`${badge.icon} text-4xl mb-2 ${badge.earned ? 'text-white' : 'text-gray-400'}`}></i>
                      <div className={`font-bold text-sm ${badge.earned ? 'text-white' : 'text-gray-600'}`}>{badge.name}</div>
                      {badge.earned ? (
                        <button className="mt-3 px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/30 transition-colors cursor-pointer">
                          <i className="ri-download-line mr-1"></i>
                          Tải về
                        </button>
                      ) : (
                        <div className="mt-3 text-xs text-gray-500">Chưa đạt</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ESG Report */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-paper-line text-indigo-600"></i>
                Báo cáo ESG Cá nhân
              </h3>
              <p className="text-sm text-gray-600 mb-4">Xuất báo cáo định kỳ (PDF đẹp mắt) để gửi cho các Nhãn hàng Quốc tế khi muốn nhận hợp đồng đại diện</p>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                <i className="ri-file-download-line mr-2"></i>
                Tải báo cáo ESG (PDF)
              </button>
            </div>

            {/* ESG Scorecard */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Chứng nhận "Doanh nhân ESG"</h3>
                  <p className="text-white/90">Được cấp bởi GreenLight VITA</p>
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="ri-award-line text-5xl"></i>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-all text-sm">
                  <i className="ri-download-line mr-2"></i>
                  Tải chứng nhận
                </button>
                <button className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all text-sm">
                  <i className="ri-share-line mr-2"></i>
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Livelihood Impact */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="ri-community-line text-2xl text-blue-600"></i>
                  </div>
                  <h4 className="font-bold text-gray-900">Chỉ số Sinh kế</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nông sản bao tiêu (2026)</p>
                    <p className="text-2xl font-bold text-blue-600">5 tấn</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Thu nhập tạo ra</p>
                    <p className="text-xl font-bold text-gray-900">2 tỷ VNĐ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Số hộ được hỗ trợ</p>
                    <p className="text-xl font-bold text-emerald-600">50 hộ</p>
                    <p className="text-xs text-gray-500 mt-1">Dân tộc thiểu số</p>
                  </div>
                </div>
              </div>

              {/* Green Index */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <i className="ri-leaf-line text-2xl text-emerald-600"></i>
                  </div>
                  <h4 className="font-bold text-gray-900">Chỉ số Xanh</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nguyên liệu VITA Lâm sinh</p>
                    <p className="text-2xl font-bold text-emerald-600">100%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Rừng được bảo vệ</p>
                    <p className="text-xl font-bold text-gray-900">10 ha</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tín chỉ Carbon</p>
                    <p className="text-xl font-bold text-teal-600">50 tấn CO2</p>
                  </div>
                </div>
              </div>

              {/* Social Impact */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <i className="ri-heart-line text-2xl text-purple-600"></i>
                  </div>
                  <h4 className="font-bold text-gray-900">Tác động Xã hội</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dự án từ thiện</p>
                    <p className="text-2xl font-bold text-purple-600">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Giáo dục & Đào tạo</p>
                    <p className="text-xl font-bold text-gray-900">200 người</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Đánh giá cộng đồng</p>
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-500"></i>
                      <i className="ri-star-fill text-yellow-500"></i>
                      <i className="ri-star-fill text-yellow-500"></i>
                      <i className="ri-star-fill text-yellow-500"></i>
                      <i className="ri-star-fill text-yellow-500"></i>
                      <span className="ml-2 text-sm font-medium text-gray-900">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lịch sử Tác động</h3>
              <div className="space-y-4">
                {[
                  {
                    date: 'Tháng 11/2024',
                    event: 'Khởi động dự án "KOL Beauty"',
                    impact: 'Bao tiêu 5 tấn Sâm Ngọc Linh từ HTX Tu Mơ Rông',
                    beneficiaries: '50 hộ dân tộc thiểu số'
                  },
                  {
                    date: 'Tháng 10/2024',
                    event: 'Chiến dịch "Rừng Xanh"',
                    impact: 'Góp vốn trồng 10ha rừng Mega 3P',
                    beneficiaries: '200 hộ nông dân'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-calendar-check-line text-emerald-600 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-900">{item.event}</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{item.impact}</p>
                      <p className="text-sm text-emerald-600 font-medium">
                        <i className="ri-user-line mr-1"></i>
                        {item.beneficiaries}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Production Finance Tab */}
        {activeTab === 'production-finance' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tín dụng Sản xuất</h2>
              <p className="text-gray-600 mt-1">Hỗ trợ vốn để sản xuất sản phẩm thương hiệu riêng</p>
            </div>

            {/* Credit Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                <p className="text-sm text-white/80 mb-2">Hạn mức tín dụng</p>
                <p className="text-3xl font-bold">1.000.000.000 VNĐ</p>
                <p className="text-xs text-white/80 mt-2">Dựa trên GMV TikTok/Shopee</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Đã sử dụng</p>
                <p className="text-3xl font-bold text-blue-600">500.000.000 VNĐ</p>
                <p className="text-xs text-gray-500 mt-2">50% hạn mức</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Còn lại</p>
                <p className="text-3xl font-bold text-green-600">500.000.000 VNĐ</p>
                <p className="text-xs text-gray-500 mt-2">Có thể vay thêm</p>
              </div>
            </div>

            {/* Tri-Party Order Workflow */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-list-3-line text-purple-600"></i>
                Lệnh Sản Xuất 3 Bên (Tri-Party Order)
              </h3>
              <p className="text-gray-600 mb-6">Smart Contract tự động kết nối KOL - HTX - Nhà máy</p>

              {/* Workflow Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Lệnh Mua Nguyên liệu',
                    description: 'Nhà máy VinaPharma nhận lệnh mua 500kg Sâm từ HTX Tu Mơ Rông + 200 lít Mật ong từ HTX Hà Giang',
                    status: 'completed',
                    amount: '250.000.000 VNĐ'
                  },
                  {
                    step: 2,
                    title: 'Lệnh Gia công',
                    description: 'Nhà máy sản xuất 10.000 chai nước Sâm Mật Ong',
                    status: 'in-progress',
                    amount: '150.000.000 VNĐ'
                  },
                  {
                    step: 3,
                    title: 'Lệnh Đầu ra',
                    description: '10.000 chai được chuyển về kho VITA Logistics để giao cho đơn Shopee/TikTok',
                    status: 'pending',
                    amount: '100.000.000 VNĐ'
                  },
                ].map((order, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        order.status === 'completed' ? 'bg-green-100 text-green-600' :
                        order.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {order.status === 'completed' ? (
                          <i className="ri-check-line text-2xl"></i>
                        ) : order.status === 'in-progress' ? (
                          <i className="ri-loader-4-line text-2xl animate-spin"></i>
                        ) : (
                          <span className="text-xl font-bold">{order.step}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{order.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status === 'completed' ? 'Hoàn thành' :
                             order.status === 'in-progress' ? 'Đang xử lý' :
                             'Chờ xử lý'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{order.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            <i className="ri-money-dollar-circle-line mr-2"></i>
                            {order.amount}
                          </p>
                          {order.status === 'in-progress' && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                              Theo dõi
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Orders */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Đơn hàng đang xử lý</h3>
              <div className="space-y-4">
                {[
                  {
                    product: 'Nước Sâm Mật Ong - KOL Beauty',
                    orderId: 'ORD-2024-001',
                    quantity: 10000,
                    totalCost: 500000000,
                    status: 'production',
                    progress: 60
                  },
                ].map((order, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{order.product}</h4>
                        <p className="text-sm text-gray-600">Mã đơn: {order.orderId}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Đang sản xuất
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Số lượng</p>
                        <p className="font-bold text-gray-900">{order.quantity.toLocaleString('vi-VN')} chai</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tổng chi phí</p>
                        <p className="font-bold text-purple-600">{order.totalCost.toLocaleString('vi-VN')} VNĐ</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tiến độ</p>
                        <p className="font-bold text-blue-600">{order.progress}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Dự kiến hoàn thành</p>
                        <p className="font-bold text-gray-900">15/12/2024</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium">
                      Xem chi tiết đơn hàng
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Creator Academy Tab */}
        {activeTab === 'academy' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Creator Academy</h2>
              <p className="text-gray-600 mt-1">Cộng đồng & Đào tạo - Học cách bán hàng chuyên nghiệp</p>
            </div>

            {/* Courses */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-graduation-cap-line text-purple-600"></i>
                Khóa học Thực chiến
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Kỹ năng Livestream tại vườn (Farm Livestreaming)',
                    instructor: 'Chuyên gia Marketing',
                    duration: '2 giờ',
                    students: 245,
                    rating: 4.8
                  },
                  {
                    title: 'Kiến thức Dược liệu 101',
                    instructor: 'Bác sĩ từ Portal Thầy thuốc',
                    duration: '3 giờ',
                    students: 189,
                    rating: 4.9
                  },
                  {
                    title: 'Cách đọc và giải thích phiếu kiểm nghiệm COA cho khách hàng',
                    instructor: 'Chuyên gia R&D',
                    duration: '1.5 giờ',
                    students: 312,
                    rating: 4.7
                  },
                ].map((course, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-5 hover:border-purple-400 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{course.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span><i className="ri-user-line mr-1"></i>{course.instructor}</span>
                          <span><i className="ri-time-line mr-1"></i>{course.duration}</span>
                          <span><i className="ri-group-line mr-1"></i>{course.students} học viên</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`ri-star-fill ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                      <i className="ri-play-line mr-2"></i>
                      Bắt đầu học
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Co-founder Matching */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-team-line text-blue-600"></i>
                Sàn Kết nối Đồng sáng lập (Co-founder Matching)
              </h3>
              <p className="text-sm text-gray-600 mb-4">Diễn đàn để các Creator tìm kiếm mảnh ghép còn thiếu</p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Tìm Dược sĩ giỏi chuyên môn',
                    creator: 'Creator giỏi Marketing',
                    description: 'Cần một Dược sĩ giỏi chuyên môn để cùng ra mắt một thương hiệu thực phẩm chức năng chung',
                    type: 'seeking',
                    responses: 5
                  },
                  {
                    title: 'Tìm Creator Marketing cho thương hiệu dược liệu',
                    creator: 'Dược sĩ có công thức độc quyền',
                    description: 'Đã có công thức và giấy phép, cần Creator Marketing để quảng bá sản phẩm',
                    type: 'offering',
                    responses: 12
                  },
                ].map((post, idx) => (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.type === 'seeking' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {post.type === 'seeking' ? 'Đang tìm' : 'Đang cung cấp'}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">{post.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Từ: {post.creator}</p>
                        <p className="text-sm text-gray-700 mb-3">{post.description}</p>
                        <div className="text-xs text-gray-500">
                          <i className="ri-message-3-line mr-1"></i>
                          {post.responses} phản hồi
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-chat-3-line mr-2"></i>
                      Xem chi tiết & Liên hệ
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                <i className="ri-add-line mr-2"></i>
                Đăng tin tìm đồng sáng lập
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hồ sơ Creator</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin và tài khoản của bạn</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Save to localStorage
              localStorage.setItem('creator_profile_data', JSON.stringify(profileData));
              // Update sessionStorage
              if (profileData.fullName) {
                sessionStorage.setItem('creator_name', profileData.fullName);
                setCreatorName(profileData.fullName);
              }
              if (profileData.stageName) {
                setStageName(profileData.stageName);
              }
              alert('Đã lưu thông tin hồ sơ thành công!');
            }}>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                  <input
                    type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      required
                      placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên hiển thị/Nghệ danh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="stageName"
                      value={profileData.stageName}
                      onChange={(e) => setProfileData({ ...profileData, stageName: e.target.value })}
                      required
                      placeholder="Dr. Healthy"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                  <input
                    type="email"
                      name="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      required
                      placeholder="0901234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới thiệu bản thân (Bio)
                    </label>
                  <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                      placeholder="Mô tả ngắn gọn về bạn, chuyên môn, và phong cách nội dung..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Social Media & Content Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-share-line text-purple-600"></i>
                Social Media & Nội dung
              </h3>

              {/* Social Media Platforms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tài khoản Social Media
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'tiktok', label: 'TikTok', icon: 'ri-tiktok-line' },
                    { key: 'facebook', label: 'Facebook', icon: 'ri-facebook-line' },
                    { key: 'instagram', label: 'Instagram', icon: 'ri-instagram-line' },
                    { key: 'youtube', label: 'YouTube', icon: 'ri-youtube-line' },
                    { key: 'zalo', label: 'Zalo', icon: 'ri-messenger-line' },
                  ].map((platform) => (
                    <div key={platform.key} className="flex items-center gap-3">
                      <i className={`${platform.icon} text-xl text-gray-600 w-6`}></i>
                      <input
                        type="text"
                        value={profileData.platforms[platform.key as keyof typeof profileData.platforms]}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          platforms: { ...profileData.platforms, [platform.key]: e.target.value }
                        })}
                        placeholder={`@${platform.label.toLowerCase()}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Follower Count & Avg Views */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tổng số Followers (ước tính)
                  </label>
                  <input
                    type="text"
                    name="followerCount"
                    value={profileData.followerCount}
                    onChange={(e) => setProfileData({ ...profileData, followerCount: e.target.value })}
                    placeholder="Ví dụ: 100K, 500K"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lượt xem trung bình/Video
                  </label>
                  <input
                    type="text"
                    name="avgViews"
                    value={profileData.avgViews}
                    onChange={(e) => setProfileData({ ...profileData, avgViews: e.target.value })}
                    placeholder="Ví dụ: 10K, 50K"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Content Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chủ đề nội dung bạn thường làm
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Dược liệu & Sức khỏe',
                    'Nông nghiệp bền vững',
                    'Sống xanh & ESG',
                    'Review sản phẩm',
                    'Vlog trải nghiệm',
                    'Giáo dục & Kiến thức',
                    'Kinh doanh & Đầu tư',
                  ].map((category) => (
                    <label
                      key={category}
                      className={`cursor-pointer border-2 rounded-lg p-3 text-sm transition-all ${
                        profileData.contentCategories.includes(category)
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={profileData.contentCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData({
                              ...profileData,
                              contentCategories: [...profileData.contentCategories, category]
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              contentCategories: profileData.contentCategories.filter(c => c !== category)
                            });
                          }
                        }}
                        className="hidden"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sample Content Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link bài viết/Video mẫu (tối đa 5)
                </label>
                <div className="space-y-2 mb-2">
                  {profileData.sampleContentLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="flex-1 text-sm text-gray-600 truncate">{link}</span>
                      <button
                        type="button"
                        onClick={() => setProfileData({
                          ...profileData,
                          sampleContentLinks: profileData.sampleContentLinks.filter((_, i) => i !== index)
                        })}
                        className="text-red-600 hover:text-red-700"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ))}
                </div>
                {profileData.sampleContentLinks.length < 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      const link = prompt('Nhập link bài viết/video mẫu:');
                      if (link) {
                        setProfileData({
                          ...profileData,
                          sampleContentLinks: [...profileData.sampleContentLinks, link]
                        });
                      }
                    }}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-all text-sm"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Thêm link mẫu
                  </button>
                )}
              </div>
            </div>

            {/* Verification & Terms Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-shield-check-line text-purple-600"></i>
                Xác minh & Điều khoản
              </h3>

              {/* ID Number */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số CMND/CCCD
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={profileData.idNumber}
                  onChange={(e) => setProfileData({ ...profileData, idNumber: e.target.value })}
                  placeholder="Ví dụ: 001234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh CMND/CCCD (nếu có)
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setProfileData({ ...profileData, idPhoto: e.target.files[0] });
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {profileData.idPhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="ri-check-line mr-1"></i>
                      Đã tải: {profileData.idPhoto.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh đại diện
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setProfileData({ ...profileData, profilePhoto: e.target.files[0] });
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {profileData.profilePhoto && (
                    <p className="text-sm text-green-600 mt-2">
                      <i className="ri-check-line mr-1"></i>
                      Đã tải: {profileData.profilePhoto.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms & Guidelines */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.agreeToTerms}
                    onChange={(e) => setProfileData({ ...profileData, agreeToTerms: e.target.checked })}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với <a href="#" className="text-purple-600 hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-purple-600 hover:underline">Chính sách bảo mật</a> của VITA Creator Hub
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.agreeToContentGuidelines}
                    onChange={(e) => setProfileData({ ...profileData, agreeToContentGuidelines: e.target.checked })}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    Tôi cam kết tuân thủ <a href="#" className="text-purple-600 hover:underline">Quy định nội dung</a> và chỉ sử dụng dữ liệu đã được VITA cấp phép
                  </span>
                </label>
              </div>

              {/* Verification Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <i className="ri-information-line mr-2"></i>
                  Hồ sơ của bạn sẽ được Ban Quản lý VITA Creator Hub xem xét sau khi bạn hoàn tất thông tin. Sau khi được phê duyệt, bạn sẽ có quyền truy cập vào các công cụ sáng tạo nội dung và tham gia các chiến dịch.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                  <i className="ri-save-line mr-2"></i>
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}




