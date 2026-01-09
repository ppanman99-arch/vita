import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InvestmentProject {
  id: string;
  name: string;
  description: string;
  totalFunding: number;
  currentFunding: number;
  minInvestment: number;
  investmentUnit: number;
  sharesAvailable: number;
  expectedReturn: number;
  timeline: string;
  status: 'open' | 'funding' | 'funded' | 'closed';
  hasB2B: boolean;
  hasESG: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function CrowdInvestmentPage() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<InvestmentProject | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);

  const projects: InvestmentProject[] = [
    {
      id: 'CROWD-001',
      name: 'Sâm Ngọc Linh - Đã có đầu ra B2B, Đã có vốn rừng ESG',
      description: 'Dự án trồng Sâm Ngọc Linh tại Kon Tum với hợp đồng bao tiêu đã ký và vốn ESG đã huy động. Cần thêm vốn lưu động để trả lương nông dân những tháng đầu.',
      totalFunding: 500000000,
      currentFunding: 350000000,
      minInvestment: 50000000,
      investmentUnit: 50000000,
      sharesAvailable: 3,
      expectedReturn: 18,
      timeline: '3-5 năm',
      status: 'open',
      hasB2B: true,
      hasESG: true,
      riskLevel: 'low'
    },
    {
      id: 'CROWD-002',
      name: 'Tam Thất - Mở rộng sản xuất',
      description: 'Mở rộng diện tích trồng Tam Thất tại Lâm Đồng với quy trình đã được kiểm chứng.',
      totalFunding: 800000000,
      currentFunding: 200000000,
      minInvestment: 50000000,
      investmentUnit: 50000000,
      sharesAvailable: 12,
      expectedReturn: 15,
      timeline: '4-6 năm',
      status: 'open',
      hasB2B: false,
      hasESG: true,
      riskLevel: 'medium'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getProgress = (project: InvestmentProject) => {
    return (project.currentFunding / project.totalFunding) * 100;
  };

  const handleInvest = (project: InvestmentProject) => {
    setSelectedProject(project);
    setInvestmentAmount(project.minInvestment);
    setShowInvestmentModal(true);
  };

  const handleConfirmInvestment = () => {
    // Simulate investment
    alert(`Đã đầu tư ${formatCurrency(investmentAmount)} vào dự án ${selectedProject?.name}`);
    setShowInvestmentModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/farmer-investor')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Góp Vốn Cộng Đồng</h1>
            <p className="text-sm opacity-90">Cơ hội đầu tư với rủi ro thấp, lợi nhuận minh bạch</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Info Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-community-line text-2xl text-purple-600"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Đầu tư An toàn & Minh bạch</h3>
              <p className="text-sm text-gray-600 mb-3">
                Các dự án trên đây đã có đầu ra (B2B) và/hoặc vốn ESG. HTX chỉ cần thêm vốn lưu động để vận hành.
                Tất cả giao dịch được bảo vệ bởi Smart Contract và minh bạch 100%.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  <i className="ri-shield-check-line mr-1"></i>
                  Đã có đầu ra B2B
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <i className="ri-leaf-line mr-1"></i>
                  Đã có vốn ESG
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  <i className="ri-file-list-3-line mr-1"></i>
                  Smart Contract
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Dự án Đang Gọi Vốn</h2>
          
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    {project.hasB2B && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
                        Có B2B
                      </span>
                    )}
                    {project.hasESG && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Có ESG
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="ri-risk-warning-line text-amber-600"></i>
                      <span className="text-sm text-gray-600">Rủi ro: </span>
                      <span className={`text-sm font-semibold ${
                        project.riskLevel === 'low' ? 'text-emerald-600' :
                        project.riskLevel === 'medium' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {project.riskLevel === 'low' ? 'Thấp' :
                         project.riskLevel === 'medium' ? 'Trung bình' : 'Cao'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line text-blue-600"></i>
                      <span className="text-sm text-gray-600">Thời gian: </span>
                      <span className="text-sm font-semibold text-gray-900">{project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-line-chart-line text-purple-600"></i>
                      <span className="text-sm text-gray-600">Lợi nhuận dự kiến: </span>
                      <span className="text-sm font-semibold text-emerald-600">{project.expectedReturn}%/năm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tiến độ gọi vốn</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(project.currentFunding)} / {formatCurrency(project.totalFunding)}
                    {' '}({getProgress(project).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
                    style={{width: `${getProgress(project)}%`}}
                  ></div>
                </div>
              </div>

              {/* Investment Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Đầu tư tối thiểu</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(project.minInvestment)}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Đơn vị đầu tư</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(project.investmentUnit)}/suất</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Suất còn lại</p>
                  <p className="text-lg font-bold text-gray-900">{project.sharesAvailable} suất</p>
                </div>
              </div>

              <button
                onClick={() => handleInvest(project)}
                disabled={project.status !== 'open' || project.sharesAvailable === 0}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  project.status === 'open' && project.sharesAvailable > 0
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {project.status === 'open' && project.sharesAvailable > 0
                  ? `Đầu tư ngay - Từ ${formatCurrency(project.minInvestment)}`
                  : 'Đã hết suất'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Xác nhận Đầu tư</h3>
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Dự án:</p>
              <p className="font-semibold text-gray-900 mb-4">{selectedProject.name}</p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số tiền đầu tư
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    min={selectedProject.minInvestment}
                    step={selectedProject.investmentUnit}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tối thiểu: {formatCurrency(selectedProject.minInvestment)} 
                    {' '}• Đơn vị: {formatCurrency(selectedProject.investmentUnit)}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Số suất mua:</span>
                    <span className="font-semibold">{Math.floor(investmentAmount / selectedProject.investmentUnit)} suất</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lợi nhuận dự kiến/năm:</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(investmentAmount * selectedProject.expectedReturn / 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowInvestmentModal(false)}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmInvestment}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




