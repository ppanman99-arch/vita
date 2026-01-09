import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../components/shared/PortalSwitcher';

interface ExpertTopBarProps {
  expertName: string;
  isVerified?: boolean;
}

export default function ExpertTopBar({ expertName, isVerified = false }: ExpertTopBarProps) {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('expert_authenticated');
    sessionStorage.removeItem('expert_email');
    sessionStorage.removeItem('expert_name');
    sessionStorage.removeItem('expert_verified');
    navigate('/expert-portal/login');
  };

  return (
    <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-user-star-line text-xl"></i>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-bold truncate flex items-center gap-1.5">
                <span className="truncate">VITA EXPERT</span>
                {isVerified && (
                  <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded-full flex items-center flex-shrink-0">
                    <i className="ri-check-line text-xs"></i>
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <PortalSwitcher />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
            >
              <i className={`ri-${showMobileMenu ? 'close-line' : 'menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="sm:hidden mt-3 pt-3 border-t border-white/20">
            <div className="space-y-2">
              <div className="px-2 py-2 bg-white/10 rounded-lg">
                <p className="text-sm font-medium">{expertName}</p>
                <p className="text-xs text-white/80">Chuyên gia</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-left flex items-center gap-2"
              >
                <i className="ri-logout-box-line"></i>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-user-star-line text-2xl"></i>
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold flex items-center gap-2">
                VITA EXPERT HUB
                {isVerified && (
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                    <i className="ri-check-line"></i>
                    Verified
                  </span>
                )}
              </h1>
              <p className="text-xs lg:text-sm text-white/80 hidden md:block">Cổng làm việc dành cho Chuyên gia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden lg:block">
              <PortalSwitcher />
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">{expertName}</p>
              <p className="text-xs text-white/80">Chuyên gia</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              <i className="ri-logout-box-line"></i>
              <span className="hidden lg:inline">Đăng xuất</span>
            </button>
            <div className="lg:hidden">
              <PortalSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

