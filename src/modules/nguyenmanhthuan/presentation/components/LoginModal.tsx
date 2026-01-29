import { useState } from 'react';
import { useRealAuth } from '../../../../config/featureFlags';
import { AuthService } from '@core/application/auth/AuthService';
import { SupabaseAuthAdapter } from '@core/infrastructure/adapters/auth/SupabaseAuthAdapter';
import { UnifiedUserService } from '../../../../lib/users/unifiedUserService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

type FlowStep = 'login' | 'forgot-password' | 'forgot-password-done';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const useAuth = useRealAuth();
  const [flowStep, setFlowStep] = useState<FlowStep>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (useAuth) {
      const email = username.trim();
      if (!email || !password) {
        setLoginError('Vui lòng nhập email và mật khẩu.');
        return;
      }
      setLoginLoading(true);
      try {
        const authService = new AuthService(new SupabaseAuthAdapter());
        const result = await authService.signIn({ email, password });
        if (result.error || !result.user) {
          setLoginError(result.error || 'Đăng nhập thất bại.');
          setLoginLoading(false);
          return;
        }
        await UnifiedUserService.ensureUnifiedUserForAuth(result.user.id, 'nguyenmanhthuan', { email: result.user.email });
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user_id', result.user.id);
          sessionStorage.removeItem('demo_account');
        }
        onLoginSuccess();
      } catch (err) {
        setLoginError(err instanceof Error ? err.message : 'Đăng nhập thất bại.');
      } finally {
        setLoginLoading(false);
      }
      return;
    }

    if (username === '1' && password === '1') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user_id', 'demo-user-1');
        sessionStorage.setItem('demo_account', 'true');
      }
      onLoginSuccess();
      return;
    }
    setLoginError('Tài khoản demo: nhập 1 / 1');
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    const email = forgotEmail.trim();
    if (!email) {
      setForgotError('Vui lòng nhập email.');
      return;
    }
    setForgotLoading(true);
    try {
      const authService = new AuthService(new SupabaseAuthAdapter());
      const result = await authService.resetPasswordForEmail(email);
      if (result.error) {
        setForgotError(result.error);
        setForgotLoading(false);
        return;
      }
      setFlowStep('forgot-password-done');
    } catch (err) {
      setForgotError(err instanceof Error ? err.message : 'Gửi email thất bại.');
    } finally {
      setForgotLoading(false);
    }
  };

  const resetFlow = () => {
    setFlowStep('login');
    setUsername('');
    setPassword('');
    setLoginError('');
    setForgotEmail('');
    setForgotError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
        <button
          onClick={() => {
            onClose();
            resetFlow();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {flowStep === 'login' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập / Nhận Cổ phần</h2>
              <p className="text-gray-600">Truy cập vào hệ sinh thái VITA</p>
            </div>

            {!useAuth && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <i className="ri-information-line text-xl text-blue-600"></i>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-bold mb-1">🔐 Tài khoản Demo:</p>
                    <p className="mb-1">• <strong>Tên đăng nhập:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">1</code></p>
                    <p>• <strong>Mật khẩu:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">1</code></p>
                  </div>
                </div>
              </div>
            )}

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {useAuth ? 'Email' : 'Tên đăng nhập / Email / Số điện thoại'}
                </label>
                <input
                  type={useAuth ? 'email' : 'text'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder={useAuth ? 'email@example.com' : 'Nhập tên đăng nhập, email hoặc số điện thoại'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer" />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {loginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setFlowStep('forgot-password')}
                className="w-full text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer whitespace-nowrap text-center py-2 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Quên mật khẩu? / Kích hoạt tài khoản cũ
              </button>
            </div>
          </>
        )}

        {flowStep === 'forgot-password' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Lấy lại mật khẩu / Kích hoạt tài khoản cũ</h2>
              <p className="text-gray-600 text-sm">Nhập email đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu. Dùng link này để kích hoạt lại tài khoản trên hệ thống mới.</p>
            </div>
            {!useAuth && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <p className="font-medium mb-1">Lưu ý:</p>
                <p>Gửi email đặt lại mật khẩu chỉ hoạt động khi bật đăng nhập thật (<code className="bg-amber-100 px-1 rounded">VITE_USE_REAL_AUTH=true</code>). Hiện đang dùng chế độ demo.</p>
              </div>
            )}
            {forgotError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {forgotError}
              </div>
            )}
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={forgotLoading || !useAuth}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {forgotLoading ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
              </button>
              <button
                type="button"
                onClick={() => { setFlowStep('login'); setForgotError(''); }}
                className="w-full text-gray-600 hover:text-gray-900 text-sm"
              >
                Quay lại đăng nhập
              </button>
            </form>
          </>
        )}

        {flowStep === 'forgot-password-done' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-mail-check-line text-3xl text-emerald-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Đã gửi email</h2>
            <p className="text-gray-600 text-sm mb-6">
              Kiểm tra hộp thư (và thư mục spam) để lấy link đặt lại mật khẩu. Sau khi đổi mật khẩu, bạn có thể đăng nhập tại đây hoặc bất kỳ portal nào của VITA.
            </p>
            <button
              type="button"
              onClick={() => { setFlowStep('login'); setForgotEmail(''); }}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
            >
              Quay lại đăng nhập
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
