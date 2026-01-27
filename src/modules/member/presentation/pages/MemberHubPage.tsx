import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VitaGreenLinkService } from '../../../../lib/vitaScore/linkService';
import VitaGreenBadge from '../../../../components/shared/VitaGreenBadge';
import GreenPointsBadge from '../../../../components/shared/GreenPointsBadge';
import BackButton from '../../../../components/shared/BackButton';
import RoleSwitcher from '../components/RoleSwitcher';
import type { VitaScore } from '../../../../lib/vitaScore/types';

export default function MemberHubPage() {
  const navigate = useNavigate();
  const [showWalletDetail, setShowWalletDetail] = useState(false);
  const [vitaScore, setVitaScore] = useState<VitaScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVitaScore();
  }, []);

  const loadVitaScore = async () => {
    try {
      const userId = sessionStorage.getItem('user_id') || 'demo-user';
      const score = await VitaGreenLinkService.getVitaScore(userId);
      setVitaScore(score);
    } catch (error) {
      console.error('Error loading VITA Score:', error);
    } finally {
      setLoading(false);
    }
  };

  const memberData = {
    name: 'Nguyễn Văn Minh',
    totalBalance: 150000000,
    balanceBreakdown: {
      production: 85000000,
      investment: 45000000,
      voucher: 20000000,
    },
    creditScore: vitaScore?.score ?? 950,
    creditRank: vitaScore ? VitaGreenLinkService.getVitaTierName(vitaScore.score) : 'Kim Cương',
    roles: {
      producer: {
        active: true,
        status: 'Đang canh tác 3 lô',
        notification: 'Có 2 việc cần làm hôm nay',
      },
      resource: {
        active: true,
        status: 'Đang góp 12.5 ha',
        notification: 'Thu nhập tháng này: +8.5 triệu',
      },
      investor: {
        active: true,
        status: 'Đang góp vốn 2 dự án',
        profit: '+12%',
      },
      consumer: {
        active: true,
        status: 'Thành viên thân thiết',
        discount: 'Giảm 20% cho đơn hàng tiếp theo',
      },
    },
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const userId = typeof window !== 'undefined' ? (sessionStorage.getItem('user_id') || 'demo-user') : 'demo-user';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between sm:hidden">
            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
              <BackButton className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 w-9 h-9 flex-shrink-0 px-0 justify-center" label="" />
              <div className="min-w-0 flex-1 overflow-hidden pl-1">
                <h1 className="text-base font-bold text-gray-900 truncate">Xã viên {memberData.name}</h1>
                <p className="text-xs text-gray-600 truncate">Trung tâm Xã viên</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <VitaGreenBadge userId={userId} className="hidden" />
              <GreenPointsBadge className="hidden" />
              <button
                onClick={() => navigate('/member-hub/notifications')}
                className="relative w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="ri-notification-3-line text-lg text-gray-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">3</span>
              </button>
              <RoleSwitcher />
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 overflow-hidden">
              <BackButton className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 flex-shrink-0" />
              <div className="min-w-0 flex-1 overflow-hidden">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  Xin chào, Xã viên {memberData.name}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm mt-0.5 truncate">
                  Chào mừng bạn đến với Trung tâm Xã viên VITA Coop
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <VitaGreenBadge userId={userId} className="hidden lg:flex flex-shrink-0" />
              <GreenPointsBadge className="hidden lg:flex flex-shrink-0" />
              <button
                onClick={() => navigate('/member-hub/notifications')}
                className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <i className="ri-notification-3-line text-lg sm:text-xl text-gray-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">3</span>
              </button>
              <div className="flex-shrink-0">
                <RoleSwitcher />
              </div>
              <div className="hidden lg:flex items-center gap-2 xl:gap-3 pl-3 xl:pl-4 border-l border-gray-200 flex-shrink-0">
                <div className="text-right hidden xl:block">
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">{memberData.name}</p>
                  <p className="text-xs text-gray-500">Xã viên</p>
                </div>
                <div className="w-9 h-9 xl:w-10 xl:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm xl:text-base flex-shrink-0">
                  {memberData.name.charAt(0)}
                </div>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="hidden xl:flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 whitespace-nowrap"
                title="Đăng xuất"
              >
                <i className="ri-logout-box-line text-lg" />
                <span className="text-sm">Đăng xuất</span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="xl:hidden w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                title="Đăng xuất"
              >
                <i className="ri-logout-box-line text-lg text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-emerald-100 text-sm mb-2">Tổng tài sản khả dụng</p>
              <h2 className="text-4xl font-bold mb-4">{formatCurrency(memberData.totalBalance)}</h2>
              {showWalletDetail && (
                <div className="space-y-2 mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-100">Từ Sản xuất:</span>
                    <span className="font-semibold">{formatCurrency(memberData.balanceBreakdown.production)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-100">Từ Góp vốn:</span>
                    <span className="font-semibold">{formatCurrency(memberData.balanceBreakdown.investment)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-100">Voucher:</span>
                    <span className="font-semibold">{formatCurrency(memberData.balanceBreakdown.voucher)}</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowWalletDetail(!showWalletDetail)}
                className="text-sm text-emerald-100 hover:text-white mt-3 flex items-center gap-1"
              >
                {showWalletDetail ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                <i className={`ri-arrow-${showWalletDetail ? 'up' : 'down'}-s-line`} />
              </button>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 mb-2">
                <p className="text-emerald-100 text-xs mb-1">Điểm tín nhiệm</p>
                <div className="flex items-center gap-2">
                  <i className="ri-vip-diamond-fill text-2xl text-yellow-300" />
                  <div>
                    <p className="font-bold text-lg">{memberData.creditScore}/1000</p>
                    <p className="text-xs text-emerald-100">Hạng {memberData.creditRank}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <VitaGreenBadge userId={userId} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2 whitespace-nowrap">
              <i className="ri-bank-card-line text-2xl" />
              <span className="text-sm">Rút tiền</span>
            </button>
            <button
              onClick={() => navigate('/member-hub/notifications')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-notification-3-line text-2xl" />
              <span className="text-sm">Thông báo</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2 whitespace-nowrap">
              <i className="ri-qr-scan-line text-2xl" />
              <span className="text-sm">Quét QR</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2 whitespace-nowrap">
              <i className="ri-customer-service-line text-2xl" />
              <span className="text-sm">Hỗ trợ</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Chọn vai trò của bạn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i className="ri-plant-line text-4xl" />
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap">Đang hoạt động</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">SẢN XUẤT</h4>
              <p className="text-emerald-100 text-sm mb-4">Góp sức lao động & Kỹ thuật</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-emerald-200" />
                  <span className="text-sm">{memberData.roles.producer.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-notification-badge-fill text-yellow-300" />
                  <span className="text-sm">{memberData.roles.producer.notification}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/farmer/producer')}
                className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition-colors whitespace-nowrap"
              >
                Truy cập Nông trại
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-700 to-orange-800 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i className="ri-landscape-line text-4xl" />
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap">Đang hoạt động</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">TÀI NGUYÊN</h4>
              <p className="text-amber-100 text-sm mb-4">Góp Đất & Rừng</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-amber-200" />
                  <span className="text-sm">{memberData.roles.resource.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-money-dollar-circle-fill text-green-300" />
                  <span className="text-sm">{memberData.roles.resource.notification}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/farmer/resource')}
                className="w-full bg-white text-amber-700 font-semibold py-3 rounded-lg hover:bg-amber-50 transition-colors whitespace-nowrap"
              >
                Quản lý Tài sản Đất
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i className="ri-funds-line text-4xl" />
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap">Đang hoạt động</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">GÓP VỐN</h4>
              <p className="text-yellow-100 text-sm mb-4">Góp Vốn tiền mặt</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-yellow-200" />
                  <span className="text-sm">{memberData.roles.investor.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-line-chart-fill text-green-300" />
                  <span className="text-sm">Lợi nhuận tạm tính {memberData.roles.investor.profit}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/member-hub/capital')}
                className="w-full bg-white text-yellow-600 font-semibold py-3 rounded-lg hover:bg-yellow-50 transition-colors whitespace-nowrap"
              >
                Quản lý Danh mục góp vốn
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-4xl" />
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm whitespace-nowrap">Đang hoạt động</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">TIÊU DÙNG</h4>
              <p className="text-blue-100 text-sm mb-4">Mua sản phẩm ưu đãi</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <i className="ri-vip-crown-fill text-yellow-300" />
                  <span className="text-sm">{memberData.roles.consumer.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-discount-percent-fill text-green-300" />
                  <span className="text-sm">{memberData.roles.consumer.discount}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/member-hub/consumer')}
                className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Vào Siêu thị Xã viên
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-2xl text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Về hệ thống 4 vai trò</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                VITA Coop cho phép bạn tham gia với nhiều vai trò khác nhau: <strong>Sản xuất</strong> (góp sức lao động),{' '}
                <strong>Tài nguyên</strong> (góp đất rừng), <strong>Góp vốn</strong> (góp tiền), và <strong>Tiêu dùng</strong> (mua sản phẩm).{' '}
                Mỗi vai trò đều có quyền lợi riêng và cùng tạo nên một hệ sinh thái bền vững.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
