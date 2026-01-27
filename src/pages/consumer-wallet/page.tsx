import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { getUserGreenPoints, type GreenPoints } from '../../lib/greenPoints/service';
import { earnPoints } from '../../lib/greenPoints/service';

export default function ConsumerWalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'vouchers' | 'payments' | 'history'>('overview');
  const [greenPoints, setGreenPoints] = useState<GreenPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecharging, setIsRecharging] = useState(false);

  useEffect(() => {
    loadGreenPoints();
  }, []);

  const loadGreenPoints = async () => {
    try {
      const userId = sessionStorage.getItem('user_id') || 'demo-user-consumer';
      const points = await getUserGreenPoints(userId);
      setGreenPoints(points);
    } catch (error) {
      console.error('Error loading green points:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Mock data
  const [walletBalance, setWalletBalance] = useState(1250000); // VNĐ
  const vouchers = [
    {
      id: 1,
      name: 'Giảm 10% đơn hàng đầu tiên',
      discount: 10,
      minOrder: 200000,
      expiryDate: '31/12/2024',
      status: 'available',
    },
    {
      id: 2,
      name: 'Miễn phí vận chuyển',
      discount: 0,
      minOrder: 500000,
      expiryDate: '15/12/2024',
      status: 'available',
    },
    {
      id: 3,
      name: 'Giảm 20% sản phẩm hữu cơ',
      discount: 20,
      minOrder: 300000,
      expiryDate: '20/12/2024',
      status: 'used',
    },
  ];

  const paymentMethods = [
    {
      id: 'bank',
      name: 'Tài khoản ngân hàng',
      icon: 'ri-bank-line',
      accounts: [
        { bank: 'Vietcombank', account: '1234567890', name: 'NGUYEN VAN A' },
      ],
    },
    {
      id: 'ewallet',
      name: 'Ví điện tử',
      icon: 'ri-wallet-3-line',
      accounts: [
        { provider: 'MoMo', phone: '0912345678' },
        { provider: 'ZaloPay', phone: '0912345678' },
      ],
    },
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      date: '05/01/2025',
      type: 'purchase',
      description: 'Sâm Ngọc Linh (2kg), Trà Cà Gai Leo (3 hộp)',
      amount: -1120000,
      status: 'completed',
    },
    {
      id: 'TXN-002',
      date: '28/12/2024',
      type: 'refund',
      description: 'Hoàn tiền đơn hàng #ORD-002',
      amount: 560000,
      status: 'completed',
    },
    {
      id: 'TXN-003',
      date: '25/12/2024',
      type: 'purchase',
      description: 'Cao Đương Quy (1 chai)',
      amount: -560000,
      status: 'completed',
    },
    {
      id: 'TXN-004',
      date: '20/12/2024',
      type: 'points',
      description: 'Đổi Green Points: Giảm giá 10.000đ',
      amount: 0,
      pointsUsed: 100,
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/farmer/consumer')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Ví Xã viên</h1>
              <p className="text-green-100 text-xs sm:text-sm">Quản lý thanh toán & Green Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GreenPointsBadge className="hidden sm:flex" />
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Số dư ví</p>
              <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(walletBalance)}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-wallet-3-line text-4xl"></i>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => setShowRechargeModal(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-add-line"></i>
              Nạp tiền
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-bank-card-line"></i>
              Thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-1 flex gap-1 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
            { id: 'points', label: 'Điểm & Quà', icon: 'ri-gift-line' },
            { id: 'vouchers', label: 'Voucher', icon: 'ri-coupon-line' },
            { id: 'payments', label: 'Thanh toán', icon: 'ri-bank-card-line' },
            { id: 'history', label: 'Lịch sử', icon: 'ri-history-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-3 sm:px-4 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} mr-1 sm:mr-2`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Green Points Summary */}
              {greenPoints && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Green Points</p>
                      <p className="text-3xl font-bold">{greenPoints.availablePoints.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('points');
                        navigate('/green-points');
                      }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs opacity-75 mb-1">Tháng này</p>
                      <p className="text-lg font-semibold">+{greenPoints.stats.earnedThisMonth.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 mb-1">Cấp độ</p>
                      <p className="text-lg font-semibold capitalize">{greenPoints.tier}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Vouchers Quick View */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Voucher của tôi</h3>
                  <button
                    onClick={() => setActiveTab('vouchers')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-3">
                  {vouchers.filter(v => v.status === 'available').slice(0, 2).map((voucher) => (
                    <div
                      key={voucher.id}
                      className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-cyan-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{voucher.name}</h4>
                          <p className="text-xs text-gray-600">
                            Đơn tối thiểu: {formatCurrency(voucher.minOrder)} • HSD: {voucher.expiryDate}
                          </p>
                        </div>
                        {voucher.discount > 0 && (
                          <div className="text-2xl font-bold text-blue-600">
                            -{voucher.discount}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Giao dịch gần đây</h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'purchase' ? 'bg-red-100' :
                          tx.type === 'refund' ? 'bg-green-100' :
                          'bg-amber-100'
                        }`}>
                          <i className={`${
                            tx.type === 'purchase' ? 'ri-shopping-cart-line text-red-600' :
                            tx.type === 'refund' ? 'ri-refund-line text-green-600' :
                            'ri-gift-line text-amber-600'
                          } text-lg`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {tx.amount !== 0 && (
                          <p className={`font-bold ${
                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                          </p>
                        )}
                        {tx.pointsUsed && (
                          <p className="text-xs text-amber-600">-{tx.pointsUsed} điểm</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Green Points Tab */}
          {activeTab === 'points' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Green Points</h3>
                  <button
                    onClick={() => navigate('/green-points')}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    Quản lý điểm
                  </button>
                </div>
                {greenPoints ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold text-emerald-600 mb-2">
                          {greenPoints.availablePoints.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-600">Điểm khả dụng</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Tháng này</p>
                          <p className="text-lg font-semibold text-emerald-600">
                            +{greenPoints.stats.earnedThisMonth.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Năm nay</p>
                          <p className="text-lg font-semibold text-emerald-600">
                            +{greenPoints.stats.earnedThisYear.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Cấp độ</p>
                          <p className="text-lg font-semibold text-emerald-600 capitalize">
                            {greenPoints.tier}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate('/green-points?tab=rewards')}
                        className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        <i className="ri-gift-line text-2xl mb-2 block"></i>
                        Đổi điểm
                      </button>
                      <button
                        onClick={() => navigate('/green-points?tab=history')}
                        className="p-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                      >
                        <i className="ri-history-line text-2xl mb-2 block"></i>
                        Lịch sử
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vouchers Tab */}
          {activeTab === 'vouchers' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Voucher khả dụng</h3>
                {vouchers.filter(v => v.status === 'available').length > 0 ? (
                  <div className="space-y-3">
                    {vouchers.filter(v => v.status === 'available').map((voucher) => (
                      <div
                        key={voucher.id}
                        className="border-2 border-dashed border-blue-300 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-cyan-50 hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">{voucher.name}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>Đơn hàng tối thiểu: <strong>{formatCurrency(voucher.minOrder)}</strong></p>
                              <p>Hạn sử dụng: <strong>{voucher.expiryDate}</strong></p>
                            </div>
                          </div>
                          <div className="ml-4 text-center">
                            {voucher.discount > 0 ? (
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                -{voucher.discount}%
                              </div>
                            ) : (
                              <div className="text-2xl font-bold text-blue-600 mb-2">
                                <i className="ri-truck-line"></i>
                              </div>
                            )}
                            <button
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                              onClick={async () => {
                                // Sử dụng voucher - có thể tích điểm
                                try {
                                  await earnPoints(
                                    sessionStorage.getItem('user_id') || 'demo-user',
                                    'Sử dụng voucher',
                                    5,
                                    'engagement',
                                    'consumer-wallet',
                                    { voucherId: voucher.id }
                                  );
                                  alert(`Đã áp dụng voucher! +5 Green Points`);
                                } catch (error) {
                                  console.error('Error earning points:', error);
                                }
                              }}
                            >
                              Sử dụng ngay
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <i className="ri-coupon-line text-4xl text-gray-300 mb-3"></i>
                    <p className="text-gray-500">Chưa có voucher nào</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Voucher đã dùng</h3>
                {vouchers.filter(v => v.status === 'used').length > 0 ? (
                  <div className="space-y-3">
                    {vouchers.filter(v => v.status === 'used').map((voucher) => (
                      <div
                        key={voucher.id}
                        className="border border-gray-200 rounded-xl p-4 bg-gray-50 opacity-60"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">{voucher.name}</h4>
                            <p className="text-xs text-gray-500">Đã sử dụng</p>
                          </div>
                          <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                            Đã dùng
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">Chưa có voucher đã dùng</p>
                )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Phương thức thanh toán</h3>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <i className={`${method.icon} text-2xl text-blue-600`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Thêm mới
                        </button>
                      </div>
                      {method.accounts.map((account, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 mt-2">
                          {method.id === 'bank' && (
                            <>
                              <p className="font-medium text-gray-900">{account.bank}</p>
                              <p className="text-sm text-gray-600">STK: {account.account}</p>
                              <p className="text-xs text-gray-500">Chủ TK: {account.name}</p>
                            </>
                          )}
                          {method.id === 'ewallet' && (
                            <>
                              <p className="font-medium text-gray-900">{account.provider}</p>
                              <p className="text-sm text-gray-600">SĐT: {account.phone}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Nạp tiền vào ví</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[100000, 200000, 500000].map((amount) => (
                      <button
                        key={amount}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors text-center"
                      >
                        <p className="font-bold text-gray-900">{formatCurrency(amount)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Nhập số tiền khác"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      Nạp tiền
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tx.type === 'purchase' ? 'bg-red-100' :
                          tx.type === 'refund' ? 'bg-green-100' :
                          'bg-amber-100'
                        }`}>
                          <i className={`${
                            tx.type === 'purchase' ? 'ri-shopping-cart-line text-red-600' :
                            tx.type === 'refund' ? 'ri-refund-line text-green-600' :
                            'ri-gift-line text-amber-600'
                          } text-xl`}></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {tx.amount !== 0 && (
                          <p className={`font-bold text-lg ${
                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                          </p>
                        )}
                        {tx.pointsUsed && (
                          <p className="text-sm text-amber-600">-{tx.pointsUsed} Green Points</p>
                        )}
                        <span className="text-xs text-gray-500">{tx.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-history-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Chưa có giao dịch nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/member-hub')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Hub</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/consumer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-shopping-cart-line text-2xl"></i>
            <span className="text-xs">Siêu thị</span>
          </button>
          <button 
            onClick={() => {
              // Nếu đang ở tab overview, chuyển sang tab points, ngược lại chuyển về overview
              if (activeTab === 'overview') {
                setActiveTab('points');
              } else {
                setActiveTab('overview');
              }
              // Scroll to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 text-blue-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-semibold">Ví & Điểm</span>
          </button>
          <button 
            onClick={() => navigate('/consumer-community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-community-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Nạp tiền vào ví</h3>
              <button
                onClick={() => {
                  setShowRechargeModal(false);
                  setRechargeAmount(null);
                  setCustomAmount('');
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn mức nạp nhanh
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[100000, 200000, 500000, 1000000, 2000000, 5000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setRechargeAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                        rechargeAmount === amount
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hoặc nhập số tiền khác
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setRechargeAmount(null);
                  }}
                  placeholder="Nhập số tiền (VNĐ)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10000"
                  step="10000"
                />
                <p className="text-xs text-gray-500 mt-1">Số tiền tối thiểu: {formatCurrency(10000)}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Số tiền nạp:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(rechargeAmount || parseInt(customAmount) || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Số dư hiện tại:</span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatCurrency(walletBalance)}
                  </span>
                </div>
                <div className="border-t border-blue-200 mt-2 pt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Số dư sau nạp:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(walletBalance + (rechargeAmount || parseInt(customAmount) || 0))}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRechargeModal(false);
                    setRechargeAmount(null);
                    setCustomAmount('');
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={async () => {
                    const amount = rechargeAmount || parseInt(customAmount);
                    if (!amount || amount < 10000) {
                      alert('Vui lòng chọn hoặc nhập số tiền tối thiểu 10.000 VNĐ');
                      return;
                    }

                    setIsRecharging(true);
                    
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Update wallet balance
                    setWalletBalance(prev => prev + amount);
                    
                    // Tích điểm khi nạp tiền
                    try {
                      await earnPoints(
                        sessionStorage.getItem('user_id') || 'demo-user',
                        'Nạp tiền vào ví',
                        Math.floor(amount / 10000), // 1 điểm / 10k VNĐ
                        'financial',
                        'consumer-wallet',
                        { amount, type: 'recharge' }
                      );
                    } catch (error) {
                      console.error('Error earning points:', error);
                    }

                    setIsRecharging(false);
                    alert(`Nạp tiền thành công! +${Math.floor(amount / 10000)} Green Points`);
                    setShowRechargeModal(false);
                    setRechargeAmount(null);
                    setCustomAmount('');
                  }}
                  disabled={isRecharging || (!rechargeAmount && !customAmount)}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isRecharging ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-check-line"></i>
                      <span>Xác nhận nạp tiền</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <i className="ri-shield-check-line text-green-600"></i>
                Giao dịch được bảo mật và mã hóa
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
