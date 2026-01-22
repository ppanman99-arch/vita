import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';
import BackButton from '../../components/shared/BackButton';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { earnPoints } from '../../lib/greenPoints/service';

export default function FarmerDashboardPage() {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'worklog' | 'salary' | 'profile'>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tasks from Subscription Engine (từ hệ thống đặt hàng định kỳ)
  const subscriptionHarvestTasks = [
    { 
      id: 'SUB-HARV-001', 
      time: '08:00', 
      task: 'Thu hoạch Rau cải', 
      quantity: 50, 
      unit: 'kg',
      location: 'Lô A2',
      date: '2024-11-28',
      status: 'pending', 
      icon: 'ri-scissors-cut-line', 
      type: 'harvest',
      source: 'subscription',
      deliveryTo: 'Kho HTX',
      note: 'Đơn hàng gói định kỳ - Giao Thứ 6'
    },
    { 
      id: 'SUB-HARV-002', 
      time: '08:00', 
      task: 'Thu hoạch Su hào', 
      quantity: 30, 
      unit: 'kg',
      location: 'Lô B3',
      date: '2024-11-28',
      status: 'pending', 
      icon: 'ri-scissors-cut-line', 
      type: 'harvest',
      source: 'subscription',
      deliveryTo: 'Kho HTX',
      note: 'Đơn hàng gói định kỳ - Giao Thứ 6'
    },
  ];

  const subscriptionPlantingTasks = [
    {
      id: 'SUB-PLANT-001',
      task: 'Xuống giống Rau các loại',
      area: 0.5,
      unit: 'ha',
      deadline: '2024-12-05',
      location: 'Lô E1',
      status: 'pending',
      icon: 'ri-seedling-line',
      type: 'planting',
      source: 'subscription',
      reason: 'Đáp ứng nhu cầu tháng 3/2025',
      priority: 'high'
    },
  ];

  // Regular tasks (công việc thường ngày)
  const regularTasks = [
    { id: 1, time: '07:00', task: 'Bón phân lô Quế A2', status: 'pending', icon: 'ri-plant-line', type: 'fertilize' },
    { id: 2, time: '09:30', task: 'Kiểm tra sâu bệnh lô Đinh Lăng B', status: 'pending', icon: 'ri-bug-line', type: 'inspect' },
  ];

  // Combine all tasks
  const todayTasks = [...subscriptionHarvestTasks, ...regularTasks];

  const weather = {
    temp: 24,
    condition: 'Nắng nhẹ',
    humidity: 75,
    rain: 20,
    icon: 'ri-sun-line',
    advice: 'Thời tiết tốt để bón phân và phun thuốc'
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 truncate">Xin chào, Anh Minh</h1>
              <p className="text-green-100 text-xs sm:text-sm md:text-base truncate">Thứ Hai, {currentTime.toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <GreenPointsBadge className="hidden sm:flex" />
            <RoleSwitcher />
            {/* Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              >
                <i className="ri-menu-line"></i>
                <span className="hidden sm:inline">Menu</span>
              </button>
              
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                      {[
                        { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
                        { id: 'tasks', label: 'Công việc', icon: 'ri-task-line' },
                        { id: 'worklog', label: 'Nhật ký', icon: 'ri-file-list-3-line' },
                        { id: 'salary', label: 'Lương thưởng', icon: 'ri-money-dollar-circle-line' },
                        { id: 'profile', label: 'Hồ sơ', icon: 'ri-user-line' },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            activeTab === tab.id
                              ? 'bg-green-50 text-green-600 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <i className={tab.icon}></i>
                          <span>{tab.label}</span>
                          {activeTab === tab.id && (
                            <i className="ri-check-line ml-auto text-green-600"></i>
                          )}
                        </button>
                      ))}
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          navigate('/farmer/service');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-service-line"></i>
                        <span>Dịch vụ</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/home');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-logout-box-line"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mode Switcher Banner */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100 mb-1">Chế độ hiện tại</p>
              <p className="text-lg font-bold">Nông trại</p>
            </div>
            <button
              onClick={() => navigate('/farmer/service')}
              className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all"
            >
              <i className="ri-arrow-left-right-line mr-2"></i>
              Chuyển sang Dịch vụ
            </button>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3 flex-wrap">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <i className={`${weather.icon} text-3xl sm:text-4xl md:text-5xl`}></i>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-0.5 sm:mb-1">{weather.temp}°C</div>
                <div className="text-green-100 text-xs sm:text-sm md:text-base">{weather.condition}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <i className="ri-drop-line text-base sm:text-lg md:text-xl"></i>
                <span className="text-xs sm:text-sm md:text-base">Độ ẩm: {weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <i className="ri-rainy-line text-base sm:text-lg md:text-xl"></i>
                <span className="text-xs sm:text-sm md:text-base">Mưa: {weather.rain}%</span>
              </div>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <i className="ri-lightbulb-line text-lg sm:text-xl md:text-2xl flex-shrink-0"></i>
            <span className="text-xs sm:text-sm md:text-base">{weather.advice}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-6">
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <>
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/farmer/diary')}
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-mic-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">Ghi nhật ký</div>
              <div className="text-base text-green-100">Bấm để nói</div>
            </button>

            <button
              onClick={() => navigate('/farmer/scan')}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-qr-scan-2-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">Quét QR</div>
              <div className="text-base text-blue-100">Truy xuất cây</div>
            </button>

            <button
              onClick={() => navigate('/vita-supply')}
              className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-shopping-cart-2-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">VITA Supply</div>
              <div className="text-base text-orange-100">Mua vật tư</div>
            </button>

            <button
              onClick={() => navigate('/farmer/farm')}
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-map-2-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">Nông trại</div>
              <div className="text-base text-purple-100">Bản đồ lô</div>
            </button>

            <button
              onClick={() => navigate('/farmer/forestry')}
              className="bg-gradient-to-br from-lime-500 to-green-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-tree-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">Rừng Giao Khoán</div>
              <div className="text-base text-lime-100">Chăm sóc cây gỗ</div>
            </button>

            <button
              onClick={() => navigate('/farmer/wallet')}
              className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <i className="ri-wallet-3-line text-4xl"></i>
              </div>
              <div className="text-xl font-bold mb-1">Ví & Carbon</div>
              <div className="text-base text-orange-100">Thu nhập</div>
            </button>
          </div>
        </div>

        {/* Task Center - Trung tâm Nhiệm vụ */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <i className="ri-task-line text-white text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trung tâm Nhiệm vụ</h2>
                <p className="text-sm text-gray-600">Lệnh sản xuất từ HTX - Tuân thủ quy trình VITA Lâm sinh</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              <i className="ri-file-list-3-line mr-2"></i>
              Xem quy trình
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-4 mb-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <i className="ri-information-line text-blue-600 text-xl flex-shrink-0 mt-0.5"></i>
              <div className="text-sm text-gray-700">
                <strong>Lệnh sản xuất chuẩn hóa:</strong> Thay vì làm việc theo kinh nghiệm cảm tính, 
                bạn làm việc theo "Lệnh sản xuất" được chuẩn hóa từ HTX, đảm bảo tuân thủ quy trình VITA Lâm sinh. 
                Mỗi nhiệm vụ đều có hướng dẫn chi tiết và tiêu chuẩn chất lượng rõ ràng.
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Harvest Tasks - Nhiệm vụ Thu hoạch từ Gói định kỳ */}
        {subscriptionHarvestTasks.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-indigo-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <i className="ri-repeat-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lệnh sản xuất: Thu hoạch</h2>
                  <p className="text-sm text-gray-600">Từ Gói định kỳ - Tuần này</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {subscriptionHarvestTasks.length} việc
              </span>
            </div>

            <div className="space-y-4">
              {subscriptionHarvestTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl p-5 border border-indigo-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${task.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-bold text-gray-900 text-lg">{task.task}</div>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                          Gói định kỳ
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <i className="ri-scales-3-line text-indigo-600"></i>
                          <span><strong>{task.quantity} {task.unit}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-map-pin-line text-indigo-600"></i>
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-time-line text-indigo-600"></i>
                          <span>{task.date} lúc {task.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-truck-line text-indigo-600"></i>
                          <span>Giao đến: {task.deliveryTo}</span>
                        </div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-2 text-xs text-indigo-700 mb-2">
                        <i className="ri-information-line mr-1"></i>
                        {task.note}
                      </div>
                      {/* Quy trình VITA Lâm sinh */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-file-list-3-line text-green-600"></i>
                          <span className="text-xs font-semibold text-green-700">Quy trình VITA Lâm sinh:</span>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-700">
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Thu hoạch đúng độ chín (kiểm tra màu sắc, độ cứng)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Chụp ảnh xác thực tại hiện trường (GPS + timestamp)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Bảo quản trong thùng chuyên dụng, giao đến kho HTX trong 2 giờ</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all cursor-pointer">
                        <i className="ri-check-line text-2xl"></i>
                      </button>
                      <button className="w-12 h-12 bg-white border-2 border-indigo-300 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-50 transition-all cursor-pointer" title="Xem chi tiết quy trình">
                        <i className="ri-file-list-3-line text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscription Planting Tasks - Nhiệm vụ Xuống giống */}
        {subscriptionPlantingTasks.length > 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-amber-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <i className="ri-calendar-todo-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lệnh sản xuất: Xuống giống</h2>
                  <p className="text-sm text-gray-600">Quy hoạch dài hạn - Đáp ứng đơn hàng tương lai</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                {subscriptionPlantingTasks.length} việc
              </span>
            </div>

            <div className="space-y-4">
              {subscriptionPlantingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl p-5 border border-amber-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className={`${task.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-bold text-gray-900 text-lg">{task.task}</div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                          {task.priority === 'high' ? 'Ưu tiên cao' : 'Bình thường'}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <i className="ri-ruler-line text-amber-600"></i>
                          <span>Diện tích: <strong>{task.area} {task.unit}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-map-pin-line text-amber-600"></i>
                          <span>Vị trí: {task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-calendar-line text-amber-600"></i>
                          <span>Hạn hoàn thành: <strong>{task.deadline}</strong></span>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2 text-xs text-amber-700 mb-2">
                        <i className="ri-lightbulb-line mr-1"></i>
                        {task.reason}
                      </div>
                      {/* Quy trình VITA Lâm sinh */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-file-list-3-line text-green-600"></i>
                          <span className="text-xs font-semibold text-green-700">Quy trình VITA Lâm sinh:</span>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-700">
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Chuẩn bị đất: Làm sạch cỏ, đào hố theo kích thước chuẩn (40x40x40cm)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Bón lót phân hữu cơ (5kg/hố) trước khi trồng 7 ngày</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                            <span>Khoảng cách trồng: 1.5m x 1.5m, chụp ảnh GPS xác thực</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all cursor-pointer">
                        <i className="ri-check-line text-2xl"></i>
                      </button>
                      <button className="w-12 h-12 bg-white border-2 border-amber-300 text-amber-600 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-all cursor-pointer" title="Xem chi tiết quy trình">
                        <i className="ri-file-list-3-line text-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mixed Task Timeline - Lịch trình Hợp nhất */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lịch trình Hôm nay</h2>
              <p className="text-sm text-gray-600 mt-1">Nông nghiệp + Dịch vụ</p>
            </div>
            <span className="text-base text-gray-500">{todayTasks.length} việc</span>
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => {
              const isAgriculture = task.type === 'agriculture' || !task.source;
              const isService = task.source === 'subscription' && task.type === 'service';
              
              return (
                <div
                  key={task.id}
                  className={`border-l-4 rounded-lg p-4 ${
                    isAgriculture
                      ? 'bg-green-50 border-green-500'
                      : 'bg-orange-50 border-orange-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isAgriculture ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                      <i className={`${
                        isAgriculture ? 'ri-plant-line' : 'ri-service-line'
                      } text-white text-2xl`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{task.task}</h3>
                        {isService && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                            Dịch vụ
                          </span>
                        )}
                        {isAgriculture && task.source === 'subscription' && (
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                            Gói định kỳ
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <i className="ri-time-line"></i>
                          <span>{task.time}</span>
                          {task.endTime && <span> - {task.endTime}</span>}
                        </div>
                        {task.location && (
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>{task.location}</span>
                          </div>
                        )}
                        {task.quantity && (
                          <div className="flex items-center gap-2">
                            <i className="ri-scales-3-line"></i>
                            <span><strong>{task.quantity} {task.unit}</strong></span>
                          </div>
                        )}
                        {isService && (
                          <div className="mt-2 text-xs bg-orange-100 text-orange-700 p-2 rounded">
                            <i className="ri-information-line mr-1"></i>
                            {task.note || 'Check-in đón khách tại Cổng, Check-out khi kết thúc'}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isAgriculture
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}>
                      <i className="ri-check-line text-2xl"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Rating & Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Đánh giá & Tip</h2>
              <p className="text-sm text-gray-600 mt-1">Từ khách hàng dịch vụ</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">500.000 đ</div>
              <div className="text-sm text-gray-600">Tổng tip tháng này</div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { service: 'Dẫn tour tham quan vườn Sâm', customer: 'Anh Minh', rating: 5, tip: 50000, date: '24/11' },
              { service: 'Dọn buồng phòng Bungalow 3', customer: 'Chị Lan', rating: 5, tip: 30000, date: '23/11' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.service}</p>
                    <p className="text-xs text-gray-600">Khách: {item.customer} • {item.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`ri-star-${star <= item.rating ? 'fill' : 'line'} text-yellow-500 text-sm`}></i>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-green-600">+{item.tip.toLocaleString('vi-VN')} đ</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-qr-code-line text-3xl text-gray-400"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">Mã QR của bạn</p>
                <p className="text-xs text-gray-600">Khách quét để chấm điểm và gửi tip</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">
                Xem QR
              </button>
            </div>
          </div>
        </div>

        {/* Mixed Task Timeline - Lịch trình Hợp nhất (Nông nghiệp + Dịch vụ) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lịch trình Hôm nay</h2>
              <p className="text-sm text-gray-600 mt-1">Nông nghiệp + Dịch vụ</p>
            </div>
            <span className="text-base text-gray-500">{todayTasks.length} việc</span>
          </div>

          <div className="space-y-3">
            {/* 06:00 - 08:00: Agriculture Task */}
            <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-plant-line text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Tưới nước vườn ươm</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Nông nghiệp</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      <span>06:00 - 08:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-map-pin-line"></i>
                      <span>Vườn ươm A</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-green-100 text-green-700 p-2 rounded">
                    <i className="ri-camera-line mr-1"></i>
                    Check-in tại vườn, chụp ảnh tưới cây
                  </div>
                </div>
                <button className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer">
                  <i className="ri-check-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* 08:00 - 09:00: Break */}
            <div className="text-center py-2 text-sm text-gray-400">
              <i className="ri-restaurant-line mr-2"></i>
              Nghỉ ngơi / Ăn sáng
            </div>

            {/* 09:00 - 11:00: Service Task */}
            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-service-line text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Dẫn đoàn khách 5 người tham quan vườn Sâm</h3>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">Dịch vụ</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      <span>09:00 - 11:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-map-pin-line"></i>
                      <span>Cổng vào</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-group-line"></i>
                      <span>5 khách</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-orange-100 text-orange-700 p-2 rounded">
                    <i className="ri-login-box-line mr-1"></i>
                    Check-in đón khách tại Cổng, Check-out khi kết thúc tour
                  </div>
                </div>
                <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer">
                  <i className="ri-check-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* 14:00 - 16:00: Service Task */}
            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-service-line text-white text-2xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Dọn dẹp Bungalow số 3</h3>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">Dịch vụ</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      <span>14:00 - 16:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-map-pin-line"></i>
                      <span>Bungalow 3</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs bg-orange-100 text-orange-700 p-2 rounded">
                    <i className="ri-camera-line mr-1"></i>
                    Chụp ảnh phòng sạch sẽ sau khi dọn (quy trình khách sạn 5 sao)
                  </div>
                </div>
                <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer">
                  <i className="ri-check-line text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Rating & Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Đánh giá & Tip</h2>
              <p className="text-sm text-gray-600 mt-1">Từ khách hàng dịch vụ</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">500.000 đ</div>
              <div className="text-sm text-gray-600">Tổng tip tháng này</div>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            {[
              { service: 'Dẫn tour tham quan vườn Sâm', customer: 'Anh Minh', rating: 5, tip: 50000, date: '24/11', comment: 'Bác A kể chuyện rừng rất hay' },
              { service: 'Dọn buồng phòng Bungalow 3', customer: 'Chị Lan', rating: 5, tip: 30000, date: '23/11', comment: 'Phòng rất sạch sẽ, chị B rất cẩn thận' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-yellow-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.service}</p>
                    <p className="text-xs text-gray-600">Khách: {item.customer} • {item.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`ri-star-${star <= item.rating ? 'fill' : 'line'} text-yellow-500 text-sm`}></i>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-green-600">+{item.tip.toLocaleString('vi-VN')} đ</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-2 text-xs text-gray-700">
                  <i className="ri-message-3-line mr-1"></i>
                  "{item.comment}"
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-qr-code-line text-3xl text-gray-400"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">Mã QR của bạn</p>
                <p className="text-xs text-gray-600">Khách quét để chấm điểm và gửi tip</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">
                Xem QR
              </button>
            </div>
          </div>
        </div>

        {/* Consolidated Earnings */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white mb-6">
          <h3 className="text-lg font-bold mb-4">Thu nhập Tổng hợp - Tháng 11/2024</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-plant-line text-xl"></i>
                <span>Lương Sản xuất</span>
              </div>
              <span className="text-xl font-bold">5.000.000 đ</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-service-line text-xl"></i>
                <span>Lương Dịch vụ</span>
              </div>
              <span className="text-xl font-bold">3.000.000 đ</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="ri-money-dollar-circle-line text-xl"></i>
                <span>Tiền Tip</span>
              </div>
              <span className="text-xl font-bold">500.000 đ</span>
            </div>
            <div className="border-t border-white/30 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Tổng thu nhập</span>
                <span className="text-3xl font-bold">8.500.000 đ</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="w-full mt-4 px-4 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
          >
            <i className="ri-wallet-3-line mr-2"></i>
            Xem chi tiết trong Ví
          </button>
        </div>

        {/* Today's Regular Tasks */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Công việc thường ngày</h2>
            <span className="text-base text-gray-500">{regularTasks.length} việc</span>
          </div>

          <div className="space-y-4">
            {regularTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${task.icon} text-3xl text-green-600`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 mb-1 text-lg">{task.task}</div>
                  <div className="text-base text-gray-500 flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    <span>{task.time}</span>
                  </div>
                </div>
                <button className="w-12 h-12 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors flex-shrink-0 cursor-pointer">
                  <i className="ri-check-line text-2xl text-gray-400"></i>
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/farmer/diary')}
            className="w-full mt-5 py-4 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-colors cursor-pointer whitespace-nowrap text-lg"
          >
            + Thêm công việc mới
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <i className="ri-plant-line text-3xl text-green-600"></i>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">2.5 ha</div>
            <div className="text-base text-gray-600">Diện tích quản lý</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <i className="ri-box-3-line text-3xl text-blue-600"></i>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">450 kg</div>
            <div className="text-base text-gray-600">Sản lượng tháng này</div>
          </div>
        </div>

        {/* Carbon Credit Card */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-base text-teal-100 mb-2">Tín chỉ Carbon</div>
              <div className="text-4xl font-bold">1,250 tCO₂</div>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <i className="ri-leaf-line text-5xl"></i>
            </div>
          </div>
          <div className="text-base text-teal-100">
            Rừng của bạn đã hấp thụ 1.25 tấn CO₂ trong tháng này 🌱
          </div>
        </div>

        {/* Community & Training */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Cộng đồng & Đào tạo</h2>
            <button className="text-green-600 text-base font-medium cursor-pointer">Xem tất cả</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl cursor-pointer hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-video-line text-3xl text-green-600"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1 text-lg">Kỹ thuật bón phân hữu cơ</div>
                <div className="text-base text-gray-500">Video 5 phút • HTX Dược Liệu</div>
              </div>
              <i className="ri-play-circle-fill text-4xl text-green-600"></i>
            </div>

            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl cursor-pointer hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-notification-3-line text-3xl text-blue-600"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 mb-1 text-lg">Họp thành viên HTX</div>
                <div className="text-base text-gray-500">20/01/2024 • 8:00 sáng</div>
              </div>
              <i className="ri-arrow-right-s-line text-3xl text-gray-400"></i>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Tab: Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Convert existing tasks to CoopWorker format */}
            {[
              ...subscriptionHarvestTasks.map(t => ({
                id: t.id,
                title: t.task,
                description: `${t.quantity} ${t.unit} tại ${t.location}`,
                status: t.status === 'pending' ? 'pending' : 'in-progress',
                dueDate: t.date,
                priority: 'high',
                progress: t.status === 'pending' ? 0 : 60
              })),
              ...subscriptionPlantingTasks.map(t => ({
                id: t.id,
                title: t.task,
                description: `${t.area} ${t.unit} tại ${t.location}`,
                status: t.status === 'pending' ? 'pending' : 'in-progress',
                dueDate: t.deadline,
                priority: t.priority || 'medium',
                progress: 0
              })),
              ...regularTasks.map(t => ({
                id: t.id,
                title: t.task,
                description: `Công việc định kỳ - ${t.time}`,
                status: t.status === 'pending' ? 'pending' : 'in-progress',
                dueDate: currentTime.toLocaleDateString('vi-VN'),
                priority: 'medium',
                progress: 0
              }))
            ].map(task => (
              <div key={task.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span><i className="ri-calendar-line mr-1"></i>Hạn: {task.dueDate}</span>
                      <span className={task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}>
                        <i className="ri-flag-line mr-1"></i>
                        {task.priority === 'high' ? 'Ưu tiên cao' : task.priority === 'medium' ? 'Ưu tiên trung bình' : 'Ưu tiên thấp'}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.status === 'completed' ? 'Hoàn thành' : task.status === 'in-progress' ? 'Đang làm' : 'Chờ'}
                  </span>
                </div>
                {task.progress > 0 && task.progress < 100 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {task.status !== 'completed' && (
                  <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                    {task.status === 'in-progress' ? 'Tiếp tục' : 'Bắt đầu'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab: Worklog */}
        {activeTab === 'worklog' && (
          <div className="space-y-4">
            {[
              {
                id: 1,
                date: currentTime.toLocaleDateString('vi-VN'),
                tasks: subscriptionHarvestTasks.map(t => t.task),
                hours: 8,
                status: 'completed'
              },
              {
                id: 2,
                date: new Date(currentTime.getTime() - 86400000).toLocaleDateString('vi-VN'),
                tasks: regularTasks.map(t => t.task),
                hours: 7.5,
                status: 'completed'
              }
            ].map(log => (
              <div key={log.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{log.date}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Hoàn thành
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  {log.tasks.map((taskName, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-green-500"></i>
                      {taskName}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-time-line"></i>
                  <span>Tổng thời gian: {log.hours} giờ</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Salary */}
        {activeTab === 'salary' && (
          <div className="space-y-6">
            {/* Current Month */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm text-white/80 mb-2">Lương tháng này</p>
              <p className="text-3xl font-bold mb-2">8.5 triệu VNĐ</p>
              <p className="text-xs text-white/80">Dự kiến cuối tháng: 9.0 triệu</p>
            </div>

            {/* Salary Details */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Chi tiết Lương</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Lương cơ bản</span>
                  <span className="font-semibold text-gray-900">6.0 triệu</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Thưởng năng suất</span>
                  <span className="font-semibold text-emerald-600">2.5 triệu</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
                  <span className="text-sm font-semibold text-green-700">Tổng</span>
                  <span className="text-lg font-bold text-green-600">8.5 triệu</span>
                </div>
              </div>
            </div>

            {/* Last Month */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tháng trước</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tổng lương tháng 12/2024</span>
                <span className="text-xl font-bold text-gray-900">7.8 triệu VNĐ</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Thông tin Cá nhân</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value="Anh Minh"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0901234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    placeholder="Xã, Huyện, Tỉnh"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <i className="ri-save-line mr-2"></i>
                Lưu thay đổi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-green-600 cursor-pointer">
            <i className="ri-home-5-line text-3xl"></i>
            <span className="text-sm font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-book-2-line text-3xl"></i>
            <span className="text-sm font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/farm')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-map-2-line text-3xl"></i>
            <span className="text-sm font-medium">Nông trại</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-3xl"></i>
            <span className="text-sm font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-3xl"></i>
            <span className="text-sm font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
