import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorTopBar from './components/CreatorTopBar';

type TabType = 'campaigns' | 'assets' | 'affiliate' | 'farm-tours' | 'earnings' | 'co-create' | 'esg-profile' | 'production-finance' | 'profile';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <CreatorTopBar creatorName={creatorName} stageName={stageName} isVerified={isVerified} />

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'campaigns'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-briefcase-line mr-2"></i>
              Chiến dịch
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'assets'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-image-line mr-2"></i>
              Kho Tài nguyên
            </button>
            <button
              onClick={() => setActiveTab('affiliate')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'affiliate'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-links-line mr-2"></i>
              Affiliate
            </button>
            <button
              onClick={() => setActiveTab('farm-tours')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'farm-tours'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-map-pin-line mr-2"></i>
              Đặt lịch Vườn
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'earnings'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-money-dollar-circle-line mr-2"></i>
              Thu nhập
            </button>
            <button
              onClick={() => setActiveTab('co-create')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'co-create'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-lightbulb-flash-line mr-2"></i>
              Xây dựng Thương hiệu
              <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">Mới</span>
            </button>
            <button
              onClick={() => setActiveTab('esg-profile')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'esg-profile'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-leaf-line mr-2"></i>
              Hồ sơ ESG
              <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full">Mới</span>
            </button>
            <button
              onClick={() => setActiveTab('production-finance')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'production-finance'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-bank-line mr-2"></i>
              Tín dụng SX
              <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded-full">Mới</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-user-line mr-2"></i>
              Hồ sơ
            </button>
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
              <h2 className="text-2xl font-bold text-gray-900">Kho Tài nguyên Số</h2>
              <p className="text-gray-600 mt-1">Truy cập Camera, Timelapse, Nhật ký và Chứng thư số từ HTX</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    {asset.type === 'camera' && <i className="ri-camera-line text-6xl text-purple-600"></i>}
                    {asset.type === 'timelapse' && <i className="ri-time-line text-6xl text-purple-600"></i>}
                    {asset.type === 'diary' && <i className="ri-file-text-line text-6xl text-purple-600"></i>}
                    {asset.type === 'certificate' && <i className="ri-certificate-line text-6xl text-purple-600"></i>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{asset.name}</h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-gray-600">
                        <i className="ri-building-line mr-2"></i>
                        {asset.source}
                      </p>
                      <p className="text-sm text-gray-600">
                        <i className="ri-map-pin-line mr-2"></i>
                        {asset.location}
                      </p>
                    </div>
                    <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                      asset.accessible
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}>
                      {asset.accessible ? (
                        <>
                          <i className="ri-download-line mr-2"></i>
                          Truy cập
                        </>
                      ) : (
                        <>
                          <i className="ri-lock-line mr-2"></i>
                          Cần phê duyệt
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
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
              <h2 className="text-2xl font-bold text-gray-900">VITA CO-CREATE & INCUBATOR</h2>
              <p className="text-gray-600 mt-1">Xây dựng Thương hiệu Riêng - Từ ý tưởng đến sản phẩm</p>
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hồ sơ Creator</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin và tài khoản của bạn</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên hiển thị</label>
                  <input
                    type="text"
                    defaultValue={stageName || creatorName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={sessionStorage.getItem('creator_email') || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Giới thiệu về bản thân và phong cách nội dung..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
                  <i className="ri-save-line mr-2"></i>
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




