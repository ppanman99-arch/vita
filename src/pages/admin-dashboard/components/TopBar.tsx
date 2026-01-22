import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../../../components/shared/BackButton";
import GreenPointsBadge from "../../../components/shared/GreenPointsBadge";

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles = [
    { id: 'admin', name: 'HTX - Quản trị', icon: 'ri-dashboard-line', path: '/admin' },
    { id: 'partner', name: 'Doanh nghiệp - Thu mua', icon: 'ri-building-line', path: '/partner-dashboard' },
    { id: 'physician', name: 'Bác sĩ - Kiểm định', icon: 'ri-stethoscope-line', path: '/physician-portal' },
    { id: 'greenlight', name: 'GreenLight - Command', icon: 'ri-shield-star-line', path: '/greenlight-command' },
    { id: 'hub', name: 'Tất cả phân hệ', icon: 'ri-apps-2-line', path: '/home' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <BackButton />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <GreenPointsBadge className="hidden sm:flex" />
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors cursor-pointer"
              title="Chuyển phân hệ"
            >
              <i className="ri-apps-2-line text-lg sm:text-xl"></i>
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

          <button className="relative p-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <i className="ri-notification-3-line text-xl sm:text-2xl"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Admin GreenLight</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
          <div className="sm:hidden w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </div>
  );
}
