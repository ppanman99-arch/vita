import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../../domain/blogPosts';
import Footer from '../components/Footer';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return <Navigate to="/nguyen-manh-thuan/blog" replace />;
  }

  const paragraphs = post.content
    ? post.content.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-white">
      <article className="pb-20">
        <div className="max-w-4xl mx-auto px-6 pt-10 sm:pt-14">
          <Link
            to="/nguyen-manh-thuan/blog"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium transition-colors text-sm sm:text-base mb-8"
          >
            <i className="ri-arrow-left-line w-5 h-5" />
            <span>Về danh sách bài viết</span>
          </Link>
        </div>

        {post.heroImage && (
          <div className="max-w-4xl mx-auto px-6 mb-10">
            <figure className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={post.heroImage}
                alt=""
                className="w-full h-auto object-contain bg-gray-50"
              />
            </figure>
          </div>
        )}

        <header className="max-w-3xl mx-auto px-6 mb-10 text-center">
          <span className="inline-block bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
          <time
            dateTime={post.date}
            className="block text-gray-500 text-sm sm:text-base mb-3"
          >
            {post.date}
          </time>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="max-w-3xl mx-auto px-6">
          {paragraphs.length > 0 ? (
            <div className="space-y-6 text-gray-800">
              {paragraphs.map((para, i) => {
                const lines = para.split('\n').filter(Boolean);
                const isSignature = lines.length <= 3 && para.includes('Trân trọng');
                return (
                  <div key={i} className={isSignature ? 'pt-6' : ''}>
                    {lines.length > 1 ? (
                      <p className="text-[1.0625rem] leading-[1.75]">
                        {lines.map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ) : (
                      <p className="text-[1.0625rem] leading-[1.75]">{para}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
