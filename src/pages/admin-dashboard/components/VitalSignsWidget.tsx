export default function VitalSignsWidget() {
  const vitalSigns = [
    {
      id: 1,
      title: 'Tổng diện tích',
      value: '245',
      unit: 'ha',
      icon: 'ri-landscape-line',
      status: 'normal',
      change: '+5.2%',
      changeType: 'increase'
    },
    {
      id: 2,
      title: 'Số hộ hoạt động',
      value: '187',
      unit: 'hộ',
      icon: 'ri-group-line',
      status: 'normal',
      change: '+12',
      changeType: 'increase'
    },
    {
      id: 3,
      title: 'Sản lượng dự kiến',
      value: '1,250',
      unit: 'tấn',
      icon: 'ri-shopping-basket-line',
      status: 'normal',
      change: '+8.5%',
      changeType: 'increase'
    },
    {
      id: 4,
      title: 'Cảnh báo rủi ro',
      value: '3',
      unit: 'vùng',
      icon: 'ri-alert-line',
      status: 'warning',
      change: '+2',
      changeType: 'increase'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'warning': return 'bg-red-50 border-red-200';
      case 'alert': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  const getIconColor = (status: string) => {
    switch(status) {
      case 'warning': return 'bg-red-100 text-red-600';
      case 'alert': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
      {vitalSigns.map((sign) => (
        <div key={sign.id} className={`bg-white rounded-xl p-3 sm:p-6 border-2 ${getStatusColor(sign.status)} shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${getIconColor(sign.status)}`}>
              <i className={`${sign.icon} text-lg sm:text-2xl`}></i>
            </div>
            <span className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
              sign.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {sign.change}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{sign.title}</h3>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-3xl font-bold text-gray-800">{sign.value}</span>
            <span className="text-xs sm:text-sm text-gray-500">{sign.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
