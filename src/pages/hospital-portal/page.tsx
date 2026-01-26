import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

type TabType = 'overview' | 'partners' | 'research' | 'cases' | 'publications';

export default function HospitalPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [hospitalName, setHospitalName] = useState('Bệnh viện Y học Cổ truyền Trung ương');
  const [representativeName, setRepresentativeName] = useState('Nguyễn Văn A');

  useEffect(() => {
    const saved = localStorage.getItem('vita_hospital_registration_data');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.organizationName) setHospitalName(data.organizationName);
      if (data.representative) setRepresentativeName(data.representative);
    }
  }, []);

  const roles = [
    { id: 'admin', name: 'HTX - Quản trị', icon: 'ri-dashboard-line', path: '/cooperative/dashboard' },
    { id: 'partner', name: 'Doanh nghiệp - Thu mua', icon: 'ri-building-line', path: '/partner-dashboard' },
    { id: 'physician', name: 'Bác sĩ - Kiểm định', icon: 'ri-stethoscope-line', path: '/physician-portal' },
    { id: 'hospital', name: 'Bệnh viện - Hợp tác', icon: 'ri-hospital-line', path: '/hospital-portal' },
    { id: 'greenlight', name: 'GreenLight - Command', icon: 'ri-shield-star-line', path: '/greenlight-command' },
    { id: 'hub', name: 'Tất cả phân hệ', icon: 'ri-apps-2-line', path: '/home' },
  ];

  // Mock data - Partner Hospitals
  const partnerHospitals = [
    { id: 1, name: 'BV Y học Cổ truyền Trung ương', location: 'Hà Nội', level: 'Tuyến Trung ương', projects: 3, patients: 456, status: 'Đang hợp tác', type: 'Đông Y' },
    { id: 2, name: 'BV Chợ Rẫy', location: 'TP.HCM', level: 'Tuyến Trung ương', projects: 2, patients: 312, status: 'Đang hợp tác', type: 'Tây Y kết hợp' },
    { id: 3, name: 'BV Đa khoa Yên Bái', location: 'Yên Bái', level: 'Tuyến Tỉnh', projects: 1, patients: 189, status: 'Đang hợp tác', type: 'Đông Y' },
    { id: 4, name: 'BV Y học Cổ truyền Bình Dương', location: 'Bình Dương', level: 'Tuyến Tỉnh', projects: 2, patients: 234, status: 'Đàm phán', type: 'Đông Y' },
    { id: 5, name: 'BV Đa khoa Kon Tum', location: 'Kon Tum', level: 'Tuyến Tỉnh', projects: 0, patients: 0, status: 'Đề xuất', type: 'Tây Y kết hợp' },
    { id: 6, name: 'BV 108 - Quân y', location: 'Hà Nội', level: 'Tuyến Trung ương', projects: 1, patients: 56, status: 'Hợp tác đặc biệt', type: 'Quân y' },
  ];

  // Mock data - Research Projects
  const researchProjects = [
    { id: 1, title: 'Hiệu quả Sâm Ngọc Linh trong điều trị Suy nhược sau COVID-19', hospital: 'BV Y học Cổ truyền Trung ương', phase: 'Phase II', patients: 120, startDate: '01/2024', endDate: '12/2025', status: 'Đang triển khai', progress: 65 },
    { id: 2, title: 'Nghiên cứu Đương Quy trong điều trị Thiếu máu ở phụ nữ', hospital: 'BV Chợ Rẫy', phase: 'Phase III', patients: 200, startDate: '06/2023', endDate: '06/2025', status: 'Đang triển khai', progress: 78 },
    { id: 3, title: 'Cà Gai Leo trong điều trị Viêm gan B mạn tính', hospital: 'BV Đa khoa Yên Bái', phase: 'Phase I', patients: 50, startDate: '03/2024', endDate: '03/2026', status: 'Đang triển khai', progress: 42 },
    { id: 4, title: 'Đánh giá An toàn và Hiệu quả Nghệ Nano trong viêm khớp', hospital: 'BV Y học Cổ truyền Bình Dương', phase: 'Phase II', patients: 150, startDate: '09/2024', endDate: '09/2026', status: 'Kế hoạch', progress: 0 },
  ];

  // Mock data - Clinical Cases
  const clinicalCases = [
    { id: 1, patient: 'BN-2024-001', diagnosis: 'Suy nhược sau COVID-19', medicine: 'Sâm Ngọc Linh', hospital: 'BV Y học Cổ truyền Trung ương', outcome: 'Cải thiện tốt', date: '15/01/2025', doctor: 'BS. Nguyễn Văn A' },
    { id: 2, patient: 'BN-2024-045', diagnosis: 'Thiếu máu sau sinh', medicine: 'Đương Quy', hospital: 'BV Chợ Rẫy', outcome: 'Hồi phục hoàn toàn', date: '12/01/2025', doctor: 'BS. Trần Thị B' },
    { id: 3, patient: 'BN-2024-078', diagnosis: 'Viêm gan B mạn tính', medicine: 'Cà Gai Leo', hospital: 'BV Đa khoa Yên Bái', outcome: 'Chuyển biến tích cực', date: '10/01/2025', doctor: 'BS. Lê Văn C' },
    { id: 4, patient: 'BN-2024-112', diagnosis: 'Viêm khớp dạng thấp', medicine: 'Nghệ Nano', hospital: 'BV Y học Cổ truyền Bình Dương', outcome: 'Giảm đau đáng kể', date: '08/01/2025', doctor: 'BS. Phạm Thị D' },
  ];

  // Mock data - Publications
  const publications = [
    { id: 1, title: 'Efficacy of Vietnamese Ginseng (Panax vietnamensis) in Post-COVID-19 Fatigue Syndrome', journal: 'Journal of Traditional and Complementary Medicine', date: '12/2024', authors: 'Nguyễn V.A., Trần T.B., et al.', impact: 'IF 3.5' },
    { id: 2, title: 'Angelica sinensis in Treatment of Iron-Deficiency Anemia: A Randomized Controlled Trial', journal: 'Phytomedicine', date: '10/2024', authors: 'Trần T.B., Nguyễn V.A., et al.', impact: 'IF 5.2' },
    { id: 3, title: 'Solanum procumbens Extract for Chronic Hepatitis B: Safety and Efficacy Study', journal: 'World Journal of Hepatology', date: '08/2024', authors: 'Lê V.C., Phạm T.D., et al.', impact: 'IF 4.1' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <BackButton onClick={() => navigate('/')} />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Cổng Bệnh viện & Khoa YHCT</h1>
                <p className="text-sm text-gray-600">VITA Hospital Portal - Quản lý Hợp tác & Nghiên cứu Lâm sàng</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem('vita_hospital_registration_data');
                  navigate('/');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Đăng xuất
              </button>
              <PortalSwitcher roles={roles} />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-dashboard-line mr-1"></i>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'partners'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-hospital-line mr-1"></i>
              Bệnh viện Đối tác
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-flask-line mr-1"></i>
              Dự án Nghiên cứu
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'cases'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-file-medical-line mr-1"></i>
              Case Lâm sàng
            </button>
            <button
              onClick={() => setActiveTab('publications')}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeTab === 'publications'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-file-paper-2-line mr-1"></i>
              Công trình Nghiên cứu
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Header Stats */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <i className="ri-hospital-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Quản lý Hợp tác Bệnh viện</h2>
                  <p className="text-gray-700">{hospitalName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Bệnh viện đối tác</div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Dự án nghiên cứu</div>
                  <div className="text-2xl font-bold text-emerald-600">8</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Bệnh nhân tham gia</div>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Xuất bản nghiên cứu</div>
                  <div className="text-2xl font-bold text-purple-600">5</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('research')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border-2 border-purple-200 hover:border-purple-400"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <i className="ri-add-line text-2xl text-white"></i>
                  </div>
                  <h3 className="font-bold text-gray-900">Tạo dự án mới</h3>
                </div>
                <p className="text-sm text-gray-600">Khởi tạo dự án nghiên cứu lâm sàng mới</p>
              </button>

              <button
                onClick={() => setActiveTab('partners')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border-2 border-blue-200 hover:border-blue-400"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <i className="ri-hospital-line text-2xl text-white"></i>
                  </div>
                  <h3 className="font-bold text-gray-900">Thêm đối tác</h3>
                </div>
                <p className="text-sm text-gray-600">Kết nối với bệnh viện đối tác mới</p>
              </button>

              <button
                onClick={() => setActiveTab('publications')}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border-2 border-indigo-200 hover:border-indigo-400"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i className="ri-file-paper-2-line text-2xl text-white"></i>
                  </div>
                  <h3 className="font-bold text-gray-900">Xuất bản nghiên cứu</h3>
                </div>
                <p className="text-sm text-gray-600">Gửi công trình nghiên cứu để xuất bản</p>
              </button>
            </div>
          </div>
        )}

        {/* Tab: Partner Hospitals */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-hospital-line text-blue-600"></i>
                  Bệnh viện Đối tác
                </h3>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Thêm đối tác
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerHospitals.map((hospital) => (
                  <div key={hospital.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-lg">{hospital.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{hospital.location} • {hospital.level}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          hospital.status === 'Đang hợp tác' ? 'bg-green-100 text-green-700' :
                          hospital.status === 'Đàm phán' ? 'bg-yellow-100 text-yellow-700' :
                          hospital.status === 'Đề xuất' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {hospital.status}
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <i className="ri-hospital-line text-2xl text-blue-600"></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Dự án</div>
                        <div className="font-bold text-gray-900 text-lg">{hospital.projects}</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">Bệnh nhân</div>
                        <div className="font-bold text-gray-900 text-lg">{hospital.patients}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 mb-4">
                      <div className="text-xs text-gray-600 mb-1">Loại hình</div>
                      <div className="text-sm font-semibold text-gray-900">{hospital.type}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Chi tiết
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        <i className="ri-message-3-line mr-1"></i>
                        Liên hệ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Research Projects */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-flask-line text-purple-600"></i>
                  Dự án Nghiên cứu Lâm sàng
                </h3>
                <button className="px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  <i className="ri-add-line mr-1"></i>
                  Tạo dự án mới
                </button>
              </div>
              <div className="space-y-4">
                {researchProjects.map((project) => (
                  <div key={project.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{project.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === 'Đang triển khai' ? 'bg-green-100 text-green-700' :
                            project.status === 'Kế hoạch' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {project.status}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                            {project.phase}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{project.hospital}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Bệnh nhân:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.patients}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Bắt đầu:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.startDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Kết thúc:</span>
                            <span className="ml-2 font-semibold text-gray-900">{project.endDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tiến độ:</span>
                            <span className="ml-2 font-semibold text-emerald-600">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {project.progress > 0 && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-file-list-3-line mr-1"></i>
                        Báo cáo
                      </button>
                      <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Clinical Cases */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-file-medical-line text-teal-600"></i>
                Case Lâm sàng Nổi bật
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clinicalCases.map((caseItem) => (
                  <div key={caseItem.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{caseItem.patient}</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {caseItem.outcome}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{caseItem.diagnosis}</p>
                        <p className="text-sm text-gray-600 mb-2">Dùng: <span className="font-semibold">{caseItem.medicine}</span></p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-gray-600">Bệnh viện:</span>
                        <p className="font-semibold text-gray-900">{caseItem.hospital}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Bác sĩ:</span>
                        <p className="font-semibold text-gray-900">{caseItem.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{caseItem.date}</span>
                      <button className="text-teal-600 hover:text-teal-700 font-medium">
                        Xem chi tiết →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-file-paper-2-line text-indigo-600"></i>
                Công trình Nghiên cứu đã Xuất bản
              </h3>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="bg-white rounded-xl p-5 border-2 border-indigo-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">{pub.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{pub.journal}</p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Tác giả:</span> {pub.authors}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Xuất bản: <span className="font-semibold text-gray-900">{pub.date}</span></span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            {pub.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <i className="ri-download-line mr-1"></i>
                        Tải PDF
                      </button>
                      <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium">
                        <i className="ri-external-link-line mr-1"></i>
                        Xem online
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
