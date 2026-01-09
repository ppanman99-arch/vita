import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';
import BackButton from '../../components/shared/BackButton';

export default function FarmerDashboardPage() {
  const navigate = useNavigate();
  const [currentTime] = useState(new Date());

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
            <button
              onClick={() => navigate('/farmer/service')}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all"
            >
              <i className="ri-service-line mr-2"></i>
              Dịch vụ
            </button>
            <RoleSwitcher />
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

        {/* Subscription Harvest Tasks - Nhiệm vụ Thu hoạch từ Gói định kỳ */}
        {subscriptionHarvestTasks.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 mb-6 border-2 border-indigo-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <i className="ri-repeat-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Nhiệm vụ Thu hoạch</h2>
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
                      <div className="bg-indigo-50 rounded-lg p-2 text-xs text-indigo-700">
                        <i className="ri-information-line mr-1"></i>
                        {task.note}
                      </div>
                    </div>
                    <button className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all flex-shrink-0 cursor-pointer">
                      <i className="ri-check-line text-2xl"></i>
                    </button>
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
                  <h2 className="text-2xl font-bold text-gray-900">Nhiệm vụ Xuống giống</h2>
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
                      <div className="bg-amber-50 rounded-lg p-2 text-xs text-amber-700">
                        <i className="ri-lightbulb-line mr-1"></i>
                        {task.reason}
                      </div>
                    </div>
                    <button className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all flex-shrink-0 cursor-pointer">
                      <i className="ri-check-line text-2xl"></i>
                    </button>
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
