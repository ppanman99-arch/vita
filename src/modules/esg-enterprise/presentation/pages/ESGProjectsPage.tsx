import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgProjectService } from '../../application/ESGProjectService';
import type { ESGProject } from '../../domain/ESGProject';

export default function ESGProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ESGProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createGoals, setCreateGoals] = useState('');
  const [createTimeline, setCreateTimeline] = useState('');

  useEffect(() => {
    esgProjectService.getProjects().then(setProjects).finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    await esgProjectService.createProject({
      name: createName.trim(),
      goals: createGoals.trim() || undefined,
      timeline: createTimeline.trim() || undefined,
      status: 'draft',
      progress: 0,
    });
    setCreateName('');
    setCreateGoals('');
    setCreateTimeline('');
    setShowCreate(false);
    const list = await esgProjectService.getProjects();
    setProjects(list);
  };

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
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dự án ESG</h1>
                <p className="text-sm text-gray-500">Quản lý dự án xanh</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Tạo dự án mới
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Tìm dự án..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1 min-w-[160px]"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            <option value="all">Tất cả</option>
            <option value="draft">Nháp</option>
            <option value="active">Đang chạy</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>
        <div className="space-y-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/esg-portal/projects/${p.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md hover:border-green-200 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  {p.goals && <p className="text-sm text-gray-500 mt-1">{p.goals}</p>}
                  <p className="text-xs text-gray-400 mt-2">{p.timeline ?? p.location}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    p.status === 'active' ? 'bg-green-100 text-green-700' : p.status === 'completed' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status === 'active' ? 'Đang chạy' : p.status === 'completed' ? 'Hoàn thành' : 'Nháp'}
                  </span>
                  <span className="font-semibold text-emerald-600">{p.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-plant-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Chưa có dự án.</p>
            <button onClick={() => setShowCreate(true)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Tạo dự án mới</button>
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tạo dự án mới</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
                <input value={createName} onChange={(e) => setCreateName(e.target.value)} required placeholder="VD: Trồng rừng ngập mặn" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu</label>
                <input value={createGoals} onChange={(e) => setCreateGoals(e.target.value)} placeholder="VD: Carbon offset, đa dạng sinh học" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                <input value={createTimeline} onChange={(e) => setCreateTimeline(e.target.value)} placeholder="VD: 2024–2026" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Lưu</button>
                <button type="button" onClick={() => { setShowCreate(false); setCreateName(''); setCreateGoals(''); setCreateTimeline(''); }} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
