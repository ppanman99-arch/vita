import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import VitalSignsWidget from './components/VitalSignsWidget';
import LiveGISMap from './components/LiveGISMap';
import LiveFeed from './components/LiveFeed';
import SeasonProgress from './components/SeasonProgress';
import ForestCanopyHealthWidget from './components/ForestCanopyHealthWidget';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const quickLinks = [
    { 
      name: 'Quản lý Xã viên', 
      path: '/admin-members', 
      icon: 'ri-team-line', 
      color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      description: 'Hồ sơ, VITA Score, vùng trồng'
    },
    { 
      name: 'Kế hoạch Sản xuất', 
      path: '/admin-production', 
      icon: 'ri-calendar-check-line', 
      color: 'bg-gradient-to-br from-green-600 to-emerald-700',
      description: 'Phân bổ, SOP, giám sát tuân thủ'
    },
    { 
      name: 'Quản lý Kho', 
      path: '/admin-warehouse', 
      icon: 'ri-archive-line', 
      color: 'bg-gradient-to-br from-purple-600 to-violet-700',
      description: 'Nhập xuất, tồn kho, truy xuất'
    },
    { 
      name: 'Tài chính HTX', 
      path: '/admin-finance', 
      icon: 'ri-money-dollar-circle-line', 
      color: 'bg-gradient-to-br from-yellow-600 to-orange-700',
      description: 'Thu chi, chia lợi nhuận, báo cáo'
    },
    { 
      name: 'Chuyên gia Hỗ trợ', 
      path: '/admin-expert', 
      icon: 'ri-user-star-line', 
      color: 'bg-gradient-to-br from-pink-600 to-rose-700',
      description: 'Tư vấn kỹ thuật, đào tạo'
    },
    { 
      name: 'Bản đồ GIS', 
      path: '/admin-gis', 
      icon: 'ri-map-pin-line', 
      color: 'bg-gradient-to-br from-green-600 to-emerald-700',
      description: 'Giám sát vùng trồng, vệ tinh'
    },
    { 
      name: 'Cơ hội Bao tiêu', 
      path: '/admin-opportunities', 
      icon: 'ri-notification-3-line', 
      color: 'bg-gradient-to-br from-orange-600 to-amber-700',
      description: 'Yêu cầu đặt trồng từ doanh nghiệp',
      badge: '3 mới'
    },
    { 
      name: 'Hợp đồng Bao tiêu', 
      path: '/admin-contracts', 
      icon: 'ri-file-list-3-line', 
      color: 'bg-gradient-to-br from-teal-600 to-cyan-700',
      description: 'Quản lý tiến độ sinh trưởng'
    },
    { 
      name: 'Quản lý Rừng & Tài trợ', 
      path: '/admin-forest-funding', 
      icon: 'ri-plant-line', 
      color: 'bg-gradient-to-br from-emerald-600 to-green-700',
      description: 'Lâm sinh, kiểm kê rừng, cảnh báo thiếu hụt, tạo dự án ESG & gọi vốn',
      badge: 'Mới'
    },
    { 
      name: 'Thẩm định & Nhập liệu Đất', 
      path: '/admin-land-audit', 
      icon: 'ri-map-2-line', 
      color: 'bg-gradient-to-br from-amber-600 to-orange-700',
      description: 'Số hóa tài nguyên đất, thẩm định vùng trồng, Ngân hàng Đất',
      badge: 'Mới'
    },
    { 
      name: 'Mua Giống', 
      path: '/seed-marketplace?source=self', 
      icon: 'ri-seedling-line', 
      color: 'bg-gradient-to-br from-green-600 to-emerald-600',
      description: 'Sàn giao dịch giống - Tự mua giống chất lượng cao',
      badge: 'Mới'
    },
    { 
      name: 'VITA Supply', 
      path: '/vita-supply', 
      icon: 'ri-shopping-cart-2-line', 
      color: 'bg-gradient-to-br from-orange-500 to-amber-600',
      description: 'Mua vật tư giá sỉ • Trả chậm • Gói vật tư theo vụ',
      badge: 'Mới'
    },
    { 
      name: 'Subscription Engine', 
      path: '/admin-subscription', 
      icon: 'ri-repeat-line', 
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      description: 'Gói định kỳ • Tổng hợp nhu cầu • Quy hoạch ngược',
      badge: 'Mới'
    },
    { 
      name: 'Skill Bank & Task Scheduler', 
      path: '/admin-skills', 
      icon: 'ri-user-star-line', 
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      description: 'Ngân hàng Kỹ năng • Phân việc đa nhiệm • Lịch trình hợp nhất',
      badge: 'Mới'
    },
    { 
      name: 'HTX Brand Hub', 
      path: '/htx-brand', 
      icon: 'ri-store-3-line', 
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      description: 'Shopee Connect • Landing Page • Tourism Booking',
      badge: 'Mới'
    },
    { 
      name: 'API Integration Hub', 
      path: '/admin-api-integration', 
      icon: 'ri-plug-line', 
      color: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      description: 'Quản lý tích hợp API • ezCloud • Haravan • Stringee',
      badge: 'Mới'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Trung tâm Điều hành HTX" />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Trung tâm Điều hành HTX</h1>
            <p className="text-sm text-gray-600 mt-1">Giám sát toàn bộ hoạt động hợp tác xã</p>
          </div>
          <div className="flex items-center gap-2">
            {['today', 'week', 'month'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range === 'today' ? 'Hôm nay' : range === 'week' ? 'Tuần này' : 'Tháng này'}
              </button>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Xã viên</span>
              <i className="ri-team-line text-blue-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">187</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Diện tích</span>
              <i className="ri-landscape-line text-green-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">245.8 ha</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Đơn hàng</span>
              <i className="ri-shopping-cart-line text-purple-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">12</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Sản lượng</span>
              <i className="ri-scales-3-line text-orange-600 text-xl"></i>
            </div>
            <div className="text-2xl font-bold text-gray-800">18,500 kg</div>
          </div>
        </div>

        {/* New Opportunities Alert */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="ri-notification-3-line text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">🎉 Có 3 cơ hội bao tiêu mới!</h3>
                <p className="text-sm text-white/90 mb-3">
                  Các doanh nghiệp dược phẩm đang tìm kiếm HTX có thổ nhưỡng phù hợp để đặt trồng dược liệu.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-white/20 rounded-full">Sâm Ngọc Linh - 98% phù hợp</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full">Đương Quy - 95% phù hợp</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full">Cà Gai Leo - 88% phù hợp</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/admin-opportunities')}
              className="px-6 py-2.5 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-md whitespace-nowrap"
            >
              Xem ngay
            </button>
          </div>
        </div>

        {/* Forest Canopy Health Widget */}
        <ForestCanopyHealthWidget />

        {/* Landing Pages Quick Access */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-global-line text-blue-600"></i>
            Landing Pages Công khai
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-3">Xem landing page công khai của các HTX:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/coop/htx-mang-ri"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <i className="ri-external-link-line"></i>
                HTX Măng Ri
              </a>
              <a
                href="/coop/htx-tay-nguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <i className="ri-external-link-line"></i>
                HTX Tây Nguyên
              </a>
              <button
                onClick={() => navigate('/htx-brand?tab=landing')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <i className="ri-settings-line"></i>
                Quản lý Landing Pages
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-apps-line text-green-600"></i>
            Truy cập nhanh
          </h2>
          <div className="text-sm text-gray-600 mb-4">Phân hệ</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  // Set flag for VITA Supply to allow access without login
                  if (link.path === '/vita-supply') {
                    sessionStorage.setItem('navigating_from_admin', 'true');
                    sessionStorage.setItem('supply_authenticated', 'true');
                    // Set coop name if available
                    const coopName = sessionStorage.getItem('coop_name') || 'HTX';
                    sessionStorage.setItem('supply_coop_name', coopName);
                  }
                  // Set flag for HTX Brand Hub to allow access without login
                  if (link.path === '/htx-brand') {
                    sessionStorage.setItem('navigating_from_admin', 'true');
                    sessionStorage.setItem('brand_authenticated', 'true');
                    // Set coop name if available
                    const coopName = sessionStorage.getItem('coop_name') || 'HTX';
                    sessionStorage.setItem('brand_coop_name', coopName);
                  }
                  window.REACT_APP_NAVIGATE(link.path);
                }}
                className={`${link.color} p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-white text-left group relative overflow-hidden`}
              >
                {link.badge && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {link.badge}
                  </div>
                )}
                <i className={`${link.icon} text-3xl mb-3 block`}></i>
                <h3 className="font-bold text-base mb-1">{link.name}</h3>
                <p className="text-xs text-white/80">{link.description}</p>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-tl-full transform translate-x-8 translate-y-8 group-hover:scale-150 transition-transform"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
