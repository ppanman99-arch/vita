import type { PersonalCarbonFootprint } from '../../domain/CarbonFootprint';

interface CarbonFootprintWidgetProps {
  footprint: PersonalCarbonFootprint | null;
  loading?: boolean;
  onViewDetail?: () => void;
}

export default function CarbonFootprintWidget({ footprint, loading, onViewDetail }: CarbonFootprintWidgetProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center h-32">
        <i className="ri-loader-4-line animate-spin text-2xl text-emerald-500" />
      </div>
    );
  }
  if (!footprint) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-sm text-gray-500">Chưa có dữ liệu dấu chân carbon.</p>
        {onViewDetail && (
          <button onClick={onViewDetail} className="mt-2 text-emerald-600 text-sm font-medium hover:underline">
            Thêm hoạt động
          </button>
        )}
      </div>
    );
  }
  const trendIcon = footprint.trend === 'up' ? 'ri-arrow-up-line' : footprint.trend === 'down' ? 'ri-arrow-down-line' : 'ri-subtract-line';
  const trendColor = footprint.trend === 'down' ? 'text-green-500' : footprint.trend === 'up' ? 'text-amber-600' : 'text-gray-500';
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Dấu chân carbon</span>
        <i className={`${trendIcon} ${trendColor}`} />
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {(footprint.totalCo2Kg / 1000).toFixed(2)} <span className="text-sm font-normal text-gray-500">tấn CO₂</span>
      </p>
      <p className="text-xs text-gray-500 mt-0.5">Kỳ {footprint.period}</p>
      {onViewDetail && (
        <button onClick={onViewDetail} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">
          Chi tiết & thêm hoạt động
        </button>
      )}
    </div>
  );
}
