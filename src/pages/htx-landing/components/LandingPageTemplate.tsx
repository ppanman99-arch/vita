import { useNavigate } from 'react-router-dom';
import { Cooperative } from '../../../data/cooperatives';

interface LandingPageTemplateProps {
  cooperative: Cooperative;
}

export default function LandingPageTemplate({ cooperative }: LandingPageTemplateProps) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="ri-plant-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{cooperative.shortName}</h1>
                <p className="text-xs text-gray-600">Rừng Dược Sinh</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${cooperative.contact.phone}`}
                className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <i className="ri-phone-line"></i>
                <span className="text-sm">{cooperative.contact.phone}</span>
              </a>
              <button
                onClick={() => navigate(`/login?role=cooperative&coop=${cooperative.id}`)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <i className="ri-login-box-line mr-2"></i>
                Đăng nhập Quản trị
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] overflow-hidden">
        <img
          src={cooperative.coverImage}
          alt={cooperative.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {cooperative.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mb-6">
              {cooperative.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const element = document.getElementById('products');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                <i className="ri-shopping-cart-line mr-2"></i>
                Xem Sản phẩm
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('tourism');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                <i className="ri-map-pin-line mr-2"></i>
                Du lịch & Trải nghiệm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {formatNumber(cooperative.stats.members)}
              </div>
              <div className="text-sm text-gray-600">Thành viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {cooperative.stats.area}
              </div>
              <div className="text-sm text-gray-600">Hecta đất</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {cooperative.stats.products}
              </div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {formatNumber(cooperative.stats.revenue / 1000000000)}T
              </div>
              <div className="text-sm text-gray-600">Doanh thu/năm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{cooperative.story.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{cooperative.story.content}</p>
              <div className="flex gap-4">
                {cooperative.social.facebook && (
                  <a
                    href={cooperative.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                )}
                {cooperative.social.zalo && (
                  <a
                    href={cooperative.social.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <i className="ri-message-3-fill"></i>
                  </a>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cooperative.story.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${cooperative.story.title} ${idx + 1}`}
                  className="rounded-lg shadow-lg object-cover h-48"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm Dược liệu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sản phẩm chất lượng cao, được trồng và chế biến theo tiêu chuẩn hữu cơ, đảm bảo an toàn và hiệu quả
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cooperative.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-sm text-gray-500">/{product.unit}</div>
                    </div>
                    <button
                      onClick={() => navigate(`/login?role=farmer&redirect=consumer&product=${product.id}`)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <i className="ri-shopping-cart-line mr-2"></i>
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section id="tourism" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Du lịch & Trải nghiệm</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá vẻ đẹp thiên nhiên, trải nghiệm văn hóa địa phương và tìm hiểu về dược liệu quý
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {cooperative.tourism.services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {service.type === 'tour' ? 'Tour' : service.type === 'homestay' ? 'Homestay' : 'Trải nghiệm'}
                    </span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(service.price)}
                    </div>
                    <button
                      onClick={() => {
                        // Navigate to booking or external OTA
                        if (service.type === 'homestay' && cooperative.tourism.otaLinks.agoda) {
                          window.open(cooperative.tourism.otaLinks.agoda, '_blank');
                        } else {
                          navigate(`/login?role=farmer&redirect=consumer&service=${service.id}`);
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* OTA Links */}
          {Object.keys(cooperative.tourism.otaLinks).length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Đặt phòng qua các kênh:</h3>
              <div className="flex flex-wrap gap-3">
                {cooperative.tourism.otaLinks.agoda && (
                  <a
                    href={cooperative.tourism.otaLinks.agoda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    <i className="ri-hotel-line mr-2"></i>
                    Agoda
                  </a>
                )}
                {cooperative.tourism.otaLinks.airbnb && (
                  <a
                    href={cooperative.tourism.otaLinks.airbnb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    <i className="ri-home-4-line mr-2"></i>
                    Airbnb
                  </a>
                )}
                {cooperative.tourism.otaLinks.traveloka && (
                  <a
                    href={cooperative.tourism.otaLinks.traveloka}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    <i className="ri-plane-line mr-2"></i>
                    Traveloka
                  </a>
                )}
                {cooperative.tourism.otaLinks.luxstay && (
                  <a
                    href={cooperative.tourism.otaLinks.luxstay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  >
                    <i className="ri-building-line mr-2"></i>
                    Luxstay
                  </a>
                )}
                <button
                  onClick={() => navigate(`/login?role=farmer&redirect=consumer&coop=${cooperative.id}`)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <i className="ri-vita-line mr-2"></i>
                  Đặt trực tiếp (Giảm 10%)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chứng nhận & Tiêu chuẩn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cooperative.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-md text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-verified-badge-line text-green-600 text-3xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Hãy liên hệ để được tư vấn về sản phẩm, dịch vụ du lịch hoặc hợp tác kinh doanh
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-3xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Điện thoại</h3>
              <a href={`tel:${cooperative.contact.phone}`} className="text-white/90 hover:text-white">
                {cooperative.contact.phone}
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-3xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${cooperative.contact.email}`} className="text-white/90 hover:text-white">
                {cooperative.contact.email}
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-3xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Địa chỉ</h3>
              <p className="text-white/90 text-sm">
                {cooperative.location.address}
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate(`/login?role=cooperative&coop=${cooperative.id}`)}
              className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              <i className="ri-dashboard-line mr-2"></i>
              Truy cập Bảng Quản trị
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 {cooperative.shortName}. Powered by VITA Platform.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Về VITA
              </a>
              <a
                href="/home"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Trang chủ
              </a>
              <button
                onClick={() => navigate(`/login?role=cooperative&coop=${cooperative.id}`)}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Quản trị
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



