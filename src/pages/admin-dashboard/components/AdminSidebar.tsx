import { useNavigate, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', name: 'Tổng quan', icon: 'ri-dashboard-line', path: '/cooperative/dashboard' },
    { id: 'map', name: 'Bản đồ số', icon: 'ri-map-2-line', path: '/admin-map' },
    { id: 'production', name: 'Sản xuất', icon: 'ri-plant-line', path: '/admin-production' },
    { id: 'warehouse', name: 'Kho vận', icon: 'ri-store-3-line', path: '/admin-warehouse' },
    { id: 'finance', name: 'Tài chính', icon: 'ri-money-dollar-circle-line', path: '/admin-finance' },
    { id: 'members', name: 'Xã viên', icon: 'ri-group-line', path: '/cooperative/members' },
    { id: 'contracts', name: 'Hợp đồng', icon: 'ri-file-contract-line', path: '/cooperative/contracts' },
    { id: 'reports', name: 'Báo cáo', icon: 'ri-file-chart-line', path: '/admin-reports' },
    { id: 'expert', name: 'Chuyên gia', icon: 'ri-microscope-line', path: '/admin-expert' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <i className="ri-leaf-line text-2xl text-white"></i>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">VITA COOP</h2>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        )}
        <button 
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <i className={`ri-${collapsed ? 'menu-unfold' : 'menu-fold'}-line text-xl text-gray-600`}></i>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-3 mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg mb-1 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
