import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function FactoryPortalPage() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<'overview' | 'agile-manufacturing' | 'tech-transfer' | 'supply-chain' | 'corporate-farming' | 'qa-export'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-gray-700 text-lg"></i>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Nhà Máy Sản Xuất & Đối Tác Thu Mua</h1>
                <p className="text-sm text-gray-500">VITA Enterprise & Factory Portal - Factory as a Service</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PortalSwitcher />
              <div className="px-3 py-1.5 bg-green-100 rounded-lg">
                <span className="text-sm font-medium text-green-700">Factory Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Module Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveModule('overview')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'overview'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-dashboard-line block mb-1 text-lg"></i>
              Tổng quan
            </button>
            <button
              onClick={() => setActiveModule('agile-manufacturing')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'agile-manufacturing'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-settings-3-line block mb-1 text-lg"></i>
              Sản xuất linh hoạt
            </button>
            <button
              onClick={() => setActiveModule('tech-transfer')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'tech-transfer'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-flask-line block mb-1 text-lg"></i>
              Chuyển giao CN
            </button>
            <button
              onClick={() => setActiveModule('supply-chain')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'supply-chain'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-truck-line block mb-1 text-lg"></i>
              Chuỗi cung ứng
            </button>
            <button
              onClick={() => setActiveModule('corporate-farming')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'corporate-farming'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-plant-line block mb-1 text-lg"></i>
              Vùng trồng
            </button>
            <button
              onClick={() => setActiveModule('qa-export')}
              className={`py-3 px-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeModule === 'qa-export'
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className="ri-global-line block mb-1 text-lg"></i>
              QA & Xuất khẩu
            </button>
          </div>
        </div>

        {/* Module: Overview */}
        {activeModule === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <i className="ri-settings-3-line text-2xl text-indigo-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-500">Đơn hàng đang sản xuất</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <i className="ri-flask-line text-2xl text-blue-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">5</div>
                <div className="text-sm text-gray-500">Công nghệ đã mua</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <i className="ri-truck-line text-2xl text-green-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">98.5%</div>
                <div className="text-sm text-gray-500">Tỷ lệ đạt chuẩn</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <i className="ri-global-line text-2xl text-purple-600"></i>
                </div>
                <div className="text-2xl font-bold text-gray-800">45</div>
                <div className="text-sm text-gray-500">Lô đã xuất khẩu</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Thao tác nhanh</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                  <i className="ri-add-line text-2xl mb-2"></i>
                  <div className="font-semibold">Tạo đơn hàng</div>
                </button>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                  <i className="ri-auction-line text-2xl mb-2"></i>
                  <div className="font-semibold">Đấu giá CN</div>
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                  <i className="ri-shopping-cart-line text-2xl mb-2"></i>
                  <div className="font-semibold">Thu mua</div>
                </button>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                  <i className="ri-file-paper-line text-2xl mb-2"></i>
                  <div className="font-semibold">Xuất khẩu</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Module: Agile Manufacturing - Dịch vụ Sản xuất Linh hoạt */}
        {activeModule === 'agile-manufacturing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Dịch vụ Sản xuất Linh hoạt</h3>
                  <p className="text-sm text-gray-600">Phục vụ đơn hàng nhỏ lẻ từ Creator/Thầy thuốc</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Niêm yết năng lực
                </button>
              </div>

              {/* Lab-scale Service */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-flask-line text-indigo-600"></i>
                  Dây chuyền Mini (Lab-scale Service)
                </h4>
                <div className="border-2 border-indigo-200 rounded-xl p-5 bg-indigo-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Sản phẩm</div>
                      <div className="font-bold text-gray-900">Viên nang dược liệu</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">MOQ (Số lượng tối thiểu)</div>
                      <div className="font-bold text-indigo-600">100 sản phẩm/lô</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Thời gian sản xuất</div>
                      <div className="font-bold text-gray-900">5-7 ngày</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Đơn hàng đang chờ ghép</div>
                      <div className="font-bold text-green-600">3 đơn (450 sản phẩm)</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-600 mb-1">Cơ chế ghép đơn hàng</div>
                    <p className="text-sm text-gray-800">Hệ thống tự động ghép nhiều đơn hàng nhỏ có cùng quy trình để chạy chung một mẻ lớn, tối ưu chi phí vận hành.</p>
                  </div>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                    <i className="ri-settings-3-line mr-2"></i>
                    Cấu hình dây chuyền
                  </button>
                </div>
              </div>

              {/* White Label Supermarket */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-store-3-line text-blue-600"></i>
                  Siêu thị Nhãn trắng (White Label Supermarket)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-cup-line text-2xl text-blue-600"></i>
                      <div>
                        <div className="font-bold text-gray-900">Trà túi lọc</div>
                        <div className="text-sm text-gray-600">Sẵn sàng: 5,000 túi</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Creator chỉ cần: Chọn sản phẩm → Upload thiết kế → Giao hàng trong 5 ngày</div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      Quản lý kho
                    </button>
                  </div>
                  <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-flask-line text-2xl text-blue-600"></i>
                      <div>
                        <div className="font-bold text-gray-900">Cao sâm</div>
                        <div className="text-sm text-gray-600">Sẵn sàng: 2,000 chai</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Nhãn trống, sẵn sàng in ấn và dán nhãn theo thiết kế của Creator</div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      Quản lý kho
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-settings-3-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Factory as a Service</h3>
                  <p className="text-sm opacity-90">Tận dụng tối đa công suất máy móc thừa</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Phục vụ nhu cầu "làm mẫu" (Prototyping) và sản xuất thăm dò thị trường</li>
                <li>• Tự động ghép nhiều đơn hàng nhỏ để tối ưu chi phí</li>
                <li>• Nhãn trắng sẵn sàng, Creator chỉ cần upload thiết kế</li>
                <li>• Tạo dòng tiền mới từ làn sóng Creator (Mô hình C2M)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module: Tech Transfer - Kết nối R&D & Chuyển giao Công nghệ */}
        {activeModule === 'tech-transfer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Kết nối R&D & Chuyển giao Công nghệ</h3>
                  <p className="text-sm text-gray-600">Biến Nhà máy thành đơn vị tiên phong ứng dụng công nghệ mới</p>
                </div>
              </div>

              {/* Tech Auction */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-auction-line text-purple-600"></i>
                  Sàn Đấu giá Công nghệ
                </h4>
                <div className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">IP-2024-001</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đang đấu giá</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Quy trình lên men Sâm đen bằng enzyme</h4>
                      <p className="text-sm text-gray-700 mb-3">Tăng hiệu suất 200% so với phương pháp nhiệt độ thường. Viện Dược liệu.</p>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Giá hiện tại</div>
                          <div className="font-bold text-purple-600">750 triệu VNĐ</div>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                          <div className="text-xs text-gray-600">Thời hạn độc quyền</div>
                          <div className="font-bold text-purple-600">5 năm</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                      <i className="ri-auction-line mr-1"></i>
                      Tham gia đấu giá
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                      <i className="ri-eye-line mr-1"></i>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>

              {/* Troubleshooting Order */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-tools-line text-orange-600"></i>
                  Đặt hàng Giải pháp Sự cố
                </h4>
                <div className="space-y-4">
                  <div className="border-2 border-orange-200 rounded-xl p-5 bg-orange-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">CASE-IND-001</span>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Khẩn cấp</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Cao lỏng bị kết tủa sau 24h</h4>
                        <p className="text-sm text-gray-700 mb-3">Dòng sản phẩm: Cao Cà Gai Leo • Ảnh hưởng: 500 chai</p>
                        <div className="bg-white rounded-lg p-3 mb-3">
                          <div className="text-xs text-gray-600 mb-1">Mô tả sự cố</div>
                          <p className="text-sm text-gray-800">Sau khi đóng chai 24h, cao bị tách thành 2 lớp: lớp trong suốt ở trên và lớp đục ở dưới.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer">
                        <i className="ri-video-chat-line mr-1"></i>
                        Video Call
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                        <i className="ri-user-star-line mr-1"></i>
                        Chuyên gia đã nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-flask-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Open Innovation</h3>
                  <p className="text-sm opacity-90">Hiện thực hóa ý tưởng từ R&D</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Đấu giá mua độc quyền công nghệ mới nhất từ Portal R&D</li>
                <li>• Tạo lợi thế cạnh tranh cho sản phẩm</li>
                <li>• Đặt hàng cứu hộ kỹ thuật khi gặp sự cố</li>
                <li>• Chuyên gia từ R&D Center tư vấn online hoặc offline</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module: Smart Supply Chain - Quản trị Thu mua & Chuỗi cung ứng */}
        {activeModule === 'supply-chain' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Quản trị Thu mua & Chuỗi cung ứng</h3>
                  <p className="text-sm text-gray-600">Tìm kiếm và thu mua nguyên liệu từ mạng lưới HTX</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Tạo yêu cầu thu mua
                </button>
              </div>

              {/* Raw Material Exchange */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-shopping-cart-line text-green-600"></i>
                  Sàn Giao dịch Nguyên liệu Thô
                </h4>
                <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50">
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Yêu cầu thu mua hiện tại</div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-bold text-gray-900 mb-1">5 tấn Sâm dây</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Tiêu chuẩn: GACP</div>
                        <div>• Độ cao: &gt; 1500m</div>
                        <div>• Hàm lượng Saponin: &gt; 5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white rounded-lg p-2">
                      <div className="text-xs text-gray-600">HTX khớp lệnh</div>
                      <div className="font-bold text-green-600">3 HTX</div>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <div className="text-xs text-gray-600">Giá đề xuất</div>
                      <div className="font-bold text-green-600">15-18 triệu/tấn</div>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                    <i className="ri-search-line mr-2"></i>
                    Tìm nguồn hàng
                  </button>
                </div>
              </div>

              {/* Future Contracts */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-file-contract-line text-blue-600"></i>
                  Đặt hàng Tương lai (Future Contracts)
                </h4>
                <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-gray-900">Hợp đồng bao tiêu Sâm Ngọc Linh</div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đã ký</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>HTX: HTX Dược Liệu Kon Tum</div>
                        <div>Sản lượng: 2 tấn • Thu hoạch: Q2/2025</div>
                        <div>Smart Contract đã khóa sản lượng này</div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    <i className="ri-add-line mr-2"></i>
                    Ký hợp đồng mới
                  </button>
                </div>
              </div>

              {/* Logistics Tracking */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-truck-line text-purple-600"></i>
                  Theo dõi Vận chuyển
                </h4>
                <div className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-bold text-gray-900">Xe tải 51B-12345</div>
                          <div className="text-sm text-gray-600">Từ: HTX Lạng Sơn → Nhà máy Hà Nội</div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Đang vận chuyển</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Còn lại: 45km • ETA: 1 giờ 30 phút</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Kiểm tra tại cổng (Gate Check)</div>
                    <div className="text-xs text-gray-600 mb-3">Thủ kho quét mã QR của lô hàng. Hệ thống hiển thị ngay lịch sử canh tác. Nếu phát hiện lô hàng bị "tráo", hệ thống cảnh báo từ chối nhập kho.</div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                      <i className="ri-qr-scan-line mr-2"></i>
                      Quét mã QR
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-truck-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Smart Supply Chain</h3>
                  <p className="text-sm opacity-90">Không còn lo đứt gãy chuỗi cung ứng</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Tìm nguồn hàng theo tiêu chí kỹ thuật chi tiết</li>
                <li>• Ký hợp đồng bao tiêu từ khi cây mới xuống giống</li>
                <li>• Smart Contract khóa sản lượng, đảm bảo nguồn cung ổn định</li>
                <li>• Theo dõi vận chuyển và kiểm tra tại cổng bằng QR code</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module: Corporate Farming - Quản trị Vùng trồng Tự chủ */}
        {activeModule === 'corporate-farming' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Quản trị Vùng trồng Tự chủ</h3>
                  <p className="text-sm text-gray-600">Dành cho Tập đoàn Dược lớn có sở hữu đất riêng</p>
                </div>
              </div>

              {/* Digital Twin Farm */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-map-2-line text-teal-600"></i>
                  Bản sao số Vùng nguyên liệu (Digital Twin Farm)
                </h4>
                <div className="border-2 border-teal-200 rounded-xl p-5 bg-teal-50">
                  <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl overflow-hidden mb-4">
                    <img
                      src="https://readdy.ai/api/search-image?query=digital%20farm%20map%20with%20plots%20and%20IoT%20sensors%2C%20agricultural%20field%20monitoring%20system%2C%20precision%20farming%20technology%2C%20topographic%20view&width=800&height=400&seq=factory-farm-001&orientation=landscape"
                      alt="Digital Twin Farm"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                      <div className="text-xs font-semibold text-gray-700 mb-1">Tổng diện tích</div>
                      <div className="text-lg font-bold text-teal-600">250 ha</div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
                      <div className="text-xs font-semibold text-gray-700 mb-1">Số lô</div>
                      <div className="text-lg font-bold text-teal-600">45 lô</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600">Lô khỏe mạnh</div>
                      <div className="font-bold text-green-600">38 lô</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600">Cần chú ý</div>
                      <div className="font-bold text-yellow-600">5 lô</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-600">Cần xử lý</div>
                      <div className="font-bold text-red-600">2 lô</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personnel Management */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-user-line text-blue-600"></i>
                  Quản lý Nhân sự Nông nghiệp
                </h4>
                <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-bold text-gray-900">Nguyễn Văn A</div>
                          <div className="text-sm text-gray-600">Công nhân • Lô A1-A5</div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đang làm việc</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Chấm công: 08:00 • Nhiệm vụ: Bón phân lô A2</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    <i className="ri-user-add-line mr-2"></i>
                    Quản lý nhân sự
                  </button>
                </div>
              </div>

              {/* IIoT Integration */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-sensor-line text-purple-600"></i>
                  Tích hợp IoT Công nghiệp (IIoT)
                </h4>
                <div className="border-2 border-purple-200 rounded-xl p-5 bg-purple-50">
                  <div className="space-y-3 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <i className="ri-drop-line text-blue-600"></i>
                          <div>
                            <div className="font-bold text-gray-900">Hệ thống tưới tự động</div>
                            <div className="text-sm text-gray-600">Lô A1-A10</div>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Hoạt động</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <i className="ri-drone-line text-green-600"></i>
                          <div>
                            <div className="font-bold text-gray-900">Drone phun thuốc</div>
                            <div className="text-sm text-gray-600">Lô B1-B15</div>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Sẵn sàng</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <i className="ri-cloudy-line text-amber-600"></i>
                          <div>
                            <div className="font-bold text-gray-900">Trạm quan trắc khí hậu</div>
                            <div className="text-sm text-gray-600">Toàn bộ vùng</div>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Hoạt động</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Kịch bản tự động hóa</div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>• Cảm biến báo độ ẩm &lt; 60% → Tự động bật van tưới số 2 trong 15 phút</div>
                      <div>• Nhiệt độ &gt; 35°C → Tự động phun sương làm mát</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Data Sharing */}
              <div className="mt-6">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <i className="ri-share-line text-2xl text-orange-600"></i>
                    <div>
                      <div className="font-bold text-gray-900">Chia sẻ Dữ liệu Marketing</div>
                      <div className="text-sm text-gray-600">Public dữ liệu vùng trồng sang Creator Hub</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">KOL khi bán hàng có thể lấy dữ liệu này làm bằng chứng: "Sản phẩm này được trồng tại nông trại 4.0 của Tập đoàn A, chăm sóc bằng Drone".</p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer">
                    <i className="ri-settings-3-line mr-2"></i>
                    Cấu hình chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module: QA/QC & Global Trade - Quản trị Chất lượng & Xuất khẩu */}
        {activeModule === 'qa-export' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Quản trị Chất lượng & Xuất khẩu</h3>
                  <p className="text-sm text-gray-600">Chốt chặn cuối cùng để cấp "Hộ chiếu số" cho sản phẩm</p>
                </div>
              </div>

              {/* QA/QC */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-shield-check-line text-green-600"></i>
                  Kiểm soát Chất lượng (QA/QC)
                </h4>
                <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50">
                  <div className="space-y-3 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-bold text-gray-900">Lô BATCH-2024-045</div>
                          <div className="text-sm text-gray-600">Cà Gai Leo khô • 500 kg</div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đạt chuẩn</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Hoạt chất</div>
                          <div className="font-bold text-green-600">95.2%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Dư lượng</div>
                          <div className="font-bold text-green-600">Đạt</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Vi sinh</div>
                          <div className="font-bold text-green-600">Đạt</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-800 mb-2">Quy tắc Chặn (Blocking Rule)</div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>• Nếu lô hàng không đạt chỉ số vi sinh/kim loại nặng</div>
                      <div>• Hệ thống tự động khóa lệnh xuất kho</div>
                      <div>• Không cho phép đóng gói</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* E-Documentation */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-file-paper-line text-blue-600"></i>
                  Hồ sơ Xuất khẩu Số (E-Documentation)
                </h4>
                <div className="border-2 border-blue-200 rounded-xl p-5 bg-blue-50">
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-bold text-gray-900">Lô EXP-2024-012</div>
                          <div className="text-sm text-gray-600">Đích đến: Châu Âu • 2 tấn Cà Gai Leo</div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Đã cấp</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-checkbox-circle-fill text-green-600"></i>
                          <span>Certificate of Origin (C/O)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-checkbox-circle-fill text-green-600"></i>
                          <span>Phytosanitary Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-checkbox-circle-fill text-green-600"></i>
                          <span>Carbon Footprint Report (CBAM)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    <i className="ri-file-download-line mr-2"></i>
                    Tải bộ hồ sơ xuất khẩu
                  </button>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-global-line text-3xl"></i>
                <div>
                  <h3 className="font-bold text-lg">Hộ chiếu số cho Sản phẩm</h3>
                  <p className="text-sm opacity-90">Vượt qua hàng rào kỹ thuật để xuất khẩu</p>
                </div>
              </div>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Quản lý quy trình lấy mẫu tại dây chuyền (In-line QC)</li>
                <li>• Kết nối với phòng Lab nội bộ hoặc R&D Center</li>
                <li>• Tự động tạo bộ hồ sơ xuất khẩu chuẩn quốc tế</li>
                <li>• Carbon Footprint Report cho CBAM (Châu Âu)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
