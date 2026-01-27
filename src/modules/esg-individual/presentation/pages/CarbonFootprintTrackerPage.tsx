import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { carbonFootprintService } from '../../application/CarbonFootprintService';
import type { PersonalCarbonFootprint } from '../../domain/CarbonFootprint';
import type { ActivityCategory } from '../../domain/CarbonFootprint';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const QUICK_ACTIVITIES = [
  { category: 'transport' as ActivityCategory, label: 'Xe máy (km)', unit: 'km', defaultQty: 10 },
  { category: 'transport' as ActivityCategory, label: 'Ô tô (km)', unit: 'km', defaultQty: 5 },
  { category: 'energy' as ActivityCategory, label: 'Điện (số)', unit: 'kWh', defaultQty: 100 },
  { category: 'diet' as ActivityCategory, label: 'Bữa ăn thường', unit: 'meal', defaultQty: 1 },
  { category: 'diet' as ActivityCategory, label: 'Bữa ăn chay', unit: 'meal', defaultQty: 1 },
];

export default function CarbonFootprintTrackerPage() {
  const navigate = useNavigate();
  const [footprint, setFootprint] = useState<PersonalCarbonFootprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedQuick, setSelectedQuick] = useState<typeof QUICK_ACTIVITIES[0] | null>(null);
  const [quantity, setQuantity] = useState('');

  const load = () => {
    setLoading(true);
    carbonFootprintService.getFootprint().then((f) => {
      setFootprint(f);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    if (!selectedQuick) return;
    const qty = parseInt(quantity || String(selectedQuick.defaultQty), 10);
    if (isNaN(qty) || qty <= 0) return;
    setAdding(true);
    carbonFootprintService
      .addActivity({
        category: selectedQuick.category,
        label: selectedQuick.label,
        quantity: qty,
        unit: selectedQuick.unit,
      })
      .then(() => {
        setSelectedQuick(null);
        setQuantity('');
        load();
        setAdding(false);
      });
  };

  const suggestion = footprint ? carbonFootprintService.getOffsetSuggestions(footprint.totalCo2Kg) : null;

  if (loading && !footprint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-3xl text-emerald-500" />
      </div>
    );
  }

  const chartData =
    footprint?.activities
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((a) => ({ date: a.date.slice(5), co2: a.co2Kg })) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dấu chân Carbon</h1>
              <p className="text-sm text-gray-500">Theo dõi và giảm phát thải cá nhân</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Tổng phát thải (kỳ {footprint?.period ?? '-'})</p>
          <p className="text-3xl font-bold text-gray-900">
            {(footprint?.totalCo2Kg ?? 0).toFixed(1)}
            <span className="text-lg font-normal text-gray-500"> kg CO₂</span>
          </p>
          {footprint?.trend && (
            <p className="text-sm mt-1">
              {footprint.trend === 'down' && 'Giảm so với kỳ trước'}
              {footprint.trend === 'up' && 'Tăng so với kỳ trước'}
              {footprint.trend === 'stable' && 'Ổn định'}
            </p>
          )}
        </div>
        {chartData.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Xu hướng</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => [`${v.toFixed(1)} kg CO₂`, 'Phát thải']} />
                  <Area type="monotone" dataKey="co2" stroke="#059669" fill="#a7f3d0" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {suggestion && (
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h3 className="font-semibold text-emerald-900 mb-2">Gợi ý bù đắp</h3>
            <p className="text-sm text-emerald-800">{suggestion.text}</p>
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Thêm hoạt động</h3>
          <div className="space-y-2">
            {QUICK_ACTIVITIES.map((q) => (
              <button
                key={q.label + q.unit}
                onClick={() => {
                  setSelectedQuick(selectedQuick?.label === q.label ? null : q);
                  setQuantity(String(q.defaultQty));
                }}
                className={
                  'w-full flex items-center justify-between px-4 py-2 rounded-lg border text-left ' +
                  (selectedQuick?.label === q.label ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50')
                }
              >
                <span className="text-sm font-medium text-gray-800">{q.label}</span>
                <span className="text-xs text-gray-500">{q.unit}</span>
              </button>
            ))}
          </div>
          {selectedQuick && (
            <div className="mt-4 flex gap-2">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Số lượng"
              />
              <button
                onClick={handleAdd}
                disabled={adding}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
              >
                {adding ? 'Đang thêm...' : 'Thêm'}
              </button>
            </div>
          )}
        </div>
        {footprint && footprint.activities.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Lịch sử hoạt động</h3>
            <ul className="space-y-2">
              {footprint.activities
                .slice(-10)
                .reverse()
                .map((a) => (
                  <li key={a.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {a.label} · {a.quantity} {a.unit}
                    </span>
                    <span className="font-medium text-gray-900">{a.co2Kg.toFixed(1)} kg CO₂</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
