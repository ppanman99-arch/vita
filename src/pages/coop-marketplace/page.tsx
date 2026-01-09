import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CoopData {
  id: string;
  name: string;
  region: string;
  mainProduct: string;
  coverImage: string;
  rating: number;
  annualReturn: number;
  area: number;
  members: number;
  greenlightScore: 5 | 4 | 3;
  isRecruiting: boolean;
  recruitingType: string[];
}

const coopList: CoopData[] = [
  {
    id: 'htx-sin-ho',
    name: 'HTX Dược Liệu Hữu Cơ Sìn Hồ',
    region: 'Tây Bắc',
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=aerial%20view%20of%20vast%20ginseng%20plantation%20in%20misty%20mountains%20terraced%20fields%20organic%20farming%20northern%20vietnam%20highlands%20lush%20green%20landscape%20sustainable%20agriculture%20morning%20fog%20rolling%20hills%20traditional%20medicinal%20herb%20cultivation&width=800&height=500&seq=htx1&orientation=landscape',
    rating: 5,
    annualReturn: 18,
    area: 500,
    members: 1200,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn', 'Sản xuất']
  },
  {
    id: 'htx-kon-tum',
    name: 'HTX Dược Liệu Kon Tum',
    region: 'Tây Nguyên',
    mainProduct: 'Sâm Ngọc Linh',
    coverImage: 'https://readdy.ai/api/search-image?query=panoramic%20drone%20shot%20of%20highland%20medicinal%20herb%20farm%20central%20highlands%20vietnam%20organized%20cultivation%20rows%20modern%20greenhouse%20structures%20mountain%20backdrop%20blue%20sky%20professional%20organic%20farming%20cooperative&width=800&height=500&seq=htx2&orientation=landscape',
    rating: 5,
    annualReturn: 15,
    area: 350,
    members: 850,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn']
  },
  {
    id: 'htx-lam-dong',
    name: 'HTX Dược Liệu Lâm Đồng',
    region: 'Tây Nguyên',
    mainProduct: 'Đương Quy',
    coverImage: 'https://readdy.ai/api/search-image?query=beautiful%20aerial%20view%20of%20angelica%20herb%20plantation%20lam%20dong%20province%20vietnam%20neat%20cultivation%20beds%20irrigation%20system%20pine%20forest%20surrounding%20cool%20climate%20agriculture%20sustainable%20farming%20cooperative&width=800&height=500&seq=htx3&orientation=landscape',
    rating: 4,
    annualReturn: 12,
    area: 280,
    members: 620,
    greenlightScore: 4,
    isRecruiting: true,
    recruitingType: ['Sản xuất', 'Tiêu dùng']
  },
  {
    id: 'htx-da-lat',
    name: 'HTX Nông Nghiệp Sạch Đà Lạt',
    region: 'Tây Nguyên',
    mainProduct: 'Dược liệu hữu cơ',
    coverImage: 'https://readdy.ai/api/search-image?query=modern%20organic%20medicinal%20herb%20greenhouse%20complex%20da%20lat%20vietnam%20high%20tech%20agriculture%20controlled%20environment%20clean%20cultivation%20rows%20of%20medicinal%20plants%20professional%20farming%20facility%20mountain%20valley%20setting&width=800&height=500&seq=htx4&orientation=landscape',
    rating: 5,
    annualReturn: 16,
    area: 420,
    members: 980,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn', 'Tiêu dùng']
  },
  {
    id: 'htx-tay-nguyen',
    name: 'HTX Khoa Học Dược Liệu Tây Nguyên',
    region: 'Tây Nguyên',
    mainProduct: 'Nghiên cứu & Ươm giống',
    coverImage: 'https://readdy.ai/api/search-image?query=research%20facility%20and%20nursery%20for%20medicinal%20plants%20central%20highlands%20vietnam%20modern%20laboratory%20building%20experimental%20cultivation%20plots%20seedling%20greenhouse%20scientific%20agriculture%20innovation%20center%20professional%20setup&width=800&height=500&seq=htx5&orientation=landscape',
    rating: 5,
    annualReturn: 20,
    area: 150,
    members: 320,
    greenlightScore: 5,
    isRecruiting: true,
    recruitingType: ['Góp vốn']
  },
  {
    id: 'htx-quang-nam',
    name: 'HTX Dược Liệu Quảng Nam',
    region: 'Miền Trung',
    mainProduct: 'Quế, Hồi',
    coverImage: 'https://readdy.ai/api/search-image?query=cinnamon%20and%20star%20anise%20plantation%20quang%20nam%20vietnam%20traditional%20spice%20cultivation%20hillside%20terraces%20mature%20trees%20harvesting%20area%20rural%20cooperative%20farming%20natural%20landscape%20sustainable%20forestry&width=800&height=500&seq=htx6&orientation=landscape',
    rating: 4,
    annualReturn: 14,
    area: 600,
    members: 1450,
    greenlightScore: 4,
    isRecruiting: false,
    recruitingType: []
  }
];

const CoopMarketplace = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedRecruiting, setSelectedRecruiting] = useState<string>('all');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredCoops = coopList.filter(coop => {
    if (selectedRegion !== 'all' && coop.region !== selectedRegion) return false;
    if (selectedProduct !== 'all' && coop.mainProduct !== selectedProduct) return false;
    if (selectedRating > 0 && coop.rating < selectedRating) return false;
    if (selectedRecruiting !== 'all') {
      if (selectedRecruiting === 'capital' && !coop.recruitingType.includes('Góp vốn')) return false;
      if (selectedRecruiting === 'production' && !coop.recruitingType.includes('Sản xuất')) return false;
    }
    return true;
  });

  const toggleCompare = (coopId: string) => {
    if (compareList.includes(coopId)) {
      setCompareList(compareList.filter(id => id !== coopId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, coopId]);
      }
    }
  };

  const getRatingBadge = (score: number) => {
    if (score === 5) return { text: 'Kim Cương', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    if (score === 4) return { text: 'Vàng', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' };
    return { text: 'Bạc', color: 'bg-gradient-to-r from-gray-400 to-gray-600' };
  };

  const hasActiveFilters = selectedRegion !== 'all' || selectedProduct !== 'all' || selectedRating > 0 || selectedRecruiting !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-6">
      {/* Header - Compact for Mobile */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
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
                <i className="ri-store-3-line text-lg"></i>
              </div>
              <h1 className="text-lg font-bold">Sàn Kết Nối HTX</h1>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm mx-auto">
              Khám phá và lựa chọn Hợp tác xã phù hợp với bạn
            </p>
          </div>

          {/* Stats - 2x2 Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{coopList.length}</div>
              <div className="text-xs text-white/80 mt-0.5">Hợp tác xã</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {(coopList.reduce((sum, c) => sum + c.members, 0) / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-white/80 mt-0.5">Xã viên</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {coopList.reduce((sum, c) => sum + c.area, 0).toLocaleString()}
              </div>
              <div className="text-xs text-white/80 mt-0.5">Diện tích (ha)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">
                {Math.round(coopList.reduce((sum, c) => sum + c.annualReturn, 0) / coopList.length)}%
              </div>
              <div className="text-xs text-white/80 mt-0.5">Lợi tức TB</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Filter Toggle Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-3 bg-white rounded-xl shadow-md flex items-center justify-between px-4 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2">
              <i className="ri-filter-3-line text-xl text-emerald-600"></i>
              <span className="font-semibold text-gray-800">Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              )}
            </div>
            <i className={`ri-arrow-${showFilters ? 'up' : 'down'}-s-line text-xl text-gray-600 transition-transform`}></i>
          </button>
        </div>

        {/* Filters - Collapsible */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-4 space-y-3">
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-map-pin-line mr-1 text-emerald-600"></i>
                Vùng địa lý
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
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
                <i className="ri-plant-line mr-1 text-emerald-600"></i>
                Dược liệu chủ lực
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
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
                <i className="ri-star-line mr-1 text-emerald-600"></i>
                Xếp hạng tối thiểu
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="0">Tất cả</option>
                <option value="5">5 Sao (Kim Cương)</option>
                <option value="4">4 Sao trở lên (Vàng)</option>
              </select>
            </div>

            {/* Recruiting Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-user-add-line mr-1 text-emerald-600"></i>
                Đang tuyển dụng
              </label>
              <select
                value={selectedRecruiting}
                onChange={(e) => setSelectedRecruiting(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="all">Tất cả</option>
                <option value="capital">Xã viên Góp vốn</option>
                <option value="production">Xã viên Sản xuất</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedProduct('all');
                  setSelectedRating(0);
                  setSelectedRecruiting('all');
                }}
                className="w-full py-2.5 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        )}

        {/* Compare Bar - Fixed Bottom */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <i className="ri-scales-line text-lg text-emerald-600"></i>
                <span className="text-sm font-medium text-gray-700">
                  Đã chọn {compareList.length}/3
                </span>
              </div>
              <button
                onClick={() => setCompareList([])}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Xóa
              </button>
            </div>
            {compareList.length >= 2 && (
              <button
                onClick={() => navigate('/coop-compare', { state: { compareList } })}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg active:scale-98 transition-all whitespace-nowrap"
              >
                So sánh {compareList.length} HTX
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Tìm thấy <span className="font-bold text-emerald-600">{filteredCoops.length}</span> hợp tác xã
          </p>
        </div>

        {/* Coop Cards - Single Column for Mobile */}
        <div className="space-y-4" style={{ paddingBottom: compareList.length > 0 ? '120px' : '0' }}>
          {filteredCoops.map((coop) => {
            const ratingBadge = getRatingBadge(coop.greenlightScore);
            const isInCompare = compareList.includes(coop.id);

            return (
              <div
                key={coop.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden active:scale-98 transition-all ${
                  isInCompare ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {/* Cover Image - Reduced Height */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={coop.coverImage}
                    alt={coop.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Rating Badge - Smaller */}
                  <div className={`absolute top-3 left-3 ${ratingBadge.color} text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1`}>
                    <i className="ri-shield-star-line text-sm"></i>
                    {ratingBadge.text}
                  </div>

                  {/* Compare Checkbox - Smaller */}
                  <button
                    onClick={() => toggleCompare(coop.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                      isInCompare
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/90 text-gray-600'
                    }`}
                  >
                    <i className={`${isInCompare ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'} text-lg`}></i>
                  </button>

                  {/* Recruiting Badge - Smaller */}
                  {coop.isRecruiting && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                      <i className="ri-user-add-line text-sm"></i>
                      Đang tuyển
                    </div>
                  )}
                </div>

                {/* Content - Compact */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">{coop.name}</h3>

                  {/* Key Metrics - 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-money-dollar-circle-line text-lg text-emerald-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-emerald-600">{coop.annualReturn}%</div>
                        <div className="text-xs text-gray-500">Lợi tức/năm</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-map-2-line text-lg text-blue-600"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{coop.area}</div>
                        <div className="text-xs text-gray-500">Diện tích (ha)</div>
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

                  {/* Info Tags - Smaller */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      {coop.region}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center gap-1">
                      <i className="ri-plant-line"></i>
                      {coop.mainProduct}
                    </span>
                  </div>

                  {/* Recruiting Types - Compact */}
                  {coop.isRecruiting && coop.recruitingType.length > 0 && (
                    <div className="mb-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="text-xs font-medium text-emerald-800 mb-2">Đang tuyển:</div>
                      <div className="flex flex-wrap gap-2">
                        {coop.recruitingType.map((type) => (
                          <span
                            key={type}
                            className="px-2.5 py-1 bg-white text-emerald-700 rounded-full text-xs font-medium border border-emerald-200 flex items-center gap-1"
                          >
                            {type === 'Góp vốn' && <i className="ri-hand-coin-line"></i>}
                            {type === 'Sản xuất' && <i className="ri-seedling-line"></i>}
                            {type === 'Tiêu dùng' && <i className="ri-shopping-cart-line"></i>}
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/coop-detail/${coop.id}`)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Xem chi tiết</span>
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
};

export default CoopMarketplace;
