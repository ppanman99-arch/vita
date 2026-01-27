import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import GreenPointsBadge from '@/components/shared/GreenPointsBadge';
import { consumerService } from '../../application/ConsumerService';
import type { GreenPointReward } from '@/lib/greenPoints/types';

export default function RewardsPage() {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<GreenPointReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<number>(0);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([consumerService.getRewards(), consumerService.getGreenPoints()]).then(([r, gp]) => {
      setRewards(r ?? []);
      setPoints(gp?.availablePoints ?? 0);
      setLoading(false);
    });
  }, []);

  const handleRedeem = async (reward: GreenPointReward) => {
    if (points < reward.pointsRequired) {
      alert('Không đủ điểm.');
      return;
    }
    setRedeeming(reward.id);
    try {
      await consumerService.redeemPoints(reward.pointsRequired, reward.id, reward.name);
      alert('Đổi thành công! Voucher đã được thêm vào Kho Voucher.');
      const gp = await consumerService.getGreenPoints();
      setPoints(gp?.availablePoints ?? 0);
    } catch (e: unknown) {
      alert((e as Error)?.message ?? 'Có lỗi xảy ra.');
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Đổi điểm</h1>
              <p className="text-sm text-gray-500">Green Points → Ưu đãi</p>
            </div>
            <GreenPointsBadge className="flex-shrink-0" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{r.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{r.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-600 font-bold">{r.pointsRequired} điểm</span>
                <button
                  disabled={!r.available || points < r.pointsRequired || redeeming === r.id}
                  onClick={() => handleRedeem(r)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {redeeming === r.id ? 'Đang xử lý...' : 'Đổi ngay'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {rewards.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-gift-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Hiện không có phần quà.</p>
          </div>
        )}
      </div>
    </div>
  );
}
