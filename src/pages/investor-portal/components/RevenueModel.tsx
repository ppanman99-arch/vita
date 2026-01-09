import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function RevenueModel() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Revenue Mix Data
  const revenueMix = [
    { name: 'Phí B2B & Bao tiêu', value: 40, color: '#10b981', amount: 7400 }, // tỷ VNĐ/năm
    { name: 'Phí Giao dịch Carbon', value: 20, color: '#06b6d4', amount: 3700 },
    { name: 'Phí Đầu tư & Tài chính', value: 20, color: '#8b5cf6', amount: 3700 },
    { name: 'Phí SaaS & Data', value: 15, color: '#f59e0b', amount: 2775 },
    { name: 'Bán lẻ B2C', value: 5, color: '#ef4444', amount: 925 },
  ];

  const totalRevenue = revenueMix.reduce((sum, item) => sum + item.amount, 0);

  // Revenue Sources Detail
  const revenueSources = [
    {
      id: 'b2b',
      name: 'Phí Giao dịch trên Sàn (Transaction Fees)',
      percentage: 40,
      color: '#10b981',
      description: 'Nguồn thu lớn nhất và bền vững nhất - Thu phí hoa hồng trên mọi giao dịch thành công',
      streams: [
        {
          name: 'Phí Khớp lệnh B2B',
          description: 'Thu % trên tổng giá trị hợp đồng bao tiêu giữa Doanh nghiệp và HTX',
          rate: '1-2%',
          example: 'Hợp đồng 10 tỷ → Thu 100-200 triệu',
          amount: 5000, // tỷ VNĐ
        },
        {
          name: 'Phí Sàn Thương mại B2C',
          description: 'Thu % trên đơn hàng từ Xã viên Tiêu dùng và Khách lẻ',
          rate: '5-8%',
          example: 'Đơn hàng 1 triệu → Thu 50-80k',
          amount: 1500, // tỷ VNĐ
        },
        {
          name: 'Phí Giao dịch Tín chỉ Carbon',
          description: 'Thu phí môi giới/sàn giao dịch khi Chủ rừng bán Token Carbon',
          rate: '10%',
          example: 'Giao dịch 1 tỷ → Thu 100 triệu',
          amount: 900, // tỷ VNĐ
        },
      ],
    },
    {
      id: 'fintech',
      name: 'Phí Dịch vụ Tài chính & Đầu tư (Fintech Fees)',
      percentage: 20,
      color: '#8b5cf6',
      description: 'GreenLight đóng vai trò như "Ngân hàng số" thu nhỏ quản lý dòng tiền',
      streams: [
        {
          name: 'Phí Quản lý Vốn',
          description: 'Thu phí khởi tạo hồ sơ và quản lý dòng tiền từ Nhà đầu tư',
          rate: '1-2%',
          example: 'Huy động 100 tỷ → Thu 1-2 tỷ',
          amount: 2500, // tỷ VNĐ
        },
        {
          name: 'Phí Smart Contract (Escrow)',
          description: 'Thu phí xử lý thanh toán tự động (Split Payment Fee)',
          rate: '0.5-1%',
          example: 'Thanh toán 50 tỷ → Thu 250-500 triệu',
          amount: 1200, // tỷ VNĐ
        },
      ],
    },
    {
      id: 'saas',
      name: 'Phí Phần mềm & Công nghệ (SaaS Subscription)',
      percentage: 15,
      color: '#f59e0b',
      description: 'Thu phí định kỳ từ các đối tượng sử dụng công cụ cao cấp',
      streams: [
        {
          name: 'Gói Doanh nghiệp (Enterprise Plan)',
          description: 'Công cụ Bản đồ nhiệt, Đặt hàng tương lai, Truy xuất nguồn gốc 360°',
          rate: '5-20 triệu/tháng',
          example: '100 doanh nghiệp × 10 triệu/tháng = 12 tỷ/năm',
          amount: 1500, // tỷ VNĐ
        },
        {
          name: 'Gói Quản trị Tài sản (Landlord Pro)',
          description: 'Công cụ GIS chuyên sâu, báo cáo tuần tra rừng, tính toán Carbon',
          rate: '2-5 triệu/tháng',
          example: '200 chủ rừng lớn × 3 triệu/tháng = 7.2 tỷ/năm',
          amount: 800, // tỷ VNĐ
        },
        {
          name: 'Phí Lưu trữ & Số hóa',
          description: 'Phí duy trì dữ liệu Blockchain cho chứng thư số (COA, Nhật ký)',
          rate: 'Theo lưu lượng',
          example: '1 triệu chứng thư × 50k = 50 tỷ',
          amount: 475, // tỷ VNĐ
        },
      ],
    },
    {
      id: 'value-added',
      name: 'Dịch vụ Giá trị Gia tăng (Value-Added Services)',
      percentage: 10,
      color: '#ec4899',
      description: 'Khai thác hệ sinh thái đối tác',
      streams: [
        {
          name: 'Phí Chứng nhận "Greenlight Verified"',
          description: 'HTX trả phí thẩm định định kỳ để được gắn nhãn "Đạt chuẩn VITA"',
          rate: '10-50 triệu/năm',
          example: '500 HTX × 30 triệu/năm = 15 tỷ',
          amount: 1500, // tỷ VNĐ
        },
        {
          name: 'Hoa hồng Kiểm định (Lab Referral)',
          description: 'Thu phí giới thiệu/đặt lịch từ Phòng Lab',
          rate: '10-15%',
          example: '1000 mẫu/tháng × 2 triệu × 12% = 2.4 tỷ/năm',
          amount: 800, // tỷ VNĐ
        },
        {
          name: 'Quảng cáo & Nổi bật',
          description: 'HTX/Doanh nghiệp trả phí để hiện lên trang chủ "Hot Project"',
          rate: 'Theo gói',
          example: '50 dự án × 20 triệu/tháng = 12 tỷ/năm',
          amount: 1200, // tỷ VNĐ
        },
      ],
    },
    {
      id: 'data',
      name: 'Kinh doanh Dữ liệu (Data Monetization)',
      percentage: 5,
      color: '#6366f1',
      description: 'Khi hệ thống đủ lớn, Dữ liệu là tài sản vô giá',
      streams: [
        {
          name: 'Báo cáo Ngành hàng (Market Intelligence)',
          description: 'Bán báo cáo chuyên sâu cho Tập đoàn Dược, Chính phủ, Quỹ đầu tư',
          rate: '50-500 triệu/báo cáo',
          example: '20 báo cáo/năm × 200 triệu = 4 tỷ',
          amount: 400, // tỷ VNĐ
        },
        {
          name: 'Dữ liệu Tín dụng (Credit Scoring)',
          description: 'Cung cấp điểm tín nhiệm cho Ngân hàng để cấp tín dụng',
          rate: '10-50k/tra cứu',
          example: '100k tra cứu/năm × 30k = 3 tỷ',
          amount: 300, // tỷ VNĐ
        },
      ],
    },
  ];

  // Projected Growth Data
  const growthProjection = [
    { year: '2024', revenue: 18500, b2b: 7400, carbon: 3700, fintech: 3700, saas: 2775, b2c: 925 },
    { year: '2025', revenue: 35000, b2b: 14000, carbon: 7000, fintech: 7000, saas: 5250, b2c: 1750 },
    { year: '2026', revenue: 60000, b2b: 24000, carbon: 12000, fintech: 12000, saas: 9000, b2c: 3000 },
    { year: '2027', revenue: 100000, b2b: 40000, carbon: 20000, fintech: 20000, saas: 15000, b2c: 5000 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-money-dollar-circle-line mr-2 text-emerald-600"></i>
          Cơ cấu Doanh thu Đa dạng - Diversified Revenue Model
        </h2>
        <p className="text-gray-600">
          GreenLight kiếm tiền từ <strong>Dòng chảy giá trị</strong> (Tiền, Hàng, Dữ liệu) chạy qua hệ thống
        </p>
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-sm text-gray-700">
            <strong>Triết lý:</strong> GreenLight <strong>KHÔNG thu phí nông dân nghèo</strong>. 
            GreenLight làm giàu cho Nông dân và Chủ rừng, sau đó thu phí từ <strong>Người mua (Doanh nghiệp)</strong> và 
            <strong>Người đầu tư</strong> - những bên có tiền và sẵn sàng trả phí cho sự minh bạch và tiện lợi.
          </p>
        </div>
      </div>

      {/* Revenue Mix Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cơ cấu Doanh thu (Revenue Mix)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueMix}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueMix.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tổng Doanh thu Dự kiến</h3>
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Năm 2024 (Dự kiến)</p>
              <p className="text-4xl font-bold text-emerald-600">{totalRevenue.toLocaleString()} tỷ VNĐ</p>
              <p className="text-sm text-gray-500 mt-2">≈ ${(totalRevenue / 24000).toFixed(1)}M USD</p>
            </div>
            <div className="space-y-2">
              {revenueMix.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.amount.toLocaleString()} tỷ</p>
                    <p className="text-xs text-gray-500">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Sources Detail */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Chi tiết 5 Nguồn thu Chính</h3>
        {revenueSources.map((source) => (
          <div
            key={source.id}
            className={`bg-white p-6 rounded-xl border-2 ${
              selectedSource === source.id ? 'border-emerald-500 shadow-lg' : 'border-gray-200'
            } cursor-pointer transition-all hover:shadow-md`}
            onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${source.color}20` }}>
                    <i className="ri-money-dollar-circle-line text-2xl" style={{ color: source.color }}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="px-4 py-2 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600">Tỷ trọng</p>
                    <p className="text-lg font-bold" style={{ color: source.color }}>
                      {source.percentage}%
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600">Doanh thu 2024</p>
                    <p className="text-lg font-bold text-gray-900">
                      {source.streams.reduce((sum, s) => sum + s.amount, 0).toLocaleString()} tỷ
                    </p>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                {selectedSource === source.id ? (
                  <i className="ri-arrow-up-s-line text-xl"></i>
                ) : (
                  <i className="ri-arrow-down-s-line text-xl"></i>
                )}
              </button>
            </div>

            {selectedSource === source.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                {source.streams.map((stream, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1">{stream.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{stream.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Tỷ lệ: </span>
                            <span className="font-semibold text-gray-900">{stream.rate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Ví dụ: </span>
                            <span className="text-gray-700 italic">{stream.example}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-gray-900">{stream.amount.toLocaleString()} tỷ</p>
                        <p className="text-xs text-gray-500">VNĐ/năm</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Growth Projection Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Dự báo Tăng trưởng Doanh thu</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={growthProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)}k tỷ VNĐ`} />
            <Legend />
            <Bar dataKey="b2b" stackId="a" fill="#10b981" name="B2B & Bao tiêu" />
            <Bar dataKey="carbon" stackId="a" fill="#06b6d4" name="Carbon" />
            <Bar dataKey="fintech" stackId="a" fill="#8b5cf6" name="Đầu tư & Tài chính" />
            <Bar dataKey="saas" stackId="a" fill="#f59e0b" name="SaaS & Data" />
            <Bar dataKey="b2c" stackId="a" fill="#ef4444" name="Bán lẻ B2C" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Mix Table */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 overflow-x-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bảng Tổng hợp Cơ cấu Doanh thu</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nguồn thu</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Đối tượng trả tiền</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Tỷ trọng</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Doanh thu 2024</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tính chất</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {revenueMix.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {idx === 0 ? 'Doanh nghiệp' :
                   idx === 1 ? 'Doanh nghiệp mua Carbon' :
                   idx === 2 ? 'Nhà đầu tư (Xã viên góp vốn)' :
                   idx === 3 ? 'Doanh nghiệp / Chủ rừng lớn' :
                   'Xã viên tiêu dùng'}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                    {item.value}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {item.amount.toLocaleString()} tỷ VNĐ
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {idx === 0 ? 'Dòng tiền lớn, theo mùa vụ' :
                   idx === 1 ? 'Tiềm năng tăng trưởng cao' :
                   idx === 2 ? 'Dòng tiền ổn định' :
                   idx === 3 ? 'Doanh thu định kỳ (MRR)' :
                   'Nhỏ lẻ nhưng tạo thanh khoản'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-50">
              <td colSpan={2} className="px-4 py-3 font-bold text-gray-900">Tổng cộng</td>
              <td className="px-4 py-3 text-center font-bold text-gray-900">100%</td>
              <td className="px-4 py-3 text-right font-bold text-emerald-600">
                {totalRevenue.toLocaleString()} tỷ VNĐ
              </td>
              <td className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

