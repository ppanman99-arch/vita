import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HarvestLot {
  id: string;
  lotName: string;
  farmerName: string;
  cropType: string;
  age: number;
  plantingDate: string;
  expectedHarvestDate: string;
  status: 'ready' | 'harvesting' | 'packed' | 'completed';
}

interface ProductBatch {
  batchId: string;
  qrCode: string;
  grade: 'A+' | 'A' | 'B' | 'C';
  quantity: number;
  unit: string;
  digitalPassport: {
    seedSource: string;
    plantingDate: string;
    farmerLogs: number;
    satelliteImages: number;
    totalDays: number;
  } | null;
}

export default function DigitalHarvestPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [harvestLots, setHarvestLots] = useState<HarvestLot[]>([
    {
      id: 'lot-sam-a',
      lotName: 'Lô Sâm A',
      farmerName: 'Ông A',
      cropType: 'Sâm Ngọc Linh',
      age: 5,
      plantingDate: '2019-10-15',
      expectedHarvestDate: '2024-10-20',
      status: 'ready'
    }
  ]);
  const [selectedLot, setSelectedLot] = useState<HarvestLot | null>(null);
  const [batches, setBatches] = useState<ProductBatch[]>([]);

  // Bước 1: Lệnh Thu Hoạch
  const handleActivateHarvest = (lot: HarvestLot) => {
    setSelectedLot(lot);
    setHarvestLots(lots => 
      lots.map(l => l.id === lot.id ? { ...l, status: 'harvesting' as const } : l)
    );
    setCurrentStep(2);
  };

  // Bước 2: Đóng gói & QR Code
  const handleCreateBatches = (grade: 'A+' | 'A' | 'B' | 'C', quantity: number) => {
    const newBatch: ProductBatch = {
      batchId: `BATCH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      qrCode: `QR-${Date.now()}`,
      grade,
      quantity,
      unit: 'kg',
      digitalPassport: null
    };
    setBatches([...batches, newBatch]);
  };

  // Bước 3: Kích hoạt Digital Passport
  const handleActivatePassport = (batch: ProductBatch) => {
    setBatches(batches.map(b => 
      b.batchId === batch.batchId 
        ? {
            ...b,
            digitalPassport: {
              seedSource: 'Viện Dược Liệu - Batch #GL-2026-001',
              plantingDate: selectedLot?.plantingDate || '2019-10-15',
              farmerLogs: 1825, // 5 years
              satelliteImages: 60, // Monthly
              totalDays: 1825
            }
          }
        : b
    ));
    setCurrentStep(3);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin-production')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Thu Hoạch & Số Hóa</h1>
              <p className="text-sm opacity-90">Bước 1: Lệnh Thu Hoạch</p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-notification-line text-amber-600 text-3xl"></i>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông báo Thu hoạch</h2>
                <p className="text-gray-600">
                  Dựa trên ngày xuống giống, hệ thống tự động tính toán và thông báo lệnh thu hoạch
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {harvestLots.map((lot) => (
                <div
                  key={lot.id}
                  className={`p-6 rounded-xl border-2 ${
                    lot.status === 'ready' 
                      ? 'border-amber-200 bg-amber-50' 
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lot.lotName}</h3>
                      <p className="text-sm text-gray-600">
                        Nông dân: {lot.farmerName} • {lot.cropType}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-600">Tuổi cây: <strong>{lot.age} năm</strong></span>
                        <span className="text-gray-600">Ngày trồng: {new Date(lot.plantingDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lot.status === 'ready' 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {lot.status === 'ready' ? 'Sẵn sàng thu hoạch' : 'Đang thu hoạch'}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      <i className="ri-calendar-check-line mr-2 text-amber-600"></i>
                      Dự kiến thu hoạch: {new Date(lot.expectedHarvestDate).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-xs text-gray-600">
                      Cây đã đủ tuổi thu hoạch. Vui lòng kiểm tra thực địa trước khi kích hoạt thu hoạch.
                    </p>
                  </div>

                  {lot.status === 'ready' && (
                    <button
                      onClick={() => handleActivateHarvest(lot)}
                      className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                    >
                      Kích hoạt Thu hoạch →
                    </button>
                  )}

                  {lot.status === 'harvesting' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <i className="ri-information-line mr-2"></i>
                        Đã kích hoạt thu hoạch. Nông dân có thể bắt đầu thu hoạch và chuyển về kho sơ chế.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2 && selectedLot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đóng gói & Dán Tem QR</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLot.lotName}</h2>
              <p className="text-gray-600">Phân loại và đóng gói hàng tại kho sơ chế</p>
            </div>

            {/* Product Classification */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân loại sản phẩm</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { grade: 'A+' as const, label: 'Loại A+ (Xuất khẩu)', color: 'from-purple-600 to-indigo-600' },
                  { grade: 'A' as const, label: 'Loại A (Chất lượng cao)', color: 'from-emerald-600 to-teal-600' },
                  { grade: 'B' as const, label: 'Loại B (Tiêu chuẩn)', color: 'from-blue-600 to-cyan-600' },
                  { grade: 'C' as const, label: 'Loại C (Nội địa)', color: 'from-amber-600 to-orange-600' }
                ].map((item) => (
                  <div key={item.grade} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.label}</h4>
                    <input
                      type="number"
                      placeholder="Số lượng (kg)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                      onBlur={(e) => {
                        const qty = Number(e.target.value);
                        if (qty > 0) {
                          handleCreateBatches(item.grade, qty);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Created Batches */}
            {batches.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Các lô hàng đã tạo</h3>
                <div className="space-y-4">
                  {batches.map((batch) => (
                    <div key={batch.batchId} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Batch: {batch.batchId}</h4>
                          <p className="text-sm text-gray-600">
                            Loại {batch.grade} • {batch.quantity} {batch.unit}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                          <div className="w-24 h-24 bg-white flex items-center justify-center">
                            <i className="ri-qr-code-line text-4xl text-gray-400"></i>
                          </div>
                          <p className="text-xs text-center mt-2 text-gray-600">QR: {batch.qrCode}</p>
                        </div>
                      </div>

                      {!batch.digitalPassport ? (
                        <button
                          onClick={() => handleActivatePassport(batch)}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                        >
                          Kích hoạt Digital Passport →
                        </button>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                          <p className="text-sm text-emerald-800">
                            <i className="ri-checkbox-circle-line mr-2"></i>
                            Digital Passport đã được kích hoạt. Lịch sử 5 năm đã được tổng hợp.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <i className="ri-information-line mr-2"></i>
                Mỗi tem QR Code sẽ chứa toàn bộ lịch sử từ lúc mua giống, trồng, chăm sóc đến thu hoạch. 
                Khách hàng có thể quét mã để xem Digital Passport đầy đủ.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3 && batches.some(b => b.digitalPassport)) {
    const passportBatch = batches.find(b => b.digitalPassport);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Digital Passport đã kích hoạt!</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-list-3-line text-emerald-600 text-6xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hộ chiếu Số đã được tạo</h2>
              <p className="text-gray-600">
                Batch: {passportBatch?.batchId}
              </p>
            </div>

            {passportBatch?.digitalPassport && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-history-line text-emerald-600"></i>
                    Lịch sử 5 năm đã được tổng hợp
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="ri-seedling-line text-emerald-600"></i>
                      <span className="text-gray-700">
                        <strong>Nguồn giống:</strong> {passportBatch.digitalPassport.seedSource}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-calendar-line text-emerald-600"></i>
                      <span className="text-gray-700">
                        <strong>Ngày trồng:</strong> {new Date(passportBatch.digitalPassport.plantingDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-file-edit-line text-emerald-600"></i>
                      <span className="text-gray-700">
                        <strong>Nhật ký nông dân:</strong> {passportBatch.digitalPassport.farmerLogs} bản ghi
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-satellite-line text-emerald-600"></i>
                      <span className="text-gray-700">
                        <strong>Ảnh vệ tinh:</strong> {passportBatch.digitalPassport.satelliteImages} ảnh (định kỳ hàng tháng)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-time-line text-emerald-600"></i>
                      <span className="text-gray-700">
                        <strong>Tổng thời gian:</strong> {passportBatch.digitalPassport.totalDays} ngày ({passportBatch.digitalPassport.totalDays / 365} năm)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <i className="ri-checkbox-circle-line mr-2"></i>
                    <strong>Kết quả:</strong> Lô hàng có lý lịch minh bạch 100%. Khách hàng có thể quét mã QR để xem toàn bộ thông tin.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/quality-gate')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Tiếp tục → Kiểm Định Chất Lượng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}




