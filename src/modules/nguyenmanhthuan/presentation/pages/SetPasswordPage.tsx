import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../lib/supabase';

/**
 * Trang đặt lại mật khẩu sau khi user bấm link "Quên mật khẩu" từ email.
 * Supabase redirect về đây với hash chứa token; session được thiết lập, user nhập mật khẩu mới.
 */
export default function SetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [noSession, setNoSession] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setReady(true);
      } else {
        setNoSession(true);
      }
    };
    check();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      navigate('/nguyen-manh-thuan/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cập nhật mật khẩu thất bại.');
    } finally {
      setLoading(false);
    }
  };

  if (noSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-600 mb-4">Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</p>
          <button
            type="button"
            onClick={() => navigate('/nguyen-manh-thuan')}
            className="text-emerald-600 font-medium hover:underline"
          >
            Về trang chủ nguyenmanhthuan
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-gray-500">Đang xử lý...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Đặt lại mật khẩu</h1>
        <p className="text-gray-600 text-sm mb-6">Nhập mật khẩu mới để tiếp tục. Sau đó bạn có thể đăng nhập tại đây hoặc bất kỳ portal nào của VITA.</p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Đặt mật khẩu mới'}
          </button>
        </form>
      </div>
    </div>
  );
}
