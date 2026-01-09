import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SplitRule {
  recipient: string;
  percentage: number;
  amount: number;
  description: string;
  walletAddress?: string;
}

export default function ProfitSplitPage() {
  const navigate = useNavigate();
  const [totalRevenue] = useState(10000000000); // 10 Tỷ VNĐ
  const [splitRules, setSplitRules] = useState<SplitRule[]>([
    {
      recipient: 'GreenLight (Phí nền tảng)',
      percentage: 5,
      amount: totalRevenue * 0.05,
      description: 'Phí vận hành hệ thống',
      walletAddress: 'WALLET-GL-001'
    },
    {
      recipient: 'Nhà đầu tư (Xã viên Góp vốn)',
      percentage: 20,
      amount: totalRevenue * 0.20,
      description: 'Cổ tức chia theo tỷ lệ vốn góp',
      walletAddress: 'INVESTOR-POOL'
    },
    {
      recipient: 'Chủ rừng (Xã viên Góp đất)',
      percentage: 30,
      amount: totalRevenue * 0.30,
      description: 'Lợi tức từ góp đất',
      walletAddress: 'LANDOWNER-POOL'
    },
    {
      recipient: 'Nông dân (Xã viên Sản xuất)',
      percentage: 40,
      amount: totalRevenue * 0.40,
      description: 'Lương + Thưởng năng suất',
      walletAddress: 'FARMER-POOL'
    },
    {
      recipient: 'Quỹ Phát triển HTX',
      percentage: 5,
      amount: totalRevenue * 0.05,
      description: 'Tái đầu tư vụ sau',
      walletAddress: 'COOP-FUND'
    }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleExecuteSplit = () => {
    setIsExecuting(true);
    
    // Simulate Smart Contract execution
    setTimeout(() => {
      setIsExecuting(false);
      setIsCompleted(true);
      alert('Smart Contract đã hoàn tất! Tất cả các ví đã nhận tiền.');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/trade-execution')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Phân Chia Lợi Nhuận Tự Động</h1>
            <p className="text-sm opacity-90">The Great Split - Trái tim của Kinh tế chia sẻ</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Tổng doanh thu từ giao dịch</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{formatCurrency(totalRevenue)}</h2>
            <p className="text-sm text-gray-500">
              Doanh nghiệp B2B thanh toán vào tài khoản Escrow
            </p>
          </div>
        </div>

        {/* Smart Contract Info */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-purple-600 text-3xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Smart Contract tự động</h3>
              <p className="text-sm text-gray-700 mb-3">
                Ngay khi tiền vào Escrow, Smart Contract sẽ tự động chia tiền theo tỷ lệ đã cấu hình từ trước.
                Tiền không nằm lại ở HTX mà chảy ngay về túi mọi người.
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-xs text-gray-700">
                Smart Contract.executeSplit(totalRevenue) → Auto transfer to wallets
              </div>
            </div>
          </div>
        </div>

        {/* Split Rules */}
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tỷ lệ phân chia</h2>
          
          {splitRules.map((rule, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{rule.recipient}</h3>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {rule.percentage}%
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(rule.amount)}
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
                  style={{width: `${rule.percentage}%`}}
                ></div>
              </div>

              {rule.walletAddress && (
                <p className="text-xs text-gray-500 font-mono mt-2">
                  Wallet: {rule.walletAddress}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Execution */}
        {!isCompleted && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {!isExecuting ? (
              <button
                onClick={handleExecuteSplit}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
              >
                Kích hoạt Smart Contract → Phân chia Tự động
              </button>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900 mb-2">Smart Contract đang xử lý...</p>
                <p className="text-sm text-gray-600">
                  Đang chuyển tiền đến tất cả các ví...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Completion */}
        {isCompleted && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-emerald-600 text-5xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Phân chia hoàn tất!</h3>
              <p className="text-gray-600">
                Tất cả các ví đã nhận tiền. Minh bạch tuyệt đối.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Thông báo đã gửi đến:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <i className="ri-phone-line text-emerald-600"></i>
                  <span className="text-gray-700">Điện thoại của bác nông dân</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-phone-line text-emerald-600"></i>
                  <span className="text-gray-700">Điện thoại của bác chủ rừng</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-phone-line text-emerald-600"></i>
                  <span className="text-gray-700">Điện thoại của nhà đầu tư ở Hà Nội</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                <i className="ri-notification-line mr-1"></i>
                Tất cả cùng rung lên một lúc!
              </p>
            </div>

            <button
              onClick={() => navigate('/reinvestment-loop')}
              className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Tiếp tục → Tái Đầu Tư (The Loop)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




