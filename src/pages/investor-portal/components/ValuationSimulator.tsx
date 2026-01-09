import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Scenario {
  name: string;
  description: string;
  area: number; // ha
  gmv: number; // tỷ VNĐ
  greenlightRevenue: number; // tỷ VNĐ
  psMultiple: number;
  valuation: number; // tỷ VNĐ
  color: string;
  takeRate: number; // %
}

export default function ValuationSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<'base' | 'growth' | 'moonshot'>('growth');
  const [area, setArea] = useState(10000); // ha - THE NORTH STAR METRIC
  const [ltvPerHa, setLtvPerHa] = useState(8); // triệu VNĐ/ha/năm

  // 3 kịch bản chính theo logic mới
  const scenarios: Record<'base' | 'growth' | 'moonshot', Scenario> = {
    base: {
      name: 'Khiêm tốn (Base Case)',
      description: 'Mô hình Sàn Thương mại - Chưa mạnh về Carbon hay Fintech',
      area: 1000,
      gmv: 200, // 200 tỷ VNĐ
      greenlightRevenue: 10, // 10 tỷ VNĐ (take-rate 5%)
      psMultiple: 5, // P/S 5x cho Agritech cơ bản
      valuation: 50, // 50 tỷ VNĐ (~$2M)
      color: '#10b981',
      takeRate: 5,
    },
    growth: {
      name: 'Tích cực (Growth Case)',
      description: 'Mô hình Hệ sinh thái - Dược liệu + Gỗ, SaaS được sử dụng rộng rãi',
      area: 10000,
      gmv: 2500, // 2,500 tỷ VNĐ
      greenlightRevenue: 120, // 120 tỷ VNĐ (take-rate 4% + SaaS)
      psMultiple: 10, // P/S 10x cho Agritech tăng trưởng
      valuation: 1200, // 1,200 tỷ VNĐ (~$50M)
      color: '#3b82f6',
      takeRate: 4.8,
    },
    moonshot: {
      name: 'Đột phá (Moonshot Case)',
      description: 'Mô hình Fintech & Carbon - "Sàn chứng khoán Xanh", Big Data',
      area: 50000,
      gmv: 15000, // 15,000 tỷ VNĐ (Dược + Gỗ + Carbon)
      greenlightRevenue: 800, // 800 tỷ VNĐ (Phí giao dịch 3% + Fintech 2% + dịch vụ)
      psMultiple: 15, // P/S 15x cho Fintech/Data
      valuation: 12000, // 12,000 tỷ VNĐ (~$500M)
      color: '#8b5cf6',
      takeRate: 5.3,
    },
  };

  const currentScenario = scenarios[selectedScenario];

  // Unit Economics: LTV của 1 Hecta
  // 5 triệu (Dược liệu) + 2 triệu (Gỗ) + 1 triệu (Carbon) = 8 triệu/ha/năm
  const calculateGMV = (ha: number, ltv: number) => {
    return (ha * ltv) / 1000; // tỷ VNĐ
  };

  // Tính doanh thu GreenLight dựa trên GMV và take-rate
  const calculateGreenlightRevenue = (gmv: number, takeRate: number) => {
    return gmv * (takeRate / 100);
  };

  // Tính định giá dựa trên doanh thu và P/S multiple
  const calculateValuation = (revenue: number, psMultiple: number) => {
    return revenue * psMultiple;
  };

  // Tính toán động dựa trên area và LTV
  const dynamicGMV = calculateGMV(area, ltvPerHa);
  const dynamicRevenue = calculateGreenlightRevenue(dynamicGMV, currentScenario.takeRate);
  const dynamicValuation = calculateValuation(dynamicRevenue, currentScenario.psMultiple);

  // Chart data for scenario comparison
  const scenarioComparisonData = Object.values(scenarios).map((scenario) => ({
    name: scenario.name.split(' ')[0], // Lấy từ đầu tiên
    GMV: scenario.gmv,
    'Doanh thu GL': scenario.greenlightRevenue,
    'Định giá': scenario.valuation,
  }));

  // Chart data for projection based on area growth
  const projectionData = Array.from({ length: 6 }, (_, i) => {
    const yearArea = area * Math.pow(1.5, i); // 50% tăng trưởng diện tích/năm
    const yearGMV = calculateGMV(yearArea, ltvPerHa);
    const yearRevenue = calculateGreenlightRevenue(yearGMV, currentScenario.takeRate);
    const yearValuation = calculateValuation(yearRevenue, currentScenario.psMultiple);
    return {
      year: i === 0 ? 'Hiện tại' : `Năm ${i}`,
      area: yearArea,
      gmv: yearGMV,
      revenue: yearRevenue,
      valuation: yearValuation,
    };
  });

  const formatCurrency = (value: number, unit: string = 'tỷ VNĐ', showUSD: boolean = false) => {
    if (value >= 1000) {
      const thousands = value / 1000;
      const usd = thousands * 40; // ~40 tỷ VNĐ = 1 triệu USD
      if (showUSD && thousands >= 1) {
        return `${thousands.toFixed(1)} nghìn ${unit} (~$${usd.toFixed(0)}M)`;
      }
      return `${thousands.toFixed(1)} nghìn ${unit}`;
    }
    const usd = value * 0.04; // ~40 tỷ VNĐ = 1.6 triệu USD
    if (showUSD && value >= 10) {
      return `${value.toFixed(0)} ${unit} (~$${usd.toFixed(1)}M)`;
    }
    return `${value.toFixed(0)} ${unit}`;
  };

  const formatArea = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} nghìn ha`;
    }
    return `${value.toLocaleString()} ha`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <i className="ri-calculator-line text-emerald-600"></i>
          Công cụ Giả lập Định giá - Valuation Simulator
        </h2>
        <p className="text-gray-600 text-lg">
          Dựa trên <strong className="text-emerald-600">Tổng Diện tích Hectare</strong> - Tham số quan trọng nhất quyết định định giá GreenLight
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Unit Economics:</strong> Mỗi 1 Hecta đất được số hóa tạo ra <strong>8 triệu VNĐ/năm</strong> cho GreenLight 
            (5M từ Dược liệu + 2M từ Gỗ + 1M từ Carbon)
          </p>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-lightbulb-flash-line text-amber-500"></i>
          Chọn Kịch bản Định giá
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['base', 'growth', 'moonshot'] as const).map((key) => {
            const scenario = scenarios[key];
            const isSelected = selectedScenario === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedScenario(key);
                  setArea(scenario.area);
                }}
                className={`p-5 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? `border-${scenario.color} bg-white shadow-lg`
                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
                }`}
                style={isSelected ? { borderColor: scenario.color } : {}}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: scenario.color }}>
                    {scenario.name.split(' ')[0]}
                  </div>
                  {isSelected && (
                    <i className="ri-checkbox-circle-fill text-xl" style={{ color: scenario.color }}></i>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{scenario.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-bold text-gray-900">{formatArea(scenario.area)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GMV:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(scenario.gmv)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doanh thu GL:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(scenario.greenlightRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P/S Multiple:</span>
                    <span className="font-bold text-gray-900">{scenario.psMultiple}x</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Định giá:</span>
                      <span className="font-bold text-lg" style={{ color: scenario.color }}>
                        {formatCurrency(scenario.valuation, 'tỷ VNĐ', true)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Area Slider - THE NORTH STAR METRIC */}
          <div className="bg-white p-6 rounded-xl border-2 border-emerald-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <i className="ri-landscape-line text-emerald-600"></i>
                  Tổng Diện tích Hectare (THE NORTH STAR METRIC)
                </label>
                <p className="text-sm text-gray-600">
                  Tham số quan trọng nhất - 1 Hecta = Lợi nhuận Kép 3 Tầng (Dược liệu + Gỗ + Carbon)
                </p>
              </div>
              <span className="text-3xl font-bold text-emerald-600">{formatArea(area)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1,000 ha</span>
              <span>50,000 ha</span>
              <span>100,000 ha</span>
            </div>
          </div>

          {/* LTV per Hectare Slider */}
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <i className="ri-money-dollar-circle-line text-blue-600"></i>
                  LTV mỗi Hecta (Giá trị trọn đời/năm)
                </label>
                <p className="text-xs text-gray-600">
                  5M (Dược liệu) + 2M (Gỗ) + 1M (Carbon) = 8 triệu/ha/năm
                </p>
              </div>
              <span className="text-2xl font-bold text-blue-600">{ltvPerHa} triệu/ha</span>
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="0.5"
              value={ltvPerHa}
              onChange={(e) => setLtvPerHa(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>5 triệu</span>
              <span>10 triệu</span>
              <span>15 triệu</span>
            </div>
          </div>

          {/* Dynamic Calculation Results */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-calculator-2-line text-purple-600"></i>
              Tính toán Động (Dựa trên Diện tích)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">GMV (Tổng giá trị giao dịch)</div>
                <div className="text-2xl font-bold text-emerald-600">{formatCurrency(dynamicGMV)}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Doanh thu GreenLight</div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(dynamicRevenue)}</div>
                <div className="text-xs text-gray-500 mt-1">Take-rate: {currentScenario.takeRate}%</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Định giá (P/S {currentScenario.psMultiple}x)</div>
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(dynamicValuation, 'tỷ VNĐ', true)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results Panel */}
        <div className="space-y-4">
          {/* Selected Scenario Summary */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-emerald-300 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-bar-chart-box-line text-emerald-600"></i>
              Kịch bản: {currentScenario.name.split('(')[0].trim()}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">GMV (Tổng giá trị giao dịch)</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(currentScenario.gmv)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Doanh thu GreenLight</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentScenario.greenlightRevenue)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Take-rate: {currentScenario.takeRate}%</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Định giá công ty (P/S {currentScenario.psMultiple}x)</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(currentScenario.valuation, 'tỷ VNĐ', true)}
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 rounded-lg text-white">
                <p className="text-xs opacity-90 mb-2">Giai đoạn đầu tư</p>
                <p className="text-sm font-semibold mb-1">
                  {currentScenario.valuation < 100 ? 'Seed/Angel' :
                   currentScenario.valuation < 500 ? 'Series A-B' :
                   'Series B-C / Pre-IPO'}
                </p>
              </div>
            </div>
          </div>

          {/* Unit Economics Card */}
          <div className="bg-white p-5 rounded-xl border-2 border-gray-200 shadow-sm">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-calculator-line text-orange-600"></i>
              Unit Economics (1 Hecta)
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dược liệu:</span>
                <span className="font-bold text-emerald-600">5 triệu/năm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Gỗ:</span>
                <span className="font-bold text-blue-600">2 triệu/năm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Carbon:</span>
                <span className="font-bold text-teal-600">1 triệu/năm</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-gray-300 font-bold">
                <span className="text-gray-900">Tổng LTV:</span>
                <span className="text-orange-600 text-lg">{ltvPerHa} triệu/ha/năm</span>
              </div>
              <div className="pt-2 border-t text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p>
                  <strong>Việt Nam có 14 triệu ha</strong> rừng và đất lâm nghiệp. 
                  Chiếm lĩnh <strong>0.5%</strong> (70,000 ha) = Doanh thu <strong>560 tỷ VNĐ/năm</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Comparison Bar Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">So sánh 3 Kịch bản</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scenarioComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                tickFormatter={(value) => `${value.toFixed(0)}T`}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="GMV" fill="#10b981" name="GMV (tỷ VNĐ)" />
              <Bar dataKey="Doanh thu GL" fill="#3b82f6" name="Doanh thu GL (tỷ VNĐ)" />
              <Bar dataKey="Định giá" fill="#8b5cf6" name="Định giá (tỷ VNĐ)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projection Line Chart */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Lộ trình Tăng trưởng (50% CAGR Diện tích)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'area') return `${(value / 1000).toFixed(1)}K ha`;
                  return formatCurrency(value);
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="valuation" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                name="Định giá (tỷ VNĐ)"
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Doanh thu GL (tỷ VNĐ)"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="gmv" 
                stroke="#10b981" 
                strokeWidth={2} 
                name="GMV (tỷ VNĐ)"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <p className="text-gray-600 mb-1">Tăng trưởng Diện tích</p>
              <p className="font-bold text-emerald-600">50% CAGR</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-gray-600 mb-1">Tăng trưởng Doanh thu</p>
              <p className="font-bold text-blue-600">Theo diện tích</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-gray-600 mb-1">Định giá (P/S {currentScenario.psMultiple}x)</p>
              <p className="font-bold text-purple-600">{formatCurrency(dynamicValuation, 'tỷ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="ri-lightbulb-line text-amber-600"></i>
          Insights cho Pitching (Gọi vốn)
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>✓ Mô hình Scalable:</strong> GreenLight không cần sở hữu đất (Asset-light), nhưng khai thác giá trị trên đất.
            Mỗi 1 Hecta được số hóa tạo ra <strong>{ltvPerHa} triệu VNĐ/năm</strong> doanh thu cho GreenLight.
          </p>
          <p>
            <strong>✓ Thị trường rộng lớn:</strong> Việt Nam có <strong>14 triệu ha</strong> rừng và đất lâm nghiệp. 
            Chỉ cần chiếm lĩnh <strong>0.5%</strong> thị trường (70,000 ha) = Doanh thu <strong>560 tỷ VNĐ/năm</strong> 
            với biên lợi nhuận cao vì là công ty công nghệ.
          </p>
          <p>
            <strong>✓ Go-to-Market:</strong> Khoản đầu tư được dùng để <strong>Acquire (Thu nạp)</strong> các Hecta đất vào hệ thống 
            càng nhanh càng tốt trước khi đối thủ xuất hiện.
          </p>
          <p className="pt-2 border-t border-amber-300">
            <strong>✓ Định giá phụ thuộc vào Execution:</strong> Nếu chứng minh được onboarding <strong>5,000 ha</strong> đầu tiên trong 
            vòng 18 tháng, mức định giá <strong>$10-15 Triệu USD</strong> ngay từ vòng Private là hoàn toàn khả thi.
          </p>
        </div>
      </div>
    </div>
  );
}
