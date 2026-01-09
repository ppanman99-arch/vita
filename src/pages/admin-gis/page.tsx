import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminGISPage() {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const forestLots = [
    { id: 'A1', name: 'Lô A1', area: 2.5, status: 'good', health: 95, species: 'Cà Gai Leo', lastCheck: '2 giờ trước' },
    { id: 'A2', name: 'Lô A2', area: 3.2, status: 'warning', health: 78, species: 'Hoàng Tinh', lastCheck: '5 giờ trước' },
    { id: 'A3', name: 'Lô A3', area: 2.8, status: 'good', health: 92, species: 'Bạch Truật', lastCheck: '1 giờ trước' },
    { id: 'B1', name: 'Lô B1', area: 4.1, status: 'danger', health: 65, species: 'Đương Quy', lastCheck: '3 giờ trước' },
    { id: 'B2', name: 'Lô B2', area: 3.5, status: 'good', health: 88, species: 'Cà Gai Leo', lastCheck: '4 giờ trước' },
    { id: 'C1', name: 'Lô C1', area: 2.9, status: 'warning', health: 72, species: 'Hoàng Tinh', lastCheck: '6 giờ trước' },
    { id: 'C2', name: 'Lô C2', area: 3.7, status: 'good', health: 90, species: 'Bạch Truật', lastCheck: '2 giờ trước' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Tốt';
      case 'warning': return 'Cần chăm sóc';
      case 'danger': return 'Cảnh báo';
      default: return 'Không rõ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar title="Bản đồ GIS Rừng" />

      <div className="pt-16 px-3 sm:px-6">
        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="relative h-[400px] sm:h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100">
            {/* Satellite Map Placeholder */}
            <img
              src="https://readdy.ai/api/search-image?query=aerial%20view%20of%20forest%20plantation%20with%20different%20sections%2C%20satellite%20imagery%2C%20topographic%20map%2C%20green%20forest%20canopy%2C%20agricultural%20land%20divisions%2C%20natural%20landscape&width=800&height=500&seq=gis-map-001&orientation=landscape"
              alt="GIS Map"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Map Overlay - Forest Lots */}
            <div className="absolute inset-0 p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 h-full">
                {forestLots.map((lot) => (
                  <button
                    key={lot.id}
                    onClick={() => setSelectedLot(lot.id)}
                    className={`relative rounded-xl border-2 transition-all ${
                      selectedLot === lot.id
                        ? 'border-white scale-105 shadow-2xl'
                        : 'border-white/50 hover:border-white hover:scale-102'
                    } ${getStatusColor(lot.status)} bg-opacity-40 backdrop-blur-sm`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-lg sm:text-2xl font-bold">{lot.id}</div>
                      <div className="text-xs sm:text-sm opacity-90">{lot.area} ha</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Controls */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white rounded-xl shadow-lg p-2 sm:p-3">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedLayer('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedLayer === 'all'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-map-2-line mr-1"></i>
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedLayer('health')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedLayer === 'health'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-heart-pulse-line mr-1"></i>
                  Sức khỏe
                </button>
                <button
                  onClick={() => setSelectedLayer('species')}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedLayer === 'species'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-plant-line mr-1"></i>
                  Loài cây
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white rounded-xl shadow-lg p-2 sm:p-3">
              <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Trạng thái</div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-gray-600">Tốt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-600">Cần chăm sóc</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">Cảnh báo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lot Details */}
        {selectedLot && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4">
            {(() => {
              const lot = forestLots.find((l) => l.id === selectedLot);
              if (!lot) return null;

              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{lot.name}</h3>
                      <p className="text-sm text-gray-500">Cập nhật {lot.lastCheck}</p>
                    </div>
                    <button
                      onClick={() => setSelectedLot(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <i className="ri-close-line text-gray-600"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">Diện tích</div>
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">{lot.area} ha</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">Sức khỏe</div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{lot.health}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">Loài cây</div>
                      <div className="text-sm sm:text-base font-semibold text-purple-600">{lot.species}</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 mb-1">Trạng thái</div>
                      <div className="text-sm sm:text-base font-semibold text-amber-600">{getStatusText(lot.status)}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors text-sm sm:text-base">
                      <i className="ri-eye-line mr-2"></i>
                      Xem chi tiết
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base">
                      <i className="ri-edit-line mr-2"></i>
                      Cập nhật
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Forest Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <i className="ri-map-pin-line text-lg sm:text-xl text-emerald-600"></i>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{forestLots.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Tổng số lô</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="ri-landscape-line text-lg sm:text-xl text-blue-600"></i>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">22.7 ha</div>
            <div className="text-xs sm:text-sm text-gray-500">Tổng diện tích</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-lg sm:text-xl text-emerald-600"></i>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">4</div>
            <div className="text-xs sm:text-sm text-gray-500">Lô tốt</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <i className="ri-alert-line text-lg sm:text-xl text-amber-600"></i>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">3</div>
            <div className="text-xs sm:text-sm text-gray-500">Cần chăm sóc</div>
          </div>
        </div>
      </div>

      <AdminBottomNav />
    </div>
  );
}
