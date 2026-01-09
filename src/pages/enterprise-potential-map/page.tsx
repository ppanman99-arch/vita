import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegionData {
  id: string;
  name: string;
  province: string;
  coordinates: { lat: number; lng: number };
  suitability: {
    samNgocLinh: number;
    duongQuy: number;
    caGaiLeo: number;
    baKich: number;
  };
  coopCount: number;
  totalArea: number;
  availableArea: number;
  avgAltitude: number;
  soilTypes: string[];
  climate: string;
}

export default function EnterprisePotentialMapPage() {
  const navigate = useNavigate();
  const [selectedPlant, setSelectedPlant] = useState<string>('samNgocLinh');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions: RegionData[] = [
    {
      id: 'tay-bac-1',
      name: 'Vùng Sìn Hồ',
      province: 'Lai Châu',
      coordinates: { lat: 22.3, lng: 103.8 },
      suitability: {
        samNgocLinh: 98,
        duongQuy: 85,
        caGaiLeo: 60,
        baKich: 70,
      },
      coopCount: 3,
      totalArea: 850,
      availableArea: 320,
      avgAltitude: 1700,
      soilTypes: ['Đất mùn trên núi đá', 'Đất xám'],
      climate: 'Nhiệt đới gió mùa núi cao',
    },
    {
      id: 'tay-nguyen-1',
      name: 'Vùng Ngọc Linh',
      province: 'Kon Tum',
      coordinates: { lat: 14.3, lng: 108.0 },
      suitability: {
        samNgocLinh: 95,
        duongQuy: 80,
        caGaiLeo: 75,
        baKich: 65,
      },
      coopCount: 5,
      totalArea: 1200,
      availableArea: 480,
      avgAltitude: 1800,
      soilTypes: ['Đất mùn trên núi đá', 'Đất đỏ Bazan'],
      climate: 'Nhiệt đới gió mùa núi cao',
    },
    {
      id: 'tay-nguyen-2',
      name: 'Vùng Đà Lạt',
      province: 'Lâm Đồng',
      coordinates: { lat: 11.9, lng: 108.4 },
      suitability: {
        samNgocLinh: 70,
        duongQuy: 90,
        caGaiLeo: 85,
        baKich: 80,
      },
      coopCount: 4,
      totalArea: 950,
      availableArea: 380,
      avgAltitude: 1500,
      soilTypes: ['Đất đỏ Bazan', 'Đất xám'],
      climate: 'Ôn đới núi cao',
    },
    {
      id: 'tay-bac-2',
      name: 'Vùng Hoàng Liên Sơn',
      province: 'Lào Cai',
      coordinates: { lat: 22.3, lng: 103.8 },
      suitability: {
        samNgocLinh: 85,
        duongQuy: 95,
        caGaiLeo: 70,
        baKich: 75,
      },
      coopCount: 2,
      totalArea: 650,
      availableArea: 240,
      avgAltitude: 1600,
      soilTypes: ['Đất mùn trên núi đá'],
      climate: 'Nhiệt đới gió mùa núi cao',
    },
  ];

  const plants = [
    { id: 'samNgocLinh', name: 'Sâm Ngọc Linh', icon: 'ri-plant-line', color: 'emerald' },
    { id: 'duongQuy', name: 'Đương Quy', icon: 'ri-leaf-line', color: 'blue' },
    { id: 'caGaiLeo', name: 'Cà Gai Leo', icon: 'ri-seedling-line', color: 'purple' },
    { id: 'baKich', name: 'Ba Kích', icon: 'ri-plant-fill', color: 'amber' },
  ];

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSuitabilityText = (score: number) => {
    if (score >= 90) return 'Rất phù hợp';
    if (score >= 75) return 'Phù hợp';
    if (score >= 60) return 'Trung bình';
    return 'Không phù hợp';
  };

  const filteredRegions = regions
    .map(region => ({
      ...region,
      currentSuitability: region.suitability[selectedPlant as keyof typeof region.suitability],
    }))
    .sort((a, b) => b.currentSuitability - a.currentSuitability);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => navigate('/partner')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Bản đồ Vùng trồng Tiềm năng</h1>
              <p className="text-sm opacity-90">Potential Zone Heatmap</p>
            </div>
          </div>

          {/* Plant Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {plants.map(plant => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedPlant === plant.id
                    ? 'bg-white text-slate-700'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <i className={plant.icon}></i>
                {plant.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Bản đồ nhiệt (Heatmap) thổ nhưỡng</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                Bản đồ hiển thị các vùng có <strong>thổ nhưỡng phù hợp</strong> để trồng dược liệu bạn chọn. 
                Màu sắc thể hiện mức độ phù hợp: <strong className="text-emerald-600">Xanh lá = Rất phù hợp</strong>, 
                <strong className="text-blue-600"> Xanh dương = Phù hợp</strong>, 
                <strong className="text-amber-600"> Vàng = Trung bình</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Bản đồ Việt Nam - Vùng trồng {plants.find(p => p.id === selectedPlant)?.name}
          </h2>
          
          <div className="relative h-96 sm:h-[600px] bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="ri-map-2-line text-8xl text-gray-200"></i>
            </div>

            {/* Region Markers */}
            {filteredRegions.map((region, index) => {
              const suitability = region.currentSuitability;
              const size = suitability >= 90 ? 'w-20 h-20' : suitability >= 75 ? 'w-16 h-16' : 'w-12 h-12';
              
              return (
                <div
                  key={region.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${(region.coordinates.lng - 102) * 8}%`,
                    top: `${(23 - region.coordinates.lat) * 8}%`,
                  }}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className={`${size} rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-125 ${getSuitabilityColor(suitability)} opacity-80 group-hover:opacity-100`}>
                    <div className="text-white text-center">
                      <div className="text-xs font-bold">{suitability}%</div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-4 py-3 whitespace-nowrap shadow-xl">
                      <div className="font-bold mb-1">{region.name}</div>
                      <div className="text-gray-300">Độ phù hợp: {suitability}%</div>
                      <div className="text-gray-300">HTX: {region.coopCount}</div>
                      <div className="text-gray-300">Diện tích: {region.availableArea} ha</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <span className="text-gray-600">Rất phù hợp (≥90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Phù hợp (75-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500"></div>
              <span className="text-gray-600">Trung bình (60-74%)</span>
            </div>
          </div>
        </div>

        {/* Region List */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Danh sách vùng trồng ({filteredRegions.length})
          </h2>

          {filteredRegions.map(region => {
            const suitability = region.currentSuitability;
            const isSelected = selectedRegion === region.id;

            return (
              <div
                key={region.id}
                className={`bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all cursor-pointer ${
                  isSelected ? 'ring-4 ring-emerald-500' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{region.name}</h3>
                    <p className="text-sm text-gray-500">
                      <i className="ri-map-pin-line mr-1"></i>
                      {region.province}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-bold text-2xl ${getSuitabilityColor(suitability)} text-white`}>
                    {suitability}%
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">HTX hoạt động</div>
                    <div className="text-lg font-bold text-blue-600">{region.coopCount}</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Diện tích khả dụng</div>
                    <div className="text-lg font-bold text-purple-600">{region.availableArea} ha</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Độ cao TB</div>
                    <div className="text-lg font-bold text-orange-600">{region.avgAltitude}m</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Đánh giá</div>
                    <div className="text-sm font-bold text-emerald-600">{getSuitabilityText(suitability)}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <i className="ri-landscape-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-600">Loại đất: </span>
                      <span className="text-gray-800 font-medium">{region.soilTypes.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-temp-hot-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-600">Khí hậu: </span>
                      <span className="text-gray-800 font-medium">{region.climate}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/enterprise-procurement');
                  }}
                  className="w-full mt-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  <i className="ri-add-circle-line mr-2"></i>
                  Tạo yêu cầu đặt trồng tại vùng này
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            <i className="ri-bar-chart-box-line text-emerald-600 mr-2"></i>
            Tổng quan năng lực cung ứng
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                {filteredRegions.reduce((sum, r) => sum + r.coopCount, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">HTX có năng lực</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {filteredRegions.reduce((sum, r) => sum + r.availableArea, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Diện tích khả dụng (ha)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {filteredRegions.filter(r => r.currentSuitability >= 90).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Vùng rất phù hợp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round(filteredRegions.reduce((sum, r) => sum + r.currentSuitability, 0) / filteredRegions.length)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Độ phù hợp TB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
