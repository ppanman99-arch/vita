import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { earnPoints } from '../../lib/greenPoints/service';

export default function FarmerDiaryPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedLot, setSelectedLot] = useState('A3');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAIAgronomist, setShowAIAgronomist] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const lots = [
    { id: 'A1', name: 'Lô A1', crop: 'Quế', area: '0.5 ha' },
    { id: 'A2', name: 'Lô A2', crop: 'Quế', area: '0.3 ha' },
    { id: 'A3', name: 'Lô A3', crop: 'Cà Gai Leo', area: '0.4 ha' },
    { id: 'B1', name: 'Lô B1', crop: 'Đinh Lăng', area: '0.6 ha' },
    { id: 'B2', name: 'Lô B2', crop: 'Hoàng Tinh', area: '0.3 ha' },
    { id: 'C1', name: 'Lô C1', crop: 'Bạch Truật', area: '0.4 ha' },
  ];

  const quickActions = [
    { id: 'water', label: 'Tưới nước', icon: 'ri-drop-line', color: 'from-blue-500 to-cyan-600' },
    { id: 'fertilize', label: 'Bón phân', icon: 'ri-plant-line', color: 'from-green-500 to-emerald-600' },
    { id: 'weed', label: 'Làm cỏ', icon: 'ri-leaf-line', color: 'from-lime-500 to-green-600' },
    { id: 'spray', label: 'Phun thuốc', icon: 'ri-flask-line', color: 'from-purple-500 to-pink-600' },
    { id: 'harvest', label: 'Thu hoạch', icon: 'ri-scissors-cut-line', color: 'from-orange-500 to-red-600' },
    { id: 'inspect', label: 'Kiểm tra', icon: 'ri-search-eye-line', color: 'from-indigo-500 to-purple-600' },
  ];

  const recentLogs = [
    {
      id: 1,
      date: '15/01/2024',
      time: '08:30',
      lot: 'A3',
      lotName: 'Cà Gai Leo',
      action: 'Thu hoạch',
      content: 'Thu hái Cà Gai Leo, khoảng 25kg. Cây phát triển tốt, lá xanh đều.',
      photos: 2,
      location: 'Đã xác nhận GPS',
      verified: true,
    },
    {
      id: 2,
      date: '14/01/2024',
      time: '14:15',
      lot: 'B2',
      lotName: 'Hoàng Tinh',
      action: 'Bón phân',
      content: 'Bón phân hữu cơ, 10kg/100m². Đất ẩm vừa phải.',
      photos: 1,
      location: 'Đã xác nhận GPS',
      verified: true,
    },
    {
      id: 3,
      date: '13/01/2024',
      time: '09:00',
      lot: 'A1',
      lotName: 'Quế',
      action: 'Làm cỏ',
      content: 'Làm cỏ xung quanh gốc cây. Phát hiện một số cây bị sâu đục thân.',
      photos: 3,
      location: 'Đã xác nhận GPS',
      verified: true,
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    if (!selectedAction) {
      alert('Vui lòng chọn loại công việc trước khi ghi âm');
      return;
    }
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    setShowSuccessModal(true);
    
    // Tích điểm khi ghi nhật ký
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Ghi nhật ký điện tử',
        5,
        'production',
        'farmer-diary',
        { lotId: selectedLot, action: selectedAction, duration: recordingTime }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }
    
    setTimeout(() => {
      setShowSuccessModal(false);
      setRecordingTime(0);
      setSelectedAction('');
      setPhotos([]);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePhotoCapture = async () => {
    // Simulate photo capture
    const newPhoto = `https://readdy.ai/api/search-image?query=Vietnamese%20medicinal%20plant%20farm%20close-up%20photo%2C%20healthy%20green%20leaves%2C%20natural%20outdoor%20setting%2C%20farmer%20documentation%20photography%2C%20authentic%20rural%20scene&width=400&height=400&seq=photo${photos.length + 1}&orientation=squarish`;
    setPhotos([...photos, newPhoto]);
    
    // Tích điểm khi upload ảnh
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Upload ảnh canh tác',
        3,
        'production',
        'farmer-diary',
        { lotId: selectedLot, photoCount: photos.length + 1 }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // AI Agronomist - Chẩn đoán bệnh cây
  const handleAIDiagnosis = () => {
    if (photos.length === 0) {
      alert('Vui lòng chụp ảnh cây trước khi chẩn đoán');
      return;
    }
    setIsAnalyzing(true);
    setShowAIAgronomist(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis = {
        disease: 'Bệnh vàng lá do thiếu dinh dưỡng',
        confidence: 85,
        severity: 'Nhẹ',
        treatment: [
          'Bón phân hữu cơ với tỷ lệ N-P-K: 2-1-1',
          'Tưới nước đều đặn, tránh úng nước',
          'Theo dõi sau 7 ngày, nếu không cải thiện liên hệ chuyên gia',
        ],
        expertAvailable: true,
      };
      setAiDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Nhật ký Canh tác</h1>
          <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <GreenPointsBadge className="hidden sm:flex" />
            <RoleSwitcher />
          </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Quick Action Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chọn loại công việc</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setSelectedAction(action.id)}
                className={`p-4 rounded-xl transition-all cursor-pointer ${
                  selectedAction === action.id
                    ? `bg-gradient-to-br ${action.color} text-white shadow-lg scale-105`
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 ${selectedAction === action.id ? 'bg-white/20' : 'bg-white'} rounded-xl flex items-center justify-center mb-2 mx-auto`}>
                  <i className={`${action.icon} text-2xl ${selectedAction === action.id ? 'text-white' : 'text-gray-600'}`}></i>
                </div>
                <div className="text-sm font-medium text-center">{action.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lot Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chọn lô rừng</h2>
          <div className="grid grid-cols-2 gap-3">
            {lots.map((lot) => (
              <button
                key={lot.id}
                onClick={() => setSelectedLot(lot.id)}
                className={`p-4 rounded-xl transition-all text-left cursor-pointer ${
                  selectedLot === lot.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-bold mb-1">{lot.name}</div>
                <div className={`text-sm ${selectedLot === lot.id ? 'text-green-100' : 'text-gray-500'}`}>
                  {lot.crop} • {lot.area}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Recording Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ghi âm công việc</h2>

          {/* Recording Button */}
          <div className="flex flex-col items-center py-8">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                disabled={!selectedAction}
                className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                  selectedAction
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105 active:scale-95'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <i className="ri-mic-line text-5xl text-white"></i>
              </button>
            ) : (
              <div className="relative">
                <button 
                  onClick={handleStopRecording}
                  className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse cursor-pointer"
                >
                  <i className="ri-stop-line text-5xl text-white"></i>
                </button>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-2xl font-bold text-red-500">{formatTime(recordingTime)}</span>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-600 mt-6">
              {!selectedAction 
                ? 'Chọn loại công việc để bắt đầu'
                : isRecording 
                  ? 'Đang ghi âm... Bấm để dừng' 
                  : 'Bấm để bắt đầu ghi âm'}
            </p>
          </div>

          {/* Photo Upload */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Chụp ảnh xác thực</label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button 
                onClick={handlePhotoCapture}
                className="w-24 h-24 bg-gray-100 rounded-xl flex flex-col items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 cursor-pointer"
              >
                <i className="ri-camera-line text-3xl text-gray-400 mb-1"></i>
                <span className="text-xs text-gray-600">Chụp ảnh</span>
              </button>
              {photos.map((photo, index) => (
                <div key={index} className="relative w-24 h-24 flex-shrink-0">
                  <img src={photo} alt="" className="w-full h-full object-cover object-top rounded-xl" />
                  <button 
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600"
                  >
                    <i className="ri-close-line text-sm text-white"></i>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <i className="ri-information-line"></i> Ảnh có gắn GPS và thời gian thực
            </p>
            
            {/* AI Agronomist Button */}
            {photos.length > 0 && (
              <button
                onClick={handleAIDiagnosis}
                className="w-full mt-3 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
              >
                <i className="ri-brain-line mr-2"></i>
                Bác sĩ Cây trồng AI - Chẩn đoán bệnh
              </button>
            )}
          </div>

          {/* GPS Check-in */}
          <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 rounded-xl">
            <i className="ri-map-pin-line text-2xl text-green-600"></i>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Vị trí GPS</div>
              <div className="text-xs text-gray-600">21.0285° N, 105.8542° E</div>
            </div>
            <i className="ri-checkbox-circle-fill text-2xl text-green-600"></i>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Nhật ký gần đây</h2>
            <button className="text-green-600 text-sm font-medium cursor-pointer">Xem tất cả</button>
          </div>
          
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                        {log.lotName}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                        {log.action}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{log.date} • {log.time}</div>
                  </div>
                  {log.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <i className="ri-checkbox-circle-fill text-lg"></i>
                      <span className="text-xs font-medium">Đã xác thực</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{log.content}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <i className="ri-image-line"></i>
                    <span>{log.photos} ảnh</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    <span>{log.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-checkbox-circle-fill text-5xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Đã lưu nhật ký!</h3>
            <p className="text-gray-600">Công việc đã được ghi nhận và xác thực GPS</p>
          </div>
        </div>
      )}

      {/* AI Agronomist Modal */}
      {showAIAgronomist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="ri-brain-line text-purple-600"></i>
                Bác sĩ Cây trồng AI
              </h3>
              <button
                onClick={() => {
                  setShowAIAgronomist(false);
                  setAiDiagnosis(null);
                }}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            {isAnalyzing ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <i className="ri-brain-line text-purple-600 text-4xl"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">AI đang phân tích...</h4>
                <p className="text-gray-600">Hệ thống đang xử lý hình ảnh và so sánh với cơ sở dữ liệu bệnh cây</p>
              </div>
            ) : aiDiagnosis ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">Chẩn đoán</h4>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      Độ tin cậy: {aiDiagnosis.confidence}%
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{aiDiagnosis.disease}</p>
                  <p className="text-sm text-gray-600">Mức độ: <span className="font-semibold">{aiDiagnosis.severity}</span></p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-medicine-bottle-line text-green-600"></i>
                    Phác đồ xử lý
                  </h4>
                  <ul className="space-y-2">
                    {aiDiagnosis.treatment.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {aiDiagnosis.expertAvailable && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-customer-service-2-line text-blue-600"></i>
                      <h4 className="font-bold text-gray-900">Cần tư vấn thêm?</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Kết nối với chuyên gia từ VITA Expert Hub để được tư vấn từ xa qua Video Call
                    </p>
                    <button
                      onClick={() => navigate('/expert-portal')}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-video-chat-line mr-2"></i>
                      Kết nối với Chuyên gia
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-600 cursor-pointer">
            <i className="ri-book-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nhật ký</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/farm')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-map-2-line text-2xl"></i>
            <span className="text-xs font-medium">Nông trại</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
