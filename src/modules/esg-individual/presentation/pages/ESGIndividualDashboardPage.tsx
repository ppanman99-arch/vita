import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgInvestmentAggregatorService } from '../../application/ESGInvestmentAggregatorService';
import { personalESGService } from '../../application/PersonalESGService';
import { carbonFootprintService } from '../../application/CarbonFootprintService';
import { capitalService } from '@/modules/member/application/CapitalService';
import type { InvestmentOpportunity } from '@/modules/member/domain/capital';
import type { AggregatedESGPortfolio } from '../../domain/PersonalESG';
import type { PersonalCarbonFootprint } from '../../domain/CarbonFootprint';
import CarbonFootprintWidget from '../components/CarbonFootprintWidget';
import ImpactVisualization from '../components/ImpactVisualization';

const TIER_LABELS: Record<string, string> = {
  seed: 'Hạt giống',
  sprout: 'Mầm non',
  tree: 'Cây xanh',
  forest: 'Rừng xanh',
  guardian: 'Bảo vệ Xanh',
};

export default function ESGIndividualDashboardPage() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<AggregatedESGPortfolio | null>(null);
  const [footprint, setFootprint] = useState<PersonalCarbonFootprint | null>(null);
  const [badges, setBadges] = useState<Array<{ id: string; name: string; icon: string }>>([]);
  const [tier, setTier] = useState<string>('tree');
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      esgInvestmentAggregatorService.getAggregatedESGPortfolio(),
      personalESGService.getProfile(),
      personalESGService.getBadges(),
      carbonFootprintService.getFootprint(),
      capitalService.getInvestmentOpportunities(),
    ]).then(([p, profile, bList, f, opps]) => {
      setPortfolio(p);
      if (profile) setTier(profile.tier);
      setBadges(bList.map((b) => ({ id: b.id, name: b.name, icon: b.icon })));
      setFootprint(f);
      setOpportunities(opps);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">ESG Cá nhân</h1>
              <p className="text-sm text-gray-500">Tổng quan đóng góp xanh của bạn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white">
          <div>
            <p className="text-sm opacity-90">Cấp độ</p>
            <p className="text-xl font-bold">{TIER_LABELS[tier] ?? tier}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{portfolio ? portfolio.impactScore : 0}</p>
            <p className="text-sm opacity-90">Impact Score</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <i className="ri-currency-line text-xl text-emerald-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{(portfolio?.totalESGValue ?? 0).toLocaleString('vi-VN')}</p>
            <p className="text-xs text-gray-500">VNĐ đầu tư xanh</p>
            <button onClick={() => navigate('/member-hub/capital/opportunities')} className="mt-2 text-emerald-600 text-xs font-medium hover:underline">Xem cơ hội đầu tư</button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <i className="ri-coupon-3-line text-xl text-teal-600 mb-1" />
            <p className="text-lg font-bold text-gray-900">{(portfolio?.totalGreenPoints ?? 0).toLocaleString('vi-VN')}</p>
            <p className="text-xs text-gray-500">Điểm Xanh</p>
            <button onClick={() => navigate('/member-hub/consumer')} className="mt-2 text-teal-600 text-xs font-medium hover:underline">Tích điểm</button>
          </div>
        </div>
        <CarbonFootprintWidget footprint={footprint} onViewDetail={() => navigate('/esg-individual/carbon')} />
        <div className="flex flex-wrap gap-3 text-sm">
          <button onClick={() => navigate('/esg-individual/carbon')} className="text-emerald-600 font-medium hover:underline">Giảm phát thải</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => navigate('/member-hub/capital/opportunities')} className="text-emerald-600 font-medium hover:underline">Bù đắp bằng đầu tư xanh</button>
        </div>
        <ImpactVisualization portfolio={portfolio} />
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Nâng điểm Impact:</span>
          <button onClick={() => navigate('/member-hub/capital/opportunities')} className="text-sm text-emerald-600 font-medium hover:underline">Đầu tư xanh</button>
          <span className="text-gray-400">·</span>
          <button onClick={() => navigate('/member-hub/consumer')} className="text-sm text-emerald-600 font-medium hover:underline">Tích điểm</button>
          <span className="text-gray-400">·</span>
          <button onClick={() => navigate('/esg-individual/carbon')} className="text-sm text-emerald-600 font-medium hover:underline">Giảm carbon</button>
        </div>
        {opportunities.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Cơ hội đầu tư xanh</h3>
            <p className="text-sm text-gray-500 mb-3">Đầu tư vào dự án HTX để tăng chỉ số ESG của bạn</p>
            <div className="space-y-3">
              {opportunities.slice(0, 5).map((opp) => {
                const pct = opp.targetAmount > 0 ? Math.round((opp.raised / opp.targetAmount) * 100) : 0;
                return (
                  <div key={opp.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{opp.name}</p>
                      <p className="text-xs text-gray-500">{opp.cooperative} · {(opp.targetAmount / 1_000_000).toFixed(0)}M VNĐ</p>
                      <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/member-hub/capital/opportunities', { state: { scrollToOpportunityId: opp.id } })}
                      className="ml-3 flex-shrink-0 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                    >
                      Đầu tư
                    </button>
                  </div>
                );
              })}
            </div>
            <button onClick={() => navigate('/esg-individual/opportunities')} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">Xem tất cả cơ hội</button>
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Huy hiệu</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <div key={b.id} className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
                <i className={`${b.icon} text-green-600`} />
                <span className="text-sm font-medium text-gray-800">{b.name}</span>
              </div>
            ))}
            {badges.length === 0 && <p className="text-sm text-gray-500">Chưa có huy hiệu. Hãy tham gia thử thách!</p>}
          </div>
          <button onClick={() => navigate('/esg-individual/challenges')} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">Xem thử thách</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/esg-individual/portfolio')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all">
            <i className="ri-pie-chart-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Danh mục ESG</span>
          </button>
          <button onClick={() => navigate('/esg-individual/impact')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all">
            <i className="ri-leaf-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Tác động Xanh</span>
          </button>
          <button onClick={() => navigate('/esg-individual/learning')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all">
            <i className="ri-book-open-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Học tập</span>
          </button>
          <button onClick={() => navigate('/esg-individual/community')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all">
            <i className="ri-community-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
