
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NegotiationItem {
  id: string;
  requestId: string;
  coopId: string;
  coopName: string;
  herb: string;
  quantity: number;
  matchScore: number;
  status: 'pending' | 'discussing' | 'waiting_approval' | 'approved' | 'rejected';
  lotCode: string;
  area: number;
  altitude: number;
  soilType: string;
  startDate: string;
  lastUpdate: string;
  messages: number;
  notes: string;
  proposedPrice?: number;
  deposit?: number;
  sop?: string;
}

export default function EnterpriseNegotiationPage() {
  const navigate = useNavigate();
  
  const [negotiations] = useState<NegotiationItem[]>([
    {
      id: 'NEG-001',
      requestId: 'REQ-2024-001',
      coopId: 'HTX-SH-001',
      coopName: 'HTX Sìn Hồ',
      herb: 'Sâm Ngọc Linh',
      quantity: 5000,
      matchScore: 98,
      status: 'discussing',
      lotCode: 'LOT-05',
      area: 20,
      altitude: 1700,
      soilType: 'Đất mùn trên núi đá',
      startDate: '2024-01-15',
      lastUpdate: '2024-01-20 14:30',
      messages: 12,
      notes: 'Đang thảo luận về quy trình GACP-WHO và mức giá bao tiêu',
      proposedPrice: 850000,
      deposit: 30,
      sop: 'GACP-WHO'
    },
    {
      id: 'NEG-002',
      requestId: 'REQ-2024-001',
      coopId: 'HTX-NL-002',
      coopName: 'HTX Ngọc Linh',
      herb: 'Sâm Ngọc Linh',
      quantity: 5000,
      matchScore: 95,
      status: 'waiting_approval',
      lotCode: 'LOT-08',
      area: 15,
      altitude: 1800,
      soilType: 'Đất mùn núi đá vôi',
      startDate: '2024-01-16',
      lastUpdate: '2024-01-21 09:15',
      messages: 8,
      notes: 'HTX đã gửi đề xuất hợp đồng, chờ doanh nghiệp phê duyệt',
      proposedPrice: 880000,
      deposit: 35,
      sop: 'GACP-WHO + Organic'
    },
    {
      id: 'NEG-003',
      requestId: 'REQ-2024-002',
      coopId: 'HTX-DL-003',
      coopName: 'HTX Đà Lạt',
      herb: 'Đương Quy',
      quantity: 3000,
      matchScore: 88,
      status: 'pending',
      lotCode: 'LOT-12',
      area: 10,
      altitude: 1500,
      soilType: 'Đất đỏ Bazan',
      startDate: '2024-01-18',
      lastUpdate: '2024-01-18 16:00',
      messages: 2,
      notes: 'Vừa gửi email liên hệ, chờ HTX phản hồi',
    },
    {
      id: 'NEG-004',
      requestId: 'REQ-2024-003',
      coopId: 'HTX-HL-004',
      coopName: 'HTX Hoàng Liên Sơn',
      herb: 'Ba Kích',
      quantity: 2000,
      matchScore: 92,
      status: 'approved',
      lotCode: 'LOT-15',
      area: 8,
      altitude: 1600,
      soilType: 'Đất mùn trên núi đá',
      startDate: '2024-01-10',
      lastUpdate: '2024-01-19 11:00',
      messages: 15,
      notes: 'Đã thống nhất tất cả điều khoản, sẵn sàng ký hợp đồng',
      proposedPrice: 650000,
      deposit: 25,
      sop: 'VietGAP'
    },
    {
      id: 'NEG-005',
      requestId: 'REQ-2024-002',
      coopId: 'HTX-KT-005',
      coopName: 'HTX Kon Tum',
      herb: 'Đương Quy',
      quantity: 3000,
      matchScore: 75,
      status: 'rejected',
      lotCode: 'LOT-18',
      area: 12,
      altitude: 1400,
      soilType: 'Đất đỏ',
      startDate: '2024-01-12',
      lastUpdate: '2024-01-17 10:30',
      messages: 5,
      notes: 'HTX không đủ năng lực đáp ứng tiêu chuẩn Organic',
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedNegotiation, setSelectedNegotiation] = useState<NegotiationItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { text: 'Chờ phản hồi', color: 'bg-gray-100 text-gray-700', icon: 'ri-time-line' },
      discussing: { text: 'Đang thảo luận', color: 'bg-blue-100 text-blue-700', icon: 'ri-chat-3-line' },
      waiting_approval: { text: 'Chờ phê duyệt', color: 'bg-yellow-100 text-yellow-700', icon: 'ri-file-list-3-line' },
      approved: { text: 'Đã chấp thuận', color: 'bg-green-100 text-green-700', icon: 'ri-checkbox-circle-line' },
      rejected: { text: 'Đã từ chối', color: 'bg-red-100 text-red-700', icon: 'ri-close-circle-line' }
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredNegotiations = filterStatus === 'all' 
    ? negotiations 
    : negotiations.filter(n => n.status === filterStatus);

  const handleViewDetail = (negotiation: NegotiationItem) => {
    setSelectedNegotiation(negotiation);
    setShowDetailModal(true);
  };

  const handleApprove = (negotiation: NegotiationItem) => {
    alert(`Đã phê duyệt đàm phán ${negotiation.id}. Chuyển sang tạo hợp đồng bao tiêu...`);
    // TODO: Navigate to contract creation
  };

  const handleReject = (negotiation: NegotiationItem) => {
    if (confirm(`Bạn có chắc muốn từ chối đàm phán với ${negotiation.coopName}?`)) {
      alert(`Đã từ chối đàm phán ${negotiation.id}`);
    }
  };

  const handleSendEmail = (negotiation: NegotiationItem) => {
    const subject = encodeURIComponent(`[VITA Platform] Tiếp tục đàm phán - ${negotiation.herb}`);
    const body = encodeURIComponent(`Kính gửi ${negotiation.coopName},

Chúng tôi muốn tiếp tục thảo luận về yêu cầu đặt trồng:

📋 THÔNG TIN YÊU CẦU:
- Mã đàm phán: ${negotiation.id}
- Loại dược liệu: ${negotiation.herb}
- Sản lượng: ${negotiation.quantity.toLocaleString()} kg
- Lô đất: ${negotiation.lotCode} (${negotiation.area} ha)
- Độ phù hợp: ${negotiation.matchScore}%

💰 ĐỀ XUẤT HIỆN TẠI:
${negotiation.proposedPrice ? `- Giá bao tiêu: ${negotiation.proposedPrice.toLocaleString()} đ/kg` : '- Chưa có đề xuất giá'}
${negotiation.deposit ? `- Tạm ứng: ${negotiation.deposit}%` : ''}
${negotiation.sop ? `- Tiêu chuẩn: ${negotiation.sop}` : ''}

📝 GHI CHÚ:
${negotiation.notes}

Vui lòng phản hồi để chúng tôi có thể tiến hành các bước tiếp theo.

Trân trọng,
[Tên công ty của bạn]
[Số điện thoại]
[Email]

---
Email này được gửi từ VITA Platform
Mã đàm phán: ${negotiation.id}
Thời gian: ${new Date().toLocaleString('vi-VN')}`);

    window.location.href = `mailto:${negotiation.coopId.toLowerCase()}@vita.vn?subject=${subject}&body=${body}`;
  };

  const stats = {
    total: negotiations.length,
    pending: negotiations.filter(n => n.status === 'pending').length,
    discussing: negotiations.filter(n => n.status === 'discussing').length,
    waiting: negotiations.filter(n => n.status === 'waiting_approval').length,
    approved: negotiations.filter(n => n.status === 'approved').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-6 shadow-lg">
        <button
          onClick={() => navigate('/partner')}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Quay lại Dashboard</span>
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <i className="ri-discuss-line text-3xl"></i>
          <h1 className="text-2xl font-bold">Quản lý Đàm phán</h1>
        </div>
        <p className="text-white/80 text-sm">
          Theo dõi tiến độ đàm phán với các HTX trước khi ký hợp đồng bao tiêu
        </p>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-700">{stats.total}</div>
            <div className="text-xs text-slate-500 mt-1">Tổng đàm phán</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-700">{stats.pending}</div>
            <div className="text-xs text-gray-500 mt-1">Chờ phản hồi</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{stats.discussing}</div>
            <div className="text-xs text-blue-500 mt-1">Đang thảo luận</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">{stats.waiting}</div>
            <div className="text-xs text-yellow-500 mt-1">Chờ phê duyệt</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
            <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
            <div className="text-xs text-green-500 mt-1">Đã chấp thuận</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { value: 'all', label: 'Tất cả', icon: 'ri-list-check' },
              { value: 'pending', label: 'Chờ phản hồi', icon: 'ri-time-line' },
              { value: 'discussing', label: 'Đang thảo luận', icon: 'ri-chat-3-line' },
              { value: 'waiting_approval', label: 'Chờ phê duyệt', icon: 'ri-file-list-3-line' },
              { value: 'approved', label: 'Đã chấp thuận', icon: 'ri-checkbox-circle-line' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilterStatus(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === tab.value
                    ? 'bg-slate-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Negotiations List */}
        <div className="space-y-3">
          {filteredNegotiations.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-200">
              <i className="ri-inbox-line text-5xl text-slate-300 mb-3"></i>
              <p className="text-slate-500">Không có đàm phán nào</p>
            </div>
          ) : (
            filteredNegotiations.map(negotiation => {
              const badge = getStatusBadge(negotiation.status);
              return (
                <div
                  key={negotiation.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b border-slate-200">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-700">{negotiation.coopName}</span>
                          <span className={`text-xs font-bold ${getMatchScoreColor(negotiation.matchScore)}`}>
                            {negotiation.matchScore}% phù hợp
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          {negotiation.herb} • {negotiation.quantity.toLocaleString()} kg
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${badge.color}`}>
                        <i className={badge.icon}></i>
                        {badge.text}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-file-list-line"></i>
                        {negotiation.id}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {negotiation.lotCode}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-message-3-line"></i>
                        {negotiation.messages} tin nhắn
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Land Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-slate-500 mb-1">Diện tích</div>
                        <div className="font-semibold text-slate-700">{negotiation.area} ha</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <div className="text-xs text-slate-500 mb-1">Độ cao</div>
                        <div className="font-semibold text-slate-700">{negotiation.altitude}m</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2 col-span-2">
                        <div className="text-xs text-slate-500 mb-1">Loại đất</div>
                        <div className="font-semibold text-slate-700 text-sm">{negotiation.soilType}</div>
                      </div>
                    </div>

                    {/* Proposal Info */}
                    {negotiation.proposedPrice && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <div className="text-xs text-blue-600 font-medium mb-2">💰 Đề xuất hiện tại:</div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-blue-600">Giá:</span>
                            <span className="font-bold text-blue-700 ml-1">
                              {negotiation.proposedPrice.toLocaleString()} đ/kg
                            </span>
                          </div>
                          {negotiation.deposit && (
                            <div>
                              <span className="text-blue-600">Tạm ứng:</span>
                              <span className="font-bold text-blue-700 ml-1">{negotiation.deposit}%</span>
                            </div>
                          )}
                          {negotiation.sop && (
                            <div>
                              <span className="text-blue-600">Tiêu chuẩn:</span>
                              <span className="font-bold text-blue-700 ml-1">{negotiation.sop}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <div className="text-xs text-slate-500 mb-1">📝 Ghi chú:</div>
                      <div className="text-sm text-slate-700">{negotiation.notes}</div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span>Bắt đầu: {new Date(negotiation.startDate).toLocaleDateString('vi-VN')}</span>
                      <span>Cập nhật: {negotiation.lastUpdate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewDetail(negotiation)}
                        className="flex-1 min-w-[120px] bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <i className="ri-eye-line"></i>
                        Xem chi tiết
                      </button>
                      
                      <button
                        onClick={() => handleSendEmail(negotiation)}
                        className="flex-1 min-w-[120px] bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <i className="ri-mail-send-line"></i>
                        Gửi Email
                      </button>

                      {negotiation.status === 'waiting_approval' && (
                        <>
                          <button
                            onClick={() => handleApprove(negotiation)}
                            className="flex-1 min-w-[120px] bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <i className="ri-checkbox-circle-line"></i>
                            Phê duyệt
                          </button>
                          <button
                            onClick={() => handleReject(negotiation)}
                            className="flex-1 min-w-[120px] bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <i className="ri-close-circle-line"></i>
                            Từ chối
                          </button>
                        </>
                      )}

                      {negotiation.status === 'approved' && (
                        <button
                          onClick={() => alert('Chuyển sang tạo hợp đồng bao tiêu...')}
                          className="flex-1 min-w-[120px] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
                        >
                          <i className="ri-file-text-line"></i>
                          Tạo Hợp đồng Bao tiêu
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedNegotiation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold mb-1">{selectedNegotiation.coopName}</h3>
                  <p className="text-white/80 text-sm">{selectedNegotiation.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedNegotiation.status).color}`}>
                  {getStatusBadge(selectedNegotiation.status).text}
                </span>
                <span className={`text-sm font-bold ${getMatchScoreColor(selectedNegotiation.matchScore)}`}>
                  {selectedNegotiation.matchScore}% phù hợp
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Request Info */}
              <div>
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <i className="ri-file-list-line text-slate-600"></i>
                  Thông tin yêu cầu
                </h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loại dược liệu:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.herb}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sản lượng:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.quantity.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mã yêu cầu:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.requestId}</span>
                  </div>
                </div>
              </div>

              {/* Land Info */}
              <div>
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <i className="ri-map-pin-line text-slate-600"></i>
                  Thông tin lô đất
                </h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mã lô:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.lotCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Diện tích:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.area} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Độ cao:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.altitude}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loại đất:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.soilType}</span>
                  </div>
                </div>
              </div>

              {/* Proposal */}
              {selectedNegotiation.proposedPrice && (
                <div>
                  <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <i className="ri-money-dollar-circle-line text-slate-600"></i>
                    Đề xuất hợp đồng
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Giá bao tiêu:</span>
                      <span className="font-bold text-blue-700">{selectedNegotiation.proposedPrice.toLocaleString()} đ/kg</span>
                    </div>
                    {selectedNegotiation.deposit && (
                      <div className="flex justify-between">
                        <span className="text-blue-600">Tạm ứng:</span>
                        <span className="font-bold text-blue-700">{selectedNegotiation.deposit}%</span>
                      </div>
                    )}
                    {selectedNegotiation.sop && (
                      <div className="flex justify-between">
                        <span className="text-blue-600">Tiêu chuẩn:</span>
                        <span className="font-bold text-blue-700">{selectedNegotiation.sop}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <i className="ri-file-text-line text-slate-600"></i>
                  Ghi chú
                </h4>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
                  {selectedNegotiation.notes}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <i className="ri-time-line text-slate-600"></i>
                  Thời gian
                </h4>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bắt đầu:</span>
                    <span className="font-semibold text-slate-700">
                      {new Date(selectedNegotiation.startDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cập nhật gần nhất:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Số tin nhắn:</span>
                    <span className="font-semibold text-slate-700">{selectedNegotiation.messages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
