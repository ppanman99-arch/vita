import type { Investment } from '../../domain/capital';

interface PortfolioChartProps {
  investments: Investment[];
  totalCurrentValue: number;
  className?: string;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function PortfolioChart({ investments, totalCurrentValue, className = '' }: PortfolioChartProps) {
  if (investments.length === 0) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <h4 className="font-semibold text-gray-900 mb-4">Phân bổ danh mục</h4>
        <div className="h-48 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <i className="ri-pie-chart-line text-4xl mb-2" />
            <p>Chưa có khoản góp vốn</p>
          </div>
        </div>
      </div>
    );
  }

  const total = investments.reduce((s, i) => s + i.currentValue, 0) || totalCurrentValue || 1;
  const segments = investments.map((i, idx) => ({
    ...i,
    share: (i.currentValue / total) * 100,
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h4 className="font-semibold text-gray-900 mb-4">Phân bổ danh mục</h4>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 w-40 h-40 mx-auto sm:mx-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {segments.reduce<{ offset: number; els: JSX.Element[] }>(
              (acc, seg, i) => {
                const dash = (seg.share / 100) * 100;
                const offset = acc.offset;
                acc.els.push(
                  <circle
                    key={i}
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="3"
                    strokeDasharray={`${dash} ${100 - dash}`}
                    strokeDashoffset={-offset}
                  />
                );
                acc.offset += dash;
                return acc;
              },
              { offset: 0, els: [] }
            ).els}
          </svg>
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          {segments.map((seg, i) => (
            <div key={seg.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-sm text-gray-700 truncate flex-1">{seg.projectName}</span>
              <span className="text-sm font-medium text-gray-900 flex-shrink-0">{formatCurrency(seg.currentValue)}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
        Tổng giá trị: <span className="font-semibold text-gray-900">{formatCurrency(totalCurrentValue || total)}</span>
      </p>
    </div>
  );
}
