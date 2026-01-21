import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerWalletPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'carbon' | 'wallets' | 'credit' | 'split'>('overview');

  // Đa ngăn Ví thu nhập
  const walletCompartments = {
    production: {
      balance: 22500000,
      label: 'Ví Sản xuất',
      icon: 'ri-plant-line',
      color: 'from-green-500 to-emerald-600',
      description: 'Tiền từ bán nông sản, dược liệu',
      recentTransactions: [
        { date: '15/01/2024', description: 'Thanh toán Cà Gai Leo', amount: 8750000 },
        { date: '10/01/2024', description: 'Thanh toán Hoàng Tinh', amount: 5200000 },
      ],
    },
    service: {
      balance: 3500000,
      label: 'Ví Dịch vụ',
      icon: 'ri-service-line',
      color: 'from-orange-500 to-amber-600',
      description: 'Lương làm theo giờ và tiền Tip',
      recentTransactions: [
        { date: '24/11/2024', description: 'Lương ca trực + Tip', amount: 500000 },
        { date: '23/11/2024', description: 'Tip từ khách tour', amount: 30000 },
      ],
    },
    savings: {
      balance: 19250000,
      label: 'Ví Tích lũy/Hưu trí',
      icon: 'ri-bank-line',
      color: 'from-blue-500 to-indigo-600',
      description: 'Từ bán Tín chỉ Carbon và cổ tức dài hạn',
      recentTransactions: [
        { date: '15/01/2024', description: 'Bán Tín chỉ Carbon', amount: 3750000 },
        { date: '28/12/2023', description: 'Cổ tức quý 4/2023', amount: 12500000 },
      ],
      locked: true, // Khóa lại để dành cho tương lai
    },
  };

  const totalBalance = walletCompartments.production.balance + 
                      walletCompartments.service.balance + 
                      walletCompartments.savings.balance;

  const walletData = {
    totalEarnings: totalBalance,
    pendingAmount: 12500000,
    thisMonth: 8750000,
    vitaScore: 92,
    carbonCredits: 1250,
    carbonValue: 3750000,
  };

  // Production Credit (Ứng vốn)
  const creditData = {
    availableCredit: 5000000,
    usedCredit: 2000000,
    creditLimit: 7000000,
    basedOn: 'Sản lượng cây đang trồng',
    recentPurchases: [
      { date: '20/01/2024', item: 'Phân bón hữu cơ 50kg', amount: 1500000, status: 'pending' },
      { date: '15/01/2024', item: 'Giống Cà Gai Leo', amount: 500000, status: 'completed' },
    ],
  };

  // Split Payment View (Minh bạch Phân chia)
  const splitPaymentExample = {
    orderId: 'ORD-2024-001',
    totalAmount: 1000000,
    date: '15/01/2024',
    product: 'Cà Gai Leo - 50kg',
    breakdown: [
      { recipient: 'Bác (Công lao động)', amount: 400000, percentage: 40, icon: 'ri-user-line', bgColor: 'bg-green-100', textColor: 'text-green-600', gradient: 'from-green-500 to-green-600' },
      { recipient: 'Chủ đất', amount: 300000, percentage: 30, icon: 'ri-landscape-line', bgColor: 'bg-amber-100', textColor: 'text-amber-600', gradient: 'from-amber-500 to-amber-600' },
      { recipient: 'Quỹ HTX', amount: 50000, percentage: 5, icon: 'ri-community-line', bgColor: 'bg-blue-100', textColor: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
      { recipient: 'Tái đầu tư', amount: 150000, percentage: 15, icon: 'ri-refresh-line', bgColor: 'bg-purple-100', textColor: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
      { recipient: 'Bảo hiểm & Dự phòng', amount: 100000, percentage: 10, icon: 'ri-shield-line', bgColor: 'bg-red-100', textColor: 'text-red-600', gradient: 'from-red-500 to-red-600' },
    ],
  };

  const productionData = [
    { name: 'Cà Gai Leo', quantity: 450, unit: 'kg', value: 22500000, percentage: 50 },
    { name: 'Hoàng Tinh', quantity: 280, unit: 'kg', value: 16800000, percentage: 37 },
    { name: 'Bạch Truật', quantity: 120, unit: 'kg', value: 6000000, percentage: 13 },
  ];

  const transactions = [
    {
      id: 1,
      date: '15/01/2024',
      type: 'income',
      description: 'Thanh toán lô Cà Gai Leo - Tháng 12',
      amount: 8750000,
      status: 'completed',
    },
    {
      id: 2,
      date: '10/01/2024',
      type: 'pending',
      description: 'Chờ thanh toán - Lô Hoàng Tinh',
      amount: 5200000,
      status: 'pending',
    },
    {
      id: 3,
      date: '28/12/2023',
      type: 'income',
      description: 'Chia lãi quý 4/2023',
      amount: 12500000,
      status: 'completed',
    },
  ];

  const carbonHistory = [
    {
      id: 1,
      date: '15/01/2024',
      amount: 125,
      value: 375000,
      source: 'Lô A1 - Quế (0.5 ha)',
      status: 'verified',
    },
    {
      id: 2,
      date: '10/01/2024',
      amount: 98,
      value: 294000,
      source: 'Lô B1 - Đinh Lăng (0.6 ha)',
      status: 'verified',
    },
    {
      id: 3,
      date: '05/01/2024',
      amount: 87,
      value: 261000,
      source: 'Lô C1 - Bạch Truật (0.4 ha)',
      status: 'pending',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Ví & Tín chỉ Carbon</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="text-green-100 text-xs sm:text-sm mb-1.5 sm:mb-2">Tổng thu nhập</div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 truncate">{formatCurrency(walletData.totalEarnings)}</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-green-100 text-xs mb-1">Chờ thanh toán</div>
              <div className="text-xl font-bold">{formatCurrency(walletData.pendingAmount)}</div>
            </div>
            <div>
              <div className="text-green-100 text-xs mb-1">Tháng này</div>
              <div className="text-xl font-bold">{formatCurrency(walletData.thisMonth)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4">
        {/* Carbon Credit Card */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-white mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm text-teal-100 mb-0.5 sm:mb-1">Tín chỉ Carbon</div>
              <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1 truncate">{walletData.carbonCredits} tCO₂</div>
              <div className="text-xs sm:text-sm text-teal-100 truncate">≈ {formatCurrency(walletData.carbonValue)}</div>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="ri-leaf-line text-2xl sm:text-3xl md:text-4xl"></i>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex items-center gap-1.5 sm:gap-2">
            <i className="ri-information-line text-lg sm:text-xl flex-shrink-0"></i>
            <span className="text-xs sm:text-sm">Rừng của bạn đang cứu trái đất! 🌍</span>
          </div>
        </div>

        {/* VITA Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Điểm tín nhiệm VITA</h3>
              <p className="text-sm text-gray-600">Dựa trên tuân thủ quy trình</p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#10B981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - walletData.vitaScore / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{walletData.vitaScore}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <i className="ri-seedling-line text-xl text-green-600 mb-1"></i>
              <div className="text-xs text-gray-600">Vitality</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <i className="ri-shield-check-line text-xl text-blue-600 mb-1"></i>
              <div className="text-xs text-gray-600">Integrity</div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <i className="ri-hand-heart-line text-xl text-purple-600 mb-1"></i>
              <div className="text-xs text-gray-600">Trust</div>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <i className="ri-file-list-3-line text-xl text-orange-600 mb-1"></i>
              <div className="text-xs text-gray-600">Account</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'overview'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setSelectedTab('wallets')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'wallets'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Đa ngăn Ví
          </button>
          <button
            onClick={() => setSelectedTab('credit')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'credit'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Ứng vốn
          </button>
          <button
            onClick={() => setSelectedTab('split')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'split'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Phân chia
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'history'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Lịch sử
          </button>
          <button
            onClick={() => setSelectedTab('carbon')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
              selectedTab === 'carbon'
                ? 'bg-white text-green-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            Carbon
          </button>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Summary of Wallets */}
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(walletCompartments).map(([key, wallet]) => (
                <div
                  key={key}
                  className={`bg-gradient-to-br ${wallet.color} rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all`}
                  onClick={() => setSelectedTab('wallets')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <i className={`${wallet.icon} text-xl`}></i>
                    {wallet.locked && <i className="ri-lock-line text-sm"></i>}
                  </div>
                  <div className="text-xs opacity-90 mb-1">{wallet.label}</div>
                  <div className="text-lg font-bold truncate">{formatCurrency(wallet.balance)}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sản lượng tháng này</h3>
              
              <div className="space-y-4">
                {productionData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <i className="ri-plant-line text-xl text-green-600"></i>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.quantity} {item.unit}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(item.value)}</div>
                        <div className="text-sm text-gray-600">{item.percentage}%</div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/vita-supply')}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <i className="ri-shopping-cart-2-line text-2xl text-orange-600"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Mua vật tư trả chậm</div>
                    <div className="text-xs text-gray-600">Dùng hạn mức tín dụng</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab('split')}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Xem phân chia</div>
                    <div className="text-xs text-gray-600">Minh bạch đơn hàng</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'wallets' && (
          <div className="space-y-4">
            {Object.entries(walletCompartments).map(([key, wallet]) => (
              <div key={key} className={`bg-gradient-to-br ${wallet.color} rounded-2xl shadow-lg p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${wallet.icon} text-2xl`}></i>
                      <h3 className="text-xl font-bold">{wallet.label}</h3>
                      {wallet.locked && (
                        <span className="px-2 py-1 bg-white/20 rounded text-xs">
                          <i className="ri-lock-line mr-1"></i>
                          Khóa
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-90 mb-3">{wallet.description}</p>
                    <div className="text-3xl font-bold mb-4">{formatCurrency(wallet.balance)}</div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="text-xs opacity-90 mb-2">Giao dịch gần đây</div>
                  <div className="space-y-2">
                    {wallet.recentTransactions.map((tx, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-xs opacity-75">{tx.date}</div>
                        </div>
                        <div className="font-bold">+{formatCurrency(tx.amount)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {!wallet.locked && (
                  <button className="w-full mt-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                    <i className="ri-bank-card-line mr-2"></i>
                    Rút tiền
                  </button>
                )}
                {wallet.locked && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs">
                    <i className="ri-information-line mr-1"></i>
                    Ví này được khóa để dành cho tương lai. Bạn có thể rút theo kỳ hạn đã đặt.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'credit' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Hạn mức Tín dụng Sản xuất</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm opacity-90 mb-1">Hạn mức khả dụng</div>
                  <div className="text-3xl font-bold">{formatCurrency(creditData.availableCredit)}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Đã sử dụng</span>
                    <span className="font-bold">{formatCurrency(creditData.usedCredit)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Tổng hạn mức</span>
                    <span className="font-bold">{formatCurrency(creditData.creditLimit)}</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(creditData.usedCredit / creditData.creditLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs opacity-90">
                  <i className="ri-information-line mr-1"></i>
                  Dựa trên: {creditData.basedOn}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mua hàng trả chậm gần đây</h3>
              <div className="space-y-3">
                {creditData.recentPurchases.map((purchase, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{purchase.item}</div>
                        <div className="text-sm text-gray-600">{purchase.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(purchase.amount)}</div>
                        <div className={`text-xs ${
                          purchase.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {purchase.status === 'completed' ? 'Đã trừ' : 'Chờ trừ khi thu hoạch'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/vita-supply')}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
            >
              <i className="ri-shopping-cart-2-line mr-2"></i>
              Mua vật tư trên VITA Supply
            </button>
          </div>
        )}

        {selectedTab === 'split' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Minh bạch Phân chia</h3>
                  <p className="text-sm text-gray-600">Đơn hàng: {splitPaymentExample.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(splitPaymentExample.totalAmount)}</div>
                  <div className="text-xs text-gray-600">{splitPaymentExample.date}</div>
                </div>
              </div>
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">Sản phẩm</div>
                <div className="text-sm text-gray-600">{splitPaymentExample.product}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Công thức chia tiền</h3>
              <div className="space-y-3">
                {splitPaymentExample.breakdown.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}>
                          <i className={`${item.icon} text-xl ${item.textColor}`}></i>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{item.recipient}</div>
                          <div className="text-xs text-gray-600">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{formatCurrency(item.amount)}</div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                <div className="font-bold text-gray-900">Tổng cộng</div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(splitPaymentExample.totalAmount)}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Đã phân chia minh bạch và tự động
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      transaction.status === 'completed'
                        ? 'bg-green-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    <i
                      className={`text-2xl ${
                        transaction.status === 'completed'
                          ? 'ri-arrow-down-line text-green-600'
                          : 'ri-time-line text-yellow-600'
                      }`}
                    ></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 mb-1">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-900">{formatCurrency(transaction.amount)}</div>
                    <div
                      className={`text-xs ${
                        transaction.status === 'completed'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {transaction.status === 'completed' ? 'Đã thanh toán' : 'Chờ xử lý'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'carbon' && (
          <div className="space-y-4">
            {/* Carbon Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tín chỉ Carbon của bạn</h3>
              <p className="text-sm text-gray-600 mb-4">
                Dựa trên diện tích rừng và dữ liệu chăm sóc cây, hệ thống tính toán lượng CO₂ hấp thụ và quy đổi ra tín chỉ Carbon.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Tổng tích lũy</div>
                  <div className="text-2xl font-bold text-teal-600">{walletData.carbonCredits} tCO₂</div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Giá trị ước tính</div>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(walletData.carbonValue)}</div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-exchange-line mr-2"></i>
                Bán tín chỉ Carbon
              </button>
            </div>

            {/* Carbon History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử tích lũy</h3>
              
              <div className="space-y-3">
                {carbonHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-leaf-line text-2xl text-teal-600"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 mb-1">{item.source}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-teal-600">+{item.amount} tCO₂</div>
                      <div className="text-xs text-gray-500">{formatCurrency(item.value)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/farm')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-map-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nông trại</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600 cursor-pointer">
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
