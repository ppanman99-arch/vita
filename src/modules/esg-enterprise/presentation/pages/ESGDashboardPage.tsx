import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgReportService } from '../../application/ESGReportService';
import type { ESGScoreReport } from '../../application/ESGReportService';
import { esgProjectService } from '../../application/ESGProjectService';
import type { ESGProject } from '../../domain/ESGProject';
import ESGScoreCard from '../components/ESGScoreCard';

export default function ESGDashboardPage() {
  const navigate = useNavigate();
  const [report, setReport] = useState<ESGScoreReport | null>(null);
  const [projects, setProjects] = useState<ESGProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([esgReportService.getESGScore(), esgProjectService.getProjects()]).then(([r, p]) => {
      setReport(r);
      setProjects(p);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  const r = report!;
  const active = projects.filter((p) => p.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard ESG</h1>
              <p className="text-sm text-gray-500">Tổng quan dự án & điểm số</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <ESGScoreCard report={r} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button onClick={() => navigate('/esg-portal/carbon-report')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all text-left">
            <i className="ri-file-chart-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Báo cáo Carbon</span>
          </button>
          <button onClick={() => navigate('/esg-portal/marketplace')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all text-left">
            <i className="ri-exchange-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Sàn Tín chỉ Carbon</span>
          </button>
          <button onClick={() => navigate('/esg-portal/certifications')} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-emerald-200 transition-all text-left">
            <i className="ri-award-line text-2xl text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Chứng nhận ESG</span>
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Carbon offset</h3>
          <p className="text-3xl font-bold text-emerald-600">{r.carbonOffsetTotal.toLocaleString('vi-VN')} <span className="text-lg font-normal text-gray-500">tấn CO₂</span></p>
          <p className="text-sm text-gray-500 mt-1">Tổng lượng đã bù từ các dự án</p>
        </div>
        {r.certifications.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Chứng nhận</h3>
            <div className="flex flex-wrap gap-3">
              {r.certifications.map((c) => (
                <button key={c.id} onClick={() => navigate('/esg-portal/certifications')} className="px-4 py-2 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-left">
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.issuer} · {c.issuedAt}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Dự án đang chạy</h3>
            <button onClick={() => navigate('/esg-portal/projects')} className="text-sm text-green-600 font-medium hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            {active.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/esg-portal/projects/${p.id}`)}
                className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center cursor-pointer hover:shadow-md hover:border-green-200 transition-all"
              >
                <div>
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.location ?? p.timeline}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">{p.progress}%</p>
                  <p className="text-xs text-gray-400">tiến độ</p>
                </div>
              </div>
            ))}
            {active.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500">
                <i className="ri-plant-line text-3xl mb-2" />
                <p>Chưa có dự án đang chạy.</p>
                <button onClick={() => navigate('/esg-portal/projects')} className="mt-3 text-green-600 font-medium hover:underline">Tạo dự án mới</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
