
import { useEffect, useRef, useState } from 'react';

export default function VitaEcosystem() {
  const [visibleLayers, setVisibleLayers] = useState([1]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const layer = parseInt(entry.target.getAttribute('data-layer') || '1');
            setVisibleLayers((prev) => {
              if (!prev.includes(layer)) {
                return [...prev, layer].sort();
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const layerElements = sectionRef.current?.querySelectorAll('[data-layer]');
    layerElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const layers = [
    {
      id: 1,
      title: 'ĐẦU VÀO & NGUỒN LỰC',
      subtitle: 'INPUT & RESOURCES',
      description: 'Nơi khởi nguồn của sự sống và nguồn lực. VITA số hóa và kết nối các nguồn lực rời rạc để sẵn sàng cho sản xuất lớn.',
      message: 'Tài nguyên được Số hóa & Tập hợp',
      icon: 'ri-seedling-line',
      portals: [
        { name: 'Portal Chủ Rừng & Chủ Đất', desc: 'Cung cấp tư liệu sản xuất', icon: 'ri-plant-line', color: 'from-green-500 to-emerald-600' },
        { name: 'Portal Nông dân & Cộng sự', desc: 'Cung cấp sức lao động', icon: 'ri-user-3-line', color: 'from-blue-500 to-cyan-600' },
        { name: 'Portal Xã viên Góp vốn', desc: 'Cung cấp tài chính vi mô', icon: 'ri-money-dollar-circle-line', color: 'from-yellow-500 to-amber-600' }
      ]
    },
    {
      id: 2,
      title: 'TỔ CHỨC SẢN XUẤT & CHẾ BIẾN',
      subtitle: 'PRODUCTION & PROCESSING',
      description: '"Bộ não" điều phối tại địa phương và "Trái tim" sản xuất công nghiệp. Biến tài nguyên thô thành sản phẩm thương mại.',
      message: 'Sản phẩm được Hình thành',
      icon: 'ri-settings-3-line',
      portals: [
        { name: 'Portal Quản trị Hợp tác xã', desc: 'Quản lý mùa vụ, nhân sự, dòng tiền', icon: 'ri-community-line', color: 'from-orange-500 to-red-600' },
        { name: 'Portal Nhà máy & Đối tác Thu mua', desc: 'Sản xuất, đóng gói, logistics', icon: 'ri-building-line', color: 'from-purple-500 to-pink-600' }
      ]
    },
    {
      id: 3,
      title: 'KHOA HỌC & TIÊU CHUẨN',
      subtitle: 'SCIENCE & STANDARDS - THE CORE',
      description: 'Bộ lọc chất lượng tuyệt đối. Đảm bảo mọi sản phẩm từ VITA đều minh bạch, an toàn và có hàm lượng tri thức cao.',
      message: 'Giá trị được Xác thực',
      icon: 'ri-shield-check-line',
      portals: [
        { name: 'Portal R&D Center', desc: 'Cung cấp giống gen, quy trình công nghệ', icon: 'ri-flask-line', color: 'from-indigo-500 to-blue-600' },
        { name: 'Hệ thống VITA Standards & Phòng Lab', desc: 'Kiểm nghiệm, cấp chứng chỉ COA, ESG', icon: 'ri-file-check-line', color: 'from-teal-500 to-green-600' }
      ]
    },
    {
      id: 4,
      title: 'ĐẦU RA & THƯƠNG MẠI HÓA',
      subtitle: 'OUTPUT & MARKET',
      description: 'Đích đến của giá trị. Nơi sản phẩm tiếp cận người dùng cuối thông qua đa kênh phân phối hiện đại.',
      message: 'Giá trị được Lan tỏa & Tái đầu tư',
      icon: 'ri-shopping-cart-line',
      portals: [
        { name: 'Portal Creator Hub', desc: 'KOL/KOC bán hàng qua câu chuyện', icon: 'ri-video-line', color: 'from-pink-500 to-rose-600' },
        { name: 'Portal Thầy thuốc', desc: 'Bác sĩ/Lương y ứng dụng điều trị', icon: 'ri-medicine-bottle-line', color: 'from-red-500 to-orange-600' },
        { name: 'Portal Doanh nghiệp B2B & ESG', desc: 'Mua sỉ, mua tín chỉ Carbon', icon: 'ri-building-2-line', color: 'from-cyan-500 to-blue-600' },
        { name: 'Portal Xã viên Mua sắm', desc: 'Người dùng cuối', icon: 'ri-shopping-bag-line', color: 'from-amber-500 to-yellow-600' }
      ]
    },
    {
      id: 5,
      title: 'QUẢN TRỊ VĨ MÔ',
      subtitle: 'GOVERNANCE - THE OVERSIGHT',
      description: 'Cánh tay nối dài của Chính phủ để giám sát quy hoạch, thuế và an sinh xã hội.',
      message: 'Tất cả vận hành minh bạch',
      icon: 'ri-government-line',
      portals: [
        { name: 'Portal GOV', desc: 'Giám sát tính minh bạch, Thu thuế tự động, Quản lý quy hoạch vùng trồng', icon: 'ri-file-shield-line', color: 'from-slate-500 to-gray-700' }
      ]
    }
  ];

  const layerMessages = [
    'Mọi thứ bắt đầu từ Rừng và Người dân bản địa...',
    '...được tổ chức bài bản qua mô hình Hợp tác xã kiểu mới và Nhà máy hiện đại...',
    '...nhưng sự khác biệt nằm ở Hàm lượng Khoa học và Tiêu chuẩn VITA nghiêm ngặt...',
    '...để mang đến sản phẩm chuẩn mực cho Bác sĩ, Creator và Người tiêu dùng.',
    'Tất cả vận hành minh bạch dưới sự giám sát của Chính phủ và Cộng đồng.'
  ];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-emerald-50 via-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block bg-emerald-100 border-2 border-emerald-500 rounded-full px-4 sm:px-6 py-2 mb-4">
            <p className="text-emerald-800 font-semibold text-xs sm:text-sm uppercase tracking-wide">
              MÔ HÌNH VẬN HÀNH HỆ SINH THÁI
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Kết nối Giá trị - Kiến tạo Thịnh vượng
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            Hệ sinh thái khép kín từ Rừng đến Phố, được vận hành bởi Dữ liệu và Khoa học.
          </p>
        </div>

        {/* Layers */}
        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {layers.map((layer, index) => {
            const isVisible = visibleLayers.includes(layer.id);
            const message = layerMessages[index];

            return (
              <div
                key={layer.id}
                data-layer={layer.id}
                className={`transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-30 translate-y-8'
                }`}
              >
                {/* Layer Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${layer.portals[0]?.color || 'from-gray-500 to-gray-700'} flex items-center justify-center text-white shadow-lg`}>
                      <i className={`${layer.icon} text-2xl sm:text-3xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        TẦNG {layer.id}: {layer.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 italic">{layer.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">
                    {layer.description}
                  </p>
                  {message && (
                    <p className="text-sm sm:text-base text-emerald-700 font-semibold italic">
                      {message}
                    </p>
                  )}
                </div>

                {/* Portals Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {layer.portals.map((portal, portalIndex) => (
                    <div
                      key={portalIndex}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border-2 ${
                        isVisible ? 'border-gray-200 hover:border-emerald-400' : 'border-gray-100'
                      } hover:scale-105 cursor-pointer`}
                    >
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-white mb-3 sm:mb-4 shadow-md`}>
                        <i className={`${portal.icon} text-2xl sm:text-3xl`}></i>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        {portal.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {portal.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Connection Arrow (except last layer) */}
                {index < layers.length - 1 && (
                  <div className="flex justify-center my-6 sm:my-8">
                    <div className={`w-1 h-12 sm:h-16 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ${
                      isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-emerald-300">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            HỆ SINH THÁI VITA: TỪ ĐẤT MẸ ĐẾN SỨC KHỎE CỘNG ĐỒNG
          </h3>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            VITA không chỉ là một ứng dụng, đó là một nền tảng hợp nhất 5 trụ cột của nền kinh tế dược liệu:
          </p>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-1 shrink-0"></i>
              <span><strong>Huy động Nguồn lực (Resource):</strong> Kết nối Đất đai, Nông dân và Nguồn vốn nhàn rỗi để tạo ra vùng nguyên liệu khổng lồ.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-1 shrink-0"></i>
              <span><strong>Sản xuất Thông minh (Production):</strong> Vận hành qua Hợp tác xã số và Nhà máy liên kết, tối ưu hóa quy trình từ gieo trồng đến đóng gói.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-1 shrink-0"></i>
              <span><strong>Bảo chứng Khoa học (Standard):</strong> Ứng dụng công nghệ Gen và quy trình R&D tiêu chuẩn quốc tế để đảm bảo chất lượng dược tính cao nhất.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-1 shrink-0"></i>
              <span><strong>Đa dạng Đầu ra (Output):</strong> Phân phối qua mạng lưới Creator, Thầy thuốc và Doanh nghiệp B2B, đưa sản phẩm đến tay người dùng với giá trị thực.</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mt-1 shrink-0"></i>
              <span><strong>Minh bạch Quản trị (Governance):</strong> Hỗ trợ Chính phủ quản lý quy hoạch, thuế và an sinh xã hội trên một nền tảng dữ liệu duy nhất.</span>
            </li>
          </ul>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-800 font-semibold text-center">
            Dù bạn là ai - Nông dân, Bác sĩ, Nhà đầu tư hay Creator - đều có một vị trí quan trọng trong dòng chảy thịnh vượng này.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <a 
            href="https://vitacoop.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Khám phá Hệ sinh thái VITA
          </a>
        </div>
      </div>
    </section>
  );
}
