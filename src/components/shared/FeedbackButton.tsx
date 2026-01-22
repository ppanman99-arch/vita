import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { submitFeedbackToGoogleSheets } from '../../lib/googleSheets/feedbackService';

interface FeedbackData {
  page: string;
  feedback: string;
  rating?: number;
  timestamp: string;
  userAgent?: string;
}

export default function FeedbackButton() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Reset form when page changes
  useEffect(() => {
    setFeedback('');
    setRating(null);
    setSubmitStatus('idle');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const feedbackData: FeedbackData = {
      page: location.pathname,
      feedback: feedback.trim(),
      rating: rating || undefined,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      // Gửi feedback đến Google Sheets (ưu tiên)
      await submitFeedbackToGoogleSheets(feedbackData);
      
      // Fallback: Try to save to Supabase
      try {
        const { error } = await supabase.from('feedback').insert([feedbackData]);
        if (error) throw error;
      } catch (supabaseError) {
        // If Supabase fails (table doesn't exist or not configured), save to localStorage
        console.log('Supabase not available, saving to localStorage:', supabaseError);
        const existingFeedback = JSON.parse(localStorage.getItem('vita_feedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('vita_feedback', JSON.stringify(existingFeedback));
      }

      setSubmitStatus('success');
      setFeedback('');
      setRating(null);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error saving feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Đóng góp ý kiến"
      >
        <i className="ri-feedback-line text-2xl group-hover:rotate-12 transition-transform"></i>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          <i className="ri-lightbulb-line"></i>
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => !isSubmitting && setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <i className="ri-feedback-line"></i>
                    Đóng góp ý kiến
                  </h3>
                  <p className="text-sm text-white/90 mt-1">
                    Trang: <span className="font-medium">{location.pathname}</span>
                  </p>
                </div>
                <button
                  onClick={() => !isSubmitting && setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Đánh giá trang này
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all ${
                        rating && star <= rating
                          ? 'text-yellow-400 scale-110'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      <i className="ri-star-fill"></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Ý kiến của bạn <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Chia sẻ ý kiến, đề xuất hoặc báo lỗi về trang này..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Phản hồi của bạn giúp chúng tôi cải thiện trải nghiệm tốt hơn
                </p>
              </div>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700">
                  <i className="ri-checkbox-circle-line text-xl"></i>
                  <span className="text-sm font-medium">Cảm ơn bạn đã đóng góp ý kiến!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                  <i className="ri-error-warning-line text-xl"></i>
                  <span className="text-sm font-medium">Có lỗi xảy ra. Vui lòng thử lại.</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!feedback.trim() || isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      <span>Gửi ý kiến</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
