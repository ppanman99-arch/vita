import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '../../application/CapitalService';
import type { InvestmentOpportunity } from '../../domain/capital';
import InvestmentCard from '../components/InvestmentCard';

export default function InvestmentOpportunitiesPage() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    capitalService.getInvestmentOpportunities().then((list) => {
      setOpportunities(list);
      setLoading(false);
    });
  }, []);

  const handleInvest = (id: string) => {
    const opp = opportunities.find((o) => o.id === id);
    if (!opp) return;
    const amountStr = prompt(`Số tiền góp vốn (tối thiểu ${opp.minInvest.toLocaleString('vi-VN')} VNĐ):`);
    if (!amountStr) return;
    const amount = parseInt(amountStr.replace(/\D/g, ''), 10);
    if (isNaN(amount) || amount < opp.minInvest) {
      alert(`Vui lòng nhập tối thiểu ${opp.minInvest.toLocaleString('vi-VN')} VNĐ.`);
      return;
    }
    capitalService
      .invest(id, amount)
      .then(() => {
        alert('Đăng ký góp vốn thành công. (Demo: chưa kết nối thanh toán.)');
        navigate('/member-hub/capital/portfolio');
      })
      .catch((e: Error) => alert(e.message || 'Có lỗi xảy ra.'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Cơ hội đầu tư</h1>
              <p className="text-sm text-gray-500">Các dự án HTX đang kêu gọi vốn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <InvestmentCard key={opp.id} opportunity={opp} onInvest={handleInvest} />
          ))}
        </div>
        {opportunities.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-funds-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Hiện không có cơ hội đầu tư.</p>
          </div>
        )}
      </div>
    </div>
  );
}
