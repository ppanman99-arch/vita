import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';

interface ForestryTask {
  id: string;
  title: string;
  description: string;
  lot: string;
  treeType: string;
  quantity: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  reward: number; // VNĐ
  type: 'plant' | 'prune' | 'check' | 'report';
}

interface CheckInRecord {
  id: string;
  taskId: string;
  date: string;
  images: string[];
  treesAlive: number;
  treesDead: number;
  canopyCoverage?: number; // %
  notes: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function FarmerForestryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tasks' | 'checkin' | 'history'>('tasks');
  const [selectedTask, setSelectedTask] = useState<ForestryTask | null>(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInForm, setCheckInForm] = useState({
    treesAlive: '',
    treesDead: '',
    canopyCoverage: '',
    notes: '',
    images: [] as string[],
  });

  // Mock data - Tasks từ HTX
  const forestryTasks: ForestryTask[] = [
    {
      id: 'task-001',
      title: 'Trồng dặm 50 cây Mega 3P tại Lô A',
      description: 'Trồng dặm các cây bị chết, đảm bảo mật độ 600 cây/ha',
      lot: 'Lô A - 2ha',
      treeType: 'Mega 3P',
      quantity: 50,
      deadline: '2024-08-15',
      status: 'pending',
      reward: 500000,
      type: 'plant',
    },
    {
      id: 'task-002',
      title: 'Tỉa cành tạo tán cho 200 cây Keo tai tượng',
      description: 'Tỉa cành dưới, nâng tán để ánh sáng lọt xuống cho dược liệu',
      lot: 'Lô B - 3ha',
      treeType: 'Keo tai tượng',
      quantity: 200,
      deadline: '2024-08-20',
      status: 'in-progress',
      reward: 800000,
      type: 'prune',
    },
    {
      id: 'task-003',
      title: 'Kiểm tra sống/chết và đo che phủ',
      description: 'Đếm số cây còn sống, chụp ảnh tán rừng để đo độ che phủ',
      lot: 'Lô C - 1.5ha',
      treeType: 'Mega 3P',
      quantity: 900,
      deadline: '2024-08-10',
      status: 'completed',
      reward: 300000,
      type: 'check',
    },
  ];

  const checkInHistory: CheckInRecord[] = [
    {
      id: 'checkin-001',
      taskId: 'task-003',
      date: '2024-08-05',
      images: ['https://readdy.ai/api/search-image?query=forest%20canopy%20coverage%20measurement%20from%20ground%20view%20upward%20camera%20angle%20trees%20overhead&width=400&height=300&seq=canopy1'],
      treesAlive: 895,
      treesDead: 5,
      canopyCoverage: 65,
      notes: 'Cây phát triển tốt, tán đã khép',
      location: { lat: 22.3456, lng: 103.7890 },
    },
  ];

  const handleStartTask = (task: ForestryTask) => {
    setSelectedTask(task);
    setShowCheckInModal(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setCheckInForm(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
  };

  const handleSubmitCheckIn = () => {
    if (!selectedTask) return;
    
    // Simulate AI analysis for canopy coverage
    const canopyCoverage = checkInForm.canopyCoverage 
      ? parseInt(checkInForm.canopyCoverage) 
      : Math.floor(Math.random() * (80 - 40 + 1)) + 40;

    alert(`✅ Đã báo cáo tiến độ!\n\nNhiệm vụ: ${selectedTask.title}\nCây sống: ${checkInForm.treesAlive}\nCây chết: ${checkInForm.treesDead}\nĐộ che phủ: ${canopyCoverage}%\n\nTiền công sẽ được chuyển vào ví sau khi HTX xác nhận.`);
    
    setShowCheckInModal(false);
    setCheckInForm({
      treesAlive: '',
      treesDead: '',
      canopyCoverage: '',
      notes: '',
      images: [],
    });
    setSelectedTask(null);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'plant': return 'ri-plant-line';
      case 'prune': return 'ri-scissors-line';
      case 'check': return 'ri-checkbox-circle-line';
      case 'report': return 'ri-file-text-line';
      default: return 'ri-task-line';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ thực hiện';
      case 'in-progress': return 'Đang làm';
      case 'completed': return 'Hoàn thành';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-600 to-green-700 text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto" label="" />
          <h1 className="text-2xl font-bold">Rừng Giao Khoán</h1>
          <div className="w-10"></div>
        </div>
        <p className="text-green-100 text-sm">Quản lý nhiệm vụ chăm sóc cây gỗ lớn</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 sticky top-0 z-10">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-lime-600 to-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className="ri-task-line mr-2"></i>
            Nhiệm vụ
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'checkin'
                ? 'bg-gradient-to-r from-lime-600 to-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className="ri-camera-line mr-2"></i>
            Báo cáo
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-lime-600 to-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className="ri-history-line mr-2"></i>
            Lịch sử
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {activeTab === 'tasks' && (
          <>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border-l-4 border-lime-500">
              <div className="flex items-center gap-3">
                <i className="ri-information-line text-2xl text-lime-600"></i>
                <div>
                  <h3 className="font-semibold text-gray-900">Tiền công tách biệt</h3>
                  <p className="text-sm text-gray-600">
                    Tiền công chăm Dược liệu và Tiền công chăm Rừng được tính riêng. Tiền công Rừng được trích từ ngân sách ESG.
                  </p>
                </div>
              </div>
            </div>

            {forestryTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl shadow-sm p-5 border-2 ${getTaskStatusColor(task.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-green-500' : 
                      task.status === 'in-progress' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    } text-white`}>
                      <i className={`${getTaskIcon(task.type)} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          <i className="ri-map-pin-line mr-1"></i>
                          {task.lot}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          <i className="ri-tree-line mr-1"></i>
                          {task.treeType}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          <i className="ri-calendar-line mr-1"></i>
                          {new Date(task.deadline).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Tiền công</p>
                    <p className="text-lg font-bold text-lime-600">
                      {task.reward.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="px-4 py-2 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 transition-colors"
                      >
                        Bắt đầu
                      </button>
                    )}
                    {task.status === 'in-progress' && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Báo cáo
                      </button>
                    )}
                    {task.status === 'completed' && (
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                        <i className="ri-check-line mr-1"></i>
                        Đã hoàn thành
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'checkin' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Báo cáo Tiến độ</h3>
              <p className="text-gray-600 mb-4">
                Chọn nhiệm vụ đang thực hiện để báo cáo tiến độ và chụp ảnh.
              </p>
              <button
                onClick={() => {
                  const inProgressTask = forestryTasks.find(t => t.status === 'in-progress');
                  if (inProgressTask) {
                    handleStartTask(inProgressTask);
                  } else {
                    alert('Bạn chưa có nhiệm vụ đang thực hiện.');
                  }
                }}
                className="w-full px-6 py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <i className="ri-camera-line mr-2"></i>
                Tạo báo cáo mới
              </button>
            </div>

            {checkInHistory.map((record) => {
              const task = forestryTasks.find(t => t.id === record.taskId);
              return (
                <div key={record.id} className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{task?.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  {record.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {record.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`Check-in ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Cây sống</p>
                      <p className="font-bold text-green-600">{record.treesAlive} cây</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cây chết</p>
                      <p className="font-bold text-red-600">{record.treesDead} cây</p>
                    </div>
                    {record.canopyCoverage && (
                      <div className="col-span-2">
                        <p className="text-gray-600">Độ che phủ</p>
                        <p className="font-bold text-lime-600">{record.canopyCoverage}%</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {forestryTasks.filter(t => t.status === 'completed').map((task) => (
              <div key={task.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <i className="ri-calendar-line mr-1"></i>
                        Hoàn thành: {new Date(task.deadline).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-green-600 font-semibold">
                        <i className="ri-money-dollar-circle-line mr-1"></i>
                        +{task.reward.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                  <i className="ri-checkbox-circle-fill text-3xl text-green-500"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Check-in Modal */}
      {showCheckInModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Báo cáo Tiến độ</h3>
              <button
                onClick={() => {
                  setShowCheckInModal(false);
                  setSelectedTask(null);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-lime-50 p-4 rounded-lg border border-lime-200">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedTask.title}</h4>
                <p className="text-sm text-gray-700">{selectedTask.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chụp ảnh cây gỗ lớn <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hệ thống sẽ dùng AI để đo chiều cao và đường kính thân cây
                </p>
                {checkInForm.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {checkInForm.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số cây còn sống <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={checkInForm.treesAlive}
                  onChange={(e) => setCheckInForm(prev => ({ ...prev, treesAlive: e.target.value }))}
                  placeholder="Nhập số lượng"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số cây chết
                </label>
                <input
                  type="number"
                  value={checkInForm.treesDead}
                  onChange={(e) => setCheckInForm(prev => ({ ...prev, treesDead: e.target.value }))}
                  placeholder="Nhập số lượng"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chụp ảnh tán rừng (để đo độ che phủ)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        // Simulate AI analysis
                        const coverage = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
                        setCheckInForm(prev => ({
                          ...prev,
                          canopyCoverage: coverage.toString(),
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                />
                {checkInForm.canopyCoverage && (
                  <p className="text-sm text-lime-600 mt-2">
                    <i className="ri-checkbox-circle-line mr-1"></i>
                    Độ che phủ: {checkInForm.canopyCoverage}% (AI đã phân tích)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={checkInForm.notes}
                  onChange={(e) => setCheckInForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Ghi chú thêm về tình trạng cây..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
                />
              </div>

              <button
                onClick={handleSubmitCheckIn}
                disabled={!checkInForm.treesAlive || checkInForm.images.length === 0}
                className="w-full px-6 py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-check-line mr-2"></i>
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

