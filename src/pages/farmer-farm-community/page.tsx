import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerFarmCommunityPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'news' | 'forum' | 'academy' | 'health' | 'exchange'>('academy');
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);
  const [earnedPoints, setEarnedPoints] = useState(1250);
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>(['Trồng Sâm (Bậc 3)', 'Dẫn tour (Bậc 2)']);
  
  // Health & Safety Data
  const healthRecords = [
    { date: '15/01/2024', type: 'checkup', title: 'Khám sức khỏe định kỳ', location: 'Trạm Y tế xã', status: 'completed' },
    { date: '10/12/2023', type: 'vaccination', title: 'Tiêm phòng cúm', location: 'Trạm Y tế xã', status: 'completed' },
    { date: '28/11/2023', type: 'injury', title: 'Cắt tay nhẹ khi làm cỏ', location: 'Tại nông trại', status: 'treated' },
  ];
  
  const upcomingHealth = [
    { date: '20/02/2024', type: 'checkup', title: 'Khám sức khỏe định kỳ', location: 'Trạm Y tế xã', daysLeft: 36 },
    { date: '15/02/2024', type: 'vaccination', title: 'Tiêm phòng bổ sung', location: 'Trạm Y tế xã', daysLeft: 31 },
  ];
  
  const safetyAlerts = [
    { type: 'weather', severity: 'high', title: 'Cảnh báo: Mưa lớn dự kiến', message: 'Dự báo mưa lớn trong 2 ngày tới. Tránh làm việc ngoài trời khi trời mưa.', date: 'Hôm nay' },
    { type: 'equipment', severity: 'medium', title: 'Nhắc nhở: Đeo đồ bảo hộ', message: 'Khi phun chế phẩm sinh học, nhớ đeo khẩu trang, găng tay và kính bảo hộ.', date: 'Hôm nay' },
  ];
  
  // Labor Exchange Data
  const availableExchanges = [
    { id: 1, family: 'Gia đình Anh Minh', need: 'Cần 3 người thu hoạch Cà Gai Leo', date: '25/01/2024', location: 'Lô A3', duration: '1 ngày', reward: 'Đổi công hoặc 200.000đ/người', status: 'open' },
    { id: 2, family: 'Gia đình Chị Hoa', need: 'Cần 2 người bón phân lô Quế', date: '22/01/2024', location: 'Lô B1', duration: 'Nửa ngày', reward: 'Đổi công', status: 'open' },
  ];
  
  const myExchanges = [
    { id: 1, family: 'Gia đình Bác Dũng', need: 'Giúp thu hoạch Đinh Lăng', date: '18/01/2024', location: 'Lô C2', status: 'completed', myNeed: 'Cần giúp làm cỏ lô A2' },
  ];

  // VITA Academy - Learn-to-earn Courses
  const academyCourses = [
    {
      id: 1,
      title: 'Kỹ thuật trồng Sâm Ngọc Linh cơ bản',
      duration: '15 phút',
      instructor: 'TS. Nguyễn Văn A',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20ginseng%20farming%20technique%2C%20educational%20video%20thumbnail%2C%20medicinal%20plant%20cultivation%2C%20clear%20simple%20background&width=600&height=400&seq=academy1&orientation=landscape',
      category: 'Kỹ thuật canh tác',
      skillTag: 'Trồng Sâm',
      skillLevel: 4,
      rewardPoints: 200,
      unlocksTask: 'Nhiệm vụ trồng Sâm lương cao',
      completed: completedCourses.includes(1),
    },
    {
      id: 2,
      title: 'Kỹ năng dẫn tour du lịch sinh thái',
      duration: '12 phút',
      instructor: 'Chuyên gia Du lịch B',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20tour%20guide%20training%2C%20educational%20video%20thumbnail%2C%20eco-tourism%20skills%2C%20clear%20simple%20background&width=600&height=400&seq=academy2&orientation=landscape',
      category: 'Dịch vụ du lịch',
      skillTag: 'Dẫn tour',
      skillLevel: 3,
      rewardPoints: 150,
      unlocksTask: 'Nhiệm vụ dẫn tour Farmstay',
      completed: completedCourses.includes(2),
    },
    {
      id: 3,
      title: 'Sơ chế và bảo quản dược liệu đúng cách',
      duration: '10 phút',
      instructor: 'Kỹ sư Lê Thị C',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20medicinal%20plant%20processing%2C%20educational%20video%20thumbnail%2C%20post-harvest%20handling%2C%20clear%20simple%20background&width=600&height=400&seq=academy3&orientation=landscape',
      category: 'Sơ chế',
      skillTag: 'Sơ chế',
      skillLevel: 4,
      rewardPoints: 180,
      unlocksTask: 'Nhiệm vụ sơ chế dược liệu',
      completed: completedCourses.includes(3),
    },
    {
      id: 4,
      title: 'Kiến thức ESG và Tín chỉ Carbon',
      duration: '8 phút',
      instructor: 'Chuyên gia ESG D',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20carbon%20credit%20education%2C%20educational%20video%20thumbnail%2C%20ESG%20knowledge%2C%20clear%20simple%20background&width=600&height=400&seq=academy4&orientation=landscape',
      category: 'Kiến thức ESG',
      skillTag: 'ESG/Carbon',
      skillLevel: 2,
      rewardPoints: 100,
      unlocksTask: 'Nhiệm vụ quản lý Carbon',
      completed: completedCourses.includes(4),
    },
  ];

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

  const handleCompleteCourse = (courseId: number) => {
    if (completedCourses.includes(courseId)) return;
    
    const course = academyCourses.find(c => c.id === courseId);
    if (course) {
      setCompletedCourses([...completedCourses, courseId]);
      setEarnedPoints(earnedPoints + course.rewardPoints);
      if (!unlockedSkills.includes(`${course.skillTag} (Bậc ${course.skillLevel})`)) {
        setUnlockedSkills([...unlockedSkills, `${course.skillTag} (Bậc ${course.skillLevel})`]);
      }
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
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Cộng đồng Nông trại</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-10">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('academy')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'academy'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-graduation-cap-line mr-2"></i>
            VITA Academy
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
          <button
            onClick={() => setSelectedTab('health')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'health'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-heart-pulse-line mr-2"></i>
            Sổ Y bạ
          </button>
          <button
            onClick={() => setSelectedTab('exchange')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'exchange'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-exchange-line mr-2"></i>
            Đổi công
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
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

        {/* VITA Academy Tab - Learn-to-earn */}
        {selectedTab === 'academy' && (
          <div className="space-y-4">
            {/* Header Stats */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Học viện Nông dân Số</h2>
                  <p className="text-purple-100 text-sm">Học để kiếm tiền - Mở khóa kỹ năng mới</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-4xl"></i>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs text-purple-100 mb-1">Điểm thưởng</div>
                  <div className="text-2xl font-bold">{earnedPoints.toLocaleString('vi-VN')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs text-purple-100 mb-1">Kỹ năng đã mở</div>
                  <div className="text-2xl font-bold">{unlockedSkills.length}</div>
                </div>
              </div>
            </div>

            {/* Skill Tags Unlocked */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-award-line text-purple-600"></i>
                Thẻ kỹ năng của bạn
              </h3>
              <div className="flex flex-wrap gap-2">
                {unlockedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200"
                  >
                    <i className="ri-checkbox-circle-fill mr-1 text-green-600"></i>
                    {skill}
                  </span>
                ))}
              </div>
              {unlockedSkills.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Hoàn thành các khóa học để mở khóa kỹ năng mới
                </p>
              )}
            </div>

            {/* Training Videos Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <i className="ri-video-line text-green-600"></i>
                Video đào tạo
              </h3>
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

            {/* Courses List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Khóa học đang có</h3>
              {academyCourses.map((course) => (
                <div
                  key={course.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                    course.completed ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="relative w-full h-48">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <i className="ri-play-fill text-4xl text-purple-600"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded-lg text-white text-xs font-medium">
                      {course.duration}
                    </div>
                    {course.completed && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
                        <i className="ri-checkbox-circle-fill"></i>
                        Đã hoàn thành
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600 rounded-full text-white text-xs font-medium">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <i className="ri-user-line"></i>
                      <span>{course.instructor}</span>
                    </div>

                    {/* Skill Tag & Reward */}
                    <div className="flex items-center justify-between mb-3 p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Mở khóa kỹ năng</div>
                        <div className="font-bold text-purple-700">
                          {course.skillTag} (Bậc {course.skillLevel})
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600 mb-1">Điểm thưởng</div>
                        <div className="text-xl font-bold text-yellow-600">
                          +{course.rewardPoints}
                        </div>
                      </div>
                    </div>

                    {/* Unlocks Task */}
                    <div className="mb-3 p-2 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-xs text-green-700">
                        <i className="ri-lightbulb-line"></i>
                        <span>Mở khóa: <strong>{course.unlocksTask}</strong></span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {course.completed ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                      >
                        <i className="ri-checkbox-circle-fill mr-2"></i>
                        Đã hoàn thành
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteCourse(course.id)}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
                      >
                        <i className="ri-play-line mr-2"></i>
                        Bắt đầu học
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Learn-to-earn Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-money-dollar-circle-line text-2xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Cơ chế "Học để kiếm tiền"</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                      <span>Hoàn thành bài học được cộng <strong>điểm thưởng</strong> (có thể quy đổi thành tiền hoặc voucher)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                      <span>Mở khóa <strong>Thẻ kỹ năng</strong> mới để nhận các nhiệm vụ có thù lao cao hơn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-green-600 mt-0.5 flex-shrink-0"></i>
                      <span>Video ngắn (Short-form) dễ hiểu, phù hợp với mọi lứa tuổi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health & Safety Tab - Sổ Y bạ & An toàn lao động */}
        {selectedTab === 'health' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Sổ Y bạ & An toàn lao động</h2>
                  <p className="text-red-100 text-sm">Ghi nhận lịch sử sức khỏe và cảnh báo an toàn</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-4xl"></i>
                </div>
              </div>
            </div>

            {/* Safety Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-alert-line text-red-600"></i>
                Cảnh báo An toàn
              </h3>
              <div className="space-y-3">
                {safetyAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 rounded-lg p-4 ${
                      alert.severity === 'high'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <i className={`${
                          alert.type === 'weather' ? 'ri-rainy-line' : 'ri-shield-line'
                        } text-xl ${alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`}></i>
                        <h4 className="font-bold text-gray-900">{alert.title}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert.severity === 'high' ? 'Khẩn cấp' : 'Quan trọng'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Health Appointments */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-calendar-todo-line text-blue-600"></i>
                Lịch khám sắp tới
              </h3>
              <div className="space-y-3">
                {upcomingHealth.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className={`${
                            item.type === 'checkup' ? 'ri-hospital-line' : 'ri-medicine-bottle-line'
                          } text-blue-600`}></i>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{item.daysLeft}</div>
                        <div className="text-xs text-gray-600">ngày nữa</div>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-notification-3-line mr-2"></i>
                      Đặt nhắc nhở
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Health History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-list-3-line text-green-600"></i>
                Lịch sử sức khỏe
              </h3>
              <div className="space-y-3">
                {healthRecords.map((record, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className={`${
                            record.type === 'checkup' ? 'ri-hospital-line' :
                            record.type === 'vaccination' ? 'ri-medicine-bottle-line' :
                            'ri-first-aid-kit-line'
                          } text-green-600`}></i>
                          <h4 className="font-bold text-gray-900">{record.title}</h4>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>{record.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>{record.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        record.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {record.status === 'completed' ? 'Đã hoàn thành' : 'Đã xử lý'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Equipment Reminder */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-line text-2xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Nhắc nhở An toàn lao động</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-orange-600 mt-0.5 flex-shrink-0"></i>
                      <span>Đeo đồ bảo hộ khi phun chế phẩm sinh học (khẩu trang, găng tay, kính)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-orange-600 mt-0.5 flex-shrink-0"></i>
                      <span>Theo dõi cảnh báo thời tiết cực đoan (lũ quét, sạt lở) từ dữ liệu vệ tinh</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-orange-600 mt-0.5 flex-shrink-0"></i>
                      <span>Nghỉ ngơi đầy đủ, uống đủ nước khi làm việc ngoài trời</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Labor Exchange Tab - Đổi công */}
        {selectedTab === 'exchange' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Mạng lưới Tương trợ - Đổi công</h2>
                  <p className="text-teal-100 text-sm">Hỗ trợ nhau trong các ngày mùa vụ cao điểm</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="ri-exchange-line text-4xl"></i>
                </div>
              </div>
            </div>

            {/* Create Exchange Request */}
            <button className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all cursor-pointer">
              <i className="ri-add-line mr-2"></i>
              Đăng ký cần hỗ trợ
            </button>

            {/* Available Exchanges */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-hand-heart-line text-teal-600"></i>
                Cần hỗ trợ từ cộng đồng
              </h3>
              <div className="space-y-4">
                {availableExchanges.map((exchange) => (
                  <div key={exchange.id} className="border-2 border-teal-200 rounded-xl p-5 bg-teal-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-user-line text-teal-600"></i>
                          <h4 className="font-bold text-gray-900">{exchange.family}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Đang mở
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{exchange.need}</p>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>Ngày: {exchange.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>Vị trí: {exchange.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-time-line"></i>
                            <span>Thời gian: {exchange.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-money-dollar-circle-line"></i>
                            <span className="font-semibold text-teal-700">{exchange.reward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer">
                      <i className="ri-hand-heart-line mr-2"></i>
                      Tôi sẽ giúp
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* My Exchanges */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-history-line text-blue-600"></i>
                Lịch sử Đổi công của tôi
              </h3>
              <div className="space-y-4">
                {myExchanges.map((exchange) => (
                  <div key={exchange.id} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-user-line text-blue-600"></i>
                          <h4 className="font-bold text-gray-900">{exchange.family}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {exchange.status === 'completed' ? 'Đã hoàn thành' : 'Đang thực hiện'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">Tôi đã giúp: {exchange.need}</p>
                        <div className="bg-blue-50 rounded-lg p-3 mb-2">
                          <div className="text-xs text-blue-700 mb-1">Tôi cần hỗ trợ:</div>
                          <div className="font-semibold text-gray-900">{exchange.myNeed}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>{exchange.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>{exchange.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-information-line text-2xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Cách hoạt động Đổi công</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                      <span>Đăng ký nhu cầu hỗ trợ trong các ngày mùa vụ cao điểm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                      <span>Các hộ gia đình khác có thể đăng ký giúp đỡ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                      <span>Có thể đổi công (giúp lại sau) hoặc trả công bằng tiền</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                      <span>Tạo mạng lưới tương trợ bền vững trong cộng đồng</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
