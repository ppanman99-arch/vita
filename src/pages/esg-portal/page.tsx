import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PortalSwitcher from '../../components/shared/PortalSwitcher';
import BackButton from '../../components/shared/BackButton';

export default function ESGPortalPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  
  // Check authentication and get company info
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('esg_authenticated');
    const email = sessionStorage.getItem('esg_email');
    const name = sessionStorage.getItem('esg_company_name');
    
    if (!isAuthenticated || !email) {
      navigate('/esg-portal/login');
      return;
    }

    // Set company name from session or extract from email
    if (name) {
      setCompanyName(name);
    } else {
      // Extract company name from email (before @)
      const emailName = email.split('@')[0];
      setCompanyName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
    }
  }, [navigate]);
  
  const [activeTab, setActiveTab] = useState<'projects' | 'target-builder' | 'seed-sponsor' | 'dashboard' | 'change-stories' | 'impact' | 'reports'>('projects');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [investmentType, setInvestmentType] = useState<'sponsor' | 'share'>('sponsor');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showTimelapse, setShowTimelapse] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [dashboardView, setDashboardView] = useState<'overview' | 'project'>('overview');
  const [selectedProjectForDashboard, setSelectedProjectForDashboard] = useState<string | null>(null);
  
  // Target Builder State
  const [targetForm, setTargetForm] = useState({
    carbonTarget: '', // tấn CO2
    socialTarget: '', // số người
    socialTargetType: 'women_minority', // women_minority, general, youth
    budget: '', // tỷ VNĐ/năm
    location: [] as string[], // regions
    timelineStart: '2025',
    timelineEnd: '2030',
    // Social Impact Packages (SDG Integration)
    socialImpactPackages: {
      womenEmpowerment: false, // SDG 5 - >50% women beneficiaries
      indigenousSupport: false, // Support ethnic minorities
      indigenousEthnicity: '', // Specific ethnicity (Xơ Đăng, Ê Đê, etc.)
      biodiversityConservation: false, // SDG 15 - Preserve endangered species
      endangeredSpecies: [] as string[], // List of endangered species to preserve
      reinvestmentCommitment: false, // SDG 4 & 9 - Infrastructure/Education
      reinvestmentPercent: '', // % of funding for schools/health centers
      povertyReduction: false, // SDG 1 - Track income increase
      jobCreation: false, // SDG 8 - Number of jobs created
      waterProtection: false, // SDG 6 - Watershed protection
    },
  });
  const [matchingResults, setMatchingResults] = useState<any>(null);
  const [showMatchingResults, setShowMatchingResults] = useState(false);
  
  // Real-time data simulation
  const [realTimeData, setRealTimeData] = useState({
    disbursement: 500,
    disbursementTarget: 1000,
    survivalRate: 95,
    treesAlive: 57000,
    treesTotal: 60000,
    carbonAccumulated: 50,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        carbonAccumulated: prev.carbonAccumulated + Math.random() * 0.5,
        survivalRate: 95 + Math.random() * 0.5,
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // ESG Projects Data
  const esgProjects = [
    {
      id: 'proj-001',
      name: 'Trồng 50ha rừng Mega 3P + Sâm Ngọc Linh tại Kon Tum',
      htx: 'HTX Dược liệu Kon Tum',
      location: 'Kon Tum, Tây Nguyên',
      area: 50, // ha
      trees: 'Mega 3P + Sâm Ngọc Linh',
      co2Absorption: 15000, // tấn trong 10 năm
      status: 'seeking',
      targetAmount: 2500, // triệu VNĐ
      raisedAmount: 0,
      timeline: '10 năm',
      description: 'Dự án trồng rừng hỗn giao với cây che bóng Mega 3P và dược liệu Sâm Ngọc Linh',
    },
    {
      id: 'proj-002',
      name: 'Trồng 30ha rừng Sưa đỏ + Đương Quy tại Phú Thọ',
      htx: 'HTX Dược liệu Phú Thọ',
      location: 'Phú Thọ, Đông Bắc',
      area: 30,
      trees: 'Sưa đỏ + Đương Quy',
      co2Absorption: 9000,
      status: 'seeking',
      targetAmount: 5000,
      raisedAmount: 1500,
      timeline: '15 năm',
      description: 'Dự án trồng rừng gỗ quý lâu năm kết hợp dược liệu',
    },
    {
      id: 'proj-003',
      name: 'Trồng 100ha rừng Bạch đàn + Cà Gai Leo tại Hòa Bình',
      htx: 'HTX Dược liệu Hòa Bình',
      location: 'Hòa Bình, Tây Bắc',
      area: 100,
      trees: 'Bạch đàn + Cà Gai Leo',
      co2Absorption: 30000,
      status: 'active',
      targetAmount: 4000,
      raisedAmount: 4000,
      timeline: '12 năm',
      description: 'Dự án quy mô lớn với cây sinh trưởng nhanh',
    },
  ];

  // My Investments (if logged in as ESG company)
  const myInvestments = [
    {
      id: 'inv-001',
      projectId: 'proj-003',
      projectName: 'Trồng 100ha rừng Bạch đàn + Cà Gai Leo tại Hòa Bình',
      amount: 2000, // triệu VNĐ
      type: 'sponsor',
      date: '2024-01-10',
      co2Credits: 15000, // tấn
      status: 'active',
    },
  ];

  // Impact Dashboard Data
  const impactData = {
    totalInvestment: 2000, // triệu VNĐ
    totalCO2: 15000, // tấn
    totalArea: 100, // ha
    totalTrees: 60000, // cây
    projects: 1,
  };

  // CO2 Absorption Chart
  const co2Data = [
    { month: 'T1', co2: 0, cumulative: 0 },
    { month: 'T2', co2: 50, cumulative: 50 },
    { month: 'T3', co2: 120, cumulative: 170 },
    { month: 'T4', co2: 200, cumulative: 370 },
    { month: 'T5', co2: 280, cumulative: 650 },
    { month: 'T6', co2: 350, cumulative: 1000 },
  ];

  const tabs = [
    { id: 'projects', name: 'Dự án Trồng Rừng', icon: 'ri-plant-line' },
    { id: 'target-builder', name: 'Tạo Mục tiêu ESG', icon: 'ri-target-line' },
    { id: 'seed-sponsor', name: 'Tài trợ Giống', icon: 'ri-seedling-line' },
    { id: 'dashboard', name: 'Dashboard ESG', icon: 'ri-dashboard-line' },
    { id: 'change-stories', name: 'Câu chuyện Thay đổi', icon: 'ri-book-open-line' },
    { id: 'impact', name: 'Tác động Môi trường', icon: 'ri-leaf-line' },
    { id: 'reports', name: 'Báo cáo Bền vững', icon: 'ri-file-text-line' },
  ];

  // Multi-Dimensional Matching Algorithm - Enhanced with SDG criteria
  const runMatching = () => {
    const carbonTarget = parseFloat(targetForm.carbonTarget) || 0;
    const socialTarget = parseFloat(targetForm.socialTarget) || 0;
    const budget = parseFloat(targetForm.budget) || 0;
    
    // Calculate required area (1 ha absorbs ~5 tons CO2/year, over 10 years = 50 tons)
    const requiredArea = Math.ceil(carbonTarget / 50); // ha
    
    // Calculate premium multiplier based on Social Impact Packages
    const socialPackagesCount = Object.values(targetForm.socialImpactPackages).filter(v => 
      typeof v === 'boolean' ? v : Array.isArray(v) ? v.length > 0 : v !== ''
    ).length;
    const premiumMultiplier = 1 + (socialPackagesCount * 0.15); // 15% premium per package
    
    // Direct Matching - Find existing projects with Multi-Dimensional scoring
    const directMatches = esgProjects.filter(project => {
      const areaMatch = project.area >= requiredArea * 0.8; // 80% match acceptable
      const locationMatch = targetForm.location.length === 0 || 
        targetForm.location.some(loc => project.location.includes(loc));
      const budgetMatch = project.targetAmount <= budget * 1000; // Convert to million
      return areaMatch && locationMatch && budgetMatch;
    }).map(project => {
      // Multi-dimensional scoring
      let matchScore = 70; // Base score
      
      // Location match (+10)
      const locationMatch = targetForm.location.length === 0 || 
        targetForm.location.some(loc => project.location.includes(loc));
      if (locationMatch) matchScore += 10;
      
      // Area match (+10)
      if (project.area >= requiredArea * 0.9) matchScore += 10;
      
      // Budget match (+5)
      if (project.targetAmount <= budget * 1000 * 0.8) matchScore += 5;
      
      // Social criteria matching (if project has metadata)
      // In real app, this would check project.socialMetrics
      const hasWomenFocus = targetForm.socialImpactPackages.womenEmpowerment && 
        (project.name.toLowerCase().includes('nữ') || project.name.toLowerCase().includes('phụ nữ'));
      if (hasWomenFocus) matchScore += 5;
      
      const hasIndigenousFocus = targetForm.socialImpactPackages.indigenousSupport && 
        (project.location.includes('Kon Tum') || project.location.includes('Tây Nguyên'));
      if (hasIndigenousFocus) matchScore += 5;
      
      return {
        type: 'direct',
        matchScore: Math.min(100, matchScore),
        project: project,
        reason: `Dự án có sẵn phù hợp với mục tiêu của bạn`,
        socialMatch: hasWomenFocus || hasIndigenousFocus,
      };
    });

    // Potential Matching - Find HTX with land but no project
    const potentialMatches = [
      {
        type: 'potential',
        matchScore: 88,
        htx: {
          id: 'htx-001',
          name: 'HTX Tu Mơ Rông',
          location: 'Kon Tum, Tây Nguyên',
          availableLand: 100, // ha
          landStatus: 'empty',
          soilType: 'Đất đỏ Bazan',
          suitability: 'Rất tốt cho Mega 3P',
          greenlightScore: 'A',
          memberCount: 150,
          womenMinorityCount: 45, // 30%
          trustScore: 92,
        },
        reason: 'Có 100ha đất trống phù hợp, chưa có kế hoạch trồng rừng',
        estimatedProject: {
          area: Math.min(requiredArea, 100),
          trees: 'Mega 3P',
          density: 600, // trees/ha
          totalTrees: Math.min(requiredArea, 100) * 600,
          estimatedCost: Math.min(requiredArea, 100) * 50, // 50 triệu/ha
          carbonPotential: Math.min(requiredArea, 100) * 50, // tons over 10 years
        },
      },
      {
        type: 'potential',
        matchScore: 85,
        htx: {
          id: 'htx-002',
          name: 'HTX Dược liệu Gia Lai',
          location: 'Gia Lai, Tây Nguyên',
          availableLand: 80,
          landStatus: 'empty',
          soilType: 'Đất xám',
          suitability: 'Khá tốt cho Mega 3P',
          greenlightScore: 'B+',
          memberCount: 120,
          womenMinorityCount: 40, // 33%
          trustScore: 88,
        },
        reason: 'Có 80ha đất trống, tỷ lệ nữ dân tộc thiểu số cao',
        estimatedProject: {
          area: Math.min(requiredArea, 80),
          trees: 'Mega 3P',
          density: 600,
          totalTrees: Math.min(requiredArea, 80) * 600,
          estimatedCost: Math.min(requiredArea, 80) * 50,
          carbonPotential: Math.min(requiredArea, 80) * 50,
        },
      },
    ].filter(match => {
      const locationMatch = targetForm.location.length === 0 || 
        targetForm.location.some(loc => match.htx.location.includes(loc));
      const socialMatch = targetForm.socialTargetType === 'women_minority' 
        ? match.htx.womenMinorityCount >= socialTarget * 0.3
        : true;
      return locationMatch && socialMatch;
    });

    setMatchingResults({
      directMatches: directMatches.sort((a, b) => b.matchScore - a.matchScore),
      potentialMatches,
      masterOrder: {
        requiredArea,
        suggestedTrees: 'Mega 3P',
        targetHTX: `HTX tại ${targetForm.location.join(', ') || 'Tây Nguyên'} có tỷ lệ nữ dân tộc thiểu số > 30%`,
      },
      premiumMultiplier,
      socialPackagesCount,
      estimatedPremiumPrice: carbonTarget > 0 ? (carbonTarget * 10 * premiumMultiplier).toFixed(0) : 0, // $10 base * multiplier
    });
    setShowMatchingResults(true);
  };

  const selectedProjectData = esgProjects.find(p => p.id === selectedProject);

  const [showTabMenu, setShowTabMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <BackButton />
            <PortalSwitcher />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                <i className="ri-leaf-line text-emerald-600 mr-2"></i>
                VITA Impact Investment Hub
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Sàn đầu tư Tác động - Kết nối dòng vốn ESG với các dự án trồng rừng bền vững
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-600">Xin chào</p>
              <p className="text-base sm:text-lg font-bold text-emerald-600">
                {companyName || 'Doanh nghiệp ESG'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm mb-4 sm:mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all text-sm lg:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} text-base lg:text-lg`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Mobile Dropdown */}
        <div className="md:hidden bg-white rounded-xl shadow-sm mb-4 p-2">
          <button
            onClick={() => setShowTabMenu(!showTabMenu)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-gray-600 bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <i className={`${tabs.find(t => t.id === activeTab)?.icon || 'ri-menu-line'} text-lg`}></i>
              <span>{tabs.find(t => t.id === activeTab)?.name || 'Menu'}</span>
            </div>
            <i className={`ri-${showTabMenu ? 'arrow-up' : 'arrow-down'}-s-line text-xl`}></i>
          </button>
          
          {showTabMenu && (
            <div className="mt-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setShowTabMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${tab.icon} text-base`}></i>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
          {activeTab === 'projects' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Dự án Trồng Rừng Hỗn Giao đang Tìm Tài trợ
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <option>Tất cả khu vực</option>
                    <option>Tây Nguyên</option>
                    <option>Đông Bắc</option>
                    <option>Tây Bắc</option>
                  </select>
                  <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                    <option>Tất cả loại cây</option>
                    <option>Cây sinh trưởng nhanh</option>
                    <option>Cây gỗ quý</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {esgProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 sm:p-5 lg:p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedProject === project.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <i className="ri-map-pin-line"></i>
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <i className="ri-community-line"></i>
                          <span>{project.htx}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' :
                        project.status === 'seeking' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status === 'active' ? 'Đang triển khai' : 'Đang tìm tài trợ'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Diện tích</p>
                        <p className="text-base sm:text-lg font-bold text-gray-900">{project.area} ha</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Hấp thụ CO₂</p>
                        <p className="text-lg font-bold text-emerald-600">{project.co2Absorption.toLocaleString()} tấn</p>
                        <p className="text-xs text-gray-500">(10 năm)</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Tiến độ gọi vốn</span>
                        <span className="font-semibold">
                          {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{project.raisedAmount.toLocaleString()} triệu</span>
                        <span>{project.targetAmount.toLocaleString()} triệu</span>
                      </div>
                    </div>

                    {selectedProject === project.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <p className="text-sm text-gray-700">{project.description}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInvestmentType('sponsor');
                            }}
                            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-semibold"
                          >
                            Tài trợ trọn gói
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInvestmentType('share');
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                          >
                            Đầu tư chia sẻ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'target-builder' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-target-line text-emerald-600"></i>
                  Công cụ Kiến tạo & Khớp lệnh Mục tiêu ESG
                </h2>
                <p className="text-gray-600">
                  Chuyển đổi vai trò từ "Người đi chợ" sang "Người kiến tạo" - Tạo dự án theo đúng mục tiêu của bạn
                </p>
              </div>

              {!showMatchingResults ? (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-file-edit-line text-emerald-600"></i>
                    Bước 1: Số hóa Mục tiêu ESG (ESG Goal Digitizer)
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nhập mục tiêu chiến lược của bạn, hệ thống sẽ tự động quy đổi thành "Lệnh Đặt Hàng Mẫu"
                  </p>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    runMatching();
                  }} className="space-y-6">
                    {/* Carbon Target */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-cloud-line text-emerald-600"></i>
                        Mục tiêu Carbon (Environmental)
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tôi cần trung hòa bao nhiêu tấn CO₂? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={targetForm.carbonTarget}
                          onChange={(e) => setTargetForm({ ...targetForm, carbonTarget: e.target.value })}
                          placeholder="VD: 50000"
                          required
                          min="1000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-lg"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          <i className="ri-information-line mr-1"></i>
                          Hệ thống sẽ tính toán diện tích rừng cần thiết (1 ha ≈ 50 tấn CO₂ trong 10 năm)
                        </p>
                      </div>
                    </div>

                    {/* Social Target */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-heart-line text-blue-600"></i>
                        Mục tiêu Xã hội (Social) - UN SDGs
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại đối tượng hỗ trợ
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                              { value: 'women_minority', label: 'Phụ nữ dân tộc thiểu số', icon: 'ri-women-line', sdg: 'SDG 5' },
                              { value: 'general', label: 'Người dân nói chung', icon: 'ri-group-line', sdg: 'SDG 1' },
                              { value: 'youth', label: 'Thanh niên', icon: 'ri-user-star-line', sdg: 'SDG 8' },
                            ].map(option => (
                              <label
                                key={option.value}
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                                  targetForm.socialTargetType === option.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="socialTargetType"
                                  value={option.value}
                                  checked={targetForm.socialTargetType === option.value}
                                  onChange={(e) => setTargetForm({ ...targetForm, socialTargetType: e.target.value })}
                                  className="form-radio h-4 w-4 text-blue-600"
                                />
                                <i className={`${option.icon} text-lg ml-3 mr-2 ${targetForm.socialTargetType === option.value ? 'text-blue-600' : 'text-gray-500'}`}></i>
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-gray-700 block">{option.label}</span>
                                  <span className="text-xs text-gray-500">{option.sdg}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số người muốn hỗ trợ <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={targetForm.socialTarget}
                            onChange={(e) => setTargetForm({ ...targetForm, socialTarget: e.target.value })}
                            placeholder="VD: 100"
                            required
                            min="10"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Impact Packages (SDG Integration) */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-star-line text-purple-600"></i>
                        Gói Tác Động Xã Hội (Social Impact Packages) - Premium ESG
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Chọn các ưu tiên để tạo dự án có tác động xã hội sâu sắc và câu chuyện thương hiệu nhân văn
                      </p>
                      
                      <div className="space-y-4">
                        {/* Women Empowerment - SDG 5 */}
                        <label className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={targetForm.socialImpactPackages.womenEmpowerment}
                            onChange={(e) => setTargetForm({
                              ...targetForm,
                              socialImpactPackages: {
                                ...targetForm.socialImpactPackages,
                                womenEmpowerment: e.target.checked,
                              },
                            })}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-women-line text-pink-600"></i>
                              <span className="font-semibold text-gray-900">Ưu tiên Phụ nữ (Women Empowerment)</span>
                              <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-semibold rounded">SDG 5</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Tôi muốn dự án có &gt; 50% người hưởng lợi là nữ. Hệ thống sẽ tìm HTX có tổ phụ nữ mạnh.
                            </p>
                          </div>
                        </label>

                        {/* Indigenous Support */}
                        <div className="bg-white rounded-lg border-2 p-4">
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              checked={targetForm.socialImpactPackages.indigenousSupport}
                              onChange={(e) => setTargetForm({
                                ...targetForm,
                                socialImpactPackages: {
                                  ...targetForm.socialImpactPackages,
                                  indigenousSupport: e.target.checked,
                                },
                              })}
                              className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <i className="ri-community-line text-orange-600"></i>
                                <span className="font-semibold text-gray-900">Ưu tiên Dân tộc thiểu số (Indigenous Support)</span>
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded">SDG 10</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Tôi muốn hỗ trợ đồng bào dân tộc thiểu số tại vùng sâu vùng xa.
                              </p>
                              {targetForm.socialImpactPackages.indigenousSupport && (
                                <select
                                  value={targetForm.socialImpactPackages.indigenousEthnicity}
                                  onChange={(e) => setTargetForm({
                                    ...targetForm,
                                    socialImpactPackages: {
                                      ...targetForm.socialImpactPackages,
                                      indigenousEthnicity: e.target.value,
                                    },
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-2"
                                >
                                  <option value="">Chọn dân tộc cụ thể (tùy chọn)</option>
                                  <option value="Xơ Đăng">Xơ Đăng (Kon Tum)</option>
                                  <option value="Ê Đê">Ê Đê (Đắk Lắk)</option>
                                  <option value="Mông">Mông (Tây Bắc)</option>
                                  <option value="Tày">Tày (Đông Bắc)</option>
                                  <option value="Thái">Thái (Tây Bắc)</option>
                                </select>
                              )}
                            </div>
                          </label>
                        </div>

                        {/* Biodiversity Conservation - SDG 15 */}
                        <label className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={targetForm.socialImpactPackages.biodiversityConservation}
                            onChange={(e) => setTargetForm({
                              ...targetForm,
                              socialImpactPackages: {
                                ...targetForm.socialImpactPackages,
                                biodiversityConservation: e.target.checked,
                              },
                            })}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-leaf-line text-green-600"></i>
                              <span className="font-semibold text-gray-900">Bảo tồn Gen (Biodiversity Conservation)</span>
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">SDG 15</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Tôi muốn trồng các loài cây thuốc sắp tuyệt chủng trong Sách Đỏ. Yêu cầu trồng hỗn giao đa tầng.
                            </p>
                            {targetForm.socialImpactPackages.biodiversityConservation && (
                              <div className="mt-2">
                                <label className="block text-xs text-gray-600 mb-1">Loài cây cần bảo tồn (có thể chọn nhiều):</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {['Sâm Ngọc Linh', 'Tam thất', 'Ba kích', 'Đinh lăng', 'Hoàng đằng', 'Thất diệp nhất chi hoa'].map(species => (
                                    <label key={species} className="flex items-center text-xs">
                                      <input
                                        type="checkbox"
                                        checked={targetForm.socialImpactPackages.endangeredSpecies.includes(species)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setTargetForm({
                                              ...targetForm,
                                              socialImpactPackages: {
                                                ...targetForm.socialImpactPackages,
                                                endangeredSpecies: [...targetForm.socialImpactPackages.endangeredSpecies, species],
                                              },
                                            });
                                          } else {
                                            setTargetForm({
                                              ...targetForm,
                                              socialImpactPackages: {
                                                ...targetForm.socialImpactPackages,
                                                endangeredSpecies: targetForm.socialImpactPackages.endangeredSpecies.filter(s => s !== species),
                                              },
                                            });
                                          }
                                        }}
                                        className="form-checkbox h-3 w-3 text-green-600 rounded mr-2"
                                      />
                                      {species}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </label>

                        {/* Reinvestment Commitment - SDG 4 & 9 */}
                        <div className="bg-white rounded-lg border-2 p-4">
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              checked={targetForm.socialImpactPackages.reinvestmentCommitment}
                              onChange={(e) => setTargetForm({
                                ...targetForm,
                                socialImpactPackages: {
                                  ...targetForm.socialImpactPackages,
                                  reinvestmentCommitment: e.target.checked,
                                },
                              })}
                              className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <i className="ri-school-line text-blue-600"></i>
                                <span className="font-semibold text-gray-900">Cam kết Tái đầu tư (Infrastructure & Education)</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">SDG 4 & 9</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Tôi muốn trích % lợi nhuận để xây trường học/trạm y tế xã. Smart Contract tự động trích quỹ.
                              </p>
                              {targetForm.socialImpactPackages.reinvestmentCommitment && (
                                <div className="mt-2">
                                  <input
                                    type="number"
                                    value={targetForm.socialImpactPackages.reinvestmentPercent}
                                    onChange={(e) => setTargetForm({
                                      ...targetForm,
                                      socialImpactPackages: {
                                        ...targetForm.socialImpactPackages,
                                        reinvestmentPercent: e.target.value,
                                      },
                                    })}
                                    placeholder="VD: 10"
                                    min="1"
                                    max="50"
                                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                  />
                                  <span className="ml-2 text-sm text-gray-600">% tiền tài trợ</span>
                                </div>
                              )}
                            </div>
                          </label>
                        </div>

                        {/* Poverty Reduction - SDG 1 */}
                        <label className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={targetForm.socialImpactPackages.povertyReduction}
                            onChange={(e) => setTargetForm({
                              ...targetForm,
                              socialImpactPackages: {
                                ...targetForm.socialImpactPackages,
                                povertyReduction: e.target.checked,
                              },
                            })}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-money-dollar-circle-line text-yellow-600"></i>
                              <span className="font-semibold text-gray-900">Xóa đói giảm nghèo (Poverty Reduction)</span>
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">SDG 1</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Theo dõi thu nhập tăng thêm bình quân/hộ. Hệ thống VITA theo dõi dòng tiền trả vào ví Nông dân.
                            </p>
                          </div>
                        </label>

                        {/* Job Creation - SDG 8 */}
                        <label className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={targetForm.socialImpactPackages.jobCreation}
                            onChange={(e) => setTargetForm({
                              ...targetForm,
                              socialImpactPackages: {
                                ...targetForm.socialImpactPackages,
                                jobCreation: e.target.checked,
                              },
                            })}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-briefcase-line text-indigo-600"></i>
                              <span className="font-semibold text-gray-900">Tạo việc làm (Job Creation)</span>
                              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">SDG 8</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Theo dõi số lượng việc làm tạo ra từ dự án (trồng, chăm sóc, thu hoạch, chế biến).
                            </p>
                          </div>
                        </label>

                        {/* Water Protection - SDG 6 */}
                        <label className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md">
                          <input
                            type="checkbox"
                            checked={targetForm.socialImpactPackages.waterProtection}
                            onChange={(e) => setTargetForm({
                              ...targetForm,
                              socialImpactPackages: {
                                ...targetForm.socialImpactPackages,
                                waterProtection: e.target.checked,
                              },
                            })}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-water-percent-line text-cyan-600"></i>
                              <span className="font-semibold text-gray-900">Bảo vệ nguồn nước (Water Protection)</span>
                              <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded">SDG 6</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Ưu tiên rừng đầu nguồn. Theo dõi diện tích rừng đầu nguồn được phục hồi và chất lượng nước ngầm.
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-gray-700 flex items-start gap-2">
                          <i className="ri-information-line text-yellow-600 mt-0.5"></i>
                          <span>
                            <strong>Premium ESG:</strong> Các gói tác động xã hội này giúp bạn bán tín chỉ Carbon với giá cao hơn nhiều ($25/tấn thay vì $10/tấn) vì mang lại câu chuyện thương hiệu nhân văn và báo cáo ESG toàn diện.
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-money-dollar-circle-line text-yellow-600"></i>
                        Ngân sách (Budget)
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngân sách dự kiến mỗi năm (Tỷ VNĐ) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={targetForm.budget}
                          onChange={(e) => setTargetForm({ ...targetForm, budget: e.target.value })}
                          placeholder="VD: 5"
                          required
                          min="1"
                          step="0.5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 text-lg"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-map-pin-line text-purple-600"></i>
                        Địa bàn ưu tiên (Location)
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chọn khu vực ưu tiên (có thể chọn nhiều)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                          {[
                            { value: 'Tây Nguyên', label: 'Tây Nguyên' },
                            { value: 'Kon Tum', label: 'Kon Tum' },
                            { value: 'Gia Lai', label: 'Gia Lai' },
                            { value: 'Đắk Lắk', label: 'Đắk Lắk' },
                            { value: 'Lâm Đồng', label: 'Lâm Đồng' },
                            { value: 'Phú Thọ', label: 'Phú Thọ' },
                            { value: 'Hòa Bình', label: 'Hòa Bình' },
                            { value: 'Yên Bái', label: 'Yên Bái' },
                          ].map(region => (
                            <label
                              key={region.value}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                                targetForm.location.includes(region.value)
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={targetForm.location.includes(region.value)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTargetForm({ ...targetForm, location: [...targetForm.location, region.value] });
                                  } else {
                                    setTargetForm({ ...targetForm, location: targetForm.location.filter(l => l !== region.value) });
                                  }
                                }}
                                className="form-checkbox h-4 w-4 text-purple-600 rounded"
                              />
                              <span className="text-sm font-medium text-gray-700 ml-2">{region.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-calendar-line text-gray-600"></i>
                        Thời gian thực hiện
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Năm bắt đầu
                          </label>
                          <input
                            type="number"
                            value={targetForm.timelineStart}
                            onChange={(e) => setTargetForm({ ...targetForm, timelineStart: e.target.value })}
                            min="2025"
                            max="2035"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Năm kết thúc
                          </label>
                          <input
                            type="number"
                            value={targetForm.timelineEnd}
                            onChange={(e) => setTargetForm({ ...targetForm, timelineEnd: e.target.value })}
                            min={targetForm.timelineStart}
                            max="2040"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Auto-calculated Master Order Preview */}
                    {targetForm.carbonTarget && (
                      <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <i className="ri-magic-line text-emerald-600"></i>
                          Lệnh Đặt Hàng Mẫu (Tự động tính toán)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Diện tích cần</p>
                            <p className="text-2xl font-bold text-emerald-600">
                              {Math.ceil(parseFloat(targetForm.carbonTarget) / 50)} ha
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Loại cây gợi ý</p>
                            <p className="text-lg font-bold text-gray-900">Mega 3P</p>
                            <p className="text-xs text-gray-500">(Lớn nhanh lấy Carbon)</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Đối tượng tìm kiếm</p>
                            <p className="text-sm font-semibold text-gray-900">
                              HTX tại {targetForm.location.length > 0 ? targetForm.location.join(', ') : 'Tây Nguyên'}
                            </p>
                            {targetForm.socialTargetType === 'women_minority' && (
                              <p className="text-xs text-gray-500">Tỷ lệ nữ dân tộc thiểu số &gt; 30%</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all text-lg"
                    >
                      <i className="ri-search-line mr-2"></i>
                      Tìm kiếm & Khớp lệnh
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Matching Results Header */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i>
                      Kết quả Khớp lệnh
                    </h3>
                    <p className="text-emerald-100">
                      Hệ thống đã tìm thấy {matchingResults.directMatches.length} dự án có sẵn và {matchingResults.potentialMatches.length} HTX tiềm năng
                    </p>
                  </div>

                  {/* Direct Matching Results */}
                  {matchingResults.directMatches.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-check-double-line text-green-600"></i>
                        Chế độ A: Khớp lệnh Trực tiếp (Dự án có sẵn)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Tìm thấy các dự án đã được HTX tạo sẵn, phù hợp với mục tiêu của bạn
                      </p>
                      <div className="space-y-4">
                        {matchingResults.directMatches.map((match: any, idx: number) => (
                          <div
                            key={idx}
                            className="border-2 border-green-200 bg-green-50 p-6 rounded-xl"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h5 className="text-lg font-bold text-gray-900">{match.project.name}</h5>
                                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                    Khớp {match.matchScore}%
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{match.reason}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-600">HTX</p>
                                    <p className="font-semibold">{match.project.htx}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Diện tích</p>
                                    <p className="font-semibold">{match.project.area} ha</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Vốn cần</p>
                                    <p className="font-semibold text-emerald-600">{match.project.targetAmount} triệu</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Carbon</p>
                                    <p className="font-semibold">{match.project.co2Absorption.toLocaleString()} tấn</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedProject(match.project.id);
                                setActiveTab('projects');
                              }}
                              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                            >
                              <i className="ri-funds-line mr-2"></i>
                              Tài trợ Ngay
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Potential Matching Results */}
                  {matchingResults.potentialMatches.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="ri-lightbulb-line text-amber-600"></i>
                        Chế độ B: Khớp lệnh Tiềm năng (HTX có đất, chưa có dự án)
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Phát hiện các HTX có tài nguyên phù hợp nhưng chưa tạo dự án. Bạn có thể gửi yêu cầu để họ tạo dự án.
                      </p>
                      <div className="space-y-4">
                        {matchingResults.potentialMatches.map((match: any, idx: number) => (
                          <div
                            key={idx}
                            className="border-2 border-amber-200 bg-amber-50 p-6 rounded-xl"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h5 className="text-lg font-bold text-gray-900">{match.htx.name}</h5>
                                  <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full">
                                    Khớp {match.matchScore}%
                                  </span>
                                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    match.htx.greenlightScore === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    GreenLight Score: {match.htx.greenlightScore}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{match.reason}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                  <div>
                                    <p className="text-gray-600">Địa điểm</p>
                                    <p className="font-semibold">{match.htx.location}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Đất trống</p>
                                    <p className="font-semibold text-emerald-600">{match.htx.availableLand} ha</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Thổ nhưỡng</p>
                                    <p className="font-semibold">{match.htx.soilType}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600">Tín nhiệm</p>
                                    <p className="font-semibold">{match.htx.trustScore}/100</p>
                                  </div>
                                </div>
                                {targetForm.socialTargetType === 'women_minority' && (
                                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                                    <p className="text-sm text-gray-700">
                                      <i className="ri-women-line text-blue-600 mr-2"></i>
                                      <strong>Phụ nữ dân tộc thiểu số:</strong> {match.htx.womenMinorityCount} người ({Math.round(match.htx.womenMinorityCount / match.htx.memberCount * 100)}%)
                                    </p>
                                  </div>
                                )}
                                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                  <h6 className="font-semibold text-gray-900 mb-2">Dự án ước tính (nếu HTX đồng ý):</h6>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                      <p className="text-gray-600">Diện tích</p>
                                      <p className="font-bold">{match.estimatedProject.area} ha</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Số cây</p>
                                      <p className="font-bold">{match.estimatedProject.totalTrees.toLocaleString()} cây</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Chi phí</p>
                                      <p className="font-bold text-emerald-600">{match.estimatedProject.estimatedCost} triệu</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Carbon</p>
                                      <p className="font-bold">{match.estimatedProject.carbonPotential.toLocaleString()} tấn</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                // Send RFP to HTX
                                alert(`Đã gửi Thư Mời Hợp Tác (RFP) đến ${match.htx.name}!\n\nHTX sẽ nhận được thông báo trên Dashboard và có thể tạo dự án để nhận tài trợ.`);
                                // In real app, this would send notification to HTX admin dashboard
                              }}
                              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                            >
                              <i className="ri-mail-send-line mr-2"></i>
                              Gửi Thư Mời Hợp Tác (RFP)
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowMatchingResults(false);
                        setMatchingResults(null);
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <i className="ri-arrow-left-line mr-2"></i>
                      Tạo mục tiêu mới
                    </button>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
                    >
                      <i className="ri-plant-line mr-2"></i>
                      Xem tất cả Dự án
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Dashboard ESG - Giám sát Thời gian thực
                  </h2>
                  <p className="text-gray-600">
                    {dashboardView === 'overview' 
                      ? 'Theo dõi tổng hợp tất cả các dự án bạn đã đầu tư'
                      : 'Theo dõi chi tiết dự án được chọn'
                    }
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="bg-gray-100 rounded-lg p-1 flex">
                    <button
                      onClick={() => {
                        setDashboardView('overview');
                        setSelectedProjectForDashboard(null);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        dashboardView === 'overview'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <i className="ri-dashboard-line mr-2"></i>
                      Tổng hợp
                    </button>
                    <button
                      onClick={() => setDashboardView('project')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        dashboardView === 'project'
                          ? 'bg-white text-emerald-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <i className="ri-focus-3-line mr-2"></i>
                      Từng dự án
                    </button>
                  </div>

                  {/* Project Selector */}
                  {dashboardView === 'project' && (
                    <select
                      value={selectedProjectForDashboard || ''}
                      onChange={(e) => setSelectedProjectForDashboard(e.target.value || null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="">-- Chọn dự án --</option>
                      {myInvestments.map((investment) => (
                        <option key={investment.projectId} value={investment.projectId}>
                          {investment.projectName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Project Info Banner */}
              {dashboardView === 'project' && selectedProjectForDashboard && (() => {
                const project = myInvestments.find(inv => inv.projectId === selectedProjectForDashboard);
                if (!project) return null;
                return (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{project.projectName}</h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span><i className="ri-calendar-line mr-1"></i>Đầu tư: {project.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {project.status === 'active' ? 'Đang triển khai' : 'Đã hoàn thành'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProject(selectedProjectForDashboard);
                          setActiveTab('projects');
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm font-medium"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(() => {
                  const currentMetrics = dashboardView === 'project' && selectedProjectForDashboard
                    ? (() => {
                        const project = myInvestments.find(inv => inv.projectId === selectedProjectForDashboard);
                        if (!project) return impactData;
                        return {
                          totalInvestment: project.amount,
                          totalCO2: project.co2Credits,
                          totalArea: Math.round(project.amount / 25),
                          totalTrees: project.co2Credits * 4,
                        };
                      })()
                    : impactData;

                  return (
                    <>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-5 lg:p-6 rounded-xl border-2 border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {dashboardView === 'project' ? 'Đầu tư' : 'Tổng đầu tư'}
                          </span>
                          <i className="ri-money-dollar-circle-line text-emerald-600 text-xl sm:text-2xl"></i>
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          {currentMetrics.totalInvestment.toLocaleString()} triệu
                        </div>
                        {dashboardView === 'project' && selectedProjectForDashboard && (
                          <div className="text-xs text-gray-500 mt-1">của dự án được chọn</div>
                        )}
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-5 lg:p-6 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {dashboardView === 'project' ? 'CO₂ hấp thụ' : 'CO₂ hấp thụ (tổng)'}
                          </span>
                          <i className="ri-leaf-line text-blue-600 text-xl sm:text-2xl"></i>
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          {currentMetrics.totalCO2.toLocaleString()} tấn
                        </div>
                        {dashboardView === 'project' && selectedProjectForDashboard && (
                          <div className="text-xs text-gray-500 mt-1">của dự án được chọn</div>
                        )}
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-5 lg:p-6 rounded-xl border-2 border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {dashboardView === 'project' ? 'Diện tích' : 'Diện tích rừng (tổng)'}
                          </span>
                          <i className="ri-landscape-line text-green-600 text-xl sm:text-2xl"></i>
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          {currentMetrics.totalArea} ha
                        </div>
                        {dashboardView === 'project' && selectedProjectForDashboard && (
                          <div className="text-xs text-gray-500 mt-1">của dự án được chọn</div>
                        )}
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 sm:p-5 lg:p-6 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {dashboardView === 'project' ? 'Số cây' : 'Số cây trồng (tổng)'}
                          </span>
                          <i className="ri-plant-line text-purple-600 text-xl sm:text-2xl"></i>
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                          {currentMetrics.totalTrees.toLocaleString()}
                        </div>
                        {dashboardView === 'project' && selectedProjectForDashboard && (
                          <div className="text-xs text-gray-500 mt-1">của dự án được chọn</div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Project Vitality - Sức sống Dự án */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-pulse-line text-emerald-600"></i>
                  Sức sống Dự án - Theo dõi Tiến độ Thời gian thực
                </h3>
                
                {/* Progress Map */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Bản đồ Tiến độ (Progress Map)</h4>
                  <div className="bg-gray-100 rounded-xl p-6 min-h-[300px] relative overflow-hidden">
                    {/* Mock Map with colored areas */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {[
                        { id: 'zone-1', status: 'not-planted', label: 'Khu vực 1' },
                        { id: 'zone-2', status: 'planted', label: 'Khu vực 2' },
                        { id: 'zone-3', status: 'planted', label: 'Khu vực 3' },
                        { id: 'zone-4', status: 'canopy-closed', label: 'Khu vực 4' },
                      ].map((zone) => (
                        <div
                          key={zone.id}
                          className={`rounded-lg p-4 text-center ${
                            zone.status === 'not-planted' ? 'bg-gray-400' :
                            zone.status === 'planted' ? 'bg-green-300' :
                            'bg-green-600'
                          } text-white`}
                        >
                          <p className="font-semibold">{zone.label}</p>
                          <p className="text-xs mt-1">
                            {zone.status === 'not-planted' ? 'Chưa trồng' :
                             zone.status === 'planted' ? 'Đã xuống giống' :
                             'Đã khép tán'}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span>Chưa trồng</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-300 rounded"></div>
                        <span>Đã xuống giống</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span>Đã khép tán</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPI Dashboard - Real-time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Giải ngân</p>
                      <i className="ri-money-dollar-circle-line text-blue-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {realTimeData.disbursement.toFixed(0)} / {realTimeData.disbursementTarget} triệu
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(realTimeData.disbursement / realTimeData.disbursementTarget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((realTimeData.disbursement / realTimeData.disbursementTarget) * 100)}% đã giải ngân
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Tỷ lệ sống</p>
                      <i className="ri-heart-pulse-line text-green-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {realTimeData.survivalRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {realTimeData.treesAlive.toLocaleString()} / {realTimeData.treesTotal.toLocaleString()} cây
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                      <i className="ri-refresh-line animate-spin"></i>
                      <span>Cập nhật real-time</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border-2 border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Carbon tích lũy</p>
                      <i className="ri-cloud-line text-emerald-600"></i>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {realTimeData.carbonAccumulated.toFixed(1)} tấn
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Real-time từ ảnh vệ tinh & AI</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                      <i className="ri-refresh-line animate-spin"></i>
                      <span>Đang cập nhật...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Gallery */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <i className="ri-gallery-line text-emerald-600"></i>
                    Thư viện Ảnh thực địa (Live Gallery)
                  </h3>
                  <div className="flex gap-2">
                    <select
                      value={galleryFilter}
                      onChange={(e) => setGalleryFilter(e.target.value as any)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 border-0 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="all">Tất cả</option>
                      <option value="today">Hôm nay</option>
                      <option value="week">Tuần này</option>
                      <option value="month">Tháng này</option>
                    </select>
                    <button
                      onClick={() => setShowTimelapse(!showTimelapse)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        showTimelapse
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className={`ri-${showTimelapse ? 'pause' : 'play'}-line mr-1`}></i>
                      {showTimelapse ? 'Dừng' : 'Timelapse'}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Ảnh chụp hàng ngày từ nông dân, tự động đẩy lên hệ thống
                </p>

                {showTimelapse ? (
                  <div className="bg-gray-900 rounded-xl p-6 mb-4">
                    <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <i className="ri-play-circle-line text-6xl mb-4 animate-pulse"></i>
                          <p className="text-lg font-semibold">Timelapse Video</p>
                          <p className="text-sm text-gray-400 mt-2">
                            Quá trình lớn lên của cánh rừng từ tháng 1/2025 đến hiện tại
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm mb-2">
                          <span>Tháng 1/2025</span>
                          <span>Hiện tại</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-2">
                        <i className="ri-time-line"></i>
                        <span>Tốc độ: 1 tháng/giây</span>
                      </div>
                      <button
                        onClick={() => setShowTimelapse(false)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                      >
                        Dừng xem
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { img: 'https://readdy.ai/api/search-image?query=young%20tree%20sapling%20planted%20in%20forest%20ground%20view%20close%20up%20fresh%20green%20leaves&width=300&height=300&seq=tree1', date: new Date(Date.now() - 0), farmer: 'Bác A Đam' },
                      { img: 'https://readdy.ai/api/search-image?query=forest%20canopy%20coverage%20measurement%20from%20ground%20view%20upward%20camera%20angle%20trees%20overhead&width=300&height=300&seq=canopy1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), farmer: 'Chị B Thị' },
                      { img: 'https://readdy.ai/api/search-image?query=forest%20tree%20growth%20progress%20timelapse%20concept%20young%20to%20mature%20trees%20green%20foliage&width=300&height=300&seq=growth1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), farmer: 'Anh C Văn' },
                      { img: 'https://readdy.ai/api/search-image?query=farmer%20checking%20tree%20health%20forest%20maintenance%20rural%20agriculture%20hands%20on%20tree%20trunk&width=300&height=300&seq=farmer1', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), farmer: 'Bác D Hoàng' },
                      { img: 'https://readdy.ai/api/search-image?query=forest%20tree%20growth%20progress%20timelapse%20concept%20young%20to%20mature%20trees%20green%20foliage&width=300&height=300&seq=growth2', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), farmer: 'Chị E Thị' },
                      { img: 'https://readdy.ai/api/search-image?query=young%20tree%20sapling%20planted%20in%20forest%20ground%20view%20close%20up%20fresh%20green%20leaves&width=300&height=300&seq=tree2', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), farmer: 'Anh F Văn' },
                      { img: 'https://readdy.ai/api/search-image?query=forest%20canopy%20coverage%20measurement%20from%20ground%20view%20upward%20camera%20angle%20trees%20overhead&width=300&height=300&seq=canopy2', date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), farmer: 'Bác G Đam' },
                      { img: 'https://readdy.ai/api/search-image?query=farmer%20checking%20tree%20health%20forest%20maintenance%20rural%20agriculture%20hands%20on%20tree%20trunk&width=300&height=300&seq=farmer2', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), farmer: 'Chị H Thị' },
                    ]
                      .filter(item => {
                        if (galleryFilter === 'all') return true;
                        if (galleryFilter === 'today') return item.date.toDateString() === new Date().toDateString();
                        if (galleryFilter === 'week') return item.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        if (galleryFilter === 'month') return item.date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                        return true;
                      })
                      .map((item, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={item.img}
                            alt={`Forest photo ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center">
                            <i className="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                              <p>{item.date.toLocaleDateString('vi-VN')}</p>
                              <p className="text-[10px] text-gray-300">{item.farmer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  <i className="ri-information-line mr-1"></i>
                  {showTimelapse 
                    ? 'Xem quá trình lớn lên của cánh rừng qua timelapse'
                    : 'Xem video "Timelapse" để theo dõi quá trình lớn lên của cánh rừng'}
                </p>
              </div>

              {/* Real-time Monitoring */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Camera Giám sát</h3>
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-4">
                    <div className="text-center">
                      <i className="ri-camera-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600">Live Feed từ Rừng</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <i className="ri-information-line mr-2"></i>
                    Camera giám sát thời gian thực tại rừng của bạn
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Số liệu Hôm nay</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Rừng đã lọc được</p>
                      <p className="text-2xl font-bold text-emerald-600">50 kg bụi mịn</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Đã hấp thụ thêm</p>
                      <p className="text-2xl font-bold text-blue-600">1 tấn CO₂</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Cây mới trồng</p>
                      <p className="text-2xl font-bold text-green-600">+120 cây</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CO2 Absorption Chart */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lộ trình Hấp thụ CO₂</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={co2Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="cumulative" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'seed-sponsor' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-seedling-line text-emerald-600"></i>
                  Tài trợ Giống - Mô hình Tài trợ Hiện vật
                </h2>
                <p className="text-gray-600">
                  Thay vì chuyển tiền mặt, bạn có thể trực tiếp mua và tài trợ cây giống cho HTX. 
                  Đảm bảo tiền được sử dụng đúng mục đích và tạo tác động trực tiếp.
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-information-line text-white text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Cách hoạt động:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                        <span><strong>1. Chọn giống:</strong> Bạn chọn loại cây giống từ các nhà cung cấp uy tín trên Seed Marketplace</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                        <span><strong>2. Chọn HTX nhận:</strong> Chọn HTX bạn muốn tài trợ (từ dự án ESG hoặc danh sách HTX)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                        <span><strong>3. Thanh toán:</strong> Bạn thanh toán trực tiếp cho nhà cung cấp giống</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                        <span><strong>4. Vận chuyển:</strong> Cây giống được giao trực tiếp đến HTX (địa chỉ bạn chỉ định)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-emerald-600 mt-0.5"></i>
                        <span><strong>5. Theo dõi:</strong> Bạn theo dõi quá trình trồng và tỷ lệ sống qua Dashboard ESG</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/seed-marketplace?source=esg')}
                  className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-shopping-cart-line text-2xl"></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Mua Giống ngay</h3>
                  <p className="text-emerald-100 text-sm">
                    Truy cập Seed Marketplace và chọn giống để tài trợ cho HTX
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Đi đến Seed Marketplace <i className="ri-arrow-right-line ml-2"></i>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-plant-line text-emerald-600 text-2xl"></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Chọn từ Dự án</h3>
                  <p className="text-gray-600 text-sm">
                    Xem các dự án ESG và tài trợ giống cho dự án bạn đang đầu tư
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Xem dự án <i className="ri-arrow-right-line ml-2"></i>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <i className="ri-dashboard-line text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">Theo dõi Tài trợ</h3>
                  <p className="text-gray-600 text-sm">
                    Xem tiến độ và tác động của các giống bạn đã tài trợ
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Xem Dashboard <i className="ri-arrow-right-line ml-2"></i>
                  </div>
                </button>
              </div>

              {/* Recent Seed Sponsorships */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử Tài trợ Giống</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: 'SP-2026-001',
                      seedType: 'Gáo Vàng (Mega 3P)',
                      quantity: 5000,
                      htx: 'HTX Tu Mơ Rông - Kon Tum',
                      date: '15/01/2026',
                      status: 'delivered',
                      batchId: 'SD-2026-VIL-MEG-045',
                    },
                    {
                      id: 'SP-2025-002',
                      seedType: 'Sâm Ngọc Linh',
                      quantity: 10000,
                      htx: 'HTX Ngọc Linh - Kon Tum',
                      date: '10/12/2025',
                      status: 'planted',
                      batchId: 'SD-2025-VIL-SNL-089',
                    },
                  ].map((sponsorship) => (
                    <div key={sponsorship.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-gray-900">{sponsorship.seedType}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              sponsorship.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                              sponsorship.status === 'planted' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {sponsorship.status === 'delivered' ? 'Đã giao' : 'Đã trồng'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><i className="ri-community-line mr-2"></i>{sponsorship.htx}</div>
                            <div><i className="ri-numbers-line mr-2"></i>{sponsorship.quantity.toLocaleString()} cây</div>
                            <div><i className="ri-calendar-line mr-2"></i>{sponsorship.date}</div>
                            <div><i className="ri-barcode-line mr-2"></i>Batch ID: {sponsorship.batchId}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/seed-marketplace/trace/${sponsorship.batchId}`)}
                          className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-semibold"
                        >
                          Truy xuất
                        </button>
                      </div>
                    </div>
                  ))}
                  {[].length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <i className="ri-seedling-line text-5xl mb-4"></i>
                      <p>Bạn chưa có lịch sử tài trợ giống nào</p>
                      <button
                        onClick={() => navigate('/seed-marketplace?source=esg')}
                        className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Bắt đầu Tài trợ Giống
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'change-stories' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-book-open-line text-emerald-600"></i>
                  Câu chuyện Thay đổi (Change Stories)
                </h2>
                <p className="text-gray-600">
                  Biến những con số khô khan thành cảm xúc - Nhật ký Tác động Xã hội từ thực địa
                </p>
              </div>

              {/* Impact Stories Data */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quantitative Stories */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-bar-chart-line text-blue-600"></i>
                    Dữ liệu Định lượng (Quantitative)
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Income Increase Story */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Thu nhập Tăng thêm</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-600">+200%</span>
                        <span className="text-sm text-gray-600">sau 1 năm</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Bà Y Lan</strong> (HTX Tu Mơ Rông): Thu nhập tăng từ <strong>2 triệu</strong> → <strong>6 triệu/tháng</strong> nhờ trồng Sâm dưới tán rừng.
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-user-line"></i>
                        <span>50 hộ tương tự đã cải thiện thu nhập</span>
                      </div>
                    </div>

                    {/* Education Impact */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-school-line text-blue-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Giảm Tỷ lệ Bỏ học</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">SDG 4</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-600">-20%</span>
                        <span className="text-sm text-gray-600">tỷ lệ bỏ học</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Xã <strong>Măng Ri</strong>: Tỷ lệ trẻ em bỏ học giảm 20% nhờ quỹ khuyến học từ dự án (10% lợi nhuận tự động trích).
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-graduation-cap-line"></i>
                        <span>15 học sinh được hỗ trợ học phí</span>
                      </div>
                    </div>

                    {/* Job Creation */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-briefcase-line text-purple-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Việc làm Tạo ra</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">SDG 8</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-purple-600">150</span>
                        <span className="text-sm text-gray-600">việc làm mới</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Tạo việc làm cho 150 người: Trồng cây (50), Chăm sóc (40), Thu hoạch (30), Chế biến (30).
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                        <i className="ri-women-line"></i>
                        <span>60% là phụ nữ (90 người)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qualitative Stories */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-video-line text-pink-600"></i>
                    Dữ liệu Định tính (Qualitative - Storytelling)
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Video Stories */}
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="ri-video-add-line text-pink-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Video Phỏng vấn Nông dân</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          {
                            name: 'Bà Y Lan',
                            role: 'Nông dân HTX Tu Mơ Rông',
                            quote: 'Cảm ơn công ty VinaTech, nhờ trồng cây dưới tán rừng mà tôi có tiền sửa lại mái nhà.',
                            date: '2024-01-15',
                            duration: '15s',
                          },
                          {
                            name: 'Anh Đam',
                            role: 'Chủ nhiệm HTX',
                            quote: 'Dự án này không chỉ cho chúng tôi thu nhập, mà còn giúp bảo tồn rừng đầu nguồn.',
                            date: '2024-01-20',
                            duration: '20s',
                          },
                          {
                            name: 'Chị Hoa',
                            role: 'Tổ trưởng Tổ phụ nữ',
                            quote: 'Lần đầu tiên phụ nữ chúng tôi có tiếng nói trong HTX. Chúng tôi tự quản lý 30ha Sâm.',
                            date: '2024-01-25',
                            duration: '18s',
                          },
                        ].map((story, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg border border-pink-100">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="ri-play-circle-line text-pink-600 text-xl"></i>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900">{story.name}</span>
                                  <span className="text-xs text-gray-500">• {story.role}</span>
                                </div>
                                <p className="text-sm text-gray-700 italic mb-2">"{story.quote}"</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span><i className="ri-calendar-line mr-1"></i>{story.date}</span>
                                  <span><i className="ri-time-line mr-1"></i>{story.duration}</span>
                                  <button className="text-pink-600 hover:text-pink-700 font-medium">
                                    <i className="ri-play-line mr-1"></i>Xem video
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Diary */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="ri-book-2-line text-amber-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Nhật ký Tác động (Impact Diary)</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Hệ thống tự động biên tập các video/ảnh từ nông dân thành một "Nhật ký Tác động" để bạn chia sẻ ngay lên Website/Mạng xã hội.
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <i className="ri-image-line text-gray-400 text-2xl"></i>
                          </div>
                        ))}
                      </div>
                      <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all text-sm font-semibold">
                        <i className="ri-download-line mr-2"></i>
                        Xuất Nhật ký Tác động (PDF/Video)
                      </button>
                    </div>

                    {/* SDG Impact Summary */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="ri-global-line text-emerald-600 text-xl"></i>
                        <span className="font-semibold text-gray-900">Tác động UN SDGs</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { sdg: 'SDG 1', label: 'Xóa đói giảm nghèo', progress: 85 },
                          { sdg: 'SDG 4', label: 'Giáo dục chất lượng', progress: 70 },
                          { sdg: 'SDG 5', label: 'Bình đẳng giới', progress: 90 },
                          { sdg: 'SDG 6', label: 'Nước sạch', progress: 75 },
                          { sdg: 'SDG 8', label: 'Việc làm', progress: 80 },
                          { sdg: 'SDG 15', label: 'Bảo vệ rừng', progress: 95 },
                        ].map((item) => (
                          <div key={item.sdg} className="bg-white p-2 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-900">{item.sdg}</span>
                              <span className="text-emerald-600 font-bold">{item.progress}%</span>
                            </div>
                            <p className="text-gray-600 text-xs">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tác động Môi trường - Impact Measurement
                </h2>
                <p className="text-gray-600">
                  Đo lường và báo cáo tác động môi trường của các dự án đầu tư
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Giảm phát thải CO₂</h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {impactData.totalCO2.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">tấn CO₂ đã hấp thụ</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Tương đương {Math.round(impactData.totalCO2 / 4.6)} xe ô tô/năm
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Bảo vệ Đa dạng Sinh học</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {impactData.totalTrees.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">cây đã trồng</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Tạo môi trường sống cho {Math.round(impactData.totalTrees / 100)} loài động vật
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Phục hồi Đất</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {impactData.totalArea}
                  </div>
                  <p className="text-sm text-gray-600">ha đất được phục hồi</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Cải thiện chất lượng đất và chống xói mòn
                  </p>
                </div>
              </div>

              {/* My Investments */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Các Dự án Đã Đầu tư</h3>
                <div className="space-y-4">
                  {myInvestments.map((investment) => (
                    <div key={investment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{investment.projectName}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Đầu tư: {investment.amount.toLocaleString()} triệu</span>
                            <span>CO₂: {investment.co2Credits.toLocaleString()} tấn</span>
                            <span>Ngày: {investment.date}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {investment.status === 'active' ? 'Đang triển khai' : 'Hoàn thành'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Báo cáo Bền vững - Sustainability Reports
                </h2>
                <p className="text-gray-600">
                  Xuất báo cáo chuẩn quốc tế để nộp cho cổ đông và đối tác
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-emerald-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <i className="ri-file-pdf-line text-emerald-600 text-3xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Báo cáo ESG Quý</h3>
                      <p className="text-sm text-gray-600">Báo cáo tác động môi trường theo quý</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all">
                    <i className="ri-download-line mr-2"></i>
                    Tải PDF
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className="ri-file-excel-line text-blue-600 text-3xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Báo cáo Carbon Credit</h3>
                      <p className="text-sm text-gray-600">Chứng nhận tín chỉ Carbon đã tạo ra</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
                    <i className="ri-download-line mr-2"></i>
                    Tải Excel
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <i className="ri-file-chart-line text-green-600 text-3xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Báo cáo Tổng hợp Năm</h3>
                      <p className="text-sm text-gray-600">Báo cáo toàn diện về tác động môi trường</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
                    <i className="ri-download-line mr-2"></i>
                    Tải PDF
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                      <i className="ri-presentation-line text-purple-600 text-3xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Slide Thuyết trình</h3>
                      <p className="text-sm text-gray-600">PowerPoint cho báo cáo cổ đông</p>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all">
                    <i className="ri-download-line mr-2"></i>
                    Tải PPT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

