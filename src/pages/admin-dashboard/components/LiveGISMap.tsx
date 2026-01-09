
import { useState } from 'react';

export default function LiveGISMap() {
  const [selectedFarmer, setSelectedFarmer] = useState<number | null>(null);
  const [mapMode, setMapMode] = useState<'satellite' | 'map' | 'terrain'>('satellite');

  // Mock farmer data with coordinates
  const farmers = [
    { id: 1, name: 'Nguyễn Văn A', area: 2.5, status: 'normal', x: 20, y: 30, lastUpdate: '5 phút trước' },
    { id: 2, name: 'Trần Thị B', area: 3.2, status: 'normal', x: 45, y: 25, lastUpdate: '10 phút trước' },
    { id: 3, name: 'Lê Văn C', area: 2.8, status: 'warning', x: 65, y: 40, lastUpdate: '2 giờ trước' },
    { id: 4, name: 'Phạm Thị D', area: 4.1, status: 'normal', x: 30, y: 60, lastUpdate: '15 phút trước' },
    { id: 5, name: 'Hoàng Văn E', area: 3.5, status: 'alert', x: 75, y: 55, lastUpdate: '1 ngày trước' },
    { id: 6, name: 'Vũ Thị F', area: 2.9, status: 'normal', x: 50, y: 70, lastUpdate: '30 phút trước' },
    { id: 7, name: 'Đỗ Văn G', area: 3.8, status: 'offline', x: 85, y: 35, lastUpdate: '3 ngày trước' },
    { id: 8, name: 'Bùi Thị H', area: 2.3, status: 'normal', x: 15, y: 75, lastUpdate: '1 giờ trước' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'normal': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'alert': return 'bg-red-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'normal': return 'ri-checkbox-circle-fill';
      case 'warning': return 'ri-error-warning-fill';
      case 'alert': return 'ri-alert-fill';
      case 'offline': return 'ri-signal-wifi-off-line';
      default: return 'ri-question-line';
    }
  };

  const statusCounts = {
    normal: farmers.filter(f => f.status === 'normal').length,
    warning: farmers.filter(f => f.status === 'warning').length,
    alert: farmers.filter(f => f.status === 'alert').length,
    offline: farmers.filter(f => f.status === 'offline').length,
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800">Bản đồ Giám sát Vùng Trồng</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Theo dõi thời gian thực</p>
        </div>
        
        {/* Map Mode Selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMapMode('satellite')}
            className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'satellite' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
          >
            <i className="ri-earth-line sm:mr-1"></i>
            <span className="hidden sm:inline">Vệ tinh</span>
          </button>
          <button
            onClick={() => setMapMode('map')}
            className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'map' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
          >
            <i className="ri-map-2-line sm:mr-1"></i>
            <span className="hidden sm:inline">Bản đồ</span>
          </button>
          <button
            onClick={() => setMapMode('terrain')}
            className={`px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'terrain' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'
            }`}
          >
            <i className="ri-landscape-line sm:mr-1"></i>
            <span className="hidden sm:inline">Địa hình</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] sm:h-[500px] bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100">
        {/* Background Map Image */}
        <img
          src="https://readdy.ai/api/search-image?query=aerial%20satellite%20view%20of%20agricultural%20farmland%20with%20green%20fields%20and%20forest%20areas%2C%20topographic%20map%20style%2C%20natural%20landscape%20from%20above%2C%20farming%20regions%2C%20rural%20countryside&width=1200&height=600&seq=htx-map-bg-001&orientation=landscape"
          alt="HTX Map"
          className="w-full h-full object-cover opacity-70"
        />

        {/* Farmer Pins */}
        <div className="absolute inset-0">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
              style={{ left: `${farmer.x}%`, top: `${farmer.y}%` }}
              onMouseEnter={() => setSelectedFarmer(farmer.id)}
              onMouseLeave={() => setSelectedFarmer(null)}
            >
              {/* Pin */}
              <div className={`relative ${farmer.status === 'alert' ? 'animate-bounce' : ''}`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${getStatusColor(farmer.status)} shadow-lg flex items-center justify-center border-3 border-white transition-transform hover:scale-125`}>
                  <i className={`${getStatusIcon(farmer.status)} text-white text-sm sm:text-base`}></i>
                </div>
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-3 ${getStatusColor(farmer.status)}`}></div>
              </div>

              {/* Hover Popup */}
              {selectedFarmer === farmer.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-2xl p-3 z-10 animate-fadeIn">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {farmer.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{farmer.name}</h4>
                      <p className="text-xs text-gray-600">Diện tích: {farmer.area} ha</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      <i className="ri-time-line mr-1"></i>
                      {farmer.lastUpdate}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      farmer.status === 'normal' ? 'bg-emerald-100 text-emerald-700' :
                      farmer.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                      farmer.status === 'alert' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {farmer.status === 'normal' ? 'Tốt' :
                       farmer.status === 'warning' ? 'Cảnh báo' :
                       farmer.status === 'alert' ? 'Khẩn cấp' : 'Offline'}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-3 h-3 bg-white rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">Trạng thái</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-gray-700">Hoạt động tốt ({statusCounts.normal})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xs text-gray-700">Cảnh báo ({statusCounts.warning})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-700">Khẩn cấp ({statusCounts.alert})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-xs text-gray-700">Mất kết nối ({statusCounts.offline})</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="ri-zoom-in-line text-gray-700"></i>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="ri-zoom-out-line text-gray-700"></i>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="ri-focus-3-line text-gray-700"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
