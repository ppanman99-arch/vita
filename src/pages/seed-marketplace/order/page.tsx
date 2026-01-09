import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

interface OrderFormData {
  productId: string;
  quantity: number;
  deliveryAddress: string;
  recipientType: 'self' | 'htx' | 'project';
  recipientId?: string;
  recipientName?: string;
  paymentMethod: 'direct' | 'voucher' | 'sponsor';
  voucherCode?: string;
  notes: string;
  contractType: '3-party' | '2-party';
  payer: 'self' | 'b2b' | 'esg' | 'greenlight';
}

export default function SeedOrderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const source = searchParams.get('source'); // 'self', 'b2b', 'esg', 'greenlight'
  const voucherCode = searchParams.get('voucher');

  const [orderForm, setOrderForm] = useState<OrderFormData>({
    productId: productId || '',
    quantity: 1000,
    deliveryAddress: '',
    recipientType: source === 'b2b' || source === 'esg' ? 'htx' : 'self',
    recipientId: '',
    recipientName: '',
    paymentMethod: source === 'greenlight' ? 'voucher' : 'direct',
    voucherCode: voucherCode || '',
    notes: '',
    contractType: (source === 'b2b' || source === 'esg') ? '3-party' : '2-party',
    payer: source === 'b2b' ? 'b2b' : source === 'esg' ? 'esg' : source === 'greenlight' ? 'greenlight' : 'self',
  });

  // Mock product data
  const product = {
    id: productId || 'SP-001',
    name: 'Sâm Ngọc Linh',
    vendor: 'Viện Dược Liệu Trung ương',
    price: 25000,
    minOrder: 1000,
    available: 50000,
    warranty: { survivalRate: 90, warrantyPeriod: 15 },
  };

  const totalAmount = orderForm.quantity * product.price;

  const handleSubmit = () => {
    // Generate Batch ID
    // Format: SD-YYYY-VENDOR-SPECIES-XXX
    const vendorCode = 'VIL'; // In real app, get from vendor
    const speciesCode = product.name.substring(0, 3).toUpperCase().replace(/\s/g, '');
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const batchId = `SD-${new Date().getFullYear()}-${vendorCode}-${speciesCode}-${sequence}`;
    
    const message = `Đơn hàng đã được tạo thành công!

Mã lô (Batch ID): ${batchId}
Số lượng: ${orderForm.quantity.toLocaleString()} cây
Tổng tiền: ${totalAmount.toLocaleString()} VNĐ

Batch ID này sẽ theo cây suốt vòng đời và dùng để truy xuất nguồn gốc khi thu hoạch.`;

    alert(message);
    
    // Navigate to batch trace page
    navigate(`/seed-marketplace/trace/${batchId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Đặt hàng Giống</h1>
                <p className="text-green-100 text-sm">
                  {source === 'b2b' && 'Luồng B2B - Doanh nghiệp mua giống cho HTX'}
                  {source === 'esg' && 'Luồng ESG - Tài trợ hiện vật cây giống'}
                  {source === 'greenlight' && 'Luồng GreenLight - Sử dụng Voucher'}
                  {(!source || source === 'self') && 'Luồng HTX - Tự mua giống'}
                </p>
              </div>
            </div>
            <PortalSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Product Info */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Sản phẩm</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Sản phẩm</p>
                <p className="font-semibold text-gray-900">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nhà cung cấp</p>
                <p className="font-semibold text-gray-900">{product.vendor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Giá</p>
                <p className="font-semibold text-green-600">{product.price.toLocaleString()} VNĐ/cây</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tồn kho</p>
                <p className="font-semibold text-gray-900">{product.available.toLocaleString()} cây</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={product.minOrder}
                max={product.available}
                value={orderForm.quantity}
                onChange={(e) => setOrderForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Đơn tối thiểu: {product.minOrder.toLocaleString()} cây
              </p>
            </div>

            {/* Recipient Selection (for B2B/ESG flows) */}
            {(source === 'b2b' || source === 'esg') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Người nhận hàng (HTX) <span className="text-red-500">*</span>
                </label>
                <select
                  value={orderForm.recipientId}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, recipientId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Chọn HTX nhận hàng</option>
                  <option value="htx-001">HTX Tu Mơ Rông - Kon Tum</option>
                  <option value="htx-002">HTX Ngọc Linh - Kon Tum</option>
                  <option value="htx-003">HTX Dược liệu Sapa - Lào Cai</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {source === 'b2b' 
                    ? 'Giống sẽ được chuyển đến kho HTX. HTX sẽ nhận thông báo khi hàng được giao.'
                    : 'Giống sẽ được chuyển đến kho HTX như một phần của dự án tài trợ ESG.'}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ giao hàng <span className="text-red-500">*</span>
              </label>
              <textarea
                value={orderForm.deliveryAddress}
                onChange={(e) => setOrderForm(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Nhập địa chỉ chi tiết để nhận hàng..."
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phương thức thanh toán <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="direct"
                    checked={orderForm.paymentMethod === 'direct'}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, paymentMethod: 'direct' as any }))}
                    className="w-5 h-5 text-green-600"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">Thanh toán trực tiếp</div>
                    <div className="text-sm text-gray-600">Thanh toán ngay qua ví hoặc chuyển khoản</div>
                  </div>
                </label>
                {source === 'greenlight' && (
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="voucher"
                      checked={orderForm.paymentMethod === 'voucher'}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, paymentMethod: 'voucher' as any }))}
                      className="w-5 h-5 text-green-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Sử dụng Voucher</div>
                      <div className="text-sm text-gray-600">Áp dụng voucher giống từ GreenLight</div>
                    </div>
                  </label>
                )}
              </div>
              {orderForm.paymentMethod === 'voucher' && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={orderForm.voucherCode}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, voucherCode: e.target.value }))}
                    placeholder="Nhập mã voucher"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}
            </div>

            {/* 3-Party Contract Info */}
            {(source === 'b2b' || source === 'esg') && (
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-file-contract-line text-blue-600"></i>
                  Hợp đồng 3 bên
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Bên A (Bán):</strong> {product.vendor}</p>
                  <p><strong>Bên B (Mua/Tài trợ):</strong> {source === 'b2b' ? 'Doanh nghiệp B2B' : 'Doanh nghiệp ESG'}</p>
                  <p><strong>Bên C (Nhận & Trồng):</strong> HTX (sẽ được chọn ở trên)</p>
                  <p className="mt-3 text-gray-600">
                    <i className="ri-information-line mr-1"></i>
                    Hợp đồng sẽ bao gồm điều khoản bảo hành tỷ lệ sống {product.warranty.survivalRate}% trong {product.warranty.warrantyPeriod} ngày.
                  </p>
                </div>
              </div>
            )}

            {/* Warranty Info */}
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <i className="ri-shield-check-line text-green-600"></i>
                Điều khoản Bảo hành
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>• Tỷ lệ sống tối thiểu: <strong>{product.warranty.survivalRate}%</strong> trong {product.warranty.warrantyPeriod} ngày sau khi trồng</p>
                <p>• HTX xác nhận "Nhập kho" khi nhận hàng (chụp ảnh tình trạng cây)</p>
                <p>• Sau {product.warranty.warrantyPeriod} ngày, HTX báo cáo tỷ lệ sống thực tế</p>
                <p>• Nếu chết &gt; {(100 - product.warranty.survivalRate)}% do nấm bệnh từ giống → Nhà cung cấp đền bù</p>
                <p>• Nếu chết do HTX không chăm sóc → HTX chịu trách nhiệm</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
              <textarea
                value={orderForm.notes}
                onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Thêm ghi chú cho đơn hàng (nếu có)..."
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt Đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sản phẩm</span>
                  <span className="font-semibold">{product.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số lượng</span>
                  <span className="font-semibold">{orderForm.quantity.toLocaleString()} cây</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Đơn giá</span>
                  <span className="font-semibold">{product.price.toLocaleString()} VNĐ/cây</span>
                </div>
                <div className="pt-3 border-t border-gray-300 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Tổng tiền</span>
                  <span className="text-2xl font-bold text-green-600">{totalAmount.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/seed-marketplace')}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium text-lg"
              >
                <i className="ri-check-line mr-2"></i>
                Xác nhận Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

