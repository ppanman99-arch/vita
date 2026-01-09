import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';

type TabType = 'overview' | 'tourism' | 'retail' | 'communication' | 'logistics' | 'ekyc' | 'gis';

interface ApiIntegration {
  id: string;
  name: string;
  provider: string;
  category: string;
  status: 'connected' | 'disconnected' | 'pending';
  apiKey?: string;
  lastSync?: string;
  usage: {
    calls: number;
    limit: number;
    cost: number;
  };
}

export default function AdminApiIntegrationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl || 'overview');

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Mock API integrations
  const integrations: ApiIntegration[] = [
    {
      id: 'ezcloud',
      name: 'ezCloud PMS & Channel Manager',
      provider: 'ezCloud',
      category: 'Tourism',
      status: 'connected',
      apiKey: 'ezc_*****abc123',
      lastSync: '2024-11-25 10:30',
      usage: { calls: 1250, limit: 10000, cost: 2500000 },
    },
    {
      id: 'haravan',
      name: 'Haravan Omnichannel',
      provider: 'Haravan',
      category: 'Retail',
      status: 'connected',
      apiKey: 'hrv_*****xyz789',
      lastSync: '2024-11-25 09:15',
      usage: { calls: 3420, limit: 50000, cost: 1800000 },
    },
    {
      id: 'stringee',
      name: 'Stringee Video Call',
      provider: 'Stringee',
      category: 'Communication',
      status: 'connected',
      apiKey: 'str_*****def456',
      lastSync: '2024-11-25 11:00',
      usage: { calls: 89, limit: 1000, cost: 890000 },
    },
    {
      id: 'goship',
      name: 'Goship Logistics',
      provider: 'Goship',
      category: 'Logistics',
      status: 'connected',
      apiKey: 'gsh_*****ghi012',
      lastSync: '2024-11-25 08:45',
      usage: { calls: 567, limit: 5000, cost: 1134000 },
    },
    {
      id: 'fpt-ai',
      name: 'FPT.AI eKYC & eContract',
      provider: 'FPT.AI',
      category: 'E-KYC',
      status: 'connected',
      apiKey: 'fpt_*****jkl345',
      lastSync: '2024-11-25 07:20',
      usage: { calls: 234, limit: 2000, cost: 468000 },
    },
    {
      id: 'mapbox',
      name: 'Mapbox GIS',
      provider: 'Mapbox',
      category: 'GIS',
      status: 'connected',
      apiKey: 'pk_*****mno678',
      lastSync: '2024-11-25 12:00',
      usage: { calls: 8900, limit: 50000, cost: 445000 },
    },
    {
      id: 'zalo',
      name: 'Zalo ZNS (Notification)',
      provider: 'Zalo Cloud',
      category: 'Communication',
      status: 'pending',
      apiKey: undefined,
      usage: { calls: 0, limit: 10000, cost: 0 },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'disconnected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Đã kết nối';
      case 'disconnected': return 'Ngắt kết nối';
      case 'pending': return 'Chờ kích hoạt';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="API Integration Hub - Quản lý Tích hợp" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
              { id: 'tourism', label: 'Du lịch (ezCloud)', icon: 'ri-hotel-line' },
              { id: 'retail', label: 'Bán lẻ (Haravan)', icon: 'ri-store-3-line' },
              { id: 'communication', label: 'Giao tiếp (Stringee/Zalo)', icon: 'ri-message-3-line' },
              { id: 'logistics', label: 'Vận chuyển (Goship)', icon: 'ri-truck-line' },
              { id: 'ekyc', label: 'E-KYC (FPT.AI)', icon: 'ri-shield-check-line' },
              { id: 'gis', label: 'Bản đồ (Mapbox)', icon: 'ri-map-2-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-plug-line text-2xl text-emerald-600"></i>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Đã kết nối</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">6</p>
                  <p className="text-xs text-gray-600">API đang hoạt động</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-bar-chart-line text-2xl text-blue-600"></i>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Tháng này</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">14,360</p>
                  <p className="text-xs text-gray-600">Lượt gọi API</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-money-dollar-circle-line text-2xl text-orange-600"></i>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Chi phí</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">11.3 triệu</p>
                  <p className="text-xs text-gray-600">Tháng này</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-time-line text-2xl text-purple-600"></i>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Uptime</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">99.8%</p>
                  <p className="text-xs text-gray-600">Độ ổn định</p>
                </div>
              </div>

              {/* API List */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Danh sách API Tích hợp</h3>
                <div className="space-y-3">
                  {integrations.map((api) => (
                    <div key={api.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{api.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(api.status)}`}>
                              {getStatusText(api.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>Nhà cung cấp: <strong>{api.provider}</strong></span>
                            <span>•</span>
                            <span>Phân loại: {api.category}</span>
                            {api.apiKey && (
                              <>
                                <span>•</span>
                                <span>API Key: {api.apiKey}</span>
                              </>
                            )}
                          </div>
                          {api.lastSync && (
                            <div className="text-xs text-gray-500 mb-2">
                              Đồng bộ lần cuối: {api.lastSync}
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Sử dụng: </span>
                              <span className="font-semibold text-gray-900">{api.usage.calls.toLocaleString('vi-VN')}</span>
                              <span className="text-gray-600"> / {api.usage.limit.toLocaleString('vi-VN')}</span>
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded-full"
                                style={{ width: `${(api.usage.calls / api.usage.limit) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-emerald-600 font-semibold">
                              {api.usage.cost.toLocaleString('vi-VN')} đ
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {api.status === 'connected' ? (
                            <>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                                <i className="ri-settings-3-line mr-2"></i>
                                Cấu hình
                              </button>
                              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                <i className="ri-plug-2-line mr-2"></i>
                                Ngắt kết nối
                              </button>
                            </>
                          ) : (
                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">
                              <i className="ri-plug-line mr-2"></i>
                              Kết nối
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tourism Tab - ezCloud */}
          {activeTab === 'tourism' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ezCloud PMS & Channel Manager</h3>
                    <p className="text-sm text-gray-600">
                      Tích hợp quản lý khách sạn/Homestay và đồng bộ đa kênh OTA (Agoda, Booking, Traveloka, Airbnb)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">ezFolio (PMS)</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Quản lý phòng, lịch đặt chỗ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Check-in/Check-out tự động</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Báo cáo doanh thu</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">ezCms (Channel Manager)</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Đồng bộ tồn kho đa kênh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Tự động đẩy lên Agoda, Booking, Traveloka</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Đồng bộ giá và lịch 2 chiều</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        Không cần tự xây hệ thống OTA. Chỉ cần nhập phòng trống lên VITA, ezCloud tự động đẩy sang các sàn du lịch và ngược lại.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="text"
                      defaultValue="ezc_*****abc123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Secret</label>
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                    <i className="ri-save-line mr-2"></i>
                    Lưu cấu hình
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Retail Tab - Haravan */}
          {activeTab === 'retail' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Haravan Omnichannel</h3>
                    <p className="text-sm text-gray-600">
                      Đồng bộ sản phẩm, đơn hàng, tồn kho đa kênh (Shopee, Lazada, TikTok Shop)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { name: 'Shopee', status: 'connected', orders: 234, revenue: '45.8 triệu' },
                    { name: 'Lazada', status: 'connected', orders: 89, revenue: '18.2 triệu' },
                    { name: 'TikTok Shop', status: 'pending', orders: 0, revenue: '0' },
                  ].map((channel, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          channel.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {channel.status === 'connected' ? 'Đã kết nối' : 'Chờ kết nối'}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>Đơn hàng: <strong>{channel.orders}</strong></div>
                        <div>Doanh thu: <strong className="text-emerald-600">{channel.revenue}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        Haravan tự động cập nhật API của Shopee/TikTok liên tục (mỗi khi sàn đổi thuật toán). Bạn không phải lo bảo trì.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Haravan API Key</label>
                    <input
                      type="text"
                      defaultValue="hrv_*****xyz789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                    <i className="ri-sync-line mr-2"></i>
                    Đồng bộ ngay
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && (
            <div className="space-y-6">
              {/* Stringee */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Stringee Video Call</h3>
                    <p className="text-sm text-gray-600">
                      Video Call HD cho khám bệnh từ xa, tư vấn kỹ thuật giữa Chuyên gia và Nông dân
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Tính năng</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Video Call HD chất lượng cao</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Ghi âm/ghi hình cuộc gọi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Screen sharing</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Thống kê</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Cuộc gọi tháng này:</span>
                        <span className="font-semibold text-gray-900">89 cuộc</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tổng thời gian:</span>
                        <span className="font-semibold text-gray-900">45 giờ</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Chi phí:</span>
                        <span className="font-semibold text-emerald-600">890.000 đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zalo ZNS */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Zalo ZNS (Zalo Notification Service)</h3>
                    <p className="text-sm text-gray-600">
                      Gửi thông báo chăm sóc cây, lịch thu hoạch qua Zalo (thay vì SMS đắt đỏ)
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Chờ kích hoạt
                  </span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        100% nông dân Việt Nam dùng Zalo. Gửi thông báo qua Zalo giá rẻ hơn SMS rất nhiều và tỷ lệ mở cao hơn.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zalo OA ID</label>
                    <input
                      type="text"
                      placeholder="Nhập Zalo Official Account ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZNS Template ID</label>
                    <input
                      type="text"
                      placeholder="Nhập Template ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                    <i className="ri-plug-line mr-2"></i>
                    Kích hoạt ZNS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Logistics Tab */}
          {activeTab === 'logistics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Goship Logistics</h3>
                    <p className="text-sm text-gray-600">
                      Cổng trung gian vận chuyển - So sánh giá ship của 5-10 đơn vị vận chuyển cùng lúc
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { name: 'GHN', price: '25.000 đ', time: '1-2 ngày' },
                    { name: 'GHTK', price: '22.000 đ', time: '2-3 ngày' },
                    { name: 'Viettel Post', price: '28.000 đ', time: '2-3 ngày' },
                    { name: 'J&T', price: '20.000 đ', time: '1-2 ngày' },
                  ].map((carrier, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{carrier.name}</h4>
                      <div className="text-sm text-gray-600">
                        <div>Giá: <strong className="text-emerald-600">{carrier.price}</strong></div>
                        <div>Thời gian: {carrier.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        Thay vì kết nối từng đơn vị (GHN, GHTK, Viettel Post...), bạn chỉ cần kết nối Goship. 
                        Nông dân bấm "Giao hàng" trên VITA → Hệ thống Goship tự điều shipper đến lấy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E-KYC Tab */}
          {activeTab === 'ekyc' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">FPT.AI eKYC & eContract</h3>
                    <p className="text-sm text-gray-600">
                      Xác thực danh tính và ký hợp đồng điện tử có giá trị pháp lý
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">FPT.AI eKYC</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Quét CCCD, nhận diện khuôn mặt giả mạo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Trích xuất thông tin tự động (OCR)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Độ chính xác {'>'}99%</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">FPT.eContract</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Ký hợp đồng điện tử có giá trị pháp lý</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Doanh nghiệp B2B và HTX ký trên điện thoại</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Không cần gặp mặt</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        Chuẩn pháp lý Việt Nam. Được Bộ TT&TT công nhận. Đảm bảo tính hợp pháp của hợp đồng điện tử.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GIS Tab */}
          {activeTab === 'gis' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mapbox GIS & Planet Satellite</h3>
                    <p className="text-sm text-gray-600">
                      Bản đồ tùy biến và dữ liệu vệ tinh độ phân giải cao
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Đã kết nối
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Mapbox GL JS</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Thay thế Google Maps (đắt và ít tùy biến)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Vẽ các lớp (Layer) rừng, đất đai đẹp và mượt</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Tùy biến giao diện bản đồ</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Planet API</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Ảnh vệ tinh độ phân giải cao</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Cập nhật hàng ngày/tuần</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span>Theo dõi biến động rừng (mất rừng, cháy rừng)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-lightbulb-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lợi ích</h4>
                      <p className="text-sm text-gray-700">
                        Mapbox rẻ hơn Google Maps và cho phép tùy biến nhiều hơn. Planet cung cấp dữ liệu vệ tinh chuyên nghiệp cho giám sát rừng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

