
import { useState } from 'react';
import AdminTopBar from '../../components/feature/AdminTopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

export default function AdminMembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'warning' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'vitaScore' | 'area' | 'income'>('vitaScore');

  const members = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      cccd: '001234567890',
      bankAccount: '1234567890 - Vietcombank',
      area: 2.5,
      lots: [
        { code: 'A1', crop: 'Quýt Vân Sơn', area: 1.2, soil: 'Phù sa', status: 'healthy' },
        { code: 'A2', crop: 'Cà Gai Leo', area: 1.3, soil: 'Đất đỏ', status: 'healthy' }
      ],
      vitaScore: 92,
      joinDate: '15/03/2023',
      totalProduction: 1250,
      totalIncome: 58905000,
      status: 'active',
      compliance: 98,
      lastActivity: '2 giờ trước',
      rating: 4.8,
      sopViolations: 0
    },
    {
      id: 2,
      name: 'Trần Thị B',
      phone: '0923456789',
      cccd: '001234567891',
      bankAccount: '9876543210 - Agribank',
      area: 3.2,
      lots: [
        { code: 'B1', crop: 'Hoàng Liên', area: 1.8, soil: 'Đất mùn', status: 'healthy' },
        { code: 'B2', crop: 'Tam Thất', area: 1.4, soil: 'Đất đỏ', status: 'warning' }
      ],
      vitaScore: 88,
      joinDate: '20/03/2023',
      totalProduction: 1580,
      totalIncome: 74613000,
      status: 'active',
      compliance: 95,
      lastActivity: '5 giờ trước',
      rating: 4.5,
      sopViolations: 1
    },
    {
      id: 3,
      name: 'Lê Văn C',
      phone: '0934567890',
      cccd: '001234567892',
      bankAccount: '5555666677 - BIDV',
      area: 2.8,
      lots: [
        { code: 'C1', crop: 'Đương Quy', area: 2.8, soil: 'Phù sa', status: 'healthy' }
      ],
      vitaScore: 85,
      joinDate: '10/04/2023',
      totalProduction: 1120,
      totalIncome: 66759000,
      status: 'active',
      compliance: 92,
      lastActivity: '1 ngày trước',
      rating: 4.3,
      sopViolations: 2
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      phone: '0945678901',
      cccd: '001234567893',
      bankAccount: '7777888899 - Vietinbank',
      area: 4.1,
      lots: [
        { code: 'A3', crop: 'Quýt Vân Sơn', area: 2.0, soil: 'Phù sa', status: 'healthy' },
        { code: 'C2', crop: 'Bạch Truật', area: 2.1, soil: 'Đất mùn', status: 'healthy' }
      ],
      vitaScore: 95,
      joinDate: '05/03/2023',
      totalProduction: 1980,
      totalIncome: 94248000,
      status: 'active',
      compliance: 100,
      lastActivity: '30 phút trước',
      rating: 5.0,
      sopViolations: 0
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      phone: '0956789012',
      cccd: '001234567894',
      bankAccount: '3333444455 - Techcombank',
      area: 3.5,
      lots: [
        { code: 'B3', crop: 'Cà Gai Leo', area: 3.5, soil: 'Đất đỏ', status: 'alert' }
      ],
      vitaScore: 78,
      joinDate: '25/04/2023',
      totalProduction: 1420,
      totalIncome: 82467000,
      status: 'warning',
      compliance: 75,
      lastActivity: '3 ngày trước',
      rating: 3.8,
      sopViolations: 5
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getLotStatusBadge = (status: string) => {
    switch(status) {
      case 'healthy':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Khỏe mạnh</span>;
      case 'warning':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full whitespace-nowrap">Cần chú ý</span>;
      case 'alert':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">Nguy hiểm</span>;
      default:
        return null;
    }
  };

  // Filter and sort members
  let filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      member.lots.some(lot => lot.code.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Sort members
  filteredMembers = [...filteredMembers].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'vitaScore':
        return b.vitaScore - a.vitaScore;
      case 'area':
        return b.area - a.area;
      case 'income':
        return b.totalIncome - a.totalIncome;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      <AdminTopBar 
        title="Quản lý Xã viên & Vùng trồng" 
        subtitle="Hồ sơ số hóa & Chấm điểm tín nhiệm"
      />

      <div className="pt-16 px-3 sm:px-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SĐT, mã lô..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-sm"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-sm cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động tốt</option>
              <option value="warning">Cần theo dõi</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-sm cursor-pointer"
            >
              <option value="vitaScore">Điểm VITA</option>
              <option value="name">Tên A-Z</option>
              <option value="area">Diện tích</option>
              <option value="income">Thu nhập</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <i className="ri-group-line text-lg sm:text-xl text-emerald-600"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{members.length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Tổng xã viên</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <i className="ri-landscape-line text-lg sm:text-xl text-blue-600"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">16.1 ha</div>
            <div className="text-xs sm:text-sm text-gray-500">Tổng diện tích</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <i className="ri-star-line text-lg sm:text-xl text-purple-600"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">87.6</div>
            <div className="text-xs sm:text-sm text-gray-500">Điểm TB</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <i className="ri-checkbox-circle-line text-lg sm:text-xl text-emerald-600"></i>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{members.filter(m => m.status === 'active').length}</div>
            <div className="text-xs sm:text-sm text-gray-500">Hoạt động</div>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base">{member.name}</h3>
                        <p className="text-xs text-gray-500">{member.phone}</p>
                        <p className="text-xs text-gray-500">Tham gia: {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`px-3 py-1 rounded-full ${getScoreBgColor(member.vitaScore)}`}>
                        <div className={`text-xs font-semibold ${getScoreColor(member.vitaScore)}`}>VITA: {member.vitaScore}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`text-xs ${i < Math.floor(member.rating) ? 'ri-star-fill text-yellow-500' : 'ri-star-line text-gray-300'}`}></i>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{member.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Diện tích</div>
                      <div className="text-sm sm:text-base font-semibold text-emerald-600">{member.area} ha</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Số lô</div>
                      <div className="text-sm sm:text-base font-semibold text-blue-600">{member.lots.length} lô</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Tuân thủ</div>
                      <div className="text-sm sm:text-base font-semibold text-purple-600">{member.compliance}%</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Vi phạm SOP</div>
                      <div className="text-sm sm:text-base font-semibold text-amber-600">{member.sopViolations}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors text-sm sm:text-base cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-eye-line mr-2"></i>
                    {selectedMember === member.id ? 'Ẩn chi tiết' : 'Xem hồ sơ đầy đủ'}
                  </button>
                </div>

                {selectedMember === member.id && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">Hồ sơ số hóa</h4>
                    
                    {/* Personal Info */}
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Thông tin cá nhân</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">CCCD:</span>
                          <span className="font-semibold text-gray-800">{member.cccd}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tài khoản NH:</span>
                          <span className="font-semibold text-gray-800">{member.bankAccount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hoạt động gần nhất:</span>
                          <span className="font-semibold text-gray-800">{member.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Land Management */}
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Quản lý thửa đất</h5>
                      <div className="space-y-2">
                        {member.lots.map((lot) => (
                          <div key={lot.code} className="border border-gray-200 rounded-lg p-2">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="text-xs font-mono font-bold text-gray-800">{lot.code}</span>
                                <p className="text-sm font-semibold text-gray-800">{lot.crop}</p>
                              </div>
                              {getLotStatusBadge(lot.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>
                                <i className="ri-landscape-line mr-1"></i>
                                {lot.area} ha
                              </div>
                              <div>
                                <i className="ri-plant-line mr-1"></i>
                                {lot.soil}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="bg-white rounded-lg p-3 mb-3">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Thành tích</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tổng sản lượng:</span>
                          <span className="font-semibold text-gray-800">{member.totalProduction} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tổng thu nhập:</span>
                          <span className="font-semibold text-emerald-600">{formatCurrency(member.totalIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trạng thái:</span>
                          <span className={`font-semibold ${
                            member.status === 'active' ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {member.status === 'active' ? 'Hoạt động tốt' : 'Cần theo dõi'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        <i className="ri-edit-line mr-1"></i>
                        Chỉnh sửa
                      </button>
                      <button className="bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        <i className="ri-file-list-line mr-1"></i>
                        Hợp đồng
                      </button>
                      <button className="bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        <i className="ri-gift-line mr-1"></i>
                        Ưu tiên giống
                      </button>
                      <button className="bg-teal-500 text-white py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors text-sm cursor-pointer whitespace-nowrap">
                        <i className="ri-map-pin-line mr-1"></i>
                        Xem bản đồ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <i className="ri-search-line text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-500">Không tìm thấy xã viên nào</p>
            </div>
          )}
        </div>
      </div>

      <AdminBottomNav />
    </div>
  );
}
