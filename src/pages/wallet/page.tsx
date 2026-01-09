import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/feature/BottomNav';

export default function Wallet() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const navigate = useNavigate();

  const transactions = [
    { 
      id: 1, 
      type: 'income', 
      title: 'Bán lô quýt mã #QS123', 
      amount: 5000000, 
      date: '15/01/2025',
      time: '14:30',
      status: 'completed'
    },
    { 
      id: 2, 
      type: 'expense', 
      title: 'Mua phân hữu cơ', 
      amount: 500000, 
      date: '14/01/2025',
      time: '09:15',
      status: 'completed'
    },
    { 
      id: 3, 
      type: 'income', 
      title: 'Bán lô quýt mã #QS122', 
      amount: 4500000, 
      date: '10/01/2025',
      time: '16:20',
      status: 'completed'
    },
    { 
      id: 4, 
      type: 'expense', 
      title: 'Mua thuốc sinh học', 
      amount: 300000, 
      date: '08/01/2025',
      time: '10:45',
      status: 'completed'
    },
    { 
      id: 5, 
      type: 'income', 
      title: 'Bán lô quýt mã #QS121', 
      amount: 5200000, 
      date: '05/01/2025',
      time: '15:00',
      status: 'completed'
    },
    { 
      id: 6, 
      type: 'expense', 
      title: 'Mua phân NPK', 
      amount: 450000, 
      date: '03/01/2025',
      time: '08:30',
      status: 'completed'
    }
  ];

  const monthlyData = [
    { month: 'T1', income: 14700000 },
    { month: 'T12', income: 12500000 },
    { month: 'T11', income: 13200000 },
    { month: 'T10', income: 11800000 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const maxIncome = Math.max(...monthlyData.map(d => d.income));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-lg font-bold">Ví Nông dân</h1>
              <p className="text-xs text-emerald-100">Quản lý thu chi</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 shadow-xl text-white mb-5">
          <p className="text-xs text-green-100 mb-1">Số dư khả dụng</p>
          <h2 className="text-3xl font-bold mb-5">{formatCurrency(balance)}</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs text-green-100 mb-0.5">Thu nhập</p>
              <p className="text-base font-semibold">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs text-green-100 mb-0.5">Chi tiêu</p>
              <p className="text-base font-semibold">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>

        {/* Income Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-gray-800">Biểu đồ thu nhập</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPeriod === 'month' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tháng
              </button>
              <button 
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPeriod === 'year' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Năm
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyData.map((data, index) => {
              const height = (data.income / maxIncome) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-32">
                    <div 
                      className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{data.month}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Thu nhập tháng này: <span className="font-semibold text-green-600">{formatCurrency(monthlyData[0].income)}</span>
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mb-5">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Lịch sử giao dịch</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  } rounded-xl flex items-center justify-center`}>
                    <i className={`${
                      transaction.type === 'income' ? 'ri-arrow-down-line text-green-600' : 'ri-arrow-up-line text-red-600'
                    } text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 mb-0.5">{transaction.title}</h4>
                    <p className="text-xs text-gray-500">{transaction.date} • {transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="wallet" />
    </div>
  );
}
