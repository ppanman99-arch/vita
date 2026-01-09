import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function CapTableManagement() {
  const [showESOP, setShowESOP] = useState(false);
  const [esopAmount, setEsopAmount] = useState(5); // %

  // Cap Table Data
  const capTableData = [
    { name: 'Founders', value: 60, color: '#10b981' },
    { name: 'Angel Investors', value: 15, color: '#3b82f6' },
    { name: 'Team/ESOP Pool', value: 20, color: '#8b5cf6' },
    { name: 'Seed Investors', value: 5, color: '#f59e0b' },
  ];

  const shareholders = [
    { name: 'Nguyễn Văn A', role: 'Founder & CEO', ownership: 35, shares: 3500000, type: 'founder' },
    { name: 'Trần Thị B', role: 'Co-Founder & CTO', ownership: 25, shares: 2500000, type: 'founder' },
    { name: 'Angel Fund I', role: 'Angel Investor', ownership: 10, shares: 1000000, type: 'angel' },
    { name: 'Angel Fund II', role: 'Angel Investor', ownership: 5, shares: 500000, type: 'angel' },
    { name: 'ESOP Pool', role: 'Employee Stock Options', ownership: 20, shares: 2000000, type: 'esop' },
    { name: 'Seed Fund Alpha', role: 'Seed Investor', ownership: 5, shares: 500000, type: 'seed' },
  ];

  const totalShares = 10000000; // 10M shares

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-group-line mr-2 text-emerald-600"></i>
          Cổng Quản lý Cổ đông - Cap Table Management
        </h2>
        <p className="text-gray-600">
          Cơ cấu sở hữu và phân bổ cổ phần hiện tại
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ownership Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cơ cấu Sở hữu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={capTableData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {capTableData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Shareholder List */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Danh sách Cổ đông</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shareholders.map((shareholder, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{shareholder.name}</p>
                    <p className="text-sm text-gray-600">{shareholder.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{shareholder.ownership}%</p>
                    <p className="text-xs text-gray-500">{shareholder.shares.toLocaleString()} cổ phần</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      shareholder.type === 'founder' ? 'bg-emerald-500' :
                      shareholder.type === 'angel' ? 'bg-blue-500' :
                      shareholder.type === 'esop' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}
                    style={{ width: `${shareholder.ownership}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Tổng cổ phần phát hành:</span>
              <span className="text-lg font-bold text-emerald-600">{totalShares.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ESOP Management */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <i className="ri-gift-line text-purple-600"></i>
            Quản lý ESOP (Employee Stock Option Plan)
          </h3>
          <button
            onClick={() => setShowESOP(!showESOP)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
          >
            {showESOP ? 'Ẩn' : 'Hiển thị'} Công cụ
          </button>
        </div>

        {showESOP && (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700 mb-4">
                ESOP Pool hiện tại: <strong>20%</strong> tổng cổ phần (2,000,000 cổ phần)
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phát hành ESOP mới: <span className="text-purple-600 font-bold">{esopAmount}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={esopAmount}
                  onChange={(e) => setEsopAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Cổ phần mới phát hành</p>
                  <p className="text-lg font-bold text-purple-600">
                    {Math.round(totalShares * esopAmount / 100).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Tổng ESOP sau phát hành</p>
                  <p className="text-lg font-bold text-purple-600">
                    {(20 + esopAmount).toFixed(1)}%
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                <i className="ri-check-line mr-2"></i>
                Xác nhận Phát hành ESOP
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dilution Calculator */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-calculator-line text-blue-600"></i>
          Máy tính Pha loãng (Dilution Calculator)
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Tính toán tác động của vòng gọi vốn mới lên tỷ lệ sở hữu hiện tại
        </p>
        <div className="bg-white p-4 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tỷ lệ sở hữu hiện tại (ví dụ):</span>
              <span className="font-bold text-gray-900">10%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Vòng gọi vốn mới (Series A - $3M):</span>
              <span className="font-bold text-blue-600">30% cổ phần mới</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Tỷ lệ sở hữu sau pha loãng:</span>
                <span className="text-xl font-bold text-emerald-600">7%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                (Giảm 3% nhưng giá trị tăng do định giá tăng)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

