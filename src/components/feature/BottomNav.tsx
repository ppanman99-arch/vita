
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  active: 'home' | 'diary' | 'inventory' | 'wallet' | 'notifications';
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: 'ri-home-5-line', path: '/dashboard' },
    { id: 'diary', label: 'Nhật ký', icon: 'ri-book-line', path: '/diary' },
    { id: 'inventory', label: 'Vật tư', icon: 'ri-box-3-line', path: '/inventory' },
    { id: 'wallet', label: 'Ví', icon: 'ri-wallet-3-line', path: '/wallet' },
    { id: 'notifications', label: 'Thông báo', icon: 'ri-notification-3-line', path: '/notifications' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                active === item.id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-2xl`}></i>
              </div>
              <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
