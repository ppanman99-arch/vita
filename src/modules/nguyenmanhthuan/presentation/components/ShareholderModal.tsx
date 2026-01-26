
import { useState } from 'react';

interface ShareholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorAmount: number;
}

export default function ShareholderModal({ isOpen, onClose, sponsorAmount }: ShareholderModalProps) {
  const [signature, setSignature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('sponsor_amount', sponsorAmount.toLocaleString('vi-VN'));
      formBody.append('signature', signature);
      formBody.append('registration_date', new Date().toLocaleString('vi-VN'));

      const response = await fetch('https://readdy.ai/api/form/d5l52v5porqtj2nscj4g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setSignature('');
          setSubmitStatus('idle');
        }, 2000);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Đăng ký nhận chuyển nhượng cổ phần</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>

        <div className="p-8">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-file-text-line w-6 h-6 flex items-center justify-center text-green-600"></i>
              Thỏa thuận chuyển nhượng cổ phần
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="font-medium">
                Tôi xác nhận đăng ký nhận chuyển nhượng cổ phần công ty <span className="text-green-700 font-bold">Hành Trình Xanh Greenlight Việt Nam</span> từ anh Nguyễn Mạnh Thuần.
              </p>
              <p>
                Số tiền mua cổ phần được chuyển đổi từ số tiền tôi đã tài trợ cho anh Nguyễn Mạnh Thuần là:
              </p>
              <div className="bg-white border-2 border-green-300 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-green-700">
                  {sponsorAmount.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <i className="ri-information-line w-5 h-5 flex items-center justify-center inline mr-2"></i>
                  Bằng việc ký xác nhận, bạn đồng ý với các điều khoản và điều kiện chuyển nhượng cổ phần theo quy định của công ty.
                </p>
              </div>
            </div>
          </div>

          <form id="shareholder-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="signature" className="block text-sm font-semibold text-gray-700 mb-2">
                Chữ ký số (Nhập họ tên đầy đủ) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-quill-pen-line w-5 h-5 flex items-center justify-center text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg font-['Pacifico']"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Chữ ký số của bạn xác nhận sự đồng ý với các điều khoản trên
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-checkbox-circle-fill w-6 h-6 flex items-center justify-center text-green-600"></i>
                <p className="text-green-700 font-medium">Đăng ký thành công! Thông tin đã được ghi nhận.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
                <i className="ri-error-warning-fill w-6 h-6 flex items-center justify-center text-red-600"></i>
                <p className="text-red-700 font-medium">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all whitespace-nowrap"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !signature}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line w-5 h-5 flex items-center justify-center animate-spin"></i>
                    Đang xử lý...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-checkbox-circle-line w-5 h-5 flex items-center justify-center"></i>
                    Xác nhận đăng ký
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
