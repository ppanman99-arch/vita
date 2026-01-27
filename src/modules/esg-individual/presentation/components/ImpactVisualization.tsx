import type { AggregatedESGPortfolio } from '../../domain/PersonalESG';
import { impactCalculatorService } from '../../application/ImpactCalculatorService';

interface ImpactVisualizationProps {
  portfolio: AggregatedESGPortfolio | null;
  loading?: boolean;
}

export default function ImpactVisualization({ portfolio, loading }: ImpactVisualizationProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[200px]">
        <i className="ri-loader-4-line animate-spin text-2xl text-emerald-500" />
      </div>
    );
  }
  if (!portfolio) return null;

  const trees = impactCalculatorService.treesEquivalent(portfolio.carbonOffsetTonnes);
  const co2Formatted = portfolio.carbonOffsetTonnes >= 1
    ? `${portfolio.carbonOffsetTonnes.toFixed(2)} tấn`
    : `${(portfolio.carbonOffsetTonnes * 1000).toFixed(0)} kg`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <h3 className="font-semibold text-gray-900">Tác động của bạn</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <i className="ri-plant-line text-2xl text-emerald-600 mb-2 block" />
          <p className="text-xl font-bold text-emerald-700">{trees}</p>
          <p className="text-sm text-emerald-800/80">Cây xanh tương đương</p>
        </div>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          <i className="ri-leaf-line text-2xl text-teal-600 mb-2 block" />
          <p className="text-xl font-bold text-teal-700">{co2Formatted}</p>
          <p className="text-sm text-teal-800/80">CO₂ đã bù</p>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Impact Score</span>
          <span className="text-2xl font-bold text-emerald-600">{portfolio.impactScore}/100</span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
            style={{ width: `${portfolio.impactScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
