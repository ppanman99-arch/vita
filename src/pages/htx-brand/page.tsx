import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandTopBar from './components/BrandTopBar';

type TabType = 'shopee' | 'landing' | 'tourism' | 'analytics';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  shopeeStatus: 'not-synced' | 'synced' | 'syncing';
  shopeeUrl?: string;
  qrCode?: string;
}

interface TourismService {
  id: string;
  name: string;
  type: 'tour' | 'homestay' | 'experience';
  price: number;
  duration: string;
  capacity: number;
  bookings: number;
  revenue: number;
  otaLinks: {
    agoda?: string;
    airbnb?: string;
    traveloka?: string;
    luxstay?: string;
    vita?: string; // Direct booking
  };
  icalUrl?: string;
  apiConnected?: boolean;
}

interface Booking {
  id: string;
  service: string;
  customer: string;
  date: string;
  guests: number;
  total: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  qrCode?: string;
  source: 'agoda' | 'airbnb' | 'traveloka' | 'luxstay' | 'vita' | 'manual';
  checkInTime?: string;
  revenueStatus: 'pending' | 'reconciled' | 'paid';
}

export default function HtxBrandPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('shopee');
  const [coopName, setCoopName] = useState('HTX');
  const [landingPageUrl, setLandingPageUrl] = useState('');

  useEffect(() => {
    // Check authentication from multiple sources
    const brandAuth = sessionStorage.getItem('brand_authenticated');
    const coopAuth = sessionStorage.getItem('cooperative_authenticated');
    const farmerAuth = sessionStorage.getItem('farmer_authenticated');
    
    // If user is already authenticated in any form, allow access
    if (brandAuth || coopAuth || farmerAuth) {
      // Get name from various sources
      const name = sessionStorage.getItem('brand_coop_name') || 
                   sessionStorage.getItem('coop_name') || 
                   sessionStorage.getItem('farmer_name') ||
                   sessionStorage.getItem('admin_name') ||
                   'HTX';
      
      if (name) {
        setCoopName(name);
        // Generate subdomain
        const subdomain = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
        setLandingPageUrl(`https://${subdomain}.vita.vn`);
      }
      return; // Already authenticated, no need to check further
    }
    
    // Check if user has navigated from admin (using session flag set by Admin Dashboard)
    const fromAdminFlag = sessionStorage.getItem('navigating_from_admin');
    
    if (fromAdminFlag === 'true') {
      // User came from admin dashboard, allow access and set session
      sessionStorage.setItem('brand_authenticated', 'true');
      const coopName = sessionStorage.getItem('coop_name') || 
                       sessionStorage.getItem('admin_name') || 
                       'HTX';
      sessionStorage.setItem('brand_coop_name', coopName);
      setCoopName(coopName);
      // Generate subdomain
      const subdomain = coopName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      setLandingPageUrl(`https://${subdomain}.vita.vn`);
      // Clear the flag after use
      sessionStorage.removeItem('navigating_from_admin');
      return; // Allow access
    }
    
    // Check referrer as fallback (in case flag wasn't set)
    const referrer = document.referrer;
    const isFromAdmin = referrer.includes('/admin-dashboard') || 
                        referrer.includes('/admin') ||
                        referrer.includes('/greenlight-command');
    
    if (isFromAdmin) {
      // User came from admin dashboard, allow access and set session
      sessionStorage.setItem('brand_authenticated', 'true');
      const coopName = sessionStorage.getItem('coop_name') || 
                       sessionStorage.getItem('admin_name') || 
                       'HTX';
      sessionStorage.setItem('brand_coop_name', coopName);
      setCoopName(coopName);
      // Generate subdomain
      const subdomain = coopName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      setLandingPageUrl(`https://${subdomain}.vita.vn`);
      return; // Allow access
    }
    
    // If not authenticated and not from admin, redirect to login
    // But only if we're not already on a login page (prevent redirect loop)
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
      navigate('/htx-brand/login');
    }
  }, [navigate]);

  // Mock Products
  const products: Product[] = [
    {
      id: 'prod-001',
      name: 'Trà Sâm Ngọc Linh túi lọc',
      price: 200000,
      stock: 150,
      shopeeStatus: 'synced',
      shopeeUrl: 'https://shopee.vn/product/123456',
      qrCode: 'VITA-001-2024',
    },
    {
      id: 'prod-002',
      name: 'Sâm Ngọc Linh khô loại 1',
      price: 5000000,
      stock: 50,
      shopeeStatus: 'synced',
      shopeeUrl: 'https://shopee.vn/product/123457',
      qrCode: 'VITA-002-2024',
    },
    {
      id: 'prod-003',
      name: 'Mật ong rừng nguyên chất',
      price: 300000,
      stock: 80,
      shopeeStatus: 'not-synced',
    },
  ];

  // Mock Tourism Services
  const tourismServices: TourismService[] = [
    {
      id: 'tour-001',
      name: 'Tour leo núi thăm vườn sâm',
      type: 'tour',
      price: 200000,
      duration: '3 giờ',
      capacity: 20,
      bookings: 45,
      revenue: 9000000,
      otaLinks: {
        agoda: 'https://agoda.com/...',
        traveloka: 'https://traveloka.com/...',
        vita: '/booking/tour-001',
      },
      icalUrl: 'https://calendar.google.com/...',
    },
    {
      id: 'stay-001',
      name: 'Homestay nhà sàn giữa rừng',
      type: 'homestay',
      price: 500000,
      duration: '1 đêm',
      capacity: 4,
      bookings: 28,
      revenue: 14000000,
      otaLinks: {
        agoda: 'https://agoda.com/...',
        airbnb: 'https://airbnb.com/...',
        traveloka: 'https://traveloka.com/...',
        luxstay: 'https://luxstay.com/...',
        vita: '/booking/stay-001',
      },
      icalUrl: 'https://calendar.google.com/...',
      apiConnected: true,
    },
    {
      id: 'exp-001',
      name: 'Trải nghiệm tự tay thu hoạch sâm',
      type: 'experience',
      price: 1000000,
      duration: '2 giờ',
      capacity: 10,
      bookings: 12,
      revenue: 12000000,
      otaLinks: {
        traveloka: 'https://traveloka.com/...',
        vita: '/booking/exp-001',
      },
    },
  ];

  // Mock Bookings
  const bookings: Booking[] = [
    {
      id: 'book-001',
      service: 'Tour leo núi thăm vườn sâm',
      customer: 'Nguyễn Văn A',
      date: '2024-11-25',
      guests: 2,
      total: 400000,
      status: 'checked-in',
      qrCode: 'QR-001-2024',
      source: 'agoda',
      checkInTime: '2024-11-25 08:30',
      revenueStatus: 'reconciled',
    },
    {
      id: 'book-002',
      service: 'Homestay nhà sàn giữa rừng',
      customer: 'Trần Thị B',
      date: '2024-11-26',
      guests: 3,
      total: 1500000,
      status: 'confirmed',
      source: 'airbnb',
      revenueStatus: 'pending',
    },
    {
      id: 'book-003',
      service: 'Trải nghiệm tự tay thu hoạch sâm',
      customer: 'Lê Văn C',
      date: '2024-11-27',
      guests: 4,
      total: 4000000,
      status: 'confirmed',
      source: 'vita',
      revenueStatus: 'paid',
    },
  ];

  const syncToShopee = (productId: string) => {
    // Mock sync action
    alert(`Đang đồng bộ sản phẩm lên Shopee...`);
    // In real app, this would call Shopee API
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const tabs = [
    { id: 'shopee' as TabType, label: 'Shopee Connect', icon: 'ri-shopping-bag-3-line' },
    { id: 'landing' as TabType, label: 'Landing Page', icon: 'ri-global-line' },
    { id: 'tourism' as TabType, label: 'Du lịch & Dịch vụ', icon: 'ri-map-pin-line' },
    { id: 'analytics' as TabType, label: 'Thống kê', icon: 'ri-bar-chart-line' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandTopBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Chào mừng, {coopName}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Quản lý thương hiệu, bán hàng trên Shopee và dịch vụ du lịch
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className={tab.icon}></i>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {/* Shopee Connect Tab */}
          {activeTab === 'shopee' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Shopee Connect</h2>
                <p className="text-gray-600 text-sm">
                  Đồng bộ sản phẩm 2 chiều với Shopee. Quản lý kho và đơn hàng từ một nơi.
                </p>
              </div>

              {/* Connection Status */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-3-line text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Đã kết nối Shopee</h3>
                      <p className="text-sm text-gray-600">Gian hàng: {coopName} Official Store</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-orange-300 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50">
                    Cài đặt
                  </button>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Sản phẩm</h3>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
                    <i className="ri-add-line mr-2"></i>
                    Thêm sản phẩm
                  </button>
                </div>

                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          {product.shopeeStatus === 'synced' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              <i className="ri-checkbox-circle-line mr-1"></i>
                              Đã đồng bộ
                            </span>
                          )}
                          {product.shopeeStatus === 'not-synced' && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              Chưa đồng bộ
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Giá: {formatPrice(product.price)}</span>
                          <span>Tồn kho: {product.stock}</span>
                          {product.qrCode && (
                            <span className="flex items-center gap-1">
                              <i className="ri-qr-code-line"></i>
                              {product.qrCode}
                            </span>
                          )}
                        </div>
                        {product.shopeeUrl && (
                          <a
                            href={product.shopeeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <i className="ri-external-link-line"></i>
                            Xem trên Shopee
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        {product.shopeeStatus === 'not-synced' && (
                          <button
                            onClick={() => syncToShopee(product.id)}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600"
                          >
                            <i className="ri-upload-cloud-line mr-2"></i>
                            Đồng bộ
                          </button>
                        )}
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                          <i className="ri-pencil-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Landing Page Builder Tab */}
          {activeTab === 'landing' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Landing Page Builder</h2>
                <p className="text-gray-600 text-sm">
                  Tạo website riêng cho HTX với công cụ kéo thả đơn giản
                </p>
              </div>

              {/* Landing Page URL */}
              {landingPageUrl && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 mb-1">URL Landing Page:</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={`/coop/${coopName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-indigo-600 hover:underline flex items-center gap-2"
                        >
                          {landingPageUrl}
                          <i className="ri-external-link-line"></i>
                        </a>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          <i className="ri-checkbox-circle-line mr-1"></i>
                          Đã kích hoạt
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Landing page công khai: <a href={`/coop/${coopName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Xem ngay</a>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/coop/${coopName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}`)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Xem trước
                      </button>
                      <button className="px-4 py-2 bg-white border border-indigo-300 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50">
                        <i className="ri-pencil-line mr-2"></i>
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Templates */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Chọn Template</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Template 1: Nông nghiệp', 'Template 2: Du lịch', 'Template 3: Kết hợp'].map((template, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <i className="ri-image-line text-4xl text-gray-400"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{template}</h4>
                      <p className="text-xs text-gray-600 mb-3">Mẫu website chuyên nghiệp</p>
                      <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
                        Chọn mẫu
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Sections Preview */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Các phần trên trang</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Banner Hero', icon: 'ri-image-line', enabled: true },
                    { name: 'Câu chuyện HTX', icon: 'ri-book-open-line', enabled: true },
                    { name: 'Dữ liệu Thời gian thực', icon: 'ri-dashboard-line', enabled: true },
                    { name: 'Showcase Sản phẩm', icon: 'ri-shopping-bag-line', enabled: true },
                    { name: 'Module Du lịch (OTA Links)', icon: 'ri-map-pin-line', enabled: true },
                  ].map((section, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <i className={`${section.icon} text-xl text-gray-600`}></i>
                        <span className="font-medium text-gray-900">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {section.enabled && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Đã bật
                          </span>
                        )}
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                          <i className="ri-settings-3-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OTA Links Preview for Landing Page */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Cấu hình OTA Links cho Landing Page</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Trên Landing Page, phần "Lưu trú & Trải nghiệm" sẽ hiển thị các nút CTA đến các OTA:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: 'Agoda', icon: 'ri-hotel-line', color: 'from-red-500 to-pink-600' },
                      { name: 'Airbnb', icon: 'ri-home-4-line', color: 'from-pink-500 to-rose-600' },
                      { name: 'Traveloka', icon: 'ri-plane-line', color: 'from-blue-500 to-cyan-600' },
                      { name: 'VITA Direct', icon: 'ri-store-3-line', color: 'from-indigo-500 to-purple-600', badge: 'Giảm 10%' },
                    ].map((ota) => (
                      <div
                        key={ota.name}
                        className="bg-white border border-gray-200 rounded-lg p-3 text-center"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${ota.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <i className={`${ota.icon} text-white text-lg`}></i>
                        </div>
                        <p className="text-xs font-medium text-gray-900 mb-1">{ota.name}</p>
                        {ota.badge && (
                          <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                            {ota.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  <i className="ri-information-line mr-1"></i>
                  Các link OTA sẽ được tự động lấy từ cấu hình dịch vụ trong tab "Du lịch & Dịch vụ"
                </p>
              </div>
            </div>
          )}

          {/* Tourism Booking Tab */}
          {activeTab === 'tourism' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Du lịch & Dịch vụ</h2>
                <p className="text-gray-600 text-sm">
                  Quản lý tập trung qua OTA (Agoda, Airbnb, Traveloka) và dịch vụ tại chỗ
                </p>
              </div>

              {/* OTA Integration Status */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">Tích hợp OTA qua ezCloud Channel Manager</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    <i className="ri-plug-line mr-1"></i>
                    API: ezCloud (ezCms)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Chỉ cần nhập phòng trống lên VITA, ezCloud tự động đẩy sang các sàn du lịch và ngược lại.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { name: 'Agoda', icon: 'ri-hotel-line', connected: true, color: 'from-red-500 to-pink-600', bookings: 45 },
                  { name: 'Airbnb', icon: 'ri-home-4-line', connected: true, color: 'from-pink-500 to-rose-600', bookings: 32 },
                  { name: 'Traveloka', icon: 'ri-plane-line', connected: true, color: 'from-blue-500 to-cyan-600', bookings: 28 },
                  { name: 'Luxstay', icon: 'ri-building-line', connected: false, color: 'from-purple-500 to-indigo-600', bookings: 0 },
                ].map((ota) => (
                  <div
                    key={ota.name}
                    className={`border rounded-lg p-4 ${
                      ota.connected ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${ota.color} rounded-lg flex items-center justify-center`}>
                        <i className={`${ota.icon} text-white text-xl`}></i>
                      </div>
                      {ota.connected ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          <i className="ri-checkbox-circle-line mr-1"></i>
                          Đã kết nối
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                          Chưa kết nối
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{ota.name}</h4>
                    {ota.connected && (
                      <p className="text-xs text-emerald-600 mb-2 font-medium">{ota.bookings} đặt chỗ</p>
                    )}
                    <button className="mt-2 w-full px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50">
                      {ota.connected ? 'Cài đặt' : 'Kết nối'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <i className="ri-information-line"></i>
                  <span>
                    Quản lý tích hợp API tại <button onClick={() => navigate('/admin-api-integration?tab=tourism')} className="font-semibold underline">API Integration Hub</button>
                  </span>
                </div>
              </div>

              {/* Revenue Reconciliation Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-money-dollar-circle-line text-amber-600 text-xl"></i>
                      <h3 className="font-semibold text-gray-900">Đối soát Doanh thu Du lịch</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Tự động quét sao kê ngân hàng và khớp với booking đã check-in
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tháng này:</span>
                        <span className="font-semibold text-gray-900 ml-2">{formatPrice(35000000)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Trạng thái:</span>
                        <span className="font-semibold text-green-600 ml-2">Đã đối soát</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
                    <i className="ri-refresh-line mr-2"></i>
                    Đối soát ngay
                  </button>
                </div>
              </div>

              {/* Add Service Button */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Dịch vụ Du lịch</h3>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
                  <i className="ri-add-line mr-2"></i>
                  Thêm dịch vụ mới
                </button>
              </div>

              {/* Services List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {tourismServices.map((service) => (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {service.type === 'tour' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          Tour
                        </span>
                      )}
                      {service.type === 'homestay' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          Homestay
                        </span>
                      )}
                      {service.type === 'experience' && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          Trải nghiệm
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <i className="ri-money-dollar-circle-line"></i>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-time-line"></i>
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-group-line"></i>
                        <span>Tối đa {service.capacity} người</span>
                      </div>
                    </div>
                    {/* OTA Links */}
                    {service.otaLinks && Object.keys(service.otaLinks).length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2">Kênh bán:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.otaLinks.agoda && (
                            <a
                              href={service.otaLinks.agoda}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-medium hover:bg-red-100"
                            >
                              <i className="ri-hotel-line mr-1"></i>
                              Agoda
                            </a>
                          )}
                          {service.otaLinks.airbnb && (
                            <a
                              href={service.otaLinks.airbnb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-pink-50 text-pink-600 rounded text-xs font-medium hover:bg-pink-100"
                            >
                              <i className="ri-home-4-line mr-1"></i>
                              Airbnb
                            </a>
                          )}
                          {service.otaLinks.traveloka && (
                            <a
                              href={service.otaLinks.traveloka}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100"
                            >
                              <i className="ri-plane-line mr-1"></i>
                              Traveloka
                            </a>
                          )}
                          {service.otaLinks.luxstay && (
                            <a
                              href={service.otaLinks.luxstay}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium hover:bg-purple-100"
                            >
                              <i className="ri-building-line mr-1"></i>
                              Luxstay
                            </a>
                          )}
                          {service.otaLinks.vita && (
                            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                              <i className="ri-store-3-line mr-1"></i>
                              VITA (Giảm 10%)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {/* iCal Sync Status */}
                    {service.icalUrl && (
                      <div className="mb-3 flex items-center gap-2 text-xs text-gray-600">
                        <i className="ri-calendar-line text-green-600"></i>
                        <span>Đã đồng bộ iCal</span>
                      </div>
                    )}
                    {service.apiConnected && (
                      <div className="mb-3 flex items-center gap-2 text-xs text-gray-600">
                        <i className="ri-plug-line text-blue-600"></i>
                        <span>API Connected</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Đã đặt:</span>
                        <span className="font-semibold text-gray-900">{service.bookings} lượt</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">Doanh thu:</span>
                        <span className="font-semibold text-indigo-600">{formatPrice(service.revenue)}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                      <i className="ri-pencil-line mr-2"></i>
                      Chỉnh sửa
                    </button>
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Đặt chỗ gần đây</h3>
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="font-semibold text-gray-900">{booking.service}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.status === 'checked-in' ? 'bg-blue-100 text-blue-700' :
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status === 'checked-in' ? 'Đã check-in' :
                               booking.status === 'confirmed' ? 'Đã xác nhận' :
                               booking.status === 'pending' ? 'Chờ xác nhận' : booking.status}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.source === 'vita' ? 'bg-indigo-100 text-indigo-700' :
                              booking.source === 'agoda' ? 'bg-red-100 text-red-700' :
                              booking.source === 'airbnb' ? 'bg-pink-100 text-pink-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.source === 'vita' ? 'VITA' :
                               booking.source === 'agoda' ? 'Agoda' :
                               booking.source === 'airbnb' ? 'Airbnb' :
                               booking.source === 'traveloka' ? 'Traveloka' :
                               booking.source === 'luxstay' ? 'Luxstay' : 'Manual'}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              booking.revenueStatus === 'paid' ? 'bg-green-100 text-green-700' :
                              booking.revenueStatus === 'reconciled' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.revenueStatus === 'paid' ? 'Đã thanh toán' :
                               booking.revenueStatus === 'reconciled' ? 'Đã đối soát' : 'Chờ đối soát'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <i className="ri-user-line"></i>
                              <span>{booking.customer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-group-line"></i>
                              <span>{booking.guests} người</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-money-dollar-circle-line"></i>
                              <span className="font-semibold text-gray-900">{formatPrice(booking.total)}</span>
                            </div>
                            {booking.checkInTime && (
                              <div className="flex items-center gap-2">
                                <i className="ri-time-line"></i>
                                <span>Check-in: {booking.checkInTime}</span>
                              </div>
                            )}
                          </div>
                          {booking.qrCode && (
                            <div className="mt-3 flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <i className="ri-qr-code-line text-indigo-600 text-xl"></i>
                                <div>
                                  <p className="text-xs text-gray-600">Mã QR Check-in</p>
                                  <p className="text-sm text-indigo-600 font-medium">{booking.qrCode}</p>
                                </div>
                              </div>
                              <button className="px-3 py-1.5 bg-indigo-500 text-white rounded text-xs font-medium hover:bg-indigo-600">
                                <i className="ri-printer-line mr-1"></i>
                                In vé
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          {booking.status === 'confirmed' && !booking.qrCode && (
                            <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600">
                              <i className="ri-qr-code-line mr-1"></i>
                              Tạo QR
                            </button>
                          )}
                          {booking.status === 'confirmed' && booking.qrCode && (
                            <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                              <i className="ri-checkbox-circle-line mr-1"></i>
                              Check-in
                            </button>
                          )}
                          <button className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100">
                            <i className="ri-printer-line"></i>
                          </button>
                          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                            <i className="ri-more-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* POS Integration */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">VITA POS - Dịch vụ Tại chỗ</h3>
                    <p className="text-sm text-gray-600">
                      Quét QR thanh toán cho dịch vụ ăn uống, mua sâm tại HTX
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600">
                    <i className="ri-settings-3-line mr-2"></i>
                    Cài đặt POS
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <i className="ri-qr-code-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Mã QR Thanh toán</h4>
                        <p className="text-xs text-gray-600">VietQR</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <i className="ri-qr-code-line text-4xl text-gray-400"></i>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                      <i className="ri-download-line mr-2"></i>
                      Tải mã QR
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        <i className="ri-restaurant-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Doanh thu Ăn uống</h4>
                        <p className="text-xs text-gray-600">Tháng này</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(8500000)}</div>
                    <div className="text-xs text-green-600">+15% so với tháng trước</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <i className="ri-shopping-bag-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Doanh thu Bán sâm</h4>
                        <p className="text-xs text-gray-600">Tháng này</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(12000000)}</div>
                    <div className="text-xs text-green-600">+22% so với tháng trước</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Thống kê & Báo cáo</h2>
                <p className="text-gray-600 text-sm">
                  Theo dõi doanh thu từ Shopee và dịch vụ du lịch
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Doanh thu Shopee</span>
                    <i className="ri-shopping-bag-3-line text-indigo-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(45000000)}</div>
                  <div className="text-xs text-green-600 mt-1">+12% so với tháng trước</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Doanh thu Du lịch</span>
                    <i className="ri-map-pin-line text-green-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(35000000)}</div>
                  <div className="text-xs text-green-600 mt-1">+25% so với tháng trước</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Tổng đơn hàng</span>
                    <i className="ri-shopping-cart-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-xs text-blue-600 mt-1">85 Shopee + 42 Du lịch</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Lượt truy cập Landing</span>
                    <i className="ri-global-line text-amber-600 text-xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">2,450</div>
                  <div className="text-xs text-amber-600 mt-1">+18% so với tháng trước</div>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <i className="ri-bar-chart-line text-4xl mb-2"></i>
                      <p>Biểu đồ doanh thu</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Dịch vụ phổ biến</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <i className="ri-pie-chart-line text-4xl mb-2"></i>
                      <p>Biểu đồ dịch vụ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

