import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminProductionPage() {
  const [activeTab, setActiveTab] = useState<'planning' | 'sop' | 'compliance' | 'allocation'>('allocation');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  // Mock data - Đơn hàng từ doanh nghiệp
  const orders = [
    {
      id: 1,
      enterprise: 'Công ty Dược Phẩm Việt Nam',
      product: 'Quýt Vân Sơn',
      quantity: 10000,
      unit: 'kg',
      deadline: '15/12/2024',
      price: 45000,
      status: 'pending',
      requiredQuality: 'Loại A - Hữu cơ',
      notes: 'Yêu cầu chứng nhận VietGAP'
    },
    {
      id: 2,
      enterprise: 'Tập đoàn Dược liệu Trung Ương',
      product: 'Tam Thất',
      quantity: 5000,
      unit: 'kg',
      deadline: '20/01/2025',
      price: 120000,
      status: 'in-progress',
      requiredQuality: 'Loại A+',
      notes: 'Độ ẩm < 12%'
    }
  ];

  // Mock data - Danh sách nông dân phù hợp
  const suitableFarmers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      area: 2.5,
      availableArea: 1.2,
      vitaScore: 92,
      soilType: 'Phù sa',
      experience: 5,
      lastYield: 850,
      compliance: 98,
      distance: 2.3,
      recommended: true
    },
    {
      id: 2,
      name: 'Phạm Thị D',
      area: 4.1,
      availableArea: 2.0,
      vitaScore: 95,
      soilType: 'Phù sa',
      experience: 7,
      lastYield: 920,
      compliance: 100,
      distance: 1.8,
      recommended: true
    },
    {
      id: 3,
      name: 'Trần Thị B',
      area: 3.2,
      availableArea: 1.4,
      vitaScore: 88,
      soilType: 'Đất mùn',
      experience: 4,
      lastYield: 780,
      compliance: 95,
      distance: 3.5,
      recommended: false
    },
    {
      id: 4,
      name: 'Lê Văn C',
      area: 2.8,
      availableArea: 2.8,
      vitaScore: 85,
      soilType: 'Phù sa',
      experience: 3,
      lastYield: 720,
      compliance: 92,
      distance: 4.2,
      recommended: false
    }
  ];

  // Mock data - SOP Templates
  const sopTemplates = [
    {
      id: 1,
      name: 'Quy trình Quýt Vân Sơn (VietGAP)',
      crop: 'Quýt Vân Sơn',
      duration: 180,
      steps: 8,
      certification: 'VietGAP',
      source: 'Trung tâm Khoa học',
      lastUpdate: '10/11/2024'
    },
    {
      id: 2,
      name: 'Quy trình Tam Thất (Hữu cơ)',
      crop: 'Tam Thất',
      duration: 240,
      steps: 10,
      certification: 'Organic',
      source: 'Trung tâm Khoa học',
      lastUpdate: '05/11/2024'
    }
  ];

  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);
  const [allocationData, setAllocationData] = useState<{[key: number]: number}>({});

  const toggleFarmer = (farmerId: number) => {
    if (selectedFarmers.includes(farmerId)) {
      setSelectedFarmers(selectedFarmers.filter(id => id !== farmerId));
      const newData = {...allocationData};
      delete newData[farmerId];
      setAllocationData(newData);
    } else {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    }
  };

  const updateAllocation = (farmerId: number, area: number) => {
    setAllocationData({
      ...allocationData,
      [farmerId]: area
    });
  };

  const getTotalAllocated = () => {
    return Object.values(allocationData).reduce((sum, val) => sum + val, 0);
  };

  const getEstimatedYield = () => {
    return getTotalAllocated() * 800; // Giả sử năng suất 800kg/ha
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar 
        title="Phân bổ & Kế hoạch Sản xuất" 
        subtitle="Công cụ chia lệnh & Triển khai SOP"
      />

      <div className="pt-16 px-3 sm:px-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('allocation')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'allocation'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-pie-chart-line mr-2"></i>
            Chia lệnh
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'planning'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-calendar-check-line mr-2"></i>
            Kế hoạch
          </button>
          <button
            onClick={() => setActiveTab('sop')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sop'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-file-list-3-line mr-2"></i>
            Quy trình SOP
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'compliance'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-shield-check-line mr-2"></i>
            Giám sát
          </button>
        </div>

        {/* Tab: Allocation Tool */}
        {activeTab === 'allocation' && (
          <div className="space-y-4">
            {/* Order Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i className="ri-shopping-cart-line text-emerald-600"></i>
                Đơn hàng cần phân bổ
              </h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                      selectedOrder === order.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{order.enterprise}</h4>
                        <p className="text-xs text-gray-500">{order.product}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status === 'pending' ? 'Chờ xử lý' : 'Đang thực hiện'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Số lượng</div>
                        <div className="font-semibold text-gray-800">{order.quantity.toLocaleString()} {order.unit}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Hạn chót</div>
                        <div className="font-semibold text-gray-800">{order.deadline}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Đơn giá</div>
                        <div className="font-semibold text-emerald-600">{formatCurrency(order.price)}/kg</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Chất lượng</div>
                        <div className="font-semibold text-gray-800">{order.requiredQuality}</div>
                      </div>
                    </div>
                    {order.notes && (
                      <div className="mt-2 text-xs text-gray-600 bg-blue-50 rounded-lg p-2">
                        <i className="ri-information-line mr-1"></i>
                        {order.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedOrder && (
              <>
                {/* AI Recommendation */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-sparkling-line text-xl"></i>
                    <h3 className="font-bold">Gợi ý AI</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Hệ thống đã phân tích và tìm thấy {suitableFarmers.filter(f => f.recommended).length} nông dân phù hợp nhất dựa trên: điểm VITA, thổ nhưỡng, kinh nghiệm và khoảng cách.
                  </p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-magic-line mr-2"></i>
                    Tự động phân bổ
                  </button>
                </div>

                {/* Farmer Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-user-search-line text-emerald-600"></i>
                    Chọn nông dân ({selectedFarmers.length} đã chọn)
                  </h3>
                  <div className="space-y-3">
                    {suitableFarmers.map((farmer) => (
                      <div
                        key={farmer.id}
                        className={`border-2 rounded-xl p-3 transition-all ${
                          selectedFarmers.includes(farmer.id)
                            ? 'border-emerald-500 bg-emerald-50'
                            : farmer.recommended
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedFarmers.includes(farmer.id)}
                              onChange={() => toggleFarmer(farmer.id)}
                              className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-800 text-sm">{farmer.name}</h4>
                                {farmer.recommended && (
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full whitespace-nowrap">
                                    <i className="ri-star-fill mr-1"></i>Đề xuất
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">VITA: {farmer.vitaScore} • Tuân thủ: {farmer.compliance}%</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-gray-600">Đất trống</div>
                            <div className="font-semibold text-emerald-600">{farmer.availableArea} ha</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-gray-600">NS trước</div>
                            <div className="font-semibold text-blue-600">{farmer.lastYield} kg/ha</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <div className="text-gray-600">Khoảng cách</div>
                            <div className="font-semibold text-gray-800">{farmer.distance} km</div>
                          </div>
                        </div>

                        {selectedFarmers.includes(farmer.id) && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <label className="text-xs text-gray-600 mb-1 block">Phân bổ diện tích (ha)</label>
                            <input
                              type="number"
                              min="0"
                              max={farmer.availableArea}
                              step="0.1"
                              value={allocationData[farmer.id] || 0}
                              onChange={(e) => updateAllocation(farmer.id, parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 border-2 border-emerald-300 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                              placeholder={`Tối đa ${farmer.availableArea} ha`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allocation Summary */}
                {selectedFarmers.length > 0 && (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-4 text-white">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <i className="ri-calculator-line"></i>
                      Tổng kết phân bổ
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-90">Tổng diện tích</div>
                        <div className="text-xl font-bold">{getTotalAllocated().toFixed(1)} ha</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-90">Sản lượng dự kiến</div>
                        <div className="text-xl font-bold">{getEstimatedYield().toLocaleString()} kg</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-90">Số nông dân</div>
                        <div className="text-xl font-bold">{selectedFarmers.length} hộ</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-90">Giá trị ước tính</div>
                        <div className="text-xl font-bold">{formatCurrency(getEstimatedYield() * 45000)}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-send-plane-fill mr-2"></i>
                        Phân bổ & Gửi nhiệm vụ
                      </button>
                      <button className="w-full bg-white/20 text-white py-2 rounded-xl font-medium hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-draft-line mr-2"></i>
                        Lưu nháp
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Tab: Planning */}
        {activeTab === 'planning' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Lịch sản xuất theo vụ</h3>
              <div className="space-y-3">
                {[
                  { season: 'Vụ Đông Xuân 2024-2025', start: '01/11/2024', end: '30/04/2025', status: 'active', progress: 35 },
                  { season: 'Vụ Hè Thu 2025', start: '01/05/2025', end: '31/10/2025', status: 'planning', progress: 0 }
                ].map((season, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">{season.season}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        season.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {season.status === 'active' ? 'Đang diễn ra' : 'Lập kế hoạch'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {season.start} - {season.end}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${season.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{season.progress}% hoàn thành</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: SOP */}
        {activeTab === 'sop' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">Thư viện Quy trình SOP</h3>
                <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-1"></i>
                  Tạo mới
                </button>
              </div>
              <div className="space-y-3">
                {sopTemplates.map((sop) => (
                  <div key={sop.id} className="border border-gray-200 rounded-xl p-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{sop.name}</h4>
                        <p className="text-xs text-gray-500">{sop.crop}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {sop.certification}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Thời gian</div>
                        <div className="font-semibold text-gray-800">{sop.duration} ngày</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Số bước</div>
                        <div className="font-semibold text-gray-800">{sop.steps} bước</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Cập nhật</div>
                        <div className="font-semibold text-gray-800">{sop.lastUpdate}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-play-circle-line mr-1"></i>
                        Áp dụng
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Compliance */}
        {activeTab === 'compliance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-checkbox-circle-line text-lg text-green-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">156</div>
                <div className="text-xs text-gray-500">Tuân thủ 100%</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-yellow-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">23</div>
                <div className="text-xs text-gray-500">Chậm trễ</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="ri-alert-line text-lg text-red-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">8</div>
                <div className="text-xs text-gray-500">Bất thường</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <i className="ri-star-line text-lg text-purple-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">94.2</div>
                <div className="text-xs text-gray-500">Điểm TB</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Bảng giám sát tuân thủ</h3>
              <div className="space-y-2">
                {[
                  { name: 'Phạm Thị D', compliance: 100, status: 'excellent', tasks: '12/12' },
                  { name: 'Nguyễn Văn A', compliance: 98, status: 'excellent', tasks: '11/12' },
                  { name: 'Trần Thị B', compliance: 95, status: 'good', tasks: '10/12' },
                  { name: 'Lê Văn C', compliance: 92, status: 'good', tasks: '9/12' },
                  { name: 'Hoàng Văn E', compliance: 75, status: 'warning', tasks: '6/12' }
                ].map((farmer, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-800 text-sm">{farmer.name}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        farmer.status === 'excellent' ? 'bg-green-100 text-green-700' :
                        farmer.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {farmer.compliance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Hoàn thành: {farmer.tasks}</span>
                      <button className="text-emerald-600 font-medium hover:underline cursor-pointer whitespace-nowrap">
                        Xem chi tiết
                      </button>
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
