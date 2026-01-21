import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coopList, calculateDistance, CoopData } from '../../shared/coop-data';

export default function CoopWorkerPortal() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'salary'>('distance');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Lấy vị trí người dùng khi component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Không thể lấy vị trí:', error);
        }
      );
    }
  }, []);

  // Lọc và sắp xếp HTX
  let filteredCoops: (CoopData & { distance?: number })[] = coopList.filter(coop => {
    // Chỉ hiển thị HTX đang tuyển xã viên sản xuất
    if (!coop.isRecruiting || !coop.recruitingType.includes('Sản xuất')) return false;
    if (selectedRegion !== 'all' && coop.region !== selectedRegion) return false;
    if (selectedProduct !== 'all' && coop.mainProduct !== selectedProduct) return false;
    if (selectedRating > 0 && coop.rating < selectedRating) return false;
    return true;
  });

  // Tính khoảng cách và sắp xếp
  if (userLocation && sortBy === 'distance') {
    filteredCoops = filteredCoops.map(coop => ({
      ...coop,
      distance: coop.latitude && coop.longitude 
        ? calculateDistance(userLocation.lat, userLocation.lon, coop.latitude, coop.longitude)
        : Infinity
    })).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
  } else if (sortBy === 'rating') {
    filteredCoops = filteredCoops.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'salary') {
    filteredCoops = filteredCoops.sort((a, b) => {
      const aSalary = parseFloat(a.workerInfo?.salaryRange.split('-')[1]?.replace(' triệu/tháng', '').trim() || '0');
      const bSalary = parseFloat(b.workerInfo?.salaryRange.split('-')[1]?.replace(' triệu/tháng', '').trim() || '0');
      return bSalary - aSalary;
    });
  }

  const getRatingBadge = (score: number) => {
    if (score === 5) return { text: 'Kim Cương', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    if (score === 4) return { text: 'Vàng', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' };
    return { text: 'Bạc', color: 'bg-gradient-to-r from-gray-400 to-gray-600' };
  };

  const hasActiveFilters = selectedRegion !== 'all' || selectedProduct !== 'all' || selectedRating > 0;

  const statsCoops = coopList.filter(coop => coop.isRecruiting && coop.recruitingType.includes('Sản xuất'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <i className="ri-user-line"></i>
              <span>Đăng nhập</span>
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <i className="ri-user-settings-line text-lg"></i>
              </div>
              <h1 className="text-lg font-bold">Cổng Xã viên Góp sức</h1>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm mx-auto">
              Tìm công việc tại HTX gần bạn. Mức lương hợp lý, điều kiện làm việc tốt
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{statsCoops.length}</div>
              <div className="text-xs text-white/80 mt-0.5">HTX đang tuyển</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {statsCoops.reduce((sum, c) => sum + (c.members || 0), 0).toLocaleString()}
              </div>
              <div className="text-xs text-white/80 mt-0.5">Xã viên</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {userLocation ? '📍' : '---'}
              </div>
              <div className="text-xs text-white/80 mt-0.5">
                {userLocation ? 'Đã định vị' : 'Chưa định vị'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">5-12</div>
              <div className="text-xs text-white/80 mt-0.5">Triệu/tháng</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Sort & Filter Toggle */}
        <div className="mb-4 space-y-2">
          {/* Sort Options */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSortBy('distance')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                sortBy === 'distance'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-map-pin-line mr-1"></i>
              Gần nhất
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                sortBy === 'rating'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-star-line mr-1"></i>
              Đánh giá cao
            </button>
            <button
              onClick={() => setSortBy('salary')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                sortBy === 'salary'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-money-dollar-circle-line mr-1"></i>
              Lương cao
            </button>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-3 bg-white rounded-xl shadow-md flex items-center justify-between px-4 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2">
              <i className="ri-filter-3-line text-xl text-blue-600"></i>
              <span className="font-semibold text-gray-800">Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <i className={`ri-arrow-${showFilters ? 'up' : 'down'}-s-line text-xl text-gray-600 transition-transform`}></i>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-4 space-y-3">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-map-pin-line mr-1 text-blue-600"></i>
                Vùng địa lý
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">Tất cả vùng</option>
                <option value="Tây Bắc">Tây Bắc</option>
                <option value="Tây Nguyên">Tây Nguyên</option>
                <option value="Miền Trung">Miền Trung</option>
              </select>
            </div>

            {/* Product Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-plant-line mr-1 text-blue-600"></i>
                Dược liệu chủ lực
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">Tất cả loại</option>
                <option value="Sâm Ngọc Linh">Sâm Ngọc Linh</option>
                <option value="Đương Quy">Đương Quy</option>
                <option value="Quế, Hồi">Quế, Hồi</option>
                <option value="Dược liệu hữu cơ">Dược liệu hữu cơ</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-star-line mr-1 text-blue-600"></i>
                Xếp hạng tối thiểu
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="0">Tất cả</option>
                <option value="5">5 Sao (Kim Cương)</option>
                <option value="4">4 Sao trở lên (Vàng)</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedProduct('all');
                  setSelectedRating(0);
                }}
                className="w-full py-2.5 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Tìm thấy <span className="font-bold text-blue-600">{filteredCoops.length}</span> HTX đang tuyển
          </p>
        </div>

        {/* Coop Cards */}
        <div className="space-y-4">
          {filteredCoops.map((coop) => {
            const ratingBadge = getRatingBadge(coop.greenlightScore);
            const distance = coop.distance;

            return (
              <div
                key={coop.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden active:scale-98 transition-all"
              >
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={coop.coverImage}
                    alt={coop.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className={`absolute top-3 left-3 ${ratingBadge.color} text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1`}>
                    <i className="ri-shield-star-line text-sm"></i>
                    {ratingBadge.text}
                  </div>

                  {/* Distance Badge */}
                  {userLocation && distance !== undefined && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                      <i className="ri-map-pin-line text-sm"></i>
                      {distance.toFixed(1)} km
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">{coop.name}</h3>

                  {/* Key Metrics - Worker Focused */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-money-dollar-circle-line text-lg text-blue-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{coop.workerInfo?.salaryRange}</div>
                        <div className="text-xs text-gray-500">Mức lương</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-briefcase-line text-lg text-emerald-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-emerald-600">{coop.workerInfo?.availablePositions.length || 0}</div>
                        <div className="text-xs text-gray-500">Vị trí tuyển</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-team-line text-lg text-purple-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{(coop.members / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-500">Xã viên</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-star-fill text-lg text-orange-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-600">{coop.rating}/5</div>
                        <div className="text-xs text-gray-500">Đánh giá</div>
                      </div>
                    </div>
                  </div>

                  {/* Worker Info */}
                  {coop.workerInfo && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs font-medium text-blue-800 mb-2">Thông tin tuyển dụng:</div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-gray-600">Vị trí: </span>
                          <span className="text-xs font-semibold text-gray-800">
                            {coop.workerInfo.availablePositions.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-600">Điều kiện: </span>
                          <span className="text-xs text-gray-700">
                            {coop.workerInfo.workConditions.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-600">Quyền lợi: </span>
                          <span className="text-xs text-gray-700">
                            {coop.workerInfo.benefits.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      {coop.district || coop.region}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center gap-1">
                      <i className="ri-plant-line"></i>
                      {coop.mainProduct}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/coop-worker-portal/register?coopId=${coop.id}`)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Xem chi tiết & Ứng tuyển</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCoops.length === 0 && (
          <div className="text-center py-16">
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-lg text-gray-500 font-medium">Không tìm thấy HTX phù hợp</p>
            <p className="text-sm text-gray-400 mt-2">Thử điều chỉnh bộ lọc của bạn</p>
          </div>
        )}
      </div>
    </div>
  );
}
