import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import GreenPointsBadge from '@/components/shared/GreenPointsBadge';
import { consumerService } from '../../application/ConsumerService';
import type { GreenPoints } from '@/lib/greenPoints/types';
import type { Voucher, ConsumerOrder } from '../../domain/consumer';
import VoucherCard from '../components/VoucherCard';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function ConsumerDashboardPage() {
  const navigate = useNavigate();
  const [greenPoints, setGreenPoints] = useState<GreenPoints | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [recentOrders, setRecentOrders] = useState<ConsumerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      consumerService.getGreenPoints(),
      consumerService.getVouchers(),
      consumerService.getPurchaseHistory(),
    ]).then(([gp, v, orders]) => {
      setGreenPoints(gp ?? null);
      setVouchers(v);
      setRecentOrders((orders ?? []).slice(0, 3));
      setLoading(false);
    });
  }, []);

  const links = [
    { label: 'Sản phẩm HTX', path: '/member-hub/consumer/catalog', icon: 'ri-shopping-bag-line' },
    { label: 'Voucher của tôi', path: '/member-hub/consumer/vouchers', icon: 'ri-coupon-line' },
    { label: 'Đổi điểm', path: '/member-hub/consumer/rewards', icon: 'ri-gift-line' },
    { label: 'Lịch sử mua hàng', path: '/member-hub/consumer/history', icon: 'ri-history-line' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  const totalSaved = 0; // Could derive from (price - memberPrice) * qty over orders

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Tiêu dùng</h1>
              <p className="text-sm text-gray-500">Ưu đãi xã viên & Green Points</p>
            </div>
            <GreenPointsBadge className="flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm mb-1">Green Points</p>
          <p className="text-3xl font-bold mb-1">{greenPoints?.availablePoints ?? 0} điểm</p>
          <p className="text-blue-100 text-sm">Hạng {greenPoints?.tier ?? 'bronze'}</p>
          {totalSaved > 0 && (
            <p className="text-blue-100 text-sm mt-2">Đã tiết kiệm ~{formatCurrency(totalSaved)} nhờ giá xã viên</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {links.map(({ label, path, icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <i className={`${icon} text-2xl text-blue-600`} />
              <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Voucher khả dụng</h2>
            <button
              onClick={() => navigate('/member-hub/consumer/vouchers')}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {vouchers.filter((v) => v.status === 'available').slice(0, 2).map((v) => (
              <VoucherCard key={v.id} voucher={v} onUse={() => navigate('/member-hub/consumer/vouchers')} />
            ))}
            {vouchers.filter((v) => v.status === 'available').length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                <i className="ri-coupon-line text-3xl mb-2" />
                <p>Chưa có voucher. Đổi điểm để nhận ưu đãi.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Mua hàng gần đây</h2>
            <button
              onClick={() => navigate('/member-hub/consumer/history')}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div
                key={o.id}
                onClick={() => navigate('/member-hub/consumer/history')}
                className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{o.items}</p>
                  <p className="text-sm text-gray-500">{o.date}</p>
                </div>
                <p className="font-semibold text-gray-900 flex-shrink-0 ml-4">{formatCurrency(o.total)}</p>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                <i className="ri-shopping-cart-line text-3xl mb-2" />
                <p>Chưa có đơn hàng.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
