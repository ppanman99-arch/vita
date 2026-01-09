import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function VitalityMonitor() {
  const [realTimeEvents, setRealTimeEvents] = useState<any[]>([]);

  useEffect(() => {
    // Simulate real-time events
    const events = [
      { id: 1, type: 'farmer', message: 'Nông dân mới gia nhập: Nguyễn Văn A', time: '14:32:15', location: 'Phú Thọ' },
      { id: 2, type: 'tree', message: '500 cây Sâm Ngọc Linh mới được trồng', time: '14:28:42', location: 'Hòa Bình' },
      { id: 3, type: 'order', message: 'Đơn hàng B2B vừa chốt: 2.5 tỷ VNĐ', time: '14:25:18', location: 'Hà Nội' },
      { id: 4, type: 'farmer', message: 'Nông dân mới gia nhập: Trần Thị B', time: '14:20:05', location: 'Yên Bái' },
      { id: 5, type: 'tree', message: '1,200 cây Đương Quy mới được trồng', time: '14:15:33', location: 'Lào Cai' },
    ];
    setRealTimeEvents(events);

    // Simulate new events every 5 seconds
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        type: ['farmer', 'tree', 'order'][Math.floor(Math.random() * 3)],
        message: 'Hoạt động mới được ghi nhận',
        time: new Date().toLocaleTimeString('vi-VN'),
        location: ['Phú Thọ', 'Hòa Bình', 'Yên Bái', 'Lào Cai'][Math.floor(Math.random() * 4)],
      };
      setRealTimeEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Order Book Data
  const orderBookData = [
    { company: 'Tập đoàn Dược Hậu Giang', product: 'Sâm Ngọc Linh', quantity: '50 tấn', value: '25 tỷ VNĐ', status: 'pending' },
    { company: 'Công ty Dược Traphaco', product: 'Đương Quy', quantity: '30 tấn', value: '12 tỷ VNĐ', status: 'pending' },
    { company: 'Công ty Dược Mebiphar', product: 'Cà Gai Leo', quantity: '20 tấn', value: '8 tỷ VNĐ', status: 'pending' },
    { company: 'Tập đoàn Dược Danapha', product: 'Sâm Ngọc Linh', quantity: '40 tấn', value: '20 tỷ VNĐ', status: 'pending' },
  ];

  const totalOrderValue = orderBookData.reduce((sum, order) => {
    return sum + parseFloat(order.value.replace(' tỷ VNĐ', ''));
  }, 0);

  // Unit Economics Data
  const unitEconomics = {
    investmentPerHa: 150, // triệu VNĐ
    revenueHerbal: 80, // triệu VNĐ/năm
    revenueCarbon: 25, // triệu VNĐ/năm
    farmerROI: 40, // %
    greenlightTakeRate: 15, // %
  };

  // Growth Chart Data
  const growthData = [
    { month: 'T1', area: 200, farmers: 150, orders: 8 },
    { month: 'T2', area: 220, farmers: 165, orders: 10 },
    { month: 'T3', area: 245, farmers: 187, orders: 12 },
    { month: 'T4', area: 270, farmers: 210, orders: 15 },
    { month: 'T5', area: 300, farmers: 235, orders: 18 },
    { month: 'T6', area: 330, farmers: 260, orders: 22 },
  ];

  // Revenue Breakdown - Updated based on Diversified Revenue Model
  const revenueData = [
    { name: 'Phí B2B & Bao tiêu', value: 40, color: '#10b981', amount: 7400 },
    { name: 'Phí Giao dịch Carbon', value: 20, color: '#06b6d4', amount: 3700 },
    { name: 'Phí Đầu tư & Tài chính', value: 20, color: '#8b5cf6', amount: 3700 },
    { name: 'Phí SaaS & Data', value: 15, color: '#f59e0b', amount: 2775 },
    { name: 'Bán lẻ B2C', value: 5, color: '#ef4444', amount: 925 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-pulse-line mr-2 text-emerald-600"></i>
          Dashboard Sức sống - The Vitality Monitor
        </h2>
        <p className="text-gray-600">
          Hệ thống đang "thở", dòng tiền đang chảy và cây đang lớn - Tất cả theo thời gian thực
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tổng diện tích</span>
            <i className="ri-landscape-line text-emerald-600 text-2xl"></i>
          </div>
          <div className="text-3xl font-bold text-gray-900">245.8 ha</div>
          <div className="text-sm text-emerald-600 mt-1">+12.5% so với tháng trước</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Nông dân hoạt động</span>
            <i className="ri-team-line text-blue-600 text-2xl"></i>
          </div>
          <div className="text-3xl font-bold text-gray-900">187</div>
          <div className="text-sm text-blue-600 mt-1">+23 người mới tháng này</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Sổ lệnh chờ</span>
            <i className="ri-file-list-3-line text-purple-600 text-2xl"></i>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalOrderValue} tỷ</div>
          <div className="text-sm text-purple-600 mt-1">Đầu ra lớn gấp 10x cung ứng</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">GMV tháng này</span>
            <i className="ri-money-dollar-circle-line text-orange-600 text-2xl"></i>
          </div>
          <div className="text-3xl font-bold text-gray-900">18.5 tỷ</div>
          <div className="text-sm text-orange-600 mt-1">+35% so với tháng trước</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Traction Map */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-map-pin-2-line text-emerald-600"></i>
            Real-time Traction Map
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {realTimeEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-emerald-500 animate-pulse"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event.type === 'farmer' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'tree' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <i className={`${
                    event.type === 'farmer' ? 'ri-user-add-line' :
                    event.type === 'tree' ? 'ri-plant-line' :
                    'ri-shopping-cart-line'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.message}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <i className="ri-map-pin-line"></i>
                    <span>{event.location}</span>
                    <span className="mx-1">•</span>
                    <i className="ri-time-line"></i>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Book */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-file-list-3-line text-purple-600"></i>
            The Order Book - Sổ lệnh chờ
          </h3>
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border-2 border-purple-200">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {totalOrderValue} tỷ VNĐ
            </div>
            <p className="text-sm text-gray-600">
              Tổng giá trị hợp đồng bao tiêu đang chờ được đáp ứng
            </p>
            <p className="text-xs text-purple-600 mt-2 font-semibold">
              💡 Đầu ra lớn gấp 10 lần khả năng cung ứng hiện tại!
            </p>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {orderBookData.map((order, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{order.company}</p>
                    <p className="text-sm text-gray-600">{order.product}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    Chờ
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-gray-600">{order.quantity}</span>
                  <span className="font-bold text-gray-900">{order.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unit Economics */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-calculator-line text-emerald-600"></i>
          Unit Economics - Kinh tế đơn vị (1 ha rừng)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Chi phí đầu tư</p>
            <p className="text-xl font-bold text-gray-900">{unitEconomics.investmentPerHa} triệu</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Doanh thu dược liệu</p>
            <p className="text-xl font-bold text-emerald-600">{unitEconomics.revenueHerbal} triệu/năm</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Doanh thu Carbon</p>
            <p className="text-xl font-bold text-cyan-600">{unitEconomics.revenueCarbon} triệu/năm</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">ROI Nông dân</p>
            <p className="text-xl font-bold text-blue-600">{unitEconomics.farmerROI}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Take-rate GreenLight</p>
            <p className="text-xl font-bold text-purple-600">{unitEconomics.greenlightTakeRate}%</p>
          </div>
        </div>
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tăng trưởng 6 tháng gần đây</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="area" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="farmers" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cơ cấu Doanh thu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

