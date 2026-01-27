import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgInvestmentAggregatorService } from '../../application/ESGInvestmentAggregatorService';
import type { AggregatedESGPortfolio } from '../../domain/PersonalESG';

export default function ESGPortfolioPage() {
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

  const p = portfolio!;
  const totalItems = p.items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Danh mục ESG</h1>
              <p className="text-sm text-gray-500">Tổng hợp từ góp vốn & Điểm Xanh</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Tổng giá trị</p>
            <p className="text-xl font-bold text-gray-900">
              {p.totalESGValue.toLocaleString('vi-VN')} <span className="text-sm font-normal">VNĐ</span>
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Điểm Xanh</p>
            <p className="text-xl font-bold text-teal-600">{p.totalGreenPoints.toLocaleString('vi-VN')}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Theo nguồn</h3>
          <div className="space-y-2">
            {p.bySource.capital > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Góp vốn HTX</span>
                <span className="font-medium">{p.bySource.capital.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            )}
            {p.bySource.investor > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đầu tư ESG</span>
                <span className="font-medium">{p.bySource.investor.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            )}
            {p.bySource.consumer > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Điểm Xanh (tiêu dùng)</span>
                <span className="font-medium">{p.bySource.consumer} điểm</span>
              </div>
            )}
            {p.bySource.capital === 0 && p.bySource.investor === 0 && p.bySource.consumer === 0 && (
              <p className="text-sm text-gray-500">Chưa có dữ liệu. Góp vốn hoặc tích điểm từ tiêu dùng xanh để thấy ở đây.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Chi tiết ({totalItems})</h3>
          <ul className="space-y-3">
            {p.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  {item.projectOrDescription && (
                    <p className="text-xs text-gray-500">{item.projectOrDescription}</p>
                  )}
                  <p className="text-xs text-gray-400">{item.date.slice(0, 10)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {item.unit === 'VND'
                      ? `${(item.amount / 1_000_000).toFixed(1)}M`
                      : item.amount.toLocaleString('vi-VN')}
                  </p>
                  <p className="text-xs text-gray-500">{item.unit}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/member-hub')}
            className="flex-1 py-3 rounded-xl border border-emerald-500 text-emerald-600 font-medium hover:bg-emerald-50"
          >
            Vào Hub Xã viên
          </button>
          <button
            onClick={() => navigate('/esg-individual')}
            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Về Dashboard ESG
          </button>
        </div>
      </div>
    </div>
  );
}
