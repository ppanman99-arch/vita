import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GovTopBar from './components/GovTopBar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';

type TabType = 'dashboard' | 'new-rural' | 'planning-land' | 'communication' | 'reports';

interface EconomicData {
  totalRevenue: number; // Tỷ VNĐ
  avgIncomePerCapita: number; // triệu/tháng
  incomeGrowth: number; // %
  householdsOutOfPoverty: number;
}

interface ResourceData {
  forestCoverage: number; // %
  totalForestArea: number; // ha
  alerts: {
    type: 'danger' | 'warning' | 'info';
    location: string;
    message: string;
  }[];
}

interface SocialData {
  employedLabor: number;
  totalHouseholds: number;
  participatingHouseholds: number;
  ethnicMinorityParticipation: number; // %
}

export default function GovPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [communeName, setCommuneName] = useState('Xã Tu Mơ Rông');
  const [representativeName, setRepresentativeName] = useState('Nguyễn Văn A');

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('gov_authenticated');
    const commune = sessionStorage.getItem('gov_commune');
    const email = sessionStorage.getItem('gov_email');
    
    if (!isAuthenticated) {
      navigate('/gov-portal/login');
      return;
    }

    if (commune) setCommuneName(commune);
    if (email) setRepresentativeName(email.split('@')[0] || 'Cán bộ');
  }, [navigate]);

  // Mock Data
  const economicData: EconomicData = {
    totalRevenue: 15, // Tỷ VNĐ
    avgIncomePerCapita: 8.5, // triệu/tháng
    incomeGrowth: 15, // %
    householdsOutOfPoverty: 12,
  };

  const resourceData: ResourceData = {
    forestCoverage: 65,
    totalForestArea: 1500,
    alerts: [
      {
        type: 'danger',
        location: 'Thôn 3',
        message: 'Có biến động mất rừng (Cảnh báo từ App Chủ rừng/Vệ tinh)'
      },
      {
        type: 'warning',
        location: 'Thôn 1',
        message: 'Mật độ trồng chưa đạt chỉ tiêu'
      }
    ]
  };

  const socialData: SocialData = {
    employedLabor: 450,
    totalHouseholds: 500,
    participatingHouseholds: 300,
    ethnicMinorityParticipation: 80,
  };

  // Chart Data
  const revenueTrendData = [
    { month: 'Th 7', revenue: 12, target: 14 },
    { month: 'Th 8', revenue: 13, target: 14 },
    { month: 'Th 9', revenue: 14, target: 14 },
    { month: 'Th 10', revenue: 14.5, target: 15 },
    { month: 'Th 11', revenue: 15, target: 15 },
  ];

  const incomeDistributionData = [
    { range: 'Dưới 5tr', households: 120 },
    { range: '5-10tr', households: 200 },
    { range: '10-15tr', households: 150 },
    { range: '15-20tr', households: 80 },
    { range: 'Trên 20tr', households: 50 },
  ];

  const forestCoverageData = [
    { name: 'Rừng tự nhiên', value: 45, color: '#10b981' },
    { name: 'Rừng trồng', value: 20, color: '#3b82f6' },
    { name: 'Đất trống', value: 35, color: '#ef4444' },
  ];

  const newRuralCriteria = [
    { id: 13, name: 'Tổ chức sản xuất', status: 'achieved', score: 95, note: 'HTX hoạt động hiệu quả, có liên kết bao tiêu B2B' },
    { id: 10, name: 'Thu nhập', status: 'achieved', score: 88, note: 'Thu nhập bình quân đầu người tăng 15%' },
    { id: 14, name: 'Giảm nghèo', status: 'in-progress', score: 75, note: '12 hộ thoát nghèo, còn 25 hộ cần hỗ trợ' },
    { id: 18, name: 'Môi trường', status: 'achieved', score: 82, note: 'Tỷ lệ che phủ rừng đạt 65%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <GovTopBar communeName={communeName} representativeName={representativeName} />

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-dashboard-line mr-2"></i>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('new-rural')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'new-rural'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-star-line mr-2"></i>
              Nông Thôn Mới
            </button>
            <button
              onClick={() => setActiveTab('planning-land')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'planning-land'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-map-line mr-2"></i>
              Quy hoạch & Đất đai
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'communication'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-megaphone-line mr-2"></i>
              Tuyên truyền Số
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'reports'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-file-chart-line mr-2"></i>
              Báo cáo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bảng Điều Khiển Xã</h2>
              <p className="text-gray-600 mt-1">Tổng quan tình hình phát triển kinh tế - xã hội</p>
            </div>

            {/* Widget 1: Sức Khỏe Kinh Tế Xã (Local GDP Pulse) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-line-chart-line text-blue-600"></i>
                  Sức Khỏe Kinh Tế Xã
                </h3>
                <span className="text-sm text-gray-500">Cập nhật: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Tổng doanh thu (Tháng này)</p>
                  <p className="text-2xl font-bold text-blue-600">{economicData.totalRevenue} Tỷ VNĐ</p>
                  <p className="text-xs text-gray-500 mt-1">Dược & Gỗ</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Thu nhập BQ/người</p>
                  <p className="text-2xl font-bold text-green-600">{economicData.avgIncomePerCapita} triệu/tháng</p>
                  <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                    <i className="ri-arrow-up-line"></i>
                    Tăng {economicData.incomeGrowth}% so với cùng kỳ
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Hộ thoát nghèo</p>
                  <p className="text-2xl font-bold text-purple-600">{economicData.householdsOutOfPoverty} hộ</p>
                  <p className="text-xs text-gray-500 mt-1">Năm 2024</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-sm text-gray-600 mb-1">Lao động có việc</p>
                  <p className="text-2xl font-bold text-amber-600">{socialData.employedLabor}</p>
                  <p className="text-xs text-gray-500 mt-1">Người</p>
                </div>
              </div>

              {/* Revenue Trend Chart */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng Doanh thu 5 tháng gần đây</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `${value} Tỷ VNĐ`} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Thực tế" />
                    <Area type="monotone" dataKey="target" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.4} name="Mục tiêu" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 2: Giám Sát Tài Nguyên & Rừng */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-leaf-line text-green-600"></i>
                  Giám Sát Tài Nguyên & Rừng
                </h3>
                <span className="text-sm text-gray-500">Real-time</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4" style={{ height: '300px' }}>
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <i className="ri-map-2-line text-4xl mb-2"></i>
                        <p>Bản đồ Số của Xã</p>
                        <p className="text-xs mt-1">Hiển thị ranh giới hành chính và vùng trồng</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Tỷ lệ che phủ rừng</p>
                    <p className="text-3xl font-bold text-green-600">{resourceData.forestCoverage}%</p>
                    <p className="text-xs text-gray-500 mt-1">{resourceData.totalForestArea} ha</p>
                  </div>

                  {/* Alerts */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Cảnh báo nóng</p>
                    <div className="space-y-2">
                      {resourceData.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            alert.type === 'danger'
                              ? 'bg-red-50 border-red-200'
                              : alert.type === 'warning'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <i
                              className={`mt-0.5 ${
                                alert.type === 'danger'
                                  ? 'ri-error-warning-line text-red-600'
                                  : alert.type === 'warning'
                                  ? 'ri-alert-line text-yellow-600'
                                  : 'ri-information-line text-blue-600'
                              }`}
                            ></i>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{alert.location}</p>
                              <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Forest Coverage Pie Chart */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Cơ cấu Đất đai</p>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={forestCoverageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {forestCoverageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 3: An Sinh & Xã Hội */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <i className="ri-community-line text-purple-600"></i>
                An Sinh & Xã Hội
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm text-gray-600 mb-1">Lao động có việc</p>
                      <p className="text-2xl font-bold text-purple-600">{socialData.employedLabor}</p>
                      <p className="text-xs text-gray-500 mt-1">Người</p>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                      <p className="text-sm text-gray-600 mb-1">Hộ tham gia chuỗi</p>
                      <p className="text-2xl font-bold text-indigo-600">{socialData.participatingHouseholds}</p>
                      <p className="text-xs text-gray-500 mt-1">/{socialData.totalHouseholds} hộ</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-gray-600 mb-2">Tỷ lệ tham gia DTTS</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full"
                          style={{ width: `${socialData.ethnicMinorityParticipation}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{socialData.ethnicMinorityParticipation}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">80% hộ dân tộc thiểu số trong xã đã tham gia mô hình sinh kế</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Phân bố Thu nhập Hộ gia đình</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={incomeDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="households" fill="#8b5cf6" name="Số hộ" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Rural Criteria Tab */}
        {activeTab === 'new-rural' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tiêu Chí Nông Thôn Mới</h2>
              <p className="text-gray-600 mt-1">Tự động mapping dữ liệu VITA vào Bộ tiêu chí Quốc gia</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {newRuralCriteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className={`p-4 rounded-lg border-2 ${
                      criterion.status === 'achieved'
                        ? 'bg-green-50 border-green-300'
                        : criterion.status === 'in-progress'
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Tiêu chí {criterion.id}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          criterion.status === 'achieved'
                            ? 'bg-green-600 text-white'
                            : criterion.status === 'in-progress'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {criterion.status === 'achieved' ? 'ĐẠT' : 'ĐANG THỰC HIỆN'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{criterion.name}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            criterion.status === 'achieved' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${criterion.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{criterion.score}%</span>
                    </div>
                    <p className="text-xs text-gray-600">{criterion.note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  <strong>Gợi ý:</strong> Sản phẩm Sâm Ngọc Linh của HTX Tu Mơ Rông đủ điều kiện làm hồ sơ OCOP 5 sao.
                </p>
              </div>

              <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                <i className="ri-file-download-line mr-2"></i>
                Xuất báo cáo thi đua (Word)
              </button>
            </div>
          </div>
        )}

        {/* Planning & Land Tab */}
        {activeTab === 'planning-land' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý Quy hoạch & Đất đai</h2>
              <p className="text-gray-600 mt-1">Chồng lớp bản đồ và xác nhận nguồn gốc đất</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lớp Bản đồ</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                    <i className="ri-check-line mr-2"></i>
                    Quy hoạch sử dụng đất
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                    <i className="ri-plant-line mr-2"></i>
                    Vùng trồng HTX
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                    <i className="ri-shield-line mr-2"></i>
                    Đất Quốc phòng
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                    <i className="ri-road-map-line mr-2"></i>
                    Quy hoạch Đường
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-4" style={{ height: '500px' }}>
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <i className="ri-map-2-line text-4xl mb-2"></i>
                    <p>Bản đồ Chồng lớp</p>
                    <p className="text-xs mt-1">Hiển thị các lớp quy hoạch đè lên vùng trồng</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <i className="ri-alert-line mr-2"></i>
                  <strong>Lưu ý:</strong> Nếu HTX lỡ trồng Sâm lấn sang đất Quốc phòng hoặc đất Quy hoạch đường, hệ thống sẽ cảnh báo đỏ ngay.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Yêu cầu Xác nhận Nguồn gốc Đất</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">HTX Tu Mơ Rông</p>
                        <p className="text-sm text-gray-600">Đăng ký đất mới: 5.2 ha tại Thôn 1</p>
                        <p className="text-xs text-gray-500 mt-1">Ngày: {new Date().toLocaleDateString('vi-VN')}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Kênh Tuyên truyền Số</h2>
              <p className="text-gray-600 mt-1">Gửi thông báo xuống App của từng người dân</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gửi Thông báo Mới</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Dự báo ngày mai có bão"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea
                      rows={6}
                      placeholder="Ví dụ: Đề nghị bà con HTX che chắn vườn ươm, cố định lưới che..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Đối tượng nhận</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Tất cả Xã viên</option>
                      <option>Chủ Rừng</option>
                      <option>Nông Dân</option>
                      <option>HTX Tu Mơ Rông</option>
                      <option>HTX Dược Liệu Hà Giang</option>
                    </select>
                  </div>

                  <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                    <i className="ri-send-plane-line mr-2"></i>
                    Gửi thông báo
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử Thông báo</h3>
                <div className="space-y-3">
                  {[
                    { id: 1, title: 'Triệu tập họp: Tiêm chủng mở rộng', date: '15/11/2024', sent: 450 },
                    { id: 2, title: 'Dự báo bão: Che chắn vườn ươm', date: '12/11/2024', sent: 300 },
                    { id: 3, title: 'Thông báo: Hỗ trợ giống mới', date: '10/11/2024', sent: 500 },
                  ].map((notice) => (
                    <div key={notice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{notice.title}</p>
                          <p className="text-sm text-gray-600 mt-1">Gửi: {notice.date} • Đã nhận: {notice.sent} người</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Báo cáo</h2>
              <p className="text-gray-600 mt-1">Xuất báo cáo chuẩn form mẫu nhà nước</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, title: 'Báo cáo Kinh tế - Xã hội', type: 'monthly', icon: 'ri-file-chart-line' },
                { id: 2, title: 'Báo cáo Tiêu chí Nông Thôn Mới', type: 'quarterly', icon: 'ri-star-line' },
                { id: 3, title: 'Báo cáo Tài nguyên & Môi trường', type: 'monthly', icon: 'ri-leaf-line' },
                { id: 4, title: 'Báo cáo An sinh Xã hội', type: 'quarterly', icon: 'ri-community-line' },
              ].map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`${report.icon} text-blue-600 text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{report.title}</h3>
                        <p className="text-xs text-gray-500">{report.type === 'monthly' ? 'Hàng tháng' : 'Hàng quý'}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <i className="ri-download-line mr-2"></i>
                    Tải báo cáo (Word)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




