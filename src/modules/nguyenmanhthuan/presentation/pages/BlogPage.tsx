import { Link } from 'react-router-dom';
import { blogPosts } from '../../domain/blogPosts';
import Footer from '../components/Footer';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-6">
              <Link
                to="/nguyen-manh-thuan"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <i className="ri-arrow-left-line w-5 h-5" />
                <span>Về trang chủ</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bài viết & Tin tức
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những chia sẻ và phân tích chuyên sâu về nông nghiệp, thị trường và phát triển bền vững từ anh Nguyễn Mạnh Thuần
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((blog) => (
              <Link
                key={blog.id}
                to={`/nguyen-manh-thuan/blog/${blog.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group block"
              >
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
                    <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2" />
                    <span>{blog.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all">
                    <span>Đọc thêm</span>
                    <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
