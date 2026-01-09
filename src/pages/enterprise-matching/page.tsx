import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MatchedCoop {
  id: string;
  name: string;
  region: string;
  matchScore: number;
  landLots: {
    lotId: string;
    area: number;
    altitude: number;
    soilType: string;
    soilPH: number;
    climate: string;
    temperature: string;
    humidity: number;
    status: 'available' | 'reserved';
    gpsCoordinates: string;
  }[];
  capacity: {
    availableArea: number;
    maxProduction: number;
  };
  certifications: string[];
  experience: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
}

interface ProcurementRequest {
  id: string;
  companyName: string;
  herbType: string;
  quantity: number;
  deliveryDate: string;
  standards: string[];
  targetKPI: {
    saponin?: number;
    mr2?: number;
    flavonoid?: number;
  };
}

export default function EnterpriseMatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCoop, setSelectedCoop] = useState<MatchedCoop | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ProcurementRequest | null>(null);
  const [showNegotiation, setShowNegotiation] = useState(false);

  const matchedCoops: MatchedCoop[] = [
    {
      id: 'htx-sin-ho',
      name: 'HTX Dược Liệu Hữu Cơ Sìn Hồ',
      region: 'Tây Bắc',
      matchScore: 98,
      landLots: [
        {
          lotId: 'LOT-05',
          area: 20,
          altitude: 1700,
          soilType: 'Đất mùn trên núi đá',
          soilPH: 5.5,
          climate: 'Nhiệt đới gió mùa núi cao',
          temperature: '15-20°C',
          humidity: 80,
          status: 'available',
          gpsCoordinates: '22.3456, 103.7890',
        },
        {
          lotId: 'LOT-08',
          area: 15,
          altitude: 1650,
          soilType: 'Đất mùn trên núi đá',
          soilPH: 5.8,
          climate: 'Nhiệt đới gió mùa núi cao',
          temperature: '16-21°C',
          humidity: 78,
          status: 'available',
          gpsCoordinates: '22.3478, 103.7912',
        },
      ],
      capacity: {
        availableArea: 35,
        maxProduction: 1200,
      },
      certifications: ['GACP-WHO', 'Organic USDA', 'VietGAP'],
      experience: '10 năm canh tác Sâm Ngọc Linh',
      riskLevel: 'low',
      riskFactors: [],
    },
    {
      id: 'htx-kon-tum',
      name: 'HTX Dược Liệu Kon Tum',
      region: 'Tây Nguyên',
      matchScore: 95,
      landLots: [
        {
          lotId: 'LOT-12',
          area: 25,
          altitude: 1800,
          soilType: 'Đất mùn trên núi đá',
          soilPH: 5.3,
          climate: 'Nhiệt đới gió mùa núi cao',
          temperature: '14-19°C',
          humidity: 82,
          status: 'available',
          gpsCoordinates: '14.3567, 108.0123',
        },
      ],
      capacity: {
        availableArea: 25,
        maxProduction: 850,
      },
      certifications: ['GACP-WHO', 'VietGAP'],
      experience: '8 năm canh tác Sâm Ngọc Linh',
      riskLevel: 'low',
      riskFactors: [],
    },
    {
      id: 'htx-lam-dong',
      name: 'HTX Dược Liệu Lâm Đồng',
      region: 'Tây Nguyên',
      matchScore: 60,
      landLots: [
        {
          lotId: 'LOT-03',
          area: 18,
          altitude: 1500,
          soilType: 'Đất đá ong',
          soilPH: 6.2,
          climate: 'Nhiệt đới gió mùa núi cao',
          temperature: '18-23°C',
          humidity: 75,
          status: 'available',
          gpsCoordinates: '12.7234, 108.2345',
        },
      ],
      capacity: {
        availableArea: 18,
        maxProduction: 600,
      },
      certifications: ['VietGAP'],
      experience: '5 năm canh tác dược liệu',
      riskLevel: 'medium',
      riskFactors: [
        'Đất đá ong có thể ảnh hưởng đến hệ rễ',
        'Độ cao thấp hơn mức tối ưu',
        'Nhiệt độ cao hơn mức lý tưởng',
      ],
    },
  ];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return { text: 'Rủi ro thấp', color: 'bg-emerald-100 text-emerald-700' };
      case 'medium':
        return { text: 'Rủi ro trung bình', color: 'bg-amber-100 text-amber-700' };
      case 'high':
        return { text: 'Rủi ro cao', color: 'bg-red-100 text-red-700' };
      default:
        return { text: 'Chưa đánh giá', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Kết quả khớp lệnh</h1>
              <p className="text-sm opacity-90">Matching Engine Results</p>
            </div>
          </div>

          {/* Request Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-white/70 mb-1">Dược liệu</div>
                <div className="font-bold">Sâm Ngọc Linh</div>
              </div>
              <div>
                <div className="text-white/70 mb-1">Saponin</div>
                <div className="font-bold">&gt; 10%</div>
              </div>
              <div>
                <div className="text-white/70 mb-1">Sản lượng</div>
                <div className="font-bold">5,000 kg</div>
              </div>
              <div>
                <div className="text-white/70 mb-1">Giao hàng</div>
                <div className="font-bold">Q4/2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Info Banner */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <i className="ri-checkbox-circle-fill text-2xl text-emerald-600"></i>
            <div>
              <h3 className="font-semibold text-emerald-800 mb-1">
                Tìm thấy {matchedCoops.length} HTX phù hợp
              </h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Hệ thống đã phân tích <strong>thổ nhưỡng, độ cao, khí hậu</strong> và tìm thấy các HTX có điều kiện canh tác phù hợp. 
                Điểm khớp (Match Score) càng cao, khả năng đạt tiêu chuẩn dược tính càng lớn.
              </p>
            </div>
          </div>
        </div>

        {/* Matched Coops List */}
        <div className="space-y-4">
          {matchedCoops.map(coop => {
            const riskBadge = getRiskBadge(coop.riskLevel);
            const isSelected = selectedCoop?.id === coop.id;

            return (
              <div
                key={coop.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                  isSelected ? 'ring-4 ring-emerald-500' : ''
                }`}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{coop.name}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                          <i className="ri-map-pin-line mr-1"></i>
                          {coop.region}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${riskBadge.color}`}>
                          <i className="ri-shield-line mr-1"></i>
                          {riskBadge.text}
                        </span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-bold text-2xl ${getMatchScoreColor(coop.matchScore)}`}>
                      {coop.matchScore}%
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <i className="ri-time-line mr-1"></i>
                    {coop.experience}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Capacity */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Diện tích khả dụng</div>
                      <div className="text-2xl font-bold text-blue-600">{coop.capacity.availableArea} ha</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Năng lực sản xuất</div>
                      <div className="text-2xl font-bold text-purple-600">{coop.capacity.maxProduction} kg/năm</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Chứng chỉ:</h4>
                    <div className="flex flex-wrap gap-2">
                      {coop.certifications.map(cert => (
                        <span key={cert} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
                          <i className="ri-award-line mr-1"></i>
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Land Lots */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      <i className="ri-landscape-line text-emerald-600 mr-1"></i>
                      Các lô đất phù hợp ({coop.landLots.length} lô):
                    </h4>
                    <div className="space-y-3">
                      {coop.landLots.map(lot => (
                        <div key={lot.lotId} className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="font-bold text-gray-800 mb-1">Lô {lot.lotId}</h5>
                              <p className="text-xs text-gray-500">
                                <i className="ri-map-pin-2-line mr-1"></i>
                                GPS: {lot.gpsCoordinates}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              lot.status === 'available' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {lot.status === 'available' ? 'Sẵn sàng' : 'Đã đặt trước'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-xs text-gray-600">Diện tích</div>
                              <div className="text-sm font-bold text-gray-800">{lot.area} ha</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-xs text-gray-600">Độ cao</div>
                              <div className="text-sm font-bold text-gray-800">{lot.altitude}m</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-xs text-gray-600">pH đất</div>
                              <div className="text-sm font-bold text-gray-800">{lot.soilPH}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-xs text-gray-600">Độ ẩm</div>
                              <div className="text-sm font-bold text-gray-800">{lot.humidity}%</div>
                            </div>
                          </div>

                          <div className="mt-3 space-y-1 text-xs text-gray-600">
                            <div><strong>Loại đất:</strong> {lot.soilType}</div>
                            <div><strong>Khí hậu:</strong> {lot.climate}</div>
                            <div><strong>Nhiệt độ TB:</strong> {lot.temperature}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Factors */}
                  {coop.riskFactors.length > 0 && (
                    <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-amber-900 mb-2">
                        <i className="ri-alert-line mr-1"></i>
                        Cảnh báo rủi ro:
                      </h4>
                      <ul className="space-y-1">
                        {coop.riskFactors.map((risk, index) => (
                          <li key={index} className="text-xs text-amber-800 flex items-start gap-2">
                            <i className="ri-error-warning-line mt-0.5 flex-shrink-0"></i>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCoop(isSelected ? null : coop)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className={`ri-${isSelected ? 'checkbox' : 'checkbox-blank'}-circle-line mr-2`}></i>
                      {isSelected ? 'Đã chọn' : 'Chọn HTX này'}
                    </button>
                    <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                      <i className="ri-map-2-line mr-2"></i>
                      Xem bản đồ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        {selectedCoop && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
            <div className="max-w-7xl mx-auto flex gap-3">
              <button
                onClick={() => setShowNegotiation(true)}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
              >
                <i className="ri-chat-3-line mr-2"></i>
                Bắt đầu đàm phán với HTX
              </button>
            </div>
          </div>
        )}

        {/* Negotiation Modal */}
        {showNegotiation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Phòng đàm phán</h2>
                <button
                  onClick={() => setShowNegotiation(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-2xl text-gray-600"></i>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">Thông tin liên hệ đã được mở khóa</h3>
                      <p className="text-sm text-blue-700">
                        Bạn có thể chat trực tiếp với HTX hoặc gặp mặt để thảo luận chi tiết về:
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Quy trình kỹ thuật chi tiết (SOP)</h4>
                      <p className="text-sm text-gray-600">Thống nhất quy trình canh tác, bón phân, thu hoạch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Giá bao tiêu</h4>
                      <p className="text-sm text-gray-600">Giá sàn bảo hiểm + Giá thị trường thả nổi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-gray-800">Mức tạm ứng (Deposit)</h4>
                      <p className="text-sm text-gray-600">Thỏa thuận tỷ lệ tạm ứng và lịch thanh toán</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-3">Thông tin liên hệ HTX</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-user-line text-emerald-600"></i>
                      <span className="text-gray-700">Chủ nhiệm: <strong>Nguyễn Văn Minh</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-phone-line text-emerald-600"></i>
                      <span className="text-gray-700">Điện thoại: <strong>0912 345 678</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-mail-line text-emerald-600"></i>
                      <span className="text-gray-700">Email: <strong>htx.sinho@vita.vn</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      const subject = encodeURIComponent(`[VITA Platform] Yêu cầu hợp tác trồng ${selectedRequest?.herbType || 'dược liệu'}`);
                      const body = encodeURIComponent(
`Kính gửi HTX ${selectedCoop?.name || 'HTX'},

Chúng tôi là ${selectedRequest?.companyName || 'Doanh nghiệp'}, đang có nhu cầu thu mua dược liệu thông qua VITA Platform.

THÔNG TIN YÊU CẦU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Loại dược liệu: ${selectedRequest?.herbType || 'N/A'}
• Sản lượng cần: ${selectedRequest?.quantity || 'N/A'} kg
• Thời điểm cần hàng: ${selectedRequest?.deliveryDate || 'N/A'}
• Tiêu chuẩn: ${selectedRequest?.standards?.join(', ') || 'N/A'}

MỤC TIÊU HOẠT CHẤT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Saponin tổng: ≥ ${selectedRequest?.targetKPI?.saponin || 0}%
• MR2: ≥ ${selectedRequest?.targetKPI?.mr2 || 0}%
• Flavonoid: ≥ ${selectedRequest?.targetKPI?.flavonoid || 0}%

LÔ ĐẤT PHÙ HỢP:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Mã lô: ${selectedCoop?.landLots?.[0]?.lotId || 'N/A'}
• Diện tích: ${selectedCoop?.landLots?.[0]?.area || 'N/A'} ha
• Độ cao: ${selectedCoop?.landLots?.[0]?.altitude || 'N/A'}m
• Độ phù hợp: ${selectedCoop?.matchScore || 0}%

Hệ thống VITA Platform đã đánh giá lô đất của quý HTX rất phù hợp với yêu cầu của chúng tôi. 

Chúng tôi mong muốn được trao đổi thêm về:
1. Quy trình kỹ thuật canh tác (SOP)
2. Giá bao tiêu và phương thức thanh toán
3. Mức tạm ứng và tiến độ giải ngân
4. Lịch trình triển khai dự án

Vui lòng phản hồi email này hoặc liên hệ trực tiếp qua:
• Điện thoại: [Số điện thoại của bạn]
• Email: [Email của bạn]

Trân trọng,
${selectedRequest?.companyName || 'Doanh nghiệp'}

---
Email này được gửi tự động từ VITA Platform
Mã yêu cầu: ${selectedRequest?.id || 'N/A'}
Thời gian: ${new Date().toLocaleString('vi-VN')}
`
                      );
                      window.location.href = `mailto:htx.sinho@vita.vn?subject=${subject}&body=${body}`;
                    }}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors active:scale-98"
                  >
                    <i className="ri-mail-send-line mr-2"></i>
                    Gửi Email
                  </button>
                  <button className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors active:scale-98">
                    <i className="ri-file-text-line mr-2"></i>
                    Tạo hợp đồng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
