import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';

export default function ConsultationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expertId = searchParams.get('expertId') || 'exp-001';
  const serviceId = searchParams.get('service') || 'svc-001';
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [annotations, setAnnotations] = useState<Array<{x: number, y: number, type: 'circle' | 'arrow'}>>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // Mock expert data
  const expert = {
    id: expertId,
    name: 'PGS.TS. Nguyễn Văn A',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20agricultural%20scientist%20in%20white%20lab%20coat%20portrait%20high%20quality&width=400&height=400&seq=expert001&orientation=portrait',
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    // In real app, this would start WebRTC connection
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowPrescription(true);
  };

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setScreenshot(dataUrl);
        alert('Đã chụp lại khoảnh khắc để làm tư liệu!');
      }
    }
  };

  const handleToggleDrawing = () => {
    setDrawingMode(!drawingMode);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingMode || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setAnnotations([...annotations, { x, y, type: 'circle' }]);
    
    // Draw circle on canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton />
              <div className="flex items-center gap-3">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-semibold">{expert.name}</p>
                  <p className="text-xs text-gray-400">
                    {isCallActive ? '🟢 Đang gọi' : 'Chờ kết nối...'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                <i className="ri-shield-check-line mr-1"></i>
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {!isCallActive ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-video-chat-line text-5xl text-indigo-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Sẵn sàng bắt đầu cuộc gọi</h2>
              <p className="text-gray-400 mb-6">Chuyên gia {expert.name} đang chờ bạn</p>
              <button
                onClick={handleStartCall}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all flex items-center gap-2 mx-auto"
              >
                <i className="ri-phone-line"></i>
                Bắt đầu cuộc gọi
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Split View - Video Call */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expert Video */}
              <div className="bg-gray-800 rounded-xl p-4 relative">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
                    <p className="text-white text-sm font-semibold">{expert.name}</p>
                  </div>
                </div>
              </div>

              {/* HTX Video (Camera sau) */}
              <div className="bg-gray-800 rounded-xl p-4 relative">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    onClick={handleCanvasClick}
                    style={{ cursor: drawingMode ? 'crosshair' : 'default' }}
                  />
                  <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg">
                    <p className="text-white text-sm font-semibold">Camera của bạn</p>
                  </div>
                  {drawingMode && (
                    <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-lg">
                      <p className="text-white text-xs font-semibold">
                        <i className="ri-edit-line mr-1"></i>
                        Chế độ vẽ
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Tools */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <i className="ri-tools-line"></i>
                Công cụ Tương tác
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={handleToggleDrawing}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    drawingMode
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <i className="ri-edit-line text-xl mb-1 block"></i>
                  Bút vẽ AR
                </button>
                <button
                  onClick={handleCapture}
                  className="px-4 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  <i className="ri-camera-line text-xl mb-1 block"></i>
                  Chụp nhanh
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isMuted
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <i className={`ri-mic-${isMuted ? 'off' : 'line'}-line text-xl mb-1 block`}></i>
                  {isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                </button>
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isVideoOff
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <i className={`ri-vidicon-${isVideoOff ? 'off' : 'line'}-line text-xl mb-1 block`}></i>
                  {isVideoOff ? 'Bật video' : 'Tắt video'}
                </button>
              </div>
              {drawingMode && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <i className="ri-information-line text-yellow-600 mr-2"></i>
                    <strong>Chế độ vẽ AR:</strong> Click vào màn hình để vẽ vòng tròn đỏ. Chuyên gia sẽ thấy và chỉ dẫn: "Cắt bỏ cái cành này đi (chỗ khoanh đỏ)".
                  </p>
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${
                  isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <i className={`ri-mic-${isMuted ? 'off' : 'line'}-line`}></i>
              </button>
              <button
                onClick={handleEndCall}
                className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl hover:bg-red-700 transition-all"
              >
                <i className="ri-phone-line"></i>
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${
                  isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <i className={`ri-vidicon-${isVideoOff ? 'off' : 'line'}-line`}></i>
              </button>
            </div>

            {/* Screenshot Preview */}
            {screenshot && (
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">Ảnh đã chụp</h4>
                <img src={screenshot} alt="Screenshot" className="w-full max-w-md rounded-lg" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Digital Prescription Modal */}
      {showPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Phác đồ Điều trị Số</h3>
              <button
                onClick={() => {
                  setShowPrescription(false);
                  navigate('/expert-marketplace');
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{expert.name}</p>
                    <p className="text-xs text-gray-600">Chuyên gia Bệnh học Thực vật</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Ngày kê đơn: {new Date().toLocaleDateString('vi-VN')}
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-4">Đơn thuốc</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Thuốc:</p>
                    <p className="font-semibold text-gray-900">Chế phẩm sinh học Bio-X</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Liều lượng:</p>
                    <p className="font-semibold text-gray-900">Pha 20ml/bình 16 lít</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cách dùng:</p>
                    <p className="font-semibold text-gray-900">Phun ướt đẫm 2 mặt lá, cách nhau 3 ngày</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Lưu ý:</p>
                    <p className="font-semibold text-red-700">Ngừng tưới nước trong 2 ngày đầu</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <i className="ri-shopping-cart-line text-green-600"></i>
                  Mua thuốc này
                </h5>
                <p className="text-sm text-gray-700 mb-3">
                  HTX có thể mua đúng loại thuốc này trên VITA Mart
                </p>
                <button
                  onClick={() => navigate('/vita-mart?product=Bio-X')}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  <i className="ri-shopping-bag-line mr-2"></i>
                  Mua ngay trên VITA Mart
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // In real app, this would download PDF
                    alert('Đã tải xuống PDF phác đồ điều trị');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                >
                  <i className="ri-download-line mr-2"></i>
                  Tải PDF
                </button>
                <button
                  onClick={() => {
                    setShowPrescription(false);
                    navigate('/expert-marketplace');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





