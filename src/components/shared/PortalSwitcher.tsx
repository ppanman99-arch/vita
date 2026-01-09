import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Portal {
  id: string;
  name: string;
  path: string;
  icon: string;
  color: string;
  category: string;
}

const portals: Portal[] = [
  // Đầu tư & Tác động Môi trường
  {
    id: 'investor-portal',
    name: 'Investor Portal',
    path: '/investor-portal/login',
    icon: 'ri-shield-star-line',
    color: 'from-emerald-600 to-teal-700',
    category: 'Đầu tư',
  },
  {
    id: 'esg-portal',
    name: 'ESG Portal',
    path: '/esg-portal/login',
    icon: 'ri-leaf-line',
    color: 'from-green-600 to-emerald-700',
    category: 'Đầu tư',
  },
  {
    id: 'timber-trading',
    name: 'Timber Trading',
    path: '/timber-trading',
    icon: 'ri-tree-line',
    color: 'from-amber-600 to-orange-700',
    category: 'Thương mại',
  },
  
  // Quản trị & Sản xuất
  {
    id: 'admin',
    name: 'HTX Admin',
    path: '/login?role=cooperative',
    icon: 'ri-team-line',
    color: 'from-blue-600 to-cyan-700',
    category: 'Quản trị',
  },
  {
    id: 'farmer',
    name: 'Nông dân',
    path: '/login?role=farmer',
    icon: 'ri-seedling-line',
    color: 'from-green-600 to-emerald-700',
    category: 'Sản xuất',
  },
  
  // Đối tác
  {
    id: 'enterprise',
    name: 'Doanh nghiệp',
    path: '/login?role=enterprise',
    icon: 'ri-building-line',
    color: 'from-indigo-600 to-purple-700',
    category: 'Đối tác',
  },
  {
    id: 'research',
    name: 'Nghiên cứu',
    path: '/login?role=research',
    icon: 'ri-flask-line',
    color: 'from-purple-600 to-pink-700',
    category: 'Đối tác',
  },
  {
    id: 'physician',
    name: 'Thầy thuốc',
    path: '/login?role=physician',
    icon: 'ri-stethoscope-line',
    color: 'from-teal-600 to-cyan-700',
    category: 'Đối tác',
  },
  
  // Hệ thống
  {
    id: 'greenlight-command',
    name: 'GreenLight Command',
    path: '/login?role=admin',
    icon: 'ri-command-line',
    color: 'from-gray-700 to-gray-900',
    category: 'Hệ thống',
  },
  {
    id: 'home',
    name: 'Trang chủ',
    path: '/home',
    icon: 'ri-home-4-line',
    color: 'from-emerald-500 to-teal-600',
    category: 'Hệ thống',
  },
];

interface PortalSwitcherProps {
  variant?: 'dark' | 'light';
}

export default function PortalSwitcher({ variant = 'dark' }: PortalSwitcherProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentPortal = portals.find(p => location.pathname.includes(p.id) || location.pathname === p.path);

  const groupedPortals = portals.reduce((acc, portal) => {
    if (!acc[portal.category]) {
      acc[portal.category] = [];
    }
    acc[portal.category].push(portal);
    return acc;
  }, {} as Record<string, Portal[]>);

  return (
    <div className="relative">
      {/* Toggle Button - Simplified */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
          variant === 'light'
            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
            : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20'
        }`}
        title="Chuyển Portal"
      >
        <i className={`ri-apps-2-line ${isOpen ? 'text-lg' : 'text-xl'} transition-transform ${isOpen ? 'scale-110' : ''}`}></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-apps-2-line text-emerald-600"></i>
                  Chuyển đổi Portal
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Chọn portal để chuyển đổi
              </p>
            </div>

            <div className="p-2">
              {Object.entries(groupedPortals).map(([category, categoryPortals]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {categoryPortals.map((portal) => {
                      const isActive = currentPortal?.id === portal.id;
                      return (
                        <button
                          key={portal.id}
                          onClick={() => {
                            navigate(portal.path);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                            isActive
                              ? 'bg-gradient-to-r ' + portal.color + ' text-white shadow-md'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-white/20' : 'bg-gradient-to-br ' + portal.color
                          }`}>
                            <i className={`${portal.icon} ${isActive ? 'text-white' : 'text-white'} text-xl`}></i>
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                              {portal.name}
                            </p>
                            <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                              {portal.path}
                            </p>
                          </div>
                          {isActive && (
                            <i className="ri-check-line text-white text-xl"></i>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  navigate('/home');
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-home-4-line"></i>
                Về Trang chọn Portal
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

