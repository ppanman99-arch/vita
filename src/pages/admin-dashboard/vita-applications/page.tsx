import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VitaApplicationService } from '../../../modules/cooperative/application/VitaApplicationService';
import { CooperativeService } from '../../../modules/cooperative/application/CooperativeService';
import type { VitaApplication } from '../../../modules/cooperative/application/VitaApplicationService';
import type { Cooperative } from '../../../modules/cooperative/domain/Cooperative';

export default function AdminVitaApplicationsPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<(VitaApplication & { cooperative?: Cooperative })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const vitaApplicationService = new VitaApplicationService();
  const cooperativeService = new CooperativeService();

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    setLoading(true);
    setError(null);
    try {
      const pending = await vitaApplicationService.getPending();
      const withCoop = await Promise.all(
        pending.map(async (app) => {
          const coop = await cooperativeService.getCooperativeById(app.cooperativeId);
          return { ...app, cooperative: coop ?? undefined };
        })
      );
      setApplications(withCoop);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách đơn');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    setError(null);
    try {
      await vitaApplicationService.approve(id);
      await loadPending();
      // Email stub: in production would send email to admin + HTX
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Phê duyệt thất bại');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    const notes = rejectNotes[id] ?? '';
    setActionLoading(id);
    setError(null);
    try {
      await vitaApplicationService.reject(id, notes);
      setRejectNotes((prev) => ({ ...prev, [id]: '' }));
      await loadPending();
      // Email stub: in production would send email to admin + HTX
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Từ chối thất bại');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/cooperative/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <i className="ri-arrow-left-line text-xl" />
            <span>Về Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Đơn đăng ký tham gia VITA</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <i className="ri-loader-4-line text-4xl text-emerald-600 animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            <i className="ri-file-list-3-line text-5xl text-gray-300 mb-4" />
            <p>Không có đơn nào đang chờ duyệt.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {app.cooperative?.name ?? app.cooperativeId}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Email: {app.cooperative?.email ?? '—'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Gửi lúc: {new Date(app.submittedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      onClick={() => handleApprove(app.id)}
                      disabled={actionLoading === app.id}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {actionLoading === app.id ? 'Đang xử lý...' : 'Phê duyệt'}
                    </button>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        placeholder="Lý do từ chối (tùy chọn)"
                        value={rejectNotes[app.id] ?? ''}
                        onChange={(e) =>
                          setRejectNotes((prev) => ({ ...prev, [app.id]: e.target.value }))
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm sm:w-48"
                      />
                      <button
                        onClick={() => handleReject(app.id)}
                        disabled={actionLoading === app.id}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 disabled:opacity-50"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
