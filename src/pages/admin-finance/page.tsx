import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payable' | 'receivable' | 'advance' | 'settlement'>('overview');
  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);

  // Mock data - Công nợ nông dân
  const farmerDebts = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      totalDebt: 5500000,
      seedDebt: 2000000,
      fertilizerDebt: 3500000,
      dueDate: '30/11/2024',
      status: 'normal',
      lastPayment: '15/10/2024',
      creditScore: 92
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0923456789',
      totalDebt: 8200000,
      seedDebt: 3000000,
      fertilizerDebt: 5200000,
      dueDate: '25/11/2024',
      status: 'warning',
      lastPayment: '20/09/2024',
      creditScore: 88
    },
    {
      id: 3,
      name: 'Lê Văn C',
      phone: '0934567890',
      totalDebt: 3800000,
      seedDebt: 1500000,
      fertilizerDebt: 2300000,
      dueDate: '05/12/2024',
      status: 'normal',
      lastPayment: '01/11/2024',
      creditScore: 85
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      phone: '0945678901',
      totalDebt: 0,
      seedDebt: 0,
      fertilizerDebt: 0,
      dueDate: '-',
      status: 'clear',
      lastPayment: '10/11/2024',
      creditScore: 95
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      phone: '0956789012',
      totalDebt: 12500000,
      seedDebt: 4500000,
      fertilizerDebt: 8000000,
      dueDate: '15/11/2024',
      status: 'overdue',
      lastPayment: '15/08/2024',
      creditScore: 78
    }
  ];

  // Mock data - Thanh toán chờ xử lý
  const pendingPayments = [
    {
      id: 1,
      farmer: 'Nguyễn Văn A',
      product: 'Quýt Vân Sơn',
      quantity: 150,
      unitPrice: 45000,
      totalAmount: 6750000,
      deduction: 1200000,
      netAmount: 5550000,
      harvestDate: '10/11/2024',
      status: 'pending',
      bankAccount: '1234567890 - Vietcombank'
    },
    {
      id: 2,
      farmer: 'Phạm Thị D',
      product: 'Cà Gai Leo',
      quantity: 220,
      unitPrice: 52000,
      totalAmount: 11440000,
      deduction: 0,
      netAmount: 11440000,
      harvestDate: '12/11/2024',
      status: 'pending',
      bankAccount: '7777888899 - Vietinbank'
    },
    {
      id: 3,
      farmer: 'Trần Thị B',
      product: 'Hoàng Liên',
      quantity: 180,
      unitPrice: 48000,
      totalAmount: 8640000,
      deduction: 2500000,
      netAmount: 6140000,
      harvestDate: '11/11/2024',
      status: 'approved',
      bankAccount: '9876543210 - Agribank'
    }
  ];

  // Mock data - Doanh thu từ doanh nghiệp
  const enterpriseRevenue = [
    {
      id: 1,
      enterprise: 'Công ty Dược Phẩm Việt Nam',
      product: 'Quýt Vân Sơn',
      quantity: 500,
      unitPrice: 48000,
      totalAmount: 24000000,
      paidAmount: 24000000,
      remainingAmount: 0,
      invoiceDate: '05/11/2024',
      paymentDate: '10/11/2024',
      status: 'paid'
    },
    {
      id: 2,
      enterprise: 'Tập đoàn Dược liệu Trung Ương',
      product: 'Tam Thất',
      quantity: 300,
      unitPrice: 125000,
      totalAmount: 37500000,
      paidAmount: 20000000,
      remainingAmount: 17500000,
      invoiceDate: '08/11/2024',
      paymentDate: '-',
      status: 'partial'
    },
    {
      id: 3,
      enterprise: 'Công ty TNHH Dược Phẩm Xanh',
      product: 'Cà Gai Leo',
      quantity: 400,
      unitPrice: 55000,
      totalAmount: 22000000,
      paidAmount: 0,
      remainingAmount: 22000000,
      invoiceDate: '12/11/2024',
      paymentDate: '-',
      status: 'unpaid'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'normal':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Bình thường</span>;
      case 'warning':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">Sắp đến hạn</span>;
      case 'overdue':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Quá hạn</span>;
      case 'clear':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Không nợ</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">Chờ duyệt</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Đã duyệt</span>;
      case 'paid':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Đã thanh toán</span>;
      case 'partial':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">Thanh toán 1 phần</span>;
      case 'unpaid':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Chưa thanh toán</span>;
      default:
        return null;
    }
  };

  const toggleFarmer = (farmerId: number) => {
    if (selectedFarmers.includes(farmerId)) {
      setSelectedFarmers(selectedFarmers.filter(id => id !== farmerId));
    } else {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    }
  };

  const getTotalSelectedAmount = () => {
    return pendingPayments
      .filter(p => selectedFarmers.includes(p.id) && p.status === 'pending')
      .reduce((sum, p) => sum + p.netAmount, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar 
        title="Tài chính Nội bộ" 
        subtitle="Công nợ & Thanh toán"
      />

      <div className="pt-16 px-3 sm:px-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-dashboard-line mr-1"></i>
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('payable')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'payable'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-hand-coin-line mr-1"></i>
            Phải trả
          </button>
          <button
            onClick={() => setActiveTab('receivable')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'receivable'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-money-dollar-circle-line mr-1"></i>
            Phải thu
          </button>
          <button
            onClick={() => setActiveTab('advance')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'advance'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-wallet-3-line mr-1"></i>
            Ứng trước
          </button>
          <button
            onClick={() => setActiveTab('settlement')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'settlement'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-bank-card-line mr-1"></i>
            Thanh toán
          </button>
        </div>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Financial Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-arrow-down-line text-lg text-green-600"></i>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-800">83.5M</div>
                <div className="text-xs text-gray-500">Doanh thu tháng</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="ri-arrow-up-line text-lg text-red-600"></i>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-800">54.2M</div>
                <div className="text-xs text-gray-500">Chi phí tháng</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-wallet-line text-lg text-blue-600"></i>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-800">29.3M</div>
                <div className="text-xs text-gray-500">Lợi nhuận</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-amber-600"></i>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-800">30.0M</div>
                <div className="text-xs text-gray-500">Công nợ</div>
              </div>
            </div>

            {/* Cash Flow Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Dòng tiền 6 tháng gần nhất</h3>
              <div className="space-y-3">
                {[
                  { month: 'Tháng 6', revenue: 72, expense: 48, profit: 24 },
                  { month: 'Tháng 7', revenue: 85, expense: 52, profit: 33 },
                  { month: 'Tháng 8', revenue: 78, expense: 50, profit: 28 },
                  { month: 'Tháng 9', revenue: 92, expense: 58, profit: 34 },
                  { month: 'Tháng 10', revenue: 88, expense: 55, profit: 33 },
                  { month: 'Tháng 11', revenue: 83.5, expense: 54.2, profit: 29.3 }
                ].map((data, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="font-medium">{data.month}</span>
                      <span className="font-semibold text-emerald-600">{data.profit}M</span>
                    </div>
                    <div className="flex gap-1 h-6">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 rounded-l-lg flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${data.revenue}%` }}
                      >
                        {data.revenue}M
                      </div>
                      <div 
                        className="bg-gradient-to-r from-red-400 to-red-500 rounded-r-lg flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${data.expense}%` }}
                      >
                        {data.expense}M
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Doanh thu</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600">Chi phí</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <i className="ri-bank-card-line text-2xl mb-2"></i>
                <div className="font-bold text-sm">Thanh toán hàng loạt</div>
                <div className="text-xs opacity-90">3 phiếu chờ duyệt</div>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <i className="ri-file-list-3-line text-2xl mb-2"></i>
                <div className="font-bold text-sm">Báo cáo tài chính</div>
                <div className="text-xs opacity-90">Xuất Excel</div>
              </button>
            </div>
          </div>
        )}

        {/* Tab: Payable (Phải trả nông dân) */}
        {activeTab === 'payable' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-amber-600"></i>
                </div>
                <div className="text-lg font-bold text-gray-800">{pendingPayments.filter(p => p.status === 'pending').length}</div>
                <div className="text-xs text-gray-500">Chờ duyệt</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-check-line text-lg text-blue-600"></i>
                </div>
                <div className="text-lg font-bold text-gray-800">{pendingPayments.filter(p => p.status === 'approved').length}</div>
                <div className="text-xs text-gray-500">Đã duyệt</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <i className="ri-money-dollar-circle-line text-lg text-emerald-600"></i>
                </div>
                <div className="text-base font-bold text-gray-800">23.3M</div>
                <div className="text-xs text-gray-500">Tổng giá trị</div>
              </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Phiếu thanh toán</h3>
              <div className="space-y-3">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {payment.status === 'pending' && (
                          <input
                            type="checkbox"
                            checked={selectedFarmers.includes(payment.id)}
                            onChange={() => toggleFarmer(payment.id)}
                            className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{payment.farmer}</h4>
                          <p className="text-xs text-gray-500">{payment.product} • {payment.quantity} kg</p>
                        </div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Đơn giá:</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(payment.unitPrice)}/kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tổng tiền:</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(payment.totalAmount)}</span>
                      </div>
                      {payment.deduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-red-600">Cấn trừ nợ:</span>
                          <span className="font-semibold text-red-600">-{formatCurrency(payment.deduction)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-gray-200">
                        <span className="text-gray-800 font-semibold">Thực nhận:</span>
                        <span className="font-bold text-emerald-600">{formatCurrency(payment.netAmount)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-2">
                      <i className="ri-bank-card-line mr-1"></i>
                      {payment.bankAccount}
                    </div>

                    {payment.status === 'pending' && (
                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-check-line mr-1"></i>
                          Duyệt
                        </button>
                        <button className="bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-close-line mr-1"></i>
                          Từ chối
                        </button>
                      </div>
                    )}

                    {payment.status === 'approved' && (
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-bank-line mr-1"></i>
                        Chuyển khoản ngay
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Payment */}
            {selectedFarmers.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-4 text-white">
                <h3 className="font-bold mb-2">Thanh toán hàng loạt</h3>
                <div className="bg-white/20 rounded-lg p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Đã chọn {selectedFarmers.length} phiếu</span>
                    <span className="text-xl font-bold">{formatCurrency(getTotalSelectedAmount())}</span>
                  </div>
                </div>
                <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-bank-card-line mr-2"></i>
                  Thanh toán {selectedFarmers.length} phiếu
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Receivable (Phải thu từ doanh nghiệp) */}
        {activeTab === 'receivable' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-check-line text-lg text-green-600"></i>
                </div>
                <div className="text-lg font-bold text-gray-800">{enterpriseRevenue.filter(r => r.status === 'paid').length}</div>
                <div className="text-xs text-gray-500">Đã thu</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-yellow-600"></i>
                </div>
                <div className="text-lg font-bold text-gray-800">{enterpriseRevenue.filter(r => r.status === 'partial').length}</div>
                <div className="text-xs text-gray-500">Thu 1 phần</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="ri-alert-line text-lg text-red-600"></i>
                </div>
                <div className="text-lg font-bold text-gray-800">{enterpriseRevenue.filter(r => r.status === 'unpaid').length}</div>
                <div className="text-xs text-gray-500">Chưa thu</div>
              </div>
            </div>

            {/* Revenue List */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Công nợ doanh nghiệp</h3>
              <div className="space-y-3">
                {enterpriseRevenue.map((revenue) => (
                  <div key={revenue.id} className="border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{revenue.enterprise}</h4>
                        <p className="text-xs text-gray-500">{revenue.product} • {revenue.quantity} kg</p>
                      </div>
                      {getStatusBadge(revenue.status)}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tổng hóa đơn:</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(revenue.totalAmount)}</span>
                      </div>
                      {revenue.paidAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-green-600">Đã thu:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(revenue.paidAmount)}</span>
                        </div>
                      )}
                      {revenue.remainingAmount > 0 && (
                        <div className="flex justify-between pt-1 border-t border-gray-200">
                          <span className="text-red-600 font-semibold">Còn nợ:</span>
                          <span className="font-bold text-red-600">{formatCurrency(revenue.remainingAmount)}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                      <div>
                        <i className="ri-file-list-line mr-1"></i>
                        HĐ: {revenue.invoiceDate}
                      </div>
                      <div>
                        <i className="ri-calendar-check-line mr-1"></i>
                        TT: {revenue.paymentDate}
                      </div>
                    </div>

                    {revenue.status !== 'paid' && (
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-phone-line mr-1"></i>
                        Nhắc nợ
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Advance (Ứng trước) */}
        {activeTab === 'advance' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-seedling-line text-lg text-blue-600"></i>
                </div>
                <div className="text-base font-bold text-gray-800">8.5M</div>
                <div className="text-xs text-gray-500">Giống</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-plant-line text-lg text-green-600"></i>
                </div>
                <div className="text-base font-bold text-gray-800">21.5M</div>
                <div className="text-xs text-gray-500">Phân bón</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-flask-line text-lg text-amber-600"></i>
                </div>
                <div className="text-base font-bold text-gray-800">0M</div>
                <div className="text-xs text-gray-500">Thuốc BVTV</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="ri-wallet-line text-lg text-red-600"></i>
                </div>
                <div className="text-base font-bold text-gray-800">30.0M</div>
                <div className="text-xs text-gray-500">Tổng nợ</div>
              </div>
            </div>

            {/* Debt Management */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Quản lý công nợ nông dân</h3>
              <div className="space-y-3">
                {farmerDebts.map((debt) => (
                  <div key={debt.id} className="border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{debt.name}</h4>
                        <p className="text-xs text-gray-500">{debt.phone}</p>
                      </div>
                      {getStatusBadge(debt.status)}
                    </div>

                    {debt.totalDebt > 0 ? (
                      <>
                        <div className="bg-red-50 rounded-lg p-2 mb-2">
                          <div className="text-xs text-gray-600 mb-1">Tổng công nợ</div>
                          <div className="text-lg font-bold text-red-600">{formatCurrency(debt.totalDebt)}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div className="bg-blue-50 rounded-lg p-2">
                            <div className="text-gray-600">Giống</div>
                            <div className="font-semibold text-blue-600">{formatCurrency(debt.seedDebt)}</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2">
                            <div className="text-gray-600">Phân bón</div>
                            <div className="font-semibold text-green-600">{formatCurrency(debt.fertilizerDebt)}</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 mb-2">
                          <div className="flex justify-between">
                            <span>Hạn thanh toán:</span>
                            <span className={`font-semibold ${
                              debt.status === 'overdue' ? 'text-red-600' : 'text-gray-800'
                            }`}>{debt.dueDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Thanh toán gần nhất:</span>
                            <span className="font-semibold text-gray-800">{debt.lastPayment}</span>
                          </div>
                        </div>

                        <button className="w-full bg-amber-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-edit-line mr-1"></i>
                          Điều chỉnh công nợ
                        </button>
                      </>
                    ) : (
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <i className="ri-checkbox-circle-line text-2xl text-green-600 mb-1"></i>
                        <div className="text-sm font-semibold text-green-700">Không có công nợ</div>
                        <div className="text-xs text-gray-600">Thanh toán gần nhất: {debt.lastPayment}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Settlement (Thanh toán) */}
        {activeTab === 'settlement' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-4 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="ri-bank-line text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">Kết nối API Ngân hàng</h3>
                  <p className="text-sm opacity-90">Thanh toán tự động qua API</p>
                </div>
              </div>
              <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-settings-3-line mr-2"></i>
                Cấu hình API Banking
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Lịch sử thanh toán</h3>
              <div className="space-y-3">
                {[
                  { date: '10/11/2024', farmer: 'Phạm Thị D', amount: 11440000, status: 'success' },
                  { date: '09/11/2024', farmer: 'Nguyễn Văn A', amount: 5550000, status: 'success' },
                  { date: '08/11/2024', farmer: 'Lê Văn C', amount: 3200000, status: 'success' },
                  { date: '07/11/2024', farmer: 'Trần Thị B', amount: 6140000, status: 'failed' }
                ].map((tx, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <i className={`text-lg ${
                            tx.status === 'success' ? 'ri-check-line text-green-600' : 'ri-close-line text-red-600'
                          }`}></i>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{tx.farmer}</div>
                          <div className="text-xs text-gray-500">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          tx.status === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(tx.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tx.status === 'success' ? 'Thành công' : 'Thất bại'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  );
}
