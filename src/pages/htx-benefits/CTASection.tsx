import { useNavigate } from 'react-router-dom';

export default function CTASection({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/cooperative/register-account');
  };

  const handleContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isMobile) {
    return (
      <div className="h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Vietnamese%20medicinal%20herb%20cooperative%20farmers%20celebrating%20success%20together%20in%20bright%20green%20fields%20with%20modern%20farming%20equipment%20showing%20teamwork%20and%20prosperity%20warm%20sunlight%20creating%20hopeful%20atmosphere%20with%20people%20smiling%20and%20working%20together%20representing%20agricultural%20cooperation%20and%20sustainable%20development%20clean%20professional%20photography&width=800&height=1200&seq=htx-cta-mobile-bg-001&orientation=portrait)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/95 via-emerald-600/92 to-teal-700/95"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-between px-6 text-center pt-20 pb-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-2xl mb-5 shadow-2xl">
              <i className="ri-hand-heart-line text-3xl text-white drop-shadow-lg"></i>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Tham gia ngay!
            </h2>

            <p className="text-sm text-white leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] font-medium">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết về các quyền lợi
              và cơ hội hợp tác
            </p>
          </div>

          <div className="w-full max-w-sm">
            <button
              onClick={handleRegister}
              className="w-full px-8 py-3.5 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl whitespace-nowrap"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://readdy.ai/api/search-image?query=Vietnamese%20medicinal%20herb%20cooperative%20farmers%20celebrating%20success%20together%20in%20bright%20green%20fields%20with%20modern%20farming%20equipment%20showing%20teamwork%20and%20prosperity%20warm%20sunlight%20creating%20hopeful%20atmosphere%20with%20people%20smiling%20and%20working%20together%20representing%20agricultural%20cooperation%20and%20sustainable%20development%20clean%20professional%20photography&width=1920&height=1080&seq=htx-cta-desktop-bg-001&orientation=landscape)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/95 via-emerald-600/93 to-teal-700/95"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
          <i className="ri-rocket-line"></i>
          <span className="drop-shadow-md">Bắt đầu ngay</span>
        </div>

        <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          Tham gia ngay!
        </h2>

        <p className="text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] font-medium">
          Đăng ký ngay hôm nay để nhận tư vấn miễn phí và bắt đầu hành trình
          phát triển bền vững cùng hệ sinh thái dược liệu hàng đầu Việt Nam
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={handleRegister}
            className="px-10 py-5 bg-white text-teal-600 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors shadow-xl whitespace-nowrap"
          >
            Đăng ký HTX ngay
          </button>
          <button
            onClick={handleContact}
            className="px-10 py-5 bg-transparent text-white border-2 border-white rounded-lg font-medium text-lg hover:bg-white/10 transition-colors whitespace-nowrap shadow-lg"
          >
            Liên hệ tư vấn
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-xl mb-4 mx-auto shadow-lg">
              <i className="ri-phone-line text-2xl text-white drop-shadow-md"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">Hotline</h3>
            <p className="text-white font-medium drop-shadow-md">1900 xxxx</p>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-xl mb-4 mx-auto shadow-lg">
              <i className="ri-mail-line text-2xl text-white drop-shadow-md"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">Email</h3>
            <p className="text-white font-medium drop-shadow-md">htx@vita.vn</p>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-xl mb-4 mx-auto shadow-lg">
              <i className="ri-map-pin-line text-2xl text-white drop-shadow-md"></i>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">Địa chỉ</h3>
            <p className="text-white font-medium drop-shadow-md">Hà Nội, Việt Nam</p>
          </div>
        </div>
      </div>
    </div>
  );
}
