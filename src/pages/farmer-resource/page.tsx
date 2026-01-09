import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerResourcePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'map' | 'tenant' | 'wallet' | 'duty'>('map');

  const resourceData = {
    memberName: 'Nguyễn Văn Minh',
    totalArea: 12.5,
    assetValue: 1200000000,
    treeCount: 50000,
    treeAge: '3 năm tuổi',
    monthlyIncome: {
      landRent: 2500000,
      revenueShare: 4500000,
      environmental: 1500000,
      total: 8500000,
    },
    landBlocks: [
      {
        id: 'A',
        area: 2,
        status: 'active',
        crop: 'Sâm Ngọc Linh',
        farmer: 'Nguyễn Văn X',
        farmerId: 'SX001',
        color: 'emerald',
      },
      {
        id: 'B',
        area: 5,
        status: 'forest',
        crop: 'Rừng tự nhiên - Nuôi ong',
        farmer: 'Trần Thị Y',
        farmerId: 'SX003',
        color: 'yellow',
      },
      {
        id: 'C',
        area: 1,
        status: 'vacant',
        crop: 'Đất trống',
        farmer: null,
        farmerId: null,
        color: 'gray',
      },
      {
        id: 'D',
        area: 3,
        status: 'active',
        crop: 'Đương Quy',
        farmer: 'Lê Văn Z',
        farmerId: 'SX005',
        color: 'emerald',
      },
      {
        id: 'E',
        area: 1.5,
        status: 'active',
        crop: 'Quế',
        farmer: 'Phạm Thị K',
        farmerId: 'SX007',
        color: 'emerald',
      },
    ],
    tenants: [
      {
        id: 'SX001',
        name: 'Nguyễn Văn X',
        block: 'Lô A',
        contract: '05/HĐ-HTX',
        startDate: '2025-01-01',
        endDate: '2030-01-01',
        rating: 5,
        lastActivity: 'Hôm nay đã tưới nước và bón phân',
        activityTime: '2 giờ trước',
      },
      {
        id: 'SX003',
        name: 'Trần Thị Y',
        block: 'Lô B',
        contract: '12/HĐ-HTX',
        startDate: '2024-06-01',
        endDate: '2029-06-01',
        rating: 5,
        lastActivity: 'Thu hoạch mật ong 15kg',
        activityTime: '1 ngày trước',
      },
      {
        id: 'SX005',
        name: 'Lê Văn Z',
        block: 'Lô D',
        contract: '18/HĐ-HTX',
        startDate: '2025-03-01',
        endDate: '2030-03-01',
        rating: 4,
        lastActivity: 'Kiểm tra sâu bệnh',
        activityTime: '5 giờ trước',
      },
    ],
    ecoWallet: {
      pfes: {
        q1: 15000000,
        q2: 15000000,
        q3: 0,
        q4: 0,
        total: 30000000,
      },
      carbon: {
        balance: 50,
        pricePerToken: 500000,
        totalValue: 25000000,
      },
    },
    guardDuty: {
      lastPatrol: '2025-01-15',
      patrolCount: 12,
      reports: [
        {
          id: 1,
          date: '2025-01-15',
          type: 'normal',
          title: 'Tuần tra định kỳ',
          description: 'Tình hình bình thường, cây trồng phát triển tốt',
        },
        {
          id: 2,
          date: '2025-01-10',
          type: 'warning',
          title: 'Phát hiện sâu bệnh',
          description: 'Lô A có dấu hiệu sâu đục thân, đã báo HTX xử lý',
        },
      ],
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { text: 'Đang canh tác', color: 'bg-emerald-100 text-emerald-700' },
      forest: { text: 'Rừng tự nhiên', color: 'bg-yellow-100 text-yellow-700' },
      vacant: { text: 'Đất trống', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[status as keyof typeof badges] || badges.vacant;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={() => navigate('/member-hub')}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
              >
                <i className="ri-arrow-left-line text-lg sm:text-xl"></i>
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Quản trị Tài sản Đất</h1>
                <p className="text-amber-100 text-xs sm:text-sm truncate">Xã viên Góp đất - {resourceData.memberName}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <RoleSwitcher currentRole="resource" />
            </div>
          </div>

          {/* Asset Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-landscape-line text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-[10px] sm:text-xs">Diện tích góp</p>
                  <p className="text-base sm:text-xl md:text-2xl font-bold truncate">{resourceData.totalArea} ha</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-money-dollar-circle-line text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-[10px] sm:text-xs">Giá trị quy đổi</p>
                  <p className="text-xs sm:text-base md:text-xl font-bold truncate">{formatCurrency(resourceData.assetValue)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-plant-line text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-[10px] sm:text-xs">Tài sản trên đất</p>
                  <p className="text-xs sm:text-base md:text-xl font-bold truncate">{resourceData.treeCount.toLocaleString()} cây</p>
                  <p className="text-[9px] sm:text-xs text-amber-100 truncate">{resourceData.treeAge}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-line-chart-line text-lg sm:text-xl md:text-2xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-amber-100 text-[10px] sm:text-xs">Thu nhập tháng này</p>
                  <p className="text-xs sm:text-base md:text-xl font-bold truncate">{formatCurrency(resourceData.monthlyIncome.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Income Chart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Cơ cấu thu nhập tháng này</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            <div className="text-center">
              <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-blue-500 to-blue-300 rounded-lg flex items-end justify-center pb-1 sm:pb-2 mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{formatCurrency(resourceData.monthlyIncome.landRent)}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Phí thuê đất cố định</p>
            </div>
            <div className="text-center">
              <div className="w-full h-32 sm:h-48 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-lg flex items-end justify-center pb-1 sm:pb-2 mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{formatCurrency(resourceData.monthlyIncome.revenueShare)}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Chia sẻ doanh thu</p>
            </div>
            <div className="text-center">
              <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-green-500 to-green-300 rounded-lg flex items-end justify-center pb-1 sm:pb-2 mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{formatCurrency(resourceData.monthlyIncome.environmental)}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Tiền môi trường</p>
            </div>
            <div className="text-center">
              <div className="w-full h-40 sm:h-56 bg-gradient-to-t from-amber-600 to-amber-400 rounded-lg flex items-end justify-center pb-1 sm:pb-2 mb-2">
                <span className="text-white font-bold text-xs sm:text-sm">{formatCurrency(resourceData.monthlyIncome.total)}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Tổng thu nhập</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'map'
                    ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-map-2-line mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Bản đồ số & Phân lô</span>
                <span className="sm:hidden">Bản đồ</span>
              </button>
              <button
                onClick={() => setActiveTab('tenant')}
                className={`flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'tenant'
                    ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-team-line mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Quản lý Hộ liên kết</span>
                <span className="sm:hidden">Hộ liên kết</span>
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'wallet'
                    ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-wallet-3-line mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Ví Môi trường</span>
                <span className="sm:hidden">Ví Môi trường</span>
              </button>
              <button
                onClick={() => setActiveTab('duty')}
                className={`flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'duty'
                    ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-shield-check-line mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Nghĩa vụ Bảo vệ</span>
                <span className="sm:hidden">Bảo vệ</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Tab 1: Digital Land Map */}
            {activeTab === 'map' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Bản đồ vệ tinh vùng đất của bạn</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Ranh giới đất được khoanh vùng và phân lô theo trạng thái canh tác</p>
                </div>

                {/* Map */}
                <div className="bg-gray-100 rounded-lg h-64 sm:h-96 mb-4 sm:mb-6 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709882794!2d105.79576424335938!3d21.022736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Land Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {resourceData.landBlocks.map((block) => {
                    const badge = getStatusBadge(block.status);
                    return (
                      <div
                        key={block.id}
                        className={`border-2 rounded-lg p-3 sm:p-4 ${
                          block.status === 'active'
                            ? 'border-emerald-300 bg-emerald-50'
                            : block.status === 'forest'
                            ? 'border-yellow-300 bg-yellow-50'
                            : 'border-gray-300 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900">Lô {block.id}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{block.area} ha</p>
                          </div>
                          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${badge.color}`}>
                            {badge.text}
                          </span>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <i className="ri-plant-line text-gray-600 flex-shrink-0"></i>
                            <span className="text-gray-700 truncate">{block.crop}</span>
                          </div>
                          {block.farmer && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                              <i className="ri-user-line text-gray-600 flex-shrink-0"></i>
                              <span className="text-gray-700 truncate">
                                {block.farmer} ({block.farmerId})
                              </span>
                            </div>
                          )}
                        </div>

                        {block.status === 'vacant' ? (
                          <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                            <i className="ri-add-line mr-1"></i>
                            <span className="hidden sm:inline">Yêu cầu HTX cử người canh tác</span>
                            <span className="sm:hidden">Yêu cầu cử người</span>
                          </button>
                        ) : (
                          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                            <i className="ri-eye-line mr-1"></i>
                            Xem chi tiết
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Tenant Management */}
            {activeTab === 'tenant' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Danh sách người đang làm trên đất của bạn</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Theo dõi hoạt động và đánh giá xã viên sản xuất</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {resourceData.tenants.map((tenant) => (
                    <div key={tenant.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0">
                            {tenant.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 truncate">{tenant.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Mã: {tenant.id}</p>
                            <div className="flex items-center gap-0.5 sm:gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`ri-star-${i < tenant.rating ? 'fill' : 'line'} text-yellow-400 text-sm sm:text-base`}
                                ></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0">
                          <i className="ri-star-line mr-1"></i>
                          <span className="hidden sm:inline">Đánh giá</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Lô đất</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">{tenant.block}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Hợp đồng</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{tenant.contract}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Thời hạn</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {new Date(tenant.startDate).getFullYear()} - {new Date(tenant.endDate).getFullYear()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Còn lại</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {Math.ceil(
                              (new Date(tenant.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365)
                            )}{' '}
                            năm
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 sm:p-3">
                        <div className="flex items-start gap-2">
                          <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5 text-base sm:text-lg flex-shrink-0"></i>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-gray-900 font-medium">{tenant.lastActivity}</p>
                            <p className="text-[10px] sm:text-xs text-gray-600 mt-1">{tenant.activityTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Eco Wallet */}
            {activeTab === 'wallet' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Ví Môi trường & Dòng tiền</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Minh bạch hóa các khoản thu đặc thù của chủ rừng</p>
                </div>

                {/* PFES Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-leaf-line text-xl sm:text-2xl text-white"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900">Dịch vụ Môi trường Rừng (PFES)</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Tiền chi trả từ Quỹ bảo vệ rừng</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Quý I/2026</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-green-600 truncate">{formatCurrency(resourceData.ecoWallet.pfes.q1)}</p>
                      <span className="inline-block mt-1.5 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 text-[9px] sm:text-xs rounded whitespace-nowrap">
                        Đã nhận
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Quý II/2026</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-green-600 truncate">{formatCurrency(resourceData.ecoWallet.pfes.q2)}</p>
                      <span className="inline-block mt-1.5 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 text-[9px] sm:text-xs rounded whitespace-nowrap">
                        Đã nhận
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Quý III/2026</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-gray-400">Chưa đến kỳ</p>
                      <span className="inline-block mt-1.5 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[9px] sm:text-xs rounded whitespace-nowrap">
                        Dự kiến
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Tổng năm 2026</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-green-600 truncate">{formatCurrency(resourceData.ecoWallet.pfes.total)}</p>
                      <span className="inline-block mt-1.5 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-[9px] sm:text-xs rounded whitespace-nowrap">
                        Tích lũy
                      </span>
                    </div>
                  </div>
                </div>

                {/* Carbon Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-cloud-line text-xl sm:text-2xl text-white"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900">Tín chỉ Carbon</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Giá trị từ hấp thụ CO₂</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Số dư Token</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{resourceData.ecoWallet.carbon.balance} Token</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Giá mỗi Token</p>
                      <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 truncate">
                        {formatCurrency(resourceData.ecoWallet.carbon.pricePerToken)}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Tổng giá trị</p>
                      <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 truncate">
                        {formatCurrency(resourceData.ecoWallet.carbon.totalValue)}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium whitespace-nowrap">
                    <i className="ri-exchange-line mr-2"></i>
                    <span className="hidden sm:inline">Ủy thác HTX bán Token Carbon</span>
                    <span className="sm:hidden">Ủy thác bán Token</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Guard Duty */}
            {activeTab === 'duty' && (
              <div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Nghĩa vụ Bảo vệ Rừng</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Quyền lợi đi kèm nghĩa vụ - Đảm bảo đất không bị xâm lấn</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-calendar-check-line text-xl sm:text-2xl text-white"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs text-gray-600">Lần tuần tra gần nhất</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">{resourceData.guardDuty.lastPatrol}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-footprint-line text-xl sm:text-2xl text-white"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs text-gray-600">Tổng số lần tuần tra</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{resourceData.guardDuty.patrolCount} lần</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-star-line text-xl sm:text-2xl text-white"></i>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs text-gray-600">Điểm tín nhiệm</p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Xuất sắc</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Report */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Báo cáo nhanh</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                      <i className="ri-checkbox-circle-line text-2xl sm:text-3xl text-emerald-600"></i>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">Tình hình bình thường</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all">
                      <i className="ri-alert-line text-2xl sm:text-3xl text-red-600"></i>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">Sạt lở đất</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all">
                      <i className="ri-bug-line text-2xl sm:text-3xl text-orange-600"></i>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">Cây bị bệnh</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all">
                      <i className="ri-user-forbid-line text-2xl sm:text-3xl text-purple-600"></i>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">Người lạ xâm nhập</span>
                    </button>
                  </div>
                </div>

                {/* Report History */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Lịch sử báo cáo</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {resourceData.guardDuty.reports.map((report) => (
                      <div
                        key={report.id}
                        className={`border-l-4 rounded-lg p-3 sm:p-4 ${
                          report.type === 'normal'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-orange-500 bg-orange-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2 gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <i
                              className={`${
                                report.type === 'normal' ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-alert-fill text-orange-600'
                              } text-lg sm:text-xl flex-shrink-0`}
                            ></i>
                            <h5 className="font-bold text-gray-900 text-sm sm:text-base truncate">{report.title}</h5>
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-600 flex-shrink-0">{report.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 ml-6 sm:ml-7">{report.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
