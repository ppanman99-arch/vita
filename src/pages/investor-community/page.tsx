import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { earnPoints } from '../../lib/greenPoints/service';

export default function InvestorCommunityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feed' | 'projects' | 'tips' | 'qa' | 'experiences'>('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'experience', content: '', project: '' });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Mock data - Feed posts
  const feedPosts = [
    {
      id: 1,
      author: 'Nguyễn Văn An',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=f59e0b&color=fff',
      time: '2 giờ trước',
      type: 'experience',
      project: 'Dự án Sâm Ngọc Linh - Lô B2',
      content: 'Mình đã đầu tư vào dự án Sâm Ngọc Linh được 6 tháng, nhận cổ tức đều đặn hàng quý. Lợi nhuận hiện tại đạt 12%, vượt kỳ vọng. HTX quản lý minh bạch, báo cáo đầy đủ.',
      likes: 45,
      comments: 12,
      shares: 8,
      verified: true,
      investment: 50000000,
      return: 12,
    },
    {
      id: 2,
      author: 'Trần Thị Bình',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Binh&background=059669&color=fff',
      time: '5 giờ trước',
      type: 'tip',
      title: 'Cách đánh giá dự án đầu tư HTX',
      content: 'Kinh nghiệm của mình khi đánh giá dự án:\n\n1. Xem hồ sơ HTX và chứng nhận chất lượng\n2. Kiểm tra tiến độ sản xuất qua báo cáo\n3. Đánh giá khả năng tiêu thụ sản phẩm\n4. Xem lịch sử chia cổ tức của HTX\n5. Tham quan thực tế nếu có thể',
      likes: 38,
      comments: 15,
      shares: 20,
      verified: true,
    },
    {
      id: 3,
      author: 'Phạm Văn Cường',
      avatar: 'https://ui-avatars.com/api/?name=Pham+Van+Cuong&background=dc2626&color=fff',
      time: '1 ngày trước',
      type: 'project_review',
      project: 'Vườn ươm công nghệ cao',
      cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
      rating: 5,
      content: 'Dự án này rất tiềm năng. Công nghệ hiện đại, đội ngũ chuyên nghiệp. Mình đã đầu tư 30 triệu, nhận cổ tức đều đặn. Khuyến nghị đầu tư!',
      likes: 52,
      comments: 18,
      verified: false,
    },
    {
      id: 4,
      author: 'Lê Thị Dung',
      avatar: 'https://ui-avatars.com/api/?name=Le+Thi+Dung&background=7c3aed&color=fff',
      time: '2 ngày trước',
      type: 'qa',
      question: 'Có nên đầu tư vào nhiều dự án cùng lúc không?',
      content: 'Mình mới tham gia đầu tư, muốn hỏi các anh chị có kinh nghiệm: có nên phân tán đầu tư vào nhiều dự án hay tập trung vào 1-2 dự án?',
      likes: 28,
      comments: 9,
      verified: false,
    },
  ];

  // Mock data - Project Reviews
  const projectReviews = [
    {
      id: 1,
      project: 'Dự án Sâm Ngọc Linh - Lô B2',
      cooperative: 'HTX Dược Liệu Kon Tum',
      author: 'Nguyễn Văn An',
      rating: 5,
      date: '05/01/2025',
      content: 'Dự án chất lượng cao, HTX quản lý tốt. Nhận cổ tức đều đặn, lợi nhuận ổn định.',
      helpful: 45,
      verified: true,
      investment: 50000000,
      return: 12,
    },
    {
      id: 2,
      project: 'Vườn ươm công nghệ cao',
      cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
      author: 'Phạm Văn Cường',
      rating: 5,
      date: '03/01/2025',
      content: 'Công nghệ hiện đại, đội ngũ chuyên nghiệp. Rất hài lòng với đầu tư này.',
      helpful: 38,
      verified: false,
      investment: 30000000,
      return: 12,
    },
  ];

  // Mock data - Investment Tips
  const tips = [
    {
      id: 1,
      title: '5 tiêu chí đánh giá dự án đầu tư HTX',
      author: 'Trần Thị Bình',
      category: 'Đánh giá',
      views: 2150,
      likes: 89,
      content: 'Khi đánh giá dự án đầu tư, cần chú ý đến: hồ sơ HTX, chứng nhận chất lượng, tiến độ sản xuất...',
    },
    {
      id: 2,
      title: 'Cách phân tích báo cáo tài chính HTX',
      author: 'Nguyễn Văn An',
      category: 'Phân tích',
      views: 1890,
      likes: 67,
      content: 'Báo cáo tài chính là công cụ quan trọng để đánh giá sức khỏe tài chính của HTX...',
    },
    {
      id: 3,
      title: 'Chiến lược đầu tư dài hạn vs ngắn hạn',
      author: 'Phạm Văn Cường',
      category: 'Chiến lược',
      views: 1650,
      likes: 54,
      content: 'Đầu tư dài hạn thường ổn định hơn nhưng cần vốn lớn. Đầu tư ngắn hạn linh hoạt hơn...',
    },
  ];

  // Mock data - Q&A
  const questions = [
    {
      id: 1,
      question: 'Có nên đầu tư vào nhiều dự án cùng lúc không?',
      author: 'Lê Thị Dung',
      category: 'Chiến lược',
      answers: 9,
      views: 450,
      solved: true,
      bestAnswer: 'Theo kinh nghiệm, nên phân tán đầu tư vào 3-5 dự án để giảm rủi ro. Tuy nhiên cần đảm bảo có đủ vốn...',
    },
    {
      id: 2,
      question: 'Làm thế nào để đánh giá rủi ro của dự án?',
      author: 'Trần Văn Minh',
      category: 'Đánh giá',
      answers: 6,
      views: 380,
      solved: true,
      bestAnswer: 'Cần xem xét: lịch sử HTX, thị trường tiêu thụ, điều kiện tự nhiên, quản lý dự án...',
    },
    {
      id: 3,
      question: 'Cổ tức được chia như thế nào?',
      author: 'Nguyễn Thị Lan',
      category: 'Cổ tức',
      answers: 4,
      views: 320,
      solved: false,
    },
  ];

  // Mock data - Investment Experiences
  const experiences = [
    {
      id: 1,
      title: 'Hành trình đầu tư 2 năm với HTX Dược Liệu',
      author: 'Nguyễn Văn An',
      project: 'Dự án Sâm Ngọc Linh',
      duration: '24 tháng',
      totalReturn: 24,
      content: 'Mình đã đầu tư vào dự án Sâm Ngọc Linh được 2 năm. Tổng lợi nhuận đạt 24%, nhận cổ tức đều đặn hàng quý...',
      lessons: ['Đầu tư dài hạn ổn định hơn', 'Cần theo dõi báo cáo thường xuyên', 'Tham gia đại hội xã viên để nắm tình hình'],
    },
    {
      id: 2,
      title: 'Kinh nghiệm đầu tư vào dự án công nghệ cao',
      author: 'Phạm Văn Cường',
      project: 'Vườn ươm công nghệ cao',
      duration: '12 tháng',
      totalReturn: 12,
      content: 'Dự án công nghệ cao có rủi ro thấp hơn, lợi nhuận ổn định. Công nghệ hiện đại giúp tăng năng suất...',
      lessons: ['Công nghệ là yếu tố quan trọng', 'Đội ngũ chuyên nghiệp là điểm mạnh', 'Theo dõi tiến độ sản xuất'],
    },
  ];

  const handlePost = async () => {
    if (!newPost.content.trim()) {
      alert('Vui lòng nhập nội dung');
      return;
    }

    // Tích điểm khi đăng bài
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Chia sẻ trong cộng đồng đầu tư',
        5,
        'engagement',
        'investor-community',
        { postType: newPost.type }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }

    alert('Đã đăng bài thành công! +5 Green Points');
    setShowPostModal(false);
    setNewPost({ type: 'experience', content: '', project: '' });
  };

  const handleLike = async (postId: number) => {
    // Tích điểm khi like
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Tương tác trong cộng đồng',
        1,
        'engagement',
        'investor-community',
        { action: 'like', postId }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/farmer/investor')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Cộng đồng Đầu tư</h1>
              <p className="text-amber-100 text-xs sm:text-sm">Chia sẻ, học hỏi, kết nối</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GreenPointsBadge className="hidden sm:flex" />
            <button
              onClick={() => setShowPostModal(true)}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              <span className="hidden sm:inline">Đăng bài</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'feed', label: 'Bảng tin', icon: 'ri-home-4-line' },
            { id: 'projects', label: 'Đánh giá dự án', icon: 'ri-star-line' },
            { id: 'tips', label: 'Mẹo đầu tư', icon: 'ri-lightbulb-line' },
            { id: 'qa', label: 'Hỏi & Đáp', icon: 'ri-question-line' },
            { id: 'experiences', label: 'Kinh nghiệm', icon: 'ri-book-open-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-amber-600 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className={tab.icon}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md p-6">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      {post.verified && (
                        <i className="ri-verified-badge-fill text-amber-500"></i>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                {post.type === 'experience' && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                        {post.project}
                      </span>
                      {post.investment && (
                        <span className="text-sm text-gray-600">
                          Đầu tư: {formatCurrency(post.investment)} • Lợi nhuận: +{post.return}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                )}

                {post.type === 'tip' && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                  </div>
                )}

                {post.type === 'project_review' && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.project}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < post.rating ? 'fill' : 'line'} text-yellow-400`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.cooperative}</p>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                )}

                {post.type === 'qa' && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{post.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <i className="ri-heart-line text-xl"></i>
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                    <i className="ri-chat-3-line text-xl"></i>
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                    <i className="ri-share-line text-xl"></i>
                    <span className="text-sm font-medium">{post.shares || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đánh giá dự án</h3>
              <div className="space-y-4">
                {projectReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{review.project}</h4>
                          {review.verified && (
                            <i className="ri-verified-badge-fill text-amber-500 text-sm"></i>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{review.cooperative}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">{review.author}</p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">{review.date}</p>
                          {review.investment && (
                            <>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600">
                                Đầu tư: {formatCurrency(review.investment)} • Lợi nhuận: +{review.return}%
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-yellow-400`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-amber-600">
                        <i className="ri-thumb-up-line"></i>
                        <span>Hữu ích ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        {tip.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 mb-3">{tip.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line"></i>
                        {tip.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line"></i>
                        {tip.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-heart-line"></i>
                        {tip.likes}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-amber-50 text-amber-600 rounded-lg font-medium hover:bg-amber-100 transition-colors">
                  Đọc thêm
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Q&A Tab */}
        {activeTab === 'qa' && (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <i className="ri-question-line text-2xl text-amber-600"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {q.category}
                      </span>
                      {q.solved && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <i className="ri-check-line"></i>
                          Đã giải đáp
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{q.question}</h3>
                    {q.bestAnswer && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-checkbox-circle-fill text-green-600"></i>
                          <span className="text-sm font-semibold text-green-700">Câu trả lời tốt nhất</span>
                        </div>
                        <p className="text-sm text-gray-700">{q.bestAnswer}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{q.author}</span>
                      <span className="flex items-center gap-1">
                        <i className="ri-chat-3-line"></i>
                        {q.answers} câu trả lời
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line"></i>
                        {q.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        {exp.project}
                      </span>
                      <span className="text-xs text-gray-600">{exp.duration}</span>
                      <span className="text-xs font-semibold text-green-600">+{exp.totalReturn}% lợi nhuận</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{exp.title}</h3>
                    <p className="text-gray-700 mb-3 leading-relaxed">{exp.content}</p>
                    <div className="bg-amber-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Bài học rút ra:</p>
                      <ul className="space-y-1">
                        {exp.lessons.map((lesson, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <i className="ri-check-line text-amber-600"></i>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line"></i>
                        {exp.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Đăng bài mới</h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại bài đăng</label>
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="experience">Chia sẻ kinh nghiệm</option>
                  <option value="tip">Mẹo đầu tư</option>
                  <option value="project_review">Đánh giá dự án</option>
                  <option value="qa">Câu hỏi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Chia sẻ với cộng đồng..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handlePost}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Đăng bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/investor-home')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/investor')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-funds-line text-2xl"></i>
            <span className="text-xs">Đầu tư</span>
          </button>
          <button 
            onClick={() => navigate('/investor-wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-amber-600 cursor-pointer">
            <i className="ri-community-line text-2xl"></i>
            <span className="text-xs font-semibold">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
