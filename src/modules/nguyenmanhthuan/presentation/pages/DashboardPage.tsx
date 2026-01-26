import { useState, useEffect } from 'react';
import ShareholderModal from '../components/ShareholderModal';
import BenefitsModal from '../components/BenefitsModal';
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { GreenPointsService } from '@core/application/shared/GreenPointsService';
import { SupabaseGreenPointsAdapter } from '@core/infrastructure/adapters/greenPoints/SupabaseGreenPointsAdapter';
import type { User } from '@core/domain/user/User';

export default function DashboardPage() {
  const authService = new AuthService(new SupabaseAuthAdapter());
  const greenPointsService = new GreenPointsService(new SupabaseGreenPointsAdapter());
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showShareholderModal, setShowShareholderModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [benefitsConfirmed, setBenefitsConfirmed] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    question: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Green Points state
  const [greenPoints, setGreenPoints] = useState<number>(0);
  const [greenPointsLoading, setGreenPointsLoading] = useState(true);
  const [greenPointsError, setGreenPointsError] = useState<string | null>(null);

  const sponsorAmount = 50000000;

  // Fetch user and Green Points
  useEffect(() => {
    const fetchData = async () => {
      setAuthLoading(true);
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          // Fetch Green Points
          setGreenPointsLoading(true);
          setGreenPointsError(null);
          try {
            const points = await greenPointsService.getUserGreenPoints(currentUser.id);
            setGreenPoints(points);
          } catch (error) {
            console.error('Error fetching Green Points:', error);
            setGreenPointsError('Không thể tải điểm Green. Vui lòng thử lại sau.');
            setGreenPoints(0);
          } finally {
            setGreenPointsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBenefitsConfirm = () => {
    setBenefitsConfirmed(true);
    setShowBenefitsModal(false);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('question', feedbackForm.question);
      formBody.append('feedback', feedbackForm.feedback);

      const response = await fetch('https://readdy.ai/api/form/d5l52v5porqtj2nscj50', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFeedbackForm({ question: '', feedback: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-green-100 text-lg">Quản lý thông tin tài trợ và quyền lợi của bạn</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl">
                <i className="ri-money-dollar-circle-line w-8 h-8 flex items-center justify-center"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Số tiền tài trợ</h2>
                <p className="text-gray-600">Tổng số tiền bạn đã đóng góp</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Tổng tài trợ</p>
                <p className="text-5xl font-bold text-green-700 mb-1">
                  {sponsorAmount.toLocaleString('vi-VN')}
                </p>
                <p className="text-xl text-gray-600">VNĐ</p>
              </div>
            </div>

            <button
              onClick={() => setShowShareholderModal(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="ri-file-list-3-line w-5 h-5 flex items-center justify-center"></i>
                Đăng ký nhận chuyển nhượng cổ phần
              </span>
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl">
                <i className="ri-leaf-line w-8 h-8 flex items-center justify-center"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Điểm Green</h2>
                <p className="text-gray-600">Điểm tích lũy của bạn</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Số điểm hiện có</p>
                {greenPointsLoading ? (
                  <div className="flex items-center justify-center">
                    <i className="ri-loader-4-line text-5xl text-green-600 animate-spin"></i>
                  </div>
                ) : greenPointsError ? (
                  <div className="text-red-600 text-sm">
                    <i className="ri-error-warning-line mr-2"></i>
                    {greenPointsError}
                  </div>
                ) : (
                  <>
                    <p className="text-5xl font-bold text-green-700 mb-1">
                      {greenPoints.toLocaleString('vi-VN')}
                    </p>
                    <p className="text-xl text-gray-600">Điểm</p>
                  </>
                )}
              </div>
            </div>

            {benefitsConfirmed && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4 flex items-center gap-3">
                <i className="ri-checkbox-circle-fill w-6 h-6 flex items-center justify-center text-green-600"></i>
                <p className="text-green-700 font-medium">Đã kích hoạt quyền lợi!</p>
              </div>
            )}

            <button
              onClick={() => setShowBenefitsModal(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="ri-gift-line w-5 h-5 flex items-center justify-center"></i>
                Nhận lợi ích từ hệ sinh thái VITA
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-green-100 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl">
              <i className="ri-question-answer-line w-8 h-8 flex items-center justify-center"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Thắc mắc & Đóng góp ý kiến</h2>
              <p className="text-gray-600">Gửi câu hỏi hoặc ý kiến của bạn cho chúng tôi</p>
            </div>
          </div>

          <form id="feedback-form" data-readdy-form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div>
              <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2">
                Thắc mắc của bạn <span className="text-red-500">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                value={feedbackForm.question}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFeedbackForm({...feedbackForm, question: e.target.value});
                  }
                }}
                required
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm"
                placeholder="Nhập câu hỏi hoặc thắc mắc của bạn..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {feedbackForm.question.length}/500 ký tự
              </div>
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-2">
                Đóng góp ý kiến
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={feedbackForm.feedback}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFeedbackForm({...feedbackForm, feedback: e.target.value});
                  }
                }}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm"
                placeholder="Chia sẻ ý kiến đóng góp của bạn (không bắt buộc)..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {feedbackForm.feedback.length}/500 ký tự
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-checkbox-circle-fill w-6 h-6 flex items-center justify-center text-green-600"></i>
                <p className="text-green-700 font-medium">Gửi thành công! Cảm ơn bạn đã đóng góp ý kiến.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-error-warning-fill w-6 h-6 flex items-center justify-center text-red-600"></i>
                <p className="text-red-700 font-medium">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line w-5 h-5 flex items-center justify-center animate-spin"></i>
                  Đang gửi...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-send-plane-fill w-5 h-5 flex items-center justify-center"></i>
                  Gửi ý kiến
                </span>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <a
            href="https://vitacoop.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap"
          >
            <i className="ri-global-line w-7 h-7 flex items-center justify-center"></i>
            Khám phá hệ sinh thái VITA
            <i className="ri-arrow-right-line w-6 h-6 flex items-center justify-center"></i>
          </a>
        </div>
      </div>

      <ShareholderModal 
        isOpen={showShareholderModal}
        onClose={() => setShowShareholderModal(false)}
        sponsorAmount={sponsorAmount}
      />

      <BenefitsModal 
        isOpen={showBenefitsModal}
        onClose={() => setShowBenefitsModal(false)}
        onConfirm={handleBenefitsConfirm}
      />
    </div>
  );
}
