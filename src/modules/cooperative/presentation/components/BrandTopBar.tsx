import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../../../components/shared/PortalSwitcher';
import BackButton from '../../../../components/shared/BackButton';

export default function BrandTopBar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  // Get name from multiple sources
  const coopName = sessionStorage.getItem('brand_coop_name') || 
                   sessionStorage.getItem('coop_name') || 
                   sessionStorage.getItem('farmer_name') ||
                   sessionStorage.getItem('admin_name') ||
                   'HTX';
  
  // Check if coming from dashboard
  const fromAdmin = sessionStorage.getItem('cooperative_authenticated') || 
                    sessionStorage.getItem('navigating_from_admin');

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="ri-store-3-line text-white text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">HTX Brand Hub</h1>
              <p className="text-xs text-gray-500">Thương hiệu & Dịch vụ</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <i className="ri-building-line"></i>
              <span className="font-medium">{coopName}</span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <BackButton className="bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100" />
              <PortalSwitcher variant="light" />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <BackButton className="bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100" />
            <PortalSwitcher variant="light" />
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <i className={`ri-${showMenu ? 'close' : 'menu'}-line text-2xl text-gray-700`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {showMenu && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm text-gray-700">
                <i className="ri-building-line mr-2"></i>
                <span className="font-medium">{coopName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

