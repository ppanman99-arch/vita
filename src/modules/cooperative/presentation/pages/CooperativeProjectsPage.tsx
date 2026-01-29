import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CooperativeProjectService } from '../../application/CooperativeProjectService';
import { CooperativeService } from '../../application/CooperativeService';
import type { GreenInvestmentOpportunity } from '../../../member/domain/greenInvestmentOpportunity';

export default function CooperativeProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<GreenInvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [coopName, setCoopName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    minInvest: '',
    expectedReturn: '',
    duration: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cooperativeId = typeof window !== 'undefined' ? sessionStorage.getItem('cooperative_id') : null;
  const projectService = new CooperativeProjectService();
  const cooperativeService = new CooperativeService();

  useEffect(() => {
    if (!cooperativeId) {
      setLoading(false);
      return;
    }
    loadProjects();
    cooperativeService.getCooperativeById(cooperativeId).then((c) => c && setCoopName(c.name));
  }, [cooperativeId]);

  const loadProjects = async () => {
    if (!cooperativeId) return;
    setLoading(true);
    setError(null);
    try {
      const list = await projectService.listByCooperative(cooperativeId);
      setProjects(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách dự án');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cooperativeId || !coopName) {
      setError('Thiếu thông tin HTX.');
      return;
    }
    const targetAmount = parseInt(formData.targetAmount.replace(/\D/g, ''), 10) || 0;
    const minInvest = parseInt(formData.minInvest.replace(/\D/g, ''), 10) || 0;
    const expectedReturn = parseFloat(formData.expectedReturn) || 0;
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên dự án.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await projectService.create({
        cooperativeId,
        cooperativeName: coopName,
        name: formData.name.trim(),
        targetAmount,
        minInvest,
        expectedReturn,
        duration: formData.duration.trim() || '24 tháng',
        description: formData.description.trim() || undefined,
      });
      setFormData({ name: '', targetAmount: '', minInvest: '', expectedReturn: '', duration: '', description: '' });
      setShowForm(false);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tạo dự án thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatVnd = (n: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

  if (!cooperativeId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center text-gray-600">
          <p>Bạn cần đăng nhập với tài khoản HTX để xem và tạo dự án.</p>
          <button onClick={() => navigate('/cooperative/login')} className="mt-4 text-emerald-600 font-medium hover:underline">
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/cooperative/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <i className="ri-arrow-left-line text-xl" />
              <span>Về Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Dự án kêu gọi vốn / ESG</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
          >
            <i className="ri-add-line" />
            Tạo dự án
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tạo dự án mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="VD: Trồng rừng Sâm Ngọc Linh - Lô A"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu vốn (VNĐ) *</label>
                  <input
                    type="text"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData((p) => ({ ...p, targetAmount: e.target.value }))}
                    placeholder="VD: 200000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Góp tối thiểu (VNĐ) *</label>
                  <input
                    type="text"
                    value={formData.minInvest}
                    onChange={(e) => setFormData((p) => ({ ...p, minInvest: e.target.value }))}
                    placeholder="VD: 10000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lợi nhuận kỳ vọng (%)</label>
                  <input
                    type="text"
                    value={formData.expectedReturn}
                    onChange={(e) => setFormData((p) => ({ ...p, expectedReturn: e.target.value }))}
                    placeholder="VD: 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời hạn</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="VD: 24 tháng"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Mô tả ngắn về dự án..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50">
                  {submitting ? 'Đang tạo...' : 'Tạo dự án'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <i className="ri-loader-4-line text-4xl text-emerald-600 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            <i className="ri-plant-line text-5xl text-gray-300 mb-4" />
            <p>Chưa có dự án nào. Bấm &quot;Tạo dự án&quot; để kêu gọi vốn.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Mục tiêu: {formatVnd(p.targetAmount)} · Đã gọi: {formatVnd(p.raised)} · Tối thiểu: {formatVnd(p.minInvest)}
                  </p>
                  <p className="text-sm text-gray-500">{p.duration} · {p.expectedReturn}% kỳ vọng</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    p.raised >= p.targetAmount ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.raised >= p.targetAmount ? 'Đã đủ vốn' : 'Đang kêu gọi'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
