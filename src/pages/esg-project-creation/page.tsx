import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface B2BContract {
  orderId: string;
  herbType: string;
  requiredCanopy: number;
  gap: number;
  lotId: string;
  lotName: string;
}

interface ESGProject {
  projectId: string;
  name: string;
  lotId: string;
  lotName: string;
  targetArea: number;
  treesToPlant: number;
  currentCanopy: number;
  targetCanopy: number;
  fundingNeeded: number;
  carbonCredits: number;
  timeline: string;
  status: 'draft' | 'published' | 'funded';
}

export default function ESGProjectCreationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lotId = searchParams.get('lotId');
  
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [hasAlert, setHasAlert] = useState(false);
  const [activeB2BContracts, setActiveB2BContracts] = useState<B2BContract[]>([]);
  const [project, setProject] = useState<ESGProject>({
    projectId: '',
    name: '',
    lotId: lotId || '',
    lotName: '',
    targetArea: 0,
    treesToPlant: 0,
    currentCanopy: 0,
    targetCanopy: 0,
    fundingNeeded: 0,
    carbonCredits: 0,
    timeline: '',
    status: 'draft'
  });

  // Giả lập: Kiểm tra cảnh báo khi vào trang
  useEffect(() => {
    // Mock: Cảnh báo từ B2B contract
    const mockContracts: B2BContract[] = [
      {
        orderId: 'OFFTAKE-2024-001',
        herbType: 'Sâm Ngọc Linh',
        requiredCanopy: 70,
        gap: 50,
        lotId: 'lot-a',
        lotName: 'Lô A'
      }
    ];
    
    const hasGap = mockContracts.some(c => c.gap > 0);
    setHasAlert(hasGap);
    setActiveB2BContracts(mockContracts);
    
    // Auto-fill project data from contract
    if (hasGap && mockContracts.length > 0) {
      const contract = mockContracts[0];
      setProject({
        ...project,
        lotId: contract.lotId,
        lotName: contract.lotName,
        currentCanopy: 70 - contract.gap,
        targetCanopy: contract.requiredCanopy,
        treesToPlant: Math.ceil(contract.gap * 100), // 100 trees per 1% canopy
        targetArea: 10, // Assume 10ha
      });
    }
  }, []);

  // Bước 1: Cảnh báo và tạo dự án
  const handleCreateProject = () => {
    const newProjectId = `ESG-${Date.now()}`;
    
    // Tính toán funding needed (giả lập: 125k VNĐ/cây)
    const fundingNeeded = project.treesToPlant * 125000;
    // Tính carbon credits (giả lập: 2 tons CO2 per ha per year)
    const carbonCredits = project.targetArea * 2 * 10; // 10 years
    
    setProject({
      ...project,
      projectId: newProjectId,
      fundingNeeded,
      carbonCredits,
      timeline: '6-12 tháng',
      name: `Trồng rừng ${project.lotName} - Đạt chuẩn che phủ ${project.targetCanopy}%`
    });
    
    setCurrentStep(2);
  };

  // Bước 2: Publish project
  const handlePublish = () => {
    setProject({...project, status: 'published'});
    setCurrentStep(3);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin-forest-funding')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Cảnh báo: Thiếu hụt Rừng Che bóng</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {hasAlert && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-alert-line text-red-600 text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-900 mb-2">Cảnh báo Đỏ</h2>
                  <p className="text-lg text-red-800">
                    Bạn cần trồng thêm rừng để đáp ứng yêu cầu của Hợp đồng B2B đã ký.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {activeB2BContracts.map((contract) => (
                  <div key={contract.orderId} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">Hợp đồng: {contract.orderId}</h3>
                        <p className="text-sm text-gray-600">Dược liệu: {contract.herbType}</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        Cần hành động
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Lô đất:</p>
                        <p className="font-semibold">{contract.lotName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Che phủ yêu cầu:</p>
                        <p className="font-semibold">{contract.requiredCanopy}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Thiếu hụt:</p>
                        <p className="font-semibold text-red-600">{contract.gap}%</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-red-800">
                        <i className="ri-information-line mr-2"></i>
                        Cần trồng thêm khoảng <strong>{Math.ceil(contract.gap * 100)} cây Mega 3P</strong> để đạt chuẩn che phủ {contract.requiredCanopy}%.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <i className="ri-lightbulb-line mr-2"></i>
                  <strong>Giải pháp:</strong> Tạo Dự án Gọi Vốn Trồng Rừng để huy động vốn từ các Doanh nghiệp ESG và Nhà đầu tư có tâm.
                </p>
              </div>

              <button
                onClick={handleCreateProject}
                className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Tạo Dự án Gọi Vốn Trồng Rừng →
              </button>
            </div>
          )}

          {/* Form tạo dự án thủ công (nếu không có cảnh báo) */}
          {!hasAlert && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tạo Dự án Gọi Vốn Trồng Rừng</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lô đất <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={project.lotId}
                    onChange={(e) => setProject({...project, lotId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Chọn lô đất</option>
                    <option value="lot-a">Lô A - 10ha</option>
                    <option value="lot-b">Lô B - 15ha</option>
                    <option value="lot-c">Lô C - 20ha</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Độ che phủ hiện tại (%)
                    </label>
                    <input
                      type="number"
                      value={project.currentCanopy || ''}
                      onChange={(e) => setProject({...project, currentCanopy: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Độ che phủ mục tiêu (%)
                    </label>
                    <input
                      type="number"
                      value={project.targetCanopy || ''}
                      onChange={(e) => setProject({...project, targetCanopy: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số cây cần trồng (ước tính)
                  </label>
                  <input
                    type="number"
                    value={project.treesToPlant || ''}
                    onChange={(e) => setProject({...project, treesToPlant: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Ví dụ: 5000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ước tính: ~100 cây cho mỗi 1% độ che phủ trên 1ha
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Diện tích (ha)
                  </label>
                  <input
                    type="number"
                    value={project.targetArea || ''}
                    onChange={(e) => setProject({...project, targetArea: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  onClick={handleCreateProject}
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Tạo Dự án →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Xem xét Dự án</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
              <p className="text-gray-600">Mã dự án: <span className="font-mono">{project.projectId}</span></p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Diện tích</p>
                  <p className="text-xl font-bold text-gray-900">{project.targetArea} ha</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Số cây trồng</p>
                  <p className="text-xl font-bold text-gray-900">{project.treesToPlant.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Vốn cần</p>
                  <p className="text-xl font-bold text-gray-900">{(project.fundingNeeded / 1000000).toFixed(1)}M VNĐ</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Carbon Credits</p>
                  <p className="text-xl font-bold text-gray-900">{project.carbonCredits} tấn CO₂</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin chi tiết</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lô đất:</span>
                    <span className="font-semibold">{project.lotName || 'Lô A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Độ che phủ hiện tại:</span>
                    <span className="font-semibold">{project.currentCanopy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Độ che phủ mục tiêu:</span>
                    <span className="font-semibold">{project.targetCanopy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian thực hiện:</span>
                    <span className="font-semibold">{project.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <i className="ri-information-line mr-2"></i>
                  Sau khi publish, dự án sẽ xuất hiện trên Cổng ESG Impact và được gửi đến các Doanh nghiệp ESG phù hợp.
                </p>
              </div>

              <button
                onClick={handlePublish}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Publish Dự án để Gọi Vốn
              </button>
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold">Dự án đã được Publish!</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-emerald-600 text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Dự án đã được công bố thành công</h3>
            <p className="text-gray-600 mb-6">
              Dự án <strong>{project.name}</strong> đã được đăng tải trên Cổng ESG Impact.
            </p>
            
            <div className="bg-emerald-50 rounded-lg p-6 mb-6 border border-emerald-200">
              <p className="text-sm text-emerald-800 mb-4">
                Hệ thống sẽ tự động:
              </p>
              <ul className="text-sm text-emerald-800 space-y-2 text-left">
                <li>✓ Gửi RFP đến các Doanh nghiệp ESG có Target Builder khớp với dự án</li>
                <li>✓ Hiển thị trên Sàn ESG Impact cho các Nhà đầu tư xem</li>
                <li>✓ Cập nhật trạng thái khi có Doanh nghiệp ESG tài trợ</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/admin-forest-funding')}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Quay về Dashboard
              </button>
              <button
                onClick={() => navigate('/esg-portal/dashboard')}
                className="flex-1 py-3 px-6 bg-white border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all"
              >
                Xem trên ESG Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}




