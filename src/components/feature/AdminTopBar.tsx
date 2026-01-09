import { useNavigate } from 'react-router-dom';

interface AdminTopBarProps {
  title: string;
  subtitle?: string;
}

export default function AdminTopBar({ title, subtitle }: AdminTopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button 
            onClick={() => navigate(-1)} 
            className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-lg text-gray-700"></i>
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold text-gray-800 truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-600 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors relative">
            <i className="ri-notification-3-line text-lg text-gray-700"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </button>
          <button className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
            <i className="ri-user-line text-lg text-green-600"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
