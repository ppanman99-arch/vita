import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenPointsBadge from '../../components/shared/GreenPointsBadge';
import VitaGreenBadge from '../../components/shared/VitaGreenBadge';
import { getUserGreenPoints } from '../../lib/greenPoints/service';
import { VitaGreenLinkService } from '../../lib/vitaScore/linkService';
import type { GreenPoints } from '../../lib/greenPoints/service';
import type { VitaScore } from '../../lib/vitaScore/types';

export default function InvestorHomePage() {
  const navigate = useNavigate();
  const [greenPoints, setGreenPoints] = useState<GreenPoints | null>(null);
  const [vitaScore, setVitaScore] = useState<VitaScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userId = sessionStorage.getItem('user_id') || 'demo-user-investor';
      const [points, score] = await Promise.all([
        getUserGreenPoints(userId),
        VitaGreenLinkService.getVitaScore(userId),
      ]);
      setGreenPoints(points);
      setVitaScore(score);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Mock data
  const investmentSummary = {
    totalInvested: 80000000,
    totalReturns: 9600000,
    currentValue: 89600000,
    pendingDividends: 2400000,
    activeProjects: 2,
    totalProfit: 12, // %
  };

  const activeInvestments = [
    {
      id: 1,
      name: 'Dự án Sâm Ngọc Linh - Lô B2',
      cooperative: 'HTX Dược Liệu Kon Tum',
      invested: 50000000,
      currentValue: 56000000,
      profit: 12,
      nextDividend: '15/02/2025',
      dividendAmount: 1500000,
    },
    {
      id: 2,
      name: 'Vườn ươm công nghệ cao',
      cooperative: 'HTX Nông Nghiệp Sạch Đà Lạt',
      invested: 30000000,
      currentValue: 33600000,
      profit: 12,
      nextDividend: '20/02/2025',
      dividendAmount: 900000,
    },
  ];

  const newOpportunities = [
    {
      id: 3,
      name: 'Dự án Đương Quy hữu cơ',
      cooperative: 'HTX Dược Liệu Lâm Đồng',
      targetAmount: 200000000,
      raised: 120000000,
      minInvest: 10000000,
      expectedReturn: 15,
      duration: '24 tháng',
      investors: 12,
      progress: 60,
    },
    {
      id: 4,
      name: 'Trại nghiên cứu Dược liệu',
      cooperative: 'HTX Khoa Học Dược Liệu Tây Nguyên',
      targetAmount: 150000000,
      raised: 45000000,
      minInvest: 5000000,
      expectedReturn: 18,
      duration: '36 tháng',
      investors: 5,
      progress: 30,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'dividend',
      title: 'Cổ tức Q1/2025 sắp được chi trả',
      message: 'Dự án Sâm Ngọc Linh sẽ chi trả cổ tức vào 15/02/2025',
      time: '2 giờ trước',
      unread: true,
    },
    {
      id: 2,
      type: 'project',
      title: 'Dự án mới: Đương Quy hữu cơ',
      message: 'HTX Dược Liệu Lâm Đồng đang mở gọi vốn',
      time: '1 ngày trước',
      unread: true,
    },
    {
      id: 3,
      type: 'report',
      title: 'Báo cáo tháng 1/2025 đã có',
      message: 'Xem báo cáo tiến độ dự án của bạn',
      time: '3 ngày trước',
      unread: false,
    },
  ];

  const quickActions = [
    {
      id: 'invest',
      label: 'Đầu tư mới',
      icon: 'ri-funds-line',
      color: 'from-amber-500 to-yellow-600',
      onClick: () => navigate('/farmer/investor?tab=market'),
    },
    {
      id: 'wallet',
      label: 'Ví đầu tư',
      icon: 'ri-wallet-3-line',
      color: 'from-emerald-500 to-teal-600',
      onClick: () => navigate('/investor-wallet'),
    },
    {
      id: 'community',
      label: 'Cộng đồng',
      icon: 'ri-community-line',
      color: 'from-blue-500 to-indigo-600',
      onClick: () => navigate('/investor-community'),
    },
    {
      id: 'reports',
      label: 'Báo cáo',
      icon: 'ri-file-chart-line',
      color: 'from-purple-500 to-pink-600',
      onClick: () => navigate('/farmer/investor?tab=monitor'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/member-hub')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Trang chủ Đầu tư</h1>
              <p className="text-amber-100 text-xs sm:text-sm">Tổng quan đầu tư & Cơ hội mới</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VitaGreenBadge userId={sessionStorage.getItem('user_id') || 'demo-user-investor'} className="hidden sm:flex" />
            <GreenPointsBadge className="hidden sm:flex" />
          </div>
        </div>

        {/* Investment Summary Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <p className="text-amber-100 text-xs mb-1">Tổng đã đầu tư</p>
              <p className="text-lg sm:text-2xl font-bold">{formatCurrency(investmentSummary.totalInvested)}</p>
            </div>
            <div>
              <p className="text-amber-100 text-xs mb-1">Lợi nhuận</p>
              <p className="text-lg sm:text-2xl font-bold text-green-300">+{formatCurrency(investmentSummary.totalReturns)}</p>
            </div>
            <div>
              <p className="text-amber-100 text-xs mb-1">Giá trị hiện tại</p>
              <p className="text-lg sm:text-2xl font-bold">{formatCurrency(investmentSummary.currentValue)}</p>
            </div>
            <div>
              <p className="text-amber-100 text-xs mb-1">Cổ tức chờ</p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-300">{formatCurrency(investmentSummary.pendingDividends)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-100">Tổng lợi nhuận:</span>
              <span className="font-bold text-lg">+{investmentSummary.totalProfit}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`bg-gradient-to-br ${action.color} rounded-xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className={`${action.icon} text-2xl sm:text-3xl`}></i>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-center">{action.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Investments */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Dự án đang đầu tư</h2>
            <button
              onClick={() => navigate('/farmer/investor?tab=portfolio')}
              className="text-amber-600 text-sm font-medium hover:text-amber-700"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {activeInvestments.map((investment) => (
              <div
                key={investment.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors cursor-pointer"
                onClick={() => navigate(`/farmer/investor?project=${investment.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{investment.name}</h3>
                    <p className="text-xs text-gray-600">{investment.cooperative}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Đang hoạt động
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Đã đầu tư</p>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(investment.invested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Giá trị hiện tại</p>
                    <p className="text-sm font-bold text-green-600">{formatCurrency(investment.currentValue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Lợi nhuận</p>
                    <p className="text-sm font-bold text-green-600">+{investment.profit}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Cổ tức tiếp theo</p>
                    <p className="text-sm font-bold text-amber-600">{investment.nextDividend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Opportunities */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cơ hội đầu tư mới</h2>
            <button
              onClick={() => navigate('/farmer/investor?tab=market')}
              className="text-amber-600 text-sm font-medium hover:text-amber-700"
            >
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newOpportunities.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors cursor-pointer"
                onClick={() => navigate(`/farmer/investor?project=${project.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-xs text-gray-600">{project.cooperative}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Đang gọi vốn
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Tiến độ gọi vốn</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Lợi nhuận kỳ vọng</p>
                    <p className="font-bold text-green-600">+{project.expectedReturn}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Thời gian</p>
                    <p className="font-bold text-gray-900">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Đầu tư tối thiểu</p>
                    <p className="font-bold text-gray-900">{formatCurrency(project.minInvest)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nhà đầu tư</p>
                    <p className="font-bold text-gray-900">{project.investors} người</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Thông báo</h2>
            <button className="text-amber-600 text-sm font-medium hover:text-amber-700">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  notif.unread
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notif.type === 'dividend' ? 'bg-green-100' :
                  notif.type === 'project' ? 'bg-amber-100' :
                  'bg-blue-100'
                }`}>
                  <i className={`${
                    notif.type === 'dividend' ? 'ri-money-dollar-circle-line text-green-600' :
                    notif.type === 'project' ? 'ri-funds-line text-amber-600' :
                    'ri-file-chart-line text-blue-600'
                  } text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{notif.title}</h4>
                    {notif.unread && (
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{notif.message}</p>
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Green Points Summary */}
          {greenPoints && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Green Points</p>
                  <p className="text-3xl font-bold">{greenPoints.availablePoints.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => navigate('/green-points')}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  Xem chi tiết
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs opacity-75 mb-1">Tháng này</p>
                  <p className="text-lg font-semibold">+{greenPoints.stats.earnedThisMonth.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75 mb-1">Cấp độ</p>
                  <p className="text-lg font-semibold capitalize">{greenPoints.tier}</p>
                </div>
              </div>
            </div>
          )}

          {/* VITA Score Summary */}
          {vitaScore && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">VITA Score</p>
                  <p className="text-3xl font-bold">{vitaScore.score}/1000</p>
                </div>
                <button
                  onClick={() => navigate('/vita-green-dashboard')}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  Xem chi tiết
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs opacity-75 mb-1">Hạng</p>
                  <p className="text-lg font-semibold">{VitaGreenLinkService.getVitaTierName(vitaScore.score)}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75 mb-1">Tuân thủ</p>
                  <p className="text-lg font-semibold">{vitaScore.stats.complianceRate}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-amber-600 cursor-pointer">
            <i className="ri-home-4-line text-2xl"></i>
            <span className="text-xs font-semibold">Trang chủ</span>
          </button>
          <button 
            onClick={() => navigate('/farmer/investor')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-funds-line text-2xl"></i>
            <span className="text-xs">Đầu tư</span>
          </button>
          <button 
            onClick={() => navigate('/investor-wallet')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-wallet-3-line text-2xl"></i>
            <span className="text-xs">Ví</span>
          </button>
          <button 
            onClick={() => navigate('/investor-community')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <i className="ri-community-line text-2xl"></i>
            <span className="text-xs">Cộng đồng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
