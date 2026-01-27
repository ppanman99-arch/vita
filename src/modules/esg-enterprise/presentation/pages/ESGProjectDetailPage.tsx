import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { esgProjectService } from '../../application/ESGProjectService';
import type { ESGProject } from '../../domain/ESGProject';

export default function ESGProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ESGProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressInput, setProgressInput] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    esgProjectService.getProjectById(id).then((p) => {
      setProject(p);
      setProgressInput(String(p?.progress ?? 0));
      setLoading(false);
    });
  }, [id]);

  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !project) return;
    const v = parseInt(progressInput, 10);
    if (isNaN(v) || v < 0 || v > 100) {
      alert('Nhập tiến độ 0–100.');
      return;
    }
    setUpdating(true);
    try {
      await esgProjectService.updateProgress(id, v);
      const updated = await esgProjectService.getProjectById(id);
      setProject(updated);
      setProgressInput(String(updated?.progress ?? v));
    } catch (err) {
      alert((err as Error)?.message ?? 'Có lỗi.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
          {!loading && !project && <p className="mt-2">Không tìm thấy dự án.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{project.name}</h1>
              <p className="text-sm text-gray-500">{project.location ?? project.timeline}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tiến độ</h3>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{project.progress}%</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {project.area != null && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 text-sm">Diện tích</p>
              <p className="font-semibold text-gray-900">{project.area} ha</p>
            </div>
          )}
          {project.carbonTarget != null && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 text-sm">Mục tiêu CO₂</p>
              <p className="font-semibold text-emerald-600">{project.carbonTarget.toLocaleString('vi-VN')} tấn</p>
            </div>
          )}
          {project.treesPlanted != null && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 text-sm">Cây đã trồng</p>
              <p className="font-semibold text-gray-900">{project.treesPlanted.toLocaleString('vi-VN')}</p>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-gray-500 text-sm">Trạng thái</p>
            <p className="font-semibold text-gray-900">{project.status === 'active' ? 'Đang chạy' : project.status === 'completed' ? 'Hoàn thành' : 'Nháp'}</p>
          </div>
        </div>
        {(project.description || project.goals) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Mô tả</h3>
            <p className="text-gray-600 text-sm">{project.description ?? project.goals}</p>
          </div>
        )}
        {project.status === 'active' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Cập nhật tiến độ</h3>
            <form onSubmit={handleUpdateProgress} className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiến độ (0–100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={progressInput}
                  onChange={(e) => setProgressInput(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>
              <button type="submit" disabled={updating} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50">
                {updating ? 'Đang lưu...' : 'Lưu'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
