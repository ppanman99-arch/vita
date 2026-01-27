import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '../../application/CapitalService';
import type { Portfolio } from '../../domain/capital';
import PortfolioChart from '../components/PortfolioChart';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function CapitalContributionDashboardPage() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    capitalService.getPortfolio().then((p) => {
      setPortfolio(p);
      setLoading(false);
    });
  }, []);

  const links = [
    { label: 'Cơ hội đầu tư', path: '/member-hub/capital/opportunities', icon: 'ri-funds-line' },
    { label: 'Danh mục của tôi', path: '/member-hub/capital/portfolio', icon: 'ri-folder-chart-line' },
    { label: 'Lịch sử cổ tức', path: '/member-hub/capital/dividends', icon: 'ri-money-dollar-circle-line' },
    { label: 'Lịch sử giao dịch', path: '/member-hub/capital/transactions', icon: 'ri-bank-card-line' },
  ];

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
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Góp vốn</h1>
              <p className="text-sm text-gray-500">Tổng quan đầu tư</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
          <p className="text-amber-100 text-sm mb-1">Tổng giá trị danh mục</p>
          <p className="text-3xl font-bold mb-4">{formatCurrency(p.totalCurrentValue)}</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-amber-100 text-xs">Đã góp vốn</p>
              <p className="font-semibold">{formatCurrency(p.totalInvested)}</p>
            </div>
            <div>
              <p className="text-amber-100 text-xs">Lợi nhuận</p>
              <p className="font-semibold text-green-200">+{formatCurrency(p.totalProfitAmount)}</p>
            </div>
            <div>
              <p className="text-amber-100 text-xs">ROI</p>
              <p className="font-semibold text-green-200">+{p.totalProfitPercent.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {links.map(({ label, path, icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-amber-200 transition-all"
            >
              <i className={`${icon} text-2xl text-amber-600`} />
              <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
            </button>
          ))}
        </div>

        <PortfolioChart investments={p.investments} totalCurrentValue={p.totalCurrentValue} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Gần đây</h2>
            <button
              onClick={() => navigate('/member-hub/capital/portfolio')}
              className="text-sm text-amber-600 font-medium hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {p.investments.slice(0, 3).map((inv) => (
              <div
                key={inv.id}
                onClick={() => navigate('/member-hub/capital/portfolio')}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-amber-200 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{inv.projectName}</p>
                  <p className="text-sm text-gray-500 truncate">{inv.cooperative}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-semibold text-gray-900">{formatCurrency(inv.currentValue)}</p>
                  <p className="text-sm text-green-600">+{inv.profitPercent}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
