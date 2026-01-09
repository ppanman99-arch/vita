import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SeedOrder {
  seedType: string;
  quantity: number;
  unit: string;
  supplier: string;
  batchId: string;
  paymentMethod: 'voucher' | 'escrow';
  amount: number;
}

interface EscrowRelease {
  contractId: string;
  projectName: string;
  releasePercentage: number;
  releaseAmount: number;
  condition: string;
  status: 'pending' | 'unlocked' | 'completed';
}

export default function InputSourcingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [escrowReleases, setEscrowReleases] = useState<EscrowRelease[]>([
    {
      contractId: 'OFFTAKE-2024-001',
      projectName: 'Sâm Ngọc Linh - Đã có đầu ra B2B',
      releasePercentage: 30,
      releaseAmount: 1500000000,
      condition: 'Đã ký hợp đồng B2B - Giải ngân 30% để mua giống',
      status: 'pending'
    }
  ]);
  const [order, setOrder] = useState<SeedOrder>({
    seedType: '',
    quantity: 0,
    unit: 'cây',
    supplier: '',
    batchId: '',
    paymentMethod: 'escrow',
    amount: 0
  });

  const seedTypes = [
    { value: 'mega-3p', label: 'Mega 3P (Gỗ che bóng)', price: 125000, supplier: 'Viện Dược Liệu' },
    { value: 'sam-mo', label: 'Sâm mô 1 tuổi', price: 50000, supplier: 'Viện Dược Liệu' },
    { value: 'dang-sam', label: 'Đẳng Sâm giống', price: 30000, supplier: 'Viện Dược Liệu' },
    { value: 'other', label: 'Giống khác', price: 0, supplier: '' }
  ];

  // Bước 1: Smart Contract Unlock
  const handleUnlock = (release: EscrowRelease) => {
    setEscrowReleases(releases => 
      releases.map(r => r.contractId === release.contractId 
        ? { ...r, status: 'unlocked' as const }
        : r
      )
    );
    setCurrentStep(2);
  };

  // Bước 2: Đặt hàng trên Sàn Giống
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSeed = seedTypes.find(s => s.value === order.seedType);
    if (selectedSeed) {
      const totalAmount = order.quantity * selectedSeed.price;
      const batchId = `GL-2026-${Date.now().toString().slice(-6)}`;
      setOrder({
        ...order,
        amount: totalAmount,
        batchId,
        supplier: selectedSeed.supplier
      });
      setCurrentStep(3);
    }
  };

  // Bước 3: Giao nhận & QR Tracking
  const handleReceiveBatch = () => {
    // Simulate receiving
    alert(`Đã nhận Batch #${order.batchId}. Lịch sử đời cây bắt đầu được ghi lại!`);
    navigate('/admin-warehouse');
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/escrow-wallet')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Cung Ứng Đầu Vào</h1>
              <p className="text-sm opacity-90">Bước 1: Giải ngân vốn mua giống</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-lock-unlock-line text-blue-600 text-3xl"></i>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Contract - Giải ngân vốn</h2>
                <p className="text-gray-600">
                  Dựa trên Hợp đồng B2B/ESG đã ký, Smart Contract tự động mở khóa một phần tiền trong Ví Dự án chuyên dùng để mua giống.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {escrowReleases.map((release) => (
                <div
                  key={release.contractId}
                  className={`p-6 rounded-xl border-2 ${
                    release.status === 'unlocked'
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{release.projectName}</h3>
                      <p className="text-sm text-gray-600">Mã hợp đồng: {release.contractId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      release.status === 'unlocked'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {release.status === 'unlocked' ? 'Đã mở khóa' : 'Chờ mở khóa'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Giải ngân</p>
                      <p className="text-lg font-bold text-gray-900">{release.releasePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Số tiền</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(release.releaseAmount / 1000000).toFixed(0)}M VNĐ
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Điều kiện</p>
                      <p className="text-xs font-medium text-gray-700">{release.condition}</p>
                    </div>
                  </div>

                  {release.status === 'pending' && (
                    <button
                      onClick={() => handleUnlock(release)}
                      className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                    >
                      Mở khóa Smart Contract → Đặt hàng Giống
                    </button>
                  )}

                  {release.status === 'unlocked' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm text-emerald-800">
                        <i className="ri-checkbox-circle-line mr-2"></i>
                        Tiền đã được giải ngân và sẵn sàng để đặt hàng giống trên Sàn Giống VITA.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đặt hàng trên Sàn Giống</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt mua Giống</h2>
              <p className="text-gray-600">Sử dụng tiền từ Escrow hoặc Voucher Giống để đặt hàng</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại giống <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={order.seedType}
                  onChange={(e) => {
                    const selected = seedTypes.find(s => s.value === e.target.value);
                    setOrder({
                      ...order,
                      seedType: e.target.value,
                      supplier: selected?.supplier || ''
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Chọn loại giống</option>
                  {seedTypes.map((seed) => (
                    <option key={seed.value} value={seed.value}>
                      {seed.label} - {seed.price.toLocaleString()} VNĐ/{order.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số lượng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={order.quantity || ''}
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    const selected = seedTypes.find(s => s.value === order.seedType);
                    setOrder({
                      ...order,
                      quantity: qty,
                      amount: qty * (selected?.price || 0)
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Ví dụ: 10000"
                />
                <p className="text-xs text-gray-500 mt-1">Ví dụ: 10.000 cây Mega 3P, 50.000 cây Sâm mô</p>
              </div>

              {order.seedType && order.quantity > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Tổng tiền:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {order.amount.toLocaleString()} VNĐ
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Số dư Escrow khả dụng: {escrowReleases[0].releaseAmount.toLocaleString()} VNĐ
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phương thức thanh toán
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="escrow"
                      checked={order.paymentMethod === 'escrow'}
                      onChange={(e) => setOrder({...order, paymentMethod: 'escrow'})}
                      className="w-4 h-4 text-green-600"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Thanh toán từ Escrow</div>
                      <div className="text-xs text-gray-600">Sử dụng tiền đã được giải ngân</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="voucher"
                      checked={order.paymentMethod === 'voucher'}
                      onChange={(e) => setOrder({...order, paymentMethod: 'voucher'})}
                      className="w-4 h-4 text-green-600"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Voucher Giống</div>
                      <div className="text-xs text-gray-600">Từ nguồn tài trợ ESG</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Đặt hàng → Giao nhận & Định danh
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(2)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Giao nhận & Định danh</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-qr-code-line text-purple-600 text-6xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Batch #{order.batchId}</h2>
              <p className="text-gray-600">Đã nhập kho HTX Tu Mơ Rông</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin lô hàng</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Loại giống:</span>
                    <span className="ml-2 font-semibold">{seedTypes.find(s => s.value === order.seedType)?.label}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="ml-2 font-semibold">{order.quantity.toLocaleString()} {order.unit}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Nhà cung cấp:</span>
                    <span className="ml-2 font-semibold">{order.supplier}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Mã Batch:</span>
                    <span className="ml-2 font-mono font-semibold">{order.batchId}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-history-line text-purple-600"></i>
                  Lịch sử đời cây bắt đầu được ghi lại
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Khi quét mã QR trên lô cây, hệ thống ghi nhận:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-purple-600 mt-0.5"></i>
                    <span>Thời điểm: {new Date().toLocaleString('vi-VN')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-purple-600 mt-0.5"></i>
                    <span>Vị trí: Kho HTX Tu Mơ Rông</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-purple-600 mt-0.5"></i>
                    <span>Nguồn gốc: {order.supplier}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-purple-600 mt-0.5"></i>
                    <span>Trạng thái: Đã nhập kho, chờ phân bổ</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="text-sm text-green-800">
                  <i className="ri-information-line mr-2"></i>
                  <strong>Kết quả:</strong> Từ giây phút này, mọi hành động với lô cây này (trồng, chăm sóc, thu hoạch) 
                  sẽ được ghi lại vào Digital Passport của sản phẩm.
                </p>
              </div>
            </div>

            <button
              onClick={handleReceiveBatch}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Xác nhận đã nhận hàng → Phân bổ & Canh tác
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}




