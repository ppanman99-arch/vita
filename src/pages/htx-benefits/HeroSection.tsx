interface HeroSectionProps {
  isMobile: boolean;
  onContinue?: () => void;
  onExplore?: () => void;
}

export default function HeroSection({ isMobile, onContinue, onExplore }: HeroSectionProps) {
  const handleDesktopExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      document.getElementById('capital')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return (
      <div className="h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Lush%20green%20medicinal%20herb%20farm%20with%20rows%20of%20healthy%20plants%20under%20bright%20sunlight%20Vietnamese%20countryside%20landscape%20with%20farmers%20working%20in%20fields%20showing%20prosperity%20and%20natural%20growth%20clean%20bright%20atmosphere%20with%20soft%20focus%20background%20emphasizing%20vitality%20and%20agricultural%20success&width=800&height=1200&seq=htx-hero-mobile-bg-001&orientation=portrait)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center pb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium mb-4">
            <i className="ri-plant-line"></i>
            <span>Hợp tác xã dược liệu</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Quyền lợi vượt trội cho HTX
          </h1>

          <p className="text-sm text-white/95 mb-6 leading-relaxed max-w-md drop-shadow-md">
            Tham gia hệ sinh thái VITA để nhận được sự hỗ trợ toàn diện về vốn,
            công nghệ, thị trường và phát triển bền vững
          </p>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button
            onClick={onContinue}
            className="w-full px-8 py-3.5 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl whitespace-nowrap flex items-center justify-center gap-2 hover:shadow-2xl active:scale-95"
          >
            <span>Khám Phá</span>
            <i className="ri-arrow-right-line text-xl"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://readdy.ai/api/search-image?query=Lush%20green%20medicinal%20herb%20farm%20with%20rows%20of%20healthy%20plants%20under%20bright%20sunlight%20Vietnamese%20countryside%20landscape%20showing%20prosperity%20and%20natural%20growth%20clean%20bright%20atmosphere%20emphasizing%20vitality%20and%20agricultural%20success&width=1920&height=1080&seq=htx-hero-bg-001&orientation=landscape)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 flex items-center min-h-screen">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            <i className="ri-plant-line"></i>
            <span>Hợp tác xã dược liệu</span>
          </div>

          <h1 className="text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Quyền lợi vượt trội<br />cho HTX tham gia VITA
          </h1>

          <p className="text-2xl text-gray-600 mb-10 leading-relaxed">
            Tham gia hệ sinh thái VITA để nhận được sự hỗ trợ toàn diện về vốn,
            công nghệ, thị trường và phát triển bền vững
          </p>

          <button
            onClick={handleDesktopExplore}
            className="px-10 py-5 bg-teal-600 text-white rounded-lg font-medium text-lg hover:bg-teal-700 transition-colors shadow-xl whitespace-nowrap"
          >
            Khám phá quyền lợi
          </button>
        </div>
      </div>
    </div>
  );
}
