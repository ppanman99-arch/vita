import type { Voucher } from '../../domain/consumer';

interface VoucherCardProps {
  voucher: Voucher;
  onUse?: (id: string) => void;
  onCopy?: (code: string) => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function VoucherCard({ voucher, onUse, onCopy }: VoucherCardProps) {
  const isAvailable = voucher.status === 'available';
  const discountLabel =
    voucher.discountType === 'percent'
      ? `Giảm ${voucher.discount}%`
      : `Giảm ${formatCurrency(voucher.discount)}`;

  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        isAvailable
          ? 'bg-white border-blue-200 hover:border-blue-300'
          : 'bg-gray-50 border-gray-200 opacity-75'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900">{voucher.name}</p>
          <p className="text-sm text-gray-500 mt-1">
            Đơn tối thiểu: {formatCurrency(voucher.minOrder)} · HSD: {voucher.expiryDate}
          </p>
          {voucher.status === 'used' && voucher.usedDate && (
            <p className="text-xs text-gray-400 mt-1">Đã dùng {voucher.usedDate}</p>
          )}
        </div>
        <span
          className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {discountLabel}
        </span>
      </div>
      {isAvailable && (
        <div className="flex gap-2 mt-4">
          {onUse && (
            <button
              onClick={() => onUse(voucher.id)}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Sử dụng
            </button>
          )}
          {onCopy && voucher.code && (
            <button
              onClick={() => onCopy(voucher.code!)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              Copy mã
            </button>
          )}
        </div>
      )}
    </div>
  );
}
