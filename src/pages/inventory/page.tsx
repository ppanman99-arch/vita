import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/feature/BottomNav';

export default function Inventory() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const inventoryItems = [
    { 
      id: 1, 
      name: 'Phân hữu cơ', 
      current: 50, 
      total: 100, 
      unit: 'kg',
      icon: 'ri-plant-line',
      color: 'bg-green-500',
      status: 'normal'
    },
    { 
      id: 2, 
      name: 'Thuốc sinh học', 
      current: 15, 
      total: 50, 
      unit: 'lít',
      icon: 'ri-flask-line',
      color: 'bg-purple-500',
      status: 'low'
    },
    { 
      id: 3, 
      name: 'Phân NPK', 
      current: 75, 
      total: 100, 
      unit: 'kg',
      icon: 'ri-seedling-line',
      color: 'bg-lime-500',
      status: 'normal'
    },
    { 
      id: 4, 
      name: 'Thuốc trừ sâu hữu cơ', 
      current: 8, 
      total: 30, 
      unit: 'lít',
      icon: 'ri-bug-line',
      color: 'bg-orange-500',
      status: 'low'
    },
    { 
      id: 5, 
      name: 'Phân vi sinh', 
      current: 40, 
      total: 50, 
      unit: 'kg',
      icon: 'ri-leaf-line',
      color: 'bg-teal-500',
      status: 'normal'
    },
    { 
      id: 6, 
      name: 'Chế phẩm sinh học', 
      current: 5, 
      total: 20, 
      unit: 'lít',
      icon: 'ri-test-tube-line',
      color: 'bg-blue-500',
      status: 'critical'
    }
  ];

  const getPercentage = (current: number, total: number) => {
    return (current / total) * 100;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const handleRequest = (itemName: string) => {
    setSelectedItem(itemName);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = () => {
    setShowRequestModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <h1 className="text-lg font-bold">Quản lý Vật tư</h1>
              <p className="text-xs text-emerald-100">Theo dõi tồn kho</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-lg"></i>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-lg text-green-600"></i>
              </div>
              <span className="text-xs text-gray-600">Đủ dùng</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alert-line text-lg text-red-600"></i>
              </div>
              <span className="text-xs text-gray-600">Sắp hết</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>

        {/* Inventory List */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">Danh sách vật tư</h2>
        <div className="space-y-3">
          {inventoryItems.map((item) => {
            const percentage = getPercentage(item.current, item.total);
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <i className={`${item.icon} text-2xl text-white`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{item.name}</h3>
                    <p className="text-xs text-gray-600">
                      {item.current} / {item.total} {item.unit}
                    </p>
                  </div>
                  {item.status !== 'normal' && (
                    <button
                      onClick={() => handleRequest(item.name)}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Yêu cầu
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStatusColor(item.status)} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 text-right">{percentage.toFixed(0)}% còn lại</p>
                </div>

                {/* Status Badge */}
                {item.status === 'critical' && (
                  <div className="mt-2.5 bg-red-50 border border-red-200 rounded-lg p-2.5">
                    <p className="text-xs text-red-700 flex items-center gap-1.5">
                      <i className="ri-error-warning-line"></i>
                      <span>Cần bổ sung gấp!</span>
                    </p>
                  </div>
                )}
                {item.status === 'low' && (
                  <div className="mt-2.5 bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
                    <p className="text-xs text-yellow-700 flex items-center gap-1.5">
                      <i className="ri-alert-line"></i>
                      <span>Sắp hết, cần bổ sung</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-shopping-cart-line text-4xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Yêu cầu cấp phát</h3>
              <p className="text-sm text-gray-600">Gửi yêu cầu cấp thêm: <span className="font-semibold">{selectedItem}</span></p>
            </div>

            {/* Quantity Selection */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng cần cấp</label>
              <div className="flex items-center gap-3">
                <button className="w-11 h-11 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-subtract-line text-lg text-gray-700"></i>
                </button>
                <input 
                  type="number" 
                  defaultValue="20"
                  className="flex-1 px-3 py-2.5 border-2 border-gray-300 rounded-lg text-center text-sm font-semibold outline-none focus:border-green-600"
                />
                <button className="w-11 h-11 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-add-line text-lg text-gray-700"></i>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <button 
                onClick={handleSubmitRequest}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Gửi yêu cầu
              </button>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="inventory" />
    </div>
  );
}
