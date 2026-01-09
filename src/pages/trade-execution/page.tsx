import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Trade {
  id: string;
  type: 'b2b' | 'esg' | 'consumer';
  buyerName: string;
  product: string;
  quantity: number;
  unit: string;
  amount: number;
  status: 'pending' | 'in_transit' | 'delivered' | 'paid';
  logistics?: {
    trackingId: string;
    carrier: string;
    status: string;
  };
  carbonCredits?: number;
}

export default function TradeExecutionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'b2b' | 'esg' | 'consumer'>('b2b');
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: 'TRADE-B2B-001',
      type: 'b2b',
      buyerName: 'Công ty Dược Phẩm VinaTech',
      product: 'Sâm Ngọc Linh - Loại A+',
      quantity: 5000,
      unit: 'kg',
      amount: 10000000000,
      status: 'pending'
    },
    {
      id: 'TRADE-ESG-001',
      type: 'esg',
      buyerName: 'Doanh nghiệp ESG - VinaTech',
      product: 'Carbon Credits',
      quantity: 5000,
      unit: 'tấn CO₂',
      amount: 0,
      status: 'pending',
      carbonCredits: 5000
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // B2B: Gọi Logistics và xác nhận giao hàng
  const handleB2BDelivery = (trade: Trade) => {
    setTrades(trades.map(t => 
      t.id === trade.id 
        ? {
            ...t,
            status: 'in_transit' as const,
            logistics: {
              trackingId: `LOG-${Date.now()}`,
              carrier: 'VITA Logistics',
              status: 'Đang vận chuyển'
            }
          }
        : t
    ));
  };

  const handleB2BConfirm = (trade: Trade) => {
    setTrades(trades.map(t => 
      t.id === trade.id 
        ? { ...t, status: 'delivered' as const }
        : t
    ));
    
    // Trigger payment
    setTimeout(() => {
      setTrades(trades.map(t => 
        t.id === trade.id 
          ? { ...t, status: 'paid' as const }
          : t
      ));
      navigate('/profit-split');
    }, 1000);
  };

  // ESG: Minting và Transfer Carbon Credits
  const handleESGMint = (trade: Trade) => {
    // Calculate carbon credits from biomass growth
    setTrades(trades.map(t => 
      t.id === trade.id 
        ? {
            ...t,
            status: 'delivered' as const,
            carbonCredits: 5000 // Calculated from 10ha forest growth
          }
        : t
    ));
    
    setTimeout(() => {
      setTrades(trades.map(t => 
        t.id === trade.id 
          ? { ...t, status: 'paid' as const }
          : t
      ));
    }, 1000);
  };

  const filteredTrades = trades.filter(t => t.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/quality-gate')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Giao Dịch & Bàn Giao</h1>
            <p className="text-sm opacity-90">B2B • ESG Carbon • Consumer</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'b2b'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            B2B (Dược/Gỗ)
          </button>
          <button
            onClick={() => setActiveTab('esg')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'esg'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ESG (Carbon)
          </button>
          <button
            onClick={() => setActiveTab('consumer')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'consumer'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Consumer (Bán lẻ)
          </button>
        </div>

        {/* B2B Trades */}
        {activeTab === 'b2b' && (
          <div className="space-y-6">
            {filteredTrades.map((trade) => (
              <div key={trade.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{trade.buyerName}</h3>
                    <p className="text-sm text-gray-600">{trade.product}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Số lượng: {trade.quantity.toLocaleString()} {trade.unit}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trade.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    trade.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                    trade.status === 'in_transit' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {trade.status === 'paid' ? 'Đã thanh toán' :
                     trade.status === 'delivered' ? 'Đã giao' :
                     trade.status === 'in_transit' ? 'Đang vận chuyển' : 'Chờ giao hàng'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tổng giá trị</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(trade.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Thanh toán còn lại</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(trade.amount * 0.7)}
                    </p>
                    <p className="text-xs text-gray-500">(70% - Đã đặt cọc 30%)</p>
                  </div>
                </div>

                {trade.status === 'pending' && (
                  <button
                    onClick={() => handleB2BDelivery(trade)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Gọi Logistics → Bốc hàng
                  </button>
                )}

                {trade.status === 'in_transit' && trade.logistics && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Thông tin Logistics</p>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>Mã vận đơn: {trade.logistics.trackingId}</p>
                        <p>Nhà vận chuyển: {trade.logistics.carrier}</p>
                        <p>Trạng thái: {trade.logistics.status}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleB2BConfirm(trade)}
                      className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                    >
                      Xác nhận đã nhận hàng → Thanh toán 70%
                    </button>
                  </div>
                )}

                {trade.status === 'delivered' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm text-emerald-800 text-center">
                      Đang xử lý thanh toán phần còn lại (70%)...
                    </p>
                  </div>
                )}

                {trade.status === 'paid' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-emerald-900 mb-2 text-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Đã thanh toán đầy đủ
                    </p>
                    <p className="text-xs text-emerald-800 text-center">
                      Hệ thống đã kích hoạt lệnh thanh toán. Tiền đã vào Escrow.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ESG Carbon Trades */}
        {activeTab === 'esg' && (
          <div className="space-y-6">
            {filteredTrades.map((trade) => (
              <div key={trade.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{trade.buyerName}</h3>
                    <p className="text-sm text-gray-600">Carbon Credits từ rừng trồng</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trade.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {trade.status === 'paid' ? 'Đã chuyển' : 'Chờ tính toán'}
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800 mb-3">
                    <i className="ri-leaf-line mr-2"></i>
                    Hệ thống VITA tính toán tổng lượng sinh khối gỗ đã tăng trưởng trong chu kỳ và quy đổi ra Tín chỉ Carbon.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Diện tích rừng</p>
                      <p className="text-lg font-bold text-gray-900">10 ha</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Carbon Credits</p>
                      <p className="text-lg font-bold text-emerald-600">
                        {trade.carbonCredits?.toLocaleString()} tấn CO₂
                      </p>
                    </div>
                  </div>
                </div>

                {trade.status === 'pending' && (
                  <button
                    onClick={() => handleESGMint(trade)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Minting Token → Chuyển giao Carbon Credits
                  </button>
                )}

                {trade.status === 'delivered' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <i className="ri-coins-line mr-2"></i>
                      Đang minting {trade.carbonCredits?.toLocaleString()} Token Carbon Credits...
                    </p>
                  </div>
                )}

                {trade.status === 'paid' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-emerald-900 mb-2 text-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Đã chuyển giao Carbon Credits
                    </p>
                    <p className="text-xs text-emerald-800 text-center">
                      {trade.carbonCredits?.toLocaleString()} Token đã được chuyển từ Ví Dự án sang Ví của Doanh nghiệp ESG.
                      Họ có thể cấn trừ vào báo cáo phát thải.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Consumer Trades */}
        {activeTab === 'consumer' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center py-12">
              <i className="ri-store-3-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">VITA Mart - Bán lẻ</h3>
              <p className="text-gray-600 mb-6">
                Phần sản lượng dư ra (không bán cho B2B), HTX đóng gói nhỏ bán trên VITA Mart.
              </p>
              <p className="text-sm text-gray-500">
                Xã viên tiêu dùng đặt mua → Giao hàng → Thanh toán qua MoMo/Ví VITA
              </p>
              <button
                onClick={() => navigate('/farmer-consumer')}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Xem VITA Mart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




