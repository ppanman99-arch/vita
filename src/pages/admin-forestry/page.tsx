import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminForestryPage() {
  const navigate = useNavigate();
  
  // Redirect to centralized forest management page
  useEffect(() => {
    navigate('/admin-forest-funding?tab=forestry', { replace: true });
  }, [navigate]);
  
  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
