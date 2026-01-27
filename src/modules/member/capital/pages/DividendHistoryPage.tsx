import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '../../application/CapitalService';
import type { Dividend } from '../../domain/capital';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

const formatDate = (s: string) => new Date(s).toLocaleDateString('vi-VN');

export default function DividendHistoryPage() {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterProject, setFilterProject] = useState<string>('all');

  useEffect(() => {
    capitalService.getDividendHistory().then((list) => {
      setDividends(list);
      setLoading(false);
    });
  }, []);

  const projects = Array.from(new Set(dividends.map((d) => d.projectName))).sort();
  const filtered = filterProject === 'all' ? dividends : dividends.filter((d) => d.projectName === filterProject);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Lịch sử cổ tức</h1>
              <p className="text-sm text-gray-500">Các lần nhận lãi/cổ tức</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {projects.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterProject('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterProject === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Tất cả
            </button>
            {projects.map((name) => (
              <button
                key={name}
                onClick={() => setFilterProject(name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors truncate max-w-[200px] ${filterProject === name ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((d) => (
            <div key={d.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{d.projectName}</p>
                <p className="text-sm text-gray-500">{d.cooperative}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {formatDate(d.paidAt)}
                  {d.period ? ` · ${d.period}` : ''}
                </p>
              </div>
              <div className="flex-shrink-0 font-semibold text-green-600">+{formatCurrency(d.amount)}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-money-dollar-circle-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Chưa có lịch sử cổ tức.</p>
          </div>
        )}
      </div>
    </div>
  );
}
