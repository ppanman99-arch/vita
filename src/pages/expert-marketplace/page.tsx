import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

interface Expert {
  id: string;
  name: string;
  title: string;
  type: 'in-house' | 'freelance';
  company?: string;
  specialization: string[];
  rating: number;
  reviews: number;
  price: number; // VNĐ/lần
  status: 'available' | 'busy' | 'offline';
  responseTime: string;
  verified: boolean;
  avatar?: string;
  description: string;
  languages: string[];
  location: string;
}

interface BookingRequest {
  id: string;
  htxName: string;
  issue: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  photos: string[];
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  expertId?: string;
  expertName?: string;
  createdAt: string;
  price?: number;
}

export default function ExpertMarketplacePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'booking' | 'my-experts' | 'shared-intelligence'>('marketplace');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'in-house' | 'freelance'>('all');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('all');
  const [bookingForm, setBookingForm] = useState({
    issue: '',
    urgency: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    description: '',
    photos: [] as string[],
  });

  // Mock data - Experts
  const experts: Expert[] = [
    {
      id: 'exp-001',
      name: 'PGS.TS. Nguyễn Văn A',
      title: 'Chuyên gia Bệnh học Thực vật',
      type: 'freelance',
      specialization: ['Nấm bệnh', 'Sâu hại', 'Bệnh lá'],
      rating: 4.9,
      reviews: 127,
      price: 2000000,
      status: 'available',
      responseTime: '< 2 giờ',
      verified: true,
      description: '20 năm kinh nghiệm nghiên cứu bệnh học thực vật. Chuyên về dược liệu vùng núi cao.',
      languages: ['Tiếng Việt', 'Tiếng Anh'],
      location: 'Hà Nội',
    },
    {
      id: 'exp-002',
      name: 'TS. Trần Thị B',
      title: 'Chuyên gia Đất & Dinh dưỡng',
      type: 'in-house',
      company: 'Công ty Dược ABC',
      specialization: ['Phân tích đất', 'Dinh dưỡng cây trồng', 'Cải tạo đất'],
      rating: 4.8,
      reviews: 89,
      price: 0, // Miễn phí cho HTX liên kết
      status: 'available',
      responseTime: '< 1 giờ',
      verified: true,
      description: 'Chuyên gia nội bộ của Công ty Dược ABC. Miễn phí cho HTX liên kết.',
      languages: ['Tiếng Việt'],
      location: 'TP.HCM',
    },
    {
      id: 'exp-003',
      name: 'GS.TS. Lê Văn C',
      title: 'Chuyên gia Giống & Nhân giống',
      type: 'freelance',
      specialization: ['Nhân giống in vitro', 'Chọn tạo giống', 'Bảo tồn gen'],
      rating: 5.0,
      reviews: 203,
      price: 5000000,
      status: 'busy',
      responseTime: '< 4 giờ',
      verified: true,
      description: 'Giáo sư đầu ngành về công nghệ sinh học. Viện Khoa học Nông nghiệp Việt Nam.',
      languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Pháp'],
      location: 'Hà Nội',
    },
  ];

  // Mock data - Booking Requests
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: 'req-001',
      htxName: 'HTX Tu Mơ Rông',
      issue: 'Cây Sâm bị nấm lá',
      urgency: 'high',
      photos: [],
      status: 'pending',
      createdAt: '2025-01-20 14:30',
    },
    {
      id: 'req-002',
      htxName: 'HTX Dược liệu Gia Lai',
      issue: 'Cần tư vấn về dinh dưỡng đất',
      urgency: 'medium',
      photos: [],
      status: 'accepted',
      expertId: 'exp-002',
      expertName: 'TS. Trần Thị B',
      createdAt: '2025-01-19 10:00',
      price: 0,
    },
  ]);

  const handleBookExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = () => {
    if (!selectedExpert) return;
    
    const newRequest: BookingRequest = {
      id: `req-${Date.now()}`,
      htxName: 'HTX Tu Mơ Rông',
      issue: bookingForm.issue,
      urgency: bookingForm.urgency,
      photos: bookingForm.photos,
      status: 'pending',
      createdAt: new Date().toLocaleString('vi-VN'),
      price: selectedExpert.type === 'in-house' ? 0 : selectedExpert.price,
    };

    setBookingRequests(prev => [newRequest, ...prev]);
    setShowBookingModal(false);
    setBookingForm({ issue: '', urgency: 'medium', description: '', photos: [] });
    setActiveTab('booking');
    alert(`Đã gửi yêu cầu tư vấn đến ${selectedExpert.name}. Chuyên gia sẽ phản hồi trong ${selectedExpert.responseTime}.`);
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = searchQuery === '' || 
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || expert.type === filterType;
    const matchesSpecialization = filterSpecialization === 'all' || 
      expert.specialization.includes(filterSpecialization);
    return matchesSearch && matchesType && matchesSpecialization;
  });

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'accepted': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <BackButton />
            <div className="flex items-center gap-3">
              <PortalSwitcher />
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">
                <i className="ri-coins-line"></i>
                <span className="font-semibold">VITA Points: 1,250</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i className="ri-user-star-line text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VITA Expert Hub</h1>
              <p className="text-sm text-gray-600">Sàn giao dịch Trí tuệ & Chuyên gia - "Bác sĩ Cây trồng 24/7"</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'marketplace', name: 'Sàn Chuyên Gia', icon: 'ri-store-line' },
              { id: 'booking', name: 'Yêu cầu của tôi', icon: 'ri-calendar-check-line' },
              { id: 'my-experts', name: 'Chuyên gia của tôi', icon: 'ri-user-heart-line' },
              { id: 'shared-intelligence', name: 'Trí tuệ Chung', icon: 'ri-brain-line' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} mr-1`}></i>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Marketplace */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* My Assigned Team - Priority Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
              <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                <i className="ri-team-line text-green-600"></i>
                Chuyên gia Chỉ định (Miễn phí)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experts.filter(e => e.type === 'in-house').map(expert => (
                  <div key={expert.id} className="bg-white rounded-xl p-6 border-2 border-green-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {expert.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{expert.name}</h4>
                        <p className="text-sm text-gray-600">{expert.title}</p>
                        {expert.company && (
                          <p className="text-xs text-green-600 mt-1">
                            <i className="ri-building-line mr-1"></i>
                            {expert.company}
                          </p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        🟢 Online
                      </span>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Giá:</span>
                        <span className="text-2xl font-bold text-green-600">0 VNĐ</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        <i className="ri-gift-line mr-1"></i>
                        Được tài trợ bởi {expert.company}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/expert-marketplace/expert-profile/${expert.id}`)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <i className="ri-phone-line mr-2"></i>
                      Gọi ngay
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex-1 relative mb-4">
                  <input
                    type="text"
                    placeholder="Bạn đang gặp vấn đề gì? (Ví dụ: Nấm lá, Thối rễ Sâm, Sâu đục thân...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-base"
                  />
                  <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"></i>
                </div>
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <i className="ri-alarm-warning-line text-2xl"></i>
                  SOS - Cứu hộ Khẩn cấp
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bộ lọc (Filter Chips)</label>
                <div className="flex flex-wrap gap-2">
                  {['Bệnh học', 'Dinh dưỡng', 'Giống', 'Thu hoạch', 'Sâm Ngọc Linh', 'Cây Gỗ Lớn'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSearchQuery(filter)}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Loại chuyên gia</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="in-house">Chuyên gia Doanh nghiệp</option>
                    <option value="freelance">Chuyên gia Độc lập</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Chuyên môn</label>
                  <select
                    value={filterSpecialization}
                    onChange={(e) => setFilterSpecialization(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="Nấm bệnh">Nấm bệnh</option>
                    <option value="Sâu hại">Sâu hại</option>
                    <option value="Dinh dưỡng cây trồng">Dinh dưỡng</option>
                    <option value="Nhân giống in vitro">Nhân giống</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Expert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts.map(expert => (
                <div key={expert.id} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {expert.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.title}</p>
                        {expert.company && (
                          <p className="text-xs text-indigo-600 mt-1">
                            <i className="ri-building-line mr-1"></i>
                            {expert.company}
                          </p>
                        )}
                      </div>
                    </div>
                    {expert.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <i className="ri-checkbox-circle-line mr-1"></i>
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <i
                            key={star}
                            className={`ri-star-${star <= Math.floor(expert.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{expert.rating}</span>
                      <span className="text-xs text-gray-600">({expert.reviews} đánh giá)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialization.map((spec, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Phản hồi:</span>
                      <span className="font-semibold text-gray-900">{expert.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Giá:</span>
                      <span className={`font-bold text-lg ${
                        expert.price === 0 ? 'text-green-600' : 'text-indigo-600'
                      }`}>
                        {expert.price === 0 ? 'Miễn phí' : `${(expert.price / 1000).toFixed(0)}k VNĐ`}
                      </span>
                    </div>
                    {expert.type === 'in-house' && (
                      <p className="text-xs text-green-600 mt-2">
                        <i className="ri-information-line mr-1"></i>
                        Miễn phí cho HTX liên kết với {expert.company}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      expert.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : expert.status === 'busy'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {expert.status === 'available' ? 'Sẵn sàng' : expert.status === 'busy' ? 'Đang bận' : 'Offline'}
                    </span>
                    <span className="text-xs text-gray-600">
                      <i className="ri-map-pin-line mr-1"></i>
                      {expert.location}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{expert.description}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/expert-marketplace/expert-profile/${expert.id}`)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                    >
                      <i className="ri-eye-line mr-1"></i>
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={() => handleBookExpert(expert)}
                      disabled={expert.status === 'offline'}
                      className={`flex-1 px-6 py-2 rounded-lg font-semibold transition-all text-sm ${
                        expert.status === 'offline'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      <i className="ri-calendar-check-line mr-1"></i>
                      Đặt lịch
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <i className="ri-information-line text-2xl"></i>
                Cơ chế Hoạt động
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Chuyên gia Doanh nghiệp (In-house)</h4>
                  <ul className="space-y-1 opacity-90">
                    <li>• Miễn phí cho HTX liên kết</li>
                    <li>• Có thể bật "Sẵn sàng tư vấn" cho HTX ngoài</li>
                    <li>• Thu phí theo giá niêm yết khi tư vấn ngoài</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Chuyên gia Độc lập (Freelance)</h4>
                  <ul className="space-y-1 opacity-90">
                    <li>• Hoạt động theo cơchế thị trường</li>
                    <li>• Thu nhập 100% từ booking</li>
                    <li>• Đánh giá cao → Tăng giá booking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Booking Requests */}
        {activeTab === 'booking' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-xl">Yêu cầu Tư vấn của tôi</h3>
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <i className="ri-add-line mr-2"></i>
                  Tạo yêu cầu mới
                </button>
              </div>

              <div className="space-y-4">
                {bookingRequests.map(request => (
                  <div key={request.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{request.issue}</h4>
                        <p className="text-sm text-gray-600">HTX: {request.htxName}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                          {request.status === 'pending' ? 'Chờ phản hồi' :
                           request.status === 'accepted' ? 'Đã chấp nhận' :
                           request.status === 'in-progress' ? 'Đang tư vấn' :
                           request.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency === 'urgent' ? 'Khẩn cấp' :
                           request.urgency === 'high' ? 'Cao' :
                           request.urgency === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </div>
                    </div>

                    {request.expertName && (
                      <div className="bg-indigo-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <i className="ri-user-star-line text-indigo-600 mr-2"></i>
                          Chuyên gia: <strong>{request.expertName}</strong>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        <i className="ri-time-line mr-1"></i>
                        {request.createdAt}
                      </span>
                      {request.price !== undefined && (
                        <span className="font-semibold text-indigo-600">
                          {request.price === 0 ? 'Miễn phí' : `${(request.price / 1000).toFixed(0)}k VNĐ`}
                        </span>
                      )}
                    </div>

                    {request.status === 'pending' && (
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                          <i className="ri-edit-line mr-2"></i>
                          Chỉnh sửa
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
                          <i className="ri-close-line mr-2"></i>
                          Hủy
                        </button>
                      </div>
                    )}

                    {request.status === 'completed' && (
                      <button className="w-full mt-4 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-colors">
                        <i className="ri-star-line mr-2"></i>
                        Đánh giá chuyên gia
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: My Experts */}
        {activeTab === 'my-experts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-6">Chuyên gia của tôi</h3>
              
              {/* In-house Expert */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Chuyên gia Doanh nghiệp</h4>
                    <p className="text-sm text-gray-600">Miễn phí - HTX liên kết với Công ty Dược ABC</p>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                    Miễn phí
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      T
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">TS. Trần Thị B</h5>
                      <p className="text-sm text-gray-600">Chuyên gia Đất & Dinh dưỡng</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <i className="ri-building-line mr-1"></i>
                        Công ty Dược ABC
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Phản hồi</p>
                      <p className="font-semibold text-gray-900">&lt; 1 giờ</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      <i className="ri-message-3-line mr-2"></i>
                      Nhắn tin
                    </button>
                    <button className="flex-1 px-4 py-2 bg-white border-2 border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
                      <i className="ri-video-chat-line mr-2"></i>
                      Video call
                    </button>
                  </div>
                </div>
              </div>

              {/* Favorite Freelance Experts */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Chuyên gia đã từng tư vấn</h4>
                <div className="space-y-4">
                  {experts.filter(e => e.type === 'freelance').map(expert => (
                    <div key={expert.id} className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {expert.name.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{expert.name}</h5>
                            <p className="text-xs text-gray-600">{expert.title}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                          <i className="ri-calendar-check-line mr-2"></i>
                          Đặt lại
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Shared Intelligence */}
        {activeTab === 'shared-intelligence' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <i className="ri-brain-line text-purple-600"></i>
                Trí tuệ Chung (Shared Intelligence)
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Dù là chuyên gia của Doanh nghiệp nào, mọi dữ liệu chẩn đoán bệnh đều được ẩn danh và đóng góp vào "Trí tuệ nhân tạo VITA".
              </p>

              {/* Disease Alerts */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-alarm-warning-line text-red-600"></i>
                  Cảnh báo Dịch bệnh (Ẩn danh)
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      disease: 'Dịch rầy nâu',
                      location: 'Kon Tum (Vùng trồng Sâm)',
                      detectedBy: 'Chuyên gia Cty Dược A',
                      date: '2025-01-18',
                      severity: 'high',
                      affectedArea: '50ha',
                    },
                    {
                      disease: 'Nấm lá đốm vàng',
                      location: 'Gia Lai (Vùng trồng Đương Quy)',
                      detectedBy: 'Chuyên gia Cty Gỗ B',
                      date: '2025-01-17',
                      severity: 'medium',
                      affectedArea: '20ha',
                    },
                  ].map((alert, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border-2 border-red-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-semibold text-gray-900">{alert.disease}</h5>
                          <p className="text-sm text-gray-600">
                            <i className="ri-map-pin-line mr-1"></i>
                            {alert.location}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {alert.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Diện tích ảnh hưởng: <strong>{alert.affectedArea}</strong></p>
                        <p>Phát hiện bởi: <strong>{alert.detectedBy}</strong> (Ẩn danh HTX)</p>
                        <p>Ngày: {alert.date}</p>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        <i className="ri-information-line mr-1"></i>
                        Cảnh báo sớm này giúp các HTX khác trong vùng phòng tránh.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge Base */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-book-open-line text-blue-600"></i>
                  Cơ sở Tri thức (Knowledge Base)
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Tất cả các chẩn đoán, phác đồ điều trị được đóng góp vào cơ sở dữ liệu chung (ẩn danh HTX và Doanh nghiệp).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Bệnh Nấm lá', count: 245, icon: 'ri-leaf-line' },
                    { name: 'Sâu hại', count: 189, icon: 'ri-bug-line' },
                    { name: 'Bệnh Rễ', count: 156, icon: 'ri-plant-line' },
                  ].map((kb, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`${kb.icon} text-2xl text-blue-600`}></i>
                        <div>
                          <h5 className="font-semibold text-gray-900">{kb.name}</h5>
                          <p className="text-xs text-gray-600">{kb.count} trường hợp</p>
                        </div>
                      </div>
                      <button className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                        <i className="ri-search-line mr-1"></i>
                        Tìm kiếm
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedExpert && (
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

              {/* Expert Info */}
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedExpert.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{selectedExpert.name}</h4>
                    <p className="text-sm text-gray-600">{selectedExpert.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <i
                            key={star}
                            className={`ri-star-${star <= Math.floor(selectedExpert.rating) ? 'fill' : 'line'} text-yellow-400 text-xs`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({selectedExpert.reviews} đánh giá)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Phí tư vấn</p>
                    <p className={`text-2xl font-bold ${
                      selectedExpert.price === 0 ? 'text-green-600' : 'text-indigo-600'
                    }`}>
                      {selectedExpert.price === 0 ? 'Miễn phí' : `${(selectedExpert.price / 1000).toFixed(0)}k`}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmitBooking(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vấn đề cần tư vấn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bookingForm.issue}
                    onChange={(e) => setBookingForm({ ...bookingForm, issue: e.target.value })}
                    placeholder="VD: Cây Sâm bị nấm lá"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ khẩn cấp <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: 'low', label: 'Thấp', color: 'blue' },
                      { value: 'medium', label: 'Trung bình', color: 'yellow' },
                      { value: 'high', label: 'Cao', color: 'orange' },
                      { value: 'urgent', label: 'Khẩn cấp', color: 'red' },
                    ].map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          bookingForm.urgency === option.value
                            ? `border-${option.color}-500 bg-${option.color}-50`
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.value}
                          checked={bookingForm.urgency === option.value}
                          onChange={(e) => setBookingForm({ ...bookingForm, urgency: e.target.value as any })}
                          className="form-radio h-4 w-4"
                        />
                        <span className="text-sm font-medium text-gray-700 ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    rows={4}
                    value={bookingForm.description}
                    onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                    placeholder="Mô tả chi tiết vấn đề, triệu chứng, diện tích ảnh hưởng..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tải lên bằng chứng (Ảnh/Video) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                    <i className="ri-camera-line text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-700">Chụp ảnh/quay video cây bệnh</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, MP4 (tối đa 10MB)</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    <i className="ri-magic-line mr-1"></i>
                    <strong>AI hỗ trợ:</strong> Khi upload ảnh, AI VITA quét sơ bộ và gợi ý: "Ảnh này nghi ngờ bị nấm rỉ sắt. Nên chọn Chuyên gia về Nấm."
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Thời gian phản hồi dự kiến:</strong> {selectedExpert.responseTime}
                  </p>
                  {selectedExpert.type === 'in-house' && (
                    <p className="text-xs text-green-600 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Bạn là HTX liên kết → Miễn phí tư vấn
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    Gửi Yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Emergency Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-alarm-warning-line text-red-600"></i>
                  Cứu hộ Khẩn cấp
                </h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="bg-red-50 rounded-lg p-4 mb-6 border-2 border-red-200">
                <p className="text-sm text-gray-700">
                  <strong>Chế độ Khẩn cấp:</strong> Yêu cầu của bạn sẽ được ưu tiên và gửi đến tất cả chuyên gia đang online. 
                  Chuyên gia phản hồi nhanh nhất sẽ nhận yêu cầu.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setShowRequestModal(false); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vấn đề khẩn cấp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Cây Sâm bị nấm lạ, lan nhanh"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Mô tả chi tiết vấn đề, triệu chứng, diện tích ảnh hưởng, thời gian phát hiện..."
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload ảnh/Video (Quan trọng)
                  </label>
                  <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors cursor-pointer bg-red-50">
                    <i className="ri-camera-line text-3xl text-red-400 mb-2"></i>
                    <p className="text-sm text-gray-700">Chụp ảnh/video cây bị bệnh</p>
                    <p className="text-xs text-gray-500 mt-1">Giúp chuyên gia chẩn đoán nhanh hơn</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <strong>Lưu ý:</strong> Yêu cầu khẩn cấp sẽ được gửi đến tất cả chuyên gia. 
                    Chuyên gia đầu tiên chấp nhận sẽ nhận yêu cầu. Phí tư vấn theo giá niêm yết của chuyên gia.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <i className="ri-send-plane-fill mr-2"></i>
                    Gửi Khẩn cấp
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

