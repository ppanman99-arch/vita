import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { carbonService } from '../../application/CarbonService';
import type { CarbonReport } from '../../domain/carbon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MOCK_MONTHLY = [
  { month: 'T1', emissions: 120, quota: 150 },
  { month: 'T2', emissions: 135, quota: 150 },
  { month: 'T3', emissions: 128, quota: 150 },
  { month: 'T4', emissions: 142, quota: 150 },
  { month: 'T5', emissions: 138, quota: 150 },
  { month: 'T6', emissions: 125, quota: 150 },
];

export default function CarbonReportPage() {
  const navigate = useNavigate();
  const [report, setReport] = useState<CarbonReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('2025-Q1');

  useEffect(() => {
    carbonService.generateCarbonReport(undefined, period).then(setReport).finally(() => setLoading(false));
  }, [period]);

  if (loading || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  const { footprint, comparison, recommendations } = report;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Báo cáo Carbon</h1>
                <p className="text-sm text-gray-500">Dấu chân carbon & phân tích</p>
              </div>
            </div>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="2025-Q1">Q1/2025</option>
              <option value="2024-Q4">Q4/2024</option>
              <option value="2024-Q3">Q3/2024</option>
            </select>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-gray-500 text-sm">Tổng phát thải</p>
            <p className="text-2xl font-bold text-gray-900">{footprint.totalEmissions} <span className="text-sm font-normal">tấn CO₂e</span></p>
          </div>
          {footprint.quota != null && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 text-sm">Hạn mức (Quota)</p>
              <p className="text-2xl font-bold text-emerald-600">{footprint.quota} tấn</p>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-gray-500 text-sm">Scope 1</p>
            <p className="text-xl font-bold text-gray-900">{footprint.byScope.scope1 ?? 0} tấn</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-gray-500 text-sm">Scope 2+3</p>
            <p className="text-xl font-bold text-gray-900">{(footprint.byScope.scope2 ?? 0) + (footprint.byScope.scope3 ?? 0)} tấn</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Phát thải theo tháng vs Hạn mức</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v} tấn`} />
                <Legend />
                <Bar dataKey="emissions" name="Phát thải" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quota" name="Hạn mức" fill="#d1fae5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {comparison && comparison.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">So sánh theo kỳ</h3>
            <div className="space-y-2">
              {comparison.map((c) => (
                <div key={c.period} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700">{c.period}</span>
                  <span className="font-semibold text-gray-900">{c.emissions} tấn CO₂e</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Gợi ý giảm phát thải</h3>
            <ul className="space-y-3">
              {recommendations.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-medium">{i + 1}</span>
                  <span className="text-gray-700 text-sm">{r}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/esg-portal/marketplace')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              Mua tín chỉ Carbon để bù đắp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
