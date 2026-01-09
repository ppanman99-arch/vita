import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerProducer() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  const tasks = [
    { id: 1, title: 'Bón phân lô Quế A2', time: '07:00', status: 'pending', icon: 'ri-seedling-line', color: 'text-green-600' },
    { id: 2, title: 'Kiểm tra sâu bệnh', time: '09:30', status: 'pending', icon: 'ri-bug-line', color: 'text-orange-600' },
    { id: 3, title: 'Thu hoạch Cà Gai Leo', time: '14:00', status: 'pending', icon: 'ri-scissors-cut-line', color: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header với Thời tiết */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white px-4 py-4 sm:py-6 rounded-b-2xl sm:rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/member-hub')}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-lg sm:text-xl"></i>
          </button>
          <h1 className="text-base sm:text-lg md:text-xl font-bold truncate flex-1 text-center px-2">Quản trị Sản xuất</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-emerald-100 mb-0.5 sm:mb-1">Hôm nay, 10/01/2025</p>
              <p className="text-xl sm:text-2xl font-bold truncate">24°C Nắng nhẹ</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
              <i className="ri-sun-line text-3xl sm:text-4xl md:text-5xl text-yellow-300"></i>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="ri-drop-line text-blue-300 flex-shrink-0"></i>
              <span className="truncate">Độ ẩm: 75%</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="ri-rainy-line text-blue-300 flex-shrink-0"></i>
              <span className="truncate">Mưa: 20%</span>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/20">
            <p className="text-[10px] sm:text-xs text-emerald-100">
              <i className="ri-lightbulb-line mr-1"></i>
              Thời tiết thuận lợi cho việc bón phân. Nên hoàn thành trước 10h sáng.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`${isRecording ? 'bg-red-500' : 'bg-gradient-to-br from-emerald-500 to-green-600'} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className={`${isRecording ? 'ri-stop-circle-line animate-pulse' : 'ri-mic-line'} text-3xl`}></i>
            </div>
            <p className="font-bold text-sm">{isRecording ? 'Đang ghi...' : 'Ghi nhật ký'}</p>
            <p className="text-xs text-white/80 mt-1">Voice Input</p>
          </button>

          <button 
            onClick={() => navigate('/farmer/scan')}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="ri-qr-scan-line text-3xl"></i>
            </div>
            <p className="font-bold text-sm">Quét QR</p>
            <p className="text-xs text-white/80 mt-1">Scan Code</p>
          </button>

          <button 
            onClick={() => navigate('/farmer/farm')}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="ri-map-pin-line text-3xl"></i>
            </div>
            <p className="font-bold text-sm">Bản đồ</p>
            <p className="text-xs text-white/80 mt-1">Farm Map</p>
          </button>

          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="ri-wallet-3-line text-3xl"></i>
            </div>
            <p className="font-bold text-sm">Ví & Carbon</p>
            <p className="text-xs text-white/80 mt-1">Wallet</p>
          </button>
        </div>

        {/* Công việc hôm nay */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-task-line text-emerald-600"></i>
              Công việc hôm nay
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
              {tasks.length} việc
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <i className={`${task.icon} text-xl ${task.color}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <i className="ri-time-line mr-1"></i>
                      {task.time}
                    </p>
                  </div>
                  <button className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                    <i className="ri-check-line text-white"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3">
              <i className="ri-plant-line text-2xl text-white"></i>
            </div>
            <p className="text-sm text-gray-600 mb-1">Diện tích canh tác</p>
            <p className="text-2xl font-bold text-gray-800">2.5 ha</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
              <i className="ri-box-3-line text-2xl text-white"></i>
            </div>
            <p className="text-sm text-gray-600 mb-1">Sản lượng tháng này</p>
            <p className="text-2xl font-bold text-gray-800">450 kg</p>
          </div>
        </div>

        {/* Tín chỉ Carbon */}
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-5 text-white shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <i className="ri-leaf-line"></i>
              Tín chỉ Carbon
            </h3>
            <button className="text-sm text-emerald-100 hover:text-white transition-colors cursor-pointer">
              Chi tiết →
            </button>
          </div>
          <p className="text-3xl font-bold mb-1">1,250 tCO₂</p>
          <p className="text-sm text-emerald-100">Đã hấp thụ trong năm 2024</p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-emerald-100">
              <i className="ri-information-line mr-1"></i>
              Dữ liệu này được chia sẻ với các nhà đầu tư để minh bạch hóa hiệu quả môi trường
            </p>
          </div>
        </div>

        {/* Đăng bán nội bộ */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-store-2-line text-2xl text-white"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 mb-1">Đăng bán nội bộ</h4>
              <p className="text-sm text-gray-600 mb-3">Bạn có 120kg Cà Gai Leo sắp thu hoạch. Đăng bán cho xã viên khác với giá ưu đãi?</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap">
                Đăng bán ngay
              </button>
            </div>
          </div>
        </div>

        {/* Cộng đồng & Đào tạo */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="ri-graduation-cap-line text-blue-600"></i>
            Cộng đồng & Đào tạo
          </h3>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-video-line text-xl text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm mb-1">Video mới: Kỹ thuật bón phân hữu cơ</p>
                  <p className="text-xs text-gray-600">Chuyên gia Nguyễn Văn A • 15 phút</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-calendar-event-line text-xl text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm mb-1">Họp thành viên HTX</p>
                  <p className="text-xs text-gray-600">15/01/2025 • 14:00 • Hội trường HTX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/member-hub')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Hub</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-emerald-600 cursor-pointer">
            <i className="ri-plant-line text-2xl"></i>
            <span className="text-xs font-semibold">Sản xuất</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <i className="ri-team-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
