import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerServiceCommunityPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'training' | 'tips' | 'forum' | 'shifts'>('training');
  
  // Training Data for Service Workers
  const serviceTrainingCourses = [
    {
      id: 1,
      title: 'Kỹ năng giao tiếp với khách hàng',
      duration: '10 phút',
      instructor: 'Chuyên gia Dịch vụ A',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20service%20staff%20talking%20with%20customer%2C%20friendly%20smile%2C%20professional%20hospitality%2C%20clear%20simple%20background&width=600&height=400&seq=serv1&orientation=landscape',
      category: 'Kỹ năng giao tiếp',
      skillTag: 'Giao tiếp',
      skillLevel: 3,
      rewardPoints: 150,
      unlocksTask: 'Nhiệm vụ tiếp đón khách VIP',
      completed: false,
    },
    {
      id: 2,
      title: 'Dẫn tour Farmstay - Giới thiệu sản phẩm',
      duration: '12 phút',
      instructor: 'Hướng dẫn viên B',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20tour%20guide%20explaining%20farm%20products%2C%20ecotourism%20service%2C%20educational%20presentation%2C%20clear%20simple%20background&width=600&height=400&seq=serv2&orientation=landscape',
      category: 'Dịch vụ du lịch',
      skillTag: 'Dẫn tour',
      skillLevel: 4,
      rewardPoints: 180,
      unlocksTask: 'Nhiệm vụ dẫn tour nhóm lớn',
      completed: false,
    },
    {
      id: 3,
      title: 'Xử lý tình huống khẩn cấp trong dịch vụ',
      duration: '8 phút',
      instructor: 'Quản lý Dịch vụ C',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20service%20manager%20handling%20emergency%20situation%2C%20professional%20crisis%20management%2C%20clear%20simple%20background&width=600&height=400&seq=serv3&orientation=landscape',
      category: 'An toàn dịch vụ',
      skillTag: 'Xử lý khủng hoảng',
      skillLevel: 4,
      rewardPoints: 200,
      unlocksTask: 'Nhiệm vụ giám sát ca trực',
      completed: false,
    },
    {
      id: 4,
      title: 'Vệ sinh và an toàn thực phẩm',
      duration: '6 phút',
      instructor: 'Chuyên gia Vệ sinh D',
      thumbnail: 'https://readdy.ai/api/search-image?query=Vietnamese%20service%20staff%20washing%20hands%20properly%2C%20food%20safety%20protocol%2C%20hygiene%20training%2C%20clear%20simple%20background&width=600&height=400&seq=serv4&orientation=landscape',
      category: 'An toàn & Vệ sinh',
      skillTag: 'Vệ sinh',
      skillLevel: 2,
      rewardPoints: 100,
      unlocksTask: 'Nhiệm vụ chuẩn bị bữa ăn',
      completed: false,
    },
  ];

  // Service Tips
  const serviceTips = [
    {
      id: 1,
      title: '10 Cách tăng tip từ khách hàng',
      content: 'Luôn mỉm cười, lắng nghe khách hàng, chủ động hỗ trợ và gợi ý sản phẩm phù hợp.',
      author: 'Chị Hoa - Nhân viên Kinh nghiệm 5 năm',
      likes: 45,
      views: 230,
    },
    {
      id: 2,
      title: 'Làm thế nào để nhớ tên khách quen?',
      content: 'Sử dụng ứng dụng ghi chú, chụp ảnh khách (có sự đồng ý) và liên kết với booking.',
      author: 'Anh Minh - Lễ tân Chuyên nghiệp',
      likes: 32,
      views: 180,
    },
    {
      id: 3,
      title: 'Xử lý khách hàng khó tính',
      content: 'Giữ bình tĩnh, lắng nghe phàn nàn, xin lỗi và đề xuất giải pháp thay thế ngay lập tức.',
      author: 'Quản lý Dịch vụ',
      likes: 58,
      views: 310,
    },
  ];

  // Forum Posts for Service
  const forumPosts = [
    {
      id: 1,
      author: 'Chị Lan',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20female%20service%20staff%20portrait%2C%20friendly%20smile%2C%20professional%20uniform%2C%20clear%20simple%20background&width=200&height=200&seq=avatar1&orientation=squarish',
      title: 'Ca trực Lễ tân vào Tết - Kinh nghiệm chia sẻ',
      content: 'Tết này em trực ca sáng, các chị có kinh nghiệm nào về xử lý đông khách không ạ?',
      time: '3 giờ trước',
      replies: 8,
      likes: 15,
    },
    {
      id: 2,
      author: 'Anh Dũng',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20male%20tour%20guide%20portrait%2C%20friendly%20smile%2C%20outdoor%20setting%2C%20clear%20simple%20background&width=200&height=200&seq=avatar2&orientation=squarish',
      title: 'Chia sẻ lộ trình dẫn tour Farmstay 2 ngày 1 đêm',
      content: 'Mình vừa dẫn một nhóm 15 người, chia sẻ lộ trình để các bạn tham khảo...',
      time: '1 ngày trước',
      replies: 12,
      likes: 28,
    },
    {
      id: 3,
      author: 'Chị Mai',
      avatar: 'https://readdy.ai/api/search-image?query=Vietnamese%20female%20housekeeping%20staff%20portrait%2C%20professional%20look%2C%20clear%20simple%20background&width=200&height=200&seq=avatar3&orientation=squarish',
      title: 'Checklist dọn phòng Bungalow trong 20 phút',
      content: 'Mình tổng hợp checklist để dọn phòng nhanh mà vẫn đảm bảo chất lượng...',
      time: '2 ngày trước',
      replies: 20,
      likes: 42,
    },
  ];

  // Shift Exchange Posts
  const shiftExchanges = [
    {
      id: 1,
      author: 'Anh Tùng',
      need: 'Cần đổi ca trực Lễ tân 25/12 (ca sáng)',
      want: 'Đổi lấy ca chiều 27/12',
      status: 'open',
      time: '2 giờ trước',
    },
    {
      id: 2,
      author: 'Chị Nga',
      need: 'Nhận thêm ca Dọn phòng cuối tuần',
      want: 'Ca thứ 7, Chủ nhật',
      status: 'open',
      time: '5 giờ trước',
    },
  ];

  const handleCompleteCourse = (courseId: number) => {
    // Handle course completion
    console.log('Course completed:', courseId);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/farmer/service')}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-xl sm:text-2xl"></i>
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate flex-1 text-center px-2">Cộng đồng Dịch vụ</h1>
          <div className="flex-shrink-0">
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-10">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('training')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'training'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-graduation-cap-line mr-2"></i>
            Đào tạo
          </button>
          <button
            onClick={() => setSelectedTab('tips')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'tips'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-lightbulb-line mr-2"></i>
            Mẹo & Tips
          </button>
          <button
            onClick={() => setSelectedTab('forum')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'forum'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-chat-3-line mr-2"></i>
            Diễn đàn
          </button>
          <button
            onClick={() => setSelectedTab('shifts')}
            className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedTab === 'shifts'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-exchange-line mr-2"></i>
            Đổi ca
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Training Tab */}
        {selectedTab === 'training' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Học viện Dịch vụ</h2>
                  <p className="text-orange-100 text-sm">Học để nâng cao kỹ năng và thu nhập</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-4xl"></i>
                </div>
              </div>
            </div>

            {/* Courses List */}
            <div className="space-y-4">
              {serviceTrainingCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative w-full h-48">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <i className="ri-play-fill text-4xl text-orange-600"></i>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded-lg text-white text-xs font-medium">
                      {course.duration}
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-orange-600 rounded-full text-white text-xs font-medium">
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
                    <div className="flex items-center justify-between mb-3 p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Mở khóa kỹ năng</div>
                        <div className="font-bold text-orange-700">
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
                    <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-center gap-2 text-xs text-amber-700">
                        <i className="ri-lightbulb-line"></i>
                        <span>Mở khóa: <strong>{course.unlocksTask}</strong></span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleCompleteCourse(course.id)}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
                    >
                      <i className="ri-play-line mr-2"></i>
                      Bắt đầu học
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {selectedTab === 'tips' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white mb-4">
              <h2 className="text-2xl font-bold mb-1">Mẹo & Bí quyết</h2>
              <p className="text-amber-100 text-sm">Chia sẻ kinh nghiệm từ đồng nghiệp</p>
            </div>

            {serviceTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{tip.content}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-user-line"></i>
                    <span>{tip.author}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="ri-thumb-up-line"></i>
                      <span>{tip.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="ri-eye-line"></i>
                      <span>{tip.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-medium hover:bg-orange-700 transition-colors cursor-pointer">
              <i className="ri-add-line mr-2"></i>
              Chia sẻ mẹo của bạn
            </button>
          </div>
        )}

        {/* Forum Tab */}
        {selectedTab === 'forum' && (
          <div className="space-y-4">
            <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-medium hover:bg-orange-700 transition-colors cursor-pointer">
              <i className="ri-add-line mr-2"></i>
              Tạo bài viết mới
            </button>

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
                  <button className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
                    <i className="ri-thumb-up-line"></i>
                    <span>{post.likes} thích</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
                    <i className="ri-chat-3-line"></i>
                    <span>{post.replies} bình luận</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
                    <i className="ri-share-line"></i>
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shift Exchange Tab */}
        {selectedTab === 'shifts' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white mb-4">
              <h2 className="text-2xl font-bold mb-1">Trao đổi Ca trực</h2>
              <p className="text-teal-100 text-sm">Hỗ trợ nhau đổi ca khi cần</p>
            </div>

            <button className="w-full py-4 bg-teal-600 text-white rounded-2xl font-medium hover:bg-teal-700 transition-colors cursor-pointer">
              <i className="ri-add-line mr-2"></i>
              Đăng nhu cầu đổi ca
            </button>

            {shiftExchanges.map((exchange) => (
              <div
                key={exchange.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-user-line text-teal-600"></i>
                      <h4 className="font-bold text-gray-900">{exchange.author}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Đang tìm
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <i className="ri-time-line text-orange-600"></i>
                        <span className="font-semibold">{exchange.need}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-exchange-line text-teal-600"></i>
                        <span>{exchange.want}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{exchange.time}</div>
                  </div>
                </div>
                <button className="w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer">
                  <i className="ri-hand-heart-line mr-2"></i>
                  Tôi có thể đổi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/farmer/service')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/service')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví Dịch vụ</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-orange-600 cursor-pointer">
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}