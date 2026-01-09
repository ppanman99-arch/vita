import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PortalSwitcher from '../../components/shared/PortalSwitcher';
import BackButton from '../../components/shared/BackButton';

export default function TimberTradingPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('timber_authenticated');
    const email = sessionStorage.getItem('timber_email');
    const name = sessionStorage.getItem('timber_company_name');
    
    if (!isAuthenticated || !email) {
      navigate('/timber-trading/login');
      return;
    }

    // Set company name from session or extract from email
    if (name) {
      setCompanyName(name);
    } else {
      // Extract company name from email (before @)
      const emailName = email.split('@')[0];
      setCompanyName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
    }
  }, [navigate]);
  
  const [activeTab, setActiveTab] = useState<'map' | 'orders' | 'create-order' | 'certificates' | 'calculator' | 'harvesting'>('map');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [showMatchingResults, setShowMatchingResults] = useState(false);
  const [matchingResults, setMatchingResults] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'matched' | 'contract'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state for creating new order
  const [orderForm, setOrderForm] = useState({
    buyerType: 'plywood', // plywood, furniture, construction
    treeType: 'Mega 3P',
    productType: 'sawlog', // sawlog, chips, roundwood
    targetDiameter: '', // D1.3 in cm
    targetHeight: '', // Hvn in m
    clearBoleHeight: '', // Hdc in m
    taper: '', // Độ thon
    harvestCycle: '', // years
    totalVolume: '', // m³
    totalArea: '', // ha
    certificateRequired: [] as string[],
    factoryLocation: { lat: 0, lng: 0 },
    maxRadius: 100, // km
    floorPrice: '', // VNĐ/m³
  });

  // Timber Stock Map Data
  const timberStocks = [
    { id: 'stock-001', location: 'Kon Tum', area: 50, age: 1, status: 'young', volume: 0, treeType: 'Mega 3P' },
    { id: 'stock-002', location: 'Phú Thọ', area: 30, age: 3, status: 'growing', volume: 0, treeType: 'Keo lai' },
    { id: 'stock-003', location: 'Hòa Bình', area: 100, age: 4, status: 'ready', volume: 7500, treeType: 'Mega 3P' },
    { id: 'stock-004', location: 'Yên Bái', area: 25, age: 5, status: 'harvesting', volume: 2000, treeType: 'Bạch đàn' },
    { id: 'stock-005', location: 'Lào Cai', area: 40, age: 2, status: 'young', volume: 0, treeType: 'Xoan đào' },
  ];

  // Future Orders
  const futureOrders = [
    {
      id: 'order-001',
      company: 'Công ty Gỗ ABC',
      treeType: 'Mega 3P',
      specification: 'Đường kính > 20cm',
      volume: 10000, // m³
      harvestYear: 2030,
      certificate: 'FSC Required',
      status: 'pending',
      matchedAreas: ['stock-003'],
    },
    {
      id: 'order-002',
      company: 'Nhà máy Ván ép XYZ',
      treeType: 'Keo lai',
      specification: 'Gỗ tròn, đường kính 15-25cm',
      volume: 5000,
      harvestYear: 2029,
      certificate: 'PEFC Required',
      status: 'matched',
      matchedAreas: ['stock-002'],
    },
    {
      id: 'order-003',
      company: 'Công ty Nội thất Export',
      treeType: 'Xoan đào',
      specification: 'Gỗ xẻ, FSC certified',
      volume: 3000,
      harvestYear: 2031,
      certificate: 'FSC Required',
      status: 'contract',
      matchedAreas: ['stock-005'],
    },
  ];

  // Certificate Management
  const certificates = [
    {
      id: 'cert-001',
      area: 'Hòa Bình - 100ha',
      treeType: 'Mega 3P',
      certificateType: 'FSC',
      status: 'certified',
      issueDate: '2024-01-15',
      expiryDate: '2029-01-15',
      chainOfCustody: true,
    },
    {
      id: 'cert-002',
      area: 'Phú Thọ - 30ha',
      treeType: 'Keo lai',
      certificateType: 'PEFC',
      status: 'pending',
      issueDate: null,
      expiryDate: null,
      chainOfCustody: false,
    },
  ];

  // Yield Calculator Data
  const yieldData = {
    area: 50, // ha
    treeType: 'Mega 3P',
    soilQuality: 'good',
    estimatedYield: 7500, // m³ after 5 years
    growthRate: 1500, // m³/year
  };

  // Growth Chart Data
  const growthData = [
    { year: 'Năm 1', diameter: 5, height: 3, volume: 0 },
    { year: 'Năm 2', diameter: 10, height: 6, volume: 500 },
    { year: 'Năm 3', diameter: 15, height: 9, volume: 2000 },
    { year: 'Năm 4', diameter: 18, height: 12, volume: 4500 },
    { year: 'Năm 5', diameter: 22, height: 15, volume: 7500 },
  ];

  const tabs = [
    { id: 'map', name: 'Bản đồ Trữ lượng', icon: 'ri-map-pin-line' },
    { id: 'orders', name: 'Đặt hàng Tương lai', icon: 'ri-file-list-3-line' },
    { id: 'certificates', name: 'Chứng chỉ Rừng', icon: 'ri-shield-check-line' },
    { id: 'calculator', name: 'Tính Hiệu suất', icon: 'ri-calculator-line' },
    { id: 'harvesting', name: 'Kế hoạch Khai thác', icon: 'ri-scissors-line' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'young':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'growing':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'ready':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'harvesting':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'young':
        return '1-2 năm tuổi (Chưa khai thác)';
      case 'growing':
        return '3-4 năm tuổi (Đang phát triển)';
      case 'ready':
        return '4-5 năm tuổi (Sẵn sàng khai thác)';
      case 'harvesting':
        return 'Đang khai thác';
      default:
        return status;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('timber_authenticated');
    sessionStorage.removeItem('timber_email');
    sessionStorage.removeItem('timber_company_name');
    navigate('/timber-trading/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <BackButton />
            <div className="flex items-center gap-2">
              <PortalSwitcher variant="light" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-md border border-red-700"
                title="Đăng xuất"
              >
                <i className="ri-logout-box-line text-lg"></i>
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="ri-tree-line text-amber-600 mr-2"></i>
                VITA Timber Trading Hub
              </h1>
              <p className="text-gray-600">
                Cổng Giao dịch Gỗ Nguyên liệu - "Lấy ngắn (Dược liệu) nuôi dài (Gỗ lớn)"
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Xin chào</p>
              <p className="text-lg font-bold text-amber-600">
                {companyName || 'Doanh nghiệp Gỗ'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'map' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Bản đồ Trữ lượng Gỗ tương lai (Timber Stock Map)
                </h2>
                <p className="text-gray-600">
                  Xem các vùng nguyên liệu và tuổi của rừng để lên kế hoạch sản xuất
                </p>
              </div>

              {/* Map Legend */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Chú giải:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                    <span className="text-sm text-gray-700">1-2 năm (Chưa khai thác)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-sm text-gray-700">3-4 năm (Đang phát triển)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                    <span className="text-sm text-gray-700">4-5 năm (Sẵn sàng)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-700">Đang khai thác</span>
                  </div>
                </div>
              </div>

              {/* Timber Stocks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timberStocks.map((stock) => (
                  <div
                    key={stock.id}
                    className={`p-6 rounded-xl border-2 ${getStatusColor(stock.status)}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{stock.location}</h3>
                        <p className="text-sm text-gray-600">{stock.treeType}</p>
                      </div>
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                        {stock.age} năm
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Diện tích</p>
                        <p className="text-lg font-bold">{stock.area} ha</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Trữ lượng</p>
                        <p className="text-lg font-bold">
                          {stock.volume > 0 ? `${stock.volume.toLocaleString()} m³` : 'Chưa có'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/50 p-2 rounded-lg text-xs text-center">
                      {getStatusText(stock.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Header with Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Tổng đơn hàng</span>
                    <i className="ri-file-list-3-line text-yellow-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{futureOrders.length}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Chờ khớp</span>
                    <i className="ri-time-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {futureOrders.filter(o => o.status === 'pending').length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Đã khớp</span>
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {futureOrders.filter(o => o.status === 'matched').length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Tổng sản lượng</span>
                    <i className="ri-stack-line text-emerald-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {futureOrders.reduce((sum, o) => sum + o.volume, 0).toLocaleString()} m³
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Đặt hàng Rừng trồng (Timber Futures)
                  </h2>
                  <p className="text-gray-600">
                    Tạo lệnh đặt hàng tương lai và khớp với vùng trồng phù hợp
                  </p>
                </div>
                <button 
                  onClick={() => setShowCreateOrderModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                >
                  <i className="ri-add-line mr-2"></i>
                  Tạo đơn hàng mới
                </button>
              </div>

              {/* Filters and Search */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm theo tên công ty, loại cây..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderFilter === 'all'
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setOrderFilter('pending')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderFilter === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      Chờ khớp
                    </button>
                    <button
                      onClick={() => setOrderFilter('matched')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderFilter === 'matched'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      Đã khớp
                    </button>
                    <button
                      onClick={() => setOrderFilter('contract')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        orderFilter === 'contract'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      Đã ký HĐ
                    </button>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {futureOrders
                  .filter(order => {
                    if (orderFilter !== 'all' && order.status !== orderFilter) return false;
                    if (searchQuery) {
                      const query = searchQuery.toLowerCase();
                      return order.company.toLowerCase().includes(query) ||
                             order.treeType.toLowerCase().includes(query) ||
                             order.specification.toLowerCase().includes(query);
                    }
                    return true;
                  })
                  .map((order) => (
                  <div
                    key={order.id}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      selectedOrder === order.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{order.company}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                            order.status === 'matched' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                            'bg-green-100 text-green-700 border border-green-300'
                          }`}>
                            {order.status === 'pending' ? 'Chờ khớp' :
                             order.status === 'matched' ? 'Đã khớp' :
                             'Đã ký hợp đồng'}
                          </span>
                          <span className="text-xs text-gray-500">
                            ID: {order.id}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-600 mb-1 flex items-center gap-1">
                              <i className="ri-leaf-line"></i>
                              Loại cây
                            </p>
                            <p className="font-semibold text-gray-900">{order.treeType}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-600 mb-1 flex items-center gap-1">
                              <i className="ri-stack-line"></i>
                              Sản lượng
                            </p>
                            <p className="font-semibold text-gray-900">{order.volume.toLocaleString()} m³</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-600 mb-1 flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              Năm khai thác
                            </p>
                            <p className="font-semibold text-gray-900">{order.harvestYear}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-gray-600 mb-1 flex items-center gap-1">
                              <i className="ri-shield-check-line"></i>
                              Chứng chỉ
                            </p>
                            <p className="font-semibold text-emerald-600">{order.certificate}</p>
                          </div>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <i className="ri-file-list-3-line text-amber-600"></i>
                            <strong>Quy cách:</strong> {order.specification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-map-pin-line"></i>
                          {order.matchedAreas.length} vùng khớp
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          Tạo: {new Date().toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order.id);
                            setShowOrderDetailModal(true);
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                        >
                          <i className="ri-eye-line mr-1"></i>
                          Chi tiết
                        </button>
                        {order.status === 'matched' && (
                          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium">
                            <i className="ri-file-contract-line mr-1"></i>
                            Ký hợp đồng
                          </button>
                        )}
                      </div>
                    </div>

                    {selectedOrder === order.id && !showOrderDetailModal && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <i className="ri-map-pin-2-line text-amber-600"></i>
                          Vùng trồng đã khớp:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {order.matchedAreas.map((areaId) => {
                            const area = timberStocks.find(s => s.id === areaId);
                            return area ? (
                              <div key={areaId} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-gray-900">{area.location}</p>
                                    <p className="text-sm text-gray-600">{area.treeType} • {area.age} năm tuổi</p>
                                  </div>
                                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                    {area.area} ha
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                                  <span>Trữ lượng: {area.volume > 0 ? `${area.volume.toLocaleString()} m³` : 'Đang tính'}</span>
                                  <span>Trạng thái: {getStatusText(area.status)}</span>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </div>
                        <div className="mt-4 flex gap-3">
                          <button 
                            onClick={() => setShowOrderDetailModal(true)}
                            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-medium"
                          >
                            <i className="ri-file-list-2-line mr-2"></i>
                            Xem báo cáo đầy đủ
                          </button>
                          {order.status === 'matched' && (
                            <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium">
                              <i className="ri-file-contract-line mr-2"></i>
                              Ký hợp đồng
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {futureOrders.filter(order => {
                if (orderFilter !== 'all' && order.status !== orderFilter) return false;
                if (searchQuery) {
                  const query = searchQuery.toLowerCase();
                  return order.company.toLowerCase().includes(query) ||
                         order.treeType.toLowerCase().includes(query) ||
                         order.specification.toLowerCase().includes(query);
                }
                return true;
              }).length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <i className="ri-file-search-line text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600 font-medium">Không tìm thấy đơn hàng nào</p>
                  <p className="text-sm text-gray-500 mt-2">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Quản lý Chứng chỉ Rừng (FSC/PEFC Management)
                </h2>
                <p className="text-gray-600">
                  "Thẻ xanh" để gỗ xuất khẩu được - Hồ sơ chuỗi hành trình sản phẩm (CoC)
                </p>
              </div>

              {/* Certificates List */}
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-6 rounded-xl border-2 border-gray-200 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.area}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Loại cây</p>
                            <p className="font-semibold">{cert.treeType}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Chứng chỉ</p>
                            <p className="font-semibold text-emerald-600">{cert.certificateType}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Trạng thái</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              cert.status === 'certified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {cert.status === 'certified' ? 'Đã cấp' : 'Đang xử lý'}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Chuỗi hành trình</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              cert.chainOfCustody ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {cert.chainOfCustody ? 'Có CoC' : 'Chưa có'}
                            </span>
                          </div>
                        </div>
                        {cert.issueDate && (
                          <div className="mt-3 text-sm text-gray-600">
                            <p>Cấp ngày: {new Date(cert.issueDate).toLocaleDateString('vi-VN')}</p>
                            <p>Hết hạn: {new Date(cert.expiryDate!).toLocaleDateString('vi-VN')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chain of Custody Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Hồ sơ Chuỗi hành trình:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          <span>Nguồn gốc giống: Đã xác minh</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          <span>Nhật ký không phá rừng tự nhiên: Đã ghi nhận</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          <span>Nhật ký không dùng thuốc diệt cỏ cấm: Đã ghi nhận</span>
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm">
                        <i className="ri-qr-code-line mr-2"></i>
                        Xuất mã QR Gỗ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Công cụ Tính toán Hiệu suất (Yield Calculator)
                </h2>
                <p className="text-gray-600">
                  Dự báo sản lượng gỗ dựa trên loại cây và điều kiện thổ nhưỡng
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Thông số Đầu vào</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diện tích: <span className="text-amber-600 font-bold">{yieldData.area} ha</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="10"
                        defaultValue={yieldData.area}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại cây
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Mega 3P</option>
                        <option>Keo lai</option>
                        <option>Bạch đàn</option>
                        <option>Xoan đào</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chất lượng đất
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Tốt</option>
                        <option>Trung bình</option>
                        <option>Kém</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Kết quả Dự báo</h3>
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Sản lượng dự kiến (sau 5 năm)</p>
                      <p className="text-3xl font-bold text-amber-600">
                        {yieldData.estimatedYield.toLocaleString()} m³
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tốc độ tăng trưởng</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {yieldData.growthRate.toLocaleString()} m³/năm
                      </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Giá trị ước tính</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {(yieldData.estimatedYield * 2.5).toLocaleString()} triệu VNĐ
                      </p>
                      <p className="text-xs text-gray-500 mt-1">(Giả định giá 2.5 triệu/m³)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Chart */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lộ trình Tăng trưởng</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Trữ lượng (m³)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="diameter" stroke="#10b981" strokeWidth={2} name="Đường kính (cm)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'harvesting' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Kế hoạch Khai thác (Logging Plan)
                </h2>
                <p className="text-gray-600">
                  Lập lịch khai thác để không làm hỏng vườn dược liệu bên dưới
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-information-line text-emerald-600"></i>
                  Quy trình Khai thác An toàn
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-600 mt-1"></i>
                    <span><strong>Tỉa thưa:</strong> Chỉ khai thác một phần cây, giữ lại cây che bóng cho dược liệu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-600 mt-1"></i>
                    <span><strong>Khai thác cuốn chiếu:</strong> Khai thác theo từng băng, không chặt trắng</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-line text-emerald-600 mt-1"></i>
                    <span><strong>Tránh sốc nhiệt:</strong> Giữ độ che phủ tối thiểu 40% để bảo vệ cây dược liệu</span>
                  </div>
                </div>
              </div>

              {/* Harvesting Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Kế hoạch Khai thác Q1 2024</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-1">Hòa Bình - Lô A (25ha)</p>
                      <p className="text-sm text-gray-600 mb-2">Mega 3P • 5 năm tuổi</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Sản lượng dự kiến:</span>
                        <span className="font-bold text-emerald-600">1,875 m³</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">Phương pháp:</span>
                        <span className="font-semibold">Tỉa thưa 30%</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all">
                      Xem chi tiết kế hoạch
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Giám sát Sinh trưởng</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-2">Báo cáo Đường kính (D1.3)</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Trung bình hiện tại</p>
                          <p className="text-lg font-bold text-emerald-600">22 cm</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Mục tiêu khai thác</p>
                          <p className="text-lg font-bold text-amber-600">{'>'} 20 cm</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        <i className="ri-checkbox-circle-line text-green-600 mr-1"></i>
                        Đã đạt tiêu chuẩn khai thác
                      </p>
                    </div>
                    <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                      Xem báo cáo đầy đủ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

