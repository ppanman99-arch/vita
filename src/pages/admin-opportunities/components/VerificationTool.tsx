import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function VerificationTool() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'warning' | null>(null);

  // Satellite Data
  const satelliteData = {
    areaId: 'area-001',
    location: 'Hòa Bình - Lô A',
    coordinates: { lat: 20.8, lng: 105.3 },
    ndvi: 0.72, // Normalized Difference Vegetation Index (0-1)
    canopyCoverage: 75, // %
    treeDensity: 650, // trees/ha
    lastUpdate: '2024-01-25',
  };

  // AI Canopy Analysis
  const canopyAnalysis = {
    totalPixels: 10000,
    treePixels: 7500,
    skyPixels: 2000,
    netPixels: 500,
    coverage: 75,
    confidence: 92, // %
    detectedMaterial: 'natural_leaf', // or 'artificial_net'
    warning: null as string | null,
  };

  // Historical NDVI Data
  const ndviHistory = [
    { month: 'T1/2023', ndvi: 0.45, coverage: 45 },
    { month: 'T4/2023', ndvi: 0.58, coverage: 58 },
    { month: 'T7/2023', ndvi: 0.65, coverage: 65 },
    { month: 'T10/2023', ndvi: 0.70, coverage: 70 },
    { month: 'T1/2024', ndvi: 0.72, coverage: 75 },
  ];

  const handleVerify = () => {
    // Simulate verification process
    if (canopyAnalysis.detectedMaterial === 'natural_leaf' && satelliteData.ndvi > 0.6) {
      setVerificationStatus('verified');
    } else if (canopyAnalysis.detectedMaterial === 'artificial_net') {
      setVerificationStatus('warning');
    } else {
      setVerificationStatus('pending');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-shield-check-line text-emerald-600 mr-2"></i>
          Công cụ Kiểm soát (Verification Tool)
        </h2>
        <p className="text-gray-600">
          Đảm bảo Doanh nghiệp trả tiền cao thì nhận được "Bóng thật" chứ không phải "Bóng ảo"
        </p>
      </div>

      {/* Two-Layer Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layer 1: Satellite Imagery */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-satellite-line text-blue-600"></i>
            Lớp 1: Dữ liệu Vệ tinh (Satellite Imagery)
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Chỉ số thực vật (NDVI)</p>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${satelliteData.ndvi * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{satelliteData.ndvi.toFixed(2)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  satelliteData.ndvi > 0.6 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {satelliteData.ndvi > 0.6 ? 'Đạt chuẩn' : 'Cảnh báo'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Độ che phủ</p>
                <p className="text-lg font-bold text-gray-900">{satelliteData.canopyCoverage}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Mật độ cây</p>
                <p className="text-lg font-bold text-gray-900">{satelliteData.treeDensity} cây/ha</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
              <p className="mb-2">
                <strong>Phân tích:</strong> Phân tích chỉ số thực vật (NDVI) để xác định mật độ cây gỗ lớn tại tọa độ lô đất.
              </p>
              <p className="text-xs text-gray-600">
                Nếu chỉ số thấp (đất trọc) mà báo cáo che phủ 70% → <strong className="text-red-600">Cảnh báo gian lận</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Layer 2: AI Canopy Recognition */}
        <div className="bg-white p-6 rounded-xl border-2 border-emerald-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-camera-line text-emerald-600"></i>
            Lớp 2: AI nhận diện qua App nông dân
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <i className="ri-camera-line text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 mb-2">Chụp ảnh "ngước lên trời"</p>
              <p className="text-xs text-gray-500">(Canopy Photo) định kỳ hàng tháng</p>
            </div>

            {canopyAnalysis && (
              <div className="space-y-3">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Độ che phủ (AI phân tích)</p>
                  <p className="text-2xl font-bold text-emerald-600">{canopyAnalysis.coverage}%</p>
                  <p className="text-xs text-gray-500 mt-1">Độ tin cậy: {canopyAnalysis.confidence}%</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">Phân tích vật liệu:</p>
                  <div className="flex items-center gap-2">
                    {canopyAnalysis.detectedMaterial === 'natural_leaf' ? (
                      <>
                        <i className="ri-checkbox-circle-line text-green-600"></i>
                        <span className="text-sm font-semibold text-green-700">Lá cây tự nhiên (Tán rừng)</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-error-warning-line text-red-600"></i>
                        <span className="text-sm font-semibold text-red-700">Phát hiện Lưới đen nhân tạo!</span>
                      </>
                    )}
                  </div>
                </div>

                {canopyAnalysis.detectedMaterial === 'artificial_net' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-sm text-red-800">
                      <i className="ri-alert-line mr-2"></i>
                      <strong>Cảnh báo:</strong> Phát hiện Lưới đen trong đơn hàng VITA Lâm Sinh → 
                      Hệ thống tự động hạ hạng tiêu chuẩn → Trừ tiền thanh toán
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
            >
              <i className="ri-shield-check-line mr-2"></i>
              Chạy Xác minh
            </button>
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {verificationStatus && (
        <div className={`p-6 rounded-xl border-2 ${
          verificationStatus === 'verified' ? 'bg-green-50 border-green-300' :
          verificationStatus === 'warning' ? 'bg-red-50 border-red-300' :
          'bg-yellow-50 border-yellow-300'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              verificationStatus === 'verified' ? 'bg-green-100' :
              verificationStatus === 'warning' ? 'bg-red-100' :
              'bg-yellow-100'
            }`}>
              <i className={`${
                verificationStatus === 'verified' ? 'ri-checkbox-circle-line text-green-600' :
                verificationStatus === 'warning' ? 'ri-error-warning-line text-red-600' :
                'ri-time-line text-yellow-600'
              } text-2xl`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {verificationStatus === 'verified' ? 'Xác minh thành công' :
                 verificationStatus === 'warning' ? 'Cảnh báo: Phát hiện gian lận' :
                 'Đang xử lý'}
              </h3>
              {verificationStatus === 'verified' && (
                <p className="text-gray-700">
                  Lô đất đạt tiêu chuẩn VITA Lâm Sinh. Độ che phủ {satelliteData.canopyCoverage}% được xác nhận bằng cả vệ tinh và AI.
                  Đơn hàng được phép tiếp tục với giá Premium.
                </p>
              )}
              {verificationStatus === 'warning' && (
                <p className="text-gray-700">
                  Phát hiện vật liệu che bóng nhân tạo (Lưới đen). Đơn hàng sẽ bị hạ xuống tiêu chuẩn Basic, 
                  giá giảm từ Premium xuống Base. HTX cần khắc phục trong vòng 30 ngày.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NDVI History Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử NDVI & Độ che phủ</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={ndviHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="ndvi" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="NDVI" />
            <Line type="monotone" dataKey="coverage" stroke="#10b981" strokeWidth={2} name="Độ che phủ (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

