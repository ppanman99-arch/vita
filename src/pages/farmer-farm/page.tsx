import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

interface Lot {
  id: string;
  name: string;
  crop: string;
  area: number;
  plantDate: string;
  harvestDate: string;
  status: 'healthy' | 'warning' | 'critical';
  progress: number;
  position: { x: number; y: number };
  color: string;
}

export default function FarmerFarmPage() {
  const navigate = useNavigate();
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const lots: Lot[] = [
    {
      id: 'A1',
      name: 'Lô A1',
      crop: 'Quế',
      area: 0.5,
      plantDate: '15/03/2023',
      harvestDate: '15/03/2025',
      status: 'healthy',
      progress: 65,
      position: { x: 20, y: 20 },
      color: 'bg-green-500',
    },
    {
      id: 'A2',
      name: 'Lô A2',
      crop: 'Quế',
      area: 0.3,
      plantDate: '20/04/2023',
      harvestDate: '20/04/2025',
      status: 'healthy',
      progress: 60,
      position: { x: 55, y: 20 },
      color: 'bg-green-500',
    },
    {
      id: 'A3',
      name: 'Lô A3',
      crop: 'Cà Gai Leo',
      area: 0.4,
      plantDate: '10/06/2023',
      harvestDate: '10/12/2024',
      status: 'warning',
      progress: 85,
      position: { x: 20, y: 50 },
      color: 'bg-yellow-500',
    },
    {
      id: 'B1',
      name: 'Lô B1',
      crop: 'Đinh Lăng',
      area: 0.6,
      plantDate: '05/02/2023',
      harvestDate: '05/02/2026',
      status: 'healthy',
      progress: 45,
      position: { x: 55, y: 50 },
      color: 'bg-green-500',
    },
    {
      id: 'B2',
      name: 'Lô B2',
      crop: 'Hoàng Tinh',
      area: 0.3,
      plantDate: '12/05/2023',
      harvestDate: '12/05/2025',
      status: 'critical',
      progress: 70,
      position: { x: 20, y: 75 },
      color: 'bg-red-500',
    },
    {
      id: 'C1',
      name: 'Lô C1',
      crop: 'Bạch Truật',
      area: 0.4,
      plantDate: '25/07/2023',
      harvestDate: '25/01/2025',
      status: 'healthy',
      progress: 90,
      position: { x: 55, y: 75 },
      color: 'bg-green-500',
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'healthy':
        return { label: 'Khỏe mạnh', icon: 'ri-checkbox-circle-fill', color: 'text-green-600', bg: 'bg-green-100' };
      case 'warning':
        return { label: 'Cần chú ý', icon: 'ri-error-warning-fill', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'critical':
        return { label: 'Nguy hiểm', icon: 'ri-alert-fill', color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { label: 'Không rõ', icon: 'ri-question-fill', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const selectedLotData = lots.find(lot => lot.id === selectedLot);

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
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Bản đồ Nông trại</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Farm Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tổng quan nông trại</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">2.5 ha</div>
              <div className="text-sm text-gray-600">Tổng diện tích</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Lô khỏe mạnh</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Cần xử lý</div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Bản đồ số các lô</h2>
            
            {/* Map Container */}
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl overflow-hidden border-2 border-green-200">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-10 grid-rows-10 h-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-green-300"></div>
                  ))}
                </div>
              </div>

              {/* Lots */}
              {lots.map((lot) => (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLot(lot.id)}
                  className={`absolute w-28 h-20 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    lot.color
                  } ${
                    selectedLot === lot.id
                      ? 'ring-4 ring-blue-500 scale-110 z-10'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    left: `${lot.position.x}%`,
                    top: `${lot.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="text-white font-bold text-sm mb-1">{lot.name}</div>
                  <div className="text-white text-xs opacity-90">{lot.crop}</div>
                  <div className="text-white text-xs opacity-75">{lot.area} ha</div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Khỏe mạnh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-600">Cần chú ý</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Nguy hiểm</span>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {lots.map((lot) => {
              const statusInfo = getStatusInfo(lot.status);
              return (
                <div
                  key={lot.id}
                  onClick={() => setSelectedLot(lot.id)}
                  className={`bg-white rounded-2xl shadow-lg p-6 transition-all cursor-pointer ${
                    selectedLot === lot.id ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lot.name}</h3>
                      <p className="text-sm text-gray-600">{lot.crop} • {lot.area} ha</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 ${statusInfo.bg} rounded-full`}>
                      <i className={`${statusInfo.icon} ${statusInfo.color}`}></i>
                      <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Tiến độ sinh trưởng</span>
                      <span className="text-sm font-bold text-gray-900">{lot.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full h-2 transition-all"
                        style={{ width: `${lot.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Ngày xuống giống</div>
                      <div className="text-sm font-medium text-gray-900">{lot.plantDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Dự kiến thu hoạch</div>
                      <div className="text-sm font-medium text-gray-900">{lot.harvestDate}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Lot Details */}
        {selectedLotData && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Chi tiết {selectedLotData.name}</h2>
              <button
                onClick={() => setSelectedLot(null)}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              {/* Crop Info */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-plant-line text-3xl text-green-600"></i>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{selectedLotData.crop}</div>
                  <div className="text-sm text-gray-600">Diện tích: {selectedLotData.area} ha</div>
                </div>
                {getStatusInfo(selectedLotData.status).icon && (
                  <i className={`${getStatusInfo(selectedLotData.status).icon} text-3xl ${getStatusInfo(selectedLotData.status).color}`}></i>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/farmer/diary')}
                  className="py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-book-2-line mr-2"></i>
                  Ghi nhật ký
                </button>
                <button className="py-3 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-alert-line mr-2"></i>
                  Báo sự cố
                </button>
              </div>

              {/* Report Issue */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3">Báo cáo sự cố khẩn cấp</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Chụp ảnh cây bị bệnh và gửi lên Bác sĩ cây trồng để được tư vấn
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
                  <i className="ri-camera-line mr-2"></i>
                  Chụp ảnh & Gửi tư vấn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600 cursor-pointer">
            <i className="ri-map-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nông trại</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
