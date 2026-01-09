import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import BottomNav from '../../components/feature/BottomNav';

export default function Diary() {
  const [showActionGrid, setShowActionGrid] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { id: 'plow', name: 'Cuốc đất', icon: 'ri-tools-line', color: 'bg-amber-500' },
    { id: 'seed', name: 'Gieo hạt', icon: 'ri-seedling-line', color: 'bg-green-500' },
    { id: 'fertilize', name: 'Bón phân', icon: 'ri-plant-line', color: 'bg-lime-500' },
    { id: 'water', name: 'Tưới nước', icon: 'ri-drop-line', color: 'bg-blue-500' },
    { id: 'spray', name: 'Phun thuốc', icon: 'ri-flask-line', color: 'bg-purple-500' },
    { id: 'harvest', name: 'Thu hoạch', icon: 'ri-shopping-basket-line', color: 'bg-orange-500' }
  ];

  const diaryEntries = [
    { 
      id: 1, 
      date: '15/01/2025', 
      time: '07:30',
      action: 'Tưới nước', 
      note: 'Tưới nước 2 tiếng, cây phát triển tốt',
      image: 'https://readdy.ai/api/search-image?query=healthy%20green%20citrus%20trees%20in%20Vietnamese%20orchard%20with%20water%20irrigation%20system%2C%20bright%20morning%20sunlight%2C%20lush%20green%20leaves%2C%20simple%20agricultural%20background%2C%20natural%20farming%20scene&width=400&height=300&seq=diary1&orientation=landscape'
    },
    { 
      id: 2, 
      date: '14/01/2025', 
      time: '08:00',
      action: 'Bón phân', 
      note: 'Bón phân hữu cơ đợt 1, thời tiết thuận lợi',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20applying%20organic%20fertilizer%20to%20citrus%20trees%2C%20simple%20agricultural%20scene%2C%20green%20orchard%20background%2C%20natural%20farming%20practice%2C%20morning%20light&width=400&height=300&seq=diary2&orientation=landscape'
    },
    { 
      id: 3, 
      date: '13/01/2025', 
      time: '09:15',
      action: 'Kiểm tra sâu bệnh', 
      note: 'Không phát hiện sâu bệnh, cây khỏe mạnh',
      image: 'https://readdy.ai/api/search-image?query=close%20up%20of%20healthy%20citrus%20tree%20leaves%2C%20Vietnamese%20orchard%2C%20no%20pests%2C%20vibrant%20green%20foliage%2C%20simple%20agricultural%20background%2C%20natural%20daylight&width=400&height=300&seq=diary3&orientation=landscape'
    }
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);
    setShowActionGrid(false);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setVoiceNote('Hôm nay tưới nước 2 tiếng, cây phát triển tốt');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAction(null);
      setVoiceNote('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto" label="" />
            <div>
              <h1 className="text-base sm:text-lg font-bold">Nhật ký Canh tác</h1>
              <p className="text-xs text-emerald-100">Ghi chép công việc hàng ngày</p>
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

      {/* Diary Entries */}
      <div className="px-4 sm:px-6 mt-4 sm:mt-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Lịch sử hoạt động</h2>
        <div className="space-y-3 sm:space-y-4">
          {diaryEntries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="w-full h-40 sm:h-48">
                <img 
                  src={entry.image} 
                  alt={entry.action}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">{entry.action}</h3>
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">{entry.date} • {entry.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{entry.note}</p>
                <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-map-pin-line"></i>
                  <span>Vân Sơn, Việt Trì</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Entry Button */}
      <button
        onClick={() => setShowActionGrid(true)}
        className="fixed bottom-28 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-40"
      >
        <i className="ri-add-line text-3xl sm:text-4xl"></i>
      </button>

      {/* Action Grid Modal */}
      {showActionGrid && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-4 sm:p-6 pb-6 sm:pb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Chọn công việc</h3>
              <button 
                onClick={() => setShowActionGrid(false)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionSelect(action.id)}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${action.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <i className={`${action.icon} text-2xl sm:text-3xl text-white`}></i>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-800 text-center whitespace-nowrap">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recording Modal */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Ghi chú bằng giọng nói</h3>
            
            {/* Camera Preview Placeholder */}
            <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=Vietnamese%20citrus%20orchard%20view%20through%20camera%20viewfinder%2C%20green%20trees%2C%20simple%20agricultural%20scene%2C%20natural%20farming%20background%2C%20bright%20daylight&width=400&height=300&seq=camera1&orientation=landscape"
                alt="Camera preview"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Voice Recording */}
            <div className="mb-4 sm:mb-6">
              <button
                onClick={handleVoiceRecord}
                className={`w-full ${isRecording ? 'bg-red-600' : 'bg-blue-600'} hover:opacity-90 text-white font-semibold py-4 sm:py-5 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all whitespace-nowrap cursor-pointer text-sm sm:text-base`}
              >
                <i className={`${isRecording ? 'ri-stop-circle-line' : 'ri-mic-line'} text-xl sm:text-2xl`}></i>
                <span>{isRecording ? 'Đang ghi âm...' : 'Giữ để ghi âm'}</span>
              </button>
              
              {voiceNote && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-700">{voiceNote}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 sm:space-y-3">
              <button 
                onClick={handleSubmit}
                disabled={!voiceNote}
                className={`w-full ${voiceNote ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300'} text-white font-semibold py-3.5 sm:py-4 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base`}
              >
                Gửi Báo Cáo
              </button>
              <button 
                onClick={() => {
                  setSelectedAction(null);
                  setVoiceNote('');
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3.5 sm:py-4 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i className="ri-check-line text-5xl sm:text-6xl text-green-600"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Ghi nhật ký thành công!</h3>
          </div>
        </div>
      )}

      <BottomNav active="diary" />
    </div>
  );
}
