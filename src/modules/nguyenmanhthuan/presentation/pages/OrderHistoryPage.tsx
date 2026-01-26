import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OrderService } from '../../application/OrderService';
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';
import type { Order } from '../../domain/Order';
import type { User } from '@core/domain/user/User';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderService = new OrderService(new SupabaseDatabaseAdapter());
  const authService = new AuthService(new SupabaseAuthAdapter());

  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate('/nguyen-manh-thuan');
          return;
        }
        setUser(currentUser);

        // Check for success message
        const success = searchParams.get('success');
        const orderIdParam = searchParams.get('orderId');
        if (success === 'true' && orderIdParam) {
          setShowSuccess(true);
          setOrderId(orderIdParam);
        }

        // Fetch orders
        const userOrders = await orderService.getUserOrders(currentUser.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setAuthLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipping':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-green-600 animate-spin mb-4"></i>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lịch sử đơn hàng</h1>
          <button
            onClick={() => navigate('/nguyen-manh-thuan')}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>

        {showSuccess && orderId && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="ri-checkbox-circle-fill text-3xl text-green-600"></i>
              <div>
                <p className="font-bold text-green-900">Đặt hàng thành công!</p>
                <p className="text-sm text-green-700">Mã đơn hàng: {orderId}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowSuccess(false);
                setOrderId(null);
                navigate('/nguyen-manh-thuan/orders');
              }}
              className="text-green-700 hover:text-green-900"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bạn chưa có đơn hàng nào</h2>
            <p className="text-gray-600 mb-6">Hãy bắt đầu mua sắm để xem đơn hàng của bạn ở đây</p>
            <button
              onClick={() => navigate('/nguyen-manh-thuan')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Bắt đầu mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Đơn hàng #{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      Đặt ngày: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-green-600">{formatPrice(order.total)}</span>
                  </div>
                  {order.greenPointsEarned && (
                    <div className="flex items-center gap-2 text-sm text-green-700 pt-2">
                      <i className="ri-leaf-line"></i>
                      <span>Đã nhận {order.greenPointsEarned.toLocaleString('vi-VN')} điểm Green</span>
                    </div>
                  )}
                </div>

                {order.shippingAddress && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Giao đến:</span> {order.shippingAddress.name} - {order.shippingAddress.phone}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
