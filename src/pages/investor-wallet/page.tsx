import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { getUserGreenPoints, type GreenPoints } from '../../lib/greenPoints/service';
import { earnPoints } from '../../lib/greenPoints/service';

export default function InvestorWalletPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'investments' | 'dividends' | 'history' | 'withdraw'>('overview');
  const [greenPoints, setGreenPoints] = useState<GreenPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    loadGreenPoints();
  }, []);

  const loadGreenPoints = async () => {
    try {
      const userId = sessionStorage.getItem('user_id') || 'demo-user-investor';
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
  const [walletBalance, setWalletBalance] = useState(125000000); // VNĐ - Số dư khả dụng
  const totalInvested = 80000000; // Tổng đã đầu tư
  const totalReturns = 9600000; // Tổng lợi nhuận đã nhận
  const pendingDividends = 2400000; // Cổ tức đang chờ

  const investments = [
    {
      id: 1,
      name: 'Dự án Sâm Ngọc Linh - Lô B2',
      cooperative: 'HTX Dược Liệu Kon Tum',
      invested: 50000000,
      currentValue: 56000000,
      profit: 12,
      status: 'active',
      nextDividend: '15/02/2025',
      dividendAmount: 1500000,
    },
    {
      id: 2,
      name: 'Vườn ươm công nghệ cao',
      cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
      invested: 30000000,
      currentValue: 33600000,
      profit: 12,
      status: 'active',
      nextDividend: '20/02/2025',
      dividendAmount: 900000,
    },
  ];

  const dividends = [
    {
      id: 1,
      project: 'Dự án Sâm Ngọc Linh - Lô B2',
      amount: 1500000,
      date: '15/01/2025',
      status: 'completed',
      period: 'Q4/2024',
    },
    {
      id: 2,
      project: 'Vườn ươm công nghệ cao',
      amount: 900000,
      date: '20/01/2025',
      status: 'completed',
      period: 'Q4/2024',
    },
    {
      id: 3,
      project: 'Dự án Sâm Ngọc Linh - Lô B2',
      amount: 1500000,
      date: '15/02/2025',
      status: 'pending',
      period: 'Q1/2025',
    },
  ];

  const transactions = [
    {
      id: 1,
      date: '15/01/2025',
      type: 'dividend',
      description: 'Cổ tức Q4/2024 - Sâm Ngọc Linh',
      amount: 1500000,
      status: 'completed',
    },
    {
      id: 2,
      date: '20/01/2025',
      type: 'dividend',
      description: 'Cổ tức Q4/2024 - Vườn ươm',
      amount: 900000,
      status: 'completed',
    },
    {
      id: 3,
      date: '10/12/2024',
      type: 'investment',
      description: 'Đầu tư vào Dự án Sâm Ngọc Linh',
      amount: -50000000,
      status: 'completed',
    },
    {
      id: 4,
      date: '05/11/2024',
      type: 'investment',
      description: 'Đầu tư vào Vườn ươm công nghệ cao',
      amount: -30000000,
      status: 'completed',
    },
    {
      id: 5,
      date: '01/12/2024',
      type: 'withdraw',
      description: 'Rút lợi nhuận',
      amount: -5000000,
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/farmer/investor')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Ví Đầu tư</h1>
              <p className="text-amber-100 text-xs sm:text-sm">Quản lý vốn đầu tư & Cổ tức</p>
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
              <p className="text-amber-100 text-sm mb-1">Số dư khả dụng</p>
              <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(walletBalance)}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-wallet-3-line text-4xl"></i>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-xs text-amber-100 mb-1">Đã đầu tư</p>
              <p className="text-sm font-bold">{formatCurrency(totalInvested)}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-xs text-amber-100 mb-1">Lợi nhuận</p>
              <p className="text-sm font-bold text-green-300">+{formatCurrency(totalReturns)}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-xs text-amber-100 mb-1">Cổ tức chờ</p>
              <p className="text-sm font-bold text-yellow-300">{formatCurrency(pendingDividends)}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => navigate('/farmer/investor')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-add-line"></i>
              Đầu tư mới
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-bank-card-line"></i>
              Rút tiền
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-1 flex gap-1 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
            { id: 'investments', label: 'Đầu tư', icon: 'ri-funds-line' },
            { id: 'dividends', label: 'Cổ tức', icon: 'ri-money-dollar-circle-line' },
            { id: 'history', label: 'Lịch sử', icon: 'ri-history-line' },
            { id: 'withdraw', label: 'Rút tiền', icon: 'ri-bank-card-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-3 sm:px-4 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
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
                      onClick={() => navigate('/green-points')}
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

              {/* Active Investments */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Dự án đang đầu tư</h3>
                  <button
                    onClick={() => setActiveTab('investments')}
                    className="text-amber-600 text-sm font-medium hover:text-amber-700"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{investment.name}</h4>
                          <p className="text-xs text-gray-600">{investment.cooperative}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          investment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {investment.status === 'active' ? 'Đang hoạt động' : 'Đã kết thúc'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Đã đầu tư</p>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(investment.invested)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Giá trị hiện tại</p>
                          <p className="text-sm font-bold text-green-600">{formatCurrency(investment.currentValue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Lợi nhuận</p>
                          <p className="text-sm font-bold text-green-600">+{investment.profit}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Cổ tức tiếp theo</p>
                          <p className="text-sm font-bold text-amber-600">{investment.nextDividend}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Dividends */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Cổ tức gần đây</h3>
                  <button
                    onClick={() => setActiveTab('dividends')}
                    className="text-amber-600 text-sm font-medium hover:text-amber-700"
                  >
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-3">
                  {dividends.slice(0, 2).map((dividend) => (
                    <div
                      key={dividend.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{dividend.project}</p>
                        <p className="text-xs text-gray-500">{dividend.date} • {dividend.period}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          dividend.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {dividend.status === 'completed' ? '+' : ''}{formatCurrency(dividend.amount)}
                        </p>
                        <span className={`text-xs ${
                          dividend.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {dividend.status === 'completed' ? 'Đã nhận' : 'Chờ nhận'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Investments Tab */}
          {activeTab === 'investments' && (
            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{investment.name}</h3>
                      <p className="text-sm text-gray-600">{investment.cooperative}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      investment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {investment.status === 'active' ? 'Đang hoạt động' : 'Đã kết thúc'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Đã đầu tư</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(investment.invested)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Giá trị hiện tại</p>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(investment.currentValue)}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Lợi nhuận</p>
                      <p className="text-lg font-bold text-amber-600">+{investment.profit}%</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Cổ tức tiếp theo</p>
                      <p className="text-sm font-bold text-blue-600">{investment.nextDividend}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/farmer/investor?project=${investment.id}`)}
                    className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Xem chi tiết dự án
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Dividends Tab */}
          {activeTab === 'dividends' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử cổ tức</h3>
              <div className="space-y-3">
                {dividends.map((dividend) => (
                  <div
                    key={dividend.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        dividend.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        <i className={`${
                          dividend.status === 'completed' ? 'ri-checkbox-circle-fill text-green-600' : 'ri-time-line text-amber-600'
                        } text-xl`}></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{dividend.project}</p>
                        <p className="text-xs text-gray-500">{dividend.date} • {dividend.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        dividend.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {dividend.status === 'completed' ? '+' : ''}{formatCurrency(dividend.amount)}
                      </p>
                      <span className={`text-xs ${
                        dividend.status === 'completed' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {dividend.status === 'completed' ? 'Đã nhận' : 'Chờ nhận'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-amber-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tx.type === 'dividend' ? 'bg-green-100' :
                          tx.type === 'investment' ? 'bg-blue-100' :
                          'bg-amber-100'
                        }`}>
                          <i className={`${
                            tx.type === 'dividend' ? 'ri-money-dollar-circle-line text-green-600' :
                            tx.type === 'investment' ? 'ri-funds-line text-blue-600' :
                            'ri-bank-card-line text-amber-600'
                          } text-xl`}></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </p>
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

          {/* Withdraw Tab */}
          {activeTab === 'withdraw' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rút tiền</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tiền muốn rút
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Nhập số tiền (VNĐ)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      min="100000"
                      step="10000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Số tiền tối thiểu: {formatCurrency(100000)}</p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Số dư khả dụng:</span>
                      <span className="text-sm font-medium text-gray-700">
                        {formatCurrency(walletBalance)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Số tiền rút:</span>
                      <span className="text-lg font-bold text-amber-600">
                        {withdrawAmount ? formatCurrency(parseInt(withdrawAmount) || 0) : formatCurrency(0)}
                      </span>
                    </div>
                    {withdrawAmount && parseInt(withdrawAmount) > walletBalance && (
                      <p className="text-xs text-red-600 mt-2">
                        <i className="ri-error-warning-line"></i> Số tiền rút vượt quá số dư khả dụng
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Thông tin tài khoản nhận tiền</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Ngân hàng: <strong>Vietcombank</strong></p>
                      <p>Số tài khoản: <strong>1234567890</strong></p>
                      <p>Chủ tài khoản: <strong>NGUYEN VAN A</strong></p>
                    </div>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Thay đổi tài khoản
                    </button>
                  </div>

                  <button
                    onClick={async () => {
                      const amount = parseInt(withdrawAmount);
                      if (!amount || amount < 100000) {
                        alert('Vui lòng nhập số tiền tối thiểu 100.000 VNĐ');
                        return;
                      }
                      if (amount > walletBalance) {
                        alert('Số tiền rút vượt quá số dư khả dụng');
                        return;
                      }

                      // Simulate API call
                      await new Promise(resolve => setTimeout(resolve, 1500));
                      
                      // Update wallet balance
                      setWalletBalance(prev => prev - amount);
                      
                      alert(`Yêu cầu rút tiền ${formatCurrency(amount)} đã được gửi. Tiền sẽ được chuyển vào tài khoản trong 1-3 ngày làm việc.`);
                      setWithdrawAmount('');
                    }}
                    disabled={!withdrawAmount || parseInt(withdrawAmount) < 100000 || parseInt(withdrawAmount) > walletBalance}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Xác nhận rút tiền
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/investor-home')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/investor')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-funds-line text-2xl"></i>
            <span className="text-xs">Đầu tư</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-amber-600 cursor-pointer">
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-semibold">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/investor-community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-community-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
