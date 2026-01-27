import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '../../application/CapitalService';
import type { Portfolio } from '../../domain/capital';
import PortfolioChart from '../components/PortfolioChart';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function CapitalPortfolioPage() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    capitalService.getPortfolio().then((p) => {
      setPortfolio(p);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  const p = portfolio!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Danh mục của tôi</h1>
              <p className="text-sm text-gray-500">Các khoản đã góp vốn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-wrap gap-6 mb-6">
            <div>
              <p className="text-gray-500 text-sm">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(p.totalCurrentValue)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Đã góp vốn</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(p.totalInvested)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Lợi nhuận</p>
              <p className="text-2xl font-bold text-green-600">+{formatCurrency(p.totalProfitAmount)} (+{p.totalProfitPercent.toFixed(1)}%)</p>
            </div>
          </div>
          <PortfolioChart investments={p.investments} totalCurrentValue={p.totalCurrentValue} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chi tiết từng dự án</h2>
          <div className="space-y-4">
            {p.investments.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {inv.image && (
                  <div className="h-36 w-full overflow-hidden">
                    <img src={inv.image} alt={inv.projectName} className="w-full h-full object-cover object-top" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{inv.projectName}</h3>
                      <p className="text-sm text-gray-500">{inv.cooperative}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium whitespace-nowrap">
                      {inv.status === 'active' ? 'Đang hoạt động' : inv.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-gray-500 text-xs">Đã góp</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(inv.invested)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Giá trị hiện tại</p>
                      <p className="font-semibold text-gray-900">{formatCurrency(inv.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">ROI</p>
                      <p className="font-semibold text-green-600">+{inv.profitPercent}%</p>
                    </div>
                    {inv.nextDividend && (
                      <div>
                        <p className="text-gray-500 text-xs">Cổ tức tiếp</p>
                        <p className="font-semibold text-gray-900">{inv.nextDividend}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {p.investments.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <i className="ri-folder-chart-line text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Chưa có khoản góp vốn.</p>
              <button
                onClick={() => navigate('/member-hub/capital/opportunities')}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
              >
                Xem cơ hội đầu tư
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
