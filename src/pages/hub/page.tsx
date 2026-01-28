import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Hub() {
  const navigate = useNavigate();
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const landingPages = [
    { name: "Trang chủ Landing", path: "/", icon: "ri-home-4-line", color: "bg-emerald-500" },
    { name: "Trang chọn vai trò", path: "/home", icon: "ri-user-settings-line", color: "bg-green-600" },
    { name: "Đăng nhập", path: "/login", icon: "ri-login-box-line", color: "bg-teal-500" },
  ];

  const registerPages = [
    { name: "Đăng ký Chủ Rừng", path: "/forest-owner-register", icon: "ri-plant-line", color: "bg-emerald-600" },
    { name: "Đăng ký Hợp Tác Xã", path: "/cooperative/onboarding", icon: "ri-team-line", color: "bg-amber-600" },
    { name: "Đăng ký Doanh Nghiệp", path: "/enterprise-register", icon: "ri-building-line", color: "bg-blue-600" },
    { name: "Đăng ký Trung Tâm Gen", path: "/research-partner-register", icon: "ri-flask-line", color: "bg-purple-600" },
    { name: "Đăng ký Thầy Thuốc", path: "/physician-register", icon: "ri-stethoscope-line", color: "bg-teal-600" },
    { name: "Về GreenLight", path: "/investor-about", icon: "ri-lightbulb-flash-line", color: "bg-indigo-600" },
  ];

  const farmerPages = [
    { name: "Dashboard Nông dân", path: "/farmer", icon: "ri-dashboard-line", color: "bg-emerald-500" },
    { name: "Nhật ký Canh tác", path: "/farmer/diary", icon: "ri-book-2-line", color: "bg-green-600" },
    { name: "Nông trại của tôi", path: "/farmer/farm", icon: "ri-plant-line", color: "bg-emerald-600" },
    { name: "Rừng Giao Khoán", path: "/farmer-forestry", icon: "ri-tree-line", color: "bg-lime-600" },
    { name: "Ví Nông dân", path: "/farmer/wallet", icon: "ri-wallet-3-line", color: "bg-cyan-600" },
    { name: "Cảnh báo", path: "/farmer/alerts", icon: "ri-notification-3-line", color: "bg-orange-500" },
    { name: "Cộng đồng", path: "/farmer/community", icon: "ri-team-line", color: "bg-teal-600" },
    { name: "Quét QR", path: "/farmer/scan", icon: "ri-qr-scan-line", color: "bg-blue-600" },
    { name: "Sản xuất", path: "/farmer/producer", icon: "ri-seedling-line", color: "bg-green-700" },
    { name: "Tài nguyên", path: "/farmer/resource", icon: "ri-landscape-line", color: "bg-amber-700" },
    { name: "Góp vốn", path: "/farmer/investor", icon: "ri-money-dollar-circle-line", color: "bg-yellow-600" },
    { name: "Tiêu dùng", path: "/farmer/consumer", icon: "ri-shopping-cart-line", color: "bg-blue-700" },
  ];

  const coopPages = [
    { name: "Quyền lợi HTX", path: "/htx-benefits", icon: "ri-gift-line", color: "bg-teal-500" },
    { name: "Sàn Kết Nối HTX", path: "/coop-marketplace", icon: "ri-store-3-line", color: "bg-emerald-600" },
    { name: "Chi tiết HTX", path: "/coop-detail/HTX001", icon: "ri-file-list-3-line", color: "bg-green-600" },
    { name: "Trung tâm Xã viên", path: "/member-hub", icon: "ri-home-4-line", color: "bg-gray-600" },
  ];

  const adminPages = [
    { name: "Dashboard HTX", path: "/cooperative/dashboard", icon: "ri-dashboard-line", color: "bg-blue-600" },
    { name: "Bản đồ GIS", path: "/admin-gis", icon: "ri-map-pin-line", color: "bg-green-700" },
    { name: "Quản lý Kho", path: "/admin-warehouse", icon: "ri-store-2-line", color: "bg-purple-600" },
    { name: "Tài chính", path: "/admin-finance", icon: "ri-money-dollar-circle-line", color: "bg-indigo-600" },
    { name: "Quản lý Thành viên", path: "/cooperative/members", icon: "ri-team-line", color: "bg-teal-600" },
    { name: "Quản lý Sản xuất", path: "/admin-production", icon: "ri-seedling-line", color: "bg-emerald-600" },
    { name: "Chuyên gia", path: "/admin-expert", icon: "ri-user-star-line", color: "bg-amber-600" },
    { name: "Cơ hội Bao tiêu", path: "/admin-opportunities", icon: "ri-hand-coin-line", color: "bg-orange-600" },
    { name: "Hợp đồng", path: "/cooperative/contracts", icon: "ri-file-contract-line", color: "bg-purple-700" },
    { name: "Quản lý Rừng & Tài trợ", path: "/admin-forest-funding", icon: "ri-tree-line", color: "bg-green-800" },
    { name: "Thẩm định Đất", path: "/admin-land-audit", icon: "ri-survey-line", color: "bg-emerald-700" },
    { name: "Mua Giống", path: "/seed-marketplace?source=self", icon: "ri-seedling-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
  ];

  const researchPages = [
    { name: "Trung tâm Gen & Khoa học", path: "/research-lab", icon: "ri-flask-line", color: "bg-purple-600" },
    { name: "Gene & Nursery Hub", path: "/gene-nursery-hub", icon: "ri-plant-line", color: "bg-green-600" },
    { name: "Seed Marketplace", path: "/seed-marketplace", icon: "ri-seedling-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
  ];

  const partnerPages = [
    { name: "Dashboard Partner", path: "/partner", icon: "ri-building-line", color: "bg-purple-600" },
    { name: "Đặt hàng", path: "/partner/order", icon: "ri-shopping-cart-line", color: "bg-blue-600" },
    { name: "Truy xuất nguồn gốc", path: "/partner/traceability", icon: "ri-qr-code-line", color: "bg-emerald-600" },
    { name: "Mua Giống cho HTX", path: "/seed-marketplace?source=b2b", icon: "ri-seedling-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
  ];

  const physicianPages = [
    { name: "Cổng Kiểm Định & Lâm Sàng", path: "/physician-portal", icon: "ri-stethoscope-line", color: "bg-teal-600" },
    { name: "Tra Cứu Dược Liệu", path: "/physician-portal", icon: "ri-book-2-line", color: "bg-cyan-600" },
  ];

  const investorPages = [
    { name: "Investor Portal", path: "/investor-portal", icon: "ri-funds-line", color: "bg-gradient-to-br from-emerald-600 to-teal-600" },
    { name: "Đăng nhập Nhà đầu tư", path: "/investor-portal/login", icon: "ri-login-box-line", color: "bg-emerald-500" },
    { name: "Đăng ký Nhà đầu tư", path: "/investor-portal/register", icon: "ri-user-add-line", color: "bg-teal-500" },
  ];

  const esgPages = [
    { name: "ESG Portal", path: "/esg-portal", icon: "ri-leaf-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
    { name: "Đăng nhập ESG", path: "/esg-portal/login", icon: "ri-login-box-line", color: "bg-green-500" },
    { name: "Đăng ký ESG", path: "/esg-register", icon: "ri-user-add-line", color: "bg-emerald-500" },
    { name: "Tài trợ Giống", path: "/seed-marketplace?source=esg", icon: "ri-seedling-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
  ];

  const timberPages = [
    { name: "Timber Trading Hub", path: "/timber-trading", icon: "ri-tree-line", color: "bg-gradient-to-br from-amber-600 to-orange-600" },
    { name: "Đăng nhập Timber", path: "/timber-trading/login", icon: "ri-login-box-line", color: "bg-amber-500" },
    { name: "Đăng ký Timber", path: "/timber-trading/register", icon: "ri-user-add-line", color: "bg-orange-500" },
  ];

  const greenlightPages = [
    { name: "GreenLight Command Center", path: "/greenlight-command", icon: "ri-shield-star-line", color: "bg-gradient-to-br from-emerald-600 to-teal-600" },
    { name: "Giám sát & Tuân thủ", path: "/greenlight-command", icon: "ri-shield-check-line", color: "bg-gradient-to-br from-blue-600 to-cyan-600" },
    { name: "Tài chính & Đầu tư", path: "/greenlight-command", icon: "ri-line-chart-line", color: "bg-gradient-to-br from-amber-600 to-orange-600" },
    { name: "Tín chỉ Carbon", path: "/greenlight-command", icon: "ri-leaf-line", color: "bg-gradient-to-br from-green-600 to-emerald-600" },
  ];

  const otherPages = [
    { name: "Hộ chiếu Sản phẩm", path: "/product/QS123", icon: "ri-qr-code-line", color: "bg-slate-600" },
    { name: "Dashboard (Old)", path: "/dashboard", icon: "ri-dashboard-2-line", color: "bg-gray-500" },
    { name: "Nhật ký (Old)", path: "/diary", icon: "ri-book-open-line", color: "bg-gray-500" },
    { name: "Vật tư (Old)", path: "/inventory", icon: "ri-box-2-line", color: "bg-gray-500" },
    { name: "Ví (Old)", path: "/wallet", icon: "ri-wallet-2-line", color: "bg-gray-500" },
    { name: "Thông báo (Old)", path: "/notifications", icon: "ri-notification-2-line", color: "bg-gray-500" },
    { name: "Nông trại của tôi (Old)", path: "/my-farm", icon: "ri-plant-fill", color: "bg-gray-500" },
  ];

  // Role selection data
  const roles = [
    {
      id: 'farmer',
      name: 'Chủ Rừng & Nông Dân',
      description: 'Quản lý canh tác, nhật ký điện tử',
      icon: 'ri-plant-line',
      color: 'bg-green-600',
      loginPath: '/login?role=farmer',
    },
    {
      id: 'cooperative',
      name: 'Hợp Tác Xã',
      description: 'Quản lý xã viên, kho vận',
      icon: 'ri-team-line',
      color: 'bg-blue-600',
      loginPath: '/login?role=cooperative',
    },
    {
      id: 'research',
      name: 'Trung Tâm Gen & Khoa Học',
      description: 'Nghiên cứu, cấp mã giống',
      icon: 'ri-flask-line',
      color: 'bg-purple-600',
      loginPath: '/login?role=research',
    },
    {
      id: 'enterprise',
      name: 'Doanh Nghiệp',
      description: 'Thu mua, bao tiêu dược liệu',
      icon: 'ri-building-line',
      color: 'bg-indigo-600',
      loginPath: '/login?role=enterprise',
    },
    {
      id: 'physician',
      name: 'Thầy Thuốc',
      description: 'Kiểm định chất lượng dược liệu',
      icon: 'ri-stethoscope-line',
      color: 'bg-teal-600',
      loginPath: '/login?role=physician',
    },
    {
      id: 'admin',
      name: 'GreenLight Command',
      description: 'Trung tâm điều hành hệ thống',
      icon: 'ri-shield-star-line',
      color: 'bg-gray-700',
      loginPath: '/login?role=admin',
    },
  ];

  // Portal pages (các portal không cần login qua /login)
  const portalPages = [
    { name: 'Investor Portal', path: '/investor-portal/login', icon: 'ri-funds-line', color: 'bg-gradient-to-br from-emerald-600 to-teal-600', category: 'Đầu tư' },
    { name: 'ESG Portal', path: '/esg-portal/login', icon: 'ri-leaf-line', color: 'bg-gradient-to-br from-green-600 to-emerald-600', category: 'Đầu tư' },
    { name: 'Timber Trading', path: '/timber-trading/login', icon: 'ri-tree-line', color: 'bg-gradient-to-br from-amber-600 to-orange-600', category: 'Thương mại' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src="https://public.readdy.ai/ai/img_res/a5fd02fe-1dd7-427a-a805-e5fb1a94ee79.png" 
                  alt="VITA COOP Logo" 
                  className="w-12 h-12 object-contain"
                />
                <h1 className="text-2xl font-bold">VITA PLATFORM</h1>
              </div>
              <p className="text-sm text-emerald-100">Chọn vai trò để đăng nhập hoặc xem tất cả các trang</p>
            </div>
            <button
              onClick={() => setShowRoleSelection(!showRoleSelection)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              {showRoleSelection ? 'Xem Tất cả Trang' : 'Chọn Vai trò Đăng nhập'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Role Selection View */}
        {showRoleSelection ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bạn là ai?</h2>
              <p className="text-gray-600">Chọn vai trò để đăng nhập vào hệ thống</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => navigate(role.loginPath)}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-600 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${role.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${role.icon} text-3xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-800 mb-0.5">{role.name}</h3>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400 text-xl"></i>
                  </div>
                </button>
              ))}
            </div>

            {/* Portal Pages */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="ri-global-line text-emerald-600"></i>
                Các Portal Khác (Có trang đăng nhập riêng)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {portalPages.map((portal) => (
                  <button
                    key={portal.path}
                    onClick={() => navigate(portal.path)}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500 text-left"
                  >
                    <div className={`${portal.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                      <i className={`${portal.icon} text-2xl text-white`}></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{portal.name}</h4>
                    <p className="text-xs text-gray-600">{portal.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* All Pages View (existing Hub content) */
          <div className="space-y-6">
        {/* Landing & Auth Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-home-line text-xl text-emerald-700"></i>
            <h2 className="text-lg font-bold text-gray-800">Trang chủ & Xác thực</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {landingPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Register Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-file-list-3-line text-xl text-blue-700"></i>
            <h2 className="text-lg font-bold text-gray-800">Trang Đăng Ký</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {registerPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Coop Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-store-3-line text-xl text-emerald-700"></i>
            <h2 className="text-lg font-bold text-gray-800">Hợp Tác Xã & Xã viên</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {coopPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Farmer Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-user-line text-xl text-emerald-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA FARMER - Ứng dụng Nông dân</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {farmerPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Admin Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-admin-line text-xl text-blue-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA ADMIN - Quản trị HTX</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {adminPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Research Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-flask-line text-xl text-purple-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA RESEARCH - Trung tâm Gen & Khoa học</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {researchPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Partner Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-building-line text-xl text-purple-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA PARTNER - Đối tác B2B</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {partnerPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Physician Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-stethoscope-line text-xl text-teal-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA PHYSICIAN - Cổng Kiểm Định & Lâm Sàng</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {physicianPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Investor Portal Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-funds-line text-xl text-emerald-700"></i>
            <h2 className="text-lg font-bold text-gray-800">GREENLIGHT INVESTOR PORTAL - Private Edition</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {investorPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* ESG Portal Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-leaf-line text-xl text-green-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA ESG PORTAL - Impact Investment Hub</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {esgPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Timber Trading Hub Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-tree-line text-xl text-amber-700"></i>
            <h2 className="text-lg font-bold text-gray-800">VITA TIMBER TRADING HUB - Gỗ Nguyên liệu</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {timberPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* GreenLight Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-shield-star-line text-xl text-emerald-700"></i>
            <h2 className="text-lg font-bold text-gray-800">GREENLIGHT - Trung tâm Điều hành & Giám sát</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {greenlightPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>

        {/* Other Pages */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-more-line text-xl text-gray-700"></i>
            <h2 className="text-lg font-bold text-gray-800">Trang khác</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {otherPages.map((page) => (
              <button
                key={page.path}
                onClick={() => navigate(page.path)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left cursor-pointer"
              >
                <div className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <i className={`${page.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{page.name}</h3>
              </button>
            ))}
          </div>
        </section>
          </div>
        )}
      </div>
    </div>
  );
}
