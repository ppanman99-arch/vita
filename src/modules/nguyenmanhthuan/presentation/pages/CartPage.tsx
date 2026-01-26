import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartService } from '../../application/CartService';
import type { Cart } from '../../domain/CartItem';

export default function CartPage() {
  const navigate = useNavigate();
  const cartService = new CartService();
  const [cart, setCart] = useState<Cart>(cartService.getCart());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Refresh cart on mount
    setCart(cartService.getCart());
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartService.updateQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartService.removeFromCart(productId);
    setCart(updatedCart);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert('Giỏ hàng của bạn đang trống');
      return;
    }
    navigate('/nguyen-manh-thuan/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <button
              onClick={() => navigate('/nguyen-manh-thuan')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-4"
              >
                {item.product.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.product.name}
                  </h3>
                  {item.product.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                  )}
                  <p className="text-xl font-bold text-green-600 mb-4">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <i className="ri-delete-bin-line mr-1"></i>
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({cart.itemCount} sản phẩm)</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-green-600">{formatPrice(cart.total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading || cart.items.length === 0}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : 'Thanh toán'}
              </button>
              <button
                onClick={() => navigate('/nguyen-manh-thuan')}
                className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
