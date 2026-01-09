import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EscrowAccount {
  projectId: string;
  projectName: string;
  source: 'esg' | 'b2b' | 'crowd';
  amount: number;
  lockedAmount: number;
  releasedAmount: number;
  status: 'locked' | 'partial_released' | 'fully_released';
  conditions: string[];
  milestones: {
    milestone: string;
    condition: string;
    releasePercentage: number;
    status: 'pending' | 'met' | 'released';
  }[];
}

export default function EscrowWalletPage() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<EscrowAccount | null>(null);

  const escrowAccounts: EscrowAccount[] = [
    {
      projectId: 'ESG-2024-001',
      projectName: 'Trồng rừng Mega 3P - Lô A',
      source: 'esg',
      amount: 2000000000,
      lockedAmount: 2000000000,
      releasedAmount: 0,
      status: 'locked',
      conditions: [
        'Giải ngân 30% khi mua giống và bắt đầu trồng',
        'Giải ngân 30% khi hoàn thành 50% công việc trồng cây',
        'Giải ngân 40% khi hoàn thành 100% và xác nhận tỷ lệ sống > 90%'
      ],
      milestones: [
        {
          milestone: 'Mua giống & Bắt đầu trồng',
          condition: 'Đã mua giống và bắt đầu trồng cây',
          releasePercentage: 30,
          status: 'pending'
        },
        {
          milestone: 'Hoàn thành 50% công việc',
          condition: 'Đã trồng 50% số cây, xác nhận bởi AI',
          releasePercentage: 30,
          status: 'pending'
        },
        {
          milestone: 'Hoàn thành 100% & Tỷ lệ sống > 90%',
          condition: 'Đã trồng 100% số cây, tỷ lệ sống được xác nhận > 90%',
          releasePercentage: 40,
          status: 'pending'
        }
      ]
    },
    {
      projectId: 'OFFTAKE-2024-001',
      projectName: 'Đặt cọc Sâm Ngọc Linh - 5 tấn',
      source: 'b2b',
      amount: 1500000000,
      lockedAmount: 1500000000,
      releasedAmount: 0,
      status: 'locked',
      conditions: [
        'Giải ngân 30% khi ký hợp đồng',
        'Giải ngân 40% khi hoàn thành 50% sản lượng',
        'Giải ngân 30% khi giao hàng và nghiệm thu'
      ],
      milestones: [
        {
          milestone: 'Ký hợp đồng',
          condition: 'Hợp đồng đã được ký và ghi nhận',
          releasePercentage: 30,
          status: 'met'
        },
        {
          milestone: 'Hoàn thành 50% sản lượng',
          condition: 'Đã trồng và chăm sóc đạt 50% sản lượng',
          releasePercentage: 40,
          status: 'pending'
        },
        {
          milestone: 'Giao hàng & Nghiệm thu',
          condition: 'Đã giao hàng đầy đủ và được nghiệm thu',
          releasePercentage: 30,
          status: 'pending'
        }
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getTotalLocked = () => {
    return escrowAccounts.reduce((sum, acc) => sum + acc.lockedAmount, 0);
  };

  const getTotalReleased = () => {
    return escrowAccounts.reduce((sum, acc) => sum + acc.releasedAmount, 0);
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'esg':
        return 'from-green-600 to-emerald-600';
      case 'b2b':
        return 'from-blue-600 to-indigo-600';
      case 'crowd':
        return 'from-purple-600 to-pink-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'esg':
        return 'ESG Tài trợ';
      case 'b2b':
        return 'B2B Đặt cọc';
      case 'crowd':
        return 'Cộng đồng';
      default:
        return 'Khác';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin-finance')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Ví Dự án - Tài khoản Phong tỏa</h1>
            <p className="text-sm opacity-90">Escrow Account - Tiền trao cháo múc</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <i className="ri-wallet-3-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng số dư</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalLocked() + getTotalReleased())}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                <i className="ri-lock-line text-2xl text-amber-600"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Đang phong tỏa</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalLocked())}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                <i className="ri-check-line text-2xl text-emerald-600"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã giải ngân</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalReleased())}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <i className="ri-information-line text-2xl text-amber-600 flex-shrink-0 mt-1"></i>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Quy tắc Giải ngân Thông minh</h3>
              <p className="text-sm text-amber-800 mb-3">
                Tiền đã về, nhưng bạn phải bắt đầu làm việc (mua giống/trồng cây) thì mới được lấy tiền.
                Smart Contract sẽ tự động kiểm tra điều kiện và giải ngân khi đáp ứng milestone.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xs text-gray-700 font-mono">
                  IF (Tiến độ = milestone) AND (Tỷ lệ sống {'>'} 90% - xác nhận bởi AI) AND (Không có khiếu nại)
                  {' -> '} Tự động giải ngân
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Accounts List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Các Tài khoản Phong tỏa</h2>
          
          {escrowAccounts.map((account) => (
            <div
              key={account.projectId}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getSourceColor(account.source)} rounded-xl flex items-center justify-center`}>
                      <i className="ri-folder-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{account.projectName}</h3>
                      <p className="text-sm text-gray-600">Mã: {account.projectId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getSourceColor(account.source)} text-white`}>
                      {getSourceLabel(account.source)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      account.status === 'locked' ? 'bg-amber-100 text-amber-700' :
                      account.status === 'partial_released' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {account.status === 'locked' ? 'Đang phong tỏa' :
                       account.status === 'partial_released' ? 'Giải ngân một phần' :
                       'Đã giải ngân hoàn toàn'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Tổng số tiền</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(account.amount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Đang phong tỏa</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(account.lockedAmount)}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Đã giải ngân</p>
                  <p className="text-lg font-bold text-emerald-600">{formatCurrency(account.releasedAmount)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Tỷ lệ giải ngân</p>
                  <p className="text-lg font-bold text-blue-600">
                    {((account.releasedAmount / account.amount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Milestones */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Các mốc giải ngân</h4>
                <div className="space-y-3">
                  {account.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        milestone.status === 'released'
                          ? 'bg-emerald-50 border-emerald-200'
                          : milestone.status === 'met'
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            milestone.status === 'released'
                              ? 'bg-emerald-600 text-white'
                              : milestone.status === 'met'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {milestone.status === 'released' || milestone.status === 'met' ? (
                              <i className="ri-check-line"></i>
                            ) : (
                              idx + 1
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{milestone.milestone}</h5>
                            <p className="text-xs text-gray-600 mt-1">{milestone.condition}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{milestone.releasePercentage}%</p>
                          <p className="text-xs text-gray-600">
                            {formatCurrency(account.amount * milestone.releasePercentage / 100)}
                          </p>
                        </div>
                      </div>
                      {milestone.status === 'met' && (
                        <div className="mt-2 pt-2 border-t border-blue-200">
                          <p className="text-xs text-blue-800">
                            <i className="ri-time-line mr-1"></i>
                            Điều kiện đã đạt, đang chờ Smart Contract giải ngân...
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedAccount(account)}
                className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




