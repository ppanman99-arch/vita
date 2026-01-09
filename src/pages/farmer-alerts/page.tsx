import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerAlertsPage() {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Cảnh báo sâu bệnh',
      message: 'Phát hiện dấu hiệu sâu đục thân tại Lô B2. Cần kiểm tra và xử lý ngay.',
      time: '2 giờ trước',
      icon: 'ri-bug-line',
      color: 'red',
      unread: true,
    },
    {
      id: 2,
      type: 'task',
      title: 'Lịch phun thuốc sinh học',
      message: 'Hôm nay 14:00 - Phun thuốc sinh học tại Lô C1. Đã chuẩn bị dung dịch.',
      time: '3 giờ trước',
      icon: 'ri-flask-line',
      color: 'blue',
      unread: true,
    },
    {
      id: 3,
      type: 'payment',
      title: 'Thanh toán thành công',
      message: 'Đã nhận 8.750.000đ cho lô Cà Gai Leo tháng 12/2023.',
      time: '1 ngày trước',
      icon: 'ri-money-dollar-circle-line',
      color: 'green',
      unread: false,
    },
    {
      id: 4,
      type: 'weather',
      title: 'Dự báo thời tiết',
      message: 'Mưa lớn trong 2 ngày tới. Hoãn việc thu hoạch và bón phân.',
      time: '1 ngày trước',
      icon: 'ri-rainy-line',
      color: 'yellow',
      unread: false,
    },
    {
      id: 5,
      type: 'info',
      title: 'Thông báo từ HTX',
      message: 'Họp thành viên vào 20/01/2024 lúc 8:00 tại trụ sở HTX.',
      time: '2 ngày trước',
      icon: 'ri-notification-3-line',
      color: 'purple',
      unread: false,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Thông báo & Cảnh báo</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Quick Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium whitespace-nowrap flex-shrink-0">
            Tất cả
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
            Chưa đọc
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
            Cảnh báo
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 whitespace-nowrap flex-shrink-0">
            Công việc
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const colorClasses = getColorClasses(alert.color);
            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden ${
                  alert.unread ? 'border-2 border-green-200' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${alert.icon} text-2xl ${colorClasses.text}`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{alert.title}</h3>
                        {alert.unread && (
                          <span className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-time-line"></i>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {alert.type === 'warning' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      <button className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors">
                        Xem chi tiết
                      </button>
                      <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                        Đánh dấu đã đọc
                      </button>
                    </div>
                  )}

                  {alert.type === 'task' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                        Xác nhận hoàn thành
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <i className="ri-user-3-line text-2xl"></i>
            <span className="text-xs font-medium">Cá nhân</span>
          </button>
        </div>
      </div>
    </div>
  );
}
