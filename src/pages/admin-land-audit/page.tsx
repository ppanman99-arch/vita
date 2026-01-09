import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';
import BackButton from '../../components/shared/BackButton';

interface LandLot {
  id: string;
  ownerName: string;
  ownerId: string;
  status: 'pending' | 'auditing' | 'approved' | 'rejected';
  requestDate: string;
  // Tab A: GIS & Legal
  polygon?: { lat: number; lng: number }[];
  landType?: 'production-forest' | 'protection-forest' | 'agricultural';
  landCertificate?: string; // URL to uploaded image
  mapSheet?: string;
  plotNumber?: string;
  // Tab B: Soil & Climate
  altitude?: number;
  slope?: number;
  soilType?: 'loam' | 'sandy-loam' | 'mountain-humus';
  soilDepth?: '>50cm' | '30-50cm' | '<30cm';
  pH?: number;
  waterSource?: 'stream' | 'well' | 'rain-dependent';
  // Tab C: Forest Status
  currentForestType?: 'natural' | 'planted' | 'barren';
  overstoryTree?: string;
  overstoryDiameter?: number;
  overstoryDensity?: number;
  canopyCoverage?: number;
  understory?: 'dense' | 'sparse' | 'cleared';
  // Tab D: Infrastructure
  distanceToRoad?: number;
  roadType?: 'asphalt' | 'concrete' | 'dirt-path';
  phoneSignal?: '4g-good' | '4g-weak' | 'no-signal';
  // Tab E: History
  diseaseHistory?: boolean;
  chemicalHistory?: boolean;
  // Scoring
  ginsengScore?: number;
  timberScore?: number;
  recommendations?: string[];
}

export default function AdminLandAuditPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'auditing' | 'land-bank'>('pending');
  const [selectedLot, setSelectedLot] = useState<LandLot | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditTab, setAuditTab] = useState<'gis' | 'soil' | 'forest' | 'infrastructure' | 'history'>('gis');
  const [auditForm, setAuditForm] = useState<Partial<LandLot>>({});

  // Mock data: Pending land requests
  const pendingLots: LandLot[] = [
    {
      id: 'LOT-REQ-001',
      ownerName: 'Nguyễn Văn A',
      ownerId: 'MEMBER-001',
      status: 'pending',
      requestDate: '2024-01-20',
    },
    {
      id: 'LOT-REQ-002',
      ownerName: 'Trần Thị B',
      ownerId: 'MEMBER-002',
      status: 'pending',
      requestDate: '2024-01-21',
    },
  ];

  // Mock data: Land Bank
  const landBank: LandLot[] = [
    {
      id: 'LOT-001',
      ownerName: 'Nguyễn Văn C',
      ownerId: 'MEMBER-003',
      status: 'approved',
      requestDate: '2024-01-15',
      polygon: [{ lat: 14.5, lng: 108.0 }, { lat: 14.6, lng: 108.0 }, { lat: 14.6, lng: 108.1 }, { lat: 14.5, lng: 108.1 }],
      landType: 'production-forest',
      altitude: 1450,
      slope: 25,
      soilType: 'mountain-humus',
      soilDepth: '>50cm',
      pH: 5.5,
      waterSource: 'stream',
      currentForestType: 'natural',
      overstoryTree: 'Dẻ, Sồi',
      overstoryDiameter: 20,
      overstoryDensity: 600,
      canopyCoverage: 65,
      understory: 'sparse',
      distanceToRoad: 2,
      roadType: 'dirt-path',
      phoneSignal: '4g-weak',
      diseaseHistory: false,
      chemicalHistory: false,
      ginsengScore: 95,
      timberScore: 40,
      recommendations: ['Đất Vàng cho dược liệu dưới tán rừng', 'Nên quy hoạch trồng Sâm hoặc Tam Thất', 'Cần cải tạo đường đi'],
    },
  ];

  const handleStartAudit = (lot: LandLot) => {
    setSelectedLot(lot);
    setAuditForm({ id: lot.id, ownerName: lot.ownerName, ownerId: lot.ownerId });
    setShowAuditModal(true);
    setAuditTab('gis');
  };

  const calculateLandScore = () => {
    // AI Scoring Algorithm
    let ginsengScore = 0;
    let timberScore = 0;
    const recommendations: string[] = [];

    // Ginseng scoring
    if (auditForm.altitude && auditForm.altitude >= 1400 && auditForm.altitude <= 2000) ginsengScore += 30;
    if (auditForm.soilType === 'mountain-humus') ginsengScore += 25;
    if (auditForm.soilDepth === '>50cm') ginsengScore += 20;
    if (auditForm.canopyCoverage && auditForm.canopyCoverage >= 60 && auditForm.canopyCoverage <= 75) ginsengScore += 20;
    if (auditForm.pH && auditForm.pH >= 5.0 && auditForm.pH <= 6.5) ginsengScore += 5;

    // Timber scoring
    if (auditForm.slope && auditForm.slope < 30) timberScore += 30;
    if (auditForm.distanceToRoad && auditForm.distanceToRoad < 5) timberScore += 25;
    if (auditForm.roadType === 'asphalt' || auditForm.roadType === 'concrete') timberScore += 20;
    if (auditForm.soilDepth === '>50cm') timberScore += 15;
    if (auditForm.phoneSignal === '4g-good') timberScore += 10;

    // Recommendations
    if (ginsengScore >= 80) {
      recommendations.push('Đất Vàng cho dược liệu dưới tán rừng');
      recommendations.push('Nên quy hoạch trồng Sâm hoặc Tam Thất');
    }
    if (timberScore < 50 && auditForm.slope && auditForm.slope > 30) {
      recommendations.push('Đất quá dốc, khó khai thác gỗ');
    }
    if (auditForm.distanceToRoad && auditForm.distanceToRoad > 3) {
      recommendations.push('Cần cải tạo đường đi');
    }

    return { ginsengScore, timberScore, recommendations };
  };

  const handleSaveAudit = () => {
    const scores = calculateLandScore();
    setAuditForm({
      ...auditForm,
      ...scores,
    });
    alert('Đã lưu thẩm định! Bạn có thể tiếp tục điền các thẻ khác hoặc hoàn tất.');
  };

  const handleSubmitAudit = () => {
    const scores = calculateLandScore();
    const finalForm = {
      ...auditForm,
      ...scores,
      status: 'approved' as const,
    };
    alert(`Đã hoàn tất thẩm định!\n\nĐiểm Sâm Ngọc Linh: ${scores.ginsengScore}/100\nĐiểm Trồng Gỗ: ${scores.timberScore}/100\n\nĐất đã được thêm vào Ngân hàng Đất.`);
    setShowAuditModal(false);
    setAuditForm({});
    setSelectedLot(null);
  };

  const getStatusColor = (status: LandLot['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'auditing': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: LandLot['status']) => {
    switch (status) {
      case 'pending': return 'Chờ thẩm định';
      case 'auditing': return 'Đang thẩm định';
      case 'approved': return 'Đã duyệt';
      case 'rejected': return 'Đã từ chối';
      default: return 'Không rõ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <TopBar title="Thẩm định & Nhập liệu Vùng trồng" />
      
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              <i className="ri-map-2-line text-amber-600 mr-2"></i>
              Công cụ Thẩm định & Nhập liệu Vùng trồng
            </h1>
            <p className="text-gray-600">
              Số hóa tài nguyên đất - Biến "đất rừng vật lý" thành "tài sản số"
            </p>
          </div>
          <BackButton />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2">
          <div className="flex gap-2">
            {[
              { id: 'pending', name: 'Hồ sơ chờ duyệt', icon: 'ri-time-line', count: pendingLots.length },
              { id: 'auditing', name: 'Đang thẩm định', icon: 'ri-file-edit-line', count: 0 },
              { id: 'land-bank', name: 'Ngân hàng Đất', icon: 'ri-bank-line', count: landBank.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Hồ sơ Đất chờ Thẩm định
            </h2>
            <p className="text-gray-600 mb-6">
              Các yêu cầu góp đất từ xã viên đang chờ cán bộ kỹ thuật xuống hiện trường thẩm định
            </p>
            
            <div className="space-y-4">
              {pendingLots.map(lot => (
                <div key={lot.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{lot.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lot.status)}`}>
                          {getStatusText(lot.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Chủ đất</p>
                          <p className="font-semibold text-gray-900">{lot.ownerName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mã xã viên</p>
                          <p className="font-semibold text-gray-900">{lot.ownerId}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ngày yêu cầu</p>
                          <p className="font-semibold text-gray-900">{lot.requestDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Thời gian chờ</p>
                          <p className="font-semibold text-amber-600">
                            {Math.floor((Date.now() - new Date(lot.requestDate).getTime()) / (1000 * 60 * 60 * 24))} ngày
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartAudit(lot)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                  >
                    <i className="ri-file-edit-line mr-2"></i>
                    Bắt đầu Thẩm định
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'land-bank' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ngân hàng Đất (Land Bank)
              </h2>
              <p className="text-gray-600 mb-6">
                Các lô đất đã được thẩm định và chính thức gia nhập hệ thống
              </p>

              {/* Map Legend */}
              <div className="flex gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Chưa có kế hoạch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Đã có kế hoạch trồng</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>Đất có vấn đề</span>
                </div>
              </div>

              <div className="space-y-4">
                {landBank.map(lot => (
                  <div key={lot.id} className="border-2 border-green-200 bg-green-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{lot.id}</h3>
                          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                            Đã duyệt
                          </span>
                          {lot.ginsengScore && (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                              Điểm Sâm: {lot.ginsengScore}/100
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-600">Chủ đất</p>
                            <p className="font-semibold">{lot.ownerName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Độ cao</p>
                            <p className="font-semibold">{lot.altitude}m</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Độ che phủ</p>
                            <p className="font-semibold">{lot.canopyCoverage}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Loại đất</p>
                            <p className="font-semibold">
                              {lot.soilType === 'mountain-humus' ? 'Đất mùn núi' : lot.soilType}
                            </p>
                          </div>
                        </div>
                        {lot.recommendations && lot.recommendations.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-emerald-200">
                            <p className="text-sm font-semibold text-gray-900 mb-2">Đề xuất:</p>
                            <ul className="space-y-1">
                              {lot.recommendations.map((rec, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedLot(lot);
                        setShowAuditModal(true);
                        setAuditForm(lot);
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Modal */}
        {showAuditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Thẩm định & Nhập liệu Vùng trồng
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Lô đất: <strong>{selectedLot?.id}</strong> - Chủ đất: <strong>{selectedLot?.ownerName}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAuditModal(false);
                      setAuditForm({});
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <i className="ri-close-line text-2xl text-gray-500"></i>
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {[
                    { id: 'gis', name: 'A. Định vị & Pháp lý', icon: 'ri-map-pin-line' },
                    { id: 'soil', name: 'B. Thổ nhưỡng & Khí hậu', icon: 'ri-landscape-line' },
                    { id: 'forest', name: 'C. Hiện trạng Rừng', icon: 'ri-tree-line' },
                    { id: 'infrastructure', name: 'D. Hạ tầng & Logistics', icon: 'ri-road-map-line' },
                    { id: 'history', name: 'E. Lịch sử Canh tác', icon: 'ri-history-line' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAuditTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                        auditTab === tab.id
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className={tab.icon}></i>
                      <span className="text-sm">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Tab A: GIS & Legal */}
                {auditTab === 'gis' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="ri-map-pin-line text-amber-600"></i>
                        Định vị & Pháp lý (GIS & Legal)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Vẽ ranh giới và nhập thông tin pháp lý đất đai
                      </p>
                    </div>

                    {/* Polygon Drawing */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                      <h5 className="font-semibold text-gray-900 mb-3">Vẽ ranh giới (Polygon Drawing)</h5>
                      <div className="bg-gray-100 rounded-lg p-8 text-center mb-4 border-2 border-dashed border-gray-300">
                        <i className="ri-map-2-line text-6xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600 mb-2">Bản đồ vệ tinh</p>
                        <p className="text-xs text-gray-500 mb-4">
                          Cán bộ đi vòng quanh lô đất, App tự động vẽ đường bao qua GPS
                        </p>
                        <div className="flex gap-2 justify-center">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm">
                            <i className="ri-gps-line mr-2"></i>
                            Bắt đầu theo dõi GPS
                          </button>
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                            <i className="ri-map-pin-add-line mr-2"></i>
                            Chấm điểm mốc thủ công
                          </button>
                        </div>
                      </div>
                      {auditForm.polygon && auditForm.polygon.length > 0 && (
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Đã vẽ {auditForm.polygon.length} điểm. Diện tích ước tính: <strong>5.2 ha</strong>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Legal Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loại đất <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'production-forest', label: 'Rừng sản xuất' },
                            { value: 'protection-forest', label: 'Rừng phòng hộ' },
                            { value: 'agricultural', label: 'Đất nông nghiệp' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.landType === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="landType"
                                value={option.value}
                                checked={auditForm.landType === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, landType: e.target.value as any })}
                                className="form-radio h-4 w-4 text-amber-600"
                              />
                              <span className="text-sm font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload ảnh Sổ đỏ/Giấy giao đất
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
                          <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                          <p className="text-sm text-gray-600">Kéo thả ảnh hoặc click để chọn</p>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG (tối đa 5MB)</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã tờ bản đồ
                          </label>
                          <input
                            type="text"
                            value={auditForm.mapSheet || ''}
                            onChange={(e) => setAuditForm({ ...auditForm, mapSheet: e.target.value })}
                            placeholder="VD: 123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã thửa
                          </label>
                          <input
                            type="text"
                            value={auditForm.plotNumber || ''}
                            onChange={(e) => setAuditForm({ ...auditForm, plotNumber: e.target.value })}
                            placeholder="VD: 456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab B: Soil & Climate */}
                {auditTab === 'soil' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="ri-landscape-line text-amber-600"></i>
                        Thổ nhưỡng & Khí hậu (Soil & Climate)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Các thông số quyết định đất trồng được cây gì
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Độ cao (Altitude) - Tự động từ GPS
                        </label>
                        <input
                          type="number"
                          value={auditForm.altitude || ''}
                          onChange={(e) => setAuditForm({ ...auditForm, altitude: parseFloat(e.target.value) })}
                          placeholder="VD: 1450"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Hệ thống tự lấy từ GPS</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Độ dốc (Slope) - độ
                        </label>
                        <input
                          type="number"
                          value={auditForm.slope || ''}
                          onChange={(e) => setAuditForm({ ...auditForm, slope: parseFloat(e.target.value) })}
                          placeholder="VD: 25"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Cán bộ đo hoặc hệ thống tính</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tính chất đất (Soil Type)
                        </label>
                        <select
                          value={auditForm.soilType || ''}
                          onChange={(e) => setAuditForm({ ...auditForm, soilType: e.target.value as any })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="">Chọn loại đất</option>
                          <option value="loam">Đất thịt</option>
                          <option value="sandy-loam">Đất pha cát</option>
                          <option value="mountain-humus">Đất mùn núi đá</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Độ dày tầng canh tác
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: '>50cm', label: '>50cm' },
                            { value: '30-50cm', label: '30-50cm' },
                            { value: '<30cm', label: '<30cm' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.soilDepth === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="soilDepth"
                                value={option.value}
                                checked={auditForm.soilDepth === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, soilDepth: e.target.value as any })}
                                className="form-radio h-3 w-3 text-amber-600"
                              />
                              <span className="text-xs font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Độ pH (nếu có bút đo nhanh)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={auditForm.pH || ''}
                          onChange={(e) => setAuditForm({ ...auditForm, pH: parseFloat(e.target.value) })}
                          placeholder="VD: 5.5"
                          min="0"
                          max="14"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nguồn nước
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 'stream', label: 'Có suối', icon: 'ri-water-percent-line' },
                            { value: 'well', label: 'Phải khoan giếng', icon: 'ri-drill-line' },
                            { value: 'rain-dependent', label: 'Phụ thuộc mưa', icon: 'ri-cloud-line' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.waterSource === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="waterSource"
                                value={option.value}
                                checked={auditForm.waterSource === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, waterSource: e.target.value as any })}
                                className="form-radio h-3 w-3 text-amber-600"
                              />
                              <i className={`${option.icon} text-lg ml-2 ${auditForm.waterSource === option.value ? 'text-amber-600' : 'text-gray-400'}`}></i>
                              <span className="text-xs font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab C: Forest Status */}
                {auditTab === 'forest' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="ri-tree-line text-amber-600"></i>
                        Hiện trạng Rừng & Che phủ (Forest Status)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Dữ liệu phục vụ cho các đơn hàng B2B cần bóng và ESG
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loại rừng hiện tại
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'natural', label: 'Rừng tự nhiên' },
                            { value: 'planted', label: 'Rừng trồng (Keo/Thông)' },
                            { value: 'barren', label: 'Đất trống đồi trọc' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.currentForestType === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="currentForestType"
                                value={option.value}
                                checked={auditForm.currentForestType === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, currentForestType: e.target.value as any })}
                                className="form-radio h-4 w-4 text-amber-600"
                              />
                              <span className="text-sm font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {auditForm.currentForestType === 'natural' || auditForm.currentForestType === 'planted' ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loại cây chủ đạo (Overstory)
                              </label>
                              <input
                                type="text"
                                value={auditForm.overstoryTree || ''}
                                onChange={(e) => setAuditForm({ ...auditForm, overstoryTree: e.target.value })}
                                placeholder="VD: Dẻ, Sồi"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đường kính trung bình (D1.3) - cm
                              </label>
                              <input
                                type="number"
                                value={auditForm.overstoryDiameter || ''}
                                onChange={(e) => setAuditForm({ ...auditForm, overstoryDiameter: parseFloat(e.target.value) })}
                                placeholder="VD: 20"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật độ - cây/ha
                              </label>
                              <input
                                type="number"
                                value={auditForm.overstoryDensity || ''}
                                onChange={(e) => setAuditForm({ ...auditForm, overstoryDensity: parseFloat(e.target.value) })}
                                placeholder="VD: 600"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                          </div>

                          {/* Canopy Coverage AI */}
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <i className="ri-camera-line text-green-600"></i>
                              Tỷ lệ che phủ thực tế (Canopy Coverage) - AI Hỗ trợ
                            </h5>
                            <p className="text-sm text-gray-600 mb-4">
                              Cán bộ đứng tại 5 điểm khác nhau trong lô đất, chụp ảnh ngước lên trời. App tự động phân tích.
                            </p>
                            <div className="grid grid-cols-5 gap-2 mb-4">
                              {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
                                  <i className="ri-camera-line text-2xl text-gray-400 mb-2"></i>
                                  <p className="text-xs text-gray-600">Điểm {i}</p>
                                  <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                                    Chụp ảnh
                                  </button>
                                </div>
                              ))}
                            </div>
                            {auditForm.canopyCoverage ? (
                              <div className="bg-white p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Kết quả phân tích AI:</p>
                                <p className="text-3xl font-bold text-green-600">{auditForm.canopyCoverage}%</p>
                                <p className="text-xs text-gray-500 mt-1">Trung bình từ 5 điểm đo</p>
                              </div>
                            ) : (
                              <button
                                onClick={() => setAuditForm({ ...auditForm, canopyCoverage: 65 })}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                              >
                                <i className="ri-magic-line mr-2"></i>
                                Phân tích AI (Demo: 65%)
                              </button>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Thực bì (Understory)
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { value: 'dense', label: 'Dày' },
                                { value: 'sparse', label: 'Thưa' },
                                { value: 'cleared', label: 'Đã dọn sạch' },
                              ].map(option => (
                                <label
                                  key={option.value}
                                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                                    auditForm.understory === option.value
                                      ? 'border-amber-500 bg-amber-50'
                                      : 'border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="understory"
                                    value={option.value}
                                    checked={auditForm.understory === option.value}
                                    onChange={(e) => setAuditForm({ ...auditForm, understory: e.target.value as any })}
                                    className="form-radio h-4 w-4 text-amber-600"
                                  />
                                  <span className="text-sm font-medium text-gray-700 ml-2">{option.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Tab D: Infrastructure */}
                {auditTab === 'infrastructure' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="ri-road-map-line text-amber-600"></i>
                        Hạ tầng & Logistics (Infrastructure)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Quyết định chi phí vận chuyển và khả năng cơ giới hóa
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Khoảng cách ra đường xe tải - km
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={auditForm.distanceToRoad || ''}
                          onChange={(e) => setAuditForm({ ...auditForm, distanceToRoad: parseFloat(e.target.value) })}
                          placeholder="VD: 2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loại đường tiếp cận
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 'asphalt', label: 'Đường nhựa', icon: 'ri-roadster-line' },
                            { value: 'concrete', label: 'Đường bê tông', icon: 'ri-roadster-line' },
                            { value: 'dirt-path', label: 'Đường mòn', icon: 'ri-motorbike-line' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.roadType === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="roadType"
                                value={option.value}
                                checked={auditForm.roadType === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, roadType: e.target.value as any })}
                                className="form-radio h-3 w-3 text-amber-600"
                              />
                              <i className={`${option.icon} text-lg ml-2 ${auditForm.roadType === option.value ? 'text-amber-600' : 'text-gray-400'}`}></i>
                              <span className="text-xs font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sóng điện thoại
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: '4g-good', label: '4G Tốt' },
                            { value: '4g-weak', label: '4G Yếu' },
                            { value: 'no-signal', label: 'Mất sóng' },
                          ].map(option => (
                            <label
                              key={option.value}
                              className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                                auditForm.phoneSignal === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="phoneSignal"
                                value={option.value}
                                checked={auditForm.phoneSignal === option.value}
                                onChange={(e) => setAuditForm({ ...auditForm, phoneSignal: e.target.value as any })}
                                className="form-radio h-3 w-3 text-amber-600"
                              />
                              <span className="text-xs font-medium text-gray-700 ml-2">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Để biết có cần lắp trạm phát Wifi/LoRa cho thiết bị IoT sau này không
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab E: History */}
                {auditTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="ri-history-line text-amber-600"></i>
                        Lịch sử Canh tác (History)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Phục vụ truy xuất nguồn gốc và chứng nhận Organic/GACP
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={auditForm.diseaseHistory || false}
                            onChange={(e) => setAuditForm({ ...auditForm, diseaseHistory: e.target.checked })}
                            className="form-checkbox h-5 w-5 text-amber-600 rounded mt-1"
                          />
                          <div className="ml-3">
                            <span className="font-semibold text-gray-900">Tiền sử bệnh</span>
                            <p className="text-sm text-gray-600 mt-1">
                              Đất có nấm bệnh không? (Hỏi chủ đất và quan sát thực địa)
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={auditForm.chemicalHistory || false}
                            onChange={(e) => setAuditForm({ ...auditForm, chemicalHistory: e.target.checked })}
                            className="form-checkbox h-5 w-5 text-red-600 rounded mt-1"
                          />
                          <div className="ml-3">
                            <span className="font-semibold text-gray-900">Lịch sử hóa chất</span>
                            <p className="text-sm text-gray-600 mt-1">
                              Trong 3 năm qua có dùng thuốc diệt cỏ không? (Hỏi chủ đất và quan sát thực địa)
                            </p>
                            {auditForm.chemicalHistory && (
                              <p className="text-xs text-red-600 mt-2 font-semibold">
                                ⚠️ Đất này không đủ điều kiện cho chứng nhận Organic/GACP
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Land Scoring AI - Show after all tabs */}
                {(auditForm.altitude || auditForm.soilType || auditForm.canopyCoverage) && (
                  <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <i className="ri-magic-line text-emerald-600"></i>
                      Hồ sơ Sức khỏe Đất (Land Profile Card) - AI Phân tích
                    </h4>
                    {(() => {
                      const scores = calculateLandScore();
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Điểm tiềm năng Sâm Ngọc Linh</p>
                            <p className="text-4xl font-bold text-emerald-600">{scores.ginsengScore}/100</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full transition-all"
                                style={{ width: `${scores.ginsengScore}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Điểm tiềm năng Trồng Gỗ</p>
                            <p className="text-4xl font-bold text-blue-600">{scores.timberScore}/100</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${scores.timberScore}%` }}
                              ></div>
                            </div>
                          </div>
                          {scores.recommendations.length > 0 && (
                            <div className="md:col-span-2 bg-white p-4 rounded-lg">
                              <p className="text-sm font-semibold text-gray-900 mb-2">Đề xuất:</p>
                              <ul className="space-y-1">
                                {scores.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handleSaveAudit}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                >
                  <i className="ri-save-line mr-2"></i>
                  Lưu tạm
                </button>
                <button
                  onClick={handleSubmitAudit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                >
                  <i className="ri-check-line mr-2"></i>
                  Hoàn tất & Phê duyệt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

