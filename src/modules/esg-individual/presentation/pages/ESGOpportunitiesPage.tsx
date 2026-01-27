import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '@/modules/member/application/CapitalService';
import type { InvestmentOpportunity } from '@/modules/member/domain/capital';

export default function ESGOpportunitiesPage() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    capitalService.getInvestmentOpportunities().then((list) => {
      setOpportunities(list);
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Cơ hội đầu tư xanh</h1>
              <p className="text-sm text-gray-500">Dự án từ HTX · Đầu tư để tăng chỉ số ESG</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {opportunities.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
            <i className="ri-plant-line text-4xl text-gray-300 mb-3" />
            <p>Chưa có cơ hội đầu tư. HTX sẽ đăng dự án khi sẵn sàng kêu gọi vốn.</p>
            <button onClick={() => navigate('/esg-individual')} className="mt-4 text-emerald-600 font-medium hover:underline">Về Dashboard</button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {opportunities.map((opp) => {
                const pct = opp.targetAmount > 0 ? Math.round((opp.raised / opp.targetAmount) * 100) : 0;
                return (
                  <div key={opp.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    {opp.image && (
                      <img src={opp.image} alt="" className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{opp.name}</h3>
                      <p className="text-sm text-gray-500">{opp.cooperative}</p>
                      {opp.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{opp.description}</p>}
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>{(opp.targetAmount / 1_000_000).toFixed(0)}M mục tiêu</span>
                        <span>{(opp.minInvest / 1_000_000).toFixed(0)}M tối thiểu</span>
                        <span>{opp.expectedReturn}% lợi nhuận ước tính</span>
                      </div>
                      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Đã gọi: {(opp.raised / 1_000_000).toFixed(0)}M ({pct}%)</p>
                    </div>
                    <button
                      onClick={() => navigate('/member-hub/capital/opportunities', { state: { scrollToOpportunityId: opp.id } })}
                      className="flex-shrink-0 w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
                    >
                      Đầu tư
                    </button>
                  </div>
                );
              })}
            </div>
            <button onClick={() => navigate('/esg-individual')} className="text-emerald-600 text-sm font-medium hover:underline">Về Dashboard ESG Cá nhân</button>
          </>
        )}
      </div>
    </div>
  );
}
