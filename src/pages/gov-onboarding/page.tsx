import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GovData {
  communeName: string;
  district: string;
  province: string;
  leaderName: string;
  position: string;
  phone: string;
  email: string;
  isMapped: boolean;
  stats: {
    totalCoops: number;
    totalLandArea: number;
    potentialArea: number;
  } | null;
}

export default function GovOnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [govData, setGovData] = useState<GovData>({
    communeName: '',
    district: '',
    province: '',
    leaderName: '',
    position: '',
    phone: '',
    email: '',
    isMapped: false,
    stats: null
  });

  // Bước 1: GreenLight cấp tài khoản
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập: GreenLight cấp tài khoản
    setCurrentStep(2);
  };

  // Bước 2: Mapping tự động
  useEffect(() => {
    if (currentStep === 2) {
      // Giả lập quá trình mapping
      setTimeout(() => {
        setGovData({
          ...govData,
          isMapped: true,
          stats: {
            totalCoops: 3,
            totalLandArea: 125.5,
            potentialArea: 450.0
          }
        });
        setCurrentStep(3);
      }, 2000);
    }
  }, [currentStep]);

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/greenlight-command')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Thiết lập Chính quyền Xã</h1>
              <p className="text-sm opacity-90">Bước 1: GreenLight cấp tài khoản quản trị</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-government-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Cấp tài khoản cho Lãnh đạo UBND Xã</h2>
                  <p className="text-sm text-gray-600">GreenLight Admin thiết lập tài khoản quản trị</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Xã <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={govData.communeName}
                  onChange={(e) => setGovData({...govData, communeName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Xã Măng Ri"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Huyện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={govData.district}
                    onChange={(e) => setGovData({...govData, district: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ví dụ: Huyện Kon Plông"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tỉnh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={govData.province}
                    onChange={(e) => setGovData({...govData, province: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ví dụ: Tỉnh Kon Tum"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin Lãnh đạo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={govData.leaderName}
                      onChange={(e) => setGovData({...govData, leaderName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Họ và tên Lãnh đạo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chức vụ <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={govData.position}
                      onChange={(e) => setGovData({...govData, position: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn chức vụ</option>
                      <option value="chairman">Chủ tịch UBND Xã</option>
                      <option value="vice_chairman">Phó Chủ tịch UBND Xã</option>
                      <option value="secretary">Bí thư Đảng ủy</option>
                      <option value="other">Lãnh đạo khác</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={govData.email}
                      onChange={(e) => setGovData({...govData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="leader@commune.gov.vn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={govData.phone}
                      onChange={(e) => setGovData({...govData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0901234567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi cấp tài khoản, hệ thống sẽ tự động đồng bộ bản đồ hành chính của Xã với bản đồ vùng trồng của các HTX trên địa bàn.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Cấp tài khoản và bắt đầu Mapping
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Đang Mapping bản đồ</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="ri-map-2-line text-blue-600 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Đang đồng bộ bản đồ</h3>
            <p className="text-gray-600 mb-6">
              Hệ thống đang tự động đồng bộ bản đồ hành chính của {govData.communeName} với bản đồ vùng trồng của các HTX trên địa bàn.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/gov-portal')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Thiết lập hoàn tất!</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-checkbox-circle-line text-emerald-600 text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chính quyền Xã đã được thiết lập</h2>
              <p className="text-gray-600">
                Lãnh đạo {govData.communeName} có thể đăng nhập và xem các chỉ số kinh tế/môi trường của địa phương.
              </p>
            </div>

            {govData.stats && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan địa phương</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-team-line text-blue-600 text-2xl"></i>
                      <div>
                        <p className="text-sm text-gray-600">Số HTX</p>
                        <p className="text-2xl font-bold text-gray-900">{govData.stats.totalCoops}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-landscape-line text-emerald-600 text-2xl"></i>
                      <div>
                        <p className="text-sm text-gray-600">Diện tích đã số hóa</p>
                        <p className="text-2xl font-bold text-gray-900">{govData.stats.totalLandArea} ha</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-map-pin-line text-amber-600 text-2xl"></i>
                      <div>
                        <p className="text-sm text-gray-600">Tiềm năng đất</p>
                        <p className="text-2xl font-bold text-gray-900">{govData.stats.potentialArea} ha</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-emerald-50 rounded-lg p-6 mb-6 border border-emerald-200">
              <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <i className="ri-eye-line"></i>
                Quyền truy cập
              </h3>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>✓ Xem bản đồ tổng hợp các HTX trên địa bàn</li>
                <li>✓ Theo dõi chỉ số kinh tế - xã hội của địa phương</li>
                <li>✓ Giám sát tiềm năng đất đai và quy hoạch</li>
                <li>✓ Xem báo cáo tiêu chí Nông thôn mới</li>
                <li>✓ Theo dõi các dự án phát triển bền vững</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/gov-portal')}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Truy cập GOV Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}




