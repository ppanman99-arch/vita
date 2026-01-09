import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  seedType: string;
  quantity: number;
  lotId: string;
  lotName: string;
  farmerId: string;
  farmerName: string;
  deadline: string;
  status: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed';
}

interface Lot {
  id: string;
  name: string;
  ownerName: string;
  area: number;
  status: 'available' | 'assigned' | 'planted';
}

interface Farmer {
  id: string;
  name: string;
  phone: string;
  activeTasks: number;
  completedTasks: number;
  rating: number;
}

export default function TaskAllocatorPage() {
  const navigate = useNavigate();
  const [selectedSeed, setSelectedSeed] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const seedStock = [
    { id: 'mega-3p', name: 'Mega 3P', quantity: 5000, unit: 'cây', batchId: 'GL-2026-001' },
    { id: 'sam-mo', name: 'Sâm mô 1 tuổi', quantity: 50000, unit: 'cây', batchId: 'GL-2026-002' }
  ];

  const lots: Lot[] = [
    { id: 'lot-5', name: 'Lô 5', ownerName: 'Ông A', area: 2.5, status: 'available' },
    { id: 'lot-7', name: 'Lô 7', ownerName: 'Bà B', area: 3.0, status: 'available' },
    { id: 'lot-10', name: 'Lô 10', ownerName: 'Anh C', area: 1.8, status: 'available' }
  ];

  const farmers: Farmer[] = [
    { id: 'farmer-a', name: 'Ông A', phone: '0901234567', activeTasks: 2, completedTasks: 15, rating: 4.8 },
    { id: 'farmer-b', name: 'Bà B', phone: '0907654321', activeTasks: 1, completedTasks: 20, rating: 4.9 },
    { id: 'farmer-c', name: 'Anh C', phone: '0912345678', activeTasks: 0, completedTasks: 8, rating: 4.5 }
  ];

  const handleDragStart = (seedId: string, quantity: number) => {
    setDragSource(seedId);
    setSelectedQuantity(quantity);
  };

  const handleDrop = (lotId: string, farmerId: string) => {
    if (!dragSource || selectedQuantity === 0) return;

    const seed = seedStock.find(s => s.id === dragSource);
    const lot = lots.find(l => l.id === lotId);
    const farmer = farmers.find(f => f.id === farmerId);

    if (seed && lot && farmer) {
      const newTask: Task = {
        id: `TASK-${Date.now()}`,
        seedType: seed.name,
        quantity: selectedQuantity,
        lotId,
        lotName: lot.name,
        farmerId,
        farmerName: farmer.name,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'assigned'
      };

      setTasks([...tasks, newTask]);
      setDragSource(null);
      setSelectedQuantity(0);

      // Simulate notification to farmer
      alert(`Đã giao nhiệm vụ: ${farmer.name} - Trồng ${selectedQuantity} ${seed.unit} ${seed.name} tại ${lot.name}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin-production')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Task Allocator</h1>
            <p className="text-sm opacity-90">Kéo thả để phân bổ công việc</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Seed Stock */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kho Giống</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seedStock.map((seed) => (
              <div
                key={seed.id}
                draggable
                onDragStart={() => handleDragStart(seed.id, seed.quantity)}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-move hover:border-emerald-400 hover:bg-emerald-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{seed.name}</h3>
                    <p className="text-sm text-gray-600">
                      {seed.quantity.toLocaleString()} {seed.unit} • Batch: {seed.batchId}
                    </p>
                  </div>
                  <i className="ri-drag-move-2-line text-2xl text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lots & Farmers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {lots.map((lot) => {
            const farmer = farmers.find(f => 
              lot.ownerName.includes(f.name.split(' ').pop() || '') || 
              f.name.includes(lot.ownerName.split(' ').pop() || '')
            );
            
            if (!farmer) return null;

            return (
              <div
                key={lot.id}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(lot.id, farmer.id);
                }}
                onDragOver={(e) => e.preventDefault()}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  dragSource ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{lot.name}</h3>
                  <p className="text-sm text-gray-600">
                    Chủ đất: {lot.ownerName} • {lot.area} ha
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-3 h-3 rounded-full ${
                      lot.status === 'available' ? 'bg-green-500' :
                      lot.status === 'assigned' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="text-xs text-gray-600">
                      {lot.status === 'available' ? 'Sẵn sàng' :
                       lot.status === 'assigned' ? 'Đã giao việc' : 'Đã trồng'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Nông dân:</p>
                  <p className="text-sm text-gray-700">{farmer.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span>Đánh giá: {farmer.rating}/5</span>
                    <span>Hoàn thành: {farmer.completedTasks}</span>
                  </div>
                </div>

                {dragSource && (
                  <div className="bg-emerald-100 border-2 border-dashed border-emerald-400 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-emerald-900">
                      Thả vào đây để giao nhiệm vụ
                    </p>
                  </div>
                )}

                {/* Assigned Tasks */}
                {tasks.filter(t => t.lotId === lot.id).length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Nhiệm vụ đã giao:</p>
                    {tasks.filter(t => t.lotId === lot.id).map((task) => (
                      <div key={task.id} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-semibold text-gray-900">{task.seedType}</p>
                        <p className="text-xs text-gray-600">
                          {task.quantity.toLocaleString()} cây • Hạn: {formatDate(task.deadline)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            task.status === 'assigned' ? 'bg-amber-100 text-amber-700' :
                            task.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                            task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status === 'assigned' ? 'Đã giao' :
                             task.status === 'accepted' ? 'Đã nhận' :
                             task.status === 'completed' ? 'Hoàn thành' : 'Chờ'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <i className="ri-information-line mr-2"></i>
            <strong>Hướng dẫn:</strong> Kéo giống từ "Kho Giống" và thả vào lô đất của nông dân để tạo nhiệm vụ. 
            Nông dân sẽ nhận thông báo trên App của họ.
          </p>
        </div>
      </div>
    </div>
  );
}




