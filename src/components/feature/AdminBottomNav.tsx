import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/admin-dashboard', icon: 'ri-dashboard-3-line', label: 'Trung tâm' },
    { path: '/admin-production', icon: 'ri-flow-chart', label: 'Sản xuất' },
    { path: '/admin-warehouse', icon: 'ri-store-3-line', label: 'Kho' },
    { path: '/admin-expert', icon: 'ri-stethoscope-line', label: 'Chuyên gia' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
