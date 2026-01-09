import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerCommunityPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'videos' | 'news' | 'forum'>('videos');

  const trainingVideos = [
    {
      id: 1,
      title: 'Kỹ thuật bón phân hữu cơ cho dược liệu',
      duration: '5:30',
      views: 1250,
      instructor: 'HTX Dược Liệu Sơn La',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20applying%20organic%20fertilizer%20to%20medicinal%20plants%2C%20educational%20video%20thumbnail%2C%20professional%20farming%20technique%20demonstration%2C%20clear%20simple%20background&width=600&height=400&seq=vid1&orientation=landscape',
      category: 'Kỹ thuật canh tác',
    },
    {
      id: 2,
      title: 'Nhận biết và xử lý sâu bệnh trên cây Quế',
      duration: '8:15',
      views: 980,
      instructor: 'TS. Nguyễn Văn A',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20agricultural%20expert%20examining%20cinnamon%20tree%20diseases%2C%20educational%20video%20thumbnail%2C%20pest%20identification%20guide%2C%20clear%20simple%20background&width=600&height=400&seq=vid2&orientation=landscape',
      category: 'Phòng trừ sâu bệnh',
    },
    {
      id: 3,
      title: 'Thu hoạch và bảo quản Cà Gai Leo đúng cách',
      duration: '6:45',
      views: 1580,
      instructor: 'Chuyên gia Lê Thị B',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20harvesting%20medicinal%20plants%20properly%2C%20educational%20video%20thumbnail%2C%20post-harvest%20handling%20techniques%2C%20clear%20simple%20background&width=600&height=400&seq=vid3&orientation=landscape',
      category: 'Thu hoạch',
    },
    {
      id: 4,
      title: 'Xây dựng hệ thống tưới tiêu tiết kiệm nước',
      duration: '10:20',
      views: 750,
      instructor: 'Kỹ sư Trần Văn C',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20drip%20irrigation%20system%20for%20medicinal%20plant%20farm%2C%20educational%20video%20thumbnail%2C%20water-saving%20farming%20technology%2C%20clear%20simple%20background&width=600&height=400&seq=vid4&orientation=landscape',
      category: 'Cơ sở hạ tầng',
    },
  ];

  const newsAnnouncements = [
    {
      id: 1,
      title: 'Họp thành viên HTX - Tháng 1/2024',
      date: '20/01/2024',
      time: '8:00 sáng',
      location: 'Trụ sở HTX Dược Liệu',
      type: 'meeting',
      urgent: true,
    },
    {
      id: 2,
      title: 'Lịch phun thuốc sinh học tập trung',
      date: '25/01/2024',
      time: '6:00 sáng',
      location: 'Các lô A1, A2, B1',
      type: 'activity',
      urgent: false,
    },
    {
      id: 3,
      title: 'Cảnh báo: Bão số 3 đang tiến vào',
      date: '18/01/2024',
      time: 'Cả ngày',
      location: 'Toàn bộ khu vực',
      type: 'warning',
      urgent: true,
    },
    {
      id: 4,
      title: 'Khóa đào tạo: Canh tác hữu cơ nâng cao',
      date: '28/01/2024',
      time: '14:00 chiều',
      location: 'Hội trường HTX',
      type: 'training',
      urgent: false,
    },
  ];

  const forumPosts = [
    {
      id: 1,
      author: 'Anh Minh',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20male%20farmer%20portrait%2C%20friendly%20smile%2C%20outdoor%20setting%2C%20professional%20photo%2C%20clear%20simple%20background&width=200&height=200&seq=avatar1&orientation=squarish',
      title: 'Cây Quế của tôi bị vàng lá, các bác cho hỏi cách xử lý?',
      content: 'Em thấy lá cây Quế ở lô A2 bắt đầu vàng từ gốc lên, không biết là thiếu dinh dưỡng hay bị bệnh. Các bác có kinh nghiệm chỉ giúp em với ạ.',
      time: '2 giờ trước',
      replies: 5,
      likes: 12,
    },
    {
      id: 2,
      author: 'Chị Hoa',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20female%20farmer%20portrait%2C%20friendly%20smile%2C%20outdoor%20setting%2C%20professional%20photo%2C%20clear%20simple%20background&width=200&height=200&seq=avatar2&orientation=squarish',
      title: 'Chia sẻ kinh nghiệm bón phân cho Đinh Lăng',
      content: 'Sau 3 năm trồng Đinh Lăng, chị có một số kinh nghiệm về bón phân muốn chia sẻ với mọi người. Hy vọng giúp ích được cho các bạn mới.',
      time: '5 giờ trước',
      replies: 8,
      likes: 25,
    },
    {
      id: 3,
      author: 'Bác Dũng',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20senior%20male%20farmer%20portrait%2C%20experienced%20look%2C%20outdoor%20setting%2C%20professional%20photo%2C%20clear%20simple%20background&width=200&height=200&seq=avatar3&orientation=squarish',
      title: 'Giá Cà Gai Leo tháng này tăng mạnh',
      content: 'HTX thông báo giá thu mua Cà Gai Leo tháng này tăng 15% so với tháng trước. Đây là tin vui cho các hộ đang có lô sắp thu hoạch.',
      time: '1 ngày trước',
      replies: 15,
      likes: 42,
    },
  ];

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'meeting':
        return { icon: 'ri-group-line', color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'activity':
        return { icon: 'ri-calendar-event-line', color: 'text-green-600', bg: 'bg-green-100' };
      case 'warning':
        return { icon: 'ri-alert-line', color: 'text-red-600', bg: 'bg-red-100' };
      case 'training':
        return { icon: 'ri-book-open-line', color: 'text-purple-600', bg: 'bg-purple-100' };
      default:
        return { icon: 'ri-notification-3-line', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Cộng đồng</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-10">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('videos')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'videos'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-video-line mr-2"></i>
            Video đào tạo
          </button>
          <button
            onClick={() => setSelectedTab('news')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'news'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-notification-3-line mr-2"></i>
            Thông báo HTX
          </button>
          <button
            onClick={() => setSelectedTab('forum')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'forum'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-chat-3-line mr-2"></i>
            Diễn đàn
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Training Videos Tab */}
        {selectedTab === 'videos' && (
          <div className="space-y-4">
            {trainingVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative w-full h-48">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <i className="ri-play-fill text-4xl text-green-600"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded-lg text-white text-xs font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-green-600 rounded-full text-white text-xs font-medium">
                    {video.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="ri-user-line"></i>
                      <span>{video.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-eye-line"></i>
                      <span>{video.views} lượt xem</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News & Announcements Tab */}
        {selectedTab === 'news' && (
          <div className="space-y-4">
            {newsAnnouncements.map((news) => {
              const typeInfo = getTypeInfo(news.type);
              return (
                <div
                  key={news.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer ${
                    news.urgent ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${typeInfo.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${typeInfo.icon} text-2xl ${typeInfo.color}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{news.title}</h3>
                        {news.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full whitespace-nowrap">
                            Khẩn cấp
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <i className="ri-calendar-line"></i>
                          <span>{news.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-time-line"></i>
                          <span>{news.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-map-pin-line"></i>
                          <span>{news.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Forum Tab */}
        {selectedTab === 'forum' && (
          <div className="space-y-4">
            {/* Create Post Button */}
            <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Tạo bài viết mới
            </button>

            {/* Forum Posts */}
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover object-top"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 mb-1">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.time}</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.content}</p>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <button className="flex items-center gap-2 hover:text-green-600 transition-colors cursor-pointer">
                    <i className="ri-thumb-up-line"></i>
                    <span>{post.likes} thích</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-600 transition-colors cursor-pointer">
                    <i className="ri-chat-3-line"></i>
                    <span>{post.replies} bình luận</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-600 transition-colors cursor-pointer">
                    <i className="ri-share-line"></i>
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          <button 
            onClick={() => navigate('/farmer/diary')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
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
          <button className="flex flex-col items-center gap-1 text-green-600 cursor-pointer">
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
