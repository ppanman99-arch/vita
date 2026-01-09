import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Rating {
  rater: string;
  ratee: string;
  score: number;
  comment: string;
  timestamp: string;
}

interface CropSuggestion {
  cropName: string;
  reason: string;
  compatibility: number;
  expectedReturn: number;
  timeline: string;
}

export default function ReinvestmentLoopPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'rating' | 'suggestion' | 'reinvest'>('rating');
  const [ratings, setRatings] = useState<Rating[]>([
    {
      rater: 'Công ty Dược Phẩm VinaTech',
      ratee: 'HTX Tu Mơ Rông',
      score: 5,
      comment: 'Hàng chất lượng tốt, giao hàng đúng hạn. Rất hài lòng!',
      timestamp: new Date().toISOString()
    }
  ]);
  const [cropSuggestion] = useState<CropSuggestion>({
    cropName: 'Xen canh Đẳng Sâm',
    reason: 'Đất này vừa trồng Sâm xong, dinh dưỡng còn tốt. Vụ tới nên trồng xen canh cây X để cải tạo đất và tận dụng tài nguyên.',
    compatibility: 85,
    expectedReturn: 15,
    timeline: '2-3 năm'
  });
  const [reinvestPercentage, setReinvestPercentage] = useState(50);
  const [reinvestConfirmed, setReinvestConfirmed] = useState(false);

  const handleSubmitRating = (score: number, comment: string) => {
    const newRating: Rating = {
      rater: 'HTX Tu Mơ Rông',
      ratee: 'Nông dân - Ông A',
      score,
      comment,
      timestamp: new Date().toISOString()
    };
    setRatings([...ratings, newRating]);
  };

  const handleConfirmReinvest = () => {
    setReinvestConfirmed(true);
    alert(`Đã xác nhận tái đầu tư ${reinvestPercentage}% lợi nhuận vào vụ mới. Tiền lãi sẽ tự động quay vòng thành vốn cho vụ sau (Lãi suất kép).`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/profit-split')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Tái Đầu Tư (The Loop)</h1>
            <p className="text-sm opacity-90">Kết thúc một vòng đời là khởi đầu một vòng đời mới</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('rating')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'rating'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Đánh giá Tín nhiệm
          </button>
          <button
            onClick={() => setActiveTab('suggestion')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'suggestion'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Gợi ý Vụ Mới
          </button>
          <button
            onClick={() => setActiveTab('reinvest')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'reinvest'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tái Đầu Tư
          </button>
        </div>

        {/* Rating Tab */}
        {activeTab === 'rating' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Đánh giá Tín nhiệm</h2>
              <p className="text-gray-600 mb-6">
                Doanh nghiệp B2B chấm điểm HTX. HTX chấm điểm Nông dân. 
                Điểm tín nhiệm tăng → Vụ sau dễ gọi vốn hơn, dễ vay ngân hàng hơn.
              </p>

              <div className="space-y-4">
                {ratings.map((rating, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{rating.rater}</p>
                        <p className="text-sm text-gray-600">Đánh giá: {rating.ratee}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`${i < rating.score ? 'ri-star-fill' : 'ri-star-line'} text-amber-500`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{rating.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(rating.timestamp).toLocaleString('vi-VN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-800">
                  <i className="ri-information-line mr-2"></i>
                  Điểm tín nhiệm cao giúp HTX và Nông dân dễ dàng gọi vốn và vay ngân hàng cho vụ sau.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Suggestion Tab */}
        {activeTab === 'suggestion' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gợi ý Vụ Mới</h2>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-plant-line text-emerald-600 text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cropSuggestion.cropName}</h3>
                  <p className="text-gray-700 mb-4">{cropSuggestion.reason}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Độ phù hợp</p>
                  <p className="text-2xl font-bold text-emerald-600">{cropSuggestion.compatibility}%</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Lợi nhuận dự kiến</p>
                  <p className="text-2xl font-bold text-emerald-600">{cropSuggestion.expectedReturn}%/năm</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                  <p className="text-2xl font-bold text-gray-900">{cropSuggestion.timeline}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <i className="ri-lightbulb-line mr-2"></i>
                Hệ thống AI phân tích đất, dinh dưỡng và điều kiện để đưa ra gợi ý tối ưu cho vụ tiếp theo.
              </p>
            </div>
          </div>
        )}

        {/* Reinvest Tab */}
        {activeTab === 'reinvest' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tái Đầu Tư Lợi Nhuận</h2>
            
            {!reinvestConfirmed ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Lãi suất kép - Quay vòng vốn</h3>
                  <p className="text-sm text-gray-700 mb-6">
                    Nếu Nhà đầu tư đồng ý, tiền lãi từ vụ này sẽ tự động quay vòng thành vốn cho vụ sau. 
                    Tạo ra hiệu ứng lãi suất kép và tăng trưởng bền vững.
                  </p>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tỷ lệ tái đầu tư: {reinvestPercentage}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={reinvestPercentage}
                      onChange={(e) => setReinvestPercentage(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Số tiền tái đầu tư:</span>
                      <span className="text-xl font-bold text-purple-600">
                        {(10000000000 * 0.20 * reinvestPercentage / 100).toLocaleString()} VNĐ
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      (Tính trên 20% cổ tức của Nhà đầu tư)
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmReinvest}
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Xác nhận Tái đầu tư {reinvestPercentage}% lợi nhuận vào vụ mới
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800">
                    <i className="ri-loop-left-line mr-2"></i>
                    <strong>The Loop:</strong> Kết thúc một vòng đời là khởi đầu một vòng đời mới. 
                    Vòng tuần hoàn này tạo ra sự phát triển bền vững và tăng trưởng liên tục.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-checkbox-circle-line text-emerald-600 text-5xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Đã xác nhận Tái đầu tư!</h3>
                <p className="text-gray-600 mb-6">
                  {reinvestPercentage}% lợi nhuận sẽ tự động quay vòng thành vốn cho vụ sau.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-sm text-emerald-800">
                    <i className="ri-infinite-line mr-2"></i>
                    Vòng tuần hoàn đã được kích hoạt. Hệ thống sẵn sàng cho vụ mới!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}




