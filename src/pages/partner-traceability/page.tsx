import { useState } from 'react';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function PartnerTraceabilityPage() {
  const [searchCode, setSearchCode] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const batches = [
    {
      id: 'VITA-CGL-2024-001',
      product: 'Cà Gai Leo',
      quantity: 850,
      harvestDate: '15/01/2024',
      quality: 'A+',
      saponin: 4.2,
      flavonoid: 3.8,
      farmer: 'Nguyễn Văn A',
      lot: 'A1',
      area: 2.5,
      certifications: ['VietGAP', 'Organic'],
      images: 3,
    },
    {
      id: 'VITA-HT-2024-002',
      product: 'Hoàng Tinh',
      quantity: 720,
      harvestDate: '18/01/2024',
      quality: 'A',
      saponin: 3.9,
      flavonoid: 3.5,
      farmer: 'Trần Thị B',
      lot: 'B1',
      area: 3.2,
      certifications: ['VietGAP'],
      images: 4,
    },
    {
      id: 'VITA-BT-2024-003',
      product: 'Bạch Truật',
      quantity: 950,
      harvestDate: '20/01/2024',
      quality: 'A+',
      saponin: 4.5,
      flavonoid: 4.1,
      farmer: 'Lê Văn C',
      lot: 'C1',
      area: 2.8,
      certifications: ['VietGAP', 'Organic', 'GACP'],
      images: 5,
    },
  ];

  const handleSearch = () => {
    const batch = batches.find(b => b.id === searchCode);
    if (batch) {
      setSelectedBatch(batch.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Truy xuất nguồn gốc</h1>
              <p className="text-sm opacity-90">Kiểm tra chất lượng & dược tính</p>
            </div>
          </div>
          <PortalSwitcher />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập mã lô hàng (VD: VITA-CGL-2024-001)"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <i className="ri-qr-scan-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-purple-600 transition-colors"
          >
            Tìm
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-6 py-4">
        {/* Recent Batches */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Lô hàng gần đây</h2>
          <div className="space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
                  selectedBatch === batch.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">{batch.product}</h3>
                      <p className="text-xs text-gray-500 font-mono mt-1">{batch.id}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                          {batch.quality}
                        </span>
                        {batch.certifications.map((cert) => (
                          <span key={cert} className="px-2 py-0.5 rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBatch(selectedBatch === batch.id ? null : batch.id)}
                      className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
                    >
                      <i className={`ri-${selectedBatch === batch.id ? 'arrow-up' : 'arrow-down'}-s-line text-purple-600`}></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Sản lượng</div>
                      <div className="text-sm font-semibold text-blue-600">{batch.quantity} kg</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Thu hoạch</div>
                      <div className="text-sm font-semibold text-purple-600">{batch.harvestDate}</div>
                    </div>
                  </div>

                  {selectedBatch === batch.id && (
                    <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
                      {/* Bio-Active Compounds */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <i className="ri-flask-line text-purple-600"></i>
                          Hàm lượng Hoạt chất
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3">
                            <div className="text-xs text-gray-600 mb-1">Saponin</div>
                            <div className="text-2xl font-bold text-emerald-600">{batch.saponin}%</div>
                            <div className="text-xs text-emerald-600 mt-1">
                              <i className="ri-arrow-up-line"></i> Cao hơn tiêu chuẩn
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3">
                            <div className="text-xs text-gray-600 mb-1">Flavonoid</div>
                            <div className="text-2xl font-bold text-blue-600">{batch.flavonoid}%</div>
                            <div className="text-xs text-blue-600 mt-1">
                              <i className="ri-arrow-up-line"></i> Cao hơn tiêu chuẩn
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Farmer Info */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <i className="ri-user-line text-purple-600"></i>
                          Thông tin Nông dân
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Người trồng:</span>
                            <span className="font-semibold text-gray-800">{batch.farmer}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Lô rừng:</span>
                            <span className="font-semibold text-gray-800">{batch.lot}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Diện tích:</span>
                            <span className="font-semibold text-gray-800">{batch.area} ha</span>
                          </div>
                        </div>
                      </div>

                      {/* Images */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <i className="ri-image-line text-purple-600"></i>
                          Hình ảnh Canh tác ({batch.images})
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(batch.images)].map((_, index) => (
                            <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                              <img
                                src={`https://readdy.ai/api/search-image?query=medicinal%20plant%20$%7Bbatch.product%7D%20growing%20in%20forest%2C%20organic%20farming%2C%20sustainable%20agriculture%2C%20healthy%20plants&width=200&height=200&seq=trace-${batch.id}-${index}&orientation=squarish`}
                                alt={`${batch.product} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                        <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <i className="ri-qr-code-line text-6xl text-purple-600"></i>
                        </div>
                        <p className="text-sm text-gray-600">Quét mã QR để xem đầy đủ</p>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button className="bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                          <i className="ri-download-line mr-2"></i>
                          Tải báo cáo
                        </button>
                        <button className="bg-purple-500 text-white py-2.5 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                          <i className="ri-share-line mr-2"></i>
                          Chia sẻ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
