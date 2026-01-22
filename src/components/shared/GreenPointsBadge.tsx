import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type GreenPoints } from '../../lib/greenPoints/service';
import { TIER_THRESHOLDS } from '../../lib/greenPoints/types';
import { useGreenPointsRealtime } from '../../lib/greenPoints/realtimeService';

interface GreenPointsBadgeProps {
  userId?: string;
  showDetails?: boolean;
  className?: string;
}

// Helper to get current user ID
const getCurrentUserId = (): string => {
  return sessionStorage.getItem('user_id') || 'demo-user';
};

export default function GreenPointsBadge({ 
  userId, 
  showDetails = true,
  className = '' 
}: GreenPointsBadgeProps) {
  const navigate = useNavigate();
  const currentUserId = userId || getCurrentUserId();
  const { points, loading } = useGreenPointsRealtime(currentUserId);
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!points) return null;

  const tierInfo = TIER_THRESHOLDS[points.tier];

  return (
    <>
      <button
        onClick={() => showDetails ? setShowModal(true) : navigate('/green-points')}
        className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all ${className}`}
      >
        <i className={`${tierInfo.icon} text-lg`}></i>
        <div className="flex flex-col items-start">
          <div className="text-xs opacity-90">Green Points</div>
          <div className="text-sm font-bold leading-tight">
            {points.availablePoints.toLocaleString()}
          </div>
        </div>
        {showDetails && (
          <i className="ri-arrow-down-s-line text-xs"></i>
        )}
      </button>

      {/* Quick View Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Green Points</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Points Display */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Điểm khả dụng</span>
                <span className="text-xs opacity-75">Cấp: {points.tier}</span>
              </div>
              <div className="text-4xl font-bold mb-2">
                {points.availablePoints.toLocaleString()}
              </div>
              {points.tierPoints > 0 && (
                <div className="text-xs opacity-90">
                  Còn {points.tierPoints.toLocaleString()} điểm để lên cấp {getNextTier(points.tier)}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Tháng này</div>
                <div className="text-lg font-bold text-emerald-600">
                  +{points.stats.earnedThisMonth.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Năm nay</div>
                <div className="text-lg font-bold text-emerald-600">
                  +{points.stats.earnedThisYear.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/green-points');
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Xem chi tiết
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getNextTier(currentTier: string): string {
  const tiers: Record<string, string> = {
    bronze: 'Silver',
    silver: 'Gold',
    gold: 'Platinum',
    platinum: 'Diamond',
    diamond: 'Diamond',
  };
  return tiers[currentTier] || 'Silver';
}
