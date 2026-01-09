import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function ForestCanopyHealthWidget() {
  const navigate = useNavigate();

  // Mock data - sẽ được lấy từ API thực tế
  const canopyData = [
    { name: 'Đủ chuẩn (Ready)', value: 120, color: '#10b981', status: 'ready' }, // ha
    { name: 'Thiếu nhẹ (Cần cải thiện)', value: 60, color: '#f59e0b', status: 'needs-improvement' }, // ha
    { name: 'Đất trống (Cần gọi vốn)', value: 65, color: '#ef4444', status: 'critical' }, // ha
  ];

  const totalArea = canopyData.reduce((sum, item) => sum + item.value, 0);

  const alerts = [
    {
      id: 1,
      lot: 'Lô A',
      herb: 'Sâm Ngọc Linh',
      required: 70,
      current: 30,
      gap: 40,
      severity: 'critical',
      b2bOrder: 'REQ-2024-001',
    },
    {
      id: 2,
      lot: 'Lô B',
      herb: 'Tam Thất',
      required: 65,
      current: 50,
      gap: 15,
      severity: 'warning',
      b2bOrder: 'REQ-2024-002',
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ready': return 'text-green-600 bg-green-50';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="ri-tree-line text-emerald-600"></i>
          Sức khỏe Tán Rừng (Forest Canopy Health)
        </h3>
        <button
          onClick={() => navigate('/admin-forest-funding')}
          className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all"
        >
          <i className="ri-add-line mr-2"></i>
          Quản lý
        </button>
      </div>

      {/* Pie Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={canopyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: any) => {
                const percent = (entry.value / totalArea) * 100;
                return `${entry.name}: ${percent.toFixed(0)}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {canopyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} ha`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {canopyData.map((item, index) => (
          <div key={index} className={`p-3 rounded-lg ${getStatusColor(item.status)}`}>
            <div className="text-2xl font-bold mb-1">{item.value} ha</div>
            <div className="text-xs">{item.name}</div>
            <div className="text-xs mt-1 opacity-75">
              {((item.value / totalArea) * 100).toFixed(1)}% tổng diện tích
            </div>
          </div>
        ))}
      </div>

      {/* Coverage Gap Alerts */}
      {alerts.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <i className="ri-alert-line text-red-600"></i>
            Cảnh báo Thiếu hụt Độ che phủ
          </h4>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {alert.lot} - {alert.herb}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        Yêu cầu: <strong>{alert.required}%</strong> | 
                        Hiện tại: <strong>{alert.current}%</strong> | 
                        Thiếu: <strong className="text-red-600">{alert.gap}%</strong>
                      </p>
                      <p>
                        Đơn hàng B2B: <span className="font-mono text-xs">{alert.b2bOrder}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/admin-forest-funding?lot=${alert.lot}&gap=${alert.gap}`)}
                    className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded hover:bg-emerald-700 transition-all"
                  >
                    Tạo dự án
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action */}
      <div className="mt-4 pt-4 border-t">
        <button
          onClick={() => navigate('/admin-forest-funding')}
          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <i className="ri-add-circle-line"></i>
          Tạo Dự án Gọi vốn Trồng rừng
        </button>
      </div>
    </div>
  );
}

