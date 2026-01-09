import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminWarehousePage() {
  const [activeTab, setActiveTab] = useState<'inbound' | 'warehouse' | 'processing' | 'qr' | 'history'>('inbound');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  // Mock data - Phiếu nhập kho chờ xử lý
  const inboundRequests = [
    {
      id: 'INB001',
      farmer: 'Nguyễn Văn A',
      product: 'Quýt Vân Sơn',
      quantity: 150,
      unit: 'kg',
      lot: 'A1',
      submitTime: '08:30 - 15/11/2024',
      status: 'pending',
      estimatedGrade: 'A',
      photos: 3
    },
    {
      id: 'INB002',
      farmer: 'Phạm Thị D',
      product: 'Cà Gai Leo',
      quantity: 220,
      unit: 'kg',
      lot: 'A3',
      submitTime: '09:15 - 15/11/2024',
      status: 'pending',
      estimatedGrade: 'A',
      photos: 4
    },
    {
      id: 'INB003',
      farmer: 'Trần Thị B',
      product: 'Hoàng Liên',
      quantity: 180,
      unit: 'kg',
      lot: 'B1',
      submitTime: '10:00 - 15/11/2024',
      status: 'processing',
      estimatedGrade: 'B',
      photos: 2
    }
  ];

  // Mock data - Kho ảo
  const warehouseBatches = [
    {
      code: 'WH-QVS-001',
      product: 'Quýt Vân Sơn',
      quantity: 1250,
      unit: 'kg',
      location: 'Kho A - Kệ 1',
      status: 'good',
      grade: 'A',
      expiryDate: '15/05/2025',
      farmers: 12,
      receivedDate: '01/11/2024'
    },
    {
      code: 'WH-CGL-002',
      product: 'Cà Gai Leo',
      quantity: 850,
      unit: 'kg',
      location: 'Kho A - Kệ 2',
      status: 'warning',
      grade: 'A',
      expiryDate: '20/12/2024',
      farmers: 8,
      receivedDate: '05/11/2024'
    },
    {
      code: 'WH-HL-003',
      product: 'Hoàng Liên',
      quantity: 620,
      unit: 'kg',
      location: 'Kho B - Kệ 1',
      status: 'good',
      grade: 'B',
      expiryDate: '30/06/2025',
      farmers: 6,
      receivedDate: '10/11/2024'
    },
    {
      code: 'WH-TT-004',
      product: 'Tam Thất',
      quantity: 450,
      unit: 'kg',
      location: 'Kho B - Kệ 2',
      status: 'urgent',
      grade: 'A+',
      expiryDate: '25/11/2024',
      farmers: 5,
      receivedDate: '15/10/2024'
    }
  ];

  // Mock data - Quá trình sơ chế
  const processingBatches = [
    {
      id: 'PR001',
      product: 'Quýt Vân Sơn',
      inputWeight: 1000,
      currentWeight: 320,
      outputWeight: 0,
      process: 'Đang sấy khô',
      progress: 65,
      lossRate: 68,
      expectedLoss: 70,
      startDate: '12/11/2024',
      estimatedEnd: '18/11/2024',
      status: 'processing'
    },
    {
      id: 'PR002',
      product: 'Cà Gai Leo',
      inputWeight: 800,
      currentWeight: 0,
      outputWeight: 240,
      process: 'Hoàn thành',
      progress: 100,
      lossRate: 70,
      expectedLoss: 70,
      startDate: '08/11/2024',
      estimatedEnd: '14/11/2024',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'good':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Tốt</span>;
      case 'warning':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">Cảnh báo</span>;
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Gấp</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">Chờ xử lý</span>;
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Đang xử lý</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Hoàn thành</span>;
      default:
        return null;
    }
  };

  const getGradeBadge = (grade: string) => {
    const colors: {[key: string]: string} = {
      'A+': 'bg-purple-100 text-purple-700',
      'A': 'bg-green-100 text-green-700',
      'B': 'bg-blue-100 text-blue-700',
      'C': 'bg-gray-100 text-gray-700'
    };
    return <span className={`px-2 py-1 ${colors[grade] || 'bg-gray-100 text-gray-700'} text-xs font-medium rounded-full whitespace-nowrap`}>Loại {grade}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar 
        title="Kho vận & Sơ chế" 
        subtitle="Quản lý luồng hàng & Truy xuất nguồn gốc"
      />

      <div className="pt-16 px-3 sm:px-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inbound')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'inbound'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-inbox-line mr-1"></i>
            Nhập kho
            {inboundRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {inboundRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('warehouse')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'warehouse'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-archive-line mr-1"></i>
            Kho ảo
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'processing'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-settings-3-line mr-1"></i>
            Sơ chế
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-qr-code-line mr-1"></i>
            Tạo QR
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-history-line mr-1"></i>
            Lịch sử
          </button>
        </div>

        {/* Tab: Inbound (Cổng nhập hàng) */}
        {activeTab === 'inbound' && (
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-amber-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{inboundRequests.filter(r => r.status === 'pending').length}</div>
                <div className="text-xs text-gray-500">Chờ xử lý</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-loader-line text-lg text-blue-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{inboundRequests.filter(r => r.status === 'processing').length}</div>
                <div className="text-xs text-gray-500">Đang xử lý</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <i className="ri-check-line text-lg text-emerald-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">24</div>
                <div className="text-xs text-gray-500">Hôm nay</div>
              </div>
            </div>

            {/* QR Scanner */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1">Quét mã QR nông dân</h3>
                  <p className="text-sm opacity-90">Nhập hàng nhanh chóng</p>
                </div>
                <button className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer">
                  <i className="ri-qr-scan-2-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Inbound Requests */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i className="ri-inbox-line text-emerald-600"></i>
                Phiếu nhập kho
              </h3>
              <div className="space-y-3">
                {inboundRequests.map((request) => (
                  <div key={request.id} className="border-2 border-gray-200 rounded-xl p-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-600">{request.id}</span>
                          {getStatusBadge(request.status)}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm">{request.farmer}</h4>
                        <p className="text-xs text-gray-500">Lô {request.lot} • {request.submitTime}</p>
                      </div>
                      <div className="text-right">
                        {getGradeBadge(request.estimatedGrade)}
                        <div className="text-xs text-gray-500 mt-1">
                          <i className="ri-image-line mr-1"></i>
                          {request.photos} ảnh
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">{request.product}</span>
                        <span className="text-lg font-bold text-emerald-600">{request.quantity} {request.unit}</span>
                      </div>
                    </div>

                    {request.status === 'pending' && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <button className="bg-green-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-check-line mr-1"></i>
                            Loại A
                          </button>
                          <button className="bg-blue-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-check-line mr-1"></i>
                            Loại B
                          </button>
                          <button className="bg-gray-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-check-line mr-1"></i>
                            Loại C
                          </button>
                        </div>
                        <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-close-line mr-1"></i>
                          Từ chối
                        </button>
                      </div>
                    )}

                    {request.status === 'processing' && (
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-600">
                          <i className="ri-loader-4-line animate-spin"></i>
                          <span className="text-sm font-medium">Đang cân đo & đánh giá...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Warehouse (Kho ảo) */}
        {activeTab === 'warehouse' && (
          <div className="space-y-4">
            {/* Warehouse Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <i className="ri-archive-line text-lg text-emerald-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">3,170</div>
                <div className="text-xs text-gray-500">Tổng tồn kho (kg)</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-stack-line text-lg text-blue-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{warehouseBatches.length}</div>
                <div className="text-xs text-gray-500">Số lô hàng</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-checkbox-circle-line text-lg text-green-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{warehouseBatches.filter(b => b.status === 'good').length}</div>
                <div className="text-xs text-gray-500">Tình trạng tốt</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <i className="ri-alert-line text-lg text-red-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{warehouseBatches.filter(b => b.status === 'urgent').length}</div>
                <div className="text-xs text-gray-500">Cần xử lý gấp</div>
              </div>
            </div>

            {/* Warehouse Map */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Sơ đồ kho 3D</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="border-2 border-emerald-300 rounded-xl p-3 bg-emerald-50">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Kho A</div>
                  <div className="space-y-2">
                    {warehouseBatches.filter(b => b.location.startsWith('Kho A')).map((batch) => (
                      <div key={batch.code} className={`p-2 rounded-lg border-2 ${
                        batch.status === 'good' ? 'bg-green-100 border-green-300' :
                        batch.status === 'warning' ? 'bg-yellow-100 border-yellow-300' :
                        'bg-red-100 border-red-300'
                      }`}>
                        <div className="text-xs font-mono font-bold text-gray-700">{batch.code}</div>
                        <div className="text-xs text-gray-600">{batch.quantity} kg</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-blue-300 rounded-xl p-3 bg-blue-50">
                  <div className="text-sm font-semibold text-gray-800 mb-2">Kho B</div>
                  <div className="space-y-2">
                    {warehouseBatches.filter(b => b.location.startsWith('Kho B')).map((batch) => (
                      <div key={batch.code} className={`p-2 rounded-lg border-2 ${
                        batch.status === 'good' ? 'bg-green-100 border-green-300' :
                        batch.status === 'warning' ? 'bg-yellow-100 border-yellow-300' :
                        'bg-red-100 border-red-300'
                      }`}>
                        <div className="text-xs font-mono font-bold text-gray-700">{batch.code}</div>
                        <div className="text-xs text-gray-600">{batch.quantity} kg</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Batch List */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Danh sách lô hàng</h3>
              <div className="space-y-3">
                {warehouseBatches.map((batch) => (
                  <div key={batch.code} className="border-2 border-gray-200 rounded-xl p-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-600">{batch.code}</span>
                          {getStatusBadge(batch.status)}
                          {getGradeBadge(batch.grade)}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm">{batch.product}</h4>
                        <p className="text-xs text-gray-500">{batch.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">{batch.quantity}</div>
                        <div className="text-xs text-gray-500">{batch.unit}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Nguồn gốc</div>
                        <div className="font-semibold text-gray-800">{batch.farmers} hộ</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Nhập kho</div>
                        <div className="font-semibold text-gray-800">{batch.receivedDate}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-600">Hạn SD</div>
                        <div className={`font-semibold ${
                          batch.status === 'urgent' ? 'text-red-600' : 'text-gray-800'
                        }`}>{batch.expiryDate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-truck-line mr-1"></i>
                        Xuất kho
                      </button>
                      <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-qr-code-line mr-1"></i>
                        Xem QR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Processing (Sơ chế) */}
        {activeTab === 'processing' && (
          <div className="space-y-4">
            {/* Processing Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-loader-line text-lg text-blue-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{processingBatches.filter(b => b.status === 'processing').length}</div>
                <div className="text-xs text-gray-500">Đang sơ chế</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-check-line text-lg text-green-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{processingBatches.filter(b => b.status === 'completed').length}</div>
                <div className="text-xs text-gray-500">Hoàn thành</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-percent-line text-lg text-amber-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">69%</div>
                <div className="text-xs text-gray-500">Tỷ lệ hao hụt TB</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <i className="ri-scales-3-line text-lg text-purple-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">560</div>
                <div className="text-xs text-gray-500">Sản phẩm (kg)</div>
              </div>
            </div>

            {/* Processing Batches */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">Quá trình sơ chế</h3>
                <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-1"></i>
                  Tạo mới
                </button>
              </div>
              <div className="space-y-3">
                {processingBatches.map((batch) => (
                  <div key={batch.id} className="border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-600">{batch.id}</span>
                          {getStatusBadge(batch.status)}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm">{batch.product}</h4>
                        <p className="text-xs text-gray-500">{batch.process}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{batch.progress}%</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${batch.progress}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-gray-600">Đầu vào</div>
                        <div className="font-semibold text-blue-600">{batch.inputWeight} kg</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-gray-600">Hiện tại</div>
                        <div className="font-semibold text-amber-600">{batch.currentWeight || batch.outputWeight} kg</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-gray-600">Đầu ra</div>
                        <div className="font-semibold text-green-600">{batch.outputWeight || '---'} kg</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Tỷ lệ hao hụt:</span>
                        <span className={`font-semibold ${
                          batch.lossRate <= batch.expectedLoss ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {batch.lossRate}% {batch.lossRate <= batch.expectedLoss ? '✓' : '⚠'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-gray-600">Dự kiến:</span>
                        <span className="font-semibold text-gray-800">{batch.expectedLoss}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                      <div>
                        <i className="ri-calendar-line mr-1"></i>
                        Bắt đầu: {batch.startDate}
                      </div>
                      <div>
                        <i className="ri-calendar-check-line mr-1"></i>
                        Dự kiến: {batch.estimatedEnd}
                      </div>
                    </div>

                    {batch.status === 'processing' && (
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-refresh-line mr-1"></i>
                        Cập nhật tiến độ
                      </button>
                    )}

                    {batch.status === 'completed' && (
                      <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-check-double-line mr-1"></i>
                        Nhập kho thành phẩm
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: QR Generator */}
        {activeTab === 'qr' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Tạo mã QR truy xuất</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chọn các lô hàng để đóng gói thành Master Batch và tạo mã QR truy xuất nguồn gốc
              </p>

              <div className="space-y-3 mb-4">
                {warehouseBatches.slice(0, 3).map((batch) => (
                  <div key={batch.code} className="border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded cursor-pointer" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-600">{batch.code}</span>
                          {getGradeBadge(batch.grade)}
                        </div>
                        <div className="text-sm font-semibold text-gray-800">{batch.product}</div>
                        <div className="text-xs text-gray-500">{batch.quantity} kg • {batch.farmers} hộ nông dân</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-qr-code-line mr-2"></i>
                Tạo Master Batch & QR Code
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Xem trước mã QR</h3>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-48 h-48 mx-auto bg-white rounded-xl shadow-md flex items-center justify-center mb-3">
                  <i className="ri-qr-code-line text-6xl text-gray-300"></i>
                </div>
                <div className="text-sm font-mono font-bold text-gray-600 mb-1">MB-2024-001</div>
                <div className="text-xs text-gray-500">Master Batch • 3 lô hàng • 2,720 kg</div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-sm font-semibold text-gray-800 mb-2">Timeline truy xuất:</div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <i className="ri-seedling-line text-green-600"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Gieo hạt</div>
                    <div className="text-gray-500">01/05/2024 • 31 hộ nông dân</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="ri-plant-line text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Chăm sóc</div>
                    <div className="text-gray-500">180 ngày • 456 nhật ký</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <i className="ri-scissors-cut-line text-amber-600"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Thu hoạch</div>
                    <div className="text-gray-500">28/10/2024 • HTX kiểm định</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-printer-line mr-2"></i>
                In tem nhãn
              </button>
            </div>
          </div>
        )}

        {/* Tab: History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Lịch sử giao dịch</h3>
              <div className="space-y-3">
                {[
                  { type: 'in', product: 'Quýt Vân Sơn', quantity: 150, farmer: 'Nguyễn Văn A', time: '08:30 - 15/11/2024' },
                  { type: 'out', product: 'Cà Gai Leo', quantity: 240, customer: 'Công ty Dược Phẩm VN', time: '14:20 - 14/11/2024' },
                  { type: 'in', product: 'Hoàng Liên', quantity: 180, farmer: 'Trần Thị B', time: '10:00 - 14/11/2024' }
                ].map((tx, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'in' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <i className={`text-lg ${
                          tx.type === 'in' ? 'ri-arrow-down-line text-green-600' : 'ri-arrow-up-line text-blue-600'
                        }`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{tx.product}</div>
                        <div className="text-xs text-gray-500">
                          {tx.type === 'in' ? `Nhập từ ${tx.farmer}` : `Xuất cho ${tx.customer}`}
                        </div>
                        <div className="text-xs text-gray-400">{tx.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          tx.type === 'in' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {tx.type === 'in' ? '+' : '-'}{tx.quantity}
                        </div>
                        <div className="text-xs text-gray-500">kg</div>
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
