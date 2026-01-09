import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QualityTest {
  batchId: string;
  productName: string;
  contractStandard: {
    saponin: number;
    mr2?: number;
    flavonoid?: number;
  };
  testResults: {
    saponin: number | null;
    mr2: number | null;
    flavonoid: number | null;
  } | null;
  coaUploaded: boolean;
  verdict: 'pending' | 'passed' | 'failed' | 'warning';
  status: 'sample_sent' | 'testing' | 'coa_uploaded' | 'verified';
}

export default function QualityGatePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [tests, setTests] = useState<QualityTest[]>([
    {
      batchId: 'BATCH-123456789-ABC',
      productName: 'Sâm Ngọc Linh - Loại A+',
      contractStandard: {
        saponin: 10,
        mr2: 4
      },
      testResults: null,
      coaUploaded: false,
      verdict: 'pending',
      status: 'sample_sent'
    }
  ]);
  const [selectedTest, setSelectedTest] = useState<QualityTest | null>(null);

  // Bước 1: Gửi mẫu đến Lab
  const handleSendSample = (test: QualityTest) => {
    setSelectedTest(test);
    setTests(tests.map(t => 
      t.batchId === test.batchId 
        ? { ...t, status: 'sample_sent' as const }
        : t
    ));
    setCurrentStep(2);
  };

  // Bước 2: Upload COA
  const handleUploadCOA = (test: QualityTest, results: { saponin: number; mr2: number }) => {
    setTests(tests.map(t => 
      t.batchId === test.batchId 
        ? {
            ...t,
            testResults: results,
            coaUploaded: true,
            status: 'coa_uploaded' as const
          }
        : t
    ));
    
    // Auto verify
    setTimeout(() => {
      const passed = results.saponin >= test.contractStandard.saponin && 
                     (!test.contractStandard.mr2 || results.mr2 >= test.contractStandard.mr2);
      
      setTests(tests.map(t => 
        t.batchId === test.batchId 
          ? {
              ...t,
              testResults: results,
              coaUploaded: true,
              verdict: (passed ? 'passed' : 'failed') as const,
              status: 'verified' as const
            }
          : t
      ));
    }, 1000);
    
    setCurrentStep(3);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/digital-harvest')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Kiểm Định Chất Lượng</h1>
              <p className="text-sm opacity-90">Bước 1: Gửi mẫu đến Lab</p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bộ lọc cuối cùng</h2>
              <p className="text-gray-600">
                Gửi mẫu ngẫu nhiên đến Trung tâm Khoa học để phân tích hoạt chất trước khi giao hàng
              </p>
            </div>

            <div className="space-y-4">
              {tests.map((test) => (
                <div
                  key={test.batchId}
                  className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{test.productName}</h3>
                      <p className="text-sm text-gray-600">Batch: {test.batchId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      test.status === 'verified' 
                        ? test.verdict === 'passed' 
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {test.status === 'verified' 
                        ? test.verdict === 'passed' ? 'Đạt chuẩn' : 'Không đạt'
                        : 'Chờ kiểm định'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Saponin yêu cầu</p>
                      <p className="text-lg font-bold text-gray-900">≥ {test.contractStandard.saponin}%</p>
                    </div>
                    {test.contractStandard.mr2 && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">MR2 yêu cầu</p>
                        <p className="text-lg font-bold text-gray-900">≥ {test.contractStandard.mr2}%</p>
                      </div>
                    )}
                    {test.testResults && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Kết quả Saponin</p>
                        <p className={`text-lg font-bold ${
                          (test.testResults.saponin || 0) >= test.contractStandard.saponin
                            ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {test.testResults.saponin}%
                        </p>
                      </div>
                    )}
                  </div>

                  {test.status === 'sample_sent' && (
                    <button
                      onClick={() => handleSendSample(test)}
                      className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                    >
                      Gửi mẫu đến Lab →
                    </button>
                  )}

                  {test.status === 'testing' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-blue-800">Lab đang phân tích mẫu...</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2 && selectedTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Upload COA - Phiếu Kết quả</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nhập kết quả phân tích</h2>
              <p className="text-gray-600">Lab upload phiếu kết quả (COA) sau khi phân tích hoạt chất</p>
            </div>

            {/* Mock COA Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Saponin (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Ví dụ: 12.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  id="saponin-input"
                />
              </div>

              {selectedTest.contractStandard.mr2 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    MR2 (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ví dụ: 5.2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    id="mr2-input"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File COA (PDF)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <i className="ri-file-upload-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Kéo thả file hoặc click để chọn</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi upload, hệ thống sẽ tự động so sánh với tiêu chuẩn hợp đồng và đưa ra phán quyết.
                </p>
              </div>

              <button
                onClick={() => {
                  const saponinInput = document.getElementById('saponin-input') as HTMLInputElement;
                  const mr2Input = document.getElementById('mr2-input') as HTMLInputElement;
                  handleUploadCOA(selectedTest, {
                    saponin: Number(saponinInput.value) || 12.5,
                    mr2: Number(mr2Input.value) || 5.2
                  });
                }}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Upload COA → Phán quyết Tự động
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3 && selectedTest && tests.find(t => t.batchId === selectedTest.batchId)?.status === 'verified') {
    const verifiedTest = tests.find(t => t.batchId === selectedTest.batchId)!;
    const passed = verifiedTest.verdict === 'passed';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <header className={`bg-gradient-to-r ${passed ? 'from-emerald-600 to-teal-600' : 'from-red-600 to-orange-600'} text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg`}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">
              {passed ? 'Đạt Chuẩn VITA Verified!' : 'Không Đạt Chuẩn'}
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className={`w-32 h-32 ${passed ? 'bg-emerald-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {passed ? (
                  <i className="ri-verified-badge-line text-emerald-600 text-6xl"></i>
                ) : (
                  <i className="ri-close-circle-line text-red-600 text-6xl"></i>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {passed ? 'Chứng thư VITA Verified' : 'Cảnh báo Vi phạm'}
              </h2>
            </div>

            {verifiedTest.testResults && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${
                    (verifiedTest.testResults.saponin || 0) >= verifiedTest.contractStandard.saponin
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <p className="text-sm text-gray-600 mb-1">Saponin</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {verifiedTest.testResults.saponin}%
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Yêu cầu: ≥ {verifiedTest.contractStandard.saponin}%
                    </p>
                  </div>
                  {verifiedTest.testResults.mr2 && (
                    <div className={`p-4 rounded-lg border-2 ${
                      verifiedTest.contractStandard.mr2 && 
                      (verifiedTest.testResults.mr2 || 0) >= verifiedTest.contractStandard.mr2
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-red-200 bg-red-50'
                    }`}>
                      <p className="text-sm text-gray-600 mb-1">MR2</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {verifiedTest.testResults.mr2}%
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Yêu cầu: ≥ {verifiedTest.contractStandard.mr2}%
                      </p>
                    </div>
                  )}
                </div>

                {passed ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                    <p className="text-sm font-semibold text-emerald-900 mb-2">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Kết quả đạt chuẩn
                    </p>
                    <p className="text-sm text-emerald-800">
                      Hệ thống đã cấp Chứng thư VITA Verified. Mở khóa cho phép giao hàng.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-sm font-semibold text-red-900 mb-2">
                      <i className="ri-alert-line mr-2"></i>
                      Cảnh báo Vi phạm
                    </p>
                    <p className="text-sm text-red-800 mb-4">
                      Kết quả không đạt tiêu chuẩn hợp đồng B2B. Giá mua có thể bị trừ hoặc hủy đơn.
                    </p>
                    <p className="text-xs text-red-700">
                      Vui lòng liên hệ HTX để xử lý.
                    </p>
                  </div>
                )}

                {passed && (
                  <button
                    onClick={() => navigate('/trade-execution')}
                    className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Tiếp tục → Giao Dịch & Bàn Giao
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}




