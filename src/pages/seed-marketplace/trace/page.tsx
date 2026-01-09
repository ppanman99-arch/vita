import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

interface BatchInfo {
  batchId: string;
  seedProduct: string;
  vendor: string;
  vendorId: string;
  orderDate: string;
  deliveryDate?: string;
  quantity: number;
  orderType: 'self' | 'b2b' | 'esg' | 'voucher';
  payer?: string;
  recipient?: string;
  recipientType?: 'htx' | 'individual';
  dnaProfiled: boolean;
  dnaProfile?: string;
  warranty: {
    survivalRate: number;
    warrantyPeriod: number;
    actualSurvivalRate?: number;
  };
  plantingInfo?: {
    plantingDate: string;
    location: string;
    area: number; // ha
    farmerCount: number;
  };
  harvestInfo?: {
    harvestDate?: string;
    expectedHarvestDate?: string;
    actualQuantity?: number;
  };
  traceabilityChain: {
    stage: string;
    timestamp: string;
    location?: string;
    actor?: string;
    notes?: string;
  }[];
}

export default function BatchTracePage() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const [batchInfo, setBatchInfo] = useState<BatchInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - In real app, fetch from API
    setTimeout(() => {
      setBatchInfo({
        batchId: batchId || 'SD-2025-VIL-SNL-001',
        seedProduct: 'Sâm Ngọc Linh',
        vendor: 'Viện Dược Liệu Trung ương',
        vendorId: 'VIL-001',
        orderDate: '12/05/2025',
        deliveryDate: '15/05/2025',
        quantity: 10000,
        orderType: 'b2b',
        payer: 'Công ty Dược Hậu Giang',
        recipient: 'HTX Tu Mơ Rông - Kon Tum',
        recipientType: 'htx',
        dnaProfiled: true,
        dnaProfile: 'Panax vietnamensis - Pure strain',
        warranty: {
          survivalRate: 90,
          warrantyPeriod: 15,
          actualSurvivalRate: 92,
        },
        plantingInfo: {
          plantingDate: '20/05/2025',
          location: 'Lô A1, Xã Tu Mơ Rông, Kon Tum',
          area: 5,
          farmerCount: 25,
        },
        harvestInfo: {
          expectedHarvestDate: '15/05/2030',
        },
        traceabilityChain: [
          {
            stage: 'Đặt hàng',
            timestamp: '12/05/2025 10:30',
            actor: 'Công ty Dược Hậu Giang',
            notes: 'Đặt hàng 10,000 cây giống Sâm Ngọc Linh',
          },
          {
            stage: 'Sản xuất',
            timestamp: '13/05/2025 08:00',
            location: 'Viện Dược Liệu Trung ương - Hà Nội',
            actor: 'Viện Dược Liệu',
            notes: 'Kiểm tra chất lượng, DNA profiling hoàn tất',
          },
          {
            stage: 'Vận chuyển',
            timestamp: '14/05/2025 14:00',
            location: 'Hà Nội → Kon Tum',
            actor: 'Nhà vận chuyển',
            notes: 'Bảo quản trong điều kiện nhiệt độ 15-20°C',
          },
          {
            stage: 'Nhập kho HTX',
            timestamp: '15/05/2025 16:30',
            location: 'Kho HTX Tu Mơ Rông',
            actor: 'HTX Tu Mơ Rông',
            notes: 'Xác nhận nhận hàng, chụp ảnh tình trạng cây (95% khỏe mạnh)',
          },
          {
            stage: 'Trồng',
            timestamp: '20/05/2025 07:00',
            location: 'Lô A1, Xã Tu Mơ Rông',
            actor: '25 hộ nông dân',
            notes: 'Trồng trên diện tích 5ha, mật độ 2,000 cây/ha',
          },
          {
            stage: 'Báo cáo Tỷ lệ sống',
            timestamp: '04/06/2025 10:00',
            location: 'Lô A1',
            actor: 'HTX Tu Mơ Rông',
            notes: 'Tỷ lệ sống thực tế: 92% (vượt mức bảo hành 90%)',
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, [batchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!batchInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-5xl text-red-500 mb-4"></i>
          <p className="text-gray-600 text-lg">Không tìm thấy thông tin lô giống</p>
          <button
            onClick={() => navigate('/seed-marketplace')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Truy xuất Nguồn gốc Lô Giống</h1>
                <p className="text-green-100 text-sm font-mono">{batchInfo.batchId}</p>
              </div>
            </div>
            <PortalSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Batch Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Lô Giống</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sản phẩm</p>
              <p className="font-semibold text-gray-900">{batchInfo.seedProduct}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Nhà cung cấp</p>
              <p className="font-semibold text-gray-900">{batchInfo.vendor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Số lượng</p>
              <p className="font-semibold text-gray-900">{batchInfo.quantity.toLocaleString()} cây</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ngày đặt hàng</p>
              <p className="font-semibold text-gray-900">{batchInfo.orderDate}</p>
            </div>
          </div>
          {batchInfo.dnaProfiled && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <i className="ri-dna-line text-blue-600"></i>
                <span className="font-semibold text-gray-900">DNA Profiled:</span>
                <span className="text-gray-700">{batchInfo.dnaProfile}</span>
              </div>
            </div>
          )}
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Đơn hàng</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Loại đơn hàng</p>
              <p className="font-semibold text-gray-900">
                {batchInfo.orderType === 'b2b' && 'B2B - Doanh nghiệp mua cho HTX'}
                {batchInfo.orderType === 'esg' && 'ESG - Tài trợ'}
                {batchInfo.orderType === 'voucher' && 'Voucher - GreenLight hỗ trợ'}
                {batchInfo.orderType === 'self' && 'HTX tự mua'}
              </p>
            </div>
            {batchInfo.payer && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Người thanh toán</p>
                <p className="font-semibold text-gray-900">{batchInfo.payer}</p>
              </div>
            )}
            {batchInfo.recipient && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Người nhận</p>
                <p className="font-semibold text-gray-900">{batchInfo.recipient}</p>
              </div>
            )}
          </div>
        </div>

        {/* Planting Info */}
        {batchInfo.plantingInfo && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin Trồng</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ngày trồng</p>
                <p className="font-semibold text-gray-900">{batchInfo.plantingInfo.plantingDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Địa điểm</p>
                <p className="font-semibold text-gray-900">{batchInfo.plantingInfo.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Diện tích</p>
                <p className="font-semibold text-gray-900">{batchInfo.plantingInfo.area} ha</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Số hộ tham gia</p>
                <p className="font-semibold text-gray-900">{batchInfo.plantingInfo.farmerCount} hộ</p>
              </div>
            </div>
          </div>
        )}

        {/* Warranty Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bảo hành & Tỷ lệ sống</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tỷ lệ sống cam kết</p>
              <p className="font-semibold text-gray-900">{batchInfo.warranty.survivalRate}%</p>
            </div>
            {batchInfo.warranty.actualSurvivalRate && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Tỷ lệ sống thực tế</p>
                <p className={`font-semibold ${
                  batchInfo.warranty.actualSurvivalRate >= batchInfo.warranty.survivalRate
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {batchInfo.warranty.actualSurvivalRate}%
                  {batchInfo.warranty.actualSurvivalRate >= batchInfo.warranty.survivalRate && (
                    <span className="ml-2 text-sm">✓ Đạt</span>
                  )}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Thời gian bảo hành</p>
              <p className="font-semibold text-gray-900">{batchInfo.warranty.warrantyPeriod} ngày</p>
            </div>
          </div>
        </div>

        {/* Traceability Chain */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Chuỗi Truy xuất Nguồn gốc</h2>
          <div className="space-y-4">
            {batchInfo.traceabilityChain.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === batchInfo.traceabilityChain.length - 1
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  {index < batchInfo.traceabilityChain.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.stage}</h4>
                        <p className="text-sm text-gray-600">{step.timestamp}</p>
                      </div>
                    </div>
                    {step.location && (
                      <div className="text-sm text-gray-700 mb-1">
                        <i className="ri-map-pin-line mr-1"></i>
                        {step.location}
                      </div>
                    )}
                    {step.actor && (
                      <div className="text-sm text-gray-700 mb-1">
                        <i className="ri-user-line mr-1"></i>
                        {step.actor}
                      </div>
                    )}
                    {step.notes && (
                      <div className="text-sm text-gray-600 mt-2 italic">
                        {step.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4">QR Code Truy xuất</h3>
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
              <i className="ri-qr-code-line text-6xl text-gray-400"></i>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Quét mã QR để xem thông tin này trên thiết bị di động
          </p>
        </div>
      </div>
    </div>
  );
}





