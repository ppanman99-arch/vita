import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUserGreenPoints, 
  getTransactionHistory, 
  getAvailableRewards,
  redeemPoints,
  type GreenPoints,
  type GreenPointTransaction,
  type GreenPointReward
} from '../../lib/greenPoints/service';
import { TIER_THRESHOLDS } from '../../lib/greenPoints/types';
import BackButton from '../../components/shared/BackButton';

export default function GreenPointsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'rewards'>('overview');
  const [points, setPoints] = useState<GreenPoints | null>(null);
  const [transactions, setTransactions] = useState<GreenPointTransaction[]>([]);
  const [rewards, setRewards] = useState<GreenPointReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReward, setSelectedReward] = useState<GreenPointReward | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pointsData, transactionsData, rewardsData] = await Promise.all([
        getUserGreenPoints(),
        getTransactionHistory(getCurrentUserId()),
        getAvailableRewards(),
      ]);
      
      setPoints(pointsData);
      setTransactions(transactionsData);
      setRewards(rewardsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserId = (): string => {
    return sessionStorage.getItem('user_id') || 'demo-user';
  };

  const handleRedeem = async () => {
    if (!selectedReward || !points) return;
    
    if (points.availablePoints < selectedReward.pointsRequired) {
      alert('Bạn không đủ điểm để đổi quà này!');
      return;
    }

    try {
      setRedeeming(true);
      await redeemPoints(
        getCurrentUserId(),
        selectedReward.id,
        selectedReward.pointsRequired,
        selectedReward.name
      );
      
      alert(`Đã đổi thành công: ${selectedReward.name}!`);
      setShowRedeemModal(false);
      setSelectedReward(null);
      await loadData(); // Reload data
    } catch (error) {
      console.error('Error redeeming:', error);
      alert('Có lỗi xảy ra khi đổi điểm. Vui lòng thử lại.');
    } finally {
      setRedeeming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!points) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không thể tải dữ liệu điểm</p>
        </div>
      </div>
    );
  }

  const tierInfo = TIER_THRESHOLDS[points.tier];
  const progressPercent = points.tierPoints > 0 
    ? ((TIER_THRESHOLDS[points.tier].max - points.tierPoints) / TIER_THRESHOLDS[points.tier].max) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BackButton className="bg-white/20 hover:bg-white/30 text-white border-none" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Green Points</h1>
              <p className="text-sm sm:text-base text-white/90">Hệ thống điểm thưởng xanh</p>
            </div>
          </div>

          {/* Points Display */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm opacity-90 mb-1">Điểm khả dụng</div>
                <div className="text-4xl font-bold">{points.availablePoints.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${tierInfo.icon} text-2xl`} style={{ color: tierInfo.color }}></i>
                  <span className="text-lg font-semibold capitalize">{points.tier}</span>
                </div>
                {points.tierPoints > 0 && (
                  <div className="text-xs opacity-75">
                    Còn {points.tierPoints.toLocaleString()} điểm để lên cấp
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {points.tierPoints > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Tiến độ lên cấp</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-1 flex gap-1 mb-6">
          {[
            { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
            { id: 'history', label: 'Lịch sử', icon: 'ri-history-line' },
            { id: 'rewards', label: 'Đổi điểm', icon: 'ri-gift-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="text-xs text-gray-600 mb-1">Tháng này</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    +{points.stats.earnedThisMonth.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="text-xs text-gray-600 mb-1">Năm nay</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    +{points.stats.earnedThisYear.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="text-xs text-gray-600 mb-1">Đã đổi tháng này</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {points.stats.redeemedThisMonth.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="text-xs text-gray-600 mb-1">Tổng tích lũy</div>
                  <div className="text-2xl font-bold text-teal-600">
                    {points.lifetimePoints.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Top Activity */}
              {points.stats.topActivity && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động tích điểm nhiều nhất</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <i className="ri-star-fill text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{points.stats.topActivity}</div>
                      <div className="text-sm text-gray-600">Hoạt động chính của bạn</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hành động nhanh</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    <i className="ri-gift-line text-2xl mb-2 block"></i>
                    Đổi điểm
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="p-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    <i className="ri-history-line text-2xl mb-2 block"></i>
                    Lịch sử
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h3>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'earn' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          <i className={`${
                            tx.type === 'earn' ? 'ri-add-line text-emerald-600' : 'ri-subtract-line text-amber-600'
                          } text-xl`}></i>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{tx.activity}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(tx.timestamp).toLocaleString('vi-VN')}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        tx.type === 'earn' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {tx.type === 'earn' ? '+' : ''}{tx.points.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-history-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Chưa có giao dịch nào</p>
                </div>
              )}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Đổi điểm lấy quà</h3>
              {rewards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
                    >
                      {reward.image && (
                        <img
                          src={reward.image}
                          alt={reward.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h4 className="font-bold text-gray-900 mb-2">{reward.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-emerald-600 font-bold">
                          {reward.pointsRequired.toLocaleString()} điểm
                        </div>
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowRedeemModal(true);
                          }}
                          disabled={!reward.available || points.availablePoints < reward.pointsRequired}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            reward.available && points.availablePoints >= reward.pointsRequired
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Đổi ngay
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <i className="ri-gift-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Chưa có quà tặng nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => !redeeming && setShowRedeemModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận đổi điểm</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="font-semibold text-gray-900 mb-2">{selectedReward.name}</div>
              <div className="text-sm text-gray-600 mb-4">{selectedReward.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Số điểm cần:</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {selectedReward.pointsRequired.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">Điểm hiện có:</span>
                <span className="text-xl font-semibold text-gray-900">
                  {points?.availablePoints.toLocaleString()}
                </span>
              </div>
              {points && points.availablePoints >= selectedReward.pointsRequired && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Điểm còn lại:</span>
                  <span className="text-xl font-semibold text-emerald-600">
                    {(points.availablePoints - selectedReward.pointsRequired).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                disabled={redeeming}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleRedeem}
                disabled={redeeming || !points || points.availablePoints < selectedReward.pointsRequired}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {redeeming ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-check-line"></i>
                    <span>Xác nhận đổi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
