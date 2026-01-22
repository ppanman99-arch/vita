import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VitaGreenLinkService } from '../../lib/vitaScore/linkService';
import type { VitaScore, VitaGreenLink } from '../../lib/vitaScore/types';

interface VitaGreenBadgeProps {
  userId: string;
  className?: string;
}

export default function VitaGreenBadge({ userId, className = '' }: VitaGreenBadgeProps) {
  const navigate = useNavigate();
  const [link, setLink] = useState<VitaGreenLink | null>(null);
  const [vitaScore, setVitaScore] = useState<VitaScore | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [linkData, score] = await Promise.all([
        VitaGreenLinkService.getVitaGreenLink(userId),
        VitaGreenLinkService.getVitaScore(userId),
      ]);
      setLink(linkData);
      setVitaScore(score);
    } catch (error) {
      console.error('Error loading VITA-Green link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !link || !vitaScore) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm ${className}`}>
        <i className="ri-loader-4-line animate-spin"></i>
        <span>Đang tải...</span>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'text-yellow-300';
      case 'platinum': return 'text-blue-300';
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-300';
      default: return 'text-amber-500';
    }
  };

  return (
    <button
      onClick={() => navigate('/vita-green-dashboard')}
      className={`flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-1">
        <i className={`ri-vip-diamond-fill ${getTierColor(vitaScore.tier)} text-base`}></i>
        <span>{vitaScore.score}</span>
      </div>
      <span className="hidden sm:inline">|</span>
      <div className="flex items-center gap-1">
        <i className="ri-gift-line text-emerald-300 text-base"></i>
        <span>{link.monthlyVitaBonus > 0 ? `+${link.monthlyVitaBonus}` : '0'}</span>
      </div>
    </button>
  );
}
