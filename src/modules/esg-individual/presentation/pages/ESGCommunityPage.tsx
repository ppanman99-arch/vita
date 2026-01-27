import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';

const LEADERBOARD = [
  { rank: 1, name: 'Nguyễn A', points: 1250, tier: 'Rừng xanh' },
  { rank: 2, name: 'Trần B', points: 980, tier: 'Cây xanh' },
  { rank: 3, name: 'Lê C', points: 820, tier: 'Cây xanh' },
  { rank: 4, name: 'Bạn', points: 720, tier: 'Cây xanh' },
  { rank: 5, name: 'Phạm D', points: 650, tier: 'Mầm non' },
];

const TOPICS = [
  { id: '1', title: 'Chia sẻ cách giảm plastic', count: 24, icon: 'ri-chat-3-line' },
  { id: '2', title: 'Kinh nghiệm góp vốn HTX', count: 18, icon: 'ri-hand-coin-line' },
  { id: '3', title: 'Ăn uống bền vững', count: 31, icon: 'ri-restaurant-line' },
];

export default function ESGCommunityPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Cộng đồng Công dân Xanh</h1>
              <p className="text-sm text-gray-500">Bảng xếp hạng và thảo luận</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Bảng xếp hạng Impact</h2>
          <ul className="space-y-2">
            {LEADERBOARD.map((u) => (
              <li
                key={u.rank}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  u.name === 'Bạn' ? 'bg-emerald-50 border border-emerald-200' : ''
                }`}
              >
                <span className="w-6 text-center font-bold text-gray-500">#{u.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.tier}</p>
                </div>
                <span className="font-semibold text-emerald-600">{u.points} đ</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Chủ đề thảo luận</h2>
          <div className="space-y-2">
            {TOPICS.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <i className={`${t.icon} text-xl text-emerald-600`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-500">{t.count} tham gia</p>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => navigate('/esg-individual')} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">
          Về Dashboard
        </button>
      </div>
    </div>
  );
}
