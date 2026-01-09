import { useState } from 'react';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function PartnerOrderPage() {
  const [orderType, setOrderType] = useState<'preorder' | 'regular'>('preorder');
  const [selectedProducts, setSelectedProducts] = useState<{[key: string]: number}>({});

  const availableProducts = [
    { id: 'cgl', name: 'Cà Gai Leo', available: 850, price: 180000, quality: 'A+', harvestDate: 'Tháng 2/2024' },
    { id: 'ht', name: 'Hoàng Tinh', available: 720, price: 220000, quality: 'A', harvestDate: 'Tháng 3/2024' },
    { id: 'bt', name: 'Bạch Truật', available: 950, price: 250000, quality: 'A+', harvestDate: 'Tháng 4/2024' },
    { id: 'dq', name: 'Đương Quy', available: 680, price: 280000, quality: 'A', harvestDate: 'Tháng 5/2024' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: Math.max(0, quantity)
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
      const product = availableProducts.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đặt hàng</h1>
              <p className="text-sm opacity-90">Đặt hàng trước hoặc đặt hàng thường</p>
            </div>
          </div>
          <PortalSwitcher />
        </div>

        {/* Order Type Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setOrderType('preorder')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
              orderType === 'preorder'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <i className="ri-calendar-check-line mr-2"></i>
            Đặt hàng trước
          </button>
          <button
            onClick={() => setOrderType('regular')}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
              orderType === 'regular'
                ? 'bg-white text-blue-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <i className="ri-shopping-cart-line mr-2"></i>
            Đặt hàng thường
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-6 py-4">
        {/* Info Banner */}
        <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">
                {orderType === 'preorder' ? 'Đặt hàng trước (Pre-order)' : 'Đặt hàng thường'}
              </h3>
              <p className="text-sm text-blue-700">
                {orderType === 'preorder' 
                  ? 'Đặt hàng trước với giá ưu đãi, giao hàng theo lịch thu hoạch dự kiến'
                  : 'Đặt hàng từ kho có sẵn, giao hàng trong 3-5 ngày làm việc'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3 mb-4">
          {availableProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                        {product.quality}
                      </span>
                      <span className="text-xs text-gray-500">
                        <i className="ri-calendar-line mr-1"></i>
                        {product.harvestDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">{formatCurrency(product.price)}</div>
                    <div className="text-xs text-gray-500">/kg</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Số lượng có sẵn:</span>
                    <span className="font-semibold text-gray-800">{product.available} kg</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) - 50)}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <i className="ri-subtract-line text-gray-600"></i>
                    </button>
                    <input
                      type="number"
                      value={selectedProducts[product.id] || 0}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                      className="flex-1 text-center border-2 border-gray-200 rounded-lg py-2 font-semibold focus:border-blue-500 focus:outline-none"
                      min="0"
                      max={product.available}
                    />
                    <button
                      onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) + 50)}
                      className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                    >
                      <i className="ri-add-line text-white"></i>
                    </button>
                  </div>
                </div>

                {selectedProducts[product.id] > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tạm tính:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(product.price * selectedProducts[product.id])}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        {Object.keys(selectedProducts).length > 0 && Object.values(selectedProducts).some(q => q > 0) && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-4">
            <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-2 mb-4">
              {Object.entries(selectedProducts)
                .filter(([_, quantity]) => quantity > 0)
                .map(([productId, quantity]) => {
                  const product = availableProducts.find(p => p.id === productId);
                  if (!product) return null;
                  return (
                    <div key={productId} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{product.name} × {quantity} kg</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(product.price * quantity)}</span>
                    </div>
                  );
                })}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-semibold text-gray-800">{formatCurrency(calculateTotal())}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-semibold text-gray-800">Liên hệ</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-gray-800">Tổng cộng:</span>
                <span className="font-bold text-blue-600">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3.5 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg">
              <i className="ri-check-line mr-2"></i>
              Xác nhận đặt hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
