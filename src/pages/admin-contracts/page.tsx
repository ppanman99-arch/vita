
import { useState } from 'react';
import TopBar from '../admin-dashboard/components/TopBar';

interface Contract {
  id: string;
  requestId: string;
  companyName: string;
  companyLogo: string;
  herb: string;
  quantity: number;
  unit: string;
  lotId: string;
  area: number;
  gps: string;
  status: 'seedling' | 'growing' | 'mature' | 'harvesting' | 'completed';
  progress: number;
  startDate: string;
  expectedHarvest: string;
  pricing: {
    price: string;
    deposit: string;
    paid: number;
    total: number;
  };
  standards: string[];
  lastUpdate: string;
}

export default function AdminContractsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'seedling' | 'growing' | 'mature' | 'harvesting' | 'completed'>('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data
  const contracts: Contract[] = [
    {
      id: 'HD-001',
      requestId: 'REQ-2024-001',
      companyName: 'Công ty Dược phẩm Tâm Bình',
      companyLogo: 'https://readdy.ai/api/search-image?query=modern%20pharmaceutical%20company%20logo%20with%20green%20leaf%20symbol%20clean%20professional%20design%20white%20background%20minimalist%20style&width=80&height=80&seq=pharma001&orientation=squarish',
      herb: 'Sâm Ngọc Linh',
      quantity: 5000,
      unit: 'kg',
      lotId: 'LOT-05',
      area: 20,
      gps: '15.2847°N, 107.8341°E',
      status: 'seedling',
      progress: 15,
      startDate: '2024-01-20',
      expectedHarvest: '2026-10-15',
      pricing: {
        price: '850,000 đ/kg',
        deposit: '30%',
        paid: 127500000,
        total: 425000000
      },
      standards: ['GACP-WHO', 'Organic'],
      lastUpdate: '2024-01-25'
    },
    {
      id: 'HD-002',
      requestId: 'REQ-2023-045',
      companyName: 'Tập đoàn Dược Hậu Giang',
      companyLogo: 'https://readdy.ai/api/search-image?query=pharmaceutical%20corporation%20logo%20with%20blue%20cross%20medical%20symbol%20professional%20corporate%20design%20white%20background%20modern%20style&width=80&height=80&seq=pharma002&orientation=squarish',
      herb: 'Đương Quy',
      quantity: 3000,
      unit: 'kg',
      lotId: 'LOT-08',
      area: 15,
      gps: '15.3124°N, 107.9012°E',
      status: 'growing',
      progress: 45,
      startDate: '2023-08-10',
      expectedHarvest: '2025-08-10',
      pricing: {
        price: '720,000 đ/kg',
        deposit: '25%',
        paid: 54000000,
        total: 216000000
      },
      standards: ['GACP-WHO', 'VietGAP'],
      lastUpdate: '2024-01-24'
    },
    {
      id: 'HD-003',
      requestId: 'REQ-2023-032',
      companyName: 'Công ty TNHH Dược Việt',
      companyLogo: 'https://readdy.ai/api/search-image?query=vietnamese%20pharmaceutical%20company%20logo%20with%20traditional%20medicine%20symbol%20green%20and%20gold%20colors%20professional%20design%20white%20background&width=80&height=80&seq=pharma003&orientation=squarish',
      herb: 'Cà Gai Leo',
      quantity: 2000,
      unit: 'kg',
      lotId: 'LOT-12',
      area: 10,
      gps: '15.1892°N, 107.7654°E',
      status: 'mature',
      progress: 85,
      startDate: '2023-03-15',
      expectedHarvest: '2024-03-15',
      pricing: {
        price: '520,000 đ/kg',
        deposit: '20%',
        paid: 20800000,
        total: 104000000
      },
      standards: ['VietGAP'],
      lastUpdate: '2024-01-23'
    }
  ];

  const filteredContracts = contracts.filter(contract => {
    if (selectedTab === 'all') return true;
    return contract.status === selectedTab;
  });

  const stats = {
    total: contracts.length,
    seedling: contracts.filter(c => c.status === 'seedling').length,
    growing: contracts.filter(c => c.status === 'growing').length,
    mature: contracts.filter(c => c.status === 'mature').length,
    harvesting: contracts.filter(c => c.status === 'harvesting').length,
    completed: contracts.filter(c => c.status === 'completed').length
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      seedling: { text: 'Cây con', color: 'bg-blue-100 text-blue-700', icon: 'ri-seedling-line' },
      growing: { text: 'Đang sinh trưởng', color: 'bg-green-100 text-green-700', icon: 'ri-plant-line' },
      mature: { text: 'Trưởng thành', color: 'bg-purple-100 text-purple-700', icon: 'ri-leaf-line' },
      harvesting: { text: 'Đang thu hoạch', color: 'bg-orange-100 text-orange-700', icon: 'ri-scissors-cut-line' },
      completed: { text: 'Hoàn thành', color: 'bg-gray-100 text-gray-700', icon: 'ri-checkbox-circle-line' }
    };
    return badges[status as keyof typeof badges];
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-blue-500';
    if (progress < 60) return 'bg-green-500';
    if (progress < 90) return 'bg-purple-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Hợp đồng Bao tiêu" />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hợp đồng Bao tiêu</h1>
            <p className="text-sm text-gray-600 mt-1">Quản lý tiến độ sinh trưởng và giao hàng</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <i className="ri-file-list-3-line text-green-600 text-xl"></i>
            <span className="text-sm font-semibold text-gray-700">{stats.total} hợp đồng</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-xs text-gray-600 mt-1">Tổng số</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.seedling}</div>
            <div className="text-xs text-blue-700 mt-1">Cây con</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.growing}</div>
            <div className="text-xs text-green-700 mt-1">Sinh trưởng</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.mature}</div>
            <div className="text-xs text-purple-700 mt-1">Trưởng thành</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{stats.harvesting}</div>
            <div className="text-xs text-orange-700 mt-1">Thu hoạch</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
            <div className="text-xs text-gray-700 mt-1">Hoàn thành</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'Tất cả', count: stats.total },
            { key: 'seedling', label: 'Cây con', count: stats.seedling },
            { key: 'growing', label: 'Sinh trưởng', count: stats.growing },
            { key: 'mature', label: 'Trưởng thành', count: stats.mature },
            { key: 'harvesting', label: 'Thu hoạch', count: stats.harvesting },
            { key: 'completed', label: 'Hoàn thành', count: stats.completed }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedTab === tab.key
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img src={contract.companyLogo} alt={contract.companyName} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{contract.companyName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(contract.status).color}`}>
                          <i className={getStatusBadge(contract.status).icon}></i>
                          {getStatusBadge(contract.status).text}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-file-list-3-line"></i>
                          {contract.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-map-pin-line"></i>
                          {contract.lotId}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          Cập nhật: {new Date(contract.lastUpdate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Tiến độ sinh trưởng</span>
                    <span className="text-sm font-bold text-gray-800">{contract.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(contract.progress)} transition-all duration-500 rounded-full`}
                      style={{ width: `${contract.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left: Product Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <i className="ri-plant-line text-green-600"></i>
                      <span className="font-semibold">{contract.herb}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-scales-3-line text-blue-600 w-4 h-4 flex items-center justify-center"></i>
                      <span>{contract.quantity.toLocaleString()} {contract.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-landscape-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                      <span>{contract.area} ha</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-shield-check-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                      <div className="flex flex-wrap gap-1">
                        {contract.standards.map(std => (
                          <span key={std} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Timeline */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-calendar-check-line text-blue-600 w-4 h-4 flex items-center justify-center"></i>
                      <span>Bắt đầu: {new Date(contract.startDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-calendar-event-line text-orange-600 w-4 h-4 flex items-center justify-center"></i>
                      <span>Thu hoạch: {new Date(contract.expectedHarvest).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <i className="ri-map-pin-2-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-xs">{contract.gps}</span>
                    </div>
                  </div>

                  {/* Right: Pricing */}
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá bao tiêu:</span>
                        <span className="font-semibold text-gray-800">{contract.pricing.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tạm ứng:</span>
                        <span className="font-semibold text-gray-800">{contract.pricing.deposit}</span>
                      </div>
                      <div className="pt-2 border-t border-yellow-200">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Đã thanh toán:</span>
                          <span className="font-semibold text-green-600">{contract.pricing.paid.toLocaleString()} đ</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tổng giá trị:</span>
                          <span className="font-bold text-gray-800">{contract.pricing.total.toLocaleString()} đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedContract(contract);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <i className="ri-eye-line"></i>
                    Xem chi tiết
                  </button>
                  <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <i className="ri-camera-line"></i>
                    Xem Camera
                  </button>
                  <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <i className="ri-book-open-line"></i>
                    Xem Nhật ký
                  </button>
                  <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <i className="ri-file-text-line"></i>
                    Xem Hợp đồng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">Chưa có hợp đồng nào trong danh mục này</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết hợp đồng {selectedContract.id}</h2>
              <button onClick={() => setShowDetailModal(false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all">
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Company & Status */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <img src={selectedContract.companyLogo} alt={selectedContract.companyName} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{selectedContract.companyName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{selectedContract.requestId}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(selectedContract.status).color}`}>
                      <i className={getStatusBadge(selectedContract.status).icon}></i>
                      {getStatusBadge(selectedContract.status).text}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">{selectedContract.progress}%</div>
                  <div className="text-xs text-gray-600">Tiến độ</div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="ri-time-line text-blue-600"></i>
                  Tiến độ sinh trưởng
                </h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-4">
                    {[
                      { stage: 'Cây con', progress: 15, date: '2024-01-20', status: 'completed' },
                      { stage: 'Sinh trưởng', progress: 45, date: '2024-06-15', status: 'current' },
                      { stage: 'Trưởng thành', progress: 85, date: '2025-12-15', status: 'pending' },
                      { stage: 'Thu hoạch', progress: 100, date: '2026-10-15', status: 'pending' }
                    ].map((item, idx) => (
                      <div key={idx} className="relative pl-12">
                        <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'current' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          <i className={`${
                            item.status === 'completed' ? 'ri-check-line' :
                            item.status === 'current' ? 'ri-loader-4-line animate-spin' :
                            'ri-time-line'
                          } text-white`}></i>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-800">{item.stage}</span>
                            <span className="text-sm text-gray-600">{item.date}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-full rounded-full ${
                                item.status === 'completed' ? 'bg-green-500' :
                                item.status === 'current' ? 'bg-blue-500' :
                                'bg-gray-300'
                              }`}
                              style={{ width: `${item.status === 'completed' ? 100 : item.status === 'current' ? selectedContract.progress : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contract Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-file-list-3-line text-green-600"></i>
                    Thông tin sản phẩm
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dược liệu:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.herb}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sản lượng:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.quantity.toLocaleString()} {selectedContract.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lô đất:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.lotId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diện tích:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.area} ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tiêu chuẩn:</span>
                      <div className="flex gap-1">
                        {selectedContract.standards.map(std => (
                          <span key={std} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPS:</span>
                      <span className="font-semibold text-gray-800 text-xs">{selectedContract.gps}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-money-dollar-circle-line text-yellow-600"></i>
                    Thông tin thanh toán
                  </h4>
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giá bao tiêu:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.pricing.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm ứng:</span>
                      <span className="font-semibold text-gray-800">{selectedContract.pricing.deposit}</span>
                    </div>
                    <div className="pt-2 border-t border-yellow-200">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Đã thanh toán:</span>
                        <span className="font-semibold text-green-600">{selectedContract.pricing.paid.toLocaleString()} đ</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tổng giá trị:</span>
                        <span className="font-bold text-gray-800">{selectedContract.pricing.total.toLocaleString()} đ</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(selectedContract.pricing.paid / selectedContract.pricing.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
