import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LandData {
  // Bước 1: Khai báo sơ bộ
  ownerName: string;
  phone: string;
  landLocation: string;
  approximateArea: string;
  currentStatus: string;
  notes: string;
  
  // Bước 3: Thẩm định tại hiện trường
  polygonCoordinates: Array<{lat: number, lng: number}>;
  elevation: string;
  slope: string;
  soilOrganic: string;
  waterSource: string;
  forestStatus: string;
  treePhotos: string[];
  treeDiameter: string;
  
  // Bước 4: AI Analysis
  landScore: number | null;
  recommendedCrops: Array<{name: string, compatibility: number}>;
  aiAnalysis: string;
}

export default function LandDigitizationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [landData, setLandData] = useState<LandData>({
    ownerName: '',
    phone: '',
    landLocation: '',
    approximateArea: '',
    currentStatus: '',
    notes: '',
    polygonCoordinates: [],
    elevation: '',
    slope: '',
    soilOrganic: '',
    waterSource: '',
    forestStatus: '',
    treePhotos: [],
    treeDiameter: '',
    landScore: null,
    recommendedCrops: [],
    aiAnalysis: ''
  });
  const [landStatus, setLandStatus] = useState<'pending' | 'under_audit' | 'approved' | 'active'>('pending');

  // Bước 1: Chủ đất khai báo sơ bộ
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi yêu cầu đến HTX Portal
    setLandStatus('pending');
    setCurrentStep(2);
  };

  // Bước 2: Hiển thị trạng thái chờ duyệt
  const Step2View = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="ri-time-line text-amber-600 text-4xl"></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Đang chờ thẩm định</h3>
      <p className="text-gray-600 mb-6">
        Thông tin đất của bạn đã được gửi đến HTX. Cán bộ HTX sẽ liên hệ và sắp xếp lịch thẩm định thực địa.
      </p>
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-amber-800">
          <i className="ri-information-line mr-2"></i>
          Trạng thái: <span className="font-semibold">Pending (Chờ duyệt)</span>
        </p>
      </div>
      <button
        onClick={() => setCurrentStep(3)}
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
      >
        Mô phỏng: Cán bộ HTX bắt đầu thẩm định
      </button>
    </div>
  );

  // Bước 3: Thẩm định tại hiện trường (Field Audit)
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập: Vẽ polygon và nhập thông số
    // Trong thực tế, sẽ tích hợp bản đồ để vẽ polygon
    const mockCoordinates = [
      {lat: 14.35, lng: 108.00},
      {lat: 14.36, lng: 108.01},
      {lat: 14.35, lng: 108.02},
      {lat: 14.34, lng: 108.01}
    ];
    
    setLandData({
      ...landData,
      polygonCoordinates: mockCoordinates
    });
    
    setCurrentStep(4);
    // Gọi AI Analysis
    simulateAIAnalysis();
  };

  // Bước 4: AI Analysis và Land Score
  const simulateAIAnalysis = () => {
    // Giả lập phân tích AI
    setTimeout(() => {
      const mockScore = 85;
      const mockRecommendations = [
        {name: 'Sâm Ngọc Linh', compatibility: 90},
        {name: 'Đẳng Sâm', compatibility: 85},
        {name: 'Nấm Lim Xanh', compatibility: 75}
      ];
      const mockAnalysis = 'Đất có độ cao phù hợp (1,200m), độ dốc vừa phải (15-20°), hàm lượng mùn tốt. Nguồn nước dồi dào từ suối tự nhiên. Tán rừng che phủ tốt, tạo điều kiện lý tưởng cho dược liệu ưa bóng mát.';
      
      setLandData({
        ...landData,
        landScore: mockScore,
        recommendedCrops: mockRecommendations,
        aiAnalysis: mockAnalysis
      });
    }, 2000);
  };

  // Bước 5: Duyệt và kích hoạt
  const handleApprove = () => {
    setLandStatus('active');
    // Chuyển trạng thái sang Active (Màu Xám - Chờ trồng)
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/onboarding-gateway')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Số hóa Đất & Rừng</h1>
              <p className="text-sm opacity-90">Bước 1: Khai báo sơ bộ</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin cơ bản về đất</h2>
              <p className="text-gray-600">Vui lòng cung cấp thông tin sơ bộ về lô đất bạn muốn đưa vào hệ thống VITA</p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên chủ đất <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={landData.ownerName}
                  onChange={(e) => setLandData({...landData, ownerName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={landData.phone}
                  onChange={(e) => setLandData({...landData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="0901234567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vị trí đất <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={landData.landLocation}
                  onChange={(e) => setLandData({...landData, landLocation: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ví dụ: Xã Măng Ri, Huyện Kon Plông, Tỉnh Kon Tum"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Diện tích ước tính <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={landData.approximateArea}
                  onChange={(e) => setLandData({...landData, approximateArea: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ví dụ: 10 ha"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hiện trạng <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={landData.currentStatus}
                  onChange={(e) => setLandData({...landData, currentStatus: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Chọn hiện trạng</option>
                  <option value="forest">Rừng tự nhiên</option>
                  <option value="plantation">Rừng trồng</option>
                  <option value="degraded">Rừng nghèo kiệt</option>
                  <option value="bare">Đất trống</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghi chú thêm
                </label>
                <textarea
                  value={landData.notes}
                  onChange={(e) => setLandData({...landData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Mô tả thêm về đất (nếu có)"
                />
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi gửi, cán bộ HTX sẽ liên hệ với bạn để sắp xếp lịch thẩm định thực địa.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Gửi yêu cầu số hóa đất
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Trạng thái: Chờ thẩm định</h1>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Step2View />
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(2)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Thẩm định Thực địa</h1>
              <p className="text-sm opacity-90">Bước 3: Cán bộ HTX điều tra tại hiện trường</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-map-2-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Vẽ Ranh giới (Polygon)</h2>
                  <p className="text-sm text-gray-600">Sử dụng bản đồ để vẽ ranh giới lô đất</p>
                </div>
              </div>
              
              {/* Placeholder cho bản đồ */}
              <div className="w-full h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <i className="ri-map-pin-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Bản đồ vẽ polygon sẽ được tích hợp ở đây</p>
                  <p className="text-sm text-gray-400 mt-2">(Google Maps / Mapbox với drawing tools)</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleStep3Submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Độ cao (m) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={landData.elevation}
                    onChange={(e) => setLandData({...landData, elevation: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ví dụ: 1200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Độ dốc (°) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={landData.slope}
                    onChange={(e) => setLandData({...landData, slope: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ví dụ: 15-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hàm lượng mùn (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={landData.soilOrganic}
                    onChange={(e) => setLandData({...landData, soilOrganic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ví dụ: 3.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nguồn nước <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={landData.waterSource}
                    onChange={(e) => setLandData({...landData, waterSource: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn nguồn nước</option>
                    <option value="spring">Suối tự nhiên</option>
                    <option value="well">Giếng khoan</option>
                    <option value="stream">Sông suối</option>
                    <option value="rain">Nước mưa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hiện trạng rừng <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={landData.forestStatus}
                  onChange={(e) => setLandData({...landData, forestStatus: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn hiện trạng</option>
                  <option value="dense">Rừng rậm</option>
                  <option value="moderate">Rừng trung bình</option>
                  <option value="sparse">Rừng thưa</option>
                  <option value="degraded">Rừng nghèo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đường kính cây lớn (cm)
                </label>
                <input
                  type="text"
                  value={landData.treeDiameter}
                  onChange={(e) => setLandData({...landData, treeDiameter: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ví dụ: 30-50cm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chụp ảnh tán rừng
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <i className="ri-camera-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Tích hợp camera/gallery upload</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Hoàn thành thẩm định → Phân tích AI
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Phân tích AI & Điểm số Đất</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {!landData.landScore ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <i className="ri-brain-line text-purple-600 text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">VITA AI đang phân tích...</h3>
                <p className="text-gray-600">Hệ thống đang xử lý dữ liệu thẩm định và tính toán điểm số phù hợp</p>
              </div>
            ) : (
              <>
                {/* Land Score */}
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      landData.landScore >= 80 ? 'bg-emerald-100' : 
                      landData.landScore >= 60 ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-5xl font-bold ${
                        landData.landScore >= 80 ? 'text-emerald-600' : 
                        landData.landScore >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {landData.landScore}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Điểm số Đất (Land Score)</h2>
                    <p className="text-gray-600">
                      {landData.landScore >= 80 ? 'Xuất sắc - Rất phù hợp cho dược liệu' :
                       landData.landScore >= 60 ? 'Tốt - Phù hợp với điều kiện nhất định' :
                       'Trung bình - Cần cải thiện điều kiện'}
                    </p>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-purple-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-brain-line text-purple-600"></i>
                    Phân tích VITA AI
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{landData.aiAnalysis}</p>
                </div>

                {/* Recommended Crops */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Gợi ý cây trồng phù hợp</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {landData.recommendedCrops.map((crop, index) => (
                      <div key={index} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                          <span className="text-emerald-600 font-bold">{crop.compatibility}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all"
                            style={{width: `${crop.compatibility}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Tiếp tục → Duyệt kích hoạt
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Duyệt & Kích hoạt</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                landStatus === 'active' ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <i className={`${landStatus === 'active' ? 'ri-checkbox-circle-line text-emerald-600' : 'ri-time-line text-gray-600'} text-4xl`}></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {landStatus === 'active' ? 'Đất đã được kích hoạt thành công!' : 'Chờ Chủ nhiệm HTX duyệt'}
              </h2>
              <p className="text-gray-600">
                {landStatus === 'active' 
                  ? 'Lô đất của bạn đã chuyển sang trạng thái Active (Màu Xám - Chờ trồng) trên bản đồ tổng. Bạn chính thức trở thành "Xã viên Tài nguyên".'
                  : 'Bước cuối cùng: Chủ nhiệm HTX sẽ xem xét và duyệt lô đất này.'}
              </p>
            </div>

            {landStatus !== 'active' && (
              <div className="bg-amber-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tóm tắt thông tin lô đất</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Chủ đất:</span>
                    <span className="ml-2 font-semibold">{landData.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Vị trí:</span>
                    <span className="ml-2 font-semibold">{landData.landLocation}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Điểm số:</span>
                    <span className="ml-2 font-semibold text-emerald-600">{landData.landScore}/100</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cây đề xuất:</span>
                    <span className="ml-2 font-semibold">{landData.recommendedCrops[0]?.name}</span>
                  </div>
                </div>
              </div>
            )}

            {landStatus === 'pending' && (
              <button
                onClick={handleApprove}
                className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Mô phỏng: Chủ nhiệm HTX duyệt
              </button>
            )}

            {landStatus === 'active' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    Trạng thái: Active
                  </h3>
                  <p className="text-sm text-emerald-800">
                    Lô đất đã xuất hiện trên bản đồ tổng với màu Xám (Chờ trồng). 
                    Bạn có thể theo dõi và quản lý lô đất này từ dashboard.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/admin-gis')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Xem trên Bản đồ Tổng
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




