import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';

type TabType = 'overview' | 'subscriptions' | 'demand' | 'planning' | 'tasks';

export default function AdminSubscriptionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock data
  const stats = {
    totalSubscriptions: 523,
    activeSubscriptions: 487,
    weeklyRevenue: '12.5 tỷ',
    monthlyRevenue: '48.2 tỷ',
    consumers: 450,
    physicians: 37,
  };

  const subscriptions = [
    {
      id: 'SUB-001',
      customer: 'Chị Lan (Xã viên)',
      product: 'Combo Rau củ hữu cơ (5kg)',
      frequency: 'Hàng tuần',
      deliveryDay: 'Thứ 6',
      duration: '12 tháng',
      price: 350000,
      status: 'active',
      startDate: '2024-01-15',
      nextDelivery: '2024-11-29',
    },
    {
      id: 'SUB-002',
      customer: 'Bác sĩ Bình',
      product: 'Ba Kích tím (10kg) + Đương Quy (5kg)',
      frequency: 'Hàng tháng',
      deliveryDay: 'Ngày 15',
      duration: '6 tháng',
      price: 2500000,
      status: 'active',
      startDate: '2024-09-15',
      nextDelivery: '2024-11-15',
    },
    {
      id: 'SUB-003',
      customer: 'Chị Hoa (Xã viên)',
      product: 'Sâm tươi ngâm mật (1 hũ)',
      frequency: 'Hàng tháng',
      deliveryDay: 'Ngày 01',
      duration: '3 tháng',
      price: 500000,
      status: 'active',
      startDate: '2024-11-01',
      nextDelivery: '2024-12-01',
    },
  ];

  const weeklyDemand = {
    vegetables: { total: 2750, unit: 'kg', buffer: 275 },
    baKich: { total: 220, unit: 'kg', buffer: 22 },
    duongQuy: { total: 150, unit: 'kg', buffer: 15 },
    sam: { total: 45, unit: 'kg', buffer: 5 },
  };

  const harvestTasks = [
    {
      id: 'HARV-001',
      farmer: 'Bác A',
      product: 'Rau cải',
      quantity: 50,
      unit: 'kg',
      date: '2024-11-28',
      time: '08:00',
      location: 'Lô A2',
      status: 'pending',
    },
    {
      id: 'HARV-002',
      farmer: 'Bác B',
      product: 'Su hào',
      quantity: 30,
      unit: 'kg',
      date: '2024-11-28',
      time: '08:00',
      location: 'Lô B3',
      status: 'pending',
    },
    {
      id: 'HARV-003',
      farmer: 'Bác C',
      product: 'Ba Kích',
      quantity: 25,
      unit: 'kg',
      date: '2024-11-28',
      time: '08:00',
      location: 'Lô C1',
      status: 'pending',
    },
  ];

  const plantingTasks = [
    {
      id: 'PLANT-001',
      farmer: 'Bác E',
      product: 'Rau các loại',
      area: 0.5,
      unit: 'ha',
      deadline: '2024-12-05',
      reason: 'Đáp ứng nhu cầu tháng 3/2025',
      status: 'pending',
    },
    {
      id: 'PLANT-002',
      farmer: 'Bác F',
      product: 'Rau các loại',
      area: 0.5,
      unit: 'ha',
      deadline: '2024-12-05',
      reason: 'Đáp ứng nhu cầu tháng 3/2025',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Subscription Engine - Bộ máy Thuê bao" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
              { id: 'subscriptions', label: 'Gói Thuê bao', icon: 'ri-repeat-line' },
              { id: 'demand', label: 'Tổng hợp Nhu cầu', icon: 'ri-bar-chart-line' },
              { id: 'planning', label: 'Quy hoạch Ngược', icon: 'ri-calendar-todo-line' },
              { id: 'tasks', label: 'Phân Việc', icon: 'ri-task-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
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
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-repeat-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Tổng</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.totalSubscriptions}</p>
                  <p className="text-xs opacity-90">Gói thuê bao</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-checkbox-circle-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Hoạt động</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.activeSubscriptions}</p>
                  <p className="text-xs opacity-90">Đang hoạt động</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-money-dollar-circle-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Tuần</span>
                  </div>
                  <p className="text-xl font-bold mb-1">{stats.weeklyRevenue}</p>
                  <p className="text-xs opacity-90">Doanh thu</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-calendar-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Tháng</span>
                  </div>
                  <p className="text-xl font-bold mb-1">{stats.monthlyRevenue}</p>
                  <p className="text-xs opacity-90">Doanh thu</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-user-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Xã viên</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.consumers}</p>
                  <p className="text-xs opacity-90">Tiêu dùng</p>
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <i className="ri-stethoscope-line text-2xl opacity-80"></i>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Bác sĩ</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.physicians}</p>
                  <p className="text-xs opacity-90">Đặt hàng</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Gói mới đăng ký', customer: 'Chị Hoa', product: 'Sâm tươi ngâm mật', time: '2 giờ trước' },
                    { action: 'Giao hàng thành công', customer: 'Chị Lan', product: 'Combo Rau củ', time: '5 giờ trước' },
                    { action: 'Tự động trừ tiền', customer: 'Bác sĩ Bình', amount: '2.5 triệu', time: '1 ngày trước' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i className="ri-notification-line text-indigo-600"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          {activity.customer} - {activity.product || activity.amount}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Danh sách Gói Thuê bao</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                    <i className="ri-add-line mr-2"></i>
                    Tạo gói mới
                  </button>
                </div>
                <div className="space-y-3">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{sub.customer}</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {sub.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{sub.product}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="ri-repeat-line"></i>
                              {sub.frequency}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              {sub.deliveryDay}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-time-line"></i>
                              {sub.duration}
                            </span>
                            <span className="text-indigo-600 font-semibold">
                              {sub.price.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Giao tiếp theo: <span className="font-medium text-gray-900">{sub.nextDelivery}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                          <i className="ri-pencil-line mr-2"></i>
                          Chỉnh sửa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Demand Aggregator Tab */}
          {activeTab === 'demand' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Tổng hợp Nhu cầu Tuần này</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i className="ri-seedling-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Rau củ</h4>
                        <p className="text-xs text-gray-600">Từ 500 gói tuần</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {weeklyDemand.vegetables.total} {weeklyDemand.vegetables.unit}
                    </div>
                    <div className="text-xs text-gray-600">
                      + {weeklyDemand.vegetables.buffer} {weeklyDemand.vegetables.unit} dự phòng (10%)
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i className="ri-medicine-bottle-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Ba Kích</h4>
                        <p className="text-xs text-gray-600">Từ 20 bác sĩ</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {weeklyDemand.baKich.total} {weeklyDemand.baKich.unit}
                    </div>
                    <div className="text-xs text-gray-600">
                      + {weeklyDemand.baKich.buffer} {weeklyDemand.baKich.unit} dự phòng (10%)
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <i className="ri-plant-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Đương Quy</h4>
                        <p className="text-xs text-gray-600">Từ 20 bác sĩ</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {weeklyDemand.duongQuy.total} {weeklyDemand.duongQuy.unit}
                    </div>
                    <div className="text-xs text-gray-600">
                      + {weeklyDemand.duongQuy.buffer} {weeklyDemand.duongQuy.unit} dự phòng (10%)
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <i className="ri-heart-pulse-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Sâm</h4>
                        <p className="text-xs text-gray-600">Từ 45 gói tháng</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {weeklyDemand.sam.total} {weeklyDemand.sam.unit}
                    </div>
                    <div className="text-xs text-gray-600">
                      + {weeklyDemand.sam.buffer} {weeklyDemand.sam.unit} dự phòng (10%)
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-lightbulb-line text-indigo-600"></i>
                    <h4 className="font-semibold text-gray-900">Tổng Lệnh Sản xuất Tuần này</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>2.750 kg Rau</strong> + <strong>220 kg Ba Kích</strong> + <strong>150 kg Đương Quy</strong> + <strong>45 kg Sâm</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Đã tự động cộng thêm 10% dự phòng cho khách mua lẻ vãng lai
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reverse Planning Tab */}
          {activeTab === 'planning' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quy hoạch Ngược - Lịch Xuống giống</h3>
                <div className="space-y-4">
                  {[
                    {
                      targetMonth: 'Tháng 3/2025',
                      product: 'Rau các loại',
                      requiredQuantity: 2500,
                      unit: 'kg',
                      plantingDate: 'Tháng 12/2024',
                      area: 2,
                      areaUnit: 'ha',
                      farmers: ['Bác E', 'Bác F'],
                    },
                    {
                      targetMonth: 'Tháng 6/2025',
                      product: 'Ba Kích',
                      requiredQuantity: 500,
                      unit: 'kg',
                      plantingDate: 'Tháng 1/2025',
                      area: 1,
                      areaUnit: 'ha',
                      farmers: ['Bác G', 'Bác H'],
                    },
                  ].map((plan, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Để có {plan.requiredQuantity} {plan.unit} {plan.product} vào {plan.targetMonth}
                          </h4>
                          <p className="text-sm text-gray-600">
                            → Cần xuống giống vào <strong>{plan.plantingDate}</strong>
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                          {plan.area} {plan.areaUnit}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Phân bổ:</span>
                        {plan.farmers.map((farmer, fIdx) => (
                          <span key={fIdx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {farmer}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Harvest Tasks */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Nhiệm vụ Thu hoạch (Tuần này)</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                    {harvestTasks.length} nhiệm vụ
                  </span>
                </div>
                <div className="space-y-3">
                  {harvestTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{task.farmer}</h4>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                              {task.status === 'pending' ? 'Chờ thực hiện' : 'Đã hoàn thành'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Thu hoạch <strong>{task.quantity} {task.unit}</strong> {task.product}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              {task.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-time-line"></i>
                              {task.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-map-pin-line"></i>
                              {task.location}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          <i className="ri-check-line mr-2"></i>
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planting Tasks */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Nhiệm vụ Xuống giống (Dài hạn)</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                    {plantingTasks.length} nhiệm vụ
                  </span>
                </div>
                <div className="space-y-3">
                  {plantingTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{task.farmer}</h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {task.status === 'pending' ? 'Chờ thực hiện' : 'Đã hoàn thành'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Trồng <strong>{task.area} {task.unit}</strong> {task.product}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              Hạn: {task.deadline}
                            </span>
                          </div>
                          <p className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded">
                            <i className="ri-information-line mr-1"></i>
                            {task.reason}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                          <i className="ri-check-line mr-2"></i>
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



