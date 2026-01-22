import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VitaGreenLinkService } from '../../lib/vitaScore/linkService';
import { getUserGreenPoints } from '../../lib/greenPoints/service';
import { GREEN_POINTS_TO_VITA } from '../../lib/vitaScore/types';
import type { VitaScore, VitaGreenLink } from '../../lib/vitaScore/types';
import BackButton from '../../components/shared/BackButton';

export default function VitaGreenDashboardPage() {
  const navigate = useNavigate();
  const [vitaScore, setVitaScore] = useState<VitaScore | null>(null);
  const [link, setLink] = useState<VitaGreenLink | null>(null);
  const [greenPoints, setGreenPoints] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'exchange'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const userId = sessionStorage.getItem('user_id') || 'demo-user';
      const [score, linkData, points] = await Promise.all([
        VitaGreenLinkService.getVitaScore(userId),
        VitaGreenLinkService.getVitaGreenLink(userId),
        getUserGreenPoints(userId),
      ]);
      setVitaScore(score);
      setLink(linkData);
      setGreenPoints(points);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExchange = async (trainingType: string, points: number) => {
    if (confirm(`Bạn có chắc muốn đổi ${points.toLocaleString()} Green Points để tham gia đào tạo ${trainingType}?`)) {
      const userId = sessionStorage.getItem('user_id') || 'demo-user';
      const success = await VitaGreenLinkService.exchangeGreenPointsForVita(
        userId,
        points,
        trainingType as any
      );
      
      if (success) {
        alert('Đổi thành công! VITA Score đã được tăng.');
        loadData();
      } else {
        alert('Đổi thất bại. Vui lòng kiểm tra lại số điểm.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!vitaScore || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Lỗi tải dữ liệu</h1>
          <p className="text-gray-700">Không thể tải thông tin VITA Score. Vui lòng thử lại sau.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-lg">
            Tải lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-white/20 text-white" />
            <div>
              <h1 className="text-2xl font-bold mb-2">VITA Score & Green Points</h1>
              <p className="text-emerald-100 text-sm">Hệ thống liên kết tín nhiệm & Loyalty</p>
            </div>
          </div>
        </div>

        {/* Combined Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-emerald-100 mb-1">VITA Score</p>
            <p className="text-3xl font-bold">{vitaScore.score}/1000</p>
            <p className="text-xs text-emerald-100 mt-1">
              {VitaGreenLinkService.getVitaTierName(vitaScore.score)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs text-emerald-100 mb-1">Bonus tháng này</p>
            <p className="text-3xl font-bold">+{link.monthlyVitaBonus}</p>
            <p className="text-xs text-emerald-100 mt-1">
              {link.vitaBonusMultiplier}x multiplier
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-1 flex gap-1 mb-6">
          {[
            { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
            { id: 'benefits', label: 'Quyền lợi', icon: 'ri-gift-line' },
            { id: 'exchange', label: 'Đổi điểm', icon: 'ri-exchange-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* VITA Score Breakdown */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Phân tích VITA Score</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(vitaScore.breakdown).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1 capitalize">{key}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${(value / 250) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Info */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bonus từ VITA Score</h3>
              <p className="text-gray-700 mb-4">
                Với VITA Score {vitaScore.score} ({VitaGreenLinkService.getVitaTierName(vitaScore.score)}), 
                bạn nhận được <strong>{link.vitaBonusMultiplier}x</strong> multiplier cho Green Points.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Bonus tháng này:</p>
                <p className="text-3xl font-bold text-emerald-600">+{link.monthlyVitaBonus} Green Points</p>
              </div>
            </div>

            {/* Green Points Summary */}
            {greenPoints && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Green Points của bạn</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{greenPoints.availablePoints.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Khả dụng</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{greenPoints.stats.earnedThisMonth.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Tháng này</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600 capitalize">{greenPoints.tier}</p>
                    <p className="text-sm text-gray-600">Cấp độ</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-4">
            {link.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                  benefit.unlocked ? 'border-emerald-500' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{benefit.name}</h4>
                      {benefit.unlocked && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Đã mở khóa
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{benefit.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        VITA: <strong>{benefit.vitaRequirement}+</strong>
                      </span>
                      <span className="text-gray-600">
                        Green: <strong>{benefit.greenPointsRequirement.toLocaleString()}+</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'exchange' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Đổi Green Points để tăng VITA Score
              </h3>
              <p className="text-gray-600 mb-6">
                Sử dụng Green Points để tham gia đào tạo và chứng nhận, giúp tăng VITA Score.
              </p>

              <div className="space-y-3">
                {Object.entries(GREEN_POINTS_TO_VITA.training).map(([type, conversion]) => (
                  <div
                    key={type}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize mb-1">
                          Đào tạo {type}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Tăng +{conversion.vitaScore} VITA Score
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">
                          {conversion.points.toLocaleString()} GP
                        </p>
                        <button
                          onClick={() => handleExchange(type, conversion.points)}
                          disabled={!greenPoints || greenPoints.availablePoints < conversion.points}
                          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Đổi ngay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {Object.entries(GREEN_POINTS_TO_VITA.certification).map(([type, conversion]) => (
                  <div
                    key={type}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize mb-1">
                          Chứng nhận {type.toUpperCase()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Tăng +{conversion.vitaScore} VITA Score
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">
                          {conversion.points.toLocaleString()} GP
                        </p>
                        <button
                          onClick={() => handleExchange(type, conversion.points)}
                          disabled={!greenPoints || greenPoints.availablePoints < conversion.points}
                          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Đổi ngay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
