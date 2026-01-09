import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import UrbanBottomNav from '../../components/feature/UrbanBottomNav';

export default function MyFarm() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('assets');

  const myAssets = [
    {
      id: 1,
      name: 'Vườn Quýt #VQ247',
      type: 'Cây ăn quả',
      investment: '500.000đ',
      currentValue: '725.000đ',
      profit: '+225.000đ',
      profitPercent: '+45%',
      status: 'Đang ra hoa',
      progress: 65,
      harvestDate: '45 ngày nữa',
      image: 'https://readdy.ai/api/search-image?query=beautiful%20Vietnamese%20citrus%20orchard%20with%20blooming%20flowers%2C%20healthy%20green%20trees%2C%20mountain%20landscape%20background%2C%20peaceful%20farming%20scene%2C%20natural%20sunlight%2C%20professional%20photography&width=800&height=500&seq=farm1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Đàn Gà Ri #GR089',
      type: 'Chăn nuôi',
      investment: '300.000đ',
      currentValue: '380.000đ',
      profit: '+80.000đ',
      profitPercent: '+27%',
      status: 'Đang phát triển',
      progress: 40,
      harvestDate: '60 ngày nữa',
      image: 'https://readdy.ai/api/search-image?query=free-range%20chickens%20in%20Vietnamese%20mountain%20farm%2C%20natural%20outdoor%20setting%2C%20healthy%20birds%2C%20green%20grass%2C%20traditional%20farming%2C%20authentic%20rural%20scene%20photography&width=800&height=500&seq=farm2&orientation=landscape'
    }
  ];

  const activities = [
    {
      date: '15/11/2024',
      time: '07:30',
      farmer: 'Bác Đinh Văn A',
      action: 'Bón phân hữu cơ',
      asset: 'Vườn Quýt #VQ247',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20applying%20organic%20fertilizer%20to%20citrus%20trees%2C%20working%20in%20orchard%2C%20natural%20farming%20practice%2C%20authentic%20rural%20scene%2C%20morning%20light%20photography&width=400&height=300&seq=act1&orientation=landscape'
    },
    {
      date: '14/11/2024',
      time: '16:00',
      farmer: 'Bác Đinh Văn A',
      action: 'Kiểm tra sâu bệnh',
      asset: 'Vườn Quýt #VQ247',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20inspecting%20citrus%20tree%20leaves%20for%20pests%2C%20close-up%20examination%2C%20careful%20farming%20practice%2C%20natural%20outdoor%20setting%2C%20professional%20documentation%20photography&width=400&height=300&seq=act2&orientation=landscape'
    },
    {
      date: '12/11/2024',
      time: '08:00',
      farmer: 'Gia đình Hoàng Văn Dũng',
      action: 'Cho gà ăn thức ăn hữu cơ',
      asset: 'Đàn Gà Ri #GR089',
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20farmer%20feeding%20free-range%20chickens%20with%20organic%20feed%2C%20outdoor%20farm%20setting%2C%20healthy%20birds%20eating%2C%20traditional%20farming%20practice%2C%20natural%20light%20photography&width=400&height=300&seq=act3&orientation=landscape'
    }
  ];

  const investmentOptions = [
    {
      id: 1,
      name: 'Vườn Quýt Hữu Cơ',
      minInvest: '500.000đ',
      expectedReturn: '40-50%',
      duration: '4 tháng',
      available: 12,
      image: 'https://readdy.ai/api/search-image?query=Vietnamese%20citrus%20orchard%20aerial%20view%2C%20organized%20rows%20of%20orange%20trees%2C%20mountain%20landscape%2C%20professional%20farming%2C%20investment%20opportunity%20visualization%2C%20clean%20simple%20background&width=600&height=400&seq=inv1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Đàn Gà Ri Thả Vườn',
      minInvest: '300.000đ',
      expectedReturn: '25-35%',
      duration: '3 tháng',
      available: 8,
      image: 'https://readdy.ai/api/search-image?query=free-range%20chicken%20farm%20in%20Vietnamese%20mountains%2C%20healthy%20birds%20in%20natural%20setting%2C%20organized%20farming%20area%2C%20investment%20opportunity%2C%20clean%20simple%20background&width=600&height=400&seq=inv2&orientation=landscape'
    },
    {
      id: 3,
      name: 'Vườn Chè Shan Tuyết',
      minInvest: '800.000đ',
      expectedReturn: '50-60%',
      duration: '6 tháng',
      available: 5,
      image: 'https://readdy.ai/api/search-image?query=ancient%20Vietnamese%20tea%20plantation%20on%20mountain%20slopes%2C%20Shan%20Tuyet%20tea%20trees%2C%20misty%20landscape%2C%20premium%20tea%20farming%2C%20investment%20opportunity%20visualization%2C%20clean%20simple%20background&width=600&height=400&seq=inv3&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 sm:py-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-auto" label="" />
            <div>
              <h1 className="text-base sm:text-lg font-bold">Nông Trại Của Tôi</h1>
              <p className="text-xs text-emerald-100">Quản lý tài sản đầu tư</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ri-apps-2-line text-base sm:text-lg"></i>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[56px] sm:top-[64px] z-30">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 overflow-x-auto">
          <div className="flex gap-4 sm:gap-8 min-w-max">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-3 sm:py-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base ${
                selectedTab === 'overview'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setSelectedTab('activities')}
              className={`py-3 sm:py-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base ${
                selectedTab === 'activities'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Nhật ký sinh trưởng
            </button>
            <button
              onClick={() => setSelectedTab('invest')}
              className={`py-3 sm:py-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base ${
                selectedTab === 'invest'
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đầu tư thêm
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            {myAssets.map((asset) => (
              <div key={asset.id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
                {/* Asset Image */}
                <div className="relative w-full h-48 sm:h-64">
                  <img 
                    src={asset.image} 
                    alt={asset.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      {asset.status}
                    </span>
                  </div>
                  <button className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-camera-line text-lg sm:text-2xl text-green-700"></i>
                  </button>
                </div>

                {/* Asset Info */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">{asset.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-500">{asset.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Lợi nhuận</p>
                      <p className="text-lg sm:text-2xl font-bold text-green-700">{asset.profit}</p>
                      <p className="text-xs sm:text-sm text-green-600">{asset.profitPercent}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm font-semibold text-gray-700">Tiến độ sinh trưởng</p>
                      <p className="text-xs sm:text-sm text-gray-600">{asset.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-2.5 sm:h-3 transition-all"
                        style={{ width: `${asset.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Dự kiến thu hoạch sau {asset.harvestDate}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <p className="text-xs text-gray-500 mb-1">Vốn đầu tư</p>
                      <p className="text-base sm:text-lg font-bold text-gray-800">{asset.investment}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <p className="text-xs text-gray-500 mb-1">Giá trị hiện tại</p>
                      <p className="text-base sm:text-lg font-bold text-gray-800">{asset.currentValue}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button className="flex-1 bg-green-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                      <i className="ri-live-line text-lg sm:text-xl"></i>
                      <span className="hidden sm:inline">Xem Camera trực tiếp</span>
                      <span className="sm:hidden">Camera trực tiếp</span>
                    </button>
                    <button className="sm:flex-none px-6 py-2.5 sm:py-3 border-2 border-green-700 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors whitespace-nowrap cursor-pointer">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activities Tab */}
        {selectedTab === 'activities' && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Nhật ký sinh trưởng</h2>
              <p className="text-xs sm:text-sm text-gray-600">Theo dõi mọi hoạt động chăm sóc tài sản của bạn</p>
            </div>

            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-plant-line text-lg sm:text-2xl text-green-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1">{activity.action}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{activity.asset}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line"></i>
                          <span className="truncate max-w-[120px] sm:max-w-none">{activity.farmer}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          {activity.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.action}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Invest Tab */}
        {selectedTab === 'invest' && (
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Cơ hội đầu tư mới</h2>
              <p className="text-xs sm:text-sm text-gray-600">Mở rộng danh mục đầu tư của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {investmentOptions.map((option) => (
                <div key={option.id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="relative w-full h-40 sm:h-48">
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <span className="bg-white text-green-700 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold">
                        Còn {option.available} suất
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">{option.name}</h3>

                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">Đầu tư tối thiểu</span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">{option.minInvest}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">Lợi nhuận kỳ vọng</span>
                        <span className="text-xs sm:text-sm font-semibold text-green-700">{option.expectedReturn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">Thời gian</span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">{option.duration}</span>
                      </div>
                    </div>

                    <button className="w-full bg-green-700 text-white py-2.5 sm:py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors whitespace-nowrap cursor-pointer">
                      Đầu tư ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <UrbanBottomNav active="farm" />
    </div>
  );
}
