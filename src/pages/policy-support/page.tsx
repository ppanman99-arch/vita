import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

export default function PolicySupportPage() {
  const navigate = useNavigate();

  const policies = [
    {
      id: 'nd-91-2021',
      title: 'Nghị định 91/2021/NĐ-CP',
      description: 'Chính sách phát triển lâm nghiệp bền vững',
      color: 'emerald',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ 30-50 triệu/ha cho trồng rừng dược liệu',
        'Ưu đãi thuế thu nhập doanh nghiệp',
      ],
    },
    {
      id: 'nd-131-2018',
      title: 'Nghị định 131/2018/NĐ-CP',
      description: 'Chính sách phát triển dược liệu',
      color: 'blue',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ vốn vay ưu đãi 0-3%/năm',
        'Miễn giảm thuế sử dụng đất nông nghiệp',
      ],
    },
    {
      id: 'luat-htx-2012',
      title: 'Luật Hợp tác xã 2012',
      description: 'Khuyến khích phát triển HTX',
      color: 'purple',
      icon: 'ri-file-text-line',
      benefits: [
        'Miễn thuế thu nhập doanh nghiệp 4 năm đầu',
        'Giảm 50% thuế 5 năm tiếp theo',
      ],
    },
    {
      id: 'nd-98-2018',
      title: 'Nghị định 98/2018/NĐ-CP',
      description: 'Khuyến khích phát triển HTX',
      color: 'amber',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ đào tạo, tư vấn miễn phí',
        'Hỗ trợ xây dựng thương hiệu, truy xuất nguồn gốc',
      ],
    },
    {
      id: 'nd-52-2018',
      title: 'Nghị định 52/2018/NĐ-CP',
      description: 'Nông nghiệp ứng dụng công nghệ cao',
      color: 'green',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ 50-70% chi phí đầu tư IoT, cảm biến',
        'Ưu đãi vay vốn cho chuyển đổi số',
      ],
    },
    {
      id: 'qd-899',
      title: 'Quyết định 899/QĐ-TTg',
      description: 'Tái cơ cấu ngành nông nghiệp',
      color: 'pink',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ liên kết chuỗi giá trị',
        'Ưu tiên vốn cho dự án dược liệu',
      ],
    },
    {
      id: 'ntm',
      title: 'Chương trình Nông thôn mới',
      description: 'Xây dựng nông thôn mới',
      color: 'teal',
      icon: 'ri-file-text-line',
      benefits: [
        'Hỗ trợ hạ tầng, đường giao thông',
        'Ưu tiên dự án tạo việc làm tại chỗ',
      ],
    },
    {
      id: 'nd-80-2021',
      title: 'Nghị định 80/2021/NĐ-CP',
      description: 'Hỗ trợ doanh nghiệp nhỏ và vừa',
      color: 'yellow',
      icon: 'ri-file-text-line',
      benefits: [
        'Vay vốn ưu đãi lãi suất thấp',
        'Hỗ trợ đào tạo, chuyển giao công nghệ',
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
      emerald: {
        bg: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-200',
        icon: 'from-emerald-500 to-teal-600',
        text: 'text-emerald-600',
      },
      blue: {
        bg: 'from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        icon: 'from-blue-500 to-cyan-600',
        text: 'text-blue-600',
      },
      purple: {
        bg: 'from-purple-50 to-indigo-50',
        border: 'border-purple-200',
        icon: 'from-purple-500 to-indigo-600',
        text: 'text-purple-600',
      },
      amber: {
        bg: 'from-amber-50 to-orange-50',
        border: 'border-amber-200',
        icon: 'from-amber-500 to-orange-600',
        text: 'text-amber-600',
      },
      green: {
        bg: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        icon: 'from-green-500 to-emerald-600',
        text: 'text-green-600',
      },
      pink: {
        bg: 'from-pink-50 to-rose-50',
        border: 'border-pink-200',
        icon: 'from-pink-500 to-rose-600',
        text: 'text-pink-600',
      },
      teal: {
        bg: 'from-teal-50 to-cyan-50',
        border: 'border-teal-200',
        icon: 'from-teal-500 to-cyan-600',
        text: 'text-teal-600',
      },
      yellow: {
        bg: 'from-yellow-50 to-amber-50',
        border: 'border-yellow-200',
        icon: 'from-yellow-500 to-amber-600',
        text: 'text-yellow-600',
      },
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Chính Sách Quốc Gia Hỗ Trợ</h1>
              <p className="text-emerald-100 text-sm sm:text-base">
                Hệ sinh thái Rừng Dược Sinh được hỗ trợ bởi các chính sách ưu đãi của Nhà nước
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => {
            const colors = getColorClasses(policy.color);
            return (
              <div
                key={policy.id}
                className={`bg-gradient-to-br ${colors.bg} p-6 sm:p-8 rounded-2xl border ${colors.border} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`${policy.icon} text-white text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{policy.title}</h3>
                    <p className="text-gray-700 mb-3">{policy.description}</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {policy.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <i className={`ri-arrow-right-s-line ${colors.text} mt-0.5`}></i>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-12 border border-emerald-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Bạn muốn tìm hiểu thêm về các chính sách hỗ trợ?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Liên hệ với chúng tôi để được tư vấn chi tiết về các chính sách và cách thức đăng ký nhận hỗ trợ từ Nhà nước.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/onboarding')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
              >
                Bắt đầu ngay
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
