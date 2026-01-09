import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertTopBar from './components/ExpertTopBar';

type TabType = 'dashboard' | 'cases' | 'tele-clinic' | 'prescriptions' | 'sop-creator' | 'contracts' | 'community' | 'profile';

interface Case {
  id: string;
  title: string;
  category: string;
  priority: 'urgent' | 'high' | 'normal';
  status: 'pending' | 'in-progress' | 'follow-up' | 'resolved';
  client: string;
  location: string;
  createdAt: string;
  deadline?: string;
  description: string;
  images?: number;
}

interface Prescription {
  id: string;
  caseId: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  dosage: string;
  isolationPeriod: number;
  createdAt: string;
  client: string;
}

interface SOP {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  downloads: number;
  revenue: number;
  createdAt: string;
  status: 'draft' | 'published';
}

interface RetainerContract {
  id: string;
  client: string;
  role: string;
  monthlySalary: number;
  responsibilities: string[];
  assignedLots: string[];
  startDate: string;
  endDate?: string;
  status: 'active' | 'ended';
}

export default function ExpertPortalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [expertName, setExpertName] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('expert_authenticated');
    const email = sessionStorage.getItem('expert_email');
    
    if (!isAuthenticated || !email) {
      navigate('/expert-portal/login');
      return;
    }

    setExpertName(email.split('@')[0] || 'Chuyên gia');
    setIsVerified(sessionStorage.getItem('expert_verified') === 'true');
  }, [navigate]);

  // Mock data
  const cases: Case[] = [
    {
      id: 'case-001',
      title: 'Dịch bệnh lạ trên Quýt Vân Sơn',
      category: 'Bệnh hại',
      priority: 'urgent',
      status: 'pending',
      client: 'HTX Tu Mơ Rông',
      location: 'Kon Tum',
      createdAt: '2024-11-15 08:30',
      deadline: '2024-11-16',
      description: 'Phát hiện lá vàng, héo rũ trên diện rộng. Nghi ngờ bệnh nấm hoặc thiếu dinh dưỡng.',
      images: 8
    },
    {
      id: 'case-002',
      title: 'Tư vấn quy trình VietGAP cho Tam Thất',
      category: 'Quy trình',
      priority: 'normal',
      status: 'in-progress',
      client: 'HTX Dược Liệu Hà Giang',
      location: 'Hà Giang',
      createdAt: '2024-11-14 14:20',
      description: 'Cần hướng dẫn chi tiết quy trình canh tác Tam Thất đạt chuẩn VietGAP để xuất khẩu.',
    },
    {
      id: 'case-003',
      title: 'Theo dõi phục hồi sau điều trị bệnh rỉ sắt',
      category: 'Bệnh hại',
      priority: 'high',
      status: 'follow-up',
      client: 'HTX Sìn Hồ',
      location: 'Lai Châu',
      createdAt: '2024-11-10 10:15',
      description: 'Theo dõi tiến độ phục hồi của cây sau khi điều trị bệnh rỉ sắt.',
    }
  ];

  const prescriptions: Prescription[] = [
    {
      id: 'rx-001',
      caseId: 'case-003',
      diagnosis: 'Bệnh rỉ sắt do nấm',
      treatment: 'Dùng chế phẩm sinh học + Cải thiện thông gió',
      medications: ['Chế phẩm sinh học A', 'Chế phẩm sinh học B', 'Phân bón vi lượng'],
      dosage: 'Phun 2 lần/tuần trong 3 tuần',
      isolationPeriod: 15,
      createdAt: '2024-11-10',
      client: 'HTX Sìn Hồ'
    }
  ];

  const sops: SOP[] = [
    {
      id: 'sop-001',
      title: 'Trồng Sâm Ngọc Linh trên đất mùn núi đá độ cao 1800m',
      description: 'Quy trình chi tiết từ chọn giống, chuẩn bị đất, trồng, chăm sóc đến thu hoạch',
      price: 5000000,
      category: 'Dược liệu',
      downloads: 23,
      revenue: 115000000,
      createdAt: '2024-10-15',
      status: 'published'
    },
    {
      id: 'sop-002',
      title: 'Quy trình phòng trừ bệnh đốm lá trên Quýt Vân Sơn',
      description: 'SOP chi tiết phòng và trị bệnh đốm lá theo tiêu chuẩn hữu cơ',
      price: 3000000,
      category: 'Bệnh hại',
      downloads: 45,
      revenue: 135000000,
      createdAt: '2024-09-20',
      status: 'published'
    }
  ];

  const contracts: RetainerContract[] = [
    {
      id: 'contract-001',
      client: 'Công ty Dược phẩm VinaPharma',
      role: 'Giám đốc Kỹ thuật vùng trồng Kon Tum (Part-time)',
      monthlySalary: 20000000,
      responsibilities: [
        'Duyệt nhật ký hàng tuần của 5 HTX',
        'Đi thực địa 1 lần/tháng',
        'Ra chỉ thị kỹ thuật chung cho toàn vùng'
      ],
      assignedLots: ['LOT-001', 'LOT-002', 'LOT-003', 'LOT-004', 'LOT-005'],
      startDate: '2024-01-01',
      status: 'active'
    }
  ];

  const tabs = [
    { id: 'dashboard', name: 'Tổng quan', icon: 'ri-dashboard-line' },
    { id: 'cases', name: 'Bệnh án', icon: 'ri-file-list-3-line' },
    { id: 'tele-clinic', name: 'Phòng Khám Từ Xa', icon: 'ri-video-chat-line' },
    { id: 'prescriptions', name: 'Kê Đơn Số', icon: 'ri-medicine-bottle-line' },
    { id: 'sop-creator', name: 'SOP Creator', icon: 'ri-file-edit-line' },
    { id: 'contracts', name: 'Hợp đồng', icon: 'ri-file-contract-line' },
    { id: 'community', name: 'Cộng đồng', icon: 'ri-community-line' },
    { id: 'profile', name: 'Hồ sơ', icon: 'ri-user-settings-line' },
  ];

  // Statistics
  const stats = {
    monthlyIncome: 50000000,
    consultationIncome: 30000000,
    sopIncome: 20000000,
    reputationScore: 4.9,
    completedCases: 150,
    pendingCases: cases.filter(c => c.status === 'pending').length,
    inProgressCases: cases.filter(c => c.status === 'in-progress').length,
    activeContracts: contracts.filter(c => c.status === 'active').length,
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Chờ xử lý</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Đang xử lý</span>;
      case 'follow-up':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Theo dõi</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đã giải quyết</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Khẩn cấp</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Cao</span>;
      case 'normal':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Bình thường</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <ExpertTopBar expertName={expertName} isVerified={isVerified} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-2 overflow-x-auto">
          <div className="flex flex-wrap gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.name}</span>
                {tab.id === 'cases' && stats.pendingCases > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {stats.pendingCases}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-white text-xl"></i>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {(stats.monthlyIncome / 1000000).toFixed(0)}M
                </div>
                <div className="text-sm text-gray-600">Thu nhập tháng này</div>
                <div className="text-xs text-green-600 mt-1">
                  {stats.consultationIncome / 1000000}M tư vấn + {stats.sopIncome / 1000000}M SOP
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <i className="ri-star-line text-white text-xl"></i>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.reputationScore}
                </div>
                <div className="text-sm text-gray-600">Điểm uy tín</div>
                <div className="text-xs text-yellow-600 mt-1">
                  {stats.completedCases} ca thành công
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <i className="ri-file-list-3-line text-white text-xl"></i>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.pendingCases + stats.inProgressCases}
                </div>
                <div className="text-sm text-gray-600">Ca đang xử lý</div>
                <div className="text-xs text-blue-600 mt-1">
                  {stats.pendingCases} chờ + {stats.inProgressCases} đang làm
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <i className="ri-file-contract-line text-white text-xl"></i>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats.activeContracts}
                </div>
                <div className="text-sm text-gray-600">Hợp đồng dài hạn</div>
                <div className="text-xs text-purple-600 mt-1">Đang hoạt động</div>
              </div>
            </div>

            {/* Calendar & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-calendar-line text-pink-600"></i>
                  Lịch làm việc hôm nay
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-pink-500 pl-4 py-2">
                    <div className="font-semibold text-gray-900">10:00 AM</div>
                    <div className="text-sm text-gray-600">Video call chẩn đoán nấm</div>
                    <div className="text-xs text-gray-500">HTX Tu Mơ Rông</div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="font-semibold text-gray-900">2:00 PM</div>
                    <div className="text-sm text-gray-600">Thực địa kiểm tra vườn</div>
                    <div className="text-xs text-gray-500">HTX Sìn Hồ - Lô A</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-wallet-3-line text-green-600"></i>
                  Ví Thu nhập
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {(stats.monthlyIncome / 1000000).toFixed(1)} triệu VNĐ
                    </div>
                    <div className="text-sm text-gray-600">Tổng thu nhập tháng này</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {(stats.consultationIncome / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-gray-600">Tư vấn 1-1</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">
                        {(stats.sopIncome / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-gray-600">Bán SOP</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    <i className="ri-arrow-down-circle-line mr-2"></i>
                    Rút tiền
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Cases */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-pink-600"></i>
                  Ca gần đây
                </h3>
                <button
                  onClick={() => setActiveTab('cases')}
                  className="text-pink-600 hover:underline text-sm font-medium"
                >
                  Xem tất cả →
                </button>
              </div>
              <div className="space-y-3">
                {cases.slice(0, 3).map((caseItem) => (
                  <div key={caseItem.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{caseItem.title}</span>
                          {getPriorityBadge(caseItem.priority)}
                          {getStatusBadge(caseItem.status)}
                        </div>
                        <div className="text-sm text-gray-600">{caseItem.client} • {caseItem.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Cases */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Danh sách Bệnh án</h3>
              <div className="space-y-4">
                {cases.map((caseItem) => (
                  <div key={caseItem.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-mono text-xs text-gray-500">#{caseItem.id}</span>
                          <span className="font-bold text-gray-900">{caseItem.title}</span>
                          {getPriorityBadge(caseItem.priority)}
                          {getStatusBadge(caseItem.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{caseItem.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span><i className="ri-user-line mr-1"></i>{caseItem.client}</span>
                          <span><i className="ri-map-pin-line mr-1"></i>{caseItem.location}</span>
                          <span><i className="ri-time-line mr-1"></i>{caseItem.createdAt}</span>
                          {caseItem.images && (
                            <span><i className="ri-image-line mr-1"></i>{caseItem.images} ảnh</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                        <i className="ri-eye-line mr-1"></i>Xem chi tiết
                      </button>
                      {caseItem.status === 'pending' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          <i className="ri-check-line mr-1"></i>Nhận xử lý
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Tele-Clinic */}
        {activeTab === 'tele-clinic' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Phòng Khám Từ Xa</h3>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
                <p className="text-gray-700 mb-4">
                  <strong>Video Call chuyên dụng:</strong> Chuyên gia nhìn thấy video từ camera của nông dân. 
                  Công cụ AR (Thực tế tăng cường) giúp chỉ trỏ chính xác vào vấn đề.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Truy cập Nhật ký Canh tác:</strong> Xem lại lịch sử bón phân, tưới nước trong 3 tháng qua để tìm nguyên nhân gốc rễ.
                </p>
                <div className="text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    <i className="ri-video-chat-line mr-2"></i>
                    Bắt đầu Video Call
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p><i className="ri-information-line mr-2"></i>Tính năng Video Call sẽ được tích hợp với hệ thống real-time khi triển khai.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Đơn thuốc đã kê</h3>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                  <i className="ri-add-line mr-1"></i>Tạo đơn mới
                </button>
              </div>
              <div className="space-y-4">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{rx.diagnosis}</div>
                        <div className="text-sm text-gray-600">Khách hàng: {rx.client}</div>
                        <div className="text-xs text-gray-500">Ngày: {rx.createdAt}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Phác đồ điều trị:</div>
                      <div className="text-sm text-gray-600">{rx.treatment}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Thuốc & Liều lượng:</div>
                      <ul className="space-y-1">
                        {rx.medications.map((med, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <i className="ri-checkbox-circle-line text-green-600"></i>
                            {med}
                          </li>
                        ))}
                      </ul>
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Liều lượng:</strong> {rx.dosage}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Thời gian cách ly:</strong> {rx.isolationPeriod} ngày
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <i className="ri-download-line mr-1"></i>Tải PDF
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        <i className="ri-shopping-cart-line mr-1"></i>Gợi ý mua thuốc
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: SOP Creator */}
        {activeTab === 'sop-creator' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Quy trình SOP của tôi</h3>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                  <i className="ri-add-line mr-1"></i>Tạo SOP mới
                </button>
              </div>
              <div className="space-y-4">
                {sops.map((sop) => (
                  <div key={sop.id} className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-1">{sop.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{sop.description}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span><i className="ri-price-tag-3-line mr-1"></i>{sop.price.toLocaleString()} VNĐ</span>
                          <span><i className="ri-download-line mr-1"></i>{sop.downloads} lượt tải</span>
                          <span><i className="ri-money-dollar-circle-line mr-1"></i>{(sop.revenue / 1000000).toFixed(0)}M doanh thu</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sop.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {sop.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                        <i className="ri-edit-line mr-1"></i>Chỉnh sửa
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <i className="ri-bar-chart-line mr-1"></i>Xem thống kê
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Contracts */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Hợp đồng Dài hạn</h3>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
                  <i className="ri-add-line mr-1"></i>Xem cơ hội mới
                </button>
              </div>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="font-bold text-xl text-gray-900 mb-1">{contract.client}</div>
                        <div className="text-lg text-gray-700 mb-3">{contract.role}</div>
                        <div className="text-2xl font-bold text-green-600 mb-4">
                          {contract.monthlySalary.toLocaleString()} VNĐ/tháng
                        </div>
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Nhiệm vụ:</div>
                          <ul className="space-y-1">
                            {contract.responsibilities.map((resp, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <i className="ri-checkbox-circle-line text-green-600 mt-0.5"></i>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-2">
                          <div className="text-sm font-semibold text-gray-700 mb-1">Lô đất được chỉ định:</div>
                          <div className="flex flex-wrap gap-2">
                            {contract.assignedLots.map((lot) => (
                              <span key={lot} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                {lot}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <i className="ri-calendar-line mr-1"></i>
                          Từ {contract.startDate} {contract.endDate && `đến ${contract.endDate}`}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contract.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {contract.status === 'active' ? 'Đang hoạt động' : 'Đã kết thúc'}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <i className="ri-eye-line mr-1"></i>Xem chi tiết
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        <i className="ri-map-2-line mr-1"></i>Giám sát vùng trồng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Community */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">VITA Expert Forum</h3>
              <p className="text-gray-600 mb-4">
                Diễn đàn kín chỉ dành cho các nhà khoa học thảo luận các ca bệnh khó, các giống mới.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Thảo luận ca bệnh</div>
                  <div className="text-sm text-gray-600">Chia sẻ và trao đổi về các ca bệnh phức tạp</div>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Đóng góp Wiki</div>
                  <div className="text-sm text-gray-600">Viết bài chuyên sâu để tăng điểm uy tín</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hồ sơ & Cài đặt</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Trạng thái xác thực</div>
                  {isVerified ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <i className="ri-checkbox-circle-fill text-xl"></i>
                      <span className="font-medium">Verified Expert - Đã xác thực</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <i className="ri-time-line text-xl"></i>
                      <span>Đang chờ thẩm định</span>
                    </div>
                  )}
                </div>
                <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-pink-300 transition-colors">
                  <div className="font-semibold text-gray-900">Chỉnh sửa hồ sơ</div>
                  <div className="text-sm text-gray-600">Cập nhật thông tin cá nhân, chuyên môn, chứng chỉ</div>
                </button>
                <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-pink-300 transition-colors">
                  <div className="font-semibold text-gray-900">Cài đặt giá</div>
                  <div className="text-sm text-gray-600">Điều chỉnh mức phí tư vấn và giá bán SOP</div>
                </button>
                <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left hover:border-pink-300 transition-colors">
                  <div className="font-semibold text-gray-900">Lịch sử giao dịch</div>
                  <div className="text-sm text-gray-600">Xem tất cả thu nhập và chi tiết thanh toán</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




