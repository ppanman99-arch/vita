import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { consumerService } from '../../application/ConsumerService';
import type { Voucher } from '../../domain/consumer';
import VoucherCard from '../components/VoucherCard';

export default function MemberVouchersPage() {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    consumerService.getVouchers().then((list) => {
      setVouchers(list);
      setLoading(false);
    });
  }, []);

  const handleUse = (id: string) => {
    // Navigate to catalog or cart; for demo just show alert
    const v = vouchers.find((x) => x.id === id);
    if (v) alert(`Sử dụng voucher: ${v.name}\n(Demo: chưa tích hợp trang đặt hàng.)`);
  };

  const handleCopy = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      alert('Đã copy mã.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  const available = vouchers.filter((v) => v.status === 'available');
  const used = vouchers.filter((v) => v.status === 'used');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Voucher của tôi</h1>
              <p className="text-sm text-gray-500">{available.length} mã khả dụng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {available.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Khả dụng</h2>
            <div className="space-y-3">
              {available.map((v) => (
                <VoucherCard key={v.id} voucher={v} onUse={handleUse} onCopy={handleCopy} />
              ))}
            </div>
          </div>
        )}
        {used.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Đã sử dụng</h2>
            <div className="space-y-3">
              {used.map((v) => (
                <VoucherCard key={v.id} voucher={v} />
              ))}
            </div>
          </div>
        )}
        {vouchers.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-coupon-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Bạn chưa có voucher.</p>
            <button
              onClick={() => navigate('/member-hub/consumer/rewards')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Đổi điểm lấy voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
