import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminExpertPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'tickets' | 'experts' | 'knowledge'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Mock data - Yêu cầu hỗ trợ
  const supportTickets = [
    {
      id: 1,
      title: 'Dịch bệnh lạ trên Quýt Vân Sơn',
      category: 'Bệnh hại',
      priority: 'urgent',
      status: 'open',
      affectedFarmers: 12,
      affectedArea: 8.5,
      location: 'Khu vực A - Xã Tân Lập',
      description: 'Phát hiện lá vàng, héo rũ trên diện rộng. Nghi ngờ bệnh nấm hoặc thiếu dinh dưỡng.',
      photos: 8,
      createdDate: '14/11/2024 08:30',
      assignedExpert: null,
      responses: 0
    },
    {
      id: 2,
      title: 'Tư vấn quy trình VietGAP cho Tam Thất',
      category: 'Quy trình',
      priority: 'normal',
      status: 'assigned',
      affectedFarmers: 5,
      affectedArea: 4.2,
      location: 'Khu vực B - Xã Minh Tân',
      description: 'Cần hướng dẫn chi tiết quy trình canh tác Tam Thất đạt chuẩn VietGAP để xuất khẩu.',
      photos: 3,
      createdDate: '13/11/2024 14:20',
      assignedExpert: 'TS. Nguyễn Văn Khoa',
      responses: 2
    },
    {
      id: 3,
      title: 'Năng suất Cà Gai Leo thấp bất thường',
      category: 'Năng suất',
      priority: 'high',
      status: 'in-progress',
      affectedFarmers: 8,
      affectedArea: 6.3,
      location: 'Khu vực C - Xã Hòa Bình',
      description: 'Năng suất chỉ đạt 60% so với dự kiến. Cây phát triển chậm, quả nhỏ.',
      photos: 5,
      createdDate: '12/11/2024 10:15',
      assignedExpert: 'PGS. Trần Thị Lan',
      responses: 4
    },
    {
      id: 4,
      title: 'Hướng dẫn sử dụng phân bón hữu cơ',
      category: 'Dinh dưỡng',
      priority: 'normal',
      status: 'resolved',
      affectedFarmers: 15,
      affectedArea: 12.0,
      location: 'Toàn HTX',
      description: 'Yêu cầu đào tạo cách sử dụng phân bón hữu cơ mới cho toàn bộ xã viên.',
      photos: 2,
      createdDate: '10/11/2024 09:00',
      assignedExpert: 'ThS. Lê Văn Minh',
      responses: 6,
      resolvedDate: '11/11/2024 16:30'
    }
  ];

  // Mock data - Chuyên gia
  const experts = [
    {
      id: 1,
      name: 'TS. Nguyễn Văn Khoa',
      title: 'Tiến sĩ Nông nghiệp',
      specialization: 'Dược liệu, VietGAP',
      organization: 'Trung tâm Khoa học Dược liệu',
      experience: 15,
      rating: 4.9,
      completedTickets: 127,
      responseTime: '2-4 giờ',
      availability: 'available',
      phone: '0901234567',
      email: 'nvkhoa@research.vn'
    },
    {
      id: 2,
      name: 'PGS. Trần Thị Lan',
      title: 'Phó Giáo sư',
      specialization: 'Bệnh hại cây trồng',
      organization: 'Viện Bảo vệ Thực vật',
      experience: 20,
      rating: 4.8,
      completedTickets: 203,
      responseTime: '1-3 giờ',
      availability: 'busy',
      phone: '0912345678',
      email: 'ttlan@plantprotection.vn'
    },
    {
      id: 3,
      name: 'ThS. Lê Văn Minh',
      title: 'Thạc sĩ Khoa học Đất',
      specialization: 'Dinh dưỡng cây trồng',
      organization: 'Trung tâm Khoa học Dược liệu',
      experience: 8,
      rating: 4.7,
      completedTickets: 89,
      responseTime: '3-6 giờ',
      availability: 'available',
      phone: '0923456789',
      email: 'lvminh@research.vn'
    }
  ];

  // Mock data - Thư viện kiến thức
  const knowledgeBase = [
    {
      id: 1,
      title: 'Hướng dẫn phòng trừ bệnh đốm lá trên Quýt Vân Sơn',
      category: 'Bệnh hại',
      views: 245,
      downloads: 67,
      author: 'TS. Nguyễn Văn Khoa',
      date: '05/11/2024',
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Quy trình canh tác Tam Thất theo chuẩn VietGAP',
      category: 'Quy trình',
      views: 189,
      downloads: 52,
      author: 'PGS. Trần Thị Lan',
      date: '01/11/2024',
      type: 'video'
    },
    {
      id: 3,
      title: 'Kỹ thuật bón phân hữu cơ cho dược liệu',
      category: 'Dinh dưỡng',
      views: 312,
      downloads: 98,
      author: 'ThS. Lê Văn Minh',
      date: '28/10/2024',
      type: 'pdf'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Khẩn cấp</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full whitespace-nowrap">Cao</span>;
      case 'normal':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Bình thường</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">Chờ xử lý</span>;
      case 'assigned':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap">Đã phân công</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full whitespace-nowrap">Đang xử lý</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Đã giải quyết</span>;
      default:
        return null;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch(availability) {
      case 'available':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Sẵn sàng</span>;
      case 'busy':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">Bận</span>;
      case 'offline':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">Offline</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar 
        title="Cầu nối Chuyên gia" 
        subtitle="Hỗ trợ kỹ thuật từ Trung tâm Khoa học"
      />

      <div className="pt-16 px-3 sm:px-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-ticket-line mr-1"></i>
            Yêu cầu
            {supportTickets.filter(t => t.status === 'open').length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {supportTickets.filter(t => t.status === 'open').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-add-circle-line mr-1"></i>
            Tạo mới
          </button>
          <button
            onClick={() => setActiveTab('experts')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'experts'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-user-star-line mr-1"></i>
            Chuyên gia
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
              activeTab === 'knowledge'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-book-line mr-1"></i>
            Kiến thức
          </button>
        </div>

        {/* Tab: Tickets */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-amber-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{supportTickets.filter(t => t.status === 'open').length}</div>
                <div className="text-xs text-gray-500">Chờ xử lý</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <i className="ri-loader-line text-lg text-purple-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{supportTickets.filter(t => t.status === 'in-progress').length}</div>
                <div className="text-xs text-gray-500">Đang xử lý</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <i className="ri-check-line text-lg text-green-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">{supportTickets.filter(t => t.status === 'resolved').length}</div>
                <div className="text-xs text-gray-500">Đã giải quyết</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <i className="ri-time-line text-lg text-blue-600"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">3.2h</div>
                <div className="text-xs text-gray-500">Thời gian TB</div>
              </div>
            </div>

            {/* Tickets List */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Danh sách yêu cầu hỗ trợ</h3>
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className={`border-2 rounded-xl p-3 transition-all ${
                    ticket.priority === 'urgent' ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono font-bold text-gray-600">#{ticket.id}</span>
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{ticket.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-gray-600">Danh mục</div>
                        <div className="font-semibold text-gray-800">{ticket.category}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-gray-600">Nông dân</div>
                        <div className="font-semibold text-blue-600">{ticket.affectedFarmers} hộ</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-gray-600">Diện tích</div>
                        <div className="font-semibold text-emerald-600">{ticket.affectedArea} ha</div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-gray-600">Hình ảnh</div>
                        <div className="font-semibold text-purple-600">{ticket.photos} ảnh</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-map-pin-line"></i>
                        <span>{ticket.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-calendar-line"></i>
                        <span>{ticket.createdDate}</span>
                      </div>
                    </div>

                    {ticket.assignedExpert && (
                      <div className="bg-blue-50 rounded-lg p-2 mb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <i className="ri-user-star-line text-blue-600"></i>
                          <span className="text-gray-600">Chuyên gia:</span>
                          <span className="font-semibold text-blue-700">{ticket.assignedExpert}</span>
                        </div>
                        {ticket.responses > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <i className="ri-message-3-line text-blue-600"></i>
                            <span className="text-gray-600">{ticket.responses} phản hồi</span>
                          </div>
                        )}
                      </div>
                    )}

                    {ticket.status === 'resolved' && ticket.resolvedDate && (
                      <div className="bg-green-50 rounded-lg p-2 mb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <i className="ri-check-double-line text-green-600"></i>
                          <span className="text-gray-600">Đã giải quyết:</span>
                          <span className="font-semibold text-green-700">{ticket.resolvedDate}</span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        Xem chi tiết
                      </button>
                      {ticket.status === 'open' && (
                        <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-user-add-line mr-1"></i>
                          Phân công
                        </button>
                      )}
                      {ticket.status === 'resolved' && (
                        <button className="bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-download-line mr-1"></i>
                          Tải báo cáo
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Create */}
        {activeTab === 'create' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Tạo yêu cầu hỗ trợ mới</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Tiêu đề vấn đề</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Dịch bệnh lạ trên Quýt Vân Sơn"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Danh mục</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm cursor-pointer">
                    <option>Bệnh hại</option>
                    <option>Sâu hại</option>
                    <option>Dinh dưỡng</option>
                    <option>Năng suất</option>
                    <option>Quy trình</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Mức độ ưu tiên</label>
                  <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm cursor-pointer">
                    <option>Bình thường</option>
                    <option>Cao</option>
                    <option>Khẩn cấp</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Khu vực ảnh hưởng</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Khu vực A - Xã Tân Lập"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Số nông dân</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Diện tích (ha)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Mô tả chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả chi tiết vấn đề, triệu chứng, thời gian phát hiện..."
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Hình ảnh minh họa</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                    <i className="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">Nhấn để tải ảnh lên</p>
                    <p className="text-xs text-gray-400">Tối đa 10 ảnh, mỗi ảnh &lt; 5MB</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-send-plane-fill mr-2"></i>
                  Gửi yêu cầu hỗ trợ
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-lightbulb-line text-2xl"></i>
                <h3 className="font-bold">Mẹo tạo yêu cầu hiệu quả</h3>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Tiêu đề ngắn gọn, súc tích</li>
                <li>• Mô tả chi tiết triệu chứng và thời gian</li>
                <li>• Đính kèm nhiều ảnh rõ nét</li>
                <li>• Ghi rõ diện tích và số nông dân ảnh hưởng</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab: Experts */}
        {activeTab === 'experts' && (
          <div className="space-y-4">
            {/* Expert Portal Link */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl shadow-lg p-4 text-white mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <i className="ri-user-star-line"></i>
                    VITA EXPERT HUB - Cổng làm việc cho Chuyên gia
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    Chuyên gia có thể đăng ký và quản lý tài khoản của mình, nhận booking, kê đơn số, và bán SOP.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open('/expert-portal/login', '_blank')}
                      className="px-4 py-2 bg-white text-pink-600 rounded-lg font-medium hover:bg-gray-100 transition-all text-sm"
                    >
                      <i className="ri-login-box-line mr-1"></i>
                      Đăng nhập Expert Portal
                    </button>
                    <button
                      onClick={() => window.open('/expert-portal/register', '_blank')}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/50 text-white rounded-lg font-medium transition-all text-sm"
                    >
                      <i className="ri-user-add-line mr-1"></i>
                      Đăng ký mới
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <i className="ri-user-star-line text-6xl text-white/30"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Danh sách chuyên gia</h3>
              <div className="space-y-3">
                {experts.map((expert) => (
                  <div key={expert.id} className="border-2 border-gray-200 rounded-xl p-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                        {expert.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800 text-sm">{expert.name}</h4>
                          {getAvailabilityBadge(expert.availability)}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{expert.title}</p>
                        <p className="text-xs text-gray-500">{expert.organization}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <div className="text-xs text-gray-600 mb-1">Chuyên môn</div>
                      <div className="text-sm font-semibold text-gray-800">{expert.specialization}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-gray-600">Kinh nghiệm</div>
                        <div className="font-semibold text-blue-600">{expert.experience} năm</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-gray-600">Đánh giá</div>
                        <div className="font-semibold text-purple-600 flex items-center gap-1">
                          <i className="ri-star-fill text-yellow-500"></i>
                          {expert.rating}
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-gray-600">Hoàn thành</div>
                        <div className="font-semibold text-green-600">{expert.completedTickets}</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-time-line"></i>
                        <span>Thời gian phản hồi: {expert.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <i className="ri-phone-line"></i>
                        <span>{expert.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-mail-line"></i>
                        <span>{expert.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-user-add-line mr-1"></i>
                        Phân công
                      </button>
                      <button className="bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-message-3-line mr-1"></i>
                        Nhắn tin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Knowledge Base */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">Thư viện kiến thức</h3>
                <button className="text-emerald-600 text-sm font-medium hover:underline cursor-pointer whitespace-nowrap">
                  Xem tất cả
                </button>
              </div>
              <div className="space-y-3">
                {knowledgeBase.map((item) => (
                  <div key={item.id} className="border-2 border-gray-200 rounded-xl p-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <i className={`text-2xl ${
                          item.type === 'pdf' ? 'ri-file-pdf-line text-red-600' : 'ri-video-line text-blue-600'
                        }`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">Bởi {item.author} • {item.date}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <i className="ri-eye-line"></i>
                            {item.views} lượt xem
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-download-line"></i>
                            {item.downloads} tải xuống
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-download-line mr-1"></i>
                      Tải xuống
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <i className="ri-book-open-line text-2xl"></i>
                <h3 className="font-bold">Đóng góp kiến thức</h3>
              </div>
              <p className="text-sm opacity-90 mb-3">
                Chia sẻ kinh nghiệm và tài liệu hữu ích với cộng đồng HTX
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-upload-line mr-2"></i>
                Tải tài liệu lên
              </button>
            </div>
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  );
}
