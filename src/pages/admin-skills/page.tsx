import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';

type TabType = 'skills' | 'scheduler' | 'tasks' | 'ratings' | 'payroll' | 'hospitality';

interface Skill {
  id: string;
  name: string;
  category: 'agriculture' | 'service' | 'management';
  level: number; // 1-5
  certified: boolean;
  certifiedDate?: string;
}

interface Member {
  id: string;
  name: string;
  skills: Array<{ skillId: string; level: number; certified: boolean }>;
  totalTasks: number;
  rating: number;
  totalEarnings: number;
}

interface Task {
  id: string;
  type: 'agriculture' | 'service';
  name: string;
  member: string;
  startTime: string;
  endTime?: string;
  date: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  requiredSkills: string[];
  conflictCheck: boolean;
}

export default function AdminSkillsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('skills');

  // Mock data
  const members: Member[] = [
    {
      id: 'M001',
      name: 'Bác Nguyễn Văn A',
      skills: [
        { skillId: 'skill-001', level: 5, certified: true },
        { skillId: 'skill-002', level: 3, certified: true },
        { skillId: 'skill-003', level: 4, certified: true },
      ],
      totalTasks: 45,
      rating: 4.8,
      totalEarnings: 8500000,
    },
    {
      id: 'M002',
      name: 'Chị Trần Thị B',
      skills: [
        { skillId: 'skill-001', level: 4, certified: true },
        { skillId: 'skill-004', level: 5, certified: true },
      ],
      totalTasks: 32,
      rating: 4.9,
      totalEarnings: 7200000,
    },
  ];

  const skills: Skill[] = [
    { id: 'skill-001', name: 'Trồng Sâm', category: 'agriculture', level: 5, certified: true, certifiedDate: '2024-01-15' },
    { id: 'skill-002', name: 'Nấu ăn', category: 'service', level: 3, certified: true, certifiedDate: '2024-06-20' },
    { id: 'skill-003', name: 'Dẫn tour leo núi', category: 'service', level: 4, certified: true, certifiedDate: '2024-08-10' },
    { id: 'skill-004', name: 'Dọn buồng phòng', category: 'service', level: 5, certified: true, certifiedDate: '2024-09-05' },
    { id: 'skill-005', name: 'Trồng Rau hữu cơ', category: 'agriculture', level: 4, certified: true },
    { id: 'skill-006', name: 'Lễ tân', category: 'service', level: 2, certified: false },
  ];

  const todayTasks: Task[] = [
    {
      id: 'T001',
      type: 'agriculture',
      name: 'Tưới nước vườn ươm',
      member: 'Bác Nguyễn Văn A',
      startTime: '06:00',
      endTime: '08:00',
      date: '2024-11-25',
      location: 'Vườn ươm A',
      status: 'completed',
      priority: 'medium',
      requiredSkills: ['skill-001'],
      conflictCheck: false,
    },
    {
      id: 'T002',
      type: 'service',
      name: 'Dẫn đoàn khách 5 người tham quan vườn Sâm',
      member: 'Bác Nguyễn Văn A',
      startTime: '09:00',
      endTime: '11:00',
      date: '2024-11-25',
      location: 'Cổng vào',
      status: 'in-progress',
      priority: 'high',
      requiredSkills: ['skill-003'],
      conflictCheck: true,
    },
    {
      id: 'T003',
      type: 'service',
      name: 'Dọn dẹp Bungalow số 3',
      member: 'Bác Nguyễn Văn A',
      startTime: '14:00',
      endTime: '16:00',
      date: '2024-11-25',
      location: 'Bungalow 3',
      status: 'pending',
      priority: 'medium',
      requiredSkills: ['skill-004'],
      conflictCheck: false,
    },
  ];

  const serviceRatings = [
    {
      id: 'R001',
      member: 'Bác Nguyễn Văn A',
      service: 'Dẫn tour tham quan vườn Sâm',
      customer: 'Anh Minh',
      rating: 5,
      tip: 50000,
      comment: 'Bác A kể chuyện rừng rất hay',
      date: '2024-11-24',
    },
    {
      id: 'R002',
      member: 'Chị Trần Thị B',
      service: 'Dọn buồng phòng',
      customer: 'Chị Lan',
      rating: 5,
      tip: 30000,
      comment: 'Phòng rất sạch sẽ, chị B rất cẩn thận',
      date: '2024-11-24',
    },
  ];

  const payroll = [
    {
      member: 'Bác Nguyễn Văn A',
      agricultureSalary: 5000000,
      serviceSalary: 3000000,
      tips: 500000,
      total: 8500000,
      tasks: { agriculture: 25, service: 20 },
    },
    {
      member: 'Chị Trần Thị B',
      agricultureSalary: 3200000,
      serviceSalary: 4000000,
      tips: 300000,
      total: 7500000,
      tasks: { agriculture: 15, service: 17 },
    },
  ];

  const getSkillName = (skillId: string) => {
    return skills.find(s => s.id === skillId)?.name || skillId;
  };

  const getSkillCategoryColor = (category: string) => {
    switch (category) {
      case 'agriculture': return 'from-green-500 to-emerald-600';
      case 'service': return 'from-orange-500 to-amber-600';
      case 'management': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Skill Bank & Task Scheduler - Kinh tế Lao động Đa nhiệm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'skills', label: 'Ngân hàng Kỹ năng', icon: 'ri-user-star-line' },
              { id: 'scheduler', label: 'Phân Ca & Giao Việc', icon: 'ri-calendar-todo-line' },
              { id: 'tasks', label: 'Lịch trình Hợp nhất', icon: 'ri-time-line' },
              { id: 'ratings', label: 'Đánh giá Dịch vụ', icon: 'ri-star-line' },
              { id: 'payroll', label: 'Bảng Lương Tổng hợp', icon: 'ri-money-dollar-circle-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Skills Bank Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Danh sách Kỹ năng</h3>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700">
                    <i className="ri-add-line mr-2"></i>
                    Thêm kỹ năng mới
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getSkillCategoryColor(skill.category)} rounded-lg flex items-center justify-center`}>
                          <i className="ri-star-line text-white text-xl"></i>
                        </div>
                        {skill.certified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            <i className="ri-checkbox-circle-line mr-1"></i>
                            Đã cấp chứng chỉ
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{skill.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>Bậc: </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <i
                                key={level}
                                className={`ri-star-${level <= skill.level ? 'fill' : 'line'} ${
                                  level <= skill.level ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="font-semibold text-gray-900">{skill.level}/5</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {skill.category === 'agriculture' ? 'Nông nghiệp' :
                           skill.category === 'service' ? 'Dịch vụ' : 'Quản lý'}
                        </div>
                        {skill.certifiedDate && (
                          <div className="text-xs text-gray-500">
                            Cấp ngày: {skill.certifiedDate}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members with Skills */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Xã viên & Kỹ năng</h3>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">{member.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Tổng nhiệm vụ: <strong>{member.totalTasks}</strong></span>
                            <span>Đánh giá: <strong className="text-yellow-600">{member.rating}/5</strong></span>
                            <span>Thu nhập: <strong className="text-green-600">{member.totalEarnings.toLocaleString('vi-VN')} đ</strong></span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                          <i className="ri-pencil-line mr-2"></i>
                          Chỉnh sửa
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((memberSkill, idx) => {
                          const skill = skills.find(s => s.id === memberSkill.skillId);
                          if (!skill) return null;
                          return (
                            <div
                              key={idx}
                              className="px-3 py-2 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{skill.name}</span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <i
                                      key={level}
                                      className={`ri-star-${level <= memberSkill.level ? 'fill' : 'line'} text-xs ${
                                        level <= memberSkill.level ? 'text-yellow-500' : 'text-gray-300'
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                                {memberSkill.certified && (
                                  <i className="ri-checkbox-circle-line text-green-600 text-sm"></i>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scheduler Tab */}
          {activeTab === 'scheduler' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Phân Ca & Giao Việc</h3>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700">
                    <i className="ri-add-line mr-2"></i>
                    Tạo nhiệm vụ mới
                  </button>
                </div>

                {/* Task Type Toggle */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
                  <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium shadow-sm">
                    <i className="ri-plant-line mr-2"></i>
                    Việc Nông (Linh hoạt)
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg text-sm font-medium">
                    <i className="ri-time-line mr-2"></i>
                    Việc Dịch vụ (Cố định)
                  </button>
                </div>

                {/* Create Task Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Tạo nhiệm vụ mới</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loại nhiệm vụ</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Việc Nông - Tưới nước vườn ươm</option>
                        <option>Việc Dịch vụ - Dẫn tour</option>
                        <option>Việc Dịch vụ - Dọn buồng phòng</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Xã viên</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Bác Nguyễn Văn A</option>
                        <option>Chị Trần Thị B</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian bắt đầu</label>
                      <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="09:00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian kết thúc</label>
                      <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="11:00" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Cổng vào / Vườn ươm A / Bungalow 3" />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <i className="ri-alert-line text-yellow-600 mt-0.5"></i>
                      <div className="text-sm text-yellow-800">
                        <strong>Cảnh báo xung đột:</strong> Bác A đang có nhiệm vụ "Thu hoạch Sâm gấp" (Ưu tiên cao) vào lúc 9:00. Hãy giao cho Bác B.
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700">
                    <i className="ri-check-line mr-2"></i>
                    Giao việc
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Timeline Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Lịch trình Hợp nhất - Bác Nguyễn Văn A</h3>
                <div className="space-y-4">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`border-l-4 rounded-lg p-4 ${
                        task.type === 'agriculture'
                          ? 'bg-green-50 border-green-500'
                          : 'bg-orange-50 border-orange-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              task.type === 'agriculture'
                                ? 'bg-green-500'
                                : 'bg-orange-500'
                            }`}>
                              <i className={`${
                                task.type === 'agriculture' ? 'ri-plant-line' : 'ri-service-line'
                              } text-white text-xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{task.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <i className="ri-time-line"></i>
                                  {task.startTime} - {task.endTime || 'Linh hoạt'}
                                </span>
                                <span className="flex items-center gap-1">
                                  <i className="ri-map-pin-line"></i>
                                  {task.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          {task.type === 'service' && (
                            <div className="mt-2 text-xs text-gray-600">
                              <i className="ri-information-line mr-1"></i>
                              Yêu cầu: Check-in đón khách tại Cổng, Check-out khi kết thúc tour
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded text-xs font-medium ${
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status === 'completed' ? 'Hoàn thành' :
                             task.status === 'in-progress' ? 'Đang làm' : 'Chờ thực hiện'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ratings Tab */}
          {activeTab === 'ratings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Đánh giá & Tip từ Khách hàng</h3>
                <div className="space-y-4">
                  {serviceRatings.map((rating) => (
                    <div key={rating.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{rating.member}</h4>
                          <p className="text-sm text-gray-600">{rating.service}</p>
                          <p className="text-xs text-gray-500 mt-1">Khách: {rating.customer} • {rating.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`ri-star-${star <= rating.rating ? 'fill' : 'line'} text-yellow-500`}
                              ></i>
                            ))}
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            +{rating.tip.toLocaleString('vi-VN')} đ Tip
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                        <i className="ri-message-3-line mr-2"></i>
                        "{rating.comment}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code for Service Rating */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Mã QR Đánh giá Dịch vụ</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Khách hàng quét mã QR này để chấm điểm và gửi tip cho xã viên
                </p>
                <div className="bg-white rounded-lg p-4 w-48 h-48 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-qr-code-line text-6xl text-gray-400"></i>
                </div>
                <button className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700">
                  <i className="ri-download-line mr-2"></i>
                  Tải mã QR
                </button>
              </div>
            </div>
          )}

          {/* Payroll Tab */}
          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Bảng Lương Tổng hợp - Tháng 11/2024</h3>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    <i className="ri-download-line mr-2"></i>
                    Xuất Excel
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Xã viên</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lương Sản xuất</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lương Dịch vụ</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tiền Tip</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tổng thu nhập</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nhiệm vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payroll.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium text-gray-900">{item.member}</td>
                          <td className="py-4 px-4 text-green-600 font-semibold">
                            {item.agricultureSalary.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-4 px-4 text-orange-600 font-semibold">
                            {item.serviceSalary.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-4 px-4 text-blue-600 font-semibold">
                            {item.tips.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-4 px-4 text-gray-900 font-bold text-lg">
                            {item.total.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            <span className="text-green-600">{item.tasks.agriculture} nông</span>
                            {' • '}
                            <span className="text-orange-600">{item.tasks.service} dịch vụ</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Hospitality Management Tab */}
          {activeTab === 'hospitality' && (
            <div className="space-y-6">
              {/* Live Staff Map */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Sơ đồ Nhân sự Thời gian thực</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { name: 'Ông A', position: 'Đang dẫn khách', location: 'Thác nước', status: 'busy', gps: true },
                    { name: 'Bà B', position: 'Đang dọn dẹp', location: 'Khu Bungalow', status: 'busy', gps: true },
                    { name: 'Cô C', position: 'Rảnh (Standby)', location: 'Nhà bếp', status: 'available', gps: false },
                  ].map((staff, idx) => (
                    <div
                      key={idx}
                      className={`border-2 rounded-lg p-4 ${
                        staff.status === 'busy'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                          <p className="text-sm text-gray-600">{staff.position}</p>
                        </div>
                        {staff.gps && (
                          <i className="ri-map-pin-2-line text-red-500 text-xl"></i>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <i className="ri-map-pin-line mr-1"></i>
                        {staff.location}
                      </div>
                      {staff.status === 'available' && (
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                          <i className="ri-phone-line mr-2"></i>
                          Gọi ngay: "Ra cổng đón khách"
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-information-line text-blue-600"></i>
                    <h4 className="font-semibold text-gray-900">Điều phối nóng</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Có đoàn khách lẻ mới đến cổng {'->'} Quản lý bấm vào Cô C {'->'} "Ra cổng đón khách ngay"
                  </p>
                </div>
              </div>

              {/* Booking & Roster Planning */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quản lý Booking & Phân Ca</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-calendar-line text-indigo-600"></i>
                    <h4 className="font-semibold text-gray-900">Ngày mai có 50 khách</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Hệ thống tính toán: "Với 50 khách, cần 2 đầu bếp, 3 phục vụ, 2 hướng dẫn viên"
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">2</div>
                      <div className="text-xs text-gray-600">Đầu bếp</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">3</div>
                      <div className="text-xs text-gray-600">Phục vụ</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">2</div>
                      <div className="text-xs text-gray-600">Hướng dẫn viên</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Phân bổ nhân sự:</h4>
                  {[
                    { position: 'Đầu bếp', members: ['Ông A', 'Bà B'], time: '06:00 - 14:00' },
                    { position: 'Phục vụ', members: ['Cô C', 'Chị D', 'Anh E'], time: '11:00 - 19:00' },
                    { position: 'Hướng dẫn viên', members: ['Bác F', 'Chú G'], time: '08:00 - 17:00' },
                  ].map((role, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{role.position}</h5>
                        <span className="text-sm text-gray-600">{role.time}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.members.map((member, mIdx) => (
                          <span key={mIdx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Control */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quản lý Chất lượng - Ngôi sao Dịch vụ</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Bác Nguyễn Văn A', rating: 4.8, totalReviews: 45, status: 'excellent' },
                    { name: 'Chị Trần Thị B', rating: 4.9, totalReviews: 38, status: 'excellent' },
                    { name: 'Anh Lê Văn C', rating: 2.3, totalReviews: 12, status: 'warning' },
                  ].map((member, idx) => (
                    <div
                      key={idx}
                      className={`border-2 rounded-lg p-4 ${
                        member.status === 'warning'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`ri-star-${star <= Math.round(member.rating) ? 'fill' : 'line'} text-yellow-500`}
                                ></i>
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{member.rating}/5</span>
                            <span className="text-xs text-gray-500">({member.totalReviews} đánh giá)</span>
                          </div>
                        </div>
                        {member.status === 'warning' && (
                          <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-medium">
                            Cảnh báo
                          </span>
                        )}
                      </div>
                      {member.status === 'warning' && (
                        <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <i className="ri-alert-line mr-2"></i>
                            Xã viên này bị khách chê (1-2 sao) nhiều lần. Hệ thống cảnh báo {'->'} Quản lý mời đi đào tạo lại hoặc cắt lịch làm dịch vụ (chỉ cho làm ruộng).
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                              Mời đào tạo lại
                            </button>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                              Chỉ cho làm ruộng
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

