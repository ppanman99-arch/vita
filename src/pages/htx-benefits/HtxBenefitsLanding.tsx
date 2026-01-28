import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { htxBenefitsSections } from './htxBenefitsSections';
import HeroSection from './HeroSection';
import BenefitSection from './BenefitSection';
import CTASection from './CTASection';

const SECTION_IDS = ['capital', 'standard', 'market', 'management', 'support', 'ecosystem'] as const;

export default function HtxBenefitsLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = htxBenefitsSections.length + 2;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        <div className="fixed top-8 left-0 right-0 z-50 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-white w-6 shadow-lg'
                  : 'bg-white/50'
              }`}
              aria-label={`Đi tới slide ${index + 1}`}
            />
          ))}
        </div>

        <div
          className="h-screen overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="min-w-full h-full">
              <HeroSection isMobile={true} onContinue={nextSlide} />
            </div>

            {htxBenefitsSections.map((section) => (
              <div key={section.id} className="min-w-full h-full">
                <BenefitSection section={section} isMobile={true} onContinue={nextSlide} />
              </div>
            ))}

            <div className="min-w-full h-full">
              <CTASection isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <i className="ri-leaf-line text-white text-xl sm:text-2xl"></i>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">GreenLight VITA</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Rừng Dược Sinh</p>
            </div>
          </Link>
          <nav className="flex items-center gap-8">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className="text-sm text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap"
              >
                {id === 'capital' && 'Vốn & Đầu tư'}
                {id === 'standard' && 'Chuẩn & Thương hiệu'}
                {id === 'market' && 'Thị trường'}
                {id === 'management' && 'Quản trị'}
                {id === 'support' && 'Hỗ trợ'}
                {id === 'ecosystem' && 'Hệ sinh thái'}
              </a>
            ))}
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap"
            >
              Trang chủ
            </Link>
          </nav>
        </div>
      </header>

      <div className="scroll-smooth">
        <div className="pt-20">
          <HeroSection isMobile={false} onExplore={() => scrollToSection('capital')} />
        </div>

        {htxBenefitsSections.map((section) => (
          <div key={section.id} id={section.id}>
            <BenefitSection section={section} isMobile={false} />
          </div>
        ))}

        <CTASection isMobile={false} />
      </div>
    </div>
  );
}
