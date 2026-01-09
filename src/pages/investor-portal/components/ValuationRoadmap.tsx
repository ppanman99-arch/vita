import { useState } from 'react';

export default function ValuationRoadmap() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const milestones = [
    {
      id: 'seed',
      name: 'Giai đoạn 1: Hạt giống (Seed)',
      status: 'current',
      valuation: 2, // triệu USD
      targetRaise: 0.5, // triệu USD
      kpis: [
        '500 ha vùng trồng',
        '5 Hợp tác xã',
        'Platform hoàn thiện luồng B2B',
        'Ký hợp đồng với 3 doanh nghiệp dược',
      ],
      timeline: 'Q1-Q2 2024',
      description: 'Hoàn thiện công nghệ và chứng minh mô hình tại 1 tỉnh',
    },
    {
      id: 'series-a',
      name: 'Giai đoạn 2: Tăng trưởng (Series A)',
      status: 'upcoming',
      valuation: 10, // triệu USD
      targetRaise: 3, // triệu USD
      kpis: [
        '5,000 ha vùng trồng',
        'Sàn Carbon đi vào hoạt động',
        '10 Doanh nghiệp Dược lớn bao tiêu',
        'Mô hình sinh lời tại 1 tỉnh',
        'Nhân bản ra 10 tỉnh',
      ],
      timeline: 'Q3 2024 - Q2 2025',
      description: 'Mở rộng quy mô và chứng minh khả năng nhân rộng',
    },
    {
      id: 'series-b',
      name: 'Giai đoạn 3: Mở rộng (Series B/Pre-IPO)',
      status: 'upcoming',
      valuation: 40, // triệu USD
      targetRaise: 15, // triệu USD
      kpis: [
        '50,000 ha vùng trồng',
        'Dẫn đầu thị phần dược liệu Việt Nam',
        'Xuất khẩu sang Nhật/Hàn',
        'Doanh thu 100+ tỷ VNĐ/năm',
        'EBITDA dương',
      ],
      timeline: 'Q3 2025 - Q2 2026',
      description: 'Thống lĩnh thị trường và chuẩn bị IPO',
    },
    {
      id: 'ipo',
      name: 'Giai đoạn 4: IPO (List sàn HoSE)',
      status: 'upcoming',
      valuation: 200, // triệu USD (50-100X)
      targetRaise: 50, // triệu USD
      kpis: [
        'Niêm yết công khai trên HoSE',
        'Thanh khoản cho nhà đầu tư',
        '100,000+ ha vùng trồng',
        'Doanh thu 500+ tỷ VNĐ/năm',
        'Trở thành Kỳ lân (Unicorn)',
      ],
      timeline: 'Q3 2026+',
      description: 'Niêm yết và tạo thanh khoản cho cổ đông',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white';
      case 'upcoming':
        return 'bg-gray-100 text-gray-700 border-2 border-gray-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-2 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return 'ri-pulse-line';
      case 'upcoming':
        return 'ri-time-line';
      case 'completed':
        return 'ri-checkbox-circle-line';
      default:
        return 'ri-circle-line';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="ri-roadmap-line mr-2 text-emerald-600"></i>
          Lộ trình Milestone gắn với Định giá - Valuation Roadmap
        </h2>
        <p className="text-gray-600">
          Mỗi cột mốc đạt được sẽ tương ứng với một vòng gọi vốn và mức định giá mới
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"></div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative pl-20">
              {/* Timeline Dot */}
              <div className={`absolute left-6 w-4 h-4 rounded-full ${
                milestone.status === 'current' ? 'bg-emerald-500 ring-4 ring-emerald-200' :
                milestone.status === 'completed' ? 'bg-green-500' :
                'bg-gray-300'
              }`}></div>

              {/* Card */}
              <div
                className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                  selectedStage === milestone.id ? 'ring-4 ring-emerald-300' : ''
                } ${getStatusColor(milestone.status)}`}
                onClick={() => setSelectedStage(selectedStage === milestone.id ? null : milestone.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      milestone.status === 'current' ? 'bg-white/20' : 'bg-white'
                    }`}>
                      <i className={`${getStatusIcon(milestone.status)} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{milestone.name}</h3>
                      <p className="text-sm opacity-90">{milestone.timeline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">
                      ${milestone.valuation}M
                    </div>
                    <div className="text-sm opacity-90">Định giá</div>
                  </div>
                </div>

                <p className="mb-4 opacity-90">{milestone.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className={`p-4 rounded-lg ${
                    milestone.status === 'current' ? 'bg-white/20' : 'bg-white/50'
                  }`}>
                    <p className="text-sm opacity-80 mb-1">Kêu gọi vốn</p>
                    <p className="text-xl font-bold">${milestone.targetRaise}M</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    milestone.status === 'current' ? 'bg-white/20' : 'bg-white/50'
                  }`}>
                    <p className="text-sm opacity-80 mb-1">Multiple từ Seed</p>
                    <p className="text-xl font-bold">
                      {milestone.valuation / milestones[0].valuation}x
                    </p>
                  </div>
                </div>

                {/* KPIs */}
                {selectedStage === milestone.id && (
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <i className="ri-target-line"></i>
                      Mục tiêu KPI:
                    </h4>
                    <ul className="space-y-2">
                      {milestone.kpis.map((kpi, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="ri-checkbox-circle-line mt-1"></i>
                          <span>{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt Lộ trình</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Định giá hiện tại</p>
            <p className="text-2xl font-bold text-emerald-600">$2M</p>
            <p className="text-xs text-gray-500 mt-1">Seed Stage</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Định giá Series A</p>
            <p className="text-2xl font-bold text-blue-600">$10M</p>
            <p className="text-xs text-gray-500 mt-1">5x từ Seed</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Định giá Series B</p>
            <p className="text-2xl font-bold text-purple-600">$40M</p>
            <p className="text-xs text-gray-500 mt-1">20x từ Seed</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Định giá IPO</p>
            <p className="text-2xl font-bold text-orange-600">$200M</p>
            <p className="text-xs text-gray-500 mt-1">100x từ Seed</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Thông điệp chính:</strong> Nếu bạn đầu tư <strong>$500K</strong> ở giai đoạn Seed (định giá $2M), 
            khi đạt IPO (định giá $200M), khoản đầu tư này sẽ trị giá <strong>$50M</strong> - tức là <strong>100x</strong> khoản đầu tư ban đầu.
          </p>
        </div>
      </div>
    </div>
  );
}

