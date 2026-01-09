import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProcurementRequest {
  id: string;
  medicinalPlant: string;
  targetKPI: {
    saponinMin: number;
    mr2Min?: number;
    flavonoidMin?: number;
  };
  cultivationStandard: string[];
  quantity: number;
  unit: string;
  deliveryDate: string;
  regionRequirements?: {
    altitudeMin?: number;
    altitudeMax?: number;
    soilType?: string[];
    climate?: string;
  };
  status: 'draft' | 'matching' | 'matched' | 'contracted';
  matchedCoops?: number;
  createdAt: string;
}

export default function EnterpriseProcurementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'create' | 'requests' | 'contracts'>('create');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Plant-Shade Matrix (Ma trận Cây & Bóng)
  const plantShadeMatrix: Record<string, {
    shadeTolerance: string;
    vitaForestryShade: { min: number; max: number; default: number };
    suggestedTrees: string[];
    basePrice: number; // VNĐ/kg
    premiumPrice: number; // VNĐ/kg (VITA Forestry)
  }> = {
    'Sâm Ngọc Linh': {
      shadeTolerance: 'Rất cao (Bắt buộc tán rừng)',
      vitaForestryShade: { min: 70, max: 80, default: 75 },
      suggestedTrees: ['Rừng nguyên sinh', 'Giổi', 'Sưa'],
      basePrice: 25000000,
      premiumPrice: 35000000,
    },
    'Ba Kích': {
      shadeTolerance: 'Trung bình',
      vitaForestryShade: { min: 30, max: 50, default: 40 },
      suggestedTrees: ['Keo lai', 'Gáo (Mega 3P)', 'Xoan đào'],
      basePrice: 15000000,
      premiumPrice: 22000000,
    },
    'Tam Thất': {
      shadeTolerance: 'Cao',
      vitaForestryShade: { min: 60, max: 70, default: 65 },
      suggestedTrees: ['Mắc ca', 'Thông', 'Pơ mu'],
      basePrice: 20000000,
      premiumPrice: 30000000,
    },
    'Đinh Lăng': {
      shadeTolerance: 'Thấp (Ưa sáng một phần)',
      vitaForestryShade: { min: 20, max: 30, default: 25 },
      suggestedTrees: ['Trồng xen dưới tán cây ăn quả'],
      basePrice: 8000000,
      premiumPrice: 12000000,
    },
    'Đương Quy': {
      shadeTolerance: 'Trung bình',
      vitaForestryShade: { min: 40, max: 60, default: 50 },
      suggestedTrees: ['Keo lai', 'Bạch đàn', 'Mega 3P'],
      basePrice: 12000000,
      premiumPrice: 18000000,
    },
    'Cà Gai Leo': {
      shadeTolerance: 'Thấp',
      vitaForestryShade: { min: 20, max: 40, default: 30 },
      suggestedTrees: ['Cây bụi', 'Cây ăn quả'],
      basePrice: 10000000,
      premiumPrice: 15000000,
    },
  };

  // Form state
  const [formData, setFormData] = useState({
    medicinalPlant: '',
    saponinMin: '',
    mr2Min: '',
    flavonoidMin: '',
    cultivationStandard: [] as string[],
    cultivationMethod: 'vita-forestry' as 'vita-forestry' | 'basic', // NEW
    shadeCoverage: 0, // NEW - Auto-set based on plant
    quantity: '',
    deliveryDate: '',
    altitudeMin: '',
    altitudeMax: '',
    soilType: [] as string[],
    climate: '',
  });

  const [requests] = useState<ProcurementRequest[]>([
    {
      id: 'REQ-2024-001',
      medicinalPlant: 'Sâm Ngọc Linh',
      targetKPI: {
        saponinMin: 10,
        mr2Min: 4,
      },
      cultivationStandard: ['GACP-WHO', 'Organic'],
      quantity: 5000,
      unit: 'kg',
      deliveryDate: '2026-12-15',
      regionRequirements: {
        altitudeMin: 1500,
        soilType: ['Đất mùn trên núi đá'],
      },
      status: 'matched',
      matchedCoops: 3,
      createdAt: '2024-01-15',
    },
    {
      id: 'REQ-2024-002',
      medicinalPlant: 'Đương Quy',
      targetKPI: {
        saponinMin: 8,
        flavonoidMin: 3.5,
      },
      cultivationStandard: ['VietGAP', 'Organic'],
      quantity: 3000,
      unit: 'kg',
      deliveryDate: '2025-08-20',
      regionRequirements: {
        altitudeMin: 1200,
        altitudeMax: 1800,
      },
      status: 'matching',
      matchedCoops: 5,
      createdAt: '2024-02-01',
    },
  ]);

  const medicinalPlants = [
    'Sâm Ngọc Linh',
    'Đương Quy',
    'Cà Gai Leo',
    'Ba Kích',
    'Hoàng Tinh',
    'Bạch Truật',
  ];

  const cultivationStandards = [
    'GACP-WHO',
    'Organic USDA',
    'Organic EU',
    'VietGAP',
    'GlobalGAP',
    'Tiêu chuẩn riêng của Doanh nghiệp',
  ];

  const soilTypes = [
    'Đất mùn trên núi đá',
    'Đất đỏ Bazan',
    'Đất xám',
    'Đất phù sa',
    'Đất đá ong',
  ];

  const handleStandardToggle = (standard: string) => {
    setFormData(prev => ({
      ...prev,
      cultivationStandard: prev.cultivationStandard.includes(standard)
        ? prev.cultivationStandard.filter(s => s !== standard)
        : [...prev.cultivationStandard, standard]
    }));
  };

  const handleSoilTypeToggle = (soil: string) => {
    setFormData(prev => ({
      ...prev,
      soilType: prev.soilType.includes(soil)
        ? prev.soilType.filter(s => s !== soil)
        : [...prev.soilType, soil]
    }));
  };

  const handleSubmit = () => {
    alert('Yêu cầu đặt trồng đã được gửi! Hệ thống đang phân tích và tìm kiếm HTX phù hợp...');
    setActiveTab('requests');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return { text: 'Nháp', color: 'bg-gray-100 text-gray-700' };
      case 'matching':
        return { text: 'Đang khớp lệnh', color: 'bg-blue-100 text-blue-700' };
      case 'matched':
        return { text: 'Đã tìm thấy HTX', color: 'bg-emerald-100 text-emerald-700' };
      case 'contracted':
        return { text: 'Đã ký hợp đồng', color: 'bg-purple-100 text-purple-700' };
      default:
        return { text: 'Không xác định', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/partner')}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Lập Kế hoạch Thu mua</h1>
                <p className="text-sm opacity-90">Procurement Planning Tool</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'create'
                  ? 'bg-white text-slate-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-add-circle-line mr-2"></i>
              Tạo yêu cầu mới
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'requests'
                  ? 'bg-white text-slate-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              Yêu cầu của tôi
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'contracts'
                  ? 'bg-white text-slate-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-file-text-line mr-2"></i>
              Hợp đồng bao tiêu
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Tab: Tạo yêu cầu */}
        {activeTab === 'create' && (
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Hệ thống khớp lệnh thông minh</h3>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Nhập các thông số kỹ thuật chi tiết về dược liệu bạn cần. Hệ thống sẽ tự động phân tích và chỉ gửi yêu cầu đến các HTX có <strong>thổ nhưỡng phù hợp</strong>, đảm bảo sản phẩm đạt tiêu chuẩn dược tính.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">Thông tin yêu cầu</h2>

              {/* Loại dược liệu */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="ri-plant-line text-emerald-600 mr-1"></i>
                  Loại dược liệu <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.medicinalPlant}
                  onChange={(e) => {
                    const selectedPlant = e.target.value;
                    if (selectedPlant && plantShadeMatrix[selectedPlant]) {
                      // Auto-set VITA Forestry as default and set shade coverage
                      setFormData({
                        ...formData,
                        medicinalPlant: selectedPlant,
                        cultivationMethod: 'vita-forestry',
                        shadeCoverage: plantShadeMatrix[selectedPlant].vitaForestryShade.default,
                      });
                    } else {
                      setFormData({ ...formData, medicinalPlant: selectedPlant });
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none"
                >
                  <option value="">-- Chọn loại dược liệu --</option>
                  {medicinalPlants.map(plant => (
                    <option key={plant} value={plant}>{plant}</option>
                  ))}
                </select>
                {formData.medicinalPlant && plantShadeMatrix[formData.medicinalPlant] && (
                  <p className="text-xs text-gray-500 mt-2">
                    <i className="ri-information-line mr-1"></i>
                    Mức độ ưa bóng: <strong>{plantShadeMatrix[formData.medicinalPlant].shadeTolerance}</strong>
                  </p>
                )}
              </div>

              {/* Mục tiêu hoạt chất */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  <i className="ri-flask-line text-purple-600 mr-1"></i>
                  Mục tiêu hoạt chất (Target KPI) <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Saponin tổng (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="VD: 10"
                      value={formData.saponinMin}
                      onChange={(e) => setFormData({ ...formData, saponinMin: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">MR2 (%) - Tùy chọn</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="VD: 4"
                      value={formData.mr2Min}
                      onChange={(e) => setFormData({ ...formData, mr2Min: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Flavonoid (%) - Tùy chọn</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="VD: 3.5"
                      value={formData.flavonoidMin}
                      onChange={(e) => setFormData({ ...formData, flavonoidMin: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tiêu chuẩn canh tác */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="ri-shield-check-line text-blue-600 mr-1"></i>
                  Tiêu chuẩn canh tác <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cultivationStandards.map(standard => (
                    <button
                      key={standard}
                      onClick={() => handleStandardToggle(standard)}
                      className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.cultivationStandard.includes(standard)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <i className={`ri-${formData.cultivationStandard.includes(standard) ? 'checkbox' : 'checkbox-blank'}-circle-line mr-1`}></i>
                      {standard}
                    </button>
                  ))}
                </div>
              </div>

              {/* TÙY CHỌN TIÊU CHUẨN CANH TÁC (CULTIVATION STANDARD) - NEW */}
              {formData.medicinalPlant && plantShadeMatrix[formData.medicinalPlant] && (
                <div className="mb-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-tree-line text-emerald-600"></i>
                    🎯 Tùy chọn Tiêu chuẩn Canh tác (Cultivation Standard)
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Option 1: VITA Forestry - Recommended */}
                    <div
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.cultivationMethod === 'vita-forestry'
                          ? 'border-emerald-500 bg-emerald-100 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-emerald-300'
                      }`}
                      onClick={() => {
                        const plant = plantShadeMatrix[formData.medicinalPlant];
                        setFormData({
                          ...formData,
                          cultivationMethod: 'vita-forestry',
                          shadeCoverage: plant.vitaForestryShade.default,
                        });
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.cultivationMethod === 'vita-forestry'
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-gray-300'
                          }`}>
                            {formData.cultivationMethod === 'vita-forestry' && (
                              <i className="ri-check-line text-white text-sm"></i>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                              ✅ LỰA CHỌN 1: TIÊU CHUẨN VITA LÂM SINH (VITA FORESTRY)
                              <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">MẶC ĐỊNH (RECOMMENDED)</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 ml-9">
                        Dược liệu được trồng dưới tán rừng tự nhiên hoặc rừng trồng đa tầng (Cây gỗ lớn). 
                        <strong className="text-red-600"> Tuyệt đối không dùng lưới đen nhân tạo.</strong>
                      </p>
                      <div className="ml-9 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-sun-cloudy-line text-emerald-600"></i>
                          <span className="text-gray-700">
                            <strong>Độ che phủ (Canopy):</strong> Tự động điều chỉnh - 
                            <span className="font-bold text-emerald-600">
                              {plantShadeMatrix[formData.medicinalPlant].vitaForestryShade.min}% - {plantShadeMatrix[formData.medicinalPlant].vitaForestryShade.max}%
                            </span>
                            {' '}(Mặc định: {plantShadeMatrix[formData.medicinalPlant].vitaForestryShade.default}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-money-dollar-circle-line text-emerald-600"></i>
                          <span className="text-gray-700">
                            <strong>Giá đề xuất:</strong>{' '}
                            <span className="font-bold text-emerald-600 text-lg">
                              {plantShadeMatrix[formData.medicinalPlant].premiumPrice.toLocaleString('vi-VN')} VNĐ/kg
                            </span>
                            {' '}(Giá Premium)
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <i className="ri-star-line text-emerald-600 mt-0.5"></i>
                          <span className="text-gray-700">
                            <strong>Lợi ích:</strong> Dược tính cao nhất + Được cấp Tín chỉ Carbon + Logo "Forest Grown" trên bao bì sản phẩm
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <i className="ri-plant-line text-emerald-600 mt-0.5"></i>
                          <span className="text-gray-700">
                            <strong>Gợi ý cây rừng che bóng:</strong> {plantShadeMatrix[formData.medicinalPlant].suggestedTrees.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Basic Standard */}
                    <div
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.cultivationMethod === 'basic'
                          ? 'border-gray-400 bg-gray-100 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          cultivationMethod: 'basic',
                          shadeCoverage: 0,
                        });
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.cultivationMethod === 'basic'
                              ? 'border-gray-600 bg-gray-600'
                              : 'border-gray-300'
                          }`}>
                            {formData.cultivationMethod === 'basic' && (
                              <i className="ri-check-line text-white text-sm"></i>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              ⚪ LỰA CHỌN 2: TIÊU CHUẨN CƠ BẢN (BASIC STANDARD)
                            </h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 ml-9">
                        Dược liệu trồng thâm canh, che bóng bằng lưới hoặc cây bụi thấp.
                      </p>
                      <div className="ml-9 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-sun-cloudy-line text-gray-600"></i>
                          <span className="text-gray-700">
                            <strong>Độ che phủ:</strong> Đạt mức tối thiểu để cây sống
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-money-dollar-circle-line text-gray-600"></i>
                          <span className="text-gray-700">
                            <strong>Giá đề xuất:</strong>{' '}
                            <span className="font-bold text-gray-600 text-lg">
                              {plantShadeMatrix[formData.medicinalPlant].basePrice.toLocaleString('vi-VN')} VNĐ/kg
                            </span>
                            {' '}(Giá Base)
                          </span>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-sm">
                          <p className="text-yellow-800">
                            <i className="ri-error-warning-line mr-2"></i>
                            <strong>Cảnh báo:</strong> Không đạt tiêu chuẩn xuất khẩu sang thị trường cao cấp (EU/US). 
                            Không có tín chỉ Carbon đi kèm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Comparison */}
                  {formData.cultivationMethod && (
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-emerald-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Giá trị đơn hàng dự kiến</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            {formData.quantity && formData.cultivationMethod === 'vita-forestry'
                              ? (parseFloat(formData.quantity) * plantShadeMatrix[formData.medicinalPlant].premiumPrice / 1000000).toFixed(1) + ' tỷ VNĐ'
                              : formData.quantity && formData.cultivationMethod === 'basic'
                              ? (parseFloat(formData.quantity) * plantShadeMatrix[formData.medicinalPlant].basePrice / 1000000).toFixed(1) + ' tỷ VNĐ'
                              : '0 tỷ VNĐ'}
                          </p>
                        </div>
                        {formData.cultivationMethod === 'vita-forestry' && (
                          <div className="text-right">
                            <p className="text-xs text-gray-600 mb-1">Chênh lệch so với Basic</p>
                            <p className="text-lg font-bold text-emerald-600">
                              +{((plantShadeMatrix[formData.medicinalPlant].premiumPrice / plantShadeMatrix[formData.medicinalPlant].basePrice - 1) * 100).toFixed(0)}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sản lượng & Thời gian */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="ri-scales-3-line text-orange-600 mr-1"></i>
                    Sản lượng cần thiết <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="5000"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none"
                    />
                    <select className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none">
                      <option>kg</option>
                      <option>tấn</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="ri-calendar-line text-teal-600 mr-1"></i>
                    Thời điểm cần hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full mb-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium text-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className={`ri-arrow-${showAdvanced ? 'up' : 'down'}-s-line text-xl`}></i>
                {showAdvanced ? 'Ẩn' : 'Hiện'} yêu cầu vùng trồng (Tùy chọn)
              </button>

              {/* Advanced: Yêu cầu vùng trồng */}
              {showAdvanced && (
                <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">
                    <i className="ri-map-pin-line mr-1"></i>
                    Yêu cầu vùng trồng (Tùy chọn)
                  </h3>
                  <p className="text-xs text-amber-700 mb-4">
                    Nếu bạn hiểu biết về điều kiện thổ nhưỡng, có thể chỉ định cụ thể. Nếu không, để trống để hệ thống tự động gợi ý dựa trên loại dược liệu.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Độ cao tối thiểu (m)</label>
                      <input
                        type="number"
                        placeholder="VD: 1500"
                        value={formData.altitudeMin}
                        onChange={(e) => setFormData({ ...formData, altitudeMin: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">Độ cao tối đa (m)</label>
                      <input
                        type="number"
                        placeholder="VD: 2000"
                        value={formData.altitudeMax}
                        onChange={(e) => setFormData({ ...formData, altitudeMax: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-700 mb-2">Loại đất yêu cầu</label>
                    <div className="grid grid-cols-2 gap-2">
                      {soilTypes.map(soil => (
                        <button
                          key={soil}
                          onClick={() => handleSoilTypeToggle(soil)}
                          className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                            formData.soilType.includes(soil)
                              ? 'border-amber-500 bg-amber-100 text-amber-800'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                          }`}
                        >
                          <i className={`ri-${formData.soilType.includes(soil) ? 'checkbox' : 'checkbox-blank'}-circle-line mr-1`}></i>
                          {soil}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-xl font-bold text-lg hover:from-slate-700 hover:to-gray-800 transition-all shadow-lg active:scale-98"
              >
                <i className="ri-send-plane-fill mr-2"></i>
                Gửi yêu cầu & Tìm HTX phù hợp
              </button>
            </div>
          </div>
        )}

        {/* Tab: Yêu cầu của tôi */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.map(request => {
              const statusBadge = getStatusBadge(request.status);
              return (
                <div key={request.id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{request.medicinalPlant}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                          {statusBadge.text}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Mã yêu cầu: {request.id} • Tạo ngày {request.createdAt}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Saponin tối thiểu</div>
                      <div className="text-lg font-bold text-purple-600">&gt; {request.targetKPI.saponinMin}%</div>
                    </div>
                    {request.targetKPI.mr2Min && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">MR2 tối thiểu</div>
                        <div className="text-lg font-bold text-blue-600">&gt; {request.targetKPI.mr2Min}%</div>
                      </div>
                    )}
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Sản lượng</div>
                      <div className="text-lg font-bold text-orange-600">{request.quantity} {request.unit}</div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Giao hàng</div>
                      <div className="text-sm font-bold text-teal-600">{request.deliveryDate}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2">Tiêu chuẩn canh tác:</div>
                    <div className="flex flex-wrap gap-2">
                      {request.cultivationStandard.map(std => (
                        <span key={std} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                  {request.status === 'matched' && (
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <i className="ri-checkbox-circle-fill text-2xl text-emerald-600"></i>
                        <div>
                          <h4 className="font-bold text-emerald-900 mb-1">Đã tìm thấy {request.matchedCoops} HTX phù hợp!</h4>
                          <p className="text-sm text-emerald-700">
                            Hệ thống đã phân tích và tìm thấy các HTX có thổ nhưỡng đáp ứng yêu cầu của bạn. Click để xem chi tiết và chọn HTX.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {request.status === 'matching' && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1">Đang phân tích & khớp lệnh...</h4>
                          <p className="text-sm text-blue-700">
                            Hệ thống đang quét cơ sở dữ liệu thổ nhưỡng của {request.matchedCoops} HTX. Dự kiến hoàn thành trong 2-3 phút.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/enterprise-matching', { state: { requestId: request.id } })}
                      className="flex-1 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Xem chi tiết
                    </button>
                    {request.status === 'matched' && (
                      <button className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                        <i className="ri-team-line mr-2"></i>
                        Xem HTX phù hợp ({request.matchedCoops})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Hợp đồng */}
        {activeTab === 'contracts' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center py-12">
              <i className="ri-file-text-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-lg text-gray-500 font-medium">Chưa có hợp đồng bao tiêu nào</p>
              <p className="text-sm text-gray-400 mt-2">Hợp đồng sẽ xuất hiện sau khi bạn ký kết với HTX</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
