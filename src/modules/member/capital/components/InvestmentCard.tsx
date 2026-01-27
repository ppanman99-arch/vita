import type { InvestmentOpportunity } from '../../domain/capital';

interface InvestmentCardProps {
  opportunity: InvestmentOpportunity;
  onInvest?: (id: string) => void;
  variant?: 'opportunity' | 'compact';
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function InvestmentCard({ opportunity, onInvest, variant = 'opportunity' }: InvestmentCardProps) {
  const progress = opportunity.targetAmount > 0 ? Math.round((opportunity.raised / opportunity.targetAmount) * 100) : 0;

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 truncate">{opportunity.name}</h4>
          <p className="text-sm text-gray-500 truncate">{opportunity.cooperative}</p>
          <p className="text-sm text-amber-600 font-medium mt-1">
            ROI {opportunity.expectedReturn}%/năm · {opportunity.duration}
          </p>
        </div>
        {onInvest && (
          <button
            onClick={() => onInvest(opportunity.id)}
            className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-yellow-700 transition-all"
          >
            Đầu tư
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      {opportunity.image && (
        <div className="h-40 w-full overflow-hidden">
          <img src={opportunity.image} alt={opportunity.name} className="w-full h-full object-cover object-top" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 flex-1">{opportunity.name}</h3>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold whitespace-nowrap">
            {opportunity.expectedReturn}%/năm
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{opportunity.cooperative}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Đã huy động</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(opportunity.raised)} / {formatCurrency(opportunity.targetAmount)}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
          <span>Thời hạn: {opportunity.duration}</span>
          <span>·</span>
          <span>Tối thiểu: {formatCurrency(opportunity.minInvest)}</span>
          <span>·</span>
          <span>{opportunity.investors} nhà đầu tư</span>
        </div>

        {opportunity.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>
        )}

        {onInvest && (
          <button
            onClick={() => onInvest(opportunity.id)}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all"
          >
            Đầu tư ngay
          </button>
        )}
      </div>
    </div>
  );
}
