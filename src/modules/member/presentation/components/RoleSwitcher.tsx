import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContextManager } from '@core/application/context/useContextManager';
import { Role } from '@core/domain/user/Role';

const ROLES = [
  { id: 'hub', name: 'Trung tâm Xã viên', icon: 'ri-home-4-line', path: '/member-hub', color: 'from-gray-600 to-gray-800', role: null as Role | null },
  { id: 'producer', name: 'Sản xuất', icon: 'ri-plant-line', path: '/farmer', color: 'from-emerald-600 to-green-700', role: Role.FARMER },
  { id: 'resource', name: 'Tài nguyên', icon: 'ri-landscape-line', path: '/farmer/resource', color: 'from-amber-700 to-orange-800', role: Role.FARMER },
  { id: 'investor', name: 'Góp vốn', icon: 'ri-money-dollar-circle-line', path: '/farmer/investor', color: 'from-yellow-500 to-amber-600', role: Role.INVESTOR },
  { id: 'consumer', name: 'Tiêu dùng', icon: 'ri-shopping-cart-line', path: '/farmer/consumer', color: 'from-blue-600 to-indigo-700', role: Role.CONSUMER },
];

function getCurrentRoleId(pathname: string): string {
  if (pathname === '/member-hub') return 'hub';
  if (pathname.startsWith('/farmer/resource')) return 'resource';
  if (pathname.startsWith('/farmer/investor')) return 'investor';
  if (pathname.startsWith('/farmer/consumer')) return 'consumer';
  if (pathname.startsWith('/farmer')) return 'producer';
  return 'producer';
}

export default function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { switchContext } = useContextManager();

  const currentRoleId = getCurrentRoleId(location.pathname);
  const currentRoleData = ROLES.find((r) => r.id === currentRoleId) ?? ROLES[1];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = async (roleId: string, path: string) => {
    setIsOpen(false);
    const entry = ROLES.find((r) => r.id === roleId);
    if (entry?.role) {
      try {
        await switchContext(entry.role);
      } catch (e) {
        console.error('Context switch failed:', e);
      }
    }
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
        <i className={`${currentRoleData.icon} text-base sm:text-xl`} />
        <span className="font-medium text-xs sm:text-sm md:text-base hidden sm:inline">{currentRoleData.name}</span>
        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-sm sm:text-lg`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-xs text-gray-500">Chuyển đổi vai trò</p>
            </div>
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id, role.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${currentRoleId === role.id ? 'bg-gray-50' : ''}`}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${role.icon} text-xl text-white`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{role.name}</p>
                </div>
                {currentRoleId === role.id && <i className="ri-check-line text-emerald-600 text-xl" />}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
              >
                <i className="ri-logout-box-line text-xl" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
