import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingGatewayPage() {
  const navigate = useNavigate();
  const [selectedCooperative, setSelectedCooperative] = useState<string>('');

  const roles = [
    {
      id: 'producer',
      title: 'Góp Sức',
      subtitle: 'Nông dân / Kỹ sư',
      description: 'Đóng góp sức lao động, kỹ năng canh tác và chuyên môn kỹ thuật để phát triển rừng dược liệu',
      icon: 'ri-seedling-line',
      color: 'from-green-600 to-emerald-700',
      formPath: '/forest-owner-register?role=producer'
    },
    {
      id: 'resource',
      title: 'Góp Đất',
      subtitle: 'Chủ rừng / Chủ đất',
      description: 'Góp vốn bằng đất đai, rừng hiện có để phát triển thành rừng dược liệu được số hóa và quản lý',
      icon: 'ri-landscape-line',
      color: 'from-amber-700 to-orange-800',
      formPath: '/land-digitization'
    },
    {
      id: 'investor',
      title: 'Góp Vốn',
      subtitle: 'Nhà đầu tư cá nhân',
      description: 'Đầu tư tài chính vào HTX để chia sẻ lợi nhuận và góp phần phát triển hệ sinh thái bền vững',
      icon: 'ri-hand-coin-line',
      color: 'from-yellow-600 to-amber-700',
      formPath: '/investor-portal/register'
    }
  ];

  // Demo: Danh sách HTX (sẽ lấy từ API thực tế)
  const cooperatives = [
    { id: '1', name: 'HTX Rừng Dược Sinh Măng Ri', location: 'Xã Măng Ri, Huyện Kon Plông' },
    { id: '2', name: 'HTX Dược Liệu Tây Nguyên', location: 'Xã Đắk Năng, Huyện Kon Rẫy' },
    { id: '3', name: 'HTX Nông Lâm Sản Kon Tum', location: 'Xã Đắk Pxi, Huyện Đắk Hà' },
    { id: 'none', name: 'Chưa chọn HTX', location: 'Sẽ được GreenLight điều phối' }
  ];

  const handleRoleSelect = (roleId: string, formPath: string) => {
    if (roleId === 'resource') {
      // Nếu chọn "Góp Đất", điều hướng đến workflow số hóa đất
      navigate(formPath);
    } else if (roleId === 'investor') {
      // Nếu chọn "Góp Vốn", điều hướng đến form đăng ký nhà đầu tư
      navigate(formPath);
    } else {
      // Nếu chọn "Góp Sức", hiển thị form chọn HTX
      if (selectedCooperative) {
        // Lưu thông tin HTX đã chọn và điều hướng
        sessionStorage.setItem('selectedCooperative', selectedCooperative);
        navigate(formPath + `&coop=${selectedCooperative}`);
      } else {
        // Chưa chọn HTX - vẫn điều hướng, hệ thống sẽ xử lý ở GreenLight
        navigate(formPath);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/home')}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Đăng ký Gia nhập</h1>
                <p className="text-sm opacity-90">Chọn cách bạn muốn tham gia hệ sinh thái VITA</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Đã có tài khoản?
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bạn muốn đóng góp gì?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Hệ sinh thái VITA hoạt động dựa trên nguyên tắc: <span className="font-semibold text-emerald-700">Góp Sức - Góp Đất - Góp Vốn</span>
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <i className={`${role.icon} text-4xl text-white`}></i>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{role.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4 text-center uppercase tracking-wide">{role.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6 text-center min-h-[80px]">
                  {role.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => handleRoleSelect(role.id, role.formPath)}
                  className={`w-full py-3 px-4 bg-gradient-to-r ${role.color} text-white text-base font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  <span>Chọn {role.title}</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>

              {/* Border Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:bg-gradient-to-br group-hover:${role.color} group-hover:opacity-20 transition-all duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Cooperative Selection (for Góp Sức) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            <i className="ri-team-line text-emerald-600 mr-2"></i>
            Chọn Hợp tác xã (Nếu bạn chọn "Góp Sức")
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Nếu bạn đã biết HTX mình muốn tham gia, hãy chọn ở đây. Nếu chưa, hệ thống sẽ điều phối bạn đến HTX phù hợp.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cooperatives.map((coop) => (
              <button
                key={coop.id}
                onClick={() => setSelectedCooperative(coop.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedCooperative === coop.id
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedCooperative === coop.id
                      ? 'border-emerald-600 bg-emerald-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedCooperative === coop.id && (
                      <i className="ri-check-line text-white text-xs"></i>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{coop.name}</h4>
                    <p className="text-sm text-gray-600">{coop.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedCooperative && selectedCooperative !== 'none' && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-800">
                <i className="ri-information-line mr-2"></i>
                Hồ sơ của bạn sẽ được chuyển trực tiếp đến <strong>{cooperatives.find(c => c.id === selectedCooperative)?.name}</strong>
              </p>
            </div>
          )}

          {selectedCooperative === 'none' && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <i className="ri-information-line mr-2"></i>
                Hồ sơ của bạn sẽ được chuyển đến <strong>GreenLight Admin</strong> để điều phối đến HTX phù hợp nhất
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-md p-6 sm:p-8 border border-emerald-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-questionnaire-line text-emerald-600"></i>
            Quy trình xử lý hồ sơ
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
              <p><strong>Nếu chọn HTX cụ thể:</strong> Hồ sơ sẽ được chuyển trực tiếp về Dashboard của HTX đó để xem xét và duyệt</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
              <p><strong>Nếu chưa chọn HTX:</strong> Hồ sơ sẽ được chuyển về GreenLight Admin để điều phối đến HTX phù hợp nhất dựa trên vị trí địa lý, nhu cầu và năng lực</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




