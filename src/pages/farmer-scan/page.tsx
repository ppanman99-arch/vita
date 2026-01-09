import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerScanPage() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan
    setTimeout(() => {
      setScannedData({
        treeId: 'QUE-A1-2023-0125',
        treeName: 'Cây Quế',
        lot: 'Lô A1',
        plantDate: '15/03/2023',
        age: '10 tháng',
        status: 'Khỏe mạnh',
        lastUpdate: '15/01/2024',
        farmer: 'Anh Minh',
        location: '21.0285° N, 105.8542° E',
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleReset = () => {
    setScannedData(null);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Quét QR Code</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {!scannedData ? (
          <>
            {/* Scanner */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                {isScanning ? 'Đang quét...' : 'Đưa mã QR vào khung hình'}
              </h2>

              {/* Scanner Frame */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden">
                  {/* Corner Markers */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-green-600 rounded-tl-xl"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-green-600 rounded-tr-xl"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-green-600 rounded-bl-xl"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-green-600 rounded-br-xl"></div>

                  {/* Scanning Line */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-green-600 animate-scan"></div>
                  )}

                  {/* QR Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="ri-qr-code-line text-8xl text-green-600 opacity-30"></i>
                  </div>
                </div>
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all cursor-pointer whitespace-nowrap ${
                  isScanning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg active:scale-95'
                }`}
              >
                {isScanning ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Đang quét...
                  </>
                ) : (
                  <>
                    <i className="ri-qr-scan-2-line mr-2"></i>
                    Bắt đầu quét
                  </>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hướng dẫn sử dụng</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-green-600">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Tìm mã QR trên cây</div>
                    <div className="text-sm text-gray-600">Mã QR được dán trên thân cây hoặc biển đánh dấu lô</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-green-600">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Đưa mã vào khung hình</div>
                    <div className="text-sm text-gray-600">Giữ điện thoại ổn định và đảm bảo đủ ánh sáng</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-green-600">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Xem thông tin cây trồng</div>
                    <div className="text-sm text-gray-600">Hệ thống sẽ hiển thị đầy đủ thông tin và lịch sử chăm sóc</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Scanned Result */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Thông tin cây trồng</h2>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Quét lại
                </button>
              </div>

              {/* Success Icon */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <i className="ri-checkbox-circle-fill text-5xl text-green-600"></i>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{scannedData.treeName}</div>
                  <div className="text-sm text-gray-600">{scannedData.treeId}</div>
                </div>
              </div>

              {/* Tree Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-map-pin-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Vị trí</div>
                      <div className="font-bold text-gray-900">{scannedData.lot}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-calendar-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Ngày xuống giống</div>
                      <div className="font-bold text-gray-900">{scannedData.plantDate}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-time-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Tuổi cây</div>
                      <div className="font-bold text-gray-900">{scannedData.age}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-heart-pulse-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Tình trạng</div>
                      <div className="font-bold text-green-600">{scannedData.status}</div>
                    </div>
                  </div>
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-user-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Người chăm sóc</div>
                      <div className="font-bold text-gray-900">{scannedData.farmer}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <i className="ri-refresh-line text-2xl text-green-600"></i>
                    <div>
                      <div className="text-sm text-gray-600">Cập nhật lần cuối</div>
                      <div className="font-bold text-gray-900">{scannedData.lastUpdate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/farmer/diary')}
                className="py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-book-2-line mr-2"></i>
                Ghi nhật ký
              </button>
              <button
                onClick={() => navigate('/farmer/farm')}
                className="py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-map-2-line mr-2"></i>
                Xem bản đồ
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/farm')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-map-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nông trại</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
