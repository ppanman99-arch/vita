import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/feature/BottomNav';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSOSModal, setShowSOSModal] = useState(false);

  const todayTasks = [
    { id: 1, title: 'Bón phân đợt 1', time: '07:00 - 09:00', priority: 'high', icon: 'ri-plant-line' },
    { id: 2, title: 'Kiểm tra sâu bệnh', time: '10:00 - 11:00', priority: 'medium', icon: 'ri-bug-line' },
    { id: 3, title: 'Tưới nước vườn quýt', time: '15:00 - 17:00', priority: 'normal', icon: 'ri-drop-line' },
    { id: 4, title: 'Ghi nhật ký canh tác', time: '18:00', priority: 'normal', icon: 'ri-file-edit-line' }
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-50 border-red-300';
      case 'medium': return 'bg-yellow-50 border-yellow-300';
      default: return 'bg-green-50 border-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold">Xin chào, Bác Đinh Văn A</h1>
              <p className="text-xs text-emerald-100">Vân Sơn, Việt Trì</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* Weather Card */}
      <div className="px-4 sm:px-6 -mt-8 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <i className="ri-sun-line text-5xl sm:text-6xl text-yellow-500"></i>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-800">28°C</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Nắng đẹp, Độ ẩm 65%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-500">Hôm nay</p>
              <p className="text-xs text-gray-400 mt-1">08:30</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 bg-green-50 rounded-lg p-2.5 sm:p-3 border border-green-200">
            <p className="text-xs sm:text-sm text-green-800 flex items-center gap-2">
              <i className="ri-information-line text-base sm:text-lg"></i>
              <span>Thời tiết thuận lợi cho việc bón phân và tưới nước</span>
            </p>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Việc Cần Làm Hôm Nay</h2>
          <span className="text-xs sm:text-sm text-gray-500">{todayTasks.length} công việc</span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {todayTasks.map((task) => (
            <div 
              key={task.id}
              className={`${getPriorityColor(task.priority)} border-2 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => navigate('/diary')}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-xl shadow-sm flex-shrink-0">
                  <i className={`${task.icon} text-2xl sm:text-3xl text-green-600`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">{task.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    {task.time}
                  </p>
                </div>
                <i className="ri-arrow-right-s-line text-xl sm:text-2xl text-gray-400"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOS Button */}
      <button
        onClick={() => setShowSOSModal(true)}
        className="fixed bottom-28 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-40"
      >
        <i className="ri-alarm-warning-line text-2xl sm:text-3xl"></i>
      </button>

      {/* SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-alarm-warning-line text-4xl sm:text-5xl text-red-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Khẩn cấp</h3>
              <p className="text-sm text-gray-600">Gọi ngay cho cán bộ kỹ thuật HTX?</p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base">
                <i className="ri-phone-line mr-2"></i>
                Gọi ngay: 0912-345-678
              </button>
              <button 
                onClick={() => setShowSOSModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3.5 sm:py-4 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="home" />
    </div>
  );
}
