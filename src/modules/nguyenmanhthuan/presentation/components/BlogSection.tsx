
export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: 'Xu hướng nông nghiệp hữu cơ và cơ hội đầu tư bền vững',
      excerpt: 'Phân tích sâu về tiềm năng phát triển của nông nghiệp hữu cơ tại Việt Nam và những cơ hội đầu tư hấp dẫn trong lĩnh vực này.',
      date: '15/01/2024',
      category: 'Nông nghiệp',
      image: 'https://readdy.ai/api/search-image?query=organic%20farming%20in%20vietnam%20with%20lush%20green%20fields%20and%20farmers%20working%20with%20sustainable%20agricultural%20practices%20modern%20technology%20integration%20beautiful%20natural%20lighting&width=800&height=500&seq=blog1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Thị trường dược liệu Việt Nam: Tiềm năng và thách thức',
      excerpt: 'Đánh giá toàn diện về thị trường dược liệu trong nước và quốc tế, cùng những định hướng phát triển bền vững cho ngành.',
      date: '10/01/2024',
      category: 'Thị trường',
      image: 'https://readdy.ai/api/search-image?query=vietnamese%20medicinal%20herbs%20and%20plants%20in%20natural%20forest%20setting%20with%20traditional%20medicine%20elements%20modern%20cultivation%20methods%20bright%20natural%20environment&width=800&height=500&seq=blog2&orientation=landscape'
    },
    {
      id: 3,
      title: 'Mô hình rừng dược sinh: Giải pháp tối ưu cho phát triển bền vững',
      excerpt: 'Chia sẻ kinh nghiệm xây dựng và vận hành mô hình rừng dược sinh hiệu quả, kết hợp bảo vệ môi trường và phát triển kinh tế.',
      date: '05/01/2024',
      category: 'Nông nghiệp',
      image: 'https://readdy.ai/api/search-image?query=sustainable%20medicinal%20forest%20ecosystem%20with%20diverse%20plant%20species%20natural%20biodiversity%20conservation%20modern%20agricultural%20innovation%20peaceful%20green%20environment&width=800&height=500&seq=blog3&orientation=landscape'
    },
    {
      id: 4,
      title: 'ESG và trách nhiệm xã hội trong nông nghiệp hiện đại',
      excerpt: 'Tầm quan trọng của ESG trong phát triển nông nghiệp bền vững và cách doanh nghiệp có thể áp dụng hiệu quả.',
      date: '28/12/2023',
      category: 'Tin tức',
      image: 'https://readdy.ai/api/search-image?query=modern%20sustainable%20agriculture%20with%20environmental%20social%20governance%20concepts%20green%20technology%20community%20development%20clean%20natural%20setting&width=800&height=500&seq=blog4&orientation=landscape'
    },
    {
      id: 5,
      title: 'Hợp tác xã nông nghiệp: Mô hình phát triển cộng đồng',
      excerpt: 'Phân tích mô hình hợp tác xã trong nông nghiệp, lợi ích cho nông dân và cộng đồng, cùng những bài học kinh nghiệm thực tế.',
      date: '20/12/2023',
      category: 'Nông nghiệp',
      image: 'https://readdy.ai/api/search-image?query=agricultural%20cooperative%20community%20with%20farmers%20working%20together%20in%20green%20fields%20modern%20farming%20equipment%20collaborative%20spirit%20bright%20sunny%20day&width=800&height=500&seq=blog5&orientation=landscape'
    },
    {
      id: 6,
      title: 'Công nghệ số trong nông nghiệp: Cách mạng 4.0',
      excerpt: 'Ứng dụng công nghệ số, AI và IoT trong nông nghiệp hiện đại, giúp tối ưu hóa năng suất và hiệu quả sản xuất.',
      date: '15/12/2023',
      category: 'Tin tức',
      image: 'https://readdy.ai/api/search-image?query=digital%20agriculture%20technology%20with%20smart%20farming%20systems%20IoT%20sensors%20modern%20equipment%20in%20green%20agricultural%20fields%20futuristic%20sustainable%20farming&width=800&height=500&seq=blog6&orientation=landscape'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bài viết & Tin tức
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những chia sẻ và phân tích chuyên sâu về nông nghiệp, thị trường và phát triển bền vững từ anh Nguyễn Mạnh Thuần
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all">
                  <span>Đọc thêm</span>
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
