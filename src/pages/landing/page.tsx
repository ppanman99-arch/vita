import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EcosystemSection from './components/EcosystemSection';

// Hero background image - dùng ảnh local từ public/images/
const HERO_BACKGROUND_IMAGE = "/images/hero-background.png";
// Fallback URL nếu cần: "https://readdy.ai/api/search-image?query=..."

export default function LandingPage() {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Clear onboarding state when landing on home page - always start fresh
  useEffect(() => {
    const STORAGE_KEY = 'vita_onboarding_state';
    localStorage.removeItem(STORAGE_KEY);
    // Also clear land digitization data if exists
    localStorage.removeItem('vita_land_digitization_data');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <i className="ri-leaf-line text-white text-xl sm:text-2xl"></i>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">GreenLight VITA</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Rừng Dược Sinh</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-gray-700 hover:text-emerald-600 transition-colors">Giới thiệu</a>
              <a href="#vita-standard" onClick={(e) => { e.preventDefault(); scrollToSection('vita-standard'); }} className="text-gray-700 hover:text-emerald-600 transition-colors">Tiêu chuẩn VITA</a>
              <a href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToSection('ecosystem'); }} className="text-gray-700 hover:text-emerald-600 transition-colors">Hệ sinh thái</a>
              <a href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToSection('ecosystem'); }} className="text-gray-700 hover:text-emerald-600 transition-colors">Nền tảng</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-700 hover:text-emerald-600 transition-colors">Liên hệ</a>
              <button onClick={() => navigate('/htx-benefits')} className="text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                Quyền lợi HTX
              </button>
              <button onClick={() => navigate('/home')} className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                Truy cập VITA PLATFORM
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
            >
              <i className={`${showMobileMenu ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-3">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Giới thiệu</a>
              <a href="#vita-standard" onClick={(e) => { e.preventDefault(); scrollToSection('vita-standard'); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Tiêu chuẩn VITA</a>
              <a href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToSection('ecosystem'); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Hệ sinh thái</a>
              <a href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToSection('ecosystem'); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Nền tảng</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Liên hệ</a>
              <button onClick={() => { navigate('/htx-benefits'); setShowMobileMenu(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 transition-colors">Quyền lợi HTX</button>
              <button onClick={() => navigate('/home')} className="w-full px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                Truy cập VITA PLATFORM
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image Layer - z-0 (ở dưới cùng) */}
        <div className="absolute inset-0 z-0">
          {/* Ảnh nền - có thể thay đổi URL hoặc dùng ảnh local */}
          <img 
            src={HERO_BACKGROUND_IMAGE}
            alt="Rừng dược sinh - Hệ sinh thái nông nghiệp bền vững"
            className="w-full h-full object-cover object-top"
            loading="eager"
            onError={(e) => {
              // Fallback nếu ảnh không load được
              console.warn('Hero background image failed to load, using fallback');
              e.currentTarget.src = '/images/hero-background-fallback.jpg';
            }}
          />
          {/* Gradient Overlay - tạo độ tối để text dễ đọc */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
          {/* Animated overlay pattern - tạo texture nhẹ */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <i className="ri-sparkling-line text-emerald-300"></i>
            <span>Hạ tầng An sinh Xã hội Số (Digital Social Welfare Infrastructure)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            VITA PLATFORM<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, letterSpacing: '0.03em' }}>
              HỆ SINH THÁI KINH TẾ RỪNG DƯỢC SINH
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Kiến tạo <span className="text-emerald-300">6 Trụ cột An sinh Toàn diện</span> cho Cộng đồng
          </p>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Không chỉ là một giải pháp công nghệ, VITA là hệ sinh thái kinh tế rừng dược sinh<br className="hidden sm:block" />
            <span className="text-emerald-200">Tạo ra hạ tầng An sinh Xã hội Số • Đồng hành cùng con người qua mọi giai đoạn cuộc đời</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/onboarding')}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Khám phá hệ sinh thái</span>
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <i className="ri-arrow-down-line text-white text-2xl opacity-60"></i>
        </div>
      </section>

      {/* Ecosystem Section: 6 nhóm + Flow dọc (mobile) / Bánh xe (desktop) - ngay dưới Hero */}
      <section id="ecosystem">
        <EcosystemSection />
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">6 Chức năng An sinh Toàn diện</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hệ thống VITA không sinh ra để "thu phí", mà sinh ra để cung cấp 6 lớp bảo vệ (Safety Nets) cho người tham gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-emerald-500">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-money-dollar-circle-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. An sinh về Sinh kế</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Làm gì để ăn?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mô hình đa tầng tán: Dược liệu ngắn ngày nuôi cây gỗ dài ngày. Bao tiêu đảm bảo, thu nhập đều đặn hàng tháng.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-wallet-3-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. An sinh về Tài chính</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Lấy vốn đâu? Có bị quỵt tiền không?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tín dụng sản xuất dựa trên dữ liệu, BNPL cho vật tư, Split Payment tự động - không ai bị chiếm dụng vốn.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-book-open-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. An sinh về Tri thức</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Làm thế nào cho đúng?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                SOP từ chuyên gia trong App, đào tạo KOL về ESG, xóa mù công nghệ cho bà con vùng cao.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. An sinh về Sức khỏe</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Ăn gì cho sạch? Sống ở đâu cho khỏe?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dược liệu dược tính cao, truy xuất minh bạch. Quy trình hữu cơ/vi sinh bảo vệ sức khỏe nông dân.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-amber-500">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-time-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. An sinh về Tương lai & Hưu trí</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Về già sống bằng gì?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sổ tiết kiệm Xanh đa kỳ hạn: Cây gỗ quý (của để dành), cây tinh dầu (lương hưu thụ động), Hưu trí Carbon.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-pink-500">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-community-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. An sinh về Tinh thần & Kết nối</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Giải quyết:</strong> "Đời sống tinh thần có phong phú không?"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Du lịch Hoa Dược Liệu, bảo tồn văn hóa bản địa, kết nối cộng đồng, niềm tự hào về sản phẩm tử tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VITA Standard Section */}
      <section id="vita-standard" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tiêu Chuẩn VITA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              4 trụ cột đảm bảo chất lượng và tính bền vững của hệ sinh thái Rừng Dược Sinh
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">V</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Vitality</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Sức Sống</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Hàm lượng hoạt chất đạt chuẩn Dược điển Việt Nam, đảm bảo hiệu quả điều trị
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Integrity</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Toàn Vẹn</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Không hóa chất độc hại, canh tác sinh học, an toàn cho sức khỏe và môi trường
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Trust</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Tin Cậy</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Truy xuất nguồn gốc 100% bằng QR Code, minh bạch từ vùng trồng đến người tiêu dùng
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Accountability</h3>
              <p className="text-sm text-gray-600 text-center mb-3">Trách Nhiệm</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Mỗi bên trong chuỗi giá trị đều có trách nhiệm rõ ràng, đảm bảo chất lượng tổng thể
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      {/* Policy Support Section - Link to dedicated page */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Chính Sách Quốc Gia Hỗ Trợ</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Hệ sinh thái Rừng Dược Sinh được hỗ trợ bởi các chính sách ưu đãi của Nhà nước
            </p>
            <button
              onClick={() => navigate('/policy-support')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
            >
              Xem chi tiết các chính sách hỗ trợ
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Lộ Trình Phát Triển</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
              Từ thí điểm đến mở rộng toàn quốc, xây dựng hệ sinh thái dược liệu hàng đầu Việt Nam
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Áp dụng chiến lược "Tech-Smart" - Tích hợp API bên thứ 3 để tối ưu chi phí và đẩy nhanh tốc độ triển khai
            </p>
          </div>

          <div className="space-y-6">
            {/* Giai đoạn 1 - Đang triển khai */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-2xl border-l-4 border-emerald-500 shadow-md relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                Đang triển khai
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 1 (2024-2025): Thí điểm & Xây dựng Nền tảng</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Triển khai tại Kon Tum, Phú Thọ, Hòa Bình với <strong>500ha</strong>, <strong>5 HTX</strong>, <strong>200 hộ nông dân</strong>. 
                    Xây dựng hệ thống nền tảng VITA với đầy đủ các module cốt lõi.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">Platform Core</span>
                      </div>
                      <p className="text-sm text-gray-600">VITA Farmer, Admin, Research, Partner, Expert Hub</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">Module Mới</span>
                      </div>
                      <p className="text-sm text-gray-600">VITA Supply, HTX Brand Hub, Subscription Engine, Skill Bank</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-fill text-emerald-600"></i>
                        <span className="font-semibold text-gray-900">API Integration</span>
                      </div>
                      <p className="text-sm text-gray-600">ezCloud, Haravan, Stringee, FPT.AI, Goship, Mapbox</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-checkbox-circle-line text-gray-400"></i>
                        <span className="font-semibold text-gray-700">Hợp đồng B2B</span>
                      </div>
                      <p className="text-sm text-gray-600">Ký hợp đồng với 3-5 doanh nghiệp dược phẩm</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ Platform Core</span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ API Integration Hub</span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">✅ Landing Pages</span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-200">🔄 Chuẩn hóa SOP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giai đoạn 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-l-4 border-blue-500 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 2 (2026-2027): Mở rộng Vùng Miền</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Nhân rộng ra <strong>10 tỉnh miền núi phía Bắc</strong>, đạt <strong>5,000ha</strong>, <strong>50 HTX</strong>, 
                    <strong> 2,000 hộ nông dân</strong>. Xây dựng chuỗi giá trị hoàn chỉnh từ sản xuất đến tiêu thụ.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-building-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Hạ tầng</span>
                      </div>
                      <p className="text-sm text-gray-600">2 Trung tâm Sơ chế, 5 Kho trung chuyển</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-handshake-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Đối tác</span>
                      </div>
                      <p className="text-sm text-gray-600">Hợp tác 20+ Doanh nghiệp B2B</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-global-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">Xuất khẩu</span>
                      </div>
                      <p className="text-sm text-gray-600">Xuất khẩu thử nghiệm sang Thái Lan, Singapore</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-leaf-line text-blue-600"></i>
                        <span className="font-semibold text-gray-900">ESG & Carbon</span>
                      </div>
                      <p className="text-sm text-gray-600">Chứng nhận Carbon Credit đầu tiên</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Trung tâm Sơ chế</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Hợp tác B2B</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Xuất khẩu</span>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Carbon Credit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giai đoạn 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 sm:p-8 rounded-2xl border-l-4 border-purple-500 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Giai đoạn 3 (2028+): Toàn quốc & Quốc tế</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Phủ sóng <strong>toàn quốc 50,000ha</strong>, <strong>500 HTX</strong>, <strong>20,000 hộ nông dân</strong>. 
                    Trở thành <strong>nền tảng dược liệu hàng đầu Đông Nam Á</strong> với chuỗi giá trị hoàn chỉnh.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-flask-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Trung tâm Gen</span>
                      </div>
                      <p className="text-sm text-gray-600">Trung tâm Gen công nghệ cao, nghiên cứu & phát triển giống mới</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-ship-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Xuất khẩu</span>
                      </div>
                      <p className="text-sm text-gray-600">Xuất khẩu quy mô lớn sang Trung Quốc, Nhật Bản, Hàn Quốc</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-line-chart-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">IPO</span>
                      </div>
                      <p className="text-sm text-gray-600">IPO trên thị trường chứng khoán Việt Nam</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-earth-line text-purple-600"></i>
                        <span className="font-semibold text-gray-900">Mở rộng khu vực</span>
                      </div>
                      <p className="text-sm text-gray-600">Mở rộng sang Lào, Campuchia, Myanmar</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Trung tâm Gen</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Xuất khẩu quy mô lớn</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">IPO</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Mở rộng khu vực</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Đối tác Chiến lược Dự kiến</h2>
            <p className="text-lg text-gray-600 mb-2">Cùng xây dựng hệ sinh thái dược liệu bền vững</p>
            <p className="text-sm text-gray-500">Các đối tác tiềm năng trong chuỗi giá trị dược liệu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                name: 'Viện Dược Liệu',
                nameEn: 'National Institute of Medicinal Materials',
                logo: 'https://readdy.ai/api/search-image?query=National%20Institute%20of%20Medicinal%20Materials%20Vietnam%20official%20logo%20medical%20research%20institution%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-immm-001&orientation=landscape',
                description: 'Nghiên cứu & Phát triển dược liệu'
              },
              {
                name: 'Traphaco',
                nameEn: 'Traphaco Joint Stock Company',
                logo: 'https://readdy.ai/api/search-image?query=Traphaco%20pharmaceutical%20company%20Vietnam%20official%20logo%20traditional%20medicine%20brand%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-traphaco-001&orientation=landscape',
                description: 'Sản xuất & Phân phối dược phẩm'
              },
              {
                name: 'Nam Dược',
                nameEn: 'Nam Duoc Pharmaceutical Company',
                logo: 'https://readdy.ai/api/search-image?query=Nam%20Duoc%20pharmaceutical%20company%20Vietnam%20official%20logo%20herbal%20medicine%20brand%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-namduoc-001&orientation=landscape',
                description: 'Sản xuất dược liệu & Thực phẩm chức năng'
              },
              {
                name: 'Học viện Nông nghiệp',
                nameEn: 'Vietnam National University of Agriculture',
                logo: 'https://readdy.ai/api/search-image?query=Vietnam%20National%20University%20of%20Agriculture%20VNUA%20official%20logo%20agricultural%20education%20institution%20professional%20design%20clean%20white%20background&width=300&height=200&seq=partner-vnua-001&orientation=landscape',
                description: 'Đào tạo & Nghiên cứu nông nghiệp'
              }
            ].map((partner, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="aspect-video bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain p-3"
                    onError={(e) => {
                      // Fallback nếu logo không load được
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement;
                      if (fallback) {
                        fallback.innerHTML = `<div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center"><i class="ri-building-line text-white text-2xl"></i></div></div>`;
                      }
                    }}
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-1">{partner.name}</h3>
                <p className="text-xs text-gray-500 text-center mb-2">{partner.nameEn}</p>
                <p className="text-xs text-gray-600 text-center">{partner.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Partners Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
              <i className="ri-information-line"></i>
              <span>Danh sách đối tác đang được mở rộng và cập nhật thường xuyên</span>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tin Tức & Sự Kiện</h2>
            <p className="text-lg text-gray-600 mb-2">Cập nhật mới nhất về hệ sinh thái Rừng Dược Sinh</p>
            <p className="text-sm text-gray-500">Theo dõi hành trình phát triển của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                title: 'Khởi động dự án thí điểm tại Kon Tum', 
                date: '15/01/2024',
                category: 'Dự án',
                image: 'https://readdy.ai/api/search-image?query=Vietnamese+highland+farmers+planting+ginseng+seedlings+under+forest+canopy+in+Kon+Tum+province+showing+community+cooperation+sustainable+agroforestry+mountain+landscape+natural+green+environment&width=600&height=400&seq=news-kontum-001&orientation=landscape',
                description: 'Triển khai dự án thí điểm tại HTX Măng Ri với diện tích 245ha, 187 thành viên'
              },
              { 
                title: 'Ký kết hợp tác chiến lược với Viện Dược Liệu', 
                date: '20/01/2024',
                category: 'Hợp tác',
                image: 'https://readdy.ai/api/search-image?query=Official+signing+ceremony+partnership+agreement+between+Vietnamese+agricultural+cooperative+and+National+Institute+of+Medicinal+Materials+with+documents+handshake+professional+conference+room+modern+business+setting&width=600&height=400&seq=news-partnership-001&orientation=landscape',
                description: 'Hợp tác nghiên cứu và phát triển giống dược liệu chất lượng cao'
              },
              { 
                title: 'Đào tạo kỹ thuật canh tác cho 200 nông dân', 
                date: '25/01/2024',
                category: 'Đào tạo',
                image: 'https://readdy.ai/api/search-image?query=Training+workshop+Vietnamese+farmers+learning+medicinal+plant+cultivation+techniques+in+traditional+community+hall+with+expert+instructor+teaching+group+participants+hands-on+practical+agricultural+education&width=600&height=400&seq=news-training-001&orientation=landscape',
                description: 'Khóa đào tạo về quy trình canh tác hữu cơ và ứng dụng công nghệ IoT'
              },
              { 
                title: 'Ra mắt VITA Supply - Sàn cung ứng vật tư', 
                date: '05/02/2024',
                category: 'Sản phẩm',
                image: 'https://readdy.ai/api/search-image?query=Agricultural+supply+chain+warehouse+Vietnamese+cooperative+storage+facility+with+organic+fertilizers+packages+equipment+modern+logistics+distribution+center+professional+business+setting&width=600&height=400&seq=news-supply-001&orientation=landscape',
                description: 'Sàn cung ứng vật tư giá sỉ với chính sách trả chậm vụ sau'
              },
              { 
                title: 'Tích hợp API ezCloud cho Tourism PMS', 
                date: '12/02/2024',
                category: 'Công nghệ',
                image: 'https://readdy.ai/api/search-image?query=Modern+technology+integration+API+connection+cloud+computing+system+Vietnamese+eco-tourism+platform+digital+transformation+smart+agriculture+tech+innovation+professional+setting&width=600&height=400&seq=news-api-001&orientation=landscape',
                description: 'Kết nối với ezCloud để quản lý booking du lịch qua các kênh OTA'
              },
              { 
                title: 'Vườn Sâm Ngọc Linh đạt chứng nhận Organic', 
                date: '18/02/2024',
                category: 'Chứng nhận',
                image: 'https://readdy.ai/api/search-image?query=Vietnamese+ginseng+Ngoc+Linh+farm+organic+certification+ceremony+green+healthy+plants+forest+environment+sustainable+agriculture+high-quality+medicinal+herbs+natural+cultivation&width=600&height=400&seq=news-cert-001&orientation=landscape',
                description: 'HTX Măng Ri nhận chứng nhận hữu cơ cho 100ha vườn Sâm Ngọc Linh'
              }
            ].map((news, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={news.image}
                    alt={news.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://readdy.ai/api/search-image?query=Vietnamese+agricultural+news+event+modern+professional+photography&width=600&height=400&seq=news-fallback-${index}&orientation=landscape`;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                      {news.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="ri-calendar-line text-emerald-600"></i>
                    <p className="text-sm text-emerald-600 font-medium">{news.date}</p>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {news.description}
                  </p>
                  <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm group/btn">
                    <span>Đọc thêm</span>
                    <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button type="button" onClick={() => scrollToSection('contact')} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2">
              <span>Xem tất cả tin tức</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn tham gia vào hệ sinh thái Rừng Dược Sinh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Hotline</h3>
              <p className="text-white/90">1900 xxxx</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-white/90">info@greenlight-vita.vn</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-2">Địa chỉ</h3>
              <p className="text-white/90">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <i className="ri-leaf-line text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">GreenLight VITA</h3>
              </div>
              <p className="text-gray-400 text-sm">Hệ sinh thái dược liệu bền vững</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Về chúng tôi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-white transition-colors">Giới thiệu</a></li>
                <li><a href="#vita-standard" onClick={(e) => { e.preventDefault(); scrollToSection('vita-standard'); }} className="hover:text-white transition-colors">Tiêu chuẩn VITA</a></li>
                <li><a href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToSection('ecosystem'); }} className="hover:text-white transition-colors">Hệ sinh thái</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigate('/htx-benefits')} className="hover:text-white transition-colors">Quyền lợi HTX</button></li>
                <li><button onClick={() => navigate('/forest-owner-register')} className="hover:text-white transition-colors">Đăng ký Chủ rừng</button></li>
                <li><button onClick={() => navigate('/cooperative/onboarding')} className="hover:text-white transition-colors">Đăng ký HTX</button></li>
                <li><button onClick={() => navigate('/enterprise-register')} className="hover:text-white transition-colors">Đăng ký Doanh nghiệp</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Hotline: 1900 xxxx (Đang cập nhật)</li>
                <li>Email: info@greenlight-vita.vn</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2024–2025 GreenLight VITA. All rights reserved.</p>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Powered by Đắc Lực Tech
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
