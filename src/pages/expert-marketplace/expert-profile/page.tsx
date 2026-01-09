import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/shared/BackButton';

interface Review {
  id: string;
  htxName: string;
  issue: string;
  rating: number;
  comment: string;
  date: string;
  beforeImage?: string;
  afterImage?: string;
  recoveryRate?: number;
}

interface Service {
  id: string;
  name: string;
  type: 'video' | 'chat' | 'onsite';
  price: number;
  duration?: string;
  description: string;
  icon: string;
}

export default function ExpertProfilePage() {
  const navigate = useNavigate();
  const { expertId } = useParams<{ expertId: string }>();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data - Expert Profile
  const expert = {
    id: expertId || 'exp-001',
    name: 'PGS.TS. Nguyễn Văn A',
    title: 'Chuyên gia Bệnh học Thực vật',
    type: 'freelance' as 'in-house' | 'freelance',
    specialization: ['Nấm bệnh', 'Sâu hại', 'Bệnh lá'],
    rating: 4.9,
    reviews: 127,
    price: 500000,
    status: 'available' as 'available' | 'busy' | 'offline',
    responseTime: '< 2 giờ',
    verified: true,
    description: '20 năm kinh nghiệm nghiên cứu bệnh học thực vật. Chuyên về dược liệu vùng núi cao.',
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    location: 'Hà Nội',
    bio: '20 năm kinh nghiệm nghiên cứu nấm bệnh trên cây dược liệu dưới tán rừng. Đã công bố 45 bài báo khoa học quốc tế về bệnh học thực vật. Chuyên gia tư vấn cho nhiều HTX trồng Sâm Ngọc Linh, Đương Quy tại Tây Nguyên.',
    certifications: [
      { name: 'Tiến sĩ Bệnh học Thực vật', institution: 'Đại học Nông nghiệp Hà Nội', year: '2005' },
      { name: 'Chứng chỉ GACP', institution: 'Bộ Y tế', year: '2020' },
    ],
    achievements: [
      'Giải thưởng Khoa học Công nghệ Việt Nam 2018',
      'Top 10 Chuyên gia Bệnh học Thực vật Việt Nam 2023',
    ],
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20agricultural%20scientist%20in%20white%20lab%20coat%20portrait%20high%20quality&width=400&height=400&seq=expert001&orientation=portrait',
  };

  // Mock data - Reviews
  const reviews: Review[] = [
    {
      id: 'rev-001',
      htxName: 'HTX Tu Mơ Rông',
      issue: 'Bệnh thối rễ Sâm Ngọc Linh',
      rating: 5,
      comment: 'Bác sĩ nhiệt tình, hướng dẫn pha thuốc rất kỹ. Cây khỏi bệnh sau 2 tuần.',
      date: '2025-01-15',
      recoveryRate: 90,
      beforeImage: 'https://readdy.ai/api/search-image?query=Sick%20ginseng%20plant%20with%20root%20rot%20disease%20agricultural%20problem&width=400&height=300&seq=before001&orientation=landscape',
      afterImage: 'https://readdy.ai/api/search-image?query=Healthy%20recovered%20ginseng%20plant%20after%20treatment&width=400&height=300&seq=after001&orientation=landscape',
    },
    {
      id: 'rev-002',
      htxName: 'HTX Dược liệu Gia Lai',
      issue: 'Nấm lá Đương Quy',
      rating: 5,
      comment: 'Chẩn đoán chính xác, thuốc hiệu quả. Rất hài lòng!',
      date: '2025-01-10',
      recoveryRate: 95,
    },
  ];

  // Mock data - Services
  const services: Service[] = [
    {
      id: 'svc-001',
      name: 'Tư vấn Video Call',
      type: 'video',
      price: 500000,
      duration: '30 phút',
      description: 'Xem cây trực tiếp qua camera, tư vấn real-time',
      icon: 'ri-video-chat-line',
    },
    {
      id: 'svc-002',
      name: 'Tư vấn Chat/Ảnh',
      type: 'chat',
      price: 200000,
      description: 'Gửi ảnh và nhận phác đồ điều trị',
      icon: 'ri-message-3-line',
    },
    {
      id: 'svc-003',
      name: 'Đặt lịch Khảo sát tận nơi',
      type: 'onsite',
      price: 5000000,
      duration: '1 ngày',
      description: 'Dành cho ca bệnh nặng cả vùng. Bao gồm chi phí đi lại',
      icon: 'ri-map-pin-line',
    },
  ];

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Expert Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
              />
              {expert.verified && (
                <div className="mt-2 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <i className="ri-shield-check-line"></i>
                    VITA Verified
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{expert.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{expert.title}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i
                      key={star}
                      className={`ri-star-${star <= Math.floor(expert.rating) ? 'fill' : 'line'} text-yellow-400 text-xl`}
                    ></i>
                  ))}
                </div>
                <span className="text-xl font-semibold text-gray-900">{expert.rating}</span>
                <span className="text-gray-600">({expert.reviews} đánh giá)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {expert.specialization.map((spec, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="ri-map-pin-line"></i>
                  {expert.location}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-time-line"></i>
                  Phản hồi: {expert.responseTime}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  expert.status === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : expert.status === 'busy'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {expert.status === 'available' ? '🟢 Sẵn sàng' : expert.status === 'busy' ? '🟡 Đang bận' : '⚫ Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Credentials */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tiểu sử & Chứng chỉ</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{expert.bio}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Chứng chỉ</h3>
              <div className="space-y-3">
                {expert.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <i className="ri-award-line text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <p className="font-semibold text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.institution} - {cert.year}</p>
                    </div>
                    <i className="ri-checkbox-circle-line text-green-600 ml-auto"></i>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thành tựu</h3>
              <div className="space-y-3">
                {expert.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <i className="ri-trophy-line text-purple-600 text-xl mt-0.5"></i>
                    <p className="font-semibold text-gray-900">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Menu */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Menu Dịch vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map(service => (
              <div
                key={service.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all cursor-pointer"
                onClick={() => handleBookService(service.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <i className={`${service.icon} text-2xl text-indigo-600`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                    {service.duration && (
                      <p className="text-xs text-gray-600">{service.duration}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">
                    {(service.price / 1000).toFixed(0)}k VNĐ
                  </span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Chọn
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch sử & Đánh giá</h2>
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{review.issue}</h4>
                    <p className="text-sm text-gray-600">HTX: {review.htxName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i
                          key={star}
                          className={`ri-star-${star <= review.rating ? 'fill' : 'line'} text-yellow-400`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>

                {review.recoveryRate && (
                  <div className="bg-green-50 rounded-lg p-3 mb-4 border-2 border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>Đã chữa khỏi bệnh cho {review.htxName}</strong> - Tỷ lệ phục hồi: <strong className="text-green-600">{review.recoveryRate}%</strong>
                    </p>
                  </div>
                )}

                {review.beforeImage && review.afterImage && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Trước khi điều trị</p>
                      <img
                        src={review.beforeImage}
                        alt="Before"
                        className="w-full h-32 object-cover rounded-lg border-2 border-red-200"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Sau khi điều trị</p>
                      <img
                        src={review.afterImage}
                        alt="After"
                        className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                      />
                    </div>
                  </div>
                )}

                <p className="text-gray-700 mb-2 italic">"{review.comment}"</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Đặt lịch Tư vấn</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{expert.name}</h4>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả triệu chứng <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="VD: Cây bị vàng lá, rụng đốt, đã phun thuốc X nhưng không đỡ..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                  <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    <i className="ri-mic-line mr-2"></i>
                    Ghi âm giọng nói
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tải lên bằng chứng (Ảnh/Video) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                    <i className="ri-camera-line text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">Chụp ảnh/quay video cây bệnh</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4 (tối đa 10MB)</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    <i className="ri-information-line mr-1"></i>
                    AI VITA sẽ quét sơ bộ và gợi ý chuyên gia phù hợp
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Tổng tiền:</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {(services.find(s => s.id === selectedService)?.price || 0) / 1000}k VNĐ
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <i className="ri-wallet-3-line mr-1"></i>
                    Trừ vào Ví Hợp Tác Xã
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      const service = services.find(s => s.id === selectedService);
                      if (service?.type === 'video') {
                        navigate(`/expert-marketplace/consultation?expertId=${expert.id}&service=${selectedService}`);
                      } else {
                        alert('Yêu cầu đã được gửi. Chuyên gia sẽ phản hồi sớm nhất.');
                        setShowBookingModal(false);
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <i className="ri-send-plane-fill mr-2"></i>
                    Xác nhận & Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

