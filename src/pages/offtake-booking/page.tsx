import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MatchingResult {
  coopId: string;
  coopName: string;
  region: string;
  matchScore: number;
  landBank: {
    totalArea: number;
    availableArea: number;
    altitude: number;
    soilType: string;
  };
  currentCanopy: number;
  requiredCanopy: number;
  gap: number;
  certifications: string[];
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  recommendations: string[];
}

interface OfftakeOrder {
  orderId: string;
  herbType: string;
  cultivationStandard: string;
  quantity: number;
  unit: string;
  deliveryDate: string;
  targetKPI?: {
    saponin?: number;
    mr2?: number;
  };
  status: 'draft' | 'matching' | 'negotiating' | 'contracted' | 'pending_execution';
}

export default function OfftakeBookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [order, setOrder] = useState<OfftakeOrder>({
    orderId: '',
    herbType: '',
    cultivationStandard: '',
    quantity: 0,
    unit: 'kg',
    deliveryDate: '',
    status: 'draft'
  });
  const [matchingResults, setMatchingResults] = useState<MatchingResult[]>([]);
  const [selectedCoop, setSelectedCoop] = useState<MatchingResult | null>(null);

  const herbTypes = [
    { value: 'sam-ngoc-linh', label: 'Sâm Ngọc Linh', requiresVITA: true, minCanopy: 70 },
    { value: 'dang-sam', label: 'Đẳng Sâm', requiresVITA: true, minCanopy: 60 },
    { value: 'tam-that', label: 'Tam Thất', requiresVITA: true, minCanopy: 65 },
    { value: 'duong-quy', label: 'Đương Quy', requiresVITA: false, minCanopy: 50 },
  ];

  const cultivationStandards = [
    { value: 'vita-forestry', label: 'VITA Lâm Sinh (Bắt buộc che phủ 70%)', premium: true },
    { value: 'gacp-who', label: 'GACP-WHO', premium: false },
    { value: 'organic', label: 'Organic USDA/EU', premium: false },
    { value: 'vietgap', label: 'VietGAP', premium: false },
  ];

  // Bước 1: Tạo lệnh đặt hàng
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `OFFTAKE-${Date.now()}`;
    setOrder({...order, orderId: newOrderId, status: 'matching'});
    setCurrentStep(2);
    // Simulate matching
    simulateMatching();
  };

  // Bước 2: AI Matching
  const simulateMatching = () => {
    // Giả lập thuật toán matching
    setTimeout(() => {
      const selectedHerb = herbTypes.find(h => h.value === order.herbType);
      const selectedStandard = cultivationStandards.find(s => s.value === order.cultivationStandard);
      
      const mockResults: MatchingResult[] = [
        {
          coopId: 'htx-tu-mo-rong',
          coopName: 'HTX Dược Liệu Tu Mơ Rông',
          region: 'Kon Tum',
          matchScore: 88,
          landBank: {
            totalArea: 125.5,
            availableArea: 50.0,
            altitude: 1500,
            soilType: 'Đất mùn trên núi đá'
          },
          currentCanopy: 20,
          requiredCanopy: selectedStandard?.premium ? 70 : 60,
          gap: (selectedStandard?.premium ? 70 : 60) - 20,
          certifications: ['VietGAP'],
          riskLevel: 'medium',
          warnings: ['Độ che phủ rừng hiện tại chỉ đạt 20%, cần trồng thêm 5.000 cây Mega 3P để đạt chuẩn'],
          recommendations: ['Cần đầu tư trồng rừng che bóng trước khi trồng Sâm', 'Thời gian cần: 6-12 tháng']
        },
        {
          coopId: 'htx-sin-ho',
          coopName: 'HTX Dược Liệu Sìn Hồ',
          region: 'Lai Châu',
          matchScore: 95,
          landBank: {
            totalArea: 200.0,
            availableArea: 80.0,
            altitude: 1700,
            soilType: 'Đất mùn trên núi đá'
          },
          currentCanopy: 75,
          requiredCanopy: selectedStandard?.premium ? 70 : 60,
          gap: 0,
          certifications: ['GACP-WHO', 'Organic USDA'],
          riskLevel: 'low',
          warnings: [],
          recommendations: ['HTX đã đáp ứng đầy đủ điều kiện, có thể bắt đầu trồng ngay']
        },
        {
          coopId: 'htx-kon-plong',
          coopName: 'HTX Dược Liệu Kon Plông',
          region: 'Kon Tum',
          matchScore: 82,
          landBank: {
            totalArea: 150.0,
            availableArea: 60.0,
            altitude: 1600,
            soilType: 'Đất mùn trên núi đá'
          },
          currentCanopy: 55,
          requiredCanopy: selectedStandard?.premium ? 70 : 60,
          gap: (selectedStandard?.premium ? 70 : 60) - 55,
          certifications: ['GACP-WHO', 'VietGAP'],
          riskLevel: 'medium',
          warnings: ['Cần trồng thêm 3.000 cây để đạt độ che phủ yêu cầu'],
          recommendations: ['Có thể bắt đầu trồng song song với việc trồng rừng che bóng']
        }
      ];

      setMatchingResults(mockResults);
    }, 2000);
  };

  // Bước 3: Chọn HTX và đàm phán
  const handleSelectCoop = (coop: MatchingResult) => {
    setSelectedCoop(coop);
    setCurrentStep(3);
  };

  // Bước 4: Ký hợp đồng
  const handleContractSign = () => {
    setOrder({...order, status: 'pending_execution'});
    setCurrentStep(4);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/enterprise-procurement')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đặt Hàng Tương Lai (Offtake Booking)</h1>
              <p className="text-sm opacity-90">Bước 1: Tạo lệnh đặt hàng mới</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin đơn hàng</h2>
              <p className="text-gray-600">Điền thông tin để hệ thống tìm HTX phù hợp nhất</p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại dược liệu <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={order.herbType}
                  onChange={(e) => setOrder({...order, herbType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Chọn loại dược liệu</option>
                  {herbTypes.map((herb) => (
                    <option key={herb.value} value={herb.value}>{herb.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tiêu chuẩn canh tác <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {cultivationStandards.map((standard) => (
                    <label
                      key={standard.value}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        order.cultivationStandard === standard.value
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="standard"
                        value={standard.value}
                        checked={order.cultivationStandard === standard.value}
                        onChange={(e) => setOrder({...order, cultivationStandard: e.target.value})}
                        className="mt-1 w-4 h-4 text-indigo-600"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{standard.label}</div>
                        {standard.premium && (
                          <div className="text-xs text-indigo-600 mt-1">
                            <i className="ri-star-line mr-1"></i>
                            Tiêu chuẩn cao cấp - Yêu cầu rừng che phủ tối thiểu 70%
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sản lượng cần <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={order.quantity || ''}
                    onChange={(e) => setOrder({...order, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đơn vị <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={order.unit}
                    onChange={(e) => setOrder({...order, unit: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="ton">Tấn (tấn)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Thời gian cần hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={order.deliveryDate}
                  onChange={(e) => setOrder({...order, deliveryDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <i className="ri-information-line mr-1"></i>
                  Thời gian này sẽ được tính toán để HTX có đủ thời gian trồng và chăm sóc
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-800">
                  <i className="ri-information-line mr-2"></i>
                  Hệ thống sẽ tự động quét "Ngân hàng Đất số" để tìm các HTX phù hợp với yêu cầu của bạn.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Tìm HTX phù hợp → AI Matching
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">AI Matching - Tìm HTX phù hợp</h1>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {matchingResults.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <i className="ri-search-line text-indigo-600 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Đang tìm kiếm HTX phù hợp...</h3>
              <p className="text-gray-600">Hệ thống VITA AI đang quét Ngân hàng Đất số và phân tích năng lực</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Kết quả tìm kiếm</h2>
                <p className="text-gray-600">Tìm thấy {matchingResults.length} HTX phù hợp với yêu cầu</p>
              </div>

              <div className="space-y-6">
                {matchingResults.map((result) => (
                  <div
                    key={result.coopId}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{result.coopName}</h3>
                        <p className="text-gray-600 text-sm">{result.region}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${
                          result.matchScore >= 90 ? 'text-emerald-600' :
                          result.matchScore >= 75 ? 'text-amber-600' : 'text-gray-600'
                        }`}>
                          {result.matchScore}%
                        </div>
                        <p className="text-xs text-gray-500">Độ phù hợp</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Diện tích khả dụng</p>
                        <p className="text-lg font-bold text-gray-900">{result.landBank.availableArea} ha</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Độ cao</p>
                        <p className="text-lg font-bold text-gray-900">{result.landBank.altitude}m</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Che phủ hiện tại</p>
                        <p className="text-lg font-bold text-gray-900">{result.currentCanopy}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Yêu cầu</p>
                        <p className="text-lg font-bold text-gray-900">{result.requiredCanopy}%</p>
                      </div>
                    </div>

                    {result.gap > 0 && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-amber-900 mb-2">
                          <i className="ri-alert-line mr-2"></i>
                          Cảnh báo
                        </p>
                        {result.warnings.map((warning, idx) => (
                          <p key={idx} className="text-sm text-amber-800">{warning}</p>
                        ))}
                      </div>
                    )}

                    {result.recommendations.length > 0 && (
                      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-indigo-900 mb-2">
                          <i className="ri-lightbulb-line mr-2"></i>
                          Gợi ý
                        </p>
                        {result.recommendations.map((rec, idx) => (
                          <p key={idx} className="text-sm text-indigo-800">{rec}</p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-600">Chứng nhận:</span>
                      {result.certifications.map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectCoop(result)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                        result.matchScore >= 90
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl'
                          : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-xl'
                      }`}
                    >
                      {result.matchScore >= 90 ? 'Chọn HTX này' : 'Đàm phán với HTX này'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 3 && selectedCoop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(2)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đàm phán & Ký Hợp đồng</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hợp đồng Bao tiêu Thông minh</h2>
              <p className="text-gray-600">Xem xét và xác nhận các điều khoản</p>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin HTX</h3>
                <p className="text-gray-700">{selectedCoop.coopName}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin đơn hàng</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Dược liệu:</span>
                    <span className="ml-2 font-semibold">{herbTypes.find(h => h.value === order.herbType)?.label}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sản lượng:</span>
                    <span className="ml-2 font-semibold">{order.quantity} {order.unit}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Thời gian giao:</span>
                    <span className="ml-2 font-semibold">{order.deliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tiêu chuẩn:</span>
                    <span className="ml-2 font-semibold">{cultivationStandards.find(s => s.value === order.cultivationStandard)?.label}</span>
                  </div>
                </div>
              </div>

              {selectedCoop.gap > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-amber-900 mb-2">
                    <i className="ri-time-line mr-2"></i>
                    Lưu ý về thời gian thực hiện
                  </p>
                  <p className="text-sm text-amber-800">
                    HTX cần thời gian {selectedCoop.gap > 20 ? '6-12 tháng' : '3-6 tháng'} để trồng rừng che bóng đạt chuẩn trước khi bắt đầu trồng dược liệu.
                    Hợp đồng sẽ ở trạng thái "Chờ thực hiện" (Pending Execution) cho đến khi HTX đáp ứng đủ điều kiện.
                  </p>
                </div>
              )}

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-sm text-teal-800">
                  <i className="ri-shield-check-line mr-2"></i>
                  Hợp đồng này sẽ được ghi nhận trên blockchain và có Smart Contract tự động giải ngân theo tiến độ.
                </p>
              </div>

              <button
                onClick={handleContractSign}
                className="w-full py-3 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Ký Hợp đồng Nguyên tắc
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Hợp đồng đã được ký!</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-emerald-600 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Hợp đồng Bao tiêu đã được ký thành công</h3>
            <p className="text-gray-600 mb-6">
              Mã hợp đồng: <span className="font-mono font-semibold">{order.orderId}</span>
            </p>
            
            <div className="bg-amber-50 rounded-lg p-6 mb-6 border border-amber-200">
              <p className="text-sm font-semibold text-amber-900 mb-2">Trạng thái: Chờ thực hiện (Pending Execution)</p>
              <p className="text-sm text-amber-800">
                {selectedCoop?.gap > 0 
                  ? 'HTX cần hoàn thành việc trồng rừng che bóng trước khi bắt đầu trồng dược liệu. Bạn sẽ được thông báo khi HTX sẵn sàng.'
                  : 'HTX có thể bắt đầu thực hiện ngay. Bạn sẽ nhận được báo cáo tiến độ định kỳ.'}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/enterprise-matching')}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Xem hợp đồng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}




