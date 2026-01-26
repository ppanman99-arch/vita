import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartService } from '../../application/CartService';
import { OrderService } from '../../application/OrderService';
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { GreenPointsService } from '@core/application/shared/GreenPointsService';
import { SupabaseGreenPointsAdapter } from '@core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter';
import { SupabaseDatabaseAdapter } from '@core/infrastructure/adapters/database/SupabaseDatabaseAdapter';
import { ActivityType, Category, Portal } from '@core/domain/greenPoints/GreenPoints';
import type { Cart } from '../../domain/CartItem';
import type { User } from '@core/domain/user/User';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartService = new CartService();
  const orderService = new OrderService(new SupabaseDatabaseAdapter());
  const authService = new AuthService(new SupabaseAuthAdapter());
  const greenPointsService = new GreenPointsService(new SupabaseGreenPointsAdapter());

  const [cart, setCart] = useState<Cart>(cartService.getCart());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    paymentMethod: 'cod' as 'cod' | 'bank_transfer',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate('/nguyen-manh-thuan');
          return;
        }
        setUser(currentUser);
        setFormData(prev => ({
          ...prev,
          name: currentUser.name || '',
          phone: currentUser.phone || '',
        }));
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/nguyen-manh-thuan');
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Refresh cart on mount
    const currentCart = cartService.getCart();
    if (currentCart.items.length === 0) {
      navigate('/nguyen-manh-thuan/cart');
      return;
    }
    setCart(currentCart);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const calculateGreenPoints = (total: number): number => {
    // Rule: 1% of order value, minimum 10 points
    const points = Math.floor(total * 0.01);
    return Math.max(points, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Create order
      const order = await orderService.createOrder({
        userId: user.id,
        items: cart.items,
        total: cart.total,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
      });

      // Calculate and earn Green Points
      const greenPointsToEarn = calculateGreenPoints(cart.total);
      try {
        await greenPointsService.earnPoints({
          userId: user.id,
          userType: 'consumer',
          points: greenPointsToEarn,
          activity: ActivityType.PURCHASE,
          category: Category.PURCHASE,
          portal: Portal.NGUYENMANHTHUAN,
          platformSource: 'nguyenmanhthuan',
          metadata: {
            orderId: order.id,
            orderValue: cart.total,
          },
        });

        // Update order with green points earned
        await orderService.updateOrderStatus(order.id, 'confirmed');
      } catch (greenPointsError) {
        console.error('Error earning Green Points:', greenPointsError);
        // Continue even if Green Points fails
      }

      // Clear cart
      cartService.clearCart();

      // Navigate to success page or order history
      navigate(`/nguyen-manh-thuan/orders?success=true&orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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

  const greenPointsToEarn = calculateGreenPoints(cart.total);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin giao hàng</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    placeholder="Số nhà, tên đường"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Phương thức thanh toán</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'cod' })}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'bank_transfer' })}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-gray-600">Chuyển khoản trước khi nhận hàng</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-green-600">{formatPrice(cart.total)}</span>
                  </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-gray-700 mb-1">
                    <i className="ri-leaf-line text-green-600 mr-1"></i>
                    Bạn sẽ nhận được
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    {greenPointsToEarn.toLocaleString('vi-VN')} điểm Green
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
