
import { useState } from 'react';

export default function SeasonProgress() {
  const [selectedSeason, setSelectedSeason] = useState('winter-2024');

  const seasons = [
    { id: 'winter-2024', name: 'Vụ Đông Xuân 2024-2025' },
    { id: 'summer-2024', name: 'Vụ Hè Thu 2024' },
    { id: 'spring-2024', name: 'Vụ Xuân Hè 2024' },
  ];

  const productionData = [
    { id: 1, crop: 'Quýt Vân Sơn', target: 10000, actual: 8500, unit: 'kg', icon: 'ri-plant-line', color: 'emerald' },
    { id: 2, crop: 'Cà Gai Leo', target: 5000, actual: 5200, unit: 'kg', icon: 'ri-leaf-line', color: 'teal' },
    { id: 3, crop: 'Hoàng Liên', target: 3000, actual: 2400, unit: 'kg', icon: 'ri-seedling-line', color: 'green' },
    { id: 4, crop: 'Bạch Truật', target: 4000, actual: 3800, unit: 'kg', icon: 'ri-plant-fill', color: 'lime' },
    { id: 5, crop: 'Đương Quy', target: 2500, actual: 2100, unit: 'kg', icon: 'ri-flower-line', color: 'cyan' },
  ];

  const getProgressPercentage = (actual: number, target: number) => {
    return Math.min((actual / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-emerald-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const totalTarget = productionData.reduce((sum, item) => sum + item.target, 0);
  const totalActual = productionData.reduce((sum, item) => sum + item.actual, 0);
  const overallProgress = (totalActual / totalTarget) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800">Tiến độ Sản xuất Vụ Mùa</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">So sánh cam kết vs thực tế</p>
          </div>
          
          {/* Season Selector */}
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="px-3 sm:px-4 py-2 border-2 border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overall Progress Summary */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-800">Tổng tiến độ</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              {totalActual.toLocaleString()} / {totalTarget.toLocaleString()} kg
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {overallProgress.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">Hoàn thành</p>
          </div>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="relative h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Crop Progress Bars */}
      <div className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-5">
          {productionData.map((item) => {
            const percentage = getProgressPercentage(item.actual, item.target);
            const isOverTarget = item.actual > item.target;
            
            return (
              <div key={item.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <i className={`${item.icon} text-base sm:text-lg text-${item.color}-600`}></i>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-800">{item.crop}</h4>
                      <p className="text-xs text-gray-600">
                        {item.actual.toLocaleString()} / {item.target.toLocaleString()} {item.unit}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-base sm:text-lg font-bold ${
                      isOverTarget ? 'text-emerald-600' : 
                      percentage >= 80 ? 'text-blue-600' : 
                      percentage >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {percentage.toFixed(0)}%
                    </div>
                    {isOverTarget && (
                      <span className="text-xs text-emerald-600 font-semibold">
                        +{((item.actual - item.target) / item.target * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 sm:h-10 bg-gray-100 rounded-xl overflow-hidden">
                  {/* Target Line */}
                  <div className="absolute inset-0 flex items-center px-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  {/* Actual Progress */}
                  <div
                    className={`absolute inset-y-0 left-0 ${getProgressColor(percentage)} transition-all duration-500 rounded-xl flex items-center justify-end px-3`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  >
                    {percentage >= 30 && (
                      <span className="text-xs font-semibold text-white">
                        {item.actual.toLocaleString()} {item.unit}
                      </span>
                    )}
                  </div>

                  {/* Over-target indicator */}
                  {isOverTarget && (
                    <div
                      className="absolute inset-y-0 bg-emerald-600 opacity-50 rounded-r-xl"
                      style={{ 
                        left: '100%',
                        width: `${((item.actual - item.target) / item.target) * 100}%`,
                        maxWidth: '20%'
                      }}
                    ></div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isOverTarget ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        <i className="ri-arrow-up-line mr-1"></i>
                        Vượt mục tiêu
                      </span>
                    ) : percentage >= 80 ? (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        <i className="ri-arrow-right-up-line mr-1"></i>
                        Đúng tiến độ
                      </span>
                    ) : percentage >= 60 ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        <i className="ri-arrow-right-line mr-1"></i>
                        Cần đẩy nhanh
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        <i className="ri-arrow-down-line mr-1"></i>
                        Chậm tiến độ
                      </span>
                    )}
                  </div>
                  
                  <button className="text-xs text-gray-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer">
                    Chi tiết <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-gray-600">
          <i className="ri-information-line mr-1.5"></i>
          Cập nhật lần cuối: 15 phút trước
        </p>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-1 sm:mr-2"></i>
            Xuất báo cáo
          </button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-refresh-line mr-1 sm:mr-2"></i>
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
}
