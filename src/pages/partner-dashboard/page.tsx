import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function PartnerDashboardPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'order' | 'trace' | 'delivery' | 'finance'>('order');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">VITA Partner Portal</h1>
              <p className="text-blue-100 text-sm sm:text-base">Cổng thông tin Đối tác B2B</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PortalSwitcher />
            <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <i className="ri-notification-3-line text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-white/80 text-xs sm:text-sm mb-1">Đơn hàng</div>
            <div className="text-2xl sm:text-3xl font-bold">24</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-white/80 text-xs sm:text-sm mb-1">Đang giao</div>
            <div className="text-2xl sm:text-3xl font-bold">8</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-white/80 text-xs sm:text-sm mb-1">Hoàn thành</div>
            <div className="text-2xl sm:text-3xl font-bold">142</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-white/80 text-xs sm:text-sm mb-1">Doanh thu</div>
            <div className="text-lg sm:text-xl font-bold">2.4B</div>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-6 py-4 space-y-4">
        {/* NEW: B2B Procurement Tools */}
        <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="ri-shopping-bag-3-line"></i>
            Công cụ Thu mua B2B
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Hệ thống khớp lệnh thông minh giúp bạn tìm HTX có <strong>thổ nhưỡng phù hợp</strong> để đặt trồng dược liệu theo tiêu chuẩn dược tính.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/enterprise-potential-map')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition-all hover:scale-105 active:scale-95"
            >
              <i className="ri-map-2-line text-2xl mb-2 block"></i>
              <div className="font-semibold mb-1">Bản đồ Vùng trồng</div>
              <div className="text-xs text-white/70">Xem heatmap thổ nhưỡng phù hợp</div>
            </button>
            
            <button
              onClick={() => navigate('/enterprise-procurement')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition-all hover:scale-105 active:scale-95"
            >
              <i className="ri-file-list-3-line text-2xl mb-2 block"></i>
              <div className="font-semibold mb-1">Lập Kế hoạch Thu mua</div>
              <div className="text-xs text-white/70">Tạo yêu cầu đặt trồng mới</div>
            </button>
            
            <button
              onClick={() => navigate('/enterprise-negotiation')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition-all hover:scale-105 active:scale-95"
            >
              <i className="ri-discuss-line text-2xl mb-2 block"></i>
              <div className="font-semibold mb-1">Quản lý Đàm phán</div>
              <div className="text-xs text-white/70">Theo dõi tiến độ thảo luận với HTX</div>
            </button>

            <button
              onClick={() => navigate('/seed-marketplace?source=b2b')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition-all hover:scale-105 active:scale-95"
            >
              <i className="ri-seedling-line text-2xl mb-2 block"></i>
              <div className="font-semibold mb-1">Mua Giống cho HTX</div>
              <div className="text-xs text-white/70">Bao tiêu đầu vào - Mua giống chỉ định cho HTX</div>
            </button>
          </div>
        </div>

        {/* Map Widget */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-map-pin-line text-blue-600"></i>
              Bản đồ Nguồn Nguyên liệu
            </h2>
          </div>
          <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-teal-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3193500642!2d106.66408931533417!3d10.786834992313928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c80767d%3A0x5a981a5efee9fd7d!2sVietnam!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Order Status Widget */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-shopping-cart-line text-blue-600"></i>
            Trạng thái Đơn hàng
          </h2>
          <div className="space-y-3">
            {[
              { id: 'ORD-2024-001', product: 'Cà Gai Leo', quantity: 500, status: 'Đang xử lý', color: 'blue' },
              { id: 'ORD-2024-002', product: 'Hoàng Tinh', quantity: 300, status: 'Đang giao', color: 'yellow' },
              { id: 'ORD-2024-003', product: 'Bạch Truật', quantity: 450, status: 'Hoàn thành', color: 'green' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{order.product}</div>
                  <div className="text-xs text-gray-500">{order.id} • {order.quantity} kg</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${order.color}-100 text-${order.color}-600`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-line-chart-line text-blue-600"></i>
            Biến động Giá
          </h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 98].map((height, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>Tháng 1</span>
            <span>Tháng 6</span>
            <span>Tháng 12</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Thao tác Nhanh</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/partner/order')}
              className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-4 rounded-xl hover:scale-105 transition-all"
            >
              <i className="ri-shopping-cart-line text-2xl mb-2 block"></i>
              <div className="text-sm font-semibold">Đặt hàng</div>
            </button>
            <button
              onClick={() => navigate('/partner/traceability')}
              className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:scale-105 transition-all"
            >
              <i className="ri-qr-scan-2-line text-2xl mb-2 block"></i>
              <div className="text-sm font-semibold">Truy xuất</div>
            </button>
            <button className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 rounded-xl hover:scale-105 transition-all">
              <i className="ri-file-text-line text-2xl mb-2 block"></i>
              <div className="text-sm font-semibold">Hợp đồng</div>
            </button>
            <button className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-4 rounded-xl hover:scale-105 transition-all">
              <i className="ri-customer-service-line text-2xl mb-2 block"></i>
              <div className="text-sm font-semibold">Hỗ trợ</div>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {[
              { id: 'order', label: 'Đặt hàng', icon: 'ri-shopping-cart-line' },
              { id: 'trace', label: 'Truy xuất', icon: 'ri-qr-scan-2-line' },
              { id: 'delivery', label: 'Giao nhận', icon: 'ri-truck-line' },
              { id: 'finance', label: 'Tài chính', icon: 'ri-money-dollar-circle-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 min-w-[120px] px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 text-center py-8">
              Chọn tab để xem chi tiết
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
