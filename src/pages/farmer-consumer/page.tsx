import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../../components/feature/RoleSwitcher';

export default function FarmerConsumer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'market' | 'group' | 'orders' | 'subscription'>('market');
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: 'Sâm Ngọc Linh củ tươi',
      image: 'https://readdy.ai/api/search-image?query=fresh%20ginseng%20root%20premium%20quality%20natural%20organic%20simple%20white%20background%20product%20photography%20high%20quality&width=400&height=400&seq=product-sam-001&orientation=squarish',
      marketPrice: 500000,
      memberPrice: 350000,
      unit: 'kg',
      stock: 25,
      seller: 'Nông dân Nguyễn Văn A',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Trà Cà Gai Leo túi lọc',
      image: 'https://readdy.ai/api/search-image?query=herbal%20tea%20bags%20premium%20packaging%20natural%20organic%20simple%20clean%20background%20product%20photography%20professional&width=400&height=400&seq=product-tra-002&orientation=squarish',
      marketPrice: 200000,
      memberPrice: 140000,
      unit: 'hộp 20 túi',
      stock: 50,
      seller: 'HTX VITA',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Cao Đương Quy nguyên chất',
      image: 'https://readdy.ai/api/search-image?query=angelica%20extract%20bottle%20herbal%20medicine%20natural%20organic%20simple%20white%20background%20product%20photography%20high%20quality&width=400&height=400&seq=product-cao-003&orientation=squarish',
      marketPrice: 800000,
      memberPrice: 560000,
      unit: 'chai 500ml',
      stock: 15,
      seller: 'Nhà máy chế biến HTX',
      rating: 5.0
    }
  ];

  const groupBuys = [
    {
      id: 1,
      name: 'Cao Sâm Ngọc Linh đặc biệt',
      image: 'https://readdy.ai/api/search-image?query=premium%20ginseng%20extract%20luxury%20bottle%20natural%20organic%20simple%20elegant%20background%20product%20photography%20professional&width=400&height=400&seq=groupbuy-cao-sam-001&orientation=squarish',
      normalPrice: 1500000,
      groupPrice: 900000,
      currentJoined: 50,
      targetJoined: 100,
      timeLeft: '3 ngày',
      discount: 40
    },
    {
      id: 2,
      name: 'Combo Dược liệu gia đình',
      image: 'https://readdy.ai/api/search-image?query=herbal%20medicine%20gift%20set%20family%20pack%20natural%20organic%20simple%20clean%20background%20product%20photography%20high%20quality&width=400&height=400&seq=groupbuy-combo-002&orientation=squarish',
      normalPrice: 2000000,
      groupPrice: 1400000,
      currentJoined: 35,
      targetJoined: 50,
      timeLeft: '5 ngày',
      discount: 30
    }
  ];

  const myOrders = [
    {
      id: 'ORD-2024-001',
      date: '05/01/2025',
      items: 'Sâm Ngọc Linh (2kg), Trà Cà Gai Leo (3 hộp)',
      total: 1120000,
      status: 'shipping',
      statusText: 'Đang giao hàng'
    },
    {
      id: 'ORD-2024-002',
      date: '28/12/2024',
      items: 'Cao Đương Quy (1 chai)',
      total: 560000,
      status: 'completed',
      statusText: 'Đã hoàn thành'
    }
  ];

  const toggleCart = (productId: number) => {
    if (cart.includes(productId)) {
      setCart(cart.filter(id => id !== productId));
    } else {
      setCart([...cart, productId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white px-4 py-4 sm:py-6 rounded-b-2xl sm:rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4 gap-2">
          <button 
            onClick={() => navigate('/member-hub')}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line text-lg sm:text-xl"></i>
          </button>
          <h1 className="text-base sm:text-lg md:text-xl font-bold truncate flex-1 text-center px-2">VITA Mart</h1>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors relative cursor-pointer">
              <i className="ri-shopping-cart-line text-lg sm:text-xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-[10px] sm:text-xs flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <RoleSwitcher />
          </div>
        </div>

        {/* Member Benefits */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100 mb-1">Ưu đãi thành viên</p>
              <p className="text-2xl font-bold">Giảm 20-40%</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-vip-crown-line text-4xl text-yellow-300"></i>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Voucher khả dụng</span>
              <span className="font-bold">5 mã giảm giá</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-1 shadow-md flex gap-1">
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'market'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-store-2-line mr-1"></i>
            Siêu thị
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'group'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-group-line mr-1"></i>
            Mua chung
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-file-list-3-line mr-1"></i>
            Đơn hàng
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="ri-repeat-line mr-1"></i>
            Gói định kỳ
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-price-tag-3-line text-blue-600"></i>
              Sản phẩm giá xã viên
            </h2>

            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                <div className="h-48 w-full overflow-hidden bg-gray-50">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 flex-1">{product.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 ml-2">
                      <i className="ri-star-fill text-sm"></i>
                      <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    <i className="ri-user-line mr-1"></i>
                    {product.seller}
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-3 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 line-through">Giá thị trường: {product.marketPrice.toLocaleString('vi-VN')}đ</span>
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        -{Math.round((1 - product.memberPrice / product.marketPrice) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Giá xã viên:</span>
                      <span className="text-xl font-bold text-blue-600">{product.memberPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">/{product.unit}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Còn lại: <strong>{product.stock} {product.unit}</strong></span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      Hàng tươi
                    </span>
                  </div>

                  <button 
                    onClick={() => toggleCart(product.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      cart.includes(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg'
                    }`}
                  >
                    <i className={`${cart.includes(product.id) ? 'ri-check-line' : 'ri-shopping-cart-line'} mr-2`}></i>
                    {cart.includes(product.id) ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Group Buy Tab */}
        {activeTab === 'group' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <i className="ri-group-line"></i>
                Mua chung - Giá sốc
              </h2>
              <p className="text-sm text-orange-100">Gom đơn cùng xã viên khác để được giảm giá đến 40%</p>
            </div>

            {groupBuys.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-200">
                <div className="h-48 w-full overflow-hidden bg-gray-50">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-800 flex-1">{item.name}</h3>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2">
                      -{item.discount}%
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 mb-3 border border-orange-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 line-through">{item.normalPrice.toLocaleString('vi-VN')}đ</span>
                      <span className="text-xl font-bold text-red-600">{item.groupPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Đã có {item.currentJoined} người tham gia</span>
                      <span>Cần {item.targetJoined} người</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all"
                        style={{width: `${(item.currentJoined / item.targetJoined) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-orange-600 font-semibold">
                      <i className="ri-time-line mr-1"></i>
                      Còn {item.timeLeft} để đạt mục tiêu
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-group-line mr-2"></i>
                    Tham gia mua chung
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="ri-file-list-3-line text-blue-600"></i>
              Đơn hàng của tôi
            </h2>

            {myOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Đơn hàng #{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    order.status === 'shipping' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {order.statusText}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-sm text-gray-700 mb-2">{order.items}</p>
                  <p className="text-lg font-bold text-gray-800">
                    Tổng: {order.total.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>

                {order.status === 'shipping' && (
                  <div className="bg-blue-50 rounded-xl p-3 mb-3 border border-blue-100">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <i className="ri-truck-line"></i>
                      <span>Đơn hàng đang trên đường giao đến bạn</span>
                    </div>
                  </div>
                )}

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Xem chi tiết đơn hàng
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Gói Định kỳ - Giảm 15%</h2>
              <p className="text-indigo-100 mb-4">
                Đăng ký nhận hàng định kỳ, tự động trừ tiền. Không lo hết hàng, giá cố định!
              </p>
              <div className="flex items-center gap-2 text-sm">
                <i className="ri-vip-crown-fill text-yellow-300"></i>
                <span>Tiết kiệm 15% so với mua lẻ</span>
              </div>
            </div>

            {/* Available Subscription Packages */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Gói có sẵn</h3>
              {[
                {
                  id: 1,
                  name: 'Combo Rau củ hữu cơ',
                  description: '5kg rau củ tươi mỗi tuần',
                  image: 'https://readdy.ai/api/search-image?query=fresh%20organic%20vegetables%20basket%20natural%20simple%20white%20background%20product%20photography&width=400&height=400&seq=sub-veggies-001&orientation=squarish',
                  normalPrice: 200000,
                  subscriptionPrice: 170000,
                  frequency: 'Hàng tuần',
                  deliveryDay: 'Thứ 6',
                  durations: ['3 tháng', '6 tháng', '12 tháng'],
                },
                {
                  id: 2,
                  name: 'Sâm tươi ngâm mật',
                  description: '1 hũ sâm ngâm mật ong mỗi tháng',
                  image: 'https://readdy.ai/api/search-image?query=honey%20ginseng%20jar%20premium%20natural%20organic%20simple%20white%20background%20product%20photography&width=400&height=400&seq=sub-sam-002&orientation=squarish',
                  normalPrice: 600000,
                  subscriptionPrice: 510000,
                  frequency: 'Hàng tháng',
                  deliveryDay: 'Ngày 01',
                  durations: ['3 tháng', '6 tháng', '12 tháng'],
                },
              ].map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-48 sm:h-auto bg-gray-100 flex items-center justify-center">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                        </div>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium whitespace-nowrap">
                          Giảm 15%
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 line-through">
                            {pkg.normalPrice.toLocaleString('vi-VN')} đ
                          </span>
                          <div className="text-2xl font-bold text-indigo-600">
                            {pkg.subscriptionPrice.toLocaleString('vi-VN')} đ
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <i className="ri-repeat-line"></i>
                          {pkg.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          Giao {pkg.deliveryDay}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-600">Thời hạn:</span>
                        {pkg.durations.map((dur, idx) => (
                          <button
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        <i className="ri-add-line mr-2"></i>
                        Đăng ký Gói định kỳ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* My Active Subscriptions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Gói đang hoạt động</h3>
              <div className="space-y-3">
                {[
                  {
                    id: 'SUB-001',
                    name: 'Combo Rau củ hữu cơ',
                    frequency: 'Hàng tuần',
                    nextDelivery: '29/11/2024',
                    price: 170000,
                    status: 'active',
                  },
                ].map((sub) => (
                  <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{sub.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{sub.frequency}</span>
                          <span>•</span>
                          <span>Giao tiếp theo: <strong>{sub.nextDelivery}</strong></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-600 mb-1">
                          {sub.price.toLocaleString('vi-VN')} đ
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {sub.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                        <i className="ri-pencil-line mr-2"></i>
                        Chỉnh sửa
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                        <i className="ri-stop-circle-line mr-2"></i>
                        Tạm dừng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/member-hub')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs">Hub</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-600 cursor-pointer">
            <i className="ri-shopping-cart-line text-2xl"></i>
            <span className="text-xs font-semibold">Siêu thị</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <i className="ri-team-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
