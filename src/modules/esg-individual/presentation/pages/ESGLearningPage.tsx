import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';

const ARTICLES = [
  { id: '1', title: 'ESG là gì?', desc: 'Hiểu về Môi trường - Xã hội - Quản trị', icon: 'ri-lightbulb-line', time: '5 phút' },
  { id: '2', title: 'Đầu tư xanh cho cá nhân', desc: 'Cách bắt đầu với góp vốn HTX và Điểm Xanh', icon: 'ri-seedling-line', time: '8 phút' },
  { id: '3', title: 'Giảm dấu chân carbon', desc: 'Hành động hàng ngày để giảm phát thải', icon: 'ri-leaf-line', time: '6 phút' },
  { id: '4', title: 'SDG và VITA', desc: 'Mục tiêu phát triển bền vững liên quan tới bạn', icon: 'ri-global-line', time: '10 phút' },
];

export default function ESGLearningPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Học tập ESG</h1>
              <p className="text-sm text-gray-500">Nội dung giáo dục về môi trường và đầu tư xanh</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {ARTICLES.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <i className={`${a.icon} text-xl text-emerald-600`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{a.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{a.desc}</p>
              <p className="text-xs text-emerald-600 mt-2">{a.time} đọc</p>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400 self-center" />
          </div>
        ))}
        <button onClick={() => navigate('/esg-individual')} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700">
          Về Dashboard
        </button>
      </div>
    </div>
  );
}
