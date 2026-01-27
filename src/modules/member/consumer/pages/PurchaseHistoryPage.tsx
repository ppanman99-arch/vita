import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { consumerService } from '../../application/ConsumerService';
import type { ConsumerOrder } from '../../domain/consumer';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function PurchaseHistoryPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ConsumerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    consumerService.getPurchaseHistory().then((list) => {
      setOrders(list);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Lịch sử mua hàng</h1>
              <p className="text-sm text-gray-500">Đơn hàng của bạn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{o.id}</p>
                <p className="text-sm text-gray-600 mt-1">{o.items}</p>
                <p className="text-xs text-gray-400 mt-1">{o.date}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="font-bold text-gray-900">{formatCurrency(o.total)}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  o.status === 'completed' ? 'bg-green-100 text-green-700' :
                  o.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                }`}>{o.status === 'completed' ? 'Hoàn thành' : o.status === 'pending' ? 'Đang xử lý' : 'Đã hủy'}</span>
                <button
                  onClick={() => {}}
                  className="text-sm text-blue-600 hover:underline"
                >Mua lại</button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-history-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Chưa có đơn hàng.</p>
            <button onClick={() => navigate('/member-hub/consumer/catalog')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Xem sản phẩm</button>
          </div>
        )}
      </div>
    </div>
  );
}
