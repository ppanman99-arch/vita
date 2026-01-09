import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../admin-dashboard/components/TopBar';
import AdminBottomNav from '../../components/feature/AdminBottomNav';

interface Opportunity {
  id: string;
  requestId: string;
  companyName: string;
  companyLogo: string;
  herb?: string; // Optional for ESG RFP
  quantity?: number; // Optional for ESG RFP
  unit?: string; // Optional for ESG RFP
  deliveryDate?: string; // Optional for ESG RFP
  matchScore: number;
  matchedLot?: {
    lotId: string;
    area: number;
    altitude: number;
    soilType: string;
    pH: number;
    climate: string;
    humidity: number;
    gps: string;
  };
  requirements?: {
    saponin?: number;
    mr2?: number;
    flavonoid?: number;
    standards: string[];
    cultivationMethod?: 'vita-forestry' | 'basic';
    shadeCoverage?: number;
  };
  pricing?: {
    estimatedPrice: string;
    deposit: string;
    pricePerKg?: number;
  };
  // ESG RFP specific fields
  type: 'b2b' | 'esg-rfp'; // NEW: Distinguish between B2B and ESG RFP
  esgRfp?: {
    carbonTarget: number; // tons CO2
    socialTarget: number; // number of people
    socialTargetType: 'women_minority' | 'general' | 'youth';
    budget: number; // billion VNĐ
    location: string[];
    timelineStart: string;
    timelineEnd: string;
    treeType: string;
    area: number; // ha
    totalTrees: number;
    estimatedCost: number; // million VNĐ
    carbonPotential: number; // tons
    matchedLots: string[]; // Lot IDs that match
  };
  status: 'new' | 'viewed' | 'accepted' | 'rejected';
  receivedDate: string;
  deadline: string;
}

export default function AdminOpportunitiesPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'new' | 'viewed' | 'accepted' | 'rejected'>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [selectedOppForNegotiate, setSelectedOppForNegotiate] = useState<Opportunity | null>(null);
  const [negotiateForm, setNegotiateForm] = useState({
    proposedPrice: '',
    depositPercent: '',
    deliveryDate: '',
    standards: [] as string[],
    notes: '',
    lotId: '',
    lotArea: '',
    lotAltitude: '',
    lotSoilType: '',
    lotPh: '',
    lotClimate: '',
    lotHumidity: '',
    lotGps: ''
  });

  // Mock data
  const opportunities: Opportunity[] = [
    {
      id: 'ESG-RFP-001',
      requestId: 'ESG-RFP-2024-001',
      type: 'esg-rfp',
      companyName: 'Tập đoàn VinaTech',
      companyLogo: 'https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20with%20green%20leaf%20ESG%20sustainability%20symbol%20clean%20professional%20design%20white%20background&width=80&height=80&seq=tech001&orientation=squarish',
      matchScore: 88,
      esgRfp: {
        carbonTarget: 50000,
        socialTarget: 100,
        socialTargetType: 'women_minority',
        budget: 5,
        location: ['Tây Nguyên', 'Kon Tum'],
        timelineStart: '2025',
        timelineEnd: '2030',
        treeType: 'Mega 3P',
        area: 100,
        totalTrees: 60000,
        estimatedCost: 5000,
        carbonPotential: 5000,
        matchedLots: ['lot-5', 'lot-6'],
      },
      status: 'new',
      receivedDate: '2024-01-20',
      deadline: '2024-02-20',
    },
    {
      id: 'OPP-001',
      requestId: 'REQ-2024-001',
      type: 'b2b',
      companyName: 'Công ty Dược phẩm Tâm Bình',
      companyLogo: 'https://readdy.ai/api/search-image?query=modern%20pharmaceutical%20company%20logo%20with%20green%20leaf%20symbol%20clean%20professional%20design%20white%20background%20minimalist%20style&width=80&height=80&seq=pharma001&orientation=squarish',
      herb: 'Sâm Ngọc Linh',
      quantity: 5000,
      unit: 'kg',
      deliveryDate: 'Q4/2026',
      matchScore: 98,
      matchedLot: {
        lotId: 'LOT-05',
        area: 20,
        altitude: 1700,
        soilType: 'Đất mùn trên núi đá',
        pH: 5.5,
        climate: 'Ôn đới núi cao',
        humidity: 80,
        gps: '15.2847°N, 107.8341°E'
      },
      requirements: {
        saponin: 10,
        mr2: 4,
        flavonoid: 3,
        standards: ['GACP-WHO', 'Organic', 'VITA Forestry'],
        cultivationMethod: 'vita-forestry', // NEW
        shadeCoverage: 75, // NEW
      },
      pricing: {
        estimatedPrice: '35,000,000 đ/kg',
        deposit: '30% khi ký hợp đồng',
        pricePerKg: 35000000, // NEW
      },
      status: 'new',
      receivedDate: '2024-01-15',
      deadline: '2024-01-25'
    },
    {
      id: 'OPP-002',
      requestId: 'REQ-2024-002',
      companyName: 'Tập đoàn Dược Hậu Giang',
      companyLogo: 'https://readdy.ai/api/search-image?query=pharmaceutical%20corporation%20logo%20with%20blue%20cross%20medical%20symbol%20professional%20corporate%20design%20white%20background%20modern%20style&width=80&height=80&seq=pharma002&orientation=squarish',
      herb: 'Đương Quy',
      quantity: 3000,
      unit: 'kg',
      deliveryDate: 'Q2/2026',
      matchScore: 95,
      matchedLot: {
        lotId: 'LOT-08',
        area: 15,
        altitude: 1500,
        soilType: 'Đất đỏ Bazan',
        pH: 5.8,
        climate: 'Cận nhiệt đới núi',
        humidity: 75,
        gps: '15.3124°N, 107.9012°E'
      },
      requirements: {
        standards: ['GACP-WHO', 'VietGAP']
      },
      pricing: {
        estimatedPrice: '650,000 - 850,000 đ/kg',
        deposit: '25% khi ký hợp đồng'
      },
      status: 'viewed',
      receivedDate: '2024-01-14',
      deadline: '2024-01-24'
    },
    {
      id: 'OPP-003',
      requestId: 'REQ-2024-003',
      companyName: 'Công ty TNHH Dược Việt',
      companyLogo: 'https://readdy.ai/api/search-image?query=vietnamese%20pharmaceutical%20company%20logo%20with%20traditional%20medicine%20symbol%20green%20and%20gold%20colors%20professional%20design%20white%20background&width=80&height=80&seq=pharma003&orientation=squarish',
      herb: 'Cà Gai Leo',
      quantity: 2000,
      unit: 'kg',
      deliveryDate: 'Q3/2026',
      matchScore: 88,
      matchedLot: {
        lotId: 'LOT-12',
        area: 10,
        altitude: 800,
        soilType: 'Đất xám',
        pH: 6.0,
        climate: 'Nhiệt đới gió mùa',
        humidity: 70,
        gps: '15.1892°N, 107.7654°E'
      },
      requirements: {
        standards: ['VietGAP']
      },
      pricing: {
        estimatedPrice: '450,000 - 600,000 đ/kg',
        deposit: '20% khi ký hợp đồng'
      },
      status: 'accepted',
      receivedDate: '2024-01-10',
      deadline: '2024-01-20'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedTab === 'all') return true;
    return opp.status === selectedTab;
  });

  const stats = {
    total: opportunities.length,
    new: opportunities.filter(o => o.status === 'new').length,
    viewed: opportunities.filter(o => o.status === 'viewed').length,
    accepted: opportunities.filter(o => o.status === 'accepted').length,
    rejected: opportunities.filter(o => o.status === 'rejected').length
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { text: 'Mới', color: 'bg-blue-100 text-blue-700' },
      viewed: { text: 'Đã xem', color: 'bg-gray-100 text-gray-700' },
      accepted: { text: 'Đã chấp nhận', color: 'bg-green-100 text-green-700' },
      rejected: { text: 'Đã từ chối', color: 'bg-red-100 text-red-700' }
    };
    return badges[status as keyof typeof badges];
  };

  const handleAccept = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    if (opp.type === 'esg-rfp') {
      setConfirmMessage(`Chúng tôi xác nhận đồng ý tạo dự án trồng rừng theo yêu cầu ESG của ${opp.companyName}. Dự án sẽ được tạo với diện tích ${opp.esgRfp?.area}ha, trồng ${opp.esgRfp?.treeType}.`);
    } else {
      setConfirmMessage(`Chúng tôi xác nhận Lô đất ${opp.matchedLot?.lotId} (${opp.matchedLot?.area}ha) đủ điều kiện thổ nhưỡng và cam kết tuân thủ quy trình canh tác ${opp.requirements?.standards.join(', ')} của ${opp.companyName}.`);
    }
    setShowConfirmModal(true);
  };

  const handleViewDetail = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setShowDetailModal(true);
  };

  const handleReject = (opp: Opportunity) => {
    if (confirm(`Bạn có chắc muốn từ chối cơ hội này từ ${opp.companyName}?`)) {
      alert('Đã từ chối cơ hội');
    }
  };

  const handleSendEmail = (opp: Opportunity) => {
    const subject = encodeURIComponent(`[VITA Platform] Phản hồi yêu cầu trồng ${opp.herb} - ${opp.requestId}`);
    const body = encodeURIComponent(`Kính gửi ${opp.companyName},

HTX Sìn Hồ xin gửi lời chào trân trọng!

Chúng tôi đã nhận được yêu cầu đặt trồng ${opp.herb} từ quý công ty thông qua VITA Platform.

📋 THÔNG TIN YÊU CẦU:
- Mã yêu cầu: ${opp.requestId}
- Loại dược liệu: ${opp.herb}
- Sản lượng: ${opp.quantity.toLocaleString()} ${opp.unit}
- Thời điểm giao hàng: ${opp.deliveryDate}
- Tiêu chuẩn: ${opp.requirements.standards.join(', ')}

🌱 LÔ ĐẤT PHỐI HỢP:
- Mã lô: ${opp.matchedLot.lotId}
- Diện tích: ${opp.matchedLot.area} ha
- Độ cao: ${opp.matchedLot.altitude}m
- Loại đất: ${opp.matchedLot.soilType}
- pH: ${opp.matchedLot.pH}
- Độ phù hợp: ${opp.matchScore}%

✅ XÁC NHẬN NĂNG LỰC:
Chúng tôi xác nhận lô đất ${opp.matchedLot.lotId} đủ điều kiện thổ nhưỡng và HTX có đủ năng lực để thực hiện dự án này.

💬 ĐỀ XUẤT THẢO LUẬN:
Chúng tôi mong muốn được trao đổi chi tiết về:
1. Quy trình kỹ thuật canh tác (SOP)
2. Giá bao tiêu và phương thức thanh toán
3. Mức tạm ứng và tiến độ giải ngân
4. Lịch trình triển khai dự án

📞 THÔNG TIN LIÊN HỆ:
- Người liên hệ: [Tên chủ nhiệm HTX]
- Điện thoại: [Số điện thoại]
- Email: htx.sinho@vita.vn

Trân trọng,
HTX Sìn Hồ

---
Email này được gửi từ VITA Platform
Mã cơ hội: ${opp.id}
Thời gian: ${new Date().toLocaleString('vi-VN')}`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNegotiate = (opp: Opportunity) => {
    setSelectedOppForNegotiate(opp);
    // Pre-fill form với thông tin hiện tại
    setNegotiateForm({
      proposedPrice: '850000', // Giá đề xuất của HTX
      depositPercent: '30',
      deliveryDate: opp.deliveryDate,
      standards: opp.requirements.standards,
      notes: '',
      lotId: opp.matchedLot.lotId,
      lotArea: opp.matchedLot.area.toString(),
      lotAltitude: opp.matchedLot.altitude.toString(),
      lotSoilType: opp.matchedLot.soilType,
      lotPh: opp.matchedLot.pH.toString(),
      lotClimate: opp.matchedLot.climate,
      lotHumidity: opp.matchedLot.humidity.toString(),
      lotGps: opp.matchedLot.gps
    });
    setShowNegotiateModal(true);
  };

  const handleStandardToggle = (standard: string) => {
    setNegotiateForm(prev => ({
      ...prev,
      standards: prev.standards.includes(standard)
        ? prev.standards.filter(s => s !== standard)
        : [...prev.standards, standard]
    }));
  };

  const handleSubmitNegotiation = () => {
    if (!selectedOppForNegotiate) return;

    // Validate
    if (!negotiateForm.proposedPrice || !negotiateForm.depositPercent || !negotiateForm.notes) {
      alert('Vui lòng điền đầy đủ thông tin đàm phán!');
      return;
    }

    const price = parseFloat(negotiateForm.proposedPrice);
    if (isNaN(price) || price <= 0) {
      alert('Giá đề xuất không hợp lệ!');
      return;
    }

    const deposit = parseFloat(negotiateForm.depositPercent);
    if (isNaN(deposit) || deposit < 0 || deposit > 100) {
      alert('Tỷ lệ tạm ứng phải từ 0-100%!');
      return;
    }

    // Tạo nội dung email đàm phán
    const subject = encodeURIComponent(
      `[VITA Platform] Đề xuất Đàm phán - ${selectedOppForNegotiate.herb} - ${selectedOppForNegotiate.requestId}`
    );

    const body = encodeURIComponent(
`Kính gửi ${selectedOppForNegotiate.companyName},

Cảm ơn quý công ty đã gửi yêu cầu đặt trồng ${selectedOppForNegotiate.herb} trên VITA Platform.

Sau khi xem xét kỹ lưỡng, HTX Sìn Hồ xin gửi đến quý công ty ĐỀ XUẤT ĐÀM PHÁN như sau:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 THÔNG TIN YÊU CẦU GỐC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Mã yêu cầu: ${selectedOppForNegotiate.requestId}
• Loại dược liệu: ${selectedOppForNegotiate.herb}
• Sản lượng: ${selectedOppForNegotiate.quantity.toLocaleString('vi-VN')} kg
• Thời điểm giao hàng: ${selectedOppForNegotiate.deliveryDate}
• Giá dự kiến của DN: ${selectedOppForNegotiate.pricing.estimatedPrice}
• Tạm ứng dự kiến của DN: ${selectedOppForNegotiate.pricing.deposit}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 ĐỀ XUẤT CỦA HTX SÌN HỒ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. GIÁ BAO TIÊU ĐỀ XUẤT:
   ${parseFloat(negotiateForm.proposedPrice).toLocaleString('vi-VN')} đ/kg

2. TẠM ỨNG ĐỀ XUẤT:
   ${negotiateForm.depositPercent}% khi ký hợp đồng

3. THỜI GIAN GIAO HÀNG:
   ${negotiateForm.deliveryDate}

4. TIÊU CHUẨN CAM KẾT:
   ${negotiateForm.standards.join(', ')}

5. LÔ ĐẤT THỰC HIỆN:
   • Mã lô: ${negotiateForm.lotId}
   • Diện tích: ${negotiateForm.lotArea} ha
   • Độ cao: ${negotiateForm.lotAltitude}m
   • Loại đất: ${negotiateForm.lotSoilType}
   • pH: ${negotiateForm.lotPh}
   • Khí hậu: ${negotiateForm.lotClimate}
   • Độ ẩm: ${negotiateForm.lotHumidity}%
   • GPS: ${negotiateForm.lotGps}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 GHI CHÚ & LÝ DO ĐỀ XUẤT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${negotiateForm.notes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤝 ĐỀ XUẤT THẢO LUẬN TIẾP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chúng tôi mong muốn được trao đổi thêm về:

1. Quy trình kỹ thuật canh tác chi tiết (SOP)
2. Phương thức thanh toán và lịch giải ngân
3. Cơ chế bảo hiểm rủi ro thiên tai
4. Hỗ trợ kỹ thuật từ phía doanh nghiệp
5. Lịch trình triển khai dự án

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 THÔNG TIN LIÊN HỆ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTX Sìn Hồ
Điện thoại: 0987.654.321
Email: htx.sinho@vita.vn
Địa chỉ: Xã Sìn Hồ, Huyện Sìn Hồ, Lai Châu

Trân trọng,
HTX Sìn Hồ

---
Email này được gửi từ VITA Platform
Mã đàm phán: NEG-${Date.now()}
Thời gian: ${new Date().toLocaleString('vi-VN')}`);

    // Tạo email address từ tên công ty
    const emailAddress = selectedOppForNegotiate.companyName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, '') // Bỏ ký tự đặc biệt
      .replace(/\s+/g, '.') // Thay khoảng trắng bằng dấu chấm
      + '@company.vn';

    // Mở email client
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    // Đóng modal
    setShowNegotiateModal(false);
    setSelectedOppForNegotiate(null);

    // Thông báo thành công
    alert('✅ Đã gửi đề xuất đàm phán! Email đã được mở, vui lòng kiểm tra và gửi.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <TopBar title="Cơ hội Bao tiêu" />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cơ hội Bao tiêu</h1>
            <p className="text-sm text-gray-600 mt-1">Các yêu cầu đặt trồng phù hợp từ doanh nghiệp</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <i className="ri-notification-3-line text-orange-500 text-xl"></i>
            <span className="text-sm font-semibold text-gray-700">{stats.new} cơ hội mới</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-xs text-gray-600 mt-1">Tổng cơ hội</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-xs text-blue-700 mt-1">Mới</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{stats.viewed}</div>
            <div className="text-xs text-gray-700 mt-1">Đã xem</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-xs text-green-700 mt-1">Đã chấp nhận</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-xs text-red-700 mt-1">Đã từ chối</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'Tất cả', count: stats.total },
            { key: 'new', label: 'Mới', count: stats.new },
            { key: 'viewed', label: 'Đã xem', count: stats.viewed },
            { key: 'accepted', label: 'Đã chấp nhận', count: stats.accepted },
            { key: 'rejected', label: 'Đã từ chối', count: stats.rejected }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedTab === tab.key
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => (
            <div key={opp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img src={opp.companyLogo} alt={opp.companyName} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-800">{opp.companyName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(opp.status).color}`}>
                          {getStatusBadge(opp.status).text}
                        </span>
                        {opp.type === 'esg-rfp' && (
                          <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                            <i className="ri-target-line"></i>
                            🔔 CƠ HỘI TÀI TRỢ ESG
                          </span>
                        )}
                        {opp.type === 'b2b' && opp.requirements?.cultivationMethod === 'vita-forestry' && (
                          <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                            <i className="ri-tree-line"></i>
                            VITA LÂM SINH - Giá Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-file-list-3-line"></i>
                          {opp.requestId}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          Nhận: {new Date(opp.receivedDate).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1 text-orange-600 font-medium">
                          <i className="ri-time-line"></i>
                          Hạn: {new Date(opp.deadline).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(opp.matchScore)}`}>
                    {opp.matchScore}% phù hợp
                  </div>
                </div>

                {/* Content */}
                {opp.type === 'esg-rfp' ? (
                  /* ESG RFP Content */
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i className="ri-mail-send-line text-green-600"></i>
                        Thư Mời Hợp Tác (Request for Proposal)
                      </h4>
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>{opp.companyName}</strong> muốn tài trợ trồng rừng trên đất của bạn để đạt mục tiêu ESG.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Mục tiêu Carbon</p>
                          <p className="font-bold text-emerald-600">{opp.esgRfp?.carbonTarget.toLocaleString()} tấn CO₂</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mục tiêu Xã hội</p>
                          <p className="font-bold text-blue-600">
                            {opp.esgRfp?.socialTarget} người
                            {opp.esgRfp?.socialTargetType === 'women_minority' && ' (Phụ nữ DTTS)'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ngân sách</p>
                          <p className="font-bold text-yellow-600">{opp.esgRfp?.budget} tỷ VNĐ/năm</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Diện tích cần</p>
                          <p className="font-bold">{opp.esgRfp?.area} ha</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Loại cây</p>
                          <p className="font-bold">{opp.esgRfp?.treeType}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Khu vực</p>
                          <p className="font-bold">{opp.esgRfp?.location.join(', ')}</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-gray-900 mb-2">Dự án ước tính (nếu bạn đồng ý):</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Số cây</p>
                            <p className="font-bold">{opp.esgRfp?.totalTrees.toLocaleString()} cây</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Chi phí</p>
                            <p className="font-bold text-emerald-600">{opp.esgRfp?.estimatedCost} triệu</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Carbon tiềm năng</p>
                            <p className="font-bold">{opp.esgRfp?.carbonPotential.toLocaleString()} tấn</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Thời gian</p>
                            <p className="font-bold">{opp.esgRfp?.timelineStart} - {opp.esgRfp?.timelineEnd}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">
                          <i className="ri-information-line text-blue-600 mr-2"></i>
                          <strong>Tình trạng đất của bạn:</strong> Hệ thống phân tích {opp.esgRfp?.matchedLots.join(', ')} hoàn toàn phù hợp.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* B2B Content */
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Request Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-plant-line text-green-600"></i>
                        <span className="font-semibold">{opp.herb}</span>
                        <span className="text-gray-500">•</span>
                        <span>{opp.quantity?.toLocaleString()} {opp.unit}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-truck-line text-blue-600"></i>
                        <span>Giao hàng: {opp.deliveryDate}</span>
                      </div>
                      {opp.requirements?.saponin && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <i className="ri-flask-line text-purple-600"></i>
                          <span className="text-sm">
                            Saponin ≥{opp.requirements.saponin}%
                            {opp.requirements.mr2 && `, MR2 ≥${opp.requirements.mr2}%`}
                            {opp.requirements.flavonoid && `, Flavonoid ≥${opp.requirements.flavonoid}%`}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-shield-check-line text-green-600"></i>
                        <div className="flex flex-wrap gap-1">
                          {opp.requirements?.standards.map(std => (
                            <span key={std} className={`px-2 py-1 text-xs rounded-full ${
                              std === 'VITA Forestry' 
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold'
                                : 'bg-green-50 text-green-700'
                            }`}>
                              {std}
                            </span>
                          ))}
                        </div>
                      </div>
                      {opp.requirements?.shadeCoverage && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <i className="ri-sun-cloudy-line text-emerald-600"></i>
                          <span className="text-sm">
                            <strong>Yêu cầu độ che phủ:</strong>{' '}
                            <span className="font-bold text-emerald-600">{opp.requirements.shadeCoverage}%</span>
                            {' '}(Tán rừng tự nhiên)
                          </span>
                        </div>
                      )}
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        opp.requirements?.cultivationMethod === 'vita-forestry'
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300'
                          : 'text-gray-700'
                      }`}>
                        <i className={`ri-money-dollar-circle-line ${
                          opp.requirements?.cultivationMethod === 'vita-forestry' ? 'text-emerald-600' : 'text-yellow-600'
                        }`}></i>
                        <div>
                          <span className={`text-sm font-semibold ${
                            opp.requirements?.cultivationMethod === 'vita-forestry' ? 'text-emerald-700 text-lg' : ''
                          }`}>
                            {opp.pricing.estimatedPrice}
                          </span>
                          {opp.requirements?.cultivationMethod === 'vita-forestry' && (
                            <p className="text-xs text-emerald-600 mt-1">
                              <i className="ri-information-line mr-1"></i>
                              Giá cao hơn 40% so với thị trường - Yêu cầu tán rừng thật
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-wallet-3-line text-orange-600"></i>
                        <span className="text-sm">{opp.pricing.deposit}</span>
                      </div>
                    </div>

                    {/* Right: Matched Lot */}
                    <div className={`p-4 rounded-lg ${
                    opp.requirements?.cultivationMethod === 'vita-forestry'
                      ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300'
                      : 'bg-gradient-to-br from-green-50 to-emerald-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-map-pin-line text-green-600"></i>
                      <span className="font-semibold text-gray-800">Lô đất phù hợp: {opp.matchedLot.lotId}</span>
                    </div>
                    {opp.requirements?.cultivationMethod === 'vita-forestry' && (
                      <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                        <p className="text-sm text-yellow-800 font-semibold mb-1 flex items-center gap-2">
                          <i className="ri-alert-line"></i>
                          Yêu cầu bắt buộc: Tán rừng che phủ {opp.requirements.shadeCoverage}%
                        </p>
                        <p className="text-xs text-yellow-700">
                          {opp.matchedLot.lotId === 'LOT-05' ? (
                            <>✅ Lô này đã có tán rừng đủ che phủ. Sẵn sàng đón đơn hàng!</>
                          ) : (
                            <>⚠️ Nếu lô đất chưa có tán rừng: Cần trồng cây che bóng (Mega 3P, Keo lai...) NGAY BÂY GIỜ để 1-2 năm nữa có bóng mát.</>
                          )}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-landscape-line text-green-600 w-4 h-4 flex items-center justify-center"></i>
                        <span>{opp.matchedLot.area} ha</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-mountain-line text-blue-600 w-4 h-4 flex items-center justify-center"></i>
                        <span>{opp.matchedLot.altitude}m</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-seedling-line text-amber-600 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-xs">{opp.matchedLot.soilType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-test-tube-line text-purple-600 w-4 h-4 flex items-center justify-center"></i>
                        <span>pH {opp.matchedLot.pH}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-temp-hot-line text-red-600 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-xs">{opp.matchedLot.climate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-water-percent-line text-cyan-600 w-4 h-4 flex items-center justify-center"></i>
                        <span>{opp.matchedLot.humidity}%</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <i className="ri-map-pin-2-line"></i>
                        <span>{opp.matchedLot.gps}</span>
                      </div>
                    </div>
                  </div>
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewDetail(opp)}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <i className="ri-eye-line text-lg"></i>
                    <span className="font-medium">Xem chi tiết</span>
                  </button>

                  <button
                    onClick={() => handleNegotiate(opp)}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                  >
                    <i className="ri-discuss-line text-lg"></i>
                    <span className="font-medium">Đàm phán</span>
                  </button>

                  <button
                    onClick={() => handleSendEmail(opp)}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <i className="ri-mail-send-line text-lg"></i>
                    <span className="font-medium">Gửi Email</span>
                  </button>

                  {opp.type === 'esg-rfp' && opp.status === 'new' ? (
                    /* ESG RFP Actions */
                    <>
                      <button
                        onClick={() => {
                          // Navigate to create project page with pre-filled data
                          navigate(`/admin-forest-funding?tab=funding&esgRfp=${opp.id}`);
                        }}
                        className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md font-semibold text-lg"
                      >
                        <i className="ri-add-circle-line text-xl"></i>
                        <span>CÓ, TẠO DỰ ÁN NGAY</span>
                      </button>
                      <button
                        onClick={() => handleReject(opp)}
                        className="flex-1 min-w-[140px] px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <i className="ri-close-line text-lg"></i>
                        <span className="font-medium">Từ chối</span>
                      </button>
                    </>
                  ) : opp.status === 'new' && (
                    /* B2B Actions */
                    <>
                      <button
                        onClick={() => handleAccept(opp)}
                        className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:from-emerald-600 hover:to-green-600 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                      >
                        <i className="ri-check-line text-lg"></i>
                        <span className="font-medium">Xác nhận tham gia</span>
                      </button>
                      <button
                        onClick={() => handleReject(opp)}
                        className="flex-1 min-w-[140px] px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-98 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <i className="ri-close-line text-lg"></i>
                        <span className="font-medium">Từ chối</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">Chưa có cơ hội nào trong danh mục này</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết cơ hội</h2>
              <button onClick={() => setShowDetailModal(false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all">
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <img src={selectedOpportunity.companyLogo} alt={selectedOpportunity.companyName} className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{selectedOpportunity.companyName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{selectedOpportunity.requestId}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getMatchScoreColor(selectedOpportunity.matchScore)}`}>
                      {selectedOpportunity.matchScore}% phù hợp
                    </span>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-file-list-3-line text-green-600"></i>
                  Thông tin yêu cầu
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại dược liệu:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.herb}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sản lượng:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.quantity.toLocaleString()} {selectedOpportunity.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời điểm giao hàng:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.deliveryDate}</span>
                  </div>
                  {selectedOpportunity.requirements.saponin && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mục tiêu hoạt chất:</span>
                      <span className="font-semibold text-gray-800">
                        Saponin ≥{selectedOpportunity.requirements.saponin}%
                        {selectedOpportunity.requirements.mr2 && `, MR2 ≥${selectedOpportunity.requirements.mr2}%`}
                        {selectedOpportunity.requirements.flavonoid && `, Flavonoid ≥${selectedOpportunity.requirements.flavonoid}%`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tiêu chuẩn:</span>
                    <div className="flex gap-1">
                      {selectedOpportunity.requirements.standards.map(std => (
                        <span key={std} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lot Details */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-map-pin-line text-green-600"></i>
                  Thông tin lô đất phù hợp
                </h4>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã lô:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.lotId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.area} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Độ cao:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.altitude}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại đất:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">pH đất:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.pH}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khí hậu:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.climate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Độ ẩm:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tọa độ GPS:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.matchedLot.gps}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-money-dollar-circle-line text-yellow-600"></i>
                  Thông tin giá
                </h4>
                <div className="bg-yellow-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá dự kiến:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.pricing.estimatedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm ứng:</span>
                    <span className="font-semibold text-gray-800">{selectedOpportunity.pricing.deposit}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="ri-time-line text-blue-600"></i>
                  Thời gian
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày nhận:</span>
                    <span className="font-semibold text-gray-800">{new Date(selectedOpportunity.receivedDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn phản hồi:</span>
                    <span className="font-semibold text-orange-600">{new Date(selectedOpportunity.deadline).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Xác nhận tham gia trồng</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-green-600 text-xl mt-0.5"></i>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium mb-2">Cam kết của HTX:</p>
                    <textarea
                      value={confirmMessage}
                      onChange={e => setConfirmMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-alert-line text-yellow-600 text-xl mt-0.5"></i>
                  <div className="flex-1 text-sm text-gray-700">
                    <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Sau khi xác nhận, thông tin liên hệ của bạn sẽ được gửi cho doanh nghiệp</li>
                      <li>Lô đất {selectedOpportunity.matchedLot.lotId} sẽ được đánh dấu "Đang đàm phán"</li>
                      <li>Bạn cần chuẩn bị trao đổi về SOP, giá bao tiêu và mức tạm ứng</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  alert('Đã gửi xác nhận tham gia! Thông tin liên hệ của bạn đã được gửi cho doanh nghiệp.');
                  setShowConfirmModal(false);
                }}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all shadow-md"
              >
                Xác nhận tham gia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Negotiate Modal */}
      {showNegotiateModal && selectedOppForNegotiate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-amber-500 to-orange-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="ri-discuss-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Đàm phán Hợp đồng</h3>
                    <p className="text-sm text-white/90 mt-0.5">{selectedOppForNegotiate.herb} - {selectedOppForNegotiate.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNegotiateModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                >
                  <i className="ri-close-line text-2xl text-white"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Thông tin yêu cầu gốc */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="ri-file-list-3-line text-blue-500"></i>
                    Yêu cầu từ Doanh nghiệp
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Công ty:</span>
                      <span className="ml-2 font-medium text-gray-800">{selectedOppForNegotiate.companyName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Sản lượng:</span>
                      <span className="ml-2 font-medium text-gray-800">{selectedOppForNegotiate.quantity.toLocaleString('vi-VN')} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Giá dự kiến:</span>
                      <span className="ml-2 font-medium text-gray-800">{selectedOppForNegotiate.pricing.estimatedPrice}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tạm ứng:</span>
                      <span className="ml-2 font-medium text-gray-800">{selectedOppForNegotiate.pricing.deposit}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Tiêu chuẩn:</span>
                      <span className="ml-2 font-medium text-gray-800">{selectedOppForNegotiate.requirements.standards.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Form đàm phán */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <i className="ri-edit-line text-amber-500"></i>
                    Đề xuất của HTX
                  </h4>

                  {/* Giá đề xuất */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá bao tiêu đề xuất (đ/kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={negotiateForm.proposedPrice}
                      onChange={(e) => setNegotiateForm(prev => ({ ...prev, proposedPrice: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: 850000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Giá DN đề xuất: {selectedOppForNegotiate.pricing.estimatedPrice}
                    </p>
                  </div>

                  {/* Tạm ứng */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỷ lệ tạm ứng (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={negotiateForm.depositPercent}
                      onChange={(e) => setNegotiateForm(prev => ({ ...prev, depositPercent: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: 30"
                      min="0"
                      max="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tạm ứng DN đề xuất: {selectedOppForNegotiate.pricing.deposit}
                    </p>
                  </div>

                  {/* Thời gian giao hàng */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời điểm giao hàng
                    </label>
                    <input
                      type="text"
                      value={negotiateForm.deliveryDate}
                      onChange={(e) => setNegotiateForm(prev => ({ ...prev, deliveryDate: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ví dụ: Q4/2026"
                    />
                  </div>

                  {/* Tiêu chuẩn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu chuẩn cam kết
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['GACP-WHO', 'Organic', 'VietGAP', 'GlobalGAP', 'EU Organic'].map(std => (
                        <button
                          key={std}
                          onClick={() => handleStandardToggle(std)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            negotiateForm.standards.includes(std)
                              ? 'bg-amber-500 border-amber-500 text-white'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-amber-500'
                          }`}
                        >
                          {std}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú & Lý do đề xuất <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={negotiateForm.notes}
                      onChange={(e) => setNegotiateForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      placeholder="Ví dụ: Chúng tôi đề xuất giá 850,000 đ/kg vì chi phí đầu vào tăng 15% so với năm trước. Tuy nhiên, chúng tôi cam kết đảm bảo chất lượng GACP-WHO và Organic. Về tạm ứng, chúng tôi đề xuất 30% để đảm bảo nguồn vốn đầu tư ban đầu..."
                    />
                  </div>

                  {/* Thông tin lô đất */}
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <h5 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <i className="ri-map-pin-line text-emerald-500"></i>
                      Lô đất thực hiện
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Mã lô:</span>
                        <span className="ml-2 font-medium text-gray-800">{negotiateForm.lotId}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Diện tích:</span>
                        <span className="ml-2 font-medium text-gray-800">{negotiateForm.lotArea} ha</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Độ cao:</span>
                        <span className="ml-2 font-medium text-gray-800">{negotiateForm.lotAltitude}m</span>
                      </div>
                      <div>
                        <span className="text-gray-600">pH:</span>
                        <span className="ml-2 font-medium text-gray-800">{negotiateForm.lotPh}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">GPS:</span>
                        <span className="ml-2 font-medium text-gray-800">{negotiateForm.lotGps}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowNegotiateModal(false)}
                className="flex-1 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-98 transition-all font-medium whitespace-nowrap"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitNegotiation}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 active:scale-98 transition-all font-medium whitespace-nowrap shadow-sm flex items-center justify-center gap-2"
              >
                <i className="ri-send-plane-fill text-lg"></i>
                Gửi Đề xuất Đàm phán
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminBottomNav />
    </div>
  );
}
