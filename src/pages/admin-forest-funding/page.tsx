import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { greenInvestmentOpportunityService } from '@/modules/member/application/GreenInvestmentOpportunityService';

interface ForestLot {
  id: string;
  name: string;
  area: number; // ha
  currentCanopy: number; // %
  treeType: string;
  treeDensity: number; // trees/ha
  avgDiameter: number; // cm
  understoryCleared: boolean;
  b2bRequirements: {
    orderId: string;
    herb: string;
    requiredCanopy: number;
    gap: number;
  }[];
}

interface ESGProject {
  id: string;
  name: string;
  lotId: string;
  targetArea: number;
  treesToPlant: number;
  currentCanopy: number;
  targetCanopy: number;
  fundingNeeded: number; // VNĐ
  carbonCredits: number; // tons CO2
  timeline: string;
  status: 'draft' | 'published' | 'funded';
}

export default function AdminForestFundingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'inventory' | 'alerts' | 'projects' | 'funding' | 'allocator' | 'forestry'>('inventory');
  const [selectedLot, setSelectedLot] = useState<ForestLot | null>(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'esg' | 'timber' | 'government' | null>(null);

  // Mock data - Forest Lots
  const [forestLots, setForestLots] = useState<ForestLot[]>([
    {
      id: 'lot-a',
      name: 'Lô A',
      area: 10,
      currentCanopy: 30,
      treeType: 'Keo lai',
      treeDensity: 500,
      avgDiameter: 15,
      understoryCleared: false,
      b2bRequirements: [
        {
          orderId: 'REQ-2024-001',
          herb: 'Sâm Ngọc Linh',
          requiredCanopy: 70,
          gap: 40,
        },
      ],
    },
    {
      id: 'lot-b',
      name: 'Lô B',
      area: 15,
      currentCanopy: 50,
      treeType: 'Thông 3 lá',
      treeDensity: 600,
      avgDiameter: 18,
      understoryCleared: true,
      b2bRequirements: [
        {
          orderId: 'REQ-2024-002',
          herb: 'Tam Thất',
          requiredCanopy: 65,
          gap: 15,
        },
      ],
    },
    {
      id: 'lot-c',
      name: 'Lô C',
      area: 20,
      currentCanopy: 0,
      treeType: 'Đất trống',
      treeDensity: 0,
      avgDiameter: 0,
      understoryCleared: true,
      b2bRequirements: [],
    },
  ]);

  // Mock data - ESG Projects
  const [esgProjects, setEsgProjects] = useState<ESGProject[]>([
    {
      id: 'proj-001',
      name: 'Trồng rừng Mega 3P che bóng cho Sâm Ngọc Linh - Lô A',
      lotId: 'lot-a',
      targetArea: 10,
      treesToPlant: 4000,
      currentCanopy: 30,
      targetCanopy: 70,
      fundingNeeded: 500000000,
      carbonCredits: 8000,
      timeline: 'Tháng 6/2025 - Tháng 12/2025',
      status: 'published',
    },
  ]);

  // Form state for Inventory
  const [inventoryForm, setInventoryForm] = useState({
    lotId: '',
    treeType: '',
    avgDiameter: '',
    treeDensity: '',
    currentCanopy: '',
    understoryCleared: false,
  });

  // Form state for Generator
  const [generatorForm, setGeneratorForm] = useState({
    lotId: '',
    projectName: '',
    treeType: 'Mega 3P',
    treesToPlant: '',
    targetCanopy: '',
    timeline: '',
  });

  // Form state for Template Projects
  const [templateForm, setTemplateForm] = useState({
    // Common fields
    lotId: '',
    projectName: '',
    treeType: 'Mega 3P',
    area: '',
    treesToPlant: '',
    timeline: '',
    
    // ESG Template specific
    biodiversity: '',
    carbonTarget: '',
    socialImpact: '',
    
    // Timber Template specific
    targetDiameter: '',
    harvestCycle: '',
    fscCertified: false,
    volumeTarget: '',
    
    // Government Template specific
    protectionPurpose: '',
    householdCount: '',
    projectCode: '',
  });

  // Auto-select lot and tab from URL params
  useEffect(() => {
    const lotParam = searchParams.get('lot');
    const tabParam = searchParams.get('tab');
    const esgRfpParam = searchParams.get('esgRfp');
    
    if (tabParam && ['inventory', 'alerts', 'projects', 'funding', 'allocator', 'forestry'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
    
    // Nếu có esgRfp trong URL, tự động mở modal generator và chuyển sang tab funding
    if (esgRfpParam && tabParam === 'funding') {
      setActiveTab('funding');
      setShowGeneratorModal(true);
      // In real app, load ESG RFP data and pre-fill form
    }
    
    if (lotParam) {
      const lot = forestLots.find(l => l.name.toLowerCase() === lotParam.toLowerCase());
      if (lot) {
        setSelectedLot(lot);
        setActiveTab('funding');
        setShowGeneratorModal(true);
        setGeneratorForm(prev => ({
          ...prev,
          lotId: lot.id,
          projectName: `Trồng rừng che bóng cho ${lot.b2bRequirements[0]?.herb || 'dược liệu'} - ${lot.name}`,
          targetCanopy: String(lot.b2bRequirements[0]?.requiredCanopy || 70),
        }));
      }
    }
  }, [searchParams, forestLots]);

  // Calculate coverage gaps
  const coverageGaps = forestLots.flatMap(lot =>
    lot.b2bRequirements.map(req => ({
      lot,
      requirement: req,
      gap: req.requiredCanopy - lot.currentCanopy,
    }))
  ).filter(item => item.gap > 0);

  const handleInventorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update forest lot data
    setForestLots(prev => prev.map(lot =>
      lot.id === inventoryForm.lotId
        ? {
            ...lot,
            treeType: inventoryForm.treeType,
            avgDiameter: parseFloat(inventoryForm.avgDiameter),
            treeDensity: parseFloat(inventoryForm.treeDensity),
            currentCanopy: parseFloat(inventoryForm.currentCanopy),
            understoryCleared: inventoryForm.understoryCleared,
          }
        : lot
    ));
    setShowInventoryModal(false);
    setInventoryForm({
      lotId: '',
      treeType: '',
      avgDiameter: '',
      treeDensity: '',
      currentCanopy: '',
      understoryCleared: false,
    });
  };

  const handleGeneratorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lot = forestLots.find(l => l.id === generatorForm.lotId);
    if (!lot) return;

    const newProject: ESGProject = {
      id: `proj-${Date.now()}`,
      name: generatorForm.projectName,
      lotId: generatorForm.lotId,
      targetArea: lot.area,
      treesToPlant: parseFloat(generatorForm.treesToPlant),
      currentCanopy: lot.currentCanopy,
      targetCanopy: parseFloat(generatorForm.targetCanopy),
      fundingNeeded: parseFloat(generatorForm.treesToPlant) * 125000, // 125k VNĐ/cây
      carbonCredits: parseFloat(generatorForm.treesToPlant) * 2, // 2 tons CO2/cây (10 năm)
      timeline: generatorForm.timeline,
      status: 'draft',
    };

    setEsgProjects(prev => [...prev, newProject]);
    setShowGeneratorModal(false);
    setActiveTab('projects');
  };

  const publishToESG = async (project: ESGProject) => {
    setEsgProjects(prev => prev.map(p =>
      p.id === project.id ? { ...p, status: 'published' as const } : p
    ));
    await greenInvestmentOpportunityService.addOpportunity({
      id: project.id,
      name: project.name,
      cooperative: 'HTX Rừng Dược (GreenLight)',
      targetAmount: project.fundingNeeded,
      raised: 0,
      minInvest: 5_000_000,
      expectedReturn: 12,
      duration: project.timeline,
      investors: 0,
      description: `Dự án trồng rừng ${project.targetArea} ha, ${project.treesToPlant} cây. Ước tính ${project.carbonCredits} tấn CO2.`,
      carbonCreditsEstimate: project.carbonCredits,
      esgCategory: 'rừng',
      source: 'admin_forest_funding',
    });
    alert('Dự án đã được đăng lên Sàn ESG và Cơ hội đầu tư Cá nhân! Doanh nghiệp ESG và cá nhân có thể xem và đầu tư.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Quản trị Hiện trạng & Kêu gọi Tài trợ Rừng" />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'inventory'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-file-list-3-line text-lg"></i>
              <span>Kiểm kê Rừng</span>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'alerts'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-alert-line text-lg"></i>
              <span>Cảnh báo Thiếu hụt</span>
              {coverageGaps.length > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {coverageGaps.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-folder-open-line text-lg"></i>
              <span>Dự án Đã tạo</span>
              {esgProjects.length > 0 && (
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  {esgProjects.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('funding')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'funding'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-funds-line text-lg"></i>
              <span>Lập Dự Án & Gọi Vốn</span>
            </button>
            <button
              onClick={() => setActiveTab('allocator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'allocator'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-user-settings-line text-lg"></i>
              <span>Phân Bổ & Giao Nhiệm Vụ</span>
            </button>
            <button
              onClick={() => setActiveTab('forestry')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'forestry'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-plant-line text-lg"></i>
              <span>Lâm sinh & Tiêu chuẩn</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-list-3-line text-emerald-600"></i>
                Số hóa Hiện trạng Rừng Thực tế (Forest Reality Input)
              </h2>
              <p className="text-gray-600 mb-6">
                Khai báo những gì đang thực sự có trên mặt đất để hệ thống so sánh với Tiêu chuẩn VITA.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forestLots.map((lot) => (
                  <div
                    key={lot.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedLot(lot);
                      setInventoryForm({
                        lotId: lot.id,
                        treeType: lot.treeType,
                        avgDiameter: String(lot.avgDiameter),
                        treeDensity: String(lot.treeDensity),
                        currentCanopy: String(lot.currentCanopy),
                        understoryCleared: lot.understoryCleared,
                      });
                      setShowInventoryModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{lot.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lot.currentCanopy >= 60 ? 'bg-green-100 text-green-700' :
                        lot.currentCanopy >= 30 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {lot.currentCanopy}% che phủ
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Diện tích:</strong> {lot.area} ha</p>
                      <p><strong>Loại cây:</strong> {lot.treeType}</p>
                      <p><strong>Mật độ:</strong> {lot.treeDensity} cây/ha</p>
                      <p><strong>Đường kính TB:</strong> {lot.avgDiameter} cm</p>
                      {lot.b2bRequirements.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-orange-600 font-semibold">
                            <i className="ri-notification-3-line mr-1"></i>
                            {lot.b2bRequirements.length} yêu cầu B2B
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-red-600"></i>
                Hệ thống Cảnh báo Thiếu hụt (Coverage Gap Alert)
              </h2>
              <p className="text-gray-600 mb-6">
                So sánh Yêu cầu B2B vs Hiện trạng thực tế để phát hiện khoảng cách cần lấp đầy.
              </p>

              {coverageGaps.length === 0 ? (
                <div className="text-center py-12 bg-green-50 rounded-lg">
                  <i className="ri-checkbox-circle-line text-green-600 text-5xl mb-4"></i>
                  <p className="text-gray-700 font-semibold">Tất cả lô đất đều đạt chuẩn!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {coverageGaps.map((item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {item.lot.name} - {item.requirement.herb}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Yêu cầu che phủ</p>
                              <p className="font-bold text-gray-900">{item.requirement.requiredCanopy}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Hiện trạng</p>
                              <p className="font-bold text-gray-900">{item.lot.currentCanopy}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Thiếu hụt</p>
                              <p className="font-bold text-red-600">{item.gap}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Đơn hàng B2B</p>
                              <p className="font-mono text-xs text-gray-900">{item.requirement.orderId}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <i className="ri-lightbulb-line text-yellow-600"></i>
                          Gợi ý khắc phục (AI Suggestion)
                        </h4>
                        <p className="text-sm text-gray-700">
                          Để đạt {item.requirement.requiredCanopy}% che phủ vào năm 2026 (thời điểm xuống giống {item.requirement.herb}),
                          bạn cần trồng thêm <strong className="text-emerald-600">
                            {Math.ceil(item.lot.area * (item.gap / 100) * 10)} cây Mega 3P/ha
                          </strong> ngay trong tháng tới.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedLot(item.lot);
                          setActiveTab('generator');
                          setGeneratorForm({
                            lotId: item.lot.id,
                            projectName: `Trồng rừng che bóng cho ${item.requirement.herb} - ${item.lot.name}`,
                            treeType: 'Mega 3P',
                            treesToPlant: String(Math.ceil(item.lot.area * (item.gap / 100) * 10)),
                            targetCanopy: String(item.requirement.requiredCanopy),
                            timeline: 'Tháng 6/2025 - Tháng 12/2025',
                          });
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        <i className="ri-add-circle-line mr-2"></i>
                        Tạo Dự án Gọi vốn Trồng rừng
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generator Modal (Quick Create) */}
        {showGeneratorModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Tạo nhanh Dự án Gọi vốn</h3>
                <button
                  onClick={() => setShowGeneratorModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleGeneratorSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn Lô đất <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={generatorForm.lotId}
                      onChange={(e) => {
                        const lot = forestLots.find(l => l.id === e.target.value);
                        setGeneratorForm({
                          ...generatorForm,
                          lotId: e.target.value,
                          projectName: lot ? `Trồng rừng che bóng cho dược liệu - ${lot.name}` : '',
                          targetCanopy: lot && lot.b2bRequirements.length > 0
                            ? String(lot.b2bRequirements[0].requiredCanopy)
                            : '70',
                        });
                      }}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">-- Chọn lô đất --</option>
                      {forestLots.map(lot => (
                        <option key={lot.id} value={lot.id}>
                          {lot.name} ({lot.area} ha, {lot.currentCanopy}% che phủ)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên dự án <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={generatorForm.projectName}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, projectName: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại cây trồng <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={generatorForm.treeType}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, treeType: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Mega 3P">Mega 3P (Cây Gáo lai)</option>
                      <option value="Keo lai">Keo lai</option>
                      <option value="Bạch đàn">Bạch đàn</option>
                      <option value="Sưa đỏ">Sưa đỏ (Gỗ quý)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số cây cần trồng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={generatorForm.treesToPlant}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, treesToPlant: e.target.value })}
                      required
                      min="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Độ che phủ mục tiêu (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={generatorForm.targetCanopy}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, targetCanopy: e.target.value })}
                      required
                      min="20"
                      max="90"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiến độ trồng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={generatorForm.timeline}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, timeline: e.target.value })}
                      required
                      placeholder="VD: Tháng 6/2025 - Tháng 12/2025"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Auto-calculated values */}
                {generatorForm.lotId && generatorForm.treesToPlant && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Thông tin Dự án (Tự động tính toán)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Số tiền cần tài trợ</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {(parseFloat(generatorForm.treesToPlant) * 125000 / 1000000).toFixed(1)} triệu VNĐ
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tín chỉ Carbon (10 năm)</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {(parseFloat(generatorForm.treesToPlant) * 2).toLocaleString()} tấn CO₂
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Giá trị xã hội</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {Math.ceil(parseFloat(generatorForm.treesToPlant) / 200)} hộ dân
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Quyền lợi gỗ</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          Sau 7 năm
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowGeneratorModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Tạo Dự án
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-folder-open-line text-emerald-600"></i>
                Dự án Đã tạo
              </h2>

              <div className="space-y-4">
                {esgProjects.map((project) => {
                  const lot = forestLots.find(l => l.id === project.lotId);
                  return (
                    <div
                      key={project.id}
                      className="border-2 border-gray-200 rounded-lg p-6 hover:border-emerald-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Diện tích</p>
                              <p className="font-bold">{project.targetArea} ha</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Số cây trồng</p>
                              <p className="font-bold">{project.treesToPlant.toLocaleString()} cây</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Độ che phủ</p>
                              <p className="font-bold">{project.currentCanopy}% → {project.targetCanopy}%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Vốn cần</p>
                              <p className="font-bold text-emerald-600">
                                {(project.fundingNeeded / 1000000).toFixed(0)} triệu VNĐ
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'funded'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {project.status === 'published' ? 'Đã đăng' :
                           project.status === 'funded' ? 'Đã tài trợ' :
                           'Bản nháp'}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Tín chỉ Carbon</p>
                            <p className="font-bold text-emerald-600">{project.carbonCredits.toLocaleString()} tấn CO₂</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tiến độ</p>
                            <p className="font-bold">{project.timeline}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Lô đất</p>
                            <p className="font-bold">{lot?.name || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {project.status === 'draft' && (
                          <button
                            onClick={() => publishToESG(project)}
                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                          >
                            <i className="ri-upload-cloud-line mr-2"></i>
                            Đăng lên Sàn ESG
                          </button>
                        )}
                        <button
                          onClick={() => navigate('/esg-portal/dashboard')}
                          className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          Xem trên ESG Portal
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Inventory Modal */}
        {showInventoryModal && selectedLot && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Kiểm kê Rừng - {selectedLot.name}</h3>
                <button
                  onClick={() => setShowInventoryModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleInventorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại cây hiện hữu <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={inventoryForm.treeType}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, treeType: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn loại cây --</option>
                    <option value="Keo lai">Keo lai</option>
                    <option value="Thông 3 lá">Thông 3 lá</option>
                    <option value="Mega 3P">Mega 3P</option>
                    <option value="Bạch đàn">Bạch đàn</option>
                    <option value="Đất trống">Đất trống</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đường kính trung bình (cm)
                    </label>
                    <input
                      type="number"
                      value={inventoryForm.avgDiameter}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, avgDiameter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật độ thực tế (cây/ha)
                    </label>
                    <input
                      type="number"
                      value={inventoryForm.treeDensity}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, treeDensity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Độ che phủ thực tế (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={inventoryForm.currentCanopy}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, currentCanopy: e.target.value })}
                    required
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hệ thống có thể hỗ trợ kiểm chứng bằng ảnh vệ tinh hoặc AI phân tích ảnh chụp ngước.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={inventoryForm.understoryCleared}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, understoryCleared: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label className="text-sm text-gray-700">Đã dọn thực bì (Understory cleared)</label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Lưu Kiểm kê
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInventoryModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab: Lập Dự Án & Gọi Vốn Đa Nguồn */}
        {activeTab === 'funding' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-funds-line text-emerald-600"></i>
                Lập Dự Án & Gọi Vốn Đa Nguồn (Project Creator & Funding Hub)
              </h2>
              <p className="text-gray-600 mb-6">
                Chọn mẫu phù hợp với nguồn vốn bạn muốn gọi để tạo dự án trồng rừng. Hoặc tạo nhanh từ cảnh báo thiếu hụt.
              </p>

              {/* Quick Create Option */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-magic-line text-purple-600"></i>
                  Tạo nhanh từ Cảnh báo Thiếu hụt
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nếu bạn đã có cảnh báo thiếu hụt che phủ, có thể tạo dự án nhanh với form đơn giản.
                </p>
                <button
                  onClick={() => {
                    setShowGeneratorModal(true);
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <i className="ri-add-circle-line mr-2"></i>
                  Tạo nhanh Dự án ESG
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Template A: ESG */}
                <div className="border-2 border-green-200 rounded-xl p-6 hover:border-green-500 transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <i className="ri-leaf-line text-white text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Mẫu A: ESG</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Gọi vốn từ Doanh nghiệp ESG (Tài trợ Carbon/CSR)
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5"></i>
                      <span>Nhấn mạnh: Số lượng cây, Loại cây bản địa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5"></i>
                      <span>Khả năng hấp thụ CO₂, Đa dạng sinh học</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5"></i>
                      <span>Đầu ra: Tín chỉ Carbon + Thương hiệu</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedTemplate('esg');
                      setTemplateForm({
                        lotId: '',
                        projectName: '',
                        treeType: 'Mega 3P',
                        area: '',
                        treesToPlant: '',
                        timeline: '',
                        biodiversity: '',
                        carbonTarget: '',
                        socialImpact: '',
                        targetDiameter: '',
                        harvestCycle: '',
                        fscCertified: false,
                        volumeTarget: '',
                        protectionPurpose: '',
                        householdCount: '',
                        projectCode: '',
                      });
                      setShowTemplateModal(true);
                    }}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Tạo Dự án ESG
                  </button>
                </div>

                {/* Template B: Timber */}
                <div className="border-2 border-amber-200 rounded-xl p-6 hover:border-amber-500 transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                      <i className="ri-tree-line text-white text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Mẫu B: Gỗ</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Gọi vốn từ Doanh nghiệp Gỗ (Hợp đồng tương lai)
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-amber-600 mt-0.5"></i>
                      <span>Nhấn mạnh: Loại cây lấy gỗ (Keo, Bạch đàn, Mega 3P)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-amber-600 mt-0.5"></i>
                      <span>Chu kỳ khai thác (5-7 năm), Đường kính mục tiêu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-amber-600 mt-0.5"></i>
                      <span>Đầu ra: Gỗ nguyên liệu (m³)</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedTemplate('timber');
                      setTemplateForm({
                        lotId: '',
                        projectName: '',
                        treeType: 'Mega 3P',
                        area: '',
                        treesToPlant: '',
                        timeline: '',
                        biodiversity: '',
                        carbonTarget: '',
                        socialImpact: '',
                        targetDiameter: '',
                        harvestCycle: '5-7',
                        fscCertified: false,
                        volumeTarget: '',
                        protectionPurpose: '',
                        householdCount: '',
                        projectCode: '',
                      });
                      setShowTemplateModal(true);
                    }}
                    className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Tạo Dự án Gỗ
                  </button>
                </div>

                {/* Template C: Government */}
                <div className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <i className="ri-government-line text-white text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Mẫu C: Nhà nước</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Xin ngân sách Nhà nước (Dự án 661/Trồng rừng thay thế)
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-blue-600 mt-0.5"></i>
                      <span>Nhấn mạnh: Phủ xanh đất trống đồi trọc</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-blue-600 mt-0.5"></i>
                      <span>An sinh xã hội, Phòng hộ đầu nguồn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-blue-600 mt-0.5"></i>
                      <span>Đầu ra: Diện tích rừng phòng hộ</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setSelectedTemplate('government');
                      setTemplateForm({
                        lotId: '',
                        projectName: '',
                        treeType: 'Mega 3P',
                        area: '',
                        treesToPlant: '',
                        timeline: '',
                        biodiversity: '',
                        carbonTarget: '',
                        socialImpact: '',
                        targetDiameter: '',
                        harvestCycle: '',
                        fscCertified: false,
                        volumeTarget: '',
                        protectionPurpose: '',
                        householdCount: '',
                        projectCode: '',
                      });
                      setShowTemplateModal(true);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Tạo Dự án Nhà nước
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Phân Bổ & Giao Nhiệm Vụ */}
        {activeTab === 'allocator' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-user-settings-line text-emerald-600"></i>
                Phân Bổ & Giao Nhiệm Vụ (Task Allocator)
              </h2>
              <p className="text-gray-600 mb-6">
                Sau khi nhận được tiền (từ ESG) hoặc đơn đặt hàng (từ Doanh nghiệp Gỗ), phân bổ nhiệm vụ cho các hộ xã viên.
              </p>

              {/* Mock Order */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-emerald-600"></i>
                  Đơn hàng mới nhận
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Loại cây</p>
                    <p className="font-bold text-gray-900">Mega 3P</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Số lượng</p>
                    <p className="font-bold text-gray-900">10,000 cây</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nguồn vốn</p>
                    <p className="font-bold text-emerald-600">ESG Tài trợ</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Thời hạn</p>
                    <p className="font-bold text-gray-900">30 ngày</p>
                  </div>
                </div>
              </div>

              {/* Map View */}
              <div className="bg-gray-100 rounded-xl p-6 mb-6 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-map-2-line text-6xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600 font-semibold">Bản đồ các lô đất của xã viên</p>
                  <p className="text-sm text-gray-500 mt-2">
                    (Tích hợp với GIS - Hiển thị các lô đất trống và đã có cây)
                  </p>
                </div>
              </div>

              {/* Allocation List */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-list-check text-emerald-600"></i>
                  Danh sách Phân bổ
                </h3>
                {[
                  { farmer: 'Ông Nguyễn Văn A', lot: 'Lô A - 2ha', quantity: 2000, status: 'pending' },
                  { farmer: 'Bà Trần Thị B', lot: 'Lô B - 1.5ha', quantity: 1500, status: 'pending' },
                  { farmer: 'Anh Lê Văn C', lot: 'Lô C - 3ha', quantity: 3000, status: 'assigned' },
                  { farmer: 'Chị Phạm Thị D', lot: 'Lô D - 2.5ha', quantity: 2500, status: 'assigned' },
                  { farmer: 'Bác Hoàng Văn E', lot: 'Lô E - 1ha', quantity: 1000, status: 'pending' },
                ].map((allocation, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{allocation.farmer}</h4>
                        <p className="text-sm text-gray-600">{allocation.lot}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-sm text-gray-600">Số lượng</p>
                        <p className="font-bold text-emerald-600">{allocation.quantity.toLocaleString()} cây</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          allocation.status === 'assigned'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {allocation.status === 'assigned' ? 'Đã giao' : 'Chờ giao'}
                        </span>
                      </div>
                    </div>
                    {allocation.status === 'pending' && (
                      <button
                        onClick={() => {
                          alert(`Đã giao nhiệm vụ cho ${allocation.farmer}!\n\nNhiệm vụ sẽ hiện trên App của họ ngay lập tức.`);
                        }}
                        className="mt-3 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <i className="ri-send-plane-line mr-2"></i>
                        Giao nhiệm vụ
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Lâm sinh & Tiêu chuẩn */}
        {activeTab === 'forestry' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-plant-line text-emerald-600"></i>
                Lâm sinh & Tiêu chuẩn VITA
              </h2>
              <p className="text-gray-600 mb-6">
                Quản lý Hệ sinh thái Đa tầng tán - Rừng gỗ lớn che bóng cho dược liệu
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-sun-cloudy-line text-emerald-600"></i>
                  Quy chuẩn Tỷ lệ che bóng (Shade Ratio)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mức chuẩn</p>
                    <p className="text-2xl font-bold text-emerald-600">50% - 60%</p>
                    <p className="text-sm text-gray-600 mt-2">Tối ưu cho Sâm, Tam thất</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Công thức tính</p>
                    <p className="text-sm font-mono text-gray-700">Mật độ = (Diện tích × Tỷ lệ che phủ) / (Diện tích tán × Hệ số)</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Ví dụ: Để đạt che phủ 50% với Mega 3P (tán rộng 4m), cần trồng mật độ 600 cây/ha
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-flashlight-line text-blue-600"></i>
                    Cây sinh trưởng nhanh (Pioneer)
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-bold text-gray-900 mb-2">Mega 3P (Cây Gáo lai)</h5>
                      <p className="text-sm text-gray-600 mb-2">Ưu điểm: Lớn nhanh, Tạo bóng sau 12-18 tháng, Tán rộng 4m</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">Tán:</span> <span className="font-semibold">4m</span></div>
                        <div><span className="text-gray-600">Thời gian:</span> <span className="font-semibold">12-18 tháng</span></div>
                        <div><span className="text-gray-600">Mật độ:</span> <span className="font-semibold">600 cây/ha</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-bold text-gray-900 mb-2">Bạch đàn mô</h5>
                      <p className="text-sm text-gray-600 mb-2">Ưu điểm: Sinh trưởng nhanh, Chịu hạn tốt, Tán rộng 3.5m</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">Tán:</span> <span className="font-semibold">3.5m</span></div>
                        <div><span className="text-gray-600">Thời gian:</span> <span className="font-semibold">18-24 tháng</span></div>
                        <div><span className="text-gray-600">Mật độ:</span> <span className="font-semibold">700 cây/ha</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-tree-line text-green-600"></i>
                    Cây gỗ quý (Long-term)
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-bold text-gray-900 mb-2">Sưa đỏ</h5>
                      <p className="text-sm text-gray-600 mb-2">Ưu điểm: Giá trị kinh tế cao, Gỗ quý, Rễ sâu giữ đất</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">Tán:</span> <span className="font-semibold">5m</span></div>
                        <div><span className="text-gray-600">Thời gian:</span> <span className="font-semibold">15-20 năm</span></div>
                        <div><span className="text-gray-600">Mật độ:</span> <span className="font-semibold">400 cây/ha</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-bold text-gray-900 mb-2">Giổi / Lát</h5>
                      <p className="text-sm text-gray-600 mb-2">Ưu điểm: Gỗ quý, Bản địa, Bền vững</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-600">Tán:</span> <span className="font-semibold">5-5.5m</span></div>
                        <div><span className="text-gray-600">Thời gian:</span> <span className="font-semibold">15-22 năm</span></div>
                        <div><span className="text-gray-600">Mật độ:</span> <span className="font-semibold">380-400 cây/ha</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-layout-grid-line text-purple-600"></i>
                  Quy cách trồng "Rừng Dược Liệu Đa Tầng"
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mô hình</p>
                    <p className="font-semibold text-gray-900">Trồng theo băng hoặc nanh sấu</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Khoảng cách</p>
                    <p className="font-semibold text-gray-900">4m (Hàng cách hàng)</p>
                    <p className="text-sm text-gray-600">3m (Cây cách cây)</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Bố trí</p>
                    <p className="font-semibold text-gray-900">Băng rừng cách băng dược liệu</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate('/admin-forestry')}
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
                >
                  <i className="ri-external-link-line mr-2"></i>
                  Xem chi tiết Tiêu chuẩn VITA
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                >
                  <i className="ri-file-list-3-line mr-2"></i>
                  Kiểm kê Rừng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Template Modal */}
        {showTemplateModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedTemplate === 'esg' && 'Tạo Dự án ESG (Carbon/CSR)'}
                  {selectedTemplate === 'timber' && 'Tạo Dự án Gỗ (Timber Futures)'}
                  {selectedTemplate === 'government' && 'Tạo Dự án Nhà nước (Dự án 661)'}
                </h3>
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                // Create project based on template
                const lot = forestLots.find(l => l.id === templateForm.lotId);
                if (!lot) return;

                const newProject: ESGProject = {
                  id: `proj-${Date.now()}`,
                  name: templateForm.projectName,
                  lotId: templateForm.lotId,
                  targetArea: parseFloat(templateForm.area) || lot.area,
                  treesToPlant: parseFloat(templateForm.treesToPlant),
                  currentCanopy: lot.currentCanopy,
                  targetCanopy: selectedTemplate === 'esg' ? 70 : 60,
                  fundingNeeded: parseFloat(templateForm.treesToPlant) * 125000,
                  carbonCredits: parseFloat(templateForm.treesToPlant) * 2,
                  timeline: templateForm.timeline,
                  status: 'draft',
                };

                setEsgProjects(prev => [...prev, newProject]);
                setShowTemplateModal(false);
                setSelectedTemplate(null);
                setActiveTab('projects');
                alert('Dự án đã được tạo thành công!');
              }} className="space-y-6">
                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn Lô đất <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={templateForm.lotId}
                      onChange={(e) => {
                        const lot = forestLots.find(l => l.id === e.target.value);
                        setTemplateForm({
                          ...templateForm,
                          lotId: e.target.value,
                          area: lot ? String(lot.area) : '',
                          projectName: lot ? `Trồng rừng ${selectedTemplate === 'esg' ? 'ESG' : selectedTemplate === 'timber' ? 'Gỗ' : 'Nhà nước'} - ${lot.name}` : '',
                        });
                      }}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">-- Chọn lô đất --</option>
                      {forestLots.map(lot => (
                        <option key={lot.id} value={lot.id}>
                          {lot.name} ({lot.area} ha, {lot.currentCanopy}% che phủ)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên dự án <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={templateForm.projectName}
                      onChange={(e) => setTemplateForm({ ...templateForm, projectName: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại cây trồng <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={templateForm.treeType}
                      onChange={(e) => setTemplateForm({ ...templateForm, treeType: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Mega 3P">Mega 3P (Cây Gáo lai)</option>
                      <option value="Keo lai">Keo lai</option>
                      <option value="Bạch đàn">Bạch đàn</option>
                      <option value="Sưa đỏ">Sưa đỏ (Gỗ quý)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diện tích (ha) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={templateForm.area}
                      onChange={(e) => setTemplateForm({ ...templateForm, area: e.target.value })}
                      required
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số cây trồng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={templateForm.treesToPlant}
                      onChange={(e) => setTemplateForm({ ...templateForm, treesToPlant: e.target.value })}
                      required
                      min="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiến độ trồng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={templateForm.timeline}
                      onChange={(e) => setTemplateForm({ ...templateForm, timeline: e.target.value })}
                      required
                      placeholder="VD: Tháng 6/2025 - Tháng 12/2025"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* ESG Template Specific Fields */}
                {selectedTemplate === 'esg' && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-leaf-line text-green-600"></i>
                      Thông tin ESG (Tài trợ Carbon/CSR)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đa dạng sinh học
                        </label>
                        <input
                          type="text"
                          value={templateForm.biodiversity}
                          onChange={(e) => setTemplateForm({ ...templateForm, biodiversity: e.target.value })}
                          placeholder="VD: 15 loài thực vật, 5 loài chim"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mục tiêu Carbon (tấn CO₂)
                        </label>
                        <input
                          type="number"
                          value={templateForm.carbonTarget}
                          onChange={(e) => setTemplateForm({ ...templateForm, carbonTarget: e.target.value })}
                          placeholder="VD: 8000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tác động xã hội
                        </label>
                        <input
                          type="text"
                          value={templateForm.socialImpact}
                          onChange={(e) => setTemplateForm({ ...templateForm, socialImpact: e.target.value })}
                          placeholder="VD: Tạo việc làm cho 50 hộ dân"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Timber Template Specific Fields */}
                {selectedTemplate === 'timber' && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-tree-line text-amber-600"></i>
                      Thông tin Gỗ (Hợp đồng tương lai)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đường kính mục tiêu (cm)
                        </label>
                        <input
                          type="number"
                          value={templateForm.targetDiameter}
                          onChange={(e) => setTemplateForm({ ...templateForm, targetDiameter: e.target.value })}
                          placeholder="VD: 25"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chu kỳ khai thác (năm)
                        </label>
                        <select
                          value={templateForm.harvestCycle}
                          onChange={(e) => setTemplateForm({ ...templateForm, harvestCycle: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="5-7">5-7 năm</option>
                          <option value="7-10">7-10 năm</option>
                          <option value="10-15">10-15 năm</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Khối lượng mục tiêu (m³)
                        </label>
                        <input
                          type="number"
                          value={templateForm.volumeTarget}
                          onChange={(e) => setTemplateForm({ ...templateForm, volumeTarget: e.target.value })}
                          placeholder="VD: 500"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <input
                          type="checkbox"
                          checked={templateForm.fscCertified}
                          onChange={(e) => setTemplateForm({ ...templateForm, fscCertified: e.target.checked })}
                          className="w-5 h-5 text-amber-600"
                        />
                        <label className="text-sm text-gray-700">Yêu cầu chứng nhận FSC/PEFC</label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Government Template Specific Fields */}
                {selectedTemplate === 'government' && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-government-line text-blue-600"></i>
                      Thông tin Dự án Nhà nước (Dự án 661)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mục đích phòng hộ
                        </label>
                        <select
                          value={templateForm.protectionPurpose}
                          onChange={(e) => setTemplateForm({ ...templateForm, protectionPurpose: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">-- Chọn mục đích --</option>
                          <option value="phong-ho-dau-nguon">Phòng hộ đầu nguồn</option>
                          <option value="chong-xoi-mon">Chống xói mòn</option>
                          <option value="bao-ve-moi-truong">Bảo vệ môi trường</option>
                          <option value="phu-xanh-dat-trong">Phủ xanh đất trống đồi trọc</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số hộ dân tham gia
                        </label>
                        <input
                          type="number"
                          value={templateForm.householdCount}
                          onChange={(e) => setTemplateForm({ ...templateForm, householdCount: e.target.value })}
                          placeholder="VD: 50"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mã dự án (nếu có)
                        </label>
                        <input
                          type="text"
                          value={templateForm.projectCode}
                          onChange={(e) => setTemplateForm({ ...templateForm, projectCode: e.target.value })}
                          placeholder="VD: 661/2025-KT"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto-calculated Summary */}
                {templateForm.lotId && templateForm.treesToPlant && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Tóm tắt Dự án (Tự động tính toán)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Số tiền cần</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {(parseFloat(templateForm.treesToPlant) * 125000 / 1000000).toFixed(1)} triệu VNĐ
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tín chỉ Carbon</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {(parseFloat(templateForm.treesToPlant) * 2).toLocaleString()} tấn CO₂
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Giá trị xã hội</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {Math.ceil(parseFloat(templateForm.treesToPlant) / 200)} hộ dân
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Mật độ trồng</p>
                        <p className="font-bold text-emerald-600 text-lg">
                          {templateForm.area ? Math.round(parseFloat(templateForm.treesToPlant) / parseFloat(templateForm.area)) : 0} cây/ha
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all ${
                      selectedTemplate === 'esg' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                      selectedTemplate === 'timber' ? 'bg-gradient-to-r from-amber-600 to-orange-600' :
                      'bg-gradient-to-r from-blue-600 to-indigo-600'
                    }`}
                  >
                    <i className="ri-save-line mr-2"></i>
                    Tạo Dự án
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowTemplateModal(false);
                      setSelectedTemplate(null);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

