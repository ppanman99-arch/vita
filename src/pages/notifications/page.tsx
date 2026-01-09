import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/feature/BottomNav';

export default function Notifications() {
  const navigate = useNavigate();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const notifications = [
    {
      id: 1,
      type: 'emergency',
      title: 'Cảnh báo sâu bệnh',
      message: 'Phát hiện sâu đục thân tại vườn hàng xóm. Kiểm tra ngay vườn của bạn!',
      time: '5 phút trước',
      icon: 'ri-bug-line',
      color: 'bg-red-500',
      read: false
    },
    {
      id: 2,
      type: 'weather',
      title: 'Cảnh báo thời tiết',
      message: 'Dự báo mưa lớn trong 2 ngày tới. Chuẩn bị biện pháp thoát nước.',
      time: '1 giờ trước',
      icon: 'ri-rainy-line',
      color: 'bg-orange-500',
      read: false
    },
    {
      id: 3,
      type: 'task',
      title: 'Nhắc nhở công việc',
      message: 'Đã đến giờ bón phân đợt 1. Nhấn để xem chi tiết.',
      time: '2 giờ trước',
      icon: 'ri-plant-line',
      color: 'bg-green-500',
      read: false
    },
    {
      id: 4,
      type: 'payment',
      title: 'Thanh toán thành công',
      message: 'Bạn đã nhận được 5.000.000đ từ việc bán lô quýt #QS123',
      time: '1 ngày trước',
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-blue-500',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Thông báo từ HTX',
      message: 'Lớp tập huấn kỹ thuật canh tác hữu cơ sẽ được tổ chức vào 20/01/2025',
      time: '2 ngày trước',
      icon: 'ri-information-line',
      color: 'bg-purple-500',
      read: true
    },
    {
      id: 6,
      type: 'supply',
      title: 'Vật tư đã được cấp',
      message: 'Phân hữu cơ 20kg đã được cấp phát. Vui lòng kiểm tra kho.',
      time: '3 ngày trước',
      icon: 'ri-shopping-cart-line',
      color: 'bg-teal-500',
      read: true
    }
  ];

  const handleNotificationClick = (notification: any) => {
    if (notification.type === 'emergency') {
      setSelectedAlert(notification);
      setShowAlertModal(true);
      
      // Text-to-Speech simulation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(notification.message);
        utterance.lang = 'vi-VN';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-lg font-bold">Thông báo & Cảnh báo</h1>
              <p className="text-xs text-emerald-100">Cập nhật mới nhất</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 mt-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`${
                notification.read ? 'bg-white' : 'bg-blue-50 border-2 border-blue-200'
              } rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <i className={`${notification.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-semibold ${
                      notification.read ? 'text-gray-800' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className={`text-xs ${
                    notification.read ? 'text-gray-600' : 'text-gray-700'
                  } mb-2 leading-relaxed`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <i className="ri-time-line text-xs"></i>
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Badge */}
              {notification.type === 'emergency' && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2.5">
                  <p className="text-xs text-red-700 font-medium flex items-center gap-2">
                    <i className="ri-alarm-warning-line"></i>
                    <span>Cảnh báo khẩn cấp - Cần xử lý ngay</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Alert Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-pulse-slow">
            <div className="text-center mb-5">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <i className="ri-alarm-warning-line text-5xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">CẢNH BÁO KHẨN CẤP</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{selectedAlert.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedAlert.message}</p>
            </div>

            {/* Alert Sound Indicator */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-5">
              <div className="flex items-center justify-center gap-2">
                <i className="ri-volume-up-line text-xl text-red-600 animate-pulse"></i>
                <p className="text-xs text-red-700 font-medium">Đang phát thông báo bằng giọng nói...</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <button 
                onClick={() => navigate('/diary')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Kiểm tra ngay
              </button>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="notifications" />
    </div>
  );
}
