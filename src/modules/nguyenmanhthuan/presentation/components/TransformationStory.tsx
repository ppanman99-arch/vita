

export default function TransformationStory() {
  const timeline = [
    {
      period: 'Quá khứ',
      year: '2022-2025',
      title: 'Dự án GreenLight',
      description: 'Khởi đầu với dự án trồng rừng. Sự ủng hộ của bạn qua Điểm Green đã giúp chúng tôi vượt qua giai đoạn khó khăn nhất.',
      icon: 'ri-seedling-line',
      color: 'from-green-400 to-green-600',
      image: 'https://readdy.ai/api/search-image?query=Young%20medicinal%20herb%20seedlings%20being%20planted%20in%20organized%20rows%20in%20Vietnamese%20highland%20soil%2C%20farmers%20working%20carefully%20with%20small%20plants%2C%20early%20morning%20mist%2C%20hopeful%20beginning%20atmosphere%2C%20natural%20documentary%20photography%20style%2C%20soft%20green%20and%20brown%20earth%20tones%2C%20detailed%20close-up%20shots&width=600&height=400&seq=timeline001&orientation=landscape'
    },
    {
      period: 'Hiện tại',
      year: '2026-2030',
      title: 'VITA Platform Ra mắt',
      description: 'Chuyển mình thành nền tảng công nghệ lõi cho Nông nghiệp & Dược liệu. Hệ sinh thái 8 Portals đã sẵn sàng vận hành.',
      icon: 'ri-rocket-line',
      color: 'from-emerald-500 to-teal-600',
      image: 'https://readdy.ai/api/search-image?query=Modern%20technology%20platform%20interface%20displayed%20on%20multiple%20screens%20showing%20agricultural%20data%20and%20medicinal%20herb%20management%20systems%2C%20sleek%20digital%20dashboard%20with%20green%20and%20blue%20interface%20elements%2C%20professional%20tech%20company%20office%20environment%2C%20contemporary%20business%20photography%2C%20clean%20minimalist%20aesthetic&width=600&height=400&seq=timeline002&orientation=landscape'
    },
    {
      period: 'Tương lai',
      year: '2030+',
      title: 'IPO & Mở rộng Quốc gia',
      description: 'Niêm yết công ty, mở rộng quy mô toàn quốc. Giá trị cổ phần của bạn sẽ tăng trưởng theo định giá thị trường.',
      icon: 'ri-line-chart-line',
      color: 'from-yellow-400 to-amber-600',
      image: 'https://readdy.ai/api/search-image?query=Futuristic%20Vietnamese%20agricultural%20technology%20company%20headquarters%20building%20with%20modern%20glass%20architecture%2C%20expansive%20medicinal%20herb%20plantations%20visible%20in%20background%2C%20aerial%20drone%20view%2C%20prosperous%20growth%20symbolism%2C%20golden%20hour%20lighting%2C%20inspirational%20corporate%20photography%20style%2C%20vibrant%20colors&width=600&height=400&seq=timeline003&orientation=landscape'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Câu chuyện Chuyển mình
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Sự tin tưởng của bạn ngày ấy, nay chúng tôi trả lại bằng cổ phần của một Doanh nghiệp Công nghệ - Nông nghiệp hàng đầu.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 via-emerald-500 to-yellow-400" />
          
          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } relative`}
              >
                <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-4 h-4 bg-white border-4 border-green-500 rounded-full -translate-x-1/2 lg:relative lg:left-auto lg:transform-none lg:hidden" />
                
                <div className="flex-1 w-full pl-20 sm:pl-0">
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0`}>
                        <i className={`${item.icon} text-2xl sm:text-3xl`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {item.period}
                        </div>
                        <div className="text-base sm:text-lg font-bold text-gray-700">
                          {item.year}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex-1 w-full pl-20 sm:pl-0">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
