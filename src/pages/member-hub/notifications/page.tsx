import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';

export default function MemberNotificationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'financial' | 'investment' | 'production' | 'system'>('all');
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Mock data - sẽ thay bằng API call thực tế
    const mockNotifications = [
      {
        id: 1,
        type: 'financial',
        category: 'Cổ tức',
        title: 'Cổ tức Q1/2025 sắp được chi trả',
        message: 'Dự án Sâm Ngọc Linh sẽ chi trả cổ tức 1.500.000 VNĐ vào 15/02/2025',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        unread: true,
        action: { label: 'Xem chi tiết', path: '/investor-wallet?tab=dividends' },
        icon: 'ri-money-dollar-circle-line',
        color: 'green',
      },
      {
        id: 2,
        type: 'investment',
        category: 'Dự án mới',
        title: 'Dự án mới: Đương Quy hữu cơ',
        message: 'HTX Dược Liệu Lâm Đồng đang mở gọi vốn. Lợi nhuận kỳ vọng: 15%/năm',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        unread: true,
        action: { label: 'Xem dự án', path: '/farmer/investor?project=3' },
        icon: 'ri-funds-line',
        color: 'amber',
      },
      {
        id: 3,
        type: 'production',
        category: 'Công việc',
        title: 'Có 2 việc cần làm hôm nay',
        message: 'Bón phân lô Quế A2 và Kiểm tra sâu bệnh lô Đinh Lăng B',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        unread: true,
        action: { label: 'Xem công việc', path: '/farmer?tab=tasks' },
        icon: 'ri-task-line',
        color: 'blue',
      },
      {
        id: 4,
        type: 'financial',
        category: 'Thanh toán',
        title: 'Thanh toán lô Cà Gai Leo đã nhận',
        message: 'Bạn đã nhận 8.750.000 VNĐ từ thanh toán lô Cà Gai Leo - Tháng 12',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        unread: false,
        action: { label: 'Xem ví', path: '/farmer/wallet' },
        icon: 'ri-wallet-3-line',
        color: 'emerald',
      },
      {
        id: 5,
        type: 'system',
        category: 'Hệ thống',
        title: 'Báo cáo tháng 1/2025 đã có',
        message: 'Xem báo cáo tiến độ dự án và thu nhập của bạn trong tháng 1',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        unread: false,
        action: { label: 'Xem báo cáo', path: '/farmer/investor?tab=monitor' },
        icon: 'ri-file-chart-line',
        color: 'purple',
      },
      {
        id: 6,
        type: 'investment',
        category: 'Cổ tức',
        title: 'Cổ tức Q4/2024 đã nhận',
        message: 'Bạn đã nhận 900.000 VNĐ cổ tức từ dự án Vườn ươm công nghệ cao',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        unread: false,
        action: { label: 'Xem lịch sử', path: '/investor-wallet?tab=dividends' },
        icon: 'ri-money-dollar-circle-line',
        color: 'green',
      },
      {
        id: 7,
        type: 'production',
        category: 'Nhật ký',
        title: 'Nhắc nhở ghi nhật ký',
        message: 'Đừng quên ghi nhật ký công việc hôm nay để tích Green Points',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        unread: false,
        action: { label: 'Ghi nhật ký', path: '/farmer/diary' },
        icon: 'ri-file-edit-line',
        color: 'blue',
      },
      {
        id: 8,
        type: 'system',
        category: 'Cập nhật',
        title: 'Cập nhật hệ thống mới',
        message: 'Hệ thống đã được cập nhật với nhiều tính năng mới. Xem chi tiết tại đây.',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        unread: false,
        action: { label: 'Xem thêm', path: '#' },
        icon: 'ri-notification-badge-line',
        color: 'purple',
      },
    ];

    setNotifications(mockNotifications);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return notif.unread;
    return notif.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <BackButton className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Trung tâm Thông báo</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Tất cả đã đọc'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] sm:top-[81px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-3 pt-3 scrollbar-hide">
            {[
              { id: 'all', label: 'Tất cả', icon: 'ri-notification-line', count: notifications.length },
              { id: 'unread', label: 'Chưa đọc', icon: 'ri-mail-unread-line', count: unreadCount },
              { id: 'financial', label: 'Tài chính', icon: 'ri-money-dollar-circle-line', count: notifications.filter(n => n.type === 'financial').length },
              { id: 'investment', label: 'Đầu tư', icon: 'ri-funds-line', count: notifications.filter(n => n.type === 'investment').length },
              { id: 'production', label: 'Sản xuất', icon: 'ri-plant-line', count: notifications.filter(n => n.type === 'production').length },
              { id: 'system', label: 'Hệ thống', icon: 'ri-settings-3-line', count: notifications.filter(n => n.type === 'system').length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className={filter.icon}></i>
                <span>{filter.label}</span>
                {filter.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => {
              const colors = getColorClasses(notif.color);
              return (
                <div
                  key={notif.id}
                  className={`bg-white rounded-xl shadow-md p-4 sm:p-6 border-2 ${
                    notif.unread
                      ? `${colors.border} ${colors.bg}`
                      : 'border-gray-200'
                  } transition-all hover:shadow-lg`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${notif.icon} ${colors.text} text-xl`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full text-xs font-medium`}>
                              {notif.category}
                            </span>
                            {notif.unread && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{notif.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                          <p className="text-xs text-gray-400">{formatTime(notif.timestamp)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {notif.unread && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                              title="Đánh dấu đã đọc"
                            >
                              <i className="ri-check-line text-gray-600 text-sm"></i>
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                            title="Xóa"
                          >
                            <i className="ri-delete-bin-line text-gray-600 hover:text-red-600 text-sm"></i>
                          </button>
                        </div>
                      </div>

                      {/* Action Button */}
                      {notif.action && (
                        <button
                          onClick={() => {
                            markAsRead(notif.id);
                            navigate(notif.action.path);
                          }}
                          className={`mt-3 px-4 py-2 ${colors.bg} ${colors.text} rounded-lg text-sm font-medium hover:opacity-80 transition-opacity`}
                        >
                          {notif.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-notification-off-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có thông báo</h3>
            <p className="text-gray-600">
              {activeFilter === 'unread'
                ? 'Bạn đã đọc tất cả thông báo'
                : `Không có thông báo nào trong mục "${activeFilter === 'all' ? 'Tất cả' : activeFilter}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
