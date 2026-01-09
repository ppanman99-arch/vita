import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

interface Vendor {
  id: string;
  name: string;
  type: 'national-center' | 'institute' | 'nursery' | 'tech-nursery';
  location: string;
  certifications: string[];
  technology: 'tissue-culture' | 'seed-sowing' | 'both';
  rating: number;
  reviews: number;
  survivalRate: number; // %
  specialties: string[];
  logo?: string;
  description: string;
}

interface SeedProduct {
  id: string;
  vendorId: string;
  vendorName: string;
  species: string;
  variety: string;
  age: string; // Tuổi cây con
  price: number; // VNĐ/cây
  minOrder: number;
  available: number;
  qualityGrade: 'A+' | 'A' | 'B';
  dnaProfiled: boolean;
  warranty: {
    survivalRate: number; // % tỷ lệ sống tối thiểu
    warrantyPeriod: number; // ngày
  };
  image?: string;
}

export default function SeedMarketplacePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'orders' | 'vouchers' | 'warranty'>('marketplace');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct | null>(null);
  const [filterSpecies, setFilterSpecies] = useState<string>('all');
  const [filterVendor, setFilterVendor] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterTechnology, setFilterTechnology] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - Vendors
  const vendors: Vendor[] = [
    {
      id: 'VIL-001',
      name: 'Viện Dược Liệu Trung ương',
      type: 'institute',
      location: 'Hà Nội',
      certifications: ['ISO 9001', 'Vườn ươm đầu dòng', 'GACP'],
      technology: 'tissue-culture',
      rating: 4.9,
      reviews: 245,
      survivalRate: 95,
      specialties: ['Sâm Ngọc Linh', 'Đương Quy', 'Ba Kích'],
      description: 'Viện nghiên cứu hàng đầu về dược liệu, chuyên cung cấp giống chất lượng cao từ nuôi cấy mô.',
    },
    {
      id: 'TTG-002',
      name: 'Trung tâm Giống Lâm nghiệp Vùng 4',
      type: 'national-center',
      location: 'Đà Lạt, Lâm Đồng',
      certifications: ['ISO 9001', 'Vườn ươm đầu dòng'],
      technology: 'both',
      rating: 4.7,
      reviews: 189,
      survivalRate: 92,
      specialties: ['Keo Lai', 'Gáo Vàng (Mega 3P)', 'Bạch Đàn'],
      description: 'Chuyên cung cấp giống cây lâm nghiệp chất lượng cao cho vùng Tây Nguyên và Nam Trung Bộ.',
    },
    {
      id: 'VU-003',
      name: 'Vườn ươm Công nghệ cao Dalat',
      type: 'tech-nursery',
      location: 'Đà Lạt, Lâm Đồng',
      certifications: ['ISO 9001', 'GlobalGAP'],
      technology: 'tissue-culture',
      rating: 4.8,
      reviews: 156,
      survivalRate: 94,
      specialties: ['Sâm Ngọc Linh', 'Hoàng Tinh', 'Bạch Truật'],
      description: 'Vườn ươm công nghệ cao, chuyên nuôi cấy mô với tỷ lệ sống cao.',
    },
    {
      id: 'VU-004',
      name: 'Vườn ươm HTX Dược liệu Tu Mơ Rông',
      type: 'nursery',
      location: 'Kon Tum',
      certifications: ['VietGAP'],
      technology: 'seed-sowing',
      rating: 4.6,
      reviews: 78,
      survivalRate: 88,
      specialties: ['Sâm Ngọc Linh', 'Cà Gai Leo'],
      description: 'HTX chuyên trồng và ươm giống dược liệu địa phương, giá cả hợp lý.',
    },
  ];

  // Mock data - Seed Products
  const seedProducts: SeedProduct[] = [
    {
      id: 'SP-001',
      vendorId: 'VIL-001',
      vendorName: 'Viện Dược Liệu Trung ương',
      species: 'Sâm Ngọc Linh',
      variety: 'Panax vietnamensis',
      age: '12 tháng tuổi',
      price: 25000,
      minOrder: 1000,
      available: 50000,
      qualityGrade: 'A+',
      dnaProfiled: true,
      warranty: { survivalRate: 90, warrantyPeriod: 15 },
    },
    {
      id: 'SP-002',
      vendorId: 'TTG-002',
      vendorName: 'Trung tâm Giống Lâm nghiệp Vùng 4',
      species: 'Gáo Vàng (Mega 3P)',
      variety: 'Neolamarckia cadamba',
      age: '6 tháng tuổi',
      price: 8000,
      minOrder: 5000,
      available: 200000,
      qualityGrade: 'A',
      dnaProfiled: true,
      warranty: { survivalRate: 85, warrantyPeriod: 30 },
    },
    {
      id: 'SP-003',
      vendorId: 'VU-003',
      vendorName: 'Vườn ươm Công nghệ cao Dalat',
      species: 'Sâm Ngọc Linh',
      variety: 'Panax vietnamensis',
      age: '18 tháng tuổi',
      price: 35000,
      minOrder: 500,
      available: 15000,
      qualityGrade: 'A+',
      dnaProfiled: true,
      warranty: { survivalRate: 92, warrantyPeriod: 20 },
    },
    {
      id: 'SP-004',
      vendorId: 'VIL-001',
      vendorName: 'Viện Dược Liệu Trung ương',
      species: 'Đương Quy',
      variety: 'Angelica sinensis',
      age: '6 tháng tuổi',
      price: 15000,
      minOrder: 2000,
      available: 80000,
      qualityGrade: 'A',
      dnaProfiled: false,
      warranty: { survivalRate: 88, warrantyPeriod: 15 },
    },
    {
      id: 'SP-005',
      vendorId: 'TTG-002',
      vendorName: 'Trung tâm Giống Lâm nghiệp Vùng 4',
      species: 'Keo Lai',
      variety: 'Acacia hybrid',
      age: '3 tháng tuổi',
      price: 5000,
      minOrder: 10000,
      available: 500000,
      qualityGrade: 'A',
      dnaProfiled: false,
      warranty: { survivalRate: 85, warrantyPeriod: 30 },
    },
  ];

  const speciesList = Array.from(new Set(seedProducts.map(p => p.species)));
  const regions = Array.from(new Set(vendors.map(v => v.location)));

  const filteredProducts = seedProducts.filter(product => {
    const matchesSpecies = filterSpecies === 'all' || product.species === filterSpecies;
    const matchesVendor = filterVendor === 'all' || product.vendorId === filterVendor;
    const vendor = vendors.find(v => v.id === product.vendorId);
    const matchesRegion = filterRegion === 'all' || vendor?.location === filterRegion;
    const matchesTechnology = filterTechnology === 'all' || 
      (filterTechnology === 'tissue-culture' && vendor?.technology !== 'seed-sowing') ||
      (filterTechnology === 'seed-sowing' && vendor?.technology !== 'tissue-culture');
    const matchesSearch = searchQuery === '' || 
      product.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSpecies && matchesVendor && matchesRegion && matchesTechnology && matchesSearch;
  });

  const getVendorTypeLabel = (type: Vendor['type']) => {
    switch (type) {
      case 'national-center': return 'Trung tâm Quốc gia';
      case 'institute': return 'Viện Nghiên cứu';
      case 'tech-nursery': return 'Vườn ươm Công nghệ cao';
      case 'nursery': return 'Vườn ươm';
      default: return type;
    }
  };

  const getTechnologyLabel = (tech: Vendor['technology']) => {
    switch (tech) {
      case 'tissue-culture': return 'Nuôi cấy mô';
      case 'seed-sowing': return 'Gieo hạt';
      case 'both': return 'Cả hai';
      default: return tech;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-6 sm:py-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <BackButton className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">VITA Seed Marketplace</h1>
                <p className="text-green-100 text-sm sm:text-base">Sàn Giao dịch & Cung ứng Giống - "Giấy khai sinh" cho cây trồng</p>
              </div>
            </div>
            <PortalSwitcher />
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'marketplace', name: 'Siêu thị Giống', icon: 'ri-store-line' },
              { id: 'orders', name: 'Đơn hàng của tôi', icon: 'ri-shopping-cart-line' },
              { id: 'vouchers', name: 'Voucher Giống', icon: 'ri-coupon-line' },
              { id: 'warranty', name: 'Bảo hành & Khiếu nại', icon: 'ri-shield-check-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-green-600 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="relative">
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm loại cây, nhà cung cấp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại cây</label>
                  <select
                    value={filterSpecies}
                    onChange={(e) => setFilterSpecies(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tất cả</option>
                    {speciesList.map(species => (
                      <option key={species} value={species}>{species}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
                  <select
                    value={filterVendor}
                    onChange={(e) => setFilterVendor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tất cả</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực</label>
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tất cả</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Công nghệ</label>
                  <select
                    value={filterTechnology}
                    onChange={(e) => setFilterTechnology(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="tissue-culture">Nuôi cấy mô</option>
                    <option value="seed-sowing">Gieo hạt</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const vendor = vendors.find(v => v.id === product.vendorId);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-green-500 transition-all overflow-hidden"
                  >
                    <div className="p-5 space-y-4">
                      {/* Vendor Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">{vendor?.name}</div>
                          <h3 className="text-lg font-bold text-gray-900">{product.species}</h3>
                          <div className="text-sm text-gray-600">{product.variety}</div>
                        </div>
                        {product.dnaProfiled && (
                          <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            <i className="ri-dna-line mr-1"></i>
                            DNA
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tuổi cây:</span>
                          <span className="font-semibold">{product.age}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Chất lượng:</span>
                          <span className={`font-bold ${
                            product.qualityGrade === 'A+' ? 'text-green-600' :
                            product.qualityGrade === 'A' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {product.qualityGrade}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tỷ lệ sống:</span>
                          <span className="font-semibold text-green-600">{vendor?.survivalRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tồn kho:</span>
                          <span className="font-semibold">{product.available.toLocaleString()} cây</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Đơn tối thiểu:</span>
                          <span className="font-semibold">{product.minOrder.toLocaleString()} cây</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-baseline justify-between">
                          <span className="text-gray-600 text-sm">Giá:</span>
                          <span className="text-2xl font-bold text-green-600">
                            {product.price.toLocaleString()} VNĐ
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">/ cây</div>
                      </div>

                      {/* Warranty Info */}
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-shield-check-line text-green-600"></i>
                          <span className="text-gray-700">
                            Bảo hành tỷ lệ sống <strong>{product.warranty.survivalRate}%</strong> trong{' '}
                            <strong>{product.warranty.warrantyPeriod} ngày</strong>
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            const urlParams = new URLSearchParams(window.location.search);
                            const source = urlParams.get('source') || 'self';
                            navigate(`/seed-marketplace/order?product=${product.id}&source=${source}`);
                          }}
                          className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Đặt hàng
                        </button>
                        <button
                          onClick={() => setSelectedVendor(vendor || null)}
                          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                        >
                          <i className="ri-store-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <i className="ri-search-line text-5xl text-gray-300 mb-4"></i>
                <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm phù hợp</p>
                <p className="text-gray-500 text-sm mt-2">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Đơn hàng của tôi</h2>
            <div className="text-center py-12 text-gray-500">
              <i className="ri-shopping-cart-line text-5xl mb-4"></i>
              <p>Chức năng đang được phát triển</p>
              <p className="text-sm mt-2">Sẽ hiển thị lịch sử đặt hàng giống của bạn</p>
            </div>
          </div>
        )}

        {activeTab === 'vouchers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Voucher Giống của tôi</h2>
                <button
                  onClick={() => navigate('/seed-marketplace/vouchers')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
                >
                  Quản lý Voucher (Admin)
                </button>
              </div>
              
              {/* Mock vouchers */}
              <div className="space-y-4">
                {[
                  {
                    code: 'VCH-2026-001-045',
                    value: 10000000,
                    seedType: 'Gáo Vàng (Mega 3P)',
                    status: 'available',
                    expiryDate: '31/12/2026',
                  },
                  {
                    code: 'VCH-2026-001-046',
                    value: 10000000,
                    seedType: 'Gáo Vàng (Mega 3P)',
                    status: 'used',
                    usedDate: '10/01/2026',
                    orderId: 'ORD-SEED-2026-045',
                  },
                ].map((voucher) => (
                  <div key={voucher.code} className="border-2 border-green-200 rounded-xl p-5 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-mono font-bold text-lg text-gray-900 mb-1">{voucher.code}</div>
                        <div className="text-sm text-gray-600">
                          Giá trị: <span className="font-semibold text-green-600">{(voucher.value / 1000000).toFixed(0)} triệu VNĐ</span>
                        </div>
                        <div className="text-sm text-gray-600">{voucher.seedType}</div>
                      </div>
                      {voucher.status === 'available' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Có thể sử dụng
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                          Đã sử dụng
                        </span>
                      )}
                    </div>
                    {voucher.status === 'available' ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/seed-marketplace/order?source=greenlight&voucher=${voucher.code}`)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Sử dụng Voucher
                        </button>
                        <div className="text-xs text-gray-500 self-center">
                          HSD: {voucher.expiryDate}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        Đã sử dụng vào {voucher.usedDate}
                        {voucher.orderId && (
                          <span className="ml-2">
                            • Đơn hàng: <button onClick={() => navigate(`/seed-marketplace/order-detail/${voucher.orderId}`)} className="text-blue-600 hover:underline">{voucher.orderId}</button>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {false && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-coupon-line text-5xl mb-4"></i>
                  <p>Bạn chưa có voucher nào</p>
                  <p className="text-sm mt-2">Voucher sẽ được gửi từ GreenLight khi có chương trình hỗ trợ</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bảo hành & Khiếu nại</h2>
            <div className="text-center py-12 text-gray-500">
              <i className="ri-shield-check-line text-5xl mb-4"></i>
              <p>Chức năng đang được phát triển</p>
              <p className="text-sm mt-2">Sẽ hiển thị các yêu cầu bảo hành và khiếu nại</p>
            </div>
          </div>
        )}
      </div>

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Thông tin Nhà cung cấp</h3>
              <button
                onClick={() => setSelectedVendor(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedVendor.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-map-pin-line"></i>
                  <span>{selectedVendor.location}</span>
                  <span>•</span>
                  <span>{getVendorTypeLabel(selectedVendor.type)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="text-2xl font-bold text-yellow-500">★</div>
                  <span className="text-lg font-semibold">{selectedVendor.rating}</span>
                  <span className="text-gray-500">({selectedVendor.reviews} đánh giá)</span>
                </div>
                <div className="text-sm text-gray-600">
                  Tỷ lệ sống: <span className="font-semibold text-green-600">{selectedVendor.survivalRate}%</span>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Giới thiệu</h5>
                <p className="text-gray-700">{selectedVendor.description}</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Chứng chỉ</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.certifications.map(cert => (
                    <span key={cert} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Công nghệ</h5>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {getTechnologyLabel(selectedVendor.technology)}
                </span>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Chuyên môn</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedVendor(null);
                    setFilterVendor(selectedVendor.id);
                  }}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
                >
                  Xem sản phẩm của nhà cung cấp này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

