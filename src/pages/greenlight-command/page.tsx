import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

export default function GreenlightCommand() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'compliance' | 'investment' | 'carbon' | 'esg' | 'system' | 'voucher' | 'supply'>('overview');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    // Clear any admin/greenlight session data
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('greenlight_authenticated');
    sessionStorage.removeItem('admin_email');
    sessionStorage.removeItem('admin_name');
    navigate('/login?role=admin');
  };

  const roles = [
    { id: 'admin', name: 'HTX - Quản trị', icon: 'ri-dashboard-line', path: '/admin' },
    { id: 'partner', name: 'Doanh nghiệp - Thu mua', icon: 'ri-building-line', path: '/partner-dashboard' },
    { id: 'physician', name: 'Bác sĩ - Kiểm định', icon: 'ri-stethoscope-line', path: '/physician-portal' },
    { id: 'greenlight', name: 'GreenLight - Command', icon: 'ri-shield-star-line', path: '/greenlight-command' },
    { id: 'hub', name: 'Tất cả phân hệ', icon: 'ri-apps-2-line', path: '/home' },
  ];

  // Mock data
  const vitalSigns = {
    gmv: '125.8 tỷ VNĐ',
    area: '2,450 ha',
    compliance: '98.5%',
    farmers: '1,247',
    cooperatives: '23',
    enterprises: '45'
  };

  const regions = [
    { name: 'Ngọc Linh - Kon Tum', lat: 15.0, lng: 107.8, value: 450, status: 'green', revenue: '35.2 tỷ' },
    { name: 'Sapa - Lào Cai', lat: 22.3, lng: 103.8, value: 380, status: 'green', revenue: '28.5 tỷ' },
    { name: 'Tây Nguyên - Đắk Lắk', lat: 12.7, lng: 108.2, value: 520, status: 'yellow', revenue: '42.8 tỷ' },
    { name: 'Hoàng Liên Sơn', lat: 22.4, lng: 103.9, value: 290, status: 'green', revenue: '19.3 tỷ' },
    { name: 'Bidoup - Lâm Đồng', lat: 12.2, lng: 108.7, value: 410, status: 'green', revenue: '31.7 tỷ' }
  ];

  const alerts = [
    { id: 1, type: 'red', title: 'Phát hiện gian lận', region: 'Vùng A - Đắk Lắk', desc: 'Hộ dân khai báo 5 tấn trên diện tích chỉ đủ 1 tấn', time: '15 phút trước' },
    { id: 2, type: 'yellow', title: 'Cảnh báo thuốc BVTV', region: 'Vùng B - Lào Cai', desc: 'Phát hiện dấu hiệu lạm dụng thuốc bảo vệ thực vật', time: '2 giờ trước' },
    { id: 3, type: 'yellow', title: 'Chậm tiến độ', region: 'HTX Sơn La', desc: 'Lô hàng #SL2025-03 chậm 5 ngày so với kế hoạch', time: '1 ngày trước' }
  ];

  const investments = [
    { region: 'Ngọc Linh', invested: '15 tỷ', revenue: '35.2 tỷ', roi: '25%', status: 'excellent' },
    { region: 'Sapa', invested: '12 tỷ', revenue: '28.5 tỷ', roi: '22%', status: 'excellent' },
    { region: 'Tây Nguyên', invested: '18 tỷ', revenue: '42.8 tỷ', roi: '18%', status: 'good' },
    { region: 'Hoàng Liên', invested: '8 tỷ', revenue: '19.3 tỷ', roi: '20%', status: 'good' },
    { region: 'Bidoup', invested: '13 tỷ', revenue: '31.7 tỷ', roi: '19%', status: 'good' }
  ];

  const carbonData = {
    totalCO2: '45,280 tấn',
    credits: '12,450 tín chỉ',
    sold: '8,320 tín chỉ',
    revenue: '4.2 tỷ VNĐ',
    buyers: 15
  };

  const esgMetrics = {
    environment: { score: 92, trees: '2.4M cây', water: '98% tiết kiệm', biodiversity: '156 loài' },
    social: { score: 88, jobs: '3,450 việc làm', income: '+45% thu nhập', minorities: '78% dân tộc thiểu số' },
    governance: { score: 95, transparency: '100% minh bạch', audits: '24 kiểm toán/năm', violations: '0 vi phạm' }
  };

  const auditLogs = [
    { time: '10:45 - 15/01/2025', user: 'Admin Nguyễn Văn A', action: 'Duyệt lô hàng #DL2025-15', status: 'success' },
    { time: '09:30 - 15/01/2025', user: 'Lab Manager Trần B', action: 'Cập nhật SOP-023', status: 'success' },
    { time: '08:15 - 15/01/2025', user: 'Finance Manager Lê C', action: 'Giải ngân 500M cho HTX Kon Tum', status: 'success' },
    { time: '16:20 - 14/01/2025', user: 'System Admin', action: 'Khóa tài khoản vi phạm #F1234', status: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
        <div className="max-w-[1800px] mx-auto">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto flex-shrink-0" label="" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold truncate">GREENLIGHT COMMAND</h1>
                <p className="text-xs text-emerald-100 truncate">Trung tâm Điều hành</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-md border border-red-700"
                title="Đăng xuất"
              >
                <i className="ri-logout-box-line text-base sm:text-lg"></i>
                <span className="hidden sm:inline text-sm sm:text-base">Đăng xuất</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  title="Chuyển phân hệ"
                >
                  <i className="ri-apps-2-line text-lg"></i>
                </button>
                
                {showRoleMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowRoleMenu(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Chuyển đổi phân hệ</p>
                      </div>
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => {
                            navigate(role.path);
                            setShowRoleMenu(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <i className={`${role.icon} text-emerald-600`}></i>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{role.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto" label="" />
              <div>
                <h1 className="text-2xl font-bold">GREENLIGHT COMMAND CENTER</h1>
                <p className="text-sm text-emerald-100">Trung tâm Điều hành & Giám sát Toàn hệ thống</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-md border border-red-700"
                title="Đăng xuất"
              >
                <i className="ri-logout-box-line text-lg"></i>
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
              {/* Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  title="Chuyển phân hệ"
                >
                  <i className="ri-apps-2-line text-xl"></i>
                </button>
                
                {showRoleMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowRoleMenu(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Chuyển đổi phân hệ</p>
                      </div>
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => {
                            navigate(role.path);
                            setShowRoleMenu(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <i className={`${role.icon} text-emerald-600`}></i>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{role.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="text-right">
                <p className="text-xs text-emerald-100">Super Admin</p>
                <p className="text-sm font-semibold">GreenLight Team</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-shield-star-line text-xl"></i>
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="flex md:hidden items-center gap-2 pt-2 border-t border-white/20">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-star-line text-sm"></i>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-emerald-100 truncate">Super Admin</p>
              <p className="text-xs font-semibold truncate">GreenLight Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <div className="md:hidden py-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-700/50 rounded-lg text-white hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <i className={`${(() => {
                  const tabs = [
                    { id: 'overview', icon: 'ri-dashboard-line' },
                    { id: 'compliance', icon: 'ri-shield-check-line' },
                    { id: 'investment', icon: 'ri-line-chart-line' },
                    { id: 'carbon', icon: 'ri-leaf-line' },
                    { id: 'esg', icon: 'ri-file-chart-line' },
                    { id: 'voucher', icon: 'ri-coupon-line' },
                    { id: 'system', icon: 'ri-settings-3-line' },
                    { id: 'supply', icon: 'ri-shopping-cart-2-line' }
                  ];
                  return tabs.find(t => t.id === activeTab)?.icon || 'ri-menu-line';
                })()} text-lg`}></i>
                <span className="font-medium">
                  {(() => {
                    const tabs = [
                      { id: 'overview', label: 'Tổng quan' },
                      { id: 'compliance', label: 'Giám sát & Tuân thủ' },
                      { id: 'investment', label: 'Tài chính & Đầu tư' },
                      { id: 'carbon', label: 'Tín chỉ Carbon' },
                      { id: 'esg', label: 'Báo cáo ESG' },
                      { id: 'voucher', label: 'Voucher Giống' },
                      { id: 'system', label: 'Quản trị Hệ thống' },
                      { id: 'supply', label: 'VITA Supply' }
                    ];
                    return tabs.find(t => t.id === activeTab)?.label || 'Menu';
                  })()}
                </span>
              </div>
              <i className={`ri-${showMobileMenu ? 'close' : 'menu'}-line text-xl`}></i>
            </button>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
              <div className="mt-2 bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
                {[
                  { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
                  { id: 'compliance', label: 'Giám sát & Tuân thủ', icon: 'ri-shield-check-line' },
                  { id: 'investment', label: 'Tài chính & Đầu tư', icon: 'ri-line-chart-line' },
                  { id: 'carbon', label: 'Tín chỉ Carbon', icon: 'ri-leaf-line' },
                  { id: 'esg', label: 'Báo cáo ESG', icon: 'ri-file-chart-line' },
                  { id: 'voucher', label: 'Voucher Giống', icon: 'ri-coupon-line' },
                  { id: 'system', label: 'Quản trị Hệ thống', icon: 'ri-settings-3-line' },
                  { id: 'supply', label: 'VITA Supply', icon: 'ri-shopping-cart-2-line' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-600/20 text-emerald-400 border-l-4 border-emerald-400'
                        : 'text-slate-300 hover:bg-slate-600/50 hover:text-white'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <i className="ri-check-line text-emerald-400 ml-auto"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tabs - Horizontal Scroll on Tablet */}
          <div className="hidden md:flex overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max">
              {[
                { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line', shortLabel: 'Tổng quan' },
                { id: 'compliance', label: 'Giám sát & Tuân thủ', icon: 'ri-shield-check-line', shortLabel: 'Giám sát' },
                { id: 'investment', label: 'Tài chính & Đầu tư', icon: 'ri-line-chart-line', shortLabel: 'Tài chính' },
                { id: 'carbon', label: 'Tín chỉ Carbon', icon: 'ri-leaf-line', shortLabel: 'Carbon' },
                { id: 'esg', label: 'Báo cáo ESG', icon: 'ri-file-chart-line', shortLabel: 'ESG' },
                { id: 'voucher', label: 'Voucher Giống', icon: 'ri-coupon-line', shortLabel: 'Voucher' },
                { id: 'system', label: 'Quản trị Hệ thống', icon: 'ri-settings-3-line', shortLabel: 'Hệ thống' },
                { id: 'supply', label: 'VITA Supply', icon: 'ri-shopping-cart-2-line', shortLabel: 'Supply' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 lg:px-5 py-3.5 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-slate-700 text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <i className={`${tab.icon} text-base flex-shrink-0`}></i>
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Vital Signs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-money-dollar-circle-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">GMV</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.gmv}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Tổng giá trị giao dịch</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-map-pin-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Diện tích</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.area}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Rừng dược liệu</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-shield-check-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Tuân thủ</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.compliance}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Tỷ lệ đạt chuẩn SOP</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-user-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Nông dân</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.farmers}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Chủ rừng & Nông dân</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-team-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">HTX</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.cooperatives}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Hợp tác xã</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-3 sm:p-4 lg:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-building-line text-xl sm:text-2xl lg:text-3xl opacity-80"></i>
                  <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">DN</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 truncate">{vitalSigns.enterprises}</p>
                <p className="text-[10px] sm:text-xs opacity-90 truncate">Doanh nghiệp</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Ecosystem Map */}
              <div className="lg:col-span-2 bg-slate-800 rounded-xl p-4 sm:p-6 shadow-xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="ri-map-2-line text-emerald-400"></i>
                    Bản đồ Hệ sinh thái
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-400">An toàn</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-400">Cảnh báo</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-400">Nguy hiểm</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg h-96 relative overflow-hidden">
                  <img 
                    src="https://readdy.ai/api/search-image?query=vietnam%20map%20dark%20theme%20with%20glowing%20green%20points%20representing%20agricultural%20regions%20modern%20digital%20interface%20style%20high%20tech%20command%20center%20visualization%20with%20data%20overlay%20and%20network%20connections%20between%20regions%20professional%20dashboard%20aesthetic&width=800&height=400&seq=vietnam-map-001&orientation=landscape"
                    alt="Vietnam Map"
                    className="w-full h-full object-cover opacity-40"
                  />
                  {regions.map((region, idx) => (
                    <div
                      key={idx}
                      className="absolute cursor-pointer group"
                      style={{ 
                        left: `${(region.lng - 102) * 8}%`, 
                        top: `${(23 - region.lat) * 8}%` 
                      }}
                    >
                      <div className={`w-${Math.floor(region.value / 100) + 3} h-${Math.floor(region.value / 100) + 3} rounded-full ${
                        region.status === 'green' ? 'bg-emerald-500' : 'bg-amber-500'
                      } opacity-60 animate-pulse`}></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                        <div className="bg-slate-700 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl border border-slate-600">
                          <p className="font-bold mb-1">{region.name}</p>
                          <p className="text-slate-300">Sản lượng: {region.value} tấn</p>
                          <p className="text-slate-300">Doanh thu: {region.revenue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cash Flow */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-funds-line text-emerald-400"></i>
                  Dòng tiền Real-time
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Tiền đặt cọc</span>
                      <i className="ri-arrow-down-line text-emerald-400"></i>
                    </div>
                    <p className="text-xl font-bold text-white">+12.5 tỷ</p>
                    <p className="text-xs text-slate-500 mt-1">Hôm nay</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Thanh toán</span>
                      <i className="ri-arrow-up-line text-amber-400"></i>
                    </div>
                    <p className="text-xl font-bold text-white">-8.3 tỷ</p>
                    <p className="text-xs text-slate-500 mt-1">Hôm nay</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-400">Doanh thu</span>
                      <i className="ri-line-chart-line text-emerald-400"></i>
                    </div>
                    <p className="text-2xl font-bold text-white">+4.2 tỷ</p>
                    <p className="text-xs text-emerald-400 mt-1">Lợi nhuận ròng</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Tổng vốn lưu động</span>
                      <span className="text-white font-semibold">45.8 tỷ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-time-line text-emerald-400"></i>
                Hoạt động Gần đây
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-cart-line text-emerald-400"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Đơn hàng mới</p>
                      <p className="text-xs text-slate-400">Vinamilk - 50 tấn Sâm</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">5 phút trước</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-flask-line text-blue-400"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Kết quả Lab</p>
                      <p className="text-xs text-slate-400">Lô #DL2025-15 đạt chuẩn</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">12 phút trước</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-user-add-line text-purple-400"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Nông dân mới</p>
                      <p className="text-xs text-slate-400">HTX Kon Tum +15 thành viên</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">1 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Early Warning System */}
              <div className="lg:col-span-2 bg-slate-800 rounded-xl p-4 sm:p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-alarm-warning-line text-red-400"></i>
                  Hệ thống Cảnh báo Sớm
                </h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-lg p-4 border-l-4 ${
                        alert.type === 'red'
                          ? 'bg-red-500/10 border-red-500'
                          : 'bg-amber-500/10 border-amber-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <i className={`${
                              alert.type === 'red' ? 'ri-error-warning-line text-red-400' : 'ri-alert-line text-amber-400'
                            } text-xl`}></i>
                            <h4 className="font-bold text-white">{alert.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              alert.type === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {alert.type === 'red' ? 'ĐÈN ĐỎ' : 'ĐÈN VÀNG'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mb-1">{alert.region}</p>
                          <p className="text-sm text-slate-400">{alert.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-2">{alert.time}</p>
                          <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Score */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-shield-check-line text-emerald-400"></i>
                  Điểm Tuân thủ
                </h3>
                <div className="text-center mb-6">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="none" />
                      <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="12" fill="none"
                        strokeDasharray={`${98.5 * 4.4} 440`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <p className="text-4xl font-bold text-white">98.5</p>
                        <p className="text-xs text-slate-400">%</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">Tỷ lệ tuân thủ SOP</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Đạt chuẩn</span>
                      <span className="text-xs text-emerald-400 font-semibold">1,228</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Cảnh báo</span>
                      <span className="text-xs text-amber-400 font-semibold">15</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '1.2%' }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Vi phạm</span>
                      <span className="text-xs text-red-400 font-semibold">4</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '0.3%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-file-list-3-line text-emerald-400"></i>
                Nhật ký Kiểm toán (Audit Logs)
              </h3>
              <div className="space-y-2">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="bg-slate-900 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <div>
                        <p className="text-sm text-white font-medium">{log.action}</p>
                        <p className="text-xs text-slate-400">{log.user}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{log.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INVESTMENT TAB */}
        {activeTab === 'investment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 sm:p-5 text-white shadow-xl">
                <i className="ri-funds-line text-2xl sm:text-3xl opacity-80 mb-2"></i>
                <p className="text-xl sm:text-2xl font-bold mb-1">66 tỷ VNĐ</p>
                <p className="text-xs opacity-90 truncate">Tổng vốn đầu tư</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-line-chart-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">157.5 tỷ</p>
                <p className="text-xs opacity-90">Tổng doanh thu</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-percent-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">21.2%</p>
                <p className="text-xs opacity-90">ROI trung bình</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-time-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">18 tháng</p>
                <p className="text-xs opacity-90">Thời gian hoàn vốn TB</p>
              </div>
            </div>

            {/* ROI by Region */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-bar-chart-box-line text-emerald-400"></i>
                Phân tích ROI theo Vùng trồng
              </h3>
              <div className="space-y-3">
                {investments.map((inv, idx) => (
                  <div key={idx} className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white mb-1">{inv.region}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>Đầu tư: {inv.invested}</span>
                          <span>Doanh thu: {inv.revenue}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          inv.status === 'excellent' ? 'text-emerald-400' : 'text-blue-400'
                        }`}>{inv.roi}</p>
                        <p className="text-xs text-slate-400">ROI</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${
                        inv.status === 'excellent' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`} style={{ width: inv.roi }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Biological Assets Valuation */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-plant-line text-emerald-400"></i>
                Định giá Tài sản Sinh học
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-2">Đang trồng (0-6 tháng)</p>
                  <p className="text-2xl font-bold text-white mb-1">28.5 tỷ</p>
                  <p className="text-xs text-slate-500">850 ha</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-2">Giai đoạn phát triển (6-18 tháng)</p>
                  <p className="text-2xl font-bold text-white mb-1">52.3 tỷ</p>
                  <p className="text-xs text-slate-500">1,100 ha</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-sm text-slate-400 mb-2">Sẵn sàng thu hoạch</p>
                  <p className="text-2xl font-bold text-white mb-1">35.8 tỷ</p>
                  <p className="text-xs text-slate-500">500 ha</p>
                </div>
              </div>
              <div className="mt-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-4 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Tổng giá trị tài sản sinh học</p>
                    <p className="text-3xl font-bold text-white">116.6 tỷ VNĐ</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    Xuất báo cáo thế chấp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARBON TAB */}
        {activeTab === 'carbon' && (
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-leaf-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">{carbonData.totalCO2}</p>
                <p className="text-xs opacity-90">CO2 đã hấp thụ</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-coin-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">{carbonData.credits}</p>
                <p className="text-xs opacity-90">Tín chỉ đã phát hành</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-shopping-bag-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">{carbonData.sold}</p>
                <p className="text-xs opacity-90">Tín chỉ đã bán</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-money-dollar-circle-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">{carbonData.revenue}</p>
                <p className="text-xs opacity-90">Doanh thu Carbon</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white shadow-xl">
                <i className="ri-building-line text-3xl opacity-80 mb-2"></i>
                <p className="text-2xl font-bold mb-1">{carbonData.buyers}</p>
                <p className="text-xs opacity-90">Doanh nghiệp mua</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Carbon Counter */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-dashboard-line text-emerald-400"></i>
                  Bộ đếm Carbon Real-time
                </h3>
                <div className="bg-slate-900 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <p className="text-5xl font-bold text-emerald-400 mb-2">45,280</p>
                    <p className="text-sm text-slate-400">Tấn CO2 đã hấp thụ</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-800 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Hôm nay</p>
                      <p className="text-xl font-bold text-white">+125 tấn</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-3">
                      <p className="text-xs text-slate-400 mb-1">Tháng này</p>
                      <p className="text-xl font-bold text-white">+3,450 tấn</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-xs text-green-400 mb-2">Tương đương với:</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>🚗 9,850 xe ô tô chạy 1 năm</p>
                    <p>🏠 5,230 hộ gia đình tiêu thụ điện 1 năm</p>
                    <p>✈️ 2,150 chuyến bay nội địa</p>
                  </div>
                </div>
              </div>

              {/* Credit Management */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-exchange-line text-emerald-400"></i>
                  Quản lý Tín chỉ
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-400">Tín chỉ khả dụng</span>
                      <span className="text-xl font-bold text-emerald-400">4,130</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                      Phát hành thêm (Minting)
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-400">Đang giao dịch</span>
                      <span className="text-xl font-bold text-blue-400">850</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                      Xem giao dịch
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-400">Đã bán</span>
                      <span className="text-xl font-bold text-slate-400">8,320</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                      Lịch sử giao dịch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profit Distribution */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-pie-chart-line text-emerald-400"></i>
                Phân chia Lợi nhuận Carbon
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-emerald-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Nông dân</p>
                      <p className="text-lg font-bold text-white">50%</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">2.1 tỷ VNĐ</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-team-line text-blue-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">HTX</p>
                      <p className="text-lg font-bold text-white">25%</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">1.05 tỷ VNĐ</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-building-line text-purple-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">GreenLight</p>
                      <p className="text-lg font-bold text-white">15%</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">630 triệu VNĐ</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <i className="ri-funds-line text-amber-400"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Quỹ R&D</p>
                      <p className="text-lg font-bold text-white">10%</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">420 triệu VNĐ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ESG TAB */}
        {activeTab === 'esg' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Environment */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="ri-leaf-line text-green-400"></i>
                    Environment
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-400">{esgMetrics.environment.score}</p>
                    <p className="text-xs text-slate-400">Điểm</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Số cây trồng</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.environment.trees}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Tiết kiệm nước</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.environment.water}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Đa dạng sinh học</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.environment.biodiversity}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="ri-team-line text-blue-400"></i>
                    Social
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-400">{esgMetrics.social.score}</p>
                    <p className="text-xs text-slate-400">Điểm</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Việc làm tạo ra</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.social.jobs}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Tăng thu nhập</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.social.income}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Dân tộc thiểu số</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.social.minorities}</p>
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <i className="ri-shield-check-line text-purple-400"></i>
                    Governance
                  </h3>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-400">{esgMetrics.governance.score}</p>
                    <p className="text-xs text-slate-400">Điểm</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Minh bạch</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.governance.transparency}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Kiểm toán</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.governance.audits}</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Vi phạm</p>
                    <p className="text-lg font-semibold text-white">{esgMetrics.governance.violations}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ESG Report */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-file-chart-line text-emerald-400"></i>
                Báo cáo Phát triển Bền vững
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white mb-3">Báo cáo có sẵn</h4>
                  <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="ri-file-pdf-line text-red-400 text-2xl"></i>
                        <div>
                          <p className="text-sm font-semibold text-white">ESG Report Q4 2024</p>
                          <p className="text-xs text-slate-400">Cập nhật: 31/12/2024</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors whitespace-nowrap">
                        Tải xuống
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="ri-file-pdf-line text-red-400 text-2xl"></i>
                        <div>
                          <p className="text-sm font-semibold text-white">Carbon Credit Report 2024</p>
                          <p className="text-xs text-slate-400">Cập nhật: 31/12/2024</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors whitespace-nowrap">
                        Tải xuống
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="ri-file-pdf-line text-red-400 text-2xl"></i>
                        <div>
                          <p className="text-sm font-semibold text-white">Social Impact Report 2024</p>
                          <p className="text-xs text-slate-400">Cập nhật: 31/12/2024</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors whitespace-nowrap">
                        Tải xuống
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4">Tạo báo cáo tùy chỉnh</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Loại báo cáo</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-emerald-500">
                        <option>ESG Tổng hợp</option>
                        <option>Environment Only</option>
                        <option>Social Impact</option>
                        <option>Governance</option>
                        <option>Carbon Credits</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Khoảng thời gian</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-emerald-500">
                        <option>Q4 2024</option>
                        <option>Q3 2024</option>
                        <option>Năm 2024</option>
                        <option>Tùy chỉnh</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Định dạng</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-emerald-500">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>PowerPoint</option>
                      </select>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap mt-4">
                      Tạo báo cáo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VOUCHER TAB */}
        {activeTab === 'voucher' && (
          <div className="space-y-6">
            {/* Create Voucher Package */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-add-circle-line text-emerald-400"></i>
                Tạo Gói Voucher Giống Mới
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Tên gói hỗ trợ</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Hỗ trợ Mùa vụ 2026"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Ngân sách (tỷ VNĐ)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 5"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Loại cây giống</label>
                  <select className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="">Chọn loại cây</option>
                    <option value="mega-3p">Gáo Vàng (Mega 3P)</option>
                    <option value="saml-ngoc-linh">Sâm Ngọc Linh</option>
                    <option value="keo-lai">Keo Lai</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => {
                  alert('Tính năng tạo gói voucher sẽ mở trang đặt hàng bulk trên Seed Marketplace');
                  navigate('/seed-marketplace?source=greenlight');
                }}
                className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <i className="ri-check-line mr-2"></i>
                Tạo gói & Đặt hàng Bulk
              </button>
              <button
                onClick={() => navigate('/seed-marketplace/vouchers')}
                className="mt-3 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors w-full"
              >
                <i className="ri-list-check mr-2"></i>
                Quản lý Voucher & Phân bổ
              </button>
            </div>

            {/* Voucher Packages List */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-coupon-line text-emerald-400"></i>
                Các Gói Voucher Đã Tạo
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: 'VCH-2026-001',
                    name: 'Hỗ trợ Mùa vụ 2026 - Gáo Vàng',
                    budget: 5,
                    seedType: 'Gáo Vàng (Mega 3P)',
                    totalVouchers: 500,
                    usedVouchers: 342,
                    status: 'active',
                    createdAt: '01/01/2026',
                    totalValue: '5 tỷ VNĐ',
                  },
                  {
                    id: 'VCH-2025-002',
                    name: 'Hỗ trợ Sâm Ngọc Linh - Vùng khó khăn',
                    budget: 2,
                    seedType: 'Sâm Ngọc Linh',
                    totalVouchers: 200,
                    usedVouchers: 200,
                    status: 'completed',
                    createdAt: '15/06/2025',
                    totalValue: '2 tỷ VNĐ',
                  },
                ].map((pkg) => (
                  <div key={pkg.id} className="bg-slate-900 rounded-lg p-5 border border-slate-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{pkg.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>Mã gói: {pkg.id}</span>
                          <span>•</span>
                          <span>Tạo: {pkg.createdAt}</span>
                          <span>•</span>
                          <span>{pkg.seedType}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        pkg.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-slate-600 text-slate-300'
                      }`}>
                        {pkg.status === 'active' ? 'Đang hoạt động' : 'Hoàn thành'}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Ngân sách</div>
                        <div className="text-white font-bold">{pkg.totalValue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Tổng voucher</div>
                        <div className="text-white font-bold">{pkg.totalVouchers} voucher</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Đã sử dụng</div>
                        <div className="text-white font-bold">{pkg.usedVouchers} voucher</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Tiến độ</div>
                        <div className="text-white font-bold">
                          {Math.round((pkg.usedVouchers / pkg.totalVouchers) * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/seed-marketplace/vouchers?package=${pkg.id}`)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Xem chi tiết & Phân bổ
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors">
                        <i className="ri-download-line mr-2"></i>
                        Xuất danh sách
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Tổng gói voucher</div>
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-xs text-emerald-400 mt-1">1 đang hoạt động</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Tổng ngân sách</div>
                <div className="text-2xl font-bold text-white">7 tỷ</div>
                <div className="text-xs text-emerald-400 mt-1">VNĐ</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Voucher đã phân bổ</div>
                <div className="text-2xl font-bold text-white">542</div>
                <div className="text-xs text-slate-400 mt-1">/ 700 tổng</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">HTX đã nhận</div>
                <div className="text-2xl font-bold text-white">158</div>
                <div className="text-xs text-emerald-400 mt-1">HTX</div>
              </div>
            </div>
          </div>
        )}

        {/* VITA SUPPLY TAB */}
        {activeTab === 'supply' && (
          <div className="space-y-6">
            {/* Supply Overview Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-shopping-cart-2-line text-2xl opacity-80"></i>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Doanh thu</span>
                </div>
                <p className="text-2xl font-bold mb-1">45.8 tỷ</p>
                <p className="text-xs opacity-90">Tháng này</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-file-list-3-line text-2xl opacity-80"></i>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Đơn hàng</span>
                </div>
                <p className="text-2xl font-bold mb-1">1,247</p>
                <p className="text-xs opacity-90">Tổng đơn</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-building-line text-2xl opacity-80"></i>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">HTX</span>
                </div>
                <p className="text-2xl font-bold mb-1">23</p>
                <p className="text-xs opacity-90">Đang mua</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <i className="ri-time-line text-2xl opacity-80"></i>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">BNPL</span>
                </div>
                <p className="text-2xl font-bold mb-1">12.5 tỷ</p>
                <p className="text-xs opacity-90">Đang trả chậm</p>
              </div>
            </div>

            {/* Product Management */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Quản lý Sản phẩm</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                  <i className="ri-add-line mr-2"></i>
                  Thêm sản phẩm
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <i className="ri-seedling-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Vật tư Canh tác</h4>
                      <p className="text-xs text-slate-400">156 sản phẩm</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">8.2 tỷ</div>
                  <div className="text-xs text-slate-400">Doanh thu tháng</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="ri-tools-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Máy móc</h4>
                      <p className="text-xs text-slate-400">42 sản phẩm</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">28.5 tỷ</div>
                  <div className="text-xs text-slate-400">Doanh thu tháng</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="ri-smartphone-line text-white text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">IoT & Công nghệ</h4>
                      <p className="text-xs text-slate-400">28 sản phẩm</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">9.1 tỷ</div>
                  <div className="text-xs text-slate-400">Doanh thu tháng</div>
                </div>
              </div>
            </div>

            {/* Supplier Management */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Nhà Cung cấp</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                  <i className="ri-add-line mr-2"></i>
                  Thêm nhà cung cấp
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Đạm Cà Mau', category: 'Phân bón', orders: 245, revenue: '12.5 tỷ', status: 'active' },
                  { name: 'Kubota Việt Nam', category: 'Máy móc', orders: 89, revenue: '18.2 tỷ', status: 'active' },
                  { name: 'DJI Vietnam', category: 'Drone', orders: 34, revenue: '5.8 tỷ', status: 'active' },
                  { name: 'FPT IoT', category: 'Cảm biến', orders: 156, revenue: '8.9 tỷ', status: 'active' },
                ].map((supplier, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-white">{supplier.name}</h4>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                            {supplier.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{supplier.category}</span>
                          <span>•</span>
                          <span>{supplier.orders} đơn hàng</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">{supplier.revenue}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm hover:bg-slate-500">
                        <i className="ri-pencil-line mr-2"></i>
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders by HTX */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Đơn hàng theo HTX</h3>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600">
                  <i className="ri-download-line mr-2"></i>
                  Xuất báo cáo
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">HTX</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Đơn hàng</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Tổng tiền</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">BNPL</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { coop: 'HTX Tu Mơ Rông', orders: 45, total: '2.8 tỷ', bnpl: '1.2 tỷ', status: 'active' },
                      { coop: 'HTX Kon Tum', orders: 38, total: '3.5 tỷ', bnpl: '1.8 tỷ', status: 'active' },
                      { coop: 'HTX Sapa', orders: 32, total: '2.1 tỷ', bnpl: '0.9 tỷ', status: 'active' },
                      { coop: 'HTX Đắk Lắk', orders: 28, total: '1.9 tỷ', bnpl: '0.7 tỷ', status: 'active' },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="py-3 px-4 text-white font-medium">{row.coop}</td>
                        <td className="py-3 px-4 text-slate-300">{row.orders}</td>
                        <td className="py-3 px-4 text-emerald-400 font-semibold">{row.total}</td>
                        <td className="py-3 px-4 text-amber-400">{row.bnpl}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                            {row.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BNPL Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Cấu hình BNPL</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Lãi suất trả chậm</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={1.5}
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      />
                      <span className="text-slate-400">%/tháng</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Thời hạn tối đa</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={12}
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      />
                      <span className="text-slate-400">tháng</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Hạn mức tối đa</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={500}
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      />
                      <span className="text-slate-400">triệu VNĐ</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">
                    Lưu cấu hình
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Group Buying Active</h3>
                <div className="space-y-3">
                  {[
                    { product: 'Máy sấy dược liệu VITA Dryer', target: 5, current: 3, discount: 30, deadline: '2024-12-10' },
                    { product: 'VITA Cam - Camera giám sát', target: 10, current: 8, discount: 25, deadline: '2024-11-30' },
                  ].map((gb, idx) => (
                    <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">{gb.product}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Tiến độ:</span>
                        <span className="text-sm font-semibold text-white">{gb.current}/{gb.target}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(gb.current / gb.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-400 font-semibold">Giảm {gb.discount}%</span>
                        <span className="text-slate-400">Hạn: {gb.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM TAB */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* User Management */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-user-settings-line text-emerald-400"></i>
                  Quản lý Người dùng
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Tổng người dùng</span>
                      <span className="text-xl font-bold text-white">1,247</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-emerald-400">1,228 hoạt động</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-red-400">19 bị khóa</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    Thêm người dùng mới
                  </button>
                  <button className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                    Quản lý phân quyền
                  </button>
                </div>
              </div>

              {/* System Config */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="ri-settings-3-line text-emerald-400"></i>
                  Cấu hình Hệ thống
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Phí sàn giao dịch</span>
                      <span className="text-sm font-semibold text-white">3.5%</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Ngưỡng cảnh báo rủi ro</span>
                      <span className="text-sm font-semibold text-white">85%</span>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Tỷ lệ chiết khấu HTX</span>
                      <span className="text-sm font-semibold text-white">2%</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap mt-2">
                    Chỉnh sửa cấu hình
                  </button>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-heart-pulse-line text-emerald-400"></i>
                Sức khỏe Hệ thống
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">API Server</span>
                  </div>
                  <p className="text-lg font-bold text-white">99.9%</p>
                  <p className="text-xs text-slate-500">Uptime</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">Database</span>
                  </div>
                  <p className="text-lg font-bold text-white">98.5%</p>
                  <p className="text-xs text-slate-500">Performance</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">Storage</span>
                  </div>
                  <p className="text-lg font-bold text-white">65%</p>
                  <p className="text-xs text-slate-500">Used</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">Network</span>
                  </div>
                  <p className="text-lg font-bold text-white">125ms</p>
                  <p className="text-xs text-slate-500">Latency</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
