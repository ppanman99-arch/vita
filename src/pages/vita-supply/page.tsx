import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplyTopBar from './components/SupplyTopBar';

type TabType = 'agri-inputs' | 'machinery' | 'iot-tech' | 'packages' | 'orders' | 'group-buying';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  image?: string;
  description: string;
  rating?: number;
  reviews?: number;
  isVitaStandard?: boolean;
  bnplAvailable?: boolean;
}

interface CropPackage {
  id: string;
  name: string;
  crop: string;
  area: number; // ha
  price: number;
  items: Array<{ name: string; quantity: number; unit: string }>;
  savings: number;
  bnplAvailable: boolean;
}

interface Order {
  id: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'paid';
  paymentMethod: 'cash' | 'bnpl';
  dueDate?: string;
}

interface GroupBuy {
  id: string;
  product: string;
  targetQuantity: number;
  currentQuantity: number;
  discount: number;
  deadline: string;
  participants: number;
  status: 'open' | 'closed' | 'success';
}

export default function VitaSupplyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('agri-inputs');
  const [coopName, setCoopName] = useState('HTX');
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);

  useEffect(() => {
    // Check authentication from multiple sources
    const supplyAuth = sessionStorage.getItem('supply_authenticated');
    const coopAuth = sessionStorage.getItem('cooperative_authenticated');
    const farmerAuth = sessionStorage.getItem('farmer_authenticated');
    
    // If user is already authenticated in any form, allow access
    if (supplyAuth || coopAuth || farmerAuth) {
      // Get name from various sources
      const name = sessionStorage.getItem('supply_coop_name') || 
                   sessionStorage.getItem('coop_name') || 
                   sessionStorage.getItem('farmer_name') ||
                   sessionStorage.getItem('admin_name') ||
                   'HTX';
      
      if (name) setCoopName(name);
      return; // Already authenticated, no need to check further
    }
    
    // Check if user has navigated from admin (using session flag set by Admin Dashboard)
    // This is the primary method - set when clicking from Admin Dashboard
    const fromAdminFlag = sessionStorage.getItem('navigating_from_admin');
    
    if (fromAdminFlag === 'true') {
      // User came from admin dashboard, allow access and set session
      sessionStorage.setItem('supply_authenticated', 'true');
      const coopName = sessionStorage.getItem('coop_name') || 
                       sessionStorage.getItem('admin_name') || 
                       'HTX';
      sessionStorage.setItem('supply_coop_name', coopName);
      setCoopName(coopName);
      // Clear the flag after use
      sessionStorage.removeItem('navigating_from_admin');
      return; // Allow access
    }
    
    // Check referrer as fallback (in case flag wasn't set)
    const referrer = document.referrer;
    const isFromAdmin = referrer.includes('/cooperative/dashboard') || 
                        referrer.includes('/admin-dashboard') || // backward compat
                        referrer.includes('/admin') || // backward compat
                        referrer.includes('/greenlight-command');
    
    if (isFromAdmin) {
      // User came from admin dashboard, allow access and set session
      sessionStorage.setItem('supply_authenticated', 'true');
      const coopName = sessionStorage.getItem('coop_name') || 
                       sessionStorage.getItem('admin_name') || 
                       'HTX';
      sessionStorage.setItem('supply_coop_name', coopName);
      setCoopName(coopName);
      return; // Allow access
    }
    
    // If not authenticated and not from admin, redirect to login
    // But only if we're not already on a login page (prevent redirect loop)
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
      navigate('/login?role=cooperative');
    }
  }, [navigate]);

  // Mock Products - Nhóm A: Vật tư Canh tác
  const agriInputs: Product[] = [
    {
      id: 'fert-001',
      name: 'Phân hữu cơ VITA Organic Premium',
      category: 'Phân bón',
      price: 250000,
      originalPrice: 300000,
      unit: 'bao 50kg',
      stock: 150,
      description: 'Phân hữu cơ 100% tự nhiên, đạt chuẩn VITA Standard',
      rating: 4.8,
      reviews: 45,
      isVitaStandard: true,
      bnplAvailable: true,
    },
    {
      id: 'fert-002',
      name: 'Chế phẩm sinh học VITA Bio',
      category: 'Chế phẩm',
      price: 180000,
      unit: 'chai 1L',
      stock: 80,
      description: 'Chế phẩm vi sinh tăng cường đề kháng cho cây',
      rating: 4.9,
      reviews: 32,
      isVitaStandard: true,
      bnplAvailable: true,
    },
    {
      id: 'fert-003',
      name: 'Giá thể ươm cây VITA Mix',
      category: 'Giá thể',
      price: 120000,
      originalPrice: 150000,
      unit: 'bao 20L',
      stock: 200,
      description: 'Hỗn hợp giá thể chuyên dụng cho ươm cây dược liệu',
      rating: 4.7,
      reviews: 28,
      isVitaStandard: true,
    },
  ];

  // Mock Products - Nhóm B: Máy móc
  const machinery: Product[] = [
    {
      id: 'mach-001',
      name: 'Máy sấy dược liệu VITA Dryer Pro',
      category: 'Thiết bị sơ chế',
      price: 45000000,
      unit: 'máy',
      stock: 5,
      description: 'Máy sấy công nghiệp với điều khiển nhiệt độ tự động',
      rating: 4.9,
      reviews: 12,
      bnplAvailable: true,
    },
    {
      id: 'mach-002',
      name: 'Hệ thống tưới tự động VITA Irrigation',
      category: 'Tưới tiêu',
      price: 12000000,
      unit: 'bộ',
      stock: 15,
      description: 'Hệ thống tưới nhỏ giọt tự động với cảm biến độ ẩm',
      rating: 4.8,
      reviews: 18,
      bnplAvailable: true,
    },
    {
      id: 'mach-003',
      name: 'Máy in tem nhãn VITA Label Printer',
      category: 'Thiết bị',
      price: 3500000,
      unit: 'máy',
      stock: 20,
      description: 'Máy in tem QR code và nhãn truy xuất nguồn gốc',
      rating: 4.6,
      reviews: 8,
    },
  ];

  // Mock Products - Nhóm C: IoT & Công nghệ
  const iotTech: Product[] = [
    {
      id: 'iot-001',
      name: 'VITA Stick - Cảm biến đất',
      category: 'IoT Sensor',
      price: 850000,
      originalPrice: 1200000,
      unit: 'bộ',
      stock: 100,
      description: 'Cảm biến đo độ ẩm, pH, nhiệt độ đất. Gửi dữ liệu real-time về App VITA',
      rating: 4.9,
      reviews: 156,
      isVitaStandard: true,
      bnplAvailable: true,
    },
    {
      id: 'iot-002',
      name: 'VITA Cam - Camera giám sát',
      category: 'Camera',
      price: 2500000,
      originalPrice: 3500000,
      unit: 'bộ',
      stock: 50,
      description: 'Camera năng lượng mặt trời với AI nhận diện. Phục vụ ESG/B2B verification',
      rating: 5.0,
      reviews: 89,
      isVitaStandard: true,
      bnplAvailable: true,
    },
    {
      id: 'iot-003',
      name: 'Máy tính bảng VITA Admin',
      category: 'Thiết bị',
      price: 4500000,
      originalPrice: 6000000,
      unit: 'máy',
      stock: 30,
      description: 'Tablet cài sẵn App VITA Admin cho cán bộ HTX đi thực địa',
      rating: 4.7,
      reviews: 24,
      isVitaStandard: true,
      bnplAvailable: true,
    },
  ];

  // Mock Crop Packages
  const cropPackages: CropPackage[] = [
    {
      id: 'pkg-001',
      name: 'Combo Sâm Ngọc Linh Vụ 1 (10ha)',
      crop: 'Sâm Ngọc Linh',
      area: 10,
      price: 45000000,
      items: [
        { name: 'Phân hữu cơ VITA Organic', quantity: 50, unit: 'bao' },
        { name: 'Chế phẩm sinh học VITA Bio', quantity: 200, unit: 'chai' },
        { name: 'VITA Stick - Cảm biến đất', quantity: 20, unit: 'bộ' },
        { name: 'VITA Cam - Camera giám sát', quantity: 5, unit: 'bộ' },
      ],
      savings: 5000000,
      bnplAvailable: true,
    },
    {
      id: 'pkg-002',
      name: 'Combo Trồng Rừng Gỗ Lớn (5ha)',
      crop: 'Gỗ lớn',
      area: 5,
      price: 28000000,
      items: [
        { name: 'Cây giống FSC', quantity: 5000, unit: 'cây' },
        { name: 'Phân bón lót', quantity: 30, unit: 'bao' },
        { name: 'VITA Stick', quantity: 10, unit: 'bộ' },
      ],
      savings: 3000000,
      bnplAvailable: true,
    },
  ];

  // Mock Orders
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-11-15',
      items: [
        { name: 'Phân hữu cơ VITA Organic', quantity: 20, price: 250000 },
        { name: 'VITA Stick', quantity: 5, price: 850000 },
      ],
      total: 9250000,
      status: 'delivered',
      paymentMethod: 'bnpl',
      dueDate: '2024-12-15',
    },
    {
      id: 'ORD-002',
      date: '2024-11-20',
      items: [
        { name: 'Combo Sâm Ngọc Linh Vụ 1', quantity: 1, price: 45000000 },
      ],
      total: 45000000,
      status: 'processing',
      paymentMethod: 'bnpl',
      dueDate: '2025-02-20',
    },
  ];

  // Mock Group Buying
  const groupBuys: GroupBuy[] = [
    {
      id: 'gb-001',
      product: 'Máy sấy dược liệu VITA Dryer Pro',
      targetQuantity: 5,
      currentQuantity: 3,
      discount: 30,
      deadline: '2024-12-10',
      participants: 3,
      status: 'open',
    },
    {
      id: 'gb-002',
      product: 'VITA Cam - Camera giám sát',
      targetQuantity: 10,
      currentQuantity: 8,
      discount: 25,
      deadline: '2024-11-30',
      participants: 8,
      status: 'open',
    },
  ];

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const tabs = [
    { id: 'agri-inputs' as TabType, label: 'Vật tư Canh tác', icon: 'ri-seedling-line' },
    { id: 'machinery' as TabType, label: 'Máy móc', icon: 'ri-tools-line' },
    { id: 'iot-tech' as TabType, label: 'IoT & Công nghệ', icon: 'ri-smartphone-line' },
    { id: 'packages' as TabType, label: 'Gói Vật Tư Theo Vụ', icon: 'ri-box-3-line' },
    { id: 'orders' as TabType, label: 'Đơn hàng', icon: 'ri-shopping-bag-line' },
    { id: 'group-buying' as TabType, label: 'Mua Chung', icon: 'ri-group-line' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplyTopBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Chào mừng, {coopName}!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Mua vật tư với giá ưu đãi và thanh toán trả chậm
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
                    ? 'bg-orange-500 text-white shadow-md'
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
          {/* Agri-Inputs Tab */}
          {activeTab === 'agri-inputs' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Vật tư Canh tác</h2>
                <p className="text-gray-600 text-sm">
                  Phân bón, chế phẩm sinh học và giá thể đạt chuẩn VITA Standard
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {agriInputs.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    {product.isVitaStandard && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold mb-2">
                        <i className="ri-checkbox-circle-line"></i>
                        VITA Standard
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">/{product.unit}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-600">
                        Tồn kho: {product.stock} {product.unit}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <i className="ri-star-fill text-yellow-400 text-xs"></i>
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-all"
                      >
                        Thêm vào giỏ
                      </button>
                      {product.bnplAvailable && (
                        <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                          <i className="ri-time-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Machinery Tab */}
          {activeTab === 'machinery' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Máy móc & Cơ giới hóa</h2>
                <p className="text-gray-600 text-sm">
                  Máy nông nghiệp và thiết bị sơ chế với hỗ trợ trả góp
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {machinery.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="mb-3">
                      <span className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-all"
                      >
                        Thêm vào giỏ
                      </button>
                      {product.bnplAvailable && (
                        <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                          <i className="ri-time-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IoT Tech Tab */}
          {activeTab === 'iot-tech' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Thiết bị IoT & Công nghệ</h2>
                <p className="text-gray-600 text-sm">
                  VITA Stick, VITA Cam và thiết bị công nghệ chính hãng từ GreenLight
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {iotTech.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    {product.isVitaStandard && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold mb-2">
                        <i className="ri-checkbox-circle-line"></i>
                        VITA Tech
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-all"
                      >
                        Thêm vào giỏ
                      </button>
                      {product.bnplAvailable && (
                        <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                          <i className="ri-time-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Gói Vật Tư Theo Vụ</h2>
                <p className="text-gray-600 text-sm">
                  Combo vật tư được tính toán sẵn theo quy trình chuẩn VITA
                </p>
              </div>
              <div className="space-y-4">
                {cropPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                        <p className="text-sm text-gray-600">
                          Diện tích: {pkg.area}ha | Tiết kiệm: {formatPrice(pkg.savings)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatPrice(pkg.price)}
                        </div>
                        {pkg.bnplAvailable && (
                          <div className="text-xs text-blue-600 mt-1">
                            <i className="ri-time-line"></i> Trả chậm
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Bao gồm:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <i className="ri-check-line text-emerald-600"></i>
                            <span className="text-gray-700">
                              {item.name} - {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all">
                      Mua trọn gói
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Đơn hàng & Thanh toán</h2>
                <p className="text-gray-600 text-sm">
                  Theo dõi đơn hàng và lịch thanh toán trả chậm
                </p>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">#{order.id}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status === 'delivered' ? 'Đã giao' :
                             order.status === 'processing' ? 'Đang xử lý' : order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </div>
                        {order.paymentMethod === 'bnpl' && (
                          <div className="text-xs text-blue-600 mt-1">
                            <i className="ri-time-line"></i> Trả chậm đến {order.dueDate}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Sản phẩm:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-600">
                            <span>{item.name} x{item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group Buying Tab */}
          {activeTab === 'group-buying' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Mua Chung</h2>
                <p className="text-gray-600 text-sm">
                  Tham gia mua chung để được giá sỉ tốt nhất
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {groupBuys.map((gb) => (
                  <div
                    key={gb.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{gb.product}</h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Tiến độ:</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {gb.currentQuantity}/{gb.targetQuantity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(gb.currentQuantity / gb.targetQuantity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          Giảm {gb.discount}%
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {gb.participants} HTX đã tham gia
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Hạn chót:</p>
                        <p className="text-sm font-semibold text-gray-900">{gb.deadline}</p>
                      </div>
                    </div>
                    <button
                      className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                        gb.status === 'open'
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {gb.status === 'open' ? 'Tham gia mua chung' : 'Đã đóng'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

