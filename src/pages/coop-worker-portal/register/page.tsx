import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { coopList } from '../../../shared/coop-data';
import BackButton from '../../../components/shared/BackButton';

export default function CoopWorkerRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coopId = searchParams.get('coopId');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const selectedCoop = coopList.find(c => c.id === coopId);

  const handlePhoneContinue = () => {
    if (!phone.match(/^[0-9]{10}$/)) {
      setError('Vui lòng nhập đúng số điện thoại 10 số!');
      return;
    }
    setError('');
    // Simulate OTP sending
    setShowOtp(true);
    alert(`Mã OTP 6 số đã được gửi đến ${phone}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Mã OTP phải có 6 số!');
      return;
    }
    // Save registration data
    const registrationData = {
      phone,
      coopId: coopId || '',
      coopName: selectedCoop?.name || '',
      registeredAt: new Date().toISOString(),
      status: 'pending',
    };

    localStorage.setItem(`coop_worker_registration_${coopId}`, JSON.stringify(registrationData));
    sessionStorage.setItem('coop_worker_authenticated', 'true');
    sessionStorage.setItem('coop_worker_phone', phone);
    sessionStorage.setItem('coop_worker_coopId', coopId || '');
    
    // Gửi thông tin đến ban quản trị HTX (mock - trong thực tế sẽ gọi API)
    console.log('Gửi thông tin đến ban quản trị HTX:', registrationData);

    // Hiển thị màn hình thành công
    setShowSuccess(true);
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-white text-4xl"></i>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Chúc mừng bạn!
          </h2>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
            <p className="text-gray-700 leading-relaxed mb-4">
              Thông tin của bạn đã được chúng tôi gửi đến ban quản trị HTX <span className="font-bold text-blue-600">{selectedCoop?.name || 'HTX'}</span>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ban quản trị HTX sẽ chủ động liên hệ với bạn để hoàn tất thủ tục đăng ký xã viên cho bạn.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium text-emerald-700">
              Còn bây giờ, hãy vào phần mềm quản lý công việc của bạn để làm quen! Bạn có thể cập nhật thông tin chi tiết (Họ tên, Email, Địa chỉ, Kinh nghiệm) trong tab "Hồ sơ" sau.
            </p>
          </div>

          <button
            onClick={() => navigate('/coop-worker-portal/dashboard')}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-play-circle-line text-xl"></i>
            <span>Làm quen</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Ứng tuyển Xã viên Góp sức
          </h1>
          {selectedCoop && (
            <p className="text-sm text-gray-600">
              HTX: <span className="font-semibold text-blue-600">{selectedCoop.name}</span>
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <i className="ri-error-warning-line text-xl"></i>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Phone OTP Flow */}
        {!showOtp ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nhập số điện thoại di động *
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="0912345678"
                className="w-full px-4 py-4 text-lg text-center border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                maxLength={10}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <i className="ri-information-line mr-2"></i>
                Bạn có thể cập nhật thông tin chi tiết (Họ tên, Email, Địa chỉ, Kinh nghiệm) sau khi đăng ký trong tab <strong>"Hồ sơ"</strong> của portal.
              </p>
            </div>

            <div className="flex items-start gap-2 pt-4 border-t">
              <input
                type="checkbox"
                id="agreeToTerms"
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">điều khoản sử dụng</a> và <a href="#" className="text-blue-600 hover:underline">chính sách bảo mật</a>
              </label>
            </div>

            <button
              onClick={handlePhoneContinue}
              disabled={phone.length !== 10}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp tục
            </button>
          </div>
        ) : (
          /* OTP Verification */
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-message-3-line text-blue-600 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhập mã OTP</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi đã gửi mã xác thực 6 số đến <span className="font-semibold">{phone}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mã OTP (6 số) *
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-4 text-2xl text-center tracking-widest border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowOtp(false);
                  setOtp('');
                  setError('');
                }}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Quay lại
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Xác thực
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Không nhận được mã?{' '}
              <button 
                onClick={handlePhoneContinue}
                className="text-blue-600 font-semibold hover:underline"
              >
                Gửi lại
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
