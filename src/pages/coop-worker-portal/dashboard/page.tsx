import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coopList } from '../../../shared/coop-data';

export default function CoopWorkerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'worklog' | 'salary' | 'profile'>('overview');
  
  const coopId = sessionStorage.getItem('coop_worker_coopId') || '';
  const selectedCoop = coopList.find(c => c.id === coopId);
  const workerPhone = sessionStorage.getItem('coop_worker_phone') || '';
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    address: '',
    experience: '',
  });

  // Mock data - tasks
  const tasks = [
    {
      id: 1,
      title: 'Chăm sóc cây Sâm Ngọc Linh - Lô A1',
      description: 'Tưới nước, bón phân cho 100 cây Sâm',
      status: 'in-progress',
      dueDate: '20/01/2025',
      priority: 'high',
      progress: 60
    },
    {
      id: 2,
      title: 'Thu hái Đương Quy',
      description: 'Thu hái 50kg Đương Quy tại khu vực B2',
      status: 'pending',
      dueDate: '22/01/2025',
      priority: 'medium',
      progress: 0
    },
    {
      id: 3,
      title: 'Kiểm tra chất lượng dược liệu',
      description: 'Kiểm tra và ghi nhận chất lượng dược liệu sau thu hoạch',
      status: 'completed',
      dueDate: '18/01/2025',
      priority: 'low',
      progress: 100
    }
  ];

  // Mock data - worklog
  const worklogs = [
    {
      id: 1,
      date: '18/01/2025',
      tasks: ['Chăm sóc cây Sâm', 'Kiểm tra chất lượng'],
      hours: 8,
      status: 'completed'
    },
    {
      id: 2,
      date: '17/01/2025',
      tasks: ['Trồng cây giống', 'Tưới nước'],
      hours: 7.5,
      status: 'completed'
    }
  ];

  // Mock data - salary
  const salaryInfo = {
    currentMonth: 8500000,
    lastMonth: 7800000,
    pending: 450000,
    upcoming: 9000000
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem('coop_worker_authenticated');
    if (!isAuthenticated) {
      navigate('/coop-worker-portal');
      return;
    }

    // Load profile data from localStorage
    const savedProfile = localStorage.getItem(`coop_worker_profile_${coopId}`);
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData({
        fullName: parsed.fullName || '',
        email: parsed.email || '',
        address: parsed.address || '',
        experience: parsed.experience || '',
      });
      if (parsed.fullName) {
        sessionStorage.setItem('coop_worker_name', parsed.fullName);
      }
    }
  }, [navigate, coopId]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/coop-worker-portal')}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Quản lý Công việc</h1>
                <p className="text-xs text-white/80">{selectedCoop?.name || 'HTX'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-white/80">Xin chào</p>
                <p className="text-sm font-semibold">{profileData.fullName || workerPhone || 'Xã viên'}</p>
              </div>
              <button
                onClick={() => {
                  sessionStorage.removeItem('coop_worker_authenticated');
                  navigate('/coop-worker-portal');
                }}
                className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 active:scale-95 transition-all"
              >
                <i className="ri-logout-box-line mr-1"></i>
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
              { id: 'tasks', label: 'Công việc', icon: 'ri-task-line' },
              { id: 'worklog', label: 'Nhật ký', icon: 'ri-file-list-3-line' },
              { id: 'salary', label: 'Lương thưởng', icon: 'ri-money-dollar-circle-line' },
              { id: 'profile', label: 'Hồ sơ', icon: 'ri-user-line' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'in-progress').length}</div>
                <div className="text-xs text-gray-600 mt-1">Đang làm</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'pending').length}</div>
                <div className="text-xs text-gray-600 mt-1">Chờ thực hiện</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
                <div className="text-xs text-gray-600 mt-1">Hoàn thành</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-2xl font-bold text-emerald-600">{(salaryInfo.currentMonth / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-gray-600 mt-1">Lương tháng</div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-task-line text-blue-600"></i>
                Công việc gần đây
              </h3>
              <div className="space-y-3">
                {tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{task.title}</p>
                      <p className="text-xs text-gray-600">Hạn: {task.dueDate}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status === 'completed' ? 'Hoàn thành' : task.status === 'in-progress' ? 'Đang làm' : 'Chờ'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span><i className="ri-calendar-line mr-1"></i>Hạn: {task.dueDate}</span>
                      <span className={getPriorityColor(task.priority)}>
                        <i className="ri-flag-line mr-1"></i>
                        {task.priority === 'high' ? 'Ưu tiên cao' : task.priority === 'medium' ? 'Ưu tiên trung bình' : 'Ưu tiên thấp'}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status === 'completed' ? 'Hoàn thành' : task.status === 'in-progress' ? 'Đang làm' : 'Chờ'}
                  </span>
                </div>
                {task.progress > 0 && task.progress < 100 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {task.status !== 'completed' && (
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                    {task.status === 'in-progress' ? 'Tiếp tục' : 'Bắt đầu'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab: Worklog */}
        {activeTab === 'worklog' && (
          <div className="space-y-4">
            {worklogs.map(log => (
              <div key={log.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{log.date}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
                    Hoàn thành
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  {log.tasks.map((taskName, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <i className="ri-checkbox-circle-fill text-green-500"></i>
                      {taskName}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-time-line"></i>
                  <span>Tổng thời gian: {log.hours} giờ</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Salary */}
        {activeTab === 'salary' && (
          <div className="space-y-6">
            {/* Current Month */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm text-white/80 mb-2">Lương tháng này</p>
              <p className="text-3xl font-bold mb-2">{(salaryInfo.currentMonth / 1000000).toFixed(1)} triệu VNĐ</p>
              <p className="text-xs text-white/80">Dự kiến cuối tháng: {(salaryInfo.upcoming / 1000000).toFixed(1)} triệu</p>
            </div>

            {/* Salary Details */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Chi tiết Lương</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Lương cơ bản</span>
                  <span className="font-semibold text-gray-900">{((salaryInfo.currentMonth * 0.7) / 1000000).toFixed(1)} triệu</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Thưởng năng suất</span>
                  <span className="font-semibold text-emerald-600">{((salaryInfo.currentMonth * 0.3) / 1000000).toFixed(1)} triệu</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">Tổng</span>
                  <span className="text-lg font-bold text-blue-600">{(salaryInfo.currentMonth / 1000000).toFixed(1)} triệu</span>
                </div>
              </div>
            </div>

            {/* Last Month */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tháng trước</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tổng lương tháng 12/2024</span>
                <span className="text-xl font-bold text-gray-900">{(salaryInfo.lastMonth / 1000000).toFixed(1)} triệu VNĐ</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              // Save to localStorage
              localStorage.setItem(`coop_worker_profile_${coopId}`, JSON.stringify(profileData));
              if (profileData.fullName) {
                sessionStorage.setItem('coop_worker_name', profileData.fullName);
              }
              alert('Đã lưu thông tin hồ sơ thành công!');
            }}>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Thông tin Cá nhân</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={workerPhone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      placeholder="Xã, Huyện, Tỉnh"
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kinh nghiệm
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={profileData.experience}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                      placeholder="VD: 2 năm trồng trọt"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Thông tin HTX</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HTX đang tham gia</label>
                    <input
                      type="text"
                      value={selectedCoop?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí công việc</label>
                    <input
                      type="text"
                      value={selectedCoop?.workerInfo?.availablePositions.join(', ') || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <i className="ri-save-line mr-2"></i>
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
