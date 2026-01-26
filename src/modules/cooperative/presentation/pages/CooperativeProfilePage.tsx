import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CooperativeProfile from '../components/CooperativeProfile';
import { CooperativeService } from '../../application/CooperativeService';
import type { Cooperative } from '../../domain/Cooperative';

export default function CooperativeProfilePage() {
  const navigate = useNavigate();
  const cooperativeService = new CooperativeService();
  const [cooperativeId, setCooperativeId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get cooperative ID from session or URL params
    const sessionCoopId = sessionStorage.getItem('cooperative_id');
    if (sessionCoopId) {
      setCooperativeId(sessionCoopId);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <button
            onClick={() => navigate('/cooperative/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Quay lại Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ Hợp tác xã</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý thông tin và cài đặt HTX</p>
        </div>
        
        <CooperativeProfile cooperativeId={cooperativeId} />
      </div>
    </div>
  );
}
