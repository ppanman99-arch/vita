import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgReportService } from '../../application/ESGReportService';
import type { ESGCertification } from '../../domain/ESGCertification';

export default function CertificationsPage() {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState<ESGCertification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    esgReportService.getESGScore().then((r) => {
      setCertifications(r.certifications ?? []);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Chứng nhận ESG</h1>
              <p className="text-sm text-gray-500">Huy hiệu & trạng thái xác minh</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {certifications.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <i className="ri-award-line text-2xl text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.issuer} · Cấp ngày {c.issuedAt}</p>
                  {c.expiryAt && <p className="text-xs text-amber-600">Hết hạn: {c.expiryAt}</p>}
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Đã xác minh</span>
            </div>
          ))}
        </div>
        {certifications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <i className="ri-award-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Chưa có chứng nhận.</p>
            <p className="text-sm text-gray-400 mt-2">Hoàn thành dự án ESG để nhận chứng nhận.</p>
            <button onClick={() => navigate('/esg-portal/projects')} className="mt-4 text-emerald-600 font-medium hover:underline">Xem dự án</button>
          </div>
        )}
      </div>
    </div>
  );
}
