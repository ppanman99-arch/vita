
import { useState } from 'react';

export default function LiveFeed() {
  const [activeTab, setActiveTab] = useState<'pending' | 'alerts' | 'completed'>('pending');

  const pendingItems = [
    { id: 1, type: 'warehouse', farmer: 'Nguyễn Văn A', content: 'Yêu cầu nhập kho 250kg Quýt Vân Sơn', time: '5 phút trước', priority: 'high' },
    { id: 2, type: 'report', farmer: 'Trần Thị B', content: 'Báo cáo sâu bệnh trên lô B2', time: '15 phút trước', priority: 'urgent' },
    { id: 3, type: 'warehouse', farmer: 'Lê Văn C', content: 'Yêu cầu nhập kho 180kg Hoàng Liên', time: '30 phút trước', priority: 'normal' },
    { id: 4, type: 'support', farmer: 'Phạm Thị D', content: 'Yêu cầu hỗ trợ kỹ thuật bón phân', time: '1 giờ trước', priority: 'normal' },
  ];

  const alertItems = [
    { id: 1, type: 'disease', content: 'Phát hiện dịch bệnh lan rộng tại Bản Mường', time: '10 phút trước', severity: 'critical' },
    { id: 2, type: 'weather', content: 'Cảnh báo mưa lớn trong 24h tới', time: '2 giờ trước', severity: 'warning' },
    { id: 3, type: 'quality', content: 'Chất lượng sản phẩm lô #A123 dưới chuẩn', time: '3 giờ trước', severity: 'warning' },
  ];

  const completedItems = [
    { id: 1, type: 'warehouse', content: 'Đã nhập kho 300kg Quýt Vân Sơn từ Hoàng Văn E', time: '2 giờ trước' },
    { id: 2, type: 'payment', content: 'Đã thanh toán 45.000.000đ cho 12 xã viên', time: '4 giờ trước' },
    { id: 3, type: 'order', content: 'Hoàn thành đơn hàng #DH-2024-001', time: '5 giờ trước' },
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'warehouse': return 'ri-inbox-line';
      case 'report': return 'ri-file-warning-line';
      case 'support': return 'ri-customer-service-2-line';
      case 'disease': return 'ri-bug-line';
      case 'weather': return 'ri-cloud-windy-line';
      case 'quality': return 'ri-shield-check-line';
      case 'payment': return 'ri-money-dollar-circle-line';
      case 'order': return 'ri-shopping-cart-line';
      default: return 'ri-notification-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'warehouse': return 'bg-blue-100 text-blue-600';
      case 'report': return 'bg-red-100 text-red-600';
      case 'support': return 'bg-purple-100 text-purple-600';
      case 'disease': return 'bg-red-100 text-red-600';
      case 'weather': return 'bg-amber-100 text-amber-600';
      case 'quality': return 'bg-orange-100 text-orange-600';
      case 'payment': return 'bg-emerald-100 text-emerald-600';
      case 'order': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'border-l-4 border-red-500';
      case 'high': return 'border-l-4 border-amber-500';
      default: return 'border-l-4 border-emerald-500';
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch(severity) {
      case 'critical': return 'border-l-4 border-red-500';
      case 'warning': return 'border-l-4 border-amber-500';
      default: return 'border-l-4 border-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <div className="p-4 sm:p-5 pb-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Thông báo & Cảnh báo</h2>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === 'pending' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center justify-center gap-1 sm:gap-2">
              Chờ duyệt
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'pending' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {pendingItems.length}
              </span>
            </span>
            {activeTab === 'pending' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === 'alerts' ? 'text-red-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center justify-center gap-1 sm:gap-2">
              Cảnh báo
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'alerts' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {alertItems.length}
              </span>
            </span>
            {activeTab === 'alerts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === 'completed' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="flex items-center justify-center gap-1 sm:gap-2">
              Hoàn thành
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {completedItems.length}
              </span>
            </span>
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[500px]">
        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="divide-y divide-gray-100">
            {pendingItems.map((item) => (
              <div key={item.id} className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors ${getPriorityBorder(item.priority)}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${getTypeIcon(item.type)} text-base sm:text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-800">{item.farmer}</h4>
                      {item.priority === 'urgent' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
                          Khẩn cấp
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-2">{item.content}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">
                        <i className="ri-time-line mr-1"></i>
                        {item.time}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button className="px-2 sm:px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap">
                          Duyệt
                        </button>
                        <button className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap">
                          Xem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="divide-y divide-gray-100">
            {alertItems.map((item) => (
              <div key={item.id} className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors ${getSeverityBorder(item.severity)}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0 ${
                    item.severity === 'critical' ? 'animate-pulse' : ''
                  }`}>
                    <i className={`${getTypeIcon(item.type)} text-base sm:text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">{item.content}</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500">
                        <i className="ri-time-line mr-1"></i>
                        {item.time}
                      </span>
                      <button className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap">
                        Xử lý ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Tab */}
        {activeTab === 'completed' && (
          <div className="divide-y divide-gray-100">
            {completedItems.map((item) => (
              <div key={item.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors border-l-4 border-emerald-500">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${getTypeIcon(item.type)} text-base sm:text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-700 mb-2">{item.content}</p>
                    <div className="flex items-center gap-2">
                      <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
