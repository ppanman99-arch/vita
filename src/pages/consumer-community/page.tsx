import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import { earnPoints } from '../../lib/greenPoints/service';

export default function ConsumerCommunityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feed' | 'reviews' | 'tips' | 'qa' | 'recipes'>('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'review', content: '', rating: 5 });

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
      author: 'Nguyễn Thị Lan',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Thi+Lan&background=4f46e5&color=fff',
      time: '2 giờ trước',
      type: 'review',
      product: 'Sâm Ngọc Linh',
      rating: 5,
      content: 'Mình đã dùng Sâm Ngọc Linh được 3 tháng, cảm thấy sức khỏe cải thiện rõ rệt. Giấc ngủ sâu hơn, tinh thần minh mẫn hơn. Sản phẩm chất lượng tốt, đóng gói cẩn thận.',
      images: ['https://readdy.ai/api/search-image?query=Vietnamese%20ginseng%20product%20packaging&width=400&height=300'],
      likes: 24,
      comments: 8,
      shares: 3,
      verified: true,
    },
    {
      id: 2,
      author: 'Trần Văn Minh',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Van+Minh&background=059669&color=fff',
      time: '5 giờ trước',
      type: 'tip',
      title: 'Cách bảo quản dược liệu đúng cách',
      content: 'Mình chia sẻ cách bảo quản dược liệu để giữ được dưỡng chất tốt nhất:\n\n1. Bảo quản nơi khô ráo, thoáng mát\n2. Tránh ánh nắng trực tiếp\n3. Đóng kín sau khi sử dụng\n4. Kiểm tra hạn sử dụng thường xuyên',
      likes: 18,
      comments: 5,
      shares: 12,
      verified: false,
    },
    {
      id: 3,
      author: 'Phạm Thị Hoa',
      avatar: 'https://ui-avatars.com/api/?name=Pham+Thi+Hoa&background=dc2626&color=fff',
      time: '1 ngày trước',
      type: 'recipe',
      title: 'Công thức nấu canh gà với Đương Quy',
      content: 'Hôm nay mình nấu canh gà với Đương Quy, rất bổ dưỡng cho sức khỏe. Công thức:\n\n- Gà: 500g\n- Đương Quy: 20g\n- Táo đỏ: 10 quả\n- Gừng: 3 lát\n\nNấu trong 1.5 giờ, nêm gia vị vừa ăn.',
      images: ['https://readdy.ai/api/search-image?query=Vietnamese%20chicken%20soup%20with%20herbs&width=400&height=300'],
      likes: 32,
      comments: 15,
      shares: 8,
      verified: true,
    },
    {
      id: 4,
      author: 'Lê Văn Đức',
      avatar: 'https://ui-avatars.com/api/?name=Le+Van+Duc&background=7c3aed&color=fff',
      time: '2 ngày trước',
      type: 'qa',
      question: 'Sâm Ngọc Linh có dùng được cho phụ nữ mang thai không?',
      content: 'Mình đang mang thai tháng thứ 5, có nên dùng Sâm Ngọc Linh không? Có ai có kinh nghiệm chia sẻ giúp mình với.',
      likes: 12,
      comments: 6,
      verified: false,
    },
  ];

  // Mock data - Product Reviews
  const productReviews = [
    {
      id: 1,
      product: 'Sâm Ngọc Linh (100g)',
      author: 'Nguyễn Thị Lan',
      rating: 5,
      date: '05/01/2025',
      content: 'Sản phẩm chất lượng tốt, đóng gói cẩn thận. Mình dùng được 3 tháng, cảm thấy sức khỏe cải thiện rõ rệt.',
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      product: 'Trà Cà Gai Leo (20 gói)',
      author: 'Trần Văn Minh',
      rating: 4,
      date: '03/01/2025',
      content: 'Trà thơm, dễ uống. Mình uống mỗi sáng, cảm thấy gan khỏe hơn. Giá cả hợp lý.',
      helpful: 18,
      verified: false,
    },
    {
      id: 3,
      product: 'Cao Đương Quy (250ml)',
      author: 'Phạm Thị Hoa',
      rating: 5,
      date: '01/01/2025',
      content: 'Cao đặc, mùi thơm tự nhiên. Mình dùng để nấu canh, rất bổ dưỡng. Sẽ mua lại.',
      helpful: 15,
      verified: true,
    },
  ];

  // Mock data - Tips
  const tips = [
    {
      id: 1,
      title: 'Cách bảo quản dược liệu đúng cách',
      author: 'Trần Văn Minh',
      category: 'Bảo quản',
      views: 1250,
      likes: 89,
      content: 'Mình chia sẻ cách bảo quản dược liệu để giữ được dưỡng chất tốt nhất...',
    },
    {
      id: 2,
      title: 'Thời điểm tốt nhất để uống trà dược liệu',
      author: 'Nguyễn Thị Lan',
      category: 'Sử dụng',
      views: 980,
      likes: 67,
      content: 'Uống trà dược liệu vào buổi sáng sau khi ăn sáng là tốt nhất...',
    },
    {
      id: 3,
      title: 'Cách phân biệt dược liệu thật và giả',
      author: 'Phạm Thị Hoa',
      category: 'Mẹo mua',
      views: 2100,
      likes: 145,
      content: 'Để tránh mua phải hàng giả, bạn cần chú ý những điểm sau...',
    },
  ];

  // Mock data - Q&A
  const questions = [
    {
      id: 1,
      question: 'Sâm Ngọc Linh có dùng được cho phụ nữ mang thai không?',
      author: 'Lê Văn Đức',
      category: 'Sức khỏe',
      answers: 6,
      views: 450,
      solved: true,
      bestAnswer: 'Theo khuyến cáo của bác sĩ, phụ nữ mang thai nên thận trọng khi dùng Sâm Ngọc Linh...',
    },
    {
      id: 2,
      question: 'Trà Cà Gai Leo uống bao nhiêu lần một ngày?',
      author: 'Trần Văn Minh',
      category: 'Sử dụng',
      answers: 4,
      views: 320,
      solved: true,
      bestAnswer: 'Nên uống 2-3 lần một ngày, mỗi lần 1 gói, sau bữa ăn...',
    },
    {
      id: 3,
      question: 'Cao Đương Quy để được bao lâu sau khi mở nắp?',
      author: 'Nguyễn Thị Lan',
      category: 'Bảo quản',
      answers: 3,
      views: 280,
      solved: false,
    },
  ];

  // Mock data - Recipes
  const recipes = [
    {
      id: 1,
      title: 'Canh gà với Đương Quy',
      author: 'Phạm Thị Hoa',
      difficulty: 'Dễ',
      time: '90 phút',
      servings: 4,
      rating: 4.8,
      reviews: 32,
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20chicken%20soup%20with%20herbs&width=400&height=300',
      ingredients: ['Gà: 500g', 'Đương Quy: 20g', 'Táo đỏ: 10 quả', 'Gừng: 3 lát'],
    },
    {
      id: 2,
      title: 'Trà Sâm Ngọc Linh mật ong',
      author: 'Nguyễn Thị Lan',
      difficulty: 'Rất dễ',
      time: '15 phút',
      servings: 2,
      rating: 4.9,
      reviews: 45,
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20ginseng%20honey%20tea&width=400&height=300',
      ingredients: ['Sâm Ngọc Linh: 5g', 'Mật ong: 2 thìa', 'Nước: 500ml'],
    },
    {
      id: 3,
      title: 'Cháo Cà Gai Leo',
      author: 'Trần Văn Minh',
      difficulty: 'Dễ',
      time: '60 phút',
      servings: 2,
      rating: 4.6,
      reviews: 18,
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20porridge%20with%20herbs&width=400&height=300',
      ingredients: ['Gạo: 100g', 'Cà Gai Leo: 30g', 'Thịt băm: 50g'],
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
        'Chia sẻ trong cộng đồng',
        5,
        'engagement',
        'consumer-community',
        { postType: newPost.type }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }

    alert('Đã đăng bài thành công! +5 Green Points');
    setShowPostModal(false);
    setNewPost({ type: 'review', content: '', rating: 5 });
  };

  const handleLike = async (postId: number) => {
    // Tích điểm khi like (giới hạn 10 lần/ngày)
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Tương tác trong cộng đồng',
        1,
        'engagement',
        'consumer-community',
        { action: 'like', postId }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }
  };

  const handleReview = async () => {
    // Tích điểm khi đánh giá sản phẩm
    try {
      await earnPoints(
        sessionStorage.getItem('user_id') || 'demo-user',
        'Đánh giá sản phẩm',
        10,
        'engagement',
        'consumer-community',
        { rating: newPost.rating }
      );
    } catch (error) {
      console.error('Error earning points:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/farmer-consumer')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Cộng đồng Xã viên</h1>
              <p className="text-green-100 text-xs sm:text-sm">Chia sẻ, học hỏi, kết nối</p>
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
            { id: 'reviews', label: 'Đánh giá', icon: 'ri-star-line' },
            { id: 'tips', label: 'Mẹo & Tips', icon: 'ri-lightbulb-line' },
            { id: 'qa', label: 'Hỏi & Đáp', icon: 'ri-question-line' },
            { id: 'recipes', label: 'Công thức', icon: 'ri-restaurant-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md'
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
                        <i className="ri-verified-badge-fill text-blue-500"></i>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                {post.type === 'review' && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.product}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < post.rating ? 'fill' : 'line'} text-yellow-400`}
                          ></i>
                        ))}
                      </div>
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

                {post.type === 'recipe' && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                  </div>
                )}

                {post.type === 'qa' && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">{post.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                )}

                {/* Images */}
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <i className="ri-heart-line text-xl"></i>
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ri-chat-3-line text-xl"></i>
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <i className="ri-share-line text-xl"></i>
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h3>
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{review.product}</h4>
                          {review.verified && (
                            <i className="ri-verified-badge-fill text-blue-500 text-sm"></i>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">{review.author}</p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">{review.date}</p>
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
                      <button className="flex items-center gap-1 hover:text-blue-600">
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
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
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
                <button className="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
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
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-question-line text-2xl text-blue-600"></i>
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

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{recipe.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-user-line"></i>
                      {recipe.servings} người
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      {recipe.rating} ({recipe.reviews})
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Nguyên liệu:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <i className="ri-check-line text-green-600"></i>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    Xem công thức
                  </button>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="review">Đánh giá sản phẩm</option>
                  <option value="tip">Mẹo & Tips</option>
                  <option value="recipe">Công thức</option>
                  <option value="qa">Câu hỏi</option>
                </select>
              </div>

              {newPost.type === 'review' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewPost({ ...newPost, rating: star })}
                        className="text-3xl"
                      >
                        <i className={`ri-star-${star <= newPost.rating ? 'fill' : 'line'} text-yellow-400`}></i>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
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
                  onClick={() => {
                    if (newPost.type === 'review') {
                      handleReview();
                    }
                    handlePost();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
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
            onClick={() => navigate('/farmer-consumer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer-consumer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-shopping-cart-line text-2xl"></i>
            <span className="text-xs">Siêu thị</span>
          </button>
          <button 
            onClick={() => navigate('/consumer-wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-600 cursor-pointer">
            <i className="ri-community-line text-2xl"></i>
            <span className="text-xs font-semibold">Cộng đồng</span>
          </button>
          <button 
            onClick={() => navigate('/farmer-consumer')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-user-line text-2xl"></i>
            <span className="text-xs">Tài khoản</span>
          </button>
        </div>
      </div>
    </div>
  );
}
