import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = [
    {
      id: 'hub',
      name: 'Trung tâm Xã viên',
      icon: 'ri-home-4-line',
      path: '/member-hub',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'producer',
      name: 'Sản xuất',
      icon: 'ri-plant-line',
      path: '/farmer',
      color: 'from-emerald-600 to-green-700'
    },
    {
      id: 'resource',
      name: 'Tài nguyên',
      icon: 'ri-landscape-line',
      path: '/farmer/resource',
      color: 'from-amber-700 to-orange-800'
    },
    {
      id: 'investor',
      name: 'Góp vốn',
      icon: 'ri-money-dollar-circle-line',
      path: '/farmer/investor',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'consumer',
      name: 'Tiêu dùng',
      icon: 'ri-shopping-cart-line',
      path: '/farmer/consumer',
      color: 'from-blue-600 to-indigo-700'
    }
  ];

  // Xác định vai trò hiện tại dựa trên đường dẫn URL
  const getCurrentRole = () => {
    const path = location.pathname;
    if (path === '/member-hub') return 'hub';
    if (path.startsWith('/farmer/resource')) return 'resource';
    if (path.startsWith('/farmer/investor')) return 'investor';
    if (path.startsWith('/farmer/consumer')) return 'consumer';
    if (path.startsWith('/farmer')) return 'producer';
    return 'producer'; // Mặc định
  };

  const currentRole = getCurrentRole();
  const currentRoleData = roles.find(r => r.id === currentRole) || roles[1];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (roleId: string, path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${currentRoleData.color} text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap`}
      >
        <i className={`${currentRoleData.icon} text-base sm:text-xl`}></i>
        <span className="font-medium text-xs sm:text-sm md:text-base hidden sm:inline">{currentRoleData.name}</span>
        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-sm sm:text-lg`}></i>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-xs text-gray-500">Chuyển đổi vai trò</p>
            </div>

            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id, role.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentRole === role.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${role.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{role.name}</p>
                </div>
                {currentRole === role.id && <i className="ri-check-line text-emerald-600 text-xl"></i>}
              </button>
            ))}

            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
              >
                <i className="ri-logout-box-line text-xl"></i>
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
