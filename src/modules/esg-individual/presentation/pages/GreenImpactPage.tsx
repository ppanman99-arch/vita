import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgInvestmentAggregatorService } from '../../application/ESGInvestmentAggregatorService';
import { impactCalculatorService } from '../../application/ImpactCalculatorService';
import type { AggregatedESGPortfolio } from '../../domain/PersonalESG';
import ImpactVisualization from '../components/ImpactVisualization';

export default function GreenImpactPage() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<AggregatedESGPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    esgInvestmentAggregatorService.getAggregatedESGPortfolio().then((p) => {
      setPortfolio(p);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-3xl text-emerald-500" />
      </div>
    );
  }

  const trees = portfolio ? impactCalculatorService.treesEquivalent(portfolio.carbonOffsetTonnes) : 0;
  const co2T = portfolio?.carbonOffsetTonnes ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Tác động Xanh</h1>
              <p className="text-sm text-gray-500">Cây xanh & CO₂ bù từ đóng góp của bạn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <ImpactVisualization portfolio={portfolio} />

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ý nghĩa</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <i className="ri-plant-line text-emerald-600 mt-0.5" />
              <span><strong>{trees} cây xanh</strong> tương đương: hấp thụ CO₂ từ đóng góp của bạn (ước tính theo đầu tư xanh).</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-leaf-line text-teal-600 mt-0.5" />
              <span><strong>{co2T >= 1 ? `${co2T.toFixed(2)} tấn` : `${(co2T * 1000).toFixed(0)} kg`} CO₂</strong> đã bù: lượng carbon offset từ các dự án HTX/dược liệu bạn hỗ trợ.</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="ri-bar-chart-line text-green-600 mt-0.5" />
              <span><strong>Impact Score</strong> tổng hợp từ giá trị đầu tư, Điểm Xanh và carbon offset.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/esg-individual')}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Về Dashboard ESG Cá nhân
        </button>
      </div>
    </div>
  );
}
