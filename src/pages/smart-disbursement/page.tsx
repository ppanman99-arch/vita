import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DisbursementRule {
  condition: string;
  status: 'met' | 'not_met';
  details: string;
}

interface Disbursement {
  id: string;
  projectName: string;
  milestone: string;
  amount: number;
  recipient: string;
  rules: DisbursementRule[];
  status: 'pending' | 'processing' | 'completed';
}

export default function SmartDisbursementPage() {
  const navigate = useNavigate();
  const [disbursements, setDisbursements] = useState<Disbursement[]>([
    {
      id: 'DISB-001',
      projectName: 'Trồng rừng Mega 3P - Lô A',
      milestone: 'Hoàn thành 50% công việc trồng cây',
      amount: 600000000,
      recipient: 'Ví Nông dân',
      rules: [
        {
          condition: 'Tiến độ trồng = 50%',
          status: 'met',
          details: 'Đã trồng 2.000/4.000 cây (50%)'
        },
        {
          condition: 'Tỷ lệ sống > 90%',
          status: 'met',
          details: 'Tỷ lệ sống: 92% (xác nhận bởi AI)'
        },
        {
          condition: 'Không có khiếu nại từ Chủ rừng',
          status: 'met',
          details: 'Chủ rừng đã xác nhận'
        }
      ],
      status: 'pending'
    },
    {
      id: 'DISB-002',
      projectName: 'Chăm sóc Sâm Ngọc Linh - Lô 5',
      milestone: 'Hoàn thành 100% và Tỷ lệ sống > 90%',
      amount: 800000000,
      recipient: 'Ví Nông dân + Ví HTX',
      rules: [
        {
          condition: 'Tiến độ trồng = 100%',
          status: 'met',
          details: 'Đã hoàn thành 1.000/1.000 cây (100%)'
        },
        {
          condition: 'Tỷ lệ sống > 90%',
          status: 'met',
          details: 'Tỷ lệ sống: 95% (xác nhận bởi AI)'
        },
        {
          condition: 'Không có khiếu nại',
          status: 'met',
          details: 'Không có khiếu nại'
        }
      ],
      status: 'processing'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleExecuteDisbursement = (disbursement: Disbursement) => {
    if (disbursement.rules.every(r => r.status === 'met')) {
      setDisbursements(disbursements.map(d => 
        d.id === disbursement.id 
          ? { ...d, status: 'processing' as const }
          : d
      ));
      
      // Simulate smart contract execution
      setTimeout(() => {
        setDisbursements(disbursements.map(d => 
          d.id === disbursement.id 
            ? { ...d, status: 'completed' as const }
            : d
        ));
        alert(`Đã giải ngân ${formatCurrency(disbursement.amount)} đến ${disbursement.recipient}`);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/escrow-wallet')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Giải Ngân Thông Minh</h1>
            <p className="text-sm opacity-90">Smart Contract - Tiền trao cháo múc</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Info Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-3xl text-emerald-600"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Quy tắc Giải ngân</h3>
              <p className="text-sm text-gray-600 mb-3">
                Smart Contract tự động kiểm tra điều kiện và giải ngân khi đáp ứng milestone:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-700">
                IF (Tiến độ = milestone) AND (Tỷ lệ sống {'>'} 90% - xác nhận bởi AI) AND (Không có khiếu nại)
                {' -> '} Tự động giải ngân
              </div>
            </div>
          </div>
        </div>

        {/* Disbursements List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Các khoản giải ngân</h2>
          
          {disbursements.map((disbursement) => (
            <div
              key={disbursement.id}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{disbursement.projectName}</h3>
                  <p className="text-sm text-gray-600 mb-2">Milestone: {disbursement.milestone}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Số tiền</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(disbursement.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Người nhận</p>
                      <p className="text-sm font-semibold text-gray-900">{disbursement.recipient}</p>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  disbursement.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  disbursement.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {disbursement.status === 'completed' ? 'Đã giải ngân' :
                   disbursement.status === 'processing' ? 'Đang xử lý' : 'Chờ điều kiện'}
                </span>
              </div>

              {/* Conditions Check */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Điều kiện giải ngân:</h4>
                <div className="space-y-3">
                  {disbursement.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        rule.status === 'met'
                          ? 'border-emerald-200 bg-emerald-50'
                          : 'border-amber-200 bg-amber-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {rule.status === 'met' ? (
                          <i className="ri-checkbox-circle-line text-emerald-600 text-xl"></i>
                        ) : (
                          <i className="ri-time-line text-amber-600 text-xl"></i>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{rule.condition}</p>
                          <p className="text-sm text-gray-600 mt-1">{rule.details}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          rule.status === 'met' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {rule.status === 'met' ? 'Đã đạt' : 'Chưa đạt'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {disbursement.status === 'pending' && disbursement.rules.every(r => r.status === 'met') && (
                <button
                  onClick={() => handleExecuteDisbursement(disbursement)}
                  className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Kích hoạt Smart Contract → Giải ngân
                </button>
              )}

              {disbursement.status === 'processing' && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-blue-800">Smart Contract đang xử lý giải ngân...</p>
                  </div>
                </div>
              )}

              {disbursement.status === 'completed' && (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800 text-center">
                    <i className="ri-checkbox-circle-line mr-2"></i>
                    Đã giải ngân thành công. Tiền đã chuyển vào {disbursement.recipient}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tổng kết</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Chờ giải ngân</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  disbursements
                    .filter(d => d.status === 'pending' && d.rules.every(r => r.status === 'met'))
                    .reduce((sum, d) => sum + d.amount, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Đang xử lý</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  disbursements
                    .filter(d => d.status === 'processing')
                    .reduce((sum, d) => sum + d.amount, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Đã giải ngân</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(
                  disbursements
                    .filter(d => d.status === 'completed')
                    .reduce((sum, d) => sum + d.amount, 0)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




