import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';
import BackButton from '../../components/shared/BackButton';

type TabType = 'shifts' | 'tasks' | 'wallet';
type WalletSubTabType = 'overview' | 'multi-wallet';

interface Shift {
  id: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  position: string;
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  checkedIn?: boolean;
  checkedInTime?: string;
}

interface ServiceTask {
  id: string;
  type: 'housekeeping' | 'chef' | 'tour-guide' | 'reception';
  title: string;
  location: string;
  checklist: Array<{ id: string; item: string; completed: boolean }>;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  photos?: string[];
}

export default function FarmerServicePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('shifts');
  const [currentMode, setCurrentMode] = useState<'farm' | 'service'>('service');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletSubTab, setWalletSubTab] = useState<WalletSubTabType>('overview');
  
  // QR Code for Rating & Tipping
  const memberQRCode = {
    memberId: 'MEM-2024-001',
    memberName: 'Nguyễn Văn Minh',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vita.coop/rate/MEM-2024-001',
  };

  // Mock data
  const shifts: Shift[] = [
    {
      id: 'S001',
      date: '2024-11-25',
      day: 'Thứ 2',
      startTime: '08:00',
      endTime: '12:00',
      position: 'Trực Lễ tân',
      location: 'Cổng vào',
      status: 'completed',
      checkedIn: true,
      checkedInTime: '07:55',
    },
    {
      id: 'S002',
      date: '2024-11-26',
      day: 'Thứ 3',
      startTime: '14:00',
      endTime: '17:00',
      position: 'Dẫn đoàn khách',
      location: 'Vườn Sâm',
      status: 'upcoming',
      checkedIn: false,
    },
    {
      id: 'S003',
      date: '2024-11-27',
      day: 'Thứ 4',
      startTime: '09:00',
      endTime: '15:00',
      position: 'Dọn buồng phòng',
      location: 'Khu Bungalow',
      status: 'upcoming',
      checkedIn: false,
    },
  ];

  const serviceTasks: ServiceTask[] = [
    {
      id: 'T001',
      type: 'housekeeping',
      title: 'Dọn dẹp Bungalow 01, 02',
      location: 'Khu Bungalow',
      checklist: [
        { id: 'c1', item: 'Thay ga giường', completed: false },
        { id: 'c2', item: 'Thay khăn tắm', completed: false },
        { id: 'c3', item: 'Đặt 2 chai nước', completed: false },
        { id: 'c4', item: 'Lau dọn phòng tắm', completed: false },
        { id: 'c5', item: 'Chụp ảnh phòng hoàn thiện', completed: false },
      ],
      deadline: '2024-11-25 16:00',
      status: 'pending',
    },
    {
      id: 'T002',
      type: 'chef',
      title: 'Chuẩn bị bữa trưa cho đoàn 10 khách',
      location: 'Nhà bếp',
      checklist: [
        { id: 'c1', item: 'Chuẩn bị 2 con gà', completed: false },
        { id: 'c2', item: 'Chuẩn bị 0.5kg sâm', completed: false },
        { id: 'c3', item: 'Nấu món Gà nướng Sâm', completed: false },
        { id: 'c4', item: 'Bày biện bàn ăn', completed: false },
      ],
      deadline: '2024-11-25 12:00',
      status: 'pending',
    },
  ];

  const serviceWallet = {
    hourlyWage: 200000,
    totalHours: 15,
    bonus: 50000,
    tips: 100000,
    total: 3150000,
    recentTips: [
      { date: '24/11', amount: 50000, service: 'Dẫn tour', customer: 'Anh Minh' },
      { date: '23/11', amount: 30000, service: 'Dọn phòng', customer: 'Chị Lan' },
    ],
    vitaScore: 92, // VITA Score for service workers
  };

  // Đa ngăn Ví thu nhập (cho dịch vụ)
  const walletCompartments = {
    service: {
      balance: 3500000,
      label: 'Ví Dịch vụ',
      icon: 'ri-service-line',
      color: 'from-orange-500 to-amber-600',
      description: 'Lương làm theo giờ và tiền Tip',
      recentTransactions: [
        { date: '24/11/2024', description: 'Lương ca trực + Tip', amount: 500000 },
        { date: '23/11/2024', description: 'Tip từ khách tour', amount: 30000 },
        { date: '22/11/2024', description: 'Lương ca dọn phòng', amount: 400000 },
      ],
    },
    production: {
      balance: 22500000,
      label: 'Ví Sản xuất',
      icon: 'ri-plant-line',
      color: 'from-green-500 to-emerald-600',
      description: 'Tiền từ bán nông sản, dược liệu',
      recentTransactions: [
        { date: '15/01/2024', description: 'Thanh toán Cà Gai Leo', amount: 8750000 },
        { date: '10/01/2024', description: 'Thanh toán Hoàng Tinh', amount: 5200000 },
      ],
    },
    savings: {
      balance: 19250000,
      label: 'Ví Tích lũy/Hưu trí',
      icon: 'ri-bank-line',
      color: 'from-blue-500 to-indigo-600',
      description: 'Từ bán Tín chỉ Carbon và cổ tức dài hạn',
      recentTransactions: [
        { date: '15/01/2024', description: 'Bán Tín chỉ Carbon', amount: 3750000 },
        { date: '28/12/2023', description: 'Cổ tức quý 4/2023', amount: 12500000 },
      ],
      locked: true,
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const toggleChecklistItem = (taskId: string, itemId: string) => {
    // Handle checklist toggle
    console.log('Toggle', taskId, itemId);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 truncate">Chế độ Dịch vụ</h1>
              <p className="text-orange-100 text-xs sm:text-sm md:text-base truncate">Xin chào, Anh Minh</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <RoleSwitcher />
            {/* Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              >
                <i className="ri-menu-line"></i>
                <span className="hidden sm:inline">Menu</span>
              </button>
              
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                      {[
                        { id: 'shifts', label: 'Lịch Ca Trực', icon: 'ri-calendar-todo-line' },
                        { id: 'tasks', label: 'Nhiệm vụ', icon: 'ri-task-line' },
                        { id: 'wallet', label: 'Ví Dịch vụ', icon: 'ri-wallet-3-line' },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as TabType);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            activeTab === tab.id
                              ? 'bg-orange-50 text-orange-600 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <i className={tab.icon}></i>
                          <span>{tab.label}</span>
                          {activeTab === tab.id && (
                            <i className="ri-check-line ml-auto text-orange-600"></i>
                          )}
                        </button>
                      ))}
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          navigate('/farmer/service-community');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-group-line"></i>
                        <span>Cộng đồng Dịch vụ</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/farmer');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-plant-line"></i>
                        <span>Nông trại</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/home');
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-logout-box-line"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100 mb-1">Chế độ hiện tại</p>
              <p className="text-lg font-bold">Dịch vụ</p>
            </div>
            <button
              onClick={() => navigate('/farmer')}
              className="px-4 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
            >
              <i className="ri-arrow-left-right-line mr-2"></i>
              Chuyển sang Nông trại
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-1 shadow-md flex gap-1">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'shifts'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-calendar-todo-line mr-1"></i>
            Lịch Ca Trực
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-task-line mr-1"></i>
            Nhiệm vụ
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Shifts Tab */}
        {activeTab === 'shifts' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Lịch làm việc Tuần này</h2>
              <div className="space-y-3">
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    className={`border-2 rounded-xl p-4 ${
                      shift.status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : shift.status === 'in-progress'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{shift.position}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            shift.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : shift.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {shift.status === 'completed' ? 'Đã hoàn thành' :
                             shift.status === 'in-progress' ? 'Đang làm' : 'Sắp tới'}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>{shift.day}, {shift.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-time-line"></i>
                            <span>{shift.startTime} - {shift.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line"></i>
                            <span>{shift.location}</span>
                          </div>
                          {shift.checkedIn && shift.checkedInTime && (
                            <div className="flex items-center gap-2 text-green-600">
                              <i className="ri-checkbox-circle-line"></i>
                              <span>Đã check-in lúc {shift.checkedInTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {shift.status === 'upcoming' && (
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                          <i className="ri-login-box-line mr-2"></i>
                          Check-in vào ca
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                          <i className="ri-exchange-line mr-2"></i>
                          Đề nghị đổi ca
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {serviceTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{task.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-map-pin-line"></i>
                      <span>{task.location}</span>
                      <span>•</span>
                      <i className="ri-time-line"></i>
                      <span>Hạn: {task.deadline}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    task.type === 'housekeeping' ? 'bg-blue-100 text-blue-700' :
                    task.type === 'chef' ? 'bg-orange-100 text-orange-700' :
                    task.type === 'tour-guide' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {task.type === 'housekeeping' ? 'Buồng phòng' :
                     task.type === 'chef' ? 'Bếp' :
                     task.type === 'tour-guide' ? 'Hướng dẫn viên' : 'Lễ tân'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Check-list (Bắt buộc tích):</p>
                  {task.checklist.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklistItem(task.id, item.id)}
                        className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                      />
                      <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.item}
                      </span>
                      {item.id === 'c5' && task.type === 'housekeeping' && (
                        <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                          <i className="ri-camera-line mr-1"></i>
                          Chụp ảnh
                        </button>
                      )}
                    </label>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg">
                  <i className="ri-check-line mr-2"></i>
                  Hoàn thành nhiệm vụ
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="space-y-4">
            {/* VITA Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Điểm tín nhiệm VITA</h3>
                  <p className="text-sm text-gray-600">Dựa trên tuân thủ quy trình</p>
                </div>
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#F97316"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - serviceWallet.vitaScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{serviceWallet.vitaScore}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <i className="ri-seedling-line text-xl text-green-600 mb-1"></i>
                  <div className="text-xs text-gray-600">Vitality</div>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <i className="ri-shield-check-line text-xl text-blue-600 mb-1"></i>
                  <div className="text-xs text-gray-600">Integrity</div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <i className="ri-hand-heart-line text-xl text-purple-600 mb-1"></i>
                  <div className="text-xs text-gray-600">Trust</div>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <i className="ri-file-list-3-line text-xl text-orange-600 mb-1"></i>
                  <div className="text-xs text-gray-600">Account</div>
                </div>
              </div>
            </div>

            {/* Wallet Sub Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setWalletSubTab('overview')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
                  walletSubTab === 'overview'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white'
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setWalletSubTab('multi-wallet')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap min-w-fit ${
                  walletSubTab === 'multi-wallet'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white'
                }`}
              >
                Đa ngăn Ví
              </button>
            </div>

            {/* Overview Content */}
            {walletSubTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
                  <h2 className="text-xl font-bold mb-4">Ví Dịch vụ</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Lương theo giờ</span>
                  <span className="text-xl font-bold">{serviceWallet.hourlyWage.toLocaleString('vi-VN')} đ/giờ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tổng giờ làm: {serviceWallet.totalHours} giờ</span>
                  <span className="text-lg font-semibold">{(serviceWallet.hourlyWage * serviceWallet.totalHours).toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Thưởng doanh số Tour</span>
                  <span className="text-lg font-semibold">{serviceWallet.bonus.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/30 pt-3">
                  <span className="text-lg font-semibold">Tiền Tip từ khách</span>
                  <span className="text-2xl font-bold text-yellow-300">{serviceWallet.tips.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/30 pt-3 mt-3">
                  <span className="text-xl font-bold">Tổng thu nhập</span>
                  <span className="text-3xl font-bold">{serviceWallet.total.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>
            </div>

            {/* QR Code for Rating & Tipping */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Mã QR của bạn</h3>
                  <p className="text-sm text-gray-600">Khách quét để chấm điểm và gửi tip</p>
                </div>
                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  {showQRCode ? 'Ẩn QR' : 'Xem QR'}
                </button>
              </div>
              
              {showQRCode && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
                  <div className="text-center mb-4">
                    <div className="w-48 h-48 bg-white rounded-xl p-4 mx-auto mb-3 shadow-lg">
                      <img
                        src={memberQRCode.qrCodeUrl}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="font-bold text-gray-900 mb-1">{memberQRCode.memberName}</div>
                    <div className="text-xs text-gray-600">ID: {memberQRCode.memberId}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-xs text-gray-700">
                    <i className="ri-information-line mr-1 text-blue-600"></i>
                    <strong>Hướng dẫn:</strong> Khách hàng quét mã QR này để đánh giá dịch vụ và gửi tiền tip. 
                    Tiền tip và điểm đánh giá sẽ được cập nhật tức thời lên ứng dụng của bạn.
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Tip gần đây</h3>
              <div className="space-y-3">
                {serviceWallet.recentTips.map((tip, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <p className="font-medium text-gray-900">{tip.service}</p>
                      <p className="text-sm text-gray-600">{tip.customer} • {tip.date}</p>
                    </div>
                    <div className="text-lg font-bold text-green-600">+{tip.amount.toLocaleString('vi-VN')} đ</div>
                  </div>
                ))}
              </div>
            </div>
              </div>
            )}

            {/* Multi-Wallet Content */}
            {walletSubTab === 'multi-wallet' && (
              <div className="space-y-4">
                {Object.entries(walletCompartments).map(([key, wallet]) => (
                  <div key={key} className={`bg-gradient-to-br ${wallet.color} rounded-2xl shadow-lg p-6 text-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <i className={`${wallet.icon} text-2xl`}></i>
                          <h3 className="text-xl font-bold">{wallet.label}</h3>
                          {wallet.locked && (
                            <span className="px-2 py-1 bg-white/20 rounded text-xs">
                              <i className="ri-lock-line mr-1"></i>
                              Khóa
                            </span>
                          )}
                        </div>
                        <p className="text-sm opacity-90 mb-3">{wallet.description}</p>
                        <div className="text-3xl font-bold mb-4">{formatCurrency(wallet.balance)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-xs opacity-90 mb-2">Giao dịch gần đây</div>
                      <div className="space-y-2">
                        {wallet.recentTransactions.map((tx, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div>
                              <div className="font-medium">{tx.description}</div>
                              <div className="text-xs opacity-75">{tx.date}</div>
                            </div>
                            <div className="font-bold">+{formatCurrency(tx.amount)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!wallet.locked && (
                      <button className="w-full mt-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                        <i className="ri-bank-card-line mr-2"></i>
                        Rút tiền
                      </button>
                    )}
                    {wallet.locked && (
                      <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs">
                        <i className="ri-information-line mr-1"></i>
                        Ví này được khóa để dành cho tương lai. Bạn có thể rút theo kỳ hạn đã đặt.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => {
              setActiveTab('shifts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeTab === 'shifts' 
                ? 'text-orange-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-home-5-line text-2xl"></i>
            <span className="text-xs font-medium">Trang chủ</span>
          </button>
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeTab === 'wallet' 
                ? 'text-orange-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs font-medium">Ví Dịch vụ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/service-community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="ri-group-line text-2xl"></i>
            <span className="text-xs font-medium">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}

