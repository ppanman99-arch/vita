import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';

const CHALLENGES = [
  { id: 'c1', name: 'Tuần không xe máy 1 ngày', pointReward: 50, progress: 0, target: 1, unit: 'ngày', icon: 'ri-bike-line' },
  { id: 'c2', name: 'Ăn chay 3 bữa/tuần', pointReward: 80, progress: 1, target: 3, unit: 'bữa', icon: 'ri-restaurant-line' },
  { id: 'c3', name: 'Đọc 2 bài ESG', pointReward: 30, progress: 2, target: 2, unit: 'bài', icon: 'ri-book-open-line' },
  { id: 'c4', name: 'Góp vốn hoặc tích điểm xanh', pointReward: 100, progress: 0, target: 1, unit: 'lần', icon: 'ri-hand-coin-line' },
];

const BADGES = [
  { id: 'b1', name: 'Green Starter', icon: 'ri-seedling-line', earned: true },
  { id: 'b2', name: 'Tree Planter x5', icon: 'ri-plant-line', earned: true },
  { id: 'b3', name: 'Carbon Hero', icon: 'ri-leaf-line', earned: false },
  { id: 'b4', name: 'Community Builder', icon: 'ri-community-line', earned: false },
];

export default function ESGChallengesPage() {
  const navigate = useNavigate();
  const [challenges] = useState(CHALLENGES);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Thử thách & Huy hiệu</h1>
              <p className="text-sm text-gray-500">Hoàn thành thử thách để nhận Điểm Xanh</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <section>
          <h2 className="font-semibold text-gray-900 mb-3">Thử thách tuần</h2>
          <div className="space-y-3">
            {challenges.map((c) => {
              const pct = c.target > 0 ? Math.min(100, (c.progress / c.target) * 100) : 0;
              return (
                <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${c.icon} text-xl text-emerald-600`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-emerald-600">+{c.pointReward} điểm khi hoàn thành</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span>{c.progress}/{c.target} {c.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-gray-900 mb-3">Huy hiệu</h2>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`rounded-xl border p-4 flex flex-col items-center ${
                  b.earned ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
              >
                <i className={`${b.icon} text-2xl ${b.earned ? 'text-emerald-600' : 'text-gray-400'}`} />
                <p className="text-sm font-medium text-gray-800 mt-2 text-center">{b.name}</p>
                <p className="text-xs text-gray-500">{b.earned ? 'Đã đạt' : 'Chưa đạt'}</p>
              </div>
            ))}
          </div>
        </section>
        <button onClick={() => navigate('/esg-individual')} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">
          Về Dashboard
        </button>
      </div>
    </div>
  );
}
