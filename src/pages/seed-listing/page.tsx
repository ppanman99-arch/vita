import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SeedProduct {
  name: string;
  category: string;
  age: string;
  origin: string;
  dnaProfile: string;
  cultivationProcess: string;
  warranty: string;
  price: string;
  certification: string[];
  status: 'draft' | 'pending' | 'verified' | 'rejected';
}

export default function SeedListingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [product, setProduct] = useState<SeedProduct>({
    name: '',
    category: '',
    age: '',
    origin: '',
    dnaProfile: '',
    cultivationProcess: '',
    warranty: '',
    price: '',
    certification: [],
    status: 'draft'
  });

  const categories = [
    { value: 'sam', label: 'Sâm Ngọc Linh', icon: 'ri-seedling-line' },
    { value: 'dang-sam', label: 'Đẳng Sâm', icon: 'ri-plant-line' },
    { value: 'nam', label: 'Nấm Lim Xanh', icon: 'ri-leaf-line' },
    { value: 'other', label: 'Dược liệu khác', icon: 'ri-medicine-bottle-line' }
  ];

  const certificationOptions = [
    'GAP (Good Agricultural Practices)',
    'Hữu cơ (Organic)',
    'Chứng nhận nguồn gốc',
    'ISO 9001',
    'FSC',
    'Khác'
  ];

  // Bước 1: Đăng ký tài khoản Đối tác Khoa học
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  // Bước 2: Niêm yết sản phẩm
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setProduct({...product, status: 'pending'});
    setCurrentStep(3);
  };

  // Bước 3: Chờ thẩm định
  const handleVerify = () => {
    setProduct({...product, status: 'verified'});
    setCurrentStep(4);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/research-lab')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Đăng ký Đối tác Khoa học</h1>
              <p className="text-sm opacity-90">Bước 1: Tạo tài khoản Trung tâm Gen</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin Trung tâm</h2>
              <p className="text-gray-600">Vui lòng cung cấp thông tin về Trung tâm Gen của bạn</p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Trung tâm / Tổ chức <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ví dụ: Trung tâm Nghiên cứu & Phát triển Giống cây Dược liệu"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Người đại diện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Họ và tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chức vụ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ví dụ: Giám đốc"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="contact@gencenter.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="0901234567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Địa chỉ trụ sở chính"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giấy phép hoạt động / Chứng nhận
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <i className="ri-file-upload-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Upload file chứng nhận (PDF, JPG)</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Đăng ký tài khoản
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Niêm yết Sản phẩm Giống</h1>
              <p className="text-sm opacity-90">Bước 2: Tạo sản phẩm mới trên Sàn Giao Dịch</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ví dụ: Cây Sâm mô 1 tuổi"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại giống <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setProduct({...product, category: cat.value})}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        product.category === cat.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <i className={`${cat.icon} text-2xl mb-2 ${product.category === cat.value ? 'text-purple-600' : 'text-gray-400'}`}></i>
                      <p className={`text-sm font-medium ${product.category === cat.value ? 'text-purple-900' : 'text-gray-600'}`}>
                        {cat.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tuổi cây giống <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={product.age}
                    onChange={(e) => setProduct({...product, age: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ví dụ: 1 tuổi, 6 tháng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nguồn gốc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={product.origin}
                    onChange={(e) => setProduct({...product, origin: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ví dụ: Vườn ươm Kon Tum"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hồ sơ DNA / Mã gen <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={product.dnaProfile}
                  onChange={(e) => setProduct({...product, dnaProfile: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập mã DNA hoặc upload file hồ sơ gen"
                />
                <p className="text-xs text-gray-500 mt-1">
                  <i className="ri-information-line mr-1"></i>
                  Đây là dữ liệu quan trọng để đảm bảo nguồn gốc và chất lượng giống
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quy trình nuôi cấy <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={product.cultivationProcess}
                  onChange={(e) => setProduct({...product, cultivationProcess: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Mô tả quy trình nuôi cấy, chăm sóc từ khi ươm đến khi xuất vườn"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cam kết bảo hành <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={product.warranty}
                  onChange={(e) => setProduct({...product, warranty: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ví dụ: Bảo hành tỷ lệ sống 95%, đổi mới trong 30 ngày nếu không đạt chất lượng"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giá bán (VNĐ)
                </label>
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) => setProduct({...product, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ví dụ: 50,000 VNĐ/cây"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chứng nhận / Tiêu chuẩn
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {certificationOptions.map((cert) => (
                    <label key={cert} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.certification.includes(cert)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProduct({...product, certification: [...product.certification, cert]});
                          } else {
                            setProduct({...product, certification: product.certification.filter(c => c !== cert)});
                          }
                        }}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi gửi, Hội đồng VITA sẽ thẩm định hồ sơ năng lực và cấp tích xanh Verified nếu đạt tiêu chuẩn.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Gửi yêu cầu niêm yết
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Chờ Thẩm định</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-time-line text-amber-600 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Hồ sơ đang được thẩm định</h3>
            <p className="text-gray-600 mb-6">
              Hội đồng VITA đang xem xét hồ sơ năng lực và chất lượng sản phẩm của bạn.
            </p>
            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                <i className="ri-information-line mr-2"></i>
                Trạng thái: <span className="font-semibold">Pending (Chờ duyệt)</span>
              </p>
            </div>
            <button
              onClick={handleVerify}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Mô phỏng: Hội đồng VITA cấp Verified
            </button>
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
            <h1 className="text-xl sm:text-2xl font-bold">Đã được xác minh!</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-emerald-600 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm đã được Verified!</h3>
            <p className="text-gray-600 mb-6">
              Sản phẩm <strong>{product.name}</strong> đã được Hội đồng VITA thẩm định và cấp tích xanh <span className="text-emerald-600 font-semibold">Verified</span>.
            </p>
            
            <div className="bg-emerald-50 rounded-lg p-6 mb-6 border border-emerald-200">
              <div className="flex items-center justify-center gap-2 mb-4">
                <i className="ri-verified-badge-line text-3xl text-emerald-600"></i>
                <span className="text-xl font-bold text-emerald-900">VERIFIED</span>
              </div>
              <p className="text-sm text-emerald-800">
                Sản phẩm của bạn đã xuất hiện trên <strong>Sàn Giao Dịch Giống</strong> và sẵn sàng để các HTX đặt mua.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/seed-marketplace')}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Xem trên Sàn Giao Dịch
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}




