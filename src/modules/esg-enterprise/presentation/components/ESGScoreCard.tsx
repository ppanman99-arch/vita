import type { ESGScoreReport } from '../../application/ESGReportService';

interface ESGScoreCardProps {
  report: ESGScoreReport;
  className?: string;
}

export default function ESGScoreCard({ report, className = '' }: ESGScoreCardProps) {
  const tier = report.score >= 80 ? 'Xuất sắc' : report.score >= 60 ? 'Tốt' : report.score >= 40 ? 'Khá' : 'Cải thiện';
  const color = report.score >= 80 ? 'from-emerald-500 to-green-600' : report.score >= 60 ? 'from-green-500 to-emerald-500' : report.score >= 40 ? 'from-amber-500 to-yellow-500' : 'from-gray-500 to-gray-600';
  const badgeClass = report.score >= 80 ? 'bg-emerald-100 text-emerald-700' : report.score >= 60 ? 'bg-green-100 text-green-700' : report.score >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700';

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Điểm ESG</h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>{tier}</span>
      </div>
      <div className={`flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${color} text-white text-3xl font-bold mb-2`}>
        {report.score}
      </div>
      <p className="text-center text-sm text-gray-500 mb-4">/ 100</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-gray-500">Dự án đang chạy</p>
          <p className="font-semibold text-gray-900">{report.activeProjects}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-gray-500">Carbon offset (tấn)</p>
          <p className="font-semibold text-emerald-600">{report.carbonOffsetTotal.toLocaleString('vi-VN')}</p>
        </div>
      </div>
    </div>
  );
}
